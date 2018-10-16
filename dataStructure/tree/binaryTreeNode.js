"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var comparator_1 = require("../../utils/comparator");
var hashTable_1 = require("../hashTable/hashTable");
var BinaryTreeNode = (function () {
    function BinaryTreeNode(value) {
        if (value === void 0) { value = null; }
        this.left = null;
        this.right = null;
        this.parent = null;
        this.value = value;
        this.meta = new hashTable_1.default();
        this.nodeComparator = new comparator_1.default();
    }
    Object.defineProperty(BinaryTreeNode.prototype, "leftHeight", {
        get: function () {
            if (!this.left) {
                return 0;
            }
            return this.left.height + 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BinaryTreeNode.prototype, "rightHeight", {
        get: function () {
            if (!this.right) {
                return 0;
            }
            return this.right.height + 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BinaryTreeNode.prototype, "height", {
        get: function () {
            return Math.max(this.leftHeight, this.rightHeight);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BinaryTreeNode.prototype, "balanceFactor", {
        get: function () {
            return this.leftHeight - this.rightHeight;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BinaryTreeNode.prototype, "uncle", {
        get: function () {
            if (!this.parent) {
                return undefined;
            }
            if (!this.parent.parent) {
                return undefined;
            }
            if (!this.parent.parent.left || !this.parent.parent.right) {
                return undefined;
            }
            if (this.nodeComparator.equal(this.parent, this.parent.parent.left)) {
                return this.parent.parent.right;
            }
            return this.parent.parent.left;
        },
        enumerable: true,
        configurable: true
    });
    BinaryTreeNode.prototype.setLeft = function (node) {
        if (this.left) {
            this.left.parent = null;
        }
        this.left = node;
        if (this.left) {
            this.left.parent = this;
        }
        return this;
    };
    BinaryTreeNode.prototype.setRight = function (node) {
        if (this.right) {
            this.right.parent = null;
        }
        this.right = node;
        if (this.right) {
            this.right.parent = this;
        }
        return this;
    };
    BinaryTreeNode.prototype.removeChild = function (nodeToRemove) {
        if (this.left && this.nodeComparator.equal(this.left, nodeToRemove)) {
            this.left = null;
            return true;
        }
        if (this.right && this.nodeComparator.equal(this.right, nodeToRemove)) {
            this.right = null;
            return true;
        }
        return false;
    };
    BinaryTreeNode.prototype.replaceChild = function (nodeToReplace, replacementNode) {
        if (!nodeToReplace || !replacementNode) {
            return false;
        }
        if (this.left && this.nodeComparator.equal(this.left, nodeToReplace)) {
            this.left = replacementNode;
            return true;
        }
        if (this.right && this.nodeComparator.equal(this.right, nodeToReplace)) {
            this.right = replacementNode;
            return true;
        }
        return false;
    };
    BinaryTreeNode.prototype.traverseInOrder = function () {
        var traverse = [];
        if (this.left) {
            traverse = traverse.concat(this.left.traverseInOrder());
        }
        traverse.push(this.value);
        if (this.right) {
            traverse = traverse.concat(this.right.traverseInOrder());
        }
        return traverse;
    };
    BinaryTreeNode.prototype.toString = function () {
        return this.traverseInOrder().toString();
    };
    return BinaryTreeNode;
}());
exports.default = BinaryTreeNode;
var leftNode = new BinaryTreeNode(1);
var leftNodeLeft = new BinaryTreeNode(6);
var leftNodeRight = new BinaryTreeNode(7);
var rightNode = new BinaryTreeNode(3);
var rightNodeLeft = new BinaryTreeNode(4);
var rightNodeRight = new BinaryTreeNode(5);
var rootNode = new BinaryTreeNode(2);
leftNode.setLeft(leftNodeLeft).setRight(leftNodeRight);
rightNode.setLeft(rightNodeLeft).setRight(rightNodeRight);
rootNode
    .setLeft(leftNode)
    .setRight(rightNode);
rootNode.removeChild(rootNode.left);
//# sourceMappingURL=binaryTreeNode.js.map