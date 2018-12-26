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

  /**
   *
   *
   * @param {string} word
   * @returns {Trie}
   * @memberof Trie
   */
  public deleteWord(word: string): Trie {
    const depthFirstDelete = (currentNode: TrieNode, charIndex: number = 0) => {
      if (charIndex >= word.length) {
        // Return if we're trying to delete the character that is out of word's scope
        return
      }

      const character = word[charIndex]
      const nextNode = currentNode.getChild(character)

      if (nextNode === null) {
        // Return if we're trying to delete a word that has not been added to the Trie
        return
      }

      // Go deeper
      depthFirstDelete(nextNode, charIndex + 1)

      // Since we're going to delete a word let's un-mark its last character isCompleteWord flag
      if (charIndex === (word.length - 1)) {
        nextNode.isCompletedWord = false
      }

      // childNod is deleted only if:
      // - childNode has NO children
      // - childNode.isCompleteWord === false
      currentNode.removeChild(character)
    }

    depthFirstDelete(this.head)

    return this
  }

  /**
   *
   *
   * @param {string} word
   * @returns {(string[] | null)}
   * @memberof Trie
   */
  public suggestNextCharacters(word: string): string[] | null {
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
  public doesWordExist(word: string): boolean {
    const lastCharacter = this.getLastCharacterNode(word)

    return !!lastCharacter && lastCharacter.isCompletedWord
  }

  /**
   *
   *
   * @param {string} word
   * @returns {(TrieNode | null)}
   * @memberof Trie
   */
  public getLastCharacterNode(word: string): TrieNode | null {
    const characters = Array.from(word)
    let currentNode = this.head

    for (const character of characters) {
      if (!currentNode.hasChild(characters[character])) {
        return null
      }

      currentNode = currentNode.getChild(characters[character])
    }

    return currentNode
  }
}

const trie = new Trie()
trie.addWord('english')

console.log(trie)
