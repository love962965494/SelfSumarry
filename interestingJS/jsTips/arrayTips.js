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
var ArrayTips = (function () {
    function ArrayTips() {
    }
    ArrayTips.prototype.chunk = function (arr, size) {
        return Array.from({ length: Math.ceil(arr.length / size) }, function (v, i) {
            return arr.slice(i * size, i * size + size);
        });
    };
    ArrayTips.prototype.compact = function (arr) {
        return arr.filter(Boolean);
    };
    ArrayTips.prototype.countBy = function (arr, fn) {
        return arr
            .map(typeof fn === 'function' ? fn : function (val) { return val[fn]; })
            .reduce(function (acc, val, i) {
            acc[val] = (acc[val] || 0) + 1;
            return acc;
        }, {});
    };
    ArrayTips.prototype.countOccurrences = function (arr, val) {
        return arr.reduce(function (a, v) { return (v === val ? a + 1 : a + 0); }, 0);
    };
    ArrayTips.prototype.deepFlatten = function (arr) {
        var _this = this;
        return [].concat.apply([], __spread(arr.map(function (v) { return (Array.isArray(v) ? _this.deepFlatten(v) : v); })));
    };
    ArrayTips.prototype.difference = function (arr1, arr2) {
        var s = new Set(arr2);
        return arr1.filter(function (x) { return !s.has(x); });
    };
    ArrayTips.prototype.differenceWith = function (arr, val, comp) {
        return arr.filter(function (a) { return val.findIndex(function (b) { return comp(a, b); }) === -1; });
    };
    ArrayTips.prototype.distinctValuesOfArray = function (arr) {
        return __spread(new Set(arr));
    };
    ArrayTips.prototype.dropElements = function (arr, func) {
        while (arr.length > 0 && !func(arr[0])) {
            arr = arr.slice(1);
        }
        return arr;
    };
    ArrayTips.prototype.dropRight = function (arr, n) {
        if (n === void 0) { n = 1; }
        return arr.slice(0, -n);
    };
    ArrayTips.prototype.everyNth = function (arr, nth) {
        return arr.filter(function (v, i) { return i % nth === nth - 1; });
    };
    ArrayTips.prototype.filterNonUnique = function (arr) {
        return arr.filter(function (i) { return arr.indexOf(i) === arr.lastIndexOf(i); });
    };
    ArrayTips.prototype.findLast = function (arr, fn) {
        return arr.filter(fn).slice(-1);
    };
    ArrayTips.prototype.flatten = function (arr, depth) {
        var _this = this;
        if (depth === void 0) { depth = 1; }
        return depth !== 1
            ? arr.reduce(function (a, v) { return a.concat(Array.isArray(v) ? _this.flatten(v, depth - 1) : v); }, [])
            : arr.reduce(function (a, v) { return a.concat(v); }, []);
    };
    ArrayTips.prototype.forEachRight = function (arr, callback) {
        return arr
            .slice(0)
            .reverse()
            .forEach(callback);
    };
    ArrayTips.prototype.groupBy = function (arr, fn) {
        return arr
            .map(typeof fn === 'function' ? fn : function (val) { return val[fn]; })
            .reduce(function (acc, val, i) {
            acc[val] = (acc[val] || []).concat(arr[i]);
            return acc;
        }, {});
    };
    ArrayTips.prototype.head = function (arr) {
        return arr[0];
    };
    ArrayTips.prototype.indexOfAll = function (arr, val) {
        var indices = [];
        arr.forEach(function (el, i) { return el === val && indices.push(i); });
        return indices;
    };
    ArrayTips.prototype.initial = function (arr) {
        return arr.slice(0, -1);
    };
    ArrayTips.prototype.initialize2DArray = function (w, h, val) {
        if (val === void 0) { val = null; }
        Array.from({ length: h }).map(function () { return Array.from({ length: w }).fill(val); });
    };
    return ArrayTips;
}());
exports.default = ArrayTips;
var arrayTips = new ArrayTips();
console.log('chunkL: ', arrayTips.chunk([1, 2, 3, 4, 5], 2));
console.log('compact: ', arrayTips.compact([0, 1, false, 2, '', 3, 'a', NaN, 's', 34]));
console.log('countBy: ', arrayTips.countBy([6.1, 4.2, 6.3], Math.floor));
console.log('countBy: ', arrayTips.countBy(['one', 'two', 'three'], 'length'));
console.log('countOccurrences: ', arrayTips.countOccurrences([1, 2, 1, 1, 2, 3, 1], 1));
console.log('deepFlatten: ', arrayTips.deepFlatten([1, [2], [[3], 4, 5]]));
console.log('difference: ', arrayTips.difference([1, 2, 3], [2, 4, 5]));
console.log('differenceWith: ', arrayTips.differenceWith([1, 1.2, 1.5, 3, 0], [1.9, 3, 0], function (a, b) { return Math.round(a) === Math.round(b); }));
console.log('distinctValuesOfArray: ', arrayTips.distinctValuesOfArray([1, 2, 2, 3, 4, 3, 5]));
console.log('dropElements: ', arrayTips.dropElements([1, 2, 3, 4], function (n) { return n >= 3; }));
console.log('dropRight: ', arrayTips.dropRight([1, 2, 3, 4], 1));
console.log('everyNth: ', arrayTips.everyNth([1, 2, 3, 4, 5, 6], 2));
console.log('filterNonUnique: ', arrayTips.filterNonUnique([1, 2, 3, 2, 4, 1, 4, 5]));
console.log('findLast: ', arrayTips.findLast([1, 2, 3, 4], function (n) { return n % 2 === 1; }));
console.log('flatten: ', arrayTips.flatten([1, [2, [3, [4, 5]]]]), 2);
console.log('forEachRight: ', arrayTips.forEachRight([1, 2, 3, 4], function (val) { return console.log(val); }));
console.log('groupBy: ', arrayTips.groupBy([6.1, 4.2, 6.3], Math.floor));
console.log('groupBy: ', arrayTips.groupBy(['one', 'two', 'three'], 'length'));
console.log('initialize2DArray: ', arrayTips.initialize2DArray(2, 2, 0));
//# sourceMappingURL=arrayTips.js.map