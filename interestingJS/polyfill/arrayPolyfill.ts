export default class arrayPolyfill {
  /**
   * @function: find(arrayLike, mapFn?: Function, thisArg?)，根据arrayLike返回一个新的数组
   * @description:
   *   Array上的方法，如果参数中mapFn是函数的话，则新创建的数组每个元素都会调用一次该函数
   *   类似于：Array.from(arrayLike).map(mapFn)
   *
   * @memberof arrayPolyfill
   */
  from() {
    if (!Array.from) {
      Array.from = (function() {
        var toStr = Object.prototype.toString;
        var isCallable = function(fn) {
          return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
        };
        var toInteger = function(value) {
          var number = Number(value);

          if (isNaN(number)) {
            return 0;
          }

          if (number === 0 || !isFinite(number)) {
            return number;
          }

          return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
        };
        var maxSageInteger = Math.pow(2, 53) - 1;
        var toLength = function(value) {
          var len = toInteger(value);

          return Math.min(Math.max(len, 0), maxSageInteger);
        };

        // the length property of the from method is 1
        return function from(arrayLike /*, mapFn, thisArg*/) {
          // let _that be this value
          var _that = this;
          // let items be ToObject(arrayLike)
          var items = Object(arrayLike);

          // ReturnIfAbrupt(items)
          if (arrayLike === null) {
            throw new TypeError('Array.from requires an array-like object - not null or undefined');
          }

          // if mapFn is undefined, then let mapping be false
          var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
          var T;

          if (typeof mapFn !== 'undefined') {
            // if IsCallable(mapFn) is false, throw a TypeError exception
            if (!isCallable(mapFn)) {
              throw new TypeError(
                'Array.from: when provided, the second argument must be a function',
              );
            }

            // is thisArg was supplied, let T be thisArg; else let T be undefined
            if (arguments.length > 2) {
              T = arguments[2];
            }
          }

          // let lenValue be Get(items, 'length')
          // let len be ToLength(lenValue)
          var len = toLength(items.length);

          // if IsConstructor(_that) is true, then
          // a: let A be the result of calling the [[Constructor]] internal method
          // of _that with an argument list containing the single item len
          // b: else let a be ArrayCreate(len)
          var result = isCallable(_that) ? Object(new _that(len)) : new Array(len);

          var k = 0;
          var kValue;

          while (k < len) {
            kValue = items[k];
            if (mapFn) {
              result[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
            } else {
              result[k] = kValue;
            }
            k += 1;
          }
          result.length = len;

          return result;
        };
      })();
    }
  }

  /**
   * @function: findIndex(predicate: Function, thisArg?) 找到数组中第一个复合要求的元素，返回其索引
   * @description:
   *   Array.prototype上的方法
   *
   *
   * @memberof arrayPolyfill
   */
  findIndex() {
    if (!Array.prototype.findIndex) {
      Object.defineProperty(Array.prototype, 'findIndex', {
        value: function(predicate) {
          if (this == null) {
            throw new TypeError('"this" is null or undefined');
          }

          var o = Object(this);
          var len = o.length >>> 0;

          if (typeof predicate !== 'function') {
            throw new TypeError('predicate must be a function');
          }

          var thisArg = arguments[1];
          var k = 0;

          while (k < len) {
            // a. Let Pk be ! ToString(k)
            // b. Let kValue be ? Get(O, Pk)
            // c. Let testResult be ToBoolean(? Call(predicate, T, << kValue, k, O >>))
            // d. If testResult is true, return k
            var kValue = o[k];

            if (predicate.call(thisArg, kValue, k, o)) {
              return k;
            }
            k++;
          }

          return -1;
        },
      });
    }
  }

  /**
   * @function: filter(fun: Function, thisArg?) 遍历数组返回所有执行fun返回真值的元素，组成新的数组
   * @description:
   *   Array.prototype上的方法
   *
   * @memberof arrayPolyfill
   */
  filter() {
    if (!Array.prototype.filter) {
      Object.defineProperty(Array.prototype, 'filter', {
        value: function(fun/*, thisArg*/) {
          if (this === void 0 || this === null) {
            throw new TypeError()
          }

          var t = Object(this)
          var len = t.length >>> 0
          
          if (typeof fun !== 'function') {
            throw new TypeError()
          }

          var res = []
          var thisArg = arguments.length >= 2 ? arguments[1] : void 0

          for (var i = 0; i < len; i++) {
            if (i in t) {
              var val = t[i]
              // NOTE: Technically this should Object.defineProperty at the next index,
              //       as push can be affected by properties on Object.prototype and 
              //       Array.prototype. But that method's new, and collisions should be 
              //       rare, so use the more-compatible alternative.
              if (fun.call(thisArg, val, i, t)) {
                res.push(val)
              }
            }
          }

          return res
        }
      })
    }
  }
}
