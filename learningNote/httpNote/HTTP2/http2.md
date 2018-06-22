## http2笔记
### 一、介绍
> HTTP/2的目的是通过支持完整的请求与响应复用来减少延迟，通过有效压缩HTTP标头字段将协议开销减少至最低，同时增加对请求优先级和服务器推送的支持。  
> HTTP/2没有改动HTTP的应用语义。HTTP方法、状态代码、URI和标头字段等核心概念一如往常。不过，HTTP/2修改了数据格式化(分帧)以及在客户端与服务器间传输的方式。
> * 二进制分帧层
> * 请求与响应复用
> * 数据流优先级
> * 服务器推送
> * 标头压缩
### 二、二进制分帧层
> HTTP/1.x协议以换行符作为纯文本的分隔符，而HTTP/2将所有传输的信息分割为更小的消息和帧，并采用二进制格式对它们编码。
> * 数据流：已建立的连接内的双向字节流，可以承载一条或多条消息
> * 消息: 与逻辑请求或响应消息对应的完整的一系列帧
> * 帧: HTTP/2通信的最小单位，每个帧都包含帧头，至少也会标识出当前帧所属的数据流
>
> 总结：
> * 所有通信都在一个TCP连接上完成，次连接可以承接任意数量的双向数据流
> * 每个数据流都有一个唯一的标识符和可选的优先级信息，用于承载双向消息
> * 每条消息都是一条逻辑HTTP消息(例如请求或响应)，包含一个或多个帧
> * 帧是最小的通信单位，承载着特定类型的数据，例如HTTP头部、消息负载，等等。来自不同数据流的帧可以交错发送，然后再根据每个帧头的数据流标识符重新组装。
![HTTP/2通信](https://developers.google.com/web/fundamentals/performance/http2/images/streams_messages_frames01.svg?hl=zh-CN)
### 三、请求与响应复用
> 在HTTP/1.x中，如果客户端要想发起多个并行请求以提升性能，则必须使用多个TCP连接。而HTTP/2则实现了完整的请求和响应复用。新的二进制分帧层解决了HTTP/1.x中存在的队首阻赛问题，也消除了并行处理和发送请求及响应时对多个连接的依赖。
>
> 将HTTP消息分解为独立的帧，交错发送，然后在另一端重新组装。这个机制会在整个网络技术栈中引发一系列连锁反应，从而带来巨大的性能提升。
> * 并行交错地发送多个请求，请求之间互不影响
> * 并行交错地发送多个响应，响应之间互不干扰
> * 使用一个连接并行发送多个请求和响应
> * 不必再为绕过HTTP/1.x限制而做很多工作
> * 消除不必要的延迟和提高现有网络容量的利用率，从而减少页面加载时间
### 四、数据流优先级
> HTTP/2标准允许每个数据流都有一个关联的权重和依赖关系：
> * 可以向每个数据流分配一个介于1至256之间的整数
> * 每个数据流与其他数据流之间可以存在显示依赖关系
>
> 数据流依赖关系和权重的组合明确表示了资源优先级，这是一种用于提升浏览性能的关键功能。同时，客户端可以随时更新资源优先级，进一步优化浏览器性能（注：资源优先级只是决定了传输过程的优先级，并不会影响被服务器处理的顺序，即高优先级的资源也不一定优先被服务器处理）。
### 五、服务器推送
> HTTP/2新增服务器推送功能，服务器可以对一个客户端请求发送多个响应。服务器除了对最初请求的响应外，服务器还可以向客户端推送额外资源，而无需客户端明确地请求。  
> 所有服务器推送数据流都由PUSH_PROMISE帧发起，表明了服务器向客户端推送所述资源的意图，并且需要先于请求推送资源的响应数据传输。  
> 在客户端接受到PUSH_PROMISE帧后，它可以根据自身情况选择拒绝数据流(通过RST_PROMISE帧)
### 六、标头压缩
> 每个HTTP传输都承载一组标头，这些标头说明了传输的资源及其属性。HTTP/2使用了HPACK压缩格式压缩请求和响应标头元数据。
> 1. 这种格式支持通过静态Huffman代码对传输的标头字段进行编码，从而减少了各个传输的大小
> 2. 这种格式要求客户端和服务端同时维护和更新一个包含之前见过的标头字段的索引列表，此列表随后用作参考，对之前传输的值进行有效编码。