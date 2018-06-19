import Comparator from '../../utils/comparator'
import HashTable from '../hashTable/hashTable'
/**
 * In computer science, a tree is widely used abstract data type(ADT) -- or data structure implementing this ADT -- that     * simulates a hierarchical tree structure, with a root value and subtrees of children with a parent node, represented as as * a set of linked nodes.
 * A tree data structure can be defined recursively (locally) as a collection of nodes (starting at a root node), where each * node is a data structure consisting of a value, together with a list of references to nodes (the "children"), with the    * constraints that no reference is duplicated, and none points to the root.
 */
export default class BinaryTreeNode {
  public left: BinaryTreeNode
  public right: BinaryTreeNode
  public parent: BinaryTreeNode
  public value: any
  public meta: HashTable
  public nodeComparator: Comparator
  
  constructor(value: any = null) {
    this.left = null
    this.right = null
    this.parent = null
    this.value = value

    // any node related meta information may be stored here
    this.meta = new HashTable()

    // this comparator is used to compare binary tree nodes with each other
    this.nodeComparator = new Comparator()
  }

  /**
   *
   *
   * @readonly
   * @type {number}
   * @memberof BinaryTreeNode
   */
  get leftHeight(): number {
    if (!this.left) {
      return 0
    }

    return this.left.height + 1
  }

  /**
   *
   *
   * @readonly
   * @type {number}
   * @memberof BinaryTreeNode
   */
  get rightHeight(): number {
    if (!this.right) {
      return 0
    }

    return this.right.height + 1
  }

  /**
   *
   *
   * @readonly
   * @type {number}
   * @memberof BinaryTreeNode
   */
  get height(): number {
    return Math.max(this.leftHeight, this.rightHeight)
  }

  /**
   *
   *
   * @readonly
   * @type {number}
   * @memberof BinaryTreeNode
   */
  get balanceFactor(): number {
    return this.leftHeight - this.rightHeight
  }

  /**
   *
   *
   * @readonly
   * @type {(BinaryTreeNode | null)}
   * @memberof BinaryTreeNode
   */
  get uncle(): BinaryTreeNode | null {
    if (!this.parent) {
      return undefined
    }

    if (!this.parent.parent) {
      return undefined
    }

    // check if grand-parent has more than two children
    if (!this.parent.parent.left || !this.parent.parent.right) {
      return undefined
    }

    // so for now we know that current node has grand-parent and this
    // grand-parent has two children. Let's find out who is the uncle
    if (this.nodeComparator.equal(this.parent, this.parent.parent.left)) {
      // right one is an uncle, left is parent
      return this.parent.parent.right
    }

    return this.parent.parent.left
  }

  /**
   *
   *
   * @param {BinaryTreeNode} node
   * @returns {BinaryTreeNode}
   * @memberof BinaryTreeNode
   */
  setLeft(node: BinaryTreeNode): BinaryTreeNode {
    // reset parent for left node since it is going to be detached
    if (this.left) {
      this.left.parent = null
    }

    // attach new node t0 the left
    this.left = node

    // make current node to be a parent for new left one
    if (this.left) {
      this.left.parent = this
    }

    return this
  }

  /**
   *
   *
   * @param {BinaryTreeNode} node
   * @returns {BinaryTreeNode}
   * @memberof BinaryTreeNode
   */
  setRight(node: BinaryTreeNode): BinaryTreeNode {
    // reset parent for right node since it is going to be detached
    if (this.right) {
      this.right.parent = null
    }

    // attach new node to the right
    this.right = node

    // make current node to be a parent for new right node
    if (this.right) {
      this.right.parent = this
    }

    return this
  }

  /**
   *
   *
   * @param {BinaryTreeNode} nodeToRemove
   * @returns {boolean}
   * @memberof BinaryTreeNode
   */
  removeChild(nodeToRemove: BinaryTreeNode): boolean {
    if (this.left && this.nodeComparator.equal(this.left, nodeToRemove)) {
      this.left = null
      return true
    }

    if (this.right && this.nodeComparator.equal(this.right, nodeToRemove)) {
      this.right = null
      return true
    }

    return false
  }

  /**
   *
   *
   * @param {BinaryTreeNode} nodeToReplace
   * @param {BinaryTreeNode} replacementNode
   * @returns {boolean}
   * @memberof BinaryTreeNode
   */
  replaceChild(nodeToReplace: BinaryTreeNode, replacementNode: BinaryTreeNode): boolean {
    if (!nodeToReplace || !replacementNode) {
      return false
    }

    if (this.left && this.nodeComparator.equal(this.left, nodeToReplace)) {
      this.left = replacementNode
      return true
    }

    if (this.right && this.nodeComparator.equal(this.right, nodeToReplace)) {
      this.right = replacementNode
      return true
    }

    return false
  }

  /**
   *
   *
   * @returns {Array<any>}
   * @memberof BinaryTreeNode
   */
  traverseInOrder(): Array<any> {
    let traverse = []

    // add left node
    if (this.left) {
      traverse = traverse.concat(this.left.traverseInOrder())
    }

    // add root 
    traverse.push(this.value)

    // add right node 
    if (this.right) {
      traverse = traverse.concat(this.right.traverseInOrder())
    }

    return traverse
  }

  /**
   *
   *
   * @returns {string}
   * @memberof BinaryTreeNode
   */
  toString(): string {
    return this.traverseInOrder().toString()
  }
}

const leftNode = new BinaryTreeNode(1);
const leftNodeLeft = new BinaryTreeNode(6)
const leftNodeRight = new BinaryTreeNode(7)
const rightNode = new BinaryTreeNode(3);
const rightNodeLeft = new BinaryTreeNode(4)
const rightNodeRight = new BinaryTreeNode(5)
const rootNode = new BinaryTreeNode(2);

leftNode.setLeft(leftNodeLeft).setRight(leftNodeRight)
rightNode.setLeft(rightNodeLeft).setRight(rightNodeRight)
rootNode
  .setLeft(leftNode)
  .setRight(rightNode);

// console.log(rootNode.leftHeight)

rootNode.removeChild(rootNode.left)
// console.log(rootNode)