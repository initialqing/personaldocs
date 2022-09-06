
## 1、字面量类型
> 字面量是JavcaScrpit提供的一个准确变量

使用用例，使用函数生成键值对的对象结构

```typescript
// 创建基于字符串的枚举结构
function strDerection<T extends string>(arr: Array<T>): { [K in T]: K } {
  return arr.reduce((res, key) => {
    res[key] = key;
    return res;
  }, Object.create(null));
}
const dir = strDerection(['North', 'South', 'East', 'West']);
// 对对象使用的写法
type Direction = keyof typeof dir;
let temp: Direction;
temp = dir.East;// ok
temp = dir.North;// ok
```
标记所有属性为只读属性：

```typescript
// 声明初始类型
type someObj  = {
  attr1:number;
  attr2:string
}
//  标记所有属性使用只读类型
type someObjReadOnly = Readonly<someObj>
```
绝对的不可变性：将索引签名标记为只读

```typescript
interface someFoo{
  readonly [index:number]:number
}
const fooTest:someFoo = {0:123,1:456}
console.log(fooTest[0]) // ok
fooTest[0] = 123// error
```
还可以以不变的方式使用原生的js数组，利用TS提供的`ReadonlyArray<T>`接口

```typescript
let foo: ReadonlyArray<number> = [1, 2, 3];
console.log(foo[0]); // ok

foo.push(4); // Error: ReadonlyArray 上不存在 `push`，因为他会改变数组

foo = foo.concat(4); // ok
```
> 在一些情况下，编译器能把一些特定的属性推断为 `readonly`，例如在一个 `class` 中，如果你有一个只含有 `getter` 但是没有 `setter` 的属性，他能被推断为只读：


```typescript
class Person {
  firstName: string = 'John';
  lastName: string = 'Doe';

  get fullName() {
    return this.firstName + this.lastName;
  }
}

const person = new Person();

console.log(person.fullName); // John Doe
person.fullName = 'Dear Reader'; // Error, fullName 只读

```
## 2、泛型
设计泛型的关键目的是在成员之间提供有意义的约束，这些成员可以是：

-   类的实例成员
-   类的方法
-   函数参数
-   函数返回值


泛型用来约束的例子，用泛型来约束我们往对象中传入的数值类型

```typescript
class Queue<T> {
  private data: T[] = [];
  push = (num: T) => this.data.push(num);
  pop = (): T | undefined => this.data.shift();
}

// 约束data的类型为number类型
const queue = new Queue<number>();
queue.push(1);
queue.push([]);

// 创建一个反转数组的函数
const reverseArr = <T>(arr: Array<T>): Array<T> => {
  const result = [];
  for (let i = arr.length - 1; i >= 0; i--) {
    result.push(arr[i]);
  }
  return result;
};

const testArr = [1, 2, '3'];
// 利用泛型起到类型约束的作用，手动指定泛型的类型是什么
const reversed1 = reverseArr<number>(testArr);
// 不指定类型的时候,这种写法会自动推断传入参数中的类型
const reversed2 = reverseArr(testArr);
// 不能将字符串赋值给数组中的元素
reversed1[0] = '1'; // error 数组中不能传入字符串类型的值

```
> 你可以随意调用泛型参数，当你使用简单的泛型时，泛型常用 `T`、`U`、`V` 表示。

`T` 只在一个地方被使用了，但它并没有在成员之间提供约束 `T`的例子

```typescript
// 一个加载JSON数据的函数,其返回值为你传入的任意类型的promise
const getJson = <T>(config: {
  url: string;
  heders?: { [key: string]: string };
}): Promise<T> => {
  const fetchConfig = {};
  return fetch(config.url, fetchConfig).then<T>((response) => response.json());
};

type loadUserResponse = {
  user: {
    name: string;
    email: string;
  }[];
};

function loadUser() {
  return getJson<loadUserResponse>({ url: 'https://example.com/users' });
}
```
与此类似：使用 `Promise<T>` 作为一个函数的返回值比一些如：`Promise<any>` 的备选方案要好很多。

配合Axios使用的泛型的例子

```typescript
// 配合Axios使用
// 把后端返回的数据格式单独封装在一个接口,在interfase.ts中
export interface RespondseData<T = any> {
  // @type{number}返回number数据
  code: number;

  // 返回数据类型为T的数据
  result: T;

  // 返回消息数据数据格式为string

  message: string;
}
// 写请求文件
 import Ax from './axios';
 import { ResponseData } from './interface.ts';

 export function getUser<T>() {
   return Ax.get<RespondseData<T>>('./something')
     .then((res) => res.data)
     .catch((error) => {});
 }

// 写出返回User的数据类型,可以让ts顺利推断出我们想要的类型
interface User {
  name: string;
  age: number;
}
async function get() {
  // 此时user被推断出为
  /**{
    code:number,
    result:{name:string,age:number},
    messgae:String
  }
  */
  const user = await getUser<User>();
}
```
类型的兼容性问题：

```typescript
interface Empty<T> {}

let x: Empty<number>;
let y: Empty<string>;

x = y; // ok
// -----------------------------------------------------------
// 接口加入泛型之后会报错
interface Empty<T> {
  data: T;
}

let x: Empty<number>;
let y: Empty<string>;

x = y; // Error

```
> never与void的差异

一旦有人告诉你，`never` 表示一个从来不会优雅的返回的函数时，你可能马上就会想到与此类似的 `void`，然而实际上，`void` 表示没有任何类型，`never` 表示永远不存在的值的类型。

当一个函数返回空值时，它的返回值为 void 类型，但是，当一个函数永不返回时（或者总是抛出错误），它的返回值为 never 类型。void 类型可以被赋值（在 strictNullChecking 为 false 时），但是除了 never 本身以外，其他任何类型不能赋值给 never。
## 3、索引签名
所有成员都必须符合所i因签名的要求
```typescript
//
interface Foo {
  [key: string]: number;
  x: number;
  y: number;
}

// Error
interface Bar {
  [key: string]: number;
  x: number;
  y: string; // Error: y 属性必须为 number 类型
}
```
使用有限字符串字面量

```typescript
// 使用有限的字符串字面量
type index = 'a' | 'b' | 'c';

type fromIndex = { [key in index]?: number };

const good: fromIndex = {
// formindex只能是abc中的一个
  a: 1,
  c: 2,
  b: 3,
};
// 延迟推断变量的类型
type FromIndex<K extends string> = { [key in K]?: number };
```
索引前名的嵌套
错误的示范如下,不会捕获到错误

```typescript
// 添加索引签名需要考虑的Api
interface NestedCss {
  color?: string;
  [selector: string]: string | NestedCss;
}
// 把字符串索引签名与有效变量混合使用。如果属性名称中有拼写错误，这个错误不会被捕获到：
const NS: NestedCss = {
  colowwear: 'red',
};
// ---------------------------------------------
// 正确的例子如下
// 正确做法，把索引签名分离到自己的属性中
interface NestCss {
  color?: string;
  // 相当于多加入一个nest属性
  nest?: {
    [selector: string]: NestCss;
  };
}
// example
const example: NestCss = {
  color: 'red',
  nest: {
    '.subclass': {
      color: 'pink',
    },
  },
};
```
## 4、流动的类型

```typescript
class Foo {}
const bars = Foo;
let bar1: bars; // Error: 不能找到名称 'Bar'

// 无法那bars当作一个类型声明来使用

namespace importing {
  export class Foo1 {}
}
// 相当于对Foo1这个类名取了一个别名
import Bar = importing.Foo1;
let bar2: Bar; // ok

//捕获类成员的类型
class Foo1 {
  // 想要捕获的类型
  foo: number;
}
declare let _foo: Foo1;
// 捕获成员的类型
let bar3: typeof _foo.foo;

// 捕获键的名称
// keyof 操作符能够捕获一个类型的键。可以通过它捕获键变量的名称，在使用typeof 获取类型之后
const Colors = {
  red: 'red',
  blue: 'blue',
};

type colors = keyof typeof Colors;
let color: colors;
color = 'red';
color = 'blue';
```
## 5、异常处理与混合

```typescript
// 异常处理：JavaScript 有一个 Error 类，用于处理异常。你可以通过 throw 关键字来抛出一个错误。然后通过 try/catch 块来捕获此错误：
// 使用Error：不建议直接抛出一个error字符串
try {
  throw '这是一个错误的做法';
} catch (e) {
  // dosomething
}
// 不需要抛出Error错误
// node.js中的回调函数非常常见,函数中传递一个Error对象

function myFunction(callback: (e: Error) => 1) {
  doSomethingAsync(function () {
    if (somethingWrong) {
      callback(new Error('This is my error'));
    } else {
      callback();
    }
  });
}
function validate(value: number): { error?: string } {
  if (value < 0 || value > 100) {
    return { error: 'Invalid value' };
  }
}
```

> TIP 
> 
> 除非你想用以非常通用（try/catch）的方式处理错误，否则不要抛出错误。

混合的代码

```typescript
class Tagged {}
class TimesStaped {}
//在ts中和js中类只能严格的单继承
class User extends Tagged,TimesStaped{}
//Classes can only extend a single class

//从可重用组件构建类的另一种方式:
// 通过基类来构建它们，这种方式称为混合。
// 一个混合的例子


// 所有的mixins 都需要的，混合接受一个类，并且使用新功能扩展它。因此，我们需要定义构造函数的类型：
type Constructor<T = {}> = new (...args:any) => T

//  添加属性的混合的例子
function TimesStamped<TBase extends Constructor>(Base:TBase){
  // 返回一个混合了属性之后的类
  return class extends Base {
    timestamp = Date.now()
  }
}
// 添加属性和方法的例子
function Activatable<TBase extends Constructor>(Base:TBase){
  // 返回一个混合了属性和方法之后的类
  return class extends Base{
    isActivated  = false
    
    activate(){
      this.isActivated = true
    }
    
    deactivate(){
      this.isActivated = false
    }
  }
}

// 组合类
// 简单的类
class UserDemo{
  name = ''
}
// 添加Timestamped 的 User
const TimestampedUser = TimesStamped(UserDemo)
// 返回添加属性和方法之后的新类
const TimestampedUserActivatable = TimesStamped(Activatable(UserDemo))
const TimestampedUserActivatableExample = new TimestampedUserActivatable()
const TimeUserExample = new TimestampedUser()
console.log(TimeUserExample.timestamp)
console.log(TimestampedUserActivatableExample.timestamp)

```
## 6、ThisType
改变this的类型，建议在`ts.config`中开启`noImplicitThis`选项
```typescript
// 定义对象的类型
type objectDescription<D,M> = {
  data?:D;
  methods?:M & ThisType<D & M> // this的类型是D & M
}
function makeObject<D,M>(desc:objectDescription<D,M>):D & M{
  let data:object = desc.data || {};
  let methods:object = desc.methods || {}
  return {...data,...methods} as D & M
}
let obj = makeObject({
  data:{x:0,y:0},
  methods:{
    moveBy(dx:number,dy:number){
       this.x += dx
       this.y += dy
    }
  }
})

```