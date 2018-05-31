import LinkedList from './LinkedList'

/**
 * In computer science, a stack is an abstract data type that serves as a collection of elements, with two principle         * operations:
 * push, which adds an elements to the collection, and
 * pop, which removes the most recently added element that was not yet removed.
 * The order in which elements come off a stack gives rise to its alternative name, LIFO(last in, first out). Additionally, * a peek operation may give access to the top without modifying the stack. The name "stack" for this type of structure     * comes from the analogy to a set of physical items stacked on top of each other, which makes it easy to take an item off  * the top of the stack, while getting to an item deeper in the stack may require taking off multiple other items first.
 */
interface LinkedListNode {
  value: any,
  next: null | LinkedListNode  
}

export default class Stack {
  public linkedList: LinkedList
  constructor () {
    this.linkedList = new LinkedList()
  }

  /**
   * 
   * 
   * @returns {Boolean} 
   * @memberof Stack
   */
  isEmpty (): Boolean {
    return !this.linkedList.tail
  }

  /**
   * find stack top value or return null
   * 
   * @returns 
   * @memberof Stack
   */
  peek () {
    if (this.isEmpty()) {
      return null
    }

    return this.linkedList.tail.value
  }

  /**
   * 
   * 
   * @param {any} value 
   * @memberof Stack
   */
  push (value) {
    this.linkedList.append(value)
  }

  /**
   * 
   * 
   * @returns 
   * @memberof Stack
   */
  pop () {
    const removedTail = this.linkedList.deleteTail()
    return removedTail ? removedTail.value : null
  }



  toArray (): Array<LinkedListNode> {
    return this.linkedList.toArray().map(linkedListNode => linkedListNode.value).reverse()
  }

  toString (callback?: Function) {
    return this.linkedList.toString(callback)
  }
}