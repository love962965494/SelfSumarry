# JS笔记----typescript part2
## 一、枚举
typescript支持数字和基于字符串的枚举。
> ```ts
> /* 数字枚举 */
> enum Direction {
>   Up = 1,
>   Down,
>   Left,
>   Right
> }
> /* 字符串枚举 */
> enum Direction {
>   Up = 'UP',
>   Down = 'DOWN',
>   Left = 'LEFT', 
>   Right = 'RIGHT'
> }
>
> /* 方向映射 */
> /* 不会为字符串枚举成员生成反向映射!!! */
> enum Enum {
>   A 
> }
> let a = Enum.A /* 0 */
> let nameOfA = Enum[a] /* A */
>
> /* 编译后的JS代码： */
> var Enum
> (function(Enum) {
>   Enum[Enum['A'] = 0] = 'A' 
> })(Enum || (Enum = {}))
> var a = Enum.A
> var nameOfA = Enum[a]
> ```
>
常量枚举：不同于常规的枚举，常量枚举在编译阶段会被删除。常量枚举成员在使用的地方会被内联进来。常量枚举不允许包含计算成员。
> ```ts
> const enum Directions {
>   Up,
>   Down,
>   Left,
>   Right 
> }
> 
> let directions = [Directions.Up, Directions.Down]
> /* 生成代码： */
> var directions = [0 /* Up */, 1 /* Down */]