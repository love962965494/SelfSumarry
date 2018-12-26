**背景**:  
在React中，用于检测内容改变的机制叫做reconciliation或者rendering，而Fiber就是这种机制的新的实现方式。基于Fiber架构，React可以实现许多有趣的特征，例如执行非阻赛的rendering，根据优先级进行更新，以及在后台实现预渲染功能。这些特征在Concurrent React philosophy中被称为time-slicing。

**介绍**:
Fiber架构包含两个主要阶段：reconciliation/render和commit。在源代码中reconciliation通常被称为render。下边这些是react遍历组件树经历的阶段：

* updates state and props （更新state和props）
* calls lifecycle hooks （调用生命周期钩子）
* retrieves the children form the component （遍历子组件）
* compares them to the previous children （和之前的子组件进行比较）
* figures out the DOM updates that need to be preformed （找出需要更新的DOM）

所有这些活动在Fiber中被称作work。不同类型的React Element执行的work也不同。例如，对于Class Component，React需要实例一个类，而在Functional Component中则不需要。

如果所有这些活动在React中被同时执行，则会导致页面卡顿，因为一旦任务的执行时间超过16ms，就会导致屏幕渲染帧出现卡顿现象。

浏览器提供了一个新的API--requestIdleCallback，使用这个API可以在浏览器空闲时间执行任务。
```js
requestIdleCallback((deadline) => {
  // timeRemining()表示剩余可用执行任务的时间，
  // didTimeout表示是否已经超时
  console.log(deadline.timeRemaining(), deadline.didTimeout)
})

requestIdleCallback((deadline) => {
  while ((deadline.timeRemaining() > 0 || deadline.didTimeout) 
    && nextComponent ) {
    nextComponent = performWork(nextComponent)
  }
})
```

在执行work的过程中，我们从一个组件执行performWork，然后返回下一个组件的reference。这种方式我么不能异步的处理整颗组件树。所以为了解决不能异步的问题，React实现了一种新的算法。从之前的依赖于stack的递归遍历模型转到使用linked list和pointers的异步模型。  

> Andrew说道：  
> 如果你依赖于call stack，它会一直工作直到stack为空。。。如果我们可以按意愿的调用stack和手动操作stack frames，这将会很棒。而Fiber就是为了这个目的而实现的。Fiber重新实现了stack，专门应用于React components。你可以任务一个fiber就是一个虚拟的stack frame。

**实现**:

**定义我们的数据**  
```js
  const al = { name: 'a1' }
  const bl = { name: 'bl' }
  const b2 = { name: 'b2' }
  const b3 = { name: 'b3' }
  const c1 = { name: 'c1' }
  const c2 = { name: 'c2' }
  const d1 = { name: 'd1' }
  const d2 = { name: 'd2' }

  a1.render = () => [b1, b2, b3]
  b1.render = () => []
  b2.render = () => [c1]
  b3.render = () => [c2]
  c1.render = () => [d1, d2]
  c2.render = () => []
  d1.render = () => []
  d2.render = () => []
```


**递归遍历**  
遍历树的主要方法是walk。
```js
  walk(al)

  function walk(instance) {
    doWork(instance)
    const children = instance.render()
    children.forEach(walk)
  }


  function doWork(instance) {
    console.log(instance.name)
  }

  // output: a1, b1, b2, c1, d1, d2, b3, c2
```

缺点：
* 不能增量拆分任务
* 不能暂停任务和恢复任务

因此，这种方式实现的算法，React会一直遍历执行所有的组件，直到stack为空。

**链表遍历**  
定义链表我们需要用到3个属性：
* child -- 指向第一个child的索引
* sibling -- 指向第一个sibling的索引
* return -- 指向parent的索引

![alt text](https://cdn-images-1.medium.com/max/800/1*7dsyUaUpKbFG7EoNR9Cu2w.png)

```js
  class Node {
    constructor(instance) {
      this.instance = instance
      this.child = null
      this.sibling = null
      this.return = null
    }
  }

  function link(parent, children) {
    children = children || []

    parent.child = children.reduceRight((previous, current) => {
      const node = new Node(current)
      node.return = parent
      node.sibling = previous
      return node
    }, null)

    return parent.child
  }

  function doWork(node) {
    console.log(node.instance.name)
    const children = node.instance.render()
    
    return link(node, children)
  }

  function walk(instance) {
    const root = instance
    let current = instance

    while(true) {
      const child = doWork(current)

      if (child) {
        current = child
        continue;
      }

      if (current === root) {
        return
      }

      while(!current.sibling) {
        if (!current.return || current.return === root) {
          return
        }

        current = current.return
      }

      current = current.sibling
    }
  }
```

通过current保存当前执行到的节点，这样我们就可以随时暂停和恢复执行。

```js
  // 在React中的代码实现
  function workLoop(isYieldy) {
    if (!isYieldy) {
      // Flush work without yielding, it's synchronous
      while (nextUnitOfWork !== null) {
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
      } 
    } else {
        // Flush asynchronous work until the deadline runs out of tiem
        while (nextUnifOfWork !== null && !shouldYield()) {
          nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
        }
      }
    }
  }
```