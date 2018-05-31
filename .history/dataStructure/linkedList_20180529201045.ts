/**
 * In computer science, a linked list is a linear collection of data elements, in which linear order is not given by their  * physical placement in memory. Instead, each element points to the next. It is a data structure consisting of a group of 
 * nodes which together represent a sequence. Under the simplest form, each code is composed of data and a reference(in      * other words, a link) to the next node in the sequence. This structure allows for efficient insertion or removal of       * elements from any position in the sequence during iteration. More complex variants add additional links, allowing         * efficient insertion or removal from arbitrary element references. A drawback of linked lists is that access time is      * linear (and difficult to pipeline). Faster access, such as random access, is not feasible. Arrays have better cache      * locality as compared to linked lists.
 */

 class LinkedListNode {
   constructor (public value, public next = null) {
     this.value = value
     this.next = next
   }

   toString (callback: Function | undefined) {
     return callback ? callback(this.value) : `${this.value}`
   }
 }