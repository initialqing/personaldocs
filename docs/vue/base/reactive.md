
[[toc]]
## 一、计算属性

&emsp;&emsp;在模板中使用表达式只能进行简单的操作，假如在模板中也有复杂的逻辑代码就会变得臃肿、不易阅读且难以维护，所以可以使用vue计算属性简化，简单来说就是我把一个响应式的数据直接写在模板中就会很复杂，所以可以把它写在一个函数中,然后返回一个响应式的变量，然后在模板中使用这个变量就会简单。下面是一个计算属性的例子：

```vue
<script setup>
import { reactive, computed } from 'vue'
const author = reactive({
  name: 'John Doe',
  books: [
    'Vue 2 - Advanced Guide',
    'Vue 3 - Basic Guide',
    'Vue 4 - The Mystery'
  ]
})

// 一个计算属性 ref
const publishedBooksMessage = computed(() => {
  return author.books.length > 0 ? 'Yes' : 'No'
})
</script>

<template>
  <p>Has published books:</p>
  <span>{{ publishedBooksMessage }}</span>
</template>
```
### 1.1、只读计算属性和可写计算属性
上边的代码中定义了一个计算属性`publishedBooksMessage `,通过`computedApi`实现,其期望我们传入一个getter函数返回一个**响应式的ref对象**,可以通过.value得到getter函数的返回值。同时他还可以接收get和set函数，创建**可写的ref对象**。通过typescript我们可以知道他的结构：
```typescript
// 只读
function computed<T>(
  getter: () => T,
  // 查看下方的 "计算属性调试" 链接
  debuggerOptions?: DebuggerOptions
): Readonly<Ref<Readonly<T>>>

// 可写的
function computed<T>(
  options: {
    get: () => T
    set: (value: T) => void
  },
  debuggerOptions?: DebuggerOptions
): Ref<T>
```
第一个函数返回`Readonly<Ref<Readonly<T>>>`只读的ref对象，第二个可以给computed函数传入get和set函数返回可写的ref对象。第三个参数为`debuggerOptions`是可选项，返回一个只读的ref对象就如上边例子所示传入一个get函数即可

```typescript
// 返回一个可写的computed的响应式对象。
const count = ref(1)
cosnt refComputed = conputed({
    get:() => count.val + 1
    set:(val) => {
        count.val = val - 1
    }
})
```
### 1.2、计算属性调试
`computed()`函数可以传入第二个参数类型为`DebuggerOptions`，这是一个包含`onTrack`和`onTrigger`两个回调函数的对象，一个回调在访问属性值的时候触发一个再更改value值的时候触发，代码如下所示：

```typescript
const plusOne = computed(() => count.value + 1, {
  onTrack(e) {
    // 当 count.value 被追踪为依赖时触发
    debugger
  },
  onTrigger(e) {
    // 当 count.value 被更改时触发
    debugger
  }
})

// 访问 plusOne，会触发 onTrack
console.log(plusOne.value)

// 更改 count.value，应该会触发 onTrigger
count.value++
```
> 调试仅仅再开发模式下生效

### 1.3、计算属性标注类型
其实通过上边的代码我们就可以知道如何给计算属性标注类型了，像代中写的`computed<T>()`我们使用的时候显式的传入一个泛型即可，get函数的返回值为我们定义的泛型类型T，同时computed还会自动的推导返回类型。
```typescript
// 推导类型的例子
import { ref, computed } from 'vue'

const count = ref(0)

// 推导得到的类型：ComputedRef<number>
const double = computed(() => count.value * 2)

// => TS Error: Property 'split' does not exist on type 'number'
const result = double.value.split('')

```
通过泛型参数显式的指定类型:
```vue
const double = computed<number>(() => {
  // 若返回值不是 number 类型则会报错
})
```
计算属性中使用reverse()和sort()的时候小心，因为这些方法会改变原数组，调用这些方法之前需要创建一个原来数组的备份。
## 二、事件处理
记录一下vue中对事件处理的一些特性。
### 2.1、事件监听
事件监听方面可以使用`v-on`指令,指令的简写为`@`监听原生的DOM事件，事件触发的时候执行定义的js语法。事件处理器可以分为两类：
1. 内联事件处理器：事件被触发执行的`JacvaScript`语句，常见的如鼠标事件`click`
3. 方法事件处理器：对于组件上定义的方法的属性名或者是路径。

当需要访问原生的DOM事件的时候可以向方法处理器传入一个$event参数，还有一个方法是使用内联箭头函数，不常用就不记录了。
- 内联事件处理器举例
```typescript
const count = ref(0)
// js代码写在方法体内部
<button @click="count++">Add 1</button>
<p>Count is: {{ count }}</p>
```
- 方法事件处理器
```typescript
const name = ref('Vue.js')

function greet(event) {
  alert(`Hello ${name.value}!`)
  // `event` 是 DOM 原生事件
  if (event) {
    alert(event.target.tagName)
  }
}

<!-- `greet` 是上面定义过的方法名 -->
<button @click="greet">Greet</button>
```
当`click`事件的逻辑比较复杂的时候就需要单独写一个函数进行处理，这就是方法事件处理器。
### 2.2、事件修饰符
Vue为事件提供了时间修饰符使用`.`表示指令的后缀，主要的事件修饰包含以下这些：
- .stop&emsp;&emsp;&emsp;&emsp;单击事件停止传播
- .prevent&emsp;&emsp;&emsp;&emsp;提交时间不再重新加载页面
- .self&emsp;&emsp;&emsp;&emsp;event.target 是元素本身时才会触发事件处理器
- .capture&emsp;&emsp;&emsp;&emsp;捕获添加修饰符的元素，先触发添加修饰符的事件。
- .once&emsp;&emsp;&emsp;&emsp; 绑定once的监听器会触发一次，第一次触发后该监听器被remove
- .passivepassive&emsp;&emsp;&emsp;&emsp;表示listener函数不会调用preventDefault()与prevent相对应。

关于`capture`的介绍：
> 1. 冒泡是从里往外冒，捕获是从外往里捕。
> 2. 当捕获存在时，先从外到里的捕获，剩下的从里到外的冒泡输出。

```vue
<!-- 单击事件将停止传递 -->
<a @click.stop="doThis"></a>

<!-- 提交事件将不再重新加载页面 -->
<form @submit.prevent="onSubmit"></form>

<!-- 修饰语可以使用链式书写 -->
<a @click.stop.prevent="doThat"></a>

<!-- 也可以只有修饰符 -->
<form @submit.prevent></form>

<!-- 仅当 event.target 是元素本身时才会触发事件处理器 -->
<!-- 例如：事件处理器不来自子元素 -->
<div @click.self="doThat">...</div>
```
这些修饰符与addenentLinstener相对应：
``` vue
<!-- 添加事件监听器时，使用 `capture` 捕获模式 -->
<!-- 例如：指向内部元素的事件，在被内部元素处理前，先被外部处理 -->
<div @click.capture="doThis">...</div>

<!-- 点击事件最多被触发一次 -->
<a @click.once="doThis"></a>

<!-- 滚动事件的默认行为 (scrolling) 将立即发生而非等待 `onScroll` 完成 -->
<!-- 以防其中包含 `event.preventDefault()` -->
<div @scroll.passive="onScroll">...</div>
```
### 2.3、按键修饰符
按键修饰符主要为了监听键盘事件，因为需要监听键盘事件所以给`@`增加了案件修饰符
> 按键别名：

-   `.enter`
-   `.tab`
-   `.delete` (捕获“Delete”和“Backspace”两个按键)
-   `.esc`
-   `.space`
-   `.up`
-   `.down`
-   `.left`
-   `.right`

> 系统按键修饰符
-   `.ctrl`
-   `.alt`
-   `.shift`
-   `.meta`

> 鼠标按键修饰符

-   `.left`
-   `.right`
-   `.middle`
## 三、数据绑定v-model
### 3.1、表单输入绑定
基本用法不再记录，记录一下表单输入绑定中的值绑定规则与举例：
```typescript
const selected = ref('A')

const options = ref([
  { text: 'One', value: 'A' },
  { text: 'Two', value: 'B' },
  { text: 'Three', value: 'C' }
])
```

```vue
<select v-model="selected">
  <option v-for="option in options" :value="option.value">
    {{ option.text }}
  </option>
</select>

<div>Selected: {{ selected }}</div>
```
这个例子使用v-for指令动态渲染options中的可选项，同时将可选项的value值动态绑定到selected中，`selected`与option的value动态绑定,`:value="option.value"`表示将`option.value`这个值动态绑定到`selected`中
> 针对v-model数据绑定的修饰符
- `.lazy`
- `.number`
- `.trim`

### 3.1、组件绑定v-model
假设我们有一个组件`CustomInput`再其使用v-model指令之前的例子为：
```vue
<CustomInput v-model="searchText"/>
```
对组件使用v-model指令会展开成如下的形式,相当于对子组件`CustomInput`传入了一个props属性名为`modelValue`值为`searchText`。同时定义了子组件给父组件传入数据的自定义事件`update:modelValue`,需要在子组件进行一定的处理才可以实现数据绑定。
```vue
<CustomInput
  :modelValue="searchText"
  @update:modelValue="newValue => searchText = newValue"
/>
```

```vue
在子组件当中
<script setup>
defineProps(['modelValue'])
defineEmits(['update:modelValue'])
</script>

<template>
  <input
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>
```

1.  将内部原生 `input` 元素的 `value` attribute 绑定到 `modelValue` prop
2.  输入新的值时在 `input` 元素上触发 `update:modelValue` 事件
>另一种在组件实现v-model的方法

另一种在组件内实现 `v-model` 的方式是使用一个可写的，同时具有 getter 和 setter 的计算属性。`get` 方法需返回 `modelValue` prop，而 `set` 方法需触发相应的事件：
```vue
<!-- CustomInput.vue -->
<script setup>
import { computed } from 'vue'

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})
</script>

<template>
  <input v-model="value" />
</template>
```
> 给v-model定义参数

上边例子中使用的`modelValue`作为props的默认参数，对应的自定义事件为`update:modelValue`，其实可以自定义model参数，语法为`v-model:[propName]`:

```vue
//Parent.vue
<MyComponent v-model:title="bookTitle" />


// MyComponent.vue
defineProps(['title'])
defineEmits(['update:title'])
```
同时还可以给组件绑定**多个v-model**数据双向绑定，同时每个指令都会对应不同的prop例如：
```vue
// UserName的某个父组件中
<UserName
  v-model:first-name="first"
  v-model:last-name="last"
/>
```
```typescript
//UserName.vue 中
const props = defineProps({
  firstName: String,
  lastName: String
})

defineEmits(['update:firstName', 'update:lastName'])
```
> v-model修饰符的处理

前文中数据绑定有一些内置的修饰符比如`.trim`，`.number`，`.lazy`,在对自定义的组件使用修饰符的时候，我们通常情况下内置的修饰符是不够的需要我们自定义修饰符，假如我们需要自定义一个修饰符(capitalize)将v-model绑定的字符串第一个转为大写写法如下：
```vue
// 在某一个父组件当中
<MyComponent v-model.capitalize="myText" />
```
在子组件当中我们可以通过prop中的`modelModifiers`访问的到。

```vue
<script setup>
const props = defineProps({
  modelValue: String,
  modelModifiers: { default: () => ({}) }
})

const emit = defineEmits(['update:modelValue'])

function emitValue(e) {
  let value = e.target.value
  if (props.modelModifiers.capitalize) {
    value = value.charAt(0).toUpperCase() + value.slice(1)
  }
  emit('update:modelValue', value)
}
</script>

<template>
  <input type="text" :value="modelValue" @input="emitValue" />
</template>
```
有的时候会收到带有参数和带有修饰符的v-model绑定，得到的自定义修饰符的prop名称会是`arg + "Modifiers"`。
```vue
<MyComponent v-model:title.capitalize="myText">
```

相应的声明应该是：
```typescript
const props = defineProps(['title', 'titleModifiers'])
defineEmits(['update:title'])

console.log(props.titleModifiers) // { capitalize: true }
```
## 四、侦听器
假如说需要在数据状态发生变化的时候执行一些副作用函数，如更改DOM或者是异步操作更改另一处的状态，我们可以使用组合式API中的**watch函数**来监听一个响应式的状态并触发回调函数。
### 4.1、示例
```vue
<script setup>
import { ref, watch } from 'vue'

const question = ref('')
const answer = ref('Questions usually contain a question mark. ;-)')

// 可以直接侦听一个 ref
watch(question, async (newQuestion, oldQuestion) => {
  if (newQuestion.indexOf('?') > -1) {
    answer.value = 'Thinking...'
    try {
      const res = await fetch('https://yesno.wtf/api')
      answer.value = (await res.json()).answer
    } catch (error) {
      answer.value = 'Error! Could not reach the API. ' + error
    }
  }
})
</script>

<template>
  <p>
    Ask a yes/no question:
    <input v-model="question" />
  </p>
  <p>{{ answer }}</p>
</template>
```
watch函数的第一个参数值为监听的数据源，且数据源的格式不限(包括计算属性)。可监听的数据源的种类如下：
- ref✅
- reactive✅
- computed✅
- getter函数✅
- 多个数据源组成数组✅

```typescript
const x = ref(0)
const y = ref(0)

// 单个 ref
watch(x, (newX) => {
  console.log(`x is ${newX}`)
})

// getter 函数
watch(
  () => x.value + y.value,
  (sum) => {
    console.log(`sum of x + y is: ${sum}`)
  }
)

// 多个来源组成的数组
watch([x, () => y.value], ([newX, newY]) => {
  console.log(`x is ${newX} and y is ${newY}`)
})
```
需要注意的是不能直接监听一个响应式对象的属性值，需要给watch传入一个该属性的getter函数。
### 4.2、深层监听器
直接给watch传入响应式对象，会隐地创建一个深层的监听器，这个响应式i对象的所有嵌套变更的时候都会触发回调，且监听的新值和旧值是一样的。
```typescript
const obj = reactive({ count: 0 })

watch(obj, (newValue, oldValue) => {
  // 在嵌套的属性变更时触发
  // 注意：`newValue` 此处和 `oldValue` 是相等的
  // 因为它们是同一个对象！
})

obj.count++
```
而传入的是响应式对象的getter函数，只有返回不同对象才会触发回调函数。也可以给这个代码假如`{deep:true}`选项，强制的转为深层的侦听器。
```typescript
watch(
  () => state.someObject,
  () => {
    // 仅当 state.someObject 被替换时触发
  },
  {deep:true}
)
```
### 4.3、watchEffect()
watch函数的监听是懒式的监听，当数据源发生变化的时候才触发回调，但是有的时候我们需要在创建侦听器的时候就立即执行回调。比如说我们想请求一个数据，在数据源发生变化的时候再重新请求数据：
```typescript
watchEffect(async () => {
  const response = await fetch(url.value)
  data.value = await response.json()
})
```
这个例子中，回调会立即执行。在执行期间，它会自动追踪 `url.value` 作为依赖（和计算属性的行为类似）。每当 `url.value` 变化时，回调会再次执行。
## 五、模板引用
模板引用主要包括两方面，一个是假如需要直接操作DOM，我们引用DOM，还有一种引用包括组件的引用，这种引用会得到组件的示例，这些都可以通过`ref`这个属性来完成。需要注意的是下边两个例子的ref和模板的ref必须同名。
```vue
<script setup>
import { ref, onMounted } from 'vue'

// 声明一个 ref 来存放该元素的引用
// 必须和模板里的 ref 同名
const input = ref(null)

onMounted(() => {
  input.value.focus()
})
</script>

<template>
  <input ref="input" />
</template>
```
上边的例子使用了响应性语法糖，当不使用响应式语法糖的情况不在介绍，可以参考文档。
> 为模板引用标注类型TS
```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue'
// 显式的指定一个泛型参数，和初始值
const el = ref<HTMLInputElement | null>(null)

onMounted(() => {
// 为了类型安全必须使用可选链或者类型守卫。
  el.value?.focus()
})
</script>

<template>
  <input ref="el" />
</template>
```
v-for中的模板引用对应的ref是一个数组。
> 组件上的引用

这种情况下会得到引用组件的实例，前提是没有使用`<script setup>`响应式语法糖，使用了的话需要使用`defineExpose()`宏暴漏，且默认的情况相应语法糖的组件是私有的。

> 为模板引用标注类型

在子组件中
```vue
<!-- MyModal.vue -->
<script setup lang="ts">
import { ref } from 'vue'

const isContentShown = ref(false)
const open = () => (isContentShown.value = true)

defineExpose({
  open
})
</script>
```
父组件中
```vue
<!-- App.vue -->
<script setup lang="ts">
import MyModal from './MyModal.vue'

const modal = ref<InstanceType<typeof MyModal> | null>(null)

const openModal = () => {
  modal.value?.open()
}
</script>
```
## 六、props传值与$emit传值
prop传值一般用于父组件给子组件进行值传递，在`script setup`语法中可以使用`defineProps`编译宏命令，这个命令不需要显式的导入
```vue
<!-- BlogPost.vue -->
<script setup>
defineProps(['title'])
</script>

<template>
  <h4>{{ title }}</h4>
</template>

const props = defineProps(['title'])
console.log(props.title)
```
为props传递值类型：
```vue
<script setup lang="ts">
interface Props {
  foo: string
  bar?: number
}

const props = defineProps<Props>()
</script>
```
如何给props结构默认值呢？(还在实验中的功能需要手动开启)
```vue
<script setup lang="ts">
interface Props {
  foo: string
  bar?: number
}

// 对 defineProps() 的响应性解构
// 默认值会被编译为等价的运行时选项
const { foo, bar = 100 } = defineProps<Props>()
</script>
```
下边介绍一下vite显式的启用语法糖的语法，版本要求：`vue@^3.2.25`、`@vitejs/plugin-vue@>=2.0.0`
```typescript
// vite.config.js
export default {
  plugins: [
    vue({
      reactivityTransform: true
    })
  ]
}
```
> defineEmits声明自定义事件

自定义事件的语法为
```vue
<script setup>
// 可通过$emits('时间名',参数)在templete中特别的调用
defineEmits(['inFocus','submit'])
// 可以在script setip中通过函数调用 如下
const emit = defineEmits(['inFocus', 'submit'])

function buttonClick() {
  emit('submit')
}
</script>
```
那么如何为emits标注类型呢？
```vue
<script setup lang="ts">
// 运行时
const emit = defineEmits(['change', 'update'])

// 基于类型
const emit = defineEmits<{
  (e: 'change', id: number): void
  (e: 'update', value: string): void
}>()
</script>
```
那么如何像props那样校验自定义时间呢？
```vue
<script setup>
const emit = defineEmits({
  // 没有校验
  click: null,

  // 校验 submit 事件
  submit: ({ email, password }) => {
    if (email && password) {
      return true
    } else {
      console.warn('Invalid submit event payload!')
      return false
    }
  }
})

function submitForm(email, password) {
  emit('submit', { email, password })
}
</script>
```
## 七、透传Attributes
透传Attributes指的是传递给一个组件却没有被该组件声明为 props 或 emits 的 attribute 或者 `v-on` 事件监听器。假如给子组件传递的属性为`style`和`class`，且子组件也有了这些属性他就会和父组件中的style和class合并，同时监听器也会继承，即使是深层组件也会透传。
那么都什么会透传呢？

1. class和style✅
2. v-on事件✅ 
> 禁用透传的方法

如果你**不想要**一个组件自动地继承 attribute，你可以在组件选项中设置 `inheritAttrs: false`。如果你使用了 `<script setup>`，你需要一个额外的 `<script>` 块来书写这个选项声明。可以在组件中直接使用`$attrs`访问除了组件所声明的 `props` 和 `emits` 之外的所有其他 attribute，例如 `class`，`style`， 监听器等等。

```vue
<script>
// 使用普通的 <script> 来声明选项
export default {
  inheritAttrs: false
}
</script>

<script setup>
// ...setup 部分逻辑
</script>
```
> 多节点的Attrtibutes继承

假如子节点下边有许多根节点模板，那么透传的属性需要哪个子模板继承呢？如下所示
```html
<header>...</header>
<main>...</main>
<footer>...</footer>
```
可以显式用v-bind指定需要绑定的元素
```html
<header>...</header>
<main v-bind="$attrs">...</main>
<footer>...</footer>
```
> js访问透传的属性值
```vue
<script setup>
import { useAttrs } from 'vue'

const attrs = useAttrs()
</script>
```
## 八、依赖注入
假如从父组件像子组件中传递值我们可以使用`props`，但是假如层级比较多呢，有多层嵌套的组件需要从父组件像深层次的子组件传入数值，如果一层一层使用`props`就会变得不现实，我们可以使用依赖注入的方式。
### 8.1 、provide
![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/622fbb7227fa4141aa4166a6da5244e1~tplv-k3u1fbpfcp-watermark.image?)
`provide` 和 `inject` 可以帮助我们解决这一问题。一个父组件相对于其所有的后代组件，会作为**依赖提供者**。任何后代的组件树，无论层级有多深，都可以**注入**由父组件提供给整条链路的依赖。

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a014571816f54bf081089bbfd79a51f3~tplv-k3u1fbpfcp-watermark.image?)
provide()支持传入两个参数，一个参数为字符串String或者一个Symbol称为注入名，后面的参数为对应的注入值，后代组件会用注入名来查找期望注入的值。一个组件可以多次调用 provide()，使用不同的注入名，注入不同的依赖值。
```vue
<script setup>
import { provide } from 'vue'

provide(/* 注入名 */ 'message', /* 值 */ 'hello!')
</script>
```
> 应用层provide

就是在main.js\/ts中进行provide
```typescript
import { createApp } from 'vue'

const app = createApp({})

app.provide(/* 注入名 */ 'message', /* 值 */ 'hello!')
```
### 8.2 、inject
语法很简单
```vue
<script setup>
import { inject } from 'vue'

const message = inject('message')
</script>
```
> 为jnject提供默认数值

```typescript
// 如果没有祖先组件提供 "message"
// `value` 会是 "这是默认值"
const value = inject('message', '这是默认值')
```
在一些场景中，默认值可能需要通过调用一个函数或初始化一个类来取得。为了避免在用不到默认值的情况下进行不必要的计算或产生副作用，我们可以使用工厂函数来创建默认值：

```typescript
const value = inject('key', () => new ExpensiveClass())
```
> 使用symbol作为注入名

在大型应用中会有非常多的依赖项，或者在编写给其他人使用的组件的时候最好使用Symbol作为注入值，避免一些可能的冲突。
1. 在单文件组件中导出这些注入的Symbol

```typescript
// keys.js
export const myInjectionKey = Symbol()
```
供给方进行使用
```typescript
// 在供给方组件中
import { provide } from 'vue'
import { myInjectionKey } from './keys.js'

provide(myInjectionKey, { /*
  要提供的数据
*/ });
```
注入方使用Symbol
```typescript
// 注入方组件
import { inject } from 'vue'
import { myInjectionKey } from './keys.js'

const injected = inject(myInjectionKey)
```
## 九、插槽
插槽的适用场景有的时候需要为子组件传入一些模板片段，那么子组件如何接受这些模板片段呢？也就是说组组件接收的片段由父组件决定，这就用到了插槽，相当于在子组件放置一个slot，父组件传入template模板，渲染到子组件中。插槽还可以指定默认内容，也就是当父组件没有提供任何内容的时候，有一个默认渲染的内容。
```vue
<button type="submit">
  <slot>
    Submit <!-- 默认内容 -->
  </slot>
</button>
```
### 9.1、具名插槽
有时在一个组件中包含多个插槽出口是很有用的。举例来说，在一个 `<BaseLayout>` 组件中，有如下模板：
```vue
<div class="container">
  <header>
    <!-- 标题内容放这里 -->
    <slot name="header"></slot>
  </header>
  <main>
    <!-- 主要内容放这里 -->
    <slot name="main"></slot> 
  </main>
  <footer>
    <!-- 底部内容放这里 -->
    <slot name="footer"></slot>  
  </footer>
</div>
```

这种情况有三个不容的位置需要父组件渲染模板内容，所以可以给不同的slot插槽取名字。在父组件中就需要使用带`v-slot`简写为`#`的指令指定名字，插槽的名字还可以动态指定语法为`#[dynamicSlotName]`还有`v-slot:[dynamicSlotName]`
```vue
<BaseLayout>
  <template v-slot:header>
    <!-- header 插槽的内容放这里 -->
  </template>
</BaseLayout>
```
```vue
<BaseLayout>
  <template #header>
    <h1>Here might be a page title</h1>
  </template>

  <template #default>
    <p>A paragraph for the main content.</p>
    <p>And another one.</p>
  </template>

  <template #footer>
    <p>Here's some contact info</p>
  </template>
</BaseLayout>
```
### 9.2、作用域插槽
上面的例子中插槽内容无法访问到子组件的状态，那么我们想要访问子组件的状态该如何做呢？可以像对组件传递 props 那样，向一个插槽的出口上传递 attributes：
```vue
<!-- <MyComponent> 的模板 -->
<div>
  <slot :text="greetingMessage" :count="1"></slot>
</div
```
那么父组件如何接收这些传过来的数据呢？默认插槽如下
```vue
<MyComponent v-slot="slotProps">
  {{ slotProps.text }} {{ slotProps.count }}
</MyComponent>

<MyComponent v-slot="{ text, count }">
  {{ text }} {{ count }}
</MyComponent>
```
### 9.3、具名作用域插槽
```vue
<MyComponent>
  <template #header="headerProps">
    {{ headerProps }}
  </template>

  <template #default="defaultProps">
    {{ defaultProps }}
  </template>

  <template #footer="footerProps">
    {{ footerProps }}
  </template>
</MyComponent>
```
```vue
<slot name="header" message="hello"></slot>
```
name不会当作prop传递给插槽。
