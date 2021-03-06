/*! For license information please see app.min.js.LICENSE.txt */
(() => {
  var e = {
      2: function (e, t, s) {
        var i, n;
        window.Element &&
          !Element.prototype.closest &&
          (Element.prototype.closest = function (e) {
            var t,
              s = (this.document || this.ownerDocument).querySelectorAll(e),
              i = this;
            do {
              for (t = s.length; 0 <= --t && s.item(t) !== i; );
            } while (t < 0 && (i = i.parentElement));
            return i;
          }),
          (function () {
            function e(e, t) {
              t = t || { bubbles: !1, cancelable: !1, detail: void 0 };
              var s = document.createEvent("CustomEvent");
              return s.initCustomEvent(e, t.bubbles, t.cancelable, t.detail), s;
            }
            "function" != typeof window.CustomEvent &&
              ((e.prototype = window.Event.prototype),
              (window.CustomEvent = e));
          })(),
          (function () {
            for (
              var e = 0, t = ["ms", "moz", "webkit", "o"], s = 0;
              s < t.length && !window.requestAnimationFrame;
              ++s
            )
              (window.requestAnimationFrame =
                window[t[s] + "RequestAnimationFrame"]),
                (window.cancelAnimationFrame =
                  window[t[s] + "CancelAnimationFrame"] ||
                  window[t[s] + "CancelRequestAnimationFrame"]);
            window.requestAnimationFrame ||
              (window.requestAnimationFrame = function (t, s) {
                var i = new Date().getTime(),
                  n = Math.max(0, 16 - (i - e)),
                  r = window.setTimeout(function () {
                    t(i + n);
                  }, n);
                return (e = i + n), r;
              }),
              window.cancelAnimationFrame ||
                (window.cancelAnimationFrame = function (e) {
                  clearTimeout(e);
                });
          })(),
          (n =
            void 0 !== s.g
              ? s.g
              : "undefined" != typeof window
              ? window
              : this),
          (i = function () {
            return (function (e) {
              "use strict";
              var t = {
                  ignore: "[data-scroll-ignore]",
                  header: null,
                  topOnEmptyHash: !0,
                  speed: 500,
                  speedAsDuration: !1,
                  durationMax: null,
                  durationMin: null,
                  clip: !0,
                  offset: 0,
                  easing: "easeInOutCubic",
                  customEasing: null,
                  updateURL: !0,
                  popstate: !0,
                  emitEvents: !0,
                },
                s = function () {
                  var e = {};
                  return (
                    Array.prototype.forEach.call(arguments, function (t) {
                      for (var s in t) {
                        if (!t.hasOwnProperty(s)) return;
                        e[s] = t[s];
                      }
                    }),
                    e
                  );
                },
                i = function (e) {
                  "#" === e.charAt(0) && (e = e.substr(1));
                  for (
                    var t,
                      s = String(e),
                      i = s.length,
                      n = -1,
                      r = "",
                      a = s.charCodeAt(0);
                    ++n < i;

                  ) {
                    if (0 === (t = s.charCodeAt(n)))
                      throw new InvalidCharacterError(
                        "Invalid character: the input contains U+0000."
                      );
                    r +=
                      (1 <= t && t <= 31) ||
                      127 == t ||
                      (0 === n && 48 <= t && t <= 57) ||
                      (1 === n && 48 <= t && t <= 57 && 45 === a)
                        ? "\\" + t.toString(16) + " "
                        : 128 <= t ||
                          45 === t ||
                          95 === t ||
                          (48 <= t && t <= 57) ||
                          (65 <= t && t <= 90) ||
                          (97 <= t && t <= 122)
                        ? s.charAt(n)
                        : "\\" + s.charAt(n);
                  }
                  return "#" + r;
                },
                n = function () {
                  return Math.max(
                    document.body.scrollHeight,
                    document.documentElement.scrollHeight,
                    document.body.offsetHeight,
                    document.documentElement.offsetHeight,
                    document.body.clientHeight,
                    document.documentElement.clientHeight
                  );
                },
                r = function (t) {
                  return t
                    ? ((s = t),
                      parseInt(e.getComputedStyle(s).height, 10) + t.offsetTop)
                    : 0;
                  var s;
                },
                a = function (t, s, i) {
                  0 === t && document.body.focus(),
                    i ||
                      (t.focus(),
                      document.activeElement !== t &&
                        (t.setAttribute("tabindex", "-1"),
                        t.focus(),
                        (t.style.outline = "none")),
                      e.scrollTo(0, s));
                },
                o = function (t, s, i, n) {
                  if (s.emitEvents && "function" == typeof e.CustomEvent) {
                    var r = new CustomEvent(t, {
                      bubbles: !0,
                      detail: { anchor: i, toggle: n },
                    });
                    document.dispatchEvent(r);
                  }
                };
              return function (l, d) {
                var c,
                  u,
                  p,
                  h,
                  f = {
                    cancelScroll: function (e) {
                      cancelAnimationFrame(h),
                        (h = null),
                        e || o("scrollCancel", c);
                    },
                    animateScroll: function (i, l, d) {
                      f.cancelScroll();
                      var u = s(c || t, d || {}),
                        m =
                          "[object Number]" ===
                          Object.prototype.toString.call(i),
                        g = m || !i.tagName ? null : i;
                      if (m || g) {
                        var v = e.pageYOffset;
                        u.header &&
                          !p &&
                          (p = document.querySelector(u.header));
                        var w,
                          b,
                          y,
                          S,
                          E,
                          T,
                          C,
                          x,
                          L = r(p),
                          A = m
                            ? i
                            : (function (t, s, i, r) {
                                var a = 0;
                                if (t.offsetParent)
                                  for (
                                    ;
                                    (a += t.offsetTop), (t = t.offsetParent);

                                  );
                                return (
                                  (a = Math.max(a - s - i, 0)),
                                  r && (a = Math.min(a, n() - e.innerHeight)),
                                  a
                                );
                              })(
                                g,
                                L,
                                parseInt(
                                  "function" == typeof u.offset
                                    ? u.offset(i, l)
                                    : u.offset,
                                  10
                                ),
                                u.clip
                              ),
                          _ = A - v,
                          O = n(),
                          M = 0,
                          k =
                            ((w = _),
                            (y = (b = u).speedAsDuration
                              ? b.speed
                              : Math.abs((w / 1e3) * b.speed)),
                            b.durationMax && y > b.durationMax
                              ? b.durationMax
                              : b.durationMin && y < b.durationMin
                              ? b.durationMin
                              : parseInt(y, 10)),
                          P = function (t) {
                            var s, n, r;
                            S || (S = t),
                              (M += t - S),
                              (T =
                                v +
                                _ *
                                  ((n = E =
                                    1 < (E = 0 === k ? 0 : M / k) ? 1 : E),
                                  "easeInQuad" === (s = u).easing &&
                                    (r = n * n),
                                  "easeOutQuad" === s.easing &&
                                    (r = n * (2 - n)),
                                  "easeInOutQuad" === s.easing &&
                                    (r =
                                      n < 0.5
                                        ? 2 * n * n
                                        : (4 - 2 * n) * n - 1),
                                  "easeInCubic" === s.easing && (r = n * n * n),
                                  "easeOutCubic" === s.easing &&
                                    (r = --n * n * n + 1),
                                  "easeInOutCubic" === s.easing &&
                                    (r =
                                      n < 0.5
                                        ? 4 * n * n * n
                                        : (n - 1) * (2 * n - 2) * (2 * n - 2) +
                                          1),
                                  "easeInQuart" === s.easing &&
                                    (r = n * n * n * n),
                                  "easeOutQuart" === s.easing &&
                                    (r = 1 - --n * n * n * n),
                                  "easeInOutQuart" === s.easing &&
                                    (r =
                                      n < 0.5
                                        ? 8 * n * n * n * n
                                        : 1 - 8 * --n * n * n * n),
                                  "easeInQuint" === s.easing &&
                                    (r = n * n * n * n * n),
                                  "easeOutQuint" === s.easing &&
                                    (r = 1 + --n * n * n * n * n),
                                  "easeInOutQuint" === s.easing &&
                                    (r =
                                      n < 0.5
                                        ? 16 * n * n * n * n * n
                                        : 1 + 16 * --n * n * n * n * n),
                                  s.customEasing && (r = s.customEasing(n)),
                                  r || n)),
                              e.scrollTo(0, Math.floor(T)),
                              (function (t, s) {
                                var n = e.pageYOffset;
                                if (
                                  t == s ||
                                  n == s ||
                                  (v < s && e.innerHeight + n) >= O
                                )
                                  return (
                                    f.cancelScroll(!0),
                                    a(i, s, m),
                                    o("scrollStop", u, i, l),
                                    !(h = S = null)
                                  );
                              })(T, A) ||
                                ((h = e.requestAnimationFrame(P)), (S = t));
                          };
                        0 === e.pageYOffset && e.scrollTo(0, 0),
                          (C = i),
                          (x = u),
                          m ||
                            (history.pushState &&
                              x.updateURL &&
                              history.pushState(
                                {
                                  smoothScroll: JSON.stringify(x),
                                  anchor: C.id,
                                },
                                document.title,
                                C === document.documentElement
                                  ? "#top"
                                  : "#" + C.id
                              )),
                          "matchMedia" in e &&
                          e.matchMedia("(prefers-reduced-motion)").matches
                            ? a(i, Math.floor(A), !1)
                            : (o("scrollStart", u, i, l),
                              f.cancelScroll(!0),
                              e.requestAnimationFrame(P));
                      }
                    },
                  },
                  m = function (t) {
                    if (
                      !t.defaultPrevented &&
                      !(
                        0 !== t.button ||
                        t.metaKey ||
                        t.ctrlKey ||
                        t.shiftKey
                      ) &&
                      "closest" in t.target &&
                      (u = t.target.closest(l)) &&
                      "a" === u.tagName.toLowerCase() &&
                      !t.target.closest(c.ignore) &&
                      u.hostname === e.location.hostname &&
                      u.pathname === e.location.pathname &&
                      /#/.test(u.href)
                    ) {
                      var s, n;
                      try {
                        s = i(decodeURIComponent(u.hash));
                      } catch (t) {
                        s = i(u.hash);
                      }
                      if ("#" === s) {
                        if (!c.topOnEmptyHash) return;
                        n = document.documentElement;
                      } else n = document.querySelector(s);
                      (n = n || "#top" !== s ? n : document.documentElement) &&
                        (t.preventDefault(),
                        (function (t) {
                          if (
                            history.replaceState &&
                            t.updateURL &&
                            !history.state
                          ) {
                            var s = e.location.hash;
                            (s = s || ""),
                              history.replaceState(
                                {
                                  smoothScroll: JSON.stringify(t),
                                  anchor: s || e.pageYOffset,
                                },
                                document.title,
                                s || e.location.href
                              );
                          }
                        })(c),
                        f.animateScroll(n, u));
                    }
                  },
                  g = function (e) {
                    if (
                      null !== history.state &&
                      history.state.smoothScroll &&
                      history.state.smoothScroll === JSON.stringify(c)
                    ) {
                      var t = history.state.anchor;
                      ("string" == typeof t &&
                        t &&
                        !(t = document.querySelector(
                          i(history.state.anchor)
                        ))) ||
                        f.animateScroll(t, null, { updateURL: !1 });
                    }
                  };
                return (
                  (f.destroy = function () {
                    c &&
                      (document.removeEventListener("click", m, !1),
                      e.removeEventListener("popstate", g, !1),
                      f.cancelScroll(),
                      (h = p = u = c = null));
                  }),
                  (function () {
                    if (
                      !(
                        "querySelector" in document &&
                        "addEventListener" in e &&
                        "requestAnimationFrame" in e &&
                        "closest" in e.Element.prototype
                      )
                    )
                      throw "Smooth Scroll: This browser does not support the required JavaScript methods and browser APIs.";
                    f.destroy(),
                      (c = s(t, d || {})),
                      (p = c.header ? document.querySelector(c.header) : null),
                      document.addEventListener("click", m, !1),
                      c.updateURL &&
                        c.popstate &&
                        e.addEventListener("popstate", g, !1);
                  })(),
                  f
                );
              };
            })(n);
          }.apply(t, [])),
          void 0 === i || (e.exports = i);
      },
      732: function (e) {
        e.exports = (function () {
          "use strict";
          function e() {
            return (
              (e =
                Object.assign ||
                function (e) {
                  for (var t = 1; t < arguments.length; t++) {
                    var s = arguments[t];
                    for (var i in s)
                      Object.prototype.hasOwnProperty.call(s, i) &&
                        (e[i] = s[i]);
                  }
                  return e;
                }),
              e.apply(this, arguments)
            );
          }
          var t = "undefined" != typeof window,
            s =
              (t && !("onscroll" in window)) ||
              ("undefined" != typeof navigator &&
                /(gle|ing|ro)bot|crawl|spider/i.test(navigator.userAgent)),
            i = t && "IntersectionObserver" in window,
            n = t && "classList" in document.createElement("p"),
            r = t && window.devicePixelRatio > 1,
            a = {
              elements_selector: ".lazy",
              container: s || t ? document : null,
              threshold: 300,
              thresholds: null,
              data_src: "src",
              data_srcset: "srcset",
              data_sizes: "sizes",
              data_bg: "bg",
              data_bg_hidpi: "bg-hidpi",
              data_bg_multi: "bg-multi",
              data_bg_multi_hidpi: "bg-multi-hidpi",
              data_poster: "poster",
              class_applied: "applied",
              class_loading: "loading",
              class_loaded: "loaded",
              class_error: "error",
              class_entered: "entered",
              class_exited: "exited",
              unobserve_completed: !0,
              unobserve_entered: !1,
              cancel_on_exit: !0,
              callback_enter: null,
              callback_exit: null,
              callback_applied: null,
              callback_loading: null,
              callback_loaded: null,
              callback_error: null,
              callback_finish: null,
              callback_cancel: null,
              use_native: !1,
            },
            o = function (t) {
              return e({}, a, t);
            },
            l = function (e, t) {
              var s,
                i = "LazyLoad::Initialized",
                n = new e(t);
              try {
                s = new CustomEvent(i, { detail: { instance: n } });
              } catch (e) {
                (s = document.createEvent("CustomEvent")).initCustomEvent(
                  i,
                  !1,
                  !1,
                  { instance: n }
                );
              }
              window.dispatchEvent(s);
            },
            d = "src",
            c = "srcset",
            u = "sizes",
            p = "poster",
            h = "llOriginalAttrs",
            f = "data",
            m = "loading",
            g = "loaded",
            v = "applied",
            w = "error",
            b = "native",
            y = "data-",
            S = "ll-status",
            E = function (e, t) {
              return e.getAttribute(y + t);
            },
            T = function (e) {
              return E(e, S);
            },
            C = function (e, t) {
              return (function (e, t, s) {
                var i = "data-ll-status";
                null !== s ? e.setAttribute(i, s) : e.removeAttribute(i);
              })(e, 0, t);
            },
            x = function (e) {
              return C(e, null);
            },
            L = function (e) {
              return null === T(e);
            },
            A = function (e) {
              return T(e) === b;
            },
            _ = [m, g, v, w],
            O = function (e, t, s, i) {
              e &&
                (void 0 === i ? (void 0 === s ? e(t) : e(t, s)) : e(t, s, i));
            },
            M = function (e, t) {
              n
                ? e.classList.add(t)
                : (e.className += (e.className ? " " : "") + t);
            },
            k = function (e, t) {
              n
                ? e.classList.remove(t)
                : (e.className = e.className
                    .replace(new RegExp("(^|\\s+)" + t + "(\\s+|$)"), " ")
                    .replace(/^\s+/, "")
                    .replace(/\s+$/, ""));
            },
            P = function (e) {
              return e.llTempImage;
            },
            $ = function (e, t) {
              if (t) {
                var s = t._observer;
                s && s.unobserve(e);
              }
            },
            I = function (e, t) {
              e && (e.loadingCount += t);
            },
            z = function (e, t) {
              e && (e.toLoadCount = t);
            },
            D = function (e) {
              for (var t, s = [], i = 0; (t = e.children[i]); i += 1)
                "SOURCE" === t.tagName && s.push(t);
              return s;
            },
            N = function (e, t) {
              var s = e.parentNode;
              s && "PICTURE" === s.tagName && D(s).forEach(t);
            },
            B = function (e, t) {
              D(e).forEach(t);
            },
            G = [d],
            q = [d, p],
            H = [d, c, u],
            W = [f],
            j = function (e) {
              return !!e[h];
            },
            V = function (e) {
              return e[h];
            },
            R = function (e) {
              return delete e[h];
            },
            F = function (e, t) {
              if (!j(e)) {
                var s = {};
                t.forEach(function (t) {
                  s[t] = e.getAttribute(t);
                }),
                  (e[h] = s);
              }
            },
            Y = function (e, t) {
              if (j(e)) {
                var s = V(e);
                t.forEach(function (t) {
                  !(function (e, t, s) {
                    s ? e.setAttribute(t, s) : e.removeAttribute(t);
                  })(e, t, s[t]);
                });
              }
            },
            X = function (e, t, s) {
              M(e, t.class_loading),
                C(e, m),
                s && (I(s, 1), O(t.callback_loading, e, s));
            },
            U = function (e, t, s) {
              s && e.setAttribute(t, s);
            },
            Q = function (e, t) {
              U(e, u, E(e, t.data_sizes)),
                U(e, c, E(e, t.data_srcset)),
                U(e, d, E(e, t.data_src));
            },
            K = {
              IMG: function (e, t) {
                N(e, function (e) {
                  F(e, H), Q(e, t);
                }),
                  F(e, H),
                  Q(e, t);
              },
              IFRAME: function (e, t) {
                F(e, G), U(e, d, E(e, t.data_src));
              },
              VIDEO: function (e, t) {
                B(e, function (e) {
                  F(e, G), U(e, d, E(e, t.data_src));
                }),
                  F(e, q),
                  U(e, p, E(e, t.data_poster)),
                  U(e, d, E(e, t.data_src)),
                  e.load();
              },
              OBJECT: function (e, t) {
                F(e, W), U(e, f, E(e, t.data_src));
              },
            },
            J = ["IMG", "IFRAME", "VIDEO", "OBJECT"],
            Z = function (e, t) {
              !t ||
                (function (e) {
                  return e.loadingCount > 0;
                })(t) ||
                (function (e) {
                  return e.toLoadCount > 0;
                })(t) ||
                O(e.callback_finish, t);
            },
            ee = function (e, t, s) {
              e.addEventListener(t, s), (e.llEvLisnrs[t] = s);
            },
            te = function (e, t, s) {
              e.removeEventListener(t, s);
            },
            se = function (e) {
              return !!e.llEvLisnrs;
            },
            ie = function (e) {
              if (se(e)) {
                var t = e.llEvLisnrs;
                for (var s in t) {
                  var i = t[s];
                  te(e, s, i);
                }
                delete e.llEvLisnrs;
              }
            },
            ne = function (e, t, s) {
              !(function (e) {
                delete e.llTempImage;
              })(e),
                I(s, -1),
                (function (e) {
                  e && (e.toLoadCount -= 1);
                })(s),
                k(e, t.class_loading),
                t.unobserve_completed && $(e, s);
            },
            re = function (e, t, s) {
              var i = P(e) || e;
              se(i) ||
                (function (e, t, s) {
                  se(e) || (e.llEvLisnrs = {});
                  var i = "VIDEO" === e.tagName ? "loadeddata" : "load";
                  ee(e, i, t), ee(e, "error", s);
                })(
                  i,
                  function (n) {
                    !(function (e, t, s, i) {
                      var n = A(t);
                      ne(t, s, i),
                        M(t, s.class_loaded),
                        C(t, g),
                        O(s.callback_loaded, t, i),
                        n || Z(s, i);
                    })(0, e, t, s),
                      ie(i);
                  },
                  function (n) {
                    !(function (e, t, s, i) {
                      var n = A(t);
                      ne(t, s, i),
                        M(t, s.class_error),
                        C(t, w),
                        O(s.callback_error, t, i),
                        n || Z(s, i);
                    })(0, e, t, s),
                      ie(i);
                  }
                );
            },
            ae = function (e, t, s) {
              !(function (e) {
                e.llTempImage = document.createElement("IMG");
              })(e),
                re(e, t, s),
                (function (e) {
                  j(e) || (e[h] = { backgroundImage: e.style.backgroundImage });
                })(e),
                (function (e, t, s) {
                  var i = E(e, t.data_bg),
                    n = E(e, t.data_bg_hidpi),
                    a = r && n ? n : i;
                  a &&
                    ((e.style.backgroundImage = 'url("'.concat(a, '")')),
                    P(e).setAttribute(d, a),
                    X(e, t, s));
                })(e, t, s),
                (function (e, t, s) {
                  var i = E(e, t.data_bg_multi),
                    n = E(e, t.data_bg_multi_hidpi),
                    a = r && n ? n : i;
                  a &&
                    ((e.style.backgroundImage = a),
                    (function (e, t, s) {
                      M(e, t.class_applied),
                        C(e, v),
                        s &&
                          (t.unobserve_completed && $(e, t),
                          O(t.callback_applied, e, s));
                    })(e, t, s));
                })(e, t, s);
            },
            oe = function (e, t, s) {
              !(function (e) {
                return J.indexOf(e.tagName) > -1;
              })(e)
                ? ae(e, t, s)
                : (function (e, t, s) {
                    re(e, t, s),
                      (function (e, t, s) {
                        var i = K[e.tagName];
                        i && (i(e, t), X(e, t, s));
                      })(e, t, s);
                  })(e, t, s);
            },
            le = function (e) {
              e.removeAttribute(d), e.removeAttribute(c), e.removeAttribute(u);
            },
            de = function (e) {
              N(e, function (e) {
                Y(e, H);
              }),
                Y(e, H);
            },
            ce = {
              IMG: de,
              IFRAME: function (e) {
                Y(e, G);
              },
              VIDEO: function (e) {
                B(e, function (e) {
                  Y(e, G);
                }),
                  Y(e, q),
                  e.load();
              },
              OBJECT: function (e) {
                Y(e, W);
              },
            },
            ue = function (e, t) {
              (function (e) {
                var t = ce[e.tagName];
                t
                  ? t(e)
                  : (function (e) {
                      if (j(e)) {
                        var t = V(e);
                        e.style.backgroundImage = t.backgroundImage;
                      }
                    })(e);
              })(e),
                (function (e, t) {
                  L(e) ||
                    A(e) ||
                    (k(e, t.class_entered),
                    k(e, t.class_exited),
                    k(e, t.class_applied),
                    k(e, t.class_loading),
                    k(e, t.class_loaded),
                    k(e, t.class_error));
                })(e, t),
                x(e),
                R(e);
            },
            pe = ["IMG", "IFRAME", "VIDEO"],
            he = function (e) {
              return e.use_native && "loading" in HTMLImageElement.prototype;
            },
            fe = function (e, t, s) {
              e.forEach(function (e) {
                return (function (e) {
                  return e.isIntersecting || e.intersectionRatio > 0;
                })(e)
                  ? (function (e, t, s, i) {
                      var n = (function (e) {
                        return _.indexOf(T(e)) >= 0;
                      })(e);
                      C(e, "entered"),
                        M(e, s.class_entered),
                        k(e, s.class_exited),
                        (function (e, t, s) {
                          t.unobserve_entered && $(e, s);
                        })(e, s, i),
                        O(s.callback_enter, e, t, i),
                        n || oe(e, s, i);
                    })(e.target, e, t, s)
                  : (function (e, t, s, i) {
                      L(e) ||
                        (M(e, s.class_exited),
                        (function (e, t, s, i) {
                          s.cancel_on_exit &&
                            (function (e) {
                              return T(e) === m;
                            })(e) &&
                            "IMG" === e.tagName &&
                            (ie(e),
                            (function (e) {
                              N(e, function (e) {
                                le(e);
                              }),
                                le(e);
                            })(e),
                            de(e),
                            k(e, s.class_loading),
                            I(i, -1),
                            x(e),
                            O(s.callback_cancel, e, t, i));
                        })(e, t, s, i),
                        O(s.callback_exit, e, t, i));
                    })(e.target, e, t, s);
              });
            },
            me = function (e) {
              return Array.prototype.slice.call(e);
            },
            ge = function (e) {
              return e.container.querySelectorAll(e.elements_selector);
            },
            ve = function (e) {
              return (function (e) {
                return T(e) === w;
              })(e);
            },
            we = function (e, t) {
              return (function (e) {
                return me(e).filter(L);
              })(e || ge(t));
            },
            be = function (e, s) {
              var n = o(e);
              (this._settings = n),
                (this.loadingCount = 0),
                (function (e, t) {
                  i &&
                    !he(e) &&
                    (t._observer = new IntersectionObserver(
                      function (s) {
                        fe(s, e, t);
                      },
                      (function (e) {
                        return {
                          root: e.container === document ? null : e.container,
                          rootMargin: e.thresholds || e.threshold + "px",
                        };
                      })(e)
                    ));
                })(n, this),
                (function (e, s) {
                  t &&
                    window.addEventListener("online", function () {
                      !(function (e, t) {
                        var s;
                        ((s = ge(e)), me(s).filter(ve)).forEach(function (t) {
                          k(t, e.class_error), x(t);
                        }),
                          t.update();
                      })(e, s);
                    });
                })(n, this),
                this.update(s);
            };
          return (
            (be.prototype = {
              update: function (e) {
                var t,
                  n,
                  r = this._settings,
                  a = we(e, r);
                z(this, a.length),
                  !s && i
                    ? he(r)
                      ? (function (e, t, s) {
                          e.forEach(function (e) {
                            -1 !== pe.indexOf(e.tagName) &&
                              (function (e, t, s) {
                                e.setAttribute("loading", "lazy"),
                                  re(e, t, s),
                                  (function (e, t) {
                                    var s = K[e.tagName];
                                    s && s(e, t);
                                  })(e, t),
                                  C(e, b);
                              })(e, t, s);
                          }),
                            z(s, 0);
                        })(a, r, this)
                      : ((n = a),
                        (function (e) {
                          e.disconnect();
                        })((t = this._observer)),
                        (function (e, t) {
                          t.forEach(function (t) {
                            e.observe(t);
                          });
                        })(t, n))
                    : this.loadAll(a);
              },
              destroy: function () {
                this._observer && this._observer.disconnect(),
                  ge(this._settings).forEach(function (e) {
                    R(e);
                  }),
                  delete this._observer,
                  delete this._settings,
                  delete this.loadingCount,
                  delete this.toLoadCount;
              },
              loadAll: function (e) {
                var t = this,
                  s = this._settings;
                we(e, s).forEach(function (e) {
                  $(e, t), oe(e, s, t);
                });
              },
              restoreAll: function () {
                var e = this._settings;
                ge(e).forEach(function (t) {
                  ue(t, e);
                });
              },
            }),
            (be.load = function (e, t) {
              var s = o(t);
              oe(e, s);
            }),
            (be.resetStatus = function (e) {
              x(e);
            }),
            t &&
              (function (e, t) {
                if (t)
                  if (t.length) for (var s, i = 0; (s = t[i]); i += 1) l(e, s);
                  else l(e, t);
              })(be, window.lazyLoadOptions),
            be
          );
        })();
      },
    },
    t = {};
  function s(i) {
    var n = t[i];
    if (void 0 !== n) return n.exports;
    var r = (t[i] = { exports: {} });
    return e[i].call(r.exports, r, r.exports, s), r.exports;
  }
  (s.g = (function () {
    if ("object" == typeof globalThis) return globalThis;
    try {
      return this || new Function("return this")();
    } catch (e) {
      if ("object" == typeof window) return window;
    }
  })()),
    (() => {
      "use strict";
      function e(e) {
        this.type = e;
      }
      (e.prototype.init = function () {
        const e = this;
        (this.??bjects = []),
          (this.daClassname = "_dynamic_adapt_"),
          (this.nodes = document.querySelectorAll("[data-da]"));
        for (let e = 0; e < this.nodes.length; e++) {
          const t = this.nodes[e],
            s = t.dataset.da.trim().split(","),
            i = {};
          (i.element = t),
            (i.parent = t.parentNode),
            (i.destination = document.querySelector(s[0].trim())),
            (i.breakpoint = s[1] ? s[1].trim() : "767"),
            (i.place = s[2] ? s[2].trim() : "last"),
            (i.index = this.indexInParent(i.parent, i.element)),
            this.??bjects.push(i);
        }
        this.arraySort(this.??bjects),
          (this.mediaQueries = Array.prototype.map.call(
            this.??bjects,
            function (e) {
              return (
                "(" +
                this.type +
                "-width: " +
                e.breakpoint +
                "px)," +
                e.breakpoint
              );
            },
            this
          )),
          (this.mediaQueries = Array.prototype.filter.call(
            this.mediaQueries,
            function (e, t, s) {
              return Array.prototype.indexOf.call(s, e) === t;
            }
          ));
        for (let t = 0; t < this.mediaQueries.length; t++) {
          const s = this.mediaQueries[t],
            i = String.prototype.split.call(s, ","),
            n = window.matchMedia(i[0]),
            r = i[1],
            a = Array.prototype.filter.call(this.??bjects, function (e) {
              return e.breakpoint === r;
            });
          n.addListener(function () {
            e.mediaHandler(n, a);
          }),
            this.mediaHandler(n, a);
        }
      }),
        (e.prototype.mediaHandler = function (e, t) {
          if (e.matches)
            for (let e = 0; e < t.length; e++) {
              const s = t[e];
              (s.index = this.indexInParent(s.parent, s.element)),
                this.moveTo(s.place, s.element, s.destination);
            }
          else
            for (let e = t.length - 1; e >= 0; e--) {
              const s = t[e];
              s.element.classList.contains(this.daClassname) &&
                this.moveBack(s.parent, s.element, s.index);
            }
        }),
        (e.prototype.moveTo = function (e, t, s) {
          t.classList.add(this.daClassname),
            "last" === e || e >= s.children.length
              ? s.insertAdjacentElement("beforeend", t)
              : "first" !== e
              ? s.children[e].insertAdjacentElement("beforebegin", t)
              : s.insertAdjacentElement("afterbegin", t);
        }),
        (e.prototype.moveBack = function (e, t, s) {
          t.classList.remove(this.daClassname),
            void 0 !== e.children[s]
              ? e.children[s].insertAdjacentElement("beforebegin", t)
              : e.insertAdjacentElement("beforeend", t);
        }),
        (e.prototype.indexInParent = function (e, t) {
          const s = Array.prototype.slice.call(e.children);
          return Array.prototype.indexOf.call(s, t);
        }),
        (e.prototype.arraySort = function (e) {
          "min" === this.type
            ? Array.prototype.sort.call(e, function (e, t) {
                return e.breakpoint === t.breakpoint
                  ? e.place === t.place
                    ? 0
                    : "first" === e.place || "last" === t.place
                    ? -1
                    : "last" === e.place || "first" === t.place
                    ? 1
                    : e.place - t.place
                  : e.breakpoint - t.breakpoint;
              })
            : Array.prototype.sort.call(e, function (e, t) {
                return e.breakpoint === t.breakpoint
                  ? e.place === t.place
                    ? 0
                    : "first" === e.place || "last" === t.place
                    ? 1
                    : "last" === e.place || "first" === t.place
                    ? -1
                    : t.place - e.place
                  : t.breakpoint - e.breakpoint;
              });
        });
      new e("max").init();
      class t {
        constructor(e) {
          let t = {
            logging: !0,
            init: !0,
            attributeOpenButton: "data-popup",
            attributeCloseButton: "data-close",
            fixElementSelector: "[data-lp]",
            youtubeAttribute: "data-youtube",
            youtubePlaceAttribute: "data-youtube-place",
            setAutoplayYoutube: !0,
            classes: {
              popup: "popup",
              popupContent: "popup__content",
              popupActive: "popup_show",
              bodyActive: "popup-show",
            },
            focusCatch: !0,
            closeEsc: !0,
            bodyLock: !0,
            bodyLockDelay: 500,
            hashSettings: { location: !0, goHash: !0 },
            on: {
              beforeOpen: function () {},
              afterOpen: function () {},
              beforeClose: function () {},
              afterClose: function () {},
            },
          };
          (this.isOpen = !1),
            (this.targetOpen = { selector: !1, element: !1 }),
            (this.previousOpen = { selector: !1, element: !1 }),
            (this.lastClosed = { selector: !1, element: !1 }),
            (this._dataValue = !1),
            (this.hash = !1),
            (this._reopen = !1),
            (this._selectorOpen = !1),
            (this.lastFocusEl = !1),
            (this._focusEl = [
              "a[href]",
              'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
              "button:not([disabled]):not([aria-hidden])",
              "select:not([disabled]):not([aria-hidden])",
              "textarea:not([disabled]):not([aria-hidden])",
              "area[href]",
              "iframe",
              "object",
              "embed",
              "[contenteditable]",
              '[tabindex]:not([tabindex^="-"])',
            ]),
            (this.options = {
              ...t,
              ...e,
              classes: { ...t.classes, ...e?.classes },
              hashSettings: { ...t.hashSettings, ...e?.hashSettings },
              on: { ...t.on, ...e?.on },
            }),
            this.options.init && this.initPopups();
        }
        initPopups() {
          this.popupLogging("??????????????????"), this.eventsPopup();
        }
        eventsPopup() {
          document.addEventListener(
            "click",
            function (e) {
              const t = e.target.closest(
                `[${this.options.attributeOpenButton}]`
              );
              if (t)
                return (
                  e.preventDefault(),
                  (this._dataValue = t.getAttribute(
                    this.options.attributeOpenButton
                  )
                    ? t.getAttribute(this.options.attributeOpenButton)
                    : "error"),
                  "error" !== this._dataValue
                    ? (this.isOpen || (this.lastFocusEl = t),
                      (this.targetOpen.selector = `${this._dataValue}`),
                      (this._selectorOpen = !0),
                      void this.open())
                    : void this.popupLogging(
                        `???? ????, ???? ???????????????? ?????????????? ?? ${t.classList}`
                      )
                );
              return e.target.closest(
                `[${this.options.attributeCloseButton}]`
              ) ||
                (!e.target.closest(`.${this.options.classes.popupContent}`) &&
                  this.isOpen)
                ? (e.preventDefault(), void this.close())
                : void 0;
            }.bind(this)
          ),
            document.addEventListener(
              "keydown",
              function (e) {
                if (
                  this.options.closeEsc &&
                  27 == e.which &&
                  "Escape" === e.code &&
                  this.isOpen
                )
                  return e.preventDefault(), void this.close();
                this.options.focusCatch &&
                  9 == e.which &&
                  this.isOpen &&
                  this._focusCatch(e);
              }.bind(this)
            ),
            document.querySelector("form[data-ajax],form[data-dev]") &&
              document.addEventListener(
                "formSent",
                function (e) {
                  const t = e.detail.form.dataset.popupMessage;
                  t && this.open(t);
                }.bind(this)
              ),
            this.options.hashSettings.goHash &&
              (window.addEventListener(
                "hashchange",
                function () {
                  window.location.hash
                    ? this._openToHash()
                    : this.close(this.targetOpen.selector);
                }.bind(this)
              ),
              window.addEventListener(
                "load",
                function () {
                  window.location.hash && this._openToHash();
                }.bind(this)
              ));
        }
        open(e) {
          if (
            (e &&
              "string" == typeof e &&
              "" !== e.trim() &&
              ((this.targetOpen.selector = e), (this._selectorOpen = !0)),
            this.isOpen && ((this._reopen = !0), this.close()),
            this._selectorOpen ||
              (this.targetOpen.selector = this.lastClosed.selector),
            this._reopen ||
              (this.previousActiveElement = document.activeElement),
            (this.targetOpen.element = document.querySelector(
              this.targetOpen.selector
            )),
            this.targetOpen.element)
          ) {
            if (
              this.targetOpen.element.hasAttribute(
                this.options.youtubeAttribute
              )
            ) {
              const e = `https://www.youtube.com/embed/${this.targetOpen.element.getAttribute(
                  this.options.youtubeAttribute
                )}?rel=0&showinfo=0&autoplay=1`,
                t = document.createElement("iframe");
              t.setAttribute("allowfullscreen", "");
              const s = this.options.setAutoplayYoutube ? "autoplay;" : "";
              t.setAttribute("allow", `${s}; encrypted-media`),
                t.setAttribute("src", e),
                this.targetOpen.element.querySelector(
                  `[${this.options.youtubePlaceAttribute}]`
                ) &&
                  this.targetOpen.element
                    .querySelector(`[${this.options.youtubePlaceAttribute}]`)
                    .appendChild(t);
            }
            this.options.hashSettings.location &&
              (this._getHash(), this._setHash()),
              this.options.on.beforeOpen(this),
              this.targetOpen.element.classList.add(
                this.options.classes.popupActive
              ),
              document.body.classList.add(this.options.classes.bodyActive),
              this._reopen ? (this._reopen = !1) : o(),
              this.targetOpen.element.setAttribute("aria-hidden", "false"),
              (this.previousOpen.selector = this.targetOpen.selector),
              (this.previousOpen.element = this.targetOpen.element),
              (this._selectorOpen = !1),
              (this.isOpen = !0),
              setTimeout(() => {
                this._focusTrap();
              }, 50),
              document.dispatchEvent(
                new CustomEvent("afterPopupOpen", { detail: { popup: this } })
              ),
              this.popupLogging("???????????? ??????????");
          } else
            this.popupLogging(
              "???? ????, ???????????? ???????????? ??????. ?????????????????? ???????????????????????? ??????????. "
            );
        }
        close(e) {
          e &&
            "string" == typeof e &&
            "" !== e.trim() &&
            (this.previousOpen.selector = e),
            this.isOpen &&
              a &&
              (this.options.on.beforeClose(this),
              this.targetOpen.element.hasAttribute(
                this.options.youtubeAttribute
              ) &&
                this.targetOpen.element.querySelector(
                  `[${this.options.youtubePlaceAttribute}]`
                ) &&
                (this.targetOpen.element.querySelector(
                  `[${this.options.youtubePlaceAttribute}]`
                ).innerHTML = ""),
              this.previousOpen.element.classList.remove(
                this.options.classes.popupActive
              ),
              this.previousOpen.element.setAttribute("aria-hidden", "true"),
              this._reopen ||
                (document.body.classList.remove(
                  this.options.classes.bodyActive
                ),
                o(),
                (this.isOpen = !1)),
              this._removeHash(),
              this._selectorOpen &&
                ((this.lastClosed.selector = this.previousOpen.selector),
                (this.lastClosed.element = this.previousOpen.element)),
              this.options.on.afterClose(this),
              setTimeout(() => {
                this._focusTrap();
              }, 50),
              this.popupLogging("???????????? ??????????"));
        }
        _getHash() {
          this.options.hashSettings.location &&
            (this.hash = this.targetOpen.selector.includes("#")
              ? this.targetOpen.selector
              : this.targetOpen.selector.replace(".", "#"));
        }
        _openToHash() {
          let e = document.querySelector(
            `.${window.location.hash.replace("#", "")}`
          )
            ? `.${window.location.hash.replace("#", "")}`
            : document.querySelector(`${window.location.hash}`)
            ? `${window.location.hash}`
            : null;
          document.querySelector(
            `[${this.options.attributeOpenButton}="${e}"]`
          ) &&
            e &&
            this.open(e);
        }
        _setHash() {
          history.pushState("", "", this.hash);
        }
        _removeHash() {
          history.pushState("", "", window.location.href.split("#")[0]);
        }
        _focusCatch(e) {
          const t = this.targetOpen.element.querySelectorAll(this._focusEl),
            s = Array.prototype.slice.call(t),
            i = s.indexOf(document.activeElement);
          e.shiftKey &&
            0 === i &&
            (s[s.length - 1].focus(), e.preventDefault()),
            e.shiftKey ||
              i !== s.length - 1 ||
              (s[0].focus(), e.preventDefault());
        }
        _focusTrap() {
          const e = this.previousOpen.element.querySelectorAll(this._focusEl);
          !this.isOpen && this.lastFocusEl
            ? this.lastFocusEl.focus()
            : e[0].focus();
        }
        popupLogging(e) {
          this.options.logging && c(`[??????????????]: ${e}`);
        }
      }
      let i = {
        Android: function () {
          return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function () {
          return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function () {
          return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function () {
          return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function () {
          return navigator.userAgent.match(/IEMobile/i);
        },
        any: function () {
          return (
            i.Android() || i.BlackBerry() || i.iOS() || i.Opera() || i.Windows()
          );
        },
      };
      let n = (e, t = 500, s = 0) => {
          e.classList.contains("_slide") ||
            (e.classList.add("_slide"),
            (e.style.transitionProperty = "height, margin, padding"),
            (e.style.transitionDuration = t + "ms"),
            (e.style.height = `${e.offsetHeight}px`),
            e.offsetHeight,
            (e.style.overflow = "hidden"),
            (e.style.height = s ? `${s}px` : "0px"),
            (e.style.paddingTop = 0),
            (e.style.paddingBottom = 0),
            (e.style.marginTop = 0),
            (e.style.marginBottom = 0),
            window.setTimeout(() => {
              (e.hidden = !s),
                !s && e.style.removeProperty("height"),
                e.style.removeProperty("padding-top"),
                e.style.removeProperty("padding-bottom"),
                e.style.removeProperty("margin-top"),
                e.style.removeProperty("margin-bottom"),
                !s && e.style.removeProperty("overflow"),
                e.style.removeProperty("transition-duration"),
                e.style.removeProperty("transition-property"),
                e.classList.remove("_slide");
            }, t));
        },
        r = (e, t = 500, s = 0) => {
          if (!e.classList.contains("_slide")) {
            e.classList.add("_slide"),
              (e.hidden = !e.hidden && null),
              s && e.style.removeProperty("height");
            let i = e.offsetHeight;
            (e.style.overflow = "hidden"),
              (e.style.height = s ? `${s}px` : "0px"),
              (e.style.paddingTop = 0),
              (e.style.paddingBottom = 0),
              (e.style.marginTop = 0),
              (e.style.marginBottom = 0),
              e.offsetHeight,
              (e.style.transitionProperty = "height, margin, padding"),
              (e.style.transitionDuration = t + "ms"),
              (e.style.height = i + "px"),
              e.style.removeProperty("padding-top"),
              e.style.removeProperty("padding-bottom"),
              e.style.removeProperty("margin-top"),
              e.style.removeProperty("margin-bottom"),
              window.setTimeout(() => {
                e.style.removeProperty("height"),
                  e.style.removeProperty("overflow"),
                  e.style.removeProperty("transition-duration"),
                  e.style.removeProperty("transition-property"),
                  e.classList.remove("_slide");
              }, t);
          }
        },
        a = !0,
        o = (e = 500) => {
          document.documentElement.classList.contains("lock") ? l(e) : d(e);
        },
        l = (e = 500) => {
          let t = document.querySelector("body");
          if (a) {
            let s = document.querySelectorAll("[data-lp]");
            setTimeout(() => {
              for (let e = 0; e < s.length; e++) {
                s[e].style.paddingRight = "0px";
              }
              (t.style.paddingRight = "0px"),
                document.documentElement.classList.remove("lock");
            }, e),
              (a = !1),
              setTimeout(function () {
                a = !0;
              }, e);
          }
        },
        d = (e = 500) => {
          let t = document.querySelector("body");
          if (a) {
            let s = document.querySelectorAll("[data-lp]");
            for (let e = 0; e < s.length; e++) {
              s[e].style.paddingRight =
                window.innerWidth -
                document.querySelector(".wrapper").offsetWidth +
                "px";
            }
            (t.style.paddingRight =
              window.innerWidth -
              document.querySelector(".wrapper").offsetWidth +
              "px"),
              document.documentElement.classList.add("lock"),
              (a = !1),
              setTimeout(function () {
                a = !0;
              }, e);
          }
        };
      function c(e) {
        setTimeout(() => {
          window.FLS && console.log(e);
        }, 0);
      }
      function u(e) {
        return e.filter(function (e, t, s) {
          return s.indexOf(e) === t;
        });
      }
      function p(e, t) {
        const s = Array.from(e).filter(function (e, s, i) {
          if (e.dataset[t]) return e.dataset[t].split(",")[0];
        });
        if (s.length) {
          const e = [];
          s.forEach((s) => {
            const i = {},
              n = s.dataset[t].split(",");
            (i.value = n[0]),
              (i.type = n[1] ? n[1].trim() : "max"),
              (i.item = s),
              e.push(i);
          });
          let i = e.map(function (e) {
            return (
              "(" +
              e.type +
              "-width: " +
              e.value +
              "px)," +
              e.value +
              "," +
              e.type
            );
          });
          i = u(i);
          const n = [];
          if (i.length)
            return (
              i.forEach((t) => {
                const s = t.split(","),
                  i = s[1],
                  r = s[2],
                  a = window.matchMedia(s[0]),
                  o = e.filter(function (e) {
                    if (e.value === i && e.type === r) return !0;
                  });
                n.push({ itemsArray: o, matchMedia: a });
              }),
              n
            );
        }
      }
      function h(e) {
        return (
          null !== e &&
          "object" == typeof e &&
          "constructor" in e &&
          e.constructor === Object
        );
      }
      function f(e = {}, t = {}) {
        Object.keys(t).forEach((s) => {
          void 0 === e[s]
            ? (e[s] = t[s])
            : h(t[s]) &&
              h(e[s]) &&
              Object.keys(t[s]).length > 0 &&
              f(e[s], t[s]);
        });
      }
      const m = {
        body: {},
        addEventListener() {},
        removeEventListener() {},
        activeElement: { blur() {}, nodeName: "" },
        querySelector: () => null,
        querySelectorAll: () => [],
        getElementById: () => null,
        createEvent: () => ({ initEvent() {} }),
        createElement: () => ({
          children: [],
          childNodes: [],
          style: {},
          setAttribute() {},
          getElementsByTagName: () => [],
        }),
        createElementNS: () => ({}),
        importNode: () => null,
        location: {
          hash: "",
          host: "",
          hostname: "",
          href: "",
          origin: "",
          pathname: "",
          protocol: "",
          search: "",
        },
      };
      function g() {
        const e = "undefined" != typeof document ? document : {};
        return f(e, m), e;
      }
      const v = {
        document: m,
        navigator: { userAgent: "" },
        location: {
          hash: "",
          host: "",
          hostname: "",
          href: "",
          origin: "",
          pathname: "",
          protocol: "",
          search: "",
        },
        history: { replaceState() {}, pushState() {}, go() {}, back() {} },
        CustomEvent: function () {
          return this;
        },
        addEventListener() {},
        removeEventListener() {},
        getComputedStyle: () => ({ getPropertyValue: () => "" }),
        Image() {},
        Date() {},
        screen: {},
        setTimeout() {},
        clearTimeout() {},
        matchMedia: () => ({}),
        requestAnimationFrame: (e) =>
          "undefined" == typeof setTimeout ? (e(), null) : setTimeout(e, 0),
        cancelAnimationFrame(e) {
          "undefined" != typeof setTimeout && clearTimeout(e);
        },
      };
      function w() {
        const e = "undefined" != typeof window ? window : {};
        return f(e, v), e;
      }
      class b extends Array {
        constructor(e) {
          "number" == typeof e
            ? super(e)
            : (super(...(e || [])),
              (function (e) {
                const t = e.__proto__;
                Object.defineProperty(e, "__proto__", {
                  get: () => t,
                  set(e) {
                    t.__proto__ = e;
                  },
                });
              })(this));
        }
      }
      function y(e = []) {
        const t = [];
        return (
          e.forEach((e) => {
            Array.isArray(e) ? t.push(...y(e)) : t.push(e);
          }),
          t
        );
      }
      function S(e, t) {
        return Array.prototype.filter.call(e, t);
      }
      function E(e, t) {
        const s = w(),
          i = g();
        let n = [];
        if (!t && e instanceof b) return e;
        if (!e) return new b(n);
        if ("string" == typeof e) {
          const s = e.trim();
          if (s.indexOf("<") >= 0 && s.indexOf(">") >= 0) {
            let e = "div";
            0 === s.indexOf("<li") && (e = "ul"),
              0 === s.indexOf("<tr") && (e = "tbody"),
              (0 !== s.indexOf("<td") && 0 !== s.indexOf("<th")) || (e = "tr"),
              0 === s.indexOf("<tbody") && (e = "table"),
              0 === s.indexOf("<option") && (e = "select");
            const t = i.createElement(e);
            t.innerHTML = s;
            for (let e = 0; e < t.childNodes.length; e += 1)
              n.push(t.childNodes[e]);
          } else
            n = (function (e, t) {
              if ("string" != typeof e) return [e];
              const s = [],
                i = t.querySelectorAll(e);
              for (let e = 0; e < i.length; e += 1) s.push(i[e]);
              return s;
            })(e.trim(), t || i);
        } else if (e.nodeType || e === s || e === i) n.push(e);
        else if (Array.isArray(e)) {
          if (e instanceof b) return e;
          n = e;
        }
        return new b(
          (function (e) {
            const t = [];
            for (let s = 0; s < e.length; s += 1)
              -1 === t.indexOf(e[s]) && t.push(e[s]);
            return t;
          })(n)
        );
      }
      E.fn = b.prototype;
      const T = "resize scroll".split(" ");
      function C(e) {
        return function (...t) {
          if (void 0 === t[0]) {
            for (let t = 0; t < this.length; t += 1)
              T.indexOf(e) < 0 &&
                (e in this[t] ? this[t][e]() : E(this[t]).trigger(e));
            return this;
          }
          return this.on(e, ...t);
        };
      }
      C("click"),
        C("blur"),
        C("focus"),
        C("focusin"),
        C("focusout"),
        C("keyup"),
        C("keydown"),
        C("keypress"),
        C("submit"),
        C("change"),
        C("mousedown"),
        C("mousemove"),
        C("mouseup"),
        C("mouseenter"),
        C("mouseleave"),
        C("mouseout"),
        C("mouseover"),
        C("touchstart"),
        C("touchend"),
        C("touchmove"),
        C("resize"),
        C("scroll");
      const x = {
        addClass: function (...e) {
          const t = y(e.map((e) => e.split(" ")));
          return (
            this.forEach((e) => {
              e.classList.add(...t);
            }),
            this
          );
        },
        removeClass: function (...e) {
          const t = y(e.map((e) => e.split(" ")));
          return (
            this.forEach((e) => {
              e.classList.remove(...t);
            }),
            this
          );
        },
        hasClass: function (...e) {
          const t = y(e.map((e) => e.split(" ")));
          return (
            S(this, (e) => t.filter((t) => e.classList.contains(t)).length > 0)
              .length > 0
          );
        },
        toggleClass: function (...e) {
          const t = y(e.map((e) => e.split(" ")));
          this.forEach((e) => {
            t.forEach((t) => {
              e.classList.toggle(t);
            });
          });
        },
        attr: function (e, t) {
          if (1 === arguments.length && "string" == typeof e)
            return this[0] ? this[0].getAttribute(e) : void 0;
          for (let s = 0; s < this.length; s += 1)
            if (2 === arguments.length) this[s].setAttribute(e, t);
            else
              for (const t in e)
                (this[s][t] = e[t]), this[s].setAttribute(t, e[t]);
          return this;
        },
        removeAttr: function (e) {
          for (let t = 0; t < this.length; t += 1) this[t].removeAttribute(e);
          return this;
        },
        transform: function (e) {
          for (let t = 0; t < this.length; t += 1) this[t].style.transform = e;
          return this;
        },
        transition: function (e) {
          for (let t = 0; t < this.length; t += 1)
            this[t].style.transitionDuration =
              "string" != typeof e ? `${e}ms` : e;
          return this;
        },
        on: function (...e) {
          let [t, s, i, n] = e;
          function r(e) {
            const t = e.target;
            if (!t) return;
            const n = e.target.dom7EventData || [];
            if ((n.indexOf(e) < 0 && n.unshift(e), E(t).is(s))) i.apply(t, n);
            else {
              const e = E(t).parents();
              for (let t = 0; t < e.length; t += 1)
                E(e[t]).is(s) && i.apply(e[t], n);
            }
          }
          function a(e) {
            const t = (e && e.target && e.target.dom7EventData) || [];
            t.indexOf(e) < 0 && t.unshift(e), i.apply(this, t);
          }
          "function" == typeof e[1] && (([t, i, n] = e), (s = void 0)),
            n || (n = !1);
          const o = t.split(" ");
          let l;
          for (let e = 0; e < this.length; e += 1) {
            const t = this[e];
            if (s)
              for (l = 0; l < o.length; l += 1) {
                const e = o[l];
                t.dom7LiveListeners || (t.dom7LiveListeners = {}),
                  t.dom7LiveListeners[e] || (t.dom7LiveListeners[e] = []),
                  t.dom7LiveListeners[e].push({
                    listener: i,
                    proxyListener: r,
                  }),
                  t.addEventListener(e, r, n);
              }
            else
              for (l = 0; l < o.length; l += 1) {
                const e = o[l];
                t.dom7Listeners || (t.dom7Listeners = {}),
                  t.dom7Listeners[e] || (t.dom7Listeners[e] = []),
                  t.dom7Listeners[e].push({ listener: i, proxyListener: a }),
                  t.addEventListener(e, a, n);
              }
          }
          return this;
        },
        off: function (...e) {
          let [t, s, i, n] = e;
          "function" == typeof e[1] && (([t, i, n] = e), (s = void 0)),
            n || (n = !1);
          const r = t.split(" ");
          for (let e = 0; e < r.length; e += 1) {
            const t = r[e];
            for (let e = 0; e < this.length; e += 1) {
              const r = this[e];
              let a;
              if (
                (!s && r.dom7Listeners
                  ? (a = r.dom7Listeners[t])
                  : s && r.dom7LiveListeners && (a = r.dom7LiveListeners[t]),
                a && a.length)
              )
                for (let e = a.length - 1; e >= 0; e -= 1) {
                  const s = a[e];
                  (i && s.listener === i) ||
                  (i &&
                    s.listener &&
                    s.listener.dom7proxy &&
                    s.listener.dom7proxy === i)
                    ? (r.removeEventListener(t, s.proxyListener, n),
                      a.splice(e, 1))
                    : i ||
                      (r.removeEventListener(t, s.proxyListener, n),
                      a.splice(e, 1));
                }
            }
          }
          return this;
        },
        trigger: function (...e) {
          const t = w(),
            s = e[0].split(" "),
            i = e[1];
          for (let n = 0; n < s.length; n += 1) {
            const r = s[n];
            for (let s = 0; s < this.length; s += 1) {
              const n = this[s];
              if (t.CustomEvent) {
                const s = new t.CustomEvent(r, {
                  detail: i,
                  bubbles: !0,
                  cancelable: !0,
                });
                (n.dom7EventData = e.filter((e, t) => t > 0)),
                  n.dispatchEvent(s),
                  (n.dom7EventData = []),
                  delete n.dom7EventData;
              }
            }
          }
          return this;
        },
        transitionEnd: function (e) {
          const t = this;
          return (
            e &&
              t.on("transitionend", function s(i) {
                i.target === this &&
                  (e.call(this, i), t.off("transitionend", s));
              }),
            this
          );
        },
        outerWidth: function (e) {
          if (this.length > 0) {
            if (e) {
              const e = this.styles();
              return (
                this[0].offsetWidth +
                parseFloat(e.getPropertyValue("margin-right")) +
                parseFloat(e.getPropertyValue("margin-left"))
              );
            }
            return this[0].offsetWidth;
          }
          return null;
        },
        outerHeight: function (e) {
          if (this.length > 0) {
            if (e) {
              const e = this.styles();
              return (
                this[0].offsetHeight +
                parseFloat(e.getPropertyValue("margin-top")) +
                parseFloat(e.getPropertyValue("margin-bottom"))
              );
            }
            return this[0].offsetHeight;
          }
          return null;
        },
        styles: function () {
          const e = w();
          return this[0] ? e.getComputedStyle(this[0], null) : {};
        },
        offset: function () {
          if (this.length > 0) {
            const e = w(),
              t = g(),
              s = this[0],
              i = s.getBoundingClientRect(),
              n = t.body,
              r = s.clientTop || n.clientTop || 0,
              a = s.clientLeft || n.clientLeft || 0,
              o = s === e ? e.scrollY : s.scrollTop,
              l = s === e ? e.scrollX : s.scrollLeft;
            return { top: i.top + o - r, left: i.left + l - a };
          }
          return null;
        },
        css: function (e, t) {
          const s = w();
          let i;
          if (1 === arguments.length) {
            if ("string" != typeof e) {
              for (i = 0; i < this.length; i += 1)
                for (const t in e) this[i].style[t] = e[t];
              return this;
            }
            if (this[0])
              return s.getComputedStyle(this[0], null).getPropertyValue(e);
          }
          if (2 === arguments.length && "string" == typeof e) {
            for (i = 0; i < this.length; i += 1) this[i].style[e] = t;
            return this;
          }
          return this;
        },
        each: function (e) {
          return e
            ? (this.forEach((t, s) => {
                e.apply(t, [t, s]);
              }),
              this)
            : this;
        },
        html: function (e) {
          if (void 0 === e) return this[0] ? this[0].innerHTML : null;
          for (let t = 0; t < this.length; t += 1) this[t].innerHTML = e;
          return this;
        },
        text: function (e) {
          if (void 0 === e) return this[0] ? this[0].textContent.trim() : null;
          for (let t = 0; t < this.length; t += 1) this[t].textContent = e;
          return this;
        },
        is: function (e) {
          const t = w(),
            s = g(),
            i = this[0];
          let n, r;
          if (!i || void 0 === e) return !1;
          if ("string" == typeof e) {
            if (i.matches) return i.matches(e);
            if (i.webkitMatchesSelector) return i.webkitMatchesSelector(e);
            if (i.msMatchesSelector) return i.msMatchesSelector(e);
            for (n = E(e), r = 0; r < n.length; r += 1)
              if (n[r] === i) return !0;
            return !1;
          }
          if (e === s) return i === s;
          if (e === t) return i === t;
          if (e.nodeType || e instanceof b) {
            for (n = e.nodeType ? [e] : e, r = 0; r < n.length; r += 1)
              if (n[r] === i) return !0;
            return !1;
          }
          return !1;
        },
        index: function () {
          let e,
            t = this[0];
          if (t) {
            for (e = 0; null !== (t = t.previousSibling); )
              1 === t.nodeType && (e += 1);
            return e;
          }
        },
        eq: function (e) {
          if (void 0 === e) return this;
          const t = this.length;
          if (e > t - 1) return E([]);
          if (e < 0) {
            const s = t + e;
            return E(s < 0 ? [] : [this[s]]);
          }
          return E([this[e]]);
        },
        append: function (...e) {
          let t;
          const s = g();
          for (let i = 0; i < e.length; i += 1) {
            t = e[i];
            for (let e = 0; e < this.length; e += 1)
              if ("string" == typeof t) {
                const i = s.createElement("div");
                for (i.innerHTML = t; i.firstChild; )
                  this[e].appendChild(i.firstChild);
              } else if (t instanceof b)
                for (let s = 0; s < t.length; s += 1) this[e].appendChild(t[s]);
              else this[e].appendChild(t);
          }
          return this;
        },
        prepend: function (e) {
          const t = g();
          let s, i;
          for (s = 0; s < this.length; s += 1)
            if ("string" == typeof e) {
              const n = t.createElement("div");
              for (n.innerHTML = e, i = n.childNodes.length - 1; i >= 0; i -= 1)
                this[s].insertBefore(n.childNodes[i], this[s].childNodes[0]);
            } else if (e instanceof b)
              for (i = 0; i < e.length; i += 1)
                this[s].insertBefore(e[i], this[s].childNodes[0]);
            else this[s].insertBefore(e, this[s].childNodes[0]);
          return this;
        },
        next: function (e) {
          return this.length > 0
            ? e
              ? this[0].nextElementSibling &&
                E(this[0].nextElementSibling).is(e)
                ? E([this[0].nextElementSibling])
                : E([])
              : this[0].nextElementSibling
              ? E([this[0].nextElementSibling])
              : E([])
            : E([]);
        },
        nextAll: function (e) {
          const t = [];
          let s = this[0];
          if (!s) return E([]);
          for (; s.nextElementSibling; ) {
            const i = s.nextElementSibling;
            e ? E(i).is(e) && t.push(i) : t.push(i), (s = i);
          }
          return E(t);
        },
        prev: function (e) {
          if (this.length > 0) {
            const t = this[0];
            return e
              ? t.previousElementSibling && E(t.previousElementSibling).is(e)
                ? E([t.previousElementSibling])
                : E([])
              : t.previousElementSibling
              ? E([t.previousElementSibling])
              : E([]);
          }
          return E([]);
        },
        prevAll: function (e) {
          const t = [];
          let s = this[0];
          if (!s) return E([]);
          for (; s.previousElementSibling; ) {
            const i = s.previousElementSibling;
            e ? E(i).is(e) && t.push(i) : t.push(i), (s = i);
          }
          return E(t);
        },
        parent: function (e) {
          const t = [];
          for (let s = 0; s < this.length; s += 1)
            null !== this[s].parentNode &&
              (e
                ? E(this[s].parentNode).is(e) && t.push(this[s].parentNode)
                : t.push(this[s].parentNode));
          return E(t);
        },
        parents: function (e) {
          const t = [];
          for (let s = 0; s < this.length; s += 1) {
            let i = this[s].parentNode;
            for (; i; )
              e ? E(i).is(e) && t.push(i) : t.push(i), (i = i.parentNode);
          }
          return E(t);
        },
        closest: function (e) {
          let t = this;
          return void 0 === e
            ? E([])
            : (t.is(e) || (t = t.parents(e).eq(0)), t);
        },
        find: function (e) {
          const t = [];
          for (let s = 0; s < this.length; s += 1) {
            const i = this[s].querySelectorAll(e);
            for (let e = 0; e < i.length; e += 1) t.push(i[e]);
          }
          return E(t);
        },
        children: function (e) {
          const t = [];
          for (let s = 0; s < this.length; s += 1) {
            const i = this[s].children;
            for (let s = 0; s < i.length; s += 1)
              (e && !E(i[s]).is(e)) || t.push(i[s]);
          }
          return E(t);
        },
        filter: function (e) {
          return E(S(this, e));
        },
        remove: function () {
          for (let e = 0; e < this.length; e += 1)
            this[e].parentNode && this[e].parentNode.removeChild(this[e]);
          return this;
        },
      };
      Object.keys(x).forEach((e) => {
        Object.defineProperty(E.fn, e, { value: x[e], writable: !0 });
      });
      const L = E;
      function A(e, t) {
        return void 0 === t && (t = 0), setTimeout(e, t);
      }
      function _() {
        return Date.now();
      }
      function O(e, t) {
        void 0 === t && (t = "x");
        const s = w();
        let i, n, r;
        const a = (function (e) {
          const t = w();
          let s;
          return (
            t.getComputedStyle && (s = t.getComputedStyle(e, null)),
            !s && e.currentStyle && (s = e.currentStyle),
            s || (s = e.style),
            s
          );
        })(e);
        return (
          s.WebKitCSSMatrix
            ? ((n = a.transform || a.webkitTransform),
              n.split(",").length > 6 &&
                (n = n
                  .split(", ")
                  .map((e) => e.replace(",", "."))
                  .join(", ")),
              (r = new s.WebKitCSSMatrix("none" === n ? "" : n)))
            : ((r =
                a.MozTransform ||
                a.OTransform ||
                a.MsTransform ||
                a.msTransform ||
                a.transform ||
                a
                  .getPropertyValue("transform")
                  .replace("translate(", "matrix(1, 0, 0, 1,")),
              (i = r.toString().split(","))),
          "x" === t &&
            (n = s.WebKitCSSMatrix
              ? r.m41
              : 16 === i.length
              ? parseFloat(i[12])
              : parseFloat(i[4])),
          "y" === t &&
            (n = s.WebKitCSSMatrix
              ? r.m42
              : 16 === i.length
              ? parseFloat(i[13])
              : parseFloat(i[5])),
          n || 0
        );
      }
      function M(e) {
        return (
          "object" == typeof e &&
          null !== e &&
          e.constructor &&
          "Object" === Object.prototype.toString.call(e).slice(8, -1)
        );
      }
      function k(e) {
        return "undefined" != typeof window && void 0 !== window.HTMLElement
          ? e instanceof HTMLElement
          : e && (1 === e.nodeType || 11 === e.nodeType);
      }
      function P() {
        const e = Object(arguments.length <= 0 ? void 0 : arguments[0]),
          t = ["__proto__", "constructor", "prototype"];
        for (let s = 1; s < arguments.length; s += 1) {
          const i = s < 0 || arguments.length <= s ? void 0 : arguments[s];
          if (null != i && !k(i)) {
            const s = Object.keys(Object(i)).filter((e) => t.indexOf(e) < 0);
            for (let t = 0, n = s.length; t < n; t += 1) {
              const n = s[t],
                r = Object.getOwnPropertyDescriptor(i, n);
              void 0 !== r &&
                r.enumerable &&
                (M(e[n]) && M(i[n])
                  ? i[n].__swiper__
                    ? (e[n] = i[n])
                    : P(e[n], i[n])
                  : !M(e[n]) && M(i[n])
                  ? ((e[n] = {}),
                    i[n].__swiper__ ? (e[n] = i[n]) : P(e[n], i[n]))
                  : (e[n] = i[n]));
            }
          }
        }
        return e;
      }
      function $(e, t, s) {
        e.style.setProperty(t, s);
      }
      function I(e) {
        let { swiper: t, targetPosition: s, side: i } = e;
        const n = w(),
          r = -t.translate;
        let a,
          o = null;
        const l = t.params.speed;
        (t.wrapperEl.style.scrollSnapType = "none"),
          n.cancelAnimationFrame(t.cssModeFrameID);
        const d = s > r ? "next" : "prev",
          c = (e, t) => ("next" === d && e >= t) || ("prev" === d && e <= t),
          u = () => {
            (a = new Date().getTime()), null === o && (o = a);
            const e = Math.max(Math.min((a - o) / l, 1), 0),
              d = 0.5 - Math.cos(e * Math.PI) / 2;
            let p = r + d * (s - r);
            if ((c(p, s) && (p = s), t.wrapperEl.scrollTo({ [i]: p }), c(p, s)))
              return (
                (t.wrapperEl.style.overflow = "hidden"),
                (t.wrapperEl.style.scrollSnapType = ""),
                setTimeout(() => {
                  (t.wrapperEl.style.overflow = ""),
                    t.wrapperEl.scrollTo({ [i]: p });
                }),
                void n.cancelAnimationFrame(t.cssModeFrameID)
              );
            t.cssModeFrameID = n.requestAnimationFrame(u);
          };
        u();
      }
      let z, D, N;
      function B() {
        return (
          z ||
            (z = (function () {
              const e = w(),
                t = g();
              return {
                smoothScroll:
                  t.documentElement &&
                  "scrollBehavior" in t.documentElement.style,
                touch: !!(
                  "ontouchstart" in e ||
                  (e.DocumentTouch && t instanceof e.DocumentTouch)
                ),
                passiveListener: (function () {
                  let t = !1;
                  try {
                    const s = Object.defineProperty({}, "passive", {
                      get() {
                        t = !0;
                      },
                    });
                    e.addEventListener("testPassiveListener", null, s);
                  } catch (e) {}
                  return t;
                })(),
                gestures: "ongesturestart" in e,
              };
            })()),
          z
        );
      }
      function G(e) {
        return (
          void 0 === e && (e = {}),
          D ||
            (D = (function (e) {
              let { userAgent: t } = void 0 === e ? {} : e;
              const s = B(),
                i = w(),
                n = i.navigator.platform,
                r = t || i.navigator.userAgent,
                a = { ios: !1, android: !1 },
                o = i.screen.width,
                l = i.screen.height,
                d = r.match(/(Android);?[\s\/]+([\d.]+)?/);
              let c = r.match(/(iPad).*OS\s([\d_]+)/);
              const u = r.match(/(iPod)(.*OS\s([\d_]+))?/),
                p = !c && r.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
                h = "Win32" === n;
              let f = "MacIntel" === n;
              return (
                !c &&
                  f &&
                  s.touch &&
                  [
                    "1024x1366",
                    "1366x1024",
                    "834x1194",
                    "1194x834",
                    "834x1112",
                    "1112x834",
                    "768x1024",
                    "1024x768",
                    "820x1180",
                    "1180x820",
                    "810x1080",
                    "1080x810",
                  ].indexOf(`${o}x${l}`) >= 0 &&
                  ((c = r.match(/(Version)\/([\d.]+)/)),
                  c || (c = [0, 1, "13_0_0"]),
                  (f = !1)),
                d && !h && ((a.os = "android"), (a.android = !0)),
                (c || p || u) && ((a.os = "ios"), (a.ios = !0)),
                a
              );
            })(e)),
          D
        );
      }
      function q() {
        return (
          N ||
            (N = (function () {
              const e = w();
              return {
                isSafari: (function () {
                  const t = e.navigator.userAgent.toLowerCase();
                  return (
                    t.indexOf("safari") >= 0 &&
                    t.indexOf("chrome") < 0 &&
                    t.indexOf("android") < 0
                  );
                })(),
                isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(
                  e.navigator.userAgent
                ),
              };
            })()),
          N
        );
      }
      const H = {
        on(e, t, s) {
          const i = this;
          if ("function" != typeof t) return i;
          const n = s ? "unshift" : "push";
          return (
            e.split(" ").forEach((e) => {
              i.eventsListeners[e] || (i.eventsListeners[e] = []),
                i.eventsListeners[e][n](t);
            }),
            i
          );
        },
        once(e, t, s) {
          const i = this;
          if ("function" != typeof t) return i;
          function n() {
            i.off(e, n), n.__emitterProxy && delete n.__emitterProxy;
            for (var s = arguments.length, r = new Array(s), a = 0; a < s; a++)
              r[a] = arguments[a];
            t.apply(i, r);
          }
          return (n.__emitterProxy = t), i.on(e, n, s);
        },
        onAny(e, t) {
          const s = this;
          if ("function" != typeof e) return s;
          const i = t ? "unshift" : "push";
          return (
            s.eventsAnyListeners.indexOf(e) < 0 && s.eventsAnyListeners[i](e), s
          );
        },
        offAny(e) {
          const t = this;
          if (!t.eventsAnyListeners) return t;
          const s = t.eventsAnyListeners.indexOf(e);
          return s >= 0 && t.eventsAnyListeners.splice(s, 1), t;
        },
        off(e, t) {
          const s = this;
          return s.eventsListeners
            ? (e.split(" ").forEach((e) => {
                void 0 === t
                  ? (s.eventsListeners[e] = [])
                  : s.eventsListeners[e] &&
                    s.eventsListeners[e].forEach((i, n) => {
                      (i === t ||
                        (i.__emitterProxy && i.__emitterProxy === t)) &&
                        s.eventsListeners[e].splice(n, 1);
                    });
              }),
              s)
            : s;
        },
        emit() {
          const e = this;
          if (!e.eventsListeners) return e;
          let t, s, i;
          for (var n = arguments.length, r = new Array(n), a = 0; a < n; a++)
            r[a] = arguments[a];
          "string" == typeof r[0] || Array.isArray(r[0])
            ? ((t = r[0]), (s = r.slice(1, r.length)), (i = e))
            : ((t = r[0].events), (s = r[0].data), (i = r[0].context || e)),
            s.unshift(i);
          return (
            (Array.isArray(t) ? t : t.split(" ")).forEach((t) => {
              e.eventsAnyListeners &&
                e.eventsAnyListeners.length &&
                e.eventsAnyListeners.forEach((e) => {
                  e.apply(i, [t, ...s]);
                }),
                e.eventsListeners &&
                  e.eventsListeners[t] &&
                  e.eventsListeners[t].forEach((e) => {
                    e.apply(i, s);
                  });
            }),
            e
          );
        },
      };
      const W = {
        updateSize: function () {
          const e = this;
          let t, s;
          const i = e.$el;
          (t =
            void 0 !== e.params.width && null !== e.params.width
              ? e.params.width
              : i[0].clientWidth),
            (s =
              void 0 !== e.params.height && null !== e.params.height
                ? e.params.height
                : i[0].clientHeight),
            (0 === t && e.isHorizontal()) ||
              (0 === s && e.isVertical()) ||
              ((t =
                t -
                parseInt(i.css("padding-left") || 0, 10) -
                parseInt(i.css("padding-right") || 0, 10)),
              (s =
                s -
                parseInt(i.css("padding-top") || 0, 10) -
                parseInt(i.css("padding-bottom") || 0, 10)),
              Number.isNaN(t) && (t = 0),
              Number.isNaN(s) && (s = 0),
              Object.assign(e, {
                width: t,
                height: s,
                size: e.isHorizontal() ? t : s,
              }));
        },
        updateSlides: function () {
          const e = this;
          function t(t) {
            return e.isHorizontal()
              ? t
              : {
                  width: "height",
                  "margin-top": "margin-left",
                  "margin-bottom ": "margin-right",
                  "margin-left": "margin-top",
                  "margin-right": "margin-bottom",
                  "padding-left": "padding-top",
                  "padding-right": "padding-bottom",
                  marginRight: "marginBottom",
                }[t];
          }
          function s(e, s) {
            return parseFloat(e.getPropertyValue(t(s)) || 0);
          }
          const i = e.params,
            { $wrapperEl: n, size: r, rtlTranslate: a, wrongRTL: o } = e,
            l = e.virtual && i.virtual.enabled,
            d = l ? e.virtual.slides.length : e.slides.length,
            c = n.children(`.${e.params.slideClass}`),
            u = l ? e.virtual.slides.length : c.length;
          let p = [];
          const h = [],
            f = [];
          let m = i.slidesOffsetBefore;
          "function" == typeof m && (m = i.slidesOffsetBefore.call(e));
          let g = i.slidesOffsetAfter;
          "function" == typeof g && (g = i.slidesOffsetAfter.call(e));
          const v = e.snapGrid.length,
            w = e.slidesGrid.length;
          let b = i.spaceBetween,
            y = -m,
            S = 0,
            E = 0;
          if (void 0 === r) return;
          "string" == typeof b &&
            b.indexOf("%") >= 0 &&
            (b = (parseFloat(b.replace("%", "")) / 100) * r),
            (e.virtualSize = -b),
            a
              ? c.css({ marginLeft: "", marginBottom: "", marginTop: "" })
              : c.css({ marginRight: "", marginBottom: "", marginTop: "" }),
            i.centeredSlides &&
              i.cssMode &&
              ($(e.wrapperEl, "--swiper-centered-offset-before", ""),
              $(e.wrapperEl, "--swiper-centered-offset-after", ""));
          const T = i.grid && i.grid.rows > 1 && e.grid;
          let C;
          T && e.grid.initSlides(u);
          const x =
            "auto" === i.slidesPerView &&
            i.breakpoints &&
            Object.keys(i.breakpoints).filter(
              (e) => void 0 !== i.breakpoints[e].slidesPerView
            ).length > 0;
          for (let n = 0; n < u; n += 1) {
            C = 0;
            const a = c.eq(n);
            if (
              (T && e.grid.updateSlide(n, a, u, t), "none" !== a.css("display"))
            ) {
              if ("auto" === i.slidesPerView) {
                x && (c[n].style[t("width")] = "");
                const r = getComputedStyle(a[0]),
                  o = a[0].style.transform,
                  l = a[0].style.webkitTransform;
                if (
                  (o && (a[0].style.transform = "none"),
                  l && (a[0].style.webkitTransform = "none"),
                  i.roundLengths)
                )
                  C = e.isHorizontal() ? a.outerWidth(!0) : a.outerHeight(!0);
                else {
                  const e = s(r, "width"),
                    t = s(r, "padding-left"),
                    i = s(r, "padding-right"),
                    n = s(r, "margin-left"),
                    o = s(r, "margin-right"),
                    l = r.getPropertyValue("box-sizing");
                  if (l && "border-box" === l) C = e + n + o;
                  else {
                    const { clientWidth: s, offsetWidth: r } = a[0];
                    C = e + t + i + n + o + (r - s);
                  }
                }
                o && (a[0].style.transform = o),
                  l && (a[0].style.webkitTransform = l),
                  i.roundLengths && (C = Math.floor(C));
              } else
                (C = (r - (i.slidesPerView - 1) * b) / i.slidesPerView),
                  i.roundLengths && (C = Math.floor(C)),
                  c[n] && (c[n].style[t("width")] = `${C}px`);
              c[n] && (c[n].swiperSlideSize = C),
                f.push(C),
                i.centeredSlides
                  ? ((y = y + C / 2 + S / 2 + b),
                    0 === S && 0 !== n && (y = y - r / 2 - b),
                    0 === n && (y = y - r / 2 - b),
                    Math.abs(y) < 0.001 && (y = 0),
                    i.roundLengths && (y = Math.floor(y)),
                    E % i.slidesPerGroup == 0 && p.push(y),
                    h.push(y))
                  : (i.roundLengths && (y = Math.floor(y)),
                    (E - Math.min(e.params.slidesPerGroupSkip, E)) %
                      e.params.slidesPerGroup ==
                      0 && p.push(y),
                    h.push(y),
                    (y = y + C + b)),
                (e.virtualSize += C + b),
                (S = C),
                (E += 1);
            }
          }
          if (
            ((e.virtualSize = Math.max(e.virtualSize, r) + g),
            a &&
              o &&
              ("slide" === i.effect || "coverflow" === i.effect) &&
              n.css({ width: `${e.virtualSize + i.spaceBetween}px` }),
            i.setWrapperSize &&
              n.css({ [t("width")]: `${e.virtualSize + i.spaceBetween}px` }),
            T && e.grid.updateWrapperSize(C, p, t),
            !i.centeredSlides)
          ) {
            const t = [];
            for (let s = 0; s < p.length; s += 1) {
              let n = p[s];
              i.roundLengths && (n = Math.floor(n)),
                p[s] <= e.virtualSize - r && t.push(n);
            }
            (p = t),
              Math.floor(e.virtualSize - r) - Math.floor(p[p.length - 1]) > 1 &&
                p.push(e.virtualSize - r);
          }
          if ((0 === p.length && (p = [0]), 0 !== i.spaceBetween)) {
            const s = e.isHorizontal() && a ? "marginLeft" : t("marginRight");
            c.filter((e, t) => !i.cssMode || t !== c.length - 1).css({
              [s]: `${b}px`,
            });
          }
          if (i.centeredSlides && i.centeredSlidesBounds) {
            let e = 0;
            f.forEach((t) => {
              e += t + (i.spaceBetween ? i.spaceBetween : 0);
            }),
              (e -= i.spaceBetween);
            const t = e - r;
            p = p.map((e) => (e < 0 ? -m : e > t ? t + g : e));
          }
          if (i.centerInsufficientSlides) {
            let e = 0;
            if (
              (f.forEach((t) => {
                e += t + (i.spaceBetween ? i.spaceBetween : 0);
              }),
              (e -= i.spaceBetween),
              e < r)
            ) {
              const t = (r - e) / 2;
              p.forEach((e, s) => {
                p[s] = e - t;
              }),
                h.forEach((e, s) => {
                  h[s] = e + t;
                });
            }
          }
          if (
            (Object.assign(e, {
              slides: c,
              snapGrid: p,
              slidesGrid: h,
              slidesSizesGrid: f,
            }),
            i.centeredSlides && i.cssMode && !i.centeredSlidesBounds)
          ) {
            $(e.wrapperEl, "--swiper-centered-offset-before", -p[0] + "px"),
              $(
                e.wrapperEl,
                "--swiper-centered-offset-after",
                e.size / 2 - f[f.length - 1] / 2 + "px"
              );
            const t = -e.snapGrid[0],
              s = -e.slidesGrid[0];
            (e.snapGrid = e.snapGrid.map((e) => e + t)),
              (e.slidesGrid = e.slidesGrid.map((e) => e + s));
          }
          if (
            (u !== d && e.emit("slidesLengthChange"),
            p.length !== v &&
              (e.params.watchOverflow && e.checkOverflow(),
              e.emit("snapGridLengthChange")),
            h.length !== w && e.emit("slidesGridLengthChange"),
            i.watchSlidesProgress && e.updateSlidesOffset(),
            !(l || i.cssMode || ("slide" !== i.effect && "fade" !== i.effect)))
          ) {
            const t = `${i.containerModifierClass}backface-hidden`,
              s = e.$el.hasClass(t);
            u <= i.maxBackfaceHiddenSlides
              ? s || e.$el.addClass(t)
              : s && e.$el.removeClass(t);
          }
        },
        updateAutoHeight: function (e) {
          const t = this,
            s = [],
            i = t.virtual && t.params.virtual.enabled;
          let n,
            r = 0;
          "number" == typeof e
            ? t.setTransition(e)
            : !0 === e && t.setTransition(t.params.speed);
          const a = (e) =>
            i
              ? t.slides.filter(
                  (t) =>
                    parseInt(t.getAttribute("data-swiper-slide-index"), 10) ===
                    e
                )[0]
              : t.slides.eq(e)[0];
          if ("auto" !== t.params.slidesPerView && t.params.slidesPerView > 1)
            if (t.params.centeredSlides)
              t.visibleSlides.each((e) => {
                s.push(e);
              });
            else
              for (n = 0; n < Math.ceil(t.params.slidesPerView); n += 1) {
                const e = t.activeIndex + n;
                if (e > t.slides.length && !i) break;
                s.push(a(e));
              }
          else s.push(a(t.activeIndex));
          for (n = 0; n < s.length; n += 1)
            if (void 0 !== s[n]) {
              const e = s[n].offsetHeight;
              r = e > r ? e : r;
            }
          (r || 0 === r) && t.$wrapperEl.css("height", `${r}px`);
        },
        updateSlidesOffset: function () {
          const e = this,
            t = e.slides;
          for (let s = 0; s < t.length; s += 1)
            t[s].swiperSlideOffset = e.isHorizontal()
              ? t[s].offsetLeft
              : t[s].offsetTop;
        },
        updateSlidesProgress: function (e) {
          void 0 === e && (e = (this && this.translate) || 0);
          const t = this,
            s = t.params,
            { slides: i, rtlTranslate: n, snapGrid: r } = t;
          if (0 === i.length) return;
          void 0 === i[0].swiperSlideOffset && t.updateSlidesOffset();
          let a = -e;
          n && (a = e),
            i.removeClass(s.slideVisibleClass),
            (t.visibleSlidesIndexes = []),
            (t.visibleSlides = []);
          for (let e = 0; e < i.length; e += 1) {
            const o = i[e];
            let l = o.swiperSlideOffset;
            s.cssMode && s.centeredSlides && (l -= i[0].swiperSlideOffset);
            const d =
                (a + (s.centeredSlides ? t.minTranslate() : 0) - l) /
                (o.swiperSlideSize + s.spaceBetween),
              c =
                (a - r[0] + (s.centeredSlides ? t.minTranslate() : 0) - l) /
                (o.swiperSlideSize + s.spaceBetween),
              u = -(a - l),
              p = u + t.slidesSizesGrid[e];
            ((u >= 0 && u < t.size - 1) ||
              (p > 1 && p <= t.size) ||
              (u <= 0 && p >= t.size)) &&
              (t.visibleSlides.push(o),
              t.visibleSlidesIndexes.push(e),
              i.eq(e).addClass(s.slideVisibleClass)),
              (o.progress = n ? -d : d),
              (o.originalProgress = n ? -c : c);
          }
          t.visibleSlides = L(t.visibleSlides);
        },
        updateProgress: function (e) {
          const t = this;
          if (void 0 === e) {
            const s = t.rtlTranslate ? -1 : 1;
            e = (t && t.translate && t.translate * s) || 0;
          }
          const s = t.params,
            i = t.maxTranslate() - t.minTranslate();
          let { progress: n, isBeginning: r, isEnd: a } = t;
          const o = r,
            l = a;
          0 === i
            ? ((n = 0), (r = !0), (a = !0))
            : ((n = (e - t.minTranslate()) / i), (r = n <= 0), (a = n >= 1)),
            Object.assign(t, { progress: n, isBeginning: r, isEnd: a }),
            (s.watchSlidesProgress || (s.centeredSlides && s.autoHeight)) &&
              t.updateSlidesProgress(e),
            r && !o && t.emit("reachBeginning toEdge"),
            a && !l && t.emit("reachEnd toEdge"),
            ((o && !r) || (l && !a)) && t.emit("fromEdge"),
            t.emit("progress", n);
        },
        updateSlidesClasses: function () {
          const e = this,
            {
              slides: t,
              params: s,
              $wrapperEl: i,
              activeIndex: n,
              realIndex: r,
            } = e,
            a = e.virtual && s.virtual.enabled;
          let o;
          t.removeClass(
            `${s.slideActiveClass} ${s.slideNextClass} ${s.slidePrevClass} ${s.slideDuplicateActiveClass} ${s.slideDuplicateNextClass} ${s.slideDuplicatePrevClass}`
          ),
            (o = a
              ? e.$wrapperEl.find(
                  `.${s.slideClass}[data-swiper-slide-index="${n}"]`
                )
              : t.eq(n)),
            o.addClass(s.slideActiveClass),
            s.loop &&
              (o.hasClass(s.slideDuplicateClass)
                ? i
                    .children(
                      `.${s.slideClass}:not(.${s.slideDuplicateClass})[data-swiper-slide-index="${r}"]`
                    )
                    .addClass(s.slideDuplicateActiveClass)
                : i
                    .children(
                      `.${s.slideClass}.${s.slideDuplicateClass}[data-swiper-slide-index="${r}"]`
                    )
                    .addClass(s.slideDuplicateActiveClass));
          let l = o
            .nextAll(`.${s.slideClass}`)
            .eq(0)
            .addClass(s.slideNextClass);
          s.loop &&
            0 === l.length &&
            ((l = t.eq(0)), l.addClass(s.slideNextClass));
          let d = o
            .prevAll(`.${s.slideClass}`)
            .eq(0)
            .addClass(s.slidePrevClass);
          s.loop &&
            0 === d.length &&
            ((d = t.eq(-1)), d.addClass(s.slidePrevClass)),
            s.loop &&
              (l.hasClass(s.slideDuplicateClass)
                ? i
                    .children(
                      `.${s.slideClass}:not(.${
                        s.slideDuplicateClass
                      })[data-swiper-slide-index="${l.attr(
                        "data-swiper-slide-index"
                      )}"]`
                    )
                    .addClass(s.slideDuplicateNextClass)
                : i
                    .children(
                      `.${s.slideClass}.${
                        s.slideDuplicateClass
                      }[data-swiper-slide-index="${l.attr(
                        "data-swiper-slide-index"
                      )}"]`
                    )
                    .addClass(s.slideDuplicateNextClass),
              d.hasClass(s.slideDuplicateClass)
                ? i
                    .children(
                      `.${s.slideClass}:not(.${
                        s.slideDuplicateClass
                      })[data-swiper-slide-index="${d.attr(
                        "data-swiper-slide-index"
                      )}"]`
                    )
                    .addClass(s.slideDuplicatePrevClass)
                : i
                    .children(
                      `.${s.slideClass}.${
                        s.slideDuplicateClass
                      }[data-swiper-slide-index="${d.attr(
                        "data-swiper-slide-index"
                      )}"]`
                    )
                    .addClass(s.slideDuplicatePrevClass)),
            e.emitSlidesClasses();
        },
        updateActiveIndex: function (e) {
          const t = this,
            s = t.rtlTranslate ? t.translate : -t.translate,
            {
              slidesGrid: i,
              snapGrid: n,
              params: r,
              activeIndex: a,
              realIndex: o,
              snapIndex: l,
            } = t;
          let d,
            c = e;
          if (void 0 === c) {
            for (let e = 0; e < i.length; e += 1)
              void 0 !== i[e + 1]
                ? s >= i[e] && s < i[e + 1] - (i[e + 1] - i[e]) / 2
                  ? (c = e)
                  : s >= i[e] && s < i[e + 1] && (c = e + 1)
                : s >= i[e] && (c = e);
            r.normalizeSlideIndex && (c < 0 || void 0 === c) && (c = 0);
          }
          if (n.indexOf(s) >= 0) d = n.indexOf(s);
          else {
            const e = Math.min(r.slidesPerGroupSkip, c);
            d = e + Math.floor((c - e) / r.slidesPerGroup);
          }
          if ((d >= n.length && (d = n.length - 1), c === a))
            return void (
              d !== l && ((t.snapIndex = d), t.emit("snapIndexChange"))
            );
          const u = parseInt(
            t.slides.eq(c).attr("data-swiper-slide-index") || c,
            10
          );
          Object.assign(t, {
            snapIndex: d,
            realIndex: u,
            previousIndex: a,
            activeIndex: c,
          }),
            t.emit("activeIndexChange"),
            t.emit("snapIndexChange"),
            o !== u && t.emit("realIndexChange"),
            (t.initialized || t.params.runCallbacksOnInit) &&
              t.emit("slideChange");
        },
        updateClickedSlide: function (e) {
          const t = this,
            s = t.params,
            i = L(e).closest(`.${s.slideClass}`)[0];
          let n,
            r = !1;
          if (i)
            for (let e = 0; e < t.slides.length; e += 1)
              if (t.slides[e] === i) {
                (r = !0), (n = e);
                break;
              }
          if (!i || !r)
            return (t.clickedSlide = void 0), void (t.clickedIndex = void 0);
          (t.clickedSlide = i),
            t.virtual && t.params.virtual.enabled
              ? (t.clickedIndex = parseInt(
                  L(i).attr("data-swiper-slide-index"),
                  10
                ))
              : (t.clickedIndex = n),
            s.slideToClickedSlide &&
              void 0 !== t.clickedIndex &&
              t.clickedIndex !== t.activeIndex &&
              t.slideToClickedSlide();
        },
      };
      const j = {
        getTranslate: function (e) {
          void 0 === e && (e = this.isHorizontal() ? "x" : "y");
          const {
            params: t,
            rtlTranslate: s,
            translate: i,
            $wrapperEl: n,
          } = this;
          if (t.virtualTranslate) return s ? -i : i;
          if (t.cssMode) return i;
          let r = O(n[0], e);
          return s && (r = -r), r || 0;
        },
        setTranslate: function (e, t) {
          const s = this,
            {
              rtlTranslate: i,
              params: n,
              $wrapperEl: r,
              wrapperEl: a,
              progress: o,
            } = s;
          let l,
            d = 0,
            c = 0;
          s.isHorizontal() ? (d = i ? -e : e) : (c = e),
            n.roundLengths && ((d = Math.floor(d)), (c = Math.floor(c))),
            n.cssMode
              ? (a[s.isHorizontal() ? "scrollLeft" : "scrollTop"] =
                  s.isHorizontal() ? -d : -c)
              : n.virtualTranslate ||
                r.transform(`translate3d(${d}px, ${c}px, 0px)`),
            (s.previousTranslate = s.translate),
            (s.translate = s.isHorizontal() ? d : c);
          const u = s.maxTranslate() - s.minTranslate();
          (l = 0 === u ? 0 : (e - s.minTranslate()) / u),
            l !== o && s.updateProgress(e),
            s.emit("setTranslate", s.translate, t);
        },
        minTranslate: function () {
          return -this.snapGrid[0];
        },
        maxTranslate: function () {
          return -this.snapGrid[this.snapGrid.length - 1];
        },
        translateTo: function (e, t, s, i, n) {
          void 0 === e && (e = 0),
            void 0 === t && (t = this.params.speed),
            void 0 === s && (s = !0),
            void 0 === i && (i = !0);
          const r = this,
            { params: a, wrapperEl: o } = r;
          if (r.animating && a.preventInteractionOnTransition) return !1;
          const l = r.minTranslate(),
            d = r.maxTranslate();
          let c;
          if (
            ((c = i && e > l ? l : i && e < d ? d : e),
            r.updateProgress(c),
            a.cssMode)
          ) {
            const e = r.isHorizontal();
            if (0 === t) o[e ? "scrollLeft" : "scrollTop"] = -c;
            else {
              if (!r.support.smoothScroll)
                return (
                  I({
                    swiper: r,
                    targetPosition: -c,
                    side: e ? "left" : "top",
                  }),
                  !0
                );
              o.scrollTo({ [e ? "left" : "top"]: -c, behavior: "smooth" });
            }
            return !0;
          }
          return (
            0 === t
              ? (r.setTransition(0),
                r.setTranslate(c),
                s &&
                  (r.emit("beforeTransitionStart", t, n),
                  r.emit("transitionEnd")))
              : (r.setTransition(t),
                r.setTranslate(c),
                s &&
                  (r.emit("beforeTransitionStart", t, n),
                  r.emit("transitionStart")),
                r.animating ||
                  ((r.animating = !0),
                  r.onTranslateToWrapperTransitionEnd ||
                    (r.onTranslateToWrapperTransitionEnd = function (e) {
                      r &&
                        !r.destroyed &&
                        e.target === this &&
                        (r.$wrapperEl[0].removeEventListener(
                          "transitionend",
                          r.onTranslateToWrapperTransitionEnd
                        ),
                        r.$wrapperEl[0].removeEventListener(
                          "webkitTransitionEnd",
                          r.onTranslateToWrapperTransitionEnd
                        ),
                        (r.onTranslateToWrapperTransitionEnd = null),
                        delete r.onTranslateToWrapperTransitionEnd,
                        s && r.emit("transitionEnd"));
                    }),
                  r.$wrapperEl[0].addEventListener(
                    "transitionend",
                    r.onTranslateToWrapperTransitionEnd
                  ),
                  r.$wrapperEl[0].addEventListener(
                    "webkitTransitionEnd",
                    r.onTranslateToWrapperTransitionEnd
                  ))),
            !0
          );
        },
      };
      function V(e) {
        let { swiper: t, runCallbacks: s, direction: i, step: n } = e;
        const { activeIndex: r, previousIndex: a } = t;
        let o = i;
        if (
          (o || (o = r > a ? "next" : r < a ? "prev" : "reset"),
          t.emit(`transition${n}`),
          s && r !== a)
        ) {
          if ("reset" === o) return void t.emit(`slideResetTransition${n}`);
          t.emit(`slideChangeTransition${n}`),
            "next" === o
              ? t.emit(`slideNextTransition${n}`)
              : t.emit(`slidePrevTransition${n}`);
        }
      }
      const R = {
        slideTo: function (e, t, s, i, n) {
          if (
            (void 0 === e && (e = 0),
            void 0 === t && (t = this.params.speed),
            void 0 === s && (s = !0),
            "number" != typeof e && "string" != typeof e)
          )
            throw new Error(
              `The 'index' argument cannot have type other than 'number' or 'string'. [${typeof e}] given.`
            );
          if ("string" == typeof e) {
            const t = parseInt(e, 10);
            if (!isFinite(t))
              throw new Error(
                `The passed-in 'index' (string) couldn't be converted to 'number'. [${e}] given.`
              );
            e = t;
          }
          const r = this;
          let a = e;
          a < 0 && (a = 0);
          const {
            params: o,
            snapGrid: l,
            slidesGrid: d,
            previousIndex: c,
            activeIndex: u,
            rtlTranslate: p,
            wrapperEl: h,
            enabled: f,
          } = r;
          if (
            (r.animating && o.preventInteractionOnTransition) ||
            (!f && !i && !n)
          )
            return !1;
          const m = Math.min(r.params.slidesPerGroupSkip, a);
          let g = m + Math.floor((a - m) / r.params.slidesPerGroup);
          g >= l.length && (g = l.length - 1),
            (u || o.initialSlide || 0) === (c || 0) &&
              s &&
              r.emit("beforeSlideChangeStart");
          const v = -l[g];
          if ((r.updateProgress(v), o.normalizeSlideIndex))
            for (let e = 0; e < d.length; e += 1) {
              const t = -Math.floor(100 * v),
                s = Math.floor(100 * d[e]),
                i = Math.floor(100 * d[e + 1]);
              void 0 !== d[e + 1]
                ? t >= s && t < i - (i - s) / 2
                  ? (a = e)
                  : t >= s && t < i && (a = e + 1)
                : t >= s && (a = e);
            }
          if (r.initialized && a !== u) {
            if (!r.allowSlideNext && v < r.translate && v < r.minTranslate())
              return !1;
            if (
              !r.allowSlidePrev &&
              v > r.translate &&
              v > r.maxTranslate() &&
              (u || 0) !== a
            )
              return !1;
          }
          let w;
          if (
            ((w = a > u ? "next" : a < u ? "prev" : "reset"),
            (p && -v === r.translate) || (!p && v === r.translate))
          )
            return (
              r.updateActiveIndex(a),
              o.autoHeight && r.updateAutoHeight(),
              r.updateSlidesClasses(),
              "slide" !== o.effect && r.setTranslate(v),
              "reset" !== w && (r.transitionStart(s, w), r.transitionEnd(s, w)),
              !1
            );
          if (o.cssMode) {
            const e = r.isHorizontal(),
              s = p ? v : -v;
            if (0 === t) {
              const t = r.virtual && r.params.virtual.enabled;
              t &&
                ((r.wrapperEl.style.scrollSnapType = "none"),
                (r._immediateVirtual = !0)),
                (h[e ? "scrollLeft" : "scrollTop"] = s),
                t &&
                  requestAnimationFrame(() => {
                    (r.wrapperEl.style.scrollSnapType = ""),
                      (r._swiperImmediateVirtual = !1);
                  });
            } else {
              if (!r.support.smoothScroll)
                return (
                  I({ swiper: r, targetPosition: s, side: e ? "left" : "top" }),
                  !0
                );
              h.scrollTo({ [e ? "left" : "top"]: s, behavior: "smooth" });
            }
            return !0;
          }
          return (
            r.setTransition(t),
            r.setTranslate(v),
            r.updateActiveIndex(a),
            r.updateSlidesClasses(),
            r.emit("beforeTransitionStart", t, i),
            r.transitionStart(s, w),
            0 === t
              ? r.transitionEnd(s, w)
              : r.animating ||
                ((r.animating = !0),
                r.onSlideToWrapperTransitionEnd ||
                  (r.onSlideToWrapperTransitionEnd = function (e) {
                    r &&
                      !r.destroyed &&
                      e.target === this &&
                      (r.$wrapperEl[0].removeEventListener(
                        "transitionend",
                        r.onSlideToWrapperTransitionEnd
                      ),
                      r.$wrapperEl[0].removeEventListener(
                        "webkitTransitionEnd",
                        r.onSlideToWrapperTransitionEnd
                      ),
                      (r.onSlideToWrapperTransitionEnd = null),
                      delete r.onSlideToWrapperTransitionEnd,
                      r.transitionEnd(s, w));
                  }),
                r.$wrapperEl[0].addEventListener(
                  "transitionend",
                  r.onSlideToWrapperTransitionEnd
                ),
                r.$wrapperEl[0].addEventListener(
                  "webkitTransitionEnd",
                  r.onSlideToWrapperTransitionEnd
                )),
            !0
          );
        },
        slideToLoop: function (e, t, s, i) {
          void 0 === e && (e = 0),
            void 0 === t && (t = this.params.speed),
            void 0 === s && (s = !0);
          const n = this;
          let r = e;
          return n.params.loop && (r += n.loopedSlides), n.slideTo(r, t, s, i);
        },
        slideNext: function (e, t, s) {
          void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
          const i = this,
            { animating: n, enabled: r, params: a } = i;
          if (!r) return i;
          let o = a.slidesPerGroup;
          "auto" === a.slidesPerView &&
            1 === a.slidesPerGroup &&
            a.slidesPerGroupAuto &&
            (o = Math.max(i.slidesPerViewDynamic("current", !0), 1));
          const l = i.activeIndex < a.slidesPerGroupSkip ? 1 : o;
          if (a.loop) {
            if (n && a.loopPreventsSlide) return !1;
            i.loopFix(), (i._clientLeft = i.$wrapperEl[0].clientLeft);
          }
          return a.rewind && i.isEnd
            ? i.slideTo(0, e, t, s)
            : i.slideTo(i.activeIndex + l, e, t, s);
        },
        slidePrev: function (e, t, s) {
          void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
          const i = this,
            {
              params: n,
              animating: r,
              snapGrid: a,
              slidesGrid: o,
              rtlTranslate: l,
              enabled: d,
            } = i;
          if (!d) return i;
          if (n.loop) {
            if (r && n.loopPreventsSlide) return !1;
            i.loopFix(), (i._clientLeft = i.$wrapperEl[0].clientLeft);
          }
          function c(e) {
            return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e);
          }
          const u = c(l ? i.translate : -i.translate),
            p = a.map((e) => c(e));
          let h = a[p.indexOf(u) - 1];
          if (void 0 === h && n.cssMode) {
            let e;
            a.forEach((t, s) => {
              u >= t && (e = s);
            }),
              void 0 !== e && (h = a[e > 0 ? e - 1 : e]);
          }
          let f = 0;
          if (
            (void 0 !== h &&
              ((f = o.indexOf(h)),
              f < 0 && (f = i.activeIndex - 1),
              "auto" === n.slidesPerView &&
                1 === n.slidesPerGroup &&
                n.slidesPerGroupAuto &&
                ((f = f - i.slidesPerViewDynamic("previous", !0) + 1),
                (f = Math.max(f, 0)))),
            n.rewind && i.isBeginning)
          ) {
            const n =
              i.params.virtual && i.params.virtual.enabled && i.virtual
                ? i.virtual.slides.length - 1
                : i.slides.length - 1;
            return i.slideTo(n, e, t, s);
          }
          return i.slideTo(f, e, t, s);
        },
        slideReset: function (e, t, s) {
          return (
            void 0 === e && (e = this.params.speed),
            void 0 === t && (t = !0),
            this.slideTo(this.activeIndex, e, t, s)
          );
        },
        slideToClosest: function (e, t, s, i) {
          void 0 === e && (e = this.params.speed),
            void 0 === t && (t = !0),
            void 0 === i && (i = 0.5);
          const n = this;
          let r = n.activeIndex;
          const a = Math.min(n.params.slidesPerGroupSkip, r),
            o = a + Math.floor((r - a) / n.params.slidesPerGroup),
            l = n.rtlTranslate ? n.translate : -n.translate;
          if (l >= n.snapGrid[o]) {
            const e = n.snapGrid[o];
            l - e > (n.snapGrid[o + 1] - e) * i &&
              (r += n.params.slidesPerGroup);
          } else {
            const e = n.snapGrid[o - 1];
            l - e <= (n.snapGrid[o] - e) * i && (r -= n.params.slidesPerGroup);
          }
          return (
            (r = Math.max(r, 0)),
            (r = Math.min(r, n.slidesGrid.length - 1)),
            n.slideTo(r, e, t, s)
          );
        },
        slideToClickedSlide: function () {
          const e = this,
            { params: t, $wrapperEl: s } = e,
            i =
              "auto" === t.slidesPerView
                ? e.slidesPerViewDynamic()
                : t.slidesPerView;
          let n,
            r = e.clickedIndex;
          if (t.loop) {
            if (e.animating) return;
            (n = parseInt(
              L(e.clickedSlide).attr("data-swiper-slide-index"),
              10
            )),
              t.centeredSlides
                ? r < e.loopedSlides - i / 2 ||
                  r > e.slides.length - e.loopedSlides + i / 2
                  ? (e.loopFix(),
                    (r = s
                      .children(
                        `.${t.slideClass}[data-swiper-slide-index="${n}"]:not(.${t.slideDuplicateClass})`
                      )
                      .eq(0)
                      .index()),
                    A(() => {
                      e.slideTo(r);
                    }))
                  : e.slideTo(r)
                : r > e.slides.length - i
                ? (e.loopFix(),
                  (r = s
                    .children(
                      `.${t.slideClass}[data-swiper-slide-index="${n}"]:not(.${t.slideDuplicateClass})`
                    )
                    .eq(0)
                    .index()),
                  A(() => {
                    e.slideTo(r);
                  }))
                : e.slideTo(r);
          } else e.slideTo(r);
        },
      };
      const F = {
        loopCreate: function () {
          const e = this,
            t = g(),
            { params: s, $wrapperEl: i } = e,
            n = i.children().length > 0 ? L(i.children()[0].parentNode) : i;
          n.children(`.${s.slideClass}.${s.slideDuplicateClass}`).remove();
          let r = n.children(`.${s.slideClass}`);
          if (s.loopFillGroupWithBlank) {
            const e = s.slidesPerGroup - (r.length % s.slidesPerGroup);
            if (e !== s.slidesPerGroup) {
              for (let i = 0; i < e; i += 1) {
                const e = L(t.createElement("div")).addClass(
                  `${s.slideClass} ${s.slideBlankClass}`
                );
                n.append(e);
              }
              r = n.children(`.${s.slideClass}`);
            }
          }
          "auto" !== s.slidesPerView ||
            s.loopedSlides ||
            (s.loopedSlides = r.length),
            (e.loopedSlides = Math.ceil(
              parseFloat(s.loopedSlides || s.slidesPerView, 10)
            )),
            (e.loopedSlides += s.loopAdditionalSlides),
            e.loopedSlides > r.length && (e.loopedSlides = r.length);
          const a = [],
            o = [];
          r.each((t, s) => {
            const i = L(t);
            s < e.loopedSlides && o.push(t),
              s < r.length && s >= r.length - e.loopedSlides && a.push(t),
              i.attr("data-swiper-slide-index", s);
          });
          for (let e = 0; e < o.length; e += 1)
            n.append(L(o[e].cloneNode(!0)).addClass(s.slideDuplicateClass));
          for (let e = a.length - 1; e >= 0; e -= 1)
            n.prepend(L(a[e].cloneNode(!0)).addClass(s.slideDuplicateClass));
        },
        loopFix: function () {
          const e = this;
          e.emit("beforeLoopFix");
          const {
            activeIndex: t,
            slides: s,
            loopedSlides: i,
            allowSlidePrev: n,
            allowSlideNext: r,
            snapGrid: a,
            rtlTranslate: o,
          } = e;
          let l;
          (e.allowSlidePrev = !0), (e.allowSlideNext = !0);
          const d = -a[t] - e.getTranslate();
          if (t < i) {
            (l = s.length - 3 * i + t), (l += i);
            e.slideTo(l, 0, !1, !0) &&
              0 !== d &&
              e.setTranslate((o ? -e.translate : e.translate) - d);
          } else if (t >= s.length - i) {
            (l = -s.length + t + i), (l += i);
            e.slideTo(l, 0, !1, !0) &&
              0 !== d &&
              e.setTranslate((o ? -e.translate : e.translate) - d);
          }
          (e.allowSlidePrev = n), (e.allowSlideNext = r), e.emit("loopFix");
        },
        loopDestroy: function () {
          const { $wrapperEl: e, params: t, slides: s } = this;
          e
            .children(
              `.${t.slideClass}.${t.slideDuplicateClass},.${t.slideClass}.${t.slideBlankClass}`
            )
            .remove(),
            s.removeAttr("data-swiper-slide-index");
        },
      };
      function Y(e) {
        const t = this,
          s = g(),
          i = w(),
          n = t.touchEventsData,
          { params: r, touches: a, enabled: o } = t;
        if (!o) return;
        if (t.animating && r.preventInteractionOnTransition) return;
        !t.animating && r.cssMode && r.loop && t.loopFix();
        let l = e;
        l.originalEvent && (l = l.originalEvent);
        let d = L(l.target);
        if ("wrapper" === r.touchEventsTarget && !d.closest(t.wrapperEl).length)
          return;
        if (
          ((n.isTouchEvent = "touchstart" === l.type),
          !n.isTouchEvent && "which" in l && 3 === l.which)
        )
          return;
        if (!n.isTouchEvent && "button" in l && l.button > 0) return;
        if (n.isTouched && n.isMoved) return;
        !!r.noSwipingClass &&
          "" !== r.noSwipingClass &&
          l.target &&
          l.target.shadowRoot &&
          e.path &&
          e.path[0] &&
          (d = L(e.path[0]));
        const c = r.noSwipingSelector
            ? r.noSwipingSelector
            : `.${r.noSwipingClass}`,
          u = !(!l.target || !l.target.shadowRoot);
        if (
          r.noSwiping &&
          (u
            ? (function (e, t) {
                return (
                  void 0 === t && (t = this),
                  (function t(s) {
                    return s && s !== g() && s !== w()
                      ? (s.assignedSlot && (s = s.assignedSlot),
                        s.closest(e) || t(s.getRootNode().host))
                      : null;
                  })(t)
                );
              })(c, l.target)
            : d.closest(c)[0])
        )
          return void (t.allowClick = !0);
        if (r.swipeHandler && !d.closest(r.swipeHandler)[0]) return;
        (a.currentX =
          "touchstart" === l.type ? l.targetTouches[0].pageX : l.pageX),
          (a.currentY =
            "touchstart" === l.type ? l.targetTouches[0].pageY : l.pageY);
        const p = a.currentX,
          h = a.currentY,
          f = r.edgeSwipeDetection || r.iOSEdgeSwipeDetection,
          m = r.edgeSwipeThreshold || r.iOSEdgeSwipeThreshold;
        if (f && (p <= m || p >= i.innerWidth - m)) {
          if ("prevent" !== f) return;
          e.preventDefault();
        }
        if (
          (Object.assign(n, {
            isTouched: !0,
            isMoved: !1,
            allowTouchCallbacks: !0,
            isScrolling: void 0,
            startMoving: void 0,
          }),
          (a.startX = p),
          (a.startY = h),
          (n.touchStartTime = _()),
          (t.allowClick = !0),
          t.updateSize(),
          (t.swipeDirection = void 0),
          r.threshold > 0 && (n.allowThresholdMove = !1),
          "touchstart" !== l.type)
        ) {
          let e = !0;
          d.is(n.focusableElements) &&
            ((e = !1), "SELECT" === d[0].nodeName && (n.isTouched = !1)),
            s.activeElement &&
              L(s.activeElement).is(n.focusableElements) &&
              s.activeElement !== d[0] &&
              s.activeElement.blur();
          const i = e && t.allowTouchMove && r.touchStartPreventDefault;
          (!r.touchStartForcePreventDefault && !i) ||
            d[0].isContentEditable ||
            l.preventDefault();
        }
        t.params.freeMode &&
          t.params.freeMode.enabled &&
          t.freeMode &&
          t.animating &&
          !r.cssMode &&
          t.freeMode.onTouchStart(),
          t.emit("touchStart", l);
      }
      function X(e) {
        const t = g(),
          s = this,
          i = s.touchEventsData,
          { params: n, touches: r, rtlTranslate: a, enabled: o } = s;
        if (!o) return;
        let l = e;
        if ((l.originalEvent && (l = l.originalEvent), !i.isTouched))
          return void (
            i.startMoving &&
            i.isScrolling &&
            s.emit("touchMoveOpposite", l)
          );
        if (i.isTouchEvent && "touchmove" !== l.type) return;
        const d =
            "touchmove" === l.type &&
            l.targetTouches &&
            (l.targetTouches[0] || l.changedTouches[0]),
          c = "touchmove" === l.type ? d.pageX : l.pageX,
          u = "touchmove" === l.type ? d.pageY : l.pageY;
        if (l.preventedByNestedSwiper)
          return (r.startX = c), void (r.startY = u);
        if (!s.allowTouchMove)
          return (
            L(l.target).is(i.focusableElements) || (s.allowClick = !1),
            void (
              i.isTouched &&
              (Object.assign(r, {
                startX: c,
                startY: u,
                currentX: c,
                currentY: u,
              }),
              (i.touchStartTime = _()))
            )
          );
        if (i.isTouchEvent && n.touchReleaseOnEdges && !n.loop)
          if (s.isVertical()) {
            if (
              (u < r.startY && s.translate <= s.maxTranslate()) ||
              (u > r.startY && s.translate >= s.minTranslate())
            )
              return (i.isTouched = !1), void (i.isMoved = !1);
          } else if (
            (c < r.startX && s.translate <= s.maxTranslate()) ||
            (c > r.startX && s.translate >= s.minTranslate())
          )
            return;
        if (
          i.isTouchEvent &&
          t.activeElement &&
          l.target === t.activeElement &&
          L(l.target).is(i.focusableElements)
        )
          return (i.isMoved = !0), void (s.allowClick = !1);
        if (
          (i.allowTouchCallbacks && s.emit("touchMove", l),
          l.targetTouches && l.targetTouches.length > 1)
        )
          return;
        (r.currentX = c), (r.currentY = u);
        const p = r.currentX - r.startX,
          h = r.currentY - r.startY;
        if (
          s.params.threshold &&
          Math.sqrt(p ** 2 + h ** 2) < s.params.threshold
        )
          return;
        if (void 0 === i.isScrolling) {
          let e;
          (s.isHorizontal() && r.currentY === r.startY) ||
          (s.isVertical() && r.currentX === r.startX)
            ? (i.isScrolling = !1)
            : p * p + h * h >= 25 &&
              ((e = (180 * Math.atan2(Math.abs(h), Math.abs(p))) / Math.PI),
              (i.isScrolling = s.isHorizontal()
                ? e > n.touchAngle
                : 90 - e > n.touchAngle));
        }
        if (
          (i.isScrolling && s.emit("touchMoveOpposite", l),
          void 0 === i.startMoving &&
            ((r.currentX === r.startX && r.currentY === r.startY) ||
              (i.startMoving = !0)),
          i.isScrolling)
        )
          return void (i.isTouched = !1);
        if (!i.startMoving) return;
        (s.allowClick = !1),
          !n.cssMode && l.cancelable && l.preventDefault(),
          n.touchMoveStopPropagation && !n.nested && l.stopPropagation(),
          i.isMoved ||
            (n.loop && !n.cssMode && s.loopFix(),
            (i.startTranslate = s.getTranslate()),
            s.setTransition(0),
            s.animating &&
              s.$wrapperEl.trigger("webkitTransitionEnd transitionend"),
            (i.allowMomentumBounce = !1),
            !n.grabCursor ||
              (!0 !== s.allowSlideNext && !0 !== s.allowSlidePrev) ||
              s.setGrabCursor(!0),
            s.emit("sliderFirstMove", l)),
          s.emit("sliderMove", l),
          (i.isMoved = !0);
        let f = s.isHorizontal() ? p : h;
        (r.diff = f),
          (f *= n.touchRatio),
          a && (f = -f),
          (s.swipeDirection = f > 0 ? "prev" : "next"),
          (i.currentTranslate = f + i.startTranslate);
        let m = !0,
          v = n.resistanceRatio;
        if (
          (n.touchReleaseOnEdges && (v = 0),
          f > 0 && i.currentTranslate > s.minTranslate()
            ? ((m = !1),
              n.resistance &&
                (i.currentTranslate =
                  s.minTranslate() -
                  1 +
                  (-s.minTranslate() + i.startTranslate + f) ** v))
            : f < 0 &&
              i.currentTranslate < s.maxTranslate() &&
              ((m = !1),
              n.resistance &&
                (i.currentTranslate =
                  s.maxTranslate() +
                  1 -
                  (s.maxTranslate() - i.startTranslate - f) ** v)),
          m && (l.preventedByNestedSwiper = !0),
          !s.allowSlideNext &&
            "next" === s.swipeDirection &&
            i.currentTranslate < i.startTranslate &&
            (i.currentTranslate = i.startTranslate),
          !s.allowSlidePrev &&
            "prev" === s.swipeDirection &&
            i.currentTranslate > i.startTranslate &&
            (i.currentTranslate = i.startTranslate),
          s.allowSlidePrev ||
            s.allowSlideNext ||
            (i.currentTranslate = i.startTranslate),
          n.threshold > 0)
        ) {
          if (!(Math.abs(f) > n.threshold || i.allowThresholdMove))
            return void (i.currentTranslate = i.startTranslate);
          if (!i.allowThresholdMove)
            return (
              (i.allowThresholdMove = !0),
              (r.startX = r.currentX),
              (r.startY = r.currentY),
              (i.currentTranslate = i.startTranslate),
              void (r.diff = s.isHorizontal()
                ? r.currentX - r.startX
                : r.currentY - r.startY)
            );
        }
        n.followFinger &&
          !n.cssMode &&
          (((n.freeMode && n.freeMode.enabled && s.freeMode) ||
            n.watchSlidesProgress) &&
            (s.updateActiveIndex(), s.updateSlidesClasses()),
          s.params.freeMode &&
            n.freeMode.enabled &&
            s.freeMode &&
            s.freeMode.onTouchMove(),
          s.updateProgress(i.currentTranslate),
          s.setTranslate(i.currentTranslate));
      }
      function U(e) {
        const t = this,
          s = t.touchEventsData,
          {
            params: i,
            touches: n,
            rtlTranslate: r,
            slidesGrid: a,
            enabled: o,
          } = t;
        if (!o) return;
        let l = e;
        if (
          (l.originalEvent && (l = l.originalEvent),
          s.allowTouchCallbacks && t.emit("touchEnd", l),
          (s.allowTouchCallbacks = !1),
          !s.isTouched)
        )
          return (
            s.isMoved && i.grabCursor && t.setGrabCursor(!1),
            (s.isMoved = !1),
            void (s.startMoving = !1)
          );
        i.grabCursor &&
          s.isMoved &&
          s.isTouched &&
          (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) &&
          t.setGrabCursor(!1);
        const d = _(),
          c = d - s.touchStartTime;
        if (t.allowClick) {
          const e = l.path || (l.composedPath && l.composedPath());
          t.updateClickedSlide((e && e[0]) || l.target),
            t.emit("tap click", l),
            c < 300 &&
              d - s.lastClickTime < 300 &&
              t.emit("doubleTap doubleClick", l);
        }
        if (
          ((s.lastClickTime = _()),
          A(() => {
            t.destroyed || (t.allowClick = !0);
          }),
          !s.isTouched ||
            !s.isMoved ||
            !t.swipeDirection ||
            0 === n.diff ||
            s.currentTranslate === s.startTranslate)
        )
          return (
            (s.isTouched = !1), (s.isMoved = !1), void (s.startMoving = !1)
          );
        let u;
        if (
          ((s.isTouched = !1),
          (s.isMoved = !1),
          (s.startMoving = !1),
          (u = i.followFinger
            ? r
              ? t.translate
              : -t.translate
            : -s.currentTranslate),
          i.cssMode)
        )
          return;
        if (t.params.freeMode && i.freeMode.enabled)
          return void t.freeMode.onTouchEnd({ currentPos: u });
        let p = 0,
          h = t.slidesSizesGrid[0];
        for (
          let e = 0;
          e < a.length;
          e += e < i.slidesPerGroupSkip ? 1 : i.slidesPerGroup
        ) {
          const t = e < i.slidesPerGroupSkip - 1 ? 1 : i.slidesPerGroup;
          void 0 !== a[e + t]
            ? u >= a[e] && u < a[e + t] && ((p = e), (h = a[e + t] - a[e]))
            : u >= a[e] && ((p = e), (h = a[a.length - 1] - a[a.length - 2]));
        }
        let f = null,
          m = null;
        i.rewind &&
          (t.isBeginning
            ? (m =
                t.params.virtual && t.params.virtual.enabled && t.virtual
                  ? t.virtual.slides.length - 1
                  : t.slides.length - 1)
            : t.isEnd && (f = 0));
        const g = (u - a[p]) / h,
          v = p < i.slidesPerGroupSkip - 1 ? 1 : i.slidesPerGroup;
        if (c > i.longSwipesMs) {
          if (!i.longSwipes) return void t.slideTo(t.activeIndex);
          "next" === t.swipeDirection &&
            (g >= i.longSwipesRatio
              ? t.slideTo(i.rewind && t.isEnd ? f : p + v)
              : t.slideTo(p)),
            "prev" === t.swipeDirection &&
              (g > 1 - i.longSwipesRatio
                ? t.slideTo(p + v)
                : null !== m && g < 0 && Math.abs(g) > i.longSwipesRatio
                ? t.slideTo(m)
                : t.slideTo(p));
        } else {
          if (!i.shortSwipes) return void t.slideTo(t.activeIndex);
          t.navigation &&
          (l.target === t.navigation.nextEl || l.target === t.navigation.prevEl)
            ? l.target === t.navigation.nextEl
              ? t.slideTo(p + v)
              : t.slideTo(p)
            : ("next" === t.swipeDirection && t.slideTo(null !== f ? f : p + v),
              "prev" === t.swipeDirection && t.slideTo(null !== m ? m : p));
        }
      }
      function Q() {
        const e = this,
          { params: t, el: s } = e;
        if (s && 0 === s.offsetWidth) return;
        t.breakpoints && e.setBreakpoint();
        const { allowSlideNext: i, allowSlidePrev: n, snapGrid: r } = e;
        (e.allowSlideNext = !0),
          (e.allowSlidePrev = !0),
          e.updateSize(),
          e.updateSlides(),
          e.updateSlidesClasses(),
          ("auto" === t.slidesPerView || t.slidesPerView > 1) &&
          e.isEnd &&
          !e.isBeginning &&
          !e.params.centeredSlides
            ? e.slideTo(e.slides.length - 1, 0, !1, !0)
            : e.slideTo(e.activeIndex, 0, !1, !0),
          e.autoplay &&
            e.autoplay.running &&
            e.autoplay.paused &&
            e.autoplay.run(),
          (e.allowSlidePrev = n),
          (e.allowSlideNext = i),
          e.params.watchOverflow && r !== e.snapGrid && e.checkOverflow();
      }
      function K(e) {
        const t = this;
        t.enabled &&
          (t.allowClick ||
            (t.params.preventClicks && e.preventDefault(),
            t.params.preventClicksPropagation &&
              t.animating &&
              (e.stopPropagation(), e.stopImmediatePropagation())));
      }
      function J() {
        const e = this,
          { wrapperEl: t, rtlTranslate: s, enabled: i } = e;
        if (!i) return;
        let n;
        (e.previousTranslate = e.translate),
          e.isHorizontal()
            ? (e.translate = -t.scrollLeft)
            : (e.translate = -t.scrollTop),
          -0 === e.translate && (e.translate = 0),
          e.updateActiveIndex(),
          e.updateSlidesClasses();
        const r = e.maxTranslate() - e.minTranslate();
        (n = 0 === r ? 0 : (e.translate - e.minTranslate()) / r),
          n !== e.progress && e.updateProgress(s ? -e.translate : e.translate),
          e.emit("setTranslate", e.translate, !1);
      }
      let Z = !1;
      function ee() {}
      const te = (e, t) => {
        const s = g(),
          {
            params: i,
            touchEvents: n,
            el: r,
            wrapperEl: a,
            device: o,
            support: l,
          } = e,
          d = !!i.nested,
          c = "on" === t ? "addEventListener" : "removeEventListener",
          u = t;
        if (l.touch) {
          const t = !(
            "touchstart" !== n.start ||
            !l.passiveListener ||
            !i.passiveListeners
          ) && { passive: !0, capture: !1 };
          r[c](n.start, e.onTouchStart, t),
            r[c](
              n.move,
              e.onTouchMove,
              l.passiveListener ? { passive: !1, capture: d } : d
            ),
            r[c](n.end, e.onTouchEnd, t),
            n.cancel && r[c](n.cancel, e.onTouchEnd, t);
        } else
          r[c](n.start, e.onTouchStart, !1),
            s[c](n.move, e.onTouchMove, d),
            s[c](n.end, e.onTouchEnd, !1);
        (i.preventClicks || i.preventClicksPropagation) &&
          r[c]("click", e.onClick, !0),
          i.cssMode && a[c]("scroll", e.onScroll),
          i.updateOnWindowResize
            ? e[u](
                o.ios || o.android
                  ? "resize orientationchange observerUpdate"
                  : "resize observerUpdate",
                Q,
                !0
              )
            : e[u]("observerUpdate", Q, !0);
      };
      const se = {
          attachEvents: function () {
            const e = this,
              t = g(),
              { params: s, support: i } = e;
            (e.onTouchStart = Y.bind(e)),
              (e.onTouchMove = X.bind(e)),
              (e.onTouchEnd = U.bind(e)),
              s.cssMode && (e.onScroll = J.bind(e)),
              (e.onClick = K.bind(e)),
              i.touch && !Z && (t.addEventListener("touchstart", ee), (Z = !0)),
              te(e, "on");
          },
          detachEvents: function () {
            te(this, "off");
          },
        },
        ie = (e, t) => e.grid && t.grid && t.grid.rows > 1;
      const ne = {
        setBreakpoint: function () {
          const e = this,
            {
              activeIndex: t,
              initialized: s,
              loopedSlides: i = 0,
              params: n,
              $el: r,
            } = e,
            a = n.breakpoints;
          if (!a || (a && 0 === Object.keys(a).length)) return;
          const o = e.getBreakpoint(a, e.params.breakpointsBase, e.el);
          if (!o || e.currentBreakpoint === o) return;
          const l = (o in a ? a[o] : void 0) || e.originalParams,
            d = ie(e, n),
            c = ie(e, l),
            u = n.enabled;
          d && !c
            ? (r.removeClass(
                `${n.containerModifierClass}grid ${n.containerModifierClass}grid-column`
              ),
              e.emitContainerClasses())
            : !d &&
              c &&
              (r.addClass(`${n.containerModifierClass}grid`),
              ((l.grid.fill && "column" === l.grid.fill) ||
                (!l.grid.fill && "column" === n.grid.fill)) &&
                r.addClass(`${n.containerModifierClass}grid-column`),
              e.emitContainerClasses());
          const p = l.direction && l.direction !== n.direction,
            h = n.loop && (l.slidesPerView !== n.slidesPerView || p);
          p && s && e.changeDirection(), P(e.params, l);
          const f = e.params.enabled;
          Object.assign(e, {
            allowTouchMove: e.params.allowTouchMove,
            allowSlideNext: e.params.allowSlideNext,
            allowSlidePrev: e.params.allowSlidePrev,
          }),
            u && !f ? e.disable() : !u && f && e.enable(),
            (e.currentBreakpoint = o),
            e.emit("_beforeBreakpoint", l),
            h &&
              s &&
              (e.loopDestroy(),
              e.loopCreate(),
              e.updateSlides(),
              e.slideTo(t - i + e.loopedSlides, 0, !1)),
            e.emit("breakpoint", l);
        },
        getBreakpoint: function (e, t, s) {
          if ((void 0 === t && (t = "window"), !e || ("container" === t && !s)))
            return;
          let i = !1;
          const n = w(),
            r = "window" === t ? n.innerHeight : s.clientHeight,
            a = Object.keys(e).map((e) => {
              if ("string" == typeof e && 0 === e.indexOf("@")) {
                const t = parseFloat(e.substr(1));
                return { value: r * t, point: e };
              }
              return { value: e, point: e };
            });
          a.sort((e, t) => parseInt(e.value, 10) - parseInt(t.value, 10));
          for (let e = 0; e < a.length; e += 1) {
            const { point: r, value: o } = a[e];
            "window" === t
              ? n.matchMedia(`(min-width: ${o}px)`).matches && (i = r)
              : o <= s.clientWidth && (i = r);
          }
          return i || "max";
        },
      };
      const re = {
        addClasses: function () {
          const e = this,
            {
              classNames: t,
              params: s,
              rtl: i,
              $el: n,
              device: r,
              support: a,
            } = e,
            o = (function (e, t) {
              const s = [];
              return (
                e.forEach((e) => {
                  "object" == typeof e
                    ? Object.keys(e).forEach((i) => {
                        e[i] && s.push(t + i);
                      })
                    : "string" == typeof e && s.push(t + e);
                }),
                s
              );
            })(
              [
                "initialized",
                s.direction,
                { "pointer-events": !a.touch },
                { "free-mode": e.params.freeMode && s.freeMode.enabled },
                { autoheight: s.autoHeight },
                { rtl: i },
                { grid: s.grid && s.grid.rows > 1 },
                {
                  "grid-column":
                    s.grid && s.grid.rows > 1 && "column" === s.grid.fill,
                },
                { android: r.android },
                { ios: r.ios },
                { "css-mode": s.cssMode },
                { centered: s.cssMode && s.centeredSlides },
              ],
              s.containerModifierClass
            );
          t.push(...o), n.addClass([...t].join(" ")), e.emitContainerClasses();
        },
        removeClasses: function () {
          const { $el: e, classNames: t } = this;
          e.removeClass(t.join(" ")), this.emitContainerClasses();
        },
      };
      const ae = {
        loadImage: function (e, t, s, i, n, r) {
          const a = w();
          let o;
          function l() {
            r && r();
          }
          L(e).parent("picture")[0] || (e.complete && n)
            ? l()
            : t
            ? ((o = new a.Image()),
              (o.onload = l),
              (o.onerror = l),
              i && (o.sizes = i),
              s && (o.srcset = s),
              t && (o.src = t))
            : l();
        },
        preloadImages: function () {
          const e = this;
          function t() {
            null != e &&
              e &&
              !e.destroyed &&
              (void 0 !== e.imagesLoaded && (e.imagesLoaded += 1),
              e.imagesLoaded === e.imagesToLoad.length &&
                (e.params.updateOnImagesReady && e.update(),
                e.emit("imagesReady")));
          }
          e.imagesToLoad = e.$el.find("img");
          for (let s = 0; s < e.imagesToLoad.length; s += 1) {
            const i = e.imagesToLoad[s];
            e.loadImage(
              i,
              i.currentSrc || i.getAttribute("src"),
              i.srcset || i.getAttribute("srcset"),
              i.sizes || i.getAttribute("sizes"),
              !0,
              t
            );
          }
        },
      };
      const oe = {
        init: !0,
        direction: "horizontal",
        touchEventsTarget: "wrapper",
        initialSlide: 0,
        speed: 300,
        cssMode: !1,
        updateOnWindowResize: !0,
        resizeObserver: !0,
        nested: !1,
        createElements: !1,
        enabled: !0,
        focusableElements:
          "input, select, option, textarea, button, video, label",
        width: null,
        height: null,
        preventInteractionOnTransition: !1,
        userAgent: null,
        url: null,
        edgeSwipeDetection: !1,
        edgeSwipeThreshold: 20,
        autoHeight: !1,
        setWrapperSize: !1,
        virtualTranslate: !1,
        effect: "slide",
        breakpoints: void 0,
        breakpointsBase: "window",
        spaceBetween: 0,
        slidesPerView: 1,
        slidesPerGroup: 1,
        slidesPerGroupSkip: 0,
        slidesPerGroupAuto: !1,
        centeredSlides: !1,
        centeredSlidesBounds: !1,
        slidesOffsetBefore: 0,
        slidesOffsetAfter: 0,
        normalizeSlideIndex: !0,
        centerInsufficientSlides: !1,
        watchOverflow: !0,
        roundLengths: !1,
        touchRatio: 1,
        touchAngle: 45,
        simulateTouch: !0,
        shortSwipes: !0,
        longSwipes: !0,
        longSwipesRatio: 0.5,
        longSwipesMs: 300,
        followFinger: !0,
        allowTouchMove: !0,
        threshold: 0,
        touchMoveStopPropagation: !1,
        touchStartPreventDefault: !0,
        touchStartForcePreventDefault: !1,
        touchReleaseOnEdges: !1,
        uniqueNavElements: !0,
        resistance: !0,
        resistanceRatio: 0.85,
        watchSlidesProgress: !1,
        grabCursor: !1,
        preventClicks: !0,
        preventClicksPropagation: !0,
        slideToClickedSlide: !1,
        preloadImages: !0,
        updateOnImagesReady: !0,
        loop: !1,
        loopAdditionalSlides: 0,
        loopedSlides: null,
        loopFillGroupWithBlank: !1,
        loopPreventsSlide: !0,
        rewind: !1,
        allowSlidePrev: !0,
        allowSlideNext: !0,
        swipeHandler: null,
        noSwiping: !0,
        noSwipingClass: "swiper-no-swiping",
        noSwipingSelector: null,
        passiveListeners: !0,
        maxBackfaceHiddenSlides: 10,
        containerModifierClass: "swiper-",
        slideClass: "swiper-slide",
        slideBlankClass: "swiper-slide-invisible-blank",
        slideActiveClass: "swiper-slide-active",
        slideDuplicateActiveClass: "swiper-slide-duplicate-active",
        slideVisibleClass: "swiper-slide-visible",
        slideDuplicateClass: "swiper-slide-duplicate",
        slideNextClass: "swiper-slide-next",
        slideDuplicateNextClass: "swiper-slide-duplicate-next",
        slidePrevClass: "swiper-slide-prev",
        slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
        wrapperClass: "swiper-wrapper",
        runCallbacksOnInit: !0,
        _emitClasses: !1,
      };
      function le(e, t) {
        return function (s) {
          void 0 === s && (s = {});
          const i = Object.keys(s)[0],
            n = s[i];
          "object" == typeof n && null !== n
            ? (["navigation", "pagination", "scrollbar"].indexOf(i) >= 0 &&
                !0 === e[i] &&
                (e[i] = { auto: !0 }),
              i in e && "enabled" in n
                ? (!0 === e[i] && (e[i] = { enabled: !0 }),
                  "object" != typeof e[i] ||
                    "enabled" in e[i] ||
                    (e[i].enabled = !0),
                  e[i] || (e[i] = { enabled: !1 }),
                  P(t, s))
                : P(t, s))
            : P(t, s);
        };
      }
      const de = {
          eventsEmitter: H,
          update: W,
          translate: j,
          transition: {
            setTransition: function (e, t) {
              const s = this;
              s.params.cssMode || s.$wrapperEl.transition(e),
                s.emit("setTransition", e, t);
            },
            transitionStart: function (e, t) {
              void 0 === e && (e = !0);
              const s = this,
                { params: i } = s;
              i.cssMode ||
                (i.autoHeight && s.updateAutoHeight(),
                V({ swiper: s, runCallbacks: e, direction: t, step: "Start" }));
            },
            transitionEnd: function (e, t) {
              void 0 === e && (e = !0);
              const s = this,
                { params: i } = s;
              (s.animating = !1),
                i.cssMode ||
                  (s.setTransition(0),
                  V({ swiper: s, runCallbacks: e, direction: t, step: "End" }));
            },
          },
          slide: R,
          loop: F,
          grabCursor: {
            setGrabCursor: function (e) {
              const t = this;
              if (
                t.support.touch ||
                !t.params.simulateTouch ||
                (t.params.watchOverflow && t.isLocked) ||
                t.params.cssMode
              )
                return;
              const s =
                "container" === t.params.touchEventsTarget ? t.el : t.wrapperEl;
              (s.style.cursor = "move"),
                (s.style.cursor = e ? "-webkit-grabbing" : "-webkit-grab"),
                (s.style.cursor = e ? "-moz-grabbin" : "-moz-grab"),
                (s.style.cursor = e ? "grabbing" : "grab");
            },
            unsetGrabCursor: function () {
              const e = this;
              e.support.touch ||
                (e.params.watchOverflow && e.isLocked) ||
                e.params.cssMode ||
                (e[
                  "container" === e.params.touchEventsTarget
                    ? "el"
                    : "wrapperEl"
                ].style.cursor = "");
            },
          },
          events: se,
          breakpoints: ne,
          checkOverflow: {
            checkOverflow: function () {
              const e = this,
                { isLocked: t, params: s } = e,
                { slidesOffsetBefore: i } = s;
              if (i) {
                const t = e.slides.length - 1,
                  s = e.slidesGrid[t] + e.slidesSizesGrid[t] + 2 * i;
                e.isLocked = e.size > s;
              } else e.isLocked = 1 === e.snapGrid.length;
              !0 === s.allowSlideNext && (e.allowSlideNext = !e.isLocked),
                !0 === s.allowSlidePrev && (e.allowSlidePrev = !e.isLocked),
                t && t !== e.isLocked && (e.isEnd = !1),
                t !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock");
            },
          },
          classes: re,
          images: ae,
        },
        ce = {};
      class ue {
        constructor() {
          let e, t;
          for (var s = arguments.length, i = new Array(s), n = 0; n < s; n++)
            i[n] = arguments[n];
          if (
            (1 === i.length &&
            i[0].constructor &&
            "Object" === Object.prototype.toString.call(i[0]).slice(8, -1)
              ? (t = i[0])
              : ([e, t] = i),
            t || (t = {}),
            (t = P({}, t)),
            e && !t.el && (t.el = e),
            t.el && L(t.el).length > 1)
          ) {
            const e = [];
            return (
              L(t.el).each((s) => {
                const i = P({}, t, { el: s });
                e.push(new ue(i));
              }),
              e
            );
          }
          const r = this;
          (r.__swiper__ = !0),
            (r.support = B()),
            (r.device = G({ userAgent: t.userAgent })),
            (r.browser = q()),
            (r.eventsListeners = {}),
            (r.eventsAnyListeners = []),
            (r.modules = [...r.__modules__]),
            t.modules &&
              Array.isArray(t.modules) &&
              r.modules.push(...t.modules);
          const a = {};
          r.modules.forEach((e) => {
            e({
              swiper: r,
              extendParams: le(t, a),
              on: r.on.bind(r),
              once: r.once.bind(r),
              off: r.off.bind(r),
              emit: r.emit.bind(r),
            });
          });
          const o = P({}, oe, a);
          return (
            (r.params = P({}, o, ce, t)),
            (r.originalParams = P({}, r.params)),
            (r.passedParams = P({}, t)),
            r.params &&
              r.params.on &&
              Object.keys(r.params.on).forEach((e) => {
                r.on(e, r.params.on[e]);
              }),
            r.params && r.params.onAny && r.onAny(r.params.onAny),
            (r.$ = L),
            Object.assign(r, {
              enabled: r.params.enabled,
              el: e,
              classNames: [],
              slides: L(),
              slidesGrid: [],
              snapGrid: [],
              slidesSizesGrid: [],
              isHorizontal: () => "horizontal" === r.params.direction,
              isVertical: () => "vertical" === r.params.direction,
              activeIndex: 0,
              realIndex: 0,
              isBeginning: !0,
              isEnd: !1,
              translate: 0,
              previousTranslate: 0,
              progress: 0,
              velocity: 0,
              animating: !1,
              allowSlideNext: r.params.allowSlideNext,
              allowSlidePrev: r.params.allowSlidePrev,
              touchEvents: (function () {
                const e = [
                    "touchstart",
                    "touchmove",
                    "touchend",
                    "touchcancel",
                  ],
                  t = ["pointerdown", "pointermove", "pointerup"];
                return (
                  (r.touchEventsTouch = {
                    start: e[0],
                    move: e[1],
                    end: e[2],
                    cancel: e[3],
                  }),
                  (r.touchEventsDesktop = {
                    start: t[0],
                    move: t[1],
                    end: t[2],
                  }),
                  r.support.touch || !r.params.simulateTouch
                    ? r.touchEventsTouch
                    : r.touchEventsDesktop
                );
              })(),
              touchEventsData: {
                isTouched: void 0,
                isMoved: void 0,
                allowTouchCallbacks: void 0,
                touchStartTime: void 0,
                isScrolling: void 0,
                currentTranslate: void 0,
                startTranslate: void 0,
                allowThresholdMove: void 0,
                focusableElements: r.params.focusableElements,
                lastClickTime: _(),
                clickTimeout: void 0,
                velocities: [],
                allowMomentumBounce: void 0,
                isTouchEvent: void 0,
                startMoving: void 0,
              },
              allowClick: !0,
              allowTouchMove: r.params.allowTouchMove,
              touches: {
                startX: 0,
                startY: 0,
                currentX: 0,
                currentY: 0,
                diff: 0,
              },
              imagesToLoad: [],
              imagesLoaded: 0,
            }),
            r.emit("_swiper"),
            r.params.init && r.init(),
            r
          );
        }
        enable() {
          const e = this;
          e.enabled ||
            ((e.enabled = !0),
            e.params.grabCursor && e.setGrabCursor(),
            e.emit("enable"));
        }
        disable() {
          const e = this;
          e.enabled &&
            ((e.enabled = !1),
            e.params.grabCursor && e.unsetGrabCursor(),
            e.emit("disable"));
        }
        setProgress(e, t) {
          const s = this;
          e = Math.min(Math.max(e, 0), 1);
          const i = s.minTranslate(),
            n = (s.maxTranslate() - i) * e + i;
          s.translateTo(n, void 0 === t ? 0 : t),
            s.updateActiveIndex(),
            s.updateSlidesClasses();
        }
        emitContainerClasses() {
          const e = this;
          if (!e.params._emitClasses || !e.el) return;
          const t = e.el.className
            .split(" ")
            .filter(
              (t) =>
                0 === t.indexOf("swiper") ||
                0 === t.indexOf(e.params.containerModifierClass)
            );
          e.emit("_containerClasses", t.join(" "));
        }
        getSlideClasses(e) {
          const t = this;
          return e.className
            .split(" ")
            .filter(
              (e) =>
                0 === e.indexOf("swiper-slide") ||
                0 === e.indexOf(t.params.slideClass)
            )
            .join(" ");
        }
        emitSlidesClasses() {
          const e = this;
          if (!e.params._emitClasses || !e.el) return;
          const t = [];
          e.slides.each((s) => {
            const i = e.getSlideClasses(s);
            t.push({ slideEl: s, classNames: i }), e.emit("_slideClass", s, i);
          }),
            e.emit("_slideClasses", t);
        }
        slidesPerViewDynamic(e, t) {
          void 0 === e && (e = "current"), void 0 === t && (t = !1);
          const {
            params: s,
            slides: i,
            slidesGrid: n,
            slidesSizesGrid: r,
            size: a,
            activeIndex: o,
          } = this;
          let l = 1;
          if (s.centeredSlides) {
            let e,
              t = i[o].swiperSlideSize;
            for (let s = o + 1; s < i.length; s += 1)
              i[s] &&
                !e &&
                ((t += i[s].swiperSlideSize), (l += 1), t > a && (e = !0));
            for (let s = o - 1; s >= 0; s -= 1)
              i[s] &&
                !e &&
                ((t += i[s].swiperSlideSize), (l += 1), t > a && (e = !0));
          } else if ("current" === e)
            for (let e = o + 1; e < i.length; e += 1) {
              (t ? n[e] + r[e] - n[o] < a : n[e] - n[o] < a) && (l += 1);
            }
          else
            for (let e = o - 1; e >= 0; e -= 1) {
              n[o] - n[e] < a && (l += 1);
            }
          return l;
        }
        update() {
          const e = this;
          if (!e || e.destroyed) return;
          const { snapGrid: t, params: s } = e;
          function i() {
            const t = e.rtlTranslate ? -1 * e.translate : e.translate,
              s = Math.min(Math.max(t, e.maxTranslate()), e.minTranslate());
            e.setTranslate(s), e.updateActiveIndex(), e.updateSlidesClasses();
          }
          let n;
          s.breakpoints && e.setBreakpoint(),
            e.updateSize(),
            e.updateSlides(),
            e.updateProgress(),
            e.updateSlidesClasses(),
            e.params.freeMode && e.params.freeMode.enabled
              ? (i(), e.params.autoHeight && e.updateAutoHeight())
              : ((n =
                  ("auto" === e.params.slidesPerView ||
                    e.params.slidesPerView > 1) &&
                  e.isEnd &&
                  !e.params.centeredSlides
                    ? e.slideTo(e.slides.length - 1, 0, !1, !0)
                    : e.slideTo(e.activeIndex, 0, !1, !0)),
                n || i()),
            s.watchOverflow && t !== e.snapGrid && e.checkOverflow(),
            e.emit("update");
        }
        changeDirection(e, t) {
          void 0 === t && (t = !0);
          const s = this,
            i = s.params.direction;
          return (
            e || (e = "horizontal" === i ? "vertical" : "horizontal"),
            e === i ||
              ("horizontal" !== e && "vertical" !== e) ||
              (s.$el
                .removeClass(`${s.params.containerModifierClass}${i}`)
                .addClass(`${s.params.containerModifierClass}${e}`),
              s.emitContainerClasses(),
              (s.params.direction = e),
              s.slides.each((t) => {
                "vertical" === e ? (t.style.width = "") : (t.style.height = "");
              }),
              s.emit("changeDirection"),
              t && s.update()),
            s
          );
        }
        mount(e) {
          const t = this;
          if (t.mounted) return !0;
          const s = L(e || t.params.el);
          if (!(e = s[0])) return !1;
          e.swiper = t;
          const i = () =>
            `.${(t.params.wrapperClass || "").trim().split(" ").join(".")}`;
          let n = (() => {
            if (e && e.shadowRoot && e.shadowRoot.querySelector) {
              const t = L(e.shadowRoot.querySelector(i()));
              return (t.children = (e) => s.children(e)), t;
            }
            return s.children(i());
          })();
          if (0 === n.length && t.params.createElements) {
            const e = g().createElement("div");
            (n = L(e)),
              (e.className = t.params.wrapperClass),
              s.append(e),
              s.children(`.${t.params.slideClass}`).each((e) => {
                n.append(e);
              });
          }
          return (
            Object.assign(t, {
              $el: s,
              el: e,
              $wrapperEl: n,
              wrapperEl: n[0],
              mounted: !0,
              rtl:
                "rtl" === e.dir.toLowerCase() || "rtl" === s.css("direction"),
              rtlTranslate:
                "horizontal" === t.params.direction &&
                ("rtl" === e.dir.toLowerCase() || "rtl" === s.css("direction")),
              wrongRTL: "-webkit-box" === n.css("display"),
            }),
            !0
          );
        }
        init(e) {
          const t = this;
          if (t.initialized) return t;
          return (
            !1 === t.mount(e) ||
              (t.emit("beforeInit"),
              t.params.breakpoints && t.setBreakpoint(),
              t.addClasses(),
              t.params.loop && t.loopCreate(),
              t.updateSize(),
              t.updateSlides(),
              t.params.watchOverflow && t.checkOverflow(),
              t.params.grabCursor && t.enabled && t.setGrabCursor(),
              t.params.preloadImages && t.preloadImages(),
              t.params.loop
                ? t.slideTo(
                    t.params.initialSlide + t.loopedSlides,
                    0,
                    t.params.runCallbacksOnInit,
                    !1,
                    !0
                  )
                : t.slideTo(
                    t.params.initialSlide,
                    0,
                    t.params.runCallbacksOnInit,
                    !1,
                    !0
                  ),
              t.attachEvents(),
              (t.initialized = !0),
              t.emit("init"),
              t.emit("afterInit")),
            t
          );
        }
        destroy(e, t) {
          void 0 === e && (e = !0), void 0 === t && (t = !0);
          const s = this,
            { params: i, $el: n, $wrapperEl: r, slides: a } = s;
          return (
            void 0 === s.params ||
              s.destroyed ||
              (s.emit("beforeDestroy"),
              (s.initialized = !1),
              s.detachEvents(),
              i.loop && s.loopDestroy(),
              t &&
                (s.removeClasses(),
                n.removeAttr("style"),
                r.removeAttr("style"),
                a &&
                  a.length &&
                  a
                    .removeClass(
                      [
                        i.slideVisibleClass,
                        i.slideActiveClass,
                        i.slideNextClass,
                        i.slidePrevClass,
                      ].join(" ")
                    )
                    .removeAttr("style")
                    .removeAttr("data-swiper-slide-index")),
              s.emit("destroy"),
              Object.keys(s.eventsListeners).forEach((e) => {
                s.off(e);
              }),
              !1 !== e &&
                ((s.$el[0].swiper = null),
                (function (e) {
                  const t = e;
                  Object.keys(t).forEach((e) => {
                    try {
                      t[e] = null;
                    } catch (e) {}
                    try {
                      delete t[e];
                    } catch (e) {}
                  });
                })(s)),
              (s.destroyed = !0)),
            null
          );
        }
        static extendDefaults(e) {
          P(ce, e);
        }
        static get extendedDefaults() {
          return ce;
        }
        static get defaults() {
          return oe;
        }
        static installModule(e) {
          ue.prototype.__modules__ || (ue.prototype.__modules__ = []);
          const t = ue.prototype.__modules__;
          "function" == typeof e && t.indexOf(e) < 0 && t.push(e);
        }
        static use(e) {
          return Array.isArray(e)
            ? (e.forEach((e) => ue.installModule(e)), ue)
            : (ue.installModule(e), ue);
        }
      }
      Object.keys(de).forEach((e) => {
        Object.keys(de[e]).forEach((t) => {
          ue.prototype[t] = de[e][t];
        });
      }),
        ue.use([
          function (e) {
            let { swiper: t, on: s, emit: i } = e;
            const n = w();
            let r = null,
              a = null;
            const o = () => {
                t &&
                  !t.destroyed &&
                  t.initialized &&
                  (i("beforeResize"), i("resize"));
              },
              l = () => {
                t && !t.destroyed && t.initialized && i("orientationchange");
              };
            s("init", () => {
              t.params.resizeObserver && void 0 !== n.ResizeObserver
                ? t &&
                  !t.destroyed &&
                  t.initialized &&
                  ((r = new ResizeObserver((e) => {
                    a = n.requestAnimationFrame(() => {
                      const { width: s, height: i } = t;
                      let n = s,
                        r = i;
                      e.forEach((e) => {
                        let {
                          contentBoxSize: s,
                          contentRect: i,
                          target: a,
                        } = e;
                        (a && a !== t.el) ||
                          ((n = i ? i.width : (s[0] || s).inlineSize),
                          (r = i ? i.height : (s[0] || s).blockSize));
                      }),
                        (n === s && r === i) || o();
                    });
                  })),
                  r.observe(t.el))
                : (n.addEventListener("resize", o),
                  n.addEventListener("orientationchange", l));
            }),
              s("destroy", () => {
                a && n.cancelAnimationFrame(a),
                  r && r.unobserve && t.el && (r.unobserve(t.el), (r = null)),
                  n.removeEventListener("resize", o),
                  n.removeEventListener("orientationchange", l);
              });
          },
          function (e) {
            let { swiper: t, extendParams: s, on: i, emit: n } = e;
            const r = [],
              a = w(),
              o = function (e, t) {
                void 0 === t && (t = {});
                const s = new (a.MutationObserver || a.WebkitMutationObserver)(
                  (e) => {
                    if (1 === e.length) return void n("observerUpdate", e[0]);
                    const t = function () {
                      n("observerUpdate", e[0]);
                    };
                    a.requestAnimationFrame
                      ? a.requestAnimationFrame(t)
                      : a.setTimeout(t, 0);
                  }
                );
                s.observe(e, {
                  attributes: void 0 === t.attributes || t.attributes,
                  childList: void 0 === t.childList || t.childList,
                  characterData: void 0 === t.characterData || t.characterData,
                }),
                  r.push(s);
              };
            s({ observer: !1, observeParents: !1, observeSlideChildren: !1 }),
              i("init", () => {
                if (t.params.observer) {
                  if (t.params.observeParents) {
                    const e = t.$el.parents();
                    for (let t = 0; t < e.length; t += 1) o(e[t]);
                  }
                  o(t.$el[0], { childList: t.params.observeSlideChildren }),
                    o(t.$wrapperEl[0], { attributes: !1 });
                }
              }),
              i("destroy", () => {
                r.forEach((e) => {
                  e.disconnect();
                }),
                  r.splice(0, r.length);
              });
          },
        ]);
      const pe = ue;
      function he(e) {
        let { swiper: t, extendParams: s, on: i, emit: n } = e;
        function r(e) {
          let s;
          return (
            e &&
              ((s = L(e)),
              t.params.uniqueNavElements &&
                "string" == typeof e &&
                s.length > 1 &&
                1 === t.$el.find(e).length &&
                (s = t.$el.find(e))),
            s
          );
        }
        function a(e, s) {
          const i = t.params.navigation;
          e &&
            e.length > 0 &&
            (e[s ? "addClass" : "removeClass"](i.disabledClass),
            e[0] && "BUTTON" === e[0].tagName && (e[0].disabled = s),
            t.params.watchOverflow &&
              t.enabled &&
              e[t.isLocked ? "addClass" : "removeClass"](i.lockClass));
        }
        function o() {
          if (t.params.loop) return;
          const { $nextEl: e, $prevEl: s } = t.navigation;
          a(s, t.isBeginning && !t.params.rewind),
            a(e, t.isEnd && !t.params.rewind);
        }
        function l(e) {
          e.preventDefault(),
            (!t.isBeginning || t.params.loop || t.params.rewind) &&
              t.slidePrev();
        }
        function d(e) {
          e.preventDefault(),
            (!t.isEnd || t.params.loop || t.params.rewind) && t.slideNext();
        }
        function c() {
          const e = t.params.navigation;
          if (
            ((t.params.navigation = (function (e, t, s, i) {
              const n = g();
              return (
                e.params.createElements &&
                  Object.keys(i).forEach((r) => {
                    if (!s[r] && !0 === s.auto) {
                      let a = e.$el.children(`.${i[r]}`)[0];
                      a ||
                        ((a = n.createElement("div")),
                        (a.className = i[r]),
                        e.$el.append(a)),
                        (s[r] = a),
                        (t[r] = a);
                    }
                  }),
                s
              );
            })(t, t.originalParams.navigation, t.params.navigation, {
              nextEl: "swiper-button-next",
              prevEl: "swiper-button-prev",
            })),
            !e.nextEl && !e.prevEl)
          )
            return;
          const s = r(e.nextEl),
            i = r(e.prevEl);
          s && s.length > 0 && s.on("click", d),
            i && i.length > 0 && i.on("click", l),
            Object.assign(t.navigation, {
              $nextEl: s,
              nextEl: s && s[0],
              $prevEl: i,
              prevEl: i && i[0],
            }),
            t.enabled ||
              (s && s.addClass(e.lockClass), i && i.addClass(e.lockClass));
        }
        function u() {
          const { $nextEl: e, $prevEl: s } = t.navigation;
          e &&
            e.length &&
            (e.off("click", d),
            e.removeClass(t.params.navigation.disabledClass)),
            s &&
              s.length &&
              (s.off("click", l),
              s.removeClass(t.params.navigation.disabledClass));
        }
        s({
          navigation: {
            nextEl: null,
            prevEl: null,
            hideOnClick: !1,
            disabledClass: "swiper-button-disabled",
            hiddenClass: "swiper-button-hidden",
            lockClass: "swiper-button-lock",
          },
        }),
          (t.navigation = {
            nextEl: null,
            $nextEl: null,
            prevEl: null,
            $prevEl: null,
          }),
          i("init", () => {
            c(), o();
          }),
          i("toEdge fromEdge lock unlock", () => {
            o();
          }),
          i("destroy", () => {
            u();
          }),
          i("enable disable", () => {
            const { $nextEl: e, $prevEl: s } = t.navigation;
            e &&
              e[t.enabled ? "removeClass" : "addClass"](
                t.params.navigation.lockClass
              ),
              s &&
                s[t.enabled ? "removeClass" : "addClass"](
                  t.params.navigation.lockClass
                );
          }),
          i("click", (e, s) => {
            const { $nextEl: i, $prevEl: r } = t.navigation,
              a = s.target;
            if (t.params.navigation.hideOnClick && !L(a).is(r) && !L(a).is(i)) {
              if (
                t.pagination &&
                t.params.pagination &&
                t.params.pagination.clickable &&
                (t.pagination.el === a || t.pagination.el.contains(a))
              )
                return;
              let e;
              i
                ? (e = i.hasClass(t.params.navigation.hiddenClass))
                : r && (e = r.hasClass(t.params.navigation.hiddenClass)),
                n(!0 === e ? "navigationShow" : "navigationHide"),
                i && i.toggleClass(t.params.navigation.hiddenClass),
                r && r.toggleClass(t.params.navigation.hiddenClass);
            }
          }),
          Object.assign(t.navigation, { update: o, init: c, destroy: u });
      }
      function fe(e) {
        let { swiper: t, extendParams: s, on: i, emit: n } = e;
        s({
          lazy: {
            checkInView: !1,
            enabled: !1,
            loadPrevNext: !1,
            loadPrevNextAmount: 1,
            loadOnTransitionStart: !1,
            scrollingElement: "",
            elementClass: "swiper-lazy",
            loadingClass: "swiper-lazy-loading",
            loadedClass: "swiper-lazy-loaded",
            preloaderClass: "swiper-lazy-preloader",
          },
        }),
          (t.lazy = {});
        let r = !1,
          a = !1;
        function o(e, s) {
          void 0 === s && (s = !0);
          const i = t.params.lazy;
          if (void 0 === e) return;
          if (0 === t.slides.length) return;
          const r =
              t.virtual && t.params.virtual.enabled
                ? t.$wrapperEl.children(
                    `.${t.params.slideClass}[data-swiper-slide-index="${e}"]`
                  )
                : t.slides.eq(e),
            a = r.find(
              `.${i.elementClass}:not(.${i.loadedClass}):not(.${i.loadingClass})`
            );
          !r.hasClass(i.elementClass) ||
            r.hasClass(i.loadedClass) ||
            r.hasClass(i.loadingClass) ||
            a.push(r[0]),
            0 !== a.length &&
              a.each((e) => {
                const a = L(e);
                a.addClass(i.loadingClass);
                const l = a.attr("data-background"),
                  d = a.attr("data-src"),
                  c = a.attr("data-srcset"),
                  u = a.attr("data-sizes"),
                  p = a.parent("picture");
                t.loadImage(a[0], d || l, c, u, !1, () => {
                  if (null != t && t && (!t || t.params) && !t.destroyed) {
                    if (
                      (l
                        ? (a.css("background-image", `url("${l}")`),
                          a.removeAttr("data-background"))
                        : (c &&
                            (a.attr("srcset", c), a.removeAttr("data-srcset")),
                          u && (a.attr("sizes", u), a.removeAttr("data-sizes")),
                          p.length &&
                            p.children("source").each((e) => {
                              const t = L(e);
                              t.attr("data-srcset") &&
                                (t.attr("srcset", t.attr("data-srcset")),
                                t.removeAttr("data-srcset"));
                            }),
                          d && (a.attr("src", d), a.removeAttr("data-src"))),
                      a.addClass(i.loadedClass).removeClass(i.loadingClass),
                      r.find(`.${i.preloaderClass}`).remove(),
                      t.params.loop && s)
                    ) {
                      const e = r.attr("data-swiper-slide-index");
                      if (r.hasClass(t.params.slideDuplicateClass)) {
                        o(
                          t.$wrapperEl
                            .children(
                              `[data-swiper-slide-index="${e}"]:not(.${t.params.slideDuplicateClass})`
                            )
                            .index(),
                          !1
                        );
                      } else {
                        o(
                          t.$wrapperEl
                            .children(
                              `.${t.params.slideDuplicateClass}[data-swiper-slide-index="${e}"]`
                            )
                            .index(),
                          !1
                        );
                      }
                    }
                    n("lazyImageReady", r[0], a[0]),
                      t.params.autoHeight && t.updateAutoHeight();
                  }
                }),
                  n("lazyImageLoad", r[0], a[0]);
              });
        }
        function l() {
          const { $wrapperEl: e, params: s, slides: i, activeIndex: n } = t,
            r = t.virtual && s.virtual.enabled,
            l = s.lazy;
          let d = s.slidesPerView;
          function c(t) {
            if (r) {
              if (
                e.children(`.${s.slideClass}[data-swiper-slide-index="${t}"]`)
                  .length
              )
                return !0;
            } else if (i[t]) return !0;
            return !1;
          }
          function u(e) {
            return r ? L(e).attr("data-swiper-slide-index") : L(e).index();
          }
          if (
            ("auto" === d && (d = 0),
            a || (a = !0),
            t.params.watchSlidesProgress)
          )
            e.children(`.${s.slideVisibleClass}`).each((e) => {
              o(r ? L(e).attr("data-swiper-slide-index") : L(e).index());
            });
          else if (d > 1) for (let e = n; e < n + d; e += 1) c(e) && o(e);
          else o(n);
          if (l.loadPrevNext)
            if (d > 1 || (l.loadPrevNextAmount && l.loadPrevNextAmount > 1)) {
              const e = l.loadPrevNextAmount,
                t = d,
                s = Math.min(n + t + Math.max(e, t), i.length),
                r = Math.max(n - Math.max(t, e), 0);
              for (let e = n + d; e < s; e += 1) c(e) && o(e);
              for (let e = r; e < n; e += 1) c(e) && o(e);
            } else {
              const t = e.children(`.${s.slideNextClass}`);
              t.length > 0 && o(u(t));
              const i = e.children(`.${s.slidePrevClass}`);
              i.length > 0 && o(u(i));
            }
        }
        function d() {
          const e = w();
          if (!t || t.destroyed) return;
          const s = t.params.lazy.scrollingElement
              ? L(t.params.lazy.scrollingElement)
              : L(e),
            i = s[0] === e,
            n = i ? e.innerWidth : s[0].offsetWidth,
            a = i ? e.innerHeight : s[0].offsetHeight,
            o = t.$el.offset(),
            { rtlTranslate: c } = t;
          let u = !1;
          c && (o.left -= t.$el[0].scrollLeft);
          const p = [
            [o.left, o.top],
            [o.left + t.width, o.top],
            [o.left, o.top + t.height],
            [o.left + t.width, o.top + t.height],
          ];
          for (let e = 0; e < p.length; e += 1) {
            const t = p[e];
            if (t[0] >= 0 && t[0] <= n && t[1] >= 0 && t[1] <= a) {
              if (0 === t[0] && 0 === t[1]) continue;
              u = !0;
            }
          }
          const h = !(
            "touchstart" !== t.touchEvents.start ||
            !t.support.passiveListener ||
            !t.params.passiveListeners
          ) && { passive: !0, capture: !1 };
          u
            ? (l(), s.off("scroll", d, h))
            : r || ((r = !0), s.on("scroll", d, h));
        }
        i("beforeInit", () => {
          t.params.lazy.enabled &&
            t.params.preloadImages &&
            (t.params.preloadImages = !1);
        }),
          i("init", () => {
            t.params.lazy.enabled && (t.params.lazy.checkInView ? d() : l());
          }),
          i("scroll", () => {
            t.params.freeMode &&
              t.params.freeMode.enabled &&
              !t.params.freeMode.sticky &&
              l();
          }),
          i("scrollbarDragMove resize _freeModeNoMomentumRelease", () => {
            t.params.lazy.enabled && (t.params.lazy.checkInView ? d() : l());
          }),
          i("transitionStart", () => {
            t.params.lazy.enabled &&
              (t.params.lazy.loadOnTransitionStart ||
                (!t.params.lazy.loadOnTransitionStart && !a)) &&
              (t.params.lazy.checkInView ? d() : l());
          }),
          i("transitionEnd", () => {
            t.params.lazy.enabled &&
              !t.params.lazy.loadOnTransitionStart &&
              (t.params.lazy.checkInView ? d() : l());
          }),
          i("slideChange", () => {
            const {
              lazy: e,
              cssMode: s,
              watchSlidesProgress: i,
              touchReleaseOnEdges: n,
              resistanceRatio: r,
            } = t.params;
            e.enabled && (s || (i && (n || 0 === r))) && l();
          }),
          Object.assign(t.lazy, { load: l, loadInSlide: o });
      }
      function me(e) {
        let t,
          s,
          i,
          { swiper: n, extendParams: r } = e;
        r({ grid: { rows: 1, fill: "column" } });
        n.grid = {
          initSlides: (e) => {
            const { slidesPerView: r } = n.params,
              { rows: a, fill: o } = n.params.grid;
            (s = t / a),
              (i = Math.floor(e / a)),
              (t = Math.floor(e / a) === e / a ? e : Math.ceil(e / a) * a),
              "auto" !== r && "row" === o && (t = Math.max(t, r * a));
          },
          updateSlide: (e, r, a, o) => {
            const { slidesPerGroup: l, spaceBetween: d } = n.params,
              { rows: c, fill: u } = n.params.grid;
            let p, h, f;
            if ("row" === u && l > 1) {
              const s = Math.floor(e / (l * c)),
                i = e - c * l * s,
                n = 0 === s ? l : Math.min(Math.ceil((a - s * c * l) / c), l);
              (f = Math.floor(i / n)),
                (h = i - f * n + s * l),
                (p = h + (f * t) / c),
                r.css({ "-webkit-order": p, order: p });
            } else
              "column" === u
                ? ((h = Math.floor(e / c)),
                  (f = e - h * c),
                  (h > i || (h === i && f === c - 1)) &&
                    ((f += 1), f >= c && ((f = 0), (h += 1))))
                : ((f = Math.floor(e / s)), (h = e - f * s));
            r.css(o("margin-top"), 0 !== f ? d && `${d}px` : "");
          },
          updateWrapperSize: (e, s, i) => {
            const {
                spaceBetween: r,
                centeredSlides: a,
                roundLengths: o,
              } = n.params,
              { rows: l } = n.params.grid;
            if (
              ((n.virtualSize = (e + r) * t),
              (n.virtualSize = Math.ceil(n.virtualSize / l) - r),
              n.$wrapperEl.css({ [i("width")]: `${n.virtualSize + r}px` }),
              a)
            ) {
              s.splice(0, s.length);
              const e = [];
              for (let t = 0; t < s.length; t += 1) {
                let i = s[t];
                o && (i = Math.floor(i)),
                  s[t] < n.virtualSize + s[0] && e.push(i);
              }
              s.push(...e);
            }
          },
        };
      }
      function ge() {
        let e = document.querySelectorAll(
          '[class*="__swiper"]:not(.swiper-wrapper)'
        );
        e &&
          e.forEach((e) => {
            e.parentElement.classList.add("swiper"),
              e.classList.add("swiper-wrapper");
            for (const t of e.children) t.classList.add("swiper-slide");
          });
      }
      window.addEventListener("load", function (e) {
        ge(),
          document.querySelector(".page-partners__slider") &&
            new pe(".page-partners__slider", {
              modules: [he, me, fe],
              grabCursor: !0,
              grid: { rows: 2, fill: "row" },
              observer: !0,
              observeParents: !0,
              slidesPerView: 5,
              spaceBetween: 13,
              speed: 800,
              lazy: !0,
              navigation: {
                nextEl: ".page-partners__slider-button-next",
                prevEl: ".page-partners__slider-button-prev",
              },
              breakpoints: {
                320: {
                  slidesPerView: 2,
                  spaceBetween: 10,
                  grid: { rows: 3, fill: "row" },
                },
                425: {
                  slidesPerView: 2,
                  spaceBetween: 10,
                  grid: { rows: 2, fill: "row" },
                },
                768: { slidesPerView: 3, spaceBetween: 13 },
                992: { slidesPerView: 4, spaceBetween: 13 },
                1268: { slidesPerView: 5, spaceBetween: 13 },
              },
              on: {},
            });
      });
      new (s(732))({
        elements_selector: "[data-src]",
        class_loaded: "_lazy-loaded",
        use_native: !0,
      });
      class ve {
        constructor(e) {
          (this.config = Object.assign({ logging: !0 }, e)),
            this.observer,
            !document.documentElement.classList.contains("watcher") &&
              this.scrollWatcherRun();
        }
        scrollWatcherUpdate() {
          this.scrollWatcherRun();
        }
        scrollWatcherRun() {
          document.documentElement.classList.add("watcher"),
            this.scrollWatcherConstructor(
              document.querySelectorAll("[data-watch]")
            );
        }
        scrollWatcherConstructor(e) {
          if (e.length) {
            this.scrollWatcherLogging(
              `??????????????????, ?????????? ???? ?????????????????? (${e.length})...`
            ),
              u(
                Array.from(e).map(function (e) {
                  return `${
                    e.dataset.watchRoot ? e.dataset.watchRoot : null
                  }|${e.dataset.watchMargin ? e.dataset.watchMargin : "0px"}|${e.dataset.watchThreshold ? e.dataset.watchThreshold : 0}`;
                })
              ).forEach((t) => {
                let s = t.split("|"),
                  i = { root: s[0], margin: s[1], threshold: s[2] },
                  n = Array.from(e).filter(function (e) {
                    let t = e.dataset.watchRoot ? e.dataset.watchRoot : null,
                      s = e.dataset.watchMargin ? e.dataset.watchMargin : "0px",
                      n = e.dataset.watchThreshold
                        ? e.dataset.watchThreshold
                        : 0;
                    if (
                      String(t) === i.root &&
                      String(s) === i.margin &&
                      String(n) === i.threshold
                    )
                      return e;
                  }),
                  r = this.getScrollWatcherConfig(i);
                this.scrollWatcherInit(n, r);
              });
          } else
            this.scrollWatcherLogging(
              "????????, ?????? ???????????????? ?????? ????????????????. ZzzZZzz"
            );
        }
        getScrollWatcherConfig(e) {
          let t = {};
          if (
            (document.querySelector(e.root)
              ? (t.root = document.querySelector(e.root))
              : "null" !== e.root &&
                this.scrollWatcherLogging(
                  `??????... ?????????????????????????? ?????????????? ${e.root} ?????? ???? ????????????????`
                ),
            (t.rootMargin = e.margin),
            !(e.margin.indexOf("px") < 0 && e.margin.indexOf("%") < 0))
          ) {
            if ("prx" === e.threshold) {
              e.threshold = [];
              for (let t = 0; t <= 1; t += 0.005) e.threshold.push(t);
            } else e.threshold = e.threshold.split(",");
            return (t.threshold = e.threshold), t;
          }
          this.scrollWatcherLogging(
            "???? ????, ?????????????????? data-watch-margin ?????????? ???????????????? ?? PX ?????? %"
          );
        }
        scrollWatcherCreate(e) {
          this.observer = new IntersectionObserver((e, t) => {
            e.forEach((e) => {
              this.scrollWatcherCallback(e, t);
            });
          }, e);
        }
        scrollWatcherInit(e, t) {
          this.scrollWatcherCreate(t),
            e.forEach((e) => this.observer.observe(e));
        }
        scrollWatcherIntersecting(e, t) {
          e.isIntersecting
            ? (!t.classList.contains("_watcher-view") &&
                t.classList.add("_watcher-view"),
              this.scrollWatcherLogging(
                `?? ???????? ${t.classList}, ?????????????? ?????????? _watcher-view`
              ))
            : (t.classList.contains("_watcher-view") &&
                t.classList.remove("_watcher-view"),
              this.scrollWatcherLogging(
                `?? ???? ???????? ${t.classList}, ?????????? ?????????? _watcher-view`
              ));
        }
        scrollWatcherOff(e, t) {
          t.unobserve(e),
            this.scrollWatcherLogging(`?? ???????????????? ?????????????? ???? ${e.classList}`);
        }
        scrollWatcherLogging(e) {
          this.config.logging && c(`[??????????????????????]: ${e}`);
        }
        scrollWatcherCallback(e, t) {
          const s = e.target;
          this.scrollWatcherIntersecting(e, s),
            s.hasAttribute("data-watch-once") &&
              e.isIntersecting &&
              this.scrollWatcherOff(s, t),
            document.dispatchEvent(
              new CustomEvent("watcherCallback", { detail: { entry: e } })
            );
        }
      }
      var we = s(2);
      let be = (e, t = !1, s = 500, i = 0) => {
          const n = document.querySelector(e);
          if (n) {
            let r = "",
              a = 0;
            t &&
              ((r = "header.header"),
              (a = document.querySelector(r).offsetHeight));
            let o = {
              speedAsDuration: !0,
              speed: s,
              header: r,
              offset: i,
              easing: "easeOutQuad",
            };
            if (
              (document.documentElement.classList.contains("menu-open") &&
                (l(), document.documentElement.classList.remove("menu-open")),
              void 0 !== we)
            )
              new we().animateScroll(n, "", o);
            else {
              let e = n.getBoundingClientRect().top + scrollY;
              window.scrollTo({ top: a ? e - a : e, behavior: "smooth" });
            }
            c(`[gotoBlock]: ????????...???????? ?? ${e}`);
          } else c(`[gotoBlock]: ???? ????..???????????? ?????????? ?????? ???? ????????????????: ${e}`);
        },
        ye = !1;
      setTimeout(() => {
        if (ye) {
          let e = new Event("windowScroll");
          window.addEventListener("scroll", function (t) {
            document.dispatchEvent(e);
          });
        }
      }, 0);
      for (
        var Se = document.querySelectorAll("#menu li a"),
          Ee = document.querySelector("#vid source"),
          Te = 0,
          Ce = Se.length;
        Te < Ce;
        Te++
      )
        Se[Te].addEventListener("click", function (e) {
          e.preventDefault(), (Ee.src = this.getAttribute("href"));
        });
      (window.FLS = !0),
        (function (e) {
          let t = new Image();
          (t.onload = t.onerror =
            function () {
              e(2 == t.height);
            }),
            (t.src =
              "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA");
        })(function (e) {
          let t = !0 === e ? "webp" : "no-webp";
          document.documentElement.classList.add(t);
        }),
        i.any() && document.documentElement.classList.add("touch"),
        window.addEventListener("load", function () {
          setTimeout(function () {
            document.documentElement.classList.add("loaded");
          }, 0);
        }),
        (function () {
          let e = document.querySelector(".icon-menu");
          e &&
            e.addEventListener("click", function (e) {
              a &&
                (o(), document.documentElement.classList.toggle("menu-open"));
            });
        })(),
        (function () {
          const e = document.querySelectorAll("[data-tabs]");
          let t = [];
          if (e.length > 0) {
            const n = location.hash.replace("#", "");
            n.startsWith("tab-") && (t = n.replace("tab-", "").split("-")),
              e.forEach((e, s) => {
                e.classList.add("_tab-init"),
                  e.setAttribute("data-tabs-index", s),
                  e.addEventListener("click", i),
                  (function (e) {
                    const s = e.querySelectorAll("[data-tabs-titles]>*"),
                      i = e.querySelectorAll("[data-tabs-body]>*"),
                      n = e.dataset.tabsIndex,
                      r = t[0] == n;
                    if (r) {
                      e.querySelector(
                        "[data-tabs-titles]>._tab-active"
                      ).classList.remove("_tab-active");
                    }
                    i.length > 0 &&
                      i.forEach((e, i) => {
                        s[i].setAttribute("data-tabs-title", ""),
                          e.setAttribute("data-tabs-item", ""),
                          r && i == t[1] && s[i].classList.add("_tab-active"),
                          (e.hidden = !s[i].classList.contains("_tab-active"));
                      });
                  })(e);
              });
            let r = p(e, "tabs");
            r &&
              r.length &&
              r.forEach((e) => {
                e.matchMedia.addEventListener("change", function () {
                  s(e.itemsArray, e.matchMedia);
                }),
                  s(e.itemsArray, e.matchMedia);
              });
          }
          function s(e, t) {
            e.forEach((e) => {
              const s = (e = e.item).querySelector("[data-tabs-titles]"),
                i = e.querySelectorAll("[data-tabs-title]"),
                n = e.querySelector("[data-tabs-body]");
              e.querySelectorAll("[data-tabs-item]").forEach((r, a) => {
                t.matches
                  ? (n.append(i[a]),
                    n.append(r),
                    e.classList.add("_tab-spoller"))
                  : (s.append(i[a]), e.classList.remove("_tab-spoller"));
              });
            });
          }
          function i(e) {
            const t = e.target;
            if (t.closest("[data-tabs-title]")) {
              const s = t.closest("[data-tabs-title]"),
                i = s.closest("[data-tabs]");
              if (
                !s.classList.contains("_tab-active") &&
                !i.querySelectorAll("._slide").length
              ) {
                const e = i.querySelector("[data-tabs-title]._tab-active");
                e && e.classList.remove("_tab-active"),
                  s.classList.add("_tab-active"),
                  (function (e) {
                    const t = e.querySelectorAll("[data-tabs-title]"),
                      s = e.querySelectorAll("[data-tabs-item]"),
                      i = e.dataset.tabsIndex,
                      a = (function (e) {
                        if (e.hasAttribute("data-tabs-animate"))
                          return e.dataset.tabsAnimate > 0
                            ? e.dataset.tabsAnimate
                            : 500;
                      })(e);
                    s.length > 0 &&
                      s.forEach((e, s) => {
                        t[s].classList.contains("_tab-active")
                          ? (a ? r(e, a) : (e.hidden = !1),
                            e.closest(".popup") ||
                              (location.hash = `tab-${i}-${s}`))
                          : a
                          ? n(e, a)
                          : (e.hidden = !0);
                      });
                  })(i);
              }
              e.preventDefault();
            }
          }
        })(),
        new t({}),
        new ve({}),
        (function () {
          function e(e) {
            if ("click" === e.type) {
              const t = e.target;
              if (t.closest("[data-goto]")) {
                const s = t.closest("[data-goto]"),
                  i = s.dataset.goto ? s.dataset.goto : "",
                  n = !!s.hasAttribute("data-goto-header"),
                  r = s.dataset.gotoSpeed ? s.dataset.gotoSpeed : "500";
                be(i, n, r), e.preventDefault();
              }
            } else if ("watcherCallback" === e.type && e.detail) {
              const t = e.detail.entry,
                s = t.target;
              if ("navigator" === s.dataset.watch) {
                const e = s.id,
                  i =
                    (document.querySelector("[data-goto]._navigator-active"),
                    document.querySelector(`[data-goto="${e}"]`));
                t.isIntersecting
                  ? i && i.classList.add("_navigator-active")
                  : i && i.classList.remove("_navigator-active");
              }
            }
          }
          document.addEventListener("click", e),
            document.addEventListener("watcherCallback", e);
        })(),
        (function () {
          ye = !0;
          const e = document.querySelector("header.header"),
            t = e.hasAttribute("data-scroll-show"),
            s = e.dataset.scrollShow ? e.dataset.scrollShow : 500,
            i = e.dataset.scroll ? e.dataset.scroll : 1;
          let n,
            r = 0;
          document.addEventListener("windowScroll", function (a) {
            const o = window.scrollY;
            clearTimeout(n),
              o >= i
                ? (!e.classList.contains("_header-scroll") &&
                    e.classList.add("_header-scroll"),
                  t &&
                    (o > r
                      ? e.classList.contains("_header-show") &&
                        e.classList.remove("_header-show")
                      : !e.classList.contains("_header-show") &&
                        e.classList.add("_header-show"),
                    (n = setTimeout(() => {
                      !e.classList.contains("_header-show") &&
                        e.classList.add("_header-show");
                    }, s))))
                : (e.classList.contains("_header-scroll") &&
                    e.classList.remove("_header-scroll"),
                  t &&
                    e.classList.contains("_header-show") &&
                    e.classList.remove("_header-show")),
              (r = o <= 0 ? 0 : o);
          });
        })();
    })();
})();
