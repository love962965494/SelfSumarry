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
}