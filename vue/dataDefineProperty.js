var uid = 0;
var Dep = (function () {
    function Dep() {
        this.id = uid++;
        this.subs = [];
    }
    Dep.prototype.depend = function () {
        Dep.target.addDep(this);
    };
    Dep.prototype.addSub = function (sub) {
        this.subs.push(sub);
    };
    Dep.prototype.notify = function () {
        this.subs.forEach(function (sub) { return sub.update(); });
    };
    Dep.target = null;
    return Dep;
}());
var Observer = (function () {
    function Observer(value) {
        this.value = value;
        this.walk(value);
    }
    Observer.prototype.walk = function (value) {
        var _this = this;
        Object.keys(value).forEach(function (key) { return _this.convert(key, value[key]); });
    };
    Observer.prototype.convert = function (key, val) {
        defineReactive(this.value, key, val);
    };
    return Observer;
}());
function observe(value) {
    if (!value || typeof value !== 'object') {
        return;
    }
    return new Observer(value);
}
function defineReactive(obj, key, val) {
    var dep = new Dep();
    observe(val);
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: function () {
            if (Dep.target) {
                dep.depend();
            }
            return val;
        },
        set: function (newVal) {
            if (val === newVal)
                return;
            val = newVal;
            observe(newVal);
            dep.notify();
        }
    });
}
var Watcher = (function () {
    function Watcher(vm, expOrFn, cb) {
        this.depIds = {};
        this.vm = vm;
        this.cb = cb;
        this.expOrFn = expOrFn;
        this.val = this.get();
    }
    Watcher.prototype.update = function () {
        this.run();
    };
    Watcher.prototype.addDep = function (dep) {
        if (!this.depIds.hasOwnProperty(dep.id)) {
            dep.addSub(this);
            this.depIds[dep.id] = dep;
        }
    };
    Watcher.prototype.run = function () {
        var val = this.get();
        if (val !== this.val) {
            this.val = val;
            this.cb.call(this.vm, val);
        }
    };
    Watcher.prototype.get = function () {
        Dep.target = this;
        var val = this.vm._data[this.expOrFn];
        Dep.target = null;
        return val;
    };
    return Watcher;
}());
var Vue = (function () {
    function Vue(options) {
        if (options === void 0) { options = {}; }
        var _this = this;
        this.$options = options;
        var data = this._data = this.$options.data;
        Object.keys(data).forEach(function (key) { return _this._proxy(key); });
        observe(data);
    }
    Vue.prototype.$watch = function (expOrFn, cb) {
        new Watcher(this, expOrFn, cb);
    };
    Vue.prototype._proxy = function (key) {
        Object.defineProperty(this, key, {
            enumerable: true,
            configurable: true,
            get: function () {
                return this._data[key];
            },
            set: function (val) {
                this._data[key] = val;
            }
        });
    };
    return Vue;
}());
//# sourceMappingURL=dataDefineProperty.js.map