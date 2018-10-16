"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var binarySearchTreeNode_1 = require("./binarySearchTreeNode");
var BinarySearchTree = (function () {
    function BinarySearchTree(nodeValueCompareFunction) {
        this.root = new binarySearchTreeNode_1.default(null, nodeValueCompareFunction);
        this.nodeComparator = this.root.nodeComparator;
    }
    BinarySearchTree.prototype.insert = function (value) {
        return this.root.insert(value);
    };
    BinarySearchTree.prototype.contains = function (value) {
        return this.root.contains(value);
    };
    BinarySearchTree.prototype.remove = function (value) {
        return this.root.remove(value);
    };
    BinarySearchTree.prototype.toString = function () {
        return this.root.toString();
    };
    return BinarySearchTree;
}());
exports.default = BinarySearchTree;
var bst = new BinarySearchTree();
bst.insert(10);
bst.insert(20);
bst.insert(5);
//# sourceMappingURL=binarySearchTree.js.map