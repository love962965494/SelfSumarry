/**
 * 该类是 React 创建原生 DOM 元素并挂载到 container 上的实现
 *
 * @class ReactDOMComponent
 */
class ReactDOMComponent {
  constructor(element) {
    this._currentElement = element
  }

  public mountComponent(container) {
    const domElement = document.createElement(this._currentElement.type)
    const textNode = document.createTextNode(this._currentElement.props.children)

    domElement.appendChild(textNode)
    container.appendChild(domElement)
  }
}

/**
 * 该类是 React 将合成组件解析得到原生 dom 属性的实现
 *
 * @class ReactCompositeComponentWrapper
 */
class ReactCompositeComponentWrapper {
  constructor(element) {
    this._currentElement = element
  }

  public mountComponent(container) {
    const compositeComponentInstance = new this._currentElement.type(this._currentElement.props)
    let renderedElement = compositeComponentInstance.render()

    while (typeof renderedElement.type === 'function') {
      renderedElement = new renderedElement.type(renderedElement.props).render()
    }

    const domComponentInstance = new ReactDOMComponent(renderedElement)

    domComponentInstance.mountComponent(container)
  }
}


/**
 * 该类是 React 将组件进行封装从而使组件格式统一，这样无论是用户定义的组件还是简单的原生元素，
 * 它们就都具有了 render 方法，从而都可以被 ReactCompositeComponentWrapper 处理。
 *
 * @class TopLevelWrapper
 */
class TopLevelWrapper {
  constructor(props) {
    this.props = props
  }

  public render() {
    return this.props
  }
}

class React {
  public createElement(type, props, children) {
    const element = {
      type,
      props = props || {}
    }

    if (children) {
      element.props.children = children
    }

    return element
  }

  createClass(spec) {
    function Constructor(props) {
      this.props = props
    }

    Constructor.prototype.render = spec.render

    return Constructor
  }

  render(element, container) {
    const wrapperElement = this.createElement(TopLevelWrapper, element)
    const componentInstance = new ReactCompositeComponentWrapper(wrapperElement)

    return componentInstance.mountComponent(container)
  } 
}
