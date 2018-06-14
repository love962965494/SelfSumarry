export default class arrayPolyfill {
  from() {
    if (!Array.from) {
      Array.from = (function(){
        var toStr = Object.prototype.toString
        var isCallable = function(fn) {
          return typeof fn === 'function' || toStr.call(fn) === '[object Function]'
        }
        var toInteger = function(value) {
          var number = Number(value)
          
          if (isNaN(number)) {
            return 0
          }

          if (number === 0 || !isFinite(number)) {
            return number
          }

          return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number))
        }
        var maxSageInteger = Math.pow(2, 53) - 1
        var toLength = function(value) {
          var len = toInteger(value)
          
          return Math.min(Math.max(len, 0), maxSageInteger)
        }

        // the length property of the from method is 1
        return function from(arrayLike/*, mapFn, thisArg*/) {
          // let _that be this value
          var _that = this
          // let items be ToObject(arrayLike)
          var items = Object(arrayLike)

          // ReturnIfAbrupt(items)
          if (arrayLike === null) {
            throw new TypeError('Array.from requires an array-like object - not null or undefined')
          }

          // if mapFn is undefined, then let mapping be false
          var mapFn = arguments.length > 1 ? arguments[1] : void undefined
          var T

          if (typeof mapFn !== 'undefined') {
            // if IsCallable(mapFn) is false, throw a TypeError exception
            if (!isCallable(mapFn)) {
              throw new TypeError('Array.from: when provided, the second argument must be a function')
            }

            // is thisArg was supplied, let T be thisArg; else let T be undefined
            if (arguments.length > 2) {
              T = arguments[2]
            }
          }

          // let lenValue be Get(items, 'length')
          // let len be ToLength(lenValue)
          var len = toLength(items.length)

          // if IsConstructor(_that) is true, then
          // a: let A be the result of calling the [[Constructor]] internal method
          // of _that with an argument list containing the single item len
          // b: else let a be ArrayCreate(len)
          var result = isCallable(_that) ? Object(new _that(len)) : new Array(len)

          var k = 0
          var kValue

          while (k < len) {
            kValue = items[k]
            if (mapFn) {
              result[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k)
            } else {
              result[k] = kValue
            }
            k += 1
          }
          result.length = len

          return result
        }
      }())
    }
  }
}