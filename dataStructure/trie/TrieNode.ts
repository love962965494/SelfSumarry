import HashTable from '../hashTable/hashTable'

export default class TrieNode {
  private children: HashTable
  constructor(public character: string, public isCompletedWord: boolean = false) {
    this.character = character
    this.isCompletedWord = isCompletedWord
    this.children = new HashTable()
  }

  /**
   *
   *
   * @param {string} character
   * @returns {TrieNode}
   * @memberof TrieNode
   */
  public getChild(character: string): TrieNode {
    return this.children.get(character)
  }

  /**
   *
   *
   * @param {string} character
   * @param {boolean} isCompletedWord
   * @returns {TrieNode}
   * @memberof TrieNode
   */
  public addChild(character: string, isCompletedWord: boolean): TrieNode {
    if (!this.children.has(character)) {
      this.children.set(character, new TrieNode(character, isCompletedWord))
    }

    const childNode = this.children.get(character)

    // In cases similar to adding "car" after "carpet" we need to mark "r" character as complete
    childNode.isCompletedWord = childNode.isCompletedWord || isCompletedWord

    return childNode
  }

  /**
   *
   *
   * @param {string} character
   * @returns
   * @memberof TrieNode
   */
  public removeChild(character: string) {
    const childNode = this.getChild(character)

    // Delete childNode only if:
    // - childNode has no children
    // - childNode.isCompleteWord === false
    if (childNode && !childNode.isCompletedWord && !childNode.hasChildren()) {
      this.children.delete(character)
    }

    return this
  }

  /**
   *
   *
   * @param {string} character
   * @returns {boolean}
   * @memberof TrieNode
   */
  public hasChild(character: string): boolean {
    return this.children.has(character)
  }

  /**
   *
   *
   * @returns {boolean}
   * @memberof TrieNode
   */
  public hasChildren(): boolean {
    return this.children.getKeys().length !== 0
  }

  /**
   *
   *
   * @returns {string[]}
   * @memberof TrieNode
   */
  public suggestChildren(): string[] {
    return [...this.children.getKeys()]
  }

  /**
   *
   *
   * @returns {string}
   * @memberof TrieNode
   */
  public toString(): string {
    let childrenAsString = this.suggestChildren().toString()
    childrenAsString = childrenAsString ? `:${childrenAsString}` : ''

    const isCompleteString = this.isCompletedWord ? '*' : ''

    return `${this.character}${isCompleteString}${childrenAsString}`
  }
}
