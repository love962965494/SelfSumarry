## React笔记----自己动手实现一个React

参考文章：<a href="http://www.mattgreer.org/articles/react-internals-part-one-basic-rendering/" target="_blank">http://www.mattgreer.org/articles/react-internals-part-one-basic-rendering/</a>

### 原生DOM元素
> 原生DOM元素是浏览器用于构建网页时使用到的元素。React通过调用 document.createElement() 方法构建元素，使用 element.insertBefore() 和 element.nodeValue 等 api 更新元素。

### 虚拟React元素
> 虚拟 React 元素是在内存中用于表示用户定义的 DOM 元素结构，它既可以是原生 DOM 元素，也可以是用户自定义的合成元素。

### 组件
> 组件是 React 中非常普遍的概念，组件可以完成各种各样的工作。例如： ReactDOM 中的 ReactDOMComponent 负责连接 React 元素和原生 DOM元素。

### 用户定义合成组件
> 合成组件是一个大家非常熟悉的组件，当我们调用 React.createClass() 或者使用 es6 语法 class extend React.component ，就创建了一个合成组件。像 componentWillMount, shouldComponentUpdate 只是我们日常使用的组件生命周期方法中的一小部分。还有一些生命周期方法例如 mountComponent 和 receiveComponent，我们从不使用它们，但是他们在 react 内部被使用。
>
> 注：实际上我们创建的组件是不完整的，在 React 内部会使用 ReactCompositeComponentWrapper 方法将我们的组件进行包裹，从而使我们定义的组件就可以被所有的生命周期方法监听。


