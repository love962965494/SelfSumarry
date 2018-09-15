"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Fibonacci = (function () {
    function Fibonacci(n) {
        var _this = this;
        this.getFibonacci = function (n) {
            if (n === 1) {
                return _this.fibSequence;
            }
            var iterationsCounter = n - 1;
            while (iterationsCounter) {
                _this.currentValue += _this.previousValue;
                _this.previousValue = _this.currentValue - _this.previousValue;
                _this.fibSequence.push(_this.currentValue);
                iterationsCounter -= 1;
            }
            return _this.fibSequence;
        };
        this.fibSequence = [1];
        this.currentValue = 1;
        this.previousValue = 0;
        this.getFibonacci(n);
    }
    return Fibonacci;
}());
exports.default = Fibonacci;
var fibonacci = new Fibonacci(15);
console.log('fibonacci: ', fibonacci.fibSequence);
//# sourceMappingURL=fibonacci.js.map