
## 1、类型签名和Record描述对象
在TS中描述对象的数据类型的方法
- 使用class/constructor进行描述
- 使用type关键字或者interface描述对象

表示键值对的key类型为string，value的类型为number

`type A = Record<string,number>`
## 2、Ts描述函数对象的写法
### 2.1、定义函数类型
```typescript
// 定义两种TS类型
type Fun1 = (a: number, b: number) => number
type Fun2 = (a: string, b: string) => string

// 形参可加可以不加，但是返回值必须要与定义的类型相匹配
const FunA: Fun1 = () => {
  return 123
}
const FunB: Fun2 = () => {
  return '123'
}
```
### 2.2、函数返回值的区别

出现报错：不能将void空值赋值给undefined，但是可以在ts中将null与undefiend看成是一个东西

```js
type FnReturnVoid = () => void
type FnReturnUndefiend = () => undefined

const f1:FnReturnVoid = () => {

}

const f2:FnReturnUndefiend = () => {
  
}
// 编译错误：
BugFinder:Type '(=void'is not assignable to type FnReturnUndefiend'.BugFinder:
Type void'is not assignable to type 'undefined'.

// 返回值写成null则没有报错
type FnReturnVoid = () => void
type FnReturnUndefiend = () => undefined

const f1:FnReturnVoid = () => {

}

const f2:FnReturnUndefiend = () => {
  return null
}
```
### 2.3、支持this的函数声明
创建支持this的函数，声明支持this的函数需要指定调用this的类型，也就是this值得是谁，即this是谁设就有资格调用这个函数。
```typescript
type Person = {
  name: string,
  age: number,
  sayHi: FnWithThis
}
// 定义this的类型，this指的是Person，即调用这个函数的对象是Person
type FnWithThis = (this: Person, name: string) => void

const sayHi: FnWithThis = function (name) {
  console.log('hi', this.name, name)
}
// 创建支持调用this的函数对象
const x: Person = {
  name: 'person',
  age: 10,
  sayHi: sayHi
}

x.sayHi('jack')
// 另一种调用方法
sayHi.call(x,'jack')
```
## 3、Ts描述其他对象(一般用class来描述)

```typescript
// 常用的构造函数
const D: Date = new Date();
// 正则的两种表达方式
const r1: RegExp = /ab+c/g;
const r2: RegExp = new RegExp('ab+c');
const m: Map<string, number> = new Map()
m.set('123', 123)

// map集合
const wm1: WeakMap<object, number> = new WeakMap()
const wm2: WeakMap<{ name: string }, number> = new WeakMap()

// 测试小写object
type A = object
const a1:A = {};
const a2:A = [];
const a3:A = null;
const a4:A = undefined;

// set 集合
const s:Set<number> = new Set();
const ws:WeakSet<{name:string}> = new WeakSet()
s.add(1)
```
## 4、any和unknown和never是什么？
unknown表示给数据类型上了一个盖子，不确定的数据类型，需要使用该类型的数据的时候可以对数据类型进行推断。never表示不属于任何一种数据类型，可以对数据类型进行检查。
```typescript
// unknown的使用场景
const a: unknown = 1; // await 某个待处理的Promise异步任务
// 断言得到的a的类型
const b = a as number;
//  得到的b值的类型为number

// never不是用来声明的是用来推断的
// never表示不包含任何元素的集合,空集用来做检查
// const aa:never = 1

type A = string & number;
// 此时A的数据类型为never

type AA = number | string | boolean;
const aa: AA = 'hello' as any;
if (typeof aa === 'string') {
  aa.split('');
} else if (typeof aa === 'number') {
  aa.toFixed(2);
} else if (typeof aa === 'boolean') {
  aa.valueOf();
} else {
  console.log('结束了');
}

```
## 5、数组类型的描述

```typescript
type A = string[];
const a: A = ['1'];
// 另一种等价写法
type AA = Array<string>;
// 表示只能三个类型为string的字符串,下面表示是三元组
type D = [string, string, string];
const arrD: D = ['1', '2', '3'];
type E = [string, number];
const arrE: E = ['1', 1];
// 数组中的子数组的类型
type F = [string[], number[]];
const arrF: F = [['1'], [1]];

```
