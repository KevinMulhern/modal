import { useMemo, useState, forwardRef, useImperativeHandle, useEffect, useRef } from 'react'
import { getConfig, getConfigByType } from './config'
import { useModalIndex } from './ModalRenderer.jsx'
import { useModalStack } from './ModalRoot.jsx'
import ModalRenderer from './ModalRenderer'

const HeadlessModal = forwardRef(({ name, children, onFocus = null, onBlur = null, onClose = null, onSuccess = null, ...props }, ref) => {
    const modalIndex = useModalIndex()
    const { stack, registerLocalModal, removeLocalModal } = useModalStack()

    const [localModalContext, setLocalModalContext] = useState(null)
    const modalContext = useMemo(() => (name ? localModalContext : stack[modalIndex]), [name, localModalContext, modalIndex, stack])

    const nextIndex = useMemo(() => {
        if (!modalContext) return null
        return stack.find((m) => m.shouldRender && m.index > modalContext.index)?.index
    }, [modalContext, stack])

    const configSlideover = useMemo(
        () => modalContext?.config?.slideover ?? props.slideover ?? getConfig('type') === 'slideover',
        [props.slideover, modalContext?.config],
    )

    const config = useMemo(
        () => ({
            slideover: configSlideover,
            closeButton: props.closeButton ?? getConfigByType(configSlideover, 'closeButton'),
            closeExplicitly: props.closeExplicitly ?? getConfigByType(configSlideover, 'closeExplicitly'),
            maxWidth: props.maxWidth ?? getConfigByType(configSlideover, 'maxWidth'),
            paddingClasses: props.paddingClasses ?? getConfigByType(configSlideover, 'paddingClasses'),
            panelClasses: props.panelClasses ?? getConfigByType(configSlideover, 'panelClasses'),
            position: props.position ?? getConfigByType(configSlideover, 'position'),
            ...modalContext?.config,
        }),
        [props, configSlideover, modalContext?.config],
    )

    useEffect(() => {
        // Named / local modals
        if (name) {
            let removeListeners = null

            registerLocalModal(name, (localContext) => {
                if (!localContext) return
                removeListeners = localContext.registerEventListenersFromProps(props)
                setLocalModalContext(localContext)
            })

            return () => {
                removeListeners?.()
                removeListeners = null
                removeLocalModal(name)
            }
        }

        // Stack-based modal: if there's no modal yet (e.g. hard refresh),
        // just don't try to attach listeners.
        if (!modalContext) {
            return
        }

        return modalContext.registerEventListenersFromProps(props)
    }, [name, modalContext, props, registerLocalModal, removeLocalModal])

    // Store the latest modalContext in a ref to maintain reference
    const modalContextRef = useRef(modalContext)

    // Update the ref whenever modalContext changes
    useEffect(() => {
        modalContextRef.current = modalContext
    }, [modalContext])

    useEffect(() => {
        if (!modalContext) return
        modalContext.isOpen ? onSuccess?.() : onClose?.()
    }, [modalContext?.isOpen])

    const [rendered, setRendered] = useState(false)

    useEffect(() => {
        if (rendered && modalContext && modalContext.isOpen) {
            modalContext.onTopOfStack ? onFocus?.() : onBlur?.()
        }

        setRendered(true)
    }, [modalContext?.onTopOfStack, modalContext?.isOpen])

    useImperativeHandle(
        ref,
        () => ({
            afterLeave: () => modalContextRef.current?.afterLeave(),
            close: () => modalContextRef.current?.close(),
            emit: (...args) => modalContextRef.current?.emit(...args),
            getChildModal: () => modalContextRef.current?.getChildModal(),
            getParentModal: () => modalContextRef.current?.getParentModal(),
            reload: (...args) => modalContextRef.current?.reload(...args),
            setOpen: (...args) => modalContextRef.current?.setOpen(...args),

            get id() {
                return modalContextRef.current?.id
            },
            get index() {
                return modalContextRef.current?.index
            },
            get isOpen() {
                return modalContextRef.current?.isOpen
            },
            get config() {
                return modalContextRef.current?.config
            },
            get modalContext() {
                return modalContextRef.current
            },
            get onTopOfStack() {
                return modalContextRef.current?.onTopOfStack
            },
            get shouldRender() {
                return modalContextRef.current?.shouldRender
            },
        }),
        [],
    )

    // Hard guard: if there is no modalContext or it shouldn't render yet, render nothing.
    if (!modalContext || !modalContext.shouldRender) {
        return null
    }

    return (
        <>
            {typeof children === 'function'
                ? children({
                      afterLeave: modalContext.afterLeave,
                      close: modalContext.close,
                      config,
                      emit: modalContext.emit,
                      getChildModal: modalContext.getChildModal,
                      getParentModal: modalContext.getParentModal,
                      id: modalContext.id,
                      index: modalContext.index,
                      isOpen: modalContext.isOpen,
                      modalContext,
                      onTopOfStack: modalContext.onTopOfStack,
                      reload: modalContext.reload,
                      setOpen: modalContext.setOpen,
                      shouldRender: modalContext.shouldRender,
                  })
                : children}

            {/* Next modal in the stack (you still have the stack wiring in your fork) */}
            {nextIndex != null && <ModalRenderer index={nextIndex} />}
        </>
    )
})

HeadlessModal.displayName = 'HeadlessModal'
export default HeadlessModal
