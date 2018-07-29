/**
 * Creates an instance of TrialDivision.
 * 判断一个数是否是质数算法
 *
 * @param {number} testNumber
 * @memberof TrialDivision
 */
export default function TrialDivision(testNumber: number) {
  // check if testNumber is integer
  if (testNumber % 1 !== 0) {
    return false
  }

  // if number is less than one then it isn't prime by definition
  if (testNumber <= 1) {
    return false
  }

  // integer 2 or 3 are prime
  if (testNumber <= 3) {
    return true
  }

  // if the number is not divided by 2 then we may eliminate all further even dividers
  if (testNumber % 2 === 0) {
    return false
  }

  const dividerLimit = Math.sqrt(testNumber)
  for (let divider = 3; divider <= dividerLimit; divider += 2) {
    if (testNumber % divider === 0) {
      return false
    }
  }
  return true
}

/**
 * example of TrialDivision
 */
const trialDivision = TrialDivision(12)
console.log('trialDivision is prime: ', trialDivision)
