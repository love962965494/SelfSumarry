export type ICompareFunctionTemplate = (a: any, b: any) => number

/**
 * 一些关于比较的方法
 *
 * @export
 * @class Comparator
 */
export default class Comparator {
  /**
   * Default compare function
   *
   * @private
   * @static
   * @param {*} a
   * @param {*} b
   * @returns {number}
   * @memberof Comparator
   */
  private static defaultCompareFunction(a: any, b: any): number {
    if (a === b) {
      return 0
    }

    return a < b ? -1 : 1
  }

  public compare: (a: any, b: any) => number

  /**
   * Creates an instance of Comparator.
   * @param {(a: any, b: any) => number} [compareFunction]
   * @memberof Comparator
   */
  constructor(compareFunction?: ICompareFunctionTemplate) {
    this.compare = compareFunction || Comparator.defaultCompareFunction
  }

  /**
   *
   *
   * @param {*} a
   * @param {*} b
   * @returns {Boolean}
   * @memberof Comparator
   */
  public equal(a: any, b: any): boolean {
    return this.compare(a, b) === 0
  }

  /**
   * Less than compare function
   *
   * @param {*} a
   * @param {*} b
   * @returns {boolean}
   * @memberof Comparator
   */
  public lessThan(a: any, b: any): boolean {
    return this.compare(a, b) < 0
  }

  /**
   * Greater than compare function
   *
   * @param {*} a
   * @param {*} b
   * @returns {boolean}
   * @memberof Comparator
   */
  public greaterThan(a: any, b: any): boolean {
    return this.compare(a, b) > 0
  }

  /**
   * Less Or Equal compare function
   *
   * @param {*} a
   * @param {*} b
   * @returns {boolean}
   * @memberof Comparator
   */
  public lessThanOrEqual(a: any, b: any): boolean {
    return this.lessThan(a, b) || this.equal(a, b)
  }

  /**
   * Greater Or Equal compare function
   *
   * @param {*} a
   * @param {*} b
   * @returns {boolean}
   * @memberof Comparator
   */
  public greaterThanOrEqual(a: any, b: any): boolean {
    return this.greaterThan(a, b) || this.equal(a, b)
  }

  /**
   * Reverse compare params
   *
   * @memberof Comparator
   */
  public reverse(): void {
    const compareOriginal = this.compare
    this.compare = (a, b) => compareOriginal(b, a)
  }
}
