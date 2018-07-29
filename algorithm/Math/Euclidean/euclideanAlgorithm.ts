/**
 * Euclidean algorithm: get GCD of two number
 * 欧几里得算法：得到两个数的最大公约数。
 *
 * @export
 * @param {number} originalA
 * @param {number} originalB
 * @returns {number}
 */
export default function EuclideanAlgorithm(originalA: number, originalB: number): number {
  const a = Math.abs(originalA)
  const b = Math.abs(originalB)

  return (b === 0) ? a : EuclideanAlgorithm(b, a % b)
}

/**
 * example of Euclidean Algorithm
 */
const euclideanAlgorithm = EuclideanAlgorithm(125, 25)
console.log('The GCD is: ', euclideanAlgorithm)