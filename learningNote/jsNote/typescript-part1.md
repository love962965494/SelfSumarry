# JS笔记----typescript part1
## 一、基础类型
* boolean 
> ```ts
> let isDone: boolean = true
> ```
>
* number: 所有数字都是浮点数
> ```ts
> let number1: number = 6
> ```
>
* string
* Array\<any> | any[]
> ```ts
> let list: number[] = [1, 2, 3]
>
> // 元组Tuple
> let x: [string, number] // declare a tuple type
> x = ['hello', 10] // initialize it correctly
> x = [10, 'hello'] // initialize it incorrectly
>
> // 当访问一个越界的元素，会使用联合类型替代
> x[3] = 'world' // OK,字符串可以赋值给(string | number)类型
> x[6] = true // Error,布尔不是(string | number)类型
> ```
> 
* enum: 枚举是对JavaScript标准数据类型的一个补充
> ```ts
> enum Color [Red, Green, Blue]
> let c: Color = Color.Green
> 
> // 默认情况下从0开始为元素编号，也可以手动指定成员的数值
> enum Color [Red = 1, Green = 2, Blue = 4]
> let colorName: string = Color[2]
> ```
>
* any: 类型检查器不会检测类型为any的值
> ```ts
> let notSure: any = 4
> notSure = 'maybe a string instead'
> let list: any[] = [1, true, 'free']
> list[1] = 100
> ```
>
* void: 没有任何类型，与any相反。函数没有返回值时，通常指定返回值类型为void
> ```ts
> function warnUser: void {
>   alert('Tis is my warning message') 
> }
>
> // 声明一个void类型的变量没有什么大用，它只能被赋予undefined和null
> let unusable: void = undefined || null
> ```
>
* null和undefined
> ```ts
> // 默认情况下null和undefined是所有类型的子类型，可以赋值给任何类型
> // 但是,当指定了--strictNullChecks标记，则只能赋值给void和它们自己
> let u: undefined = undefined
> let n: null = null
> ```
>
* never: 永不存在的值，是任何类型的子类型，但是没有其他类型可以赋值给never，即使any
> ```ts
> // 返回never的函数必须存在无法到达的终点
> function error(message: string): never {
>   throw new Error(message)
> }
> ```
>
* 类型断言: "相信我，我知道自己在干什么"
> ```ts
> let someValue: any = "this is a string"
> let strLength: number = (<string>someValue).length
> // JSX语言，只支持as语法断言!!!
> let strLength: number = (someValue as string).length
> ```
>
## 二、接口
接口的作用是为类型命名和代码定义契约。
> ```ts
> interface LabelledValue {
>   label: string; 
> }
>
> function printLabel(labelledObj: LabelledValue) {
>   console.log(labelledObj.label) 
> }
>
> let myObj = { size: 10, label: 'Size 10 Objects' }
> printLabel(myObj)
>
> /* 可选参数接口 */
> interface SquareConfig {
>   color?: string;
>   width?: number; 
> }
>
> function createSquare(config: SquareConfig): {color: string, area: number}   {
>   let newSquare = { color: 'white', area: 100 }
>   if (config.color) {
>     newSquare.color = config.color
>   } 
>   if (config.width) {
>     newSquare.area = config.width * config.width
>   }
>   return newSquare
> }
>
> let mySquare = createSquare({ color: 'black' })
> ```
>
只读属性：只能在对象刚刚创建的时候修改其值  
> <code>readonly</code> vs <code>const</code>:
> * 针对变量使用const
> * 针对属性使用readonly
> ```ts
> interface Point {
>   readonly x: number;
>   readonly y: number; 
> }
>
> let p1: Pont = { x: 10, y: 20 }
> p1.x = 5 /* Error! */
>
> /* 只读数组: ReadonlyArray<T> */
> let a: number[] = [1, 2, 3, 4]
> let ro: ReadonlyArray<number> = a
> ro[0] = 12 // error!
> ro.push(5) // error!
> ro.length = 100 // error!
> a = ro // error! 
> a = ro as number[] // right
> ```
> 
索引签名
> ```ts
> interface SquareConfig {
>   color: string;
>   width?: number;
>   [propName: string]: any;  // 此时传入其它属性就不会报错了
> }
> ```
>
函数类型接口：只有参数列表和返回值类型的函数定义
> ```ts
> interface SearchFunc {
>   (source: string, subString: string): boolean;
> }
>
> let mySearch: SearchFunc
> mySearch = function(src, sub) {
>   let result = source.search(subString)
>   return result > -1 
> }
> ```
>
可索引类型接口：描述了索引类型和索引返回值类型
> ```ts
> interface StringArray {
>   [index: number]: string; 
>   1: 100; /* 错误，返回值类型不是string */
>   str: 2; /* 错误，索引类型不是number */
> }
>
> let myArray: StringArray
> myArray = ["Bod", "Fred"]
> let myStr: string = myArray[0]
> ```
>
实现接口：明确强制一个类符合接口契约
> ```ts
> interface ClockInterface {
>   currentTime: Date; 
>   setTime(d: Date);
> }
>
> class CLock implements ClockInterface {
>   /* 接口只描述类的公共部分，不会检查私有类型成员 */  
>   currentTime: Date;
>   setTime(d) { this.currentTime = d }
>   constructor(h: number, m: number) {} 
> }
>
> /* 类实现一个接口时，不会检测静态部分，应该直接操作类的静态部分 */
> interface ClockConstructor {
>   new(hour: number, minute: number): ClockInterface; 
> }
> interface ClockInterface {
>   tick(); 
> }
>
> function createClock(ctor: ClockConstructor, hour, minute): ClockInterface {
>   return new ctor(hour, minute)    
> }
>
> class DigitalClock implements ClockInterface {
>   constructor(h: number, m: number) {}
>   tick() { console.log('beep beep') } 
> }
>
> class AnalogClock implements ClockInterface {
>   constructor(h: number, m: number)
>   tick() { console.log('tick tock') } 
> }
>
> let digital = createClock(DigitalClock, 12, 17)
> let analog = createClock(AnalogClock, 7, 32)
> ```
>
继承接口：接口也可以相互继承  
接口继承类：继承类的成员但不包括实现，就像接口声明了类中的所有成员，但没有实现
> ```ts
> interface Shape {
>   color: string; 
> }
> interface Square extends Shape {
>   sideLength: number; 
> }
>
> let square = <Square>{}
> square.color = 'blue'
> square.sideLength = 10
>
> /* 接口继承类 */
> class Control {
>   private state: any;
> }
> interface SelectableControl extends Control {
>   select(): void; 
> }
> class Button extends Control implements SelectableControl {
>   select() {}
> }
> /* 报错，因为Image没有继承Control类，不具备私有属性state，接口实现就会报错 */
> class Image implements SelectableControl {
>   select() {} 
> }
> ```
>
## 三、类
公共、私有与受保护的修饰符
> * 未指定修饰符时，默认为public。  
> * private修饰符，声明类成员不能在类的外部被访问。  
> * protected修饰符，声明类成员仍可以在派生类中被访问。  
> * 在比较带有private或protected成员的类型时：如果其中一个类型里包含一个private成员，那么只有当另一个类型中也存在这样一个private成员，并且它们都是来自同一处声明时，才认为它们类型是兼容的。  
> * 类的constructor如果被声明为protected，则类不能被外部实例化，只能通过它的子类实现实例化。
> ```ts
> class Animal {
>   private name: string;
>   constructor(theName: string) { this.name = theName } 
> }
> class Rhino extends Animal {
>   constructor() { super('Rhino') } 
> }
> class Employee {
>   private name: string;
>   constructor(theName: string) { this.name = theName } 
> }
>
> let animal = new Animal('Goat')
> let rhino = new Rhino()
> let employee = new Employee('Bob')
>
> animal = rhino /* 正确，私有类型相同 */
> animal = employee /* 错误，私有类型不兼容 */
>
> /* 参数属性 */
> class Animal {
>   /* 等同于 private name: string; */
>   /* this.name = name */
>   constructor(private name: string) {}
>   move(distance: number) {
>     console.log(`${this.name} moved ${distance}m`)
>   } 
> }
> ```
>
> 抽象类：作为其它派生类的基类使用，一般不会被直接实例化。不同于接口，抽象类可以包含成员的实现细节。
> ```ts
> abstract class Animal {
>   /* 抽象方法不包含具体实现且必须在派生类中实现 */
>   abstract makeSound(): void;
>   move(): void { console.log('roaming the earch...') } 
> }
> ```
>
## 四、函数
this参数：提供一个显示的this参数。this参数是个假的参数，它出现在参数列表的最前面。
> ```ts
> interface Card {
>   suit: string;
>   card: number; 
> }
> interface Deck {
>   suits: string[];
>   cards: number[];
>   createCardPicker(this: Deck): () => Card; 
> }
>
> let deck: Deck = {
>   suits: ['hearts', 'spades', 'clubs', 'diamonds'],
>   cards: Array(52),
>   createCardPicker: function(this: Deck) {
>     return () => {
>       let pickedCard = Math.floor(Math.random() * 52);
>       let pickedSuit = Math.floor(pickedCard / 13);
>       
>       return { suit: this.suits[pickedSuit], card: pickedCard % 3}
>     }
>   } 
> }
>
> let cardPicked = deck.createCardPicker()
> let pickedCard = cardPicker()
> ```
>
> this参数在回调函数里：当回调函数被调用的时候，回调函数会被当成一个普通函数调用，this将为undefined。需要指定this类型。
> ```ts
> interface UIElement {
>   addClickListener(onclick: (this: void, e: Event) => void): void; 
> }
> class Handler {
>   info: string;
>   onClickBad(this: Handler, e: Event) {
>     this.info = e.message
>   }
>   onClickGood(this: void, e: Event) {}
>   /* 箭头函数不会捕获this。缺点是每个Handler对象都会创建一个箭头函数 */
>   onClickGood1 = (e: Event) => { this.info = message }
> }
> 
> let h = new Handler()
> /* 报错！在接口中要求this是void类型，而在Handler中，又声明this是Handler类型 */
> uiElement.addClickListener(h.onClickBad)
> /* 正确！ */
> uiElement.addClickListener(h.onClickGood)
> ```
>
> 重载：为同一个函数提供多个函数类型定义来进行函数重载。在定义重载的时候，一定要把最精确的定义放在最前面。因为typescript会查找重载列表，直到找到匹配的函数定义。
> ```ts
> let suits = ['hearts', 'spades', 'clubs', 'diamonds']
>
> function pickCard(x: {suit: string; card: number;}[]): number
> function pickCard(x: number): { suit: string; card: number; }
>
> function pickCard(x): any {
>   if (typeof x === 'object') {
>     let pickedCard = Math.floor(Math.random() * x.length)
>     return pickedCard
>   } else if (typeof x === 'number') {
>     let pickedSuit = Math.floor(x / 13)
>     return { suit: suits[pickedSuit], card: x % 13 }
>   }
> }
>
> let myDeck = [{ suit: 'diamonds', card: 2}, { suit: 'spade', card: 10 }]
> let pickedCard1 = myDeck[pickCard(myDeck)]
> let pickedCard2 = pickCard(15)
> ```
>
## 五、泛型
使用泛型来创建可重用的组件，一个组件可以支持多种类型的数据。
> ```ts
> /* 通过类型变量T确保了传入参数类型和函数返回类型一致 */
> function identity<T>(arg: T): T {
>   return arg
> }
>
> let output = identity<string>('myString')
> /* 或者 */
> let output = identity('myString')
>
> /* 泛型接口 */
> interface GenericIdentityFn {
>   <T>(arg: T): T;
> }
> function identity<T>(arg: T): T{
>    return arg
> }
>
> let myIdentity: GenericIdentityFn = identity
>
> /* 泛型参数作为接口参数传入 */
> interface GenericIdentityFn<T> {
>   (arg: T): T   
> }
> let myIdentity = GenericIdentityFn<number> = identity
> ```ts
>
泛型约束：使用接口和extends关键字来实现约束
> ```ts
> interface Lengthwise {
>   length: number; 
> }
>
> function loggingIdentity(T extends Lengthwise)(arg: T): T{
>   console.log(T.length) 
>   return arg
> }
>
> /* 声明一个类型参数，它被另一个类型参数约束 */
> function getProperty(obj: T, key: K) {
>   return obj[K] 
> }
>
> let x = {a: 1, b: 2, c: 3}
> getProperty(x, 'a') 
> /* error: Argument of type 'm' isn't assignable to 'a' | 'b' | 'c'*/
> getProperty(x, 'm')
> ```
