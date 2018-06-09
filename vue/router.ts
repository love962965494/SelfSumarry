/**
 * hash路由一个明显的标志是带有#，通过监听hashChange事件来进行路由跳转
 */
export default class Router {
  public routes: object
  public currentUrl: string
  public history: Array<string>
  public currentIndex: number
  public isBack: boolean
  constructor () {
    // 以键值对形式存储路由和回调事件
    this.routes = {}
    // 当前路由的url
    this.currentUrl = ''
    // 记录出现过的hash
    this.history = []
    // 作为指针，默认指向this.history的末尾，根据后退前进指向history中的不同hash
    this.currentIndex = this.history.length - 1

    this.refresh = this.refresh.bind(this)
    this.backOff = this.backOff.bind(this)
    // 默认不是后退操作，根据是否是后退操作决定是否执行hashchange事件
    // 否则，每次后退就会执行hashchange事件。又会想路由中添加纪录
    this.isBack = false
    window.addEventListener('load', this.refresh, false)
    window.addEventListener('hashchange', this.refresh, false)
  }

  /**
   * 
   *
   * @param {string} path
   * @param {*} [callback]
   * @memberof Router
   */
  route(path: string, callback?) {
    this.routes[path] = callback || function() {}
  }

  /**
   *
   *
   * @memberof Router
   */
  refresh() {
    // 获取当前路由中的hash
    this.currentUrl = location.hash.slice(1) || '/'
    if (!this.isBack) {
      // 如果不是后退操作，且当前指针小于数组总长度，直接截取指针之前的部分储存下来
      if (this.currentIndex < this.history.length - 1) {
        this.history = this.history.slice(0, this.currentIndex + 1)
        this.history.push(this.currentUrl)
        this.currentIndex++
      }
    }
    // 执行对应回调方法
    this.routes[this.currentUrl]()
    this.isBack = false
  }

  backOff() {
    this.isBack = true
    // 如果指针小于0的话就不存在对应的hash路由，因此锁定指针为0
    this.currentIndex <= 0 ? this.currentIndex = 0 : this.currentIndex--
    // 随着后退，location.hash值也跟着变化
    location.hash = `#${this.history[this.currentIndex]}`
    // 执行对应的路由回调
    this.routes[this.history[this.currentIndex]]()
  }
}