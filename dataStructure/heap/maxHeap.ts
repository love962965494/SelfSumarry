import Heap from './Heap'

export default class MaxHeap extends Heap {
  /**
   *
   * Checks if pair of heap elements is in correct order
   * For MaxHeap the first element must be always bigger or equal.
   *
   * @param {*} firstElement
   * @param {*} secondElement
   * @returns {boolean}
   * @memberof MaxHeap
   */
  public pairIsInCorrectOrder(firstElement: any, secondElement: any): boolean {
    return this.compare.greaterThanOrEqual(firstElement, secondElement)
  }
}
