export default function IntegerPartition(toPartitionNumber: number) {
  // create partition matrix for solving this task using Dynamic Programming
  const partitionMatrix = Array(toPartitionNumber + 1).fill(null).map(() => Array(toPartitionNumber + 1).fill(null))

  // fill partition matrix with initial values

  // let's fill the first row that represents how many ways we would have 
  // to combine the numbers 1, 2, 3, ..., n with number 0. We would have zero
  // ways obviously since with zero number we may form only zero.
  for (let numberIndex = 1; numberIndex < toPartitionNumber; numberIndex++) {
    partitionMatrix[0][numberIndex] = 0
  }

  // Let's fill the first column. It represents the number of ways we can form 
  // number zero out of numbers 0, 0 and 1, 0 and 2, 0 and 1 and 2 adn 3, ...
  // Obviously there is only one way we could form number 0 
  // and it is with number 0 itself.
  for (let summandIndex = 0; summandIndex <= toPartitionNumber; summandIndex++) {
    partitionMatrix[summandIndex][0] = 1
  }

  // Now let's go through other possible options of hwo we could form number m out of 
  // summands 0, 1, ..., m using Dynamic Programming approach
  for (let summandIndex = 1; summandIndex <= toPartitionNumber; summandIndex++) {
    for (let numberIndex = 1; numberIndex <= toPartitionNumber; numberIndex++) {
      if (summandIndex > numberIndex) {
        // If summand number is bigger then current number itself then just it won't add
        // any new ways of forming the number. Thus we may just copy the number from row above.
        partitionMatrix[summandIndex][numberIndex] = partitionMatrix[summandIndex - 1][numberIndex]
      } else {
        const combosWithoutSummand = partitionMatrix[summandIndex - 1][numberIndex]
        const combosWithSummand = partitionMatrix[summandIndex][numberIndex - summandIndex]

        partitionMatrix[summandIndex][numberIndex] = combosWithoutSummand + combosWithSummand
      }
    }
  }

  return partitionMatrix[toPartitionNumber][toPartitionNumber]
} 

console.log('test: ', IntegerPartition(5))