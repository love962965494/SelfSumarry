export default class Adapter {
  
  /**
   * 给定一个key和一个set作为参数，给定上下文时调用它们。主要用于函数组合。
   * 使用闭包以存储的参数调用存储的key
   *
   * @param {*} key
   * @param {*} args
   * @returns
   * @memberof Adapter
   */
  call(key, ...args) {
    return context => context[key](...args)
  }

  /**
   * 将接受数组的函数改变为可变参数函数
   * 给定一个函数，返回一个闭包，将所有输入收集到一个接受函数的数组中
   *
   * @param {Function} fn
   * @returns
   * @memberof Adapter
   */
  collectInto(fn: Function) {
    return (...args) => fn(args)
  }

  /**
   * flip接受一个函数参数，然后将该函数第一个参数作为最后一个参数。
   * 返回一个接受可变参数输入的闭包，并且在应用其余参数之前将最后一个参数作为第一个参数
   *
   * @param {Function} fn
   * @returns
   * @memberof Adapter
   */
  flip(fn: Function) {
    return (...args) => fn(args.pop(), ...args)
  }

  /**
   * 执行从左到右的函数组合
   * 使用Array.reduce()与展开操作符(...)来执行从左到右的函数组合。
   * 第一个(最左边的)函数可以接受一个或多个参数；其余的函数必须是一元函数
   *
   * @param {...Array<Function>} fns
   * @returns
   * @memberof Adapter
   */
  pipeFunctions(...fns: Array<Function>) {
    return fns.reduce((f, g) => (...args) => g(f(...args)))
  }

  /**
   * 转换一个异步函数，返回一个Promise
   * 使用柯里化返回一个函数，这个函数返回一个调用原始函数的Promise。使用...rest运算符传入所有参数。
   *
   * @param {Function} func
   * @returns
   * @memberof Adapter
   */
  promisify(func: Function) {
    return (...args) => new Promise((resolve, reject) => {
      func(...args, (err, result) => (err ? reject(err) : resolve(result)))
    })
  }

  /**
   * 接受一个可变参数函数并返回一个闭包，该闭包接受一个参数数组映射到该函数的输入。
   * 使用闭包和展开运算符(...)将参数数组映射到函数的输入
   *
   * @param {Function} fn
   * @returns
   * @memberof Adapter
   */
  spreadOver(fn: Function) {
    return argsArr => fn(...argsArr)
  }
}

const adapter = new Adapter()

/**
 * example of call
 */
Promise.resolve([1, 2, 3])
  .then(adapter.call('map', x => 2 * x))
  .then(console.log)

/**
 * example of collectInto
 */
const Pall = adapter.collectInto(Promise.all.bind(Promise))
let p1 = Promise.resolve(1)
let p2 = Promise.resolve(2)
let p3 = new Promise(resolve => setTimeout(resolve, 2000, 3))
Pall(p1, p2, p3).then(console.log)

/**
 * example of flip
 */
let a = { name: 'John Smith' }
let b = {}
const mergeFrom = adapter.flip(Object.assign)
let mergePerson = mergeFrom.bind(null, a)
mergePerson(b)  // equals Object.assign(b, a)
console.log(b)

/**
 * example of pipeFunctions
 */
const add5 = x => x + 5
const multiply = (x, y) => x * y
const multiplyAndAdd5 = adapter.pipeFunctions(multiply, add5)
console.log(multiplyAndAdd5(5, 2))

/**
 * example of promisify
 */
const delay = adapter.promisify((d, cb) => setTimeout(cb , d))
delay(2000).then(() => console.log('Hi'))

/**
 * example of spreadOver
 */
const arrMax = adapter.spreadOver(Math.max)
console.log('spreadOver: ', arrMax([1.5, 2.2222222, 2.22222221]))
