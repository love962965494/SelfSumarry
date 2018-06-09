## axios笔记
### 一、介绍
1. Promise based HTTP client for the browser and node.js.
> ```js
> // Make a request for a user with a given ID
> axios.get('/user?ID="12345')
>   .then(response => console.log(response))
>   .catch(error => console.log(error))
>
> // use async/await
> async function getUser() {
>   try {
>     const response = await axios.get('/user?ID=12345')
>     console.log(response)
>   } catch (error) {
>     console.log(error)
>   }
> }
> ```
### 二、原理及实现
1. Interceptors拦截器
> request拦截器在请求之前执行，response拦截器在请求之后执行。
> ```js
> // add a request interceptor
> axios.interceptors.request.use(config => config, 
>                                error => Promise.reject(error))
>
> // add a response interceptor
> axios.interceptors.response.use(response => response,
>                                 error => Promise.reject(error))
>
> // remove interceptor
> const myInterceptor = axios.interceptors.request.use(() => { /* ... */})
> axios.interceptors.request.eject(myInterceptor)
> 
> // complete InterceptorManager
> function InterceptorManager () {
>   this.handlers = [] 
> }
> 
> InterceptorManage.prototype.use = function (fulfilled, rejected) {
>   this.handlers.push({fulfilled, rejected})
>   return this.handlers.length - 1 
> } 
> 
> InterceptorManager.prototype.forEach = function (fn) {
>   this.handlers.forEach(handler => h && fn(h)) 
> }
> ```
2. request和response拦截器
> ```js
> // complete axios
> function Axios (config) {
>   this.defaults = config
>   this.interceptors = {
>     request: new InterceptorManager(),
>     response: new InterceptorManager()
>   } 
> }
>  
> Axios.prototype.request = function (config) {
>   // ... 省略若干代码
>   const chain = [dispatchRequest, undefined]
>   const promise = Promise.resolve(config)
>
>   // 向chain头部添加request拦截器
>   this.interceptors.request.forEach(({ fulfilled, rejected }) =>
>                                      chain.unshift(fulfilled, rejected)) 
>   // 向chain尾部添加response拦截器
>   this.interceptors.response.forEach(({ fulfilled, rejected}) => 
>                                       chain.push(fulfilled, rejected))
>
>   while (chain.length) {
>     promise = promise.then(chain.shift(), chain.shift())
>   }
>   return promise
> }
> ```
3. 适配nodejs和浏览器环境
> 通过请求适配器adapter实现不同环境下的请求
> ```js
> // 发送请求方法
> function dispatchRequest (config) {
>   // ... 省略若干代码
>   const adapter = config.adapter || defaults.adapter
>   return adapter(config)
>            .then(response => { /* ... */}, error => {/* ... */} 
> }
>
> function getDefaultAdapter() {
>   let adapter
>   if (
>     typeof process !== 'undefined' && 
>     Object.prototype.toString.call(process) === '[object process]'
>   ) {
>     // for node use HTTP adapter
>     adapter = require('./adapters/http')
>   } else if (typeof XMLHttpRequest !== 'undefined') {
>     // for browser use xml  
>     adapter = require('./adapters/sml') 
>   }
>   return adapter
> }
> ```
4. 自动转换JSON
> axios会自动将传入的data对象序列化为JSON字符串，将响应数据中的JSON字符串转换为
> js对象。
> ```js
> const defaults = {
>   // ... 省略若干代码
>   transformRequest: [function transformRequest(data, headers) {
>     normalizeHeaderName(headers, 'Content-Type')
>     if (
>       utils.isFormData(data) ||
>       utils.isArrayBuffer(data) ||
>       utils.isBuffer(data) ||
>       utils.isStream(data) ||
>       utils.isFile(data) ||
>       utils.isBlob(data)
>     ) {
>       return data
>     }
>     if (utils.isArrayBufferView(data)) {
>       return data.buffer
>     }
>     if (utils.isURLSearchParams(data)) {
>       setContentTypeIfUnset(headers, 
>         'application/x-www-form-urlencoded; charset=utf-8')
>       return data.toString()
>     }
>     if (utils.isObject(data)) {
>       setContentTypeIfUnset(headers, 'application/json;charset=utf-8')
>       return JSON.stringify(data)
>     }
>     return data
>   }],
>   transformResponse: [function transformResponse(data) {
>     if (typeof data === 'string') {
>        try {
>          data = JSON.parse(data)
>        } catch (e) {
>          // ...
>        }
>     }
>     return data
>   }]
> }
> ```
5. 支持客户端XSRF攻击保护
> XSRF攻击，即“跨站请求伪造(Cross Site Request Forgery)”攻击。通过窃取用户的
> cookie，让用户在本机上发起用户不知道的请求。防护XSRF攻击的一种方法是设置特殊的
> xsrf token。
> ```js 
> // 设置xsrf的cookie字段名和header字段名
> {
>   // xsrfCookieName is the name of the cookie to use as a value of xsrf 
>   // token  
>   xsrfCoolieName: 'XSRF-TOKEN',
>   // xsrfHeaderName is the name of the http header that carries the xsrf
>   // token value
>   xsrfHeaderName: 'X-XSRF-TOKEN' 
> }
>
> module.exports = function xhrAdapter(config) {
>   // add xsrf header 
>   // this is only done if running in a standard browser environment
>   if (utils.isStandardBrowserEnv()) {
>     const cookies = require('./../helpers/cookies')
>     const xsrfValue =
>       ( 
>         (config.withCredentials || isURLSameOrigin(config.url)) &&
>         config.xsrfCookieName
>       ) ? 
>         cookies.read(config.xsrfCookieName) :
>         undefined
>     if (xsrfValue) {
>       requestHeaders[config.xsrfHeaderName] = xsrfValue
>     }                
>   } 
> }
