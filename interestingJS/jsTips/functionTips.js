"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FunctionTips = (function () {
    function FunctionTips() {
    }
    FunctionTips.prototype.chainAsync = function (fns) {
        var curr = 0;
        var next = function () { return fns[curr++](next); };
        next();
    };
    return FunctionTips;
}());
exports.default = FunctionTips;
var functionTips = new FunctionTips();
functionTips.chainAsync([
    function (next) {
        console.log('chainAsync: 我是第一次');
        setTimeout(next, 1000);
    },
    function (next) {
        console.log('chainAsync: 我是第二次');
    }
]);
//# sourceMappingURL=functionTips.js.map