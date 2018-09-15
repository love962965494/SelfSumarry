"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var linkedList_1 = require("../linkedList/linkedList");
var defaultHashTableSize = 32;
var HashTable = (function () {
    function HashTable(hashTableSize) {
        if (hashTableSize === void 0) { hashTableSize = defaultHashTableSize; }
        this.buckets = Array(hashTableSize)
            .fill(null)
            .map(function () { return new linkedList_1.default(); });
        this.keys = {};
    }
    HashTable.prototype.hash = function (key) {
        var hash = Array.from(key).reduce(function (hashAccumulator, keySymbol) {
            return (hashAccumulator + keySymbol.charCodeAt(0));
        }, 0).toString();
        return parseInt(hash) % this.buckets.length;
    };
    HashTable.prototype.set = function (key, value) {
        var keyHash = this.hash(key);
        this.keys[key] = keyHash;
        var bucketLinkedList = this.buckets[keyHash];
        var node = bucketLinkedList.find({ callback: function (nodeValue) { return nodeValue.key === key; } });
        if (!node) {
            bucketLinkedList.append({ key: key, value: value });
        }
        else {
            node.value.value = value;
        }
    };
    HashTable.prototype.delete = function (key) {
        var keyHash = this.hash(key);
        delete this.keys[key];
        var bucketLinkedList = this.buckets[keyHash];
        var node = bucketLinkedList.find({ callback: function (nodeValue) { return nodeValue.key === key; } });
        if (node) {
            return bucketLinkedList.delete(node.value);
        }
        return null;
    };
    HashTable.prototype.get = function (key) {
        var bucketLinkedList = this.buckets[this.hash(key)];
        var node = bucketLinkedList.find({ callback: function (nodeValue) { return nodeValue.key === key; } });
        return node ? node.value.value : undefined;
    };
    HashTable.prototype.has = function (key) {
        return Object.hasOwnProperty.call(this.keys, key);
    };
    HashTable.prototype.getKeys = function () {
        return Object.keys(this.keys);
    };
    return HashTable;
}());
exports.default = HashTable;
//# sourceMappingURL=hashTable.js.map