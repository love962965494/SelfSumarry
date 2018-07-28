/**
 * Create Fibonacci Sequence
 *
 * @export
 * @class Fibonacci
 */
export default class Fibonacci {
  public fibSequence: number[]
  public currentValue: number
  public previousValue: number

  /**
   * Creates an instance of Fibonacci.
   * 
   * @param {number} n
   * @memberof Fibonacci
   */
  constructor(n: number) {
    this.fibSequence = [1]
    this.currentValue = 1
    this.previousValue = 0

    this.getFibonacci(n)
  }

  /**
   * @function: getFibonacci
   * @description:
   *   return the Fibonacci of n
   *
   * @param {number} n
   * @memberof Fibonacci
   */
  public getFibonacci = (n: number): number[] => {
    if (n === 1) {
      return this.fibSequence
    }

    let iterationsCounter = n - 1

    while (iterationsCounter) {
      this.currentValue += this.previousValue
      this.previousValue = this.currentValue - this.previousValue

      this.fibSequence.push(this.currentValue)

      iterationsCounter -= 1
    }

    return this.fibSequence
  }
}

/**
 * example of Fibonacci
 */
const fibonacci = new Fibonacci(15)
console.log('fibonacci: ', fibonacci.fibSequence)
