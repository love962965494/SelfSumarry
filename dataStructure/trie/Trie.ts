import TrieNode from './TrieNode'

const HEAD_CHARACTER = '*'

/**
 * In computer science, a trie, also called digial tree and sometimes radix tree or prefix tree (as they can be searched by prefixes),
 * is a kind of search tree -- an ordered tree data structure that is used to store a dynamic set or associative array where the keys
 * are usually strings. Unlike a binary search tree, no node in the tree stores the key associated with that node; instead, its position
 * in the tree defines the key with which it is associated. All the descendants of a node have a common prefix of the string associated
 * with that node, and the root is associated with the empty string. Values are not necessarily associated with every node. Rather, values
 * tend only to be associated with leaves, and with some inner nodes that correspond to keys of interest. For the space-optimized presentation
 * of prefix tree, see compact prefix tree.
 */
export default class Trie {
  public head: TrieNode
  constructor() {
    this.head = new TrieNode(HEAD_CHARACTER)
  }

  /**
   *
   *
   * @param {string} word
   * @returns {Trie}
   * @memberof Trie
   */
  public addWord(word: string): Trie {
    const characters = Array.from(word)
    let currentNode = this.head

    for (let charIndex = 0; charIndex < characters.length; charIndex++) {
      const isComplete = charIndex === characters.length - 1

      currentNode = currentNode.addChild(characters[charIndex], isComplete)
    }

    return this
  }

  // public deleteWord(word: string) {
  //   const depthFirstDelete = ()
  // }
}
