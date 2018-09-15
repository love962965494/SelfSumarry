"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function IntegerPartition(toPartitionNumber) {
    var partitionMatrix = Array(toPartitionNumber + 1).fill(null).map(function () { return Array(toPartitionNumber + 1).fill(null); });
    for (var numberIndex = 1; numberIndex < toPartitionNumber; numberIndex++) {
        partitionMatrix[0][numberIndex] = 0;
    }
    for (var summandIndex = 0; summandIndex <= toPartitionNumber; summandIndex++) {
        partitionMatrix[summandIndex][0] = 1;
    }
    for (var summandIndex = 1; summandIndex <= toPartitionNumber; summandIndex++) {
        for (var numberIndex = 1; numberIndex <= toPartitionNumber; numberIndex++) {
            if (summandIndex > numberIndex) {
                partitionMatrix[summandIndex][numberIndex] = partitionMatrix[summandIndex - 1][numberIndex];
            }
            else {
                var combosWithoutSummand = partitionMatrix[summandIndex - 1][numberIndex];
                var combosWithSummand = partitionMatrix[summandIndex][numberIndex - summandIndex];
                partitionMatrix[summandIndex][numberIndex] = combosWithoutSummand + combosWithSummand;
            }
        }
    }
    return partitionMatrix[toPartitionNumber][toPartitionNumber];
}
exports.default = IntegerPartition;
console.log('test: ', IntegerPartition(5));
//# sourceMappingURL=integerPartition.js.map