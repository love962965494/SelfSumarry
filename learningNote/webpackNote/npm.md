## webpack笔记----关于npm
### 一、npm init
> npm init命令用来初始化一个简单的package.json文件。  
> 可以定制npm init 命令：在Home目录创建一个.npm-init.js即可，该文件的module.exports即为package.json配置内容。
> ```js
> // .npm-init.js
> const desc = prompt('description?', 'A new package...')
> const bar = prompt('bar?', '')
> const count = prompt('count?', '42')
>
> module.exports = {
>   key: 'value',
>   foo: {
>     bar: bar,
>     count: count
>   } ,
>   name: prompt('name?', process.cwd().split('/').pop()),
>   version: prompt('version?', '0.1.0'),
>   description: desc,
>   main: 'index.js'
> }
>
> // 在~/hello目录下执行npm init将会得到package.json
> {
>   "key": "value",
>   "foo": {
>     "bar": "",
>     "count": "42"
>   },
>   "name": "hello",
>   "version": "0.1.0",
>   "description": "A new package...",
>   "main": "index.js" 
> }
> ```
> 还可以在.npm-init.js中执行node脚本。
### 二、依赖包管理
1. 本地包管理
> 1. 创建config包文件夹，添加index.js文件，创建package.json定义config包
>> ```js
>> {
>>   "name": "config",
>>   "main": "index.js",
>>   "version": "0.1.0" 
>> }
>> ```
> 2. 在应用层package.json文件中新增依赖项，然后执行npm install
>> ```js
>> {
>>   "dependencies": {
>>     "config": "file:./config"
>>   }
>> }
>> ```
> 3. 或者直接在应用目录执行npm install file:./config
> 4. 此时，node_modules目录就会多一个名为config，指向上层config/文件夹的软链接。
>
2. 私有git共享package
> 将被依赖的包托管在私有的git仓库中，然后将该git url保存到dependencies中。npm会直接调用系统的git命令从git仓库拉取包的内容到node_modules中。
>
3. 开源package问题修复
> fork原作者的git库，在自己所属的repo下修复问题后，将dependencies中相应的依赖项更改为自己修复后版本的git url即可解决问题。
### 三、npm install如何工作
1. npm2采用简单的递归安装方法
> 缺点:
> * 对复杂工程，node_modules内目录结构层级太深，文件引用路径可能会超过260字符长限制
> * 部分包被多个包所依赖，则会在每个包中都有一份依赖包，有大量冗余
>
2. npm3采用扁平结构
3. npm5新增package-lock.json文件
> 记录了node_modules里所有包的结构、层级和版本号甚至安装源，所以提供了保存node_modules状态的能力。确保其他机器上npm install都会得到完全相同的node_modules结果。  
> package-lock.json中的字段说明：
> * version、resolved、integrity: 记录包的准确版本号、内容hash、安装源的，决定了要安装的包的准确身份信息
> * dependencies: dependencies的层级结构和文件系统中node_modules的文件夹层次结构是完全对照的 
> * requires: 除最外层requires属性为true外，其他层的requires属性对应着这个包的package.json里记录的自己的依赖项
### 四、依赖包版本管理
1. semver
> semver约定一个包的版本号必须包含3个数字，格式必须为MAJOR.MINOR.PATCH，意味主版本号.小版本号.修订版本号
> * MAJOR对应大的版本号迭代，做了不兼容旧版的修改时要更新MAJOR版本号
> * MINOR对应小版本迭代，发生兼容旧版API的修改或功能更新时，更新MINOR版本号
> * PATCH对应修订版本号，一般针对修复BUG的版本号  
> ```js
> npm version major|minor|patch 可以简单的将版本号中相应数字加1
> ```
> 最佳实践:
> * 使用npm >= 5.1版本，保持package-lock.json文件默认开启
> * 不要手动修改package-lock.json文件
> * 升级依赖包
>     * 升级小版本：本地执行npm update升级到小版本
>     * 升级大版本：本地执行npm install \<package-name>@\<version>
>     * 手动修改package.json对应包的版本号，执行npm install
> * 降级版本号
>     * 正确：npm install \<package-name>@\<old-version>
>     * 错误：手动修改package.json中的版本号，再次执行npm install 依然会安装package-lock.json中的版本号
> * 删除依赖包
>     * npm uninstall \<package>
>     * 从package.json中删除依赖，然后执行npm install
### 五、npm scripts
1. npm run命令
> 1. npm run命令执行时，会把./node_modules/.bin目录添加到执行环境的PATH变量中。因此即使未全局安装的命令行包也可以运行了
> 2. 执行npm脚本时要传入参数，需要在命令后加 -- 标明。例：npm run test -- --grep="pattern"可以将--grep="pattern"参数传给test命令
> 3. npm提供了pre和post两种钩子机制，可以定义某个脚本前后的执行脚本
> 4. 可以通过process.env对象访问相关信息
2. node_modules/.bin目录
> <font color=#ff502c>./node_modules/.bin</font>目录，保存了依赖目录中所安装的可供调用的命令行包  
> 所以，输入<font color=#ff502c>./node_modules/.bin/webpack</font>就可以执行webpack了  
> npm执行install时，会分析每个依赖包的package.json中的bin字段，并将其包含的条目安装到<font color=#ff502c>./node_modules/.bin</font>目录中
3. npx
> npx使用很简单，执行<code>npx \<command></code>即可，这里的command默认就是<code>./node_modules</code>目录中安装的可执行脚本。所以<code>npx webpack</code>就可以直接启动webpack了。
> * 一键执行远程npm源的二进制包。例：npx working-hard，将下载并执行warking-hard
> * 一键执行Github Gist。例：npx \<gist url>
> * 使用不同版本node执行命令。例： npx node@version
### 六、npm配置
1. npm config  
> 修改配置的命令为<code>npm config set \<key> \<value></code>，常用配置：
> * proxy, http-proxy: 指定npm使用的代理
> * registry: 指定npm下载安装包时的源，默认为> <code>https://registry.npmjs.org/</code>
> * package-lock: 指定是否默认生成package-lock文件，建议保持为true
> * save: 指定是否在npm install后保存包为dependencies，npm 5起默认为true
>
2. npmrc文件
> npmrc文件也可以直接修改配置  
> npmrc文件优先级由高到低：
> * 工程内配置文件: /path/my-project/.npmrc
> * 用户级配置文件: ~/.npmrc
> * 全局配置文件: $PREFIX/etc/npmrc
> * npm内置配置文件: /path/to/npm/npmrc
### 七、小结
* 使用npm-init初始化新项目
* 统一项目配置：需团队共享的npm config配置项，固化到.npmrc文件中
* 统一运行环境，统一package.json，统一package-lock文件
* 合理使用多样化的源安装依赖包：<code>npm install \<git url> | \<local file></code>
* 使用npm: >= 5.2版本
* 使用npm scripts与npx(npm: >= 5.2)脚本管理应用相关脚本
