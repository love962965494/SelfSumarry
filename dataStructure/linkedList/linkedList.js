"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var comparator_1 = require("../../utils/comparator");
var linkedListNode_1 = require("./linkedListNode");
var LinkedList = (function () {
    function LinkedList(comparatorFunction) {
        this.head = null;
        this.tail = null;
        this.compare = new comparator_1.default(comparatorFunction);
    }
    LinkedList.prototype.prepend = function (value) {
        this.head = new linkedListNode_1.default(value, this.head);
        return this;
    };
    LinkedList.prototype.append = function (value) {
        var newNode = new linkedListNode_1.default(value);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
            return this;
        }
        this.tail.next = newNode;
        this.tail = newNode;
        return this;
    };
    LinkedList.prototype.delete = function (value) {
        if (!this.head) {
            return null;
        }
        var deleteNode = null;
        while (this.head && this.compare.equal(this.head.value, value)) {
            deleteNode = this.head;
            this.head = this.head.next;
        }
        var currentNode = this.head;
        if (currentNode !== null) {
            while (currentNode.next) {
                if (this.compare.equal(currentNode.next.value, value)) {
                    deleteNode = currentNode.next;
                    currentNode.next = currentNode.next.next;
                }
                else {
                    currentNode = currentNode.next;
                }
            }
        }
        if (this.compare.equal(this.tail.value, value)) {
            this.tail = currentNode;
        }
        return deleteNode;
    };
    LinkedList.prototype.find = function (_a) {
        var _b = _a.value, value = _b === void 0 ? undefined : _b, callback = _a.callback;
        if (!this.head) {
            return null;
        }
        var currentNode = this.head;
        while (currentNode) {
            if (callback && callback(currentNode.value)) {
                return currentNode;
            }
            if (value && this.compare.equal(currentNode.value, value)) {
                return currentNode;
            }
            currentNode = currentNode.next;
        }
        return null;
    };
    LinkedList.prototype.deleteTail = function () {
        if (this.head === this.tail) {
            var deletedTail_1 = this.tail;
            this.head = null;
            this.tail = null;
            return deletedTail_1;
        }
        var deletedTail = this.tail;
        var currentNode = this.head;
        while (currentNode.next) {
            if (!currentNode.next.next) {
                currentNode.next = null;
            }
            else {
                currentNode = currentNode.next;
            }
        }
        this.tail = currentNode;
        return deletedTail;
    };
    LinkedList.prototype.deleteHead = function () {
        if (!this.head) {
            return null;
        }
        var deletedHead = this.head;
        if (this.head.next) {
            this.head = this.head.next;
        }
        else {
            this.head = null;
            this.tail = null;
        }
        return deletedHead;
    };
    LinkedList.prototype.toArray = function () {
        var nodes = [];
        var currentNode = this.head;
        while (currentNode) {
            nodes.push(currentNode);
            currentNode = currentNode.next;
        }
        return nodes;
    };
    LinkedList.prototype.toString = function (callback) {
        return this.toArray()
            .map(function (node) { return node.toString(callback); })
            .toString();
    };
    return LinkedList;
}());
exports.default = LinkedList;
var linkedList = new LinkedList();
linkedList.append(1);
linkedList.prepend(2).append(3);
//# sourceMappingURL=linkedList.js.map