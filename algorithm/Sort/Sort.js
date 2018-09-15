"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var comparator_1 = require("../../utils/comparator");
var Sort = (function () {
    function Sort(originalCallbacks) {
        this.callbacks = Sort.initSortingCallbacks(originalCallbacks);
        this.comparator = new comparator_1.default(this.callbacks.compareCallback);
    }
    Sort.initSortingCallbacks = function (originalCallbacks) {
        var callbacks = originalCallbacks || {};
        var stubCallback = function () { return undefined; };
        callbacks.compareCallback = callbacks.compareCallback || undefined;
        callbacks.visitingCallback = callbacks.visitingCallback || stubCallback;
        return callbacks;
    };
    Sort.prototype.sort = function (originalArray) {
        throw new Error('sort method must be implemented');
    };
    return Sort;
}());
exports.default = Sort;
//# sourceMappingURL=Sort.js.map