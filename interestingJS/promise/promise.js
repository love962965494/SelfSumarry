"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Promise = (function () {
    function Promise(executor) {
        this.status = 'pending';
        this.value = undefined;
        this.reason = undefined;
        this.onResolvedCallback = [];
        this.onRejectedCallback = [];
        try {
            console.log('0: ', this);
            executor(this.resolve, this.reject);
        }
        catch (e) {
            console.log('2: ', this);
            this.reject(e);
        }
    }
    Promise.prototype.resolve = function (value) {
        console.log('1: ', this);
        this.status = 'resolved';
        this.value = value;
        this.onResolvedCallback.forEach(function (fn) { return fn(); });
    };
    Promise.prototype.reject = function (reason) {
        this.status = 'rejected';
        this.reason = reason;
        this.onRejectedCallback.forEach(function (fn) { return fn(); });
    };
    Promise.prototype.resolvePromise = function (p2, x, resolve, reject) {
        var _this = this;
        if (p2 === x) {
            reject(new TypeError('循环引用'));
        }
        var called;
        if (x !== null || typeof x === 'object' || typeof x === 'function') {
            try {
                var then = x.then;
                if (typeof then === 'function') {
                    then.call(x, function (y) {
                        if (called)
                            return;
                        called = true;
                        _this.resolvePromise(p2, y, resolve, reject);
                    }, function (err) {
                        if (called)
                            return;
                        called = true;
                        reject(err);
                    });
                }
                else {
                    resolve(x);
                }
            }
            catch (err) {
                if (called)
                    return;
                called = true;
                reject(err);
            }
        }
        else {
            resolve(x);
        }
    };
    Promise.prototype.then = function (onFulfilled, onRejected) {
        var _this = this;
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : function (value) { return value; };
        onRejected = typeof onRejected === 'function' ? onRejected : function (reason) { return reason; };
        var promise2;
        var _that = this;
        if (this.status === 'resolved') {
            promise2 = new Promise(function (resolve, reject) {
                setTimeout(function () {
                    try {
                        var x = onFulfilled(_this.value);
                        _that.resolvePromise(promise2, x, resolve, reject);
                    }
                    catch (e) {
                        reject(e);
                    }
                }, 0);
            });
        }
        else if (this.status === 'rejected') {
            promise2 = new Promise(function (resolve, reject) {
                setTimeout(function () {
                    try {
                        var x = onRejected(_this.reason);
                        _that.resolvePromise(promise2, x, resolve, reject);
                    }
                    catch (e) {
                        reject(e);
                    }
                }, 0);
            });
        }
        else if (this.status === 'pending') {
            promise2 = new Promise(function (resolve, reject) {
                _this.onResolvedCallback.push(function () {
                    setTimeout(function () {
                        try {
                            var x = onFulfilled(_this.value);
                            _that.resolvePromise(promise2, x, resolve, reject);
                        }
                        catch (e) {
                            reject(e);
                        }
                    }, 0);
                });
                _this.onRejectedCallback.push(function () {
                    setTimeout(function () {
                        try {
                            var x = onRejected(_this.reason);
                            _that.resolvePromise(promise2, x, resolve, reject);
                        }
                        catch (e) {
                            reject(e);
                        }
                    }, 0);
                });
            });
        }
        return promise2;
    };
    return Promise;
}());
exports.default = Promise;
var promise = new Promise(function (resolve, reject) {
    console.log(1);
    resolve();
});
console.log(4);
promise.then(function (resolve) {
    console.log(2);
    resolve(0);
}, function (reject) {
    console.log(3);
    reject();
});
//# sourceMappingURL=promise.js.map