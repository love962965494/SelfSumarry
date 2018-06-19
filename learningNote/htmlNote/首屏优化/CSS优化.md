## 首屏优化----css优化
### 一、介绍
> 浏览器必须先处理当前网页的所有样式和布局信息，然后才能呈现内容。因此，浏览器会阻止页面呈现网页内容，直到外部样式表已下载完毕并处理完毕（这可能需要进行多次往返，因而可能会导致首次呈现时间延迟）。
### 二、优化建议
1. 内嵌较小CSS文件
> 如果外部CSS资源比较小，可将它们直接插入到HTML文档中，这成为“内嵌”。以这种方式内嵌较小的CSS文件可让浏览器顺畅无阻地呈现网页。请注意，如果CSS文件比较大，则需要确定和内嵌用于呈现首屏内容的CSS，并暂缓加载其余样式，直到首屏内容显示出来为止。
> ```html
> <html>
>   <head>
>     <style>
>       .blue { color: blue; }
>     </style>
>   </head>
>   <body>
>     <div class="blue">Hello World!</div>
>
>     <noscript id="deferred-styles">
>       <link rel="stylesheeet" type="text/css" href="small.css">
>     </noscript>
>
>     <script>
>       var loadDeferredStyles = function() {
>         var addStylesNode = document.getElementById('deferred-styles')
>         var replacement = document.createElement('div')
>         replacement.innerHtml = addStylesNode.textContent
>         document.body.appendChild(replacement)
>         addStylesNode.parentElement.removeChild(addStylesNode)
>       }
>       var raf = window.requestAnimationFrame
>       if (raf) {
>         raf(function() { window.setTimeout(loadDeferredStyles, 0); })
>       } else {
>         window.addEventListener('load', loadDeferredStyles)
>       }
>     </script>
>   </body>
> </html>
> ```
> 系统会在网页中内嵌用于设置首屏内容样式的关键样式，并会立即将其应用到文档中。待系统完成对网页内容的初次绘制之后，整个small.css才会开始加载。一旦small.css加载完毕，系统便会将其应用到网页中，因而不会阻止初次呈现关键内容。
2. 请勿内嵌较大数据URI
> 在CSS文件中内嵌数据URI时，请务必慎重。在CSS中使用较小数据URI，内嵌较大数据URI可能会导致首屏CSS变大，进而延缓网页呈现时间。
3. 请勿内嵌CSS属性
> 应尽量避免在HTML元素中内嵌CSS属性，因为这经常会导致不必要的代码重复。
4. 媒体查询
> 未申明谋体查询的样式表，始终会阻赛渲染过程。申明了媒体查询的样式表，只在符合媒体查询条件时，才会阻赛渲染。  
> 阻赛渲染是指浏览器是否需要暂停网页的首次渲染，直至该资源准备就绪。无论哪一种情况，浏览器仍会下载CSS资源，只不过不阻赛渲染的资源优先级较低罢了。