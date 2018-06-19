## 首屏优化----JS优化
### 一、介绍
> JavaScript会阻止DOM构建和延缓网页渲染。为了实现最佳性能，让JavaScript异步执行，并去除关键渲染路径中任何不必要的JavaScript。
> * JavaScript可以查询和修改DOM与CSSOM
> * JavaScript执行会阻止CSSOM
> * 除非将JavaScript显示申明为异步，否则它会阻止创建DOM
> * JavaScript执行将暂停，直至CSSOM就绪
### 二、优化建议
> 向script标记添加异步关键字(例：async)可以指示浏览器在等待脚本可用期间不阻止DOM构建，这样可以显著提升性能。
> 1. 首选使用异步JavaScript资源
> 2. 避免同步服务器调用: 在unload处理程序中发送的数据，多为同步请求，可能减慢网页转换速度。可以使用navigator.sendBeacon()方法向pagehide处理程序而不是unload处理程序发送服务器数据。
> 3. 延迟解析JavaScript
> 4. 避免运行时间长的JavaScript