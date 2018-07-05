

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
  public chunk(arr: any[], size: number): any[] {
    // Array.from(obj, mapFn) => Array.from(obj).map(mapFn)
    // Array.from({length: 5}, (v, i) => i) => [0, 1, 2, 3, 4]
    return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
      arr.slice(i * size, i * size + size)
    )
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
  public compact(arr: any[]): any[] {
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
  public countBy(arr: any[], fn: ((x: number) => number) | string): object {
    return arr
      .map(typeof fn === 'function' ? fn : val => val[fn])
      .reduce((acc, val: any, i) => {
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
  public countOccurrences(arr: any[], val: any): number {
    return arr.reduce((a, v) => (v === val ? a + 1 : a + 0), 0)
  }

  /**
   * @function: deepFlatten 深度平铺数组
   * @description:
   *   深度平铺一个数组
   *   使用递归。通过空数组([])使用Array.concat()，结合展开运算符(...)来平铺数组。递归平铺每个数组元素。
   *
   * @param {Array<any>} arr
   * @returns {Array<any>}
   * @memberof ArrayTips
   */
  public deepFlatten(arr: any[]): any[] {
    return [].concat(
      ...arr.map(v => (Array.isArray(v) ? this.deepFlatten(v) : v))
    )
  }

  /**
   * @function: difference 数组比较
   * @description:
   *   返回两个数组之间的差异
   *   根据数组arr2创建一个Set对象，然后在数组arr1上使用Array.filter()方法，过滤出数组arr2中不包含的值。
   *
   * @param {Array<any>} arr1
   * @param {Array<any>} arr2
   * @returns {Array<any>}
   * @memberof ArrayTips
   */
  public difference(arr1: any[], arr2: any[]): any[] {
    const s = new Set(arr2)
    return arr1.filter(x => !s.has(x))
  }

  /**
   * @function: differenceWith 通过比较函数比较两个数组的差异
   * @description:
   *   过滤出数组中比较函数不返回true的所有值。类似于difference，除了接受一个comparator（比较函数）
   *   使用Array.filter()和Array.findIndex()来查找合适的值
   *
   * @param {Array<any>} arr
   * @param {Array<any>} val
   * @param {Function} comp
   * @returns {Array<any>}
   * @memberof ArrayTips
   */
  public differenceWith(
    arr: any[],
    val: any[],
    comp: (a: any, b: any) => boolean
  ): any[] {
    return arr.filter(a => val.findIndex(b => comp(a, b)) === -1)
  }

  /**
   * @function: distinctValuesOfArray 数组去重
   * @description:
   *   返回数组的所有不同值
   *   使用ES6的Set和...rest操作符剔除重复的值
   *
   * @param {Array<any>} arr
   * @returns {Array<any>}
   * @memberof ArrayTips
   */
  public distinctValuesOfArray(arr: any[]): any[] {
    return [...new Set(arr)]
  }

  /**
   * @function: dropElements 删除数组中的元素
   * @description:
   *   删除数组中的元素，知道传递的函数返回true。返回数组中的其余元素。
   *   循环访问数组，使用Array.slice()在数组中从第一个元素开始删除，直到函数的返回值为true。返回其余的元素
   *
   * @param {Array<any>} arr
   * @param {Function} func
   * @returns {Array<any>}
   * @memberof ArrayTips
   */
  public dropElements(arr: any[], func: (item: any) => boolean): any[] {
    while (arr.length > 0 && !func(arr[0])) {
      arr = arr.slice(1)
    }
    return arr
  }

  /**
   * @function: dropRight 从右开始删除数组元素
   * @description:
   *   返回从右开始删除n个元素的新数组。
   *   检查n是否小于给定数组的长度，并且使用Array.slice()来从右开始删除指定数量的元素
   *
   * @param {Array<any>} arr
   * @param {number} [n=1]
   * @returns {Array<any>}
   * @memberof ArrayTips
   */
  public dropRight(arr: any[], n: number = 1): any[] {
    return arr.slice(0, -n)
  }

  /**
   * @function: everyNth 获得数组中的每个第n个元素
   * @description:
   *   返回数组中的每个第n个元素
   *   使用Array.filter()创建一个包含指定数组的每个第n个元素的新数组
   *
   * @param {Array<any>} arr
   * @param {number} nth
   * @returns {Array<any>}
   * @memberof ArrayTips
   */
  public everyNth(arr: any[], nth: number): any[] {
    return arr.filter((v, i) => i % nth === nth - 1)
  }

  /**
   * @function: 过滤掉数组中的非唯一值
   * @description:
   *   过滤掉数组中的非唯一值
   *   使用Array.filter()滤除掉非唯一值，使数组仅包含唯一值。
   *
   * @param {Array<any>} arr
   * @returns {Array<any>}
   * @memberof ArrayTips
   */
  public filterNonUnique(arr: any[]): any[] {
    return arr.filter(i => arr.indexOf(i) === arr.lastIndexOf(i))
  }

  /**
   * @function: findLast 返回提供的函数返回真值的最后一个元素
   * @description:
   *   返回 提供的函数返回真(truthy)值的最后一个元素
   *   使用Array.filter()移除fn返回falsy值得元素，Array.slice(-1)得到最好后一个元素
   *
   * @param {Array<any>} arr
   * @param {(value: any, index: number) => any} fn
   * @returns {Array<any>}
   * @memberof ArrayTips
   */
  public findLast(arr: any[], fn: (value: any, index: number) => any): any[] {
    return arr.filter(fn).slice(-1)
  }

  /**
   * @function: flatten 平铺数组
   * @description:
   *   将数组平铺到指定的深度
   *   使用递归，为每个深度级别depth递减1.使用Array.reduce()和Array.concat()来合并元素或数组
   *   基本情况下，depth等于1停止递归。省略第二个参数，depth只能平铺到1(单层平铺)的深度
   *
   * @param {Array<any>} arr
   * @param {number} [depth=1]
   * @returns {Array<any>}
   * @memberof ArrayTips
   */
  public flatten(arr: any[], depth: number = 1): any[] {
    return depth !== 1
      ? arr.reduce(
          (a, v) => a.concat(Array.isArray(v) ? this.flatten(v, depth - 1) : v),
          []
        )
      : arr.reduce((a, v) => a.concat(v), [])
  }

  /**
   * @function: forEachRight 从数组的最后一个元素开始遍历数组
   * @description:
   *   从数组的最后一个元素开始，为每个数组元素执行一次提供的函数
   *   使用Array.slice(0)克隆给定的数组，Array.reverse()反转数组，Array.forEach()遍历这个反向数组
   *
   * @param {Array<any>} arr
   * @param {(value: any, index: number, arr: Array<any>) => any} callback
   * @returns
   * @memberof ArrayTips
   */
  public forEachRight(
    arr: any[],
    callback: (value: any, index: number, arr: any[]) => any
  ) {
    return arr
      .slice(0)
      .reverse()
      .forEach(callback)
  }

  /**
   * @function: groupBy 数组分组
   * @description:
   *   根据给定的函数对数组元素进行分组
   *   使用Array.map()将数组的值映射到函数或属性名称。
   *   使用Array.reduce()来创建一个对象，其中的key是从映射结果中产生
   *
   * @param {any[]} arr
   * @param {((string | ((args?: any) => any)))} fn
   * @returns {object}
   * @memberof ArrayTips
   */
  public groupBy(arr: any[], fn: string | ((args?: any) => any)): object {
    return arr
      .map(typeof fn === 'function' ? fn : val => val[fn])
      .reduce((acc, val, i) => {
        acc[val] = (acc[val] || []).concat(arr[i])
        return acc
      }, {})
  }

  /**
   * @function: head 获取数组的第一个元素
   * @description:
   *   返回数组的第一个元素
   *   使用arr[0]返回传递数组的第一个元素
   *
   * @param {any[]} arr
   * @returns {*}
   * @memberof ArrayTips
   */
  public head(arr: any[]): any {
    return arr[0]
  }

  /**
   * @function: indexOfAll 返回指定元素的所有索引
   * @description:
   *   返回数组中左右val的索引。如果val从不出现，则返回[]
   *   使用Array.forEach()循环元素和Array.push()来存储匹配元素的索引。返回索引数组
   *
   * @param {any[]} arr
   * @param {*} val
   * @returns {any[]}
   * @memberof ArrayTips
   */
  public indexOfAll(arr: any[], val: any): any[] {
    const indices: any[] = []
    arr.forEach((el, i) => el === val && indices.push(i))
    return indices
  }

  public initial(arr: any[]): any {
    return arr.slice(0, -1)
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
console.log(
  'compact: ',
  arrayTips.compact([0, 1, false, 2, '', 3, 'a', NaN, 's', 34])
)

/**
 * example of countBy
 */
console.log('countBy: ', arrayTips.countBy([6.1, 4.2, 6.3], Math.floor))
console.log('countBy: ', arrayTips.countBy(['one', 'two', 'three'], 'length'))

/**
 * example of countOccurrences
 */
console.log(
  'countOccurrences: ',
  arrayTips.countOccurrences([1, 2, 1, 1, 2, 3, 1], 1)
)

/**
 * example of deepFlatten
 */
console.log('deepFlatten: ', arrayTips.deepFlatten([1, [2], [[3], 4, 5]]))

/**
 * example of difference
 */
console.log('difference: ', arrayTips.difference([1, 2, 3], [2, 4, 5]))

/**
 * example of differenceWith
 */
console.log(
  'differenceWith: ',
  arrayTips.differenceWith(
    [1, 1.2, 1.5, 3, 0],
    [1.9, 3, 0],
    (a: number, b: number) => Math.round(a) === Math.round(b)
  )
)

/**
 * example of distinctValuesOfArray
 */
console.log(
  'distinctValuesOfArray: ',
  arrayTips.distinctValuesOfArray([1, 2, 2, 3, 4, 3, 5])
)

/**
 * example of dropElements
 */
console.log(
  'dropElements: ',
  arrayTips.dropElements([1, 2, 3, 4], (n: number) => n >= 3)
)

/**
 * example of dropRight
 */
console.log('dropRight: ', arrayTips.dropRight([1, 2, 3, 4], 1))

/**
 * example of everyNth
 */
console.log('everyNth: ', arrayTips.everyNth([1, 2, 3, 4, 5, 6], 2))

/**
 * example of filterNonUnique
 */
console.log(
  'filterNonUnique: ',
  arrayTips.filterNonUnique([1, 2, 3, 2, 4, 1, 4, 5])
)

/**
 * example of findLast
 */
console.log('findLast: ', arrayTips.findLast([1, 2, 3, 4], n => n % 2 === 1))

/**
 * example of flatten
 */
console.log('flatten: ', arrayTips.flatten([1, [2, [3, [4, 5]]]]), 2)

/**
 * example of forEachRight
 */
console.log(
  'forEachRight: ',
  arrayTips.forEachRight([1, 2, 3, 4], val => console.log(val))
)

/**
 * example of groupBy
 */
console.log('groupBy: ', arrayTips.groupBy([6.1, 4.2, 6.3], Math.floor))
console.log('groupBy: ', arrayTips.groupBy(['one', 'two', 'three'], 'length'))
