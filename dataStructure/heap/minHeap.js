"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var comparator_1 = require("../../utils/comparator");
var MinHeap = (function () {
    function MinHeap(comparatorFunction) {
        this.heapContainer = [];
        this.compare = new comparator_1.default(comparatorFunction);
    }
    MinHeap.prototype.getLeftChildIndex = function (parentIndex) {
        return 2 * parentIndex + 1;
    };
    MinHeap.prototype.getRightChildIndex = function (parentIndex) {
        return 2 * parentIndex + 2;
    };
    MinHeap.prototype.getParentIndex = function (childIndex) {
        return Math.floor((childIndex - 1) / 2);
    };
    MinHeap.prototype.hasParent = function (childIndex) {
        return this.getParentIndex(childIndex) >= 0;
    };
    MinHeap.prototype.hasLeftChild = function (parentIndex) {
        return this.getLeftChildIndex(parentIndex) < this.heapContainer.length;
    };
    MinHeap.prototype.hasRightChild = function (parentIndex) {
        return this.getRightChildIndex(parentIndex) < this.heapContainer.length;
    };
    MinHeap.prototype.leftChild = function (parentIndex) {
        return this.heapContainer[this.getLeftChildIndex(parentIndex)];
    };
    MinHeap.prototype.rightChild = function (parentIndex) {
        return this.heapContainer[this.getRightChildIndex(parentIndex)];
    };
    MinHeap.prototype.parent = function (childIndex) {
        return this.heapContainer[this.getParentIndex(childIndex)];
    };
    MinHeap.prototype.swap = function (indexOne, indexTow) {
        ;
        _a = __read([
            this.heapContainer[indexTow],
            this.heapContainer[indexOne]
        ], 2), this.heapContainer[indexOne] = _a[0], this.heapContainer[indexTow] = _a[1];
        var _a;
    };
    MinHeap.prototype.peek = function () {
        if (this.heapContainer.length === 0) {
            return null;
        }
        return this.heapContainer[0];
    };
    MinHeap.prototype.poll = function () {
        if (this.heapContainer.length === 0) {
            return null;
        }
        if (this.heapContainer.length === 1) {
            return this.heapContainer.pop();
        }
        var item = this.heapContainer[0];
        this.heapContainer[0] = this.heapContainer.pop();
        this.heapifyDown();
        return item;
    };
    MinHeap.prototype.add = function (item) {
        this.heapContainer.push(item);
        this.heapifyUp();
        return this;
    };
    MinHeap.prototype.remove = function (item, customFindingComparator) {
        var customComparator = customFindingComparator || this.compare;
        var numberOfItemsToRemove = this.find(item, customComparator).length;
        for (var iteration = 0; iteration < numberOfItemsToRemove; iteration++) {
            var indexToRemove = this.find(item, customComparator).pop();
            if (indexToRemove === this.heapContainer.length - 1) {
                this.heapContainer.pop();
            }
            else {
                this.heapContainer[indexToRemove] = this.heapContainer.pop();
                var parentItem = this.hasParent(indexToRemove)
                    ? this.parent(indexToRemove)
                    : null;
                var leftChild = this.hasLeftChild(indexToRemove)
                    ? this.leftChild(indexToRemove)
                    : null;
                if (leftChild !== null &&
                    (parentItem === null ||
                        this.compare.lessThan(parentItem, this.heapContainer[indexToRemove]))) {
                    this.heapifyDown(indexToRemove);
                }
                else {
                    this.heapifyUp(indexToRemove);
                }
            }
        }
        return this;
    };
    MinHeap.prototype.find = function (item, customComparator) {
        var foundItemIndices = [];
        var comparator = customComparator || this.compare;
        for (var itemIndex = 0; itemIndex < this.heapContainer.length; itemIndex++) {
            if (comparator.equal(item, this.heapContainer[itemIndex])) {
                foundItemIndices.push(itemIndex);
            }
        }
        return foundItemIndices;
    };
    MinHeap.prototype.heapifyUp = function (customStartIndex) {
        var currentIndex = customStartIndex || this.heapContainer.length - 1;
        while (this.hasParent(currentIndex) &&
            this.compare.lessThan(this.heapContainer[currentIndex], this.parent(currentIndex))) {
            this.swap(currentIndex, this.getParentIndex(currentIndex));
            currentIndex = this.getParentIndex(currentIndex);
        }
    };
    MinHeap.prototype.heapifyDown = function (customStartIndex) {
        var currentIndex = customStartIndex || 0;
        var nextIndex = null;
        while (this.hasLeftChild(currentIndex)) {
            if (this.hasRightChild(currentIndex) &&
                this.compare.lessThan(this.rightChild(currentIndex), this.leftChild(currentIndex))) {
                nextIndex = this.getRightChildIndex(currentIndex);
            }
            else {
                nextIndex = this.getLeftChildIndex(currentIndex);
            }
            if (this.compare.lessThan(this.heapContainer[currentIndex], this.heapContainer[nextIndex])) {
                break;
            }
            this.swap(currentIndex, nextIndex);
            currentIndex = nextIndex;
        }
    };
    MinHeap.prototype.isEmpty = function () {
        return !this.heapContainer.length;
    };
    MinHeap.prototype.toString = function () {
        return this.heapContainer.toString();
    };
    return MinHeap;
}());
exports.default = MinHeap;
//# sourceMappingURL=minHeap.js.map