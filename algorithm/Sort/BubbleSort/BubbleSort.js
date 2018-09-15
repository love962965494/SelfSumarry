"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Sort_1 = require("../Sort");
var BubbleSort = (function (_super) {
    __extends(BubbleSort, _super);
    function BubbleSort() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BubbleSort.prototype.sort = function (originalArray) {
        var swapped = false;
        var array = __spread(originalArray);
        try {
            for (var array_1 = __values(array), array_1_1 = array_1.next(); !array_1_1.done; array_1_1 = array_1.next()) {
                var item1 = array_1_1.value;
                swapped = false;
                this.callbacks.visitingCallback(item1);
                try {
                    for (var array_2 = __values(array), array_2_1 = array_2.next(); !array_2_1.done; array_2_1 = array_2.next()) {
                        var _a = array_2_1.value, index = _a.index, item2 = _a.item2;
                        this.callbacks.visitingCallback(item2);
                        if (this.comparator.lessThan(array[index + 1], item2)) {
                            _b = __read([item2, array[index + 1]], 2), array[index + 1] = _b[0], item2 = _b[1];
                            swapped = true;
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (array_2_1 && !array_2_1.done && (_c = array_2.return)) _c.call(array_2);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                if (!swapped) {
                    return array;
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (array_1_1 && !array_1_1.done && (_d = array_1.return)) _d.call(array_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return array;
        var e_2, _d, e_1, _c, _b;
    };
    return BubbleSort;
}(Sort_1.default));
exports.default = BubbleSort;
//# sourceMappingURL=BubbleSort.js.map