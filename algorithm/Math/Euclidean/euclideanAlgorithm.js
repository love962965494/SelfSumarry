"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function EuclideanAlgorithm(originalA, originalB) {
    var a = Math.abs(originalA);
    var b = Math.abs(originalB);
    return (b === 0) ? a : EuclideanAlgorithm(b, a % b);
}
exports.default = EuclideanAlgorithm;
var euclideanAlgorithm = EuclideanAlgorithm(125, 25);
console.log('The GCD is: ', euclideanAlgorithm);
//# sourceMappingURL=euclideanAlgorithm.js.map