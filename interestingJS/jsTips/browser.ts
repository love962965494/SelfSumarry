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
    const el = document.createElement('textarea')
    el.value = str
    el.setAttribute('readonly', '')
    el.style.position = 'absolute'
    el.style.left = '-9999px'
    document.body.appendChild(el)

    const selected = document.getSelection().rangeCount > 0 ? document.getSelection().getRangeAt(0) : false
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
    if (selected) {
      document.getSelection().removeAllRanges()
      document.getSelection().addRange(selected)
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
   * @returns {Node}
   * @memberof Browser
   */
  createElement(str: string): Node {
    const el = document.createElement('div')
    el.innerHTML = str
    return el.firstElementChild
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
        (this.hub[event] || []).forEach(handler => handler(data))
      },
      on(event, handler) {
        if (!this.hub[event]) {
          this.hub[event] = []
        }
        this.hub[event].push(handler)
      },
      off(event, handler) {
        const i = (this.hub[event] || []).findIndex(h => h === handler)
        if (i > -1) {
          this.hub[event].splice(i, 1)
        }
      }
    }
  }
}

const browserTip = new Browser()

/**
 * example of createEventHub
 */
const handler = data => console.log(data)
const hub = browserTip.createEventHub()
hub.on('message', handler)
hub.on('message', () => console.log('Message event fired'))
hub.emit('message', 'hello world')
hub.off('message', handler)
hub.emit('message', '')
