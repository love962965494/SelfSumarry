/**
 * @description:
 *   与对象相关的一些小技巧
 *
 * @export
 * @class ObjectTips
 */
export default class ObjectTips {
  /**
   * @function: cleanObj 从对象中删除属性
   * @description:
   *   从JSON对象删除除了指定属性之外的任何其他属性
   *   使用Object.keys()方法遍历给定的JSON对象并删除给定数组中不包含的keys
   *   如果你传递一个特殊的键childIndicator，它也会深入地将这个函数应用到内部对象中
   *
   * @param {object} obj
   * @param {string[]} keysToKeep
   * @param {string} childIndicator
   * @returns {object}
   * @memberof ObjectTips
   */
  public cleanObj(
    obj: object,
    keysToKeep: string[],
    childIndicator: string
  ): object {
    Object.keys(obj).forEach(key => {
      if (key === childIndicator) {
        this.cleanObj(obj[key], keysToKeep, childIndicator)
      } else if (!keysToKeep.includes(key)) {
        delete obj[key]
      }
    })
    return obj
  }

  public functions(obj: object, inherited: boolean = false) {
    ;(inherited
      ? [...Object.keys(obj), ...Object.keys(Object.getPrototypeOf(obj))]
      : Object.keys(obj)
    ).filter(key => typeof obj[key] === 'function')
  }
}

const objectTips = new ObjectTips()

/**
 * example of cleanObj
 */
const testObj = { a: 1, b: 2, children: { a: 1, b: 2 } }
console.log('cleanObj: ', objectTips.cleanObj(testObj, ['a'], 'children'))
