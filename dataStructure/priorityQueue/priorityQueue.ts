import MinHeap from '../heap/minHeap'
import Comparator from '../../utils/comparator'
/**
 * In computer science, a priority queue is an abstract data type which is like a regular queue or stack data structure, but
 * where additionally each element has a "priority" associated with it. In a priority queue, an element with high priority
 * is served before an element with low priority. If two elements have the same priority, they are served according to their
 * order in the queue. While priority queues are often implemented with heaps, they are conceptually distinct from heaps.
 * A priority queue is an abstract concept like "a list" or "a map"; just as a list can be implemented with a linked list or
 * an array, a priority queue can be implemented with a heap or a variety of other methods such as an unordered array.
 */

// It is the same as min heap except that when comparing to elements
// we take into a account not element's value but rather its priority
export default class PriorityQueue extends MinHeap {
  public priorities: object

  /**
   * Creates an instance of PriorityQueue.
   *
   * @param {ICompareFunctionTemplate} comparatorFunction
   * @memberof PriorityQueue
   */
  constructor() {
    super()
    this.priorities = {}
    this.compare = new Comparator(this.comparePriority.bind(this))
  }

  /**
   * add item to priority queue
   *
   * @param {*} item
   * @param {number} [priority=0]
   * @returns {PriorityQueue}
   * @memberof PriorityQueue
   */
  add(item: any, priority: number = 0): PriorityQueue {
    this.priorities[item] = priority
    super.add(item)

    return this
  }

  /**
   * delete item from priority queue
   *
   * @param {*} item
   * @param {Comparator} customFindingComparator
   * @returns {PriorityQueue}
   * @memberof PriorityQueue
   */
  remove(item: any, customFindingComparator: Comparator): PriorityQueue {
    super.remove(item, customFindingComparator)
    delete this.priorities[item]

    return this
  }

  /**
   *
   *
   * @param {*} item
   * @param {number} priority
   * @returns {PriorityQueue}
   * @memberof PriorityQueue
   */
  changePriority(item: any, priority: number): PriorityQueue {
    this.remove(item, new Comparator(this.compareValue))
    this.add(item, priority)

    return this
  }

  /**
   *
   *
   * @param {*} item
   * @returns {number[]}
   * @memberof PriorityQueue
   */
  findByValue(item: any): number[] {
    return this.find(item, new Comparator(this.compareValue))
  }

  /**
   *
   *
   * @param {*} item
   * @returns {boolean}
   * @memberof PriorityQueue
   */
  hasValue(item: any): boolean {
    return this.findByValue(item).length > 0
  }

  /**
   *
   *
   * @param {string} a
   * @param {string} b
   * @returns {number}
   * @memberof PriorityQueue
   */
  comparePriority(a: string, b: string): number {
    if (this.priorities[a] === this.priorities[b]) {
      return 0
    }

    return this.priorities[a] < this.priorities[b] ? -1 : 1
  }

  /**
   *
   *
   * @param {*} a
   * @param {*} b
   * @returns {number}
   * @memberof PriorityQueue
   */
  compareValue(a: any, b: any): number {
    if (a === b) {
      return 0
    }

    return a < b ? -1 : 1
  }
}

let priorityQueue = new PriorityQueue()
priorityQueue.add(10, 1)
priorityQueue.add(5, 2)
priorityQueue.add(100, 0)
priorityQueue.add(200, 0)
priorityQueue.changePriority(200, 10)
priorityQueue.changePriority(10, 20)
console.log('priorityQueue: ', priorityQueue)