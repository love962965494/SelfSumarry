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
}