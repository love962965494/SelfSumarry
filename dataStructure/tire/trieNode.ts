import HashTable from '../hashTable/hashTable'

export default class TrieNode {
  public character: string
  public isCompleteWord: boolean
  public children: HashTable
  constructor(character, isCompleteWord = false) {
    this.character = character
    this.isCompleteWord = isCompleteWord
    this.children = new HashTable()
  }

  /**
   *
   *
   * @param {string} character
   * @returns
   * @memberof TrieNode
   */
  getChild(character: string) {
    return this.children.get(character)
  }

  /**
   *
   *
   * @param {string} character
   * @param {boolean} [isCompleteWord=false]
   * @returns
   * @memberof TrieNode
   */
  addChild(character: string, isCompleteWord: boolean = false) {
    if (!this.children.has(character)) {
      this.children.set(character, new TrieNode(character, isCompleteWord))
    }

    return this.children.get(character)
  }

  /**
   *
   *
   * @param {string} character
   * @returns
   * @memberof TrieNode
   */
  hasChild(character: string) {
    return this.children.has(character)
  }

  /**
   *
   *
   * @returns
   * @memberof TrieNode
   */
  suggestChildren() {
    return [...this.children.getKeys()]
  }

  /**
   *
   *
   * @returns {string}
   * @memberof TrieNode
   */
  toString(): string {
    let childrenAsString = this.suggestChildren().toString()
    
    childrenAsString = childrenAsString ? `:${childrenAsString}` : ''

    const isCompleteString = this.isCompleteWord ? '*' : ''

    return `${this.character}${isCompleteString}${childrenAsString}`
  }
}

// const trieNode = new TrieNode('a')
// trieNode.addChild('a', true)
// trieNode.addChild('o')
// console.log(trieNode)