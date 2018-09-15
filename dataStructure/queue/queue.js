"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var linkedList_1 = require("../linkedList/linkedList");
var Queue = (function () {
    function Queue() {
        this.linkedList = new linkedList_1.default();
    }
    Queue.prototype.isEmpty = function () {
        return !this.linkedList.tail;
    };
    Queue.prototype.peek = function () {
        if (!this.linkedList.head) {
            return null;
        }
        return this.linkedList.head.value;
    };
    Queue.prototype.enqueue = function (value) {
        this.linkedList.append(value);
    };
    Queue.prototype.dequeue = function () {
        var removeHead = this.linkedList.deleteHead();
        return removeHead ? removeHead.value : null;
    };
    Queue.prototype.toString = function (callback) {
        return this.linkedList.toString(callback);
    };
    return Queue;
}());
exports.default = Queue;
var queue = new Queue();
queue.enqueue(1);
queue.enqueue(2);
console.log('enqueue: ', queue);
queue.dequeue();
console.log('dequeue: ', queue);
//# sourceMappingURL=queue.js.map