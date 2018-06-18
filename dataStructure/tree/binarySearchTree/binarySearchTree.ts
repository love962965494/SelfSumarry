import BinarySearchTreeNode from './binarySearchTreeNode'
import Comparator from '../../../utils/comparator';
/**
 * In computer science, binary search tree (BST), sometimes called ordered or sorted binary trees, are a particular type of  * container: data structures that store "items" (such as numbers, names etc.) im memory. They allow fast lookup, addition   * and removal of items, and can be used to implement either dynamic sets of items, or lookup tables that allow finding an   * item by its key (e.g., finding the phone number of a person by name).
 * Binary search trees keep their keys in sorted order, so that lookup and other operations can use the principle of binary  * search: when looking for a key in a tree (or a place to insert a new key), they traverse the tree from root to leaf,      * making comparisons to keys stored in the nodes of the tree and deciding, on the basis of the comparison, to continue      * in the left or right subtrees. On average, this means that each comparison allows the operations to skip about half of    * the tree, so that each lookup, insertion or deletion takes time proportional to the logarithm of the number of items      * stored in the tree. This is much better than the linear time required to find items by key in an (unsorted) array, but    * slower than the corresponding operations on hash tables.
 */
export default class BinarySearchTree {
  public root: BinarySearchTreeNode
  public nodeComparator: Comparator
  constructor(nodeValueCompareFunction?: Function) {
    this.root = new BinarySearchTreeNode(null, nodeValueCompareFunction)

    // steal node comparator from the root
    this.nodeComparator = this.root.nodeComparator
  }

  /**
   *
   *
   * @param {*} value
   * @returns {BinarySearchTreeNode}
   * @memberof BinarySearchTree
   */
  insert(value): BinarySearchTreeNode {
    return this.root.insert(value)
  }

  /**
   *
   *
   * @param {*} value
   * @returns {boolean}
   * @memberof BinarySearchTree
   */
  contains(value): boolean {
    return this.root.contains(value)
  }

  /**
   *
   *
   * @param {*} value
   * @returns {BinarySearchTreeNode}
   * @memberof BinarySearchTree
   */
  remove(value):BinarySearchTreeNode {
    return this.root.remove(value)
  }

  /**
   *
   *
   * @returns {string}
   * @memberof BinarySearchTree
   */
  toString(): string {
    return this.root.toString()
  }
}

const bst = new BinarySearchTree()
bst.insert(10)
bst.insert(20)
bst.insert(5)
// console.log('bst: ', bst)