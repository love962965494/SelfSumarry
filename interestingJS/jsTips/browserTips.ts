
  interface Options {
    target?: string,
    options?: boolean,
    [propName: string]: any
  }

export default class Browser {
  /**
   * @function: arrayToHtmlList 数组转换为html标签列表
   * @description:
   *   将给定的数组元素转换为<li>${item}</li>标签并将其附加到给定id的列表中
   *   使用Array.map()和document.querySelector()来创建一个html标签列表
   *
   * @param {Array<any>} arr
   * @param {string} listID
   * @memberof Browser
   */
  arrayToHtmlList(arr: Array<any>, listID: string) {
    arr.map(item => (document.querySelector('#' + listID).innerHTML += `<li>${item}</li>`));
  }

  /**
   * @function: bottomVisible 页面的底部是否可见
   * @description:
   *   如果页面底部可见，则返回true，否则返回false
   *   使用scrollY, scrollHeight和clientHeight来判断页面的底部是否可见
   *
   * @returns {boolean}
   * @memberof Browser
   */
  bottomVisible(): boolean {
    return document.documentElement.clientHeight + window.scrollY >= (document.documentElement.scrollHeight || document.documentElement.clientHeight);
  }

  /**
   * @function: clipToClipboard 复制到剪贴板
   * @description:
   *   将一个字符串复制到剪贴板。
   *   创建一个新的<textarea>元素，用提供的数据填充它，并将其添加到HTML文档中。
   *   使用Selection.getRangeAt()来存储选择的范围(如果有的话)。
   *   使用document.execCommand('copy')复制到剪贴板。
   *   从HTML文档中删除<textarea>元素。
   *   最后，使用Selection.addRange()来恢复原始选择范围(如果有的话)
   *
   * @param {string} str
   * @memberof Browser
   */
  clipToClipboard(str: string) {
    const el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);

    const selected = document.getSelection().rangeCount > 0 ? document.getSelection().getRangeAt(0) : false;
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    if (selected) {
      document.getSelection().removeAllRanges();
      document.getSelection().addRange(selected);
    }
  }

  /**
   * @function: createElement 创建元素
   * @description:
   *   根据一个字符串创建一个元素(不附加到document)。如果给定的字符串包含多个元素，则只返回第一个元素
   *   使用document.createElement()来创建一个新的元素。将它的innerHtml设置为作为参数提供的字符串。
   *   使用ParentNode.firstElementChild来返回字符串的元素版本
   *
   * @param {string} str
   * @returns {Element}
   * @memberof Browser
   */
  createElement(str: string): Element {
    const el = document.createElement('div');
    el.innerHTML = str;
    return el.firstElementChild;
  }

  /**
   * @function: createEventHub 创建事件中转
   * @description:
   *   使用emit、on和off方法创建一个pub/sub(publish-subscribe)事件中转
   *   使用Object.create(null)来创建一个空的hub对象，它不会从Object.prototype继承属性。
   *   对于emit，根据event参数解析处理程序数组，然后通过传递数据作为参数来运行每个Array.forEach()
   *   对于on，如果事件不存在，则为事件创建一个数组，然后使用Array.push()来添加处理程序但数组
   *   对于off，使用Array.findIndex()来查找事件数组中的处理程序的索引，并使用Array.splice()将其删除
   *
   * @returns
   * @memberof Browser
   */
  createEventHub() {
    return {
      hub: Object.create(null),
      emit(event, data) {
        (this.hub[event] || []).forEach(handler => handler(data));
      },
      on(event, handler) {
        if (!this.hub[event]) {
          this.hub[event] = [];
        }
        this.hub[event].push(handler);
      },
      off(event, handler) {
        const i = (this.hub[event] || []).findIndex(h => h === handler);
        if (i > -1) {
          this.hub[event].splice(i, 1);
        }
      },
    };
  }

  /**
   * @function: currentURL 获取当前页面URL
   * @description:
   *   返回当前页面URL
   *   使用window.location.href获取当前页面URL
   *
   * @returns
   * @memberof Browser
   */
  currentURL() {
    return window.location.href;
  }

  /**
   * @function: detectDeviceType 检测设备类型
   * @description:
   *   检测网站是否正在移动设备或台式机/笔记本电脑上打开
   *   使用正则表达式来测试navigator.userAgent属性以确定打开设备是移动设备还是台式机/笔记本电脑
   *
   * @returns
   * @memberof Browser
   */
  detectDeviceType() {
    return /Android|webOS|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop';
  }

  /**
   * @function: elementIsVisibleInViewport 判断元素是否在可视窗口可见
   * @description:
   *   如果指定的元素在可视窗口中可见，则返回true，否则返回false
   *   使用Element.getBoundingClintRect()和window.inner(Width|Height)值来确定给定元素是否在可视窗口中可见
   *   省略第二个参数来判断元素是否完全可见，或者指定true来判断它是否部分可见
   *
   * @param {Element} el
   * @param {boolean} [partiallyVisible=false]
   * @returns
   * @memberof Browser
   */
  elementIsVisibleInViewport(el: Element, partiallyVisible = false) {
    const { top, left, bottom, right } = el.getBoundingClientRect();
    const { innerHeight, innerWidth } = window;
    return partiallyVisible
      ? ((top > 0 && top < innerHeight) || (bottom > 0 && bottom < innerHeight)) &&
          ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth))
      : top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth;
  }
  
  /**
   * @function: getStyle 获取元素样式
   * @description:
   *   返回指定元素的CSS规则值
   *   使用window.getComputedStyle()获取指定元素的CSS规则的值
   *
   * @param {Element} el
   * @param {string} ruleName
   * @returns {string}
   * @memberof Browser
   */
  getStyle(el: Element, ruleName: string):string {
    return getComputedStyle(el)[ruleName]
  }

  /**
   * @function: hasClass 判断元素是否具有指定的样式类
   * @description:
   *   如果元素具有指定的样式类，则返回true；否则返回false
   *   使用element.classList.contains()检查元素是否具有指定的样式类
   *
   * @param {Element} el
   * @param {string} className
   * @returns {boolean}
   * @memberof Browser
   */
  hasClass(el: Element, className: string): boolean {
    return el.classList.contains(className)
  }

  /**
   * @function: hide 隐藏所有指定的元素
   * @description:
   *   隐藏所有指定的元素
   *   使用展开运算符(...)和Array.forEach()将display: none应用于每个指定的元素
   *
   * @param {*} el
   * @returns
   * @memberof Browser
   */
  hide(...el) {
    return [...el].forEach(e => (e.style.display = 'none'))
  }

  /**
   * @function: httpsRedirect HTTPS重定向
   * @description:
   *   如果其当前使用HTTP访问，则将页面重定向到HTTPS中。另外，按下后退按钮不会将其退回到历史记录中的HTTP页面
   *   使用location.protocol获取当前正在使用的协议。如果不是HTTPS，使用location.replace()将现有页面替换为HTTPS版本
   *   使用location.href获取完整的地址，用String.split()拆分完整的地址，并移除URL协议部分
   *
   * @memberof Browser
   */
  httpsRedirect() {
    if (location.protocol !== 'https:') {
      location.replace('https://' + location.href.split('//')[1])
    }
  }

  /**
   * @function: off 移除事件侦听器
   * @description:
   *   从元素中移除事件侦听器
   *   使用EventTarget.removeEventListener()从元素中删除一个事件监听器。
   *
   * @param {Element} el
   * @param {string} evt
   * @param {EventListenerObject} fn
   * @param {boolean} [opts=false]
   * @memberof Browser
   */
  off(el: Element, evt: string, fn: EventListener, opts = false) {
    el.removeEventListener(evt, fn, opts)
  }

  /**
   * @function: on 在元素上添加事件侦听器（事件委派)
   * @description:
   *   将事件侦听器添加到可以使用事件委派的元素
   *   使用EventTarget.addEventListener()将一个事件监听器添加到一个元素。
   *   如果提供了选项对象(opts)的target属性，确保事件目标匹配指定的目标元素，然后通过提供正确的this上下文来调用回调
   *   返回一个对自定义委派函数的引用，以便与off一起使用
   *   忽略opts，则默认为非委派行为，并且事件冒泡
   *
   * @param {Element} el
   * @param {string} evt
   * @param {EventListener} fn
   * @param {Options} opts
   * @returns {(EventListener | void)}
   * @memberof Browser
   */
  on(el: Element, evt: string, fn: EventListener, opts?: Options): EventListener | void {
    const delegatorFn = e => e.target.matches(opts.target) && fn.call(e.target, e)
    el.addEventListener(evt, opts.target ? delegatorFn : fn, opts.options || false)
    if(opts.target) {
      return delegatorFn
    }
  }
}

const browserTip = new Browser();

/**
 * example of createEventHub
 */
const handler = data => console.log(data);
const hub = browserTip.createEventHub();
hub.on('message', handler);
hub.on('message', () => console.log('Message event fired'));
hub.emit('message', 'hello world');
hub.off('message', handler);
hub.emit('message', '');

/**
 * example of on
 */
const fn = () => console.log('!')
browserTip.on(document.body, 'click', fn) // logs '!' upon click the body
browserTip.on(document.body, 'click', fn, { target: 'p' }) // logs '!' upon click a 'p' element child of the body
browserTip.on(document.body, 'click', fn, { options: true }) // use capturing instead of bubbling
