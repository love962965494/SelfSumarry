"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function TrialDivision(testNumber) {
    if (testNumber % 1 !== 0) {
        return false;
    }
    if (testNumber <= 1) {
        return false;
    }
    if (testNumber <= 3) {
        return true;
    }
    if (testNumber % 2 === 0) {
        return false;
    }
    var dividerLimit = Math.sqrt(testNumber);
    for (var divider = 3; divider <= dividerLimit; divider += 2) {
        if (testNumber % divider === 0) {
            return false;
        }
    }
    return true;
}
exports.default = TrialDivision;
var trialDivision = TrialDivision(12);
console.log('trialDivision is prime: ', trialDivision);
//# sourceMappingURL=TrialDivision.js.map