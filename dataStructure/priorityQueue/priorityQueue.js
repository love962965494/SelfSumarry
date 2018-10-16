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
var minHeap_1 = require("../heap/minHeap");
var comparator_1 = require("../../utils/comparator");
var PriorityQueue = (function (_super) {
    __extends(PriorityQueue, _super);
    function PriorityQueue() {
        var _this = _super.call(this) || this;
        _this.priorities = {};
        _this.compare = new comparator_1.default(_this.comparePriority.bind(_this));
        return _this;
    }
    PriorityQueue.prototype.add = function (item, priority) {
        if (priority === void 0) { priority = 0; }
        this.priorities[item] = priority;
        _super.prototype.add.call(this, item);
        return this;
    };
    PriorityQueue.prototype.remove = function (item, customFindingComparator) {
        _super.prototype.remove.call(this, item, customFindingComparator);
        delete this.priorities[item];
        return this;
    };
    PriorityQueue.prototype.changePriority = function (item, priority) {
        this.remove(item, new comparator_1.default(this.compareValue));
        this.add(item, priority);
        return this;
    };
    PriorityQueue.prototype.findByValue = function (item) {
        return this.find(item, new comparator_1.default(this.compareValue));
    };
    PriorityQueue.prototype.hasValue = function (item) {
        return this.findByValue(item).length > 0;
    };
    PriorityQueue.prototype.comparePriority = function (a, b) {
        if (this.priorities[a] === this.priorities[b]) {
            return 0;
        }
        return this.priorities[a] < this.priorities[b] ? -1 : 1;
    };
    PriorityQueue.prototype.compareValue = function (a, b) {
        if (a === b) {
            return 0;
        }
        return a < b ? -1 : 1;
    };
    return PriorityQueue;
}(minHeap_1.default));
exports.default = PriorityQueue;
var priorityQueue = new PriorityQueue();
priorityQueue.add(10, 1);
priorityQueue.add(5, 2);
priorityQueue.add(100, 0);
priorityQueue.add(200, 0);
priorityQueue.changePriority(200, 10);
priorityQueue.changePriority(10, 20);
console.log(priorityQueue);
//# sourceMappingURL=priorityQueue.js.map