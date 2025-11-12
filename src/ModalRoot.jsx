// ModalRoot.js
import { createElement, useEffect, useState, useRef } from 'react'
import Axios from 'axios'
import { except, kebabCase, generateId, sameUrlPath } from './helpers'
import { router, usePage } from '@inertiajs/react'
import * as InertiaReact from '@inertiajs/react'
import { mergeDataIntoQueryString } from '@inertiajs/core'
import { createContext, useContext } from 'react'
import ModalRenderer from './ModalRenderer'
import { getConfig } from './config'

const ModalStackContext = createContext(null)
ModalStackContext.displayName = 'ModalStackContext'

let pageVersion = null
let resolveComponent = null
let baseUrl = null
let modalResolversQueue = []   // <-- FIFO resolve queue (router path)
let localStackCopy = []
let pendingModalUpdates = {}   // <-- still used for XHR path

export const ModalStackProvider = ({ children }) => {
  const [stack, setStack] = useState([])
  const [localModals, setLocalModals] = useState({})

  const updateStack = (withStack) => {
    setStack((prevStack) => {
      const newStack = withStack([...prevStack])

      const isOnTopOfStack = (modalId) => {
        if (newStack.length < 2) return true
        return newStack
          .map((m) => ({ id: m.id, shouldRender: m.shouldRender }))
          .reverse()
          .find((m) => m.shouldRender)?.id === modalId
      }

      newStack.forEach((modal, index) => {
        newStack[index].onTopOfStack = isOnTopOfStack(modal.id)
        newStack[index].getParentModal = () => {
          if (index < 1) return null
          return newStack.slice(0, index).reverse().find((m) => m.isOpen)
        }
        newStack[index].getChildModal = () => {
          if (index === newStack.length - 1) return null
          return newStack.slice(index + 1).find((m) => m.isOpen)
        }
      })

      return newStack
    })
  }

  useEffect(() => {
    localStackCopy = stack
  }, [stack])

  class Modal {
    constructor(component, response, config, onClose, afterLeave) {
      this.id = response.id ?? generateId()
      this.isOpen = false
      this.shouldRender = false
      this.listeners = {}

      this.component = component
      this.props = response.props
      this.response = response
      this.config = config ?? {}
      this.onCloseCallback = onClose
      this.afterLeaveCallback = afterLeave

      if (pendingModalUpdates[this.id]) {
        this.config = { ...this.config, ...(pendingModalUpdates[this.id].config ?? {}) }

        const pendingOnClose = pendingModalUpdates[this.id].onClose
        const pendingOnAfterLeave = pendingModalUpdates[this.id].onAfterLeave

        if (pendingOnClose) {
          this.onCloseCallback = onClose
            ? () => { onClose(); pendingOnClose() }
            : pendingOnClose
        }

        if (pendingOnAfterLeave) {
          this.afterLeaveCallback = afterLeave
            ? () => { afterLeave(); pendingOnAfterLeave() }
            : pendingOnAfterLeave
        }

        delete pendingModalUpdates[this.id]
      }

      this.index = -1
      this.getParentModal = () => null
      this.getChildModal = () => null
      this.onTopOfStack = true
    }

    static generateId() {
      if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
        return `inertiaui_modal_${crypto.randomUUID()}`
      }
      return `inertiaui_modal_${Date.now().toString(36)}_${Math.random().toString(36).substr(2, 9)}`
    }

    show = () => {
      updateStack((prev) =>
        prev.map((m) => {
          if (m.id === this.id && !m.isOpen) {
            m.isOpen = true
            m.shouldRender = true
          }
          return m
        })
      )
    }

    setOpen = (open) => (open ? this.show() : this.close())

    close = () => {
      updateStack((currentStack) => {
        let modalClosed = false
        const newStack = currentStack.map((m) => {
          if (m.id === this.id && m.isOpen) {
            Object.keys(m.listeners).forEach((e) => m.off(e))
            m.isOpen = false
            m.onCloseCallback?.()
            modalClosed = true
          }
          return m
        })
        return modalClosed ? newStack : currentStack
      })
    }

    afterLeave = () => {
      if (this.isOpen) return
      updateStack((prev) => {
        const updated = prev.map((m) => {
          if (m.id === this.id && !m.isOpen) {
            m.shouldRender = false
            m.afterLeaveCallback?.()
            m.afterLeaveCallback = null
          }
          return m
        })
        return this.index === 0 ? [] : updated
      })
    }

    on = (event, callback) => {
      event = kebabCase(event)
      this.listeners[event] = this.listeners[event] ?? []
      this.listeners[event].push(callback)
    }

    off = (event, callback) => {
      event = kebabCase(event)
      if (callback) {
        this.listeners[event] = this.listeners[event]?.filter((cb) => cb !== callback) ?? []
      } else {
        delete this.listeners[event]
      }
    }

    emit = (event, ...args) => {
      this.listeners[kebabCase(event)]?.forEach((cb) => cb(...args))
    }

    registerEventListenersFromProps = (props) => {
      const unsubscribers = []
      Object.keys(props)
        .filter((key) => key.startsWith('on'))
        .forEach((key) => {
          const eventName = kebabCase(key).replace(/^on-/, '')
          this.on(eventName, props[key])
          unsubscribers.push(() => this.off(eventName, props[key]))
        })
      return () => unsubscribers.forEach((u) => u())
    }

    reload = (options = {}) => {
      let keys = Object.keys(this.response.props)
      if (options.only) keys = options.only
      if (options.except) keys = except(keys, options.except)
      if (!this.response?.url) return

      const method = (options.method ?? 'get').toLowerCase()
      const data = options.data ?? {}

      options.onStart?.()

      Axios({
        url: this.response.url,
        method,
        data: method === 'get' ? {} : data,
        params: method === 'get' ? data : {},
        headers: {
          ...(options.headers ?? {}),
          Accept: 'text/html, application/xhtml+xml',
          'X-Inertia': true,
          'X-Inertia-Partial-Component': this.response.component,
          'X-Inertia-Version': this.response.version,
          'X-Inertia-Partial-Data': keys.join(','),
          'X-InertiaUI-Modal': generateId(),
          'X-InertiaUI-Modal-Use-Router': 0,
          'X-InertiaUI-Modal-Base-Url': baseUrl,
        },
      })
        .then((response) => {
          this.updateProps(response.data.props)
          options.onSuccess?.(response)
        })
        .catch((error) => {
          options.onError?.(error)
        })
        .finally(() => {
          options.onFinish?.()
        })
    }

    updateProps = (props) => {
      Object.assign(this.props, props)
      updateStack((prev) => prev) // Trigger re-render
    }
  }

  const pushFromResponseData = (responseData, config = {}, onClose = null, onAfterLeave = null) => {
    return resolveComponent(responseData.component).then((component) =>
      push(component, responseData, config, onClose, onAfterLeave)
    )
  }

  const loadDeferredProps = (modal) => {
    const deferred = modal.response?.meta?.deferredProps
    if (!deferred) return
    Object.keys(deferred).forEach((key) => {
      modal.reload({ only: deferred[key] })
    })
  }

  const push = (component, response, config, onClose, afterLeave) => {
    const newModal = new Modal(component, response, config, onClose, afterLeave)
    newModal.index = stack.length
    updateStack((prevStack) => [...prevStack, newModal])
    loadDeferredProps(newModal)
    newModal.show()
    return newModal
  }

  function pushLocalModal(name, config, onClose, afterLeave) {
    if (!localModals[name]) throw new Error(`The local modal "${name}" has not been registered.`)
    const modal = push(null, {}, config, onClose, afterLeave)
    modal.name = name
    localModals[name].callback(modal)
    return modal
  }

  const visitModal = (url, options = {}) =>
    visit(
      url,
      options.method ?? 'get',
      options.data ?? {},
      options.headers ?? {},
      options.config ?? {},
      options.onClose,
      options.onAfterLeave,
      options.queryStringArrayFormat ?? 'brackets',
      options.navigate ?? getConfig('navigate'),
      options.onStart,
      options.onSuccess,
      options.onError,
    ).then((modal) => {
      const listeners = options.listeners ?? {}
      Object.keys(listeners).forEach((event) => {
        const eventName = kebabCase(event)
        modal.on(eventName, listeners[event])
      })
      return modal
    })

  const visit = (
    href,
    method,
    payload = {},
    headers = {},
    config = {},
    onClose = null,
    onAfterLeave = null,
    queryStringArrayFormat = 'brackets',
    useBrowserHistory = false,
    onStart = null,
    onSuccess = null,
    onError = null,
  ) => {
    const modalId = generateId()

    return new Promise((resolve, reject) => {
      if (href.startsWith('#')) {
        resolve(pushLocalModal(href.substring(1), config, onClose, onAfterLeave))
        return
      }

      const [url, data] = mergeDataIntoQueryString(method, href || '', payload, queryStringArrayFormat)

      const useInertiaRouter = useBrowserHistory
      if (useBrowserHistory) {
        baseUrl = typeof window !== 'undefined' ? window.location.href : ''
      }

      headers = {
        ...headers,
        Accept: 'text/html, application/xhtml+xml',
        'X-Requested-With': 'XMLHttpRequest',
        'X-Inertia': true,
        'X-Inertia-Version': pageVersion,
        'X-InertiaUI-Modal': modalId,
        'X-InertiaUI-Modal-Use-Router': useInertiaRouter ? 1 : 0,
        'X-InertiaUI-Modal-Base-Url': baseUrl,
      }

      if (useInertiaRouter) {
        // queue resolver for the next modal that arrives via router
        router.visit(url, {
          method,
          data,
          headers,
          preserveScroll: true,
          preserveState: true,
          onError(...args) {
            onError?.(...args)
            reject(...args)
          },
          onStart(...args) {
            onStart?.(...args)
          },
          onSuccess(...args) {
            onSuccess?.(...args)
          },
          onBefore: () => {
            modalResolversQueue.push({
              resolve,
              pending: { config, onClose, onAfterLeave },
            })
          },
        })
        return
      }

      // XHR path (no router)
      onStart?.()

      const withProgress = (callback) => {
        try {
          InertiaReact.progress ? callback(InertiaReact.progress) : null
        } catch (e) {}
      }

      withProgress((progress) => progress.start())

      Axios({ url, method, data, headers })
        .then((response) => {
          onSuccess?.(response)
          resolve(pushFromResponseData(response.data, config, onClose, onAfterLeave))
        })
        .catch((...args) => {
          onError?.(...args)
          reject(...args)
        })
        .finally(() => {
          withProgress((progress) => progress.finish())
        })
    })
  }

  const registerLocalModal = (name, callback) => {
    setLocalModals((prev) => ({ ...prev, [name]: { name, callback } }))
  }

  const removeLocalModal = (name) => {
    setLocalModals((prev) => {
      const next = { ...prev }
      delete next[name]
      return next
    })
  }

  const value = {
    stack,
    localModals,
    push,
    pushFromResponseData,
    length: () => localStackCopy.length,
    closeAll: () => {
      localStackCopy.reverse().forEach((modal) => modal.close())
    },
    reset: () => updateStack(() => []),
    visit,
    visitModal,
    registerLocalModal,
    removeLocalModal,
    onModalOnBase: () => {}, // not needed with FIFO queue
  }

  return <ModalStackContext.Provider value={value}>{children}</ModalStackContext.Provider>
}

export const useModalStack = () => {
  const context = useContext(ModalStackContext)
  if (context === null) {
    throw new Error('useModalStack must be used within a ModalStackProvider')
  }
  return context
}

export const modalPropNames = ['closeButton', 'closeExplicitly', 'maxWidth', 'paddingClasses', 'panelClasses', 'position', 'slideover']

export const initFromPageProps = (pageProps) => {
  if (pageProps.initialPage) {
    pageVersion = pageProps.initialPage.version
  }
  if (pageProps.resolveComponent) {
    resolveComponent = pageProps.resolveComponent
  }
}

export const renderApp = (App, pageProps) => {
  initFromPageProps(pageProps)

  const renderInertiaApp = ({ Component, props, key }) => {
    const renderComponent = () => {
      const child = createElement(Component, { key, ...props })

      if (typeof Component.layout === 'function') {
        return Component.layout(child)
      }

      if (Array.isArray(Component.layout)) {
        const layouts = Component.layout
          .concat(child)
          .reverse()
          .reduce((children, Layout) => createElement(Layout, props, children))

        return layouts
      }

      return child
    }

    return (
      <>
        {renderComponent()}
        <ModalRoot />
      </>
    )
  }

  return (
    <ModalStackProvider>
      <App {...pageProps}>{renderInertiaApp}</App>
    </ModalStackProvider>
  )
}

export const ModalRoot = ({ children }) => {
  const context = useContext(ModalStackContext)
  const $page = usePage()

  let isNavigating = false
  let previousModalOnBase = false
  let initialModalStillOpened = $page.props?._inertiaui_modal ? true : false

  useEffect(() => router.on('start', () => (isNavigating = true)), [])
  useEffect(() => router.on('finish', () => (isNavigating = false)), [])

  useEffect(
    () =>
      router.on('navigate', function ($event) {
        const modalOnBase = $event.detail.page.props._inertiaui_modal

        if (!modalOnBase) {
          // No modal in the new page — close any open modals and drain queued resolvers.
          previousModalOnBase && context.closeAll()
          baseUrl = null
          initialModalStillOpened = false

          while (modalResolversQueue.length) {
            const item = modalResolversQueue.shift()
            try { item.resolve(null) } catch {}
          }
          return
        }

        previousModalOnBase = modalOnBase
        baseUrl = modalOnBase.baseUrl

        context
          .pushFromResponseData(modalOnBase, {}, () => {
            if (!modalOnBase.baseUrl) {
              console.error('No base url in modal response data so cannot navigate back')
              return
            }
            if (!isNavigating && typeof window !== 'undefined' && window.location.href !== modalOnBase.baseUrl) {
              router.visit(modalOnBase.baseUrl, {
                preserveScroll: true,
                preserveState: true,
              })
            }
          })
          .then((newModal) => {
            // Pair this modal with whoever queued resolve in visit(..., navigate: true)
            const item = modalResolversQueue.shift()
            if (!item) return

            const { resolve, pending } = item

            // Merge config & callbacks queued at visit-time
            if (pending?.config) {
              newModal.config = { ...(newModal.config || {}), ...pending.config }
            }
            if (pending?.onClose) {
              const prev = newModal.onCloseCallback
              newModal.onCloseCallback = prev ? () => { prev(); pending.onClose() } : pending.onClose
            }
            if (pending?.onAfterLeave) {
              const prev = newModal.afterLeaveCallback
              newModal.afterLeaveCallback = prev ? () => { prev(); pending.onAfterLeave() } : pending.onAfterLeave
            }

            resolve(newModal)
          })
      }),
    [],
  )

  const axiosRequestInterceptor = (config) => {
    // Ensure the server can redirect "back" to the base route from inside a modal.
    config.headers['X-InertiaUI-Modal-Base-Url'] =
      baseUrl ?? (initialModalStillOpened ? $page.props._inertiaui_modal?.baseUrl : null)

    return config
  }

  useEffect(() => {
    Axios.interceptors.request.use(axiosRequestInterceptor)
    return () => Axios.interceptors.request.eject(axiosRequestInterceptor)
  }, [])

  const previousModalRef = useRef()

  useEffect(() => {
    const newModal = $page.props?._inertiaui_modal
    const previousModal = previousModalRef.current

    previousModalRef.current = newModal

    if (
      newModal &&
      previousModal &&
      newModal.component === previousModal.component &&
      sameUrlPath(newModal.url, previousModal.url)
    ) {
      context.stack[0]?.updateProps(newModal.props ?? {})
    }
  }, [$page.props?._inertiaui_modal])

  return (
    <>
      {children}
      {context.stack.length > 0 && <ModalRenderer index={0} />}
    </>
  )
}

export const modalRouterHeaders = () => ({
  'X-InertiaUI-Modal-Use-Router': 1,
  'X-InertiaUI-Modal-Base-Url': baseUrl,
})
