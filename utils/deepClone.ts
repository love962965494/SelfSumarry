/**
 * 如果不考虑原型链丢失问题，拷贝的到的object其constructor都指向Object
 * 也无法实现对函数、RegExp等特殊对象的拷贝
 * 循环引用会报错
 * @param obj 
 */
export const cloneByJSON = (obj: object): object => JSON.parse(JSON.stringify(obj))

/**
 * 完整的深拷贝例子
 * @param obj 
 */
const deepClone = (obj: any): any => {
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  switch(Object.prototype.toString.call(obj)) {
    case '[object Array]': {
      const result = new Array(obj.length)
      for (let i = 0; i < obj.length; i++) {
        result[i] = deepClone(obj[i])
      }
      return result
    }

    // Object.prototype.toString.call(new XxxError) returns '[object Error]'
    case '[object Error]': {
      const result = new obj.constructor(obj)
      result.stack = obj.stack
      return result
    }

    case '[object Date]':
    case '[object RegExp]':
    case '[object Int8Array]':
    case '[object Uint8Array]':
    case '[object Uint8ClampedArray]':
    case '[object Int16Array]':
    case '[object Uint16Array]':
    case '[object Int32Array]':
    case '[object Uint32Array]':
    case '[object Float32Array]':
    case '[object Float64Array]':
    case '[object Map]':
    case '[object Set]': {
      return new obj.constructor(obj)
    }

    case '[object Symbol]': {
      return Symbol(String(obj).slice(7, -1))
    }

    case '[object Object]': {
      const keys = Object.keys(obj)
      const result = {}
      
      for (let i =0; i < keys.length; i++) {
        let key = keys[i]
        result[key] = deepClone(obj[key])
      }
      return result
    }

    default: {
      throw new Error('Unable to copy obj! Its type is not supported')
    }
  }
}

export default deepClone
