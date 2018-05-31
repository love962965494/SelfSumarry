/**
 * In computer science, a linked list is a linear collection of data elements, in which linear order is not given by their  * physical placement in memory. Instead, each element points to the next. It is a data structure consisting of a group of
 * nodes which together represent a sequence. Under the simplest form, each code is composed of data and a reference(in      * other words, a link) to the next node in the sequence. This structure allows for efficient insertion or removal of       * elements from any position in the sequence during iteration. More complex variants add additional links, allowing         * efficient insertion or removal from arbitrary element references. A drawback of linked lists is that access time is      * linear (and difficult to pipeline). Faster access, such as random access, is not feasible. Arrays have better cache      * locality as compared to linked lists.
 */
import Comparator from '../utils/comparator'

class LinkedListNode {
  constructor(public value, public next = null) {
    this.value = value
    this.next = next
  }

  toString(callback?: Function) {
    return callback ? callback(this.value) : `${this.value}`
  }
}

export default class LinkedList {
  head: LinkedListNode
  tail: LinkedListNode
  compare: any
  constructor(comparatorFunction) {
    this.head = null
    this.tail = null
    this.compare = new Comparator(comparatorFunction)
  }

  /**
   *
   *
   * @param {*} value
   * @returns {LinkedList}
   * @memberof LinkedList
   */
  prepend(value: any): LinkedList {
    // Make new node to be a head
    this.head = new LinkedListNode(value, this.head)
    return this
  }

  /**
   *
   *
   * @param {*} value
   * @returns {LinkedList}
   * @memberof LinkedList
   */
  append(value: any): LinkedList {
    const newNode = new LinkedListNode(value)

    // If there is no head yet let's make new node a head
    if (!this.head) {
      this.head = newNode
      this.tail = newNode

      return this
    }

    // Attach new node to the end of linked list
    this.tail.next = newNode
    this.tail = newNode
    return this
  }

  /**
   * 
   * 
   * @param {*} value 
   * @returns {LinkedListNode} 
   * @memberof LinkedList
   */
  delete(value: any): LinkedListNode {
    if (!this.head) {
      return null
    }

    let deleteNode = null

    // If the head must be deleted then make 2nd node to be a head
    while (this.compare.equal(this.head && this.head.value, value)) {
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

    // Check if tail must be deleted
    if (this.compare.equal(this.tail.value, value)) {
      this.tail = currentNode
    }

    return deleteNode
  }

  /**
   * 
   * 
   * @param {*} [value] 
   * @param {Function} [callback] 
   * @returns {(LinkedListNode | null)} 
   * @memberof LinkedList
   */
  find (value?: any, callback?: Function): LinkedListNode | null {
    if (!this.head) {
      return null
    }

    let currentNode = this.head

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
   * 
   * 
   * @returns {LinkedListNode} 
   * @memberof LinkedList
   */
  deleteTail (): LinkedListNode {
    if (this.head === this.tail) {
      const deletedTail = this.tail
      this.head = null
      this.tail = null
      return deletedTail
    }

    const deletedTail = this.tail

    // Rewind to the last node and delete "next" link for the node before the last one
    let currentNode = this.head
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
   * 
   * 
   * @returns {(LinkedListNode | null)} 
   * @memberof LinkedList
   */
  deleteHead (): LinkedListNode | null {
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
   * 
   * 
   * @returns {Array<LinkedListNode>} 
   * @memberof LinkedList
   */
  toArray (): Array<LinkedListNode> {
    const nodes = []
    let currentNode = this.head

    while (currentNode) {
      nodes.push(currentNode)
      currentNode = currentNode.next
    }

    return nodes
  }

  /**
   * 
   * 
   * @param {Function} callback 
   * @returns {String} 
   * @memberof LinkedList
   */
  toString (callback: Function): String {
    return this.toArray().map(node => node.toString(callback)).toString()
  }
}
