
export default class ArrayTips {
  /**
   * @function: chunk 数组分块
   * @description: 
   *   把一个数组分成指定大小的小数组
   *   使用Array.from()创建一个新的数组，它的长度就是生成chunk块的数量。
   *   使用Array.slice()将新数组的每个元素映射到长度为size的chunk中。
   *   如果原始数组不能均匀分割，最后的chunk将包含剩余的元素。
   *
   * @param {Array<any>} arr
   * @param {number} size
   * @returns {Array<any>}
   * @memberof ArrayTips
   */
  chunk(arr: Array<any>, size: number): Array<any> {
    // Array.from(obj, mapFn) => Array.from(obj).map(mapFn)
    // Array.from({length: 5}, (v, i) => i) => [0, 1, 2, 3, 4]
    return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) => arr.slice(i * size, i * size + size))
  }

  /**
   * @function: compact 过滤掉数组中所有假值元素
   * @description:
   *   从数组中移除falsy值元素
   *   使用Array.filter()过滤掉数组中所有假值元素(false, null, 0, '', undefined, NaN)
   *
   * @param {Array<any>} arr
   * @returns {Array<any>}
   * @memberof ArrayTips
   */
  compact(arr: Array<any>): Array<any> {
    return arr.filter(Boolean)
  }

  /**
   * @function: countBy 返回每个分组数组中元素的数量
   * @description:
   *   根据给定的函数对数组的元素进行分组，并返回每个分组中元素的数量
   *   使用Array.map()将数组的值映射到函数或属性名称。使用Array.reduce()创建一个对象，其中的键是从映射的结果中产生的
   *
   * @param {Array<any>} arr
   * @param {*} fn
   * @returns {object}
   * @memberof ArrayTips
   */
  countBy(arr: Array<any>, fn): object {
    return arr.map(typeof fn === 'function' ? fn : val => val[fn]).reduce((acc, val: any, i) => {
      acc[val] = (acc[val] || 0) + 1
      return acc
    }, {})
  }

  /**
   * @function: countOccurrences 计算数组中某个值的出现次数
   * @description:
   *   计算数组中值得出现次数
   *   每次遇到数组中的某个特定值时，使用Array.reduce()来递增计数器
   *
   * @param {Array<any>} arr
   * @param {*} val
   * @returns {number}
   * @memberof ArrayTips
   */
  countOccurrences(arr: Array<any>, val): number {
    return arr.reduce((a, v) => (v === val ? a + 1 : a + 0), 0)
  }
}

const arrayTips = new ArrayTips()

/**
 * example of chunk
 */
console.log('chunkL: ', arrayTips.chunk([1, 2, 3, 4, 5], 2))

/**
 * example of compact
 */
console.log('compact: ', arrayTips.compact([0, 1, false, 2, '', 3, 'a', NaN, 's', 34]))

/**
 * example of countBy
 */
console.log('countBy: ', arrayTips.countBy([6.1, 4.2, 6.3], Math.floor))
console.log('countBy: ', arrayTips.countBy(['one', 'two', 'three'], 'length'))

/**
 * example of countOccurrences
 */
console.log('countOccurrences: ', arrayTips.countOccurrences([1, 2, 1, 1, 2, 3, 1], 1))