import LinkedList from '../linkedList/linkedList'
import LinkedListNode from '../linkedList/linkedListNode'

/**
 * Hash table size directly affects on the number of collisions.
 * The bigger the hash table size the less collisions you'll get.
 * For demonstrates purpose hash table size is small to show how collisions are being handled.
 */
const defaultHashTableSize = 32

/**
 * In computer science, a hash table (hash map) is a data structure which implements an associative array abstract data type,
 * a structure that can map keys to values. A hash table uses a hash function to compute an index into an array to buckets or
 * slots, from which the desired value can be found. Ideally, the hash function will assign each key to a unique bucket, but
 * most hash table designs employ an imperfect hash function, which might cause hash collisions where the hash function generates
 * the same index for more than one key. Such collisions must be accommodated in some way.
 */
export default class HashTable {
  public buckets: Array<LinkedList>
  public keys: object

  /**
   * Creates an instance of HashTable.
   *
   * @param {number} [hashTableSize=defaultHashTableSize]
   * @memberof HashTable
   */
  constructor(hashTableSize: number = defaultHashTableSize) {
    // Create hash table of certain size and fill each bucket with empty linked list
    this.buckets = Array(hashTableSize)
      .fill(null)
      .map(() => new LinkedList())

    // Just to keep track of all actual keys in a fast way
    this.keys = {}
  }

  /**
   * compute hash value, so can store value in proper position
   *
   * @param {string} key
   * @returns {number}
   * @memberof HashTable
   */
  hash(key: string): number {
    const hash = Array.from(key)
      .reduce((hashAccumulator: number, keySymbol: string) => hashAccumulator + keySymbol.charCodeAt(0), 0)
      .toString()

    // reduce hash number so it would fit hash table size
    return parseInt(hash) % this.buckets.length
  }

  /**
   * If key has exists in keys, then update corresponding value;
   * Else append value to bucketLinkedList.
   *
   * @param {*} key
   * @param {*} value
   * @memberof HashTable
   */
  set(key: string, value: any) {
    const keyHash = this.hash(key)
    this.keys[key] = keyHash

    const bucketLinkedList = this.buckets[keyHash]
    const node = bucketLinkedList.find({ callback: (nodeValue) => nodeValue.key === key })

    if (!node) {
      // insert new node
      bucketLinkedList.append({ key, value })
    } else {
      // update value of existing node
      node.value.value = value
    }
  }

  /**
   * Delete the corresponding value of the key.
   *
   * @param {string} key
   * @returns {(LinkedListNode | null)}
   * @memberof HashTable
   */
  delete(key: string): LinkedListNode | null {
    const keyHash = this.hash(key)
    delete this.keys[key]

    const bucketLinkedList = this.buckets[keyHash]
    const node = bucketLinkedList.find({ callback: (nodeValue) => nodeValue.key === key })

    if (node) {
      return bucketLinkedList.delete(node.value)
    }
    return null
  }

  /**
   * If key existes in the buckedLinkedList, then return the value
   *
   * @param {string} key
   * @returns
   * @memberof HashTable
   */
  get(key: string) {
    const bucketLinkedList = this.buckets[this.hash(key)]
    const node = bucketLinkedList.find({ callback: (nodeValue) => nodeValue.key === key })

    return node ? node.value.value : undefined
  }

  /**
   * The key whether exists in the buckedLinkedList
   *
   * @param {string} key
   * @returns {boolean}
   * @memberof HashTable
   */
  has(key: string): boolean {
    return Object.hasOwnProperty.call(this.keys, key)
  }

  /**
   *
   *
   * @returns {Array<string>}
   * @memberof HashTable
   */
  getKeys(): string[] {
    return Object.keys(this.keys)
  }
}

// let hashTable = new HashTable()
// hashTable.set('a', 'mick')
// hashTable.set('b', 'nico')
// hashTable.set('a', 'john')
// console.log(JSON.stringify(hashTable, null, 2))
