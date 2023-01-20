! function(e) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], e) : "object" == typeof exports ? module.exports = e(require("jquery")) : e(jQuery)
}(function(e) {
    "use strict";
    var t = "animsition",
        i = {
            init: function(s) {
                s = e.extend({
                    inClass: "fade-in",
                    outClass: "fade-out",
                    inDuration: 1500,
                    outDuration: 800,
                    linkElement: ".animsition-link",
                    loading: !0,
                    loadingParentElement: "body",
                    loadingClass: "animsition-loading",
                    loadingInner: "",
                    timeout: !1,
                    timeoutCountdown: 5e3,
                    onLoadEvent: !0,
                    browser: ["animation-duration", "-webkit-animation-duration"],
                    overlay: !1,
                    overlayClass: "animsition-overlay-slide",
                    overlayParentElement: "body",
                    transition: function(e) {
                        window.location.href = e
                    }
                }, s), i.settings = {
                    timer: !1,
                    data: {
                        inClass: "animsition-in-class",
                        inDuration: "animsition-in-duration",
                        outClass: "animsition-out-class",
                        outDuration: "animsition-out-duration",
                        overlay: "animsition-overlay"
                    },
                    events: {
                        inStart: "animsition.inStart",
                        inEnd: "animsition.inEnd",
                        outStart: "animsition.outStart",
                        outEnd: "animsition.outEnd"
                    }
                };
                var n = i.supportCheck.call(this, s);
                return n || !(s.browser.length > 0) || n && this.length ? (i.optionCheck.call(this, s) && e("." + s.overlayClass).length <= 0 && i.addOverlay.call(this, s), s.loading && e("." + s.loadingClass).length <= 0 && i.addLoading.call(this, s), this.each(function() {
                    var n = this,
                        a = e(this),
                        r = e(window),
                        o = e(document);
                    a.data(t) || (s = e.extend({}, s), a.data(t, {
                        options: s
                    }), s.timeout && i.addTimer.call(n), s.onLoadEvent && r.on("load." + t, function() {
                        i.settings.timer && clearTimeout(i.settings.timer), i.in.call(n)
                    }), r.on("pageshow." + t, function(e) {
                        e.originalEvent.persisted && i.in.call(n)
                    }), r.on("unload." + t, function() {}), o.on("click." + t, s.linkElement, function(t) {
                        t.preventDefault();
                        var s = e(this),
                            a = s.attr("href");
                        2 === t.which || t.metaKey || t.shiftKey || -1 !== navigator.platform.toUpperCase().indexOf("WIN") && t.ctrlKey ? window.open(a, "_blank") : i.out.call(n, s, a)
                    }))
                })) : ("console" in window || (window.console = {}, window.console.log = function(e) {
                    return e
                }), this.length || console.log("Animsition: Element does not exist on page."), n || console.log("Animsition: Does not support this browser."), i.destroy.call(this))
            },
            addOverlay: function(t) {
                e(t.overlayParentElement).prepend('<div class="' + t.overlayClass + '"></div>')
            },
            addLoading: function(t) {
                e(t.loadingParentElement).append('<div class="' + t.loadingClass + '">' + t.loadingInner + "</div>")
            },
            removeLoading: function() {
                var i = e(this).data(t).options;
                e(i.loadingParentElement).children("." + i.loadingClass).fadeOut().remove()
            },
            addTimer: function() {
                var s = this,
                    n = e(this).data(t).options;
                i.settings.timer = setTimeout(function() {
                    i.in.call(s), e(window).off("load." + t)
                }, n.timeoutCountdown)
            },
            supportCheck: function(t) {
                var i = e(this),
                    s = t.browser,
                    n = s.length,
                    a = !1;
                0 === n && (a = !0);
                for (var r = 0; n > r; r++)
                    if ("string" == typeof i.css(s[r])) {
                        a = !0;
                        break
                    }
                return a
            },
            optionCheck: function(t) {
                var s = e(this);
                return !(!t.overlay && !s.data(i.settings.data.overlay))
            },
            animationCheck: function(i, s, n) {
                var a = e(this).data(t).options,
                    r = typeof i,
                    o = !s && "number" === r,
                    l = s && "string" === r && i.length > 0;
                return o || l ? i = i : s && n ? i = a.inClass : !s && n ? i = a.inDuration : s && !n ? i = a.outClass : s || n || (i = a.outDuration), i
            },
            in: function() {
                var s = this,
                    n = e(this),
                    a = n.data(t).options,
                    r = n.data(i.settings.data.inDuration),
                    o = n.data(i.settings.data.inClass),
                    l = i.animationCheck.call(s, r, !1, !0),
                    c = i.animationCheck.call(s, o, !0, !0),
                    d = i.optionCheck.call(s, a),
                    h = n.data(t).outClass;
                a.loading && i.removeLoading.call(s), h && n.removeClass(h), d ? i.inOverlay.call(s, c, l) : i.inDefault.call(s, c, l)
            },
            inDefault: function(t, s) {
                var n = e(this);
                n.css({
                    "animation-duration": s + "ms"
                }).addClass(t).trigger(i.settings.events.inStart).animateCallback(function() {
                    n.removeClass(t).css({
                        opacity: 1
                    }).trigger(i.settings.events.inEnd)
                })
            },
            inOverlay: function(s, n) {
                var a = e(this),
                    r = a.data(t).options;
                a.css({
                    opacity: 1
                }).trigger(i.settings.events.inStart), e(r.overlayParentElement).children("." + r.overlayClass).css({
                    "animation-duration": n + "ms"
                }).addClass(s).animateCallback(function() {
                    a.trigger(i.settings.events.inEnd)
                })
            },
            out: function(s, n) {
                var a = this,
                    r = e(this),
                    o = r.data(t).options,
                    l = s.data(i.settings.data.outClass),
                    c = r.data(i.settings.data.outClass),
                    d = s.data(i.settings.data.outDuration),
                    h = r.data(i.settings.data.outDuration),
                    u = l || c,
                    p = d || h,
                    f = i.animationCheck.call(a, u, !0, !1),
                    m = i.animationCheck.call(a, p, !1, !1),
                    v = i.optionCheck.call(a, o);
                r.data(t).outClass = f, v ? i.outOverlay.call(a, f, m, n) : i.outDefault.call(a, f, m, n)
            },
            outDefault: function(s, n, a) {
                var r = e(this),
                    o = r.data(t).options;
                r.css({
                    "animation-duration": n + 1 + "ms"
                }).addClass(s).trigger(i.settings.events.outStart).animateCallback(function() {
                    r.trigger(i.settings.events.outEnd), o.transition(a)
                })
            },
            outOverlay: function(s, n, a) {
                var r = e(this),
                    o = r.data(t).options,
                    l = r.data(i.settings.data.inClass),
                    c = i.animationCheck.call(this, l, !0, !0);
                e(o.overlayParentElement).children("." + o.overlayClass).css({
                    "animation-duration": n + 1 + "ms"
                }).removeClass(c).addClass(s).trigger(i.settings.events.outStart).animateCallback(function() {
                    r.trigger(i.settings.events.outEnd), o.transition(a)
                })
            },
            destroy: function() {
                return this.each(function() {
                    var i = e(this);
                    e(window).off("." + t), i.css({
                        opacity: 1
                    }).removeData(t)
                })
            }
        };
    e.fn.animateCallback = function(t) {
        var i = "animationend webkitAnimationEnd";
        return this.each(function() {
            var s = e(this);
            s.on(i, function() {
                return s.off(i), t.call(this)
            })
        })
    }, e.fn.animsition = function(s) {
        return i[s] ? i[s].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof s && s ? void e.error("Method " + s + " does not exist on jQuery." + t) : i.init.apply(this, arguments)
    }
}),
function(e) {
    "use strict";
    var t, i, s, n, a, r, o, l, c, d, h, u, p, f = (t = "sf-breadcrumb", i = "sf-js-enabled", s = "sf-with-ul", n = "sf-arrows", e(window).on("load", function() {
        e("body").children().on("click.superclick", function() {
            e(".sf-js-enabled").superclick("reset")
        })
    }), a = function(e, t) {
        var s = i;
        t.cssArrows && (s += " " + n), e.toggleClass(s)
    }, r = function(e, t) {
        e.children(t.actionElement).toggleClass(s)
    }, o = function(e) {
        var t = e.css("ms-touch-action");
        t = "pan-y" === t ? "auto" : "pan-y", e.css("ms-touch-action", t)
    }, l = function(t) {
        var i, s = e(this),
            n = s.siblings(t.data.popUpSelector);
        if (n.length) return i = n.is(":hidden") ? c : d, e.proxy(i, s.parent("li"))(), i != c
    }, c = function() {
        var t = e(this);
        p(t), t.siblings().superclick("hide").end().superclick("show")
    }, d = function() {
        var t = e(this),
            i = p(t);
        e.proxy(h, t, i)()
    }, h = function(t) {
        t.retainPath = e.inArray(this[0], t.$path) > -1, this.superclick("hide"), this.parents("." + t.activeClass).length || (t.onIdle.call(u(this)), t.$path.length && e.proxy(c, t.$path)())
    }, u = function(e) {
        return e.closest("." + i)
    }, p = function(e) {
        return u(e).data("sf-options")
    }, {
        hide: function(t) {
            if (this.length) {
                var i = p(this);
                if (!i) return this;
                var s = !0 === i.retainPath ? i.$path : "",
                    n = this.find("li." + i.activeClass).add(this).not(s).removeClass(i.activeClass).children(i.popUpSelector),
                    a = i.speedOut;
                t && (n.show(), a = 0), i.retainPath = !1, i.onBeforeHide.call(n), n.stop(!0, !0).animate(i.animationOut, a, function() {
                    var t = e(this);
                    i.onHide.call(t)
                })
            }
            return this
        },
        show: function() {
            var e = p(this);
            if (!e) return this;
            var t = this.addClass(e.activeClass).children(e.popUpSelector);
            return e.onBeforeShow.call(t), t.stop(!0, !0).animate(e.animation, e.speed, function() {
                e.onShow.call(t)
            }), this
        },
        destroy: function() {
            return this.each(function() {
                var i, s = e(this),
                    n = s.data("sf-options");
                if (!n) return !1;
                i = s.find(n.popUpSelector).parent("li"), a(s, n), r(i, n), o(s), s.off(".superclick"), i.children(n.popUpSelector).attr("style", function(e, t) {
                    return t.replace(/display[^;]+;?/g, "")
                }), n.$path.removeClass(n.activeClass + " " + t).addClass(n.pathClass), s.find("." + n.activeClass).removeClass(n.activeClass), n.onDestroy.call(s), s.removeData("sf-options")
            })
        },
        reset: function() {
            return this.each(function() {
                var t = e(this),
                    i = p(t);
                e(t.find("." + i.activeClass).toArray().reverse()).children(i.actionElement).trigger("click")
            })
        },
        init: function(i) {
            return this.each(function() {
                var s = e(this);
                if (s.data("sf-options")) return !1;
                var n = e.extend({}, e.fn.superclick.defaults, i),
                    c = s.find(n.popUpSelector).parent("li");
                n.$path = function(i, s) {
                    return i.find("li." + s.pathClass).slice(0, s.pathLevels).addClass(s.activeClass + " " + t).filter(function() {
                        return e(this).children(s.popUpSelector).hide().show().length
                    }).removeClass(s.pathClass)
                }(s, n), s.data("sf-options", n), a(s, n), r(c, n), o(s), s.on("click.superclick", n.actionElement, n, l), c.not("." + t).superclick("hide", !0), n.onInit.call(this)
            })
        }
    });
    e.fn.superclick = function(t, i) {
        return f[t] ? f[t].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof t && t ? e.error("Method " + t + " does not exist on jQuery.fn.superclick") : f.init.apply(this, arguments)
    }, e.fn.superclick.defaults = {
        popUpSelector: "ul,.sf-mega",
        activeClass: "sfHover",
        pathClass: "overrideThisToUse",
        pathLevels: 1,
        actionElement: "a",
        animation: {
            opacity: "show"
        },
        animationOut: {
            opacity: "hide"
        },
        speed: "normal",
        speedOut: "fast",
        cssArrows: !0,
        onInit: e.noop,
        onBeforeShow: e.noop,
        onShow: e.noop,
        onBeforeHide: e.noop,
        onHide: e.noop,
        onIdle: e.noop,
        onDestroy: e.noop
    }
}(jQuery),
function(e, t, i, s) {
    "use strict";
    e.fn.pagepiling = function(n) {
        var a, r = e.fn.pagepiling,
            o = e(this),
            l = 0,
            c = "ontouchstart" in i || navigator.msMaxTouchPoints > 0 || navigator.maxTouchPoints,
            d = 0,
            h = 0,
            u = 0,
            p = 0,
            f = [],
            m = 600,
            v = e.extend(!0, {
                direction: "vertical",
                menu: null,
                verticalCentered: !0,
                sectionsColor: [],
                anchors: [],
                scrollingSpeed: 700,
                easing: "easeInQuart",
                loopBottom: !1,
                loopTop: !1,
                css3: !0,
                navigation: {
                    textColor: "#000",
                    bulletsColor: "#000",
                    position: "right",
                    tooltips: []
                },
                normalScrollElements: null,
                normalScrollElementTouchThreshold: 5,
                touchSensitivity: 5,
                keyboardScrolling: !0,
                sectionSelector: ".section",
                animateAnchor: !1,
                afterLoad: null,
                onLeave: null,
                afterRender: null
            }, n);
        e.extend(e.easing, {
            easeInQuart: function(e, t, i, s, n) {
                return s * (t /= n) * t * t * t + i
            }
        }), r.setScrollingSpeed = function(e) {
            v.scrollingSpeed = e
        }, r.setMouseWheelScrolling = function(e) {
            e ? o.get(0).addEventListener ? (o.get(0).addEventListener("mousewheel", M, {
                passive: !0
            }), o.get(0).addEventListener("wheel", M, {
                passive: !0
            })) : o.get(0).attachEvent("onmousewheel", M) : o.get(0).addEventListener ? (o.get(0).removeEventListener("mousewheel", M, !1), o.get(0).removeEventListener("wheel", M, !1)) : o.get(0).detachEvent("onmousewheel", M)
        }, r.setAllowScrolling = function(e) {
            e ? (r.setMouseWheelScrolling(!0), function() {
                if (c) {
                    var e = L();
                    o.off("touchstart " + e.down).on("touchstart " + e.down, A), o.off("touchmove " + e.move).on("touchmove " + e.move, O)
                }
            }()) : (r.setMouseWheelScrolling(!1), function() {
                if (c) {
                    var e = L();
                    o.off("touchstart " + e.down), o.off("touchmove " + e.move)
                }
            }())
        }, r.setKeyboardScrolling = function(e) {
            v.keyboardScrolling = e
        }, r.moveSectionUp = function() {
            var t = e(".pp-section.active").prev(".pp-section");
            !t.length && v.loopTop && (t = e(".pp-section").last()), t.length && b(t)
        }, r.moveSectionDown = function() {
            var t = e(".pp-section.active").next(".pp-section");
            !t.length && v.loopBottom && (t = e(".pp-section").first()), t.length && b(t)
        }, r.moveTo = function(i) {
            var s = "";
            (s = isNaN(i) ? e(t).find('[data-anchor="' + i + '"]') : e(".pp-section").eq(i - 1)).length > 0 && b(s)
        }, e(v.sectionSelector).each(function() {
            e(this).addClass("pp-section")
        }), v.css3 && (v.css3 = function() {
            var e = t.createElement("p"),
                n = {
                    webkitTransform: "-webkit-transform",
                    OTransform: "-o-transform",
                    msTransform: "-ms-transform",
                    MozTransform: "-moz-transform",
                    transform: "transform"
                };
            for (var a in t.body.insertBefore(e, null), n) e.style[a] !== s && (e.style[a] = "translate3d(1px,1px,1px)", i.getComputedStyle(e).getPropertyValue(n[a]));
            return t.body.removeChild(e), !0
        }()), e(o).css({
            overflow: "hidden",
            "-ms-touch-action": "none",
            "touch-action": "none"
        }), r.setAllowScrolling(!0), e.isEmptyObject(v.navigation) || function() {
            e("body").append('<div id="pp-nav"><ul></ul></div>');
            var t = e("#pp-nav");
            t.css("color", v.navigation.textColor), t.addClass(v.navigation.position);
            for (var i = 0; i < e(".pp-section").length; i++) {
                var s = "";
                if (v.anchors.length && (s = v.anchors[i]), "undefined" !== v.navigation.tooltips) {
                    var n = v.navigation.tooltips[i];
                    void 0 === n && (n = "")
                }
                t.find("ul").append('<li data-tooltip="' + n + '"><a href="#' + s + '"><span></span></a></li>')
            }
            t.find("span").css("border-color", v.navigation.bulletsColor)
        }();
        var g = e(".pp-section").length;

        function b(t, i) {
            var s, n = {
                destination: t,
                animated: i,
                activeSection: e(".pp-section.active"),
                anchorLink: t.data("anchor"),
                sectionIndex: t.index(".pp-section"),
                toMove: t,
                yMovement: (s = t, e(".pp-section.active").index(".pp-section") > s.index(".pp-section") ? "up" : "down"),
                leavingSection: e(".pp-section.active").index(".pp-section") + 1
            };
            if (!n.activeSection.is(t)) {
                var r, o, c;
                void 0 === n.animated && (n.animated = !0), void 0 !== n.anchorLink && (r = n.anchorLink, o = n.sectionIndex, v.anchors.length ? (location.hash = r, C(location.hash)) : C(String(o))), n.destination.addClass("active").siblings().removeClass("active"), n.sectionsToMove = function(t) {
                        var i;
                        i = "down" === t.yMovement ? e(".pp-section").map(function(i) {
                            if (i < t.destination.index(".pp-section")) return e(this)
                        }) : e(".pp-section").map(function(i) {
                            if (i > t.destination.index(".pp-section")) return e(this)
                        });
                        return i
                    }(n), "down" === n.yMovement ? (n.translate3d = D(), n.scrolling = "-100%", v.css3 || n.sectionsToMove.each(function(t) {
                        t != n.activeSection.index(".pp-section") && e(this).css(x(n.scrolling))
                    }), n.animateSection = n.activeSection) : (n.translate3d = "translate3d(0px, 0px, 0px)", n.scrolling = "0", n.animateSection = t), e.isFunction(v.onLeave) && v.onLeave.call(this, n.leavingSection, n.sectionIndex + 1, n.yMovement),
                    function(t) {
                        v.css3 ? (E(t.animateSection, t.translate3d, t.animated), t.sectionsToMove.each(function() {
                            E(e(this), t.translate3d, t.animated)
                        }), setTimeout(function() {
                            y(t)
                        }, v.scrollingSpeed)) : (t.scrollOptions = x(t.scrolling), t.animated ? t.animateSection.animate(t.scrollOptions, v.scrollingSpeed, v.easing, function() {
                            w(t), y(t)
                        }) : (t.animateSection.css(x(t.scrolling)), setTimeout(function() {
                            w(t), y(t)
                        }, 400)))
                    }(n), c = n.anchorLink, v.menu && (e(v.menu).find(".active").removeClass("active"), e(v.menu).find('[data-menuanchor="' + c + '"]').addClass("active")),
                    function(t, i) {
                        v.navigation && (e("#pp-nav").find(".active").removeClass("active"), t ? e("#pp-nav").find('a[href="#' + t + '"]').addClass("active") : e("#pp-nav").find("li").eq(i).find("a").addClass("active"))
                    }(n.anchorLink, n.sectionIndex), a = n.anchorLink;
                var d = (new Date).getTime();
                l = d
            }
        }

        function y(t) {
            e.isFunction(v.afterLoad) && v.afterLoad.call(this, t.anchorLink, t.sectionIndex + 1)
        }

        function w(t) {
            "up" === t.yMovement && t.sectionsToMove.each(function(i) {
                e(this).css(x(t.scrolling))
            })
        }

        function x(e) {
            return "vertical" === v.direction ? {
                top: e
            } : {
                left: e
            }
        }

        function C(t) {
            t = t.replace("#", ""), e("body")[0].className = e("body")[0].className.replace(/\b\s?pp-viewing-[^\s]+\b/g, ""), e("body").addClass("pp-viewing-" + t)
        }

        function S() {
            return (new Date).getTime() - l < m + v.scrollingSpeed
        }

        function E(e, t, i) {
            e.toggleClass("pp-easing", i), e.css(function(e) {
                return {
                    "-webkit-transform": e,
                    "-moz-transform": e,
                    "-ms-transform": e,
                    transform: e
                }
            }(t))
        }
        e(".pp-section").each(function(t) {
            e(this).data("data-index", t), e(this).css("z-index", g), t || 0 !== e(".pp-section.active").length || e(this).addClass("active"), void 0 !== v.anchors[t] && e(this).attr("data-anchor", v.anchors[t]), void 0 !== v.sectionsColor[t] && e(this).css("background-color", v.sectionsColor[t]), v.verticalCentered && !e(this).hasClass("pp-scrollable") && e(this).addClass("pp-table").wrapInner('<div class="pp-tableCell" style="height:100%" />'), g -= 1
        }).promise().done(function() {
            v.navigation && (e("#pp-nav").css("margin-top", "-" + e("#pp-nav").height() / 2 + "px"), e("#pp-nav").find("li").eq(e(".pp-section.active").index(".pp-section")).find("a").addClass("active")), e(i).on("load", function() {
                var s, n;
                s = i.location.hash.replace("#", ""), (n = e(t).find('.pp-section[data-anchor="' + s + '"]')).length > 0 && b(n, v.animateAnchor)
            }), e.isFunction(v.afterRender) && v.afterRender.call(this)
        }), e(i).on("hashchange", function() {
            var s = i.location.hash.replace("#", "").split("/")[0];
            if (s.length) {
                if (s && s !== a) b(isNaN(s) ? e(t).find('[data-anchor="' + s + '"]') : e(".pp-section").eq(s - 1))
            }
        }), e(t).keydown(function(t) {
            if (v.keyboardScrolling && !S()) switch (t.which) {
                case 38:
                case 33:
                    r.moveSectionUp();
                    break;
                case 40:
                case 34:
                    r.moveSectionDown();
                    break;
                case 36:
                    r.moveTo(1);
                    break;
                case 35:
                    r.moveTo(e(".pp-section").length);
                    break;
                case 37:
                    r.moveSectionUp();
                    break;
                case 39:
                    r.moveSectionDown();
                    break;
                default:
                    return
            }
        }), v.normalScrollElements && (e(t).on("mouseenter", v.normalScrollElements, function() {
            r.setMouseWheelScrolling(!1)
        }), e(t).on("mouseleave", v.normalScrollElements, function() {
            r.setMouseWheelScrolling(!0)
        }));
        var T = (new Date).getTime();

        function M(t) {
            var s = (new Date).getTime(),
                n = (t = t || i.event).wheelDelta || -t.deltaY || -t.detail,
                a = Math.max(-1, Math.min(1, n)),
                r = void 0 !== t.wheelDeltaX || void 0 !== t.deltaX,
                o = Math.abs(t.wheelDeltaX) < Math.abs(t.wheelDelta) || Math.abs(t.deltaX) < Math.abs(t.deltaY) || !r;
            f.length > 149 && f.shift(), f.push(Math.abs(n));
            var l = s - T;
            if (T = s, l > 200 && (f = []), !S()) {
                var c = $(e(".pp-section.active"));
                return k(f, 10) >= k(f, 70) && o && (a < 0 ? P("down", c) : a > 0 && P("up", c)), !1
            }
        }

        function k(e, t) {
            for (var i = 0, s = e.slice(Math.max(e.length - t, 1)), n = 0; n < s.length; n++) i += s[n];
            return Math.ceil(i / t)
        }

        function P(e, t) {
            var i, s;
            if ("down" == e ? (i = "bottom", s = r.moveSectionDown) : (i = "top", s = r.moveSectionUp), t.length > 0) {
                if (! function(e, t) {
                        if ("top" === e) return !t.scrollTop();
                        if ("bottom" === e) return t.scrollTop() + 1 + t.innerHeight() >= t[0].scrollHeight
                    }(i, t)) return !0;
                s()
            } else s()
        }

        function $(e) {
            return e.filter(".pp-scrollable")
        }

        function L() {
            return i.PointerEvent ? {
                down: "pointerdown",
                move: "pointermove",
                up: "pointerup"
            } : {
                down: "MSPointerDown",
                move: "MSPointerMove",
                up: "MSPointerUp"
            }
        }

        function z(e) {
            var t = new Array;
            return t.y = void 0 !== e.pageY && (e.pageY || e.pageX) ? e.pageY : e.touches[0].pageY, t.x = void 0 !== e.pageX && (e.pageY || e.pageX) ? e.pageX : e.touches[0].pageX, t
        }

        function I(e) {
            return void 0 === e.pointerType || "mouse" != e.pointerType
        }

        function A(e) {
            var t = e.originalEvent;
            if (I(t)) {
                var i = z(t);
                d = i.y, h = i.x
            }
        }

        function O(t) {
            var i = t.originalEvent;
            if (! function t(i, s) {
                    s = s || 0;
                    var n = e(i).parent();
                    return !!(s < v.normalScrollElementTouchThreshold && n.is(v.normalScrollElements)) || s != v.normalScrollElementTouchThreshold && t(n, ++s)
                }(t.target) && I(i)) {
                var s = $(e(".pp-section.active"));
                if (s.length || t.preventDefault(), !S()) {
                    var n = z(i);
                    u = n.y, p = n.x, "horizontal" === v.direction && Math.abs(h - p) > Math.abs(d - u) ? Math.abs(h - p) > o.width() / 100 * v.touchSensitivity && (h > p ? P("down", s) : p > h && P("up", s)) : Math.abs(d - u) > o.height() / 100 * v.touchSensitivity && (d > u ? P("down", s) : u > d && P("up", s))
                }
            }
        }

        function D() {
            return "vertical" !== v.direction ? "translate3d(-100%, 0px, 0px)" : "translate3d(0px, -100%, 0px)"
        }
        e(t).on("click touchstart", "#pp-nav a", function(t) {
            t.preventDefault();
            var i = e(this).parent().index();
            b(e(".pp-section").eq(i))
        }), e(t).on({
            mouseenter: function() {
                var t = e(this).data("tooltip");
                e('<div class="pp-tooltip ' + v.navigation.position + '">' + t + "</div>").hide().appendTo(e(this)).fadeIn(200)
            },
            mouseleave: function() {
                e(this).find(".pp-tooltip").fadeOut(200, function() {
                    e(this).remove()
                })
            }
        }, "#pp-nav li")
    }
}(jQuery, document, window),
function(e) {
    "use strict";
    if ("function" == typeof define && define.amd) define(["jquery"], e);
    else if ("object" == typeof exports) e(require("jquery"));
    else {
        if ("undefined" == typeof jQuery) throw "jquery-numerator requires jQuery to be loaded first";
        e(jQuery)
    }
}(function(e) {
    var t = "numerator",
        i = {
            easing: "swing",
            duration: 500,
            delimiter: void 0,
            rounding: 0,
            toValue: void 0,
            fromValue: void 0,
            queue: !1,
            onStart: function() {},
            onStep: function() {},
            onProgress: function() {},
            onComplete: function() {}
        };

    function s(s, n) {
        this.element = s, this.settings = e.extend({}, i, n), this._defaults = i, this._name = t, this.init()
    }
    s.prototype = {
        init: function() {
            this.parseElement(), this.setValue()
        },
        parseElement: function() {
            var t = e.trim(e(this.element).text());
            this.settings.fromValue = this.settings.fromValue || this.format(t)
        },
        setValue: function() {
            var t = this;
            e({
                value: t.settings.fromValue
            }).animate({
                value: t.settings.toValue
            }, {
                duration: parseInt(t.settings.duration, 10),
                easing: t.settings.easing,
                start: t.settings.onStart,
                step: function(i, s) {
                    e(t.element).text(t.format(i)), t.settings.onStep(i, s)
                },
                progress: t.settings.onProgress,
                complete: t.settings.onComplete
            })
        },
        format: function(e) {
            return e = parseInt(this.settings.rounding) < 1 ? parseInt(e, 10) : parseFloat(e).toFixed(parseInt(this.settings.rounding)), this.settings.delimiter ? this.delimit(e) : e
        },
        delimit: function(e) {
            if (e = e.toString(), this.settings.rounding && parseInt(this.settings.rounding, 10) > 0) {
                var t = e.substring(e.length - (this.settings.rounding + 1), e.length),
                    i = e.substring(0, e.length - (this.settings.rounding + 1));
                return this.addDelimiter(i) + t
            }
            return this.addDelimiter(e)
        },
        addDelimiter: function(e) {
            return e.toString().replace(/\B(?=(\d{3})+(?!\d))/g, this.settings.delimiter)
        }
    }, e.fn[t] = function(i) {
        return this.each(function() {
            e.data(this, "plugin_" + t) && e.data(this, "plugin_" + t, null), e.data(this, "plugin_" + t, new s(this, i))
        })
    }
}),
function(e) {
    "function" == typeof define && define.amd ? define(["jquery"], e) : "object" == typeof module && module.exports ? module.exports = e(require("jquery")) : e(jQuery)
}(function(e) {
    e.extend(e.fn, {
        validate: function(t) {
            if (this.length) {
                var i = e.data(this[0], "validator");
                return i || (this.attr("novalidate", "novalidate"), i = new e.validator(t, this[0]), e.data(this[0], "validator", i), i.settings.onsubmit && (this.on("click.validate", ":submit", function(t) {
                    i.submitButton = t.currentTarget, e(this).hasClass("cancel") && (i.cancelSubmit = !0), void 0 !== e(this).attr("formnovalidate") && (i.cancelSubmit = !0)
                }), this.on("submit.validate", function(t) {
                    function s() {
                        var s, n;
                        return i.submitButton && (i.settings.submitHandler || i.formSubmitted) && (s = e("<input type='hidden'/>").attr("name", i.submitButton.name).val(e(i.submitButton).val()).appendTo(i.currentForm)), !(i.settings.submitHandler && !i.settings.debug) || (n = i.settings.submitHandler.call(i, i.currentForm, t), s && s.remove(), void 0 !== n && n)
                    }
                    return i.settings.debug && t.preventDefault(), i.cancelSubmit ? (i.cancelSubmit = !1, s()) : i.form() ? i.pendingRequest ? (i.formSubmitted = !0, !1) : s() : (i.focusInvalid(), !1)
                })), i)
            }
            t && t.debug && window.console && console.warn("Nothing selected, can't validate, returning nothing.")
        },
        valid: function() {
            var t, i, s;
            return e(this[0]).is("form") ? t = this.validate().form() : (s = [], t = !0, i = e(this[0].form).validate(), this.each(function() {
                (t = i.element(this) && t) || (s = s.concat(i.errorList))
            }), i.errorList = s), t
        },
        rules: function(t, i) {
            var s, n, a, r, o, l, c = this[0],
                d = void 0 !== this.attr("contenteditable") && "false" !== this.attr("contenteditable");
            if (null != c && (!c.form && d && (c.form = this.closest("form")[0], c.name = this.attr("name")), null != c.form)) {
                if (t) switch (s = e.data(c.form, "validator").settings, n = s.rules, a = e.validator.staticRules(c), t) {
                    case "add":
                        e.extend(a, e.validator.normalizeRule(i)), delete a.messages, n[c.name] = a, i.messages && (s.messages[c.name] = e.extend(s.messages[c.name], i.messages));
                        break;
                    case "remove":
                        return i ? (l = {}, e.each(i.split(/\s/), function(e, t) {
                            l[t] = a[t], delete a[t]
                        }), l) : (delete n[c.name], a)
                }
                return (r = e.validator.normalizeRules(e.extend({}, e.validator.classRules(c), e.validator.attributeRules(c), e.validator.dataRules(c), e.validator.staticRules(c)), c)).required && (o = r.required, delete r.required, r = e.extend({
                    required: o
                }, r)), r.remote && (o = r.remote, delete r.remote, r = e.extend(r, {
                    remote: o
                })), r
            }
        }
    });
    var t = function(e) {
        return e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "")
    };
    e.extend(e.expr.pseudos || e.expr[":"], {
        blank: function(i) {
            return !t("" + e(i).val())
        },
        filled: function(i) {
            var s = e(i).val();
            return null !== s && !!t("" + s)
        },
        unchecked: function(t) {
            return !e(t).prop("checked")
        }
    }), e.validator = function(t, i) {
        this.settings = e.extend(!0, {}, e.validator.defaults, t), this.currentForm = i, this.init()
    }, e.validator.format = function(t, i) {
        return 1 === arguments.length ? function() {
            var i = e.makeArray(arguments);
            return i.unshift(t), e.validator.format.apply(this, i)
        } : void 0 === i ? t : (arguments.length > 2 && i.constructor !== Array && (i = e.makeArray(arguments).slice(1)), i.constructor !== Array && (i = [i]), e.each(i, function(e, i) {
            t = t.replace(new RegExp("\\{" + e + "\\}", "g"), function() {
                return i
            })
        }), t)
    }, e.extend(e.validator, {
        defaults: {
            messages: {},
            groups: {},
            rules: {},
            errorClass: "error",
            pendingClass: "pending",
            validClass: "valid",
            errorElement: "label",
            focusCleanup: !1,
            focusInvalid: !0,
            errorContainer: e([]),
            errorLabelContainer: e([]),
            onsubmit: !0,
            ignore: ":hidden",
            ignoreTitle: !1,
            onfocusin: function(e) {
                this.lastActive = e, this.settings.focusCleanup && (this.settings.unhighlight && this.settings.unhighlight.call(this, e, this.settings.errorClass, this.settings.validClass), this.hideThese(this.errorsFor(e)))
            },
            onfocusout: function(e) {
                this.checkable(e) || !(e.name in this.submitted) && this.optional(e) || this.element(e)
            },
            onkeyup: function(t, i) {
                9 === i.which && "" === this.elementValue(t) || -1 !== e.inArray(i.keyCode, [16, 17, 18, 20, 35, 36, 37, 38, 39, 40, 45, 144, 225]) || (t.name in this.submitted || t.name in this.invalid) && this.element(t)
            },
            onclick: function(e) {
                e.name in this.submitted ? this.element(e) : e.parentNode.name in this.submitted && this.element(e.parentNode)
            },
            highlight: function(t, i, s) {
                "radio" === t.type ? this.findByName(t.name).addClass(i).removeClass(s) : e(t).addClass(i).removeClass(s)
            },
            unhighlight: function(t, i, s) {
                "radio" === t.type ? this.findByName(t.name).removeClass(i).addClass(s) : e(t).removeClass(i).addClass(s)
            }
        },
        setDefaults: function(t) {
            e.extend(e.validator.defaults, t)
        },
        messages: {
            required: "This field is required.",
            remote: "Please fix this field.",
            email: "Please enter a valid email address.",
            url: "Please enter a valid URL.",
            date: "Please enter a valid date.",
            dateISO: "Please enter a valid date (ISO).",
            number: "Please enter a valid number.",
            digits: "Please enter only digits.",
            equalTo: "Please enter the same value again.",
            maxlength: e.validator.format("Please enter no more than {0} characters."),
            minlength: e.validator.format("Please enter at least {0} characters."),
            rangelength: e.validator.format("Please enter a value between {0} and {1} characters long."),
            range: e.validator.format("Please enter a value between {0} and {1}."),
            max: e.validator.format("Please enter a value less than or equal to {0}."),
            min: e.validator.format("Please enter a value greater than or equal to {0}."),
            step: e.validator.format("Please enter a multiple of {0}.")
        },
        autoCreateRanges: !1,
        prototype: {
            init: function() {
                function t(t) {
                    var i = void 0 !== e(this).attr("contenteditable") && "false" !== e(this).attr("contenteditable");
                    if (!this.form && i && (this.form = e(this).closest("form")[0], this.name = e(this).attr("name")), s === this.form) {
                        var n = e.data(this.form, "validator"),
                            a = "on" + t.type.replace(/^validate/, ""),
                            r = n.settings;
                        r[a] && !e(this).is(r.ignore) && r[a].call(n, this, t)
                    }
                }
                this.labelContainer = e(this.settings.errorLabelContainer), this.errorContext = this.labelContainer.length && this.labelContainer || e(this.currentForm), this.containers = e(this.settings.errorContainer).add(this.settings.errorLabelContainer), this.submitted = {}, this.valueCache = {}, this.pendingRequest = 0, this.pending = {}, this.invalid = {}, this.reset();
                var i, s = this.currentForm,
                    n = this.groups = {};
                e.each(this.settings.groups, function(t, i) {
                    "string" == typeof i && (i = i.split(/\s/)), e.each(i, function(e, i) {
                        n[i] = t
                    })
                }), i = this.settings.rules, e.each(i, function(t, s) {
                    i[t] = e.validator.normalizeRule(s)
                }), e(this.currentForm).on("focusin.validate focusout.validate keyup.validate", ":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'], [type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], [type='radio'], [type='checkbox'], [contenteditable], [type='button']", t).on("click.validate", "select, option, [type='radio'], [type='checkbox']", t), this.settings.invalidHandler && e(this.currentForm).on("invalid-form.validate", this.settings.invalidHandler)
            },
            form: function() {
                return this.checkForm(), e.extend(this.submitted, this.errorMap), this.invalid = e.extend({}, this.errorMap), this.valid() || e(this.currentForm).triggerHandler("invalid-form", [this]), this.showErrors(), this.valid()
            },
            checkForm: function() {
                this.prepareForm();
                for (var e = 0, t = this.currentElements = this.elements(); t[e]; e++) this.check(t[e]);
                return this.valid()
            },
            element: function(t) {
                var i, s, n = this.clean(t),
                    a = this.validationTargetFor(n),
                    r = this,
                    o = !0;
                return void 0 === a ? delete this.invalid[n.name] : (this.prepareElement(a), this.currentElements = e(a), (s = this.groups[a.name]) && e.each(this.groups, function(e, t) {
                    t === s && e !== a.name && ((n = r.validationTargetFor(r.clean(r.findByName(e)))) && n.name in r.invalid && (r.currentElements.push(n), o = r.check(n) && o))
                }), i = !1 !== this.check(a), o = o && i, this.invalid[a.name] = !i, this.numberOfInvalids() || (this.toHide = this.toHide.add(this.containers)), this.showErrors(), e(t).attr("aria-invalid", !i)), o
            },
            showErrors: function(t) {
                if (t) {
                    var i = this;
                    e.extend(this.errorMap, t), this.errorList = e.map(this.errorMap, function(e, t) {
                        return {
                            message: e,
                            element: i.findByName(t)[0]
                        }
                    }), this.successList = e.grep(this.successList, function(e) {
                        return !(e.name in t)
                    })
                }
                this.settings.showErrors ? this.settings.showErrors.call(this, this.errorMap, this.errorList) : this.defaultShowErrors()
            },
            resetForm: function() {
                e.fn.resetForm && e(this.currentForm).resetForm(), this.invalid = {}, this.submitted = {}, this.prepareForm(), this.hideErrors();
                var t = this.elements().removeData("previousValue").removeAttr("aria-invalid");
                this.resetElements(t)
            },
            resetElements: function(e) {
                var t;
                if (this.settings.unhighlight)
                    for (t = 0; e[t]; t++) this.settings.unhighlight.call(this, e[t], this.settings.errorClass, ""), this.findByName(e[t].name).removeClass(this.settings.validClass);
                else e.removeClass(this.settings.errorClass).removeClass(this.settings.validClass)
            },
            numberOfInvalids: function() {
                return this.objectLength(this.invalid)
            },
            objectLength: function(e) {
                var t, i = 0;
                for (t in e) void 0 !== e[t] && null !== e[t] && !1 !== e[t] && i++;
                return i
            },
            hideErrors: function() {
                this.hideThese(this.toHide)
            },
            hideThese: function(e) {
                e.not(this.containers).text(""), this.addWrapper(e).hide()
            },
            valid: function() {
                return 0 === this.size()
            },
            size: function() {
                return this.errorList.length
            },
            focusInvalid: function() {
                if (this.settings.focusInvalid) try {
                    e(this.findLastActive() || this.errorList.length && this.errorList[0].element || []).filter(":visible").trigger("focus").trigger("focusin")
                } catch (e) {}
            },
            findLastActive: function() {
                var t = this.lastActive;
                return t && 1 === e.grep(this.errorList, function(e) {
                    return e.element.name === t.name
                }).length && t
            },
            elements: function() {
                var t = this,
                    i = {};
                return e(this.currentForm).find("input, select, textarea, [contenteditable]").not(":submit, :reset, :image, :disabled").not(this.settings.ignore).filter(function() {
                    var s = this.name || e(this).attr("name"),
                        n = void 0 !== e(this).attr("contenteditable") && "false" !== e(this).attr("contenteditable");
                    return !s && t.settings.debug && window.console && console.error("%o has no name assigned", this), n && (this.form = e(this).closest("form")[0], this.name = s), !(this.form !== t.currentForm || s in i || !t.objectLength(e(this).rules()) || (i[s] = !0, 0))
                })
            },
            clean: function(t) {
                return e(t)[0]
            },
            errors: function() {
                var t = this.settings.errorClass.split(" ").join(".");
                return e(this.settings.errorElement + "." + t, this.errorContext)
            },
            resetInternals: function() {
                this.successList = [], this.errorList = [], this.errorMap = {}, this.toShow = e([]), this.toHide = e([])
            },
            reset: function() {
                this.resetInternals(), this.currentElements = e([])
            },
            prepareForm: function() {
                this.reset(), this.toHide = this.errors().add(this.containers)
            },
            prepareElement: function(e) {
                this.reset(), this.toHide = this.errorsFor(e)
            },
            elementValue: function(t) {
                var i, s, n = e(t),
                    a = t.type,
                    r = void 0 !== n.attr("contenteditable") && "false" !== n.attr("contenteditable");
                return "radio" === a || "checkbox" === a ? this.findByName(t.name).filter(":checked").val() : "number" === a && void 0 !== t.validity ? t.validity.badInput ? "NaN" : n.val() : (i = r ? n.text() : n.val(), "file" === a ? "C:\\fakepath\\" === i.substr(0, 12) ? i.substr(12) : (s = i.lastIndexOf("/")) >= 0 ? i.substr(s + 1) : (s = i.lastIndexOf("\\")) >= 0 ? i.substr(s + 1) : i : "string" == typeof i ? i.replace(/\r/g, "") : i)
            },
            check: function(t) {
                t = this.validationTargetFor(this.clean(t));
                var i, s, n, a, r = e(t).rules(),
                    o = e.map(r, function(e, t) {
                        return t
                    }).length,
                    l = !1,
                    c = this.elementValue(t);
                for (s in "function" == typeof r.normalizer ? a = r.normalizer : "function" == typeof this.settings.normalizer && (a = this.settings.normalizer), a && (c = a.call(t, c), delete r.normalizer), r) {
                    n = {
                        method: s,
                        parameters: r[s]
                    };
                    try {
                        if ("dependency-mismatch" === (i = e.validator.methods[s].call(this, c, t, n.parameters)) && 1 === o) {
                            l = !0;
                            continue
                        }
                        if (l = !1, "pending" === i) return void(this.toHide = this.toHide.not(this.errorsFor(t)));
                        if (!i) return this.formatAndAdd(t, n), !1
                    } catch (e) {
                        throw this.settings.debug && window.console && console.log("Exception occurred when checking element " + t.id + ", check the '" + n.method + "' method.", e), e instanceof TypeError && (e.message += ".  Exception occurred when checking element " + t.id + ", check the '" + n.method + "' method."), e
                    }
                }
                if (!l) return this.objectLength(r) && this.successList.push(t), !0
            },
            customDataMessage: function(t, i) {
                return e(t).data("msg" + i.charAt(0).toUpperCase() + i.substring(1).toLowerCase()) || e(t).data("msg")
            },
            customMessage: function(e, t) {
                var i = this.settings.messages[e];
                return i && (i.constructor === String ? i : i[t])
            },
            findDefined: function() {
                for (var e = 0; e < arguments.length; e++)
                    if (void 0 !== arguments[e]) return arguments[e]
            },
            defaultMessage: function(t, i) {
                "string" == typeof i && (i = {
                    method: i
                });
                var s = this.findDefined(this.customMessage(t.name, i.method), this.customDataMessage(t, i.method), !this.settings.ignoreTitle && t.title || void 0, e.validator.messages[i.method], "<strong>Warning: No message defined for " + t.name + "</strong>"),
                    n = /\$?\{(\d+)\}/g;
                return "function" == typeof s ? s = s.call(this, i.parameters, t) : n.test(s) && (s = e.validator.format(s.replace(n, "{$1}"), i.parameters)), s
            },
            formatAndAdd: function(e, t) {
                var i = this.defaultMessage(e, t);
                this.errorList.push({
                    message: i,
                    element: e,
                    method: t.method
                }), this.errorMap[e.name] = i, this.submitted[e.name] = i
            },
            addWrapper: function(e) {
                return this.settings.wrapper && (e = e.add(e.parent(this.settings.wrapper))), e
            },
            defaultShowErrors: function() {
                var e, t, i;
                for (e = 0; this.errorList[e]; e++) i = this.errorList[e], this.settings.highlight && this.settings.highlight.call(this, i.element, this.settings.errorClass, this.settings.validClass), this.showLabel(i.element, i.message);
                if (this.errorList.length && (this.toShow = this.toShow.add(this.containers)), this.settings.success)
                    for (e = 0; this.successList[e]; e++) this.showLabel(this.successList[e]);
                if (this.settings.unhighlight)
                    for (e = 0, t = this.validElements(); t[e]; e++) this.settings.unhighlight.call(this, t[e], this.settings.errorClass, this.settings.validClass);
                this.toHide = this.toHide.not(this.toShow), this.hideErrors(), this.addWrapper(this.toShow).show()
            },
            validElements: function() {
                return this.currentElements.not(this.invalidElements())
            },
            invalidElements: function() {
                return e(this.errorList).map(function() {
                    return this.element
                })
            },
            showLabel: function(t, i) {
                var s, n, a, r, o = this.errorsFor(t),
                    l = this.idOrName(t),
                    c = e(t).attr("aria-describedby");
                o.length ? (o.removeClass(this.settings.validClass).addClass(this.settings.errorClass), o.html(i)) : (s = o = e("<" + this.settings.errorElement + ">").attr("id", l + "-error").addClass(this.settings.errorClass).html(i || ""), this.settings.wrapper && (s = o.hide().show().wrap("<" + this.settings.wrapper + "/>").parent()), this.labelContainer.length ? this.labelContainer.append(s) : this.settings.errorPlacement ? this.settings.errorPlacement.call(this, s, e(t)) : s.insertAfter(t), o.is("label") ? o.attr("for", l) : 0 === o.parents("label[for='" + this.escapeCssMeta(l) + "']").length && (a = o.attr("id"), c ? c.match(new RegExp("\\b" + this.escapeCssMeta(a) + "\\b")) || (c += " " + a) : c = a, e(t).attr("aria-describedby", c), (n = this.groups[t.name]) && (r = this, e.each(r.groups, function(t, i) {
                    i === n && e("[name='" + r.escapeCssMeta(t) + "']", r.currentForm).attr("aria-describedby", o.attr("id"))
                })))), !i && this.settings.success && (o.text(""), "string" == typeof this.settings.success ? o.addClass(this.settings.success) : this.settings.success(o, t)), this.toShow = this.toShow.add(o)
            },
            errorsFor: function(t) {
                var i = this.escapeCssMeta(this.idOrName(t)),
                    s = e(t).attr("aria-describedby"),
                    n = "label[for='" + i + "'], label[for='" + i + "'] *";
                return s && (n = n + ", #" + this.escapeCssMeta(s).replace(/\s+/g, ", #")), this.errors().filter(n)
            },
            escapeCssMeta: function(e) {
                return e.replace(/([\\!"#$%&'()*+,.\/:;<=>?@\[\]^`{|}~])/g, "\\$1")
            },
            idOrName: function(e) {
                return this.groups[e.name] || (this.checkable(e) ? e.name : e.id || e.name)
            },
            validationTargetFor: function(t) {
                return this.checkable(t) && (t = this.findByName(t.name)), e(t).not(this.settings.ignore)[0]
            },
            checkable: function(e) {
                return /radio|checkbox/i.test(e.type)
            },
            findByName: function(t) {
                return e(this.currentForm).find("[name='" + this.escapeCssMeta(t) + "']")
            },
            getLength: function(t, i) {
                switch (i.nodeName.toLowerCase()) {
                    case "select":
                        return e("option:selected", i).length;
                    case "input":
                        if (this.checkable(i)) return this.findByName(i.name).filter(":checked").length
                }
                return t.length
            },
            depend: function(e, t) {
                return !this.dependTypes[typeof e] || this.dependTypes[typeof e](e, t)
            },
            dependTypes: {
                boolean: function(e) {
                    return e
                },
                string: function(t, i) {
                    return !!e(t, i.form).length
                },
                function: function(e, t) {
                    return e(t)
                }
            },
            optional: function(t) {
                var i = this.elementValue(t);
                return !e.validator.methods.required.call(this, i, t) && "dependency-mismatch"
            },
            startRequest: function(t) {
                this.pending[t.name] || (this.pendingRequest++, e(t).addClass(this.settings.pendingClass), this.pending[t.name] = !0)
            },
            stopRequest: function(t, i) {
                this.pendingRequest--, this.pendingRequest < 0 && (this.pendingRequest = 0), delete this.pending[t.name], e(t).removeClass(this.settings.pendingClass), i && 0 === this.pendingRequest && this.formSubmitted && this.form() ? (e(this.currentForm).submit(), this.submitButton && e("input:hidden[name='" + this.submitButton.name + "']", this.currentForm).remove(), this.formSubmitted = !1) : !i && 0 === this.pendingRequest && this.formSubmitted && (e(this.currentForm).triggerHandler("invalid-form", [this]), this.formSubmitted = !1)
            },
            previousValue: function(t, i) {
                return i = "string" == typeof i && i || "remote", e.data(t, "previousValue") || e.data(t, "previousValue", {
                    old: null,
                    valid: !0,
                    message: this.defaultMessage(t, {
                        method: i
                    })
                })
            },
            destroy: function() {
                this.resetForm(), e(this.currentForm).off(".validate").removeData("validator").find(".validate-equalTo-blur").off(".validate-equalTo").removeClass("validate-equalTo-blur").find(".validate-lessThan-blur").off(".validate-lessThan").removeClass("validate-lessThan-blur").find(".validate-lessThanEqual-blur").off(".validate-lessThanEqual").removeClass("validate-lessThanEqual-blur").find(".validate-greaterThanEqual-blur").off(".validate-greaterThanEqual").removeClass("validate-greaterThanEqual-blur").find(".validate-greaterThan-blur").off(".validate-greaterThan").removeClass("validate-greaterThan-blur")
            }
        },
        classRuleSettings: {
            required: {
                required: !0
            },
            email: {
                email: !0
            },
            url: {
                url: !0
            },
            date: {
                date: !0
            },
            dateISO: {
                dateISO: !0
            },
            number: {
                number: !0
            },
            digits: {
                digits: !0
            },
            creditcard: {
                creditcard: !0
            }
        },
        addClassRules: function(t, i) {
            t.constructor === String ? this.classRuleSettings[t] = i : e.extend(this.classRuleSettings, t)
        },
        classRules: function(t) {
            var i = {},
                s = e(t).attr("class");
            return s && e.each(s.split(" "), function() {
                this in e.validator.classRuleSettings && e.extend(i, e.validator.classRuleSettings[this])
            }), i
        },
        normalizeAttributeRule: function(e, t, i, s) {
            /min|max|step/.test(i) && (null === t || /number|range|text/.test(t)) && (s = Number(s), isNaN(s) && (s = void 0)), s || 0 === s ? e[i] = s : t === i && "range" !== t && (e[i] = !0)
        },
        attributeRules: function(t) {
            var i, s, n = {},
                a = e(t),
                r = t.getAttribute("type");
            for (i in e.validator.methods) "required" === i ? ("" === (s = t.getAttribute(i)) && (s = !0), s = !!s) : s = a.attr(i), this.normalizeAttributeRule(n, r, i, s);
            return n.maxlength && /-1|2147483647|524288/.test(n.maxlength) && delete n.maxlength, n
        },
        dataRules: function(t) {
            var i, s, n = {},
                a = e(t),
                r = t.getAttribute("type");
            for (i in e.validator.methods) "" === (s = a.data("rule" + i.charAt(0).toUpperCase() + i.substring(1).toLowerCase())) && (s = !0), this.normalizeAttributeRule(n, r, i, s);
            return n
        },
        staticRules: function(t) {
            var i = {},
                s = e.data(t.form, "validator");
            return s.settings.rules && (i = e.validator.normalizeRule(s.settings.rules[t.name]) || {}), i
        },
        normalizeRules: function(t, i) {
            return e.each(t, function(s, n) {
                if (!1 !== n) {
                    if (n.param || n.depends) {
                        var a = !0;
                        switch (typeof n.depends) {
                            case "string":
                                a = !!e(n.depends, i.form).length;
                                break;
                            case "function":
                                a = n.depends.call(i, i)
                        }
                        a ? t[s] = void 0 === n.param || n.param : (e.data(i.form, "validator").resetElements(e(i)), delete t[s])
                    }
                } else delete t[s]
            }), e.each(t, function(s, n) {
                t[s] = e.isFunction(n) && "normalizer" !== s ? n(i) : n
            }), e.each(["minlength", "maxlength"], function() {
                t[this] && (t[this] = Number(t[this]))
            }), e.each(["rangelength", "range"], function() {
                var i;
                t[this] && (e.isArray(t[this]) ? t[this] = [Number(t[this][0]), Number(t[this][1])] : "string" == typeof t[this] && (i = t[this].replace(/[\[\]]/g, "").split(/[\s,]+/), t[this] = [Number(i[0]), Number(i[1])]))
            }), e.validator.autoCreateRanges && (null != t.min && null != t.max && (t.range = [t.min, t.max], delete t.min, delete t.max), null != t.minlength && null != t.maxlength && (t.rangelength = [t.minlength, t.maxlength], delete t.minlength, delete t.maxlength)), t
        },
        normalizeRule: function(t) {
            if ("string" == typeof t) {
                var i = {};
                e.each(t.split(/\s/), function() {
                    i[this] = !0
                }), t = i
            }
            return t
        },
        addMethod: function(t, i, s) {
            e.validator.methods[t] = i, e.validator.messages[t] = void 0 !== s ? s : e.validator.messages[t], i.length < 3 && e.validator.addClassRules(t, e.validator.normalizeRule(t))
        },
        methods: {
            required: function(t, i, s) {
                if (!this.depend(s, i)) return "dependency-mismatch";
                if ("select" === i.nodeName.toLowerCase()) {
                    var n = e(i).val();
                    return n && n.length > 0
                }
                return this.checkable(i) ? this.getLength(t, i) > 0 : null != t && t.length > 0
            },
            email: function(e, t) {
                return this.optional(t) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(e)
            },
            url: function(e, t) {
                return this.optional(t) || /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[\/?#]\S*)?$/i.test(e)
            },
            date: function() {
                var e = !1;
                return function(t, i) {
                    return e || (e = !0, this.settings.debug && window.console && console.warn("The `date` method is deprecated and will be removed in version '2.0.0'.\nPlease don't use it, since it relies on the Date constructor, which\nbehaves very differently across browsers and locales. Use `dateISO`\ninstead or one of the locale specific methods in `localizations/`\nand `additional-methods.js`.")), this.optional(i) || !/Invalid|NaN/.test(new Date(t).toString())
                }
            }(),
            dateISO: function(e, t) {
                return this.optional(t) || /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(e)
            },
            number: function(e, t) {
                return this.optional(t) || /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(e)
            },
            digits: function(e, t) {
                return this.optional(t) || /^\d+$/.test(e)
            },
            minlength: function(t, i, s) {
                var n = e.isArray(t) ? t.length : this.getLength(t, i);
                return this.optional(i) || n >= s
            },
            maxlength: function(t, i, s) {
                var n = e.isArray(t) ? t.length : this.getLength(t, i);
                return this.optional(i) || n <= s
            },
            rangelength: function(t, i, s) {
                var n = e.isArray(t) ? t.length : this.getLength(t, i);
                return this.optional(i) || n >= s[0] && n <= s[1]
            },
            min: function(e, t, i) {
                return this.optional(t) || e >= i
            },
            max: function(e, t, i) {
                return this.optional(t) || e <= i
            },
            range: function(e, t, i) {
                return this.optional(t) || e >= i[0] && e <= i[1]
            },
            step: function(t, i, s) {
                var n, a = e(i).attr("type"),
                    r = "Step attribute on input type " + a + " is not supported.",
                    o = new RegExp("\\b" + a + "\\b"),
                    l = function(e) {
                        var t = ("" + e).match(/(?:\.(\d+))?$/);
                        return t && t[1] ? t[1].length : 0
                    },
                    c = function(e) {
                        return Math.round(e * Math.pow(10, n))
                    },
                    d = !0;
                if (a && !o.test(["text", "number", "range"].join())) throw new Error(r);
                return n = l(s), (l(t) > n || c(t) % c(s) != 0) && (d = !1), this.optional(i) || d
            },
            equalTo: function(t, i, s) {
                var n = e(s);
                return this.settings.onfocusout && n.not(".validate-equalTo-blur").length && n.addClass("validate-equalTo-blur").on("blur.validate-equalTo", function() {
                    e(i).valid()
                }), t === n.val()
            },
            remote: function(t, i, s, n) {
                if (this.optional(i)) return "dependency-mismatch";
                n = "string" == typeof n && n || "remote";
                var a, r, o, l = this.previousValue(i, n);
                return this.settings.messages[i.name] || (this.settings.messages[i.name] = {}), l.originalMessage = l.originalMessage || this.settings.messages[i.name][n], this.settings.messages[i.name][n] = l.message, s = "string" == typeof s && {
                    url: s
                } || s, o = e.param(e.extend({
                    data: t
                }, s.data)), l.old === o ? l.valid : (l.old = o, a = this, this.startRequest(i), (r = {})[i.name] = t, e.ajax(e.extend(!0, {
                    mode: "abort",
                    port: "validate" + i.name,
                    dataType: "json",
                    data: r,
                    context: a.currentForm,
                    success: function(e) {
                        var s, r, o, c = !0 === e || "true" === e;
                        a.settings.messages[i.name][n] = l.originalMessage, c ? (o = a.formSubmitted, a.resetInternals(), a.toHide = a.errorsFor(i), a.formSubmitted = o, a.successList.push(i), a.invalid[i.name] = !1, a.showErrors()) : (s = {}, r = e || a.defaultMessage(i, {
                            method: n,
                            parameters: t
                        }), s[i.name] = l.message = r, a.invalid[i.name] = !0, a.showErrors(s)), l.valid = c, a.stopRequest(i, c)
                    }
                }, s)), "pending")
            }
        }
    });
    var i, s = {};
    return e.ajaxPrefilter ? e.ajaxPrefilter(function(e, t, i) {
        var n = e.port;
        "abort" === e.mode && (s[n] && s[n].abort(), s[n] = i)
    }) : (i = e.ajax, e.ajax = function(t) {
        var n = ("mode" in t ? t : e.ajaxSettings).mode,
            a = ("port" in t ? t : e.ajaxSettings).port;
        return "abort" === n ? (s[a] && s[a].abort(), s[a] = i.apply(this, arguments), s[a]) : i.apply(this, arguments)
    }), e
}),
function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = e || self).Swiper = t()
}(this, function() {
    "use strict";

    function e(e) {
        return null !== e && "object" == typeof e && "constructor" in e && e.constructor === Object
    }

    function t(i, s) {
        void 0 === i && (i = {}), void 0 === s && (s = {}), Object.keys(s).forEach(function(n) {
            void 0 === i[n] ? i[n] = s[n] : e(s[n]) && e(i[n]) && Object.keys(s[n]).length > 0 && t(i[n], s[n])
        })
    }
    var i = "undefined" != typeof document ? document : {},
        s = {
            body: {},
            addEventListener: function() {},
            removeEventListener: function() {},
            activeElement: {
                blur: function() {},
                nodeName: ""
            },
            querySelector: function() {
                return null
            },
            querySelectorAll: function() {
                return []
            },
            getElementById: function() {
                return null
            },
            createEvent: function() {
                return {
                    initEvent: function() {}
                }
            },
            createElement: function() {
                return {
                    children: [],
                    childNodes: [],
                    style: {},
                    setAttribute: function() {},
                    getElementsByTagName: function() {
                        return []
                    }
                }
            },
            createElementNS: function() {
                return {}
            },
            importNode: function() {
                return null
            },
            location: {
                hash: "",
                host: "",
                hostname: "",
                href: "",
                origin: "",
                pathname: "",
                protocol: "",
                search: ""
            }
        };
    t(i, s);
    var n = "undefined" != typeof window ? window : {};
    t(n, {
        document: s,
        navigator: {
            userAgent: ""
        },
        location: {
            hash: "",
            host: "",
            hostname: "",
            href: "",
            origin: "",
            pathname: "",
            protocol: "",
            search: ""
        },
        history: {
            replaceState: function() {},
            pushState: function() {},
            go: function() {},
            back: function() {}
        },
        CustomEvent: function() {
            return this
        },
        addEventListener: function() {},
        removeEventListener: function() {},
        getComputedStyle: function() {
            return {
                getPropertyValue: function() {
                    return ""
                }
            }
        },
        Image: function() {},
        Date: function() {},
        screen: {},
        setTimeout: function() {},
        clearTimeout: function() {},
        matchMedia: function() {
            return {}
        }
    });
    var a = function(e) {
        for (var t = 0; t < e.length; t += 1) this[t] = e[t];
        return this.length = e.length, this
    };

    function r(e, t) {
        var s = [],
            r = 0;
        if (e && !t && e instanceof a) return e;
        if (e)
            if ("string" == typeof e) {
                var o, l, c = e.trim();
                if (c.indexOf("<") >= 0 && c.indexOf(">") >= 0) {
                    var d = "div";
                    for (0 === c.indexOf("<li") && (d = "ul"), 0 === c.indexOf("<tr") && (d = "tbody"), 0 !== c.indexOf("<td") && 0 !== c.indexOf("<th") || (d = "tr"), 0 === c.indexOf("<tbody") && (d = "table"), 0 === c.indexOf("<option") && (d = "select"), (l = i.createElement(d)).innerHTML = c, r = 0; r < l.childNodes.length; r += 1) s.push(l.childNodes[r])
                } else
                    for (o = t || "#" !== e[0] || e.match(/[ .<>:~]/) ? (t || i).querySelectorAll(e.trim()) : [i.getElementById(e.trim().split("#")[1])], r = 0; r < o.length; r += 1) o[r] && s.push(o[r])
            } else if (e.nodeType || e === n || e === i) s.push(e);
        else if (e.length > 0 && e[0].nodeType)
            for (r = 0; r < e.length; r += 1) s.push(e[r]);
        return new a(s)
    }

    function o(e) {
        for (var t = [], i = 0; i < e.length; i += 1) - 1 === t.indexOf(e[i]) && t.push(e[i]);
        return t
    }
    r.fn = a.prototype, r.Class = a, r.Dom7 = a;
    var l = {
        addClass: function(e) {
            if (void 0 === e) return this;
            for (var t = e.split(" "), i = 0; i < t.length; i += 1)
                for (var s = 0; s < this.length; s += 1) void 0 !== this[s] && void 0 !== this[s].classList && this[s].classList.add(t[i]);
            return this
        },
        removeClass: function(e) {
            for (var t = e.split(" "), i = 0; i < t.length; i += 1)
                for (var s = 0; s < this.length; s += 1) void 0 !== this[s] && void 0 !== this[s].classList && this[s].classList.remove(t[i]);
            return this
        },
        hasClass: function(e) {
            return !!this[0] && this[0].classList.contains(e)
        },
        toggleClass: function(e) {
            for (var t = e.split(" "), i = 0; i < t.length; i += 1)
                for (var s = 0; s < this.length; s += 1) void 0 !== this[s] && void 0 !== this[s].classList && this[s].classList.toggle(t[i]);
            return this
        },
        attr: function(e, t) {
            var i = arguments;
            if (1 === arguments.length && "string" == typeof e) return this[0] ? this[0].getAttribute(e) : void 0;
            for (var s = 0; s < this.length; s += 1)
                if (2 === i.length) this[s].setAttribute(e, t);
                else
                    for (var n in e) this[s][n] = e[n], this[s].setAttribute(n, e[n]);
            return this
        },
        removeAttr: function(e) {
            for (var t = 0; t < this.length; t += 1) this[t].removeAttribute(e);
            return this
        },
        data: function(e, t) {
            var i;
            if (void 0 !== t) {
                for (var s = 0; s < this.length; s += 1)(i = this[s]).dom7ElementDataStorage || (i.dom7ElementDataStorage = {}), i.dom7ElementDataStorage[e] = t;
                return this
            }
            if (i = this[0]) return i.dom7ElementDataStorage && e in i.dom7ElementDataStorage ? i.dom7ElementDataStorage[e] : i.getAttribute("data-" + e) || void 0
        },
        transform: function(e) {
            for (var t = 0; t < this.length; t += 1) {
                var i = this[t].style;
                i.webkitTransform = e, i.transform = e
            }
            return this
        },
        transition: function(e) {
            "string" != typeof e && (e += "ms");
            for (var t = 0; t < this.length; t += 1) {
                var i = this[t].style;
                i.webkitTransitionDuration = e, i.transitionDuration = e
            }
            return this
        },
        on: function() {
            for (var e, t = [], i = arguments.length; i--;) t[i] = arguments[i];
            var s = t[0],
                n = t[1],
                a = t[2],
                o = t[3];

            function l(e) {
                var t = e.target;
                if (t) {
                    var i = e.target.dom7EventData || [];
                    if (i.indexOf(e) < 0 && i.unshift(e), r(t).is(n)) a.apply(t, i);
                    else
                        for (var s = r(t).parents(), o = 0; o < s.length; o += 1) r(s[o]).is(n) && a.apply(s[o], i)
                }
            }

            function c(e) {
                var t = e && e.target && e.target.dom7EventData || [];
                t.indexOf(e) < 0 && t.unshift(e), a.apply(this, t)
            }
            "function" == typeof t[1] && (s = (e = t)[0], a = e[1], o = e[2], n = void 0), o || (o = !1);
            for (var d, h = s.split(" "), u = 0; u < this.length; u += 1) {
                var p = this[u];
                if (n)
                    for (d = 0; d < h.length; d += 1) {
                        var f = h[d];
                        p.dom7LiveListeners || (p.dom7LiveListeners = {}), p.dom7LiveListeners[f] || (p.dom7LiveListeners[f] = []), p.dom7LiveListeners[f].push({
                            listener: a,
                            proxyListener: l
                        }), p.addEventListener(f, l, o)
                    } else
                        for (d = 0; d < h.length; d += 1) {
                            var m = h[d];
                            p.dom7Listeners || (p.dom7Listeners = {}), p.dom7Listeners[m] || (p.dom7Listeners[m] = []), p.dom7Listeners[m].push({
                                listener: a,
                                proxyListener: c
                            }), p.addEventListener(m, c, o)
                        }
            }
            return this
        },
        off: function() {
            for (var e, t = [], i = arguments.length; i--;) t[i] = arguments[i];
            var s = t[0],
                n = t[1],
                a = t[2],
                r = t[3];
            "function" == typeof t[1] && (s = (e = t)[0], a = e[1], r = e[2], n = void 0), r || (r = !1);
            for (var o = s.split(" "), l = 0; l < o.length; l += 1)
                for (var c = o[l], d = 0; d < this.length; d += 1) {
                    var h = this[d],
                        u = void 0;
                    if (!n && h.dom7Listeners ? u = h.dom7Listeners[c] : n && h.dom7LiveListeners && (u = h.dom7LiveListeners[c]), u && u.length)
                        for (var p = u.length - 1; p >= 0; p -= 1) {
                            var f = u[p];
                            a && f.listener === a || a && f.listener && f.listener.dom7proxy && f.listener.dom7proxy === a ? (h.removeEventListener(c, f.proxyListener, r), u.splice(p, 1)) : a || (h.removeEventListener(c, f.proxyListener, r), u.splice(p, 1))
                        }
                }
            return this
        },
        trigger: function() {
            for (var e = [], t = arguments.length; t--;) e[t] = arguments[t];
            for (var s = e[0].split(" "), a = e[1], r = 0; r < s.length; r += 1)
                for (var o = s[r], l = 0; l < this.length; l += 1) {
                    var c = this[l],
                        d = void 0;
                    try {
                        d = new n.CustomEvent(o, {
                            detail: a,
                            bubbles: !0,
                            cancelable: !0
                        })
                    } catch (e) {
                        (d = i.createEvent("Event")).initEvent(o, !0, !0), d.detail = a
                    }
                    c.dom7EventData = e.filter(function(e, t) {
                        return t > 0
                    }), c.dispatchEvent(d), c.dom7EventData = [], delete c.dom7EventData
                }
            return this
        },
        transitionEnd: function(e) {
            var t, i = ["webkitTransitionEnd", "transitionend"],
                s = this;

            function n(a) {
                if (a.target === this)
                    for (e.call(this, a), t = 0; t < i.length; t += 1) s.off(i[t], n)
            }
            if (e)
                for (t = 0; t < i.length; t += 1) s.on(i[t], n);
            return this
        },
        outerWidth: function(e) {
            if (this.length > 0) {
                if (e) {
                    var t = this.styles();
                    return this[0].offsetWidth + parseFloat(t.getPropertyValue("margin-right")) + parseFloat(t.getPropertyValue("margin-left"))
                }
                return this[0].offsetWidth
            }
            return null
        },
        outerHeight: function(e) {
            if (this.length > 0) {
                if (e) {
                    var t = this.styles();
                    return this[0].offsetHeight + parseFloat(t.getPropertyValue("margin-top")) + parseFloat(t.getPropertyValue("margin-bottom"))
                }
                return this[0].offsetHeight
            }
            return null
        },
        offset: function() {
            if (this.length > 0) {
                var e = this[0],
                    t = e.getBoundingClientRect(),
                    s = i.body,
                    a = e.clientTop || s.clientTop || 0,
                    r = e.clientLeft || s.clientLeft || 0,
                    o = e === n ? n.scrollY : e.scrollTop,
                    l = e === n ? n.scrollX : e.scrollLeft;
                return {
                    top: t.top + o - a,
                    left: t.left + l - r
                }
            }
            return null
        },
        css: function(e, t) {
            var i;
            if (1 === arguments.length) {
                if ("string" != typeof e) {
                    for (i = 0; i < this.length; i += 1)
                        for (var s in e) this[i].style[s] = e[s];
                    return this
                }
                if (this[0]) return n.getComputedStyle(this[0], null).getPropertyValue(e)
            }
            if (2 === arguments.length && "string" == typeof e) {
                for (i = 0; i < this.length; i += 1) this[i].style[e] = t;
                return this
            }
            return this
        },
        each: function(e) {
            if (!e) return this;
            for (var t = 0; t < this.length; t += 1)
                if (!1 === e.call(this[t], t, this[t])) return this;
            return this
        },
        html: function(e) {
            if (void 0 === e) return this[0] ? this[0].innerHTML : void 0;
            for (var t = 0; t < this.length; t += 1) this[t].innerHTML = e;
            return this
        },
        text: function(e) {
            if (void 0 === e) return this[0] ? this[0].textContent.trim() : null;
            for (var t = 0; t < this.length; t += 1) this[t].textContent = e;
            return this
        },
        is: function(e) {
            var t, s, o = this[0];
            if (!o || void 0 === e) return !1;
            if ("string" == typeof e) {
                if (o.matches) return o.matches(e);
                if (o.webkitMatchesSelector) return o.webkitMatchesSelector(e);
                if (o.msMatchesSelector) return o.msMatchesSelector(e);
                for (t = r(e), s = 0; s < t.length; s += 1)
                    if (t[s] === o) return !0;
                return !1
            }
            if (e === i) return o === i;
            if (e === n) return o === n;
            if (e.nodeType || e instanceof a) {
                for (t = e.nodeType ? [e] : e, s = 0; s < t.length; s += 1)
                    if (t[s] === o) return !0;
                return !1
            }
            return !1
        },
        index: function() {
            var e, t = this[0];
            if (t) {
                for (e = 0; null !== (t = t.previousSibling);) 1 === t.nodeType && (e += 1);
                return e
            }
        },
        eq: function(e) {
            if (void 0 === e) return this;
            var t, i = this.length;
            return new a(e > i - 1 ? [] : e < 0 ? (t = i + e) < 0 ? [] : [this[t]] : [this[e]])
        },
        append: function() {
            for (var e, t = [], s = arguments.length; s--;) t[s] = arguments[s];
            for (var n = 0; n < t.length; n += 1) {
                e = t[n];
                for (var r = 0; r < this.length; r += 1)
                    if ("string" == typeof e) {
                        var o = i.createElement("div");
                        for (o.innerHTML = e; o.firstChild;) this[r].appendChild(o.firstChild)
                    } else if (e instanceof a)
                    for (var l = 0; l < e.length; l += 1) this[r].appendChild(e[l]);
                else this[r].appendChild(e)
            }
            return this
        },
        prepend: function(e) {
            var t, s;
            for (t = 0; t < this.length; t += 1)
                if ("string" == typeof e) {
                    var n = i.createElement("div");
                    for (n.innerHTML = e, s = n.childNodes.length - 1; s >= 0; s -= 1) this[t].insertBefore(n.childNodes[s], this[t].childNodes[0])
                } else if (e instanceof a)
                for (s = 0; s < e.length; s += 1) this[t].insertBefore(e[s], this[t].childNodes[0]);
            else this[t].insertBefore(e, this[t].childNodes[0]);
            return this
        },
        next: function(e) {
            return this.length > 0 ? e ? this[0].nextElementSibling && r(this[0].nextElementSibling).is(e) ? new a([this[0].nextElementSibling]) : new a([]) : this[0].nextElementSibling ? new a([this[0].nextElementSibling]) : new a([]) : new a([])
        },
        nextAll: function(e) {
            var t = [],
                i = this[0];
            if (!i) return new a([]);
            for (; i.nextElementSibling;) {
                var s = i.nextElementSibling;
                e ? r(s).is(e) && t.push(s) : t.push(s), i = s
            }
            return new a(t)
        },
        prev: function(e) {
            if (this.length > 0) {
                var t = this[0];
                return e ? t.previousElementSibling && r(t.previousElementSibling).is(e) ? new a([t.previousElementSibling]) : new a([]) : t.previousElementSibling ? new a([t.previousElementSibling]) : new a([])
            }
            return new a([])
        },
        prevAll: function(e) {
            var t = [],
                i = this[0];
            if (!i) return new a([]);
            for (; i.previousElementSibling;) {
                var s = i.previousElementSibling;
                e ? r(s).is(e) && t.push(s) : t.push(s), i = s
            }
            return new a(t)
        },
        parent: function(e) {
            for (var t = [], i = 0; i < this.length; i += 1) null !== this[i].parentNode && (e ? r(this[i].parentNode).is(e) && t.push(this[i].parentNode) : t.push(this[i].parentNode));
            return r(o(t))
        },
        parents: function(e) {
            for (var t = [], i = 0; i < this.length; i += 1)
                for (var s = this[i].parentNode; s;) e ? r(s).is(e) && t.push(s) : t.push(s), s = s.parentNode;
            return r(o(t))
        },
        closest: function(e) {
            var t = this;
            return void 0 === e ? new a([]) : (t.is(e) || (t = t.parents(e).eq(0)), t)
        },
        find: function(e) {
            for (var t = [], i = 0; i < this.length; i += 1)
                for (var s = this[i].querySelectorAll(e), n = 0; n < s.length; n += 1) t.push(s[n]);
            return new a(t)
        },
        children: function(e) {
            for (var t = [], i = 0; i < this.length; i += 1)
                for (var s = this[i].childNodes, n = 0; n < s.length; n += 1) e ? 1 === s[n].nodeType && r(s[n]).is(e) && t.push(s[n]) : 1 === s[n].nodeType && t.push(s[n]);
            return new a(o(t))
        },
        filter: function(e) {
            for (var t = [], i = 0; i < this.length; i += 1) e.call(this[i], i, this[i]) && t.push(this[i]);
            return new a(t)
        },
        remove: function() {
            for (var e = 0; e < this.length; e += 1) this[e].parentNode && this[e].parentNode.removeChild(this[e]);
            return this
        },
        add: function() {
            for (var e = [], t = arguments.length; t--;) e[t] = arguments[t];
            var i, s, n = this;
            for (i = 0; i < e.length; i += 1) {
                var a = r(e[i]);
                for (s = 0; s < a.length; s += 1) n[n.length] = a[s], n.length += 1
            }
            return n
        },
        styles: function() {
            return this[0] ? n.getComputedStyle(this[0], null) : {}
        }
    };
    Object.keys(l).forEach(function(e) {
        r.fn[e] = r.fn[e] || l[e]
    });
    var c = {
            deleteProps: function(e) {
                var t = e;
                Object.keys(t).forEach(function(e) {
                    try {
                        t[e] = null
                    } catch (e) {}
                    try {
                        delete t[e]
                    } catch (e) {}
                })
            },
            nextTick: function(e, t) {
                return void 0 === t && (t = 0), setTimeout(e, t)
            },
            now: function() {
                return Date.now()
            },
            getTranslate: function(e, t) {
                var i, s, a;
                void 0 === t && (t = "x");
                var r = n.getComputedStyle(e, null);
                return n.WebKitCSSMatrix ? ((s = r.transform || r.webkitTransform).split(",").length > 6 && (s = s.split(", ").map(function(e) {
                    return e.replace(",", ".")
                }).join(", ")), a = new n.WebKitCSSMatrix("none" === s ? "" : s)) : i = (a = r.MozTransform || r.OTransform || r.MsTransform || r.msTransform || r.transform || r.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,")).toString().split(","), "x" === t && (s = n.WebKitCSSMatrix ? a.m41 : 16 === i.length ? parseFloat(i[12]) : parseFloat(i[4])), "y" === t && (s = n.WebKitCSSMatrix ? a.m42 : 16 === i.length ? parseFloat(i[13]) : parseFloat(i[5])), s || 0
            },
            parseUrlQuery: function(e) {
                var t, i, s, a, r = {},
                    o = e || n.location.href;
                if ("string" == typeof o && o.length)
                    for (a = (i = (o = o.indexOf("?") > -1 ? o.replace(/\S*\?/, "") : "").split("&").filter(function(e) {
                            return "" !== e
                        })).length, t = 0; t < a; t += 1) s = i[t].replace(/#\S+/g, "").split("="), r[decodeURIComponent(s[0])] = void 0 === s[1] ? void 0 : decodeURIComponent(s[1]) || "";
                return r
            },
            isObject: function(e) {
                return "object" == typeof e && null !== e && e.constructor && e.constructor === Object
            },
            extend: function() {
                for (var e = [], t = arguments.length; t--;) e[t] = arguments[t];
                for (var i = Object(e[0]), s = 1; s < e.length; s += 1) {
                    var n = e[s];
                    if (null != n)
                        for (var a = Object.keys(Object(n)), r = 0, o = a.length; r < o; r += 1) {
                            var l = a[r],
                                d = Object.getOwnPropertyDescriptor(n, l);
                            void 0 !== d && d.enumerable && (c.isObject(i[l]) && c.isObject(n[l]) ? c.extend(i[l], n[l]) : !c.isObject(i[l]) && c.isObject(n[l]) ? (i[l] = {}, c.extend(i[l], n[l])) : i[l] = n[l])
                        }
                }
                return i
            }
        },
        d = {
            touch: !!("ontouchstart" in n || n.DocumentTouch && i instanceof n.DocumentTouch),
            pointerEvents: !!n.PointerEvent && "maxTouchPoints" in n.navigator && n.navigator.maxTouchPoints >= 0,
            observer: "MutationObserver" in n || "WebkitMutationObserver" in n,
            passiveListener: function() {
                var e = !1;
                try {
                    var t = Object.defineProperty({}, "passive", {
                        get: function() {
                            e = !0
                        }
                    });
                    n.addEventListener("testPassiveListener", null, t)
                } catch (e) {}
                return e
            }(),
            gestures: "ongesturestart" in n
        },
        h = function(e) {
            void 0 === e && (e = {});
            var t = this;
            t.params = e, t.eventsListeners = {}, t.params && t.params.on && Object.keys(t.params.on).forEach(function(e) {
                t.on(e, t.params.on[e])
            })
        },
        u = {
            components: {
                configurable: !0
            }
        };
    h.prototype.on = function(e, t, i) {
        var s = this;
        if ("function" != typeof t) return s;
        var n = i ? "unshift" : "push";
        return e.split(" ").forEach(function(e) {
            s.eventsListeners[e] || (s.eventsListeners[e] = []), s.eventsListeners[e][n](t)
        }), s
    }, h.prototype.once = function(e, t, i) {
        var s = this;
        if ("function" != typeof t) return s;

        function n() {
            for (var i = [], a = arguments.length; a--;) i[a] = arguments[a];
            s.off(e, n), n.f7proxy && delete n.f7proxy, t.apply(s, i)
        }
        return n.f7proxy = t, s.on(e, n, i)
    }, h.prototype.off = function(e, t) {
        var i = this;
        return i.eventsListeners ? (e.split(" ").forEach(function(e) {
            void 0 === t ? i.eventsListeners[e] = [] : i.eventsListeners[e] && i.eventsListeners[e].length && i.eventsListeners[e].forEach(function(s, n) {
                (s === t || s.f7proxy && s.f7proxy === t) && i.eventsListeners[e].splice(n, 1)
            })
        }), i) : i
    }, h.prototype.emit = function() {
        for (var e = [], t = arguments.length; t--;) e[t] = arguments[t];
        var i, s, n, a = this;
        return a.eventsListeners ? ("string" == typeof e[0] || Array.isArray(e[0]) ? (i = e[0], s = e.slice(1, e.length), n = a) : (i = e[0].events, s = e[0].data, n = e[0].context || a), (Array.isArray(i) ? i : i.split(" ")).forEach(function(e) {
            if (a.eventsListeners && a.eventsListeners[e]) {
                var t = [];
                a.eventsListeners[e].forEach(function(e) {
                    t.push(e)
                }), t.forEach(function(e) {
                    e.apply(n, s)
                })
            }
        }), a) : a
    }, h.prototype.useModulesParams = function(e) {
        var t = this;
        t.modules && Object.keys(t.modules).forEach(function(i) {
            var s = t.modules[i];
            s.params && c.extend(e, s.params)
        })
    }, h.prototype.useModules = function(e) {
        void 0 === e && (e = {});
        var t = this;
        t.modules && Object.keys(t.modules).forEach(function(i) {
            var s = t.modules[i],
                n = e[i] || {};
            s.instance && Object.keys(s.instance).forEach(function(e) {
                var i = s.instance[e];
                t[e] = "function" == typeof i ? i.bind(t) : i
            }), s.on && t.on && Object.keys(s.on).forEach(function(e) {
                t.on(e, s.on[e])
            }), s.create && s.create.bind(t)(n)
        })
    }, u.components.set = function(e) {
        this.use && this.use(e)
    }, h.installModule = function(e) {
        for (var t = [], i = arguments.length - 1; i-- > 0;) t[i] = arguments[i + 1];
        var s = this;
        s.prototype.modules || (s.prototype.modules = {});
        var n = e.name || Object.keys(s.prototype.modules).length + "_" + c.now();
        return s.prototype.modules[n] = e, e.proto && Object.keys(e.proto).forEach(function(t) {
            s.prototype[t] = e.proto[t]
        }), e.static && Object.keys(e.static).forEach(function(t) {
            s[t] = e.static[t]
        }), e.install && e.install.apply(s, t), s
    }, h.use = function(e) {
        for (var t = [], i = arguments.length - 1; i-- > 0;) t[i] = arguments[i + 1];
        var s = this;
        return Array.isArray(e) ? (e.forEach(function(e) {
            return s.installModule(e)
        }), s) : s.installModule.apply(s, [e].concat(t))
    }, Object.defineProperties(h, u);
    var p, f, m, v, g, b, y, w, x, C, S, E, T, M, k, P = {
            updateSize: function() {
                var e, t, i = this.$el;
                e = void 0 !== this.params.width ? this.params.width : i[0].clientWidth, t = void 0 !== this.params.height ? this.params.height : i[0].clientHeight, 0 === e && this.isHorizontal() || 0 === t && this.isVertical() || (e = e - parseInt(i.css("padding-left"), 10) - parseInt(i.css("padding-right"), 10), t = t - parseInt(i.css("padding-top"), 10) - parseInt(i.css("padding-bottom"), 10), c.extend(this, {
                    width: e,
                    height: t,
                    size: this.isHorizontal() ? e : t
                }))
            },
            updateSlides: function() {
                var e = this.params,
                    t = this.$wrapperEl,
                    i = this.size,
                    s = this.rtlTranslate,
                    a = this.wrongRTL,
                    r = this.virtual && e.virtual.enabled,
                    o = r ? this.virtual.slides.length : this.slides.length,
                    l = t.children("." + this.params.slideClass),
                    d = r ? this.virtual.slides.length : l.length,
                    h = [],
                    u = [],
                    p = [];

                function f(t) {
                    return !e.cssMode || t !== l.length - 1
                }
                var m = e.slidesOffsetBefore;
                "function" == typeof m && (m = e.slidesOffsetBefore.call(this));
                var v = e.slidesOffsetAfter;
                "function" == typeof v && (v = e.slidesOffsetAfter.call(this));
                var g = this.snapGrid.length,
                    b = this.snapGrid.length,
                    y = e.spaceBetween,
                    w = -m,
                    x = 0,
                    C = 0;
                if (void 0 !== i) {
                    var S, E;
                    "string" == typeof y && y.indexOf("%") >= 0 && (y = parseFloat(y.replace("%", "")) / 100 * i), this.virtualSize = -y, s ? l.css({
                        marginLeft: "",
                        marginTop: ""
                    }) : l.css({
                        marginRight: "",
                        marginBottom: ""
                    }), e.slidesPerColumn > 1 && (S = Math.floor(d / e.slidesPerColumn) === d / this.params.slidesPerColumn ? d : Math.ceil(d / e.slidesPerColumn) * e.slidesPerColumn, "auto" !== e.slidesPerView && "row" === e.slidesPerColumnFill && (S = Math.max(S, e.slidesPerView * e.slidesPerColumn)));
                    for (var T, M = e.slidesPerColumn, k = S / M, P = Math.floor(d / e.slidesPerColumn), $ = 0; $ < d; $ += 1) {
                        E = 0;
                        var L = l.eq($);
                        if (e.slidesPerColumn > 1) {
                            var z = void 0,
                                I = void 0,
                                A = void 0;
                            if ("row" === e.slidesPerColumnFill && e.slidesPerGroup > 1) {
                                var O = Math.floor($ / (e.slidesPerGroup * e.slidesPerColumn)),
                                    D = $ - e.slidesPerColumn * e.slidesPerGroup * O,
                                    F = 0 === O ? e.slidesPerGroup : Math.min(Math.ceil((d - O * M * e.slidesPerGroup) / M), e.slidesPerGroup);
                                z = (I = D - (A = Math.floor(D / F)) * F + O * e.slidesPerGroup) + A * S / M, L.css({
                                    "-webkit-box-ordinal-group": z,
                                    "-moz-box-ordinal-group": z,
                                    "-ms-flex-order": z,
                                    "-webkit-order": z,
                                    order: z
                                })
                            } else "column" === e.slidesPerColumnFill ? (A = $ - (I = Math.floor($ / M)) * M, (I > P || I === P && A === M - 1) && (A += 1) >= M && (A = 0, I += 1)) : I = $ - (A = Math.floor($ / k)) * k;
                            L.css("margin-" + (this.isHorizontal() ? "top" : "left"), 0 !== A && e.spaceBetween && e.spaceBetween + "px")
                        }
                        if ("none" !== L.css("display")) {
                            if ("auto" === e.slidesPerView) {
                                var H = n.getComputedStyle(L[0], null),
                                    B = L[0].style.transform,
                                    N = L[0].style.webkitTransform;
                                if (B && (L[0].style.transform = "none"), N && (L[0].style.webkitTransform = "none"), e.roundLengths) E = this.isHorizontal() ? L.outerWidth(!0) : L.outerHeight(!0);
                                else if (this.isHorizontal()) {
                                    var R = parseFloat(H.getPropertyValue("width")),
                                        q = parseFloat(H.getPropertyValue("padding-left")),
                                        j = parseFloat(H.getPropertyValue("padding-right")),
                                        V = parseFloat(H.getPropertyValue("margin-left")),
                                        X = parseFloat(H.getPropertyValue("margin-right")),
                                        Y = H.getPropertyValue("box-sizing");
                                    E = Y && "border-box" === Y ? R + V + X : R + q + j + V + X
                                } else {
                                    var G = parseFloat(H.getPropertyValue("height")),
                                        W = parseFloat(H.getPropertyValue("padding-top")),
                                        _ = parseFloat(H.getPropertyValue("padding-bottom")),
                                        U = parseFloat(H.getPropertyValue("margin-top")),
                                        K = parseFloat(H.getPropertyValue("margin-bottom")),
                                        Z = H.getPropertyValue("box-sizing");
                                    E = Z && "border-box" === Z ? G + U + K : G + W + _ + U + K
                                }
                                B && (L[0].style.transform = B), N && (L[0].style.webkitTransform = N), e.roundLengths && (E = Math.floor(E))
                            } else E = (i - (e.slidesPerView - 1) * y) / e.slidesPerView, e.roundLengths && (E = Math.floor(E)), l[$] && (this.isHorizontal() ? l[$].style.width = E + "px" : l[$].style.height = E + "px");
                            l[$] && (l[$].swiperSlideSize = E), p.push(E), e.centeredSlides ? (w = w + E / 2 + x / 2 + y, 0 === x && 0 !== $ && (w = w - i / 2 - y), 0 === $ && (w = w - i / 2 - y), Math.abs(w) < .001 && (w = 0), e.roundLengths && (w = Math.floor(w)), C % e.slidesPerGroup == 0 && h.push(w), u.push(w)) : (e.roundLengths && (w = Math.floor(w)), (C - Math.min(this.params.slidesPerGroupSkip, C)) % this.params.slidesPerGroup == 0 && h.push(w), u.push(w), w = w + E + y), this.virtualSize += E + y, x = E, C += 1
                        }
                    }
                    if (this.virtualSize = Math.max(this.virtualSize, i) + v, s && a && ("slide" === e.effect || "coverflow" === e.effect) && t.css({
                            width: this.virtualSize + e.spaceBetween + "px"
                        }), e.setWrapperSize && (this.isHorizontal() ? t.css({
                            width: this.virtualSize + e.spaceBetween + "px"
                        }) : t.css({
                            height: this.virtualSize + e.spaceBetween + "px"
                        })), e.slidesPerColumn > 1 && (this.virtualSize = (E + e.spaceBetween) * S, this.virtualSize = Math.ceil(this.virtualSize / e.slidesPerColumn) - e.spaceBetween, this.isHorizontal() ? t.css({
                            width: this.virtualSize + e.spaceBetween + "px"
                        }) : t.css({
                            height: this.virtualSize + e.spaceBetween + "px"
                        }), e.centeredSlides)) {
                        T = [];
                        for (var Q = 0; Q < h.length; Q += 1) {
                            var J = h[Q];
                            e.roundLengths && (J = Math.floor(J)), h[Q] < this.virtualSize + h[0] && T.push(J)
                        }
                        h = T
                    }
                    if (!e.centeredSlides) {
                        T = [];
                        for (var ee = 0; ee < h.length; ee += 1) {
                            var te = h[ee];
                            e.roundLengths && (te = Math.floor(te)), h[ee] <= this.virtualSize - i && T.push(te)
                        }
                        h = T, Math.floor(this.virtualSize - i) - Math.floor(h[h.length - 1]) > 1 && h.push(this.virtualSize - i)
                    }
                    if (0 === h.length && (h = [0]), 0 !== e.spaceBetween && (this.isHorizontal() ? s ? l.filter(f).css({
                            marginLeft: y + "px"
                        }) : l.filter(f).css({
                            marginRight: y + "px"
                        }) : l.filter(f).css({
                            marginBottom: y + "px"
                        })), e.centeredSlides && e.centeredSlidesBounds) {
                        var ie = 0;
                        p.forEach(function(t) {
                            ie += t + (e.spaceBetween ? e.spaceBetween : 0)
                        });
                        var se = (ie -= e.spaceBetween) - i;
                        h = h.map(function(e) {
                            return e < 0 ? -m : e > se ? se + v : e
                        })
                    }
                    if (e.centerInsufficientSlides) {
                        var ne = 0;
                        if (p.forEach(function(t) {
                                ne += t + (e.spaceBetween ? e.spaceBetween : 0)
                            }), (ne -= e.spaceBetween) < i) {
                            var ae = (i - ne) / 2;
                            h.forEach(function(e, t) {
                                h[t] = e - ae
                            }), u.forEach(function(e, t) {
                                u[t] = e + ae
                            })
                        }
                    }
                    c.extend(this, {
                        slides: l,
                        snapGrid: h,
                        slidesGrid: u,
                        slidesSizesGrid: p
                    }), d !== o && this.emit("slidesLengthChange"), h.length !== g && (this.params.watchOverflow && this.checkOverflow(), this.emit("snapGridLengthChange")), u.length !== b && this.emit("slidesGridLengthChange"), (e.watchSlidesProgress || e.watchSlidesVisibility) && this.updateSlidesOffset()
                }
            },
            updateAutoHeight: function(e) {
                var t, i = [],
                    s = 0;
                if ("number" == typeof e ? this.setTransition(e) : !0 === e && this.setTransition(this.params.speed), "auto" !== this.params.slidesPerView && this.params.slidesPerView > 1)
                    if (this.params.centeredSlides) this.visibleSlides.each(function(e, t) {
                        i.push(t)
                    });
                    else
                        for (t = 0; t < Math.ceil(this.params.slidesPerView); t += 1) {
                            var n = this.activeIndex + t;
                            if (n > this.slides.length) break;
                            i.push(this.slides.eq(n)[0])
                        } else i.push(this.slides.eq(this.activeIndex)[0]);
                for (t = 0; t < i.length; t += 1)
                    if (void 0 !== i[t]) {
                        var a = i[t].offsetHeight;
                        s = a > s ? a : s
                    }
                s && this.$wrapperEl.css("height", s + "px")
            },
            updateSlidesOffset: function() {
                for (var e = this.slides, t = 0; t < e.length; t += 1) e[t].swiperSlideOffset = this.isHorizontal() ? e[t].offsetLeft : e[t].offsetTop
            },
            updateSlidesProgress: function(e) {
                void 0 === e && (e = this && this.translate || 0);
                var t = this.params,
                    i = this.slides,
                    s = this.rtlTranslate;
                if (0 !== i.length) {
                    void 0 === i[0].swiperSlideOffset && this.updateSlidesOffset();
                    var n = -e;
                    s && (n = e), i.removeClass(t.slideVisibleClass), this.visibleSlidesIndexes = [], this.visibleSlides = [];
                    for (var a = 0; a < i.length; a += 1) {
                        var o = i[a],
                            l = (n + (t.centeredSlides ? this.minTranslate() : 0) - o.swiperSlideOffset) / (o.swiperSlideSize + t.spaceBetween);
                        if (t.watchSlidesVisibility || t.centeredSlides && t.autoHeight) {
                            var c = -(n - o.swiperSlideOffset),
                                d = c + this.slidesSizesGrid[a];
                            (c >= 0 && c < this.size - 1 || d > 1 && d <= this.size || c <= 0 && d >= this.size) && (this.visibleSlides.push(o), this.visibleSlidesIndexes.push(a), i.eq(a).addClass(t.slideVisibleClass))
                        }
                        o.progress = s ? -l : l
                    }
                    this.visibleSlides = r(this.visibleSlides)
                }
            },
            updateProgress: function(e) {
                if (void 0 === e) {
                    var t = this.rtlTranslate ? -1 : 1;
                    e = this && this.translate && this.translate * t || 0
                }
                var i = this.params,
                    s = this.maxTranslate() - this.minTranslate(),
                    n = this.progress,
                    a = this.isBeginning,
                    r = this.isEnd,
                    o = a,
                    l = r;
                0 === s ? (n = 0, a = !0, r = !0) : (a = (n = (e - this.minTranslate()) / s) <= 0, r = n >= 1), c.extend(this, {
                    progress: n,
                    isBeginning: a,
                    isEnd: r
                }), (i.watchSlidesProgress || i.watchSlidesVisibility || i.centeredSlides && i.autoHeight) && this.updateSlidesProgress(e), a && !o && this.emit("reachBeginning toEdge"), r && !l && this.emit("reachEnd toEdge"), (o && !a || l && !r) && this.emit("fromEdge"), this.emit("progress", n)
            },
            updateSlidesClasses: function() {
                var e, t = this.slides,
                    i = this.params,
                    s = this.$wrapperEl,
                    n = this.activeIndex,
                    a = this.realIndex,
                    r = this.virtual && i.virtual.enabled;
                t.removeClass(i.slideActiveClass + " " + i.slideNextClass + " " + i.slidePrevClass + " " + i.slideDuplicateActiveClass + " " + i.slideDuplicateNextClass + " " + i.slideDuplicatePrevClass), (e = r ? this.$wrapperEl.find("." + i.slideClass + '[data-swiper-slide-index="' + n + '"]') : t.eq(n)).addClass(i.slideActiveClass), i.loop && (e.hasClass(i.slideDuplicateClass) ? s.children("." + i.slideClass + ":not(." + i.slideDuplicateClass + ')[data-swiper-slide-index="' + a + '"]').addClass(i.slideDuplicateActiveClass) : s.children("." + i.slideClass + "." + i.slideDuplicateClass + '[data-swiper-slide-index="' + a + '"]').addClass(i.slideDuplicateActiveClass));
                var o = e.nextAll("." + i.slideClass).eq(0).addClass(i.slideNextClass);
                i.loop && 0 === o.length && (o = t.eq(0)).addClass(i.slideNextClass);
                var l = e.prevAll("." + i.slideClass).eq(0).addClass(i.slidePrevClass);
                i.loop && 0 === l.length && (l = t.eq(-1)).addClass(i.slidePrevClass), i.loop && (o.hasClass(i.slideDuplicateClass) ? s.children("." + i.slideClass + ":not(." + i.slideDuplicateClass + ')[data-swiper-slide-index="' + o.attr("data-swiper-slide-index") + '"]').addClass(i.slideDuplicateNextClass) : s.children("." + i.slideClass + "." + i.slideDuplicateClass + '[data-swiper-slide-index="' + o.attr("data-swiper-slide-index") + '"]').addClass(i.slideDuplicateNextClass), l.hasClass(i.slideDuplicateClass) ? s.children("." + i.slideClass + ":not(." + i.slideDuplicateClass + ')[data-swiper-slide-index="' + l.attr("data-swiper-slide-index") + '"]').addClass(i.slideDuplicatePrevClass) : s.children("." + i.slideClass + "." + i.slideDuplicateClass + '[data-swiper-slide-index="' + l.attr("data-swiper-slide-index") + '"]').addClass(i.slideDuplicatePrevClass))
            },
            updateActiveIndex: function(e) {
                var t, i = this.rtlTranslate ? this.translate : -this.translate,
                    s = this.slidesGrid,
                    n = this.snapGrid,
                    a = this.params,
                    r = this.activeIndex,
                    o = this.realIndex,
                    l = this.snapIndex,
                    d = e;
                if (void 0 === d) {
                    for (var h = 0; h < s.length; h += 1) void 0 !== s[h + 1] ? i >= s[h] && i < s[h + 1] - (s[h + 1] - s[h]) / 2 ? d = h : i >= s[h] && i < s[h + 1] && (d = h + 1) : i >= s[h] && (d = h);
                    a.normalizeSlideIndex && (d < 0 || void 0 === d) && (d = 0)
                }
                if (n.indexOf(i) >= 0) t = n.indexOf(i);
                else {
                    var u = Math.min(a.slidesPerGroupSkip, d);
                    t = u + Math.floor((d - u) / a.slidesPerGroup)
                }
                if (t >= n.length && (t = n.length - 1), d !== r) {
                    var p = parseInt(this.slides.eq(d).attr("data-swiper-slide-index") || d, 10);
                    c.extend(this, {
                        snapIndex: t,
                        realIndex: p,
                        previousIndex: r,
                        activeIndex: d
                    }), this.emit("activeIndexChange"), this.emit("snapIndexChange"), o !== p && this.emit("realIndexChange"), (this.initialized || this.params.runCallbacksOnInit) && this.emit("slideChange")
                } else t !== l && (this.snapIndex = t, this.emit("snapIndexChange"))
            },
            updateClickedSlide: function(e) {
                var t = this.params,
                    i = r(e.target).closest("." + t.slideClass)[0],
                    s = !1;
                if (i)
                    for (var n = 0; n < this.slides.length; n += 1) this.slides[n] === i && (s = !0);
                if (!i || !s) return this.clickedSlide = void 0, void(this.clickedIndex = void 0);
                this.clickedSlide = i, this.virtual && this.params.virtual.enabled ? this.clickedIndex = parseInt(r(i).attr("data-swiper-slide-index"), 10) : this.clickedIndex = r(i).index(), t.slideToClickedSlide && void 0 !== this.clickedIndex && this.clickedIndex !== this.activeIndex && this.slideToClickedSlide()
            }
        },
        $ = {
            getTranslate: function(e) {
                void 0 === e && (e = this.isHorizontal() ? "x" : "y");
                var t = this.params,
                    i = this.rtlTranslate,
                    s = this.translate,
                    n = this.$wrapperEl;
                if (t.virtualTranslate) return i ? -s : s;
                if (t.cssMode) return s;
                var a = c.getTranslate(n[0], e);
                return i && (a = -a), a || 0
            },
            setTranslate: function(e, t) {
                var i = this.rtlTranslate,
                    s = this.params,
                    n = this.$wrapperEl,
                    a = this.wrapperEl,
                    r = this.progress,
                    o = 0,
                    l = 0;
                this.isHorizontal() ? o = i ? -e : e : l = e, s.roundLengths && (o = Math.floor(o), l = Math.floor(l)), s.cssMode ? a[this.isHorizontal() ? "scrollLeft" : "scrollTop"] = this.isHorizontal() ? -o : -l : s.virtualTranslate || n.transform("translate3d(" + o + "px, " + l + "px, 0px)"), this.previousTranslate = this.translate, this.translate = this.isHorizontal() ? o : l;
                var c = this.maxTranslate() - this.minTranslate();
                (0 === c ? 0 : (e - this.minTranslate()) / c) !== r && this.updateProgress(e), this.emit("setTranslate", this.translate, t)
            },
            minTranslate: function() {
                return -this.snapGrid[0]
            },
            maxTranslate: function() {
                return -this.snapGrid[this.snapGrid.length - 1]
            },
            translateTo: function(e, t, i, s, n) {
                var a;
                void 0 === e && (e = 0), void 0 === t && (t = this.params.speed), void 0 === i && (i = !0), void 0 === s && (s = !0);
                var r = this,
                    o = r.params,
                    l = r.wrapperEl;
                if (r.animating && o.preventInteractionOnTransition) return !1;
                var c, d = r.minTranslate(),
                    h = r.maxTranslate();
                if (c = s && e > d ? d : s && e < h ? h : e, r.updateProgress(c), o.cssMode) {
                    var u = r.isHorizontal();
                    return 0 === t ? l[u ? "scrollLeft" : "scrollTop"] = -c : l.scrollTo ? l.scrollTo(((a = {})[u ? "left" : "top"] = -c, a.behavior = "smooth", a)) : l[u ? "scrollLeft" : "scrollTop"] = -c, !0
                }
                return 0 === t ? (r.setTransition(0), r.setTranslate(c), i && (r.emit("beforeTransitionStart", t, n), r.emit("transitionEnd"))) : (r.setTransition(t), r.setTranslate(c), i && (r.emit("beforeTransitionStart", t, n), r.emit("transitionStart")), r.animating || (r.animating = !0, r.onTranslateToWrapperTransitionEnd || (r.onTranslateToWrapperTransitionEnd = function(e) {
                    r && !r.destroyed && e.target === this && (r.$wrapperEl[0].removeEventListener("transitionend", r.onTranslateToWrapperTransitionEnd), r.$wrapperEl[0].removeEventListener("webkitTransitionEnd", r.onTranslateToWrapperTransitionEnd), r.onTranslateToWrapperTransitionEnd = null, delete r.onTranslateToWrapperTransitionEnd, i && r.emit("transitionEnd"))
                }), r.$wrapperEl[0].addEventListener("transitionend", r.onTranslateToWrapperTransitionEnd), r.$wrapperEl[0].addEventListener("webkitTransitionEnd", r.onTranslateToWrapperTransitionEnd))), !0
            }
        },
        L = {
            slideTo: function(e, t, i, s) {
                var n;
                void 0 === e && (e = 0), void 0 === t && (t = this.params.speed), void 0 === i && (i = !0);
                var a = this,
                    r = e;
                r < 0 && (r = 0);
                var o = a.params,
                    l = a.snapGrid,
                    c = a.slidesGrid,
                    d = a.previousIndex,
                    h = a.activeIndex,
                    u = a.rtlTranslate,
                    p = a.wrapperEl;
                if (a.animating && o.preventInteractionOnTransition) return !1;
                var f = Math.min(a.params.slidesPerGroupSkip, r),
                    m = f + Math.floor((r - f) / a.params.slidesPerGroup);
                m >= l.length && (m = l.length - 1), (h || o.initialSlide || 0) === (d || 0) && i && a.emit("beforeSlideChangeStart");
                var v, g = -l[m];
                if (a.updateProgress(g), o.normalizeSlideIndex)
                    for (var b = 0; b < c.length; b += 1) - Math.floor(100 * g) >= Math.floor(100 * c[b]) && (r = b);
                if (a.initialized && r !== h) {
                    if (!a.allowSlideNext && g < a.translate && g < a.minTranslate()) return !1;
                    if (!a.allowSlidePrev && g > a.translate && g > a.maxTranslate() && (h || 0) !== r) return !1
                }
                if (v = r > h ? "next" : r < h ? "prev" : "reset", u && -g === a.translate || !u && g === a.translate) return a.updateActiveIndex(r), o.autoHeight && a.updateAutoHeight(), a.updateSlidesClasses(), "slide" !== o.effect && a.setTranslate(g), "reset" !== v && (a.transitionStart(i, v), a.transitionEnd(i, v)), !1;
                if (o.cssMode) {
                    var y = a.isHorizontal(),
                        w = -g;
                    return u && (w = p.scrollWidth - p.offsetWidth - w), 0 === t ? p[y ? "scrollLeft" : "scrollTop"] = w : p.scrollTo ? p.scrollTo(((n = {})[y ? "left" : "top"] = w, n.behavior = "smooth", n)) : p[y ? "scrollLeft" : "scrollTop"] = w, !0
                }
                return 0 === t ? (a.setTransition(0), a.setTranslate(g), a.updateActiveIndex(r), a.updateSlidesClasses(), a.emit("beforeTransitionStart", t, s), a.transitionStart(i, v), a.transitionEnd(i, v)) : (a.setTransition(t), a.setTranslate(g), a.updateActiveIndex(r), a.updateSlidesClasses(), a.emit("beforeTransitionStart", t, s), a.transitionStart(i, v), a.animating || (a.animating = !0, a.onSlideToWrapperTransitionEnd || (a.onSlideToWrapperTransitionEnd = function(e) {
                    a && !a.destroyed && e.target === this && (a.$wrapperEl[0].removeEventListener("transitionend", a.onSlideToWrapperTransitionEnd), a.$wrapperEl[0].removeEventListener("webkitTransitionEnd", a.onSlideToWrapperTransitionEnd), a.onSlideToWrapperTransitionEnd = null, delete a.onSlideToWrapperTransitionEnd, a.transitionEnd(i, v))
                }), a.$wrapperEl[0].addEventListener("transitionend", a.onSlideToWrapperTransitionEnd), a.$wrapperEl[0].addEventListener("webkitTransitionEnd", a.onSlideToWrapperTransitionEnd))), !0
            },
            slideToLoop: function(e, t, i, s) {
                void 0 === e && (e = 0), void 0 === t && (t = this.params.speed), void 0 === i && (i = !0);
                var n = e;
                return this.params.loop && (n += this.loopedSlides), this.slideTo(n, t, i, s)
            },
            slideNext: function(e, t, i) {
                void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
                var s = this.params,
                    n = this.animating,
                    a = this.activeIndex < s.slidesPerGroupSkip ? 1 : s.slidesPerGroup;
                if (s.loop) {
                    if (n) return !1;
                    this.loopFix(), this._clientLeft = this.$wrapperEl[0].clientLeft
                }
                return this.slideTo(this.activeIndex + a, e, t, i)
            },
            slidePrev: function(e, t, i) {
                void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
                var s = this.params,
                    n = this.animating,
                    a = this.snapGrid,
                    r = this.slidesGrid,
                    o = this.rtlTranslate;
                if (s.loop) {
                    if (n) return !1;
                    this.loopFix(), this._clientLeft = this.$wrapperEl[0].clientLeft
                }

                function l(e) {
                    return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e)
                }
                var c, d = l(o ? this.translate : -this.translate),
                    h = a.map(function(e) {
                        return l(e)
                    }),
                    u = (r.map(function(e) {
                        return l(e)
                    }), a[h.indexOf(d)], a[h.indexOf(d) - 1]);
                return void 0 === u && s.cssMode && a.forEach(function(e) {
                    !u && d >= e && (u = e)
                }), void 0 !== u && (c = r.indexOf(u)) < 0 && (c = this.activeIndex - 1), this.slideTo(c, e, t, i)
            },
            slideReset: function(e, t, i) {
                return void 0 === e && (e = this.params.speed), void 0 === t && (t = !0), this.slideTo(this.activeIndex, e, t, i)
            },
            slideToClosest: function(e, t, i, s) {
                void 0 === e && (e = this.params.speed), void 0 === t && (t = !0), void 0 === s && (s = .5);
                var n = this.activeIndex,
                    a = Math.min(this.params.slidesPerGroupSkip, n),
                    r = a + Math.floor((n - a) / this.params.slidesPerGroup),
                    o = this.rtlTranslate ? this.translate : -this.translate;
                if (o >= this.snapGrid[r]) {
                    var l = this.snapGrid[r];
                    o - l > (this.snapGrid[r + 1] - l) * s && (n += this.params.slidesPerGroup)
                } else {
                    var c = this.snapGrid[r - 1];
                    o - c <= (this.snapGrid[r] - c) * s && (n -= this.params.slidesPerGroup)
                }
                return n = Math.max(n, 0), n = Math.min(n, this.slidesGrid.length - 1), this.slideTo(n, e, t, i)
            },
            slideToClickedSlide: function() {
                var e, t = this,
                    i = t.params,
                    s = t.$wrapperEl,
                    n = "auto" === i.slidesPerView ? t.slidesPerViewDynamic() : i.slidesPerView,
                    a = t.clickedIndex;
                if (i.loop) {
                    if (t.animating) return;
                    e = parseInt(r(t.clickedSlide).attr("data-swiper-slide-index"), 10), i.centeredSlides ? a < t.loopedSlides - n / 2 || a > t.slides.length - t.loopedSlides + n / 2 ? (t.loopFix(), a = s.children("." + i.slideClass + '[data-swiper-slide-index="' + e + '"]:not(.' + i.slideDuplicateClass + ")").eq(0).index(), c.nextTick(function() {
                        t.slideTo(a)
                    })) : t.slideTo(a) : a > t.slides.length - n ? (t.loopFix(), a = s.children("." + i.slideClass + '[data-swiper-slide-index="' + e + '"]:not(.' + i.slideDuplicateClass + ")").eq(0).index(), c.nextTick(function() {
                        t.slideTo(a)
                    })) : t.slideTo(a)
                } else t.slideTo(a)
            }
        },
        z = {
            loopCreate: function() {
                var e = this,
                    t = e.params,
                    s = e.$wrapperEl;
                s.children("." + t.slideClass + "." + t.slideDuplicateClass).remove();
                var n = s.children("." + t.slideClass);
                if (t.loopFillGroupWithBlank) {
                    var a = t.slidesPerGroup - n.length % t.slidesPerGroup;
                    if (a !== t.slidesPerGroup) {
                        for (var o = 0; o < a; o += 1) {
                            var l = r(i.createElement("div")).addClass(t.slideClass + " " + t.slideBlankClass);
                            s.append(l)
                        }
                        n = s.children("." + t.slideClass)
                    }
                }
                "auto" !== t.slidesPerView || t.loopedSlides || (t.loopedSlides = n.length), e.loopedSlides = Math.ceil(parseFloat(t.loopedSlides || t.slidesPerView, 10)), e.loopedSlides += t.loopAdditionalSlides, e.loopedSlides > n.length && (e.loopedSlides = n.length);
                var c = [],
                    d = [];
                n.each(function(t, i) {
                    var s = r(i);
                    t < e.loopedSlides && d.push(i), t < n.length && t >= n.length - e.loopedSlides && c.push(i), s.attr("data-swiper-slide-index", t)
                });
                for (var h = 0; h < d.length; h += 1) s.append(r(d[h].cloneNode(!0)).addClass(t.slideDuplicateClass));
                for (var u = c.length - 1; u >= 0; u -= 1) s.prepend(r(c[u].cloneNode(!0)).addClass(t.slideDuplicateClass))
            },
            loopFix: function() {
                this.emit("beforeLoopFix");
                var e, t = this.activeIndex,
                    i = this.slides,
                    s = this.loopedSlides,
                    n = this.allowSlidePrev,
                    a = this.allowSlideNext,
                    r = this.snapGrid,
                    o = this.rtlTranslate;
                this.allowSlidePrev = !0, this.allowSlideNext = !0;
                var l = -r[t] - this.getTranslate();
                t < s ? (e = i.length - 3 * s + t, e += s, this.slideTo(e, 0, !1, !0) && 0 !== l && this.setTranslate((o ? -this.translate : this.translate) - l)) : t >= i.length - s && (e = -i.length + t + s, e += s, this.slideTo(e, 0, !1, !0) && 0 !== l && this.setTranslate((o ? -this.translate : this.translate) - l)), this.allowSlidePrev = n, this.allowSlideNext = a, this.emit("loopFix")
            },
            loopDestroy: function() {
                var e = this.$wrapperEl,
                    t = this.params,
                    i = this.slides;
                e.children("." + t.slideClass + "." + t.slideDuplicateClass + ",." + t.slideClass + "." + t.slideBlankClass).remove(), i.removeAttr("data-swiper-slide-index")
            }
        },
        I = {
            setGrabCursor: function(e) {
                if (!(d.touch || !this.params.simulateTouch || this.params.watchOverflow && this.isLocked || this.params.cssMode)) {
                    var t = this.el;
                    t.style.cursor = "move", t.style.cursor = e ? "-webkit-grabbing" : "-webkit-grab", t.style.cursor = e ? "-moz-grabbin" : "-moz-grab", t.style.cursor = e ? "grabbing" : "grab"
                }
            },
            unsetGrabCursor: function() {
                d.touch || this.params.watchOverflow && this.isLocked || this.params.cssMode || (this.el.style.cursor = "")
            }
        },
        A = {
            appendSlide: function(e) {
                var t = this.$wrapperEl,
                    i = this.params;
                if (i.loop && this.loopDestroy(), "object" == typeof e && "length" in e)
                    for (var s = 0; s < e.length; s += 1) e[s] && t.append(e[s]);
                else t.append(e);
                i.loop && this.loopCreate(), i.observer && d.observer || this.update()
            },
            prependSlide: function(e) {
                var t = this.params,
                    i = this.$wrapperEl,
                    s = this.activeIndex;
                t.loop && this.loopDestroy();
                var n = s + 1;
                if ("object" == typeof e && "length" in e) {
                    for (var a = 0; a < e.length; a += 1) e[a] && i.prepend(e[a]);
                    n = s + e.length
                } else i.prepend(e);
                t.loop && this.loopCreate(), t.observer && d.observer || this.update(), this.slideTo(n, 0, !1)
            },
            addSlide: function(e, t) {
                var i = this.$wrapperEl,
                    s = this.params,
                    n = this.activeIndex;
                s.loop && (n -= this.loopedSlides, this.loopDestroy(), this.slides = i.children("." + s.slideClass));
                var a = this.slides.length;
                if (e <= 0) this.prependSlide(t);
                else if (e >= a) this.appendSlide(t);
                else {
                    for (var r = n > e ? n + 1 : n, o = [], l = a - 1; l >= e; l -= 1) {
                        var c = this.slides.eq(l);
                        c.remove(), o.unshift(c)
                    }
                    if ("object" == typeof t && "length" in t) {
                        for (var h = 0; h < t.length; h += 1) t[h] && i.append(t[h]);
                        r = n > e ? n + t.length : n
                    } else i.append(t);
                    for (var u = 0; u < o.length; u += 1) i.append(o[u]);
                    s.loop && this.loopCreate(), s.observer && d.observer || this.update(), s.loop ? this.slideTo(r + this.loopedSlides, 0, !1) : this.slideTo(r, 0, !1)
                }
            },
            removeSlide: function(e) {
                var t = this.params,
                    i = this.$wrapperEl,
                    s = this.activeIndex;
                t.loop && (s -= this.loopedSlides, this.loopDestroy(), this.slides = i.children("." + t.slideClass));
                var n, a = s;
                if ("object" == typeof e && "length" in e) {
                    for (var r = 0; r < e.length; r += 1) n = e[r], this.slides[n] && this.slides.eq(n).remove(), n < a && (a -= 1);
                    a = Math.max(a, 0)
                } else n = e, this.slides[n] && this.slides.eq(n).remove(), n < a && (a -= 1), a = Math.max(a, 0);
                t.loop && this.loopCreate(), t.observer && d.observer || this.update(), t.loop ? this.slideTo(a + this.loopedSlides, 0, !1) : this.slideTo(a, 0, !1)
            },
            removeAllSlides: function() {
                for (var e = [], t = 0; t < this.slides.length; t += 1) e.push(t);
                this.removeSlide(e)
            }
        },
        O = (p = n.navigator.platform, f = n.navigator.userAgent, m = {
            ios: !1,
            android: !1,
            androidChrome: !1,
            desktop: !1,
            iphone: !1,
            ipod: !1,
            ipad: !1,
            edge: !1,
            ie: !1,
            firefox: !1,
            macos: !1,
            windows: !1,
            cordova: !(!n.cordova && !n.phonegap),
            phonegap: !(!n.cordova && !n.phonegap),
            electron: !1
        }, v = n.screen.width, g = n.screen.height, b = f.match(/(Android);?[\s\/]+([\d.]+)?/), y = f.match(/(iPad).*OS\s([\d_]+)/), w = f.match(/(iPod)(.*OS\s([\d_]+))?/), x = !y && f.match(/(iPhone\sOS|iOS)\s([\d_]+)/), C = f.indexOf("MSIE ") >= 0 || f.indexOf("Trident/") >= 0, S = f.indexOf("Edge/") >= 0, E = f.indexOf("Gecko/") >= 0 && f.indexOf("Firefox/") >= 0, T = "Win32" === p, M = f.toLowerCase().indexOf("electron") >= 0, k = "MacIntel" === p, !y && k && d.touch && (1024 === v && 1366 === g || 834 === v && 1194 === g || 834 === v && 1112 === g || 768 === v && 1024 === g) && (y = f.match(/(Version)\/([\d.]+)/), k = !1), m.ie = C, m.edge = S, m.firefox = E, b && !T && (m.os = "android", m.osVersion = b[2], m.android = !0, m.androidChrome = f.toLowerCase().indexOf("chrome") >= 0), (y || x || w) && (m.os = "ios", m.ios = !0), x && !w && (m.osVersion = x[2].replace(/_/g, "."), m.iphone = !0), y && (m.osVersion = y[2].replace(/_/g, "."), m.ipad = !0), w && (m.osVersion = w[3] ? w[3].replace(/_/g, ".") : null, m.ipod = !0), m.ios && m.osVersion && f.indexOf("Version/") >= 0 && "10" === m.osVersion.split(".")[0] && (m.osVersion = f.toLowerCase().split("version/")[1].split(" ")[0]), m.webView = !(!(x || y || w) || !f.match(/.*AppleWebKit(?!.*Safari)/i) && !n.navigator.standalone) || n.matchMedia && n.matchMedia("(display-mode: standalone)").matches, m.webview = m.webView, m.standalone = m.webView, m.desktop = !(m.ios || m.android) || M, m.desktop && (m.electron = M, m.macos = k, m.windows = T, m.macos && (m.os = "macos"), m.windows && (m.os = "windows")), m.pixelRatio = n.devicePixelRatio || 1, m);

    function D(e) {
        var t = this.touchEventsData,
            s = this.params,
            a = this.touches;
        if (!this.animating || !s.preventInteractionOnTransition) {
            var o = e;
            o.originalEvent && (o = o.originalEvent);
            var l = r(o.target);
            if (("wrapper" !== s.touchEventsTarget || l.closest(this.wrapperEl).length) && (t.isTouchEvent = "touchstart" === o.type, (t.isTouchEvent || !("which" in o) || 3 !== o.which) && !(!t.isTouchEvent && "button" in o && o.button > 0 || t.isTouched && t.isMoved)))
                if (s.noSwiping && l.closest(s.noSwipingSelector ? s.noSwipingSelector : "." + s.noSwipingClass)[0]) this.allowClick = !0;
                else if (!s.swipeHandler || l.closest(s.swipeHandler)[0]) {
                a.currentX = "touchstart" === o.type ? o.targetTouches[0].pageX : o.pageX, a.currentY = "touchstart" === o.type ? o.targetTouches[0].pageY : o.pageY;
                var d = a.currentX,
                    h = a.currentY,
                    u = s.edgeSwipeDetection || s.iOSEdgeSwipeDetection,
                    p = s.edgeSwipeThreshold || s.iOSEdgeSwipeThreshold;
                if (!u || !(d <= p || d >= n.screen.width - p)) {
                    if (c.extend(t, {
                            isTouched: !0,
                            isMoved: !1,
                            allowTouchCallbacks: !0,
                            isScrolling: void 0,
                            startMoving: void 0
                        }), a.startX = d, a.startY = h, t.touchStartTime = c.now(), this.allowClick = !0, this.updateSize(), this.swipeDirection = void 0, s.threshold > 0 && (t.allowThresholdMove = !1), "touchstart" !== o.type) {
                        var f = !0;
                        l.is(t.formElements) && (f = !1), i.activeElement && r(i.activeElement).is(t.formElements) && i.activeElement !== l[0] && i.activeElement.blur();
                        var m = f && this.allowTouchMove && s.touchStartPreventDefault;
                        (s.touchStartForcePreventDefault || m) && o.preventDefault()
                    }
                    this.emit("touchStart", o)
                }
            }
        }
    }

    function F(e) {
        var t = this.touchEventsData,
            s = this.params,
            n = this.touches,
            a = this.rtlTranslate,
            o = e;
        if (o.originalEvent && (o = o.originalEvent), t.isTouched) {
            if (!t.isTouchEvent || "touchmove" === o.type) {
                var l = "touchmove" === o.type && o.targetTouches && (o.targetTouches[0] || o.changedTouches[0]),
                    d = "touchmove" === o.type ? l.pageX : o.pageX,
                    h = "touchmove" === o.type ? l.pageY : o.pageY;
                if (o.preventedByNestedSwiper) return n.startX = d, void(n.startY = h);
                if (!this.allowTouchMove) return this.allowClick = !1, void(t.isTouched && (c.extend(n, {
                    startX: d,
                    startY: h,
                    currentX: d,
                    currentY: h
                }), t.touchStartTime = c.now()));
                if (t.isTouchEvent && s.touchReleaseOnEdges && !s.loop)
                    if (this.isVertical()) {
                        if (h < n.startY && this.translate <= this.maxTranslate() || h > n.startY && this.translate >= this.minTranslate()) return t.isTouched = !1, void(t.isMoved = !1)
                    } else if (d < n.startX && this.translate <= this.maxTranslate() || d > n.startX && this.translate >= this.minTranslate()) return;
                if (t.isTouchEvent && i.activeElement && o.target === i.activeElement && r(o.target).is(t.formElements)) return t.isMoved = !0, void(this.allowClick = !1);
                if (t.allowTouchCallbacks && this.emit("touchMove", o), !(o.targetTouches && o.targetTouches.length > 1)) {
                    n.currentX = d, n.currentY = h;
                    var u, p = n.currentX - n.startX,
                        f = n.currentY - n.startY;
                    if (!(this.params.threshold && Math.sqrt(Math.pow(p, 2) + Math.pow(f, 2)) < this.params.threshold))
                        if (void 0 === t.isScrolling && (this.isHorizontal() && n.currentY === n.startY || this.isVertical() && n.currentX === n.startX ? t.isScrolling = !1 : p * p + f * f >= 25 && (u = 180 * Math.atan2(Math.abs(f), Math.abs(p)) / Math.PI, t.isScrolling = this.isHorizontal() ? u > s.touchAngle : 90 - u > s.touchAngle)), t.isScrolling && this.emit("touchMoveOpposite", o), void 0 === t.startMoving && (n.currentX === n.startX && n.currentY === n.startY || (t.startMoving = !0)), t.isScrolling) t.isTouched = !1;
                        else if (t.startMoving) {
                        this.allowClick = !1, !s.cssMode && o.cancelable && o.preventDefault(), s.touchMoveStopPropagation && !s.nested && o.stopPropagation(), t.isMoved || (s.loop && this.loopFix(), t.startTranslate = this.getTranslate(), this.setTransition(0), this.animating && this.$wrapperEl.trigger("webkitTransitionEnd transitionend"), t.allowMomentumBounce = !1, !s.grabCursor || !0 !== this.allowSlideNext && !0 !== this.allowSlidePrev || this.setGrabCursor(!0), this.emit("sliderFirstMove", o)), this.emit("sliderMove", o), t.isMoved = !0;
                        var m = this.isHorizontal() ? p : f;
                        n.diff = m, m *= s.touchRatio, a && (m = -m), this.swipeDirection = m > 0 ? "prev" : "next", t.currentTranslate = m + t.startTranslate;
                        var v = !0,
                            g = s.resistanceRatio;
                        if (s.touchReleaseOnEdges && (g = 0), m > 0 && t.currentTranslate > this.minTranslate() ? (v = !1, s.resistance && (t.currentTranslate = this.minTranslate() - 1 + Math.pow(-this.minTranslate() + t.startTranslate + m, g))) : m < 0 && t.currentTranslate < this.maxTranslate() && (v = !1, s.resistance && (t.currentTranslate = this.maxTranslate() + 1 - Math.pow(this.maxTranslate() - t.startTranslate - m, g))), v && (o.preventedByNestedSwiper = !0), !this.allowSlideNext && "next" === this.swipeDirection && t.currentTranslate < t.startTranslate && (t.currentTranslate = t.startTranslate), !this.allowSlidePrev && "prev" === this.swipeDirection && t.currentTranslate > t.startTranslate && (t.currentTranslate = t.startTranslate), s.threshold > 0) {
                            if (!(Math.abs(m) > s.threshold || t.allowThresholdMove)) return void(t.currentTranslate = t.startTranslate);
                            if (!t.allowThresholdMove) return t.allowThresholdMove = !0, n.startX = n.currentX, n.startY = n.currentY, t.currentTranslate = t.startTranslate, void(n.diff = this.isHorizontal() ? n.currentX - n.startX : n.currentY - n.startY)
                        }
                        s.followFinger && !s.cssMode && ((s.freeMode || s.watchSlidesProgress || s.watchSlidesVisibility) && (this.updateActiveIndex(), this.updateSlidesClasses()), s.freeMode && (0 === t.velocities.length && t.velocities.push({
                            position: n[this.isHorizontal() ? "startX" : "startY"],
                            time: t.touchStartTime
                        }), t.velocities.push({
                            position: n[this.isHorizontal() ? "currentX" : "currentY"],
                            time: c.now()
                        })), this.updateProgress(t.currentTranslate), this.setTranslate(t.currentTranslate))
                    }
                }
            }
        } else t.startMoving && t.isScrolling && this.emit("touchMoveOpposite", o)
    }

    function H() {
        var e = this.params,
            t = this.el;
        if (!t || 0 !== t.offsetWidth) {
            e.breakpoints && this.setBreakpoint();
            var i = this.allowSlideNext,
                s = this.allowSlidePrev,
                n = this.snapGrid;
            this.allowSlideNext = !0, this.allowSlidePrev = !0, this.updateSize(), this.updateSlides(), this.updateSlidesClasses(), ("auto" === e.slidesPerView || e.slidesPerView > 1) && this.isEnd && !this.params.centeredSlides ? this.slideTo(this.slides.length - 1, 0, !1, !0) : this.slideTo(this.activeIndex, 0, !1, !0), this.autoplay && this.autoplay.running && this.autoplay.paused && this.autoplay.run(), this.allowSlidePrev = s, this.allowSlideNext = i, this.params.watchOverflow && n !== this.snapGrid && this.checkOverflow()
        }
    }
    var B = !1;

    function N() {}
    var R = {
            init: !0,
            direction: "horizontal",
            touchEventsTarget: "container",
            initialSlide: 0,
            speed: 300,
            cssMode: !1,
            updateOnWindowResize: !0,
            preventInteractionOnTransition: !1,
            edgeSwipeDetection: !1,
            edgeSwipeThreshold: 20,
            freeMode: !1,
            freeModeMomentum: !0,
            freeModeMomentumRatio: 1,
            freeModeMomentumBounce: !0,
            freeModeMomentumBounceRatio: 1,
            freeModeMomentumVelocityRatio: 1,
            freeModeSticky: !1,
            freeModeMinimumVelocity: .02,
            autoHeight: !1,
            setWrapperSize: !1,
            virtualTranslate: !1,
            effect: "slide",
            breakpoints: void 0,
            spaceBetween: 0,
            slidesPerView: 1,
            slidesPerColumn: 1,
            slidesPerColumnFill: "column",
            slidesPerGroup: 1,
            slidesPerGroupSkip: 0,
            centeredSlides: !1,
            centeredSlidesBounds: !1,
            slidesOffsetBefore: 0,
            slidesOffsetAfter: 0,
            normalizeSlideIndex: !0,
            centerInsufficientSlides: !1,
            watchOverflow: !1,
            roundLengths: !1,
            touchRatio: 1,
            touchAngle: 45,
            simulateTouch: !0,
            shortSwipes: !0,
            longSwipes: !0,
            longSwipesRatio: .5,
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
            resistanceRatio: .85,
            watchSlidesProgress: !1,
            watchSlidesVisibility: !1,
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
            allowSlidePrev: !0,
            allowSlideNext: !0,
            swipeHandler: null,
            noSwiping: !0,
            noSwipingClass: "swiper-no-swiping",
            noSwipingSelector: null,
            passiveListeners: !0,
            containerModifierClass: "swiper-container-",
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
            runCallbacksOnInit: !0
        },
        q = {
            update: P,
            translate: $,
            transition: {
                setTransition: function(e, t) {
                    this.params.cssMode || this.$wrapperEl.transition(e), this.emit("setTransition", e, t)
                },
                transitionStart: function(e, t) {
                    void 0 === e && (e = !0);
                    var i = this.activeIndex,
                        s = this.params,
                        n = this.previousIndex;
                    if (!s.cssMode) {
                        s.autoHeight && this.updateAutoHeight();
                        var a = t;
                        if (a || (a = i > n ? "next" : i < n ? "prev" : "reset"), this.emit("transitionStart"), e && i !== n) {
                            if ("reset" === a) return void this.emit("slideResetTransitionStart");
                            this.emit("slideChangeTransitionStart"), "next" === a ? this.emit("slideNextTransitionStart") : this.emit("slidePrevTransitionStart")
                        }
                    }
                },
                transitionEnd: function(e, t) {
                    void 0 === e && (e = !0);
                    var i = this.activeIndex,
                        s = this.previousIndex,
                        n = this.params;
                    if (this.animating = !1, !n.cssMode) {
                        this.setTransition(0);
                        var a = t;
                        if (a || (a = i > s ? "next" : i < s ? "prev" : "reset"), this.emit("transitionEnd"), e && i !== s) {
                            if ("reset" === a) return void this.emit("slideResetTransitionEnd");
                            this.emit("slideChangeTransitionEnd"), "next" === a ? this.emit("slideNextTransitionEnd") : this.emit("slidePrevTransitionEnd")
                        }
                    }
                }
            },
            slide: L,
            loop: z,
            grabCursor: I,
            manipulation: A,
            events: {
                attachEvents: function() {
                    var e = this.params,
                        t = this.touchEvents,
                        s = this.el,
                        n = this.wrapperEl;
                    this.onTouchStart = D.bind(this), this.onTouchMove = F.bind(this), this.onTouchEnd = function(e) {
                        var t = this,
                            i = t.touchEventsData,
                            s = t.params,
                            n = t.touches,
                            a = t.rtlTranslate,
                            r = t.$wrapperEl,
                            o = t.slidesGrid,
                            l = t.snapGrid,
                            d = e;
                        if (d.originalEvent && (d = d.originalEvent), i.allowTouchCallbacks && t.emit("touchEnd", d), i.allowTouchCallbacks = !1, !i.isTouched) return i.isMoved && s.grabCursor && t.setGrabCursor(!1), i.isMoved = !1, void(i.startMoving = !1);
                        s.grabCursor && i.isMoved && i.isTouched && (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) && t.setGrabCursor(!1);
                        var h, u = c.now(),
                            p = u - i.touchStartTime;
                        if (t.allowClick && (t.updateClickedSlide(d), t.emit("tap click", d), p < 300 && u - i.lastClickTime < 300 && t.emit("doubleTap doubleClick", d)), i.lastClickTime = c.now(), c.nextTick(function() {
                                t.destroyed || (t.allowClick = !0)
                            }), !i.isTouched || !i.isMoved || !t.swipeDirection || 0 === n.diff || i.currentTranslate === i.startTranslate) return i.isTouched = !1, i.isMoved = !1, void(i.startMoving = !1);
                        if (i.isTouched = !1, i.isMoved = !1, i.startMoving = !1, h = s.followFinger ? a ? t.translate : -t.translate : -i.currentTranslate, !s.cssMode)
                            if (s.freeMode) {
                                if (h < -t.minTranslate()) return void t.slideTo(t.activeIndex);
                                if (h > -t.maxTranslate()) return void(t.slides.length < l.length ? t.slideTo(l.length - 1) : t.slideTo(t.slides.length - 1));
                                if (s.freeModeMomentum) {
                                    if (i.velocities.length > 1) {
                                        var f = i.velocities.pop(),
                                            m = i.velocities.pop(),
                                            v = f.position - m.position,
                                            g = f.time - m.time;
                                        t.velocity = v / g, t.velocity /= 2, Math.abs(t.velocity) < s.freeModeMinimumVelocity && (t.velocity = 0), (g > 150 || c.now() - f.time > 300) && (t.velocity = 0)
                                    } else t.velocity = 0;
                                    t.velocity *= s.freeModeMomentumVelocityRatio, i.velocities.length = 0;
                                    var b = 1e3 * s.freeModeMomentumRatio,
                                        y = t.velocity * b,
                                        w = t.translate + y;
                                    a && (w = -w);
                                    var x, C, S = !1,
                                        E = 20 * Math.abs(t.velocity) * s.freeModeMomentumBounceRatio;
                                    if (w < t.maxTranslate()) s.freeModeMomentumBounce ? (w + t.maxTranslate() < -E && (w = t.maxTranslate() - E), x = t.maxTranslate(), S = !0, i.allowMomentumBounce = !0) : w = t.maxTranslate(), s.loop && s.centeredSlides && (C = !0);
                                    else if (w > t.minTranslate()) s.freeModeMomentumBounce ? (w - t.minTranslate() > E && (w = t.minTranslate() + E), x = t.minTranslate(), S = !0, i.allowMomentumBounce = !0) : w = t.minTranslate(), s.loop && s.centeredSlides && (C = !0);
                                    else if (s.freeModeSticky) {
                                        for (var T, M = 0; M < l.length; M += 1)
                                            if (l[M] > -w) {
                                                T = M;
                                                break
                                            }
                                        w = -(w = Math.abs(l[T] - w) < Math.abs(l[T - 1] - w) || "next" === t.swipeDirection ? l[T] : l[T - 1])
                                    }
                                    if (C && t.once("transitionEnd", function() {
                                            t.loopFix()
                                        }), 0 !== t.velocity) {
                                        if (b = a ? Math.abs((-w - t.translate) / t.velocity) : Math.abs((w - t.translate) / t.velocity), s.freeModeSticky) {
                                            var k = Math.abs((a ? -w : w) - t.translate),
                                                P = t.slidesSizesGrid[t.activeIndex];
                                            b = k < P ? s.speed : k < 2 * P ? 1.5 * s.speed : 2.5 * s.speed
                                        }
                                    } else if (s.freeModeSticky) return void t.slideToClosest();
                                    s.freeModeMomentumBounce && S ? (t.updateProgress(x), t.setTransition(b), t.setTranslate(w), t.transitionStart(!0, t.swipeDirection), t.animating = !0, r.transitionEnd(function() {
                                        t && !t.destroyed && i.allowMomentumBounce && (t.emit("momentumBounce"), t.setTransition(s.speed), setTimeout(function() {
                                            t.setTranslate(x), r.transitionEnd(function() {
                                                t && !t.destroyed && t.transitionEnd()
                                            })
                                        }, 0))
                                    })) : t.velocity ? (t.updateProgress(w), t.setTransition(b), t.setTranslate(w), t.transitionStart(!0, t.swipeDirection), t.animating || (t.animating = !0, r.transitionEnd(function() {
                                        t && !t.destroyed && t.transitionEnd()
                                    }))) : t.updateProgress(w), t.updateActiveIndex(), t.updateSlidesClasses()
                                } else if (s.freeModeSticky) return void t.slideToClosest();
                                (!s.freeModeMomentum || p >= s.longSwipesMs) && (t.updateProgress(), t.updateActiveIndex(), t.updateSlidesClasses())
                            } else {
                                for (var $ = 0, L = t.slidesSizesGrid[0], z = 0; z < o.length; z += z < s.slidesPerGroupSkip ? 1 : s.slidesPerGroup) {
                                    var I = z < s.slidesPerGroupSkip - 1 ? 1 : s.slidesPerGroup;
                                    void 0 !== o[z + I] ? h >= o[z] && h < o[z + I] && ($ = z, L = o[z + I] - o[z]) : h >= o[z] && ($ = z, L = o[o.length - 1] - o[o.length - 2])
                                }
                                var A = (h - o[$]) / L,
                                    O = $ < s.slidesPerGroupSkip - 1 ? 1 : s.slidesPerGroup;
                                if (p > s.longSwipesMs) {
                                    if (!s.longSwipes) return void t.slideTo(t.activeIndex);
                                    "next" === t.swipeDirection && (A >= s.longSwipesRatio ? t.slideTo($ + O) : t.slideTo($)), "prev" === t.swipeDirection && (A > 1 - s.longSwipesRatio ? t.slideTo($ + O) : t.slideTo($))
                                } else {
                                    if (!s.shortSwipes) return void t.slideTo(t.activeIndex);
                                    !t.navigation || d.target !== t.navigation.nextEl && d.target !== t.navigation.prevEl ? ("next" === t.swipeDirection && t.slideTo($ + O), "prev" === t.swipeDirection && t.slideTo($)) : d.target === t.navigation.nextEl ? t.slideTo($ + O) : t.slideTo($)
                                }
                            }
                    }.bind(this), e.cssMode && (this.onScroll = function() {
                        var e = this.wrapperEl,
                            t = this.rtlTranslate;
                        this.previousTranslate = this.translate, this.isHorizontal() ? this.translate = t ? e.scrollWidth - e.offsetWidth - e.scrollLeft : -e.scrollLeft : this.translate = -e.scrollTop, -0 === this.translate && (this.translate = 0), this.updateActiveIndex(), this.updateSlidesClasses();
                        var i = this.maxTranslate() - this.minTranslate();
                        (0 === i ? 0 : (this.translate - this.minTranslate()) / i) !== this.progress && this.updateProgress(t ? -this.translate : this.translate), this.emit("setTranslate", this.translate, !1)
                    }.bind(this)), this.onClick = function(e) {
                        this.allowClick || (this.params.preventClicks && e.preventDefault(), this.params.preventClicksPropagation && this.animating && (e.stopPropagation(), e.stopImmediatePropagation()))
                    }.bind(this);
                    var a = !!e.nested;
                    if (!d.touch && d.pointerEvents) s.addEventListener(t.start, this.onTouchStart, !1), i.addEventListener(t.move, this.onTouchMove, a), i.addEventListener(t.end, this.onTouchEnd, !1);
                    else {
                        if (d.touch) {
                            var r = !("touchstart" !== t.start || !d.passiveListener || !e.passiveListeners) && {
                                passive: !0,
                                capture: !1
                            };
                            s.addEventListener(t.start, this.onTouchStart, r), s.addEventListener(t.move, this.onTouchMove, d.passiveListener ? {
                                passive: !1,
                                capture: a
                            } : a), s.addEventListener(t.end, this.onTouchEnd, r), t.cancel && s.addEventListener(t.cancel, this.onTouchEnd, r), B || (i.addEventListener("touchstart", N), B = !0)
                        }(e.simulateTouch && !O.ios && !O.android || e.simulateTouch && !d.touch && O.ios) && (s.addEventListener("mousedown", this.onTouchStart, !1), i.addEventListener("mousemove", this.onTouchMove, a), i.addEventListener("mouseup", this.onTouchEnd, !1))
                    }(e.preventClicks || e.preventClicksPropagation) && s.addEventListener("click", this.onClick, !0), e.cssMode && n.addEventListener("scroll", this.onScroll), e.updateOnWindowResize ? this.on(O.ios || O.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", H, !0) : this.on("observerUpdate", H, !0)
                },
                detachEvents: function() {
                    var e = this.params,
                        t = this.touchEvents,
                        s = this.el,
                        n = this.wrapperEl,
                        a = !!e.nested;
                    if (!d.touch && d.pointerEvents) s.removeEventListener(t.start, this.onTouchStart, !1), i.removeEventListener(t.move, this.onTouchMove, a), i.removeEventListener(t.end, this.onTouchEnd, !1);
                    else {
                        if (d.touch) {
                            var r = !("onTouchStart" !== t.start || !d.passiveListener || !e.passiveListeners) && {
                                passive: !0,
                                capture: !1
                            };
                            s.removeEventListener(t.start, this.onTouchStart, r), s.removeEventListener(t.move, this.onTouchMove, a), s.removeEventListener(t.end, this.onTouchEnd, r), t.cancel && s.removeEventListener(t.cancel, this.onTouchEnd, r)
                        }(e.simulateTouch && !O.ios && !O.android || e.simulateTouch && !d.touch && O.ios) && (s.removeEventListener("mousedown", this.onTouchStart, !1), i.removeEventListener("mousemove", this.onTouchMove, a), i.removeEventListener("mouseup", this.onTouchEnd, !1))
                    }(e.preventClicks || e.preventClicksPropagation) && s.removeEventListener("click", this.onClick, !0), e.cssMode && n.removeEventListener("scroll", this.onScroll), this.off(O.ios || O.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", H)
                }
            },
            breakpoints: {
                setBreakpoint: function() {
                    var e = this.activeIndex,
                        t = this.initialized,
                        i = this.loopedSlides;
                    void 0 === i && (i = 0);
                    var s = this.params,
                        n = this.$el,
                        a = s.breakpoints;
                    if (a && (!a || 0 !== Object.keys(a).length)) {
                        var r = this.getBreakpoint(a);
                        if (r && this.currentBreakpoint !== r) {
                            var o = r in a ? a[r] : void 0;
                            o && ["slidesPerView", "spaceBetween", "slidesPerGroup", "slidesPerGroupSkip", "slidesPerColumn"].forEach(function(e) {
                                var t = o[e];
                                void 0 !== t && (o[e] = "slidesPerView" !== e || "AUTO" !== t && "auto" !== t ? "slidesPerView" === e ? parseFloat(t) : parseInt(t, 10) : "auto")
                            });
                            var l = o || this.originalParams,
                                d = s.slidesPerColumn > 1,
                                h = l.slidesPerColumn > 1;
                            d && !h ? n.removeClass(s.containerModifierClass + "multirow " + s.containerModifierClass + "multirow-column") : !d && h && (n.addClass(s.containerModifierClass + "multirow"), "column" === l.slidesPerColumnFill && n.addClass(s.containerModifierClass + "multirow-column"));
                            var u = l.direction && l.direction !== s.direction,
                                p = s.loop && (l.slidesPerView !== s.slidesPerView || u);
                            u && t && this.changeDirection(), c.extend(this.params, l), c.extend(this, {
                                allowTouchMove: this.params.allowTouchMove,
                                allowSlideNext: this.params.allowSlideNext,
                                allowSlidePrev: this.params.allowSlidePrev
                            }), this.currentBreakpoint = r, p && t && (this.loopDestroy(), this.loopCreate(), this.updateSlides(), this.slideTo(e - i + this.loopedSlides, 0, !1)), this.emit("breakpoint", l)
                        }
                    }
                },
                getBreakpoint: function(e) {
                    if (e) {
                        var t = !1,
                            i = Object.keys(e).map(function(e) {
                                if ("string" == typeof e && 0 === e.indexOf("@")) {
                                    var t = parseFloat(e.substr(1));
                                    return {
                                        value: n.innerHeight * t,
                                        point: e
                                    }
                                }
                                return {
                                    value: e,
                                    point: e
                                }
                            });
                        i.sort(function(e, t) {
                            return parseInt(e.value, 10) - parseInt(t.value, 10)
                        });
                        for (var s = 0; s < i.length; s += 1) {
                            var a = i[s],
                                r = a.point;
                            a.value <= n.innerWidth && (t = r)
                        }
                        return t || "max"
                    }
                }
            },
            checkOverflow: {
                checkOverflow: function() {
                    var e = this.params,
                        t = this.isLocked,
                        i = this.slides.length > 0 && e.slidesOffsetBefore + e.spaceBetween * (this.slides.length - 1) + this.slides[0].offsetWidth * this.slides.length;
                    e.slidesOffsetBefore && e.slidesOffsetAfter && i ? this.isLocked = i <= this.size : this.isLocked = 1 === this.snapGrid.length, this.allowSlideNext = !this.isLocked, this.allowSlidePrev = !this.isLocked, t !== this.isLocked && this.emit(this.isLocked ? "lock" : "unlock"), t && t !== this.isLocked && (this.isEnd = !1, this.navigation.update())
                }
            },
            classes: {
                addClasses: function() {
                    var e = this.classNames,
                        t = this.params,
                        i = this.rtl,
                        s = this.$el,
                        n = [];
                    n.push("initialized"), n.push(t.direction), t.freeMode && n.push("free-mode"), t.autoHeight && n.push("autoheight"), i && n.push("rtl"), t.slidesPerColumn > 1 && (n.push("multirow"), "column" === t.slidesPerColumnFill && n.push("multirow-column")), O.android && n.push("android"), O.ios && n.push("ios"), t.cssMode && n.push("css-mode"), n.forEach(function(i) {
                        e.push(t.containerModifierClass + i)
                    }), s.addClass(e.join(" "))
                },
                removeClasses: function() {
                    var e = this.$el,
                        t = this.classNames;
                    e.removeClass(t.join(" "))
                }
            },
            images: {
                loadImage: function(e, t, i, s, a, o) {
                    var l;

                    function c() {
                        o && o()
                    }
                    r(e).parent("picture")[0] || e.complete && a ? c() : t ? ((l = new n.Image).onload = c, l.onerror = c, s && (l.sizes = s), i && (l.srcset = i), t && (l.src = t)) : c()
                },
                preloadImages: function() {
                    var e = this;

                    function t() {
                        null != e && e && !e.destroyed && (void 0 !== e.imagesLoaded && (e.imagesLoaded += 1), e.imagesLoaded === e.imagesToLoad.length && (e.params.updateOnImagesReady && e.update(), e.emit("imagesReady")))
                    }
                    e.imagesToLoad = e.$el.find("img");
                    for (var i = 0; i < e.imagesToLoad.length; i += 1) {
                        var s = e.imagesToLoad[i];
                        e.loadImage(s, s.currentSrc || s.getAttribute("src"), s.srcset || s.getAttribute("srcset"), s.sizes || s.getAttribute("sizes"), !0, t)
                    }
                }
            }
        },
        j = {},
        V = function(e) {
            function t() {
                for (var i, s, n, a = [], o = arguments.length; o--;) a[o] = arguments[o];
                1 === a.length && a[0].constructor && a[0].constructor === Object ? n = a[0] : (s = (i = a)[0], n = i[1]), n || (n = {}), n = c.extend({}, n), s && !n.el && (n.el = s), e.call(this, n), Object.keys(q).forEach(function(e) {
                    Object.keys(q[e]).forEach(function(i) {
                        t.prototype[i] || (t.prototype[i] = q[e][i])
                    })
                });
                var l = this;
                void 0 === l.modules && (l.modules = {}), Object.keys(l.modules).forEach(function(e) {
                    var t = l.modules[e];
                    if (t.params) {
                        var i = Object.keys(t.params)[0],
                            s = t.params[i];
                        if ("object" != typeof s || null === s) return;
                        if (!(i in n && "enabled" in s)) return;
                        !0 === n[i] && (n[i] = {
                            enabled: !0
                        }), "object" != typeof n[i] || "enabled" in n[i] || (n[i].enabled = !0), n[i] || (n[i] = {
                            enabled: !1
                        })
                    }
                });
                var h = c.extend({}, R);
                l.useModulesParams(h), l.params = c.extend({}, h, j, n), l.originalParams = c.extend({}, l.params), l.passedParams = c.extend({}, n), l.$ = r;
                var u = r(l.params.el);
                if (s = u[0]) {
                    if (u.length > 1) {
                        var p = [];
                        return u.each(function(e, i) {
                            var s = c.extend({}, n, {
                                el: i
                            });
                            p.push(new t(s))
                        }), p
                    }
                    var f, m, v;
                    return s.swiper = l, u.data("swiper", l), s && s.shadowRoot && s.shadowRoot.querySelector ? (f = r(s.shadowRoot.querySelector("." + l.params.wrapperClass))).children = function(e) {
                        return u.children(e)
                    } : f = u.children("." + l.params.wrapperClass), c.extend(l, {
                        $el: u,
                        el: s,
                        $wrapperEl: f,
                        wrapperEl: f[0],
                        classNames: [],
                        slides: r(),
                        slidesGrid: [],
                        snapGrid: [],
                        slidesSizesGrid: [],
                        isHorizontal: function() {
                            return "horizontal" === l.params.direction
                        },
                        isVertical: function() {
                            return "vertical" === l.params.direction
                        },
                        rtl: "rtl" === s.dir.toLowerCase() || "rtl" === u.css("direction"),
                        rtlTranslate: "horizontal" === l.params.direction && ("rtl" === s.dir.toLowerCase() || "rtl" === u.css("direction")),
                        wrongRTL: "-webkit-box" === f.css("display"),
                        activeIndex: 0,
                        realIndex: 0,
                        isBeginning: !0,
                        isEnd: !1,
                        translate: 0,
                        previousTranslate: 0,
                        progress: 0,
                        velocity: 0,
                        animating: !1,
                        allowSlideNext: l.params.allowSlideNext,
                        allowSlidePrev: l.params.allowSlidePrev,
                        touchEvents: (m = ["touchstart", "touchmove", "touchend", "touchcancel"], v = ["mousedown", "mousemove", "mouseup"], d.pointerEvents && (v = ["pointerdown", "pointermove", "pointerup"]), l.touchEventsTouch = {
                            start: m[0],
                            move: m[1],
                            end: m[2],
                            cancel: m[3]
                        }, l.touchEventsDesktop = {
                            start: v[0],
                            move: v[1],
                            end: v[2]
                        }, d.touch || !l.params.simulateTouch ? l.touchEventsTouch : l.touchEventsDesktop),
                        touchEventsData: {
                            isTouched: void 0,
                            isMoved: void 0,
                            allowTouchCallbacks: void 0,
                            touchStartTime: void 0,
                            isScrolling: void 0,
                            currentTranslate: void 0,
                            startTranslate: void 0,
                            allowThresholdMove: void 0,
                            formElements: "input, select, option, textarea, button, video, label",
                            lastClickTime: c.now(),
                            clickTimeout: void 0,
                            velocities: [],
                            allowMomentumBounce: void 0,
                            isTouchEvent: void 0,
                            startMoving: void 0
                        },
                        allowClick: !0,
                        allowTouchMove: l.params.allowTouchMove,
                        touches: {
                            startX: 0,
                            startY: 0,
                            currentX: 0,
                            currentY: 0,
                            diff: 0
                        },
                        imagesToLoad: [],
                        imagesLoaded: 0
                    }), l.useModules(), l.params.init && l.init(), l
                }
            }
            e && (t.__proto__ = e), t.prototype = Object.create(e && e.prototype), t.prototype.constructor = t;
            var i = {
                extendedDefaults: {
                    configurable: !0
                },
                defaults: {
                    configurable: !0
                },
                Class: {
                    configurable: !0
                },
                $: {
                    configurable: !0
                }
            };
            return t.prototype.slidesPerViewDynamic = function() {
                var e = this.params,
                    t = this.slides,
                    i = this.slidesGrid,
                    s = this.size,
                    n = this.activeIndex,
                    a = 1;
                if (e.centeredSlides) {
                    for (var r, o = t[n].swiperSlideSize, l = n + 1; l < t.length; l += 1) t[l] && !r && (a += 1, (o += t[l].swiperSlideSize) > s && (r = !0));
                    for (var c = n - 1; c >= 0; c -= 1) t[c] && !r && (a += 1, (o += t[c].swiperSlideSize) > s && (r = !0))
                } else
                    for (var d = n + 1; d < t.length; d += 1) i[d] - i[n] < s && (a += 1);
                return a
            }, t.prototype.update = function() {
                var e = this;
                if (e && !e.destroyed) {
                    var t = e.snapGrid,
                        i = e.params;
                    i.breakpoints && e.setBreakpoint(), e.updateSize(), e.updateSlides(), e.updateProgress(), e.updateSlidesClasses(), e.params.freeMode ? (s(), e.params.autoHeight && e.updateAutoHeight()) : (("auto" === e.params.slidesPerView || e.params.slidesPerView > 1) && e.isEnd && !e.params.centeredSlides ? e.slideTo(e.slides.length - 1, 0, !1, !0) : e.slideTo(e.activeIndex, 0, !1, !0)) || s(), i.watchOverflow && t !== e.snapGrid && e.checkOverflow(), e.emit("update")
                }

                function s() {
                    var t = e.rtlTranslate ? -1 * e.translate : e.translate,
                        i = Math.min(Math.max(t, e.maxTranslate()), e.minTranslate());
                    e.setTranslate(i), e.updateActiveIndex(), e.updateSlidesClasses()
                }
            }, t.prototype.changeDirection = function(e, t) {
                void 0 === t && (t = !0);
                var i = this.params.direction;
                return e || (e = "horizontal" === i ? "vertical" : "horizontal"), e === i || "horizontal" !== e && "vertical" !== e || (this.$el.removeClass("" + this.params.containerModifierClass + i).addClass("" + this.params.containerModifierClass + e), this.params.direction = e, this.slides.each(function(t, i) {
                    "vertical" === e ? i.style.width = "" : i.style.height = ""
                }), this.emit("changeDirection"), t && this.update()), this
            }, t.prototype.init = function() {
                this.initialized || (this.emit("beforeInit"), this.params.breakpoints && this.setBreakpoint(), this.addClasses(), this.params.loop && this.loopCreate(), this.updateSize(), this.updateSlides(), this.params.watchOverflow && this.checkOverflow(), this.params.grabCursor && this.setGrabCursor(), this.params.preloadImages && this.preloadImages(), this.params.loop ? this.slideTo(this.params.initialSlide + this.loopedSlides, 0, this.params.runCallbacksOnInit) : this.slideTo(this.params.initialSlide, 0, this.params.runCallbacksOnInit), this.attachEvents(), this.initialized = !0, this.emit("init"))
            }, t.prototype.destroy = function(e, t) {
                void 0 === e && (e = !0), void 0 === t && (t = !0);
                var i = this,
                    s = i.params,
                    n = i.$el,
                    a = i.$wrapperEl,
                    r = i.slides;
                return void 0 === i.params || i.destroyed || (i.emit("beforeDestroy"), i.initialized = !1, i.detachEvents(), s.loop && i.loopDestroy(), t && (i.removeClasses(), n.removeAttr("style"), a.removeAttr("style"), r && r.length && r.removeClass([s.slideVisibleClass, s.slideActiveClass, s.slideNextClass, s.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-swiper-slide-index")), i.emit("destroy"), Object.keys(i.eventsListeners).forEach(function(e) {
                    i.off(e)
                }), !1 !== e && (i.$el[0].swiper = null, i.$el.data("swiper", null), c.deleteProps(i)), i.destroyed = !0), null
            }, t.extendDefaults = function(e) {
                c.extend(j, e)
            }, i.extendedDefaults.get = function() {
                return j
            }, i.defaults.get = function() {
                return R
            }, i.Class.get = function() {
                return e
            }, i.$.get = function() {
                return r
            }, Object.defineProperties(t, i), t
        }(h),
        X = {
            name: "device",
            proto: {
                device: O
            },
            static: {
                device: O
            }
        },
        Y = {
            name: "support",
            proto: {
                support: d
            },
            static: {
                support: d
            }
        },
        G = {
            isEdge: !!n.navigator.userAgent.match(/Edge/g),
            isSafari: function() {
                var e = n.navigator.userAgent.toLowerCase();
                return e.indexOf("safari") >= 0 && e.indexOf("chrome") < 0 && e.indexOf("android") < 0
            }(),
            isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(n.navigator.userAgent)
        },
        W = {
            name: "browser",
            proto: {
                browser: G
            },
            static: {
                browser: G
            }
        },
        _ = {
            name: "resize",
            create: function() {
                var e = this;
                c.extend(e, {
                    resize: {
                        resizeHandler: function() {
                            e && !e.destroyed && e.initialized && (e.emit("beforeResize"), e.emit("resize"))
                        },
                        orientationChangeHandler: function() {
                            e && !e.destroyed && e.initialized && e.emit("orientationchange")
                        }
                    }
                })
            },
            on: {
                init: function() {
                    n.addEventListener("resize", this.resize.resizeHandler), n.addEventListener("orientationchange", this.resize.orientationChangeHandler)
                },
                destroy: function() {
                    n.removeEventListener("resize", this.resize.resizeHandler), n.removeEventListener("orientationchange", this.resize.orientationChangeHandler)
                }
            }
        },
        U = {
            func: n.MutationObserver || n.WebkitMutationObserver,
            attach: function(e, t) {
                void 0 === t && (t = {});
                var i = this,
                    s = new(0, U.func)(function(e) {
                        if (1 !== e.length) {
                            var t = function() {
                                i.emit("observerUpdate", e[0])
                            };
                            n.requestAnimationFrame ? n.requestAnimationFrame(t) : n.setTimeout(t, 0)
                        } else i.emit("observerUpdate", e[0])
                    });
                s.observe(e, {
                    attributes: void 0 === t.attributes || t.attributes,
                    childList: void 0 === t.childList || t.childList,
                    characterData: void 0 === t.characterData || t.characterData
                }), i.observer.observers.push(s)
            },
            init: function() {
                if (d.observer && this.params.observer) {
                    if (this.params.observeParents)
                        for (var e = this.$el.parents(), t = 0; t < e.length; t += 1) this.observer.attach(e[t]);
                    this.observer.attach(this.$el[0], {
                        childList: this.params.observeSlideChildren
                    }), this.observer.attach(this.$wrapperEl[0], {
                        attributes: !1
                    })
                }
            },
            destroy: function() {
                this.observer.observers.forEach(function(e) {
                    e.disconnect()
                }), this.observer.observers = []
            }
        },
        K = {
            name: "observer",
            params: {
                observer: !1,
                observeParents: !1,
                observeSlideChildren: !1
            },
            create: function() {
                c.extend(this, {
                    observer: {
                        init: U.init.bind(this),
                        attach: U.attach.bind(this),
                        destroy: U.destroy.bind(this),
                        observers: []
                    }
                })
            },
            on: {
                init: function() {
                    this.observer.init()
                },
                destroy: function() {
                    this.observer.destroy()
                }
            }
        },
        Z = {
            update: function(e) {
                var t = this,
                    i = t.params,
                    s = i.slidesPerView,
                    n = i.slidesPerGroup,
                    a = i.centeredSlides,
                    r = t.params.virtual,
                    o = r.addSlidesBefore,
                    l = r.addSlidesAfter,
                    d = t.virtual,
                    h = d.from,
                    u = d.to,
                    p = d.slides,
                    f = d.slidesGrid,
                    m = d.renderSlide,
                    v = d.offset;
                t.updateActiveIndex();
                var g, b, y, w = t.activeIndex || 0;
                g = t.rtlTranslate ? "right" : t.isHorizontal() ? "left" : "top", a ? (b = Math.floor(s / 2) + n + o, y = Math.floor(s / 2) + n + l) : (b = s + (n - 1) + o, y = n + l);
                var x = Math.max((w || 0) - y, 0),
                    C = Math.min((w || 0) + b, p.length - 1),
                    S = (t.slidesGrid[x] || 0) - (t.slidesGrid[0] || 0);

                function E() {
                    t.updateSlides(), t.updateProgress(), t.updateSlidesClasses(), t.lazy && t.params.lazy.enabled && t.lazy.load()
                }
                if (c.extend(t.virtual, {
                        from: x,
                        to: C,
                        offset: S,
                        slidesGrid: t.slidesGrid
                    }), h === x && u === C && !e) return t.slidesGrid !== f && S !== v && t.slides.css(g, S + "px"), void t.updateProgress();
                if (t.params.virtual.renderExternal) return t.params.virtual.renderExternal.call(t, {
                    offset: S,
                    from: x,
                    to: C,
                    slides: function() {
                        for (var e = [], t = x; t <= C; t += 1) e.push(p[t]);
                        return e
                    }()
                }), void E();
                var T = [],
                    M = [];
                if (e) t.$wrapperEl.find("." + t.params.slideClass).remove();
                else
                    for (var k = h; k <= u; k += 1)(k < x || k > C) && t.$wrapperEl.find("." + t.params.slideClass + '[data-swiper-slide-index="' + k + '"]').remove();
                for (var P = 0; P < p.length; P += 1) P >= x && P <= C && (void 0 === u || e ? M.push(P) : (P > u && M.push(P), P < h && T.push(P)));
                M.forEach(function(e) {
                    t.$wrapperEl.append(m(p[e], e))
                }), T.sort(function(e, t) {
                    return t - e
                }).forEach(function(e) {
                    t.$wrapperEl.prepend(m(p[e], e))
                }), t.$wrapperEl.children(".swiper-slide").css(g, S + "px"), E()
            },
            renderSlide: function(e, t) {
                var i = this.params.virtual;
                if (i.cache && this.virtual.cache[t]) return this.virtual.cache[t];
                var s = i.renderSlide ? r(i.renderSlide.call(this, e, t)) : r('<div class="' + this.params.slideClass + '" data-swiper-slide-index="' + t + '">' + e + "</div>");
                return s.attr("data-swiper-slide-index") || s.attr("data-swiper-slide-index", t), i.cache && (this.virtual.cache[t] = s), s
            },
            appendSlide: function(e) {
                if ("object" == typeof e && "length" in e)
                    for (var t = 0; t < e.length; t += 1) e[t] && this.virtual.slides.push(e[t]);
                else this.virtual.slides.push(e);
                this.virtual.update(!0)
            },
            prependSlide: function(e) {
                var t = this.activeIndex,
                    i = t + 1,
                    s = 1;
                if (Array.isArray(e)) {
                    for (var n = 0; n < e.length; n += 1) e[n] && this.virtual.slides.unshift(e[n]);
                    i = t + e.length, s = e.length
                } else this.virtual.slides.unshift(e);
                if (this.params.virtual.cache) {
                    var a = this.virtual.cache,
                        r = {};
                    Object.keys(a).forEach(function(e) {
                        var t = a[e],
                            i = t.attr("data-swiper-slide-index");
                        i && t.attr("data-swiper-slide-index", parseInt(i, 10) + 1), r[parseInt(e, 10) + s] = t
                    }), this.virtual.cache = r
                }
                this.virtual.update(!0), this.slideTo(i, 0)
            },
            removeSlide: function(e) {
                if (null != e) {
                    var t = this.activeIndex;
                    if (Array.isArray(e))
                        for (var i = e.length - 1; i >= 0; i -= 1) this.virtual.slides.splice(e[i], 1), this.params.virtual.cache && delete this.virtual.cache[e[i]], e[i] < t && (t -= 1), t = Math.max(t, 0);
                    else this.virtual.slides.splice(e, 1), this.params.virtual.cache && delete this.virtual.cache[e], e < t && (t -= 1), t = Math.max(t, 0);
                    this.virtual.update(!0), this.slideTo(t, 0)
                }
            },
            removeAllSlides: function() {
                this.virtual.slides = [], this.params.virtual.cache && (this.virtual.cache = {}), this.virtual.update(!0), this.slideTo(0, 0)
            }
        },
        Q = {
            name: "virtual",
            params: {
                virtual: {
                    enabled: !1,
                    slides: [],
                    cache: !0,
                    renderSlide: null,
                    renderExternal: null,
                    addSlidesBefore: 0,
                    addSlidesAfter: 0
                }
            },
            create: function() {
                c.extend(this, {
                    virtual: {
                        update: Z.update.bind(this),
                        appendSlide: Z.appendSlide.bind(this),
                        prependSlide: Z.prependSlide.bind(this),
                        removeSlide: Z.removeSlide.bind(this),
                        removeAllSlides: Z.removeAllSlides.bind(this),
                        renderSlide: Z.renderSlide.bind(this),
                        slides: this.params.virtual.slides,
                        cache: {}
                    }
                })
            },
            on: {
                beforeInit: function() {
                    if (this.params.virtual.enabled) {
                        this.classNames.push(this.params.containerModifierClass + "virtual");
                        var e = {
                            watchSlidesProgress: !0
                        };
                        c.extend(this.params, e), c.extend(this.originalParams, e), this.params.initialSlide || this.virtual.update()
                    }
                },
                setTranslate: function() {
                    this.params.virtual.enabled && this.virtual.update()
                }
            }
        },
        J = {
            handle: function(e) {
                var t = this.rtlTranslate,
                    s = e;
                s.originalEvent && (s = s.originalEvent);
                var a = s.keyCode || s.charCode;
                if (!this.allowSlideNext && (this.isHorizontal() && 39 === a || this.isVertical() && 40 === a || 34 === a)) return !1;
                if (!this.allowSlidePrev && (this.isHorizontal() && 37 === a || this.isVertical() && 38 === a || 33 === a)) return !1;
                if (!(s.shiftKey || s.altKey || s.ctrlKey || s.metaKey || i.activeElement && i.activeElement.nodeName && ("input" === i.activeElement.nodeName.toLowerCase() || "textarea" === i.activeElement.nodeName.toLowerCase()))) {
                    if (this.params.keyboard.onlyInViewport && (33 === a || 34 === a || 37 === a || 39 === a || 38 === a || 40 === a)) {
                        var r = !1;
                        if (this.$el.parents("." + this.params.slideClass).length > 0 && 0 === this.$el.parents("." + this.params.slideActiveClass).length) return;
                        var o = n.innerWidth,
                            l = n.innerHeight,
                            c = this.$el.offset();
                        t && (c.left -= this.$el[0].scrollLeft);
                        for (var d = [
                                [c.left, c.top],
                                [c.left + this.width, c.top],
                                [c.left, c.top + this.height],
                                [c.left + this.width, c.top + this.height]
                            ], h = 0; h < d.length; h += 1) {
                            var u = d[h];
                            u[0] >= 0 && u[0] <= o && u[1] >= 0 && u[1] <= l && (r = !0)
                        }
                        if (!r) return
                    }
                    this.isHorizontal() ? (33 !== a && 34 !== a && 37 !== a && 39 !== a || (s.preventDefault ? s.preventDefault() : s.returnValue = !1), (34 !== a && 39 !== a || t) && (33 !== a && 37 !== a || !t) || this.slideNext(), (33 !== a && 37 !== a || t) && (34 !== a && 39 !== a || !t) || this.slidePrev()) : (33 !== a && 34 !== a && 38 !== a && 40 !== a || (s.preventDefault ? s.preventDefault() : s.returnValue = !1), 34 !== a && 40 !== a || this.slideNext(), 33 !== a && 38 !== a || this.slidePrev()), this.emit("keyPress", a)
                }
            },
            enable: function() {
                this.keyboard.enabled || (r(i).on("keydown", this.keyboard.handle), this.keyboard.enabled = !0)
            },
            disable: function() {
                this.keyboard.enabled && (r(i).off("keydown", this.keyboard.handle), this.keyboard.enabled = !1)
            }
        },
        ee = {
            name: "keyboard",
            params: {
                keyboard: {
                    enabled: !1,
                    onlyInViewport: !0
                }
            },
            create: function() {
                c.extend(this, {
                    keyboard: {
                        enabled: !1,
                        enable: J.enable.bind(this),
                        disable: J.disable.bind(this),
                        handle: J.handle.bind(this)
                    }
                })
            },
            on: {
                init: function() {
                    this.params.keyboard.enabled && this.keyboard.enable()
                },
                destroy: function() {
                    this.keyboard.enabled && this.keyboard.disable()
                }
            }
        },
        te = {
            lastScrollTime: c.now(),
            lastEventBeforeSnap: void 0,
            recentWheelEvents: [],
            event: function() {
                return n.navigator.userAgent.indexOf("firefox") > -1 ? "DOMMouseScroll" : function() {
                    var e = "onwheel" in i;
                    if (!e) {
                        var t = i.createElement("div");
                        t.setAttribute("onwheel", "return;"), e = "function" == typeof t.onwheel
                    }
                    return !e && i.implementation && i.implementation.hasFeature && !0 !== i.implementation.hasFeature("", "") && (e = i.implementation.hasFeature("Events.wheel", "3.0")), e
                }() ? "wheel" : "mousewheel"
            },
            normalize: function(e) {
                var t = 0,
                    i = 0,
                    s = 0,
                    n = 0;
                return "detail" in e && (i = e.detail), "wheelDelta" in e && (i = -e.wheelDelta / 120), "wheelDeltaY" in e && (i = -e.wheelDeltaY / 120), "wheelDeltaX" in e && (t = -e.wheelDeltaX / 120), "axis" in e && e.axis === e.HORIZONTAL_AXIS && (t = i, i = 0), s = 10 * t, n = 10 * i, "deltaY" in e && (n = e.deltaY), "deltaX" in e && (s = e.deltaX), e.shiftKey && !s && (s = n, n = 0), (s || n) && e.deltaMode && (1 === e.deltaMode ? (s *= 40, n *= 40) : (s *= 800, n *= 800)), s && !t && (t = s < 1 ? -1 : 1), n && !i && (i = n < 1 ? -1 : 1), {
                    spinX: t,
                    spinY: i,
                    pixelX: s,
                    pixelY: n
                }
            },
            handleMouseEnter: function() {
                this.mouseEntered = !0
            },
            handleMouseLeave: function() {
                this.mouseEntered = !1
            },
            handle: function(e) {
                var t = e,
                    i = this,
                    s = i.params.mousewheel;
                i.params.cssMode && t.preventDefault();
                var n = i.$el;
                if ("container" !== i.params.mousewheel.eventsTarged && (n = r(i.params.mousewheel.eventsTarged)), !i.mouseEntered && !n[0].contains(t.target) && !s.releaseOnEdges) return !0;
                t.originalEvent && (t = t.originalEvent);
                var a = 0,
                    o = i.rtlTranslate ? -1 : 1,
                    l = te.normalize(t);
                if (s.forceToAxis)
                    if (i.isHorizontal()) {
                        if (!(Math.abs(l.pixelX) > Math.abs(l.pixelY))) return !0;
                        a = l.pixelX * o
                    } else {
                        if (!(Math.abs(l.pixelY) > Math.abs(l.pixelX))) return !0;
                        a = l.pixelY
                    }
                else a = Math.abs(l.pixelX) > Math.abs(l.pixelY) ? -l.pixelX * o : -l.pixelY;
                if (0 === a) return !0;
                if (s.invert && (a = -a), i.params.freeMode) {
                    var d = {
                            time: c.now(),
                            delta: Math.abs(a),
                            direction: Math.sign(a)
                        },
                        h = i.mousewheel.lastEventBeforeSnap,
                        u = h && d.time < h.time + 500 && d.delta <= h.delta && d.direction === h.direction;
                    if (!u) {
                        i.mousewheel.lastEventBeforeSnap = void 0, i.params.loop && i.loopFix();
                        var p = i.getTranslate() + a * s.sensitivity,
                            f = i.isBeginning,
                            m = i.isEnd;
                        if (p >= i.minTranslate() && (p = i.minTranslate()), p <= i.maxTranslate() && (p = i.maxTranslate()), i.setTransition(0), i.setTranslate(p), i.updateProgress(), i.updateActiveIndex(), i.updateSlidesClasses(), (!f && i.isBeginning || !m && i.isEnd) && i.updateSlidesClasses(), i.params.freeModeSticky) {
                            clearTimeout(i.mousewheel.timeout), i.mousewheel.timeout = void 0;
                            var v = i.mousewheel.recentWheelEvents;
                            v.length >= 15 && v.shift();
                            var g = v.length ? v[v.length - 1] : void 0,
                                b = v[0];
                            if (v.push(d), g && (d.delta > g.delta || d.direction !== g.direction)) v.splice(0);
                            else if (v.length >= 15 && d.time - b.time < 500 && b.delta - d.delta >= 1 && d.delta <= 6) {
                                var y = a > 0 ? .8 : .2;
                                i.mousewheel.lastEventBeforeSnap = d, v.splice(0), i.mousewheel.timeout = c.nextTick(function() {
                                    i.slideToClosest(i.params.speed, !0, void 0, y)
                                }, 0)
                            }
                            i.mousewheel.timeout || (i.mousewheel.timeout = c.nextTick(function() {
                                i.mousewheel.lastEventBeforeSnap = d, v.splice(0), i.slideToClosest(i.params.speed, !0, void 0, .5)
                            }, 500))
                        }
                        if (u || i.emit("scroll", t), i.params.autoplay && i.params.autoplayDisableOnInteraction && i.autoplay.stop(), p === i.minTranslate() || p === i.maxTranslate()) return !0
                    }
                } else {
                    var w = {
                            time: c.now(),
                            delta: Math.abs(a),
                            direction: Math.sign(a),
                            raw: e
                        },
                        x = i.mousewheel.recentWheelEvents;
                    x.length >= 2 && x.shift();
                    var C = x.length ? x[x.length - 1] : void 0;
                    if (x.push(w), C ? (w.direction !== C.direction || w.delta > C.delta || w.time > C.time + 150) && i.mousewheel.animateSlider(w) : i.mousewheel.animateSlider(w), i.mousewheel.releaseScroll(w)) return !0
                }
                return t.preventDefault ? t.preventDefault() : t.returnValue = !1, !1
            },
            animateSlider: function(e) {
                return e.delta >= 6 && c.now() - this.mousewheel.lastScrollTime < 60 || (e.direction < 0 ? this.isEnd && !this.params.loop || this.animating || (this.slideNext(), this.emit("scroll", e.raw)) : this.isBeginning && !this.params.loop || this.animating || (this.slidePrev(), this.emit("scroll", e.raw)), this.mousewheel.lastScrollTime = (new n.Date).getTime(), !1)
            },
            releaseScroll: function(e) {
                var t = this.params.mousewheel;
                if (e.direction < 0) {
                    if (this.isEnd && !this.params.loop && t.releaseOnEdges) return !0
                } else if (this.isBeginning && !this.params.loop && t.releaseOnEdges) return !0;
                return !1
            },
            enable: function() {
                var e = te.event();
                if (this.params.cssMode) return this.wrapperEl.removeEventListener(e, this.mousewheel.handle), !0;
                if (!e) return !1;
                if (this.mousewheel.enabled) return !1;
                var t = this.$el;
                return "container" !== this.params.mousewheel.eventsTarged && (t = r(this.params.mousewheel.eventsTarged)), t.on("mouseenter", this.mousewheel.handleMouseEnter), t.on("mouseleave", this.mousewheel.handleMouseLeave), t.on(e, this.mousewheel.handle), this.mousewheel.enabled = !0, !0
            },
            disable: function() {
                var e = te.event();
                if (this.params.cssMode) return this.wrapperEl.addEventListener(e, this.mousewheel.handle), !0;
                if (!e) return !1;
                if (!this.mousewheel.enabled) return !1;
                var t = this.$el;
                return "container" !== this.params.mousewheel.eventsTarged && (t = r(this.params.mousewheel.eventsTarged)), t.off(e, this.mousewheel.handle), this.mousewheel.enabled = !1, !0
            }
        },
        ie = {
            update: function() {
                var e = this.params.navigation;
                if (!this.params.loop) {
                    var t = this.navigation,
                        i = t.$nextEl,
                        s = t.$prevEl;
                    s && s.length > 0 && (this.isBeginning ? s.addClass(e.disabledClass) : s.removeClass(e.disabledClass), s[this.params.watchOverflow && this.isLocked ? "addClass" : "removeClass"](e.lockClass)), i && i.length > 0 && (this.isEnd ? i.addClass(e.disabledClass) : i.removeClass(e.disabledClass), i[this.params.watchOverflow && this.isLocked ? "addClass" : "removeClass"](e.lockClass))
                }
            },
            onPrevClick: function(e) {
                e.preventDefault(), this.isBeginning && !this.params.loop || this.slidePrev()
            },
            onNextClick: function(e) {
                e.preventDefault(), this.isEnd && !this.params.loop || this.slideNext()
            },
            init: function() {
                var e, t, i = this.params.navigation;
                (i.nextEl || i.prevEl) && (i.nextEl && (e = r(i.nextEl), this.params.uniqueNavElements && "string" == typeof i.nextEl && e.length > 1 && 1 === this.$el.find(i.nextEl).length && (e = this.$el.find(i.nextEl))), i.prevEl && (t = r(i.prevEl), this.params.uniqueNavElements && "string" == typeof i.prevEl && t.length > 1 && 1 === this.$el.find(i.prevEl).length && (t = this.$el.find(i.prevEl))), e && e.length > 0 && e.on("click", this.navigation.onNextClick), t && t.length > 0 && t.on("click", this.navigation.onPrevClick), c.extend(this.navigation, {
                    $nextEl: e,
                    nextEl: e && e[0],
                    $prevEl: t,
                    prevEl: t && t[0]
                }))
            },
            destroy: function() {
                var e = this.navigation,
                    t = e.$nextEl,
                    i = e.$prevEl;
                t && t.length && (t.off("click", this.navigation.onNextClick), t.removeClass(this.params.navigation.disabledClass)), i && i.length && (i.off("click", this.navigation.onPrevClick), i.removeClass(this.params.navigation.disabledClass))
            }
        },
        se = {
            update: function() {
                var e = this.rtl,
                    t = this.params.pagination;
                if (t.el && this.pagination.el && this.pagination.$el && 0 !== this.pagination.$el.length) {
                    var i, s = this.virtual && this.params.virtual.enabled ? this.virtual.slides.length : this.slides.length,
                        n = this.pagination.$el,
                        a = this.params.loop ? Math.ceil((s - 2 * this.loopedSlides) / this.params.slidesPerGroup) : this.snapGrid.length;
                    if (this.params.loop ? ((i = Math.ceil((this.activeIndex - this.loopedSlides) / this.params.slidesPerGroup)) > s - 1 - 2 * this.loopedSlides && (i -= s - 2 * this.loopedSlides), i > a - 1 && (i -= a), i < 0 && "bullets" !== this.params.paginationType && (i = a + i)) : i = void 0 !== this.snapIndex ? this.snapIndex : this.activeIndex || 0, "bullets" === t.type && this.pagination.bullets && this.pagination.bullets.length > 0) {
                        var o, l, c, d = this.pagination.bullets;
                        if (t.dynamicBullets && (this.pagination.bulletSize = d.eq(0)[this.isHorizontal() ? "outerWidth" : "outerHeight"](!0), n.css(this.isHorizontal() ? "width" : "height", this.pagination.bulletSize * (t.dynamicMainBullets + 4) + "px"), t.dynamicMainBullets > 1 && void 0 !== this.previousIndex && (this.pagination.dynamicBulletIndex += i - this.previousIndex, this.pagination.dynamicBulletIndex > t.dynamicMainBullets - 1 ? this.pagination.dynamicBulletIndex = t.dynamicMainBullets - 1 : this.pagination.dynamicBulletIndex < 0 && (this.pagination.dynamicBulletIndex = 0)), o = i - this.pagination.dynamicBulletIndex, c = ((l = o + (Math.min(d.length, t.dynamicMainBullets) - 1)) + o) / 2), d.removeClass(t.bulletActiveClass + " " + t.bulletActiveClass + "-next " + t.bulletActiveClass + "-next-next " + t.bulletActiveClass + "-prev " + t.bulletActiveClass + "-prev-prev " + t.bulletActiveClass + "-main"), n.length > 1) d.each(function(e, s) {
                            var n = r(s),
                                a = n.index();
                            a === i && n.addClass(t.bulletActiveClass), t.dynamicBullets && (a >= o && a <= l && n.addClass(t.bulletActiveClass + "-main"), a === o && n.prev().addClass(t.bulletActiveClass + "-prev").prev().addClass(t.bulletActiveClass + "-prev-prev"), a === l && n.next().addClass(t.bulletActiveClass + "-next").next().addClass(t.bulletActiveClass + "-next-next"))
                        });
                        else {
                            var h = d.eq(i),
                                u = h.index();
                            if (h.addClass(t.bulletActiveClass), t.dynamicBullets) {
                                for (var p = d.eq(o), f = d.eq(l), m = o; m <= l; m += 1) d.eq(m).addClass(t.bulletActiveClass + "-main");
                                if (this.params.loop)
                                    if (u >= d.length - t.dynamicMainBullets) {
                                        for (var v = t.dynamicMainBullets; v >= 0; v -= 1) d.eq(d.length - v).addClass(t.bulletActiveClass + "-main");
                                        d.eq(d.length - t.dynamicMainBullets - 1).addClass(t.bulletActiveClass + "-prev")
                                    } else p.prev().addClass(t.bulletActiveClass + "-prev").prev().addClass(t.bulletActiveClass + "-prev-prev"), f.next().addClass(t.bulletActiveClass + "-next").next().addClass(t.bulletActiveClass + "-next-next");
                                else p.prev().addClass(t.bulletActiveClass + "-prev").prev().addClass(t.bulletActiveClass + "-prev-prev"), f.next().addClass(t.bulletActiveClass + "-next").next().addClass(t.bulletActiveClass + "-next-next")
                            }
                        }
                        if (t.dynamicBullets) {
                            var g = Math.min(d.length, t.dynamicMainBullets + 4),
                                b = (this.pagination.bulletSize * g - this.pagination.bulletSize) / 2 - c * this.pagination.bulletSize,
                                y = e ? "right" : "left";
                            d.css(this.isHorizontal() ? y : "top", b + "px")
                        }
                    }
                    if ("fraction" === t.type && (n.find("." + t.currentClass).text(t.formatFractionCurrent(i + 1)), n.find("." + t.totalClass).text(t.formatFractionTotal(a))), "progressbar" === t.type) {
                        var w;
                        w = t.progressbarOpposite ? this.isHorizontal() ? "vertical" : "horizontal" : this.isHorizontal() ? "horizontal" : "vertical";
                        var x = (i + 1) / a,
                            C = 1,
                            S = 1;
                        "horizontal" === w ? C = x : S = x, n.find("." + t.progressbarFillClass).transform("translate3d(0,0,0) scaleX(" + C + ") scaleY(" + S + ")").transition(this.params.speed)
                    }
                    "custom" === t.type && t.renderCustom ? (n.html(t.renderCustom(this, i + 1, a)), this.emit("paginationRender", this, n[0])) : this.emit("paginationUpdate", this, n[0]), n[this.params.watchOverflow && this.isLocked ? "addClass" : "removeClass"](t.lockClass)
                }
            },
            render: function() {
                var e = this.params.pagination;
                if (e.el && this.pagination.el && this.pagination.$el && 0 !== this.pagination.$el.length) {
                    var t = this.virtual && this.params.virtual.enabled ? this.virtual.slides.length : this.slides.length,
                        i = this.pagination.$el,
                        s = "";
                    if ("bullets" === e.type) {
                        for (var n = this.params.loop ? Math.ceil((t - 2 * this.loopedSlides) / this.params.slidesPerGroup) : this.snapGrid.length, a = 0; a < n; a += 1) e.renderBullet ? s += e.renderBullet.call(this, a, e.bulletClass) : s += "<" + e.bulletElement + ' class="' + e.bulletClass + '"></' + e.bulletElement + ">";
                        i.html(s), this.pagination.bullets = i.find("." + e.bulletClass)
                    }
                    "fraction" === e.type && (s = e.renderFraction ? e.renderFraction.call(this, e.currentClass, e.totalClass) : '<span class="' + e.currentClass + '"></span> / <span class="' + e.totalClass + '"></span>', i.html(s)), "progressbar" === e.type && (s = e.renderProgressbar ? e.renderProgressbar.call(this, e.progressbarFillClass) : '<span class="' + e.progressbarFillClass + '"></span>', i.html(s)), "custom" !== e.type && this.emit("paginationRender", this.pagination.$el[0])
                }
            },
            init: function() {
                var e = this,
                    t = e.params.pagination;
                if (t.el) {
                    var i = r(t.el);
                    0 !== i.length && (e.params.uniqueNavElements && "string" == typeof t.el && i.length > 1 && 1 === e.$el.find(t.el).length && (i = e.$el.find(t.el)), "bullets" === t.type && t.clickable && i.addClass(t.clickableClass), i.addClass(t.modifierClass + t.type), "bullets" === t.type && t.dynamicBullets && (i.addClass("" + t.modifierClass + t.type + "-dynamic"), e.pagination.dynamicBulletIndex = 0, t.dynamicMainBullets < 1 && (t.dynamicMainBullets = 1)), "progressbar" === t.type && t.progressbarOpposite && i.addClass(t.progressbarOppositeClass), t.clickable && i.on("click", "." + t.bulletClass, function(t) {
                        t.preventDefault();
                        var i = r(this).index() * e.params.slidesPerGroup;
                        e.params.loop && (i += e.loopedSlides), e.slideTo(i)
                    }), c.extend(e.pagination, {
                        $el: i,
                        el: i[0]
                    }))
                }
            },
            destroy: function() {
                var e = this.params.pagination;
                if (e.el && this.pagination.el && this.pagination.$el && 0 !== this.pagination.$el.length) {
                    var t = this.pagination.$el;
                    t.removeClass(e.hiddenClass), t.removeClass(e.modifierClass + e.type), this.pagination.bullets && this.pagination.bullets.removeClass(e.bulletActiveClass), e.clickable && t.off("click", "." + e.bulletClass)
                }
            }
        },
        ne = {
            setTranslate: function() {
                if (this.params.scrollbar.el && this.scrollbar.el) {
                    var e = this.scrollbar,
                        t = this.rtlTranslate,
                        i = this.progress,
                        s = e.dragSize,
                        n = e.trackSize,
                        a = e.$dragEl,
                        r = e.$el,
                        o = this.params.scrollbar,
                        l = s,
                        c = (n - s) * i;
                    t ? (c = -c) > 0 ? (l = s - c, c = 0) : -c + s > n && (l = n + c) : c < 0 ? (l = s + c, c = 0) : c + s > n && (l = n - c), this.isHorizontal() ? (a.transform("translate3d(" + c + "px, 0, 0)"), a[0].style.width = l + "px") : (a.transform("translate3d(0px, " + c + "px, 0)"), a[0].style.height = l + "px"), o.hide && (clearTimeout(this.scrollbar.timeout), r[0].style.opacity = 1, this.scrollbar.timeout = setTimeout(function() {
                        r[0].style.opacity = 0, r.transition(400)
                    }, 1e3))
                }
            },
            setTransition: function(e) {
                this.params.scrollbar.el && this.scrollbar.el && this.scrollbar.$dragEl.transition(e)
            },
            updateSize: function() {
                if (this.params.scrollbar.el && this.scrollbar.el) {
                    var e = this.scrollbar,
                        t = e.$dragEl,
                        i = e.$el;
                    t[0].style.width = "", t[0].style.height = "";
                    var s, n = this.isHorizontal() ? i[0].offsetWidth : i[0].offsetHeight,
                        a = this.size / this.virtualSize,
                        r = a * (n / this.size);
                    s = "auto" === this.params.scrollbar.dragSize ? n * a : parseInt(this.params.scrollbar.dragSize, 10), this.isHorizontal() ? t[0].style.width = s + "px" : t[0].style.height = s + "px", i[0].style.display = a >= 1 ? "none" : "", this.params.scrollbar.hide && (i[0].style.opacity = 0), c.extend(e, {
                        trackSize: n,
                        divider: a,
                        moveDivider: r,
                        dragSize: s
                    }), e.$el[this.params.watchOverflow && this.isLocked ? "addClass" : "removeClass"](this.params.scrollbar.lockClass)
                }
            },
            getPointerPosition: function(e) {
                return this.isHorizontal() ? "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].clientX : e.clientX : "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].clientY : e.clientY
            },
            setDragPosition: function(e) {
                var t, i = this.scrollbar,
                    s = this.rtlTranslate,
                    n = i.$el,
                    a = i.dragSize,
                    r = i.trackSize,
                    o = i.dragStartPos;
                t = (i.getPointerPosition(e) - n.offset()[this.isHorizontal() ? "left" : "top"] - (null !== o ? o : a / 2)) / (r - a), t = Math.max(Math.min(t, 1), 0), s && (t = 1 - t);
                var l = this.minTranslate() + (this.maxTranslate() - this.minTranslate()) * t;
                this.updateProgress(l), this.setTranslate(l), this.updateActiveIndex(), this.updateSlidesClasses()
            },
            onDragStart: function(e) {
                var t = this.params.scrollbar,
                    i = this.scrollbar,
                    s = this.$wrapperEl,
                    n = i.$el,
                    a = i.$dragEl;
                this.scrollbar.isTouched = !0, this.scrollbar.dragStartPos = e.target === a[0] || e.target === a ? i.getPointerPosition(e) - e.target.getBoundingClientRect()[this.isHorizontal() ? "left" : "top"] : null, e.preventDefault(), e.stopPropagation(), s.transition(100), a.transition(100), i.setDragPosition(e), clearTimeout(this.scrollbar.dragTimeout), n.transition(0), t.hide && n.css("opacity", 1), this.params.cssMode && this.$wrapperEl.css("scroll-snap-type", "none"), this.emit("scrollbarDragStart", e)
            },
            onDragMove: function(e) {
                var t = this.scrollbar,
                    i = this.$wrapperEl,
                    s = t.$el,
                    n = t.$dragEl;
                this.scrollbar.isTouched && (e.preventDefault ? e.preventDefault() : e.returnValue = !1, t.setDragPosition(e), i.transition(0), s.transition(0), n.transition(0), this.emit("scrollbarDragMove", e))
            },
            onDragEnd: function(e) {
                var t = this.params.scrollbar,
                    i = this.scrollbar,
                    s = this.$wrapperEl,
                    n = i.$el;
                this.scrollbar.isTouched && (this.scrollbar.isTouched = !1, this.params.cssMode && (this.$wrapperEl.css("scroll-snap-type", ""), s.transition("")), t.hide && (clearTimeout(this.scrollbar.dragTimeout), this.scrollbar.dragTimeout = c.nextTick(function() {
                    n.css("opacity", 0), n.transition(400)
                }, 1e3)), this.emit("scrollbarDragEnd", e), t.snapOnRelease && this.slideToClosest())
            },
            enableDraggable: function() {
                if (this.params.scrollbar.el) {
                    var e = this.scrollbar,
                        t = this.touchEventsTouch,
                        s = this.touchEventsDesktop,
                        n = this.params,
                        a = e.$el[0],
                        r = !(!d.passiveListener || !n.passiveListeners) && {
                            passive: !1,
                            capture: !1
                        },
                        o = !(!d.passiveListener || !n.passiveListeners) && {
                            passive: !0,
                            capture: !1
                        };
                    d.touch ? (a.addEventListener(t.start, this.scrollbar.onDragStart, r), a.addEventListener(t.move, this.scrollbar.onDragMove, r), a.addEventListener(t.end, this.scrollbar.onDragEnd, o)) : (a.addEventListener(s.start, this.scrollbar.onDragStart, r), i.addEventListener(s.move, this.scrollbar.onDragMove, r), i.addEventListener(s.end, this.scrollbar.onDragEnd, o))
                }
            },
            disableDraggable: function() {
                if (this.params.scrollbar.el) {
                    var e = this.scrollbar,
                        t = this.touchEventsTouch,
                        s = this.touchEventsDesktop,
                        n = this.params,
                        a = e.$el[0],
                        r = !(!d.passiveListener || !n.passiveListeners) && {
                            passive: !1,
                            capture: !1
                        },
                        o = !(!d.passiveListener || !n.passiveListeners) && {
                            passive: !0,
                            capture: !1
                        };
                    d.touch ? (a.removeEventListener(t.start, this.scrollbar.onDragStart, r), a.removeEventListener(t.move, this.scrollbar.onDragMove, r), a.removeEventListener(t.end, this.scrollbar.onDragEnd, o)) : (a.removeEventListener(s.start, this.scrollbar.onDragStart, r), i.removeEventListener(s.move, this.scrollbar.onDragMove, r), i.removeEventListener(s.end, this.scrollbar.onDragEnd, o))
                }
            },
            init: function() {
                if (this.params.scrollbar.el) {
                    var e = this.scrollbar,
                        t = this.$el,
                        i = this.params.scrollbar,
                        s = r(i.el);
                    this.params.uniqueNavElements && "string" == typeof i.el && s.length > 1 && 1 === t.find(i.el).length && (s = t.find(i.el));
                    var n = s.find("." + this.params.scrollbar.dragClass);
                    0 === n.length && (n = r('<div class="' + this.params.scrollbar.dragClass + '"></div>'), s.append(n)), c.extend(e, {
                        $el: s,
                        el: s[0],
                        $dragEl: n,
                        dragEl: n[0]
                    }), i.draggable && e.enableDraggable()
                }
            },
            destroy: function() {
                this.scrollbar.disableDraggable()
            }
        },
        ae = {
            setTransform: function(e, t) {
                var i = this.rtl,
                    s = r(e),
                    n = i ? -1 : 1,
                    a = s.attr("data-swiper-parallax") || "0",
                    o = s.attr("data-swiper-parallax-x"),
                    l = s.attr("data-swiper-parallax-y"),
                    c = s.attr("data-swiper-parallax-scale"),
                    d = s.attr("data-swiper-parallax-opacity");
                if (o || l ? (o = o || "0", l = l || "0") : this.isHorizontal() ? (o = a, l = "0") : (l = a, o = "0"), o = o.indexOf("%") >= 0 ? parseInt(o, 10) * t * n + "%" : o * t * n + "px", l = l.indexOf("%") >= 0 ? parseInt(l, 10) * t + "%" : l * t + "px", null != d) {
                    var h = d - (d - 1) * (1 - Math.abs(t));
                    s[0].style.opacity = h
                }
                if (null == c) s.transform("translate3d(" + o + ", " + l + ", 0px)");
                else {
                    var u = c - (c - 1) * (1 - Math.abs(t));
                    s.transform("translate3d(" + o + ", " + l + ", 0px) scale(" + u + ")")
                }
            },
            setTranslate: function() {
                var e = this,
                    t = e.$el,
                    i = e.slides,
                    s = e.progress,
                    n = e.snapGrid;
                t.children("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each(function(t, i) {
                    e.parallax.setTransform(i, s)
                }), i.each(function(t, i) {
                    var a = i.progress;
                    e.params.slidesPerGroup > 1 && "auto" !== e.params.slidesPerView && (a += Math.ceil(t / 2) - s * (n.length - 1)), a = Math.min(Math.max(a, -1), 1), r(i).find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each(function(t, i) {
                        e.parallax.setTransform(i, a)
                    })
                })
            },
            setTransition: function(e) {
                void 0 === e && (e = this.params.speed), this.$el.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each(function(t, i) {
                    var s = r(i),
                        n = parseInt(s.attr("data-swiper-parallax-duration"), 10) || e;
                    0 === e && (n = 0), s.transition(n)
                })
            }
        },
        re = {
            getDistanceBetweenTouches: function(e) {
                if (e.targetTouches.length < 2) return 1;
                var t = e.targetTouches[0].pageX,
                    i = e.targetTouches[0].pageY,
                    s = e.targetTouches[1].pageX,
                    n = e.targetTouches[1].pageY;
                return Math.sqrt(Math.pow(s - t, 2) + Math.pow(n - i, 2))
            },
            onGestureStart: function(e) {
                var t = this.params.zoom,
                    i = this.zoom,
                    s = i.gesture;
                if (i.fakeGestureTouched = !1, i.fakeGestureMoved = !1, !d.gestures) {
                    if ("touchstart" !== e.type || "touchstart" === e.type && e.targetTouches.length < 2) return;
                    i.fakeGestureTouched = !0, s.scaleStart = re.getDistanceBetweenTouches(e)
                }
                s.$slideEl && s.$slideEl.length || (s.$slideEl = r(e.target).closest("." + this.params.slideClass), 0 === s.$slideEl.length && (s.$slideEl = this.slides.eq(this.activeIndex)), s.$imageEl = s.$slideEl.find("img, svg, canvas, picture, .swiper-zoom-target"), s.$imageWrapEl = s.$imageEl.parent("." + t.containerClass), s.maxRatio = s.$imageWrapEl.attr("data-swiper-zoom") || t.maxRatio, 0 !== s.$imageWrapEl.length) ? (s.$imageEl && s.$imageEl.transition(0), this.zoom.isScaling = !0) : s.$imageEl = void 0
            },
            onGestureChange: function(e) {
                var t = this.params.zoom,
                    i = this.zoom,
                    s = i.gesture;
                if (!d.gestures) {
                    if ("touchmove" !== e.type || "touchmove" === e.type && e.targetTouches.length < 2) return;
                    i.fakeGestureMoved = !0, s.scaleMove = re.getDistanceBetweenTouches(e)
                }
                s.$imageEl && 0 !== s.$imageEl.length && (i.scale = d.gestures ? e.scale * i.currentScale : s.scaleMove / s.scaleStart * i.currentScale, i.scale > s.maxRatio && (i.scale = s.maxRatio - 1 + Math.pow(i.scale - s.maxRatio + 1, .5)), i.scale < t.minRatio && (i.scale = t.minRatio + 1 - Math.pow(t.minRatio - i.scale + 1, .5)), s.$imageEl.transform("translate3d(0,0,0) scale(" + i.scale + ")"))
            },
            onGestureEnd: function(e) {
                var t = this.params.zoom,
                    i = this.zoom,
                    s = i.gesture;
                if (!d.gestures) {
                    if (!i.fakeGestureTouched || !i.fakeGestureMoved) return;
                    if ("touchend" !== e.type || "touchend" === e.type && e.changedTouches.length < 2 && !O.android) return;
                    i.fakeGestureTouched = !1, i.fakeGestureMoved = !1
                }
                s.$imageEl && 0 !== s.$imageEl.length && (i.scale = Math.max(Math.min(i.scale, s.maxRatio), t.minRatio), s.$imageEl.transition(this.params.speed).transform("translate3d(0,0,0) scale(" + i.scale + ")"), i.currentScale = i.scale, i.isScaling = !1, 1 === i.scale && (s.$slideEl = void 0))
            },
            onTouchStart: function(e) {
                var t = this.zoom,
                    i = t.gesture,
                    s = t.image;
                i.$imageEl && 0 !== i.$imageEl.length && (s.isTouched || (O.android && e.cancelable && e.preventDefault(), s.isTouched = !0, s.touchesStart.x = "touchstart" === e.type ? e.targetTouches[0].pageX : e.pageX, s.touchesStart.y = "touchstart" === e.type ? e.targetTouches[0].pageY : e.pageY))
            },
            onTouchMove: function(e) {
                var t = this.zoom,
                    i = t.gesture,
                    s = t.image,
                    n = t.velocity;
                if (i.$imageEl && 0 !== i.$imageEl.length && (this.allowClick = !1, s.isTouched && i.$slideEl)) {
                    s.isMoved || (s.width = i.$imageEl[0].offsetWidth, s.height = i.$imageEl[0].offsetHeight, s.startX = c.getTranslate(i.$imageWrapEl[0], "x") || 0, s.startY = c.getTranslate(i.$imageWrapEl[0], "y") || 0, i.slideWidth = i.$slideEl[0].offsetWidth, i.slideHeight = i.$slideEl[0].offsetHeight, i.$imageWrapEl.transition(0), this.rtl && (s.startX = -s.startX, s.startY = -s.startY));
                    var a = s.width * t.scale,
                        r = s.height * t.scale;
                    if (!(a < i.slideWidth && r < i.slideHeight)) {
                        if (s.minX = Math.min(i.slideWidth / 2 - a / 2, 0), s.maxX = -s.minX, s.minY = Math.min(i.slideHeight / 2 - r / 2, 0), s.maxY = -s.minY, s.touchesCurrent.x = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX, s.touchesCurrent.y = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY, !s.isMoved && !t.isScaling) {
                            if (this.isHorizontal() && (Math.floor(s.minX) === Math.floor(s.startX) && s.touchesCurrent.x < s.touchesStart.x || Math.floor(s.maxX) === Math.floor(s.startX) && s.touchesCurrent.x > s.touchesStart.x)) return void(s.isTouched = !1);
                            if (!this.isHorizontal() && (Math.floor(s.minY) === Math.floor(s.startY) && s.touchesCurrent.y < s.touchesStart.y || Math.floor(s.maxY) === Math.floor(s.startY) && s.touchesCurrent.y > s.touchesStart.y)) return void(s.isTouched = !1)
                        }
                        e.cancelable && e.preventDefault(), e.stopPropagation(), s.isMoved = !0, s.currentX = s.touchesCurrent.x - s.touchesStart.x + s.startX, s.currentY = s.touchesCurrent.y - s.touchesStart.y + s.startY, s.currentX < s.minX && (s.currentX = s.minX + 1 - Math.pow(s.minX - s.currentX + 1, .8)), s.currentX > s.maxX && (s.currentX = s.maxX - 1 + Math.pow(s.currentX - s.maxX + 1, .8)), s.currentY < s.minY && (s.currentY = s.minY + 1 - Math.pow(s.minY - s.currentY + 1, .8)), s.currentY > s.maxY && (s.currentY = s.maxY - 1 + Math.pow(s.currentY - s.maxY + 1, .8)), n.prevPositionX || (n.prevPositionX = s.touchesCurrent.x), n.prevPositionY || (n.prevPositionY = s.touchesCurrent.y), n.prevTime || (n.prevTime = Date.now()), n.x = (s.touchesCurrent.x - n.prevPositionX) / (Date.now() - n.prevTime) / 2, n.y = (s.touchesCurrent.y - n.prevPositionY) / (Date.now() - n.prevTime) / 2, Math.abs(s.touchesCurrent.x - n.prevPositionX) < 2 && (n.x = 0), Math.abs(s.touchesCurrent.y - n.prevPositionY) < 2 && (n.y = 0), n.prevPositionX = s.touchesCurrent.x, n.prevPositionY = s.touchesCurrent.y, n.prevTime = Date.now(), i.$imageWrapEl.transform("translate3d(" + s.currentX + "px, " + s.currentY + "px,0)")
                    }
                }
            },
            onTouchEnd: function() {
                var e = this.zoom,
                    t = e.gesture,
                    i = e.image,
                    s = e.velocity;
                if (t.$imageEl && 0 !== t.$imageEl.length) {
                    if (!i.isTouched || !i.isMoved) return i.isTouched = !1, void(i.isMoved = !1);
                    i.isTouched = !1, i.isMoved = !1;
                    var n = 300,
                        a = 300,
                        r = s.x * n,
                        o = i.currentX + r,
                        l = s.y * a,
                        c = i.currentY + l;
                    0 !== s.x && (n = Math.abs((o - i.currentX) / s.x)), 0 !== s.y && (a = Math.abs((c - i.currentY) / s.y));
                    var d = Math.max(n, a);
                    i.currentX = o, i.currentY = c;
                    var h = i.width * e.scale,
                        u = i.height * e.scale;
                    i.minX = Math.min(t.slideWidth / 2 - h / 2, 0), i.maxX = -i.minX, i.minY = Math.min(t.slideHeight / 2 - u / 2, 0), i.maxY = -i.minY, i.currentX = Math.max(Math.min(i.currentX, i.maxX), i.minX), i.currentY = Math.max(Math.min(i.currentY, i.maxY), i.minY), t.$imageWrapEl.transition(d).transform("translate3d(" + i.currentX + "px, " + i.currentY + "px,0)")
                }
            },
            onTransitionEnd: function() {
                var e = this.zoom,
                    t = e.gesture;
                t.$slideEl && this.previousIndex !== this.activeIndex && (t.$imageEl && t.$imageEl.transform("translate3d(0,0,0) scale(1)"), t.$imageWrapEl && t.$imageWrapEl.transform("translate3d(0,0,0)"), e.scale = 1, e.currentScale = 1, t.$slideEl = void 0, t.$imageEl = void 0, t.$imageWrapEl = void 0)
            },
            toggle: function(e) {
                var t = this.zoom;
                t.scale && 1 !== t.scale ? t.out() : t.in(e)
            },
            in: function(e) {
                var t, i, s, n, a, r, o, l, c, d, h, u, p, f, m, v, g = this.zoom,
                    b = this.params.zoom,
                    y = g.gesture,
                    w = g.image;
                y.$slideEl || (this.params.virtual && this.params.virtual.enabled && this.virtual ? y.$slideEl = this.$wrapperEl.children("." + this.params.slideActiveClass) : y.$slideEl = this.slides.eq(this.activeIndex), y.$imageEl = y.$slideEl.find("img, svg, canvas, picture, .swiper-zoom-target"), y.$imageWrapEl = y.$imageEl.parent("." + b.containerClass)), y.$imageEl && 0 !== y.$imageEl.length && (y.$slideEl.addClass("" + b.zoomedSlideClass), void 0 === w.touchesStart.x && e ? (t = "touchend" === e.type ? e.changedTouches[0].pageX : e.pageX, i = "touchend" === e.type ? e.changedTouches[0].pageY : e.pageY) : (t = w.touchesStart.x, i = w.touchesStart.y), g.scale = y.$imageWrapEl.attr("data-swiper-zoom") || b.maxRatio, g.currentScale = y.$imageWrapEl.attr("data-swiper-zoom") || b.maxRatio, e ? (m = y.$slideEl[0].offsetWidth, v = y.$slideEl[0].offsetHeight, s = y.$slideEl.offset().left + m / 2 - t, n = y.$slideEl.offset().top + v / 2 - i, o = y.$imageEl[0].offsetWidth, l = y.$imageEl[0].offsetHeight, c = o * g.scale, d = l * g.scale, p = -(h = Math.min(m / 2 - c / 2, 0)), f = -(u = Math.min(v / 2 - d / 2, 0)), (a = s * g.scale) < h && (a = h), a > p && (a = p), (r = n * g.scale) < u && (r = u), r > f && (r = f)) : (a = 0, r = 0), y.$imageWrapEl.transition(300).transform("translate3d(" + a + "px, " + r + "px,0)"), y.$imageEl.transition(300).transform("translate3d(0,0,0) scale(" + g.scale + ")"))
            },
            out: function() {
                var e = this.zoom,
                    t = this.params.zoom,
                    i = e.gesture;
                i.$slideEl || (this.params.virtual && this.params.virtual.enabled && this.virtual ? i.$slideEl = this.$wrapperEl.children("." + this.params.slideActiveClass) : i.$slideEl = this.slides.eq(this.activeIndex), i.$imageEl = i.$slideEl.find("img, svg, canvas, picture, .swiper-zoom-target"), i.$imageWrapEl = i.$imageEl.parent("." + t.containerClass)), i.$imageEl && 0 !== i.$imageEl.length && (e.scale = 1, e.currentScale = 1, i.$imageWrapEl.transition(300).transform("translate3d(0,0,0)"), i.$imageEl.transition(300).transform("translate3d(0,0,0) scale(1)"), i.$slideEl.removeClass("" + t.zoomedSlideClass), i.$slideEl = void 0)
            },
            enable: function() {
                var e = this.zoom;
                if (!e.enabled) {
                    e.enabled = !0;
                    var t = !("touchstart" !== this.touchEvents.start || !d.passiveListener || !this.params.passiveListeners) && {
                            passive: !0,
                            capture: !1
                        },
                        i = !d.passiveListener || {
                            passive: !1,
                            capture: !0
                        },
                        s = "." + this.params.slideClass;
                    d.gestures ? (this.$wrapperEl.on("gesturestart", s, e.onGestureStart, t), this.$wrapperEl.on("gesturechange", s, e.onGestureChange, t), this.$wrapperEl.on("gestureend", s, e.onGestureEnd, t)) : "touchstart" === this.touchEvents.start && (this.$wrapperEl.on(this.touchEvents.start, s, e.onGestureStart, t), this.$wrapperEl.on(this.touchEvents.move, s, e.onGestureChange, i), this.$wrapperEl.on(this.touchEvents.end, s, e.onGestureEnd, t), this.touchEvents.cancel && this.$wrapperEl.on(this.touchEvents.cancel, s, e.onGestureEnd, t)), this.$wrapperEl.on(this.touchEvents.move, "." + this.params.zoom.containerClass, e.onTouchMove, i)
                }
            },
            disable: function() {
                var e = this.zoom;
                if (e.enabled) {
                    this.zoom.enabled = !1;
                    var t = !("touchstart" !== this.touchEvents.start || !d.passiveListener || !this.params.passiveListeners) && {
                            passive: !0,
                            capture: !1
                        },
                        i = !d.passiveListener || {
                            passive: !1,
                            capture: !0
                        },
                        s = "." + this.params.slideClass;
                    d.gestures ? (this.$wrapperEl.off("gesturestart", s, e.onGestureStart, t), this.$wrapperEl.off("gesturechange", s, e.onGestureChange, t), this.$wrapperEl.off("gestureend", s, e.onGestureEnd, t)) : "touchstart" === this.touchEvents.start && (this.$wrapperEl.off(this.touchEvents.start, s, e.onGestureStart, t), this.$wrapperEl.off(this.touchEvents.move, s, e.onGestureChange, i), this.$wrapperEl.off(this.touchEvents.end, s, e.onGestureEnd, t), this.touchEvents.cancel && this.$wrapperEl.off(this.touchEvents.cancel, s, e.onGestureEnd, t)), this.$wrapperEl.off(this.touchEvents.move, "." + this.params.zoom.containerClass, e.onTouchMove, i)
                }
            }
        },
        oe = {
            loadInSlide: function(e, t) {
                void 0 === t && (t = !0);
                var i = this,
                    s = i.params.lazy;
                if (void 0 !== e && 0 !== i.slides.length) {
                    var n = i.virtual && i.params.virtual.enabled ? i.$wrapperEl.children("." + i.params.slideClass + '[data-swiper-slide-index="' + e + '"]') : i.slides.eq(e),
                        a = n.find("." + s.elementClass + ":not(." + s.loadedClass + "):not(." + s.loadingClass + ")");
                    !n.hasClass(s.elementClass) || n.hasClass(s.loadedClass) || n.hasClass(s.loadingClass) || (a = a.add(n[0])), 0 !== a.length && a.each(function(e, a) {
                        var o = r(a);
                        o.addClass(s.loadingClass);
                        var l = o.attr("data-background"),
                            c = o.attr("data-src"),
                            d = o.attr("data-srcset"),
                            h = o.attr("data-sizes"),
                            u = o.parent("picture");
                        i.loadImage(o[0], c || l, d, h, !1, function() {
                            if (null != i && i && (!i || i.params) && !i.destroyed) {
                                if (l ? (o.css("background-image", 'url("' + l + '")'), o.removeAttr("data-background")) : (d && (o.attr("srcset", d), o.removeAttr("data-srcset")), h && (o.attr("sizes", h), o.removeAttr("data-sizes")), u.length && u.children("source").each(function(e, t) {
                                        var i = r(t);
                                        i.attr("data-srcset") && (i.attr("srcset", i.attr("data-srcset")), i.removeAttr("data-srcset"))
                                    }), c && (o.attr("src", c), o.removeAttr("data-src"))), o.addClass(s.loadedClass).removeClass(s.loadingClass), n.find("." + s.preloaderClass).remove(), i.params.loop && t) {
                                    var e = n.attr("data-swiper-slide-index");
                                    if (n.hasClass(i.params.slideDuplicateClass)) {
                                        var a = i.$wrapperEl.children('[data-swiper-slide-index="' + e + '"]:not(.' + i.params.slideDuplicateClass + ")");
                                        i.lazy.loadInSlide(a.index(), !1)
                                    } else {
                                        var p = i.$wrapperEl.children("." + i.params.slideDuplicateClass + '[data-swiper-slide-index="' + e + '"]');
                                        i.lazy.loadInSlide(p.index(), !1)
                                    }
                                }
                                i.emit("lazyImageReady", n[0], o[0]), i.params.autoHeight && i.updateAutoHeight()
                            }
                        }), i.emit("lazyImageLoad", n[0], o[0])
                    })
                }
            },
            load: function() {
                var e = this,
                    t = e.$wrapperEl,
                    i = e.params,
                    s = e.slides,
                    n = e.activeIndex,
                    a = e.virtual && i.virtual.enabled,
                    o = i.lazy,
                    l = i.slidesPerView;

                function c(e) {
                    if (a) {
                        if (t.children("." + i.slideClass + '[data-swiper-slide-index="' + e + '"]').length) return !0
                    } else if (s[e]) return !0;
                    return !1
                }

                function d(e) {
                    return a ? r(e).attr("data-swiper-slide-index") : r(e).index()
                }
                if ("auto" === l && (l = 0), e.lazy.initialImageLoaded || (e.lazy.initialImageLoaded = !0), e.params.watchSlidesVisibility) t.children("." + i.slideVisibleClass).each(function(t, i) {
                    var s = a ? r(i).attr("data-swiper-slide-index") : r(i).index();
                    e.lazy.loadInSlide(s)
                });
                else if (l > 1)
                    for (var h = n; h < n + l; h += 1) c(h) && e.lazy.loadInSlide(h);
                else e.lazy.loadInSlide(n);
                if (o.loadPrevNext)
                    if (l > 1 || o.loadPrevNextAmount && o.loadPrevNextAmount > 1) {
                        for (var u = o.loadPrevNextAmount, p = l, f = Math.min(n + p + Math.max(u, p), s.length), m = Math.max(n - Math.max(p, u), 0), v = n + l; v < f; v += 1) c(v) && e.lazy.loadInSlide(v);
                        for (var g = m; g < n; g += 1) c(g) && e.lazy.loadInSlide(g)
                    } else {
                        var b = t.children("." + i.slideNextClass);
                        b.length > 0 && e.lazy.loadInSlide(d(b));
                        var y = t.children("." + i.slidePrevClass);
                        y.length > 0 && e.lazy.loadInSlide(d(y))
                    }
            }
        },
        le = {
            LinearSpline: function(e, t) {
                var i, s, n, a, r;
                return this.x = e, this.y = t, this.lastIndex = e.length - 1, this.interpolate = function(e) {
                    return e ? (r = function(e, t) {
                        for (s = -1, i = e.length; i - s > 1;) e[n = i + s >> 1] <= t ? s = n : i = n;
                        return i
                    }(this.x, e), a = r - 1, (e - this.x[a]) * (this.y[r] - this.y[a]) / (this.x[r] - this.x[a]) + this.y[a]) : 0
                }, this
            },
            getInterpolateFunction: function(e) {
                this.controller.spline || (this.controller.spline = this.params.loop ? new le.LinearSpline(this.slidesGrid, e.slidesGrid) : new le.LinearSpline(this.snapGrid, e.snapGrid))
            },
            setTranslate: function(e, t) {
                var i, s, n = this,
                    a = n.controller.control;

                function r(e) {
                    var t = n.rtlTranslate ? -n.translate : n.translate;
                    "slide" === n.params.controller.by && (n.controller.getInterpolateFunction(e), s = -n.controller.spline.interpolate(-t)), s && "container" !== n.params.controller.by || (i = (e.maxTranslate() - e.minTranslate()) / (n.maxTranslate() - n.minTranslate()), s = (t - n.minTranslate()) * i + e.minTranslate()), n.params.controller.inverse && (s = e.maxTranslate() - s), e.updateProgress(s), e.setTranslate(s, n), e.updateActiveIndex(), e.updateSlidesClasses()
                }
                if (Array.isArray(a))
                    for (var o = 0; o < a.length; o += 1) a[o] !== t && a[o] instanceof V && r(a[o]);
                else a instanceof V && t !== a && r(a)
            },
            setTransition: function(e, t) {
                var i, s = this,
                    n = s.controller.control;

                function a(t) {
                    t.setTransition(e, s), 0 !== e && (t.transitionStart(), t.params.autoHeight && c.nextTick(function() {
                        t.updateAutoHeight()
                    }), t.$wrapperEl.transitionEnd(function() {
                        n && (t.params.loop && "slide" === s.params.controller.by && t.loopFix(), t.transitionEnd())
                    }))
                }
                if (Array.isArray(n))
                    for (i = 0; i < n.length; i += 1) n[i] !== t && n[i] instanceof V && a(n[i]);
                else n instanceof V && t !== n && a(n)
            }
        },
        ce = {
            makeElFocusable: function(e) {
                return e.attr("tabIndex", "0"), e
            },
            makeElNotFocusable: function(e) {
                return e.attr("tabIndex", "-1"), e
            },
            addElRole: function(e, t) {
                return e.attr("role", t), e
            },
            addElLabel: function(e, t) {
                return e.attr("aria-label", t), e
            },
            disableEl: function(e) {
                return e.attr("aria-disabled", !0), e
            },
            enableEl: function(e) {
                return e.attr("aria-disabled", !1), e
            },
            onEnterKey: function(e) {
                var t = this.params.a11y;
                if (13 === e.keyCode) {
                    var i = r(e.target);
                    this.navigation && this.navigation.$nextEl && i.is(this.navigation.$nextEl) && (this.isEnd && !this.params.loop || this.slideNext(), this.isEnd ? this.a11y.notify(t.lastSlideMessage) : this.a11y.notify(t.nextSlideMessage)), this.navigation && this.navigation.$prevEl && i.is(this.navigation.$prevEl) && (this.isBeginning && !this.params.loop || this.slidePrev(), this.isBeginning ? this.a11y.notify(t.firstSlideMessage) : this.a11y.notify(t.prevSlideMessage)), this.pagination && i.is("." + this.params.pagination.bulletClass) && i[0].click()
                }
            },
            notify: function(e) {
                var t = this.a11y.liveRegion;
                0 !== t.length && (t.html(""), t.html(e))
            },
            updateNavigation: function() {
                if (!this.params.loop && this.navigation) {
                    var e = this.navigation,
                        t = e.$nextEl,
                        i = e.$prevEl;
                    i && i.length > 0 && (this.isBeginning ? (this.a11y.disableEl(i), this.a11y.makeElNotFocusable(i)) : (this.a11y.enableEl(i), this.a11y.makeElFocusable(i))), t && t.length > 0 && (this.isEnd ? (this.a11y.disableEl(t), this.a11y.makeElNotFocusable(t)) : (this.a11y.enableEl(t), this.a11y.makeElFocusable(t)))
                }
            },
            updatePagination: function() {
                var e = this,
                    t = e.params.a11y;
                e.pagination && e.params.pagination.clickable && e.pagination.bullets && e.pagination.bullets.length && e.pagination.bullets.each(function(i, s) {
                    var n = r(s);
                    e.a11y.makeElFocusable(n), e.a11y.addElRole(n, "button"), e.a11y.addElLabel(n, t.paginationBulletMessage.replace(/\{\{index\}\}/, n.index() + 1))
                })
            },
            init: function() {
                this.$el.append(this.a11y.liveRegion);
                var e, t, i = this.params.a11y;
                this.navigation && this.navigation.$nextEl && (e = this.navigation.$nextEl), this.navigation && this.navigation.$prevEl && (t = this.navigation.$prevEl), e && (this.a11y.makeElFocusable(e), this.a11y.addElRole(e, "button"), this.a11y.addElLabel(e, i.nextSlideMessage), e.on("keydown", this.a11y.onEnterKey)), t && (this.a11y.makeElFocusable(t), this.a11y.addElRole(t, "button"), this.a11y.addElLabel(t, i.prevSlideMessage), t.on("keydown", this.a11y.onEnterKey)), this.pagination && this.params.pagination.clickable && this.pagination.bullets && this.pagination.bullets.length && this.pagination.$el.on("keydown", "." + this.params.pagination.bulletClass, this.a11y.onEnterKey)
            },
            destroy: function() {
                var e, t;
                this.a11y.liveRegion && this.a11y.liveRegion.length > 0 && this.a11y.liveRegion.remove(), this.navigation && this.navigation.$nextEl && (e = this.navigation.$nextEl), this.navigation && this.navigation.$prevEl && (t = this.navigation.$prevEl), e && e.off("keydown", this.a11y.onEnterKey), t && t.off("keydown", this.a11y.onEnterKey), this.pagination && this.params.pagination.clickable && this.pagination.bullets && this.pagination.bullets.length && this.pagination.$el.off("keydown", "." + this.params.pagination.bulletClass, this.a11y.onEnterKey)
            }
        },
        de = {
            init: function() {
                if (this.params.history) {
                    if (!n.history || !n.history.pushState) return this.params.history.enabled = !1, void(this.params.hashNavigation.enabled = !0);
                    var e = this.history;
                    e.initialized = !0, e.paths = de.getPathValues(), (e.paths.key || e.paths.value) && (e.scrollToSlide(0, e.paths.value, this.params.runCallbacksOnInit), this.params.history.replaceState || n.addEventListener("popstate", this.history.setHistoryPopState))
                }
            },
            destroy: function() {
                this.params.history.replaceState || n.removeEventListener("popstate", this.history.setHistoryPopState)
            },
            setHistoryPopState: function() {
                this.history.paths = de.getPathValues(), this.history.scrollToSlide(this.params.speed, this.history.paths.value, !1)
            },
            getPathValues: function() {
                var e = n.location.pathname.slice(1).split("/").filter(function(e) {
                        return "" !== e
                    }),
                    t = e.length;
                return {
                    key: e[t - 2],
                    value: e[t - 1]
                }
            },
            setHistory: function(e, t) {
                if (this.history.initialized && this.params.history.enabled) {
                    var i = this.slides.eq(t),
                        s = de.slugify(i.attr("data-history"));
                    n.location.pathname.includes(e) || (s = e + "/" + s);
                    var a = n.history.state;
                    a && a.value === s || (this.params.history.replaceState ? n.history.replaceState({
                        value: s
                    }, null, s) : n.history.pushState({
                        value: s
                    }, null, s))
                }
            },
            slugify: function(e) {
                return e.toString().replace(/\s+/g, "-").replace(/[^\w-]+/g, "").replace(/--+/g, "-").replace(/^-+/, "").replace(/-+$/, "")
            },
            scrollToSlide: function(e, t, i) {
                if (t)
                    for (var s = 0, n = this.slides.length; s < n; s += 1) {
                        var a = this.slides.eq(s);
                        if (de.slugify(a.attr("data-history")) === t && !a.hasClass(this.params.slideDuplicateClass)) {
                            var r = a.index();
                            this.slideTo(r, e, i)
                        }
                    } else this.slideTo(0, e, i)
            }
        },
        he = {
            onHashCange: function() {
                this.emit("hashChange");
                var e = i.location.hash.replace("#", "");
                if (e !== this.slides.eq(this.activeIndex).attr("data-hash")) {
                    var t = this.$wrapperEl.children("." + this.params.slideClass + '[data-hash="' + e + '"]').index();
                    if (void 0 === t) return;
                    this.slideTo(t)
                }
            },
            setHash: function() {
                if (this.hashNavigation.initialized && this.params.hashNavigation.enabled)
                    if (this.params.hashNavigation.replaceState && n.history && n.history.replaceState) n.history.replaceState(null, null, "#" + this.slides.eq(this.activeIndex).attr("data-hash") || ""), this.emit("hashSet");
                    else {
                        var e = this.slides.eq(this.activeIndex),
                            t = e.attr("data-hash") || e.attr("data-history");
                        i.location.hash = t || "", this.emit("hashSet")
                    }
            },
            init: function() {
                if (!(!this.params.hashNavigation.enabled || this.params.history && this.params.history.enabled)) {
                    this.hashNavigation.initialized = !0;
                    var e = i.location.hash.replace("#", "");
                    if (e)
                        for (var t = 0, s = this.slides.length; t < s; t += 1) {
                            var a = this.slides.eq(t);
                            if ((a.attr("data-hash") || a.attr("data-history")) === e && !a.hasClass(this.params.slideDuplicateClass)) {
                                var o = a.index();
                                this.slideTo(o, 0, this.params.runCallbacksOnInit, !0)
                            }
                        }
                    this.params.hashNavigation.watchState && r(n).on("hashchange", this.hashNavigation.onHashCange)
                }
            },
            destroy: function() {
                this.params.hashNavigation.watchState && r(n).off("hashchange", this.hashNavigation.onHashCange)
            }
        },
        ue = {
            run: function() {
                var e = this,
                    t = e.slides.eq(e.activeIndex),
                    i = e.params.autoplay.delay;
                t.attr("data-swiper-autoplay") && (i = t.attr("data-swiper-autoplay") || e.params.autoplay.delay), clearTimeout(e.autoplay.timeout), e.autoplay.timeout = c.nextTick(function() {
                    e.params.autoplay.reverseDirection ? e.params.loop ? (e.loopFix(), e.slidePrev(e.params.speed, !0, !0), e.emit("autoplay")) : e.isBeginning ? e.params.autoplay.stopOnLastSlide ? e.autoplay.stop() : (e.slideTo(e.slides.length - 1, e.params.speed, !0, !0), e.emit("autoplay")) : (e.slidePrev(e.params.speed, !0, !0), e.emit("autoplay")) : e.params.loop ? (e.loopFix(), e.slideNext(e.params.speed, !0, !0), e.emit("autoplay")) : e.isEnd ? e.params.autoplay.stopOnLastSlide ? e.autoplay.stop() : (e.slideTo(0, e.params.speed, !0, !0), e.emit("autoplay")) : (e.slideNext(e.params.speed, !0, !0), e.emit("autoplay")), e.params.cssMode && e.autoplay.running && e.autoplay.run()
                }, i)
            },
            start: function() {
                return void 0 === this.autoplay.timeout && !this.autoplay.running && (this.autoplay.running = !0, this.emit("autoplayStart"), this.autoplay.run(), !0)
            },
            stop: function() {
                return !!this.autoplay.running && void 0 !== this.autoplay.timeout && (this.autoplay.timeout && (clearTimeout(this.autoplay.timeout), this.autoplay.timeout = void 0), this.autoplay.running = !1, this.emit("autoplayStop"), !0)
            },
            pause: function(e) {
                this.autoplay.running && (this.autoplay.paused || (this.autoplay.timeout && clearTimeout(this.autoplay.timeout), this.autoplay.paused = !0, 0 !== e && this.params.autoplay.waitForTransition ? (this.$wrapperEl[0].addEventListener("transitionend", this.autoplay.onTransitionEnd), this.$wrapperEl[0].addEventListener("webkitTransitionEnd", this.autoplay.onTransitionEnd)) : (this.autoplay.paused = !1, this.autoplay.run())))
            }
        },
        pe = {
            setTranslate: function() {
                for (var e = this.slides, t = 0; t < e.length; t += 1) {
                    var i = this.slides.eq(t),
                        s = -i[0].swiperSlideOffset;
                    this.params.virtualTranslate || (s -= this.translate);
                    var n = 0;
                    this.isHorizontal() || (n = s, s = 0);
                    var a = this.params.fadeEffect.crossFade ? Math.max(1 - Math.abs(i[0].progress), 0) : 1 + Math.min(Math.max(i[0].progress, -1), 0);
                    i.css({
                        opacity: a
                    }).transform("translate3d(" + s + "px, " + n + "px, 0px)")
                }
            },
            setTransition: function(e) {
                var t = this,
                    i = t.slides,
                    s = t.$wrapperEl;
                if (i.transition(e), t.params.virtualTranslate && 0 !== e) {
                    var n = !1;
                    i.transitionEnd(function() {
                        if (!n && t && !t.destroyed) {
                            n = !0, t.animating = !1;
                            for (var e = ["webkitTransitionEnd", "transitionend"], i = 0; i < e.length; i += 1) s.trigger(e[i])
                        }
                    })
                }
            }
        },
        fe = {
            setTranslate: function() {
                var e, t = this.$el,
                    i = this.$wrapperEl,
                    s = this.slides,
                    n = this.width,
                    a = this.height,
                    o = this.rtlTranslate,
                    l = this.size,
                    c = this.params.cubeEffect,
                    d = this.isHorizontal(),
                    h = this.virtual && this.params.virtual.enabled,
                    u = 0;
                c.shadow && (d ? (0 === (e = i.find(".swiper-cube-shadow")).length && (e = r('<div class="swiper-cube-shadow"></div>'), i.append(e)), e.css({
                    height: n + "px"
                })) : 0 === (e = t.find(".swiper-cube-shadow")).length && (e = r('<div class="swiper-cube-shadow"></div>'), t.append(e)));
                for (var p = 0; p < s.length; p += 1) {
                    var f = s.eq(p),
                        m = p;
                    h && (m = parseInt(f.attr("data-swiper-slide-index"), 10));
                    var v = 90 * m,
                        g = Math.floor(v / 360);
                    o && (v = -v, g = Math.floor(-v / 360));
                    var b = Math.max(Math.min(f[0].progress, 1), -1),
                        y = 0,
                        w = 0,
                        x = 0;
                    m % 4 == 0 ? (y = 4 * -g * l, x = 0) : (m - 1) % 4 == 0 ? (y = 0, x = 4 * -g * l) : (m - 2) % 4 == 0 ? (y = l + 4 * g * l, x = l) : (m - 3) % 4 == 0 && (y = -l, x = 3 * l + 4 * l * g), o && (y = -y), d || (w = y, y = 0);
                    var C = "rotateX(" + (d ? 0 : -v) + "deg) rotateY(" + (d ? v : 0) + "deg) translate3d(" + y + "px, " + w + "px, " + x + "px)";
                    if (b <= 1 && b > -1 && (u = 90 * m + 90 * b, o && (u = 90 * -m - 90 * b)), f.transform(C), c.slideShadows) {
                        var S = d ? f.find(".swiper-slide-shadow-left") : f.find(".swiper-slide-shadow-top"),
                            E = d ? f.find(".swiper-slide-shadow-right") : f.find(".swiper-slide-shadow-bottom");
                        0 === S.length && (S = r('<div class="swiper-slide-shadow-' + (d ? "left" : "top") + '"></div>'), f.append(S)), 0 === E.length && (E = r('<div class="swiper-slide-shadow-' + (d ? "right" : "bottom") + '"></div>'), f.append(E)), S.length && (S[0].style.opacity = Math.max(-b, 0)), E.length && (E[0].style.opacity = Math.max(b, 0))
                    }
                }
                if (i.css({
                        "-webkit-transform-origin": "50% 50% -" + l / 2 + "px",
                        "-moz-transform-origin": "50% 50% -" + l / 2 + "px",
                        "-ms-transform-origin": "50% 50% -" + l / 2 + "px",
                        "transform-origin": "50% 50% -" + l / 2 + "px"
                    }), c.shadow)
                    if (d) e.transform("translate3d(0px, " + (n / 2 + c.shadowOffset) + "px, " + -n / 2 + "px) rotateX(90deg) rotateZ(0deg) scale(" + c.shadowScale + ")");
                    else {
                        var T = Math.abs(u) - 90 * Math.floor(Math.abs(u) / 90),
                            M = 1.5 - (Math.sin(2 * T * Math.PI / 360) / 2 + Math.cos(2 * T * Math.PI / 360) / 2),
                            k = c.shadowScale,
                            P = c.shadowScale / M,
                            $ = c.shadowOffset;
                        e.transform("scale3d(" + k + ", 1, " + P + ") translate3d(0px, " + (a / 2 + $) + "px, " + -a / 2 / P + "px) rotateX(-90deg)")
                    }
                var L = G.isSafari || G.isUiWebView ? -l / 2 : 0;
                i.transform("translate3d(0px,0," + L + "px) rotateX(" + (this.isHorizontal() ? 0 : u) + "deg) rotateY(" + (this.isHorizontal() ? -u : 0) + "deg)")
            },
            setTransition: function(e) {
                var t = this.$el;
                this.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e), this.params.cubeEffect.shadow && !this.isHorizontal() && t.find(".swiper-cube-shadow").transition(e)
            }
        },
        me = {
            setTranslate: function() {
                for (var e = this.slides, t = this.rtlTranslate, i = 0; i < e.length; i += 1) {
                    var s = e.eq(i),
                        n = s[0].progress;
                    this.params.flipEffect.limitRotation && (n = Math.max(Math.min(s[0].progress, 1), -1));
                    var a = -180 * n,
                        o = 0,
                        l = -s[0].swiperSlideOffset,
                        c = 0;
                    if (this.isHorizontal() ? t && (a = -a) : (c = l, l = 0, o = -a, a = 0), s[0].style.zIndex = -Math.abs(Math.round(n)) + e.length, this.params.flipEffect.slideShadows) {
                        var d = this.isHorizontal() ? s.find(".swiper-slide-shadow-left") : s.find(".swiper-slide-shadow-top"),
                            h = this.isHorizontal() ? s.find(".swiper-slide-shadow-right") : s.find(".swiper-slide-shadow-bottom");
                        0 === d.length && (d = r('<div class="swiper-slide-shadow-' + (this.isHorizontal() ? "left" : "top") + '"></div>'), s.append(d)), 0 === h.length && (h = r('<div class="swiper-slide-shadow-' + (this.isHorizontal() ? "right" : "bottom") + '"></div>'), s.append(h)), d.length && (d[0].style.opacity = Math.max(-n, 0)), h.length && (h[0].style.opacity = Math.max(n, 0))
                    }
                    s.transform("translate3d(" + l + "px, " + c + "px, 0px) rotateX(" + o + "deg) rotateY(" + a + "deg)")
                }
            },
            setTransition: function(e) {
                var t = this,
                    i = t.slides,
                    s = t.activeIndex,
                    n = t.$wrapperEl;
                if (i.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e), t.params.virtualTranslate && 0 !== e) {
                    var a = !1;
                    i.eq(s).transitionEnd(function() {
                        if (!a && t && !t.destroyed) {
                            a = !0, t.animating = !1;
                            for (var e = ["webkitTransitionEnd", "transitionend"], i = 0; i < e.length; i += 1) n.trigger(e[i])
                        }
                    })
                }
            }
        },
        ve = {
            setTranslate: function() {
                for (var e = this.width, t = this.height, i = this.slides, s = this.$wrapperEl, n = this.slidesSizesGrid, a = this.params.coverflowEffect, o = this.isHorizontal(), l = this.translate, c = o ? e / 2 - l : t / 2 - l, h = o ? a.rotate : -a.rotate, u = a.depth, p = 0, f = i.length; p < f; p += 1) {
                    var m = i.eq(p),
                        v = n[p],
                        g = (c - m[0].swiperSlideOffset - v / 2) / v * a.modifier,
                        b = o ? h * g : 0,
                        y = o ? 0 : h * g,
                        w = -u * Math.abs(g),
                        x = a.stretch;
                    "string" == typeof x && -1 !== x.indexOf("%") && (x = parseFloat(a.stretch) / 100 * v);
                    var C = o ? 0 : x * g,
                        S = o ? x * g : 0;
                    Math.abs(S) < .001 && (S = 0), Math.abs(C) < .001 && (C = 0), Math.abs(w) < .001 && (w = 0), Math.abs(b) < .001 && (b = 0), Math.abs(y) < .001 && (y = 0);
                    var E = "translate3d(" + S + "px," + C + "px," + w + "px)  rotateX(" + y + "deg) rotateY(" + b + "deg)";
                    if (m.transform(E), m[0].style.zIndex = 1 - Math.abs(Math.round(g)), a.slideShadows) {
                        var T = o ? m.find(".swiper-slide-shadow-left") : m.find(".swiper-slide-shadow-top"),
                            M = o ? m.find(".swiper-slide-shadow-right") : m.find(".swiper-slide-shadow-bottom");
                        0 === T.length && (T = r('<div class="swiper-slide-shadow-' + (o ? "left" : "top") + '"></div>'), m.append(T)), 0 === M.length && (M = r('<div class="swiper-slide-shadow-' + (o ? "right" : "bottom") + '"></div>'), m.append(M)), T.length && (T[0].style.opacity = g > 0 ? g : 0), M.length && (M[0].style.opacity = -g > 0 ? -g : 0)
                    }
                }(d.pointerEvents || d.prefixedPointerEvents) && (s[0].style.perspectiveOrigin = c + "px 50%")
            },
            setTransition: function(e) {
                this.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e)
            }
        },
        ge = {
            init: function() {
                var e = this.params.thumbs,
                    t = this.constructor;
                e.swiper instanceof t ? (this.thumbs.swiper = e.swiper, c.extend(this.thumbs.swiper.originalParams, {
                    watchSlidesProgress: !0,
                    slideToClickedSlide: !1
                }), c.extend(this.thumbs.swiper.params, {
                    watchSlidesProgress: !0,
                    slideToClickedSlide: !1
                })) : c.isObject(e.swiper) && (this.thumbs.swiper = new t(c.extend({}, e.swiper, {
                    watchSlidesVisibility: !0,
                    watchSlidesProgress: !0,
                    slideToClickedSlide: !1
                })), this.thumbs.swiperCreated = !0), this.thumbs.swiper.$el.addClass(this.params.thumbs.thumbsContainerClass), this.thumbs.swiper.on("tap", this.thumbs.onThumbClick)
            },
            onThumbClick: function() {
                var e = this.thumbs.swiper;
                if (e) {
                    var t = e.clickedIndex,
                        i = e.clickedSlide;
                    if (!(i && r(i).hasClass(this.params.thumbs.slideThumbActiveClass) || null == t)) {
                        var s;
                        if (s = e.params.loop ? parseInt(r(e.clickedSlide).attr("data-swiper-slide-index"), 10) : t, this.params.loop) {
                            var n = this.activeIndex;
                            this.slides.eq(n).hasClass(this.params.slideDuplicateClass) && (this.loopFix(), this._clientLeft = this.$wrapperEl[0].clientLeft, n = this.activeIndex);
                            var a = this.slides.eq(n).prevAll('[data-swiper-slide-index="' + s + '"]').eq(0).index(),
                                o = this.slides.eq(n).nextAll('[data-swiper-slide-index="' + s + '"]').eq(0).index();
                            s = void 0 === a ? o : void 0 === o ? a : o - n < n - a ? o : a
                        }
                        this.slideTo(s)
                    }
                }
            },
            update: function(e) {
                var t = this.thumbs.swiper;
                if (t) {
                    var i = "auto" === t.params.slidesPerView ? t.slidesPerViewDynamic() : t.params.slidesPerView,
                        s = this.params.thumbs.autoScrollOffset,
                        n = s && !t.params.loop;
                    if (this.realIndex !== t.realIndex || n) {
                        var a, r, o = t.activeIndex;
                        if (t.params.loop) {
                            t.slides.eq(o).hasClass(t.params.slideDuplicateClass) && (t.loopFix(), t._clientLeft = t.$wrapperEl[0].clientLeft, o = t.activeIndex);
                            var l = t.slides.eq(o).prevAll('[data-swiper-slide-index="' + this.realIndex + '"]').eq(0).index(),
                                c = t.slides.eq(o).nextAll('[data-swiper-slide-index="' + this.realIndex + '"]').eq(0).index();
                            a = void 0 === l ? c : void 0 === c ? l : c - o == o - l ? o : c - o < o - l ? c : l, r = this.activeIndex > this.previousIndex ? "next" : "prev"
                        } else r = (a = this.realIndex) > this.previousIndex ? "next" : "prev";
                        n && (a += "next" === r ? s : -1 * s), t.visibleSlidesIndexes && t.visibleSlidesIndexes.indexOf(a) < 0 && (t.params.centeredSlides ? a = a > o ? a - Math.floor(i / 2) + 1 : a + Math.floor(i / 2) - 1 : a > o && (a = a - i + 1), t.slideTo(a, e ? 0 : void 0))
                    }
                    var d = 1,
                        h = this.params.thumbs.slideThumbActiveClass;
                    if (this.params.slidesPerView > 1 && !this.params.centeredSlides && (d = this.params.slidesPerView), this.params.thumbs.multipleActiveThumbs || (d = 1), d = Math.floor(d), t.slides.removeClass(h), t.params.loop || t.params.virtual && t.params.virtual.enabled)
                        for (var u = 0; u < d; u += 1) t.$wrapperEl.children('[data-swiper-slide-index="' + (this.realIndex + u) + '"]').addClass(h);
                    else
                        for (var p = 0; p < d; p += 1) t.slides.eq(this.realIndex + p).addClass(h)
                }
            }
        },
        be = [X, Y, W, _, K, Q, ee, {
            name: "mousewheel",
            params: {
                mousewheel: {
                    enabled: !1,
                    releaseOnEdges: !1,
                    invert: !1,
                    forceToAxis: !1,
                    sensitivity: 1,
                    eventsTarged: "container"
                }
            },
            create: function() {
                c.extend(this, {
                    mousewheel: {
                        enabled: !1,
                        enable: te.enable.bind(this),
                        disable: te.disable.bind(this),
                        handle: te.handle.bind(this),
                        handleMouseEnter: te.handleMouseEnter.bind(this),
                        handleMouseLeave: te.handleMouseLeave.bind(this),
                        animateSlider: te.animateSlider.bind(this),
                        releaseScroll: te.releaseScroll.bind(this),
                        lastScrollTime: c.now(),
                        lastEventBeforeSnap: void 0,
                        recentWheelEvents: []
                    }
                })
            },
            on: {
                init: function() {
                    !this.params.mousewheel.enabled && this.params.cssMode && this.mousewheel.disable(), this.params.mousewheel.enabled && this.mousewheel.enable()
                },
                destroy: function() {
                    this.params.cssMode && this.mousewheel.enable(), this.mousewheel.enabled && this.mousewheel.disable()
                }
            }
        }, {
            name: "navigation",
            params: {
                navigation: {
                    nextEl: null,
                    prevEl: null,
                    hideOnClick: !1,
                    disabledClass: "swiper-button-disabled",
                    hiddenClass: "swiper-button-hidden",
                    lockClass: "swiper-button-lock"
                }
            },
            create: function() {
                c.extend(this, {
                    navigation: {
                        init: ie.init.bind(this),
                        update: ie.update.bind(this),
                        destroy: ie.destroy.bind(this),
                        onNextClick: ie.onNextClick.bind(this),
                        onPrevClick: ie.onPrevClick.bind(this)
                    }
                })
            },
            on: {
                init: function() {
                    this.navigation.init(), this.navigation.update()
                },
                toEdge: function() {
                    this.navigation.update()
                },
                fromEdge: function() {
                    this.navigation.update()
                },
                destroy: function() {
                    this.navigation.destroy()
                },
                click: function(e) {
                    var t, i = this.navigation,
                        s = i.$nextEl,
                        n = i.$prevEl;
                    !this.params.navigation.hideOnClick || r(e.target).is(n) || r(e.target).is(s) || (s ? t = s.hasClass(this.params.navigation.hiddenClass) : n && (t = n.hasClass(this.params.navigation.hiddenClass)), !0 === t ? this.emit("navigationShow", this) : this.emit("navigationHide", this), s && s.toggleClass(this.params.navigation.hiddenClass), n && n.toggleClass(this.params.navigation.hiddenClass))
                }
            }
        }, {
            name: "pagination",
            params: {
                pagination: {
                    el: null,
                    bulletElement: "span",
                    clickable: !1,
                    hideOnClick: !1,
                    renderBullet: null,
                    renderProgressbar: null,
                    renderFraction: null,
                    renderCustom: null,
                    progressbarOpposite: !1,
                    type: "bullets",
                    dynamicBullets: !1,
                    dynamicMainBullets: 1,
                    formatFractionCurrent: function(e) {
                        return e
                    },
                    formatFractionTotal: function(e) {
                        return e
                    },
                    bulletClass: "swiper-pagination-bullet",
                    bulletActiveClass: "swiper-pagination-bullet-active",
                    modifierClass: "swiper-pagination-",
                    currentClass: "swiper-pagination-current",
                    totalClass: "swiper-pagination-total",
                    hiddenClass: "swiper-pagination-hidden",
                    progressbarFillClass: "swiper-pagination-progressbar-fill",
                    progressbarOppositeClass: "swiper-pagination-progressbar-opposite",
                    clickableClass: "swiper-pagination-clickable",
                    lockClass: "swiper-pagination-lock"
                }
            },
            create: function() {
                c.extend(this, {
                    pagination: {
                        init: se.init.bind(this),
                        render: se.render.bind(this),
                        update: se.update.bind(this),
                        destroy: se.destroy.bind(this),
                        dynamicBulletIndex: 0
                    }
                })
            },
            on: {
                init: function() {
                    this.pagination.init(), this.pagination.render(), this.pagination.update()
                },
                activeIndexChange: function() {
                    (this.params.loop || void 0 === this.snapIndex) && this.pagination.update()
                },
                snapIndexChange: function() {
                    this.params.loop || this.pagination.update()
                },
                slidesLengthChange: function() {
                    this.params.loop && (this.pagination.render(), this.pagination.update())
                },
                snapGridLengthChange: function() {
                    this.params.loop || (this.pagination.render(), this.pagination.update())
                },
                destroy: function() {
                    this.pagination.destroy()
                },
                click: function(e) {
                    this.params.pagination.el && this.params.pagination.hideOnClick && this.pagination.$el.length > 0 && !r(e.target).hasClass(this.params.pagination.bulletClass) && (!0 === this.pagination.$el.hasClass(this.params.pagination.hiddenClass) ? this.emit("paginationShow", this) : this.emit("paginationHide", this), this.pagination.$el.toggleClass(this.params.pagination.hiddenClass))
                }
            }
        }, {
            name: "scrollbar",
            params: {
                scrollbar: {
                    el: null,
                    dragSize: "auto",
                    hide: !1,
                    draggable: !1,
                    snapOnRelease: !0,
                    lockClass: "swiper-scrollbar-lock",
                    dragClass: "swiper-scrollbar-drag"
                }
            },
            create: function() {
                c.extend(this, {
                    scrollbar: {
                        init: ne.init.bind(this),
                        destroy: ne.destroy.bind(this),
                        updateSize: ne.updateSize.bind(this),
                        setTranslate: ne.setTranslate.bind(this),
                        setTransition: ne.setTransition.bind(this),
                        enableDraggable: ne.enableDraggable.bind(this),
                        disableDraggable: ne.disableDraggable.bind(this),
                        setDragPosition: ne.setDragPosition.bind(this),
                        getPointerPosition: ne.getPointerPosition.bind(this),
                        onDragStart: ne.onDragStart.bind(this),
                        onDragMove: ne.onDragMove.bind(this),
                        onDragEnd: ne.onDragEnd.bind(this),
                        isTouched: !1,
                        timeout: null,
                        dragTimeout: null
                    }
                })
            },
            on: {
                init: function() {
                    this.scrollbar.init(), this.scrollbar.updateSize(), this.scrollbar.setTranslate()
                },
                update: function() {
                    this.scrollbar.updateSize()
                },
                resize: function() {
                    this.scrollbar.updateSize()
                },
                observerUpdate: function() {
                    this.scrollbar.updateSize()
                },
                setTranslate: function() {
                    this.scrollbar.setTranslate()
                },
                setTransition: function(e) {
                    this.scrollbar.setTransition(e)
                },
                destroy: function() {
                    this.scrollbar.destroy()
                }
            }
        }, {
            name: "parallax",
            params: {
                parallax: {
                    enabled: !1
                }
            },
            create: function() {
                c.extend(this, {
                    parallax: {
                        setTransform: ae.setTransform.bind(this),
                        setTranslate: ae.setTranslate.bind(this),
                        setTransition: ae.setTransition.bind(this)
                    }
                })
            },
            on: {
                beforeInit: function() {
                    this.params.parallax.enabled && (this.params.watchSlidesProgress = !0, this.originalParams.watchSlidesProgress = !0)
                },
                init: function() {
                    this.params.parallax.enabled && this.parallax.setTranslate()
                },
                setTranslate: function() {
                    this.params.parallax.enabled && this.parallax.setTranslate()
                },
                setTransition: function(e) {
                    this.params.parallax.enabled && this.parallax.setTransition(e)
                }
            }
        }, {
            name: "zoom",
            params: {
                zoom: {
                    enabled: !1,
                    maxRatio: 3,
                    minRatio: 1,
                    toggle: !0,
                    containerClass: "swiper-zoom-container",
                    zoomedSlideClass: "swiper-slide-zoomed"
                }
            },
            create: function() {
                var e = this,
                    t = {
                        enabled: !1,
                        scale: 1,
                        currentScale: 1,
                        isScaling: !1,
                        gesture: {
                            $slideEl: void 0,
                            slideWidth: void 0,
                            slideHeight: void 0,
                            $imageEl: void 0,
                            $imageWrapEl: void 0,
                            maxRatio: 3
                        },
                        image: {
                            isTouched: void 0,
                            isMoved: void 0,
                            currentX: void 0,
                            currentY: void 0,
                            minX: void 0,
                            minY: void 0,
                            maxX: void 0,
                            maxY: void 0,
                            width: void 0,
                            height: void 0,
                            startX: void 0,
                            startY: void 0,
                            touchesStart: {},
                            touchesCurrent: {}
                        },
                        velocity: {
                            x: void 0,
                            y: void 0,
                            prevPositionX: void 0,
                            prevPositionY: void 0,
                            prevTime: void 0
                        }
                    };
                "onGestureStart onGestureChange onGestureEnd onTouchStart onTouchMove onTouchEnd onTransitionEnd toggle enable disable in out".split(" ").forEach(function(i) {
                    t[i] = re[i].bind(e)
                }), c.extend(e, {
                    zoom: t
                });
                var i = 1;
                Object.defineProperty(e.zoom, "scale", {
                    get: function() {
                        return i
                    },
                    set: function(t) {
                        if (i !== t) {
                            var s = e.zoom.gesture.$imageEl ? e.zoom.gesture.$imageEl[0] : void 0,
                                n = e.zoom.gesture.$slideEl ? e.zoom.gesture.$slideEl[0] : void 0;
                            e.emit("zoomChange", t, s, n)
                        }
                        i = t
                    }
                })
            },
            on: {
                init: function() {
                    this.params.zoom.enabled && this.zoom.enable()
                },
                destroy: function() {
                    this.zoom.disable()
                },
                touchStart: function(e) {
                    this.zoom.enabled && this.zoom.onTouchStart(e)
                },
                touchEnd: function(e) {
                    this.zoom.enabled && this.zoom.onTouchEnd(e)
                },
                doubleTap: function(e) {
                    this.params.zoom.enabled && this.zoom.enabled && this.params.zoom.toggle && this.zoom.toggle(e)
                },
                transitionEnd: function() {
                    this.zoom.enabled && this.params.zoom.enabled && this.zoom.onTransitionEnd()
                },
                slideChange: function() {
                    this.zoom.enabled && this.params.zoom.enabled && this.params.cssMode && this.zoom.onTransitionEnd()
                }
            }
        }, {
            name: "lazy",
            params: {
                lazy: {
                    enabled: !1,
                    loadPrevNext: !1,
                    loadPrevNextAmount: 1,
                    loadOnTransitionStart: !1,
                    elementClass: "swiper-lazy",
                    loadingClass: "swiper-lazy-loading",
                    loadedClass: "swiper-lazy-loaded",
                    preloaderClass: "swiper-lazy-preloader"
                }
            },
            create: function() {
                c.extend(this, {
                    lazy: {
                        initialImageLoaded: !1,
                        load: oe.load.bind(this),
                        loadInSlide: oe.loadInSlide.bind(this)
                    }
                })
            },
            on: {
                beforeInit: function() {
                    this.params.lazy.enabled && this.params.preloadImages && (this.params.preloadImages = !1)
                },
                init: function() {
                    this.params.lazy.enabled && !this.params.loop && 0 === this.params.initialSlide && this.lazy.load()
                },
                scroll: function() {
                    this.params.freeMode && !this.params.freeModeSticky && this.lazy.load()
                },
                resize: function() {
                    this.params.lazy.enabled && this.lazy.load()
                },
                scrollbarDragMove: function() {
                    this.params.lazy.enabled && this.lazy.load()
                },
                transitionStart: function() {
                    this.params.lazy.enabled && (this.params.lazy.loadOnTransitionStart || !this.params.lazy.loadOnTransitionStart && !this.lazy.initialImageLoaded) && this.lazy.load()
                },
                transitionEnd: function() {
                    this.params.lazy.enabled && !this.params.lazy.loadOnTransitionStart && this.lazy.load()
                },
                slideChange: function() {
                    this.params.lazy.enabled && this.params.cssMode && this.lazy.load()
                }
            }
        }, {
            name: "controller",
            params: {
                controller: {
                    control: void 0,
                    inverse: !1,
                    by: "slide"
                }
            },
            create: function() {
                c.extend(this, {
                    controller: {
                        control: this.params.controller.control,
                        getInterpolateFunction: le.getInterpolateFunction.bind(this),
                        setTranslate: le.setTranslate.bind(this),
                        setTransition: le.setTransition.bind(this)
                    }
                })
            },
            on: {
                update: function() {
                    this.controller.control && this.controller.spline && (this.controller.spline = void 0, delete this.controller.spline)
                },
                resize: function() {
                    this.controller.control && this.controller.spline && (this.controller.spline = void 0, delete this.controller.spline)
                },
                observerUpdate: function() {
                    this.controller.control && this.controller.spline && (this.controller.spline = void 0, delete this.controller.spline)
                },
                setTranslate: function(e, t) {
                    this.controller.control && this.controller.setTranslate(e, t)
                },
                setTransition: function(e, t) {
                    this.controller.control && this.controller.setTransition(e, t)
                }
            }
        }, {
            name: "a11y",
            params: {
                a11y: {
                    enabled: !0,
                    notificationClass: "swiper-notification",
                    prevSlideMessage: "Previous slide",
                    nextSlideMessage: "Next slide",
                    firstSlideMessage: "This is the first slide",
                    lastSlideMessage: "This is the last slide",
                    paginationBulletMessage: "Go to slide {{index}}"
                }
            },
            create: function() {
                var e = this;
                c.extend(e, {
                    a11y: {
                        liveRegion: r('<span class="' + e.params.a11y.notificationClass + '" aria-live="assertive" aria-atomic="true"></span>')
                    }
                }), Object.keys(ce).forEach(function(t) {
                    e.a11y[t] = ce[t].bind(e)
                })
            },
            on: {
                init: function() {
                    this.params.a11y.enabled && (this.a11y.init(), this.a11y.updateNavigation())
                },
                toEdge: function() {
                    this.params.a11y.enabled && this.a11y.updateNavigation()
                },
                fromEdge: function() {
                    this.params.a11y.enabled && this.a11y.updateNavigation()
                },
                paginationUpdate: function() {
                    this.params.a11y.enabled && this.a11y.updatePagination()
                },
                destroy: function() {
                    this.params.a11y.enabled && this.a11y.destroy()
                }
            }
        }, {
            name: "history",
            params: {
                history: {
                    enabled: !1,
                    replaceState: !1,
                    key: "slides"
                }
            },
            create: function() {
                c.extend(this, {
                    history: {
                        init: de.init.bind(this),
                        setHistory: de.setHistory.bind(this),
                        setHistoryPopState: de.setHistoryPopState.bind(this),
                        scrollToSlide: de.scrollToSlide.bind(this),
                        destroy: de.destroy.bind(this)
                    }
                })
            },
            on: {
                init: function() {
                    this.params.history.enabled && this.history.init()
                },
                destroy: function() {
                    this.params.history.enabled && this.history.destroy()
                },
                transitionEnd: function() {
                    this.history.initialized && this.history.setHistory(this.params.history.key, this.activeIndex)
                },
                slideChange: function() {
                    this.history.initialized && this.params.cssMode && this.history.setHistory(this.params.history.key, this.activeIndex)
                }
            }
        }, {
            name: "hash-navigation",
            params: {
                hashNavigation: {
                    enabled: !1,
                    replaceState: !1,
                    watchState: !1
                }
            },
            create: function() {
                c.extend(this, {
                    hashNavigation: {
                        initialized: !1,
                        init: he.init.bind(this),
                        destroy: he.destroy.bind(this),
                        setHash: he.setHash.bind(this),
                        onHashCange: he.onHashCange.bind(this)
                    }
                })
            },
            on: {
                init: function() {
                    this.params.hashNavigation.enabled && this.hashNavigation.init()
                },
                destroy: function() {
                    this.params.hashNavigation.enabled && this.hashNavigation.destroy()
                },
                transitionEnd: function() {
                    this.hashNavigation.initialized && this.hashNavigation.setHash()
                },
                slideChange: function() {
                    this.hashNavigation.initialized && this.params.cssMode && this.hashNavigation.setHash()
                }
            }
        }, {
            name: "autoplay",
            params: {
                autoplay: {
                    enabled: !1,
                    delay: 3e3,
                    waitForTransition: !0,
                    disableOnInteraction: !0,
                    stopOnLastSlide: !1,
                    reverseDirection: !1
                }
            },
            create: function() {
                var e = this;
                c.extend(e, {
                    autoplay: {
                        running: !1,
                        paused: !1,
                        run: ue.run.bind(e),
                        start: ue.start.bind(e),
                        stop: ue.stop.bind(e),
                        pause: ue.pause.bind(e),
                        onVisibilityChange: function() {
                            "hidden" === document.visibilityState && e.autoplay.running && e.autoplay.pause(), "visible" === document.visibilityState && e.autoplay.paused && (e.autoplay.run(), e.autoplay.paused = !1)
                        },
                        onTransitionEnd: function(t) {
                            e && !e.destroyed && e.$wrapperEl && t.target === this && (e.$wrapperEl[0].removeEventListener("transitionend", e.autoplay.onTransitionEnd), e.$wrapperEl[0].removeEventListener("webkitTransitionEnd", e.autoplay.onTransitionEnd), e.autoplay.paused = !1, e.autoplay.running ? e.autoplay.run() : e.autoplay.stop())
                        }
                    }
                })
            },
            on: {
                init: function() {
                    this.params.autoplay.enabled && (this.autoplay.start(), document.addEventListener("visibilitychange", this.autoplay.onVisibilityChange))
                },
                beforeTransitionStart: function(e, t) {
                    this.autoplay.running && (t || !this.params.autoplay.disableOnInteraction ? this.autoplay.pause(e) : this.autoplay.stop())
                },
                sliderFirstMove: function() {
                    this.autoplay.running && (this.params.autoplay.disableOnInteraction ? this.autoplay.stop() : this.autoplay.pause())
                },
                touchEnd: function() {
                    this.params.cssMode && this.autoplay.paused && !this.params.autoplay.disableOnInteraction && this.autoplay.run()
                },
                destroy: function() {
                    this.autoplay.running && this.autoplay.stop(), document.removeEventListener("visibilitychange", this.autoplay.onVisibilityChange)
                }
            }
        }, {
            name: "effect-fade",
            params: {
                fadeEffect: {
                    crossFade: !1
                }
            },
            create: function() {
                c.extend(this, {
                    fadeEffect: {
                        setTranslate: pe.setTranslate.bind(this),
                        setTransition: pe.setTransition.bind(this)
                    }
                })
            },
            on: {
                beforeInit: function() {
                    if ("fade" === this.params.effect) {
                        this.classNames.push(this.params.containerModifierClass + "fade");
                        var e = {
                            slidesPerView: 1,
                            slidesPerColumn: 1,
                            slidesPerGroup: 1,
                            watchSlidesProgress: !0,
                            spaceBetween: 0,
                            virtualTranslate: !0
                        };
                        c.extend(this.params, e), c.extend(this.originalParams, e)
                    }
                },
                setTranslate: function() {
                    "fade" === this.params.effect && this.fadeEffect.setTranslate()
                },
                setTransition: function(e) {
                    "fade" === this.params.effect && this.fadeEffect.setTransition(e)
                }
            }
        }, {
            name: "effect-cube",
            params: {
                cubeEffect: {
                    slideShadows: !0,
                    shadow: !0,
                    shadowOffset: 20,
                    shadowScale: .94
                }
            },
            create: function() {
                c.extend(this, {
                    cubeEffect: {
                        setTranslate: fe.setTranslate.bind(this),
                        setTransition: fe.setTransition.bind(this)
                    }
                })
            },
            on: {
                beforeInit: function() {
                    if ("cube" === this.params.effect) {
                        this.classNames.push(this.params.containerModifierClass + "cube"), this.classNames.push(this.params.containerModifierClass + "3d");
                        var e = {
                            slidesPerView: 1,
                            slidesPerColumn: 1,
                            slidesPerGroup: 1,
                            watchSlidesProgress: !0,
                            resistanceRatio: 0,
                            spaceBetween: 0,
                            centeredSlides: !1,
                            virtualTranslate: !0
                        };
                        c.extend(this.params, e), c.extend(this.originalParams, e)
                    }
                },
                setTranslate: function() {
                    "cube" === this.params.effect && this.cubeEffect.setTranslate()
                },
                setTransition: function(e) {
                    "cube" === this.params.effect && this.cubeEffect.setTransition(e)
                }
            }
        }, {
            name: "effect-flip",
            params: {
                flipEffect: {
                    slideShadows: !0,
                    limitRotation: !0
                }
            },
            create: function() {
                c.extend(this, {
                    flipEffect: {
                        setTranslate: me.setTranslate.bind(this),
                        setTransition: me.setTransition.bind(this)
                    }
                })
            },
            on: {
                beforeInit: function() {
                    if ("flip" === this.params.effect) {
                        this.classNames.push(this.params.containerModifierClass + "flip"), this.classNames.push(this.params.containerModifierClass + "3d");
                        var e = {
                            slidesPerView: 1,
                            slidesPerColumn: 1,
                            slidesPerGroup: 1,
                            watchSlidesProgress: !0,
                            spaceBetween: 0,
                            virtualTranslate: !0
                        };
                        c.extend(this.params, e), c.extend(this.originalParams, e)
                    }
                },
                setTranslate: function() {
                    "flip" === this.params.effect && this.flipEffect.setTranslate()
                },
                setTransition: function(e) {
                    "flip" === this.params.effect && this.flipEffect.setTransition(e)
                }
            }
        }, {
            name: "effect-coverflow",
            params: {
                coverflowEffect: {
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: !0
                }
            },
            create: function() {
                c.extend(this, {
                    coverflowEffect: {
                        setTranslate: ve.setTranslate.bind(this),
                        setTransition: ve.setTransition.bind(this)
                    }
                })
            },
            on: {
                beforeInit: function() {
                    "coverflow" === this.params.effect && (this.classNames.push(this.params.containerModifierClass + "coverflow"), this.classNames.push(this.params.containerModifierClass + "3d"), this.params.watchSlidesProgress = !0, this.originalParams.watchSlidesProgress = !0)
                },
                setTranslate: function() {
                    "coverflow" === this.params.effect && this.coverflowEffect.setTranslate()
                },
                setTransition: function(e) {
                    "coverflow" === this.params.effect && this.coverflowEffect.setTransition(e)
                }
            }
        }, {
            name: "thumbs",
            params: {
                thumbs: {
                    swiper: null,
                    multipleActiveThumbs: !0,
                    autoScrollOffset: 0,
                    slideThumbActiveClass: "swiper-slide-thumb-active",
                    thumbsContainerClass: "swiper-container-thumbs"
                }
            },
            create: function() {
                c.extend(this, {
                    thumbs: {
                        swiper: null,
                        init: ge.init.bind(this),
                        update: ge.update.bind(this),
                        onThumbClick: ge.onThumbClick.bind(this)
                    }
                })
            },
            on: {
                beforeInit: function() {
                    var e = this.params.thumbs;
                    e && e.swiper && (this.thumbs.init(), this.thumbs.update(!0))
                },
                slideChange: function() {
                    this.thumbs.swiper && this.thumbs.update()
                },
                update: function() {
                    this.thumbs.swiper && this.thumbs.update()
                },
                resize: function() {
                    this.thumbs.swiper && this.thumbs.update()
                },
                observerUpdate: function() {
                    this.thumbs.swiper && this.thumbs.update()
                },
                setTransition: function(e) {
                    var t = this.thumbs.swiper;
                    t && t.setTransition(e)
                },
                beforeDestroy: function() {
                    var e = this.thumbs.swiper;
                    e && this.thumbs.swiperCreated && e && e.destroy()
                }
            }
        }];
    return void 0 === V.use && (V.use = V.Class.use, V.installModule = V.Class.installModule), V.use(be), V
}),
function(e) {
    "use strict";
    e.fn.fitVids = function(t) {
        var i = {
            customSelector: null,
            ignore: null
        };
        if (!document.getElementById("fit-vids-style")) {
            var s = document.head || document.getElementsByTagName("head")[0],
                n = document.createElement("div");
            n.innerHTML = '<p>x</p><style id="fit-vids-style">.fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}</style>', s.appendChild(n.childNodes[1])
        }
        return t && e.extend(i, t), this.each(function() {
            var t = ['iframe[src*="player.vimeo.com"]', 'iframe[src*="youtube.com"]', 'iframe[src*="youtube-nocookie.com"]', 'iframe[src*="kickstarter.com"][src*="video.html"]', "object", "embed"];
            i.customSelector && t.push(i.customSelector);
            var s = ".fitvidsignore";
            i.ignore && (s = s + ", " + i.ignore);
            var n = e(this).find(t.join(","));
            (n = (n = n.not("object object")).not(s)).each(function() {
                var t = e(this);
                if (!(t.parents(s).length > 0 || "embed" === this.tagName.toLowerCase() && t.parent("object").length || t.parent(".fluid-width-video-wrapper").length)) {
                    t.css("height") || t.css("width") || !isNaN(t.attr("height")) && !isNaN(t.attr("width")) || (t.attr("height", 9), t.attr("width", 16));
                    var i = ("object" === this.tagName.toLowerCase() || t.attr("height") && !isNaN(parseInt(t.attr("height"), 10)) ? parseInt(t.attr("height"), 10) : t.height()) / (isNaN(parseInt(t.attr("width"), 10)) ? t.width() : parseInt(t.attr("width"), 10));
                    if (!t.attr("name")) {
                        var n = "fitvid" + e.fn.fitVids._count;
                        t.attr("name", n), e.fn.fitVids._count++
                    }
                    t.wrap('<div class="fluid-width-video-wrapper"></div>').parent(".fluid-width-video-wrapper").css("padding-top", 100 * i + "%"), t.removeAttr("height").removeAttr("width")
                }
            })
        })
    }, e.fn.fitVids._count = 0
}(window.jQuery || window.Zepto),
function(e, t, i, s) {
    "use strict";

    function n(e, t) {
        var s, n, a, r = [],
            o = 0;
        e && e.isDefaultPrevented() || (e.preventDefault(), t = t || {}, e && e.data && (t = p(e.data.options, t)), s = t.$target || i(e.currentTarget).trigger("blur"), (a = i.fancybox.getInstance()) && a.$trigger && a.$trigger.is(s) || (t.selector ? r = i(t.selector) : (n = s.attr("data-fancybox") || "") ? r = (r = e.data ? e.data.items : []).length ? r.filter('[data-fancybox="' + n + '"]') : i('[data-fancybox="' + n + '"]') : r = [s], (o = i(r).index(s)) < 0 && (o = 0), (a = i.fancybox.open(r, t, o)).$trigger = s))
    }
    if (e.console = e.console || {
            info: function(e) {}
        }, i) {
        if (i.fn.fancybox) return void console.info("fancyBox already initialized");
        var a = {
                closeExisting: !1,
                loop: !1,
                gutter: 50,
                keyboard: !0,
                preventCaptionOverlap: !0,
                arrows: !0,
                infobar: !0,
                smallBtn: "auto",
                toolbar: "auto",
                buttons: ["zoom", "slideShow", "thumbs", "close"],
                idleTime: 3,
                protect: !1,
                modal: !1,
                image: {
                    preload: !1
                },
                ajax: {
                    settings: {
                        data: {
                            fancybox: !0
                        }
                    }
                },
                iframe: {
                    tpl: '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" allowfullscreen="allowfullscreen" allow="autoplay; fullscreen" src=""></iframe>',
                    preload: !0,
                    css: {},
                    attr: {
                        scrolling: "auto"
                    }
                },
                video: {
                    tpl: '<video class="fancybox-video" controls controlsList="nodownload" poster="{{poster}}"><source src="{{src}}" type="{{format}}" />Sorry, your browser doesn\'t support embedded videos, <a href="{{src}}">download</a> and watch with your favorite video player!</video>',
                    format: "",
                    autoStart: !0
                },
                defaultType: "image",
                animationEffect: "zoom",
                animationDuration: 366,
                zoomOpacity: "auto",
                transitionEffect: "fade",
                transitionDuration: 366,
                slideClass: "",
                baseClass: "",
                baseTpl: '<div class="fancybox-container" role="dialog" tabindex="-1"><div class="fancybox-bg"></div><div class="fancybox-inner"><div class="fancybox-infobar"><span data-fancybox-index></span>&nbsp;/&nbsp;<span data-fancybox-count></span></div><div class="fancybox-toolbar">{{buttons}}</div><div class="fancybox-navigation">{{arrows}}</div><div class="fancybox-stage"></div><div class="fancybox-caption"><div class="fancybox-caption__body"></div></div></div></div>',
                spinnerTpl: '<div class="fancybox-loading"></div>',
                errorTpl: '<div class="fancybox-error"><p>{{ERROR}}</p></div>',
                btnTpl: {
                    download: '<a download data-fancybox-download class="fancybox-button fancybox-button--download" title="{{DOWNLOAD}}" href="javascript:;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18.62 17.09V19H5.38v-1.91zm-2.97-6.96L17 11.45l-5 4.87-5-4.87 1.36-1.32 2.68 2.64V5h1.92v7.77z"/></svg></a>',
                    zoom: '<button data-fancybox-zoom class="fancybox-button fancybox-button--zoom" title="{{ZOOM}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18.7 17.3l-3-3a5.9 5.9 0 0 0-.6-7.6 5.9 5.9 0 0 0-8.4 0 5.9 5.9 0 0 0 0 8.4 5.9 5.9 0 0 0 7.7.7l3 3a1 1 0 0 0 1.3 0c.4-.5.4-1 0-1.5zM8.1 13.8a4 4 0 0 1 0-5.7 4 4 0 0 1 5.7 0 4 4 0 0 1 0 5.7 4 4 0 0 1-5.7 0z"/></svg></button>',
                    close: '<button data-fancybox-close class="fancybox-button fancybox-button--close" title="{{CLOSE}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 10.6L6.6 5.2 5.2 6.6l5.4 5.4-5.4 5.4 1.4 1.4 5.4-5.4 5.4 5.4 1.4-1.4-5.4-5.4 5.4-5.4-1.4-1.4-5.4 5.4z"/></svg></button>',
                    arrowLeft: '<button data-fancybox-prev class="fancybox-button fancybox-button--arrow_left" title="{{PREV}}"><div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M11.28 15.7l-1.34 1.37L5 12l4.94-5.07 1.34 1.38-2.68 2.72H19v1.94H8.6z"/></svg></div></button>',
                    arrowRight: '<button data-fancybox-next class="fancybox-button fancybox-button--arrow_right" title="{{NEXT}}"><div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15.4 12.97l-2.68 2.72 1.34 1.38L19 12l-4.94-5.07-1.34 1.38 2.68 2.72H5v1.94z"/></svg></div></button>',
                    smallBtn: '<button type="button" data-fancybox-close class="fancybox-button fancybox-close-small" title="{{CLOSE}}"><svg xmlns="http://www.w3.org/2000/svg" version="1" viewBox="0 0 24 24"><path d="M13 12l5-5-1-1-5 5-5-5-1 1 5 5-5 5 1 1 5-5 5 5 1-1z"/></svg></button>'
                },
                parentEl: "body",
                hideScrollbar: !0,
                autoFocus: !0,
                backFocus: !0,
                trapFocus: !0,
                fullScreen: {
                    autoStart: !1
                },
                touch: {
                    vertical: !0,
                    momentum: !0
                },
                hash: null,
                media: {},
                slideShow: {
                    autoStart: !1,
                    speed: 3e3
                },
                thumbs: {
                    autoStart: !1,
                    hideOnClose: !0,
                    parentEl: ".fancybox-container",
                    axis: "y"
                },
                wheel: "auto",
                onInit: i.noop,
                beforeLoad: i.noop,
                afterLoad: i.noop,
                beforeShow: i.noop,
                afterShow: i.noop,
                beforeClose: i.noop,
                afterClose: i.noop,
                onActivate: i.noop,
                onDeactivate: i.noop,
                clickContent: function(e, t) {
                    return "image" === e.type && "zoom"
                },
                clickSlide: "close",
                clickOutside: "close",
                dblclickContent: !1,
                dblclickSlide: !1,
                dblclickOutside: !1,
                mobile: {
                    preventCaptionOverlap: !1,
                    idleTime: !1,
                    clickContent: function(e, t) {
                        return "image" === e.type && "toggleControls"
                    },
                    clickSlide: function(e, t) {
                        return "image" === e.type ? "toggleControls" : "close"
                    },
                    dblclickContent: function(e, t) {
                        return "image" === e.type && "zoom"
                    },
                    dblclickSlide: function(e, t) {
                        return "image" === e.type && "zoom"
                    }
                },
                lang: "en",
                i18n: {
                    en: {
                        CLOSE: "Close",
                        NEXT: "Next",
                        PREV: "Previous",
                        ERROR: "The requested content cannot be loaded. <br/> Please try again later.",
                        PLAY_START: "Start slideshow",
                        PLAY_STOP: "Pause slideshow",
                        FULL_SCREEN: "Full screen",
                        THUMBS: "Thumbnails",
                        DOWNLOAD: "Download",
                        SHARE: "Share",
                        ZOOM: "Zoom"
                    },
                    de: {
                        CLOSE: "Schlie&szlig;en",
                        NEXT: "Weiter",
                        PREV: "Zur&uuml;ck",
                        ERROR: "Die angeforderten Daten konnten nicht geladen werden. <br/> Bitte versuchen Sie es sp&auml;ter nochmal.",
                        PLAY_START: "Diaschau starten",
                        PLAY_STOP: "Diaschau beenden",
                        FULL_SCREEN: "Vollbild",
                        THUMBS: "Vorschaubilder",
                        DOWNLOAD: "Herunterladen",
                        SHARE: "Teilen",
                        ZOOM: "Vergr&ouml;&szlig;ern"
                    }
                }
            },
            r = i(e),
            o = i(t),
            l = 0,
            c = e.requestAnimationFrame || e.webkitRequestAnimationFrame || e.mozRequestAnimationFrame || e.oRequestAnimationFrame || function(t) {
                return e.setTimeout(t, 1e3 / 60)
            },
            d = e.cancelAnimationFrame || e.webkitCancelAnimationFrame || e.mozCancelAnimationFrame || e.oCancelAnimationFrame || function(t) {
                e.clearTimeout(t)
            },
            h = function() {
                var e, i = t.createElement("fakeelement"),
                    s = {
                        transition: "transitionend",
                        OTransition: "oTransitionEnd",
                        MozTransition: "transitionend",
                        WebkitTransition: "webkitTransitionEnd"
                    };
                for (e in s)
                    if (void 0 !== i.style[e]) return s[e];
                return "transitionend"
            }(),
            u = function(e) {
                return e && e.length && e[0].offsetHeight
            },
            p = function(e, t) {
                var s = i.extend(!0, {}, e, t);
                return i.each(t, function(e, t) {
                    i.isArray(t) && (s[e] = t)
                }), s
            },
            f = function(e) {
                var s, n;
                return !(!e || e.ownerDocument !== t) && (i(".fancybox-container").css("pointer-events", "none"), s = {
                    x: e.getBoundingClientRect().left + e.offsetWidth / 2,
                    y: e.getBoundingClientRect().top + e.offsetHeight / 2
                }, n = t.elementFromPoint(s.x, s.y) === e, i(".fancybox-container").css("pointer-events", ""), n)
            },
            m = function(e, t, s) {
                var n = this;
                n.opts = p({
                    index: s
                }, i.fancybox.defaults), i.isPlainObject(t) && (n.opts = p(n.opts, t)), i.fancybox.isMobile && (n.opts = p(n.opts, n.opts.mobile)), n.id = n.opts.id || ++l, n.currIndex = parseInt(n.opts.index, 10) || 0, n.prevIndex = null, n.prevPos = null, n.currPos = 0, n.firstRun = !0, n.group = [], n.slides = {}, n.addContent(e), n.group.length && n.init()
            };
        i.extend(m.prototype, {
                init: function() {
                    var s, n, a = this,
                        r = a.group[a.currIndex].opts;
                    r.closeExisting && i.fancybox.close(!0), i("body").addClass("fancybox-active"), !i.fancybox.getInstance() && !1 !== r.hideScrollbar && !i.fancybox.isMobile && t.body.scrollHeight > e.innerHeight && (i("head").append('<style id="fancybox-style-noscroll" type="text/css">.compensate-for-scrollbar{margin-right:' + (e.innerWidth - t.documentElement.clientWidth) + "px;}</style>"), i("body").addClass("compensate-for-scrollbar")), n = "", i.each(r.buttons, function(e, t) {
                        n += r.btnTpl[t] || ""
                    }), s = i(a.translate(a, r.baseTpl.replace("{{buttons}}", n).replace("{{arrows}}", r.btnTpl.arrowLeft + r.btnTpl.arrowRight))).attr("id", "fancybox-container-" + a.id).addClass(r.baseClass).data("FancyBox", a).appendTo(r.parentEl), a.$refs = {
                        container: s
                    }, ["bg", "inner", "infobar", "toolbar", "stage", "caption", "navigation"].forEach(function(e) {
                        a.$refs[e] = s.find(".fancybox-" + e)
                    }), a.trigger("onInit"), a.activate(), a.jumpTo(a.currIndex)
                },
                translate: function(e, t) {
                    var i = e.opts.i18n[e.opts.lang] || e.opts.i18n.en;
                    return t.replace(/\{\{(\w+)\}\}/g, function(e, t) {
                        return void 0 === i[t] ? e : i[t]
                    })
                },
                addContent: function(e) {
                    var t, s = this,
                        n = i.makeArray(e);
                    i.each(n, function(e, t) {
                        var n, a, r, o, l, c = {},
                            d = {};
                        i.isPlainObject(t) ? (c = t, d = t.opts || t) : "object" === i.type(t) && i(t).length ? (d = (n = i(t)).data() || {}, (d = i.extend(!0, {}, d, d.options)).$orig = n, c.src = s.opts.src || d.src || n.attr("href"), c.type || c.src || (c.type = "inline", c.src = t)) : c = {
                            type: "html",
                            src: t + ""
                        }, c.opts = i.extend(!0, {}, s.opts, d), i.isArray(d.buttons) && (c.opts.buttons = d.buttons), i.fancybox.isMobile && c.opts.mobile && (c.opts = p(c.opts, c.opts.mobile)), a = c.type || c.opts.type, o = c.src || "", !a && o && ((r = o.match(/\.(mp4|mov|ogv|webm)((\?|#).*)?$/i)) ? (a = "video", c.opts.video.format || (c.opts.video.format = "video/" + ("ogv" === r[1] ? "ogg" : r[1]))) : o.match(/(^data:image\/[a-z0-9+\/=]*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg|ico)((\?|#).*)?$)/i) ? a = "image" : o.match(/\.(pdf)((\?|#).*)?$/i) ? (a = "iframe", c = i.extend(!0, c, {
                            contentType: "pdf",
                            opts: {
                                iframe: {
                                    preload: !1
                                }
                            }
                        })) : "#" === o.charAt(0) && (a = "inline")), a ? c.type = a : s.trigger("objectNeedsType", c), c.contentType || (c.contentType = i.inArray(c.type, ["html", "inline", "ajax"]) > -1 ? "html" : c.type), c.index = s.group.length, "auto" == c.opts.smallBtn && (c.opts.smallBtn = i.inArray(c.type, ["html", "inline", "ajax"]) > -1), "auto" === c.opts.toolbar && (c.opts.toolbar = !c.opts.smallBtn), c.$thumb = c.opts.$thumb || null, c.opts.$trigger && c.index === s.opts.index && (c.$thumb = c.opts.$trigger.find("img:first"), c.$thumb.length && (c.opts.$orig = c.opts.$trigger)), c.$thumb && c.$thumb.length || !c.opts.$orig || (c.$thumb = c.opts.$orig.find("img:first")), c.$thumb && !c.$thumb.length && (c.$thumb = null), c.thumb = c.opts.thumb || (c.$thumb ? c.$thumb[0].src : null), "function" === i.type(c.opts.caption) && (c.opts.caption = c.opts.caption.apply(t, [s, c])), "function" === i.type(s.opts.caption) && (c.opts.caption = s.opts.caption.apply(t, [s, c])), c.opts.caption instanceof i || (c.opts.caption = void 0 === c.opts.caption ? "" : c.opts.caption + ""), "ajax" === c.type && ((l = o.split(/\s+/, 2)).length > 1 && (c.src = l.shift(), c.opts.filter = l.shift())), c.opts.modal && (c.opts = i.extend(!0, c.opts, {
                            trapFocus: !0,
                            infobar: 0,
                            toolbar: 0,
                            smallBtn: 0,
                            keyboard: 0,
                            slideShow: 0,
                            fullScreen: 0,
                            thumbs: 0,
                            touch: 0,
                            clickContent: !1,
                            clickSlide: !1,
                            clickOutside: !1,
                            dblclickContent: !1,
                            dblclickSlide: !1,
                            dblclickOutside: !1
                        })), s.group.push(c)
                    }), Object.keys(s.slides).length && (s.updateControls(), (t = s.Thumbs) && t.isActive && (t.create(), t.focus()))
                },
                addEvents: function() {
                    var t = this;
                    t.removeEvents(), t.$refs.container.on("click.fb-close", "[data-fancybox-close]", function(e) {
                        e.stopPropagation(), e.preventDefault(), t.close(e)
                    }).on("touchstart.fb-prev click.fb-prev", "[data-fancybox-prev]", function(e) {
                        e.stopPropagation(), e.preventDefault(), t.previous()
                    }).on("touchstart.fb-next click.fb-next", "[data-fancybox-next]", function(e) {
                        e.stopPropagation(), e.preventDefault(), t.next()
                    }).on("click.fb", "[data-fancybox-zoom]", function(e) {
                        t[t.isScaledDown() ? "scaleToActual" : "scaleToFit"]()
                    }), r.on("orientationchange.fb resize.fb", function(e) {
                        e && e.originalEvent && "resize" === e.originalEvent.type ? (t.requestId && d(t.requestId), t.requestId = c(function() {
                            t.update(e)
                        })) : (t.current && "iframe" === t.current.type && t.$refs.stage.hide(), setTimeout(function() {
                            t.$refs.stage.show(), t.update(e)
                        }, i.fancybox.isMobile ? 600 : 250))
                    }), o.on("keydown.fb", function(e) {
                        var s = (i.fancybox ? i.fancybox.getInstance() : null).current,
                            n = e.keyCode || e.which;
                        if (9 != n) return !s.opts.keyboard || e.ctrlKey || e.altKey || e.shiftKey || i(e.target).is("input,textarea,video,audio,select") ? void 0 : 8 === n || 27 === n ? (e.preventDefault(), void t.close(e)) : 37 === n || 38 === n ? (e.preventDefault(), void t.previous()) : 39 === n || 40 === n ? (e.preventDefault(), void t.next()) : void t.trigger("afterKeydown", e, n);
                        s.opts.trapFocus && t.focus(e)
                    }), t.group[t.currIndex].opts.idleTime && (t.idleSecondsCounter = 0, o.on("mousemove.fb-idle mouseleave.fb-idle mousedown.fb-idle touchstart.fb-idle touchmove.fb-idle scroll.fb-idle keydown.fb-idle", function(e) {
                        t.idleSecondsCounter = 0, t.isIdle && t.showControls(), t.isIdle = !1
                    }), t.idleInterval = e.setInterval(function() {
                        ++t.idleSecondsCounter >= t.group[t.currIndex].opts.idleTime && !t.isDragging && (t.isIdle = !0, t.idleSecondsCounter = 0, t.hideControls())
                    }, 1e3))
                },
                removeEvents: function() {
                    var t = this;
                    r.off("orientationchange.fb resize.fb"), o.off("keydown.fb .fb-idle"), this.$refs.container.off(".fb-close .fb-prev .fb-next"), t.idleInterval && (e.clearInterval(t.idleInterval), t.idleInterval = null)
                },
                previous: function(e) {
                    return this.jumpTo(this.currPos - 1, e)
                },
                next: function(e) {
                    return this.jumpTo(this.currPos + 1, e)
                },
                jumpTo: function(e, t) {
                    var s, n, a, r, o, l, c, d, h, p = this,
                        f = p.group.length;
                    if (!(p.isDragging || p.isClosing || p.isAnimating && p.firstRun)) {
                        if (e = parseInt(e, 10), !(a = p.current ? p.current.opts.loop : p.opts.loop) && (e < 0 || e >= f)) return !1;
                        if (s = p.firstRun = !Object.keys(p.slides).length, o = p.current, p.prevIndex = p.currIndex, p.prevPos = p.currPos, r = p.createSlide(e), f > 1 && ((a || r.index < f - 1) && p.createSlide(e + 1), (a || r.index > 0) && p.createSlide(e - 1)), p.current = r, p.currIndex = r.index, p.currPos = r.pos, p.trigger("beforeShow", s), p.updateControls(), r.forcedDuration = void 0, i.isNumeric(t) ? r.forcedDuration = t : t = r.opts[s ? "animationDuration" : "transitionDuration"], t = parseInt(t, 10), n = p.isMoved(r), r.$slide.addClass("fancybox-slide--current"), s) return r.opts.animationEffect && t && p.$refs.container.css("transition-duration", t + "ms"), p.$refs.container.addClass("fancybox-is-open").trigger("focus"), p.loadSlide(r), void p.preload("image");
                        l = i.fancybox.getTranslate(o.$slide), c = i.fancybox.getTranslate(p.$refs.stage), i.each(p.slides, function(e, t) {
                            i.fancybox.stop(t.$slide, !0)
                        }), o.pos !== r.pos && (o.isComplete = !1), o.$slide.removeClass("fancybox-slide--complete fancybox-slide--current"), n ? (h = l.left - (o.pos * l.width + o.pos * o.opts.gutter), i.each(p.slides, function(e, s) {
                            s.$slide.removeClass("fancybox-animated").removeClass(function(e, t) {
                                return (t.match(/(^|\s)fancybox-fx-\S+/g) || []).join(" ")
                            });
                            var n = s.pos * l.width + s.pos * s.opts.gutter;
                            i.fancybox.setTranslate(s.$slide, {
                                top: 0,
                                left: n - c.left + h
                            }), s.pos !== r.pos && s.$slide.addClass("fancybox-slide--" + (s.pos > r.pos ? "next" : "previous")), u(s.$slide), i.fancybox.animate(s.$slide, {
                                top: 0,
                                left: (s.pos - r.pos) * l.width + (s.pos - r.pos) * s.opts.gutter
                            }, t, function() {
                                s.$slide.css({
                                    transform: "",
                                    opacity: ""
                                }).removeClass("fancybox-slide--next fancybox-slide--previous"), s.pos === p.currPos && p.complete()
                            })
                        })) : t && r.opts.transitionEffect && (d = "fancybox-animated fancybox-fx-" + r.opts.transitionEffect, o.$slide.addClass("fancybox-slide--" + (o.pos > r.pos ? "next" : "previous")), i.fancybox.animate(o.$slide, d, t, function() {
                            o.$slide.removeClass(d).removeClass("fancybox-slide--next fancybox-slide--previous")
                        }, !1)), r.isLoaded ? p.revealContent(r) : p.loadSlide(r), p.preload("image")
                    }
                },
                createSlide: function(e) {
                    var t, s, n = this;
                    return s = (s = e % n.group.length) < 0 ? n.group.length + s : s, !n.slides[e] && n.group[s] && (t = i('<div class="fancybox-slide"></div>').appendTo(n.$refs.stage), n.slides[e] = i.extend(!0, {}, n.group[s], {
                        pos: e,
                        $slide: t,
                        isLoaded: !1
                    }), n.updateSlide(n.slides[e])), n.slides[e]
                },
                scaleToActual: function(e, t, s) {
                    var n, a, r, o, l, c = this,
                        d = c.current,
                        h = d.$content,
                        u = i.fancybox.getTranslate(d.$slide).width,
                        p = i.fancybox.getTranslate(d.$slide).height,
                        f = d.width,
                        m = d.height;
                    c.isAnimating || c.isMoved() || !h || "image" != d.type || !d.isLoaded || d.hasError || (c.isAnimating = !0, i.fancybox.stop(h), e = void 0 === e ? .5 * u : e, t = void 0 === t ? .5 * p : t, (n = i.fancybox.getTranslate(h)).top -= i.fancybox.getTranslate(d.$slide).top, n.left -= i.fancybox.getTranslate(d.$slide).left, o = f / n.width, l = m / n.height, a = .5 * u - .5 * f, r = .5 * p - .5 * m, f > u && ((a = n.left * o - (e * o - e)) > 0 && (a = 0), a < u - f && (a = u - f)), m > p && ((r = n.top * l - (t * l - t)) > 0 && (r = 0), r < p - m && (r = p - m)), c.updateCursor(f, m), i.fancybox.animate(h, {
                        top: r,
                        left: a,
                        scaleX: o,
                        scaleY: l
                    }, s || 366, function() {
                        c.isAnimating = !1
                    }), c.SlideShow && c.SlideShow.isActive && c.SlideShow.stop())
                },
                scaleToFit: function(e) {
                    var t, s = this,
                        n = s.current,
                        a = n.$content;
                    s.isAnimating || s.isMoved() || !a || "image" != n.type || !n.isLoaded || n.hasError || (s.isAnimating = !0, i.fancybox.stop(a), t = s.getFitPos(n), s.updateCursor(t.width, t.height), i.fancybox.animate(a, {
                        top: t.top,
                        left: t.left,
                        scaleX: t.width / a.width(),
                        scaleY: t.height / a.height()
                    }, e || 366, function() {
                        s.isAnimating = !1
                    }))
                },
                getFitPos: function(e) {
                    var t, s, n, a, r = e.$content,
                        o = e.$slide,
                        l = e.width || e.opts.width,
                        c = e.height || e.opts.height,
                        d = {};
                    return !!(e.isLoaded && r && r.length) && (t = i.fancybox.getTranslate(this.$refs.stage).width, s = i.fancybox.getTranslate(this.$refs.stage).height, t -= parseFloat(o.css("paddingLeft")) + parseFloat(o.css("paddingRight")) + parseFloat(r.css("marginLeft")) + parseFloat(r.css("marginRight")), s -= parseFloat(o.css("paddingTop")) + parseFloat(o.css("paddingBottom")) + parseFloat(r.css("marginTop")) + parseFloat(r.css("marginBottom")), l && c || (l = t, c = s), (l *= n = Math.min(1, t / l, s / c)) > t - .5 && (l = t), (c *= n) > s - .5 && (c = s), "image" === e.type ? (d.top = Math.floor(.5 * (s - c)) + parseFloat(o.css("paddingTop")), d.left = Math.floor(.5 * (t - l)) + parseFloat(o.css("paddingLeft"))) : "video" === e.contentType && (c > l / (a = e.opts.width && e.opts.height ? l / c : e.opts.ratio || 16 / 9) ? c = l / a : l > c * a && (l = c * a)), d.width = l, d.height = c, d)
                },
                update: function(e) {
                    var t = this;
                    i.each(t.slides, function(i, s) {
                        t.updateSlide(s, e)
                    })
                },
                updateSlide: function(e, t) {
                    var s = this,
                        n = e && e.$content,
                        a = e.width || e.opts.width,
                        r = e.height || e.opts.height,
                        o = e.$slide;
                    s.adjustCaption(e), n && (a || r || "video" === e.contentType) && !e.hasError && (i.fancybox.stop(n), i.fancybox.setTranslate(n, s.getFitPos(e)), e.pos === s.currPos && (s.isAnimating = !1, s.updateCursor())), s.adjustLayout(e), o.length && (o.trigger("refresh"), e.pos === s.currPos && s.$refs.toolbar.add(s.$refs.navigation.find(".fancybox-button--arrow_right")).toggleClass("compensate-for-scrollbar", o.get(0).scrollHeight > o.get(0).clientHeight)), s.trigger("onUpdate", e, t)
                },
                centerSlide: function(e) {
                    var t = this,
                        s = t.current,
                        n = s.$slide;
                    !t.isClosing && s && (n.siblings().css({
                        transform: "",
                        opacity: ""
                    }), n.parent().children().removeClass("fancybox-slide--previous fancybox-slide--next"), i.fancybox.animate(n, {
                        top: 0,
                        left: 0,
                        opacity: 1
                    }, void 0 === e ? 0 : e, function() {
                        n.css({
                            transform: "",
                            opacity: ""
                        }), s.isComplete || t.complete()
                    }, !1))
                },
                isMoved: function(e) {
                    var t, s, n = e || this.current;
                    return !!n && (s = i.fancybox.getTranslate(this.$refs.stage), t = i.fancybox.getTranslate(n.$slide), !n.$slide.hasClass("fancybox-animated") && (Math.abs(t.top - s.top) > .5 || Math.abs(t.left - s.left) > .5))
                },
                updateCursor: function(e, t) {
                    var s, n, a = this,
                        r = a.current,
                        o = a.$refs.container;
                    r && !a.isClosing && a.Guestures && (o.removeClass("fancybox-is-zoomable fancybox-can-zoomIn fancybox-can-zoomOut fancybox-can-swipe fancybox-can-pan"), n = !!(s = a.canPan(e, t)) || a.isZoomable(), o.toggleClass("fancybox-is-zoomable", n), i("[data-fancybox-zoom]").prop("disabled", !n), s ? o.addClass("fancybox-can-pan") : n && ("zoom" === r.opts.clickContent || i.isFunction(r.opts.clickContent) && "zoom" == r.opts.clickContent(r)) ? o.addClass("fancybox-can-zoomIn") : r.opts.touch && (r.opts.touch.vertical || a.group.length > 1) && "video" !== r.contentType && o.addClass("fancybox-can-swipe"))
                },
                isZoomable: function() {
                    var e, t = this,
                        i = t.current;
                    if (i && !t.isClosing && "image" === i.type && !i.hasError) {
                        if (!i.isLoaded) return !0;
                        if ((e = t.getFitPos(i)) && (i.width > e.width || i.height > e.height)) return !0
                    }
                    return !1
                },
                isScaledDown: function(e, t) {
                    var s = !1,
                        n = this.current,
                        a = n.$content;
                    return void 0 !== e && void 0 !== t ? s = e < n.width && t < n.height : a && (s = (s = i.fancybox.getTranslate(a)).width < n.width && s.height < n.height), s
                },
                canPan: function(e, t) {
                    var s = this.current,
                        n = null,
                        a = !1;
                    return "image" === s.type && (s.isComplete || e && t) && !s.hasError && (a = this.getFitPos(s), void 0 !== e && void 0 !== t ? n = {
                        width: e,
                        height: t
                    } : s.isComplete && (n = i.fancybox.getTranslate(s.$content)), n && a && (a = Math.abs(n.width - a.width) > 1.5 || Math.abs(n.height - a.height) > 1.5)), a
                },
                loadSlide: function(e) {
                    var t, s, n, a = this;
                    if (!e.isLoading && !e.isLoaded) {
                        if (e.isLoading = !0, !1 === a.trigger("beforeLoad", e)) return e.isLoading = !1, !1;
                        switch (t = e.type, (s = e.$slide).off("refresh").trigger("onReset").addClass(e.opts.slideClass), t) {
                            case "image":
                                a.setImage(e);
                                break;
                            case "iframe":
                                a.setIframe(e);
                                break;
                            case "html":
                                a.setContent(e, e.src || e.content);
                                break;
                            case "video":
                                a.setContent(e, e.opts.video.tpl.replace(/\{\{src\}\}/gi, e.src).replace("{{format}}", e.opts.videoFormat || e.opts.video.format || "").replace("{{poster}}", e.thumb || ""));
                                break;
                            case "inline":
                                i(e.src).length ? a.setContent(e, i(e.src)) : a.setError(e);
                                break;
                            case "ajax":
                                a.showLoading(e), n = i.ajax(i.extend({}, e.opts.ajax.settings, {
                                    url: e.src,
                                    success: function(t, i) {
                                        "success" === i && a.setContent(e, t)
                                    },
                                    error: function(t, i) {
                                        t && "abort" !== i && a.setError(e)
                                    }
                                })), s.one("onReset", function() {
                                    n.abort()
                                });
                                break;
                            default:
                                a.setError(e)
                        }
                        return !0
                    }
                },
                setImage: function(e) {
                    var s, n = this;
                    setTimeout(function() {
                        var t = e.$image;
                        n.isClosing || !e.isLoading || t && t.length && t[0].complete || e.hasError || n.showLoading(e)
                    }, 50), n.checkSrcset(e), e.$content = i('<div class="fancybox-content"></div>').addClass("fancybox-is-hidden").appendTo(e.$slide.addClass("fancybox-slide--image")), !1 !== e.opts.preload && e.opts.width && e.opts.height && e.thumb && (e.width = e.opts.width, e.height = e.opts.height, (s = t.createElement("img")).onerror = function() {
                        i(this).remove(), e.$ghost = null
                    }, s.onload = function() {
                        n.afterLoad(e)
                    }, e.$ghost = i(s).addClass("fancybox-image").appendTo(e.$content).attr("src", e.thumb)), n.setBigImage(e)
                },
                checkSrcset: function(t) {
                    var i, s, n, a, r = t.opts.srcset || t.opts.image.srcset;
                    if (r) {
                        n = e.devicePixelRatio || 1, a = e.innerWidth * n, (s = r.split(",").map(function(e) {
                            var t = {};
                            return e.trim().split(/\s+/).forEach(function(e, i) {
                                var s = parseInt(e.substring(0, e.length - 1), 10);
                                if (0 === i) return t.url = e;
                                s && (t.value = s, t.postfix = e[e.length - 1])
                            }), t
                        })).sort(function(e, t) {
                            return e.value - t.value
                        });
                        for (var o = 0; o < s.length; o++) {
                            var l = s[o];
                            if ("w" === l.postfix && l.value >= a || "x" === l.postfix && l.value >= n) {
                                i = l;
                                break
                            }
                        }!i && s.length && (i = s[s.length - 1]), i && (t.src = i.url, t.width && t.height && "w" == i.postfix && (t.height = t.width / t.height * i.value, t.width = i.value), t.opts.srcset = r)
                    }
                },
                setBigImage: function(e) {
                    var s = this,
                        n = t.createElement("img"),
                        a = i(n);
                    e.$image = a.one("error", function() {
                        s.setError(e)
                    }).one("load", function() {
                        var t;
                        e.$ghost || (s.resolveImageSlideSize(e, this.naturalWidth, this.naturalHeight), s.afterLoad(e)), s.isClosing || (e.opts.srcset && ((t = e.opts.sizes) && "auto" !== t || (t = (e.width / e.height > 1 && r.width() / r.height() > 1 ? "100" : Math.round(e.width / e.height * 100)) + "vw"), a.attr("sizes", t).attr("srcset", e.opts.srcset)), e.$ghost && setTimeout(function() {
                            e.$ghost && !s.isClosing && e.$ghost.hide()
                        }, Math.min(300, Math.max(1e3, e.height / 1600))), s.hideLoading(e))
                    }).addClass("fancybox-image").attr("src", e.src).appendTo(e.$content), (n.complete || "complete" == n.readyState) && a.naturalWidth && a.naturalHeight ? a.trigger("load") : n.error && a.trigger("error")
                },
                resolveImageSlideSize: function(e, t, i) {
                    var s = parseInt(e.opts.width, 10),
                        n = parseInt(e.opts.height, 10);
                    e.width = t, e.height = i, s > 0 && (e.width = s, e.height = Math.floor(s * i / t)), n > 0 && (e.width = Math.floor(n * t / i), e.height = n)
                },
                setIframe: function(e) {
                    var t, s = this,
                        n = e.opts.iframe,
                        a = e.$slide;
                    e.$content = i('<div class="fancybox-content' + (n.preload ? " fancybox-is-hidden" : "") + '"></div>').css(n.css).appendTo(a), a.addClass("fancybox-slide--" + e.contentType), e.$iframe = t = i(n.tpl.replace(/\{rnd\}/g, (new Date).getTime())).attr(n.attr).appendTo(e.$content), n.preload ? (s.showLoading(e), t.on("load.fb error.fb", function(t) {
                        this.isReady = 1, e.$slide.trigger("refresh"), s.afterLoad(e)
                    }), a.on("refresh.fb", function() {
                        var i, s = e.$content,
                            r = n.css.width,
                            o = n.css.height;
                        if (1 === t[0].isReady) {
                            try {
                                i = t.contents().find("body")
                            } catch (e) {}
                            i && i.length && i.children().length && (a.css("overflow", "visible"), s.css({
                                width: "100%",
                                "max-width": "100%",
                                height: "9999px"
                            }), void 0 === r && (r = Math.ceil(Math.max(i[0].clientWidth, i.outerWidth(!0)))), s.css("width", r || "").css("max-width", ""), void 0 === o && (o = Math.ceil(Math.max(i[0].clientHeight, i.outerHeight(!0)))), s.css("height", o || ""), a.css("overflow", "auto")), s.removeClass("fancybox-is-hidden")
                        }
                    })) : s.afterLoad(e), t.attr("src", e.src), a.one("onReset", function() {
                        try {
                            i(this).find("iframe").hide().unbind().attr("src", "//about:blank")
                        } catch (e) {}
                        i(this).off("refresh.fb").empty(), e.isLoaded = !1, e.isRevealed = !1
                    })
                },
                setContent: function(e, t) {
                    var s = this;
                    s.isClosing || (s.hideLoading(e), e.$content && i.fancybox.stop(e.$content), e.$slide.empty(), function(e) {
                        return e && e.hasOwnProperty && e instanceof i
                    }(t) && t.parent().length ? ((t.hasClass("fancybox-content") || t.parent().hasClass("fancybox-content")) && t.parents(".fancybox-slide").trigger("onReset"), e.$placeholder = i("<div>").hide().insertAfter(t), t.css("display", "inline-block")) : e.hasError || ("string" === i.type(t) && (t = i("<div>").append(i.trim(t)).contents()), e.opts.filter && (t = i("<div>").html(t).find(e.opts.filter))), e.$slide.one("onReset", function() {
                        i(this).find("video,audio").trigger("pause"), e.$placeholder && (e.$placeholder.after(t.removeClass("fancybox-content").hide()).remove(), e.$placeholder = null), e.$smallBtn && (e.$smallBtn.remove(), e.$smallBtn = null), e.hasError || (i(this).empty(), e.isLoaded = !1, e.isRevealed = !1)
                    }), i(t).appendTo(e.$slide), i(t).is("video,audio") && (i(t).addClass("fancybox-video"), i(t).wrap("<div></div>"), e.contentType = "video", e.opts.width = e.opts.width || i(t).attr("width"), e.opts.height = e.opts.height || i(t).attr("height")), e.$content = e.$slide.children().filter("div,form,main,video,audio,article,.fancybox-content").first(), e.$content.siblings().hide(), e.$content.length || (e.$content = e.$slide.wrapInner("<div></div>").children().first()), e.$content.addClass("fancybox-content"), e.$slide.addClass("fancybox-slide--" + e.contentType), s.afterLoad(e))
                },
                setError: function(e) {
                    e.hasError = !0, e.$slide.trigger("onReset").removeClass("fancybox-slide--" + e.contentType).addClass("fancybox-slide--error"), e.contentType = "html", this.setContent(e, this.translate(e, e.opts.errorTpl)), e.pos === this.currPos && (this.isAnimating = !1)
                },
                showLoading: function(e) {
                    var t = this;
                    (e = e || t.current) && !e.$spinner && (e.$spinner = i(t.translate(t, t.opts.spinnerTpl)).appendTo(e.$slide).hide().fadeIn("fast"))
                },
                hideLoading: function(e) {
                    (e = e || this.current) && e.$spinner && (e.$spinner.stop().remove(), delete e.$spinner)
                },
                afterLoad: function(e) {
                    var t = this;
                    t.isClosing || (e.isLoading = !1, e.isLoaded = !0, t.trigger("afterLoad", e), t.hideLoading(e), !e.opts.smallBtn || e.$smallBtn && e.$smallBtn.length || (e.$smallBtn = i(t.translate(e, e.opts.btnTpl.smallBtn)).appendTo(e.$content)), e.opts.protect && e.$content && !e.hasError && (e.$content.on("contextmenu.fb", function(e) {
                        return 2 == e.button && e.preventDefault(), !0
                    }), "image" === e.type && i('<div class="fancybox-spaceball"></div>').appendTo(e.$content)), t.adjustCaption(e), t.adjustLayout(e), e.pos === t.currPos && t.updateCursor(), t.revealContent(e))
                },
                adjustCaption: function(e) {
                    var t, i = this,
                        s = e || i.current,
                        n = s.opts.caption,
                        a = s.opts.preventCaptionOverlap,
                        r = i.$refs.caption,
                        o = !1;
                    r.toggleClass("fancybox-caption--separate", a), a && n && n.length && (s.pos !== i.currPos ? ((t = r.clone().appendTo(r.parent())).children().eq(0).empty().html(n), o = t.outerHeight(!0), t.empty().remove()) : i.$caption && (o = i.$caption.outerHeight(!0)), s.$slide.css("padding-bottom", o || ""))
                },
                adjustLayout: function(e) {
                    var t, i, s, n, a = e || this.current;
                    a.isLoaded && !0 !== a.opts.disableLayoutFix && (a.$content.css("margin-bottom", ""), a.$content.outerHeight() > a.$slide.height() + .5 && (s = a.$slide[0].style["padding-bottom"], n = a.$slide.css("padding-bottom"), parseFloat(n) > 0 && (t = a.$slide[0].scrollHeight, a.$slide.css("padding-bottom", 0), Math.abs(t - a.$slide[0].scrollHeight) < 1 && (i = n), a.$slide.css("padding-bottom", s))), a.$content.css("margin-bottom", i))
                },
                revealContent: function(e) {
                    var t, s, n, a, r = this,
                        o = e.$slide,
                        l = !1,
                        c = !1,
                        d = r.isMoved(e),
                        h = e.isRevealed;
                    return e.isRevealed = !0, t = e.opts[r.firstRun ? "animationEffect" : "transitionEffect"], n = e.opts[r.firstRun ? "animationDuration" : "transitionDuration"], n = parseInt(void 0 === e.forcedDuration ? n : e.forcedDuration, 10), !d && e.pos === r.currPos && n || (t = !1), "zoom" === t && (e.pos === r.currPos && n && "image" === e.type && !e.hasError && (c = r.getThumbPos(e)) ? l = r.getFitPos(e) : t = "fade"), "zoom" === t ? (r.isAnimating = !0, l.scaleX = l.width / c.width, l.scaleY = l.height / c.height, "auto" == (a = e.opts.zoomOpacity) && (a = Math.abs(e.width / e.height - c.width / c.height) > .1), a && (c.opacity = .1, l.opacity = 1), i.fancybox.setTranslate(e.$content.removeClass("fancybox-is-hidden"), c), u(e.$content), void i.fancybox.animate(e.$content, l, n, function() {
                        r.isAnimating = !1, r.complete()
                    })) : (r.updateSlide(e), t ? (i.fancybox.stop(o), s = "fancybox-slide--" + (e.pos >= r.prevPos ? "next" : "previous") + " fancybox-animated fancybox-fx-" + t, o.addClass(s).removeClass("fancybox-slide--current"), e.$content.removeClass("fancybox-is-hidden"), u(o), "image" !== e.type && e.$content.hide().show(0), void i.fancybox.animate(o, "fancybox-slide--current", n, function() {
                        o.removeClass(s).css({
                            transform: "",
                            opacity: ""
                        }), e.pos === r.currPos && r.complete()
                    }, !0)) : (e.$content.removeClass("fancybox-is-hidden"), h || !d || "image" !== e.type || e.hasError || e.$content.hide().fadeIn("fast"), void(e.pos === r.currPos && r.complete())))
                },
                getThumbPos: function(e) {
                    var t, s, n, a, r, o = !1,
                        l = e.$thumb;
                    return !(!l || !f(l[0])) && (t = i.fancybox.getTranslate(l), s = parseFloat(l.css("border-top-width") || 0), n = parseFloat(l.css("border-right-width") || 0), a = parseFloat(l.css("border-bottom-width") || 0), r = parseFloat(l.css("border-left-width") || 0), o = {
                        top: t.top + s,
                        left: t.left + r,
                        width: t.width - n - r,
                        height: t.height - s - a,
                        scaleX: 1,
                        scaleY: 1
                    }, t.width > 0 && t.height > 0 && o)
                },
                complete: function() {
                    var e, t = this,
                        s = t.current,
                        n = {};
                    !t.isMoved() && s.isLoaded && (s.isComplete || (s.isComplete = !0, s.$slide.siblings().trigger("onReset"), t.preload("inline"), u(s.$slide), s.$slide.addClass("fancybox-slide--complete"), i.each(t.slides, function(e, s) {
                        s.pos >= t.currPos - 1 && s.pos <= t.currPos + 1 ? n[s.pos] = s : s && (i.fancybox.stop(s.$slide), s.$slide.off().remove())
                    }), t.slides = n), t.isAnimating = !1, t.updateCursor(), t.trigger("afterShow"), s.opts.video.autoStart && s.$slide.find("video,audio").filter(":visible:first").trigger("play").one("ended", function() {
                        Document.exitFullscreen ? Document.exitFullscreen() : this.webkitExitFullscreen && this.webkitExitFullscreen(), t.next()
                    }), s.opts.autoFocus && "html" === s.contentType && ((e = s.$content.find("input[autofocus]:enabled:visible:first")).length ? e.trigger("focus") : t.focus(null, !0)), s.$slide.scrollTop(0).scrollLeft(0))
                },
                preload: function(e) {
                    var t, i, s = this;
                    s.group.length < 2 || (i = s.slides[s.currPos + 1], (t = s.slides[s.currPos - 1]) && t.type === e && s.loadSlide(t), i && i.type === e && s.loadSlide(i))
                },
                focus: function(e, s) {
                    var n, a, r = this,
                        o = ["a[href]", "area[href]", 'input:not([disabled]):not([type="hidden"]):not([aria-hidden])', "select:not([disabled]):not([aria-hidden])", "textarea:not([disabled]):not([aria-hidden])", "button:not([disabled]):not([aria-hidden])", "iframe", "object", "embed", "video", "audio", "[contenteditable]", '[tabindex]:not([tabindex^="-"])'].join(",");
                    r.isClosing || ((n = (n = !e && r.current && r.current.isComplete ? r.current.$slide.find("*:visible" + (s ? ":not(.fancybox-close-small)" : "")) : r.$refs.container.find("*:visible")).filter(o).filter(function() {
                        return "hidden" !== i(this).css("visibility") && !i(this).hasClass("disabled")
                    })).length ? (a = n.index(t.activeElement), e && e.shiftKey ? (a < 0 || 0 == a) && (e.preventDefault(), n.eq(n.length - 1).trigger("focus")) : (a < 0 || a == n.length - 1) && (e && e.preventDefault(), n.eq(0).trigger("focus"))) : r.$refs.container.trigger("focus"))
                },
                activate: function() {
                    var e = this;
                    i(".fancybox-container").each(function() {
                        var t = i(this).data("FancyBox");
                        t && t.id !== e.id && !t.isClosing && (t.trigger("onDeactivate"), t.removeEvents(), t.isVisible = !1)
                    }), e.isVisible = !0, (e.current || e.isIdle) && (e.update(), e.updateControls()), e.trigger("onActivate"), e.addEvents()
                },
                close: function(e, t) {
                    var s, n, a, r, o, l, d, h = this,
                        p = h.current,
                        f = function() {
                            h.cleanUp(e)
                        };
                    return !(h.isClosing || (h.isClosing = !0, !1 === h.trigger("beforeClose", e) ? (h.isClosing = !1, c(function() {
                        h.update()
                    }), 1) : (h.removeEvents(), a = p.$content, s = p.opts.animationEffect, n = i.isNumeric(t) ? t : s ? p.opts.animationDuration : 0, p.$slide.removeClass("fancybox-slide--complete fancybox-slide--next fancybox-slide--previous fancybox-animated"), !0 !== e ? i.fancybox.stop(p.$slide) : s = !1, p.$slide.siblings().trigger("onReset").remove(), n && h.$refs.container.removeClass("fancybox-is-open").addClass("fancybox-is-closing").css("transition-duration", n + "ms"), h.hideLoading(p), h.hideControls(!0), h.updateCursor(), "zoom" !== s || a && n && "image" === p.type && !h.isMoved() && !p.hasError && (d = h.getThumbPos(p)) || (s = "fade"), "zoom" === s ? (i.fancybox.stop(a), r = i.fancybox.getTranslate(a), l = {
                        top: r.top,
                        left: r.left,
                        scaleX: r.width / d.width,
                        scaleY: r.height / d.height,
                        width: d.width,
                        height: d.height
                    }, o = p.opts.zoomOpacity, "auto" == o && (o = Math.abs(p.width / p.height - d.width / d.height) > .1), o && (d.opacity = 0), i.fancybox.setTranslate(a, l), u(a), i.fancybox.animate(a, d, n, f), 0) : (s && n ? i.fancybox.animate(p.$slide.addClass("fancybox-slide--previous").removeClass("fancybox-slide--current"), "fancybox-animated fancybox-fx-" + s, n, f) : !0 === e ? setTimeout(f, n) : f(), 0))))
                },
                cleanUp: function(t) {
                    var s, n, a, r = this,
                        o = r.current.opts.$orig;
                    r.current.$slide.trigger("onReset"), r.$refs.container.empty().remove(), r.trigger("afterClose", t), r.current.opts.backFocus && (o && o.length && o.is(":visible") || (o = r.$trigger), o && o.length && (n = e.scrollX, a = e.scrollY, o.trigger("focus"), i("html, body").scrollTop(a).scrollLeft(n))), r.current = null, (s = i.fancybox.getInstance()) ? s.activate() : (i("body").removeClass("fancybox-active compensate-for-scrollbar"), i("#fancybox-style-noscroll").remove())
                },
                trigger: function(e, t) {
                    var s, n = Array.prototype.slice.call(arguments, 1),
                        a = this,
                        r = t && t.opts ? t : a.current;
                    if (r ? n.unshift(r) : r = a, n.unshift(a), i.isFunction(r.opts[e]) && (s = r.opts[e].apply(r, n)), !1 === s) return s;
                    "afterClose" !== e && a.$refs ? a.$refs.container.trigger(e + ".fb", n) : o.trigger(e + ".fb", n)
                },
                updateControls: function() {
                    var e = this,
                        s = e.current,
                        n = s.index,
                        a = e.$refs.container,
                        r = e.$refs.caption,
                        o = s.opts.caption;
                    s.$slide.trigger("refresh"), o && o.length ? (e.$caption = r, r.children().eq(0).html(o)) : e.$caption = null, e.hasHiddenControls || e.isIdle || e.showControls(), a.find("[data-fancybox-count]").html(e.group.length), a.find("[data-fancybox-index]").html(n + 1), a.find("[data-fancybox-prev]").prop("disabled", !s.opts.loop && n <= 0), a.find("[data-fancybox-next]").prop("disabled", !s.opts.loop && n >= e.group.length - 1), "image" === s.type ? a.find("[data-fancybox-zoom]").show().end().find("[data-fancybox-download]").attr("href", s.opts.image.src || s.src).show() : s.opts.toolbar && a.find("[data-fancybox-download],[data-fancybox-zoom]").hide(), i(t.activeElement).is(":hidden,[disabled]") && e.$refs.container.trigger("focus")
                },
                hideControls: function(e) {
                    var t = ["infobar", "toolbar", "nav"];
                    !e && this.current.opts.preventCaptionOverlap || t.push("caption"), this.$refs.container.removeClass(t.map(function(e) {
                        return "fancybox-show-" + e
                    }).join(" ")), this.hasHiddenControls = !0
                },
                showControls: function() {
                    var e = this,
                        t = e.current ? e.current.opts : e.opts,
                        i = e.$refs.container;
                    e.hasHiddenControls = !1, e.idleSecondsCounter = 0, i.toggleClass("fancybox-show-toolbar", !(!t.toolbar || !t.buttons)).toggleClass("fancybox-show-infobar", !!(t.infobar && e.group.length > 1)).toggleClass("fancybox-show-caption", !!e.$caption).toggleClass("fancybox-show-nav", !!(t.arrows && e.group.length > 1)).toggleClass("fancybox-is-modal", !!t.modal)
                },
                toggleControls: function() {
                    this.hasHiddenControls ? this.showControls() : this.hideControls()
                }
            }), i.fancybox = {
                version: "3.5.7",
                defaults: a,
                getInstance: function(e) {
                    var t = i('.fancybox-container:not(".fancybox-is-closing"):last').data("FancyBox"),
                        s = Array.prototype.slice.call(arguments, 1);
                    return t instanceof m && ("string" === i.type(e) ? t[e].apply(t, s) : "function" === i.type(e) && e.apply(t, s), t)
                },
                open: function(e, t, i) {
                    return new m(e, t, i)
                },
                close: function(e) {
                    var t = this.getInstance();
                    t && (t.close(), !0 === e && this.close(e))
                },
                destroy: function() {
                    this.close(!0), o.add("body").off("click.fb-start", "**")
                },
                isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
                use3d: function() {
                    var i = t.createElement("div");
                    return e.getComputedStyle && e.getComputedStyle(i) && e.getComputedStyle(i).getPropertyValue("transform") && !(t.documentMode && t.documentMode < 11)
                }(),
                getTranslate: function(e) {
                    var t;
                    return !(!e || !e.length) && {
                        top: (t = e[0].getBoundingClientRect()).top || 0,
                        left: t.left || 0,
                        width: t.width,
                        height: t.height,
                        opacity: parseFloat(e.css("opacity"))
                    }
                },
                setTranslate: function(e, t) {
                    var i = "",
                        s = {};
                    if (e && t) return void 0 === t.left && void 0 === t.top || (i = (void 0 === t.left ? e.position().left : t.left) + "px, " + (void 0 === t.top ? e.position().top : t.top) + "px", i = this.use3d ? "translate3d(" + i + ", 0px)" : "translate(" + i + ")"), void 0 !== t.scaleX && void 0 !== t.scaleY ? i += " scale(" + t.scaleX + ", " + t.scaleY + ")" : void 0 !== t.scaleX && (i += " scaleX(" + t.scaleX + ")"), i.length && (s.transform = i), void 0 !== t.opacity && (s.opacity = t.opacity), void 0 !== t.width && (s.width = t.width), void 0 !== t.height && (s.height = t.height), e.css(s)
                },
                animate: function(e, t, s, n, a) {
                    var r, o = this;
                    i.isFunction(s) && (n = s, s = null), o.stop(e), r = o.getTranslate(e), e.on(h, function(l) {
                        (!l || !l.originalEvent || e.is(l.originalEvent.target) && "z-index" != l.originalEvent.propertyName) && (o.stop(e), i.isNumeric(s) && e.css("transition-duration", ""), i.isPlainObject(t) ? void 0 !== t.scaleX && void 0 !== t.scaleY && o.setTranslate(e, {
                            top: t.top,
                            left: t.left,
                            width: r.width * t.scaleX,
                            height: r.height * t.scaleY,
                            scaleX: 1,
                            scaleY: 1
                        }) : !0 !== a && e.removeClass(t), i.isFunction(n) && n(l))
                    }), i.isNumeric(s) && e.css("transition-duration", s + "ms"), i.isPlainObject(t) ? (void 0 !== t.scaleX && void 0 !== t.scaleY && (delete t.width, delete t.height, e.parent().hasClass("fancybox-slide--image") && e.parent().addClass("fancybox-is-scaling")), i.fancybox.setTranslate(e, t)) : e.addClass(t), e.data("timer", setTimeout(function() {
                        e.trigger(h)
                    }, s + 33))
                },
                stop: function(e, t) {
                    e && e.length && (clearTimeout(e.data("timer")), t && e.trigger(h), e.off(h).css("transition-duration", ""), e.parent().removeClass("fancybox-is-scaling"))
                }
            }, i.fn.fancybox = function(e) {
                var t;
                return (t = (e = e || {}).selector || !1) ? i("body").off("click.fb-start", t).on("click.fb-start", t, {
                    options: e
                }, n) : this.off("click.fb-start").on("click.fb-start", {
                    items: this,
                    options: e
                }, n), this
            }, o.on("click.fb-start", "[data-fancybox]", n), o.on("click.fb-start", "[data-fancybox-trigger]", function(e) {
                i('[data-fancybox="' + i(this).attr("data-fancybox-trigger") + '"]').eq(i(this).attr("data-fancybox-index") || 0).trigger("click.fb-start", {
                    $trigger: i(this)
                })
            }),
            function() {
                var e = null;
                o.on("mousedown mouseup focus blur", ".fancybox-button", function(t) {
                    switch (t.type) {
                        case "mousedown":
                            e = i(this);
                            break;
                        case "mouseup":
                            e = null;
                            break;
                        case "focusin":
                            i(".fancybox-button").removeClass("fancybox-focus"), i(this).is(e) || i(this).is("[disabled]") || i(this).addClass("fancybox-focus");
                            break;
                        case "focusout":
                            i(".fancybox-button").removeClass("fancybox-focus")
                    }
                })
            }()
    }
}(window, document, jQuery),
function(e) {
    "use strict";
    var t = {
            youtube: {
                matcher: /(youtube\.com|youtu\.be|youtube\-nocookie\.com)\/(watch\?(.*&)?v=|v\/|u\/|embed\/?)?(videoseries\?list=(.*)|[\w-]{11}|\?listType=(.*)&list=(.*))(.*)/i,
                params: {
                    autoplay: 1,
                    autohide: 1,
                    fs: 1,
                    rel: 0,
                    hd: 1,
                    wmode: "transparent",
                    enablejsapi: 1,
                    html5: 1
                },
                paramPlace: 8,
                type: "iframe",
                url: "https://www.youtube-nocookie.com/embed/$4",
                thumb: "https://img.youtube.com/vi/$4/hqdefault.jpg"
            },
            vimeo: {
                matcher: /^.+vimeo.com\/(.*\/)?([\d]+)(.*)?/,
                params: {
                    autoplay: 1,
                    hd: 1,
                    show_title: 1,
                    show_byline: 1,
                    show_portrait: 0,
                    fullscreen: 1
                },
                paramPlace: 3,
                type: "iframe",
                url: "//player.vimeo.com/video/$2"
            },
            instagram: {
                matcher: /(instagr\.am|instagram\.com)\/p\/([a-zA-Z0-9_\-]+)\/?/i,
                type: "image",
                url: "//$1/p/$2/media/?size=l"
            },
            gmap_place: {
                matcher: /(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(((maps\/(place\/(.*)\/)?\@(.*),(\d+.?\d+?)z))|(\?ll=))(.*)?/i,
                type: "iframe",
                url: function(e) {
                    return "//maps.google." + e[2] + "/?ll=" + (e[9] ? e[9] + "&z=" + Math.floor(e[10]) + (e[12] ? e[12].replace(/^\//, "&") : "") : e[12] + "").replace(/\?/, "&") + "&output=" + (e[12] && e[12].indexOf("layer=c") > 0 ? "svembed" : "embed")
                }
            },
            gmap_search: {
                matcher: /(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(maps\/search\/)(.*)/i,
                type: "iframe",
                url: function(e) {
                    return "//maps.google." + e[2] + "/maps?q=" + e[5].replace("query=", "q=").replace("api=1", "") + "&output=embed"
                }
            }
        },
        i = function(t, i, s) {
            if (t) return s = s || "", "object" === e.type(s) && (s = e.param(s, !0)), e.each(i, function(e, i) {
                t = t.replace("$" + e, i || "")
            }), s.length && (t += (t.indexOf("?") > 0 ? "&" : "?") + s), t
        };
    e(document).on("objectNeedsType.fb", function(s, n, a) {
        var r, o, l, c, d, h, u, p = a.src || "",
            f = !1;
        r = e.extend(!0, {}, t, a.opts.media), e.each(r, function(t, s) {
            if (l = p.match(s.matcher)) {
                if (f = s.type, u = t, h = {}, s.paramPlace && l[s.paramPlace]) {
                    "?" == (d = l[s.paramPlace])[0] && (d = d.substring(1)), d = d.split("&");
                    for (var n = 0; n < d.length; ++n) {
                        var r = d[n].split("=", 2);
                        2 == r.length && (h[r[0]] = decodeURIComponent(r[1].replace(/\+/g, " ")))
                    }
                }
                return c = e.extend(!0, {}, s.params, a.opts[t], h), p = "function" === e.type(s.url) ? s.url.call(this, l, c, a) : i(s.url, l, c), o = "function" === e.type(s.thumb) ? s.thumb.call(this, l, c, a) : i(s.thumb, l), "youtube" === t ? p = p.replace(/&t=((\d+)m)?(\d+)s/, function(e, t, i, s) {
                    return "&start=" + ((i ? 60 * parseInt(i, 10) : 0) + parseInt(s, 10))
                }) : "vimeo" === t && (p = p.replace("&%23", "#")), !1
            }
        }), f ? (a.opts.thumb || a.opts.$thumb && a.opts.$thumb.length || (a.opts.thumb = o), "iframe" === f && (a.opts = e.extend(!0, a.opts, {
            iframe: {
                preload: !1,
                attr: {
                    scrolling: "no"
                }
            }
        })), e.extend(a, {
            type: f,
            src: p,
            origSrc: a.src,
            contentSource: u,
            contentType: "image" === f ? "image" : "gmap_place" == u || "gmap_search" == u ? "map" : "video"
        })) : p && (a.type = a.opts.defaultType)
    });
    var s = {
        youtube: {
            src: "https://www.youtube.com/iframe_api",
            class: "YT",
            loading: !1,
            loaded: !1
        },
        vimeo: {
            src: "https://player.vimeo.com/api/player.js",
            class: "Vimeo",
            loading: !1,
            loaded: !1
        },
        load: function(e) {
            var t, i = this;
            this[e].loaded ? setTimeout(function() {
                i.done(e)
            }) : this[e].loading || (this[e].loading = !0, (t = document.createElement("script")).type = "text/javascript", t.src = this[e].src, "youtube" === e ? window.onYouTubeIframeAPIReady = function() {
                i[e].loaded = !0, i.done(e)
            } : t.onload = function() {
                i[e].loaded = !0, i.done(e)
            }, document.body.appendChild(t))
        },
        done: function(t) {
            var i, s;
            "youtube" === t && delete window.onYouTubeIframeAPIReady, (i = e.fancybox.getInstance()) && (s = i.current.$content.find("iframe"), "youtube" === t && void 0 !== YT && YT ? new YT.Player(s.attr("id"), {
                events: {
                    onStateChange: function(e) {
                        0 == e.data && i.next()
                    }
                }
            }) : "vimeo" === t && void 0 !== Vimeo && Vimeo && new Vimeo.Player(s).on("ended", function() {
                i.next()
            }))
        }
    };
    e(document).on({
        "afterShow.fb": function(e, t, i) {
            t.group.length > 1 && ("youtube" === i.contentSource || "vimeo" === i.contentSource) && s.load(i.contentSource)
        }
    })
}(jQuery),
function(e, t, i) {
    "use strict";
    var s = e.requestAnimationFrame || e.webkitRequestAnimationFrame || e.mozRequestAnimationFrame || e.oRequestAnimationFrame || function(t) {
            return e.setTimeout(t, 1e3 / 60)
        },
        n = e.cancelAnimationFrame || e.webkitCancelAnimationFrame || e.mozCancelAnimationFrame || e.oCancelAnimationFrame || function(t) {
            e.clearTimeout(t)
        },
        a = function(t) {
            var i = [];
            for (var s in t = (t = t.originalEvent || t || e.e).touches && t.touches.length ? t.touches : t.changedTouches && t.changedTouches.length ? t.changedTouches : [t]) t[s].pageX ? i.push({
                x: t[s].pageX,
                y: t[s].pageY
            }) : t[s].clientX && i.push({
                x: t[s].clientX,
                y: t[s].clientY
            });
            return i
        },
        r = function(e, t, i) {
            return t && e ? "x" === i ? e.x - t.x : "y" === i ? e.y - t.y : Math.sqrt(Math.pow(e.x - t.x, 2) + Math.pow(e.y - t.y, 2)) : 0
        },
        o = function(e) {
            if (e.is('a,area,button,[role="button"],input,label,select,summary,textarea,video,audio,iframe') || i.isFunction(e.get(0).onclick) || e.data("selectable")) return !0;
            for (var t = 0, s = e[0].attributes, n = s.length; t < n; t++)
                if ("data-fancybox-" === s[t].nodeName.substr(0, 14)) return !0;
            return !1
        },
        l = function(t) {
            var i = e.getComputedStyle(t)["overflow-y"],
                s = e.getComputedStyle(t)["overflow-x"],
                n = ("scroll" === i || "auto" === i) && t.scrollHeight > t.clientHeight,
                a = ("scroll" === s || "auto" === s) && t.scrollWidth > t.clientWidth;
            return n || a
        },
        c = function(e) {
            for (var t = !1; !(t = l(e.get(0))) && ((e = e.parent()).length && !e.hasClass("fancybox-stage") && !e.is("body")););
            return t
        },
        d = function(e) {
            var t = this;
            t.instance = e, t.$bg = e.$refs.bg, t.$stage = e.$refs.stage, t.$container = e.$refs.container, t.destroy(), t.$container.on("touchstart.fb.touch mousedown.fb.touch", i.proxy(t, "ontouchstart"))
        };
    d.prototype.destroy = function() {
        var e = this;
        e.$container.off(".fb.touch"), i(t).off(".fb.touch"), e.requestId && (n(e.requestId), e.requestId = null), e.tapped && (clearTimeout(e.tapped), e.tapped = null)
    }, d.prototype.ontouchstart = function(s) {
        var n = this,
            l = i(s.target),
            d = n.instance,
            h = d.current,
            u = h.$slide,
            p = h.$content,
            f = "touchstart" == s.type;
        if (f && n.$container.off("mousedown.fb.touch"), (!s.originalEvent || 2 != s.originalEvent.button) && u.length && l.length && !o(l) && !o(l.parent()) && (l.is("img") || !(s.originalEvent.clientX > l[0].clientWidth + l.offset().left))) {
            if (!h || d.isAnimating || h.$slide.hasClass("fancybox-animated")) return s.stopPropagation(), void s.preventDefault();
            n.realPoints = n.startPoints = a(s), n.startPoints.length && (h.touch && s.stopPropagation(), n.startEvent = s, n.canTap = !0, n.$target = l, n.$content = p, n.opts = h.opts.touch, n.isPanning = !1, n.isSwiping = !1, n.isZooming = !1, n.isScrolling = !1, n.canPan = d.canPan(), n.startTime = (new Date).getTime(), n.distanceX = n.distanceY = n.distance = 0, n.canvasWidth = Math.round(u[0].clientWidth), n.canvasHeight = Math.round(u[0].clientHeight), n.contentLastPos = null, n.contentStartPos = i.fancybox.getTranslate(n.$content) || {
                top: 0,
                left: 0
            }, n.sliderStartPos = i.fancybox.getTranslate(u), n.stagePos = i.fancybox.getTranslate(d.$refs.stage), n.sliderStartPos.top -= n.stagePos.top, n.sliderStartPos.left -= n.stagePos.left, n.contentStartPos.top -= n.stagePos.top, n.contentStartPos.left -= n.stagePos.left, i(t).off(".fb.touch").on(f ? "touchend.fb.touch touchcancel.fb.touch" : "mouseup.fb.touch mouseleave.fb.touch", i.proxy(n, "ontouchend")).on(f ? "touchmove.fb.touch" : "mousemove.fb.touch", i.proxy(n, "ontouchmove")), i.fancybox.isMobile && t.addEventListener("scroll", n.onscroll, !0), ((n.opts || n.canPan) && (l.is(n.$stage) || n.$stage.find(l).length) || (l.is(".fancybox-image") && s.preventDefault(), i.fancybox.isMobile && l.parents(".fancybox-caption").length)) && (n.isScrollable = c(l) || c(l.parent()), i.fancybox.isMobile && n.isScrollable || s.preventDefault(), (1 === n.startPoints.length || h.hasError) && (n.canPan ? (i.fancybox.stop(n.$content), n.isPanning = !0) : n.isSwiping = !0, n.$container.addClass("fancybox-is-grabbing")), 2 === n.startPoints.length && "image" === h.type && (h.isLoaded || h.$ghost) && (n.canTap = !1, n.isSwiping = !1, n.isPanning = !1, n.isZooming = !0, i.fancybox.stop(n.$content), n.centerPointStartX = .5 * (n.startPoints[0].x + n.startPoints[1].x) - i(e).scrollLeft(), n.centerPointStartY = .5 * (n.startPoints[0].y + n.startPoints[1].y) - i(e).scrollTop(), n.percentageOfImageAtPinchPointX = (n.centerPointStartX - n.contentStartPos.left) / n.contentStartPos.width, n.percentageOfImageAtPinchPointY = (n.centerPointStartY - n.contentStartPos.top) / n.contentStartPos.height, n.startDistanceBetweenFingers = r(n.startPoints[0], n.startPoints[1]))))
        }
    }, d.prototype.onscroll = function(e) {
        this.isScrolling = !0, t.removeEventListener("scroll", this.onscroll, !0)
    }, d.prototype.ontouchmove = function(e) {
        var t = this;
        return void 0 !== e.originalEvent.buttons && 0 === e.originalEvent.buttons ? void t.ontouchend(e) : t.isScrolling ? void(t.canTap = !1) : (t.newPoints = a(e), void((t.opts || t.canPan) && t.newPoints.length && t.newPoints.length && (t.isSwiping && !0 === t.isSwiping || e.preventDefault(), t.distanceX = r(t.newPoints[0], t.startPoints[0], "x"), t.distanceY = r(t.newPoints[0], t.startPoints[0], "y"), t.distance = r(t.newPoints[0], t.startPoints[0]), t.distance > 0 && (t.isSwiping ? t.onSwipe(e) : t.isPanning ? t.onPan() : t.isZooming && t.onZoom()))))
    }, d.prototype.onSwipe = function(t) {
        var a, r = this,
            o = r.instance,
            l = r.isSwiping,
            c = r.sliderStartPos.left || 0;
        if (!0 !== l) "x" == l && (r.distanceX > 0 && (r.instance.group.length < 2 || 0 === r.instance.current.index && !r.instance.current.opts.loop) ? c += Math.pow(r.distanceX, .8) : r.distanceX < 0 && (r.instance.group.length < 2 || r.instance.current.index === r.instance.group.length - 1 && !r.instance.current.opts.loop) ? c -= Math.pow(-r.distanceX, .8) : c += r.distanceX), r.sliderLastPos = {
            top: "x" == l ? 0 : r.sliderStartPos.top + r.distanceY,
            left: c
        }, r.requestId && (n(r.requestId), r.requestId = null), r.requestId = s(function() {
            r.sliderLastPos && (i.each(r.instance.slides, function(e, t) {
                var s = t.pos - r.instance.currPos;
                i.fancybox.setTranslate(t.$slide, {
                    top: r.sliderLastPos.top,
                    left: r.sliderLastPos.left + s * r.canvasWidth + s * t.opts.gutter
                })
            }), r.$container.addClass("fancybox-is-sliding"))
        });
        else if (Math.abs(r.distance) > 10) {
            if (r.canTap = !1, o.group.length < 2 && r.opts.vertical ? r.isSwiping = "y" : o.isDragging || !1 === r.opts.vertical || "auto" === r.opts.vertical && i(e).width() > 800 ? r.isSwiping = "x" : (a = Math.abs(180 * Math.atan2(r.distanceY, r.distanceX) / Math.PI), r.isSwiping = a > 45 && a < 135 ? "y" : "x"), "y" === r.isSwiping && i.fancybox.isMobile && r.isScrollable) return void(r.isScrolling = !0);
            o.isDragging = r.isSwiping, r.startPoints = r.newPoints, i.each(o.slides, function(e, t) {
                var s, n;
                i.fancybox.stop(t.$slide), s = i.fancybox.getTranslate(t.$slide), n = i.fancybox.getTranslate(o.$refs.stage), t.$slide.css({
                    transform: "",
                    opacity: "",
                    "transition-duration": ""
                }).removeClass("fancybox-animated").removeClass(function(e, t) {
                    return (t.match(/(^|\s)fancybox-fx-\S+/g) || []).join(" ")
                }), t.pos === o.current.pos && (r.sliderStartPos.top = s.top - n.top, r.sliderStartPos.left = s.left - n.left), i.fancybox.setTranslate(t.$slide, {
                    top: s.top - n.top,
                    left: s.left - n.left
                })
            }), o.SlideShow && o.SlideShow.isActive && o.SlideShow.stop()
        }
    }, d.prototype.onPan = function() {
        var e = this;
        r(e.newPoints[0], e.realPoints[0]) < (i.fancybox.isMobile ? 10 : 5) ? e.startPoints = e.newPoints : (e.canTap = !1, e.contentLastPos = e.limitMovement(), e.requestId && n(e.requestId), e.requestId = s(function() {
            i.fancybox.setTranslate(e.$content, e.contentLastPos)
        }))
    }, d.prototype.limitMovement = function() {
        var e, t, i, s, n, a, r = this,
            o = r.canvasWidth,
            l = r.canvasHeight,
            c = r.distanceX,
            d = r.distanceY,
            h = r.contentStartPos,
            u = h.left,
            p = h.top,
            f = h.width,
            m = h.height;
        return n = f > o ? u + c : u, a = p + d, e = Math.max(0, .5 * o - .5 * f), t = Math.max(0, .5 * l - .5 * m), i = Math.min(o - f, .5 * o - .5 * f), s = Math.min(l - m, .5 * l - .5 * m), c > 0 && n > e && (n = e - 1 + Math.pow(-e + u + c, .8) || 0), c < 0 && n < i && (n = i + 1 - Math.pow(i - u - c, .8) || 0), d > 0 && a > t && (a = t - 1 + Math.pow(-t + p + d, .8) || 0), d < 0 && a < s && (a = s + 1 - Math.pow(s - p - d, .8) || 0), {
            top: a,
            left: n
        }
    }, d.prototype.limitPosition = function(e, t, i, s) {
        var n = this.canvasWidth,
            a = this.canvasHeight;
        return i > n ? e = (e = e > 0 ? 0 : e) < n - i ? n - i : e : e = Math.max(0, n / 2 - i / 2), s > a ? t = (t = t > 0 ? 0 : t) < a - s ? a - s : t : t = Math.max(0, a / 2 - s / 2), {
            top: t,
            left: e
        }
    }, d.prototype.onZoom = function() {
        var t = this,
            a = t.contentStartPos,
            o = a.width,
            l = a.height,
            c = a.left,
            d = a.top,
            h = r(t.newPoints[0], t.newPoints[1]) / t.startDistanceBetweenFingers,
            u = Math.floor(o * h),
            p = Math.floor(l * h),
            f = (o - u) * t.percentageOfImageAtPinchPointX,
            m = (l - p) * t.percentageOfImageAtPinchPointY,
            v = (t.newPoints[0].x + t.newPoints[1].x) / 2 - i(e).scrollLeft(),
            g = (t.newPoints[0].y + t.newPoints[1].y) / 2 - i(e).scrollTop(),
            b = v - t.centerPointStartX,
            y = {
                top: d + (m + (g - t.centerPointStartY)),
                left: c + (f + b),
                scaleX: h,
                scaleY: h
            };
        t.canTap = !1, t.newWidth = u, t.newHeight = p, t.contentLastPos = y, t.requestId && n(t.requestId), t.requestId = s(function() {
            i.fancybox.setTranslate(t.$content, t.contentLastPos)
        })
    }, d.prototype.ontouchend = function(e) {
        var s = this,
            r = s.isSwiping,
            o = s.isPanning,
            l = s.isZooming,
            c = s.isScrolling;
        if (s.endPoints = a(e), s.dMs = Math.max((new Date).getTime() - s.startTime, 1), s.$container.removeClass("fancybox-is-grabbing"), i(t).off(".fb.touch"), t.removeEventListener("scroll", s.onscroll, !0), s.requestId && (n(s.requestId), s.requestId = null), s.isSwiping = !1, s.isPanning = !1, s.isZooming = !1, s.isScrolling = !1, s.instance.isDragging = !1, s.canTap) return s.onTap(e);
        s.speed = 100, s.velocityX = s.distanceX / s.dMs * .5, s.velocityY = s.distanceY / s.dMs * .5, o ? s.endPanning() : l ? s.endZooming() : s.endSwiping(r, c)
    }, d.prototype.endSwiping = function(e, t) {
        var s = this,
            n = !1,
            a = s.instance.group.length,
            r = Math.abs(s.distanceX),
            o = "x" == e && a > 1 && (s.dMs > 130 && r > 10 || r > 50);
        s.sliderLastPos = null, "y" == e && !t && Math.abs(s.distanceY) > 50 ? (i.fancybox.animate(s.instance.current.$slide, {
            top: s.sliderStartPos.top + s.distanceY + 150 * s.velocityY,
            opacity: 0
        }, 200), n = s.instance.close(!0, 250)) : o && s.distanceX > 0 ? n = s.instance.previous(300) : o && s.distanceX < 0 && (n = s.instance.next(300)), !1 !== n || "x" != e && "y" != e || s.instance.centerSlide(200), s.$container.removeClass("fancybox-is-sliding")
    }, d.prototype.endPanning = function() {
        var e, t, s, n = this;
        n.contentLastPos && (!1 === n.opts.momentum || n.dMs > 350 ? (e = n.contentLastPos.left, t = n.contentLastPos.top) : (e = n.contentLastPos.left + 500 * n.velocityX, t = n.contentLastPos.top + 500 * n.velocityY), (s = n.limitPosition(e, t, n.contentStartPos.width, n.contentStartPos.height)).width = n.contentStartPos.width, s.height = n.contentStartPos.height, i.fancybox.animate(n.$content, s, 366))
    }, d.prototype.endZooming = function() {
        var e, t, s, n, a = this,
            r = a.instance.current,
            o = a.newWidth,
            l = a.newHeight;
        a.contentLastPos && (e = a.contentLastPos.left, n = {
            top: t = a.contentLastPos.top,
            left: e,
            width: o,
            height: l,
            scaleX: 1,
            scaleY: 1
        }, i.fancybox.setTranslate(a.$content, n), o < a.canvasWidth && l < a.canvasHeight ? a.instance.scaleToFit(150) : o > r.width || l > r.height ? a.instance.scaleToActual(a.centerPointStartX, a.centerPointStartY, 150) : (s = a.limitPosition(e, t, o, l), i.fancybox.animate(a.$content, s, 150)))
    }, d.prototype.onTap = function(t) {
        var s, n = this,
            r = i(t.target),
            o = n.instance,
            l = o.current,
            c = t && a(t) || n.startPoints,
            d = c[0] ? c[0].x - i(e).scrollLeft() - n.stagePos.left : 0,
            h = c[0] ? c[0].y - i(e).scrollTop() - n.stagePos.top : 0,
            u = function(e) {
                var s = l.opts[e];
                if (i.isFunction(s) && (s = s.apply(o, [l, t])), s) switch (s) {
                    case "close":
                        o.close(n.startEvent);
                        break;
                    case "toggleControls":
                        o.toggleControls();
                        break;
                    case "next":
                        o.next();
                        break;
                    case "nextOrClose":
                        o.group.length > 1 ? o.next() : o.close(n.startEvent);
                        break;
                    case "zoom":
                        "image" == l.type && (l.isLoaded || l.$ghost) && (o.canPan() ? o.scaleToFit() : o.isScaledDown() ? o.scaleToActual(d, h) : o.group.length < 2 && o.close(n.startEvent))
                }
            };
        if ((!t.originalEvent || 2 != t.originalEvent.button) && (r.is("img") || !(d > r[0].clientWidth + r.offset().left))) {
            if (r.is(".fancybox-bg,.fancybox-inner,.fancybox-outer,.fancybox-container")) s = "Outside";
            else if (r.is(".fancybox-slide")) s = "Slide";
            else {
                if (!o.current.$content || !o.current.$content.find(r).addBack().filter(r).length) return;
                s = "Content"
            }
            if (n.tapped) {
                if (clearTimeout(n.tapped), n.tapped = null, Math.abs(d - n.tapX) > 50 || Math.abs(h - n.tapY) > 50) return this;
                u("dblclick" + s)
            } else n.tapX = d, n.tapY = h, l.opts["dblclick" + s] && l.opts["dblclick" + s] !== l.opts["click" + s] ? n.tapped = setTimeout(function() {
                n.tapped = null, o.isAnimating || u("click" + s)
            }, 500) : u("click" + s);
            return this
        }
    }, i(t).on("onActivate.fb", function(e, t) {
        t && !t.Guestures && (t.Guestures = new d(t))
    }).on("beforeClose.fb", function(e, t) {
        t && t.Guestures && t.Guestures.destroy()
    })
}(window, document, jQuery),
function(e, t) {
    "use strict";
    t.extend(!0, t.fancybox.defaults, {
        btnTpl: {
            slideShow: '<button data-fancybox-play class="fancybox-button fancybox-button--play" title="{{PLAY_START}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6.5 5.4v13.2l11-6.6z"/></svg><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M8.33 5.75h2.2v12.5h-2.2V5.75zm5.15 0h2.2v12.5h-2.2V5.75z"/></svg></button>'
        },
        slideShow: {
            autoStart: !1,
            speed: 3e3,
            progress: !0
        }
    });
    var i = function(e) {
        this.instance = e, this.init()
    };
    t.extend(i.prototype, {
        timer: null,
        isActive: !1,
        $button: null,
        init: function() {
            var e = this,
                i = e.instance,
                s = i.group[i.currIndex].opts.slideShow;
            e.$button = i.$refs.toolbar.find("[data-fancybox-play]").on("click", function() {
                e.toggle()
            }), i.group.length < 2 || !s ? e.$button.hide() : s.progress && (e.$progress = t('<div class="fancybox-progress"></div>').appendTo(i.$refs.inner))
        },
        set: function(e) {
            var i = this,
                s = i.instance,
                n = s.current;
            n && (!0 === e || n.opts.loop || s.currIndex < s.group.length - 1) ? i.isActive && "video" !== n.contentType && (i.$progress && t.fancybox.animate(i.$progress.show(), {
                scaleX: 1
            }, n.opts.slideShow.speed), i.timer = setTimeout(function() {
                s.current.opts.loop || s.current.index != s.group.length - 1 ? s.next() : s.jumpTo(0)
            }, n.opts.slideShow.speed)) : (i.stop(), s.idleSecondsCounter = 0, s.showControls())
        },
        clear: function() {
            var e = this;
            clearTimeout(e.timer), e.timer = null, e.$progress && e.$progress.removeAttr("style").hide()
        },
        start: function() {
            var e = this,
                t = e.instance.current;
            t && (e.$button.attr("title", (t.opts.i18n[t.opts.lang] || t.opts.i18n.en).PLAY_STOP).removeClass("fancybox-button--play").addClass("fancybox-button--pause"), e.isActive = !0, t.isComplete && e.set(!0), e.instance.trigger("onSlideShowChange", !0))
        },
        stop: function() {
            var e = this,
                t = e.instance.current;
            e.clear(), e.$button.attr("title", (t.opts.i18n[t.opts.lang] || t.opts.i18n.en).PLAY_START).removeClass("fancybox-button--pause").addClass("fancybox-button--play"), e.isActive = !1, e.instance.trigger("onSlideShowChange", !1), e.$progress && e.$progress.removeAttr("style").hide()
        },
        toggle: function() {
            var e = this;
            e.isActive ? e.stop() : e.start()
        }
    }), t(e).on({
        "onInit.fb": function(e, t) {
            t && !t.SlideShow && (t.SlideShow = new i(t))
        },
        "beforeShow.fb": function(e, t, i, s) {
            var n = t && t.SlideShow;
            s ? n && i.opts.slideShow.autoStart && n.start() : n && n.isActive && n.clear()
        },
        "afterShow.fb": function(e, t, i) {
            var s = t && t.SlideShow;
            s && s.isActive && s.set()
        },
        "afterKeydown.fb": function(i, s, n, a, r) {
            var o = s && s.SlideShow;
            !o || !n.opts.slideShow || 80 !== r && 32 !== r || t(e.activeElement).is("button,a,input") || (a.preventDefault(), o.toggle())
        },
        "beforeClose.fb onDeactivate.fb": function(e, t) {
            var i = t && t.SlideShow;
            i && i.stop()
        }
    }), t(e).on("visibilitychange", function() {
        var i = t.fancybox.getInstance(),
            s = i && i.SlideShow;
        s && s.isActive && (e.hidden ? s.clear() : s.set())
    })
}(document, jQuery),
function(e, t) {
    "use strict";
    var i = function() {
        for (var t = [
                ["requestFullscreen", "exitFullscreen", "fullscreenElement", "fullscreenEnabled", "fullscreenchange", "fullscreenerror"],
                ["webkitRequestFullscreen", "webkitExitFullscreen", "webkitFullscreenElement", "webkitFullscreenEnabled", "webkitfullscreenchange", "webkitfullscreenerror"],
                ["webkitRequestFullScreen", "webkitCancelFullScreen", "webkitCurrentFullScreenElement", "webkitCancelFullScreen", "webkitfullscreenchange", "webkitfullscreenerror"],
                ["mozRequestFullScreen", "mozCancelFullScreen", "mozFullScreenElement", "mozFullScreenEnabled", "mozfullscreenchange", "mozfullscreenerror"],
                ["msRequestFullscreen", "msExitFullscreen", "msFullscreenElement", "msFullscreenEnabled", "MSFullscreenChange", "MSFullscreenError"]
            ], i = {}, s = 0; s < t.length; s++) {
            var n = t[s];
            if (n && n[1] in e) {
                for (var a = 0; a < n.length; a++) i[t[0][a]] = n[a];
                return i
            }
        }
        return !1
    }();
    if (i) {
        var s = {
            request: function(t) {
                (t = t || e.documentElement)[i.requestFullscreen](t.ALLOW_KEYBOARD_INPUT)
            },
            exit: function() {
                e[i.exitFullscreen]()
            },
            toggle: function(t) {
                t = t || e.documentElement, this.isFullscreen() ? this.exit() : this.request(t)
            },
            isFullscreen: function() {
                return Boolean(e[i.fullscreenElement])
            },
            enabled: function() {
                return Boolean(e[i.fullscreenEnabled])
            }
        };
        t.extend(!0, t.fancybox.defaults, {
            btnTpl: {
                fullScreen: '<button data-fancybox-fullscreen class="fancybox-button fancybox-button--fsenter" title="{{FULL_SCREEN}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5 16h3v3h2v-5H5zm3-8H5v2h5V5H8zm6 11h2v-3h3v-2h-5zm2-11V5h-2v5h5V8z"/></svg></button>'
            },
            fullScreen: {
                autoStart: !1
            }
        }), t(e).on(i.fullscreenchange, function() {
            var e = s.isFullscreen(),
                i = t.fancybox.getInstance();
            i && (i.current && "image" === i.current.type && i.isAnimating && (i.isAnimating = !1, i.update(!0, !0, 0), i.isComplete || i.complete()), i.trigger("onFullscreenChange", e), i.$refs.container.toggleClass("fancybox-is-fullscreen", e), i.$refs.toolbar.find("[data-fancybox-fullscreen]").toggleClass("fancybox-button--fsenter", !e).toggleClass("fancybox-button--fsexit", e))
        })
    }
    t(e).on({
        "onInit.fb": function(e, t) {
            i ? t && t.group[t.currIndex].opts.fullScreen ? (t.$refs.container.on("click.fb-fullscreen", "[data-fancybox-fullscreen]", function(e) {
                e.stopPropagation(), e.preventDefault(), s.toggle()
            }), t.opts.fullScreen && !0 === t.opts.fullScreen.autoStart && s.request(), t.FullScreen = s) : t && t.$refs.toolbar.find("[data-fancybox-fullscreen]").hide() : t.$refs.toolbar.find("[data-fancybox-fullscreen]").remove()
        },
        "afterKeydown.fb": function(e, t, i, s, n) {
            t && t.FullScreen && 70 === n && (s.preventDefault(), t.FullScreen.toggle())
        },
        "beforeClose.fb": function(e, t) {
            t && t.FullScreen && t.$refs.container.hasClass("fancybox-is-fullscreen") && s.exit()
        }
    })
}(document, jQuery),
function(e, t) {
    "use strict";
    var i = "fancybox-thumbs";
    t.fancybox.defaults = t.extend(!0, {
        btnTpl: {
            thumbs: '<button data-fancybox-thumbs class="fancybox-button fancybox-button--thumbs" title="{{THUMBS}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M14.59 14.59h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76H5.65v-3.76zm8.94-4.47h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76H5.65v-3.76zm8.94-4.47h3.76v3.76h-3.76V5.65zm-4.47 0h3.76v3.76h-3.76V5.65zm-4.47 0h3.76v3.76H5.65V5.65z"/></svg></button>'
        },
        thumbs: {
            autoStart: !1,
            hideOnClose: !0,
            parentEl: ".fancybox-container",
            axis: "y"
        }
    }, t.fancybox.defaults);
    var s = function(e) {
        this.init(e)
    };
    t.extend(s.prototype, {
        $button: null,
        $grid: null,
        $list: null,
        isVisible: !1,
        isActive: !1,
        init: function(e) {
            var t = this,
                i = e.group,
                s = 0;
            t.instance = e, t.opts = i[e.currIndex].opts.thumbs, e.Thumbs = t, t.$button = e.$refs.toolbar.find("[data-fancybox-thumbs]");
            for (var n = 0, a = i.length; n < a && (i[n].thumb && s++, !(s > 1)); n++);
            s > 1 && t.opts ? (t.$button.removeAttr("style").on("click", function() {
                t.toggle()
            }), t.isActive = !0) : t.$button.hide()
        },
        create: function() {
            var e, s = this,
                n = s.instance,
                a = s.opts.parentEl,
                r = [];
            s.$grid || (s.$grid = t('<div class="' + i + " " + i + "-" + s.opts.axis + '"></div>').appendTo(n.$refs.container.find(a).addBack().filter(a)), s.$grid.on("click", "a", function() {
                n.jumpTo(t(this).attr("data-index"))
            })), s.$list || (s.$list = t('<div class="' + i + '__list">').appendTo(s.$grid)), t.each(n.group, function(t, i) {
                (e = i.thumb) || "image" !== i.type || (e = i.src), r.push('<a href="javascript:;" tabindex="0" data-index="' + t + '"' + (e && e.length ? ' style="background-image:url(' + e + ')"' : 'class="fancybox-thumbs-missing"') + "></a>")
            }), s.$list[0].innerHTML = r.join(""), "x" === s.opts.axis && s.$list.width(parseInt(s.$grid.css("padding-right"), 10) + n.group.length * s.$list.children().eq(0).outerWidth(!0))
        },
        focus: function(e) {
            var t, i, s = this,
                n = s.$list,
                a = s.$grid;
            s.instance.current && (i = (t = n.children().removeClass("fancybox-thumbs-active").filter('[data-index="' + s.instance.current.index + '"]').addClass("fancybox-thumbs-active")).position(), "y" === s.opts.axis && (i.top < 0 || i.top > n.height() - t.outerHeight()) ? n.stop().animate({
                scrollTop: n.scrollTop() + i.top
            }, e) : "x" === s.opts.axis && (i.left < a.scrollLeft() || i.left > a.scrollLeft() + (a.width() - t.outerWidth())) && n.parent().stop().animate({
                scrollLeft: i.left
            }, e))
        },
        update: function() {
            var e = this;
            e.instance.$refs.container.toggleClass("fancybox-show-thumbs", this.isVisible), e.isVisible ? (e.$grid || e.create(), e.instance.trigger("onThumbsShow"), e.focus(0)) : e.$grid && e.instance.trigger("onThumbsHide"), e.instance.update()
        },
        hide: function() {
            this.isVisible = !1, this.update()
        },
        show: function() {
            this.isVisible = !0, this.update()
        },
        toggle: function() {
            this.isVisible = !this.isVisible, this.update()
        }
    }), t(e).on({
        "onInit.fb": function(e, t) {
            var i;
            t && !t.Thumbs && ((i = new s(t)).isActive && !0 === i.opts.autoStart && i.show())
        },
        "beforeShow.fb": function(e, t, i, s) {
            var n = t && t.Thumbs;
            n && n.isVisible && n.focus(s ? 0 : 250)
        },
        "afterKeydown.fb": function(e, t, i, s, n) {
            var a = t && t.Thumbs;
            a && a.isActive && 71 === n && (s.preventDefault(), a.toggle())
        },
        "beforeClose.fb": function(e, t) {
            var i = t && t.Thumbs;
            i && i.isVisible && !1 !== i.opts.hideOnClose && i.$grid.hide()
        }
    })
}(document, jQuery),
function(e, t) {
    "use strict";
    t.extend(!0, t.fancybox.defaults, {
        btnTpl: {
            share: '<button data-fancybox-share class="fancybox-button fancybox-button--share" title="{{SHARE}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M2.55 19c1.4-8.4 9.1-9.8 11.9-9.8V5l7 7-7 6.3v-3.5c-2.8 0-10.5 2.1-11.9 4.2z"/></svg></button>'
        },
        share: {
            url: function(e, t) {
                return !e.currentHash && "inline" !== t.type && "html" !== t.type && (t.origSrc || t.src) || window.location
            },
            tpl: '<div class="fancybox-share"><h1>{{SHARE}}</h1><p><a class="fancybox-share__button fancybox-share__button--fb" href="https://www.facebook.com/sharer/sharer.php?u={{url}}"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m287 456v-299c0-21 6-35 35-35h38v-63c-7-1-29-3-55-3-54 0-91 33-91 94v306m143-254h-205v72h196" /></svg><span>Facebook</span></a><a class="fancybox-share__button fancybox-share__button--tw" href="https://twitter.com/intent/tweet?url={{url}}&text={{descr}}"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m456 133c-14 7-31 11-47 13 17-10 30-27 37-46-15 10-34 16-52 20-61-62-157-7-141 75-68-3-129-35-169-85-22 37-11 86 26 109-13 0-26-4-37-9 0 39 28 72 65 80-12 3-25 4-37 2 10 33 41 57 77 57-42 30-77 38-122 34 170 111 378-32 359-208 16-11 30-25 41-42z" /></svg><span>Twitter</span></a><a class="fancybox-share__button fancybox-share__button--pt" href="https://www.pinterest.com/pin/create/button/?url={{url}}&description={{descr}}&media={{media}}"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m265 56c-109 0-164 78-164 144 0 39 15 74 47 87 5 2 10 0 12-5l4-19c2-6 1-8-3-13-9-11-15-25-15-45 0-58 43-110 113-110 62 0 96 38 96 88 0 67-30 122-73 122-24 0-42-19-36-44 6-29 20-60 20-81 0-19-10-35-31-35-25 0-44 26-44 60 0 21 7 36 7 36l-30 125c-8 37-1 83 0 87 0 3 4 4 5 2 2-3 32-39 42-75l16-64c8 16 31 29 56 29 74 0 124-67 124-157 0-69-58-132-146-132z" fill="#fff"/></svg><span>Pinterest</span></a></p><p><input class="fancybox-share__input" type="text" value="{{url_raw}}" onclick="select()" /></p></div>'
        }
    }), t(e).on("click", "[data-fancybox-share]", function() {
        var e, i, s = t.fancybox.getInstance(),
            n = s.current || null;
        n && ("function" === t.type(n.opts.share.url) && (e = n.opts.share.url.apply(n, [s, n])), i = n.opts.share.tpl.replace(/\{\{media\}\}/g, "image" === n.type ? encodeURIComponent(n.src) : "").replace(/\{\{url\}\}/g, encodeURIComponent(e)).replace(/\{\{url_raw\}\}/g, function(e) {
            var t = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;",
                "/": "&#x2F;",
                "`": "&#x60;",
                "=": "&#x3D;"
            };
            return String(e).replace(/[&<>"'`=\/]/g, function(e) {
                return t[e]
            })
        }(e)).replace(/\{\{descr\}\}/g, s.$caption ? encodeURIComponent(s.$caption.text()) : ""), t.fancybox.open({
            src: s.translate(s, i),
            type: "html",
            opts: {
                touch: !1,
                animationEffect: !1,
                afterLoad: function(e, t) {
                    s.$refs.container.one("beforeClose.fb", function() {
                        e.close(null, 0)
                    }), t.$content.find(".fancybox-share__button").click(function() {
                        return window.open(this.href, "Share", "width=550, height=450"), !1
                    })
                },
                mobile: {
                    autoFocus: !1
                }
            }
        }))
    })
}(document, jQuery),
function(e, t, i) {
    "use strict";

    function s() {
        var t = e.location.hash.substr(1),
            i = t.split("-"),
            s = i.length > 1 && /^\+?\d+$/.test(i[i.length - 1]) && parseInt(i.pop(-1), 10) || 1;
        return {
            hash: t,
            index: s < 1 ? 1 : s,
            gallery: i.join("-")
        }
    }

    function n(e) {
        "" !== e.gallery && i("[data-fancybox='" + i.escapeSelector(e.gallery) + "']").eq(e.index - 1).focus().trigger("click.fb-start")
    }

    function a(e) {
        var t, i;
        return !!e && ("" !== (i = (t = e.current ? e.current.opts : e.opts).hash || (t.$orig ? t.$orig.data("fancybox") || t.$orig.data("fancybox-trigger") : "")) && i)
    }
    i.escapeSelector || (i.escapeSelector = function(e) {
        return (e + "").replace(/([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g, function(e, t) {
            return t ? "\0" === e ? "�" : e.slice(0, -1) + "\\" + e.charCodeAt(e.length - 1).toString(16) + " " : "\\" + e
        })
    }), i(function() {
        !1 !== i.fancybox.defaults.hash && (i(t).on({
            "onInit.fb": function(e, t) {
                var i, n;
                !1 !== t.group[t.currIndex].opts.hash && (i = s(), (n = a(t)) && i.gallery && n == i.gallery && (t.currIndex = i.index - 1))
            },
            "beforeShow.fb": function(i, s, n, r) {
                var o;
                n && !1 !== n.opts.hash && (o = a(s)) && (s.currentHash = o + (s.group.length > 1 ? "-" + (n.index + 1) : ""), e.location.hash !== "#" + s.currentHash && (r && !s.origHash && (s.origHash = e.location.hash), s.hashTimer && clearTimeout(s.hashTimer), s.hashTimer = setTimeout(function() {
                    "replaceState" in e.history ? (e.history[r ? "pushState" : "replaceState"]({}, t.title, e.location.pathname + e.location.search + "#" + s.currentHash), r && (s.hasCreatedHistory = !0)) : e.location.hash = s.currentHash, s.hashTimer = null
                }, 300)))
            },
            "beforeClose.fb": function(i, s, n) {
                n && !1 !== n.opts.hash && (clearTimeout(s.hashTimer), s.currentHash && s.hasCreatedHistory ? e.history.back() : s.currentHash && ("replaceState" in e.history ? e.history.replaceState({}, t.title, e.location.pathname + e.location.search + (s.origHash || "")) : e.location.hash = s.origHash), s.currentHash = null)
            }
        }), i(e).on("hashchange.fb", function() {
            var e = s(),
                t = null;
            i.each(i(".fancybox-container").get().reverse(), function(e, s) {
                var n = i(s).data("FancyBox");
                if (n && n.currentHash) return t = n, !1
            }), t ? t.currentHash === e.gallery + "-" + e.index || 1 === e.index && t.currentHash == e.gallery || (t.currentHash = null, t.close()) : "" !== e.gallery && n(e)
        }), setTimeout(function() {
            i.fancybox.getInstance() || n(s())
        }, 50))
    })
}(window, document, jQuery),
function(e, t) {
    "use strict";
    var i = (new Date).getTime();
    t(e).on({
        "onInit.fb": function(e, t, s) {
            t.$refs.stage.on("mousewheel DOMMouseScroll wheel MozMousePixelScroll", function(e) {
                var s = t.current,
                    n = (new Date).getTime();
                t.group.length < 2 || !1 === s.opts.wheel || "auto" === s.opts.wheel && "image" !== s.type || (e.preventDefault(), e.stopPropagation(), s.$slide.hasClass("fancybox-animated") || (e = e.originalEvent || e, n - i < 250 || (i = n, t[(-e.deltaY || -e.deltaX || e.wheelDelta || -e.detail) < 0 ? "next" : "previous"]())))
            })
        }
    })
}(document, jQuery),
function() {
    "use strict";

    function e(t, s) {
        var n;
        if (s = s || {}, this.trackingClick = !1, this.trackingClickStart = 0, this.targetElement = null, this.touchStartX = 0, this.touchStartY = 0, this.lastTouchIdentifier = 0, this.touchBoundary = s.touchBoundary || 10, this.layer = t, this.tapDelay = s.tapDelay || 200, this.tapTimeout = s.tapTimeout || 700, !e.notNeeded(t)) {
            for (var a = ["onMouse", "onClick", "onTouchStart", "onTouchMove", "onTouchEnd", "onTouchCancel"], r = 0, o = a.length; r < o; r++) this[a[r]] = l(this[a[r]], this);
            i && (t.addEventListener("mouseover", this.onMouse, !0), t.addEventListener("mousedown", this.onMouse, !0), t.addEventListener("mouseup", this.onMouse, !0)), t.addEventListener("click", this.onClick, !0), t.addEventListener("touchstart", this.onTouchStart, !1), t.addEventListener("touchmove", this.onTouchMove, !1), t.addEventListener("touchend", this.onTouchEnd, !1), t.addEventListener("touchcancel", this.onTouchCancel, !1), Event.prototype.stopImmediatePropagation || (t.removeEventListener = function(e, i, s) {
                var n = Node.prototype.removeEventListener;
                "click" === e ? n.call(t, e, i.hijacked || i, s) : n.call(t, e, i, s)
            }, t.addEventListener = function(e, i, s) {
                var n = Node.prototype.addEventListener;
                "click" === e ? n.call(t, e, i.hijacked || (i.hijacked = function(e) {
                    e.propagationStopped || i(e)
                }), s) : n.call(t, e, i, s)
            }), "function" == typeof t.onclick && (n = t.onclick, t.addEventListener("click", function(e) {
                n(e)
            }, !1), t.onclick = null)
        }

        function l(e, t) {
            return function() {
                return e.apply(t, arguments)
            }
        }
    }
    var t = navigator.userAgent.indexOf("Windows Phone") >= 0,
        i = navigator.userAgent.indexOf("Android") > 0 && !t,
        s = /iP(ad|hone|od)/.test(navigator.userAgent) && !t,
        n = s && /OS 4_\d(_\d)?/.test(navigator.userAgent),
        a = s && /OS [6-7]_\d/.test(navigator.userAgent),
        r = navigator.userAgent.indexOf("BB10") > 0;
    e.prototype.needsClick = function(e) {
        switch (e.nodeName.toLowerCase()) {
            case "button":
            case "select":
            case "textarea":
                if (e.disabled) return !0;
                break;
            case "input":
                if (s && "file" === e.type || e.disabled) return !0;
                break;
            case "label":
            case "iframe":
            case "video":
                return !0
        }
        return /\bneedsclick\b/.test(e.className)
    }, e.prototype.needsFocus = function(e) {
        switch (e.nodeName.toLowerCase()) {
            case "textarea":
                return !0;
            case "select":
                return !i;
            case "input":
                switch (e.type) {
                    case "button":
                    case "checkbox":
                    case "file":
                    case "image":
                    case "radio":
                    case "submit":
                        return !1
                }
                return !e.disabled && !e.readOnly;
            default:
                return /\bneedsfocus\b/.test(e.className)
        }
    }, e.prototype.sendClick = function(e, t) {
        var i, s;
        document.activeElement && document.activeElement !== e && document.activeElement.blur(), s = t.changedTouches[0], (i = document.createEvent("MouseEvents")).initMouseEvent(this.determineEventType(e), !0, !0, window, 1, s.screenX, s.screenY, s.clientX, s.clientY, !1, !1, !1, !1, 0, null), i.forwardedTouchEvent = !0, e.dispatchEvent(i)
    }, e.prototype.determineEventType = function(e) {
        return i && "select" === e.tagName.toLowerCase() ? "mousedown" : "click"
    }, e.prototype.focus = function(e) {
        var t;
        s && e.setSelectionRange && 0 !== e.type.indexOf("date") && "time" !== e.type && "month" !== e.type && "email" !== e.type ? (t = e.value.length, e.setSelectionRange(t, t)) : e.focus()
    }, e.prototype.updateScrollParent = function(e) {
        var t, i;
        if (!(t = e.fastClickScrollParent) || !t.contains(e)) {
            i = e;
            do {
                if (i.scrollHeight > i.offsetHeight) {
                    t = i, e.fastClickScrollParent = i;
                    break
                }
                i = i.parentElement
            } while (i)
        }
        t && (t.fastClickLastScrollTop = t.scrollTop)
    }, e.prototype.getTargetElementFromEventTarget = function(e) {
        return e.nodeType === Node.TEXT_NODE ? e.parentNode : e
    }, e.prototype.onTouchStart = function(e) {
        var t, i, a;
        if (e.targetTouches.length > 1) return !0;
        if (t = this.getTargetElementFromEventTarget(e.target), i = e.targetTouches[0], s) {
            if ((a = window.getSelection()).rangeCount && !a.isCollapsed) return !0;
            if (!n) {
                if (i.identifier && i.identifier === this.lastTouchIdentifier) return e.preventDefault(), !1;
                this.lastTouchIdentifier = i.identifier, this.updateScrollParent(t)
            }
        }
        return this.trackingClick = !0, this.trackingClickStart = e.timeStamp, this.targetElement = t, this.touchStartX = i.pageX, this.touchStartY = i.pageY, e.timeStamp - this.lastClickTime < this.tapDelay && e.preventDefault(), !0
    }, e.prototype.touchHasMoved = function(e) {
        var t = e.changedTouches[0],
            i = this.touchBoundary;
        return Math.abs(t.pageX - this.touchStartX) > i || Math.abs(t.pageY - this.touchStartY) > i
    }, e.prototype.onTouchMove = function(e) {
        return !this.trackingClick || ((this.targetElement !== this.getTargetElementFromEventTarget(e.target) || this.touchHasMoved(e)) && (this.trackingClick = !1, this.targetElement = null), !0)
    }, e.prototype.findControl = function(e) {
        return void 0 !== e.control ? e.control : e.htmlFor ? document.getElementById(e.htmlFor) : e.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")
    }, e.prototype.onTouchEnd = function(e) {
        var t, r, o, l, c, d = this.targetElement;
        if (!this.trackingClick) return !0;
        if (e.timeStamp - this.lastClickTime < this.tapDelay) return this.cancelNextClick = !0, !0;
        if (e.timeStamp - this.trackingClickStart > this.tapTimeout) return !0;
        if (this.cancelNextClick = !1, this.lastClickTime = e.timeStamp, r = this.trackingClickStart, this.trackingClick = !1, this.trackingClickStart = 0, a && (c = e.changedTouches[0], (d = document.elementFromPoint(c.pageX - window.pageXOffset, c.pageY - window.pageYOffset) || d).fastClickScrollParent = this.targetElement.fastClickScrollParent), "label" === (o = d.tagName.toLowerCase())) {
            if (t = this.findControl(d)) {
                if (this.focus(d), i) return !1;
                d = t
            }
        } else if (this.needsFocus(d)) return e.timeStamp - r > 100 || s && window.top !== window && "input" === o ? (this.targetElement = null, !1) : (this.focus(d), this.sendClick(d, e), s && "select" === o || (this.targetElement = null, e.preventDefault()), !1);
        return !(!s || n || !(l = d.fastClickScrollParent) || l.fastClickLastScrollTop === l.scrollTop) || (this.needsClick(d) || (e.preventDefault(), this.sendClick(d, e)), !1)
    }, e.prototype.onTouchCancel = function() {
        this.trackingClick = !1, this.targetElement = null
    }, e.prototype.onMouse = function(e) {
        return !this.targetElement || (!!e.forwardedTouchEvent || (!e.cancelable || (!(!this.needsClick(this.targetElement) || this.cancelNextClick) || (e.stopImmediatePropagation ? e.stopImmediatePropagation() : e.propagationStopped = !0, e.stopPropagation(), e.preventDefault(), !1))))
    }, e.prototype.onClick = function(e) {
        var t;
        return this.trackingClick ? (this.targetElement = null, this.trackingClick = !1, !0) : "submit" === e.target.type && 0 === e.detail || ((t = this.onMouse(e)) || (this.targetElement = null), t)
    }, e.prototype.destroy = function() {
        var e = this.layer;
        i && (e.removeEventListener("mouseover", this.onMouse, !0), e.removeEventListener("mousedown", this.onMouse, !0), e.removeEventListener("mouseup", this.onMouse, !0)), e.removeEventListener("click", this.onClick, !0), e.removeEventListener("touchstart", this.onTouchStart, !1), e.removeEventListener("touchmove", this.onTouchMove, !1), e.removeEventListener("touchend", this.onTouchEnd, !1), e.removeEventListener("touchcancel", this.onTouchCancel, !1)
    }, e.notNeeded = function(e) {
        var t, s, n;
        if (void 0 === window.ontouchstart) return !0;
        if (s = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1]) {
            if (!i) return !0;
            if (t = document.querySelector("meta[name=viewport]")) {
                if (-1 !== t.content.indexOf("user-scalable=no")) return !0;
                if (s > 31 && document.documentElement.scrollWidth <= window.outerWidth) return !0
            }
        }
        if (r && (n = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/))[1] >= 10 && n[2] >= 3 && (t = document.querySelector("meta[name=viewport]"))) {
            if (-1 !== t.content.indexOf("user-scalable=no")) return !0;
            if (document.documentElement.scrollWidth <= window.outerWidth) return !0
        }
        return "none" === e.style.msTouchAction || "manipulation" === e.style.touchAction || (!!(+(/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1] >= 27 && (t = document.querySelector("meta[name=viewport]")) && (-1 !== t.content.indexOf("user-scalable=no") || document.documentElement.scrollWidth <= window.outerWidth)) || ("none" === e.style.touchAction || "manipulation" === e.style.touchAction))
    }, e.attach = function(t, i) {
        return new e(t, i)
    }, "function" == typeof define && "object" == typeof define.amd && define.amd ? define(function() {
        return e
    }) : "undefined" != typeof module && module.exports ? (module.exports = e.attach, module.exports.FastClick = e) : window.FastClick = e
}(),
function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = e || self).cssVars = t()
}(this, function() {
    "use strict";

    function e() {
        return (e = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var i = arguments[t];
                for (var s in i) Object.prototype.hasOwnProperty.call(i, s) && (e[s] = i[s])
            }
            return e
        }).apply(this, arguments)
    }

    function t(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
            i = {
                mimeType: t.mimeType || null,
                onBeforeSend: t.onBeforeSend || Function.prototype,
                onSuccess: t.onSuccess || Function.prototype,
                onError: t.onError || Function.prototype,
                onComplete: t.onComplete || Function.prototype
            },
            s = Array.isArray(e) ? e : [e],
            n = Array.apply(null, Array(s.length)).map(function(e) {
                return null
            });

        function a() {
            return !("<" === (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "").trim().charAt(0))
        }

        function r(e, t) {
            i.onError(e, s[t], t)
        }

        function o(e, t) {
            var a = i.onSuccess(e, s[t], t);
            e = !1 === a ? "" : a || e, n[t] = e, -1 === n.indexOf(null) && i.onComplete(n)
        }
        var l = document.createElement("a");
        s.forEach(function(e, t) {
            if (l.setAttribute("href", e), l.href = String(l.href), Boolean(document.all && !window.atob) && l.host.split(":")[0] !== location.host.split(":")[0])
                if (l.protocol === location.protocol) {
                    var s = new XDomainRequest;
                    s.open("GET", e), s.timeout = 0, s.onprogress = Function.prototype, s.ontimeout = Function.prototype, s.onload = function() {
                        a(s.responseText) ? o(s.responseText, t) : r(s, t)
                    }, s.onerror = function(e) {
                        r(s, t)
                    }, setTimeout(function() {
                        s.send()
                    }, 0)
                } else console.warn("Internet Explorer 9 Cross-Origin (CORS) requests must use the same protocol (".concat(e, ")")), r(null, t);
            else {
                var n = new XMLHttpRequest;
                n.open("GET", e), i.mimeType && n.overrideMimeType && n.overrideMimeType(i.mimeType), i.onBeforeSend(n, e, t), n.onreadystatechange = function() {
                    4 === n.readyState && (200 === n.status && a(n.responseText) ? o(n.responseText, t) : r(n, t))
                }, n.send()
            }
        })
    }

    function i(e) {
        var i = {
                cssComments: /\/\*[\s\S]+?\*\//g,
                cssImports: /(?:@import\s*)(?:url\(\s*)?(?:['"])([^'"]*)(?:['"])(?:\s*\))?(?:[^;]*;)/g
            },
            n = {
                rootElement: e.rootElement || document,
                include: e.include || 'style,link[rel="stylesheet"]',
                exclude: e.exclude || null,
                filter: e.filter || null,
                useCSSOM: e.useCSSOM || !1,
                onBeforeSend: e.onBeforeSend || Function.prototype,
                onSuccess: e.onSuccess || Function.prototype,
                onError: e.onError || Function.prototype,
                onComplete: e.onComplete || Function.prototype
            },
            a = Array.apply(null, n.rootElement.querySelectorAll(n.include)).filter(function(e) {
                return t = e, i = n.exclude, !(t.matches || t.matchesSelector || t.webkitMatchesSelector || t.mozMatchesSelector || t.msMatchesSelector || t.oMatchesSelector).call(t, i);
                var t, i
            }),
            r = Array.apply(null, Array(a.length)).map(function(e) {
                return null
            });

        function o() {
            if (-1 === r.indexOf(null)) {
                var e = r.join("");
                n.onComplete(e, r, a)
            }
        }

        function l(e, i, s, a) {
            var l = n.onSuccess(e, s, a);
            ! function e(i, s, a, r) {
                var o = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : [],
                    l = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : [],
                    d = c(i, a, l);
                d.rules.length ? t(d.absoluteUrls, {
                    onBeforeSend: function(e, t, i) {
                        n.onBeforeSend(e, s, t)
                    },
                    onSuccess: function(e, t, i) {
                        var a = n.onSuccess(e, s, t),
                            r = c(e = !1 === a ? "" : a || e, t, l);
                        return r.rules.forEach(function(t, i) {
                            e = e.replace(t, r.absoluteRules[i])
                        }), e
                    },
                    onError: function(t, n, c) {
                        o.push({
                            xhr: t,
                            url: n
                        }), l.push(d.rules[c]), e(i, s, a, r, o, l)
                    },
                    onComplete: function(t) {
                        t.forEach(function(e, t) {
                            i = i.replace(d.rules[t], e)
                        }), e(i, s, a, r, o, l)
                    }
                }) : r(i, o)
            }(e = void 0 !== l && !1 === Boolean(l) ? "" : l || e, s, a, function(e, t) {
                null === r[i] && (t.forEach(function(e) {
                    return n.onError(e.xhr, s, e.url)
                }), !n.filter || n.filter.test(e) ? r[i] = e : r[i] = "", o())
            })
        }

        function c(e, t) {
            var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : [],
                a = {};
            return a.rules = (e.replace(i.cssComments, "").match(i.cssImports) || []).filter(function(e) {
                return -1 === n.indexOf(e)
            }), a.urls = a.rules.map(function(e) {
                return e.replace(i.cssImports, "$1")
            }), a.absoluteUrls = a.urls.map(function(e) {
                return s(e, t)
            }), a.absoluteRules = a.rules.map(function(e, i) {
                var n = a.urls[i],
                    r = s(a.absoluteUrls[i], t);
                return e.replace(n, r)
            }), a
        }
        a.length ? a.forEach(function(e, i) {
            var a = e.getAttribute("href"),
                c = e.getAttribute("rel"),
                d = "LINK" === e.nodeName && a && c && "stylesheet" === c.toLowerCase(),
                h = "STYLE" === e.nodeName;
            if (d) t(a, {
                mimeType: "text/css",
                onBeforeSend: function(t, i, s) {
                    n.onBeforeSend(t, e, i)
                },
                onSuccess: function(t, n, r) {
                    var o = s(a, location.href);
                    l(t, i, e, o)
                },
                onError: function(t, s, a) {
                    r[i] = "", n.onError(t, e, s), o()
                }
            });
            else if (h) {
                var u = e.textContent;
                n.useCSSOM && (u = Array.apply(null, e.sheet.cssRules).map(function(e) {
                    return e.cssText
                }).join("")), l(u, i, e, location.href)
            } else r[i] = "", o()
        }) : n.onComplete("", [])
    }

    function s(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : location.href,
            i = document.implementation.createHTMLDocument(""),
            s = i.createElement("base"),
            n = i.createElement("a");
        return i.head.appendChild(s), i.body.appendChild(n), s.href = t, n.href = e, n.href
    }
    var n = a;

    function a(e, t, i) {
        e instanceof RegExp && (e = r(e, i)), t instanceof RegExp && (t = r(t, i));
        var s = o(e, t, i);
        return s && {
            start: s[0],
            end: s[1],
            pre: i.slice(0, s[0]),
            body: i.slice(s[0] + e.length, s[1]),
            post: i.slice(s[1] + t.length)
        }
    }

    function r(e, t) {
        var i = t.match(e);
        return i ? i[0] : null
    }

    function o(e, t, i) {
        var s, n, a, r, o, l = i.indexOf(e),
            c = i.indexOf(t, l + 1),
            d = l;
        if (l >= 0 && c > 0) {
            for (s = [], a = i.length; d >= 0 && !o;) d == l ? (s.push(d), l = i.indexOf(e, d + 1)) : 1 == s.length ? o = [s.pop(), c] : ((n = s.pop()) < a && (a = n, r = c), c = i.indexOf(t, d + 1)), d = l < c && l >= 0 ? l : c;
            s.length && (o = [a, r])
        }
        return o
    }

    function l(t) {
        var i = e({}, {
            preserveStatic: !0,
            removeComments: !1
        }, arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {});

        function s(e) {
            throw new Error("CSS parse error: ".concat(e))
        }

        function a(e) {
            var i = e.exec(t);
            if (i) return t = t.slice(i[0].length), i
        }

        function r() {
            return a(/^{\s*/)
        }

        function o() {
            return a(/^}/)
        }

        function l() {
            a(/^\s*/)
        }

        function c() {
            if (l(), "/" === t[0] && "*" === t[1]) {
                for (var e = 2; t[e] && ("*" !== t[e] || "/" !== t[e + 1]);) e++;
                if (!t[e]) return s("end of comment is missing");
                var i = t.slice(2, e);
                return t = t.slice(e + 2), {
                    type: "comment",
                    comment: i
                }
            }
        }

        function d() {
            for (var e, t = []; e = c();) t.push(e);
            return i.removeComments ? [] : t
        }

        function h() {
            for (l();
                "}" === t[0];) s("extra closing bracket");
            var e = a(/^(("(?:\\"|[^"])*"|'(?:\\'|[^'])*'|[^{])+)/);
            if (e) return e[0].trim().replace(/\/\*([^*]|[\r\n]|(\*+([^*\/]|[\r\n])))*\*\/+/g, "").replace(/"(?:\\"|[^"])*"|'(?:\\'|[^'])*'/g, function(e) {
                return e.replace(/,/g, "‌")
            }).split(/\s*(?![^(]*\)),\s*/).map(function(e) {
                return e.replace(/\u200C/g, ",")
            })
        }

        function u() {
            a(/^([;\s]*)+/);
            var e = /\/\*[^*]*\*+([^\/*][^*]*\*+)*\//g,
                t = a(/^(\*?[-#\/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/);
            if (t) {
                if (t = t[0].trim(), !a(/^:\s*/)) return s("property missing ':'");
                var i = a(/^((?:\/\*.*?\*\/|'(?:\\'|.)*?'|"(?:\\"|.)*?"|\((\s*'(?:\\'|.)*?'|"(?:\\"|.)*?"|[^)]*?)\s*\)|[^};])+)/),
                    n = {
                        type: "declaration",
                        property: t.replace(e, ""),
                        value: i ? i[0].replace(e, "").trim() : ""
                    };
                return a(/^[;\s]*/), n
            }
        }

        function p() {
            if (!r()) return s("missing '{'");
            for (var e, t = d(); e = u();) t.push(e), t = t.concat(d());
            return o() ? t : s("missing '}'")
        }

        function f() {
            l();
            for (var e, t = []; e = a(/^((\d+\.\d+|\.\d+|\d+)%?|[a-z]+)\s*/);) t.push(e[1]), a(/^,\s*/);
            if (t.length) return {
                type: "keyframe",
                values: t,
                declarations: p()
            }
        }

        function m() {
            if (l(), "@" === t[0]) {
                var e = function() {
                    var e = a(/^@([-\w]+)?keyframes\s*/);
                    if (e) {
                        var t = e[1];
                        if (!(e = a(/^([-\w]+)\s*/))) return s("@keyframes missing name");
                        var i, n = e[1];
                        if (!r()) return s("@keyframes missing '{'");
                        for (var l = d(); i = f();) l.push(i), l = l.concat(d());
                        return o() ? {
                            type: "keyframes",
                            name: n,
                            vendor: t,
                            keyframes: l
                        } : s("@keyframes missing '}'")
                    }
                }() || function() {
                    var e = a(/^@supports *([^{]+)/);
                    if (e) return {
                        type: "supports",
                        supports: e[1].trim(),
                        rules: g()
                    }
                }() || function() {
                    if (a(/^@host\s*/)) return {
                        type: "host",
                        rules: g()
                    }
                }() || function() {
                    var e = a(/^@media([^{]+)*/);
                    if (e) return {
                        type: "media",
                        media: (e[1] || "").trim(),
                        rules: g()
                    }
                }() || function() {
                    var e = a(/^@custom-media\s+(--[^\s]+)\s*([^{;]+);/);
                    if (e) return {
                        type: "custom-media",
                        name: e[1].trim(),
                        media: e[2].trim()
                    }
                }() || function() {
                    if (a(/^@page */)) return {
                        type: "page",
                        selectors: h() || [],
                        declarations: p()
                    }
                }() || function() {
                    var e = a(/^@([-\w]+)?document *([^{]+)/);
                    if (e) return {
                        type: "document",
                        document: e[2].trim(),
                        vendor: e[1] ? e[1].trim() : null,
                        rules: g()
                    }
                }() || function() {
                    if (a(/^@font-face\s*/)) return {
                        type: "font-face",
                        declarations: p()
                    }
                }() || function() {
                    var e = a(/^@(import|charset|namespace)\s*([^;]+);/);
                    if (e) return {
                        type: e[1],
                        name: e[2].trim()
                    }
                }();
                if (e && !i.preserveStatic) {
                    return (e.declarations ? e.declarations.some(function(e) {
                        return /var\(/.test(e.value)
                    }) : (e.keyframes || e.rules || []).some(function(e) {
                        return (e.declarations || []).some(function(e) {
                            return /var\(/.test(e.value)
                        })
                    })) ? e : {}
                }
                return e
            }
        }

        function v() {
            if (!i.preserveStatic) {
                var e = n("{", "}", t);
                if (e) {
                    var a = /:(?:root|host)(?![.:#(])/.test(e.pre) && /--\S*\s*:/.test(e.body),
                        r = /var\(/.test(e.body);
                    if (!a && !r) return t = t.slice(e.end + 1), {}
                }
            }
            var o = h() || [],
                l = i.preserveStatic ? p() : p().filter(function(e) {
                    var t = o.some(function(e) {
                            return /:(?:root|host)(?![.:#(])/.test(e)
                        }) && /^--\S/.test(e.property),
                        i = /var\(/.test(e.value);
                    return t || i
                });
            return o.length || s("selector missing"), {
                type: "rule",
                selectors: o,
                declarations: l
            }
        }

        function g(e) {
            if (!e && !r()) return s("missing '{'");
            for (var i, n = d(); t.length && (e || "}" !== t[0]) && (i = m() || v());) i.type && n.push(i), n = n.concat(d());
            return e || o() ? n : s("missing '}'")
        }
        return {
            type: "stylesheet",
            stylesheet: {
                rules: g(!0),
                errors: []
            }
        }
    }

    function c(t) {
        var i = e({}, {
                parseHost: !1,
                store: {},
                onWarning: function() {}
            }, arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}),
            s = new RegExp(":".concat(i.parseHost ? "host" : "root", "(?![.:#(])"));
        return "string" == typeof t && (t = l(t, i)), t.stylesheet.rules.forEach(function(e) {
            "rule" === e.type && e.selectors.some(function(e) {
                return s.test(e)
            }) && e.declarations.forEach(function(e, t) {
                var s = e.property,
                    n = e.value;
                s && 0 === s.indexOf("--") && (i.store[s] = n)
            })
        }), i.store
    }

    function d(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
            i = arguments.length > 2 ? arguments[2] : void 0,
            s = {
                charset: function(e) {
                    return "@charset " + e.name + ";"
                },
                comment: function(e) {
                    return 0 === e.comment.indexOf("__CSSVARSPONYFILL") ? "/*" + e.comment + "*/" : ""
                },
                "custom-media": function(e) {
                    return "@custom-media " + e.name + " " + e.media + ";"
                },
                declaration: function(e) {
                    return e.property + ":" + e.value + ";"
                },
                document: function(e) {
                    return "@" + (e.vendor || "") + "document " + e.document + "{" + n(e.rules) + "}"
                },
                "font-face": function(e) {
                    return "@font-face{" + n(e.declarations) + "}"
                },
                host: function(e) {
                    return "@host{" + n(e.rules) + "}"
                },
                import: function(e) {
                    return "@import " + e.name + ";"
                },
                keyframe: function(e) {
                    return e.values.join(",") + "{" + n(e.declarations) + "}"
                },
                keyframes: function(e) {
                    return "@" + (e.vendor || "") + "keyframes " + e.name + "{" + n(e.keyframes) + "}"
                },
                media: function(e) {
                    return "@media " + e.media + "{" + n(e.rules) + "}"
                },
                namespace: function(e) {
                    return "@namespace " + e.name + ";"
                },
                page: function(e) {
                    return "@page " + (e.selectors.length ? e.selectors.join(", ") : "") + "{" + n(e.declarations) + "}"
                },
                rule: function(e) {
                    var t = e.declarations;
                    if (t.length) return e.selectors.join(",") + "{" + n(t) + "}"
                },
                supports: function(e) {
                    return "@supports " + e.supports + "{" + n(e.rules) + "}"
                }
            };

        function n(e) {
            for (var n = "", a = 0; a < e.length; a++) {
                var r = e[a];
                i && i(r);
                var o = s[r.type](r);
                o && (n += o, o.length && r.selectors && (n += t))
            }
            return n
        }
        return n(e.stylesheet.rules)
    }
    a.range = o;
    var h = "--",
        u = "var";

    function p(t) {
        var i = e({}, {
            preserveStatic: !0,
            preserveVars: !1,
            variables: {},
            onWarning: function() {}
        }, arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {});
        return "string" == typeof t && (t = l(t, i)),
            function e(t, i) {
                t.rules.forEach(function(s) {
                    s.rules ? e(s, i) : s.keyframes ? s.keyframes.forEach(function(e) {
                        "keyframe" === e.type && i(e.declarations, s)
                    }) : s.declarations && i(s.declarations, t)
                })
            }(t.stylesheet, function(e, t) {
                for (var s = 0; s < e.length; s++) {
                    var n = e[s],
                        a = n.type,
                        r = n.property,
                        o = n.value;
                    if ("declaration" === a)
                        if (i.preserveVars || !r || 0 !== r.indexOf(h)) {
                            if (-1 !== o.indexOf(u + "(")) {
                                var l = m(o, i);
                                l !== n.value && (l = f(l), i.preserveVars ? (e.splice(s, 0, {
                                    type: a,
                                    property: r,
                                    value: l
                                }), s++) : n.value = l)
                            }
                        } else e.splice(s, 1), s--
                }
            }), d(t)
    }

    function f(e) {
        return (e.match(/calc\(([^)]+)\)/g) || []).forEach(function(t) {
            var i = "calc".concat(t.split("calc").join(""));
            e = e.replace(t, i)
        }), e
    }

    function m(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
            i = arguments.length > 2 ? arguments[2] : void 0;
        if (-1 === e.indexOf("var(")) return e;
        var s = n("(", ")", e);
        return s ? "var" === s.pre.slice(-3) ? 0 === s.body.trim().length ? (t.onWarning("var() must contain a non-whitespace string"), e) : s.pre.slice(0, -3) + function(e) {
            var s = e.split(",")[0].replace(/[\s\n\t]/g, ""),
                n = (e.match(/(?:\s*,\s*){1}(.*)?/) || [])[1],
                a = Object.prototype.hasOwnProperty.call(t.variables, s) ? String(t.variables[s]) : void 0,
                r = a || (n ? String(n) : void 0),
                o = i || e;
            return a || t.onWarning('variable "'.concat(s, '" is undefined')), r && "undefined" !== r && r.length > 0 ? m(r, t, o) : "var(".concat(o, ")")
        }(s.body) + m(s.post, t) : s.pre + "(".concat(m(s.body, t), ")") + m(s.post, t) : (-1 !== e.indexOf("var(") && t.onWarning('missing closing ")" in the value "'.concat(e, '"')), e)
    }
    var v = "undefined" != typeof window,
        g = v && window.CSS && window.CSS.supports && window.CSS.supports("(--a: 0)"),
        b = {
            group: 0,
            job: 0
        },
        y = {
            rootElement: v ? document : null,
            shadowDOM: !1,
            include: "style,link[rel=stylesheet]",
            exclude: "",
            variables: {},
            onlyLegacy: !0,
            preserveStatic: !0,
            preserveVars: !1,
            silent: !1,
            updateDOM: !0,
            updateURLs: !0,
            watch: null,
            onBeforeSend: function() {},
            onWarning: function() {},
            onError: function() {},
            onSuccess: function() {},
            onComplete: function() {}
        },
        w = {
            cssComments: /\/\*[\s\S]+?\*\//g,
            cssKeyframes: /@(?:-\w*-)?keyframes/,
            cssMediaQueries: /@media[^{]+\{([\s\S]+?})\s*}/g,
            cssUrls: /url\((?!['"]?(?:data|http|\/\/):)['"]?([^'")]*)['"]?\)/g,
            cssVarDeclRules: /(?::(?:root|host)(?![.:#(])[\s,]*[^{]*{\s*[^}]*})/g,
            cssVarDecls: /(?:[\s;]*)(-{2}\w[\w-]*)(?:\s*:\s*)([^;]*);/g,
            cssVarFunc: /var\(\s*--[\w-]/,
            cssVars: /(?:(?::(?:root|host)(?![.:#(])[\s,]*[^{]*{\s*[^;]*;*\s*)|(?:var\(\s*))(--[^:)]+)(?:\s*[:)])/
        },
        x = {
            dom: {},
            job: {},
            user: {}
        },
        C = !1,
        S = null,
        E = 0,
        T = null,
        M = !1;

    function k() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            s = "cssVars(): ",
            n = e({}, y, t);

        function a(e, t, i, a) {
            !n.silent && window.console && console.error("".concat(s).concat(e, "\n"), t), n.onError(e, t, i, a)
        }

        function r(e) {
            !n.silent && window.console && console.warn("".concat(s).concat(e)), n.onWarning(e)
        }
        if (v) {
            if (n.watch) return n.watch = y.watch,
                function(e) {
                    function t(e) {
                        return "LINK" === e.tagName && -1 !== (e.getAttribute("rel") || "").indexOf("stylesheet") && !e.disabled
                    }
                    window.MutationObserver && (S && (S.disconnect(), S = null), (S = new MutationObserver(function(i) {
                        i.some(function(i) {
                            var s, n = !1;
                            return "attributes" === i.type ? n = t(i.target) : "childList" === i.type && (s = i.addedNodes, n = Array.apply(null, s).some(function(e) {
                                var i = 1 === e.nodeType && e.hasAttribute("data-cssvars"),
                                    s = function(e) {
                                        return "STYLE" === e.tagName && !e.disabled
                                    }(e) && w.cssVars.test(e.textContent);
                                return !i && (t(e) || s)
                            }) || function(t) {
                                return Array.apply(null, t).some(function(t) {
                                    var i = 1 === t.nodeType,
                                        s = i && "out" === t.getAttribute("data-cssvars"),
                                        n = i && "src" === t.getAttribute("data-cssvars"),
                                        a = n;
                                    if (n || s) {
                                        var r = t.getAttribute("data-cssvars-group"),
                                            o = e.rootElement.querySelector('[data-cssvars-group="'.concat(r, '"]'));
                                        n && (L(e.rootElement), x.dom = {}), o && o.parentNode.removeChild(o)
                                    }
                                    return a
                                })
                            }(i.removedNodes)), n
                        }) && k(e)
                    })).observe(document.documentElement, {
                        attributes: !0,
                        attributeFilter: ["disabled", "href"],
                        childList: !0,
                        subtree: !0
                    }))
                }(n), void k(n);
            if (!1 === n.watch && S && (S.disconnect(), S = null), !n.__benchmark) {
                if (C === n.rootElement) return void
                function(e) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 100;
                    clearTimeout(T), T = setTimeout(function() {
                        e.__benchmark = null, k(e)
                    }, t)
                }(t);
                if (n.__benchmark = $(), n.exclude = [S ? '[data-cssvars]:not([data-cssvars=""])' : '[data-cssvars="out"]', n.exclude].filter(function(e) {
                        return e
                    }).join(","), n.variables = function() {
                        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                            t = /^-{2}/;
                        return Object.keys(e).reduce(function(i, s) {
                            return i[t.test(s) ? s : "--".concat(s.replace(/^-+/, ""))] = e[s], i
                        }, {})
                    }(n.variables), !S && (Array.apply(null, n.rootElement.querySelectorAll('[data-cssvars="out"]')).forEach(function(e) {
                        var t = e.getAttribute("data-cssvars-group");
                        t && n.rootElement.querySelector('[data-cssvars="src"][data-cssvars-group="'.concat(t, '"]')) || e.parentNode.removeChild(e)
                    }), E)) {
                    var o = n.rootElement.querySelectorAll('[data-cssvars]:not([data-cssvars="out"])');
                    o.length < E && (E = o.length, x.dom = {})
                }
            }
            if ("loading" !== document.readyState)
                if (g && n.onlyLegacy) {
                    if (n.updateDOM) {
                        var h = n.rootElement.host || (n.rootElement === document ? document.documentElement : n.rootElement);
                        Object.keys(n.variables).forEach(function(e) {
                            h.style.setProperty(e, n.variables[e])
                        })
                    }
                } else !M && (n.shadowDOM || n.rootElement.shadowRoot || n.rootElement.host) ? i({
                    rootElement: y.rootElement,
                    include: y.include,
                    exclude: n.exclude,
                    onSuccess: function(e, t, i) {
                        return (e = ((e = e.replace(w.cssComments, "").replace(w.cssMediaQueries, "")).match(w.cssVarDeclRules) || []).join("")) || !1
                    },
                    onComplete: function(e, t, i) {
                        c(e, {
                            store: x.dom,
                            onWarning: r
                        }), M = !0, k(n)
                    }
                }) : (C = n.rootElement, i({
                    rootElement: n.rootElement,
                    include: n.include,
                    exclude: n.exclude,
                    onBeforeSend: n.onBeforeSend,
                    onError: function(e, t, i) {
                        var s = e.responseURL || P(i, location.href),
                            n = e.statusText ? "(".concat(e.statusText, ")") : "Unspecified Error" + (0 === e.status ? " (possibly CORS related)" : "");
                        a("CSS XHR Error: ".concat(s, " ").concat(e.status, " ").concat(n), t, e, s)
                    },
                    onSuccess: function(e, t, i) {
                        var s = n.onSuccess(e, t, i);
                        return e = void 0 !== s && !1 === Boolean(s) ? "" : s || e, n.updateURLs && (e = function(e, t) {
                            return (e.replace(w.cssComments, "").match(w.cssUrls) || []).forEach(function(i) {
                                var s = i.replace(w.cssUrls, "$1"),
                                    n = P(s, t);
                                e = e.replace(i, i.replace(s, n))
                            }), e
                        }(e, i)), e
                    },
                    onComplete: function(t, i) {
                        var s, o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : [],
                            h = {},
                            u = n.updateDOM ? x.dom : Object.keys(x.job).length ? x.job : x.job = JSON.parse(JSON.stringify(x.dom));
                        if (o.forEach(function(e, t) {
                                if (w.cssVars.test(i[t])) try {
                                    var s = l(i[t], {
                                        preserveStatic: n.preserveStatic,
                                        removeComments: !0
                                    });
                                    c(s, {
                                        parseHost: Boolean(n.rootElement.host),
                                        store: h,
                                        onWarning: r
                                    }), e.__cssVars = {
                                        tree: s
                                    }
                                } catch (t) {
                                    a(t.message, e)
                                }
                            }), n.updateDOM && e(x.user, n.variables), e(h, n.variables), s = Boolean((document.querySelector("[data-cssvars]") || Object.keys(x.dom).length) && Object.keys(h).some(function(e) {
                                return h[e] !== u[e]
                            })), e(u, x.user, h), s) L(n.rootElement), k(n);
                        else {
                            var f = [],
                                m = [],
                                v = !1;
                            if (x.job = {}, n.updateDOM && b.job++, o.forEach(function(t) {
                                    var i = !t.__cssVars;
                                    if (t.__cssVars) try {
                                        p(t.__cssVars.tree, e({}, n, {
                                            variables: u,
                                            onWarning: r
                                        }));
                                        var s = d(t.__cssVars.tree);
                                        if (n.updateDOM) {
                                            if (t.getAttribute("data-cssvars") || t.setAttribute("data-cssvars", "src"), s.length) {
                                                var o = t.getAttribute("data-cssvars-group") || ++b.group,
                                                    l = s.replace(/\s/g, ""),
                                                    c = n.rootElement.querySelector('[data-cssvars="out"][data-cssvars-group="'.concat(o, '"]')) || document.createElement("style");
                                                v = v || w.cssKeyframes.test(s), c.hasAttribute("data-cssvars") || c.setAttribute("data-cssvars", "out"), l === t.textContent.replace(/\s/g, "") ? (i = !0, c && c.parentNode && (t.removeAttribute("data-cssvars-group"), c.parentNode.removeChild(c))) : l !== c.textContent.replace(/\s/g, "") && ([t, c].forEach(function(e) {
                                                    e.setAttribute("data-cssvars-job", b.job), e.setAttribute("data-cssvars-group", o)
                                                }), c.textContent = s, f.push(s), m.push(c), c.parentNode || t.parentNode.insertBefore(c, t.nextSibling))
                                            }
                                        } else t.textContent.replace(/\s/g, "") !== s && f.push(s)
                                    } catch (e) {
                                        a(e.message, t)
                                    }
                                    i && t.setAttribute("data-cssvars", "skip"), t.hasAttribute("data-cssvars-job") || t.setAttribute("data-cssvars-job", b.job)
                                }), E = n.rootElement.querySelectorAll('[data-cssvars]:not([data-cssvars="out"])').length, n.shadowDOM)
                                for (var g, y = [n.rootElement].concat(function(e) {
                                        return function(e) {
                                            if (Array.isArray(e)) {
                                                for (var t = 0, i = new Array(e.length); t < e.length; t++) i[t] = e[t];
                                                return i
                                            }
                                        }(e) || function(e) {
                                            if (Symbol.iterator in Object(e) || "[object Arguments]" === Object.prototype.toString.call(e)) return Array.from(e)
                                        }(e) || function() {
                                            throw new TypeError("Invalid attempt to spread non-iterable instance")
                                        }()
                                    }(n.rootElement.querySelectorAll("*"))), S = 0; g = y[S]; ++S)
                                    if (g.shadowRoot && g.shadowRoot.querySelector("style")) {
                                        k(e({}, n, {
                                            rootElement: g.shadowRoot
                                        }))
                                    }
                            n.updateDOM && v && function(e) {
                                var t = ["animation-name", "-moz-animation-name", "-webkit-animation-name"].filter(function(e) {
                                    return getComputedStyle(document.body)[e]
                                })[0];
                                if (t) {
                                    for (var i = e.getElementsByTagName("*"), s = [], n = 0, a = i.length; n < a; n++) {
                                        var r = i[n];
                                        "none" !== getComputedStyle(r)[t] && (r.style[t] += "__CSSVARSPONYFILL-KEYFRAMES__", s.push(r))
                                    }
                                    document.body.offsetHeight;
                                    for (var o = 0, l = s.length; o < l; o++) {
                                        var c = s[o].style;
                                        c[t] = c[t].replace("__CSSVARSPONYFILL-KEYFRAMES__", "")
                                    }
                                }
                            }(n.rootElement), C = !1, n.onComplete(f.join(""), m, JSON.parse(JSON.stringify(u)), $() - n.__benchmark)
                        }
                    }
                }));
            else document.addEventListener("DOMContentLoaded", function e(i) {
                k(t), document.removeEventListener("DOMContentLoaded", e)
            })
        }
    }

    function P(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : location.href,
            i = document.implementation.createHTMLDocument(""),
            s = i.createElement("base"),
            n = i.createElement("a");
        return i.head.appendChild(s), i.body.appendChild(n), s.href = t, n.href = e, n.href
    }

    function $() {
        return v && (window.performance || {}).now ? window.performance.now() : (new Date).getTime()
    }

    function L(e) {
        Array.apply(null, e.querySelectorAll('[data-cssvars="skip"],[data-cssvars="src"]')).forEach(function(e) {
            return e.setAttribute("data-cssvars", "")
        })
    }
    return k.reset = function() {
        for (var e in C = !1, S && (S.disconnect(), S = null), E = 0, T = null, M = !1, x) x[e] = {}
    }, k
});