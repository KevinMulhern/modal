var Ur = Object.defineProperty;
var Hr = (e, t, r) => t in e ? Ur(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var K = (e, t, r) => Hr(e, typeof t != "symbol" ? t + "" : t, r);
import * as Ce from "react";
import $, { createContext as z, useContext as H, useEffect as L, useRef as S, useState as F, createElement as Re, useMemo as _, forwardRef as Pt, useImperativeHandle as tr, useLayoutEffect as Vr, useCallback as W, Fragment as ue, isValidElement as Br, cloneElement as Xr, useId as _e, useSyncExternalStore as zr, useReducer as Gr, createRef as Kr } from "react";
import { jsxs as he, Fragment as Mt, jsx as P } from "react/jsx-runtime";
import Ge from "axios";
import * as _t from "@inertiajs/react";
import { usePage as qr, router as Me } from "@inertiajs/react";
import { mergeDataIntoQueryString as Yr } from "@inertiajs/core";
import { createPortal as Zr } from "react-dom";
const Te = {
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
class Jr {
  constructor() {
    this.config = {}, this.reset();
  }
  reset() {
    this.config = JSON.parse(JSON.stringify(Te));
  }
  put(t, r) {
    if (typeof t == "object") {
      this.config = {
        type: t.type ?? Te.type,
        navigate: t.navigate ?? Te.navigate,
        modal: { ...Te.modal, ...t.modal ?? {} },
        slideover: { ...Te.slideover, ...t.slideover ?? {} }
      };
      return;
    }
    const n = t.split(".");
    let l = this.config;
    for (let i = 0; i < n.length - 1; i++)
      l = l[n[i]] = l[n[i]] || {};
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
const Je = new Jr(), Ti = () => Je.reset(), Pi = (e, t) => Je.put(e, t), Lt = (e) => Je.get(e), we = (e, t) => Je.get(e ? `slideover.${t}` : `modal.${t}`);
function Qr(e, t) {
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
function Pe(e) {
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
const Qe = z(null);
Qe.displayName = "ModalStackContext";
let rr = null, nr = null, xe = null, Ve = {}, pt = [], ye = {};
const ln = ({ children: e }) => {
  const [t, r] = F([]), [n, l] = F({}), i = (h) => {
    r((u) => {
      const c = h([...u]), v = (y) => {
        var p;
        return c.length < 2 ? !0 : ((p = c.map((x) => ({ id: x.id, shouldRender: x.shouldRender })).reverse().find((x) => x.shouldRender)) == null ? void 0 : p.id) === y;
      };
      return c.forEach((y, p) => {
        c[p].onTopOfStack = v(y.id), c[p].getParentModal = () => p < 1 ? null : c.slice(0, p).reverse().find((x) => x.isOpen), c[p].getChildModal = () => p === c.length - 1 ? null : c.slice(p + 1).find((x) => x.isOpen);
      }), c;
    });
  };
  L(() => {
    pt = t;
  }, [t]);
  class a {
    constructor(u, c, v, y, p) {
      K(this, "show", () => {
        i(
          (u) => u.map((c) => (c.id === this.id && !c.isOpen && (c.isOpen = !0, c.shouldRender = !0), c))
        );
      });
      K(this, "setOpen", (u) => {
        u ? this.show() : this.close();
      });
      K(this, "close", () => {
        i((u) => {
          let c = !1;
          const v = u.map((y) => {
            var p;
            return y.id === this.id && y.isOpen && (Object.keys(y.listeners).forEach((x) => {
              y.off(x);
            }), y.isOpen = !1, (p = y.onCloseCallback) == null || p.call(y), c = !0), y;
          });
          return c ? v : u;
        });
      });
      K(this, "afterLeave", () => {
        this.isOpen || i((u) => {
          const c = u.map((v) => {
            var y;
            return v.id === this.id && !v.isOpen && (v.shouldRender = !1, (y = v.afterLeaveCallback) == null || y.call(v), v.afterLeaveCallback = null), v;
          });
          return this.index === 0 ? [] : c;
        });
      });
      K(this, "on", (u, c) => {
        u = Pe(u), this.listeners[u] = this.listeners[u] ?? [], this.listeners[u].push(c);
      });
      K(this, "off", (u, c) => {
        var v;
        u = Pe(u), c ? this.listeners[u] = ((v = this.listeners[u]) == null ? void 0 : v.filter((y) => y !== c)) ?? [] : delete this.listeners[u];
      });
      K(this, "emit", (u, ...c) => {
        var v;
        (v = this.listeners[Pe(u)]) == null || v.forEach((y) => y(...c));
      });
      K(this, "registerEventListenersFromProps", (u) => {
        const c = [];
        return Object.keys(u).filter((v) => v.startsWith("on")).forEach((v) => {
          const y = Pe(v).replace(/^on-/, "");
          this.on(y, u[v]), c.push(() => this.off(y, u[v]));
        }), () => c.forEach((v) => v());
      });
      K(this, "reload", (u = {}) => {
        var p, x;
        let c = Object.keys(this.response.props);
        if (u.only && (c = u.only), u.except && (c = en(c, u.except)), !((p = this.response) != null && p.url))
          return;
        const v = (u.method ?? "get").toLowerCase(), y = u.data ?? {};
        (x = u.onStart) == null || x.call(u), Ge({
          url: this.response.url,
          method: v,
          data: v === "get" ? {} : y,
          params: v === "get" ? y : {},
          headers: {
            ...u.headers ?? {},
            Accept: "text/html, application/xhtml+xml",
            "X-Inertia": !0,
            "X-Inertia-Partial-Component": this.response.component,
            "X-Inertia-Version": this.response.version,
            "X-Inertia-Partial-Data": c.join(","),
            "X-InertiaUI-Modal": ft(),
            "X-InertiaUI-Modal-Use-Router": 0,
            "X-InertiaUI-Modal-Base-Url": xe
          }
        }).then((O) => {
          var N;
          this.updateProps(O.data.props), (N = u.onSuccess) == null || N.call(u, O);
        }).catch((O) => {
          var N;
          (N = u.onError) == null || N.call(u, O);
        }).finally(() => {
          var O;
          (O = u.onFinish) == null || O.call(u);
        });
      });
      K(this, "updateProps", (u) => {
        Object.assign(this.props, u), i((c) => c);
      });
      if (this.id = c.id ?? ft(), this.isOpen = !1, this.shouldRender = !1, this.listeners = {}, this.component = u, this.props = c.props, this.response = c, this.config = v ?? {}, this.onCloseCallback = y, this.afterLeaveCallback = p, ye[this.id]) {
        this.config = {
          ...this.config,
          ...ye[this.id].config ?? {}
        };
        const x = ye[this.id].onClose, O = ye[this.id].onAfterLeave;
        x && (this.onCloseCallback = y ? () => {
          y(), x();
        } : x), O && (this.afterLeaveCallback = p ? () => {
          p(), O();
        } : O), delete ye[this.id];
      }
      this.index = -1, this.getParentModal = () => null, this.getChildModal = () => null, this.onTopOfStack = !0;
    }
    static generateId() {
      return typeof crypto < "u" && typeof crypto.randomUUID == "function" ? `inertiaui_modal_${crypto.randomUUID()}` : `inertiaui_modal_${Date.now().toString(36)}_${Math.random().toString(36).substr(2, 9)}`;
    }
  }
  const s = (h, u = {}, c = null, v = null) => nr(h.component).then((y) => d(y, h, u, c, v)), o = (h) => {
    var c, v;
    const u = (v = (c = h.response) == null ? void 0 : c.meta) == null ? void 0 : v.deferredProps;
    u && Object.keys(u).forEach((y) => {
      h.reload({ only: u[y] });
    });
  }, d = (h, u, c, v, y) => {
    const p = new a(h, u, c, v, y);
    return p.index = t.length, i((x) => [...x, p]), o(p), p.show(), p;
  };
  function m(h, u, c, v) {
    if (!n[h])
      throw new Error(`The local modal "${h}" has not been registered.`);
    const y = d(null, {}, u, c, v);
    return y.name = h, n[h].callback(y), y;
  }
  const g = (h, u = {}) => w(
    h,
    u.method ?? "get",
    u.data ?? {},
    u.headers ?? {},
    u.config ?? {},
    u.onClose,
    u.onAfterLeave,
    u.queryStringArrayFormat ?? "brackets",
    u.navigate ?? Lt("navigate"),
    u.onStart,
    u.onSuccess,
    u.onError
  ).then((c) => {
    const v = u.listeners ?? {};
    return Object.keys(v).forEach((y) => {
      const p = Pe(y);
      c.on(p, v[y]);
    }), c;
  }), w = (h, u, c = {}, v = {}, y = {}, p = null, x = null, O = "brackets", N = !1, D = null, C = null, I = null) => {
    const B = ft();
    return new Promise((R, k) => {
      if (h.startsWith("#")) {
        R(m(h.substring(1), y, p, x));
        return;
      }
      const [j, ge] = Yr(u, h || "", c, O);
      let ce = N;
      if (t.length === 0 && (xe = typeof window < "u" ? window.location.href : ""), v = {
        ...v,
        Accept: "text/html, application/xhtml+xml",
        "X-Requested-With": "XMLHttpRequest",
        "X-Inertia": !0,
        "X-Inertia-Version": rr,
        "X-InertiaUI-Modal": B,
        "X-InertiaUI-Modal-Use-Router": ce ? 1 : 0,
        "X-InertiaUI-Modal-Base-Url": xe
      }, ce)
        return Ve = {}, ye[B] = {
          config: y,
          onClose: p,
          onAfterLeave: x
        }, Me.visit(j, {
          method: u,
          data: ge,
          headers: v,
          preserveScroll: !0,
          preserveState: !0,
          onError(...A) {
            I == null || I(...A), k(...A);
          },
          onStart(...A) {
            D == null || D(...A);
          },
          onSuccess(...A) {
            C == null || C(...A);
          },
          onBefore: () => {
            Ve[B] = R;
          }
        });
      D == null || D();
      const Q = (A) => {
        try {
          _t.progress && A(_t.progress);
        } catch {
        }
      };
      Q((A) => A.start()), Ge({
        url: j,
        method: u,
        data: ge,
        headers: v
      }).then((A) => {
        C == null || C(A), R(s(A.data, y, p, x));
      }).catch((...A) => {
        I == null || I(...A), k(...A);
      }).finally(() => {
        Q((A) => A.finish());
      });
    });
  }, E = {
    stack: t,
    localModals: n,
    push: d,
    pushFromResponseData: s,
    length: () => pt.length,
    closeAll: () => {
      pt.reverse().forEach((h) => h.close());
    },
    reset: () => i(() => []),
    visit: w,
    visitModal: g,
    registerLocalModal: (h, u) => {
      l((c) => ({
        ...c,
        [h]: { name: h, callback: u }
      }));
    },
    removeLocalModal: (h) => {
      l((u) => {
        const c = { ...u };
        return delete c[h], c;
      });
    },
    onModalOnBase: (h) => {
      const u = Ve[h.id];
      u && (u(h), delete Ve[h.id]);
    }
  };
  return /* @__PURE__ */ P(Qe.Provider, { value: E, children: e });
}, et = () => {
  const e = H(Qe);
  if (e === null)
    throw new Error("useModalStack must be used within a ModalStackProvider");
  return e;
}, Dt = ["closeButton", "closeExplicitly", "maxWidth", "paddingClasses", "panelClasses", "position", "slideover"], on = (e) => {
  e.initialPage && (rr = e.initialPage.version), e.resolveComponent && (nr = e.resolveComponent);
}, Mi = (e, t) => (on(t), /* @__PURE__ */ P(ln, { children: /* @__PURE__ */ P(e, { ...t, children: ({ Component: n, props: l, key: i }) => /* @__PURE__ */ he(Mt, { children: [
  (() => {
    const s = Re(n, { key: i, ...l });
    return typeof n.layout == "function" ? n.layout(s) : Array.isArray(n.layout) ? n.layout.concat(s).reverse().reduce((d, m) => Re(m, l, d)) : s;
  })(),
  /* @__PURE__ */ P(an, {})
] }) }) })), an = ({ children: e }) => {
  var o, d;
  const t = H(Qe), r = qr();
  let n = !1, l = !1, i = !!((o = r.props) != null && o._inertiaui_modal);
  L(() => Me.on("start", () => n = !0), []), L(() => Me.on("finish", () => n = !1), []), L(
    () => Me.on("navigate", function(m) {
      const g = m.detail.page.props._inertiaui_modal;
      if (!g) {
        l && t.closeAll(), xe = null, i = !1;
        return;
      }
      l = g, xe = g.baseUrl, t.pushFromResponseData(g, {}, () => {
        if (!g.baseUrl) {
          console.error("No base url in modal response data so cannot navigate back");
          return;
        }
        !n && typeof window < "u" && window.location.href !== g.baseUrl && Me.visit(g.baseUrl, {
          preserveScroll: !0,
          preserveState: !0
        });
      }).then(t.onModalOnBase);
    }),
    []
  );
  const a = (m) => {
    var g;
    return m.headers["X-InertiaUI-Modal-Base-Url"] = xe ?? (i ? (g = r.props._inertiaui_modal) == null ? void 0 : g.baseUrl : null), m;
  };
  L(() => (Ge.interceptors.request.use(a), () => Ge.interceptors.request.eject(a)), []);
  const s = S();
  return L(() => {
    var w, b;
    const m = (w = r.props) == null ? void 0 : w._inertiaui_modal, g = s.current;
    s.current = m, m && g && m.component === g.component && Qr(m.url, g.url) && ((b = t.stack[0]) == null || b.updateProps(m.props ?? {}));
  }, [(d = r.props) == null ? void 0 : d._inertiaui_modal]), /* @__PURE__ */ he(Mt, { children: [
    e,
    t.stack.length > 0 && /* @__PURE__ */ P(ir, { index: 0 })
  ] });
}, kt = $.createContext(null);
kt.displayName = "ModalIndexContext";
const lr = () => {
  const e = $.useContext(kt);
  if (e === void 0)
    throw new Error("useModalIndex must be used within a ModalIndexProvider");
  return e;
}, ir = ({ index: e }) => {
  const { stack: t } = et(), r = _(() => t[e], [t, e]);
  return (r == null ? void 0 : r.component) && /* @__PURE__ */ P(kt.Provider, { value: e, children: /* @__PURE__ */ P(
    r.component,
    {
      ...r.props,
      onModalEvent: (...n) => r.emit(...n)
    }
  ) });
};
function or() {
  return et().stack[lr()] ?? null;
}
const sn = ({ children: e, data: t, fallback: r }) => {
  if (!t)
    throw new Error("`<Deferred>` requires a `data` prop to be a string or array of strings");
  const [n, l] = F(!1), i = Array.isArray(t) ? t : [t], a = or().props;
  return L(() => {
    l(i.every((s) => a[s] !== void 0));
  }, [a, i]), n ? e : r;
};
sn.displayName = "InertiaModalDeferred";
const ar = Pt(({ name: e, children: t, onFocus: r = null, onBlur: n = null, onClose: l = null, onSuccess: i = null, ...a }, s) => {
  const o = lr(), { stack: d, registerLocalModal: m, removeLocalModal: g } = et(), [w, b] = F(null), f = _(() => e ? w : d[o], [e, w, o, d]), E = _(() => {
    var p;
    return (p = d.find((x) => x.shouldRender && x.index > (f == null ? void 0 : f.index))) == null ? void 0 : p.index;
  }, [o, d]), h = _(() => (f == null ? void 0 : f.config.slideover) ?? a.slideover ?? Lt("type") === "slideover", [a.slideover]), u = _(
    () => ({
      slideover: h,
      closeButton: a.closeButton ?? we(h, "closeButton"),
      closeExplicitly: a.closeExplicitly ?? we(h, "closeExplicitly"),
      maxWidth: a.maxWidth ?? we(h, "maxWidth"),
      paddingClasses: a.paddingClasses ?? we(h, "paddingClasses"),
      panelClasses: a.panelClasses ?? we(h, "panelClasses"),
      position: a.position ?? we(h, "position"),
      ...f == null ? void 0 : f.config
    }),
    [a, f == null ? void 0 : f.config]
  );
  L(() => {
    if (e) {
      let p = null;
      return m(e, (x) => {
        p = x.registerEventListenersFromProps(a), b(x);
      }), () => {
        p == null || p(), p = null, g(e);
      };
    }
    return f.registerEventListenersFromProps(a);
  }, [e]);
  const c = S(f);
  L(() => {
    c.current = f;
  }, [f]), L(() => {
    f !== null && (f.isOpen ? i == null || i() : l == null || l());
  }, [f == null ? void 0 : f.isOpen]);
  const [v, y] = F(!1);
  return L(() => {
    v && f !== null && f.isOpen && (f.onTopOfStack ? r == null || r() : n == null || n()), y(!0);
  }, [f == null ? void 0 : f.onTopOfStack]), tr(
    s,
    () => ({
      afterLeave: () => {
        var p;
        return (p = c.current) == null ? void 0 : p.afterLeave();
      },
      close: () => {
        var p;
        return (p = c.current) == null ? void 0 : p.close();
      },
      emit: (...p) => {
        var x;
        return (x = c.current) == null ? void 0 : x.emit(...p);
      },
      getChildModal: () => {
        var p;
        return (p = c.current) == null ? void 0 : p.getChildModal();
      },
      getParentModal: () => {
        var p;
        return (p = c.current) == null ? void 0 : p.getParentModal();
      },
      reload: (...p) => {
        var x;
        return (x = c.current) == null ? void 0 : x.reload(...p);
      },
      setOpen: () => {
        var p;
        return (p = c.current) == null ? void 0 : p.setOpen();
      },
      get id() {
        var p;
        return (p = c.current) == null ? void 0 : p.id;
      },
      get index() {
        var p;
        return (p = c.current) == null ? void 0 : p.index;
      },
      get isOpen() {
        var p;
        return (p = c.current) == null ? void 0 : p.isOpen;
      },
      get config() {
        var p;
        return (p = c.current) == null ? void 0 : p.config;
      },
      get modalContext() {
        return c.current;
      },
      get onTopOfStack() {
        var p;
        return (p = c.current) == null ? void 0 : p.onTopOfStack;
      },
      get shouldRender() {
        var p;
        return (p = c.current) == null ? void 0 : p.shouldRender;
      }
    }),
    [f]
  ), (f == null ? void 0 : f.shouldRender) && /* @__PURE__ */ he(Mt, { children: [
    typeof t == "function" ? t({
      afterLeave: f.afterLeave,
      close: f.close,
      config: u,
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
    E && /* @__PURE__ */ P(ir, { index: E })
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
var un = Object.defineProperty, cn = (e, t, r) => t in e ? un(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, mt = (e, t, r) => (cn(e, typeof t != "symbol" ? t + "" : t, r), r);
let dn = class {
  constructor() {
    mt(this, "current", this.detect()), mt(this, "handoffState", "pending"), mt(this, "currentId", 0);
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
  let e = [], t = { addEventListener(r, n, l, i) {
    return r.addEventListener(n, l, i), t.add(() => r.removeEventListener(n, l, i));
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
    let i = r.style.getPropertyValue(n);
    return Object.assign(r.style, { [n]: l }), this.add(() => {
      Object.assign(r.style, { [n]: i });
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
  return L(() => () => e.dispose(), [e]), e;
}
let U = (e, t) => {
  Z.isServer ? L(e, t) : Vr(e, t);
};
function ve(e) {
  let t = S(e);
  return U(() => {
    t.current = e;
  }, [e]), t;
}
let M = function(e) {
  let t = ve(e);
  return $.useCallback((...r) => t.current(...r), [t]);
};
function je(e) {
  return _(() => e, Object.values(e));
}
let pn = z(void 0);
function mn() {
  return H(pn);
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
var qe = ((e) => (e[e.None = 0] = "None", e[e.RenderStrategy = 1] = "RenderStrategy", e[e.Static = 2] = "Static", e))(qe || {}), oe = ((e) => (e[e.Unmount = 0] = "Unmount", e[e.Hidden = 1] = "Hidden", e))(oe || {});
function G() {
  let e = vn();
  return W((t) => hn({ mergeRefs: e, ...t }), [e]);
}
function hn({ ourProps: e, theirProps: t, slot: r, defaultTag: n, features: l, visible: i = !0, name: a, mergeRefs: s }) {
  s = s ?? gn;
  let o = cr(t, e);
  if (i) return Be(o, r, n, a, s);
  let d = l ?? 0;
  if (d & 2) {
    let { static: m = !1, ...g } = o;
    if (m) return Be(g, r, n, a, s);
  }
  if (d & 1) {
    let { unmount: m = !0, ...g } = o;
    return re(m ? 0 : 1, { 0() {
      return null;
    }, 1() {
      return Be({ ...g, hidden: !0, style: { display: "none" } }, r, n, a, s);
    } });
  }
  return Be(o, r, n, a, s);
}
function Be(e, t = {}, r, n, l) {
  let { as: i = r, children: a, refName: s = "ref", ...o } = ht(e, ["unmount", "static"]), d = e.ref !== void 0 ? { [s]: e.ref } : {}, m = typeof a == "function" ? a(t) : a;
  "className" in o && o.className && typeof o.className == "function" && (o.className = o.className(t)), o["aria-labelledby"] && o["aria-labelledby"] === o.id && (o["aria-labelledby"] = void 0);
  let g = {};
  if (t) {
    let w = !1, b = [];
    for (let [f, E] of Object.entries(t)) typeof E == "boolean" && (w = !0), E === !0 && b.push(f.replace(/([A-Z])/g, (h) => `-${h.toLowerCase()}`));
    if (w) {
      g["data-headlessui-state"] = b.join(" ");
      for (let f of b) g[`data-${f}`] = "";
    }
  }
  if (Fe(i) && (Object.keys(de(o)).length > 0 || Object.keys(de(g)).length > 0)) if (!Br(m) || Array.isArray(m) && m.length > 1 || yn(m)) {
    if (Object.keys(de(o)).length > 0) throw new Error(['Passing props on "Fragment"!', "", `The current component <${n} /> is rendering a "Fragment".`, "However we need to passthrough the following props:", Object.keys(de(o)).concat(Object.keys(de(g))).map((w) => `  - ${w}`).join(`
`), "", "You can apply a few solutions:", ['Add an `as="..."` prop, to ensure that we render an actual element instead of a "Fragment".', "Render a single element as the child so that we can forward the props onto that element."].map((w) => `  - ${w}`).join(`
`)].join(`
`));
  } else {
    let w = m.props, b = w == null ? void 0 : w.className, f = typeof b == "function" ? (...u) => xt(b(...u), o.className) : xt(b, o.className), E = f ? { className: f } : {}, h = cr(m.props, de(ht(o, ["ref"])));
    for (let u in g) u in h && delete g[u];
    return Xr(m, Object.assign({}, h, g, d, { ref: l(wn(m), d.ref) }, E));
  }
  return Re(i, Object.assign({}, ht(o, ["ref"]), !Fe(i) && d, !Fe(i) && g), m);
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
    var i;
    return (i = l == null ? void 0 : l.preventDefault) == null ? void 0 : i.call(l);
  }]);
  for (let n in r) Object.assign(t, { [n](l, ...i) {
    let a = r[n];
    for (let s of a) {
      if ((l instanceof Event || (l == null ? void 0 : l.nativeEvent) instanceof Event) && l.defaultPrevented) return;
      s(l, ...i);
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
  let { features: n = 1, ...l } = e, i = { ref: t, "aria-hidden": (n & 2) === 2 ? !0 : (r = l["aria-hidden"]) != null ? r : void 0, hidden: (n & 4) === 4 ? !0 : void 0, style: { position: "fixed", top: 1, left: 1, width: 1, height: 0, padding: 0, margin: -1, overflow: "hidden", clip: "rect(0, 0, 0, 0)", whiteSpace: "nowrap", borderWidth: "0", ...(n & 4) === 4 && (n & 2) !== 2 && { display: "none" } } };
  return G()({ ourProps: i, theirProps: l, slot: {}, defaultTag: bn, name: "Hidden" });
}
let Et = V(xn);
function En(e) {
  return typeof e != "object" || e === null ? !1 : "nodeType" in e;
}
function se(e) {
  return En(e) && "tagName" in e;
}
function me(e) {
  return se(e) && "accessKey" in e;
}
function ae(e) {
  return se(e) && "tabIndex" in e;
}
function $n(e) {
  return se(e) && "style" in e;
}
function On(e) {
  return me(e) && e.nodeName === "IFRAME";
}
function Sn(e) {
  return me(e) && e.nodeName === "INPUT";
}
let dr = Symbol();
function Tn(e, t = !0) {
  return Object.assign(e, { [dr]: t });
}
function J(...e) {
  let t = S(e);
  L(() => {
    t.current = e;
  }, [e]);
  let r = M((n) => {
    for (let l of t.current) l != null && (typeof l == "function" ? l(n) : l.current = n);
  });
  return e.every((n) => n == null || (n == null ? void 0 : n[dr])) ? void 0 : r;
}
let At = z(null);
At.displayName = "DescriptionContext";
function fr() {
  let e = H(At);
  if (e === null) {
    let t = new Error("You used a <Description /> component, but it is not inside a relevant parent.");
    throw Error.captureStackTrace && Error.captureStackTrace(t, fr), t;
  }
  return e;
}
function Pn() {
  let [e, t] = F([]);
  return [e.length > 0 ? e.join(" ") : void 0, _(() => function(r) {
    let n = M((i) => (t((a) => [...a, i]), () => t((a) => {
      let s = a.slice(), o = s.indexOf(i);
      return o !== -1 && s.splice(o, 1), s;
    }))), l = _(() => ({ register: n, slot: r.slot, name: r.name, props: r.props, value: r.value }), [n, r.slot, r.name, r.props, r.value]);
    return $.createElement(At.Provider, { value: l }, r.children);
  }, [t])];
}
let Mn = "p";
function Ln(e, t) {
  let r = _e(), n = mn(), { id: l = `headlessui-description-${r}`, ...i } = e, a = fr(), s = J(t);
  U(() => a.register(l), [l, a.register]);
  let o = je({ ...a.slot, disabled: n || !1 }), d = { ref: s, ...a.props, id: l };
  return G()({ ourProps: d, theirProps: i, slot: o, defaultTag: Mn, name: a.name || "Description" });
}
let kn = V(Ln), An = Object.assign(kn, {});
var pr = ((e) => (e.Space = " ", e.Enter = "Enter", e.Escape = "Escape", e.Backspace = "Backspace", e.Delete = "Delete", e.ArrowLeft = "ArrowLeft", e.ArrowUp = "ArrowUp", e.ArrowRight = "ArrowRight", e.ArrowDown = "ArrowDown", e.Home = "Home", e.End = "End", e.PageUp = "PageUp", e.PageDown = "PageDown", e.Tab = "Tab", e))(pr || {});
let Cn = z(() => {
});
function Fn({ value: e, children: t }) {
  return $.createElement(Cn.Provider, { value: e }, t);
}
let mr = class extends Map {
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
}, X = (e, t, r) => (hr(e, t, "read from private field"), r ? r.call(e) : t.get(e)), vt = (e, t, r) => {
  if (t.has(e)) throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(e) : t.set(e, r);
}, jt = (e, t, r, n) => (hr(e, t, "write to private field"), t.set(e, r), r), Y, Le, ke;
let _n = class {
  constructor(t) {
    vt(this, Y, {}), vt(this, Le, new mr(() => /* @__PURE__ */ new Set())), vt(this, ke, /* @__PURE__ */ new Set()), Rn(this, "disposables", ne()), jt(this, Y, t), Z.isServer && this.disposables.microTask(() => {
      this.dispose();
    });
  }
  dispose() {
    this.disposables.dispose();
  }
  get state() {
    return X(this, Y);
  }
  subscribe(t, r) {
    if (Z.isServer) return () => {
    };
    let n = { selector: t, callback: r, current: t(X(this, Y)) };
    return X(this, ke).add(n), this.disposables.add(() => {
      X(this, ke).delete(n);
    });
  }
  on(t, r) {
    return Z.isServer ? () => {
    } : (X(this, Le).get(t).add(r), this.disposables.add(() => {
      X(this, Le).get(t).delete(r);
    }));
  }
  send(t) {
    let r = this.reduce(X(this, Y), t);
    if (r !== X(this, Y)) {
      jt(this, Y, r);
      for (let n of X(this, ke)) {
        let l = n.selector(X(this, Y));
        vr(n.current, l) || (n.current = l, n.callback(l));
      }
      for (let n of X(this, Le).get(t.type)) n(X(this, Y), t);
    }
  }
};
Y = /* @__PURE__ */ new WeakMap(), Le = /* @__PURE__ */ new WeakMap(), ke = /* @__PURE__ */ new WeakMap();
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
    let i = e.stack.slice();
    return i.splice(l, 1), i.push(r), n = i, { ...e, stack: n };
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
const wr = new mr(() => Hn.new());
var Xe = { exports: {} }, wt = {};
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
  function t(o, d) {
    return o === d && (o !== 0 || 1 / o === 1 / d) || o !== o && d !== d;
  }
  var r = typeof Object.is == "function" ? Object.is : t, n = e.useSyncExternalStore, l = e.useRef, i = e.useEffect, a = e.useMemo, s = e.useDebugValue;
  return wt.useSyncExternalStoreWithSelector = function(o, d, m, g, w) {
    var b = l(null);
    if (b.current === null) {
      var f = { hasValue: !1, value: null };
      b.current = f;
    } else f = b.current;
    b = a(
      function() {
        function h(p) {
          if (!u) {
            if (u = !0, c = p, p = g(p), w !== void 0 && f.hasValue) {
              var x = f.value;
              if (w(x, p))
                return v = x;
            }
            return v = p;
          }
          if (x = v, r(c, p)) return x;
          var O = g(p);
          return w !== void 0 && w(x, O) ? (c = p, x) : (c = p, v = O);
        }
        var u = !1, c, v, y = m === void 0 ? null : m;
        return [
          function() {
            return h(d());
          },
          y === null ? void 0 : function() {
            return h(y());
          }
        ];
      },
      [d, m, g, w]
    );
    var E = n(o, b[0], b[1]);
    return i(
      function() {
        f.hasValue = !0, f.value = E;
      },
      [E]
    ), s(E), E;
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
    function e(o, d) {
      return o === d && (o !== 0 || 1 / o === 1 / d) || o !== o && d !== d;
    }
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
    var t = $, r = typeof Object.is == "function" ? Object.is : e, n = t.useSyncExternalStore, l = t.useRef, i = t.useEffect, a = t.useMemo, s = t.useDebugValue;
    yt.useSyncExternalStoreWithSelector = function(o, d, m, g, w) {
      var b = l(null);
      if (b.current === null) {
        var f = { hasValue: !1, value: null };
        b.current = f;
      } else f = b.current;
      b = a(
        function() {
          function h(p) {
            if (!u) {
              if (u = !0, c = p, p = g(p), w !== void 0 && f.hasValue) {
                var x = f.value;
                if (w(x, p))
                  return v = x;
              }
              return v = p;
            }
            if (x = v, r(c, p))
              return x;
            var O = g(p);
            return w !== void 0 && w(x, O) ? (c = p, x) : (c = p, v = O);
          }
          var u = !1, c, v, y = m === void 0 ? null : m;
          return [
            function() {
              return h(d());
            },
            y === null ? void 0 : function() {
              return h(y());
            }
          ];
        },
        [d, m, g, w]
      );
      var E = n(o, b[0], b[1]);
      return i(
        function() {
          f.hasValue = !0, f.value = E;
        },
        [E]
      ), s(E), E;
    }, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
  })()), yt;
}
var Bt;
function Xn() {
  return Bt || (Bt = 1, process.env.NODE_ENV === "production" ? Xe.exports = Vn() : Xe.exports = Bn()), Xe.exports;
}
var zn = Xn();
function yr(e, t, r = vr) {
  return zn.useSyncExternalStoreWithSelector(M((n) => e.subscribe(Gn, n)), M(() => e.state), M(() => e.state), M(t), r);
}
function Gn(e) {
  return e;
}
function We(e, t) {
  let r = _e(), n = wr.get(t), [l, i] = yr(n, W((a) => [n.selectors.isTop(a, r), n.selectors.inStack(a, r)], [n, r]));
  return U(() => {
    if (e) return n.actions.push(r), () => n.actions.pop(r);
  }, [n, e, r]), e ? i ? l : !0 : !1;
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
    var l, i;
    if (!n) return;
    let a = ne();
    for (let o of (l = r == null ? void 0 : r()) != null ? l : []) o && a.add(Xt(o));
    let s = (i = t == null ? void 0 : t()) != null ? i : [];
    for (let o of s) {
      if (!o) continue;
      let d = De(o);
      if (!d) continue;
      let m = o.parentElement;
      for (; m && m !== d.body; ) {
        for (let g of m.children) s.some((w) => g.contains(w)) || a.add(Xt(g));
        m = m.parentElement;
      }
    }
    return a.dispose;
  }, [n, t, r]);
}
function qn(e, t, r) {
  let n = ve((l) => {
    let i = l.getBoundingClientRect();
    i.x === 0 && i.y === 0 && i.width === 0 && i.height === 0 && r();
  });
  L(() => {
    if (!e) return;
    let l = t === null ? null : me(t) ? t : t.current;
    if (!l) return;
    let i = ne();
    if (typeof ResizeObserver < "u") {
      let a = new ResizeObserver(() => n.current(l));
      a.observe(l), i.add(() => a.disconnect());
    }
    if (typeof IntersectionObserver < "u") {
      let a = new IntersectionObserver(() => n.current(l));
      a.observe(l), i.add(() => a.disconnect());
    }
    return () => i.dispose();
  }, [t, n, e]);
}
let Ze = ["[contentEditable=true]", "[tabindex]", "a[href]", "area[href]", "button:not([disabled])", "iframe", "input:not([disabled])", "select:not([disabled])", "details>summary", "textarea:not([disabled])"].map((e) => `${e}:not([tabindex='-1'])`).join(","), Yn = ["[data-autofocus]"].map((e) => `${e}:not([tabindex='-1'])`).join(",");
var ee = ((e) => (e[e.First = 1] = "First", e[e.Previous = 2] = "Previous", e[e.Next = 4] = "Next", e[e.Last = 8] = "Last", e[e.WrapAround = 16] = "WrapAround", e[e.NoScroll = 32] = "NoScroll", e[e.AutoFocus = 64] = "AutoFocus", e))(ee || {}), Ot = ((e) => (e[e.Error = 0] = "Error", e[e.Overflow = 1] = "Overflow", e[e.Success = 2] = "Success", e[e.Underflow = 3] = "Underflow", e))(Ot || {}), Zn = ((e) => (e[e.Previous = -1] = "Previous", e[e.Next = 1] = "Next", e))(Zn || {});
function Jn(e = document.body) {
  return e == null ? [] : Array.from(e.querySelectorAll(Ze)).sort((t, r) => Math.sign((t.tabIndex || Number.MAX_SAFE_INTEGER) - (r.tabIndex || Number.MAX_SAFE_INTEGER)));
}
function Qn(e = document.body) {
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
    let l = t(r), i = t(n);
    if (l === null || i === null) return 0;
    let a = l.compareDocumentPosition(i);
    return a & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : a & Node.DOCUMENT_POSITION_PRECEDING ? 1 : 0;
  });
}
function Ie(e, t, { sorted: r = !0, relativeTo: n = null, skipElements: l = [] } = {}) {
  let i = Array.isArray(e) ? e.length > 0 ? bt(e[0]) : document : bt(e), a = Array.isArray(e) ? r ? ll(e) : e : t & 64 ? Qn(e) : Jn(e);
  l.length > 0 && a.length > 1 && (a = a.filter((b) => !l.some((f) => f != null && "current" in f ? (f == null ? void 0 : f.current) === b : f === b))), n = n ?? (i == null ? void 0 : i.activeElement);
  let s = (() => {
    if (t & 5) return 1;
    if (t & 10) return -1;
    throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last");
  })(), o = (() => {
    if (t & 1) return 0;
    if (t & 2) return Math.max(0, a.indexOf(n)) - 1;
    if (t & 4) return Math.max(0, a.indexOf(n)) + 1;
    if (t & 8) return a.length - 1;
    throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last");
  })(), d = t & 32 ? { preventScroll: !0 } : {}, m = 0, g = a.length, w;
  do {
    if (m >= g || m + g <= 0) return 0;
    let b = o + m;
    if (t & 16) b = (b + g) % g;
    else {
      if (b < 0) return 3;
      if (b >= g) return 1;
    }
    w = a[b], w == null || w.focus(d), m += s;
  } while (w !== ur(w));
  return t & 6 && nl(w) && w.select(), 2;
}
function xr() {
  return /iPhone/gi.test(window.navigator.platform) || /Mac/gi.test(window.navigator.platform) && window.navigator.maxTouchPoints > 0;
}
function il() {
  return /Android/gi.test(window.navigator.userAgent);
}
function Gt() {
  return xr() || il();
}
function ze(e, t, r, n) {
  let l = ve(r);
  L(() => {
    if (!e) return;
    function i(a) {
      l.current(a);
    }
    return document.addEventListener(t, i, n), () => document.removeEventListener(t, i, n);
  }, [e, t, n]);
}
function Er(e, t, r, n) {
  let l = ve(r);
  L(() => {
    if (!e) return;
    function i(a) {
      l.current(a);
    }
    return window.addEventListener(t, i, n), () => window.removeEventListener(t, i, n);
  }, [e, t, n]);
}
const Kt = 30;
function ol(e, t, r) {
  let n = ve(r), l = W(function(s, o) {
    if (s.defaultPrevented) return;
    let d = o(s);
    if (d === null || !d.getRootNode().contains(d) || !d.isConnected) return;
    let m = (function g(w) {
      return typeof w == "function" ? g(w()) : Array.isArray(w) || w instanceof Set ? w : [w];
    })(t);
    for (let g of m) if (g !== null && (g.contains(d) || s.composed && s.composedPath().includes(g))) return;
    return !el(d, br.Loose) && d.tabIndex !== -1 && s.preventDefault(), n.current(s, d);
  }, [n, t]), i = S(null);
  ze(e, "pointerdown", (s) => {
    var o, d;
    Gt() || (i.current = ((d = (o = s.composedPath) == null ? void 0 : o.call(s)) == null ? void 0 : d[0]) || s.target);
  }, !0), ze(e, "pointerup", (s) => {
    if (Gt() || !i.current) return;
    let o = i.current;
    return i.current = null, l(s, () => o);
  }, !0);
  let a = S({ x: 0, y: 0 });
  ze(e, "touchstart", (s) => {
    a.current.x = s.touches[0].clientX, a.current.y = s.touches[0].clientY;
  }, !0), ze(e, "touchend", (s) => {
    let o = { x: s.changedTouches[0].clientX, y: s.changedTouches[0].clientY };
    if (!(Math.abs(o.x - a.current.x) >= Kt || Math.abs(o.y - a.current.y) >= Kt)) return l(s, () => ae(s.target) ? s.target : null);
  }, !0), Er(e, "blur", (s) => l(s, () => On(window.document.activeElement) ? window.document.activeElement : null), !0);
}
function Ct(...e) {
  return _(() => De(...e), [...e]);
}
function $r(e, t, r, n) {
  let l = ve(r);
  L(() => {
    e = e ?? window;
    function i(a) {
      l.current(a);
    }
    return e.addEventListener(t, i, n), () => e.removeEventListener(t, i, n);
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
  }, dispatch(l, ...i) {
    let a = t[l].call(r, ...i);
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
    let n = t.documentElement, l = Math.max(0, n.clientWidth - n.offsetWidth), i = Math.max(0, e - l);
    r.style(n, "paddingRight", `${i}px`);
  } };
}
function cl() {
  return xr() ? { before({ doc: e, d: t, meta: r }) {
    function n(l) {
      for (let i of r().containers) for (let a of i()) if (a.contains(l)) return !0;
      return !1;
    }
    t.microTask(() => {
      var l;
      if (window.getComputedStyle(e.documentElement).scrollBehavior !== "auto") {
        let s = ne();
        s.style(e.documentElement, "scrollBehavior", "auto"), t.add(() => t.microTask(() => s.dispose()));
      }
      let i = (l = window.scrollY) != null ? l : window.pageYOffset, a = null;
      t.addEventListener(e, "click", (s) => {
        if (ae(s.target)) try {
          let o = s.target.closest("a");
          if (!o) return;
          let { hash: d } = new URL(o.href), m = e.querySelector(d);
          ae(m) && !n(m) && (a = m);
        } catch {
        }
      }, !0), t.group((s) => {
        t.addEventListener(e, "touchstart", (o) => {
          if (s.dispose(), ae(o.target) && $n(o.target)) if (n(o.target)) {
            let d = o.target;
            for (; d.parentElement && n(d.parentElement); ) d = d.parentElement;
            s.style(d, "overscrollBehavior", "contain");
          } else s.style(o.target, "touchAction", "none");
        });
      }), t.addEventListener(e, "touchmove", (s) => {
        if (ae(s.target)) {
          if (Sn(s.target)) return;
          if (n(s.target)) {
            let o = s.target;
            for (; o.parentElement && o.dataset.headlessuiPortal !== "" && !(o.scrollHeight > o.clientHeight || o.scrollWidth > o.clientWidth); ) o = o.parentElement;
            o.dataset.headlessuiPortal === "" && s.preventDefault();
          } else s.preventDefault();
        }
      }, { passive: !1 }), t.add(() => {
        var s;
        let o = (s = window.scrollY) != null ? s : window.pageYOffset;
        i !== o && window.scrollTo(0, i), a && a.isConnected && (a.scrollIntoView({ block: "nearest" }), a = null);
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
let pe = sl(() => /* @__PURE__ */ new Map(), { PUSH(e, t) {
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
pe.subscribe(() => {
  let e = pe.getSnapshot(), t = /* @__PURE__ */ new Map();
  for (let [r] of e) t.set(r, r.documentElement.style.overflow);
  for (let r of e.values()) {
    let n = t.get(r.doc) === "hidden", l = r.count !== 0;
    (l && !n || !l && n) && pe.dispatch(r.count > 0 ? "SCROLL_PREVENT" : "SCROLL_ALLOW", r), r.count === 0 && pe.dispatch("TEARDOWN", r);
  }
});
function fl(e, t, r = () => ({ containers: [] })) {
  let n = al(pe), l = t ? n.get(t) : void 0, i = l ? l.count > 0 : !1;
  return U(() => {
    if (!(!t || !e)) return pe.dispatch("PUSH", t, r), () => pe.dispatch("POP", t, r);
  }, [e, t]), i;
}
function pl(e, t, r = () => [document.body]) {
  let n = We(e, "scroll-lock");
  fl(n, t, (l) => {
    var i;
    return { containers: [...(i = l.containers) != null ? i : [], r] };
  });
}
function ml(e = 0) {
  let [t, r] = F(e), n = W((o) => r(o), []), l = W((o) => r((d) => d | o), []), i = W((o) => (t & o) === o, [t]), a = W((o) => r((d) => d & ~o), []), s = W((o) => r((d) => d ^ o), []);
  return { flags: t, setFlag: n, addFlag: l, hasFlag: i, removeFlag: a, toggleFlag: s };
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
  let [l, i] = F(r), { hasFlag: a, addFlag: s, removeFlag: o } = ml(e && l ? 3 : 0), d = S(!1), m = S(!1), g = rt();
  return U(() => {
    var w;
    if (e) {
      if (r && i(!0), !t) {
        r && s(3);
        return;
      }
      return (w = n == null ? void 0 : n.start) == null || w.call(n, r), wl(t, { inFlight: d, prepare() {
        m.current ? m.current = !1 : m.current = d.current, d.current = !0, !m.current && (r ? (s(3), o(4)) : (s(4), o(2)));
      }, run() {
        m.current ? r ? (o(3), s(4)) : (o(4), s(3)) : r ? o(1) : s(1);
      }, done() {
        var b;
        m.current && xl(t) || (d.current = !1, o(7), r || i(!1), (b = n == null ? void 0 : n.end) == null || b.call(n, r));
      } });
    }
  }, [e, r, t, g]), e ? [l, { closed: a(1), enter: a(2), leave: a(4), transition: a(2) || a(4) }] : [r, { closed: void 0, enter: void 0, leave: void 0, transition: void 0 }];
}
function wl(e, { prepare: t, run: r, done: n, inFlight: l }) {
  let i = ne();
  return bl(e, { prepare: t, inFlight: l }), i.nextFrame(() => {
    r(), i.requestAnimationFrame(() => {
      i.add(yl(e, n));
    });
  }), i.dispose;
}
function yl(e, t) {
  var r, n;
  let l = ne();
  if (!e) return l.dispose;
  let i = !1;
  l.add(() => {
    i = !0;
  });
  let a = (n = (r = e.getAnimations) == null ? void 0 : r.call(e).filter((s) => s instanceof CSSTransition)) != null ? n : [];
  return a.length === 0 ? (t(), l.dispose) : (Promise.allSettled(a.map((s) => s.finished)).then(() => {
    i || t();
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
  let r = S([]), n = M(e);
  L(() => {
    let l = [...r.current];
    for (let [i, a] of t.entries()) if (r.current[i] !== a) {
      let s = n(t, l);
      return r.current = t, s;
    }
  }, [n, ...t]);
}
let nt = z(null);
nt.displayName = "OpenClosedContext";
var q = ((e) => (e[e.Open = 1] = "Open", e[e.Closed = 2] = "Closed", e[e.Closing = 4] = "Closing", e[e.Opening = 8] = "Opening", e))(q || {});
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
let ie = [];
Ol(() => {
  function e(t) {
    if (!ae(t.target) || t.target === document.body || ie[0] === t.target) return;
    let r = t.target;
    r = r.closest(Ze), ie.unshift(r ?? t.target), ie = ie.filter((n) => n != null && n.isConnected), ie.splice(10);
  }
  window.addEventListener("click", e, { capture: !0 }), window.addEventListener("mousedown", e, { capture: !0 }), window.addEventListener("focus", e, { capture: !0 }), document.body.addEventListener("click", e, { capture: !0 }), document.body.addEventListener("mousedown", e, { capture: !0 }), document.body.addEventListener("focus", e, { capture: !0 });
});
function Or(e) {
  let t = M(e), r = S(!1);
  L(() => (r.current = !1, () => {
    r.current = !0, tt(() => {
      r.current && t();
    });
  }), [t]);
}
let Sr = z(!1);
function Sl() {
  return H(Sr);
}
function Jt(e) {
  return $.createElement(Sr.Provider, { value: e.force }, e.children);
}
function Tl(e) {
  let t = Sl(), r = H(Pr), [n, l] = F(() => {
    var i;
    if (!t && r !== null) return (i = r.current) != null ? i : null;
    if (Z.isServer) return null;
    let a = e == null ? void 0 : e.getElementById("headlessui-portal-root");
    if (a) return a;
    if (e === null) return null;
    let s = e.createElement("div");
    return s.setAttribute("id", "headlessui-portal-root"), e.body.appendChild(s);
  });
  return L(() => {
    n !== null && (e != null && e.body.contains(n) || e == null || e.body.appendChild(n));
  }, [n, e]), L(() => {
    t || r !== null && l(r.current);
  }, [r, l, t]), n;
}
let Tr = ue, Pl = V(function(e, t) {
  let { ownerDocument: r = null, ...n } = e, l = S(null), i = J(Tn((w) => {
    l.current = w;
  }), t), a = Ct(l.current), s = r ?? a, o = Tl(s), d = H(St), m = rt(), g = G();
  return Or(() => {
    var w;
    o && o.childNodes.length <= 0 && ((w = o.parentElement) == null || w.removeChild(o));
  }), o ? Zr($.createElement("div", { "data-headlessui-portal": "", ref: (w) => {
    m.dispose(), d && w && m.add(d.register(w));
  } }, g({ ourProps: { ref: i }, theirProps: n, slot: {}, defaultTag: Tr, name: "Portal" })), o) : null;
});
function Ml(e, t) {
  let r = J(t), { enabled: n = !0, ownerDocument: l, ...i } = e, a = G();
  return n ? $.createElement(Pl, { ...i, ownerDocument: l, ref: r }) : a({ ourProps: { ref: r }, theirProps: i, slot: {}, defaultTag: Tr, name: "Portal" });
}
let Ll = ue, Pr = z(null);
function kl(e, t) {
  let { target: r, ...n } = e, l = { ref: J(t) }, i = G();
  return $.createElement(Pr.Provider, { value: r }, i({ ourProps: l, theirProps: n, defaultTag: Ll, name: "Popover.Group" }));
}
let St = z(null);
function Al() {
  let e = H(St), t = S([]), r = M((i) => (t.current.push(i), e && e.register(i), () => n(i))), n = M((i) => {
    let a = t.current.indexOf(i);
    a !== -1 && t.current.splice(a, 1), e && e.unregister(i);
  }), l = _(() => ({ register: r, unregister: n, portals: t }), [r, n, t]);
  return [t, _(() => function({ children: i }) {
    return $.createElement(St.Provider, { value: l }, i);
  }, [l])];
}
let Cl = V(Ml), Mr = V(kl), Fl = Object.assign(Cl, { Group: Mr });
function Nl(e, t = typeof document < "u" ? document.defaultView : null, r) {
  let n = We(e, "escape");
  $r(t, "keydown", (l) => {
    n && (l.defaultPrevented || l.key === pr.Escape && r(l));
  });
}
function Il() {
  var e;
  let [t] = F(() => typeof window < "u" && typeof window.matchMedia == "function" ? window.matchMedia("(pointer: coarse)") : null), [r, n] = F((e = t == null ? void 0 : t.matches) != null ? e : !1);
  return U(() => {
    if (!t) return;
    function l(i) {
      n(i.matches);
    }
    return t.addEventListener("change", l), () => t.removeEventListener("change", l);
  }, [t]), r;
}
function Rl({ defaultContainers: e = [], portals: t, mainTreeNode: r } = {}) {
  let n = M(() => {
    var l, i;
    let a = De(r), s = [];
    for (let o of e) o !== null && (se(o) ? s.push(o) : "current" in o && se(o.current) && s.push(o.current));
    if (t != null && t.current) for (let o of t.current) s.push(o);
    for (let o of (l = a == null ? void 0 : a.querySelectorAll("html > *, body > *")) != null ? l : []) o !== document.body && o !== document.head && se(o) && o.id !== "headlessui-portal-root" && (r && (o.contains(r) || o.contains((i = r == null ? void 0 : r.getRootNode()) == null ? void 0 : i.host)) || s.some((d) => o.contains(d)) || s.push(o));
    return s;
  });
  return { resolveContainers: n, contains: M((l) => n().some((i) => i.contains(l))) };
}
let Lr = z(null);
function Qt({ children: e, node: t }) {
  let [r, n] = F(null), l = kr(t ?? r);
  return $.createElement(Lr.Provider, { value: l }, e, l === null && $.createElement(Et, { features: Ye.Hidden, ref: (i) => {
    var a, s;
    if (i) {
      for (let o of (s = (a = De(i)) == null ? void 0 : a.querySelectorAll("html > *, body > *")) != null ? s : []) if (o !== document.body && o !== document.head && se(o) && o != null && o.contains(i)) {
        n(o);
        break;
      }
    }
  } }));
}
function kr(e = null) {
  var t;
  return (t = H(Lr)) != null ? t : e;
}
function _l() {
  let e = typeof document > "u";
  return "useSyncExternalStore" in Ce ? ((t) => t.useSyncExternalStore)(Ce)(() => () => {
  }, () => !1, () => !e) : !1;
}
function it() {
  let e = _l(), [t, r] = Ce.useState(Z.isHandoffComplete);
  return t && Z.isHandoffComplete === !1 && r(!1), Ce.useEffect(() => {
    t !== !0 && r(!0);
  }, [t]), Ce.useEffect(() => Z.handoff(), []), e ? !1 : t;
}
function Nt() {
  let e = S(!1);
  return U(() => (e.current = !0, () => {
    e.current = !1;
  }), []), e;
}
var Ae = ((e) => (e[e.Forwards = 0] = "Forwards", e[e.Backwards = 1] = "Backwards", e))(Ae || {});
function Dl() {
  let e = S(0);
  return Er(!0, "keydown", (t) => {
    t.key === "Tab" && (e.current = t.shiftKey ? 1 : 0);
  }, !0), e;
}
function Ar(e) {
  if (!e) return /* @__PURE__ */ new Set();
  if (typeof e == "function") return new Set(e());
  let t = /* @__PURE__ */ new Set();
  for (let r of e.current) se(r.current) && t.add(r.current);
  return t;
}
let jl = "div";
var fe = ((e) => (e[e.None = 0] = "None", e[e.InitialFocus = 1] = "InitialFocus", e[e.TabLock = 2] = "TabLock", e[e.FocusLock = 4] = "FocusLock", e[e.RestoreFocus = 8] = "RestoreFocus", e[e.AutoFocus = 16] = "AutoFocus", e))(fe || {});
function Wl(e, t) {
  let r = S(null), n = J(r, t), { initialFocus: l, initialFocusFallback: i, containers: a, features: s = 15, ...o } = e;
  it() || (s = 0);
  let d = Ct(r.current);
  Bl(s, { ownerDocument: d });
  let m = Xl(s, { ownerDocument: d, container: r, initialFocus: l, initialFocusFallback: i });
  zl(s, { ownerDocument: d, container: r, containers: a, previousActiveElement: m });
  let g = Dl(), w = M((c) => {
    if (!me(r.current)) return;
    let v = r.current;
    ((y) => y())(() => {
      re(g.current, { [Ae.Forwards]: () => {
        Ie(v, ee.First, { skipElements: [c.relatedTarget, i] });
      }, [Ae.Backwards]: () => {
        Ie(v, ee.Last, { skipElements: [c.relatedTarget, i] });
      } });
    });
  }), b = We(!!(s & 2), "focus-trap#tab-lock"), f = rt(), E = S(!1), h = { ref: n, onKeyDown(c) {
    c.key == "Tab" && (E.current = !0, f.requestAnimationFrame(() => {
      E.current = !1;
    }));
  }, onBlur(c) {
    if (!(s & 4)) return;
    let v = Ar(a);
    me(r.current) && v.add(r.current);
    let y = c.relatedTarget;
    ae(y) && y.dataset.headlessuiFocusGuard !== "true" && (Cr(v, y) || (E.current ? Ie(r.current, re(g.current, { [Ae.Forwards]: () => ee.Next, [Ae.Backwards]: () => ee.Previous }) | ee.WrapAround, { relativeTo: c.target }) : ae(c.target) && te(c.target)));
  } }, u = G();
  return $.createElement($.Fragment, null, b && $.createElement(Et, { as: "button", type: "button", "data-headlessui-focus-guard": !0, onFocus: w, features: Ye.Focusable }), u({ ourProps: h, theirProps: o, defaultTag: jl, name: "FocusTrap" }), b && $.createElement(Et, { as: "button", type: "button", "data-headlessui-focus-guard": !0, onFocus: w, features: Ye.Focusable }));
}
let Ul = V(Wl), Hl = Object.assign(Ul, { features: fe });
function Vl(e = !0) {
  let t = S(ie.slice());
  return Ft(([r], [n]) => {
    n === !0 && r === !1 && tt(() => {
      t.current.splice(0);
    }), n === !1 && r === !0 && (t.current = ie.slice());
  }, [e, ie, t]), M(() => {
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
  let i = S(null), a = We(!!(e & 1), "focus-trap#initial-focus"), s = Nt();
  return Ft(() => {
    if (e === 0) return;
    if (!a) {
      l != null && l.current && te(l.current);
      return;
    }
    let o = r.current;
    o && tt(() => {
      if (!s.current) return;
      let d = t == null ? void 0 : t.activeElement;
      if (n != null && n.current) {
        if ((n == null ? void 0 : n.current) === d) {
          i.current = d;
          return;
        }
      } else if (o.contains(d)) {
        i.current = d;
        return;
      }
      if (n != null && n.current) te(n.current);
      else {
        if (e & 16) {
          if (Ie(o, ee.First | ee.AutoFocus) !== Ot.Error) return;
        } else if (Ie(o, ee.First) !== Ot.Error) return;
        if (l != null && l.current && (te(l.current), (t == null ? void 0 : t.activeElement) === l.current)) return;
        console.warn("There are no focusable elements inside the <FocusTrap />");
      }
      i.current = t == null ? void 0 : t.activeElement;
    });
  }, [l, a, e]), i;
}
function zl(e, { ownerDocument: t, container: r, containers: n, previousActiveElement: l }) {
  let i = Nt(), a = !!(e & 4);
  $r(t == null ? void 0 : t.defaultView, "focus", (s) => {
    if (!a || !i.current) return;
    let o = Ar(n);
    me(r.current) && o.add(r.current);
    let d = l.current;
    if (!d) return;
    let m = s.target;
    me(m) ? Cr(o, m) ? (l.current = m, te(m)) : (s.preventDefault(), s.stopPropagation(), te(d)) : te(l.current);
  }, !0);
}
function Cr(e, t) {
  for (let r of e) if (r.contains(t)) return !0;
  return !1;
}
function Fr(e) {
  var t;
  return !!(e.enter || e.enterFrom || e.enterTo || e.leave || e.leaveFrom || e.leaveTo) || !Fe((t = e.as) != null ? t : Ir) || $.Children.count(e.children) === 1;
}
let ot = z(null);
ot.displayName = "TransitionContext";
var Gl = ((e) => (e.Visible = "visible", e.Hidden = "hidden", e))(Gl || {});
function Kl() {
  let e = H(ot);
  if (e === null) throw new Error("A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />.");
  return e;
}
function ql() {
  let e = H(at);
  if (e === null) throw new Error("A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />.");
  return e;
}
let at = z(null);
at.displayName = "NestingContext";
function st(e) {
  return "children" in e ? st(e.children) : e.current.filter(({ el: t }) => t.current !== null).filter(({ state: t }) => t === "visible").length > 0;
}
function Nr(e, t) {
  let r = ve(e), n = S([]), l = Nt(), i = rt(), a = M((b, f = oe.Hidden) => {
    let E = n.current.findIndex(({ el: h }) => h === b);
    E !== -1 && (re(f, { [oe.Unmount]() {
      n.current.splice(E, 1);
    }, [oe.Hidden]() {
      n.current[E].state = "hidden";
    } }), i.microTask(() => {
      var h;
      !st(n) && l.current && ((h = r.current) == null || h.call(r));
    }));
  }), s = M((b) => {
    let f = n.current.find(({ el: E }) => E === b);
    return f ? f.state !== "visible" && (f.state = "visible") : n.current.push({ el: b, state: "visible" }), () => a(b, oe.Unmount);
  }), o = S([]), d = S(Promise.resolve()), m = S({ enter: [], leave: [] }), g = M((b, f, E) => {
    o.current.splice(0), t && (t.chains.current[f] = t.chains.current[f].filter(([h]) => h !== b)), t == null || t.chains.current[f].push([b, new Promise((h) => {
      o.current.push(h);
    })]), t == null || t.chains.current[f].push([b, new Promise((h) => {
      Promise.all(m.current[f].map(([u, c]) => c)).then(() => h());
    })]), f === "enter" ? d.current = d.current.then(() => t == null ? void 0 : t.wait.current).then(() => E(f)) : E(f);
  }), w = M((b, f, E) => {
    Promise.all(m.current[f].splice(0).map(([h, u]) => u)).then(() => {
      var h;
      (h = o.current.shift()) == null || h();
    }).then(() => E(f));
  });
  return _(() => ({ children: n, register: s, unregister: a, onStart: g, onStop: w, wait: d, chains: m }), [s, a, n, g, w, m, d]);
}
let Ir = ue, Rr = qe.RenderStrategy;
function Yl(e, t) {
  var r, n;
  let { transition: l = !0, beforeEnter: i, afterEnter: a, beforeLeave: s, afterLeave: o, enter: d, enterFrom: m, enterTo: g, entered: w, leave: b, leaveFrom: f, leaveTo: E, ...h } = e, [u, c] = F(null), v = S(null), y = Fr(e), p = J(...y ? [v, t, c] : t === null ? [] : [t]), x = (r = h.unmount) == null || r ? oe.Unmount : oe.Hidden, { show: O, appear: N, initial: D } = Kl(), [C, I] = F(O ? "visible" : "hidden"), B = ql(), { register: R, unregister: k } = B;
  U(() => R(v), [R, v]), U(() => {
    if (x === oe.Hidden && v.current) {
      if (O && C !== "visible") {
        I("visible");
        return;
      }
      return re(C, { hidden: () => k(v), visible: () => R(v) });
    }
  }, [C, v, R, k, O, x]);
  let j = it();
  U(() => {
    if (y && j && C === "visible" && v.current === null) throw new Error("Did you forget to passthrough the `ref` to the actual DOM node?");
  }, [v, C, j, y]);
  let ge = D && !N, ce = N && O && D, Q = S(!1), A = Nr(() => {
    Q.current || (I("hidden"), k(v));
  }, B), $e = M((dt) => {
    Q.current = !0;
    let He = dt ? "enter" : "leave";
    A.onStart(v, He, (Se) => {
      Se === "enter" ? i == null || i() : Se === "leave" && (s == null || s());
    });
  }), le = M((dt) => {
    let He = dt ? "enter" : "leave";
    Q.current = !1, A.onStop(v, He, (Se) => {
      Se === "enter" ? a == null || a() : Se === "leave" && (o == null || o());
    }), He === "leave" && !st(A) && (I("hidden"), k(v));
  });
  L(() => {
    y && l || ($e(O), le(O));
  }, [O, y, l]);
  let ct = !(!l || !y || !j || ge), [, T] = gl(ct, u, O, { start: $e, end: le }), Ue = de({ ref: p, className: ((n = xt(h.className, ce && d, ce && m, T.enter && d, T.enter && T.closed && m, T.enter && !T.closed && g, T.leave && b, T.leave && !T.closed && f, T.leave && T.closed && E, !T.transition && O && w)) == null ? void 0 : n.trim()) || void 0, ...vl(T) }), Oe = 0;
  C === "visible" && (Oe |= q.Open), C === "hidden" && (Oe |= q.Closed), O && C === "hidden" && (Oe |= q.Opening), !O && C === "visible" && (Oe |= q.Closing);
  let Wr = G();
  return $.createElement(at.Provider, { value: A }, $.createElement(El, { value: Oe }, Wr({ ourProps: Ue, theirProps: h, defaultTag: Ir, features: Rr, visible: C === "visible", name: "Transition.Child" })));
}
function Zl(e, t) {
  let { show: r, appear: n = !1, unmount: l = !0, ...i } = e, a = S(null), s = Fr(e), o = J(...s ? [a, t] : t === null ? [] : [t]);
  it();
  let d = lt();
  if (r === void 0 && d !== null && (r = (d & q.Open) === q.Open), r === void 0) throw new Error("A <Transition /> is used but it is missing a `show={true | false}` prop.");
  let [m, g] = F(r ? "visible" : "hidden"), w = Nr(() => {
    r || g("hidden");
  }), [b, f] = F(!0), E = S([r]);
  U(() => {
    b !== !1 && E.current[E.current.length - 1] !== r && (E.current.push(r), f(!1));
  }, [E, r]);
  let h = _(() => ({ show: r, appear: n, initial: b }), [r, n, b]);
  U(() => {
    r ? g("visible") : !st(w) && a.current !== null && g("hidden");
  }, [r, w]);
  let u = { unmount: l }, c = M(() => {
    var p;
    b && f(!1), (p = e.beforeEnter) == null || p.call(e);
  }), v = M(() => {
    var p;
    b && f(!1), (p = e.beforeLeave) == null || p.call(e);
  }), y = G();
  return $.createElement(at.Provider, { value: w }, $.createElement(ot.Provider, { value: h }, y({ ourProps: { ...u, as: ue, children: $.createElement(_r, { ref: o, ...u, ...i, beforeEnter: c, beforeLeave: v }) }, theirProps: {}, defaultTag: ue, features: Rr, visible: m === "visible", name: "Transition" })));
}
function Jl(e, t) {
  let r = H(ot) !== null, n = lt() !== null;
  return $.createElement($.Fragment, null, !r && n ? $.createElement(Tt, { ref: t, ...e }) : $.createElement(_r, { ref: t, ...e }));
}
let Tt = V(Zl), _r = V(Yl), Ee = V(Jl), Dr = Object.assign(Tt, { Child: Ee, Root: Tt });
var Ql = ((e) => (e[e.Open = 0] = "Open", e[e.Closed = 1] = "Closed", e))(Ql || {}), ei = ((e) => (e[e.SetTitleId = 0] = "SetTitleId", e))(ei || {});
let ti = { 0(e, t) {
  return e.titleId === t.id ? e : { ...e, titleId: t.id };
} }, It = z(null);
It.displayName = "DialogContext";
function ut(e) {
  let t = H(It);
  if (t === null) {
    let r = new Error(`<${e} /> is missing a parent <Dialog /> component.`);
    throw Error.captureStackTrace && Error.captureStackTrace(r, ut), r;
  }
  return t;
}
function ri(e, t) {
  return re(t.type, ti, e, t);
}
let er = V(function(e, t) {
  let r = _e(), { id: n = `headlessui-dialog-${r}`, open: l, onClose: i, initialFocus: a, role: s = "dialog", autoFocus: o = !0, __demoMode: d = !1, unmount: m = !1, ...g } = e, w = S(!1);
  s = (function() {
    return s === "dialog" || s === "alertdialog" ? s : (w.current || (w.current = !0, console.warn(`Invalid role [${s}] passed to <Dialog />. Only \`dialog\` and and \`alertdialog\` are supported. Using \`dialog\` instead.`)), "dialog");
  })();
  let b = lt();
  l === void 0 && b !== null && (l = (b & q.Open) === q.Open);
  let f = S(null), E = J(f, t), h = Ct(f.current), u = l ? 0 : 1, [c, v] = Gr(ri, { titleId: null, descriptionId: null, panelRef: Kr() }), y = M(() => i(!1)), p = M((T) => v({ type: 0, id: T })), x = it() ? u === 0 : !1, [O, N] = Al(), D = { get current() {
    var T;
    return (T = c.panelRef.current) != null ? T : f.current;
  } }, C = kr(), { resolveContainers: I } = Rl({ mainTreeNode: C, portals: O, defaultContainers: [D] }), B = b !== null ? (b & q.Closing) === q.Closing : !1;
  Kn(d || B ? !1 : x, { allowed: M(() => {
    var T, Ue;
    return [(Ue = (T = f.current) == null ? void 0 : T.closest("[data-headlessui-portal]")) != null ? Ue : null];
  }), disallowed: M(() => {
    var T;
    return [(T = C == null ? void 0 : C.closest("body > *:not(#headlessui-portal-root)")) != null ? T : null];
  }) });
  let R = wr.get(null);
  U(() => {
    if (x) return R.actions.push(n), () => R.actions.pop(n);
  }, [R, n, x]);
  let k = yr(R, W((T) => R.selectors.isTop(T, n), [R, n]));
  ol(k, I, (T) => {
    T.preventDefault(), y();
  }), Nl(k, h == null ? void 0 : h.defaultView, (T) => {
    T.preventDefault(), T.stopPropagation(), document.activeElement && "blur" in document.activeElement && typeof document.activeElement.blur == "function" && document.activeElement.blur(), y();
  }), pl(d || B ? !1 : x, h, I), qn(x, f, y);
  let [j, ge] = Pn(), ce = _(() => [{ dialogState: u, close: y, setTitleId: p, unmount: m }, c], [u, y, p, m, c]), Q = je({ open: u === 0 }), A = { ref: E, id: n, role: s, tabIndex: -1, "aria-modal": d ? void 0 : u === 0 ? !0 : void 0, "aria-labelledby": c.titleId, "aria-describedby": j, unmount: m }, $e = !Il(), le = fe.None;
  x && !d && (le |= fe.RestoreFocus, le |= fe.TabLock, o && (le |= fe.AutoFocus), $e && (le |= fe.InitialFocus));
  let ct = G();
  return $.createElement($l, null, $.createElement(Jt, { force: !0 }, $.createElement(Fl, null, $.createElement(It.Provider, { value: ce }, $.createElement(Mr, { target: f }, $.createElement(Jt, { force: !1 }, $.createElement(ge, { slot: Q }, $.createElement(N, null, $.createElement(Hl, { initialFocus: a, initialFocusFallback: f, containers: I, features: le }, $.createElement(Fn, { value: y }, ct({ ourProps: A, theirProps: g, slot: Q, defaultTag: ni, features: li, visible: u === 0, name: "Dialog" })))))))))));
}), ni = "div", li = qe.RenderStrategy | qe.Static;
function ii(e, t) {
  let { transition: r = !1, open: n, ...l } = e, i = lt(), a = e.hasOwnProperty("open") || i !== null, s = e.hasOwnProperty("onClose");
  if (!a && !s) throw new Error("You have to provide an `open` and an `onClose` prop to the `Dialog` component.");
  if (!a) throw new Error("You provided an `onClose` prop to the `Dialog`, but forgot an `open` prop.");
  if (!s) throw new Error("You provided an `open` prop to the `Dialog`, but forgot an `onClose` prop.");
  if (!i && typeof e.open != "boolean") throw new Error(`You provided an \`open\` prop to the \`Dialog\`, but the value is not a boolean. Received: ${e.open}`);
  if (typeof e.onClose != "function") throw new Error(`You provided an \`onClose\` prop to the \`Dialog\`, but the value is not a function. Received: ${e.onClose}`);
  return (n !== void 0 || r) && !l.static ? $.createElement(Qt, null, $.createElement(Dr, { show: n, transition: r, unmount: l.unmount }, $.createElement(er, { ref: t, ...l }))) : $.createElement(Qt, null, $.createElement(er, { ref: t, open: n, ...l }));
}
let oi = "div";
function ai(e, t) {
  let r = _e(), { id: n = `headlessui-dialog-panel-${r}`, transition: l = !1, ...i } = e, [{ dialogState: a, unmount: s }, o] = ut("Dialog.Panel"), d = J(t, o.panelRef), m = je({ open: a === 0 }), g = M((h) => {
    h.stopPropagation();
  }), w = { ref: d, id: n, onClick: g }, b = l ? Ee : ue, f = l ? { unmount: s } : {}, E = G();
  return $.createElement(b, { ...f }, E({ ourProps: w, theirProps: i, slot: m, defaultTag: oi, name: "Dialog.Panel" }));
}
let si = "div";
function ui(e, t) {
  let { transition: r = !1, ...n } = e, [{ dialogState: l, unmount: i }] = ut("Dialog.Backdrop"), a = je({ open: l === 0 }), s = { ref: t, "aria-hidden": !0 }, o = r ? Ee : ue, d = r ? { unmount: i } : {}, m = G();
  return $.createElement(o, { ...d }, m({ ourProps: s, theirProps: n, slot: a, defaultTag: si, name: "Dialog.Backdrop" }));
}
let ci = "h2";
function di(e, t) {
  let r = _e(), { id: n = `headlessui-dialog-title-${r}`, ...l } = e, [{ dialogState: i, setTitleId: a }] = ut("Dialog.Title"), s = J(t);
  L(() => (a(n), () => a(null)), [n, a]);
  let o = je({ open: i === 0 }), d = { ref: s, id: n };
  return G()({ ourProps: d, theirProps: l, slot: o, defaultTag: ci, name: "Dialog.Title" });
}
let fi = V(ii), Rt = V(ai);
V(ui);
let pi = V(di), mi = Object.assign(fi, { Panel: Rt, Title: pi, Description: An });
function jr({ onClick: e }) {
  return /* @__PURE__ */ he(
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
const hi = ({ modalContext: e, config: t, children: r }) => {
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
        Ee,
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
          children: /* @__PURE__ */ he(
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
}, vi = ({ modalContext: e, config: t, children: r }) => {
  const [n, l] = F(!1);
  return /* @__PURE__ */ P("div", { className: "im-slideover-container fixed inset-0 z-40 overflow-y-auto overflow-x-hidden", children: /* @__PURE__ */ P(
    "div",
    {
      className: Ke("im-slideover-positioner flex min-h-full items-center", {
        "justify-start rtl:justify-end": (t == null ? void 0 : t.position) === "left",
        "justify-end rtl:justify-start": (t == null ? void 0 : t.position) === "right"
      }),
      children: /* @__PURE__ */ P(
        Ee,
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
          children: /* @__PURE__ */ he(
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
}, gi = Pt(({ name: e, children: t, onFocus: r = null, onBlur: n = null, onClose: l = null, onSuccess: i = null, onAfterLeave: a = null, ...s }, o) => {
  const d = (g) => typeof t == "function" ? t(g) : t, m = S(null);
  return tr(o, () => m.current, [m]), /* @__PURE__ */ P(
    ar,
    {
      ref: m,
      name: e,
      onFocus: r,
      onBlur: n,
      onClose: l,
      onSuccess: i,
      ...s,
      children: ({
        afterLeave: g,
        close: w,
        config: b,
        emit: f,
        getChildModal: E,
        getParentModal: h,
        id: u,
        index: c,
        isOpen: v,
        modalContext: y,
        onTopOfStack: p,
        reload: x,
        setOpen: O,
        shouldRender: N
      }) => /* @__PURE__ */ P(
        Dr,
        {
          appear: !0,
          show: v ?? !1,
          afterLeave: a,
          children: /* @__PURE__ */ he(
            mi,
            {
              as: "div",
              className: "im-dialog relative z-20",
              onClose: () => b.closeExplicitly ? null : w(),
              "data-inertiaui-modal-id": u,
              "data-inertiaui-modal-index": c,
              children: [
                c === 0 ? /* @__PURE__ */ P(
                  Ee,
                  {
                    enter: "transition transform ease-in-out duration-300",
                    enterFrom: "opacity-0",
                    enterTo: "opacity-100",
                    leave: "transition transform ease-in-out duration-300",
                    leaveFrom: "opacity-100",
                    leaveTo: "opacity-0",
                    children: p ? /* @__PURE__ */ P(
                      "div",
                      {
                        className: "im-backdrop fixed inset-0 z-30 bg-black/75",
                        "aria-hidden": "true"
                      }
                    ) : /* @__PURE__ */ P("div", {})
                  }
                ) : null,
                c > 0 && p ? /* @__PURE__ */ P("div", { className: "im-backdrop fixed inset-0 z-30 bg-black/75" }) : null,
                b.slideover ? /* @__PURE__ */ P(
                  vi,
                  {
                    modalContext: y,
                    config: b,
                    children: d({
                      afterLeave: g,
                      close: w,
                      config: b,
                      emit: f,
                      getChildModal: E,
                      getParentModal: h,
                      id: u,
                      index: c,
                      isOpen: v,
                      modalContext: y,
                      onTopOfStack: p,
                      reload: x,
                      setOpen: O,
                      shouldRender: N
                    })
                  }
                ) : /* @__PURE__ */ P(
                  hi,
                  {
                    modalContext: y,
                    config: b,
                    children: d({
                      afterLeave: g,
                      close: w,
                      config: b,
                      emit: f,
                      getChildModal: E,
                      getParentModal: h,
                      id: u,
                      index: c,
                      isOpen: v,
                      modalContext: y,
                      onTopOfStack: p,
                      reload: x,
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
gi.displayName = "Modal";
const Ci = ({
  href: e,
  method: t = "get",
  data: r = {},
  as: n = "a",
  headers: l = {},
  queryStringArrayFormat: i = "brackets",
  onAfterLeave: a = null,
  onBlur: s = null,
  onClose: o = null,
  onError: d = null,
  onFocus: m = null,
  onStart: g = null,
  onSuccess: w = null,
  navigate: b = null,
  children: f,
  ...E
}) => {
  const [h, u] = F(!1), [c, v] = F(null), { stack: y, visit: p } = et(), x = _(() => b ?? Lt("navigate"), [b]), O = {}, N = {};
  Object.keys(E).forEach((k) => {
    Dt.includes(k) || (k.startsWith("on") && typeof E[k] == "function" ? nn(k) ? O[k] = E[k] : N[k] = E[k] : O[k] = E[k]);
  });
  const [D, C] = F(!1);
  L(() => {
    c && (c.onTopOfStack && D ? m == null || m() : !c.onTopOfStack && !D && (s == null || s()), C(!c.onTopOfStack));
  }, [y]);
  const I = W(() => {
    o == null || o();
  }, [o]), B = W(() => {
    v(null), a == null || a();
  }, [a]), R = W(
    (k) => {
      k == null || k.preventDefault(), !h && (e.startsWith("#") || (u(!0), g == null || g()), p(
        e,
        t,
        r,
        l,
        rn(tn(E, Dt)),
        () => I(y.length),
        B,
        i,
        x
      ).then((j) => {
        v(j), j.registerEventListenersFromProps(N), w == null || w();
      }).catch((j) => {
        console.error(j), d == null || d(j);
      }).finally(() => u(!1)));
    },
    [e, t, r, l, i, E, I, B]
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
}, wi = ({ children: e, data: t, params: r, buffer: n, as: l, always: i, fallback: a }) => {
  i = i ?? !1, l = l ?? "div", a = a ?? null;
  const [s, o] = F(!1), d = S(!1), m = S(!1), g = S(null), w = or(), b = W(() => {
    if (t)
      return {
        only: Array.isArray(t) ? t : [t]
      };
    if (!r)
      throw new Error("You must provide either a `data` or `params` prop.");
    return r;
  }, [r, t]);
  return L(() => {
    if (!g.current)
      return;
    const f = new IntersectionObserver(
      (E) => {
        if (!E[0].isIntersecting || (!i && d.current && f.disconnect(), m.current))
          return;
        d.current = !0, m.current = !0;
        const h = b();
        w.reload({
          ...h,
          onStart: (u) => {
            var c;
            m.current = !0, (c = h.onStart) == null || c.call(h, u);
          },
          onFinish: (u) => {
            var c;
            o(!0), m.current = !1, (c = h.onFinish) == null || c.call(h, u), i || f.disconnect();
          }
        });
      },
      {
        rootMargin: `${n || 0}px`
      }
    );
    return f.observe(g.current), () => {
      f.disconnect();
    };
  }, [g, b, n]), i || !s ? Re(
    l,
    {
      props: null,
      ref: g
    },
    s ? e : a
  ) : s ? e : null;
};
wi.displayName = "InertiaWhenVisible";
const Fi = (e) => (t) => (t.default.layout = (r) => Re(e, {}, r), t);
export {
  sn as Deferred,
  ar as HeadlessModal,
  gi as Modal,
  Ci as ModalLink,
  an as ModalRoot,
  ln as ModalStackProvider,
  wi as WhenVisible,
  Lt as getConfig,
  on as initFromPageProps,
  Pi as putConfig,
  Mi as renderApp,
  Ti as resetConfig,
  Fi as setPageLayout,
  or as useModal,
  lr as useModalIndex,
  et as useModalStack
};
