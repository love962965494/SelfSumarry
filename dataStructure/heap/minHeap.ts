import Comparator, { ICompareFunctionTemplate } from '../../utils/comparator'
/**
 * In computer science, a heap is a specialized tree-based data structure that satisfies the heap property: if p is a parent 
 * node of c, then the key (the value) of p is either greater than or equal to (in a max heap) or less than or equal to (in 
 * a min heap) the key of c. The node at the "top" of the heap (with no parents) is called the root node.
 */
export default class MinHeap {
  public heapContainer: any[]
  public compare: Comparator

  /**
   * Creates an instance of MinHeap.
   * @param {Function} comparatorFunction
   * @memberof MinHeap
   */
  constructor(comparatorFunction?: ICompareFunctionTemplate) {
    // Array representation of the heap
    this.heapContainer = []
    this.compare = new Comparator(comparatorFunction)
  }

  /**
   *
   *
   * @param {number} parentIndex
   * @returns {number}
   * @memberof MinHeap
   */
  public getLeftChildIndex(parentIndex: number): number {
    return 2 * parentIndex + 1
  }

  /**
   *
   *
   * @param {number} parentIndex
   * @returns {number}
   * @memberof MinHeap
   */
  public getRightChildIndex(parentIndex: number): number {
    return 2 * parentIndex + 2
  }

  /**
   *
   *
   * @param {number} childIndex
   * @returns {number}
   * @memberof MinHeap
   */
  public getParentIndex(childIndex: number): number {
    return Math.floor((childIndex - 1) / 2)
  }

  /**
   *
   *
   * @param {number} childIndex
   * @returns {boolean}
   * @memberof MinHeap
   */
  public hasParent(childIndex: number): boolean {
    return this.getParentIndex(childIndex) >= 0
  }

  /**
   *
   *
   * @param {number} parentIndex
   * @returns {boolean}
   * @memberof MinHeap
   */
  public hasLeftChild(parentIndex: number): boolean {
    return this.getLeftChildIndex(parentIndex) < this.heapContainer.length
  }

  /**
   *
   *
   * @param {number} parentIndex
   * @returns {boolean}
   * @memberof MinHeap
   */
  public hasRightChild(parentIndex: number): boolean {
    return this.getRightChildIndex(parentIndex) < this.heapContainer.length
  }

  /**
   *
   *
   * @param {number} parentIndex
   * @returns
   * @memberof MinHeap
   */
  public leftChild(parentIndex: number) {
    return this.heapContainer[this.getLeftChildIndex(parentIndex)]
  }

  /**
   *
   *
   * @param {number} parentIndex
   * @returns
   * @memberof MinHeap
   */
  public rightChild(parentIndex: number) {
    return this.heapContainer[this.getRightChildIndex(parentIndex)]
  }

  /**
   *
   *
   * @param {number} childIndex
   * @returns
   * @memberof MinHeap
   */
  public parent(childIndex: number) {
    return this.heapContainer[this.getParentIndex(childIndex)]
  }

  /**
   *
   *
   * @param {number} indexOne
   * @param {number} indexTow
   * @memberof MinHeap
   */
  public swap(indexOne: number, indexTow: number) {
    ;[this.heapContainer[indexOne], this.heapContainer[indexTow]] = [
      this.heapContainer[indexTow],
      this.heapContainer[indexOne]
    ]
  }

  /**
   * return the head value
   *
   * @returns
   * @memberof MinHeap
   */
  public peek() {
    if (this.heapContainer.length === 0) {
      return null
    }

    return this.heapContainer[0]
  }

  /**
   * make the last element form the end to the head
   *
   * @returns
   * @memberof MinHeap
   */
  public poll() {
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
   * 1. 将要添加节点插入树最后一个位置
   * 2. heapifyUp
   *
   * @param {*} item
   * @returns {MinHeap}
   * @memberof MinHeap
   */
  public add(item: any): MinHeap {
    this.heapContainer.push(item)
    this.heapifyUp()
    return this
  }

  /**
   * 1. 找到所有要删除的节点位置队列
   * 2. 遍历队列：
   * 3. 计算删除节点的位置（因为每删除一个节点，需要重新调整树的结构）
   * 3. 如果删除的是最后一个节点则直接从树中删除
   * 4. 如果不是，取出树中最后一个节点的值，赋值给当前删除节点:
   * 5. 如果存在左子节点并且父节点为空或者父节点值比当前要删除节点值小，则heapifyDown；否则heapifyUp
   * 6. 回到步骤2
   *
   * @param {*} item
   * @param {*} [customFindingComparator]
   * @returns {MinHeap}
   * @memberof MinHeap
   */
  public remove(item: any, customFindingComparator?: Comparator): MinHeap {
    // find number of items to remove
    const customComparator = customFindingComparator || this.compare
    const numberOfItemsToRemove = this.find(item, customComparator).length
    for (let iteration = 0; iteration < numberOfItemsToRemove; iteration++) {
      // we need to find item index to remove each time after remove since
      // indices are being change after each heapify process
      const indexToRemove = this.find(item, customComparator).pop()!

      // if we need to remove last child in the heap then just remove it
      // there is no need to heapify the heap afterwards
      if (indexToRemove === this.heapContainer.length - 1) {
        this.heapContainer.pop()
      } else {
        // move last element in heap to the vacant (removed) position
        this.heapContainer[indexToRemove] = this.heapContainer.pop()

        // get parent
        const parentItem = this.hasParent(indexToRemove) ? this.parent(indexToRemove) : null
        const leftChild = this.hasLeftChild(indexToRemove) ? this.leftChild(indexToRemove) : null

        // if there is no parent or parent is less than node to delete then heapify down
        // otherwise heapify up
        if (
          leftChild !== null &&
          (parentItem === null || this.compare.lessThan(parentItem, this.heapContainer[indexToRemove]))
        ) {
          this.heapifyDown(indexToRemove)
        } else {
          this.heapifyUp(indexToRemove)
        }
      }
    }

    return this
  }

  /**
   *
   *
   * @param {*} item
   * @param {*} [customComparator]
   * @returns {Array<number>}
   * @memberof MinHeap
   */
  public find(item: any, customComparator?: Comparator): number[] {
    const foundItemIndices = []
    const comparator = customComparator || this.compare

    for (let itemIndex = 0; itemIndex < this.heapContainer.length; itemIndex++) {
      if (comparator.equal(item, this.heapContainer[itemIndex])) {
        foundItemIndices.push(itemIndex)
      }
    }

    return foundItemIndices
  }

  /**
   * 1. 父节点存在且比父节点值小，则与父节点交互位置
   * 2. 当前位置变为父节点位置
   * 3. 回到步骤1
   *
   * @param {number} [customStartIndex]
   * @memberof MinHeap
   */
  public heapifyUp(customStartIndex?: number) {
    // take last element (last in array or the bottom left in a tree) in
    // a heap container and lift him up until we find the parent element
    // that is less than the current new one
    let currentIndex = customStartIndex || this.heapContainer.length - 1
    while (
      this.hasParent(currentIndex) &&
      this.compare.lessThan(this.heapContainer[currentIndex], this.parent(currentIndex))
    ) {
      this.swap(currentIndex, this.getParentIndex(currentIndex))
      currentIndex = this.getParentIndex(currentIndex)
    }
  }

  /**
   * 1. 父节点与孩子节点中较小的一个进行比较
   * 2. 如果父节点值比较小子节点的值还大，则交换位置；否则终止循环
   * 3. 当前位置变为较小子节点的位置，回到步骤1
   *
   * @param {number} [customStartIndex]
   * @memberof MinHeap
   */
  public heapifyDown(customStartIndex?: number) {
    // compare the root element to its children and swap root with the smallest
    // of children. Do the same for next children after swap
    let currentIndex = customStartIndex || 0
    let nextIndex = null

    while (this.hasLeftChild(currentIndex)) {
      nextIndex =
        this.hasRightChild(currentIndex) &&
        this.compare.lessThan(this.rightChild(currentIndex), this.leftChild(currentIndex))
          ? this.getRightChildIndex(currentIndex)
          : (nextIndex = this.getLeftChildIndex(currentIndex))

      if (this.compare.lessThan(this.heapContainer[currentIndex], this.heapContainer[nextIndex])) {
        break
      }

      this.swap(currentIndex, nextIndex)
      currentIndex = nextIndex
    }
  }

  /**
   *
   *
   * @returns {boolean}
   * @memberof MinHeap
   */
  public isEmpty(): boolean {
    return !this.heapContainer.length
  }

  /**
   *
   *
   * @returns {string}
   * @memberof MinHeap
   */
  public toString(): string {
    return this.heapContainer.toString()
  }
}

// let minHeap = new MinHeap()
// minHeap.add(1)
// minHeap.add(2)
// minHeap.add(4)
// minHeap.add(6)
// minHeap.add(3)
// minHeap.add(5)
// minHeap.add(6)
// minHeap.add(10)
// minHeap.add(8)
// minHeap.add(7)
// minHeap.add(1)
// console.log(minHeap)
