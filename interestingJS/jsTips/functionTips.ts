export default class FunctionTips {
  /**
   * @function: chainAsync 链式调用异步函数
   * @description:
   *   链式调用异步函数
   *   循环遍历包含异步事件的函数数组，每次异步事件完成后调用next
   *
   * @param {Array<Function>} fns
   * @memberof FunctionTips
   */
  chainAsync(fns: Array<Function>) {
    let curr = 0
    const next = () => fns[curr++](next)
    next()
  }
}

const functionTips = new FunctionTips()

/**
 * example of chainAsync
 */
functionTips.chainAsync([
  next => {
    console.log('chainAsync: 我是第一次')
    setTimeout(next, 1000)
  },
  next => {
    console.log('chainAsync: 我是第二次')
  }
])