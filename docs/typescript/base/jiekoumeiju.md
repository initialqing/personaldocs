# 目录
[[toc]]
## 1、接口
声明变量类型的结构，示例A使用内联注解，示例B使用接口形式

```typescript
// 示例A   使用类型注解
declare const myPoint: { x: number; y: number };

// 示例B 使用接口定义
interface Point {
  x: number;
  y: number;
}
declare const myPoint: Point;
```
示例B有好处可以直接用示例B,基于 `myPoint` 的库来添加新成员, 那么他可以轻松将此成员添加到 `myPoint` 的现有声明中:

```typescript
interface Point{
  z:number
}
myPoint.z 没有报错
```
### 1.1、类可以实现接口
类实现接口，接口（类）或别人定义的对象结构，可以使用 `implements` 关键字来确保其兼容性：

```typescript
interface Point {
  x: number;
  y: number;
  // z:number
}
class MyPoint implements Point {
  x: number;
  y: number; // Same as Point
  // z:number mussing memeber 'z'
}
const foo: Point = new MyPoint();
// console.log(foo);
```
### 1.2、并不是每个接口都容易实现
```typescript
interface Crazy {
  new (): { hello: number };
}
class CrazyImpl implements Crazy {
  constructor() {
    return { hello: 123 };
  }
}
const ci = new CrazyImpl();
```
## 2、枚举
收集并联变量的一种方式，其他的编程语言也都有枚举类型

```typescript
//  定义
enum CardSuit {
  Clubs,
  Diamonds,
  Hearts,
  Speaders,
}
let Card:CardSuit = CardSuit.Clubs;
// 类型安全
Card = '123'; // Error: string 不能赋值给 `CardSuit` 类型
```
### 2.1、数字类型枚举
可以通过在定义枚举的时候更改枚举的索引值，`fase=1`表示枚举对应的索引值从1开始。
```typescript
enum Color {
  red,
  Green,
  Blue,
}
let col = Color.red;
col = 1;
// console.log(Color['red']);

// 数字类型枚举与字符串类型
enum Tristate {
  // 改变枚举对应的索引值
  False = 1,
  True = 2,
  Unknown = 3,
}
console.log(Tristate[0]); // False
console.log(Tristate['False']); // 0
console.log(Tristate[Tristate.False]); // False
```
### 2.2、使用数字类型作为标志
`<<` 表示左移运算符,相当与把数字对应的二进制数字进行左移相应的位数，`[key: string]: any`表示一个索引签名，其多用于接口的定义在其他属性不确定但是属性和值的类型都确定的情况，表示键类型为string，值为任意的键值对。
```typescript
enum AnimalsFlags {
  None = 0,
  HasClaws = 1 << 0, // 0001
  CanFlay = 1 << 1, // 0010
}

interface Animals {
  flag: AnimalsFlags;
  // 表示其他的属性值键的类型为string 值的类型为任意
  [key: string]: any;
}


function printAnimalAbilities(animals: Animals) {
  let animalsFlags = animals.flag;
  if (animalsFlags & AnimalsFlags.HasClaws) {
    console.log('animal has claws');
  }
  if (animalsFlags & AnimalsFlags.CanFlay) {
    console.log('animal can flay');
  }
  if (animalsFlags == AnimalsFlags.None) {
    console.log('animal none');
  }
}

// 测试代码
const animal: Animals = { flag: AnimalsFlags.None };
// 初始的标志为
printAnimalAbilities(animal);
// 修改一个标志
animal.flag |= AnimalsFlags.HasClaws;
printAnimalAbilities(animal);
// 清除一个标志
animal.flag &= ~AnimalsFlags.HasClaws;
printAnimalAbilities(animal);
// 合并两个标志
animal.flag |= AnimalsFlags.HasClaws | AnimalsFlags.CanFlay;
printAnimalAbilities(animal);
// console.log();
```

> **TIP**
> 
> 使用 |= 可以替换一个标志
> 
> 组合使用标志&= 和 ~ 可以清除一个标志
>
> | 可以合并多个标志


### 2.3、字符串枚举
语法
```typescript
export enum EvidenceTypeEnum {
  UNKNOWN = '',
  PASSPORT_VISA = 'passport_visa',
  PASSPORT = 'passport',
  SIGHTED_STUDENT_CARD = 'sighted_tertiary_edu_id',
  SIGHTED_KEYPASS_CARD = 'sighted_keypass_card',
  SIGHTED_PROOF_OF_AGE_CARD = 'sighted_proof_of_age_card',
}
console.log(EvidenceTypeEnum);

if (value === EvidenceTypeEnum.PASSPORT) {
  console.log('You provided a passport');
  console.log(value); // `passport`
}
```
打印定义的枚举`console.log(EvidenceTypeEnum);`结果为

```typescript
{PASSPORT: "passport"
PASSPORT_VISA: "passport_visa"
SIGHTED_KEYPASS_CARD: "sighted_keypass_card"
SIGHTED_PROOF_OF_AGE_CARD: "sighted_proof_of_age_card"
SIGHTED_STUDENT_CARD: "sighted_tertiary_edu_id"}
```
### 2.4、常量枚举的表达方法

这样定义会提升一点性能，因为会编译成`let lie = 0`，而不是会被编译成 JavaScript `let lie = Tristate.False`所以在运行执行时，它将会查找变量 `Tristate` 和 `Tristate.False`。

```typescript
// 常量枚举
const enum TristateConst {
  False,
  True,
  Unknown,
}
const lie = TristateConst.False;
```
### 2.5、在枚举中加入静态方法
核心思想是使用`namespace`+`enum`的声明方式向枚举类型中添加静态方法，如下示例中添加了三个方法。
```typescript
// 使用静态方法的枚举
enum WeekDay {
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
  Sunday,
}

// 命名空间
namespace WeekDay {
  export function isBussinessDay(day: WeekDay) {
    switch (day) {
      case WeekDay.Saturday:
      case WeekDay.Sunday:
        return false;
      default:
        return true;
    }
  }
  export function isWorkDay(day:WeekDay) {
    // .....
  }
  export function functionName(day:WeekDay) {
    // ......
  }
}
const mon = WeekDay.Monday;
const sun = WeekDay.Sunday;

// 使用向枚举中添加的静态方法
console.log(WeekDay.isBussinessDay(mon));
console.log(WeekDay.isBussinessDay(sun));

```
## 3、函数重载和声明
Ts可以声明函数重载，你只需多次声明函数头。最后一个函数头是在函数体内实际处于活动状态但不可用于外部。

```typescript
function padding(all: number);
function padding(topAndBottom: number, leftAndRight: number);
function padding(top: number, right: number, bottom: number, left: number);

function padding(a: number, b?: number, c?: number, d?: any) {
  console.log(a, b, c, d);
  if (b === undefined && c === undefined && d === undefined) {
    b = c = d = a;
  } else if (c === undefined && d === undefined) {
    c = a;
    d = b;
  }
  return {
    top: a,
    right: b,
    bottom: c,
    left: d,
  };
}
padding(1); // Okay: all
padding(1, 1); // Okay: topAndBottom, leftAndRight
padding(1, 1, 1, 1); // Okay: top, right, bottom, left
// padding(1, 1, 1); Error: Not a part of the available overloads  没有后相应的函数重载形式
```
> 函数声明
>
> 函数声明有两种方法，多用第一种对象的声明方式，函数方法重载只适用于第一种写法。
```typescript
// 函数声明
type LongHand1 = {
  (a: number): number;
};
// 另一种写法
type LongHand2 = (a: number) => number;

// 两种写法一样，但是方法重载的形式只能写第一种
type LongOverLoad = {
  (a: number): string;
  (a: string): number;
};
```
## 4、可调用的类型注解
定义接口：

```typescript
interface ReturnString {
  (): string;
}
```
定义变量并使用，foo可以表示一个返回string类型的函数

```typescript
declare const demo1: Returning;
// bar 被推断出是一个字符串类型
const bar = demo1();
```
还可以定义比较复杂的函数类型

```typescript
// 可被调用的类型注解的例子
interface Complex {
  (foo: string, bar?: number, ...others: boolean[]): number;
}
```
一个接口可以定义多种调用方式，可以用在函数重载当中，使用`type`关键字和接口`interface`都可以
```typescript
// 使用类型注解或者接口定义一个函数类型

type OverLoadType = {
  (foo: string): string;
  (foo: number): number;
};

interface OverLoadInterface {
  (foo: string): string;
  (foo: number): number;
}

function StringOrNumber(foo: string): string;
function StringOrNumber(foo: number): number;
function StringOrNumber(foo: any): any {
  if (typeof foo === 'number') {
    return foo * 2;
  } else if (typeof foo === 'string') {
    return `hello,${foo}`;
  }
}

const overLoad: OverLoadType = StringOrNumber;
const str = StringOrNumber('123');
const num = StringOrNumber(123);
```
## 5、类型断言
TypeScript 允许你覆盖它的推断，并且能以你任何你想要的方式分析它，这种机制被称为「类型断言」。TypeScript 类型断言用来告诉编译器你比它更了解这个类型，并且它不应该再发出错误。

```typescript
interface Foo {
  bar: number;
  bas: string;
}
const ff:Foo = {} as Foo;


const foo = <Foo>{
  // 编译器将会提供关于 Foo 属性的代码提示
  // 但是开发人员也很容易忘记添加所有的属性
  // 同样，如果 Foo 被重构，这段代码也可能被破坏（例如，一个新的属性被添加）。
};

const foo: Foo = {
  // 编译器将会提供 Foo 属性的代码提示
};
```
双重断言

```typescript
function handler(event: Event) {
  const element = event as any as HTMLElement;
}
```
> TypeScript 如何确定单个断言是否足够？
>
> 当 S 类型是 T 类型的子集，或者 T 类型是 S 类型的子集时，S 能被成功断言成 T。
## 6、对象字面量检查Freshness
```typescript
function logName(something: { name: string }) {
  console.log(something.name);
}

const person = { name: 'matt', job: 'being awesome' };
const animal1 = { name: 'cow', diet: 'vegan, but has milk of own specie' };

logName(person); // ok
logName(animal1); // ok
```
person和animal中的属性都相对于要求的多了，但是ts编译器没有报错。

```typescript

logName({ name: 'matt' }); // ok
logName({ name: 'matt', job: 'being awesome' }); // warning 这里多了一个属性diet

```
> WARNING
> 
> 请注意，这种错误提示，只会发生在对象字面量上。

允许额外的属性必须使用索引前名指定键值对的类型
```typescript
let x: { foo: number, [x: string]: any };

x = { foo: 1, baz: 2 }; // ok, 'baz' 属性匹配于索引签名
```
## 7、类型保护
类型保护可以在更小范围使用对象类型`instanceof`,`typeof`的用法使用

```typescript
// typeof 的使用
function doSome(x: number | string) {
  if (typeof x === 'string') {
    x.substring(1); // ts能够识别 x 的类型是string
  }
  x.substring(1); // Error: 无法保证 `x` 是 `string` 类型
}



// instanceof 的使用
class Foo {
  foo = 123;
  common = '123';
}
class Bar {
  bar = 123;
  common = '123';
}
function doStuff(arg: Foo | Bar) {
  if (arg instanceof Foo) {
    arg.foo; // 存在
    arg.bar; // 不存在
  }
  if (arg instanceof Bar) {
    arg.bar; // 存在
    arg.foo; // 不存在
  }
}



// in操作符安全的检查一个对象上是否存在一个属性，它通常也被作为类型保护使用
interface A {
  x: number;
}
interface B {
  y: number;
}
function doIn(arg: A | B) {
  if ('y' in arg) {
    arg // 类型为B
  }else {
    arg // 类型为A
  }
}



// 自定义类型保护
// https://www.jianshu.com/p/57df3cb66d3d  简书链接：说明了为什么使用is关键字
function isFoo(arg: Foo | Bar): arg is Foo {
  return (arg as Foo).foo !== undefined;
}
```