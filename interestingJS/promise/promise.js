function Promise (executor) {
  let self = this
  self.status = 'pending'
  self.value = undefined
  self.reason = undefined
  self.onResolvedCallbacks = []
  self.onRejectedCallbacks = []

  function resolve (value) {
    self.status = 'resolved'
    self.value = value
    self.onResolvedCallbacks.forEach(function (fn) {
      fn()
    })
  }

  function reject (reason) {
    self.status = 'rejected'
    self.reason = reason
    self.onRejectedCallbacks.forEach(function (fn) {
      fn()
    })
  }

  try {
    executor(resolve, reject)
  } catch (e) {
    reject(e)
  }
}

// x从上级传递来的值，p2是此次的promise
function resolvePromise (p2, x, resolve, reject) {
  if (p2 === x) {
    reject(new TypeError('循环引用'))
  }

  let called
  if (x !== null || typeof x === 'object' || typeof x === 'function') {
    try {
      let then = x.then     // 判断是否需要递归调用
      if (typeof then === 'function') {
        then.call(x, function (y) {
          if (called) return
          called = true
          resolvePromise(p2, y, resolve, reject)
        }, function (err) {
          if (called) return
          called = true
          reject(err)
        })
      } else {
        resolve(x)
      }
    } catch (e) {
      if (called) return
      called = true
      reject(e)
    }
  } else {
    resolve(x)
  }
}

Promise.prototype.then = function (onFulfilled, onRejected) {
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : function (value) {
    return value
  }
  onRejected = typeof onRejected === 'function' ? onRejected : function (reason) {
    return reason
  }

  let self = this
  let promise2
  if (self.status === 'resolved') {
    promise2 = new Promise(function (resolve, reject){
      setTimeout(function () {
        try {
          let x = onFulfilled(self.value)
          resolvePromise(promise2, x, resolve, reject)
        } catch (e) {
          reject(e)
        }
      })
    })
  } else if (self.status === 'rejected') {
    promise2 = new Promise(function (resolve, reject) {
      setTimeout(function () {
        try {
          let x = onRejected(self.reason)
          resolvePromise(promise2, x, resolve, reject)
        } catch (e) {
          reject(e)
        }
      })
    })
  } else if (self.status === 'pending') {
    promise2 = new Promise(function (resolve, reject) {
      self.onResolvedCallbacks.push(function () {
        setTimeout(function () {
          try {
            let x = onFulfilled(self.value)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      })
      self.onRejectedCallbacks.push(function () {
        setTimeout(function () {
          try {
            let x = onRejected(self.reason)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      })
    })
  }
  return promise2
}