
let uid = 0

/**
 *
 *
 * @class Dep
 */
class Dep {
  public id: number
  public subs: Array<Watcher>

  static target = null
  constructor() {
    // 设置id，用于区分新的Watcher和只改变属性值后新产生的Watcher
    this.id = uid++
    // 储存订阅者的数组
    this.subs = []
  }

  /**
   * 触发target上的addDep方法，参数为Dep的实例本身
   * 
   * @memberof Dep
   */
  depend() {
    Dep.target.addDep(this)
  }

  /**
   *
   *
   * @param {Watcher} sub
   * @memberof Dep
   */
  addSub(sub: Watcher) {
    this.subs.push(sub)
  }

  /**
   *
   *
   * @memberof Dep
   */
  notify() {
    this.subs.forEach(sub => sub.update())
  }
}

/**
 *
 *
 * @class Observer
 */
class Observer {
  public value: any
  constructor(value) {
    this.value = value
    this.walk(value)
  }

  /**
   *
   *
   * @param {object} value
   * @memberof Observer
   */
  walk(value: object) {
    Object.keys(value).forEach(key => this.convert(key, value[key]))
  }

  /**
   *
   *
   * @param {string} key
   * @param {*} val
   * @memberof Observer
   */
  convert(key: string, val) {
    defineReactive(this.value, key, val)
  }
}

/**
 *
 *
 * @param {*} value
 * @returns
 */
function observe(value) {
  if (!value || typeof value !== 'object') {
    return
  }

  return new Observer(value)
}

/**
 *
 *
 * @param {object} obj
 * @param {string} key
 * @param {*} val
 * @returns
 */
function defineReactive(obj: object, key: string, val) {
  const dep = new Dep()

  observe(val)

  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get() {
      if (Dep.target) {
        dep.depend()
      }
      return val
    },
    set(newVal) {
      if (val === newVal) return

      val = newVal
      observe(newVal)
      dep.notify()
    }
  })
}

class Watcher {
  public depIds: object
  public vm: Vue
  public cb: Function
  public expOrFn: string
  public val: any
  constructor(vm, expOrFn, cb) {
    this.depIds = {}
    this.vm = vm
    this.cb = cb
    this.expOrFn = expOrFn
    this.val = this.get()
  }

  /**
   *
   *
   * @memberof Watcher
   */
  update() {
    this.run()
  }

  /**
   *
   *
   * @param {Dep} dep
   * @memberof Watcher
   */
  addDep(dep: Dep) {
    if (!this.depIds.hasOwnProperty(dep.id)) {
      dep.addSub(this)
      this.depIds[dep.id] = dep
    }
  }

  /**
   *
   *
   * @memberof Watcher
   */
  run() {
    const val = this.get()
    
    if (val !== this.val) {
      this.val = val
      this.cb.call(this.vm, val)
    }
  }

  /**
   *
   *
   * @returns
   * @memberof Watcher
   */
  get() {
    Dep.target = this
    const val = this.vm._data[this.expOrFn]

    Dep.target = null
    return val
  }
}

/**
 *
 *
 * @class Vue
 */
class Vue {
  public $options: any
  public _data: any
  constructor(options: Object = {}) {
    this.$options = options
    const data = this._data = this.$options.data
    // 把data上的属性挂载到Vue上
    Object.keys(data).forEach(key => this._proxy(key))
    observe(data)
  }

  /**
   *
   *
   * @param {string} expOrFn
   * @param {Function} cb
   * @memberof Vue
   */
  $watch(expOrFn: string, cb: Function) {
    new Watcher(this, expOrFn, cb)
  }

  /**
   *
   *
   * @param {string} key
   * @returns
   * @memberof Vue
   */
  _proxy(key: string) {
    Object.defineProperty(this, key, {
      enumerable: true,
      configurable: true,
      get() {
        return this._data[key]
      },
      set(val) {
        this._data[key] = val
      }
    })
  }
}