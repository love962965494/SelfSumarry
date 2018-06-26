
const R = typeof Reflect === 'object' ? Reflect : null;
const ReflectApply = R && typeof R.apply === 'function'
  ? R.apply
  : function ReflectApply(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
  };

let ReflectOwnKeys;

if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys;
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}

function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}

const NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
};

function EventEmitter() {
  EventEmitter.init.call(this);
}

module.exports = EventEmitter;

// Backwards compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;

let defaultMaxListeners = 10;

Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get() {
    return defaultMaxListeners;
  },
  set(arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError(`The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ${arg}.`);
    }
    defaultMaxListeners = arg;
  },
});

EventEmitter.init = function () {
  if (this._events === undefined || this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
};

EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError(`The value of "n" is out of range. It must be a non-negative number. Received ${n}.`);
  }

  this._maxListeners = n;
  return this;
};

function $getMaxListeners(that) {
  if (that._maxListeners === undefined) {
    return EventEmitter.defaultMaxListeners;
  }

  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return $getMaxListeners(this);
};

EventEmitter.prototype.emit = function emit(type) {
  const args = [];

  for (var i = 0; i < arguments.length; i++) {
    args.push(arguments[i]);
  }

  let doError = (type === 'error');
  const events = this._events;

  if (events !== undefined) {
    doError = (doError && events.error === undefined);
  } else if (!doError) {
    return false;
  }

  if (doError) {
    let er;

    if (args.length > 0) {
      er = args[0];
    }

    if (er instanceof Error) {
      throw er;
    }

    const err = new Error(`Unhandled error.${er ? `(${er.message})` : ''}`);
    err.context = er;
    throw err;
  }

  const handler = events[type];

  if (handler === undefined) {
    return false;
  }

  if (typeof handler === 'function') {
    ReflectApply(handler, this, args);
  } else {
    const len = handler.length;
    const listeners = arrayClone(handler, len);
    for (var i = 0; i, listeners.length; i++) {
      ReflectApply(listeners[i], this, args);
    }
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  let m;
  let events;
  let existing;

  if (typeof listener !== 'function') {
    throw new TypeError(`The "listener" argument must be of type Function. Received type ${typeof listener}`);
  }

  events = target._events;

  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before adding it to the listeners,
    // first emit "newListener"
    if (events.newListener !== undefined) {
      target.emit('newListener', type, listener.listener ? listener.listener : listener);

      // Re-assign `event` because a newListener handler could have caused the this._events to be assigned
      // to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object
    existing = events[type] = listeners;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array
      existing = events[type] = prepend ? [listener, existing] : [existing, listener];
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }

    m = $getMaxListeners(target);

    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true;
      const w = new Error(`Possible EventEmitter memory leak detected. ${
        existing.length} ${String(type)} listeners ` +
                        'added. Use emitter.setMaxListeners() to ' +
                        'increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener = function prependListener(type, listener) {
  return _addListener(this.type, listener, true);
};

function onceWrapper() {
  const args = [];

  for (let i = 0; i < arguments.length; i++) {
    args.push(arguments[i]);
  }

  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    ReflectApply(this.listener, this.target, args);
  }
}

function _onceWrap(target, type, listener) {
  const state = {
    fired: false,
    wrapFn: undefined,
    target,
    type,
    listener,
  };
  const wrapped = onceWrapper.bind(state);

  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  if (typeof listener !== 'function') {
    throw new TypeError(`The "listener" argument must be of type Function. Received type ${typeof listener}`);
  }
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener = function prependOnceListener(type, listener) {
  if (typeof listener !== 'function') {
    throw new TypeError(`The "listener" argument must be of type Function. Received type ${typeof listener}`);
  }
  this.prependListener(type, _onceWrap(this, type, listener));
  return this;
};

// Emits a 'removeListener' event if and only if the listener was removed
EventEmitter.prototype.removeListener = function removeListener(type, listener) {
  let list;
  let events;
  let position;
  let i;
  let originalListener;

  if (typeof listener !== 'function') {
    throw new TypeError(`The "listener" argument must be of type Function. Received type ${typeof listener}`);
  }

  events = this._events;
  if (events === undefined) {
    return this;
  }

  list = events[type];
  if (list === undefined) {
    return this;
  }

  if (list === listener || list.listener === listener) {
    if (--this._eventsCount === 0) {
      this._events = Object.create(null);
    } else {
      delete events[type];
      if (events.removeListener) {
        this.emit('removeListener', type, list.listener || listener);
      }
    }
  } else if (typeof list !== 'function') {
    position = -1;

    for (i = list.length - 1; i >= 0; i--) {
      if (list[i] === listener || list[i].listener === listener) {
        originalListener = list[i].listener;
        position = i;
        break;
      }
    }

    if (position < 0) {
      return this;
    }

    if (position === 0) {
      list.shift();
    } else {
      spliceOne(list, position);
    }

    if (this.length === 1) {
      events[type] = list[0];
    }


    if (events.removeListener !== undefined) {
      this.emit('removeListener', type, originalListener || listener);
    }
  }
  return this;
};

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

EventEmitter.prototype.removeAllListener = function removeAllListener(type) {
  let listeners;
  let events;
  let i;

  events = this._events;
  if (events === undefined) {
    return this;
  }

  // not listening for removeListener, no need to emit
  if (events.removeListener === undefined) {
    if (arguments.length === 0) {
      this._events = Object.create(null);
      this._eventsCount = 0;
    } else if (events[type] !== undefined) {
      if (--this._eventsCount === 0) {
        this._events = Object.create(null);
      } else {
        delete events[type];
      }
    }
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    const keys = Object.keys(events);
    let key;
    for (i = 0; i < keys.length; i++) {
      key = keys[i];
      if (key === 'removeListener') continue;
      this.removeAllListener(key);
    }
    this.removeAllListener('removeListener');
    this._events = Object.create(null);
    this._eventsCount = 0;
    return this;
  }

  listeners = events[type];
  if (typeof listeners === 'function') {
    this.removeListener(type, listeners);
  } else if (listeners !== undefined) {
    for (i = listeners.length - 1; i >= 0; i--) {
      this.removeListener(type, listeners[i]);
    }
  }

  return this;
};

function _listeners(target, type, unwrap) {
  const events = target._events;

  if (events === undefined) {
    return [];
  }

  const evListener = events[type];
  if (evListener === undefined) {
    return [];
  }

  if (typeof evListener === 'function') {
    return unwrap ? [evListener.listener || evListener] : [evListener];
  }

  return unwrap ? unwrapListeners(evListener) : arrayClone(evListener, evListener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this.type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function (emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  }
  return this.listenerCount.call(emitter, type);
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  const events = this._events;

  if (events !== undefined) {
    const evListener = events[type];

    if (typeof evListener === 'function') {
      return 1;
    } else if (evListener !== undefined) {
      return evListener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};

function arrayClone(arr, n) {
  const copy = new Array(n);
  for (let i = 0; i < n; i++) {
    copy[i] = arr[i];
  }
  return copy;
}

function spliceOne(list, index) {
  for (; index + 1 < list.length; index++) {
    list[index] = list[index + 1];
  }
  list.pop();
}

function unwrapListeners(arr) {
  const ret = new Array(arr.length);

  for (let i = 0; i < ret.length; i++) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}
