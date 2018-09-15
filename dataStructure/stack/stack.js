"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LinkedList_1 = require("../linkedList/LinkedList");
var Stack = (function () {
    function Stack() {
        this.linkedList = new LinkedList_1.default();
    }
    Stack.prototype.isEmpty = function () {
        return !this.linkedList.tail;
    };
    Stack.prototype.peek = function () {
        if (this.isEmpty()) {
            return null;
        }
        return this.linkedList.tail.value;
    };
    Stack.prototype.push = function (value) {
        this.linkedList.append(value);
    };
    Stack.prototype.pop = function () {
        var removedTail = this.linkedList.deleteTail();
        return removedTail ? removedTail.value : null;
    };
    Stack.prototype.toArray = function () {
        return this.linkedList
            .toArray()
            .map(function (linkedListNode) { return linkedListNode.value; })
            .reverse();
    };
    Stack.prototype.toString = function (callback) {
        return this.linkedList.toString(callback);
    };
    return Stack;
}());
exports.default = Stack;
var stack = new Stack();
stack.push(1);
stack.push(2);
console.log('pushStack: ', stack);
stack.pop();
stack.pop();
console.log('popStack: ', stack);
//# sourceMappingURL=stack.js.map