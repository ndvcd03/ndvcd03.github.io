/*!
 * Midnight.js 1.1.1
 * jQuery plugin to switch between multiple fixed header designs on the fly, so it looks in line with the content below it.
 * http://aerolab.github.io/midnight.js/
 *
 * Copyright (c) 2014 Aerolab <info@aerolab.co>
 *
 * Released under the MIT license
 * http://aerolab.github.io/midnight.js/LICENSE.txt
 */
! function(t) {
  "function" == typeof define && define.amd ? define(["jquery"], t) : t(jQuery)
}(function(t) {
  var e = 0,
    s = Array.prototype.slice;
  t.cleanData = function(e) {
    return function(s) {
      var i, n, o;
      for (o = 0; null != (n = s[o]); o++) try {
        i = t._data(n, "events"), i && i.remove && t(n).triggerHandler("remove")
      } catch (r) {}
      e(s)
    }
  }(t.cleanData), t.widget = function(e, s, i) {
    var n, o, r, a, h = {},
      d = e.split(".")[0];
    return e = e.split(".")[1], n = d + "-" + e, i || (i = s, s = t.Widget), t.expr[":"][n.toLowerCase()] = function(e) {
      return !!t.data(e, n)
    }, t[d] = t[d] || {}, o = t[d][e], r = t[d][e] = function(t, e) {
      return this._createWidget ? void(arguments.length && this._createWidget(t, e)) : new r(t, e)
    }, t.extend(r, o, {
      version: i.version,
      _proto: t.extend({}, i),
      _childConstructors: []
    }), a = new s, a.options = t.widget.extend({}, a.options), t.each(i, function(e, i) {
      return t.isFunction(i) ? void(h[e] = function() {
        var t = function() {
            return s.prototype[e].apply(this, arguments)
          },
          n = function(t) {
            return s.prototype[e].apply(this, t)
          };
        return function() {
          var e, s = this._super,
            o = this._superApply;
          return this._super = t, this._superApply = n, e = i.apply(this, arguments), this._super = s, this._superApply = o, e
        }
      }()) : void(h[e] = i)
    }), r.prototype = t.widget.extend(a, {
      widgetEventPrefix: o ? a.widgetEventPrefix || e : e
    }, h, {
      constructor: r,
      namespace: d,
      widgetName: e,
      widgetFullName: n
    }), o ? (t.each(o._childConstructors, function(e, s) {
      var i = s.prototype;
      t.widget(i.namespace + "." + i.widgetName, r, s._proto)
    }), delete o._childConstructors) : s._childConstructors.push(r), t.widget.bridge(e, r), r
  }, t.widget.extend = function(e) {
    for (var i, n, o = s.call(arguments, 1), r = 0, a = o.length; a > r; r++)
      for (i in o[r]) n = o[r][i], o[r].hasOwnProperty(i) && void 0 !== n && (e[i] = t.isPlainObject(n) ? t.isPlainObject(e[i]) ? t.widget.extend({}, e[i], n) : t.widget.extend({}, n) : n);
    return e
  }, t.widget.bridge = function(e, i) {
    var n = i.prototype.widgetFullName || e;
    t.fn[e] = function(o) {
      var r = "string" == typeof o,
        a = s.call(arguments, 1),
        h = this;
      return o = !r && a.length ? t.widget.extend.apply(null, [o].concat(a)) : o, r ? this.each(function() {
        var s, i = t.data(this, n);
        return "instance" === o ? (h = i, !1) : i ? t.isFunction(i[o]) && "_" !== o.charAt(0) ? (s = i[o].apply(i, a), s !== i && void 0 !== s ? (h = s && s.jquery ? h.pushStack(s.get()) : s, !1) : void 0) : t.error("no such method '" + o + "' for " + e + " widget instance") : t.error("cannot call methods on " + e + " prior to initialization; attempted to call method '" + o + "'")
      }) : this.each(function() {
        var e = t.data(this, n);
        e ? (e.option(o || {}), e._init && e._init()) : t.data(this, n, new i(o, this))
      }), h
    }
  }, t.Widget = function() {}, t.Widget._childConstructors = [], t.Widget.prototype = {
    widgetName: "widget",
    widgetEventPrefix: "",
    defaultElement: "<div>",
    options: {
      disabled: !1,
      create: null
    },
    _createWidget: function(s, i) {
      i = t(i || this.defaultElement || this)[0], this.element = t(i), this.uuid = e++, this.eventNamespace = "." + this.widgetName + this.uuid, this.bindings = t(), this.hoverable = t(), this.focusable = t(), i !== this && (t.data(i, this.widgetFullName, this), this._on(!0, this.element, {
        remove: function(t) {
          t.target === i && this.destroy()
        }
      }), this.document = t(i.style ? i.ownerDocument : i.document || i), this.window = t(this.document[0].defaultView || this.document[0].parentWindow)), this.options = t.widget.extend({}, this.options, this._getCreateOptions(), s), this._create(), this._trigger("create", null, this._getCreateEventData()), this._init()
    },
    _getCreateOptions: t.noop,
    _getCreateEventData: t.noop,
    _create: t.noop,
    _init: t.noop,
    destroy: function() {
      this._destroy(), this.element.unbind(this.eventNamespace).removeData(this.widgetFullName).removeData(t.camelCase(this.widgetFullName)), this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled ui-state-disabled"), this.bindings.unbind(this.eventNamespace), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")
    },
    _destroy: t.noop,
    widget: function() {
      return this.element
    },
    option: function(e, s) {
      var i, n, o, r = e;
      if (0 === arguments.length) return t.widget.extend({}, this.options);
      if ("string" == typeof e)
        if (r = {}, i = e.split("."), e = i.shift(), i.length) {
          for (n = r[e] = t.widget.extend({}, this.options[e]), o = 0; i.length - 1 > o; o++) n[i[o]] = n[i[o]] || {}, n = n[i[o]];
          if (e = i.pop(), 1 === arguments.length) return void 0 === n[e] ? null : n[e];
          n[e] = s
        } else {
          if (1 === arguments.length) return void 0 === this.options[e] ? null : this.options[e];
          r[e] = s
        } return this._setOptions(r), this
    },
    _setOptions: function(t) {
      var e;
      for (e in t) this._setOption(e, t[e]);
      return this
    },
    _setOption: function(t, e) {
      return this.options[t] = e, "disabled" === t && (this.widget().toggleClass(this.widgetFullName + "-disabled", !!e), e && (this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus"))), this
    },
    enable: function() {
      return this._setOptions({
        disabled: !1
      })
    },
    disable: function() {
      return this._setOptions({
        disabled: !0
      })
    },
    _on: function(e, s, i) {
      var n, o = this;
      "boolean" != typeof e && (i = s, s = e, e = !1), i ? (s = n = t(s), this.bindings = this.bindings.add(s)) : (i = s, s = this.element, n = this.widget()), t.each(i, function(i, r) {
        function a() {
          return e || o.options.disabled !== !0 && !t(this).hasClass("ui-state-disabled") ? ("string" == typeof r ? o[r] : r).apply(o, arguments) : void 0
        }
        "string" != typeof r && (a.guid = r.guid = r.guid || a.guid || t.guid++);
        var h = i.match(/^([\w:-]*)\s*(.*)$/),
          d = h[1] + o.eventNamespace,
          l = h[2];
        l ? n.delegate(l, d, a) : s.bind(d, a)
      })
    },
    _off: function(e, s) {
      s = (s || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, e.unbind(s).undelegate(s), this.bindings = t(this.bindings.not(e).get()), this.focusable = t(this.focusable.not(e).get()), this.hoverable = t(this.hoverable.not(e).get())
    },
    _delay: function(t, e) {
      function s() {
        return ("string" == typeof t ? i[t] : t).apply(i, arguments)
      }
      var i = this;
      return setTimeout(s, e || 0)
    },
    _hoverable: function(e) {
      this.hoverable = this.hoverable.add(e), this._on(e, {
        mouseenter: function(e) {
          t(e.currentTarget).addClass("ui-state-hover")
        },
        mouseleave: function(e) {
          t(e.currentTarget).removeClass("ui-state-hover")
        }
      })
    },
    _focusable: function(e) {
      this.focusable = this.focusable.add(e), this._on(e, {
        focusin: function(e) {
          t(e.currentTarget).addClass("ui-state-focus")
        },
        focusout: function(e) {
          t(e.currentTarget).removeClass("ui-state-focus")
        }
      })
    },
    _trigger: function(e, s, i) {
      var n, o, r = this.options[e];
      if (i = i || {}, s = t.Event(s), s.type = (e === this.widgetEventPrefix ? e : this.widgetEventPrefix + e).toLowerCase(), s.target = this.element[0], o = s.originalEvent)
        for (n in o) n in s || (s[n] = o[n]);
      return this.element.trigger(s, i), !(t.isFunction(r) && r.apply(this.element[0], [s].concat(i)) === !1 || s.isDefaultPrevented())
    }
  }, t.each({
    show: "fadeIn",
    hide: "fadeOut"
  }, function(e, s) {
    t.Widget.prototype["_" + e] = function(i, n, o) {
      "string" == typeof n && (n = {
        effect: n
      });
      var r, a = n ? n === !0 || "number" == typeof n ? s : n.effect || s : e;
      n = n || {}, "number" == typeof n && (n = {
        duration: n
      }), r = !t.isEmptyObject(n), n.complete = o, n.delay && i.delay(n.delay), r && t.effects && t.effects.effect[a] ? i[e](n) : a !== e && i[a] ? i[a](n.duration, n.easing, o) : i.queue(function(s) {
        t(this)[e](), o && o.call(i[0]), s()
      })
    }
  }), t.widget
}),
function(t) {
  "use strict";
  t.widget("aerolab.midnight", {
    options: {
      headerClass: "midnightHeader",
      innerClass: "midnightInner",
      defaultClass: "default",
      classPrefix: "",
      sectionSelector: "midnight"
    },
    _headers: {},
    _headerInfo: {
      top: 0,
      height: 0
    },
    _$sections: [],
    _sections: [],
    _scrollTop: 0,
    _documentHeight: 0,
    _transformMode: !1,
    refresh: function() {
      this._headerInfo = {
        top: 0,
        height: this.element.outerHeight()
      }, this._$sections = t("[data-" + this.options.sectionSelector + "]:not(:hidden)"), this._sections = [], this._setupHeaders(), this.recalculate()
    },
    _create: function() {
      var e = this;
      this._scrollTop = window.pageYOffset || document.documentElement.scrollTop, this._documentHeight = t(document).height(), this._headers = {}, this._transformMode = this._getSupportedTransform(), this.refresh(), setInterval(function() {
        e._recalculateSections()
      }, 1e3), e.recalculate(), t(window).resize(function() {
        e.recalculate()
      }), this._updateHeadersLoop()
    },
    recalculate: function() {
      this._recalculateSections(), this._updateHeaderHeight(), this._recalculateHeaders(), this._updateHeaders()
    },
    _getSupportedTransform: function() {
      for (var t = ["transform", "WebkitTransform", "MozTransform", "OTransform", "msTransform"], e = 0; e < t.length; e++)
        if (void 0 !== document.createElement("div").style[t[e]]) return t[e];
      return !1
    },
    _getContainerHeight: function() {
      var e = this.element.find("> ." + this.options.headerClass),
        s = 0,
        i = 0,
        n = this;
      return e.length ? e.each(function() {
        var e = t(this),
          o = e.find("> ." + n.options.innerClass);
        o.length ? (o.css("bottom", "auto").css("overflow", "auto"), i = o.outerHeight(), o.css("bottom", "0")) : (e.css("bottom", "auto"), i = e.outerHeight(), e.css("bottom", "0")), s = i > s ? i : s
      }) : s = i = this.element.outerHeight(), s
    },
    _setupHeaders: function() {
      var e = this;
      this._headers[this.options.defaultClass] = {};
      for (var s = 0; s < this._$sections.length; s++) {
        var i = t(this._$sections[s]),
          n = i.data(this.options.sectionSelector);
        "string" == typeof n && (n = n.trim(), "" !== n && (e._headers[n] = {}))
      }({
        top: this.element.css("padding-top"),
        right: this.element.css("padding-right"),
        bottom: this.element.css("padding-bottom"),
        left: this.element.css("padding-left")
      });
      this.element.css({
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        overflow: "hidden"
      }), this._updateHeaderHeight();
      var o = this.element.find("> ." + this.options.headerClass);
      o.length ? o.filter("." + this.options.defaultClass).length || o.filter("." + this.options.headerClass + ":first").clone(!0, !0).attr("class", this.options.headerClass + " " + this.options.defaultClass) : this.element.wrapInner('<div class="' + this.options.headerClass + " " + this.options.defaultClass + '"></div>');
      var o = this.element.find("> ." + this.options.headerClass),
        r = o.filter("." + this.options.defaultClass).clone(!0, !0);
      for (var n in this._headers)
        if (this._headers.hasOwnProperty(n) && "undefined" == typeof this._headers[n].element) {
          var a = o.filter("." + n);
          a.length ? this._headers[n].element = a : this._headers[n].element = r.clone(!0, !0).removeClass(this.options.defaultClass).addClass(n).appendTo(this.element);
          var h = {
            position: "absolute",
            overflow: "hidden",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
          };
          this._headers[n].element.css(h), this._transformMode !== !1 && this._headers[n].element.css(this._transformMode, "translateZ(0)"), this._headers[n].element.find("> ." + this.options.innerClass).length || this._headers[n].element.wrapInner('<div class="' + this.options.innerClass + '"></div>'), this._headers[n].inner = this._headers[n].element.find("> ." + this.options.innerClass), this._headers[n].inner.css(h), this._transformMode !== !1 && this._headers[n].inner.css(this._transformMode, "translateZ(0)"), this._headers[n].from = "", this._headers[n].progress = 0
        } o.each(function() {
        var s = t(this),
          i = !1;
        for (var n in e._headers) e._headers.hasOwnProperty(n) && s.hasClass(n) && (i = !0);
        s.find("> ." + e.options.innerClass).length || s.wrapInner('<div class="' + e.options.innerClass + '"></div>'), i ? s.show() : s.hide()
      })
    },
    _recalculateHeaders: function() {
      this._scrollTop = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop, this._scrollTop = Math.max(this._scrollTop, 0), this._scrollTop = Math.min(this._scrollTop, this._documentHeight);
      var t = this._headerInfo.height,
        e = this._scrollTop + this._headerInfo.top,
        s = e + t;
      if ("function" == typeof window.getComputedStyle) {
        var i = window.getComputedStyle(this.element[0], null),
          n = 0,
          o = 0;
        if (this._transformMode !== !1 && "string" == typeof i.transform) {
          var r = i.transform.match(/(-?[0-9\.]+)/g);
          null !== r && r.length >= 6 && !isNaN(parseFloat(r[5])) && (o = parseFloat(r[5]))
        }
        i.top.indexOf("px") >= 0 && !isNaN(parseFloat(i.top)) && (n = parseFloat(i.top)), e += n + o, s += n + o
      }
      for (var a in this._headers) this._headers.hasOwnProperty(a) && (this._headers[a].from = "", this._headers[a].progress = 0);
      for (var h = 0; h < this._sections.length; h++) s >= this._sections[h].start && e <= this._sections[h].end && (this._headers[this._sections[h].className].visible = !0, e >= this._sections[h].start && s <= this._sections[h].end ? (this._headers[this._sections[h].className].from = "top", this._headers[this._sections[h].className].progress += 1) : s > this._sections[h].end && e < this._sections[h].end ? (this._headers[this._sections[h].className].from = "top", this._headers[this._sections[h].className].progress = 1 - (s - this._sections[h].end) / t) : s > this._sections[h].start && e < this._sections[h].start && ("top" === this._headers[this._sections[h].className].from ? this._headers[this._sections[h].className].progress += (s - this._sections[h].start) / t : (this._headers[this._sections[h].className].from = "bottom", this._headers[this._sections[h].className].progress = (s - this._sections[h].start) / t)))
    },
    _updateHeaders: function() {
      if ("undefined" != typeof this._headers[this.options.defaultClass]) {
        var t = 0,
          e = "";
        for (var s in this._headers) this._headers.hasOwnProperty(s) && "" !== !this._headers[s].from && (t += this._headers[s].progress, e = s);
        t < 1 && ("" === this._headers[this.options.defaultClass].from ? (this._headers[this.options.defaultClass].from = "top" === this._headers[e].from ? "bottom" : "top", this._headers[this.options.defaultClass].progress = 1 - t) : this._headers[this.options.defaultClass].progress += 1 - t);
        for (var i in this._headers)
          if (this._headers.hasOwnProperty(i) && "" !== !this._headers[i].from) {
            var n = 100 * (1 - this._headers[i].progress);
            n >= 100 && (n = 110), n <= -100 && (n = -110), "top" === this._headers[i].from ? this._transformMode !== !1 ? (this._headers[i].element[0].style[this._transformMode] = "translateY(-" + n + "%) translateZ(0)", this._headers[i].inner[0].style[this._transformMode] = "translateY(+" + n + "%) translateZ(0)") : (this._headers[i].element[0].style.top = "-" + n + "%", this._headers[i].inner[0].style.top = "+" + n + "%") : this._transformMode !== !1 ? (this._headers[i].element[0].style[this._transformMode] = "translateY(+" + n + "%) translateZ(0)", this._headers[i].inner[0].style[this._transformMode] = "translateY(-" + n + "%) translateZ(0)") : (this._headers[i].element[0].style.top = "+" + n + "%", this._headers[i].inner[0].style.top = "-" + n + "%")
          }
      }
    },
    _recalculateSections: function() {
      this._documentHeight = t(document).height(), this._sections = [];
      for (var e = 0; e < this._$sections.length; e++) {
        var s = t(this._$sections[e]);
        this._sections.push({
          element: s,
          className: s.data(this.options.sectionSelector),
          start: s.offset().top,
          end: s.offset().top + s.outerHeight()
        })
      }
    },
    _updateHeaderHeight: function() {
      this._headerInfo.height = this._getContainerHeight(), this.element.css("height", this._headerInfo.height + "px")
    },
    _updateHeadersLoop: function() {
      var t = this;
      this._requestAnimationFrame(function() {
        t._updateHeadersLoop()
      }), this._recalculateHeaders(), this._updateHeaders()
    },
    _requestAnimationFrame: function(t) {
      var e = e || function() {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(t) {
          window.setTimeout(t, 1e3 / 60)
        }
      }();
      e(t)
    }
  })
}(jQuery);
