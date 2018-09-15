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
function pluck(o, names) {
    return o[names];
}
var Adapter = (function () {
    function Adapter() {
    }
    Adapter.prototype.call = function (key) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return function (context) {
            return (_a = pluck(context, key)).call.apply(_a, __spread([context], args));
            var _a;
        };
    };
    Adapter.prototype.collectInto = function (fn) {
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return fn(args);
        };
    };
    Adapter.prototype.flip = function (fn) {
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return fn.apply(void 0, __spread([args.pop()], args));
        };
    };
    Adapter.prototype.pipeFunctions = function () {
        var fns = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            fns[_i] = arguments[_i];
        }
        return fns.reduce(function (f, g) { return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return g(f.apply(void 0, __spread(args)));
        }; });
    };
    Adapter.prototype.promisify = function (func) {
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return new Promise(function (resolve, reject) {
                func.apply(void 0, __spread(args, [function (err, result) { return (err ? reject(err) : resolve(result)); }]));
            });
        };
    };
    Adapter.prototype.spreadOver = function (fn) {
        return function (argsArr) { return fn.apply(void 0, __spread(argsArr)); };
    };
    return Adapter;
}());
exports.default = Adapter;
var adapter = new Adapter();
Promise.resolve([1, 2, 3])
    .then(adapter.call('map', function (x) { return 2 * x; }))
    .then(function (res) { return console.log('call: ', res); });
var Pall = adapter.collectInto(Promise.all.bind(Promise));
var p1 = Promise.resolve(1);
var p2 = Promise.resolve(2);
var p3 = new Promise(function (resolve) { return setTimeout(resolve, 2000, 3); });
Pall(p1, p2, p3).then(function (res) { return console.log('collectInto: ', res); });
var a = { name: 'John Smith' };
var b = {};
var mergeFrom = adapter.flip(Object.assign);
var mergePerson = mergeFrom.bind(null, a);
mergePerson(b);
console.log('flip: ', b);
var add5 = function (x) { return x + 5; };
var multiply = function (x, y) { return x * y; };
var multiplyAndAdd5 = adapter.pipeFunctions(multiply, add5);
console.log('pipeFunctions: ', multiplyAndAdd5(5, 2));
var delay = adapter.promisify(function (d, cb) { return setTimeout(cb, d); });
delay(2000).then(function () { return console.log('promisify: ', 'Hi'); });
var arrMax = adapter.spreadOver(Math.max);
console.log('spreadOver: ', arrMax([1.5, 2.2222222, 2.22222221]));
//# sourceMappingURL=adapter.js.map