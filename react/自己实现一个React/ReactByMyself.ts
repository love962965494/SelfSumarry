interface IReactNode {
  type: TopLevelWrapper | string
  props: IReactNodeProps
}

interface IReactNodeProps {
  children: any
}

/**
 * this class mainly about dom component
 *
 * @class ReactDOMComponent
 */
class ReactDOMComponent {
  public currentElement: IReactNode
  public hostNode: HTMLElement

  /**
   * Creates an instance of ReactDOMComponent.
   *
   * @param {HTMLElement} element
   * @memberof ReactDOMComponent
   */
  constructor(element: IReactNode) {
    this.currentElement = element
  }

  /**
   * Mount node to dom
   *
   * @param {HTMLElement} container
   * @returns {HTMLElement}
   * @memberof ReactDOMComponent
   */
  public mountComponent(container: HTMLElement): HTMLElement {
    const domElement = document.createElement(this.currentElement.type as string)
    const textNode = document.createTextNode(this.currentElement.props.children)

    domElement.appendChild(textNode)
    container.appendChild(domElement)

    this.hostNode = domElement

    return domElement
  }

  /**
   * Receive component to update
   *
   * @param {IReactNode} nextElement
   * @memberof ReactDOMComponent
   */
  public receiveComponent(nextElement: IReactNode) {
    const prevElement = this.currentElement
    this.updateComponent(prevElement, nextElement)
  }

  /**
   * Update component
   *
   * @param {IReactNode} prevElement
   * @param {IReactNode} nextElement
   * @memberof ReactDOMComponent
   */
  public updateComponent(prevElement: IReactNode, nextElement: IReactNode) {
    const lastProps = prevElement.props
    const nextProps = nextElement.props

    this.updateDOMProperties(lastProps, nextProps)
    this.updateDOMChildren(lastProps, nextProps)
  }

  /**
   * Update dom properties
   *
   * @private
   * @param {IReactNodeProps} lastProps
   * @param {IReactNodeProps} nextProps
   * @memberof ReactDOMComponent
   */
  private updateDOMProperties(lastProps: IReactNodeProps, nextProps: IReactNodeProps) {
    console.log('here mainly to update dom css: ', lastProps, nextProps)
  }

  /**
   * Update dom children
   *
   * @private
   * @param {IReactNodeProps} lastProps
   * @param {IReactNodeProps} nextProps
   * @memberof ReactDOMComponent
   */
  private updateDOMChildren(lastProps: IReactNodeProps, nextProps: IReactNodeProps) {
    const lastContent = lastProps.children
    const nextContent = nextProps.children

    if (!nextContent) {
      this.updateTextContent('')
    } else if (lastContent !== nextContent) {
      this.updateTextContent('' + nextContent)
    }
  }

  /**
   * Update text content
   *
   * @private
   * @param {string} content
   * @memberof ReactDOMComponent
   */
  private updateTextContent(content: string): void {
    const node = this.hostNode
    const firstChild = node.firstChild

    if (firstChild && firstChild === node.lastChild && firstChild.nodeType === 3) {
      firstChild.nodeValue = content
      return
    }

    node.textContent = content
  }
}

// tslint:disable-next-line:max-classes-per-file
class ReactCompositeComponentWrapper {
  private currentElement: IReactNode

  /**
   * Creates an instance of ReactCompositeComponentWrapper.
   *
   * @param {IReactNode} element
   * @memberof ReactCompositeComponentWrapper
   */
  constructor(element: IReactNode) {
    this.currentElement = element
  }

  public mountComponent(container: HTMLElement) {
    const Component = this.currentElement.type as TopLevelWrapper
    const componentInstance = new Component(this.currentElement.props)
  }
}

/**
 * 该类是 React 将组件进行封装从而使组件格式统一，这样无论是用户定义的组件还是简单的原生元素，
 * 它们就都具有了 render 方法，从而都可以被 ReactCompositeComponentWrapper 处理。
 *
 * @class TopLevelWrapper
 */
// tslint:disable-next-line:max-classes-per-file
class TopLevelWrapper {
  public props: IReactNodeProps

  constructor(props: IReactNodeProps) {
    this.props = props
  }

  public render() {
    return this.props
  }
}
