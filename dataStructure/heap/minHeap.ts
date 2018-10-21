import Heap from './Heap'

export default class MinHeap extends Heap {
  /**
   *
   * Checks if pair of heap elements is in correct order
   * For MinHeap the first element must be always smaller or equal.
   *
   * @param {*} firstElement
   * @param {*} secondElement
   * @returns {boolean}
   * @memberof MinHeap
   */
  public pairIsInCorrectOrder(firstElement: any, secondElement: any): boolean {
    return this.compare.lessThanOrEqual(firstElement, secondElement)
  }
}
