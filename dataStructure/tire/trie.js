"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var trieNode_1 = require("./trieNode");
var HEAD_CHARACTER = '*';
var Trie = (function () {
    function Trie() {
        this.head = new trieNode_1.default(HEAD_CHARACTER);
    }
    Trie.prototype.addWord = function (word) {
        var characters = Array.from(word);
        var currentNode = this.head;
        for (var charIndex = 0; charIndex < characters.length; charIndex++) {
            var isComplete = charIndex === characters.length - 1;
            currentNode = currentNode.addChild(characters[charIndex], isComplete);
        }
    };
    Trie.prototype.suggestNextCharacters = function (word) {
        var lastCharacter = this.getLastCharacterNode(word);
        if (!lastCharacter) {
            return null;
        }
        return lastCharacter.suggestChildren();
    };
    Trie.prototype.doesWordExist = function (word) {
        return !!this.getLastCharacterNode(word);
    };
    Trie.prototype.getLastCharacterNode = function (word) {
        var characters = Array.from(word);
        var currentNode = this.head;
        for (var charIndex = 0; charIndex < characters.length; charIndex++) {
            if (!currentNode.hasChild(characters[charIndex])) {
                return null;
            }
            currentNode = currentNode.getChild(characters[charIndex]);
        }
        return currentNode;
    };
    return Trie;
}());
exports.default = Trie;
var trie = new Trie();
trie.addWord('cat');
trie.addWord('cats');
trie.addWord('car');
trie.addWord('caption');
console.log(trie.getLastCharacterNode('cats'));
//# sourceMappingURL=trie.js.map