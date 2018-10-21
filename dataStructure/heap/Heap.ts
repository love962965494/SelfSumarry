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

  /**
   * return last element if exist
   *
   * @returns {(null | any)}
   * @memberof Heap
   */
  public poll(): null | any {
    if (this.heapContainer.length === 0) {
      return null
    }

    if (this.heapContainer.length === 1) {
      return this.heapContainer.pop()
    }

    const item = this.heapContainer[0]

    // move the last element from the end to the head
    this.heapContainer[0] = this.heapContainer.pop()
    this.heapifyDown()

    return item
  }

  /**
   * add item to heap
   *
   * @param {*} item
   * @returns {Heap}
   * @memberof Heap
   */
  public add(item: any): Heap {
    this.heapContainer.push(item)
    this.heapifyUp()

    return this
  }

  /**
   * remove item from heap
   *
   * @param {*} item
   * @param {Comparator} [comparator=this.compare]
   * @returns {Heap}
   * @memberof Heap
   */
  public remove(item: any, comparator: Comparator = this.compare): Heap {
    // Find number of items to remove
    const numberOfItemsToRemove = this.find(item, comparator).length

    for (let iteration = 0; iteration < numberOfItemsToRemove; iteration++) {
      // We need to find item index to remove each time after removal since
      // indices are being changed after each heapify proces
      const indexToReomve = this.find(item, comparator).pop()!

      // If we need to remove last child in the heap then just remove it
      // There is no need to heapify the heap afterwards
      if (indexToReomve === this.heapContainer.length - 1) {
        this.heapContainer.pop()
      } else {
        // Move last element in heap to the vacant (removed) position
        this.heapContainer[indexToReomve] = this.heapContainer.pop()

        // get parent
        const parentItem = this.parent(indexToReomve)

        // If there is no parent or parent is in correct order with the node
        // we're going to delete then heapify down. Otherwise heapify up
        if (
          this.hasLeftChild(indexToReomve) &&
          (!parentItem || this.pairIsInCorrectOrder(parentItem, this.heapContainer[indexToReomve]))
        ) {
          this.heapifyDown(indexToReomve)
        } else {
          this.heapifyUp(indexToReomve)
        }
      }
    }

    return this
  }

  /**
   * find item and return index array
   *
   * @param {*} item
   * @param {Comparator} [comparator=this.compare]
   * @returns {number[]}
   * @memberof Heap
   */
  public find(item: any, comparator: Comparator = this.compare): number[] {
    const foundItemIndices = []

    for (let itemIndex = 0; itemIndex < this.heapContainer.length; itemIndex++) {
      if (comparator.equal(item, this.heapContainer[itemIndex])) {
        foundItemIndices.push(itemIndex)
      }
    }

    return foundItemIndices
  }

  /**
   * check heap is empty
   *
   * @returns {boolean}
   * @memberof Heap
   */
  public imEmpty(): boolean {
    return !this.heapContainer.length
  }

  /**
   *
   *
   * @returns {string}
   * @memberof Heap
   */
  public toString(): string {
    return this.heapContainer.toString()
  }

  /**
   * heapify up the heap
   *
   * @param {number} customStartIndex
   * @memberof Heap
   */
  public heapifyUp(customStartIndex?: number): void {
    // Take the last element (last in array or the bottom left in a tree)
    // in the heap container and lift it up until it is in the correct
    // order with respect to its parent element
    let currentIndex = customStartIndex || this.heapContainer.length - 1

    while (
      this.hasParent(currentIndex) &&
      !this.pairIsInCorrectOrder(this.parent(currentIndex), this.heapContainer[currentIndex])
    ) {
      this.swap(currentIndex, this.getParentIndex(currentIndex))
      currentIndex = this.getParentIndex(currentIndex)
    }
  }

  /**
   * heapify down the heap
   *
   * @param {number} [customStartIndex=0]
   * @memberof Heap
   */
  public heapifyDown(customStartIndex: number = 0): void {
    // Compare the parent element to its children and swap parent with the appropriate
    // child (smallest child for MinHeap, largest child for MaxHeap)
    // Do the same for next children after swap
    let currentIndex = customStartIndex
    let nextIndex = null

    while (this.hasLeftChild(currentIndex)) {
      if (
        this.hasRightChild(currentIndex) &&
        this.pairIsInCorrectOrder(this.rightChild(currentIndex), this.leftChild(currentIndex))
      ) {
        nextIndex = this.getRightChildIndex(currentIndex)
      } else {
        nextIndex = this.getLeftChildIndex(currentIndex)
      }

      if (this.pairIsInCorrectOrder(this.heapContainer[currentIndex], this.heapContainer[nextIndex])) {
        break
      }

      this.swap(currentIndex, nextIndex)
      currentIndex = nextIndex
    }
  }

  /**
   * ???
   *
   * @param {*} firstElement
   * @param {*} secondElement
   * @memberof Heap
   */
  public pairIsInCorrectOrder(firstElement: any, secondElement: any): boolean {
    throw new Error(`
      You have to implement heap pair comparision method 
      for ${firstElement} and ${secondElement} values. 
    `)
  }
}
