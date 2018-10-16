"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FibonacciNth = (function () {
    function FibonacciNth(n) {
        var _this = this;
        this.getFibonacciValue = function (n) {
            if (n === 1) {
                return 1;
            }
            var iterationsCounter = n - 1;
            while (iterationsCounter) {
                _this.currentValue += _this.previousValue;
                _this.previousValue = _this.currentValue - _this.previousValue;
                iterationsCounter -= 1;
            }
            return _this.currentValue;
        };
        this.currentValue = 1;
        this.previousValue = 0;
        this.getFibonacciValue(n);
    }
    return FibonacciNth;
}());
exports.default = FibonacciNth;
var nthFibonacci = new FibonacciNth(11);
console.log('nthFibonacci: ', nthFibonacci.currentValue);
//# sourceMappingURL=fibonacciNth.js.map