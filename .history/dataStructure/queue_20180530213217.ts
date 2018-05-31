import LinkedList from './linkedList'

/**
 * In computer science, a queue is a particular kind of abstract data type or collection in which the entities in the       * collection are kept in order and the principle (or only) operations on the collection are the addition of entities to the * rear terminal position, known as enqueue, and removal of entities from the front terminal position, known as dequeue.    * This makes the queue a First-In-First-Out(FIFO) data structure. In a FIFO data structure, the first element added to the * queue will be the first one to be removed. This is equivalent to the requirement that once a new element is added, all    * elements that were added before have to be removed before the new element can be removed. Ofter a peek or front operation * is also entered, returned the value of the front element without dequeuing it. A queue is an example of a linear data    * structure, or more abstractly a sequential collection.
 * 
 * @export
 * @class Queue
 */
export default class Queue {
  public linkedList: LinkedList
  constructor () {
    this.linkedList = new LinkedList()
  }

  /**
   * 
   * 
   * @returns {Boolean} 
   * @memberof Queue
   */
  isEmpty (): Boolean {
    return !this.linkedList.tail
  }

  /**
   * find head value or return null
   * 
   * @returns {*} 
   * @memberof Queue
   */
  peek (): any {
    if (!this.linkedList.head) {
      return null
    }

    return this.linkedList.head.value
  }

  /**
   * 
   * 
   * @param {*} value 
   * @memberof Queue
   */
  enqueue (value: any) {
    this.linkedList.append(value)
  }

  /**
   * 
   * 
   * @returns {*} 
   * @memberof Queue
   */
  dequeue (): any {
    const removeHead = this.linkedList.deleteHead()
    return removeHead ? removeHead.value : null
  }

  /**
   * 
   * 
   * @param {any} callback 
   * @returns {String} 
   * @memberof Queue
   */
  toString (callback): String {
    return this.linkedList.toString(callback)
  }
}

let queue = new Queue()
queue.enqueue(1)
console.log(queue)