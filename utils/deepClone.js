"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloneByJSON = function (obj) { return JSON.parse(JSON.stringify(obj)); };
var deepClone = function (obj) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
    switch (Object.prototype.toString.call(obj)) {
        case '[object Array]': {
            var result = new Array(obj.length);
            for (var i = 0; i < obj.length; i++) {
                result[i] = deepClone(obj[i]);
            }
            return result;
        }
        case '[object Error]': {
            var result = new obj.constructor(obj);
            result.stack = obj.stack;
            return result;
        }
        case '[object Date]':
        case '[object RegExp]':
        case '[object Int8Array]':
        case '[object Uint8Array]':
        case '[object Uint8ClampedArray]':
        case '[object Int16Array]':
        case '[object Uint16Array]':
        case '[object Int32Array]':
        case '[object Uint32Array]':
        case '[object Float32Array]':
        case '[object Float64Array]':
        case '[object Map]':
        case '[object Set]': {
            return new obj.constructor(obj);
        }
        case '[object Symbol]': {
            return Symbol(String(obj).slice(7, -1));
        }
        case '[object Object]': {
            var keys = Object.keys(obj);
            var result = {};
            for (var i = 0; i < keys.length; i++) {
                var key = keys[i];
                result[key] = deepClone(obj[key]);
            }
            return result;
        }
        default: {
            throw new Error('Unable to copy obj! Its type is not supported');
        }
    }
};
exports.default = deepClone;
//# sourceMappingURL=deepClone.js.map