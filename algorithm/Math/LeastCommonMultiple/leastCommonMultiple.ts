import euclideanAlgorithm from '../Euclidean/euclideanAlgorithm'

/**
 * 求两个整数的最小公倍数
 * Lcm(a, b) = | a * b | / gcd(a, b)
 */
export default function LeastCommonMultiple(a: number, b: number) {
  return a === 0 || b === 0 ? 0 : Math.abs(a * b) / euclideanAlgorithm(a, b)
}

/**
 * example of leastCommonMultiple
 */
const leastCommonMultiple = LeastCommonMultiple(11, 13)
console.log('leastCommonMultiple of 11 and 13: ', leastCommonMultiple)
