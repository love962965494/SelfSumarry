import Comparator, { ICompareFunctionTemplate } from '../../utils/comparator'

export default class Heap {
  public heapContainer: any[]
  public compare: Comparator
  constructor(comparatorFunction: ICompareFunctionTemplate) {
    if (new.target === Heap) {
      throw new TypeError('Cannot construct Heap instance directly')
    }

    // Array instance of the heap
    this.heapContainer = []
    this.compare = new Comparator(comparatorFunction)
  }

  /**
   * return left child index
   *
   * @param {number} parentIndex
   * @returns {number}
   * @memberof Heap
   */
  public getLeftChildIndex(parentIndex: number): number {
    return 2 * parentIndex + 1
  }

  /**
   * return right child index
   *
   * @param {number} parentIndex
   * @returns {number}
   * @memberof Heap
   */
  public getRightChildIndex(parentIndex: number): number {
    return 2 * parentIndex + 2
  }

  /**
   * return parent index
   *
   * @param {number} childIndex
   * @returns {number}
   * @memberof Heap
   */
  public getParentIndex(childIndex: number): number {
    return Math.floor((childIndex - 1) / 2)
  }

  /**
   * check if has parent
   *
   * @param {number} childIndex
   * @returns {boolean}
   * @memberof Heap
   */
  public hasParent(childIndex: number): boolean {
    return this.getParentIndex(childIndex) >= 0
  }

  /**
   * check if has left child
   *
   * @param {number} parentIndex
   * @returns {boolean}
   * @memberof Heap
   */
  public hasLeftChild(parentIndex: number): boolean {
    return this.getLeftChildIndex(parentIndex) < this.heapContainer.length
  }

  /**
   * check if has right child
   *
   * @param {number} parentIndex
   * @returns {boolean}
   * @memberof Heap
   */
  public hasRightChild(parentIndex: number): boolean {
    return this.getRightChildIndex(parentIndex) < this.heapContainer.length
  }

  /**
   * return left child
   *
   * @param {number} parentIndex
   * @returns {*}
   * @memberof Heap
   */
  public leftChild(parentIndex: number): any {
    return this.heapContainer[this.getLeftChildIndex(parentIndex)]
  }

  /**
   * return right child
   *
   * @param {number} parentIndex
   * @returns {*}
   * @memberof Heap
   */
  public rightChild(parentIndex: number): any {
    return this.heapContainer[this.getRightChildIndex(parentIndex)]
  }

  /**
   * return parent
   *
   * @param {number} childIndex
   * @returns {*}
   * @memberof Heap
   */
  public parent(childIndex: number): any {
    return this.heapContainer[this.getParentIndex(childIndex)]
  }

  /**
   * swap two element
   *
   * @param {number} indexOne
   * @param {number} indexTwo
   * @memberof Heap
   */
  public swap(indexOne: number, indexTwo: number) {
    const tmp = this.heapContainer[indexOne]
    this.heapContainer[indexTwo] = this.heapContainer[indexOne]
    this.heapContainer[indexOne] = tmp
  }

  /**
   * return first element if exist
   *
   * @returns {(null | any)}
   * @memberof Heap
   */
  public peek(): null | any {
    if (this.heapContainer.length === 0) {
      return null
    }

    return this.heapContainer[0]
  }

  public poll() {
    if (this.heapContainer.length === 0) {
      return null
    }

    if (this.heapContainer.length === 1) {
      return this.heapContainer.pop()
    }

    
  }
}
