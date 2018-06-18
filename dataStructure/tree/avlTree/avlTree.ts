import BinarySearchTree from '../binarySearchTree/binarySearchTree';
import BinarySearchTreeNode from '../binarySearchTree/binarySearchTreeNode';
/**
 * In computer science, an AVL tree (named after inventors AdeIson-Velsky and Landis) is a self balancing binary search tree * It was the first such data structure to be invented. In an AVL tree, the heights of the two child subtrees of any node    * differ by at most one; if at any time they differ by more than one, rebalancing is done to restore this property. Lookup, * insertion, and deletion all take O(log n) time in both the average and works cases, where n is the number of nodes in the * tree prior to the operation. Insertions and deletions may require the tree to be rebalanced by one or more tree rotations.
 */
export default class AvlTree extends BinarySearchTree {
  /**
   *
   *
   * @param {*} value
   * @returns {*}
   * @memberof AvlTree
   */
  insert(value): any {
    // Do the normal BST insert
    super.insert(value)

    // Let's move up to the root and check balance factors along the way
    let currentNode = this.root.find(value)
    
    while(currentNode) {
      this.balance(currentNode)
      currentNode = currentNode.parent
    }
  }

  /**
   *
   *
   * @param {BinarySearchTreeNode} node
   * @memberof AvlTree
   */
  balance(node: BinarySearchTreeNode) {
    // If balance factor is not OK then try to balance the node
    if (node.balanceFactor > 1) {
      // Left rotation
      if (node.left.balanceFactor > 0) {
        // Left-left rotation
        this.rotateLeftLeft(node)
      } else if (node.left.balanceFactor < 0) {
        // Left-right rotation
        this.rotateLeftRight(node)
      }
    } else if (node.balanceFactor < -1) {
      // right rotation
      if (node.right.balanceFactor < 0) {
        // Right-right rotation
        this.rotateRightRight(node)
      } else if (node.right.balanceFactor > 0) {
        // Right-left rotation
        this.rotateRightLeft(node)
      }
    }
  }

  /**
   *
   *
   * @param {BinarySearchTreeNode} rootNode
   * @memberof AvlTree
   */
  rotateLeftLeft(rootNode: BinarySearchTreeNode) {
    // Detach left node from root node
    const leftNode = rootNode.left
    rootNode.setLeft(null)

    // make left node to be a child of rootNode's parent
    if (rootNode.parent) {
      rootNode.parent.setLeft(leftNode)
    } else if (rootNode === this.root) {
      // if root node is root then make left node to be a new root
      this.root = leftNode
    }

    // if left node has a right child then detach it and 
    // attach it as a left child for rootNode
    if (rootNode.right) {
      rootNode.setLeft(leftNode.right)
    }

    // Attach rootNode to the right of leftNode
    leftNode.setRight(rootNode)
  }

  rotateLeftRight(rootNode: BinarySearchTreeNode) {
    // detach left node from rootNode since it is going to be replaced
    const leftNode = rootNode.left
    rootNode.setLeft(null)

    // detach right node from leftNode
    const leftRightNode = leftNode.right
    leftNode.setRight(null)

    // preserve leftRightNode's left subtree
    if (leftRightNode.left) {
      leftNode.setRight(leftRightNode.left)
      leftRightNode.setLeft(null)
    }

    // Attach leftRightNode to the rootNode
    rootNode.setLeft(leftRightNode)

    // Attach leftNode as left node for leftRight node
    leftRightNode.setLeft(leftNode)

    // Do left-left rotation
    this.rotateLeftLeft(rootNode)
  }

  /**
   *
   *
   * @param {BinarySearchTreeNode} rootNode
   * @memberof AvlTree
   */
  rotateRightRight(rootNode: BinarySearchTreeNode) {
    // Detach right node from root node
    const rightNode = rootNode.right
    rootNode.setRight(null)

    // make right node to be a child of rootNode's parent
    if (rootNode.parent) {
      rootNode.parent.setRight(rightNode)
    } else if (rootNode === this.root) {
      // if root node is root then make right node to be a new root
      this.root = rightNode
    }

    // if right node has a left child then detach it and
    // attach it as a right child for rootNode
    if (rightNode.left) {
      rootNode.setRight(rootNode.left)
    }

    // attach rootNode to the left of rightNode
    rightNode.setLeft(rootNode)
  }

  /**
   *
   *
   * @param {BinarySearchTreeNode} rootNode
   * @memberof AvlTree
   */
  rotateRightLeft(rootNode: BinarySearchTreeNode) {
    // Detach right node from rootNode since it is going to be replaced
    const rightNode = rootNode.right
    rootNode.setRight(null)

    // Detach left node from rightNode
    const rightLeftNode = rightNode.left
    rightNode.setLeft(null)

    if (rightLeftNode.right) {
      rightNode.setLeft(rightLeftNode.right)
      rightLeftNode.setRight(null)
    }

    // attach rightLeftNode to the rootNode
    rootNode.setRight(rightLeftNode)

    // attach rightNode as right node for rightLeftNode
    rightLeftNode.setRight(rightNode)

    // do right-right rotation
    this.rotateRightRight(rootNode)
  }
}

const avlTree = new AvlTree()
avlTree.insert(4)
avlTree.insert(3)
avlTree.insert(2)
avlTree.insert(1)
avlTree.insert(1.5)
console.log('avlTree: ', avlTree)