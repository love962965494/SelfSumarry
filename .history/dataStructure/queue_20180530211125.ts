import LinkedList from './linkedList'

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