var Ur = Object.defineProperty;
var Hr = (e, t, r) => t in e ? Ur(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var G = (e, t, r) => Hr(e, typeof t != "symbol" ? t + "" : t, r);
import * as Ae from "react";
import $, { createContext as X, useContext as H, useEffect as C, useRef as S, useState as F, createElement as Re, useMemo as _, forwardRef as Pt, useImperativeHandle as tr, useLayoutEffect as Vr, useCallback as W, Fragment as ue, isValidElement as Br, cloneElement as Xr, useId as _e, useSyncExternalStore as zr, useReducer as Gr, createRef as Kr } from "react";
import { jsxs as ve, Fragment as Lt, jsx as P } from "react/jsx-runtime";
import Ge from "axios";
import * as _t from "@inertiajs/react";
import { usePage as qr, router as Le } from "@inertiajs/react";
import { mergeDataIntoQueryString as Yr } from "@inertiajs/core";
import { createPortal as Zr } from "react-dom";
const Se = {
  type: "modal",
  navigate: !1,
  modal: {
    closeButton: !0,
    closeExplicitly: !1,
    maxWidth: "2xl",
    paddingClasses: "p-4 sm:p-6",
    panelClasses: "bg-white rounded",
    position: "center"
  },
  slideover: {
    closeButton: !0,
    closeExplicitly: !1,
    maxWidth: "md",
    paddingClasses: "p-4 sm:p-6",
    panelClasses: "bg-white min-h-screen",
    position: "right"
  }
};
class Qr {
  constructor() {
    this.config = {}, this.reset();
  }
  reset() {
    this.config = JSON.parse(JSON.stringify(Se));
  }
  put(t, r) {
    if (typeof t == "object") {
      this.config = {
        type: t.type ?? Se.type,
        navigate: t.navigate ?? Se.navigate,
        modal: { ...Se.modal, ...t.modal ?? {} },
        slideover: { ...Se.slideover, ...t.slideover ?? {} }
      };
      return;
    }
    const n = t.split(".");
    let l = this.config;
    for (let o = 0; o < n.length - 1; o++)
      l = l[n[o]] = l[n[o]] || {};
    l[n[n.length - 1]] = r;
  }
  get(t) {
    if (typeof t > "u")
      return this.config;
    const r = t.split(".");
    let n = this.config;
    for (const l of r) {
      if (n[l] === void 0)
        return null;
      n = n[l];
    }
    return n;
  }
}
const Qe = new Qr(), Po = () => Qe.reset(), Lo = (e, t) => Qe.put(e, t), Ct = (e) => Qe.get(e), ye = (e, t) => Qe.get(e ? `slideover.${t}` : `modal.${t}`);
function Jr(e, t) {
  const r = typeof window < "u" ? window.location.origin : "http://localhost";
  return e = typeof e == "string" ? new URL(e, r) : e, t = typeof t == "string" ? new URL(t, r) : t, `${e.origin}${e.pathname}` == `${t.origin}${t.pathname}`;
}
function ft(e = "inertiaui_modal_") {
  return typeof crypto < "u" && typeof crypto.randomUUID == "function" ? `${e}${crypto.randomUUID()}` : `${e}${Date.now().toString(36)}_${Math.random().toString(36).substr(2, 9)}`;
}
function be(e) {
  return typeof e == "string" ? e.toLowerCase() : e;
}
function en(e, t, r = !1) {
  return r && (t = t.map(be)), Array.isArray(e) ? e.filter((n) => !t.includes(r ? be(n) : n)) : Object.keys(e).reduce((n, l) => (t.includes(r ? be(l) : l) || (n[l] = e[l]), n), {});
}
function tn(e, t, r = !1) {
  return r && (t = t.map(be)), Array.isArray(e) ? e.filter((n) => t.includes(r ? be(n) : n)) : Object.keys(e).reduce((n, l) => (t.includes(r ? be(l) : l) && (n[l] = e[l]), n), {});
}
function rn(e) {
  return Array.isArray(e) ? e.filter((t) => t !== null) : Object.keys(e).reduce((t, r) => (r in e && e[r] !== null && (t[r] = e[r]), t), {});
}
function Te(e) {
  return e ? (e = e.replace(/_/g, "-"), e = e.replace(/-+/g, "-"), /[A-Z]/.test(e) ? (e = e.replace(/\s+/g, "").replace(/_/g, "").replace(/(?:^|\s|-)+([A-Za-z])/g, (t, r) => r.toUpperCase()), e = e.replace(/(.)(?=[A-Z])/g, "$1-"), e.toLowerCase()) : e) : "";
}
function nn(e) {
  if (typeof window < "u")
    return e.toLowerCase() in window;
  if (typeof document < "u") {
    const n = document.createElement("div");
    return e.toLowerCase() in n;
  }
  const t = e.toLowerCase();
  return [
    /^on(click|dblclick|mousedown|mouseup|mouseover|mouseout|mousemove|mouseenter|mouseleave)$/,
    /^on(keydown|keyup|keypress)$/,
    /^on(focus|blur|change|input|submit|reset)$/,
    /^on(load|unload|error|resize|scroll)$/,
    /^on(touchstart|touchend|touchmove|touchcancel)$/,
    /^on(pointerdown|pointerup|pointermove|pointerenter|pointerleave|pointercancel)$/,
    /^on(drag|dragstart|dragend|dragenter|dragleave|dragover|drop)$/,
    /^on(animationstart|animationend|animationiteration)$/,
    /^on(transitionstart|transitionend|transitionrun|transitioncancel)$/
  ].some((n) => n.test(t));
}
const Je = X(null);
Je.displayName = "ModalStackContext";
let rr = null, nr = null, pe = null, ze = [], mt = [], Pe = {};
const ln = ({ children: e }) => {
  const [t, r] = F([]), [n, l] = F({}), o = (h) => {
    r((c) => {
      const u = h([...c]), g = (y) => {
        var m;
        return u.length < 2 ? !0 : ((m = u.map((E) => ({ id: E.id, shouldRender: E.shouldRender })).reverse().find((E) => E.shouldRender)) == null ? void 0 : m.id) === y;
      };
      return u.forEach((y, m) => {
        u[m].onTopOfStack = g(y.id), u[m].getParentModal = () => m < 1 ? null : u.slice(0, m).reverse().find((E) => E.isOpen), u[m].getChildModal = () => m === u.length - 1 ? null : u.slice(m + 1).find((E) => E.isOpen);
      }), u;
    });
  };
  C(() => {
    mt = t;
  }, [t]);
  class a {
    constructor(c, u, g, y, m) {
      G(this, "show", () => {
        o(
          (c) => c.map((u) => (u.id === this.id && !u.isOpen && (u.isOpen = !0, u.shouldRender = !0), u))
        );
      });
      G(this, "setOpen", (c) => c ? this.show() : this.close());
      G(this, "close", () => {
        o((c) => {
          let u = !1;
          const g = c.map((y) => {
            var m;
            return y.id === this.id && y.isOpen && (Object.keys(y.listeners).forEach((E) => y.off(E)), y.isOpen = !1, (m = y.onCloseCallback) == null || m.call(y), u = !0), y;
          });
          return u ? g : c;
        });
      });
      G(this, "afterLeave", () => {
        this.isOpen || o((c) => {
          const u = c.map((g) => {
            var y;
            return g.id === this.id && !g.isOpen && (g.shouldRender = !1, (y = g.afterLeaveCallback) == null || y.call(g), g.afterLeaveCallback = null), g;
          });
          return this.index === 0 ? [] : u;
        });
      });
      G(this, "on", (c, u) => {
        c = Te(c), this.listeners[c] = this.listeners[c] ?? [], this.listeners[c].push(u);
      });
      G(this, "off", (c, u) => {
        var g;
        c = Te(c), u ? this.listeners[c] = ((g = this.listeners[c]) == null ? void 0 : g.filter((y) => y !== u)) ?? [] : delete this.listeners[c];
      });
      G(this, "emit", (c, ...u) => {
        var g;
        (g = this.listeners[Te(c)]) == null || g.forEach((y) => y(...u));
      });
      G(this, "registerEventListenersFromProps", (c) => {
        const u = [];
        return Object.keys(c).filter((g) => g.startsWith("on")).forEach((g) => {
          const y = Te(g).replace(/^on-/, "");
          this.on(y, c[g]), u.push(() => this.off(y, c[g]));
        }), () => u.forEach((g) => g());
      });
      G(this, "reload", (c = {}) => {
        var m, E;
        let u = Object.keys(this.response.props);
        if (c.only && (u = c.only), c.except && (u = en(u, c.except)), !((m = this.response) != null && m.url)) return;
        const g = (c.method ?? "get").toLowerCase(), y = c.data ?? {};
        (E = c.onStart) == null || E.call(c), Ge({
          url: this.response.url,
          method: g,
          data: g === "get" ? {} : y,
          params: g === "get" ? y : {},
          headers: {
            ...c.headers ?? {},
            Accept: "text/html, application/xhtml+xml",
            "X-Inertia": !0,
            "X-Inertia-Partial-Component": this.response.component,
            "X-Inertia-Version": this.response.version,
            "X-Inertia-Partial-Data": u.join(","),
            "X-InertiaUI-Modal": ft(),
            "X-InertiaUI-Modal-Use-Router": 0,
            "X-InertiaUI-Modal-Base-Url": pe
          }
        }).then((O) => {
          var N;
          this.updateProps(O.data.props), (N = c.onSuccess) == null || N.call(c, O);
        }).catch((O) => {
          var N;
          (N = c.onError) == null || N.call(c, O);
        }).finally(() => {
          var O;
          (O = c.onFinish) == null || O.call(c);
        });
      });
      G(this, "updateProps", (c) => {
        Object.assign(this.props, c), o((u) => u);
      });
      if (this.id = u.id ?? ft(), this.isOpen = !1, this.shouldRender = !1, this.listeners = {}, this.component = c, this.props = u.props, this.response = u, this.config = g ?? {}, this.onCloseCallback = y, this.afterLeaveCallback = m, Pe[this.id]) {
        this.config = { ...this.config, ...Pe[this.id].config ?? {} };
        const E = Pe[this.id].onClose, O = Pe[this.id].onAfterLeave;
        E && (this.onCloseCallback = y ? () => {
          y(), E();
        } : E), O && (this.afterLeaveCallback = m ? () => {
          m(), O();
        } : O), delete Pe[this.id];
      }
      this.index = -1, this.getParentModal = () => null, this.getChildModal = () => null, this.onTopOfStack = !0;
    }
    static generateId() {
      return typeof crypto < "u" && typeof crypto.randomUUID == "function" ? `inertiaui_modal_${crypto.randomUUID()}` : `inertiaui_modal_${Date.now().toString(36)}_${Math.random().toString(36).substr(2, 9)}`;
    }
  }
  const s = (h, c = {}, u = null, g = null) => nr(h.component).then(
    (y) => d(y, h, c, u, g)
  ), i = (h) => {
    var u, g;
    const c = (g = (u = h.response) == null ? void 0 : u.meta) == null ? void 0 : g.deferredProps;
    c && Object.keys(c).forEach((y) => {
      h.reload({ only: c[y] });
    });
  }, d = (h, c, u, g, y) => {
    const m = new a(h, c, u, g, y);
    return m.index = t.length, o((E) => [...E, m]), i(m), m.show(), m;
  };
  function p(h, c, u, g) {
    if (!n[h]) throw new Error(`The local modal "${h}" has not been registered.`);
    const y = d(null, {}, c, u, g);
    return y.name = h, n[h].callback(y), y;
  }
  const w = (h, c = {}) => v(
    h,
    c.method ?? "get",
    c.data ?? {},
    c.headers ?? {},
    c.config ?? {},
    c.onClose,
    c.onAfterLeave,
    c.queryStringArrayFormat ?? "brackets",
    c.navigate ?? Ct("navigate"),
    c.onStart,
    c.onSuccess,
    c.onError
  ).then((u) => {
    const g = c.listeners ?? {};
    return Object.keys(g).forEach((y) => {
      const m = Te(y);
      u.on(m, g[y]);
    }), u;
  }), v = (h, c, u = {}, g = {}, y = {}, m = null, E = null, O = "brackets", N = !1, D = null, A = null, I = null) => {
    const q = ft();
    return new Promise((R, M) => {
      if (h.startsWith("#")) {
        R(p(h.substring(1), y, m, E));
        return;
      }
      const [j, we] = Yr(c, h || "", u, O), ce = N;
      if (t.length === 0 && N && (pe = typeof window < "u" ? window.location.href : ""), g = {
        ...g,
        Accept: "text/html, application/xhtml+xml",
        "X-Requested-With": "XMLHttpRequest",
        "X-Inertia": !0,
        "X-Inertia-Version": rr,
        "X-InertiaUI-Modal": q,
        "X-InertiaUI-Modal-Use-Router": ce ? 1 : 0,
        "X-InertiaUI-Modal-Base-Url": pe
      }, ce) {
        Le.visit(j, {
          method: c,
          data: we,
          headers: g,
          preserveScroll: !0,
          preserveState: !0,
          onError(...k) {
            I == null || I(...k), M(...k);
          },
          onStart(...k) {
            D == null || D(...k);
          },
          onSuccess(...k) {
            A == null || A(...k);
          },
          onBefore: () => {
            ze.push({
              resolve: R,
              pending: { config: y, onClose: m, onAfterLeave: E }
            });
          }
        });
        return;
      }
      D == null || D();
      const J = (k) => {
        try {
          _t.progress && k(_t.progress);
        } catch {
        }
      };
      J((k) => k.start()), Ge({ url: j, method: c, data: we, headers: g }).then((k) => {
        A == null || A(k), R(s(k.data, y, m, E));
      }).catch((...k) => {
        I == null || I(...k), M(...k);
      }).finally(() => {
        J((k) => k.finish());
      });
    });
  }, x = {
    stack: t,
    localModals: n,
    push: d,
    pushFromResponseData: s,
    length: () => mt.length,
    closeAll: () => {
      mt.reverse().forEach((h) => h.close());
    },
    reset: () => o(() => []),
    visit: v,
    visitModal: w,
    registerLocalModal: (h, c) => {
      l((u) => ({ ...u, [h]: { name: h, callback: c } }));
    },
    removeLocalModal: (h) => {
      l((c) => {
        const u = { ...c };
        return delete u[h], u;
      });
    },
    onModalOnBase: () => {
    }
    // not needed with FIFO queue
  };
  return /* @__PURE__ */ P(Je.Provider, { value: x, children: e });
}, et = () => {
  const e = H(Je);
  if (e === null)
    throw new Error("useModalStack must be used within a ModalStackProvider");
  return e;
}, Dt = ["closeButton", "closeExplicitly", "maxWidth", "paddingClasses", "panelClasses", "position", "slideover"], on = (e) => {
  e.initialPage && (rr = e.initialPage.version), e.resolveComponent && (nr = e.resolveComponent);
}, Co = (e, t) => (on(t), /* @__PURE__ */ P(ln, { children: /* @__PURE__ */ P(e, { ...t, children: ({ Component: n, props: l, key: o }) => /* @__PURE__ */ ve(Lt, { children: [
  (() => {
    const s = Re(n, { key: o, ...l });
    return typeof n.layout == "function" ? n.layout(s) : Array.isArray(n.layout) ? n.layout.concat(s).reverse().reduce((d, p) => Re(p, l, d)) : s;
  })(),
  /* @__PURE__ */ P(an, {})
] }) }) })), an = ({ children: e }) => {
  var i, d;
  const t = H(Je), r = qr();
  let n = !1, l = !1, o = !!((i = r.props) != null && i._inertiaui_modal);
  C(() => Le.on("start", () => n = !0), []), C(() => Le.on("finish", () => n = !1), []), C(
    () => Le.on("navigate", function(p) {
      const w = p.detail.page.props._inertiaui_modal;
      if (!w) {
        for (l && t.closeAll(), pe = null, o = !1; ze.length; ) {
          const v = ze.shift();
          try {
            v.resolve(null);
          } catch {
          }
        }
        return;
      }
      l = w, pe = w.baseUrl, t.pushFromResponseData(w, {}, () => {
        if (!w.baseUrl) {
          console.error("No base url in modal response data so cannot navigate back");
          return;
        }
        !n && typeof window < "u" && window.location.href !== w.baseUrl && Le.visit(w.baseUrl, {
          preserveScroll: !0,
          preserveState: !0
        });
      }).then((v) => {
        const b = ze.shift();
        if (!b) return;
        const { resolve: f, pending: x } = b;
        if (x != null && x.config && (v.config = { ...v.config || {}, ...x.config }), x != null && x.onClose) {
          const h = v.onCloseCallback;
          v.onCloseCallback = h ? () => {
            h(), x.onClose();
          } : x.onClose;
        }
        if (x != null && x.onAfterLeave) {
          const h = v.afterLeaveCallback;
          v.afterLeaveCallback = h ? () => {
            h(), x.onAfterLeave();
          } : x.onAfterLeave;
        }
        f(v);
      });
    }),
    []
  );
  const a = (p) => {
    var w;
    return p.headers["X-InertiaUI-Modal-Base-Url"] = pe ?? (o ? (w = r.props._inertiaui_modal) == null ? void 0 : w.baseUrl : null), p;
  };
  C(() => (Ge.interceptors.request.use(a), () => Ge.interceptors.request.eject(a)), []);
  const s = S();
  return C(() => {
    var v, b;
    const p = (v = r.props) == null ? void 0 : v._inertiaui_modal, w = s.current;
    s.current = p, p && w && p.component === w.component && Jr(p.url, w.url) && ((b = t.stack[0]) == null || b.updateProps(p.props ?? {}));
  }, [(d = r.props) == null ? void 0 : d._inertiaui_modal]), /* @__PURE__ */ ve(Lt, { children: [
    e,
    t.stack.length > 0 && /* @__PURE__ */ P(or, { index: 0 })
  ] });
}, Mo = () => ({
  "X-InertiaUI-Modal-Use-Router": 1,
  "X-InertiaUI-Modal-Base-Url": pe
}), Mt = $.createContext(null);
Mt.displayName = "ModalIndexContext";
const lr = () => {
  const e = $.useContext(Mt);
  if (e === void 0)
    throw new Error("useModalIndex must be used within a ModalIndexProvider");
  return e;
}, or = ({ index: e }) => {
  const { stack: t } = et(), r = _(() => t[e], [t, e]);
  return (r == null ? void 0 : r.component) && /* @__PURE__ */ P(Mt.Provider, { value: e, children: /* @__PURE__ */ P(
    r.component,
    {
      ...r.props,
      onModalEvent: (...n) => r.emit(...n)
    }
  ) });
};
function ir() {
  return et().stack[lr()] ?? null;
}
const sn = ({ children: e, data: t, fallback: r }) => {
  if (!t)
    throw new Error("`<Deferred>` requires a `data` prop to be a string or array of strings");
  const [n, l] = F(!1), o = Array.isArray(t) ? t : [t], a = ir().props;
  return C(() => {
    l(o.every((s) => a[s] !== void 0));
  }, [a, o]), n ? e : r;
};
sn.displayName = "InertiaModalDeferred";
const ar = Pt(({ name: e, children: t, onFocus: r = null, onBlur: n = null, onClose: l = null, onSuccess: o = null, ...a }, s) => {
  const i = lr(), { stack: d, registerLocalModal: p, removeLocalModal: w } = et(), [v, b] = F(null), f = _(() => e ? v : d[i], [e, v, i, d]), x = _(() => {
    var m;
    return (m = d.find((E) => E.shouldRender && E.index > (f == null ? void 0 : f.index))) == null ? void 0 : m.index;
  }, [i, d]), h = _(() => (f == null ? void 0 : f.config.slideover) ?? a.slideover ?? Ct("type") === "slideover", [a.slideover]), c = _(
    () => ({
      slideover: h,
      closeButton: a.closeButton ?? ye(h, "closeButton"),
      closeExplicitly: a.closeExplicitly ?? ye(h, "closeExplicitly"),
      maxWidth: a.maxWidth ?? ye(h, "maxWidth"),
      paddingClasses: a.paddingClasses ?? ye(h, "paddingClasses"),
      panelClasses: a.panelClasses ?? ye(h, "panelClasses"),
      position: a.position ?? ye(h, "position"),
      ...f == null ? void 0 : f.config
    }),
    [a, f == null ? void 0 : f.config]
  );
  C(() => {
    if (e) {
      let m = null;
      return p(e, (E) => {
        m = E.registerEventListenersFromProps(a), b(E);
      }), () => {
        m == null || m(), m = null, w(e);
      };
    }
    return f.registerEventListenersFromProps(a);
  }, [e]);
  const u = S(f);
  C(() => {
    u.current = f;
  }, [f]), C(() => {
    f !== null && (f.isOpen ? o == null || o() : l == null || l());
  }, [f == null ? void 0 : f.isOpen]);
  const [g, y] = F(!1);
  return C(() => {
    g && f !== null && f.isOpen && (f.onTopOfStack ? r == null || r() : n == null || n()), y(!0);
  }, [f == null ? void 0 : f.onTopOfStack]), tr(
    s,
    () => ({
      afterLeave: () => {
        var m;
        return (m = u.current) == null ? void 0 : m.afterLeave();
      },
      close: () => {
        var m;
        return (m = u.current) == null ? void 0 : m.close();
      },
      emit: (...m) => {
        var E;
        return (E = u.current) == null ? void 0 : E.emit(...m);
      },
      getChildModal: () => {
        var m;
        return (m = u.current) == null ? void 0 : m.getChildModal();
      },
      getParentModal: () => {
        var m;
        return (m = u.current) == null ? void 0 : m.getParentModal();
      },
      reload: (...m) => {
        var E;
        return (E = u.current) == null ? void 0 : E.reload(...m);
      },
      setOpen: () => {
        var m;
        return (m = u.current) == null ? void 0 : m.setOpen();
      },
      get id() {
        var m;
        return (m = u.current) == null ? void 0 : m.id;
      },
      get index() {
        var m;
        return (m = u.current) == null ? void 0 : m.index;
      },
      get isOpen() {
        var m;
        return (m = u.current) == null ? void 0 : m.isOpen;
      },
      get config() {
        var m;
        return (m = u.current) == null ? void 0 : m.config;
      },
      get modalContext() {
        return u.current;
      },
      get onTopOfStack() {
        var m;
        return (m = u.current) == null ? void 0 : m.onTopOfStack;
      },
      get shouldRender() {
        var m;
        return (m = u.current) == null ? void 0 : m.shouldRender;
      }
    }),
    [f]
  ), (f == null ? void 0 : f.shouldRender) && /* @__PURE__ */ ve(Lt, { children: [
    typeof t == "function" ? t({
      afterLeave: f.afterLeave,
      close: f.close,
      config: c,
      emit: f.emit,
      getChildModal: f.getChildModal,
      getParentModal: f.getParentModal,
      id: f.id,
      index: f.index,
      isOpen: f.isOpen,
      modalContext: f,
      onTopOfStack: f.onTopOfStack,
      reload: f.reload,
      setOpen: f.setOpen,
      shouldRender: f.shouldRender
    }) : t,
    x && /* @__PURE__ */ P(or, { index: x })
  ] });
});
ar.displayName = "HeadlessModal";
function sr(e) {
  var t, r, n = "";
  if (typeof e == "string" || typeof e == "number") n += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var l = e.length;
    for (t = 0; t < l; t++) e[t] && (r = sr(e[t])) && (n && (n += " "), n += r);
  } else for (r in e) e[r] && (n && (n += " "), n += r);
  return n;
}
function Ke() {
  for (var e, t, r = 0, n = "", l = arguments.length; r < l; r++) (e = arguments[r]) && (t = sr(e)) && (n && (n += " "), n += t);
  return n;
}
var un = Object.defineProperty, cn = (e, t, r) => t in e ? un(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, pt = (e, t, r) => (cn(e, typeof t != "symbol" ? t + "" : t, r), r);
let dn = class {
  constructor() {
    pt(this, "current", this.detect()), pt(this, "handoffState", "pending"), pt(this, "currentId", 0);
  }
  set(t) {
    this.current !== t && (this.handoffState = "pending", this.currentId = 0, this.current = t);
  }
  reset() {
    this.set(this.detect());
  }
  nextId() {
    return ++this.currentId;
  }
  get isServer() {
    return this.current === "server";
  }
  get isClient() {
    return this.current === "client";
  }
  detect() {
    return typeof window > "u" || typeof document > "u" ? "server" : "client";
  }
  handoff() {
    this.handoffState === "pending" && (this.handoffState = "complete");
  }
  get isHandoffComplete() {
    return this.handoffState === "complete";
  }
}, Z = new dn();
function De(e) {
  var t;
  return Z.isServer ? null : e == null ? document : (t = e == null ? void 0 : e.ownerDocument) != null ? t : document;
}
function bt(e) {
  var t, r;
  return Z.isServer ? null : e == null ? document : (r = (t = e == null ? void 0 : e.getRootNode) == null ? void 0 : t.call(e)) != null ? r : document;
}
function ur(e) {
  var t, r;
  return (r = (t = bt(e)) == null ? void 0 : t.activeElement) != null ? r : null;
}
function fn(e) {
  return ur(e) === e;
}
function tt(e) {
  typeof queueMicrotask == "function" ? queueMicrotask(e) : Promise.resolve().then(e).catch((t) => setTimeout(() => {
    throw t;
  }));
}
function ne() {
  let e = [], t = { addEventListener(r, n, l, o) {
    return r.addEventListener(n, l, o), t.add(() => r.removeEventListener(n, l, o));
  }, requestAnimationFrame(...r) {
    let n = requestAnimationFrame(...r);
    return t.add(() => cancelAnimationFrame(n));
  }, nextFrame(...r) {
    return t.requestAnimationFrame(() => t.requestAnimationFrame(...r));
  }, setTimeout(...r) {
    let n = setTimeout(...r);
    return t.add(() => clearTimeout(n));
  }, microTask(...r) {
    let n = { current: !0 };
    return tt(() => {
      n.current && r[0]();
    }), t.add(() => {
      n.current = !1;
    });
  }, style(r, n, l) {
    let o = r.style.getPropertyValue(n);
    return Object.assign(r.style, { [n]: l }), this.add(() => {
      Object.assign(r.style, { [n]: o });
    });
  }, group(r) {
    let n = ne();
    return r(n), this.add(() => n.dispose());
  }, add(r) {
    return e.includes(r) || e.push(r), () => {
      let n = e.indexOf(r);
      if (n >= 0) for (let l of e.splice(n, 1)) l();
    };
  }, dispose() {
    for (let r of e.splice(0)) r();
  } };
  return t;
}
function rt() {
  let [e] = F(ne);
  return C(() => () => e.dispose(), [e]), e;
}
let U = (e, t) => {
  Z.isServer ? C(e, t) : Vr(e, t);
};
function ge(e) {
  let t = S(e);
  return U(() => {
    t.current = e;
  }, [e]), t;
}
let L = function(e) {
  let t = ge(e);
  return $.useCallback((...r) => t.current(...r), [t]);
};
function je(e) {
  return _(() => e, Object.values(e));
}
let mn = X(void 0);
function pn() {
  return H(mn);
}
function xt(...e) {
  return Array.from(new Set(e.flatMap((t) => typeof t == "string" ? t.split(" ") : []))).filter(Boolean).join(" ");
}
function re(e, t, ...r) {
  if (e in t) {
    let l = t[e];
    return typeof l == "function" ? l(...r) : l;
  }
  let n = new Error(`Tried to handle "${e}" but there is no handler defined. Only defined handlers are: ${Object.keys(t).map((l) => `"${l}"`).join(", ")}.`);
  throw Error.captureStackTrace && Error.captureStackTrace(n, re), n;
}
var qe = ((e) => (e[e.None = 0] = "None", e[e.RenderStrategy = 1] = "RenderStrategy", e[e.Static = 2] = "Static", e))(qe || {}), ie = ((e) => (e[e.Unmount = 0] = "Unmount", e[e.Hidden = 1] = "Hidden", e))(ie || {});
function z() {
  let e = vn();
  return W((t) => hn({ mergeRefs: e, ...t }), [e]);
}
function hn({ ourProps: e, theirProps: t, slot: r, defaultTag: n, features: l, visible: o = !0, name: a, mergeRefs: s }) {
  s = s ?? gn;
  let i = cr(t, e);
  if (o) return Ve(i, r, n, a, s);
  let d = l ?? 0;
  if (d & 2) {
    let { static: p = !1, ...w } = i;
    if (p) return Ve(w, r, n, a, s);
  }
  if (d & 1) {
    let { unmount: p = !0, ...w } = i;
    return re(p ? 0 : 1, { 0() {
      return null;
    }, 1() {
      return Ve({ ...w, hidden: !0, style: { display: "none" } }, r, n, a, s);
    } });
  }
  return Ve(i, r, n, a, s);
}
function Ve(e, t = {}, r, n, l) {
  let { as: o = r, children: a, refName: s = "ref", ...i } = ht(e, ["unmount", "static"]), d = e.ref !== void 0 ? { [s]: e.ref } : {}, p = typeof a == "function" ? a(t) : a;
  "className" in i && i.className && typeof i.className == "function" && (i.className = i.className(t)), i["aria-labelledby"] && i["aria-labelledby"] === i.id && (i["aria-labelledby"] = void 0);
  let w = {};
  if (t) {
    let v = !1, b = [];
    for (let [f, x] of Object.entries(t)) typeof x == "boolean" && (v = !0), x === !0 && b.push(f.replace(/([A-Z])/g, (h) => `-${h.toLowerCase()}`));
    if (v) {
      w["data-headlessui-state"] = b.join(" ");
      for (let f of b) w[`data-${f}`] = "";
    }
  }
  if (Fe(o) && (Object.keys(de(i)).length > 0 || Object.keys(de(w)).length > 0)) if (!Br(p) || Array.isArray(p) && p.length > 1 || yn(p)) {
    if (Object.keys(de(i)).length > 0) throw new Error(['Passing props on "Fragment"!', "", `The current component <${n} /> is rendering a "Fragment".`, "However we need to passthrough the following props:", Object.keys(de(i)).concat(Object.keys(de(w))).map((v) => `  - ${v}`).join(`
`), "", "You can apply a few solutions:", ['Add an `as="..."` prop, to ensure that we render an actual element instead of a "Fragment".', "Render a single element as the child so that we can forward the props onto that element."].map((v) => `  - ${v}`).join(`
`)].join(`
`));
  } else {
    let v = p.props, b = v == null ? void 0 : v.className, f = typeof b == "function" ? (...c) => xt(b(...c), i.className) : xt(b, i.className), x = f ? { className: f } : {}, h = cr(p.props, de(ht(i, ["ref"])));
    for (let c in w) c in h && delete w[c];
    return Xr(p, Object.assign({}, h, w, d, { ref: l(wn(p), d.ref) }, x));
  }
  return Re(o, Object.assign({}, ht(i, ["ref"]), !Fe(o) && d, !Fe(o) && w), p);
}
function vn() {
  let e = S([]), t = W((r) => {
    for (let n of e.current) n != null && (typeof n == "function" ? n(r) : n.current = r);
  }, []);
  return (...r) => {
    if (!r.every((n) => n == null)) return e.current = r, t;
  };
}
function gn(...e) {
  return e.every((t) => t == null) ? void 0 : (t) => {
    for (let r of e) r != null && (typeof r == "function" ? r(t) : r.current = t);
  };
}
function cr(...e) {
  if (e.length === 0) return {};
  if (e.length === 1) return e[0];
  let t = {}, r = {};
  for (let n of e) for (let l in n) l.startsWith("on") && typeof n[l] == "function" ? (r[l] != null || (r[l] = []), r[l].push(n[l])) : t[l] = n[l];
  if (t.disabled || t["aria-disabled"]) for (let n in r) /^(on(?:Click|Pointer|Mouse|Key)(?:Down|Up|Press)?)$/.test(n) && (r[n] = [(l) => {
    var o;
    return (o = l == null ? void 0 : l.preventDefault) == null ? void 0 : o.call(l);
  }]);
  for (let n in r) Object.assign(t, { [n](l, ...o) {
    let a = r[n];
    for (let s of a) {
      if ((l instanceof Event || (l == null ? void 0 : l.nativeEvent) instanceof Event) && l.defaultPrevented) return;
      s(l, ...o);
    }
  } });
  return t;
}
function V(e) {
  var t;
  return Object.assign(Pt(e), { displayName: (t = e.displayName) != null ? t : e.name });
}
function de(e) {
  let t = Object.assign({}, e);
  for (let r in t) t[r] === void 0 && delete t[r];
  return t;
}
function ht(e, t = []) {
  let r = Object.assign({}, e);
  for (let n of t) n in r && delete r[n];
  return r;
}
function wn(e) {
  return $.version.split(".")[0] >= "19" ? e.props.ref : e.ref;
}
function Fe(e) {
  return e === ue || e === Symbol.for("react.fragment");
}
function yn(e) {
  return Fe(e.type);
}
let bn = "span";
var Ye = ((e) => (e[e.None = 1] = "None", e[e.Focusable = 2] = "Focusable", e[e.Hidden = 4] = "Hidden", e))(Ye || {});
function xn(e, t) {
  var r;
  let { features: n = 1, ...l } = e, o = { ref: t, "aria-hidden": (n & 2) === 2 ? !0 : (r = l["aria-hidden"]) != null ? r : void 0, hidden: (n & 4) === 4 ? !0 : void 0, style: { position: "fixed", top: 1, left: 1, width: 1, height: 0, padding: 0, margin: -1, overflow: "hidden", clip: "rect(0, 0, 0, 0)", whiteSpace: "nowrap", borderWidth: "0", ...(n & 4) === 4 && (n & 2) !== 2 && { display: "none" } } };
  return z()({ ourProps: o, theirProps: l, slot: {}, defaultTag: bn, name: "Hidden" });
}
let Et = V(xn);
function En(e) {
  return typeof e != "object" || e === null ? !1 : "nodeType" in e;
}
function se(e) {
  return En(e) && "tagName" in e;
}
function he(e) {
  return se(e) && "accessKey" in e;
}
function ae(e) {
  return se(e) && "tabIndex" in e;
}
function $n(e) {
  return se(e) && "style" in e;
}
function On(e) {
  return he(e) && e.nodeName === "IFRAME";
}
function Sn(e) {
  return he(e) && e.nodeName === "INPUT";
}
let dr = Symbol();
function Tn(e, t = !0) {
  return Object.assign(e, { [dr]: t });
}
function Q(...e) {
  let t = S(e);
  C(() => {
    t.current = e;
  }, [e]);
  let r = L((n) => {
    for (let l of t.current) l != null && (typeof l == "function" ? l(n) : l.current = n);
  });
  return e.every((n) => n == null || (n == null ? void 0 : n[dr])) ? void 0 : r;
}
let kt = X(null);
kt.displayName = "DescriptionContext";
function fr() {
  let e = H(kt);
  if (e === null) {
    let t = new Error("You used a <Description /> component, but it is not inside a relevant parent.");
    throw Error.captureStackTrace && Error.captureStackTrace(t, fr), t;
  }
  return e;
}
function Pn() {
  let [e, t] = F([]);
  return [e.length > 0 ? e.join(" ") : void 0, _(() => function(r) {
    let n = L((o) => (t((a) => [...a, o]), () => t((a) => {
      let s = a.slice(), i = s.indexOf(o);
      return i !== -1 && s.splice(i, 1), s;
    }))), l = _(() => ({ register: n, slot: r.slot, name: r.name, props: r.props, value: r.value }), [n, r.slot, r.name, r.props, r.value]);
    return $.createElement(kt.Provider, { value: l }, r.children);
  }, [t])];
}
let Ln = "p";
function Cn(e, t) {
  let r = _e(), n = pn(), { id: l = `headlessui-description-${r}`, ...o } = e, a = fr(), s = Q(t);
  U(() => a.register(l), [l, a.register]);
  let i = je({ ...a.slot, disabled: n || !1 }), d = { ref: s, ...a.props, id: l };
  return z()({ ourProps: d, theirProps: o, slot: i, defaultTag: Ln, name: a.name || "Description" });
}
let Mn = V(Cn), kn = Object.assign(Mn, {});
var mr = ((e) => (e.Space = " ", e.Enter = "Enter", e.Escape = "Escape", e.Backspace = "Backspace", e.Delete = "Delete", e.ArrowLeft = "ArrowLeft", e.ArrowUp = "ArrowUp", e.ArrowRight = "ArrowRight", e.ArrowDown = "ArrowDown", e.Home = "Home", e.End = "End", e.PageUp = "PageUp", e.PageDown = "PageDown", e.Tab = "Tab", e))(mr || {});
let An = X(() => {
});
function Fn({ value: e, children: t }) {
  return $.createElement(An.Provider, { value: e }, t);
}
let pr = class extends Map {
  constructor(t) {
    super(), this.factory = t;
  }
  get(t) {
    let r = super.get(t);
    return r === void 0 && (r = this.factory(t), this.set(t, r)), r;
  }
};
var Nn = Object.defineProperty, In = (e, t, r) => t in e ? Nn(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, Rn = (e, t, r) => (In(e, t + "", r), r), hr = (e, t, r) => {
  if (!t.has(e)) throw TypeError("Cannot " + r);
}, B = (e, t, r) => (hr(e, t, "read from private field"), r ? r.call(e) : t.get(e)), vt = (e, t, r) => {
  if (t.has(e)) throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(e) : t.set(e, r);
}, jt = (e, t, r, n) => (hr(e, t, "write to private field"), t.set(e, r), r), Y, Ce, Me;
let _n = class {
  constructor(t) {
    vt(this, Y, {}), vt(this, Ce, new pr(() => /* @__PURE__ */ new Set())), vt(this, Me, /* @__PURE__ */ new Set()), Rn(this, "disposables", ne()), jt(this, Y, t), Z.isServer && this.disposables.microTask(() => {
      this.dispose();
    });
  }
  dispose() {
    this.disposables.dispose();
  }
  get state() {
    return B(this, Y);
  }
  subscribe(t, r) {
    if (Z.isServer) return () => {
    };
    let n = { selector: t, callback: r, current: t(B(this, Y)) };
    return B(this, Me).add(n), this.disposables.add(() => {
      B(this, Me).delete(n);
    });
  }
  on(t, r) {
    return Z.isServer ? () => {
    } : (B(this, Ce).get(t).add(r), this.disposables.add(() => {
      B(this, Ce).get(t).delete(r);
    }));
  }
  send(t) {
    let r = this.reduce(B(this, Y), t);
    if (r !== B(this, Y)) {
      jt(this, Y, r);
      for (let n of B(this, Me)) {
        let l = n.selector(B(this, Y));
        vr(n.current, l) || (n.current = l, n.callback(l));
      }
      for (let n of B(this, Ce).get(t.type)) n(B(this, Y), t);
    }
  }
};
Y = /* @__PURE__ */ new WeakMap(), Ce = /* @__PURE__ */ new WeakMap(), Me = /* @__PURE__ */ new WeakMap();
function vr(e, t) {
  return Object.is(e, t) ? !0 : typeof e != "object" || e === null || typeof t != "object" || t === null ? !1 : Array.isArray(e) && Array.isArray(t) ? e.length !== t.length ? !1 : gt(e[Symbol.iterator](), t[Symbol.iterator]()) : e instanceof Map && t instanceof Map || e instanceof Set && t instanceof Set ? e.size !== t.size ? !1 : gt(e.entries(), t.entries()) : Wt(e) && Wt(t) ? gt(Object.entries(e)[Symbol.iterator](), Object.entries(t)[Symbol.iterator]()) : !1;
}
function gt(e, t) {
  do {
    let r = e.next(), n = t.next();
    if (r.done && n.done) return !0;
    if (r.done || n.done || !Object.is(r.value, n.value)) return !1;
  } while (!0);
}
function Wt(e) {
  if (Object.prototype.toString.call(e) !== "[object Object]") return !1;
  let t = Object.getPrototypeOf(e);
  return t === null || Object.getPrototypeOf(t) === null;
}
var Dn = Object.defineProperty, jn = (e, t, r) => t in e ? Dn(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, Ut = (e, t, r) => (jn(e, typeof t != "symbol" ? t + "" : t, r), r), Wn = ((e) => (e[e.Push = 0] = "Push", e[e.Pop = 1] = "Pop", e))(Wn || {});
let Un = { 0(e, t) {
  let r = t.id, n = e.stack, l = e.stack.indexOf(r);
  if (l !== -1) {
    let o = e.stack.slice();
    return o.splice(l, 1), o.push(r), n = o, { ...e, stack: n };
  }
  return { ...e, stack: [...e.stack, r] };
}, 1(e, t) {
  let r = t.id, n = e.stack.indexOf(r);
  if (n === -1) return e;
  let l = e.stack.slice();
  return l.splice(n, 1), { ...e, stack: l };
} }, Hn = class gr extends _n {
  constructor() {
    super(...arguments), Ut(this, "actions", { push: (t) => this.send({ type: 0, id: t }), pop: (t) => this.send({ type: 1, id: t }) }), Ut(this, "selectors", { isTop: (t, r) => t.stack[t.stack.length - 1] === r, inStack: (t, r) => t.stack.includes(r) });
  }
  static new() {
    return new gr({ stack: [] });
  }
  reduce(t, r) {
    return re(r.type, Un, t, r);
  }
};
const wr = new pr(() => Hn.new());
var Be = { exports: {} }, wt = {};
/**
 * @license React
 * use-sync-external-store-with-selector.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ht;
function Vn() {
  if (Ht) return wt;
  Ht = 1;
  var e = $;
  function t(i, d) {
    return i === d && (i !== 0 || 1 / i === 1 / d) || i !== i && d !== d;
  }
  var r = typeof Object.is == "function" ? Object.is : t, n = e.useSyncExternalStore, l = e.useRef, o = e.useEffect, a = e.useMemo, s = e.useDebugValue;
  return wt.useSyncExternalStoreWithSelector = function(i, d, p, w, v) {
    var b = l(null);
    if (b.current === null) {
      var f = { hasValue: !1, value: null };
      b.current = f;
    } else f = b.current;
    b = a(
      function() {
        function h(m) {
          if (!c) {
            if (c = !0, u = m, m = w(m), v !== void 0 && f.hasValue) {
              var E = f.value;
              if (v(E, m))
                return g = E;
            }
            return g = m;
          }
          if (E = g, r(u, m)) return E;
          var O = w(m);
          return v !== void 0 && v(E, O) ? (u = m, E) : (u = m, g = O);
        }
        var c = !1, u, g, y = p === void 0 ? null : p;
        return [
          function() {
            return h(d());
          },
          y === null ? void 0 : function() {
            return h(y());
          }
        ];
      },
      [d, p, w, v]
    );
    var x = n(i, b[0], b[1]);
    return o(
      function() {
        f.hasValue = !0, f.value = x;
      },
      [x]
    ), s(x), x;
  }, wt;
}
var yt = {};
/**
 * @license React
 * use-sync-external-store-with-selector.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Vt;
function Bn() {
  return Vt || (Vt = 1, process.env.NODE_ENV !== "production" && (function() {
    function e(i, d) {
      return i === d && (i !== 0 || 1 / i === 1 / d) || i !== i && d !== d;
    }
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
    var t = $, r = typeof Object.is == "function" ? Object.is : e, n = t.useSyncExternalStore, l = t.useRef, o = t.useEffect, a = t.useMemo, s = t.useDebugValue;
    yt.useSyncExternalStoreWithSelector = function(i, d, p, w, v) {
      var b = l(null);
      if (b.current === null) {
        var f = { hasValue: !1, value: null };
        b.current = f;
      } else f = b.current;
      b = a(
        function() {
          function h(m) {
            if (!c) {
              if (c = !0, u = m, m = w(m), v !== void 0 && f.hasValue) {
                var E = f.value;
                if (v(E, m))
                  return g = E;
              }
              return g = m;
            }
            if (E = g, r(u, m))
              return E;
            var O = w(m);
            return v !== void 0 && v(E, O) ? (u = m, E) : (u = m, g = O);
          }
          var c = !1, u, g, y = p === void 0 ? null : p;
          return [
            function() {
              return h(d());
            },
            y === null ? void 0 : function() {
              return h(y());
            }
          ];
        },
        [d, p, w, v]
      );
      var x = n(i, b[0], b[1]);
      return o(
        function() {
          f.hasValue = !0, f.value = x;
        },
        [x]
      ), s(x), x;
    }, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
  })()), yt;
}
var Bt;
function Xn() {
  return Bt || (Bt = 1, process.env.NODE_ENV === "production" ? Be.exports = Vn() : Be.exports = Bn()), Be.exports;
}
var zn = Xn();
function yr(e, t, r = vr) {
  return zn.useSyncExternalStoreWithSelector(L((n) => e.subscribe(Gn, n)), L(() => e.state), L(() => e.state), L(t), r);
}
function Gn(e) {
  return e;
}
function We(e, t) {
  let r = _e(), n = wr.get(t), [l, o] = yr(n, W((a) => [n.selectors.isTop(a, r), n.selectors.inStack(a, r)], [n, r]));
  return U(() => {
    if (e) return n.actions.push(r), () => n.actions.pop(r);
  }, [n, e, r]), e ? o ? l : !0 : !1;
}
let $t = /* @__PURE__ */ new Map(), Ne = /* @__PURE__ */ new Map();
function Xt(e) {
  var t;
  let r = (t = Ne.get(e)) != null ? t : 0;
  return Ne.set(e, r + 1), r !== 0 ? () => zt(e) : ($t.set(e, { "aria-hidden": e.getAttribute("aria-hidden"), inert: e.inert }), e.setAttribute("aria-hidden", "true"), e.inert = !0, () => zt(e));
}
function zt(e) {
  var t;
  let r = (t = Ne.get(e)) != null ? t : 1;
  if (r === 1 ? Ne.delete(e) : Ne.set(e, r - 1), r !== 1) return;
  let n = $t.get(e);
  n && (n["aria-hidden"] === null ? e.removeAttribute("aria-hidden") : e.setAttribute("aria-hidden", n["aria-hidden"]), e.inert = n.inert, $t.delete(e));
}
function Kn(e, { allowed: t, disallowed: r } = {}) {
  let n = We(e, "inert-others");
  U(() => {
    var l, o;
    if (!n) return;
    let a = ne();
    for (let i of (l = r == null ? void 0 : r()) != null ? l : []) i && a.add(Xt(i));
    let s = (o = t == null ? void 0 : t()) != null ? o : [];
    for (let i of s) {
      if (!i) continue;
      let d = De(i);
      if (!d) continue;
      let p = i.parentElement;
      for (; p && p !== d.body; ) {
        for (let w of p.children) s.some((v) => w.contains(v)) || a.add(Xt(w));
        p = p.parentElement;
      }
    }
    return a.dispose;
  }, [n, t, r]);
}
function qn(e, t, r) {
  let n = ge((l) => {
    let o = l.getBoundingClientRect();
    o.x === 0 && o.y === 0 && o.width === 0 && o.height === 0 && r();
  });
  C(() => {
    if (!e) return;
    let l = t === null ? null : he(t) ? t : t.current;
    if (!l) return;
    let o = ne();
    if (typeof ResizeObserver < "u") {
      let a = new ResizeObserver(() => n.current(l));
      a.observe(l), o.add(() => a.disconnect());
    }
    if (typeof IntersectionObserver < "u") {
      let a = new IntersectionObserver(() => n.current(l));
      a.observe(l), o.add(() => a.disconnect());
    }
    return () => o.dispose();
  }, [t, n, e]);
}
let Ze = ["[contentEditable=true]", "[tabindex]", "a[href]", "area[href]", "button:not([disabled])", "iframe", "input:not([disabled])", "select:not([disabled])", "details>summary", "textarea:not([disabled])"].map((e) => `${e}:not([tabindex='-1'])`).join(","), Yn = ["[data-autofocus]"].map((e) => `${e}:not([tabindex='-1'])`).join(",");
var ee = ((e) => (e[e.First = 1] = "First", e[e.Previous = 2] = "Previous", e[e.Next = 4] = "Next", e[e.Last = 8] = "Last", e[e.WrapAround = 16] = "WrapAround", e[e.NoScroll = 32] = "NoScroll", e[e.AutoFocus = 64] = "AutoFocus", e))(ee || {}), Ot = ((e) => (e[e.Error = 0] = "Error", e[e.Overflow = 1] = "Overflow", e[e.Success = 2] = "Success", e[e.Underflow = 3] = "Underflow", e))(Ot || {}), Zn = ((e) => (e[e.Previous = -1] = "Previous", e[e.Next = 1] = "Next", e))(Zn || {});
function Qn(e = document.body) {
  return e == null ? [] : Array.from(e.querySelectorAll(Ze)).sort((t, r) => Math.sign((t.tabIndex || Number.MAX_SAFE_INTEGER) - (r.tabIndex || Number.MAX_SAFE_INTEGER)));
}
function Jn(e = document.body) {
  return e == null ? [] : Array.from(e.querySelectorAll(Yn)).sort((t, r) => Math.sign((t.tabIndex || Number.MAX_SAFE_INTEGER) - (r.tabIndex || Number.MAX_SAFE_INTEGER)));
}
var br = ((e) => (e[e.Strict = 0] = "Strict", e[e.Loose = 1] = "Loose", e))(br || {});
function el(e, t = 0) {
  var r;
  return e === ((r = De(e)) == null ? void 0 : r.body) ? !1 : re(t, { 0() {
    return e.matches(Ze);
  }, 1() {
    let n = e;
    for (; n !== null; ) {
      if (n.matches(Ze)) return !0;
      n = n.parentElement;
    }
    return !1;
  } });
}
var tl = ((e) => (e[e.Keyboard = 0] = "Keyboard", e[e.Mouse = 1] = "Mouse", e))(tl || {});
typeof window < "u" && typeof document < "u" && (document.addEventListener("keydown", (e) => {
  e.metaKey || e.altKey || e.ctrlKey || (document.documentElement.dataset.headlessuiFocusVisible = "");
}, !0), document.addEventListener("click", (e) => {
  e.detail === 1 ? delete document.documentElement.dataset.headlessuiFocusVisible : e.detail === 0 && (document.documentElement.dataset.headlessuiFocusVisible = "");
}, !0));
function te(e) {
  e == null || e.focus({ preventScroll: !0 });
}
let rl = ["textarea", "input"].join(",");
function nl(e) {
  var t, r;
  return (r = (t = e == null ? void 0 : e.matches) == null ? void 0 : t.call(e, rl)) != null ? r : !1;
}
function ll(e, t = (r) => r) {
  return e.slice().sort((r, n) => {
    let l = t(r), o = t(n);
    if (l === null || o === null) return 0;
    let a = l.compareDocumentPosition(o);
    return a & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : a & Node.DOCUMENT_POSITION_PRECEDING ? 1 : 0;
  });
}
function Ie(e, t, { sorted: r = !0, relativeTo: n = null, skipElements: l = [] } = {}) {
  let o = Array.isArray(e) ? e.length > 0 ? bt(e[0]) : document : bt(e), a = Array.isArray(e) ? r ? ll(e) : e : t & 64 ? Jn(e) : Qn(e);
  l.length > 0 && a.length > 1 && (a = a.filter((b) => !l.some((f) => f != null && "current" in f ? (f == null ? void 0 : f.current) === b : f === b))), n = n ?? (o == null ? void 0 : o.activeElement);
  let s = (() => {
    if (t & 5) return 1;
    if (t & 10) return -1;
    throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last");
  })(), i = (() => {
    if (t & 1) return 0;
    if (t & 2) return Math.max(0, a.indexOf(n)) - 1;
    if (t & 4) return Math.max(0, a.indexOf(n)) + 1;
    if (t & 8) return a.length - 1;
    throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last");
  })(), d = t & 32 ? { preventScroll: !0 } : {}, p = 0, w = a.length, v;
  do {
    if (p >= w || p + w <= 0) return 0;
    let b = i + p;
    if (t & 16) b = (b + w) % w;
    else {
      if (b < 0) return 3;
      if (b >= w) return 1;
    }
    v = a[b], v == null || v.focus(d), p += s;
  } while (v !== ur(v));
  return t & 6 && nl(v) && v.select(), 2;
}
function xr() {
  return /iPhone/gi.test(window.navigator.platform) || /Mac/gi.test(window.navigator.platform) && window.navigator.maxTouchPoints > 0;
}
function ol() {
  return /Android/gi.test(window.navigator.userAgent);
}
function Gt() {
  return xr() || ol();
}
function Xe(e, t, r, n) {
  let l = ge(r);
  C(() => {
    if (!e) return;
    function o(a) {
      l.current(a);
    }
    return document.addEventListener(t, o, n), () => document.removeEventListener(t, o, n);
  }, [e, t, n]);
}
function Er(e, t, r, n) {
  let l = ge(r);
  C(() => {
    if (!e) return;
    function o(a) {
      l.current(a);
    }
    return window.addEventListener(t, o, n), () => window.removeEventListener(t, o, n);
  }, [e, t, n]);
}
const Kt = 30;
function il(e, t, r) {
  let n = ge(r), l = W(function(s, i) {
    if (s.defaultPrevented) return;
    let d = i(s);
    if (d === null || !d.getRootNode().contains(d) || !d.isConnected) return;
    let p = (function w(v) {
      return typeof v == "function" ? w(v()) : Array.isArray(v) || v instanceof Set ? v : [v];
    })(t);
    for (let w of p) if (w !== null && (w.contains(d) || s.composed && s.composedPath().includes(w))) return;
    return !el(d, br.Loose) && d.tabIndex !== -1 && s.preventDefault(), n.current(s, d);
  }, [n, t]), o = S(null);
  Xe(e, "pointerdown", (s) => {
    var i, d;
    Gt() || (o.current = ((d = (i = s.composedPath) == null ? void 0 : i.call(s)) == null ? void 0 : d[0]) || s.target);
  }, !0), Xe(e, "pointerup", (s) => {
    if (Gt() || !o.current) return;
    let i = o.current;
    return o.current = null, l(s, () => i);
  }, !0);
  let a = S({ x: 0, y: 0 });
  Xe(e, "touchstart", (s) => {
    a.current.x = s.touches[0].clientX, a.current.y = s.touches[0].clientY;
  }, !0), Xe(e, "touchend", (s) => {
    let i = { x: s.changedTouches[0].clientX, y: s.changedTouches[0].clientY };
    if (!(Math.abs(i.x - a.current.x) >= Kt || Math.abs(i.y - a.current.y) >= Kt)) return l(s, () => ae(s.target) ? s.target : null);
  }, !0), Er(e, "blur", (s) => l(s, () => On(window.document.activeElement) ? window.document.activeElement : null), !0);
}
function At(...e) {
  return _(() => De(...e), [...e]);
}
function $r(e, t, r, n) {
  let l = ge(r);
  C(() => {
    e = e ?? window;
    function o(a) {
      l.current(a);
    }
    return e.addEventListener(t, o, n), () => e.removeEventListener(t, o, n);
  }, [e, t, n]);
}
function al(e) {
  return zr(e.subscribe, e.getSnapshot, e.getSnapshot);
}
function sl(e, t) {
  let r = e(), n = /* @__PURE__ */ new Set();
  return { getSnapshot() {
    return r;
  }, subscribe(l) {
    return n.add(l), () => n.delete(l);
  }, dispatch(l, ...o) {
    let a = t[l].call(r, ...o);
    a && (r = a, n.forEach((s) => s()));
  } };
}
function ul() {
  let e;
  return { before({ doc: t }) {
    var r;
    let n = t.documentElement, l = (r = t.defaultView) != null ? r : window;
    e = Math.max(0, l.innerWidth - n.clientWidth);
  }, after({ doc: t, d: r }) {
    let n = t.documentElement, l = Math.max(0, n.clientWidth - n.offsetWidth), o = Math.max(0, e - l);
    r.style(n, "paddingRight", `${o}px`);
  } };
}
function cl() {
  return xr() ? { before({ doc: e, d: t, meta: r }) {
    function n(l) {
      for (let o of r().containers) for (let a of o()) if (a.contains(l)) return !0;
      return !1;
    }
    t.microTask(() => {
      var l;
      if (window.getComputedStyle(e.documentElement).scrollBehavior !== "auto") {
        let s = ne();
        s.style(e.documentElement, "scrollBehavior", "auto"), t.add(() => t.microTask(() => s.dispose()));
      }
      let o = (l = window.scrollY) != null ? l : window.pageYOffset, a = null;
      t.addEventListener(e, "click", (s) => {
        if (ae(s.target)) try {
          let i = s.target.closest("a");
          if (!i) return;
          let { hash: d } = new URL(i.href), p = e.querySelector(d);
          ae(p) && !n(p) && (a = p);
        } catch {
        }
      }, !0), t.group((s) => {
        t.addEventListener(e, "touchstart", (i) => {
          if (s.dispose(), ae(i.target) && $n(i.target)) if (n(i.target)) {
            let d = i.target;
            for (; d.parentElement && n(d.parentElement); ) d = d.parentElement;
            s.style(d, "overscrollBehavior", "contain");
          } else s.style(i.target, "touchAction", "none");
        });
      }), t.addEventListener(e, "touchmove", (s) => {
        if (ae(s.target)) {
          if (Sn(s.target)) return;
          if (n(s.target)) {
            let i = s.target;
            for (; i.parentElement && i.dataset.headlessuiPortal !== "" && !(i.scrollHeight > i.clientHeight || i.scrollWidth > i.clientWidth); ) i = i.parentElement;
            i.dataset.headlessuiPortal === "" && s.preventDefault();
          } else s.preventDefault();
        }
      }, { passive: !1 }), t.add(() => {
        var s;
        let i = (s = window.scrollY) != null ? s : window.pageYOffset;
        o !== i && window.scrollTo(0, o), a && a.isConnected && (a.scrollIntoView({ block: "nearest" }), a = null);
      });
    });
  } } : {};
}
function dl() {
  return { before({ doc: e, d: t }) {
    t.style(e.documentElement, "overflow", "hidden");
  } };
}
function qt(e) {
  let t = {};
  for (let r of e) Object.assign(t, r(t));
  return t;
}
let me = sl(() => /* @__PURE__ */ new Map(), { PUSH(e, t) {
  var r;
  let n = (r = this.get(e)) != null ? r : { doc: e, count: 0, d: ne(), meta: /* @__PURE__ */ new Set(), computedMeta: {} };
  return n.count++, n.meta.add(t), n.computedMeta = qt(n.meta), this.set(e, n), this;
}, POP(e, t) {
  let r = this.get(e);
  return r && (r.count--, r.meta.delete(t), r.computedMeta = qt(r.meta)), this;
}, SCROLL_PREVENT(e) {
  let t = { doc: e.doc, d: e.d, meta() {
    return e.computedMeta;
  } }, r = [cl(), ul(), dl()];
  r.forEach(({ before: n }) => n == null ? void 0 : n(t)), r.forEach(({ after: n }) => n == null ? void 0 : n(t));
}, SCROLL_ALLOW({ d: e }) {
  e.dispose();
}, TEARDOWN({ doc: e }) {
  this.delete(e);
} });
me.subscribe(() => {
  let e = me.getSnapshot(), t = /* @__PURE__ */ new Map();
  for (let [r] of e) t.set(r, r.documentElement.style.overflow);
  for (let r of e.values()) {
    let n = t.get(r.doc) === "hidden", l = r.count !== 0;
    (l && !n || !l && n) && me.dispatch(r.count > 0 ? "SCROLL_PREVENT" : "SCROLL_ALLOW", r), r.count === 0 && me.dispatch("TEARDOWN", r);
  }
});
function fl(e, t, r = () => ({ containers: [] })) {
  let n = al(me), l = t ? n.get(t) : void 0, o = l ? l.count > 0 : !1;
  return U(() => {
    if (!(!t || !e)) return me.dispatch("PUSH", t, r), () => me.dispatch("POP", t, r);
  }, [e, t]), o;
}
function ml(e, t, r = () => [document.body]) {
  let n = We(e, "scroll-lock");
  fl(n, t, (l) => {
    var o;
    return { containers: [...(o = l.containers) != null ? o : [], r] };
  });
}
function pl(e = 0) {
  let [t, r] = F(e), n = W((i) => r(i), []), l = W((i) => r((d) => d | i), []), o = W((i) => (t & i) === i, [t]), a = W((i) => r((d) => d & ~i), []), s = W((i) => r((d) => d ^ i), []);
  return { flags: t, setFlag: n, addFlag: l, hasFlag: o, removeFlag: a, toggleFlag: s };
}
var Yt, Zt;
typeof process < "u" && typeof globalThis < "u" && typeof Element < "u" && ((Yt = process == null ? void 0 : process.env) == null ? void 0 : Yt.NODE_ENV) === "test" && typeof ((Zt = Element == null ? void 0 : Element.prototype) == null ? void 0 : Zt.getAnimations) > "u" && (Element.prototype.getAnimations = function() {
  return console.warn(["Headless UI has polyfilled `Element.prototype.getAnimations` for your tests.", "Please install a proper polyfill e.g. `jsdom-testing-mocks`, to silence these warnings.", "", "Example usage:", "```js", "import { mockAnimationsApi } from 'jsdom-testing-mocks'", "mockAnimationsApi()", "```"].join(`
`)), [];
});
var hl = ((e) => (e[e.None = 0] = "None", e[e.Closed = 1] = "Closed", e[e.Enter = 2] = "Enter", e[e.Leave = 4] = "Leave", e))(hl || {});
function vl(e) {
  let t = {};
  for (let r in e) e[r] === !0 && (t[`data-${r}`] = "");
  return t;
}
function gl(e, t, r, n) {
  let [l, o] = F(r), { hasFlag: a, addFlag: s, removeFlag: i } = pl(e && l ? 3 : 0), d = S(!1), p = S(!1), w = rt();
  return U(() => {
    var v;
    if (e) {
      if (r && o(!0), !t) {
        r && s(3);
        return;
      }
      return (v = n == null ? void 0 : n.start) == null || v.call(n, r), wl(t, { inFlight: d, prepare() {
        p.current ? p.current = !1 : p.current = d.current, d.current = !0, !p.current && (r ? (s(3), i(4)) : (s(4), i(2)));
      }, run() {
        p.current ? r ? (i(3), s(4)) : (i(4), s(3)) : r ? i(1) : s(1);
      }, done() {
        var b;
        p.current && xl(t) || (d.current = !1, i(7), r || o(!1), (b = n == null ? void 0 : n.end) == null || b.call(n, r));
      } });
    }
  }, [e, r, t, w]), e ? [l, { closed: a(1), enter: a(2), leave: a(4), transition: a(2) || a(4) }] : [r, { closed: void 0, enter: void 0, leave: void 0, transition: void 0 }];
}
function wl(e, { prepare: t, run: r, done: n, inFlight: l }) {
  let o = ne();
  return bl(e, { prepare: t, inFlight: l }), o.nextFrame(() => {
    r(), o.requestAnimationFrame(() => {
      o.add(yl(e, n));
    });
  }), o.dispose;
}
function yl(e, t) {
  var r, n;
  let l = ne();
  if (!e) return l.dispose;
  let o = !1;
  l.add(() => {
    o = !0;
  });
  let a = (n = (r = e.getAnimations) == null ? void 0 : r.call(e).filter((s) => s instanceof CSSTransition)) != null ? n : [];
  return a.length === 0 ? (t(), l.dispose) : (Promise.allSettled(a.map((s) => s.finished)).then(() => {
    o || t();
  }), l.dispose);
}
function bl(e, { inFlight: t, prepare: r }) {
  if (t != null && t.current) {
    r();
    return;
  }
  let n = e.style.transition;
  e.style.transition = "none", r(), e.offsetHeight, e.style.transition = n;
}
function xl(e) {
  var t, r;
  return ((r = (t = e.getAnimations) == null ? void 0 : t.call(e)) != null ? r : []).some((n) => n instanceof CSSTransition && n.playState !== "finished");
}
function Ft(e, t) {
  let r = S([]), n = L(e);
  C(() => {
    let l = [...r.current];
    for (let [o, a] of t.entries()) if (r.current[o] !== a) {
      let s = n(t, l);
      return r.current = t, s;
    }
  }, [n, ...t]);
}
let nt = X(null);
nt.displayName = "OpenClosedContext";
var K = ((e) => (e[e.Open = 1] = "Open", e[e.Closed = 2] = "Closed", e[e.Closing = 4] = "Closing", e[e.Opening = 8] = "Opening", e))(K || {});
function lt() {
  return H(nt);
}
function El({ value: e, children: t }) {
  return $.createElement(nt.Provider, { value: e }, t);
}
function $l({ children: e }) {
  return $.createElement(nt.Provider, { value: null }, e);
}
function Ol(e) {
  function t() {
    document.readyState !== "loading" && (e(), document.removeEventListener("DOMContentLoaded", t));
  }
  typeof window < "u" && typeof document < "u" && (document.addEventListener("DOMContentLoaded", t), t());
}
let oe = [];
Ol(() => {
  function e(t) {
    if (!ae(t.target) || t.target === document.body || oe[0] === t.target) return;
    let r = t.target;
    r = r.closest(Ze), oe.unshift(r ?? t.target), oe = oe.filter((n) => n != null && n.isConnected), oe.splice(10);
  }
  window.addEventListener("click", e, { capture: !0 }), window.addEventListener("mousedown", e, { capture: !0 }), window.addEventListener("focus", e, { capture: !0 }), document.body.addEventListener("click", e, { capture: !0 }), document.body.addEventListener("mousedown", e, { capture: !0 }), document.body.addEventListener("focus", e, { capture: !0 });
});
function Or(e) {
  let t = L(e), r = S(!1);
  C(() => (r.current = !1, () => {
    r.current = !0, tt(() => {
      r.current && t();
    });
  }), [t]);
}
let Sr = X(!1);
function Sl() {
  return H(Sr);
}
function Qt(e) {
  return $.createElement(Sr.Provider, { value: e.force }, e.children);
}
function Tl(e) {
  let t = Sl(), r = H(Pr), [n, l] = F(() => {
    var o;
    if (!t && r !== null) return (o = r.current) != null ? o : null;
    if (Z.isServer) return null;
    let a = e == null ? void 0 : e.getElementById("headlessui-portal-root");
    if (a) return a;
    if (e === null) return null;
    let s = e.createElement("div");
    return s.setAttribute("id", "headlessui-portal-root"), e.body.appendChild(s);
  });
  return C(() => {
    n !== null && (e != null && e.body.contains(n) || e == null || e.body.appendChild(n));
  }, [n, e]), C(() => {
    t || r !== null && l(r.current);
  }, [r, l, t]), n;
}
let Tr = ue, Pl = V(function(e, t) {
  let { ownerDocument: r = null, ...n } = e, l = S(null), o = Q(Tn((v) => {
    l.current = v;
  }), t), a = At(l.current), s = r ?? a, i = Tl(s), d = H(St), p = rt(), w = z();
  return Or(() => {
    var v;
    i && i.childNodes.length <= 0 && ((v = i.parentElement) == null || v.removeChild(i));
  }), i ? Zr($.createElement("div", { "data-headlessui-portal": "", ref: (v) => {
    p.dispose(), d && v && p.add(d.register(v));
  } }, w({ ourProps: { ref: o }, theirProps: n, slot: {}, defaultTag: Tr, name: "Portal" })), i) : null;
});
function Ll(e, t) {
  let r = Q(t), { enabled: n = !0, ownerDocument: l, ...o } = e, a = z();
  return n ? $.createElement(Pl, { ...o, ownerDocument: l, ref: r }) : a({ ourProps: { ref: r }, theirProps: o, slot: {}, defaultTag: Tr, name: "Portal" });
}
let Cl = ue, Pr = X(null);
function Ml(e, t) {
  let { target: r, ...n } = e, l = { ref: Q(t) }, o = z();
  return $.createElement(Pr.Provider, { value: r }, o({ ourProps: l, theirProps: n, defaultTag: Cl, name: "Popover.Group" }));
}
let St = X(null);
function kl() {
  let e = H(St), t = S([]), r = L((o) => (t.current.push(o), e && e.register(o), () => n(o))), n = L((o) => {
    let a = t.current.indexOf(o);
    a !== -1 && t.current.splice(a, 1), e && e.unregister(o);
  }), l = _(() => ({ register: r, unregister: n, portals: t }), [r, n, t]);
  return [t, _(() => function({ children: o }) {
    return $.createElement(St.Provider, { value: l }, o);
  }, [l])];
}
let Al = V(Ll), Lr = V(Ml), Fl = Object.assign(Al, { Group: Lr });
function Nl(e, t = typeof document < "u" ? document.defaultView : null, r) {
  let n = We(e, "escape");
  $r(t, "keydown", (l) => {
    n && (l.defaultPrevented || l.key === mr.Escape && r(l));
  });
}
function Il() {
  var e;
  let [t] = F(() => typeof window < "u" && typeof window.matchMedia == "function" ? window.matchMedia("(pointer: coarse)") : null), [r, n] = F((e = t == null ? void 0 : t.matches) != null ? e : !1);
  return U(() => {
    if (!t) return;
    function l(o) {
      n(o.matches);
    }
    return t.addEventListener("change", l), () => t.removeEventListener("change", l);
  }, [t]), r;
}
function Rl({ defaultContainers: e = [], portals: t, mainTreeNode: r } = {}) {
  let n = L(() => {
    var l, o;
    let a = De(r), s = [];
    for (let i of e) i !== null && (se(i) ? s.push(i) : "current" in i && se(i.current) && s.push(i.current));
    if (t != null && t.current) for (let i of t.current) s.push(i);
    for (let i of (l = a == null ? void 0 : a.querySelectorAll("html > *, body > *")) != null ? l : []) i !== document.body && i !== document.head && se(i) && i.id !== "headlessui-portal-root" && (r && (i.contains(r) || i.contains((o = r == null ? void 0 : r.getRootNode()) == null ? void 0 : o.host)) || s.some((d) => i.contains(d)) || s.push(i));
    return s;
  });
  return { resolveContainers: n, contains: L((l) => n().some((o) => o.contains(l))) };
}
let Cr = X(null);
function Jt({ children: e, node: t }) {
  let [r, n] = F(null), l = Mr(t ?? r);
  return $.createElement(Cr.Provider, { value: l }, e, l === null && $.createElement(Et, { features: Ye.Hidden, ref: (o) => {
    var a, s;
    if (o) {
      for (let i of (s = (a = De(o)) == null ? void 0 : a.querySelectorAll("html > *, body > *")) != null ? s : []) if (i !== document.body && i !== document.head && se(i) && i != null && i.contains(o)) {
        n(i);
        break;
      }
    }
  } }));
}
function Mr(e = null) {
  var t;
  return (t = H(Cr)) != null ? t : e;
}
function _l() {
  let e = typeof document > "u";
  return "useSyncExternalStore" in Ae ? ((t) => t.useSyncExternalStore)(Ae)(() => () => {
  }, () => !1, () => !e) : !1;
}
function ot() {
  let e = _l(), [t, r] = Ae.useState(Z.isHandoffComplete);
  return t && Z.isHandoffComplete === !1 && r(!1), Ae.useEffect(() => {
    t !== !0 && r(!0);
  }, [t]), Ae.useEffect(() => Z.handoff(), []), e ? !1 : t;
}
function Nt() {
  let e = S(!1);
  return U(() => (e.current = !0, () => {
    e.current = !1;
  }), []), e;
}
var ke = ((e) => (e[e.Forwards = 0] = "Forwards", e[e.Backwards = 1] = "Backwards", e))(ke || {});
function Dl() {
  let e = S(0);
  return Er(!0, "keydown", (t) => {
    t.key === "Tab" && (e.current = t.shiftKey ? 1 : 0);
  }, !0), e;
}
function kr(e) {
  if (!e) return /* @__PURE__ */ new Set();
  if (typeof e == "function") return new Set(e());
  let t = /* @__PURE__ */ new Set();
  for (let r of e.current) se(r.current) && t.add(r.current);
  return t;
}
let jl = "div";
var fe = ((e) => (e[e.None = 0] = "None", e[e.InitialFocus = 1] = "InitialFocus", e[e.TabLock = 2] = "TabLock", e[e.FocusLock = 4] = "FocusLock", e[e.RestoreFocus = 8] = "RestoreFocus", e[e.AutoFocus = 16] = "AutoFocus", e))(fe || {});
function Wl(e, t) {
  let r = S(null), n = Q(r, t), { initialFocus: l, initialFocusFallback: o, containers: a, features: s = 15, ...i } = e;
  ot() || (s = 0);
  let d = At(r.current);
  Bl(s, { ownerDocument: d });
  let p = Xl(s, { ownerDocument: d, container: r, initialFocus: l, initialFocusFallback: o });
  zl(s, { ownerDocument: d, container: r, containers: a, previousActiveElement: p });
  let w = Dl(), v = L((u) => {
    if (!he(r.current)) return;
    let g = r.current;
    ((y) => y())(() => {
      re(w.current, { [ke.Forwards]: () => {
        Ie(g, ee.First, { skipElements: [u.relatedTarget, o] });
      }, [ke.Backwards]: () => {
        Ie(g, ee.Last, { skipElements: [u.relatedTarget, o] });
      } });
    });
  }), b = We(!!(s & 2), "focus-trap#tab-lock"), f = rt(), x = S(!1), h = { ref: n, onKeyDown(u) {
    u.key == "Tab" && (x.current = !0, f.requestAnimationFrame(() => {
      x.current = !1;
    }));
  }, onBlur(u) {
    if (!(s & 4)) return;
    let g = kr(a);
    he(r.current) && g.add(r.current);
    let y = u.relatedTarget;
    ae(y) && y.dataset.headlessuiFocusGuard !== "true" && (Ar(g, y) || (x.current ? Ie(r.current, re(w.current, { [ke.Forwards]: () => ee.Next, [ke.Backwards]: () => ee.Previous }) | ee.WrapAround, { relativeTo: u.target }) : ae(u.target) && te(u.target)));
  } }, c = z();
  return $.createElement($.Fragment, null, b && $.createElement(Et, { as: "button", type: "button", "data-headlessui-focus-guard": !0, onFocus: v, features: Ye.Focusable }), c({ ourProps: h, theirProps: i, defaultTag: jl, name: "FocusTrap" }), b && $.createElement(Et, { as: "button", type: "button", "data-headlessui-focus-guard": !0, onFocus: v, features: Ye.Focusable }));
}
let Ul = V(Wl), Hl = Object.assign(Ul, { features: fe });
function Vl(e = !0) {
  let t = S(oe.slice());
  return Ft(([r], [n]) => {
    n === !0 && r === !1 && tt(() => {
      t.current.splice(0);
    }), n === !1 && r === !0 && (t.current = oe.slice());
  }, [e, oe, t]), L(() => {
    var r;
    return (r = t.current.find((n) => n != null && n.isConnected)) != null ? r : null;
  });
}
function Bl(e, { ownerDocument: t }) {
  let r = !!(e & 8), n = Vl(r);
  Ft(() => {
    r || fn(t == null ? void 0 : t.body) && te(n());
  }, [r]), Or(() => {
    r && te(n());
  });
}
function Xl(e, { ownerDocument: t, container: r, initialFocus: n, initialFocusFallback: l }) {
  let o = S(null), a = We(!!(e & 1), "focus-trap#initial-focus"), s = Nt();
  return Ft(() => {
    if (e === 0) return;
    if (!a) {
      l != null && l.current && te(l.current);
      return;
    }
    let i = r.current;
    i && tt(() => {
      if (!s.current) return;
      let d = t == null ? void 0 : t.activeElement;
      if (n != null && n.current) {
        if ((n == null ? void 0 : n.current) === d) {
          o.current = d;
          return;
        }
      } else if (i.contains(d)) {
        o.current = d;
        return;
      }
      if (n != null && n.current) te(n.current);
      else {
        if (e & 16) {
          if (Ie(i, ee.First | ee.AutoFocus) !== Ot.Error) return;
        } else if (Ie(i, ee.First) !== Ot.Error) return;
        if (l != null && l.current && (te(l.current), (t == null ? void 0 : t.activeElement) === l.current)) return;
        console.warn("There are no focusable elements inside the <FocusTrap />");
      }
      o.current = t == null ? void 0 : t.activeElement;
    });
  }, [l, a, e]), o;
}
function zl(e, { ownerDocument: t, container: r, containers: n, previousActiveElement: l }) {
  let o = Nt(), a = !!(e & 4);
  $r(t == null ? void 0 : t.defaultView, "focus", (s) => {
    if (!a || !o.current) return;
    let i = kr(n);
    he(r.current) && i.add(r.current);
    let d = l.current;
    if (!d) return;
    let p = s.target;
    he(p) ? Ar(i, p) ? (l.current = p, te(p)) : (s.preventDefault(), s.stopPropagation(), te(d)) : te(l.current);
  }, !0);
}
function Ar(e, t) {
  for (let r of e) if (r.contains(t)) return !0;
  return !1;
}
function Fr(e) {
  var t;
  return !!(e.enter || e.enterFrom || e.enterTo || e.leave || e.leaveFrom || e.leaveTo) || !Fe((t = e.as) != null ? t : Ir) || $.Children.count(e.children) === 1;
}
let it = X(null);
it.displayName = "TransitionContext";
var Gl = ((e) => (e.Visible = "visible", e.Hidden = "hidden", e))(Gl || {});
function Kl() {
  let e = H(it);
  if (e === null) throw new Error("A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />.");
  return e;
}
function ql() {
  let e = H(at);
  if (e === null) throw new Error("A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />.");
  return e;
}
let at = X(null);
at.displayName = "NestingContext";
function st(e) {
  return "children" in e ? st(e.children) : e.current.filter(({ el: t }) => t.current !== null).filter(({ state: t }) => t === "visible").length > 0;
}
function Nr(e, t) {
  let r = ge(e), n = S([]), l = Nt(), o = rt(), a = L((b, f = ie.Hidden) => {
    let x = n.current.findIndex(({ el: h }) => h === b);
    x !== -1 && (re(f, { [ie.Unmount]() {
      n.current.splice(x, 1);
    }, [ie.Hidden]() {
      n.current[x].state = "hidden";
    } }), o.microTask(() => {
      var h;
      !st(n) && l.current && ((h = r.current) == null || h.call(r));
    }));
  }), s = L((b) => {
    let f = n.current.find(({ el: x }) => x === b);
    return f ? f.state !== "visible" && (f.state = "visible") : n.current.push({ el: b, state: "visible" }), () => a(b, ie.Unmount);
  }), i = S([]), d = S(Promise.resolve()), p = S({ enter: [], leave: [] }), w = L((b, f, x) => {
    i.current.splice(0), t && (t.chains.current[f] = t.chains.current[f].filter(([h]) => h !== b)), t == null || t.chains.current[f].push([b, new Promise((h) => {
      i.current.push(h);
    })]), t == null || t.chains.current[f].push([b, new Promise((h) => {
      Promise.all(p.current[f].map(([c, u]) => u)).then(() => h());
    })]), f === "enter" ? d.current = d.current.then(() => t == null ? void 0 : t.wait.current).then(() => x(f)) : x(f);
  }), v = L((b, f, x) => {
    Promise.all(p.current[f].splice(0).map(([h, c]) => c)).then(() => {
      var h;
      (h = i.current.shift()) == null || h();
    }).then(() => x(f));
  });
  return _(() => ({ children: n, register: s, unregister: a, onStart: w, onStop: v, wait: d, chains: p }), [s, a, n, w, v, p, d]);
}
let Ir = ue, Rr = qe.RenderStrategy;
function Yl(e, t) {
  var r, n;
  let { transition: l = !0, beforeEnter: o, afterEnter: a, beforeLeave: s, afterLeave: i, enter: d, enterFrom: p, enterTo: w, entered: v, leave: b, leaveFrom: f, leaveTo: x, ...h } = e, [c, u] = F(null), g = S(null), y = Fr(e), m = Q(...y ? [g, t, u] : t === null ? [] : [t]), E = (r = h.unmount) == null || r ? ie.Unmount : ie.Hidden, { show: O, appear: N, initial: D } = Kl(), [A, I] = F(O ? "visible" : "hidden"), q = ql(), { register: R, unregister: M } = q;
  U(() => R(g), [R, g]), U(() => {
    if (E === ie.Hidden && g.current) {
      if (O && A !== "visible") {
        I("visible");
        return;
      }
      return re(A, { hidden: () => M(g), visible: () => R(g) });
    }
  }, [A, g, R, M, O, E]);
  let j = ot();
  U(() => {
    if (y && j && A === "visible" && g.current === null) throw new Error("Did you forget to passthrough the `ref` to the actual DOM node?");
  }, [g, A, j, y]);
  let we = D && !N, ce = N && O && D, J = S(!1), k = Nr(() => {
    J.current || (I("hidden"), M(g));
  }, q), Ee = L((dt) => {
    J.current = !0;
    let He = dt ? "enter" : "leave";
    k.onStart(g, He, (Oe) => {
      Oe === "enter" ? o == null || o() : Oe === "leave" && (s == null || s());
    });
  }), le = L((dt) => {
    let He = dt ? "enter" : "leave";
    J.current = !1, k.onStop(g, He, (Oe) => {
      Oe === "enter" ? a == null || a() : Oe === "leave" && (i == null || i());
    }), He === "leave" && !st(k) && (I("hidden"), M(g));
  });
  C(() => {
    y && l || (Ee(O), le(O));
  }, [O, y, l]);
  let ct = !(!l || !y || !j || we), [, T] = gl(ct, c, O, { start: Ee, end: le }), Ue = de({ ref: m, className: ((n = xt(h.className, ce && d, ce && p, T.enter && d, T.enter && T.closed && p, T.enter && !T.closed && w, T.leave && b, T.leave && !T.closed && f, T.leave && T.closed && x, !T.transition && O && v)) == null ? void 0 : n.trim()) || void 0, ...vl(T) }), $e = 0;
  A === "visible" && ($e |= K.Open), A === "hidden" && ($e |= K.Closed), O && A === "hidden" && ($e |= K.Opening), !O && A === "visible" && ($e |= K.Closing);
  let Wr = z();
  return $.createElement(at.Provider, { value: k }, $.createElement(El, { value: $e }, Wr({ ourProps: Ue, theirProps: h, defaultTag: Ir, features: Rr, visible: A === "visible", name: "Transition.Child" })));
}
function Zl(e, t) {
  let { show: r, appear: n = !1, unmount: l = !0, ...o } = e, a = S(null), s = Fr(e), i = Q(...s ? [a, t] : t === null ? [] : [t]);
  ot();
  let d = lt();
  if (r === void 0 && d !== null && (r = (d & K.Open) === K.Open), r === void 0) throw new Error("A <Transition /> is used but it is missing a `show={true | false}` prop.");
  let [p, w] = F(r ? "visible" : "hidden"), v = Nr(() => {
    r || w("hidden");
  }), [b, f] = F(!0), x = S([r]);
  U(() => {
    b !== !1 && x.current[x.current.length - 1] !== r && (x.current.push(r), f(!1));
  }, [x, r]);
  let h = _(() => ({ show: r, appear: n, initial: b }), [r, n, b]);
  U(() => {
    r ? w("visible") : !st(v) && a.current !== null && w("hidden");
  }, [r, v]);
  let c = { unmount: l }, u = L(() => {
    var m;
    b && f(!1), (m = e.beforeEnter) == null || m.call(e);
  }), g = L(() => {
    var m;
    b && f(!1), (m = e.beforeLeave) == null || m.call(e);
  }), y = z();
  return $.createElement(at.Provider, { value: v }, $.createElement(it.Provider, { value: h }, y({ ourProps: { ...c, as: ue, children: $.createElement(_r, { ref: i, ...c, ...o, beforeEnter: u, beforeLeave: g }) }, theirProps: {}, defaultTag: ue, features: Rr, visible: p === "visible", name: "Transition" })));
}
function Ql(e, t) {
  let r = H(it) !== null, n = lt() !== null;
  return $.createElement($.Fragment, null, !r && n ? $.createElement(Tt, { ref: t, ...e }) : $.createElement(_r, { ref: t, ...e }));
}
let Tt = V(Zl), _r = V(Yl), xe = V(Ql), Dr = Object.assign(Tt, { Child: xe, Root: Tt });
var Jl = ((e) => (e[e.Open = 0] = "Open", e[e.Closed = 1] = "Closed", e))(Jl || {}), eo = ((e) => (e[e.SetTitleId = 0] = "SetTitleId", e))(eo || {});
let to = { 0(e, t) {
  return e.titleId === t.id ? e : { ...e, titleId: t.id };
} }, It = X(null);
It.displayName = "DialogContext";
function ut(e) {
  let t = H(It);
  if (t === null) {
    let r = new Error(`<${e} /> is missing a parent <Dialog /> component.`);
    throw Error.captureStackTrace && Error.captureStackTrace(r, ut), r;
  }
  return t;
}
function ro(e, t) {
  return re(t.type, to, e, t);
}
let er = V(function(e, t) {
  let r = _e(), { id: n = `headlessui-dialog-${r}`, open: l, onClose: o, initialFocus: a, role: s = "dialog", autoFocus: i = !0, __demoMode: d = !1, unmount: p = !1, ...w } = e, v = S(!1);
  s = (function() {
    return s === "dialog" || s === "alertdialog" ? s : (v.current || (v.current = !0, console.warn(`Invalid role [${s}] passed to <Dialog />. Only \`dialog\` and and \`alertdialog\` are supported. Using \`dialog\` instead.`)), "dialog");
  })();
  let b = lt();
  l === void 0 && b !== null && (l = (b & K.Open) === K.Open);
  let f = S(null), x = Q(f, t), h = At(f.current), c = l ? 0 : 1, [u, g] = Gr(ro, { titleId: null, descriptionId: null, panelRef: Kr() }), y = L(() => o(!1)), m = L((T) => g({ type: 0, id: T })), E = ot() ? c === 0 : !1, [O, N] = kl(), D = { get current() {
    var T;
    return (T = u.panelRef.current) != null ? T : f.current;
  } }, A = Mr(), { resolveContainers: I } = Rl({ mainTreeNode: A, portals: O, defaultContainers: [D] }), q = b !== null ? (b & K.Closing) === K.Closing : !1;
  Kn(d || q ? !1 : E, { allowed: L(() => {
    var T, Ue;
    return [(Ue = (T = f.current) == null ? void 0 : T.closest("[data-headlessui-portal]")) != null ? Ue : null];
  }), disallowed: L(() => {
    var T;
    return [(T = A == null ? void 0 : A.closest("body > *:not(#headlessui-portal-root)")) != null ? T : null];
  }) });
  let R = wr.get(null);
  U(() => {
    if (E) return R.actions.push(n), () => R.actions.pop(n);
  }, [R, n, E]);
  let M = yr(R, W((T) => R.selectors.isTop(T, n), [R, n]));
  il(M, I, (T) => {
    T.preventDefault(), y();
  }), Nl(M, h == null ? void 0 : h.defaultView, (T) => {
    T.preventDefault(), T.stopPropagation(), document.activeElement && "blur" in document.activeElement && typeof document.activeElement.blur == "function" && document.activeElement.blur(), y();
  }), ml(d || q ? !1 : E, h, I), qn(E, f, y);
  let [j, we] = Pn(), ce = _(() => [{ dialogState: c, close: y, setTitleId: m, unmount: p }, u], [c, y, m, p, u]), J = je({ open: c === 0 }), k = { ref: x, id: n, role: s, tabIndex: -1, "aria-modal": d ? void 0 : c === 0 ? !0 : void 0, "aria-labelledby": u.titleId, "aria-describedby": j, unmount: p }, Ee = !Il(), le = fe.None;
  E && !d && (le |= fe.RestoreFocus, le |= fe.TabLock, i && (le |= fe.AutoFocus), Ee && (le |= fe.InitialFocus));
  let ct = z();
  return $.createElement($l, null, $.createElement(Qt, { force: !0 }, $.createElement(Fl, null, $.createElement(It.Provider, { value: ce }, $.createElement(Lr, { target: f }, $.createElement(Qt, { force: !1 }, $.createElement(we, { slot: J }, $.createElement(N, null, $.createElement(Hl, { initialFocus: a, initialFocusFallback: f, containers: I, features: le }, $.createElement(Fn, { value: y }, ct({ ourProps: k, theirProps: w, slot: J, defaultTag: no, features: lo, visible: c === 0, name: "Dialog" })))))))))));
}), no = "div", lo = qe.RenderStrategy | qe.Static;
function oo(e, t) {
  let { transition: r = !1, open: n, ...l } = e, o = lt(), a = e.hasOwnProperty("open") || o !== null, s = e.hasOwnProperty("onClose");
  if (!a && !s) throw new Error("You have to provide an `open` and an `onClose` prop to the `Dialog` component.");
  if (!a) throw new Error("You provided an `onClose` prop to the `Dialog`, but forgot an `open` prop.");
  if (!s) throw new Error("You provided an `open` prop to the `Dialog`, but forgot an `onClose` prop.");
  if (!o && typeof e.open != "boolean") throw new Error(`You provided an \`open\` prop to the \`Dialog\`, but the value is not a boolean. Received: ${e.open}`);
  if (typeof e.onClose != "function") throw new Error(`You provided an \`onClose\` prop to the \`Dialog\`, but the value is not a function. Received: ${e.onClose}`);
  return (n !== void 0 || r) && !l.static ? $.createElement(Jt, null, $.createElement(Dr, { show: n, transition: r, unmount: l.unmount }, $.createElement(er, { ref: t, ...l }))) : $.createElement(Jt, null, $.createElement(er, { ref: t, open: n, ...l }));
}
let io = "div";
function ao(e, t) {
  let r = _e(), { id: n = `headlessui-dialog-panel-${r}`, transition: l = !1, ...o } = e, [{ dialogState: a, unmount: s }, i] = ut("Dialog.Panel"), d = Q(t, i.panelRef), p = je({ open: a === 0 }), w = L((h) => {
    h.stopPropagation();
  }), v = { ref: d, id: n, onClick: w }, b = l ? xe : ue, f = l ? { unmount: s } : {}, x = z();
  return $.createElement(b, { ...f }, x({ ourProps: v, theirProps: o, slot: p, defaultTag: io, name: "Dialog.Panel" }));
}
let so = "div";
function uo(e, t) {
  let { transition: r = !1, ...n } = e, [{ dialogState: l, unmount: o }] = ut("Dialog.Backdrop"), a = je({ open: l === 0 }), s = { ref: t, "aria-hidden": !0 }, i = r ? xe : ue, d = r ? { unmount: o } : {}, p = z();
  return $.createElement(i, { ...d }, p({ ourProps: s, theirProps: n, slot: a, defaultTag: so, name: "Dialog.Backdrop" }));
}
let co = "h2";
function fo(e, t) {
  let r = _e(), { id: n = `headlessui-dialog-title-${r}`, ...l } = e, [{ dialogState: o, setTitleId: a }] = ut("Dialog.Title"), s = Q(t);
  C(() => (a(n), () => a(null)), [n, a]);
  let i = je({ open: o === 0 }), d = { ref: s, id: n };
  return z()({ ourProps: d, theirProps: l, slot: i, defaultTag: co, name: "Dialog.Title" });
}
let mo = V(oo), Rt = V(ao);
V(uo);
let po = V(fo), ho = Object.assign(mo, { Panel: Rt, Title: po, Description: kn });
function jr({ onClick: e }) {
  return /* @__PURE__ */ ve(
    "button",
    {
      type: "button",
      className: "im-close-button text-gray-400 hover:text-gray-500",
      onClick: e,
      children: [
        /* @__PURE__ */ P("span", { className: "sr-only", children: "Close" }),
        /* @__PURE__ */ P(
          "svg",
          {
            className: "size-6",
            xmlns: "http://www.w3.org/2000/svg",
            fill: "none",
            viewBox: "0 0 24 24",
            strokeWidth: "2",
            stroke: "currentColor",
            "aria-hidden": "true",
            children: /* @__PURE__ */ P(
              "path",
              {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M6 18L18 6M6 6l12 12"
              }
            )
          }
        )
      ]
    }
  );
}
const vo = ({ modalContext: e, config: t, children: r }) => {
  const [n, l] = F(!1);
  return /* @__PURE__ */ P("div", { className: "im-modal-container fixed inset-0 z-40 overflow-y-auto p-4", children: /* @__PURE__ */ P(
    "div",
    {
      className: Ke("im-modal-positioner flex min-h-full justify-center", {
        "items-start": t.position === "top",
        "items-center": t.position === "center",
        "items-end": t.position === "bottom"
      }),
      children: /* @__PURE__ */ P(
        xe,
        {
          as: "div",
          enterFrom: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
          enterTo: "opacity-100 translate-y-0 sm:scale-100",
          leaveFrom: "opacity-100 translate-y-0 sm:scale-100",
          leaveTo: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
          afterEnter: () => l(!0),
          afterLeave: e.afterLeave,
          className: Ke("im-modal-wrapper w-full transition duration-300 ease-in-out", e.onTopOfStack ? "" : "blur-sm", {
            "sm:max-w-sm": t.maxWidth === "sm",
            "sm:max-w-md": t.maxWidth === "md",
            "sm:max-w-md md:max-w-lg": t.maxWidth === "lg",
            "sm:max-w-md md:max-w-xl": t.maxWidth === "xl",
            "sm:max-w-md md:max-w-xl lg:max-w-2xl": t.maxWidth === "2xl",
            "sm:max-w-md md:max-w-xl lg:max-w-3xl": t.maxWidth === "3xl",
            "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-4xl": t.maxWidth === "4xl",
            "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl": t.maxWidth === "5xl",
            "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-6xl": t.maxWidth === "6xl",
            "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-7xl": t.maxWidth === "7xl"
          }),
          children: /* @__PURE__ */ ve(
            Rt,
            {
              className: `im-modal-content relative ${t.paddingClasses} ${t.panelClasses}`,
              "data-inertiaui-modal-entered": n,
              children: [
                t.closeButton && /* @__PURE__ */ P("div", { className: "absolute right-0 top-0 pr-3 pt-3", children: /* @__PURE__ */ P(jr, { onClick: e.close }) }),
                typeof r == "function" ? r({ modalContext: e, config: t }) : r
              ]
            }
          )
        }
      )
    }
  ) });
}, go = ({ modalContext: e, config: t, children: r }) => {
  const [n, l] = F(!1);
  return /* @__PURE__ */ P("div", { className: "im-slideover-container fixed inset-0 z-40 overflow-y-auto overflow-x-hidden", children: /* @__PURE__ */ P(
    "div",
    {
      className: Ke("im-slideover-positioner flex min-h-full items-center", {
        "justify-start rtl:justify-end": (t == null ? void 0 : t.position) === "left",
        "justify-end rtl:justify-start": (t == null ? void 0 : t.position) === "right"
      }),
      children: /* @__PURE__ */ P(
        xe,
        {
          as: "div",
          enterFrom: `opacity-0 ${t.position === "left" ? "-translate-x-full" : "translate-x-full"}`,
          enterTo: "opacity-100 translate-x-0",
          leaveFrom: "opacity-100 translate-x-0",
          leaveTo: `opacity-0 ${t.position === "left" ? "-translate-x-full" : "translate-x-full"}`,
          afterEnter: () => l(!0),
          afterLeave: e.afterLeave,
          className: Ke("im-slideover-wrapper w-full transition duration-300 ease-in-out", e.onTopOfStack ? "" : "blur-sm", {
            "sm:max-w-sm": t.maxWidth === "sm",
            "sm:max-w-md": t.maxWidth === "md",
            "sm:max-w-md md:max-w-lg": t.maxWidth === "lg",
            "sm:max-w-md md:max-w-xl": t.maxWidth === "xl",
            "sm:max-w-md md:max-w-xl lg:max-w-2xl": t.maxWidth === "2xl",
            "sm:max-w-md md:max-w-xl lg:max-w-3xl": t.maxWidth === "3xl",
            "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-4xl": t.maxWidth === "4xl",
            "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl": t.maxWidth === "5xl",
            "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-6xl": t.maxWidth === "6xl",
            "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-7xl": t.maxWidth === "7xl"
          }),
          children: /* @__PURE__ */ ve(
            Rt,
            {
              className: `im-slideover-content relative ${t.paddingClasses} ${t.panelClasses}`,
              "data-inertiaui-modal-entered": n,
              children: [
                t.closeButton && /* @__PURE__ */ P("div", { className: "absolute right-0 top-0 pr-3 pt-3", children: /* @__PURE__ */ P(jr, { onClick: e.close }) }),
                typeof r == "function" ? r({ modalContext: e, config: t }) : r
              ]
            }
          )
        }
      )
    }
  ) });
}, wo = Pt(({ name: e, children: t, onFocus: r = null, onBlur: n = null, onClose: l = null, onSuccess: o = null, onAfterLeave: a = null, ...s }, i) => {
  const d = (w) => typeof t == "function" ? t(w) : t, p = S(null);
  return tr(i, () => p.current, [p]), /* @__PURE__ */ P(
    ar,
    {
      ref: p,
      name: e,
      onFocus: r,
      onBlur: n,
      onClose: l,
      onSuccess: o,
      ...s,
      children: ({
        afterLeave: w,
        close: v,
        config: b,
        emit: f,
        getChildModal: x,
        getParentModal: h,
        id: c,
        index: u,
        isOpen: g,
        modalContext: y,
        onTopOfStack: m,
        reload: E,
        setOpen: O,
        shouldRender: N
      }) => /* @__PURE__ */ P(
        Dr,
        {
          appear: !0,
          show: g ?? !1,
          afterLeave: a,
          children: /* @__PURE__ */ ve(
            ho,
            {
              as: "div",
              className: "im-dialog relative z-20",
              onClose: () => b.closeExplicitly ? null : v(),
              "data-inertiaui-modal-id": c,
              "data-inertiaui-modal-index": u,
              children: [
                u === 0 ? /* @__PURE__ */ P(
                  xe,
                  {
                    enter: "transition transform ease-in-out duration-300",
                    enterFrom: "opacity-0",
                    enterTo: "opacity-100",
                    leave: "transition transform ease-in-out duration-300",
                    leaveFrom: "opacity-100",
                    leaveTo: "opacity-0",
                    children: m ? /* @__PURE__ */ P(
                      "div",
                      {
                        className: "im-backdrop fixed inset-0 z-30 bg-black/75",
                        "aria-hidden": "true"
                      }
                    ) : /* @__PURE__ */ P("div", {})
                  }
                ) : null,
                u > 0 && m ? /* @__PURE__ */ P("div", { className: "im-backdrop fixed inset-0 z-30 bg-black/75" }) : null,
                b.slideover ? /* @__PURE__ */ P(
                  go,
                  {
                    modalContext: y,
                    config: b,
                    children: d({
                      afterLeave: w,
                      close: v,
                      config: b,
                      emit: f,
                      getChildModal: x,
                      getParentModal: h,
                      id: c,
                      index: u,
                      isOpen: g,
                      modalContext: y,
                      onTopOfStack: m,
                      reload: E,
                      setOpen: O,
                      shouldRender: N
                    })
                  }
                ) : /* @__PURE__ */ P(
                  vo,
                  {
                    modalContext: y,
                    config: b,
                    children: d({
                      afterLeave: w,
                      close: v,
                      config: b,
                      emit: f,
                      getChildModal: x,
                      getParentModal: h,
                      id: c,
                      index: u,
                      isOpen: g,
                      modalContext: y,
                      onTopOfStack: m,
                      reload: E,
                      setOpen: O,
                      shouldRender: N
                    })
                  }
                )
              ]
            }
          )
        }
      )
    }
  );
});
wo.displayName = "Modal";
const No = ({
  href: e,
  method: t = "get",
  data: r = {},
  as: n = "a",
  headers: l = {},
  queryStringArrayFormat: o = "brackets",
  onAfterLeave: a = null,
  onBlur: s = null,
  onClose: i = null,
  onError: d = null,
  onFocus: p = null,
  onStart: w = null,
  onSuccess: v = null,
  navigate: b = null,
  children: f,
  ...x
}) => {
  const [h, c] = F(!1), [u, g] = F(null), { stack: y, visit: m } = et(), E = _(() => b ?? Ct("navigate"), [b]), O = {}, N = {};
  Object.keys(x).forEach((M) => {
    Dt.includes(M) || (M.startsWith("on") && typeof x[M] == "function" ? nn(M) ? O[M] = x[M] : N[M] = x[M] : O[M] = x[M]);
  });
  const [D, A] = F(!1);
  C(() => {
    u && (u.onTopOfStack && D ? p == null || p() : !u.onTopOfStack && !D && (s == null || s()), A(!u.onTopOfStack));
  }, [y]);
  const I = W(() => {
    i == null || i();
  }, [i]), q = W(() => {
    g(null), a == null || a();
  }, [a]), R = W(
    (M) => {
      M == null || M.preventDefault(), !h && (e.startsWith("#") || (c(!0), w == null || w()), m(
        e,
        t,
        r,
        l,
        rn(tn(x, Dt)),
        () => I(y.length),
        q,
        o,
        E
      ).then((j) => {
        g(j), j.registerEventListenersFromProps(N), v == null || v();
      }).catch((j) => {
        console.error(j), d == null || d(j);
      }).finally(() => c(!1)));
    },
    [e, t, r, l, o, x, I, q]
  );
  return /* @__PURE__ */ P(
    n,
    {
      ...O,
      href: e,
      onClick: R,
      children: typeof f == "function" ? f({ loading: h }) : f
    }
  );
}, yo = ({ children: e, data: t, params: r, buffer: n, as: l, always: o, fallback: a }) => {
  o = o ?? !1, l = l ?? "div", a = a ?? null;
  const [s, i] = F(!1), d = S(!1), p = S(!1), w = S(null), v = ir(), b = W(() => {
    if (t)
      return {
        only: Array.isArray(t) ? t : [t]
      };
    if (!r)
      throw new Error("You must provide either a `data` or `params` prop.");
    return r;
  }, [r, t]);
  return C(() => {
    if (!w.current)
      return;
    const f = new IntersectionObserver(
      (x) => {
        if (!x[0].isIntersecting || (!o && d.current && f.disconnect(), p.current))
          return;
        d.current = !0, p.current = !0;
        const h = b();
        v.reload({
          ...h,
          onStart: (c) => {
            var u;
            p.current = !0, (u = h.onStart) == null || u.call(h, c);
          },
          onFinish: (c) => {
            var u;
            i(!0), p.current = !1, (u = h.onFinish) == null || u.call(h, c), o || f.disconnect();
          }
        });
      },
      {
        rootMargin: `${n || 0}px`
      }
    );
    return f.observe(w.current), () => {
      f.disconnect();
    };
  }, [w, b, n]), o || !s ? Re(
    l,
    {
      props: null,
      ref: w
    },
    s ? e : a
  ) : s ? e : null;
};
yo.displayName = "InertiaWhenVisible";
const Io = (e) => (t) => (t.default.layout = (r) => Re(e, {}, r), t);
export {
  sn as Deferred,
  ar as HeadlessModal,
  wo as Modal,
  No as ModalLink,
  an as ModalRoot,
  ln as ModalStackProvider,
  yo as WhenVisible,
  Ct as getConfig,
  on as initFromPageProps,
  Mo as modalRouterHeaders,
  Lo as putConfig,
  Co as renderApp,
  Po as resetConfig,
  Io as setPageLayout,
  ir as useModal,
  lr as useModalIndex,
  et as useModalStack
};
