// function Promise (executor) {
//   let self = this
//   self.status = 'pending'
//   self.value = undefined
//   self.reason = undefined
//   self.onResolvedCallbacks = []
//   self.onRejectedCallbacks = []

//   function resolve (value) {
//     self.status = 'resolved'
//     self.value = value
//     self.onResolvedCallbacks.forEach(function (fn) {
//       fn()
//     })
//   }

//   function reject (reason) {
//     self.status = 'rejected'
//     self.reason = reason
//     self.onRejectedCallbacks.forEach(function (fn) {
//       fn()
//     })
//   }

//   try {
//     executor(resolve, reject)
//   } catch (e) {
//     reject(e)
//   }
// }

// // x从上级传递来的值，p2是此次的promise
// function resolvePromise (p2, x, resolve, reject) {
//   if (p2 === x) {
//     reject(new TypeError('循环引用'))
//   }

//   let called
//   if (x !== null || typeof x === 'object' || typeof x === 'function') {
//     try {
//       let then = x.then     // 判断是否需要递归调用
//       if (typeof then === 'function') {
//         then.call(x, function (y) {
//           if (called) return
//           called = true
//           resolvePromise(p2, y, resolve, reject)
//         }, function (err) {
//           if (called) return
//           called = true
//           reject(err)
//         })
//       } else {
//         resolve(x)
//       }
//     } catch (e) {
//       if (called) return
//       called = true
//       reject(e)
//     }
//   } else {
//     resolve(x)
//   }
// }

// Promise.prototype.then = function (onFulfilled, onRejected) {
//   onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : function (value) {
//     return value
//   }
//   onRejected = typeof onRejected === 'function' ? onRejected : function (reason) {
//     return reason
//   }

//   let self = this
//   let promise2
//   if (self.status === 'resolved') {
//     promise2 = new Promise(function (resolve, reject){
//       setTimeout(function () {
//         try {
//           let x = onFulfilled(self.value)
//           resolvePromise(promise2, x, resolve, reject)
//         } catch (e) {
//           reject(e)
//         }
//       })
//     })
//   } else if (self.status === 'rejected') {
//     promise2 = new Promise(function (resolve, reject) {
//       setTimeout(function () {
//         try {
//           let x = onRejected(self.reason)
//           resolvePromise(promise2, x, resolve, reject)
//         } catch (e) {
//           reject(e)
//         }
//       })
//     })
//   } else if (self.status === 'pending') {
//     promise2 = new Promise(function (resolve, reject) {
//       self.onResolvedCallbacks.push(function () {
//         setTimeout(function () {
//           try {
//             let x = onFulfilled(self.value)
//             resolvePromise(promise2, x, resolve, reject)
//           } catch (e) {
//             reject(e)
//           }
//         })
//       })
//       self.onRejectedCallbacks.push(function () {
//         setTimeout(function () {
//           try {
//             let x = onRejected(self.reason)
//             resolvePromise(promise2, x, resolve, reject)
//           } catch (e) {
//             reject(e)
//           }
//         })
//       })
//     })
//   }
//   return promise2
// }function Promise (executor) {
//   let self = this
//   self.status = 'pending'
//   self.value = undefined
//   self.reason = undefined
//   self.onResolvedCallbacks = []
//   self.onRejectedCallbacks = []

//   function resolve (value) {
//     self.status = 'resolved'
//     self.value = value
//     self.onResolvedCallbacks.forEach(function (fn) {
//       fn()
//     })
//   }

//   function reject (reason) {
//     self.status = 'rejected'
//     self.reason = reason
//     self.onRejectedCallbacks.forEach(function (fn) {
//       fn()
//     })
//   }

//   try {
//     executor(resolve, reject)
//   } catch (e) {
//     reject(e)
//   }
// }

// // x从上级传递来的值，p2是此次的promise
// function resolvePromise (p2, x, resolve, reject) {
//   if (p2 === x) {
//     reject(new TypeError('循环引用'))
//   }

//   let called
//   if (x !== null || typeof x === 'object' || typeof x === 'function') {
//     try {
//       let then = x.then     // 判断是否需要递归调用
//       if (typeof then === 'function') {
//         then.call(x, function (y) {
//           if (called) return
//           called = true
//           resolvePromise(p2, y, resolve, reject)
//         }, function (err) {
//           if (called) return
//           called = true
//           reject(err)
//         })
//       } else {
//         resolve(x)
//       }
//     } catch (e) {
//       if (called) return
//       called = true
//       reject(e)
//     }
//   } else {
//     resolve(x)
//   }
// }

// Promise.prototype.then = function (onFulfilled, onRejected) {
//   onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : function (value) {
//     return value
//   }
//   onRejected = typeof onRejected === 'function' ? onRejected : function (reason) {
//     return reason
//   }

//   let self = this
//   let promise2
//   if (self.status === 'resolved') {
//     promise2 = new Promise(function (resolve, reject){
//       setTimeout(function () {
//         try {
//           let x = onFulfilled(self.value)
//           resolvePromise(promise2, x, resolve, reject)
//         } catch (e) {
//           reject(e)
//         }
//       })
//     })
//   } else if (self.status === 'rejected') {
//     promise2 = new Promise(function (resolve, reject) {
//       setTimeout(function () {
//         try {
//           let x = onRejected(self.reason)
//           resolvePromise(promise2, x, resolve, reject)
//         } catch (e) {
//           reject(e)
//         }
//       })
//     })
//   } else if (self.status === 'pending') {
//     promise2 = new Promise(function (resolve, reject) {
//       self.onResolvedCallbacks.push(function () {
//         setTimeout(function () {
//           try {
//             let x = onFulfilled(self.value)
//             resolvePromise(promise2, x, resolve, reject)
//           } catch (e) {
//             reject(e)
//           }
//         })
//       })
//       self.onRejectedCallbacks.push(function () {
//         setTimeout(function () {
//           try {
//             let x = onRejected(self.reason)
//             resolvePromise(promise2, x, resolve, reject)
//           } catch (e) {
//             reject(e)
//           }
//         })
//       })
//     })
//   }
//   return promise2
// }

export default class Promise {
  public status: string;
  public value: any;
  public reason: any;
  public onResolvedCallback: Array<Function>;
  public onRejectedCallback: Array<Function>;

  constructor(executor: Function) {
    this.status = 'pending';
    this.value = undefined;
    this.reason = undefined;
    this.onResolvedCallback = [];
    this.onRejectedCallback = [];

    try {
      console.log('0: ', this)
      executor(this.resolve, this.reject);
    } catch (e) {
      console.log('2: ', this)
      this.reject(e);
    }
  }

  /**
   *
   *
   * @param {*} value
   * @memberof Promise
   */
  resolve(value) {
    console.log('1: ', this)
    this.status = 'resolved';
    this.value = value;
    this.onResolvedCallback.forEach(fn => fn());
  }

  /**
   *
   *
   * @param {*} reason
   * @memberof Promise
   */
  reject(reason) {
    this.status = 'rejected';
    this.reason = reason;
    this.onRejectedCallback.forEach(fn => fn());
  }

  /**
   *
   *
   * @param {Promise} p2
   * @param {*} x
   * @param {Function} resolve
   * @param {Function} reject
   * @returns
   * @memberof Promise
   */
  resolvePromise(p2: Promise, x, resolve: Function, reject: Function) {
    if (p2 === x) {
      reject(new TypeError('循环引用'));
    }

    let called;

    if (x !== null || typeof x === 'object' || typeof x === 'function') {
      try {
        let then = x.then;
        // 如果then是函数，则需要递归调用
        if (typeof then === 'function') {
          then.call(
            x,
            y => {
              if (called) return;

              called = true;
              this.resolvePromise(p2, y, resolve, reject);
            },
            err => {
              if (called) return;

              called = true;
              reject(err);
            },
          );
        } else {
          resolve(x);
        }
      } catch (err) {
        if (called) return;

        called = true;
        reject(err);
      }
    } else {
      resolve(x);
    }
  }

  /**
   *
   *
   * @param {Function} onFulfilled
   * @param {Function} onRejected
   * @returns {Promise}
   * @memberof Promise
   */
  then(onFulfilled: Function, onRejected: Function): Promise {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    onRejected = typeof onRejected === 'function' ? onRejected : reason => reason;

    let promise2
    let _that = this
    
    if (this.status === 'resolved') {
      promise2 = new Promise((resolve, reject) => {
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value)
            _that.resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0)
      })
    } else if (this.status === 'rejected') {
      promise2 = new Promise((resolve, reject) => {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason)
            _that.resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0)
        
      })
    } else if (this.status === 'pending') {
      promise2 = new Promise((resolve, reject) => {
        this.onResolvedCallback.push(() => {
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value)
              _that.resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          }, 0)
        })

        this.onRejectedCallback.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason)
              _that.resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          }, 0)
        })
      })
    }

    return promise2
  }
}

let promise = new Promise(function (resolve, reject) {
  console.log(1)
  resolve()
})

console.log(4)

promise.then(resolve => {
  console.log(2)
  resolve(0)
}, reject => {
  console.log(3)
  reject()
})