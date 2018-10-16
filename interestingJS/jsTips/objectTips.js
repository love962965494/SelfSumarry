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
var ObjectTips = (function () {
    function ObjectTips() {
    }
    ObjectTips.prototype.cleanObj = function (obj, keysToKeep, childIndicator) {
        var _this = this;
        Object.keys(obj).forEach(function (key) {
            if (key === childIndicator) {
                _this.cleanObj(obj[key], keysToKeep, childIndicator);
            }
            else if (!keysToKeep.includes(key)) {
                delete obj[key];
            }
        });
        return obj;
    };
    ObjectTips.prototype.functions = function (obj, inherited) {
        if (inherited === void 0) { inherited = false; }
        ;
        (inherited
            ? __spread(Object.keys(obj), Object.keys(Object.getPrototypeOf(obj))) : Object.keys(obj)).filter(function (key) { return typeof obj[key] === 'function'; });
    };
    return ObjectTips;
}());
exports.default = ObjectTips;
var objectTips = new ObjectTips();
var testObj = { a: 1, b: 2, children: { a: 1, b: 2 } };
console.log('cleanObj: ', objectTips.cleanObj(testObj, ['a'], 'children'));
//# sourceMappingURL=objectTips.js.map