! function(n) {
    "use strict";
    VLTJS.animatedBlock = {
        init: function() {
            n(".vlt-animated-block").each(function() {
                var t = n(this);
                VLTJS.window.on("vlt.change-slide", function() {
                    t.removeClass("animated"), t.parents(".vlt-section").hasClass("active") && t.addClass("animated")
                })
            })
        }
    }, VLTJS.animatedBlock.init()
}(jQuery),
function(n) {
    "use strict";
    VLTJS.contactForm = {
        init: function() {
            void 0 !== n.fn.validate && n(".vlt-contact-form").each(function() {
                var t = n(this),
                    e = t.find(".message.success"),
                    i = t.find(".message.danger");
                t.validate({
                    errorClass: "error",
                    submitHandler: function(t) {
                        n.ajax({
                            type: "POST",
                            url: "handler.php",
                            data: new FormData(t),
                            cache: !1,
                            contentType: !1,
                            processData: !1,
                            success: function() {
                                e.fadeIn(), setTimeout(function() {
                                    e.fadeOut()
                                }, 5e3)
                            },
                            error: function() {
                                i.fadeIn(), setTimeout(function() {
                                    i.fadeOut()
                                }, 5e3)
                            }
                        })
                    }
                })
            })
        }
    }, VLTJS.contactForm.init()
}(jQuery),
function(n) {
    "use strict";
    VLTJS.counterUp = {
        init: function() {
            void 0 !== n.fn.numerator && n(".vlt-counter-up, .vlt-counter-up-small").each(function() {
                var t = n(this),
                    e = t.data("animation-speed") || 1e3,
                    i = t.data("ending-number") || 0,
                    a = t.data("delimiter") || !1;
                VLTJS.window.on("vlt.change-slide", function() {
                    if (t.parents(".vlt-section").hasClass("active")) {
                        var n = t.find(".counter").html("0");
                        setTimeout(function() {
                            n.numerator({
                                easing: "linear",
                                duration: e,
                                delimiter: a,
                                toValue: i
                            })
                        }, 500)
                    }
                })
            })
        }
    }, VLTJS.counterUp.init()
}(jQuery),
function(n) {
    "use strict";
    VLTJS.customCursor = {
        init: function() {
            if (n(".vlt-is--custom-cursor").length) {
                VLTJS.body.append('<div class="vlt-custom-cursor"><div class="circle"><span></span></div></div>');
                var t = n(".vlt-custom-cursor").find(".circle"),
                    e = {
                        x: 0,
                        y: 0
                    },
                    i = {
                        x: 0,
                        y: 0
                    };
                "undefined" != typeof gsap && (gsap.set(t, {
                    xPercent: -50,
                    yPercent: -50
                }), VLTJS.document.on("mousemove", function(n) {
                    var t = window.pageYOffset || document.documentElement.scrollTop;
                    e.x = n.pageX, e.y = n.pageY - t
                }), gsap.ticker.add(function() {
                    i.x += .25 * (e.x - i.x), i.y += .25 * (e.y - i.y), gsap.set(t, {
                        x: i.x,
                        y: i.y
                    })
                }), VLTJS.document.on("mousedown", function() {
                    gsap.to(t, .3, {
                        scale: .7
                    })
                }).on("mouseup", function() {
                    gsap.to(t, .3, {
                        scale: 1
                    })
                }), VLTJS.document.on("mouseenter", "input, textarea, select, .vlt-video-button > a", function() {
                    gsap.to(t, .3, {
                        scale: 0,
                        opacity: 0
                    })
                }).on("mouseleave", "input, textarea, select, .vlt-video-button > a", function() {
                    gsap.to(t, .3, {
                        scale: 1,
                        opacity: .1
                    })
                }), VLTJS.document.on("mouseenter", 'a, button, [role="button"]', function() {
                    gsap.to(t, .3, {
                        height: 60,
                        width: 60
                    })
                }).on("mouseleave blur", 'a, button, [role="button"]', function() {
                    gsap.to(t, .3, {
                        height: 15,
                        width: 15
                    })
                }), VLTJS.document.on("mouseenter", "[data-cursor]", function() {
                    var e = n(this);
                    gsap.to(t, .3, {
                        height: 80,
                        width: 80,
                        opacity: 1,
                        onStart: function() {
                            t.find("span").html(e.attr("data-cursor"))
                        }
                    })
                }).on("mouseleave", "[data-cursor]", function() {
                    gsap.to(t, .3, {
                        height: 15,
                        width: 15,
                        opacity: .1,
                        onStart: function() {
                            t.find("span").html("")
                        }
                    })
                }))
            }
        }
    }, VLTJS.isMobile.any() || VLTJS.customCursor.init()
}(jQuery),
function(n) {
    "use strict";
    VLTJS.fullpageSlider = {
        init: function() {
            if (void 0 !== n.fn.pagepiling) {
                var t = n(".vlt-fullpage-slider"),
                    e = t.find(".vlt-fullpage-slider-progress-bar"),
                    i = t.find(".vlt-fullpage-slider-numbers"),
                    a = !!t.data("loop-top"),
                    o = !!t.data("loop-bottom"),
                    s = t.data("speed") || 800,
                    l = [];
                VLTJS.body.css("overflow", "hidden"), VLTJS.html.css("overflow", "hidden"), t.find("[data-anchor]").each(function() {
                    l.push(n(this).data("anchor"))
                }), r(), t.pagepiling({
                    menu: ".vlt-offcanvas-menu ul.sf-menu, .vlt-fullpage-slider-progress-bar",
                    scrollingSpeed: s,
                    loopTop: a,
                    loopBottom: o,
                    anchors: l,
                    sectionSelector: ".vlt-section",
                    navigation: !1,
                    afterRender: function() {
                        e.find("li:first-child").addClass("active").end().addClass("is-show"), c(), u(), VLTJS.window.trigger("vlt.change-slide")
                    },
                    onLeave: function(n, t, i) {
                        c(),
                            function(n, t) {
                                switch (i) {
                                    case "down":
                                        e.find("li:nth-child(" + t + ")").prevAll().addClass("prev");
                                        break;
                                    case "up":
                                        e.find("li:nth-child(" + t + ")").removeClass("prev")
                                }
                            }(0, t), u(), VLTJS.window.trigger("vlt.change-slide")
                    },
                    afterLoad: function(n, t) {
                        e.find("li.active").prevAll().addClass("prev"), r()
                    }
                }), i.on("click", ">a", function(t) {
                    t.preventDefault(), n.fn.pagepiling.moveSectionDown()
                }), t.find(".pp-scrollable").on("scroll", function() {
                    n(this).scrollTop() > 0 ? n(".vlt-navbar").addClass("vlt-navbar--solid") : n(".vlt-navbar").removeClass("vlt-navbar--solid")
                })
            }

            function r() {
                t.find(".pp-section.active").scrollTop() > 0 ? n(".vlt-navbar").addClass("vlt-navbar--solid") : n(".vlt-navbar").removeClass("vlt-navbar--solid")
            }

            function c() {
                switch (t.find(".vlt-section.active").data("brightness")) {
                    case "light":
                        VLTJS.html.removeClass("is-light").addClass("is-dark");
                        break;
                    case "dark":
                        VLTJS.html.removeClass("is-dark").addClass("is-light")
                }
            }

            function u() {
                var n = t.find(".vlt-section.active").index();
                0 == n ? i.html('<a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg></a>') : i.html(VLTJS.addLedingZero(n + 1))
            }
        }
    }, VLTJS.fullpageSlider.init()
}(jQuery),
function(n) {
    "use strict";
    var t = !1;
    VLTJS.menuOffcanvas = {
        config: {
            easing: "power2.out"
        },
        init: function() {
            var e = n(".vlt-offcanvas-menu"),
                i = e.find("ul.sf-menu"),
                a = i.find("> li"),
                o = n(".vlt-offcanvas-menu__header"),
                s = n(".vlt-offcanvas-menu__footer > div"),
                l = n(".js-offcanvas-menu-open"),
                r = n(".js-offcanvas-menu-close"),
                c = n(".vlt-site-overlay");
            void 0 !== n.fn.superclick && i.superclick({
                delay: 300,
                cssArrows: !1,
                animation: {
                    opacity: "show",
                    height: "show"
                },
                animationOut: {
                    opacity: "hide",
                    height: "hide"
                }
            }), l.on("click", function(n) {
                n.preventDefault(), t || VLTJS.menuOffcanvas.open_menu(e, c, a, o, s)
            }), r.on("click", function(n) {
                n.preventDefault(), t && VLTJS.menuOffcanvas.close_menu(e, c, a, o, s)
            }), c.on("click", function(n) {
                n.preventDefault(), t && VLTJS.menuOffcanvas.close_menu(e, c, a, o, s)
            }), VLTJS.document.keyup(function(n) {
                27 === n.keyCode && t && (n.preventDefault(), VLTJS.menuOffcanvas.close_menu(e, c, a, o, s))
            }), a.filter("[data-menuanchor]").on("click", "a", function() {
                t && VLTJS.menuOffcanvas.close_menu(e, c, a, o, s)
            })
        },
        open_menu: function(n, e, i, a, o) {
            t = !0, "undefined" != typeof gsap && gsap.timeline({
                defaults: {
                    ease: this.config.easing
                }
            }).set(VLTJS.html, {
                overflow: "hidden"
            }).to(e, .3, {
                autoAlpha: 1
            }).fromTo(n, .6, {
                x: "100%"
            }, {
                x: 0,
                visibility: "visible"
            }, "-=.3").fromTo(a, .3, {
                x: 50,
                autoAlpha: 0
            }, {
                x: 0,
                autoAlpha: 1
            }, "-=.3").fromTo(i, .3, {
                x: 50,
                autoAlpha: 0
            }, {
                x: 0,
                autoAlpha: 1,
                stagger: {
                    each: .1,
                    from: "start"
                }
            }, "-=.15").fromTo(o, .3, {
                x: 50,
                autoAlpha: 0
            }, {
                x: 0,
                autoAlpha: 1,
                stagger: {
                    each: .1,
                    from: "start"
                }
            }, "-=.15")
        },
        close_menu: function(n, e, i, a, o) {
            t = !1, "undefined" != typeof gsap && gsap.timeline({
                defaults: {
                    ease: this.config.easing
                }
            }).set(VLTJS.html, {
                overflow: "inherit"
            }).to(o, .3, {
                x: 50,
                autoAlpha: 0,
                stagger: {
                    each: .1,
                    from: "end"
                }
            }).to(i, .3, {
                x: 50,
                autoAlpha: 0,
                stagger: {
                    each: .1,
                    from: "end"
                }
            }, "-=.15").to(a, .3, {
                x: 50,
                autoAlpha: 0
            }, "-=.15").to(n, .6, {
                x: "100%"
            }, "-=.15").set(n, {
                visibility: "hidden"
            }).to(e, .3, {
                autoAlpha: 0
            }, "-=.6")
        }
    }, VLTJS.menuOffcanvas.init()
}(jQuery),
function(n) {
    "use strict";
    "function" == typeof FastClick && FastClick.attach(document.body)
}(jQuery),
function(n) {
    "use strict";
    if (void 0 !== n.fn.animsition) {
        var t = n(".animsition");
        t.animsition({
            inDuration: 500,
            outDuration: 500,
            linkElement: 'a:not([target="_blank"]):not([href^="#"]):not([rel="nofollow"]):not([href~="#"]):not([href^=mailto]):not([href^=tel]):not(.sf-with-ul)',
            loadingClass: "animsition-loading-2",
            loadingInner: '<div class="spinner"><span class="double-bounce-one"></span><span class="double-bounce-two"></span></div>'
        }), t.on("animsition.inEnd", function() {
            VLTJS.window.trigger("vlt.preloader_done"), VLTJS.html.addClass("vlt-is-page-loaded")
        })
    }
}(jQuery),
function(n) {
    "use strict";
    VLTJS.progressBar = {
        init: function() {
            "undefined" != typeof gsap && n(".vlt-progress-bar").each(function() {
                var t = n(this),
                    e = t.data("final-value") || 0,
                    i = t.data("animation-speed") || 0,
                    a = {
                        count: 0
                    };
                VLTJS.window.on("vlt.change-slide", function() {
                    t.parents(".vlt-section").hasClass("active") && (a.count = 0, t.find(".vlt-progress-bar__title > .counter").text(Math.round(a.count)), gsap.set(t.find(".vlt-progress-bar__bar > span"), {
                        width: 0
                    }), gsap.to(a, i / 1e3 / 2, {
                        count: e,
                        delay: .5,
                        onUpdate: function() {
                            t.find(".vlt-progress-bar__title > .counter").text(Math.round(a.count))
                        }
                    }), gsap.to(t.find(".vlt-progress-bar__bar > span"), i / 1e3, {
                        width: e + "%",
                        delay: .5
                    }))
                })
            })
        }
    }, VLTJS.progressBar.init()
}(jQuery),
function(n) {
    "use strict";
    VLTJS.timelineSlider = {
        init: function() {
            "undefined" != typeof Swiper && n(".vlt-timeline-slider .swiper-container").each(function() {
                n(this).find(".swiper-wrapper > *").wrap('<div class="swiper-slide">'), new Swiper(this, {
                    speed: 1e3,
                    spaceBetween: 0,
                    grabCursor: !0,
                    slidesPerView: 1,
                    navigation: {
                        nextEl: n(".vlt-timeline-slider-controls .next"),
                        prevEl: n(".vlt-timeline-slider-controls .prev")
                    },
                    pagination: {
                        el: n(".vlt-timeline-slider-controls .pagination"),
                        clickable: !1,
                        type: "fraction",
                        renderFraction: function(n, t) {
                            return '<span class="' + n + '"></span><span class="sep">/</span><span class="' + t + '"></span>'
                        }
                    }
                })
            })
        }
    }, VLTJS.timelineSlider.init()
}(jQuery);