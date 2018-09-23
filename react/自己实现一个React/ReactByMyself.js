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

    this._hostNode = domElement
    return domElement
  }

  public receiveComponent(nextElement) {
    const prevElement = this._currentElement
    this.updateComponent(prevElement, nextElement)
  }

  public updateComponent(prevElement, nextElement) {
    const lastProps = prevElement.props
    const nextProps = nextElement.props

    this._updateDOMProperties(lastProps, nextProps)
    this._updateDOMChildren(lastProps, nextProps)
  }

  private _updateDOMProperties(lastProps, nextProps) {
    // mainly to update css
  }

  private _updateDOMChildren(lastProps, nextProps) {
    const lastContent = lastProps.children
    const nextContent = nextProps.children

    if (!nextContent) {
      this.updateTextContent('')
    } else if (lastContent !== nextContent) {
      this.updateTextContent('' + nextContent)
    }
  }

  private updateTextContent(content) {
    const node = this._hostNode

    const firstChild = node.firstChild

    if (firstChild && firstChild === node.lastChild && firstChild.nodeType === 3) {
      firstChild.nodeValue = content
      return
    }

    node.textContent = content
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
    const Component = this._currentElement.type
    const componentInstance = new Component(this._currentElement.props)

    this._instance = componentInstance

    if (componentInstance.componentWillMount) {
      componentInstance.componentWillMount()
    }

    const markup = this.performInitialMount(container)

    if (componentInstance.componentDidMount) {
      componentInstance.componentDidMount()
    }

    return markup
  }

  public performInitialMount(container) {
    const renderedElement = this._instance.render()

    const child = instantiateReactComponent(renderedElement)

    this._renderedComponent = child

    return ReactReconciler.mountComponent(child, container)
  }

  public receiveComponent(nextComponent) {
    const prevElement = this._currentElement

    this.updateComponent(prevElement, nextElement)
  }

  public updateComponent(prevElement, nextElement) {
    const nextProps = nextElement.props
    const inst = this._instance

    if (inst.componentWillReceiveProps) {
      inst.componentWillReceiveProps(nextProps)
    }

    let shouldUpdate = true

    if (inst.shouldComponentUpdate) {
      shouldUpdate = inst.shouldComponentUpdate(nextProps)
    } 

    if (shouldUpdate) {
      this._performComponentUpdate(nextElement, nextProps)
    } else {
      inst.props = nextProps
    }
  }

  private _performComponentUpdate(nextElement, nextProps) {
    this._currentElement = nextElement

    const inst = this._instance

    inst.props = nextProps

    this._updateRenderedComponent()
  }

  private _updateRenderedComponent() {
    const prevComponentInstance = this._renderedComponent
    const inst = this._instance
    const nextRenderedElement = inst.render()

    ReactReconciler.receiveComponent(prevComponentInstance, nextRenderedElement)
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

function instantiateReactComponent(element) {
  if (typeof element.type === 'string') {
    return new ReactDOMComponent(element)
  } else if (typeof element.type === 'function') {
    return new ReactCompositeComponentWrapper(element)
  }
}

const ReactReconciler = {
  mountComponent(internalInstance, container) {
    return internalInstance.mountComponent(container)
  },

  receiveComponent(internalInstance, nextElement) {
    internalInstance.receiveComponent(nextElement)
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

    Constructor.prototype = Object.assign(Constructor.prototype, spec)

    return Constructor
  }

  render(element, container) {
    const prevComponent = getTopLevelComponentInContainer(container)

    if (prevComponent) {
      return updateRootComponent(prevComponent, element)
    } else {
      return renderNewRootComponent(element, container)
    }
  } 
}

/**
 * 获取真正的组件实例
 * 
 * @param {*} container 
 */
function getTopLevelComponentInContainer(container) {
  return container.__reactComponentInstance
}

/**
 * 生成新的根组件
 * 
 * @param {*} element 
 * @param {*} container 
 */
function renderNewRootComponent(element, container) {
  const wrapperElement = React.createElement(TopLevelWrapper, element)
  const componentInstance = new ReactCompositeComponentWrapper(wrapperElement)
  const markUp = ReactReconciler.mountComponent(componentInstance, container)

  container.__reactComponentInstance = componentInstance._renderedComponent

  return markUp
}

/**
 * 更新根组件
 * 
 * @param {*} prevComponent 
 * @param {*} nextComponent 
 */
function updateRootComponent(prevComponent, nextComponent) {
  ReactReconciler.receiveComponent(prevComponent, nextElement)
}



// -------------------- 例子 --------------------

const MyH1 = React.createClass({
  render() {
    return React.createElement('h1', null, this.props.message)
  }
})

const MyMessage = React.createClass({
  render() {
    if (this.props.asTitle) {
      return React.createElement(MyH1, { message: this.props.message })
    } else {
      return React.createElement('p', null, this.props.message)
    }
  }
})

React.render(
  React.createElement(MyMessage, { asTitle: false, message: 'this is an h1 message' }),
  document.getElementById('root')
)
