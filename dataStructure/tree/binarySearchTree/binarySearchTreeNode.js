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
var binaryTreeNode_1 = require("../binaryTreeNode");
var comparator_1 = require("../../../utils/comparator");
var BinarySearchTreeNode = (function (_super) {
    __extends(BinarySearchTreeNode, _super);
    function BinarySearchTreeNode(value, compareFunction) {
        if (value === void 0) { value = null; }
        if (compareFunction === void 0) { compareFunction = undefined; }
        var _this = _super.call(this, value) || this;
        _this.compareFunction = compareFunction;
        _this.nodeValueComparator = new comparator_1.default(compareFunction);
        return _this;
    }
    BinarySearchTreeNode.prototype.insert = function (value) {
        if (this.nodeValueComparator.equal(this.value, null)) {
            this.value = value;
            return this;
        }
        if (this.nodeValueComparator.lessThan(value, this.value)) {
            if (this.left) {
                return this.left.insert(value);
            }
            var newNode = new BinarySearchTreeNode(value, this.compareFunction);
            this.setLeft(newNode);
            return newNode;
        }
        else if (this.nodeValueComparator.greaterThan(value, this.value)) {
            if (this.right) {
                return this.right.insert(value);
            }
            var newNode = new BinarySearchTreeNode(value, this.compareFunction);
            this.setRight(newNode);
            return newNode;
        }
        return this;
    };
    BinarySearchTreeNode.prototype.find = function (value) {
        if (this.nodeValueComparator.equal(this.value, value)) {
            return this;
        }
        if (this.nodeValueComparator.lessThan(value, this.value) && this.left) {
            return this.left.find(value);
        }
        else if (this.nodeValueComparator.greaterThan(value, this.value) && this.right) {
            return this.right.find(value);
        }
        return null;
    };
    BinarySearchTreeNode.prototype.contains = function (value) {
        return !!this.find(value);
    };
    BinarySearchTreeNode.prototype.remove = function (value) {
        var nodeToRemove = this.find(value);
        if (!nodeToRemove) {
            throw new Error('Item not found in the tree');
        }
        var parent = nodeToRemove.parent;
        if (!nodeToRemove.left && !nodeToRemove.right) {
            parent.removeChild(nodeToRemove);
        }
        else if (nodeToRemove.left && nodeToRemove.right) {
            var nextBiggerNode = nodeToRemove.right.findMin();
            if (!this.nodeComparator.equal(nextBiggerNode, nodeToRemove.right)) {
                this.remove(nextBiggerNode.value);
                nodeToRemove.value = nextBiggerNode.value;
            }
            else {
                nodeToRemove.value = nodeToRemove.right.value;
                nodeToRemove.right = nodeToRemove.right.right;
            }
        }
        else {
            if (nodeToRemove.left) {
                parent.replaceChild(nodeToRemove, nodeToRemove.left);
            }
            else {
                parent.replaceChild(nodeToRemove, nodeToRemove.right);
            }
        }
        return nodeToRemove;
    };
    BinarySearchTreeNode.prototype.findMin = function () {
        if (!this.left) {
            return this;
        }
        return this.left.findMin();
    };
    return BinarySearchTreeNode;
}(binaryTreeNode_1.default));
exports.default = BinarySearchTreeNode;
var bstNode = new BinarySearchTreeNode(5);
bstNode.insert(3);
bstNode.insert(7);
bstNode.insert(4);
bstNode.insert(6);
bstNode.insert(8);
bstNode.remove(5);
//# sourceMappingURL=binarySearchTreeNode.js.map