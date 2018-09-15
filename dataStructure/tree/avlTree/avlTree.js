"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var binarySearchTree_1 = require("../binarySearchTree/binarySearchTree");
var AvlTree = (function (_super) {
    __extends(AvlTree, _super);
    function AvlTree() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AvlTree.prototype.insert = function (value) {
        _super.prototype.insert.call(this, value);
        var currentNode = this.root.find(value);
        while (currentNode) {
            this.balance(currentNode);
            currentNode = currentNode.parent;
        }
    };
    AvlTree.prototype.balance = function (node) {
        if (node.balanceFactor > 1) {
            if (node.left.balanceFactor > 0) {
                this.rotateLeftLeft(node);
            }
            else if (node.left.balanceFactor < 0) {
                this.rotateLeftRight(node);
            }
        }
        else if (node.balanceFactor < -1) {
            if (node.right.balanceFactor < 0) {
                this.rotateRightRight(node);
            }
            else if (node.right.balanceFactor > 0) {
                this.rotateRightLeft(node);
            }
        }
    };
    AvlTree.prototype.rotateLeftLeft = function (rootNode) {
        var leftNode = rootNode.left;
        rootNode.setLeft(null);
        if (rootNode.parent) {
            rootNode.parent.setLeft(leftNode);
        }
        else if (rootNode === this.root) {
            this.root = leftNode;
        }
        if (leftNode.right) {
            rootNode.setLeft(leftNode.right);
        }
        leftNode.setRight(rootNode);
    };
    AvlTree.prototype.rotateLeftRight = function (rootNode) {
        var leftNode = rootNode.left;
        rootNode.setLeft(null);
        var leftRightNode = leftNode.right;
        leftNode.setRight(null);
        if (leftRightNode.left) {
            leftNode.setRight(leftRightNode.left);
            leftRightNode.setLeft(null);
        }
        rootNode.setLeft(leftRightNode);
        leftRightNode.setLeft(leftNode);
        this.rotateLeftLeft(rootNode);
    };
    AvlTree.prototype.rotateRightRight = function (rootNode) {
        var rightNode = rootNode.right;
        rootNode.setRight(null);
        if (rootNode.parent) {
            rootNode.parent.setRight(rightNode);
        }
        else if (rootNode === this.root) {
            this.root = rightNode;
        }
        if (rightNode.left) {
            rootNode.setRight(rootNode.left);
        }
        rightNode.setLeft(rootNode);
    };
    AvlTree.prototype.rotateRightLeft = function (rootNode) {
        var rightNode = rootNode.right;
        rootNode.setRight(null);
        var rightLeftNode = rightNode.left;
        rightNode.setLeft(null);
        if (rightLeftNode.right) {
            rightNode.setLeft(rightLeftNode.right);
            rightLeftNode.setRight(null);
        }
        rootNode.setRight(rightLeftNode);
        rightLeftNode.setRight(rightNode);
        this.rotateRightRight(rootNode);
    };
    return AvlTree;
}(binarySearchTree_1.default));
exports.default = AvlTree;
var avlTree = new AvlTree();
avlTree.insert(4);
avlTree.insert(3);
avlTree.insert(2);
avlTree.insert(1);
avlTree.insert(1.5);
console.log('avlTree: ', avlTree);
//# sourceMappingURL=avlTree.js.map