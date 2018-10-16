/**
 * In computer science, a linked list is a linear collection of data elements, in which linear order is not given by their physical placement in memory. Instead, each element points to the next. It is a data structure consisting of a group of nodes which together represent a sequence. Under the simplest form, each code is composed of data and a reference(in other words, a link) to the next node in the sequence. This structure allows for efficient insertion or removal of elements from any position in the sequence during iteration. More complex variants add additional links, allowing efficient insertion or removal from arbitrary element references. A drawback of linked lists is that access time is linear (and difficult to pipeline). Faster access, such as random access, is not feasible. Arrays have better cache locality as compared to linked lists.
 */
import Comparator, { ICompareFunctionTemplate } from '../../utils/comparator'
import LinkedListNode from './linkedListNode'

/**
 *
 *
 * @export
 * @class LinkedList
 */
export default class LinkedList {
  public head: LinkedListNode | null
  public tail: LinkedListNode | null
  public compare: Comparator

  /**
   * Creates an instance of LinkedList.
   *
   * @param {ICompareFunctionTemplate} [comparatorFunction]
   * @memberof LinkedList
   */
  constructor(comparatorFunction?: ICompareFunctionTemplate) {
    this.head = null
    this.tail = null
    this.compare = new Comparator(comparatorFunction)
  }

  /**
   * Prepend node
   *
   * @param {*} value
   * @returns {LinkedList}
   * @memberof LinkedList
   */
  public prepend(value: any): LinkedList {
    // Make new node to be a head
    this.head = new LinkedListNode(value, this.head)
    return this
  }

  /**
   * Append node
   *
   * @param {*} value
   * @returns {LinkedList}
   * @memberof LinkedList
   */
  public append(value: any): LinkedList {
    const newNode = new LinkedListNode(value)

    // If there is no head yet let's make new node a head
    if (!this.head) {
      this.head = newNode
      this.tail = newNode

      return this
    }

    // Attach new node to the end of linked list
    this.tail!.next = newNode
    this.tail = newNode
    return this
  }

  /**
   * Delete node
   *
   * @param {*} value
   * @returns {(LinkedListNode | null)}
   * @memberof LinkedList
   */
  public delete(value: any): LinkedListNode | null {
    if (!this.head) {
      return null
    }

    let deleteNode = null

    // If the head must be deleted then make 2nd node to be a head
    while (this.head && this.compare.equal(this.head.value, value)) {
      deleteNode = this.head
      this.head = this.head.next
    }

    let currentNode = this.head

    if (currentNode !== null) {
      // If next node must be deleted then make next node to be a next next one
      while (currentNode.next) {
        if (this.compare.equal(currentNode.next.value, value)) {
          deleteNode = currentNode.next
          currentNode.next = currentNode.next.next
        } else {
          currentNode = currentNode.next
        }
      }
    }

    // when currentNode.next === null, then currentNode === tail
    // but we haven't compare currentNode with value,
    // so we still check if tail must be deleted
    if (this.compare.equal(this.tail!.value, value)) {
      this.tail = currentNode
    }

    return deleteNode
  }

  /**
   * Find node
   *
   * @param {{ value: any; callback: (value: any) => LinkedListNode }} { value, callback }
   * @returns {(LinkedListNode | null)}
   * @memberof LinkedList
   */
  public find({ value, callback }: { value?: any; callback: (value: any) => boolean }): LinkedListNode | null {
    if (!this.head) {
      return null
    }

    let currentNode: LinkedListNode | null = this.head

    while (currentNode) {
      // If callback is specified then try to find node by callback
      if (callback && callback(currentNode.value)) {
        return currentNode
      }

      // If value is specified then try to compare by value
      if (value && this.compare.equal(currentNode.value, value)) {
        return currentNode
      }

      currentNode = currentNode.next
    }

    return null
  }

  /**
   * Delete tail
   *
   * @returns {(LinkedListNode | null)}
   * @memberof LinkedList
   */
  public deleteTail(): LinkedListNode | null {
    let deletedTail
    if (this.head === this.tail) {
      deletedTail = this.tail
      this.head = null
      this.tail = null
      return deletedTail
    }

    deletedTail = this.tail

    // Rewind to the last node and delete "next" link for the node before the last one
    let currentNode = this.head as LinkedListNode
    while (currentNode.next) {
      if (!currentNode.next.next) {
        currentNode.next = null
      } else {
        currentNode = currentNode.next
      }
    }

    this.tail = currentNode
    return deletedTail
  }

  /**
   * Delete head
   *
   * @returns {(LinkedListNode | null)}
   * @memberof LinkedList
   */
  public deleteHead(): LinkedListNode | null {
    if (!this.head) {
      return null
    }

    const deletedHead = this.head

    if (this.head.next) {
      this.head = this.head.next
    } else {
      this.head = null
      this.tail = null
    }

    return deletedHead
  }

  /**
   * Let linked list to array
   *
   * @returns {Array<LinkedListNode>}
   * @memberof LinkedList
   */
  public toArray(): LinkedListNode[] {
    const nodes = []
    let currentNode = this.head

    while (currentNode) {
      nodes.push(currentNode)
      currentNode = currentNode.next
    }

    return nodes
  }

  /**
   * Let linked list to string
   *
   * @param {(value: any) => string} [callback]
   * @returns {string}
   * @memberof LinkedList
   */
  public toString(callback?: (value: any) => string): string {
    return this.toArray()
      .map(node => node.toString(callback))
      .toString()
  }
}

const linkedList = new LinkedList()
linkedList.append(1)
console.log(
  linkedList
    .prepend(2)
    .append(3)
    .toString()
)
