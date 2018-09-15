"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Browser = (function () {
    function Browser() {
    }
    Browser.prototype.arrayToHtmlList = function (arr, listID) {
        arr.map(function (item) {
            return (document.querySelector('#' + listID).innerHTML += "<li>" + item + "</li>");
        });
    };
    Browser.prototype.bottomVisible = function () {
        return (document.documentElement.clientHeight + window.scrollY >=
            (document.documentElement.scrollHeight ||
                document.documentElement.clientHeight));
    };
    Browser.prototype.clipToClipboard = function (str) {
        var el = document.createElement('textarea');
        el.value = str;
        el.setAttribute('readonly', '');
        el.style.position = 'absolute';
        el.style.left = '-9999px';
        document.body.appendChild(el);
        var selected = document.getSelection().rangeCount > 0
            ? document.getSelection().getRangeAt(0)
            : false;
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        if (selected) {
            document.getSelection().removeAllRanges();
            document.getSelection().addRange(selected);
        }
    };
    Browser.prototype.createElement = function (str) {
        var el = document.createElement('div');
        el.innerHTML = str;
        return el.firstElementChild;
    };
    Browser.prototype.createEventHub = function () {
        return {
            hub: Object.create(null),
            emit: function (event, data) {
                ;
                (this.hub[event] || []).forEach(function (handler) {
                    return handler(data);
                });
            },
            on: function (event, handler) {
                if (!this.hub[event]) {
                    this.hub[event] = [];
                }
                this.hub[event].push(handler);
            },
            off: function (event, handler) {
                var i = (this.hub[event] || []).findIndex(function (h) { return h === handler; });
                if (i > -1) {
                    this.hub[event].splice(i, 1);
                }
            }
        };
    };
    Browser.prototype.currentURL = function () {
        return window.location.href;
    };
    Browser.prototype.detectDeviceType = function () {
        return /Android|webOS|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
            ? 'Mobile'
            : 'Desktop';
    };
    Browser.prototype.elementIsVisibleInViewport = function (el, partiallyVisible) {
        if (partiallyVisible === void 0) { partiallyVisible = false; }
        var _a = el.getBoundingClientRect(), top = _a.top, left = _a.left, bottom = _a.bottom, right = _a.right;
        var innerHeight = window.innerHeight, innerWidth = window.innerWidth;
        return partiallyVisible
            ? ((top > 0 && top < innerHeight) ||
                (bottom > 0 && bottom < innerHeight)) &&
                ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth))
            : top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth;
    };
    Browser.prototype.getStyle = function (el, ruleName) {
        return getComputedStyle(el)[ruleName];
    };
    Browser.prototype.hasClass = function (el, className) {
        return el.classList.contains(className);
    };
    Browser.prototype.hide = function () {
        var el = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            el[_i] = arguments[_i];
        }
        return __spread(el).forEach(function (e) { return (e.style.display = 'none'); });
    };
    Browser.prototype.httpsRedirect = function () {
        if (location.protocol !== 'https:') {
            location.replace('https://' + location.href.split('//')[1]);
        }
    };
    Browser.prototype.off = function (el, evt, eventFn, opts) {
        if (opts === void 0) { opts = false; }
        el.removeEventListener(evt, eventFn, opts);
    };
    Browser.prototype.on = function (el, evt, eventFn, opts) {
        var delegatorFn = function (e) {
            return Element.prototype.matches.call(e.target, opts && opts.target) &&
                eventFn.call(e.target, e);
        };
        el.addEventListener(evt, opts && opts.target ? delegatorFn : eventFn, (opts && opts.options) || false);
        if (opts && opts.target) {
            return delegatorFn;
        }
    };
    Browser.prototype.redirect = function (url, asLink) {
        if (asLink === void 0) { asLink = true; }
        asLink ? (window.location.href = url) : window.location.replace(url);
    };
    Browser.prototype.runAsync = function (asyncFn) {
        var blob = "var fn = " + asyncFn.toString() + "; postMessage(asyncFn());";
        var worker = new Worker(URL.createObjectURL(new Blob([blob])));
        return new Promise(function (res, rej) {
            worker.onmessage = function (_a) {
                var data = _a.data;
                res(data);
                worker.terminate();
            };
            worker.onerror = function (err) {
                rej(err);
                worker.terminate();
            };
        });
    };
    Browser.prototype.scrollToTop = function () {
        var c = document.documentElement.scrollTop || document.body.scrollTop;
        if (c > 0) {
            window.requestAnimationFrame(this.scrollToTop);
            window.scrollTo(0, c - c / 8);
        }
    };
    Browser.prototype.setStyle = function (el, ruleName, val) {
        el.style[ruleName] = val;
    };
    Browser.prototype.show = function () {
        var el = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            el[_i] = arguments[_i];
        }
        ;
        __spread(el).forEach(function (e) { return (e.style.display = ''); });
    };
    Browser.prototype.toggleClass = function (el, className) {
        el.classList.toggle(className);
    };
    Browser.prototype.UUIDGeneratorBrowser = function () {
    };
    return Browser;
}());
exports.default = Browser;
var browserTip = new Browser();
var handlerFn = function (data) { return console.log(data); };
var hub = browserTip.createEventHub();
hub.on('message', handlerFn);
hub.on('message', function () { return console.log('Message event fired'); });
hub.emit('message', 'hello world');
hub.off('message', handlerFn);
hub.emit('message', '');
var fn = function () { return console.log('!'); };
browserTip.on(document.body, 'click', fn);
browserTip.on(document.body, 'click', fn, { target: 'p' });
browserTip.on(document.body, 'click', fn, { options: true });
//# sourceMappingURL=browserTips.js.map