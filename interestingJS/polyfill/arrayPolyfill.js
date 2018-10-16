"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var arrayPolyfill = (function () {
    function arrayPolyfill() {
    }
    arrayPolyfill.prototype.from = function () {
        if (!Array.from) {
            Array.from = (function () {
                var toStr = Object.prototype.toString;
                var isCallable = function (fn) {
                    return (typeof fn === 'function' || toStr.call(fn) === '[object Function]');
                };
                var toInteger = function (value) {
                    var number = Number(value);
                    if (isNaN(number)) {
                        return 0;
                    }
                    if (number === 0 || !isFinite(number)) {
                        return number;
                    }
                    return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
                };
                var maxSageInteger = Math.pow(2, 53) - 1;
                var toLength = function (value) {
                    var len = toInteger(value);
                    return Math.min(Math.max(len, 0), maxSageInteger);
                };
                return function from(arrayLike) {
                    var _that = this;
                    var items = Object(arrayLike);
                    if (arrayLike === null) {
                        throw new TypeError('Array.from requires an array-like object - not null or undefined');
                    }
                    var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
                    var T;
                    if (typeof mapFn !== 'undefined') {
                        if (!isCallable(mapFn)) {
                            throw new TypeError('Array.from: when provided, the second argument must be a function');
                        }
                        if (arguments.length > 2) {
                            T = arguments[2];
                        }
                    }
                    var len = toLength(items.length);
                    var result = isCallable(_that)
                        ? Object(new _that(len))
                        : new Array(len);
                    var k = 0;
                    var kValue;
                    while (k < len) {
                        kValue = items[k];
                        if (mapFn) {
                            result[k] =
                                typeof T === 'undefined'
                                    ? mapFn(kValue, k)
                                    : mapFn.call(T, kValue, k);
                        }
                        else {
                            result[k] = kValue;
                        }
                        k += 1;
                    }
                    result.length = len;
                    return result;
                };
            })();
        }
    };
    arrayPolyfill.prototype.findIndex = function () {
        if (!Array.prototype.findIndex) {
            Object.defineProperty(Array.prototype, 'findIndex', {
                value: function (predicate) {
                    if (this == null) {
                        throw new TypeError('"this" is null or undefined');
                    }
                    var o = Object(this);
                    var len = o.length >>> 0;
                    if (typeof predicate !== 'function') {
                        throw new TypeError('predicate must be a function');
                    }
                    var thisArg = arguments[1];
                    var k = 0;
                    while (k < len) {
                        var kValue = o[k];
                        if (predicate.call(thisArg, kValue, k, o)) {
                            return k;
                        }
                        k++;
                    }
                    return -1;
                }
            });
        }
    };
    arrayPolyfill.prototype.filter = function () {
        if (!Array.prototype.filter) {
            Object.defineProperty(Array.prototype, 'filter', {
                value: function (fun) {
                    if (this === void 0 || this === null) {
                        throw new TypeError();
                    }
                    var t = Object(this);
                    var len = t.length >>> 0;
                    if (typeof fun !== 'function') {
                        throw new TypeError();
                    }
                    var res = [];
                    var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
                    for (var i = 0; i < len; i++) {
                        if (i in t) {
                            var val = t[i];
                            if (fun.call(thisArg, val, i, t)) {
                                res.push(val);
                            }
                        }
                    }
                    return res;
                }
            });
        }
    };
    return arrayPolyfill;
}());
exports.default = arrayPolyfill;
//# sourceMappingURL=arrayPolyfill.js.map