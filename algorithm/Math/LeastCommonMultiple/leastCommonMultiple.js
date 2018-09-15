"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var euclideanAlgorithm_1 = require("../Euclidean/euclideanAlgorithm");
function LeastCommonMultiple(a, b) {
    return a === 0 || b === 0 ? 0 : Math.abs(a * b) / euclideanAlgorithm_1.default(a, b);
}
exports.default = LeastCommonMultiple;
var leastCommonMultiple = LeastCommonMultiple(11, 13);
console.log('leastCommonMultiple of 11 and 13: ', leastCommonMultiple);
//# sourceMappingURL=leastCommonMultiple.js.map