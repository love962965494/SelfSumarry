import LinkedListNode from '../linkedList/linkedListNode'
import LinkedList from '../linkedList/LinkedList'

/**
 * In computer science, a stack is an abstract data type that serves as a collection of elements, with two principle operations:
 * push, which adds an elements to the collection, and pop, which removes the most recently added element that was not yet removed.
 * The order in which elements come off a stack gives rise to its alternative name, LIFO(last in, first out). Additionally,
 * a peek operation may give access to the top without modifying the stack. The name "stack" for this type of structure comes from the
 * analogy to a set of physical items stacked on top of each other, which makes it easy to take an item off the top of the stack, while
 * getting to an item deeper in the stack may require taking off multiple other items first.
 */

export default class Stack {
  public linkedList: LinkedList

  /**
   * Creates an instance of Stack.
   *
   * @memberof Stack
   */
  constructor() {
    this.linkedList = new LinkedList()
  }

  /**
   *
   *
   * @returns {boolean}
   * @memberof Stack
   */
  isEmpty(): boolean {
    return !this.linkedList.tail
  }

  /**
   *
   *
   * @returns {*}
   * @memberof Stack
   */
  peek(): any {
    if (this.isEmpty()) {
      return null
    }

    return this.linkedList.tail!.value
  }

  /**
   *
   *
   * @param {*} value
   * @memberof Stack
   */
  push(value: any): void {
    this.linkedList.append(value)
  }

  /**
   *
   *
   * @returns {(any | null)}
   * @memberof Stack
   */
  pop(): any | null {
    const removedTail = this.linkedList.deleteTail()
    return removedTail ? removedTail.value : null
  }

  /**
   *
   *
   * @returns {Array<LinkedListNode>}
   * @memberof Stack
   */
  toArray(): Array<LinkedListNode> {
    return this.linkedList
      .toArray()
      .map((linkedListNode) => linkedListNode.value)
      .reverse()
  }

  /**
   *
   *
   * @param {(value: any) => string} [callback]
   * @returns {String}
   * @memberof Stack
   */
  toString(callback?: (value: any) => string): String {
    return this.linkedList.toString(callback)
  }
}

let stack = new Stack()
stack.push(1)
stack.push(2)
console.log('pushStack: ', stack)
stack.pop()
stack.pop()
console.log('popStack: ', stack)
