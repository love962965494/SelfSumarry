export default class Comparator {
  compare: Function;
  /**
   * @param {function(a: any, b: any)} [compareFunction]
   */

  constructor (compareFunction?: Function) {
    this.compare = compareFunction || Comparator.defaultCompareFunction
  }

  /**
   * 
   * 
   * @static
   * @param {*} a 
   * @param {*} b 
   * @returns {Number} 
   * @memberof Comparator
   */
  static defaultCompareFunction (a: any, b: any): Number {
    if (a === b) return 0

    return a < b ? -1 : 1
  }

  /**
   * 
   * 
   * @param {*} a 
   * @param {*} b 
   * @returns {Boolean} 
   * @memberof Comparator
   */
  equal(a: any, b: any): Boolean {
    return this.compare(a, b) === 0
  }

  /**
   * 
   * 
   * @param {*} a 
   * @param {*} b 
   * @returns {Boolean} 
   * @memberof Comparator
   */
  lessThan(a: any, b: any): Boolean {
    return this.compare(a, b) < 0
  }

  /**
   * 
   * 
   * @param {*} a 
   * @param {*} b 
   * @returns {Boolean} 
   * @memberof Comparator
   */
  greaterThan(a: any, b: any): Boolean {
    return this.compare(a, b) > 0
  }

  /**
   * 
   * 
   * @param {*} a 
   * @param {*} b 
   * @returns {Boolean} 
   * @memberof Comparator
   */
  lessThanOrEqual(a: any, b: any): Boolean {
    return this.lessThan(a, b) || this.equal(a, b)
  }

  /**
   * 
   * 
   * @param {*} a 
   * @param {*} b 
   * @returns {Boolean} 
   * @memberof Comparator
   */
  greaterThanOrEqual(a: any, b: any): Boolean {
    return this.greaterThan(a, b) || this.equal(a, b)
  }

  /**
   * 反转
   * 
   * @memberof Comparator
   */
  reverse () {
    const compareOriginal = this.compare
    this.compare = (a, b) => compareOriginal(b, a)
  }
}