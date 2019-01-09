先从一个简单的例子说起：  
<img class="graf-image" data-image-id="1*jTWOx6Yr6JyBV5ETnp4TRQ.gif" data-width="210" data-height="68" src="https://cdn-images-1.medium.com/max/1600/1*jTWOx6Yr6JyBV5ETnp4TRQ.gif">

code: 
```js
class ClickCounter extends React.Component {
  constructor(props) {
    super(props)
    this.state = { count: 0 }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.setState(state => ({ count: state.count + 1 }))
  }

  render() {
    return [
      <button key="1" onClick={this.handleClick}>Update Counter</button>,
      <span key="2">{ this.state.count }</span>
    ]
  }
}
```

在React协调更新的过程中会存在各种各样的活动。例如，针对这个例子的更新活动有：
* 更新state中的count属性
* 遍历和比较子节点的属性
* 更新span元素的文本属性  

当然还有像调用生命周期函数和更新refs等活动。所有这些活动在Fiber架构中统一被称为“work”。而word的类型则与React元素类型有关。例如，对于class类型的元素，React需要为它创建一个实例，而函数类型的元素则不需要。

## 从React Elements到Fiber nodes
每个通过render方法返回的react元素都会有一个对应的UI表示，我们称之为view或者template。针对上面的例子的template就是：  
```html
<button key="1" onClick={this.onClick}>Update counter</button>
<span key="2">{this.state.count}</span>
```

当一个template经过jsx编译后，我们就会得到许多的react元素。例子中的组件它的render方法就可以写成这样：
```js
class ClickCounter {
  ...
  render() {
    return [
      React.createElement(
        'button',
        {
          key: '1',
          onClick: this.onClick
        },
        'update counter'
      ),
      React.createElement(
        'span',
        {
          key: '2'
        },
        this.state.count
      )
    ]
  }
}
```
通过调用React.createElement我们可以得到如下的数据结构：
```js
[
  {
    $$typeof: Symbol(react.element),
    type: 'button',
    key: '1',
    props: {
      children: 'Update counter',
      onClick: () => { ... }
    }
  },
  {
    $$typeof: Symbol(react.element),
    type: 'span',
    key: '2',
    props: {
      children: 0
    }
  }
]
```
React通过添加$$typeof来作为元素的唯一标识。元素具有type、key和props等属性。对于ClickCounter类的数据结构是这样的：
```js
{
  $$typeof: Symbol(react.element),
  key: null,
  props: {},
  ref: null,
  type: ClickCounter
}
```

## Fiber nodes
通过调用render更新后的元素会合并到fiber nodes树中，每个React元素都会有一个对应的fiber node。和React元素不同的是，fibers并不会在每次更新时被重新创建。这些节点是保存组件状态和dom的可变数据结构。

我们在之前讨论过的，不同的React元素会执行不同的活动。在我们上面的例子中，class组件ClickCounter会调用生命周期函数和render方法，而对于span元素则需要更新DOM。

> 你可以认为fiber作为一种数据结构，描述了某种work，或者说是work单元。Fiber架构也提供了跟踪、计划、暂停和中止work的能力。

在React元素首次被转化成fiber node的时候，React会调用createFiberFromTypeAndProps方法，接受来自元素的数据，然后创建一个fiber。在以后的更新操作时，React就可以重用fiber node，只需要更新必要的属性。

因为React会为每一个元素创建一个fiber node。所以我们也会有一颗对应的fiber nodes树。我们例子中的fiber nodes树：  
<img class="progressiveMedia-image js-progressiveMedia-image" data-src="https://cdn-images-1.medium.com/max/1600/1*cLqBZRht7RgR9enHet_0fQ.png" src="https://cdn-images-1.medium.com/max/1600/1*cLqBZRht7RgR9enHet_0fQ.png">

所有的fiber nodes通过一个链表，使用child、sibling和return属性来进行连接。

## Current and work in progress trees
当首次render完成后，React会得到一颗用于展示应用state的fiber树。这颗树通常被称为current。当React开始进行更新操作时，就会创建一颗workInProgress树来表示将要展示在屏幕上的state。

所有的work都会执行在workInProgress的fiber节点上。当React遍历current树时，对于每个fiber节点都会创建一个对应的节点来用于组成workInProgress树。这个节点使用来自通过render方法返回的React元素的数据。当所有更新和相关工作执行完成后，React就会有一颗对应的将会展示在屏幕上的树。当workInProgress树展示在屏幕上后，它就变成新的current树。

React的核心概念之一就是一致性。React总是会一次更新完所有dom，而不会存在只更新了部分dom的情况。所以，workInProgress树会作为一个“草稿”，React会在这棵树上执行所有的操作，当所有操作执行完成后，再显示到屏幕上。

所有的fiber node都会有一个关于它对应树节点的指引。current树的节点会有一个指向workInProgress树对应节点的指针，反之亦然。

## Side-effects
我们可以认为React中的组件是一个函数，接受state和props，返回新的UI展示。每个活动例如操作DOM或者调用生命周期函数等，都可以被认为是一个副作用。

执行副作用是work的一种类型，fiber node可以方便的跟踪副作用。每个fiber node都可以有与之关联的副作用，用effectTag标识。

所以，在Fiber中，副作用定义了在实例被更新后需要执行的work。例如，对于host components(DOM elements)的work包含添加、更新或者删除元素；对于类组件，React需要更新refs和调用componentDidMount、componentDidUpdate等生命周期函数。

## Effect list
构建包含副作用的fiber nodes线性列表便于快速遍历。毕竟遍历线性列表比遍历树快多了，同时对于没有副作用的fiber nodes还可以直接跳过。

定义这样一个列表的目的是标记那些需要进行DOM更新或其它相关副作用的节点。这个列表是finishedWork树的一个子集，通过使用nextEffect属性连接而不再是在current和workInProgress树中使用的child属性。

为了更直观一些，我们假设下边这颗由fiber nodes构成的树，被高亮标记的节点有work需要执行。例如，更新会导致c2插入到DOM中，d2和c1需要改变属性，b2会触发生命周期方法。副作用列表将它们连接到一起，所以React可以跳过那些没有副作用的节点。  
<img class="progressiveMedia-image js-progressiveMedia-image" data-src="https://cdn-images-1.medium.com/max/800/1*Q0pCNcK1FfCttek32X_l7A.png" src="https://cdn-images-1.medium.com/max/800/1*Q0pCNcK1FfCttek32X_l7A.png">

React使用firstEffect指针找到列表的开始节点。上边图会得到如下的列表：  
<img class="progressiveMedia-image js-progressiveMedia-image" data-src="https://cdn-images-1.medium.com/max/800/1*mbeZ1EsfMsLUk-9hOYyozw.png" src="https://cdn-images-1.medium.com/max/800/1*mbeZ1EsfMsLUk-9hOYyozw.png">

## Root of the fiber tree
每个React应用有一到多个DOM元素作为containers。在我们的例子中，我们使用id为contaienr的div作为容器。
```js
const domContainer = document.querySelector('#container')
ReactDom.render(React.createElement(ClickCounter), domContainer)
```

React会为每个container创建一个fiber根对象。我们可以使用如下方法访问到它：
```js
const fiberRoot = query('#container')._reactRootContainer._internalRoot
```

fiber根对象保存着fiber树的索引。通过current属性可以访问到根节点：
```js
const hostRoot = fiberRoot.current
```

fiber树以一个特殊类型的fiber节点--HostRoot作为开始节点。它作为我们最顶层组件的父节点。在HostRoot节点中，可以通过stateNode属性访问到我们的FiberRoot：
```js
const hostRoot = fiberRoot.current
hostRoot.stateNode === fiberRoot
```

## Fiber node structure
这是ClickCounter组件的fiber nodes结构：
```js
{
  stateNode: new ClickCounter,
  type: ClickCounter,
  alternate: null,
  key: null,
  updateQueue: null,
  memoizedState: { count: 0 },
  pendingProps: {},
  memoizedProps: {},
  tag: 1,
  effectTag: 0,
  nextEffect: null
}
```

这是span元素的：
```js
{
  stateNode: new HTMLSpanElement,
  type: 'span',
  alternate: null,
  key: '2',
  updateQueue: null,
  memoizedState: null,
  pendingProps: { children: 0 },
  memoizedProps: { children: 0 },
  tag: 5,
  effectTag: 0,
  nextEffect: null
}
```

属性解释：
### stateNode  
保存着对组件的类实例，DOM节点或者其它于fiber节点相关的React元素的引用。总之，我们可以认为这个属性是用来保存于fiber相关的本地状态。

### type  
定义了与fiber相关的函数或者类。对于类组件，它指向的是构造函数，对于DOM元素，它指的是HTML标签。这个属性可以帮助我们了解fiber节点的关联类型。

### tag  
定义了fiber节点的类型。在协调算法中决定了那种类型的work将会被执行。正如之前提到的，work的类型取决于React的元素类型。函数createFiberFromTypeAndProps关联了React元素和fiber节点之间的类型。在我们的例子中，ClickCounter的tag是1，意味着它是一个ClassComponent，span元素的tag是5，意味着它是一个HostComponent。

### updateQueue  
一个关于更新、回调和DOM更新的队列。

### memoizedState  
Fiber生成结果时用到的state。当进行更新时，它反映当前在屏幕上呈现的状态。

### memoizedProps  
在上次渲染期间Fiber创建输出时用到的props。

### pendingProps  
位于React元素内的已经通过新数据更新后的props，并且将会用于子组件或DOM元素。

### key  
带有一组子节点的唯一标识符，用于帮助React判断那些项已被更改、被添加到列表或者被从列表删除。这和React中的"lists and keys"的原理是一样的。

## 算法分析
React执行work有两个阶段：render和commit。

在第一个render阶段，React通过setState或者React.render来安排组件执行的更新，同时计算出需要更新的UI。如果是初次render，React会为每一个通过render方法返回的元素创建一个新的fiber node。在后续的更新过程中，fibers会一直存在以便于React重用和更新。这个阶段的结果就是生成一颗标记了副作用的fiber nodes树。副作用描述了在接下来的commit阶段需要执行的work。在这个阶段，React将这颗标记了副作用的fiber nodes树用于实例，通过遍历副作用列表来执行DOM更新和其它一些用户可见的改变。

值得注意的是，在第一个render阶段的work是可以被异步执行的。React根据可用时间来决定执行一或多个fiber nodes，然后保存工作，停下来回到之前的事件中。然后下次再从上次停下的位置继续开始。当然，有时候也可能会抛弃现在正在执行的工作，然后从顶部重新开始工作。这个暂停的功能可行的原因是在这个阶段执行的work并不被用户可见。与render阶段相反的是，commit阶段的工作只能是同步的。这是因为commit阶段的改变是用户可见的，所以React需要确保这些工作在一个时间段内完成。

调用生命周期方法也是React的一种work类型。有些方法是在render阶段执行的，而有些方法是在commit阶段执行的。下边列出了render阶段调用的方法：  
* [UNSAFE_]componentWillMount(deprecated)
* [UNSAFE_]componentWillReceiveProps(deprecated)
* getDerivedStateFromProps
* shouldComponentUpdate
* [UNSAFE_]componentWillUpdate(deprecated)
* render

下边这些方法是commit阶段会被调用的方法：
* getSnapShotBeforeUpdate
* componentDidMount
* componentDidUpdate
* componentWillUnmount

因为这些方法执行在同步的commit阶段，它们可能会产生副作用和创建dom。

## Render phase
协调算法总是从最顶层的HostRoot节点开始，调用renderRoot方法。然而，React会跳过那些已经执行过的fiber nodes直到找到那些还有非完成work的节点。例如，你调用setState在一颗很深的组件树中，React会从最顶层开始执行，但是它会非常快速的跳过父节点，直到调用setState的那个组件。

### main step of the work loop
所有的fiber nodes都会在work loop中执行。这是loop的异步部分的实现：
```js
function workLoop(isYieldly) {
  if (!isYieldy) {
    while(nextUnitOfWork !== null) {
      nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
    }
  } else { ... }
}
```

在上边的代码中，nextUnitOfWork保存着workInProgress树中有work需要执行的fiber node。当React遍历树时，使用这个变量来确定是否还有未完成的工作。当当前fiber node执行完后，nextUnitOfWork会指向下一个fiber node，如果没有下一个fiber node，则为null。此时，React已经执行完了work loop，准备进入commit阶段。

这里有4个主要的方法会在这个阶段被调用：
* performUnitOfWork
* beginWork
* completeUnitOfWork
* completeWork

为了演示它们是怎么被使用的，看一下下边这个遍历fiber树的动画。为了便于演示，我简化了这些方法的实现。每个方法接受一个fiber node处理，随着React向下遍历树是，你可以看见当前活动的fiber node随着改变。你可以清楚的看见算法是怎么从一个分支到另一个分支的。它先完成子节点的work，然后到父节点。
<img class="progressiveMedia-image js-progressiveMedia-image" data-src="https://cdn-images-1.medium.com/max/800/1*A3-yF-3Xf47nPamFpRm64w.gif" src="https://cdn-images-1.medium.com/max/800/1*A3-yF-3Xf47nPamFpRm64w.gif">

我们先讲解performUnitOfWork和beginWork这两个方法。
```js
function performUnitOfWrok(workInProgress) {
  let next = beginWork(workInProgress)
  if (next === null) {
    next = completeUnitOfWork(workInProgress)
  }

  return next
}

function beginWork(workInProgress) {
  console.log('work performed for ' + workInProgress.name)
  return workInProgress.child
}
```