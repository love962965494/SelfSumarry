let uid = 0

// 用于储存订阅者并发布消息
class Dep {
  constructor () {
    // 设置id，用于区分新的 Watcher 和只改变属性值后新产生的Watcher
    this.id = uid++
    // 储存订阅者的数组
    this.subs = []
  }

  // 触发 target 上的 Watcher 中的addDep方法，参数为dep的实例本身
  depend () {
    Dep.target.addDep(this)
  }

  // 添加订阅者
  addSub (sub) {
    this.subs.push(sub)
  }

  notify () {
    this.subs.forEach(sub => sub.update())
  }
}

// 为Dep类设置一个静态属性，默认为null，工作时指向当前的Watcher
Dep.target = null

// 监听者，监听对属性值的变化
class Observer {
  constructor (value) {
    this.value = value
    this.walk(value)
  }

  // 遍历属性值并监听
  walk (value) {
    Object.keys(value).forEach(key => this.convert(key, value[key]))
  }

  // 执行监听的具体方法
  convert (key, val) {
    defineReactive (this.value, key, val)
  }
}

function defineReactive (obj, key, val) {
  const dep = new Dep()

  // 给当前属性值添加监听
  let childOb = observe(val)

  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function () {
      // 如果Dep类存在 target 属性，将其添加到 dep 实例的subs数组中
      // target指向一个 Watcher 实例，每个Watcher都是一个订阅者
      // Watcher实例在实例化过程中，会读取data中的某个属性值，从而触发当前get方法
      if (Dep.target) {
        dep.depend()
      }
      return val
    },
    set: function (newVal) {
      if (val === newVal) return

      val = newVal
      // 对新值进行监听
      childOb = observe(newVal)
      dep.notify()
    }
  })
}

function observe (value) {
  // 当值不存在，或者不是复杂数据类型时，不需要继续深入监听
  if (!value || typeof value !== 'object') {
    return
  }

  return new Observer(value)
}

class Watcher {
  constructor (vm, expOrFn, cb) {
    this.depIds = {}            // 储存订阅者的id，避免重复的订阅者
    this.vm = vm                // 被订阅的数据一定来自于当前Vue实例
    this.cb = cb                // 当数据更新时的回调
    this.expOrFn = expOrFn      // 被订阅的数据
    this.val = this.get()       // 维护更新之前的数据
  }

  // 对外暴露的接口，用于在订阅的数据被更新时，由订阅者管理员(Dep)调用
  update () {
    this.run()
  }

  addDep (dep) {
    // 如果在depIds中没有当前的id，可以判断是新的Watcher，因此可以添加到dep的数组中存储
    // 次判断是避免同id的Watcher被多次储存
    if (!this.depIds.hasOwnProperty(dep.id)) {
      deo.addSub(this)
      this.depIds[dep.id] = dep
    }
  }

  run () {
    const val = this.get()
    console.log(val)
    if (val !== this.val) {
      this.val = val
      this.cb.call(this.vm, val)
    }
  }

  get () {
    // 当前订阅者（Watcher)读取被订阅数据的最新更新后的值时，通知订阅者管理员收集当前订阅者
    Dep.target = this
    const val = this.vm._data[this.expOrFn]
    // 置空，用于下一个Watcher使用
    Dep.target = null
    return val
  }
}

class Vue {
  constructor (options = {}) {
    // 简化了$options的处理
    this.$options = options
    // 简化了对data的处理
    let data = (this._data = this.$options.data)
    // 将所有data最外层属性代理到Vue实例上
    Object.keys(data).forEach(key => this._proxy(key))
    // 监听数据
    observe(data)
  }

  // 对外暴露调用订阅者接口，内部主要在指令中使用订阅者
  $watch (expOrFn, cb) {
    new Watcher(this, expOrFn, cb)
  }

  _proxy (key) {
    Object.defineProperty(this, key, {
      configurable: true,
      enumerable: true,
      get: function () {
        return this._data[key]
      },
      set: function (val) {
        this._data[key] = val
      }
    })
  }
}