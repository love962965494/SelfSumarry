import BinaryTreeNode from '../binaryTreeNode'
import Comparator from '../../../utils/comparator'

export default class BinarySearchTreeNode extends BinaryTreeNode {
  public compareFunction: Function
  public nodeValueComparator: Comparator
  public left: BinarySearchTreeNode
  public right: BinarySearchTreeNode
  constructor(value: any = null, compareFunction: Function = undefined) {
    super(value)

    this.compareFunction = compareFunction
    this.nodeValueComparator = new Comparator(compareFunction)
  }

  /**
   *
   *
   * @param {*} value
   * @returns {BinarySearchTreeNode}
   * @memberof BinarySearchTreeNode
   */
  insert(value): BinarySearchTreeNode {
    if (this.nodeValueComparator.equal(this.value, null)) {
      this.value = value

      return this
    }

    if (this.nodeValueComparator.lessThan(value, this.value)) {
      // insert to the left
      if (this.left) {
        return this.left.insert(value)
      }

      const newNode = new BinarySearchTreeNode(value, this.compareFunction)
      this.setLeft(newNode)

      return newNode
    } else if (this.nodeValueComparator.greaterThan(value, this.value)) {
      if (this.right) {
        return this.right.insert(value)
      }

      const newNode = new BinarySearchTreeNode(value, this.compareFunction)
      this.setRight(newNode)

      return newNode
    }

    return this
  }

  /**
   *
   *
   * @param {*} value
   * @returns {(BinarySearchTreeNode | null)}
   * @memberof BinarySearchTreeNode
   */
  find(value): BinarySearchTreeNode | null {
    // check the root
    if (this.nodeValueComparator.equal(this.value, value)) {
      return this
    }

    if (this.nodeValueComparator.lessThan(value, this.value) && this.left) {
      // check left node
      return this.left.find(value)
    } else if (this.nodeValueComparator.greaterThan(value, this.value) && this.right) {
      return this.right.find(value)
    }

    return null
  }

  /**
   *
   *
   * @param {*} value
   * @returns {boolean}
   * @memberof BinarySearchTreeNode
   */
  contains(value): boolean {
    return !!this.find(value)
  }

  remove(value) {
    const nodeToRemove = this.find(value)

    if (!nodeToRemove) {
      throw new Error('Item not found in the tree')
    }

    const { parent } = nodeToRemove

    if (!nodeToRemove.left && !nodeToRemove.right) {
      // node is a left and thus has no children
      // just remove the pointer to this node from the parent node
      parent.removeChild(nodeToRemove)
    } else if (nodeToRemove.left && nodeToRemove.right) {
      // node has two children
      // find the next biggest value (minimum value in the right branch)
      // and replace current value node with that next biggest value
      const nextBiggerNode = nodeToRemove.right.findMin()

      if (!this.nodeComparator.equal(nextBiggerNode, nodeToRemove.right)) {
        this.remove(nextBiggerNode.value)
        nodeToRemove.value = nextBiggerNode.value
      } else {
        // in case if next right value is the next bigger one and it doesn't have left child
        // then just replace node that is going to be deleted with the right node
        nodeToRemove.value = nodeToRemove.right.value
        nodeToRemove.right = nodeToRemove.right.right
      }
    } else {
      // node has only one child
      // make this child to be a direct child of current node's parent
      if (nodeToRemove.left) {
        parent.replaceChild(nodeToRemove, nodeToRemove.left)
      } else {
        parent.replaceChild(nodeToRemove, nodeToRemove.right)
      }
    }

    return nodeToRemove
  }

  findMin() {
    if (!this.left) {
      return this
    }

    return this.left.findMin()
  }
}