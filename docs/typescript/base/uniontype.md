
![类型判断.PNG](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3f0efc48e77a44feaa9d35e6caa2a605~tplv-k3u1fbpfcp-watermark.image?)
### 1、使用typeof进行类型收窄（基本类型）
```typescript
type  A1 = number;
type  B1 = string;
type  C1 = A1 | B1;
const c1: C1 = '[]'


type A2 = { name: string }
type B2 = { age: number }
type  C = A2 | B2
const c: C = {
    age: 12
}

const f1 = function (a: number | string) {
    // '既不能把a当作number,也不能当作string'
    if (typeof a === "number") {
        // 此时a的类型是number
        a.toFixed(2)
    } else if (typeof a === "string") {
        a.substr(1, 1)
    } else {
        throw new Error('Never do this')
    }
}
// instanceof
const f2 = function (a: Date | Date[]) {
    // '既不能把a当作number,也不能当作string'
    if (a instanceof Date) {
        // 此时a的类型是number
        a.getDay()
    } else {
        // 此时是数组
        a[0].getDay()
    }
}
```
复杂的数据类型使用typeof关键字之后都会变为对象，所以typeof有一定的局限性。

![typeof.PNG](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/619abaa64d3b4e46829c69dacac1cc11~tplv-k3u1fbpfcp-watermark.image?)
### 2、使用in关键字进行类型收窄
`in`关键字表示某一个属性是否位于一个对象的实例当中，例如`name in a` 
```typescript

/**
 * 一旦做了类型联合就要进行类型收窄
 */

type Person = {
    name: string
}
type  Animal = {
    x: string
}
// 使用in作类型收窄,但是只适用于部分对象，
const f3 = (a: Person | Animal) => {
    if ('name' in a) {
        a // Person
    } else if ('x' in a) {
        a // Animal
    } else {
        a
    }
}
// 使用逻辑进行类型收窄
const f4 = (a?: string[]) => {
    if (a) {
        a // string[]
    }
}
const f5 = (x: string | number, y: string | boolean) => {
    if (x === y) {
        x // string
        y // string
    } else {

    }
}
```
### 3、区分ts类型的完全之法，类型谓词/类型判断 is  
```typescript
// 区分ts类型的完全之法，类型谓词/类型判断  is    优点 ：支持所有的TS类型
type Rect = {
    height: number
    width: number
}
type Circle = {
    center: [number, number];
    radius: number
}
const f6 = (a: Rect | Circle) => {
    if (isRect(a)) {
        a // Rect
    } else {
        a // Circle
    }
}

// 判断他是不是Rect类型
/**
 * 必须写成function的形式
 * @param x
 */
function isRect(x: Rect | Circle): x is Rect {
    return 'height' in x && 'width' in x
}

```
### 4、给对象添加属性区分不同类型
```typescript
// 更简单的方法？ a.kind区分a的类型

//通过添加一个kind字段识别不同的类型
interface Circle1 {
    kind: 'circle',
    value: number
}

interface Square1 {
    kind: 'square',
    value: number
}

type Shape = Circle1 | Square1
const f7 = (a: Shape) => {
    if (a.kind === 'circle') {
        a // A
    } else {
        a // B
    }
}
const button = document.getElementById('xxx')
button?.addEventListener('click', (e: Event) => {
    //e as MouseEvent
})

// any并不是表示的所有类型， 类型一旦联合变量就不能使用了，需要做类型收窄。

// unknown是所有类型的联合，需要进行类型收窄每次可以选择一个类型。
const f8 = (a: unknown) => {
    if (typeof a === 'string') {
        a //string
    } else if (a instanceof Date) {
        a.getTime() // Date
    } else if (typeof a === 'undefined') {
        a
    }
}
```
### 5、类型系统的交集

```typescript
// *--------------------*
// 类型系统的交集

type 有左手的人 = {
    left: string
}
type 有右手的人 = {
    right: string
}

const a: 有左手的人 = {
    left: '左',
    // right:'右' // error
}
const doubleHands = {
    left: '左',
    right: '右'
}
delete doubleHands.right
const b: 有左手的人 = doubleHands // ok


// 接口也能交集

interface Colorful {
    color: string
}

interface CircleFul {
    radius: string
}

type  CircleColorful = Colorful | CircleFul

type Person1 = {
    id: string
    name: string
    age: number
}
type User = Person1 & {
    // id:number;
    email: string
}
// 假如两个属性的类型冲突
const u: User = {
    // id:1  id的类型是never
    id: '1',
    name: '1',
    age: 1,
    email: '1'
}

// 假如两个type交集冲突，函数的交集会得到函数的并集。
type AA = {
    method:(n:number) => void
}
type BB = {
    method:(n:Date) => void
} & AA

const bb:BB = {
 method:(n) =>{
     console.log(n)
 }
}

```