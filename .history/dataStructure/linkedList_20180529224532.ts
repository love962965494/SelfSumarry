/**
 * In computer science, a linked list is a linear collection of data elements, in which linear order is not given by their  * physical placement in memory. Instead, each element points to the next. It is a data structure consisting of a group of 
 * nodes which together represent a sequence. Under the simplest form, each code is composed of data and a reference(in      * other words, a link) to the next node in the sequence. This structure allows for efficient insertion or removal of       * elements from any position in the sequence during iteration. More complex variants add additional links, allowing         * efficient insertion or removal from arbitrary element references. A drawback of linked lists is that access time is      * linear (and difficult to pipeline). Faster access, such as random access, is not feasible. Arrays have better cache      * locality as compared to linked lists.
 */
import Comparator from '../utils/comparator'

 class LinkedListNode {
   constructor (public value, public next = null) {
     this.value = value
     this.next = next
   }

   toString (callback?: Function) {
     return callback ? callback(this.value) : `${this.value}`
   }
 }

 export default class LinkedList {
   head: LinkedListNode
   tail: LinkedListNode
   compare: any
   constructor (comparatorFunction) {
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
   prepend (value: any): LinkedList {
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
   append (value: any): LinkedList {
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

   delete (value: any) {
     if (!this.head) {
      return null
     }
     
   }
 }