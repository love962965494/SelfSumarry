type IResolved = (value: any) => void
type IRejected = (reason: any) => void
type IExecutor = (resolve: IResolved, reject: IRejected) => void
enum Status {
  PENDING = 'pending',
  FULFILLED = 'fulfilled',
  REJECTED = 'rejected'
}

export default class Promise {
  /**
   * Promise.resolve()
   *
   * @static
   * @memberof Promise
   */
  public static resolve = (val: any) => {
    return new Promise((resolve, reject) => {
      resolve(val)
    })
  }

  /**
   * Promise.reject()
   *
   * @static
   * @memberof Promise
   */
  public static reject = (reason: any) => {
    return new Promise((resolve, reject) => {
      reject(reason)
    })
  }

  /**
   * Promise.race()
   *
   * @static
   * @memberof Promise
   */
  public static race = (promises: Promise[]) => {
    return new Promise((resolve, reject) => {
      for (const promise of promises) {
        promise.then(resolve, reject)
      }
    })
  }

  /**
   * Promise.all()
   *
   * @static
   * @memberof Promise
   */
  public static all = (promises: Promise[]) => {
    const arr: any[] = []

    return new Promise((resolve, reject) => {
      for (let i = 0; i < promises.length; i++) {
        promises[i].then((data) => {
          arr[i] = data

          if (i === promises.length) {
            resolve(arr)
          }
        }, reject)
      }
    })
  }

  public state: Status
  public value: any
  public reason: any
  public onResolvedCallbacks: Array<() => void>
  public onRejectedCallbacks: Array<() => void>

  /**
   * Creates an instance of Promise.
   *
   * @param {IExecutor} executor
   * @memberof Promise
   */
  constructor(executor: IExecutor) {
    this.state = Status.PENDING
    this.value = undefined
    this.reason = undefined
    this.onResolvedCallbacks = []
    this.onRejectedCallbacks = []

    const resolve = (value: any) => {
      if (this.state === Status.PENDING) {
        this.state = Status.FULFILLED
        this.value = value
        this.onResolvedCallbacks.forEach((fn) => fn())
      }
    }

    const reject = (reason: any) => {
      if (this.state === Status.PENDING) {
        this.state = Status.REJECTED
        this.reason = reason
        this.onRejectedCallbacks.forEach((fn) => fn())
      }
    }

    try {
      executor(resolve, reject)
    } catch (err) {
      reject(err)
    }
  }

  /**
   *
   *
   * @param {(value: any) => any} [onFulfilled]
   * @param {(reason: any) => any} [onRejected]
   * @returns
   * @memberof Promise
   */
  public then(onFulfilled?: (value: any) => any, onRejected?: (reason: any) => any) {
    // onFulfilled如果不是函数，就忽略onFulfilled，直接返回value
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (value) => value
    // onRejected如果不是函数，就忽略onRejected，直接扔出错误
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : (err) => {
            throw err
          }

    const promise2 = new Promise((resolve, reject) => {
      if (this.state === Status.FULFILLED) {
        setTimeout(() => {
          try {
            const x = onFulfilled!(this.value)
            this.resolvePromise(promise2, x, resolve, reject)
          } catch (err) {
            reject(err)
          }
        }, 0)
      }

      if (this.state === Status.REJECTED) {
        setTimeout(() => {
          try {
            const x = onRejected!(this.reason)
            this.resolvePromise(promise2, x, resolve, reject)
          } catch (err) {
            reject(err)
          }
        }, 0)
      }

      if (this.state === Status.PENDING) {
        this.onResolvedCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onFulfilled!(this.value)
              this.resolvePromise(promise2, x, resolve, reject)
            } catch (err) {
              reject(err)
            }
          }, 0)
        })

        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onRejected!(this.reason)
              this.resolvePromise(promise2, x, resolve, reject)
            } catch (err) {
              reject(err)
            }
          }, 0)
        })
      }
    })

    return promise2
  }

  /**
   *
   *
   * @param {Promise} promise2
   * @param {*} x
   * @param {IResolved} resolve
   * @param {IRejected} reject
   * @returns
   * @memberof Promise
   */
  public resolvePromise(promise2: Promise, x: any, resolve: IResolved, reject: IRejected) {
    if (x === promise2) {
      return reject(new TypeError('Chaining cycle detected for promise'))
    }

    let called: boolean = false

    if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
      try {
        const then = x.then

        if (typeof then === 'function') {
          then.call(
            x,
            (y: Promise) => {
              if (called) {
                return
              }

              called = true
              this.resolvePromise(promise2, y, resolve, reject)
            },
            (err: any) => {
              if (called) {
                return
              }

              called = true
              reject(err)
            }
          )
        } else {
          resolve(x)
        }
      } catch (err) {
        if (called) {
          return
        }

        called = true
        reject(err)
      }
    } else {
      resolve(x)
    }
  }
}
