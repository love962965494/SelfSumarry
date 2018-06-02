/**
 *
 *
 * @export
 * @class LinkedListNode
 */
export default class LinkedListNode {
  constructor(public value: any, public next: LinkedListNode = null) {
    this.value = value
    this.next = next
  }

  toString(callback?: Function) {
    return callback ? callback(this.value) : `${this.value}`
  }
}