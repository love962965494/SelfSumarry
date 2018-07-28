/**
 * Calculate Fibonacci number at specific position using Dynamic Programming approach
 *
 * @export
 * @class FibonacciNth
 */
export default class FibonacciNth {
  public currentValue: number
  public previousValue: number

  constructor(n: number) {
    this.currentValue = 1
    this.previousValue = 0

    this.getFibonacciValue(n)
  }

  /**
   * @function getFibonacciValue
   * @description
   *   return the nth value of Fibonacci
   *
   * @memberof FibonacciNth
   */
  public getFibonacciValue = (n: number) => {
    if (n === 1) {
      return 1
    }

    let iterationsCounter = n - 1

    while (iterationsCounter) {
      this.currentValue += this.previousValue
      this.previousValue = this.currentValue - this.previousValue

      iterationsCounter -= 1
    }

    return this.currentValue
  }
}

/**
 * example of FibonacciNth
 */
const nthFibonacci = new FibonacciNth(11)
console.log('nthFibonacci: ', nthFibonacci.currentValue)
