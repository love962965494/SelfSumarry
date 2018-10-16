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
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var hashTable_1 = require("../hashTable/hashTable");
var TrieNode = (function () {
    function TrieNode(character, isCompleteWord) {
        if (isCompleteWord === void 0) { isCompleteWord = false; }
        this.character = character;
        this.isCompleteWord = isCompleteWord;
        this.children = new hashTable_1.default();
    }
    TrieNode.prototype.getChild = function (character) {
        return this.children.get(character);
    };
    TrieNode.prototype.addChild = function (character, isCompleteWord) {
        if (isCompleteWord === void 0) { isCompleteWord = false; }
        if (!this.hasChild(character)) {
            this.children.set(character, new TrieNode(character, isCompleteWord));
        }
        return this.children.get(character);
    };
    TrieNode.prototype.hasChild = function (character) {
        return this.children.has(character);
    };
    TrieNode.prototype.suggestChildren = function () {
        return __spread(this.children.getKeys());
    };
    TrieNode.prototype.toString = function () {
        var childrenAsString = this.suggestChildren().toString();
        childrenAsString = childrenAsString ? ":" + childrenAsString : '';
        var isCompleteString = this.isCompleteWord ? '*' : '';
        return "" + this.character + isCompleteString + childrenAsString;
    };
    return TrieNode;
}());
exports.default = TrieNode;
//# sourceMappingURL=trieNode.js.map