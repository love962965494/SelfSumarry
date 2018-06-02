import LinkedList from './linkedList'
import LinkedListNode from './linkedListNode'
/**
 * In computing, a hash table (hash map) is a data structure which implements an associative array abstract data type, a    * structure that can map keys to values. A hash table uses a hash function to compute an index into an array to buckets or  * slots, from which the desired value can be found.
 * Ideally, the hash function will assign each key to a unique bucket, but most hash table designs employ an imperfect hash  * function, which might cause hash collisions where the hash function generates the same index for more than one key. Such  * collisions must be accommodated in some way.
 */
const defaultHashTableSize = 32

export default class HashTable {
  buckets: Array<LinkedList>

  constructor(hashTableSize: number = defaultHashTableSize) {
    this.buckets = Array(hashTableSize)
      .fill(null)
      .map(() => new LinkedList())
  }

  /**
   * convert key string to hash number
   *
   * @param {any} key
   * @returns {number}
   * @memberof HashTable
   */
  hash(key: any): number {
    const hash = Array.from(key).reduce(
      (hashAccumulator: string, keySymbol: string) =>
        hashAccumulator + keySymbol.charCodeAt(0),
      0
    )

    // Reduce hash number so it would fit hash table size
    return parseInt(hash.toString()) % this.buckets.length
  }

  insert(key: any, value: any) {
    const bucketLinkedList = this.buckets[this.hash(key)]
    const node = bucketLinkedList.find({
      callback: (nodeValue: any) => nodeValue.key === key
    })

    if (!node) {
      // inserted new node
      bucketLinkedList.append({ key, value })
    } else {
      // update value of existing node
      node.value.value = value
    }
  }

  /**
   *
   *
   * @param {any} key
   * @returns {LinkedListNode}
   * @memberof HashTable
   */
  delete(key): LinkedListNode {
    const bucketLinkedList = this.buckets[this.hash(key)]
    const node = bucketLinkedList.find({
      callback: nodeValue => nodeValue.key === key
    })

    if (node) {
      return bucketLinkedList.delete(node.value)
    }
  }

  /**
   *
   *
   * @param {any} key
   * @returns {(any | null)}
   * @memberof HashTable
   */
  get(key): any | null {
    const bucketLinkedList = this.buckets[this.hash(key)]
    const node = bucketLinkedList.find({
      callback: nodeValue => nodeValue.key === key
    })

    return node ? node.value.value : null
  }
}

let hashTable = new HashTable()
hashTable.insert('mike', 12)
console.log(hashTable)
