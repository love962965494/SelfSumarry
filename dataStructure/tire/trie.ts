import TrieNode from './trieNode'

/**
 * In computer science, a trie, also called tree and sometimes radix tree or prefix tree (as they can be searched by         * prefixes), is a kind of search tree -- an ordered tree data structure that is used to store a dynamic set or associative  * array where the keys are usually strings. Unlike a binary search tree, no node in the tree stores the key associated with * that node; instead, its position in the tree defines the key with which it is associated. All the descendants of a node   * have a common prefix of the string associated with that node, and the root is associated with the empty string. Values   * are not necessarily associated with every node. Rather, values tend only to be associated with leaves, and with some     * inner nodes that correspond to keys of interest. For the space-optimized presentation of prefix tree, see compact prefix  * tree.
 */
const HEAD_CHARACTER = '*'

export default class Trie {
  public head: TrieNode
  constructor() {
    this.head = new TrieNode(HEAD_CHARACTER)
  }

  /**
   *
   *
   * @param {string} word
   * @memberof Trie
   */
  addWord(word: string) {
    const characters = Array.from(word)
    let currentNode = this.head

    for (let charIndex = 0; charIndex < characters.length; charIndex++) {
      const isComplete = charIndex === characters.length - 1
      currentNode = currentNode.addChild(characters[charIndex], isComplete)
    }
  }

  suggestNextCharacters(word) {
    const lastCharacter = this.getLastCharacterNode(word)

    if (!lastCharacter) {
      return null
    }

    return lastCharacter.suggestChildren()
  }

  /**
   *
   *
   * @param {string} word
   * @returns {boolean}
   * @memberof Trie
   */
  doesWordExist(word: string): boolean {
    return !!this.getLastCharacterNode(word)
  }

  /**
   *
   *
   * @param {string} word
   * @returns {TrieNode}
   * @memberof Trie
   */
  getLastCharacterNode(word: string): TrieNode {
    const characters = Array.from(word)
    let currentNode = this.head

    for (let charIndex = 0; charIndex < characters.length; charIndex++) {
      if (!currentNode.hasChild(characters[charIndex])) {
        return null
      }
      currentNode = currentNode.getChild(characters[charIndex])
    }

    return currentNode
  }
}

const trie = new Trie();

trie.addWord('cat');
trie.addWord('cats');
trie.addWord('car');
trie.addWord('caption');

console.log(trie.getLastCharacterNode('cats'))

// console.log(JSON.stringify(trie, null, 2));
