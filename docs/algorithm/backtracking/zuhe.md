# 组合

## 39.组合总和

### 题目描述

给你一个 无重复元素 的整数数组 candidates 和一个目标整数 target ，找出 candidates 中可以使数字和为目标数 target 的 所有 不同组合 ，并以列表形式返回。你可以按 任意顺序 返回这些组合。

candidates 中的 同一个 数字可以 **无限制重复被选取** 。如果至少一个数字的被选数量不同，则两种组合是不同的。 

对于给定的输入，保证和为 target 的不同组合数少于 150 个。

::: tip

 输入：candidates = [2,3,6,7], target = 7

输出：[[2,2,3],[7]]

解释：2 和 3 可以形成一组候选，2 + 2 + 3 = 7 。注意 2 可以使用多次。7 也是一个候选， 7 = 7 。仅有这两种组合。

:::

### 思路

组合问题关于使用startIndex控制for循环的起始位置的技巧

1. 对于一个集合求组合需要startIndex
2. 对多个集合取组合，每个集合之间不互相影响就不需要startIndex

### 代码实现

```ts
function combinationSum(candidates: number[], target: number): number[][] {
    const res: number[][] = []
    const path: number[] = []
    function backTracking(startIndex: number, target: number) {
        // 递归终止条件
        if (target > 0) {
            return
        }
        // 收集结果
        if (target === 0) {
            res.push([...path])
            return
        }
        for (let i = startIndex; i < candidates.length; i++) {
            target -= candidates[i]
            path.push(candidates[i])
         	// 开始索引从当前位置开始
            backTracking(i, target) // 关键点:不用i+1了，表示可以重复读取当前的数
            path.pop()
            target += candidates[i]
        }
    }
    backTracking(0, target)
    return res
};
```



## 17.电话号码字母组合

### 题目描述

给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。答案可以按 任意顺序 返回。

给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。

::: tip

输入：digits = "23"

输出：["ad","ae","af","bd","be","bf","cd","ce","cf"]

:::

### 思路

因为是不同集合之间的操作，所以不需要startIndex索引来记录位置，每个集合都可以从新选取，可以使用map集合或者数组进行映射

`const arr = ['','','abc','def','ghi','jkl','mno','pqrs','tuv','wxyz']`,map集合的定义方式在下方的代码当中

### 代码实现

```ts
function letterCombinations(digits: string): string[] {
    if(!digits.length) return []
    const res: string[] = []
    const path: string[] = []
    const map: { [k: number]: string } = {
        0:'',
        1:'',
        2:'abc',
        3:'def',
        4:'ghi',
        5:'jkl',
        6:'mno',
        7:'pqrs',
        8:'tuv',
        9:'wxyz',
    }
    function backTracking(depth:number) {
        if (path.length === digits.length) {
            res.push(path.join(''))
            return
        }
        for(const ele of map[digits[depth]]){
            path.push(ele)
            backTracking(depth+1)
            path.pop()
        }
    }
    backTracking(0)
    return res
};
```

## 77.组合

### 题目描述

给定两个整数 `n` 和 `k`，返回范围 `[1, n]` 中所有可能的 `k` 个数的组合。

你可以按 **任何顺序** 返回答案。

::: tip

输入：n = 4, k = 2

输出：
[[2,4],[3,4],[2,3],[1,2],[1,3],[1,4]]

:::

### 思路

在`path.length === k`的时候收集结果，其他的具体看代码

### 代码实现

```ts
function combine(n: number, k: number): number[][] {
    const res: number[][] = []
    const path: number[] = []
    function backTracking(startIndex: number) {
        if (path.length === k) {
            res.push([...path])
            return
        }
        // 同一个集合求组合需要startIndex
        for (let i = startIndex; i <= n; i++) {
            path.push(i)
            backTracking(i+1)
            path.pop()
        }
    }
    backTracking(1)
    return res
};
```



## 40.组合总和Ⅱ

### 题目描述

给定一个候选人编号的集合 candidates 和一个目标数 target ，找出 candidates 中所有可以使数字和为 target 的组合。

**candidates 中的每个数字在每个组合中只能使用 一次** 。

注意：解集不能包含重复的组合。 

::: tip

输入: candidates = [10,1,2,7,6,1,5], target = 8

输出:[

[1,1,6],

[1,2,5],

[1,7],

[2,6]

]

:::

### 思路

和组合总和的区别是需要去重，去重的方法：1、使用used数组去重  2、直接去重

需要注意的是在遇到需要去重的时候，需要先将原数组进行排序，让相近的元素挨在一起。

其他的代码与组合总和的第一种情况一样。

### 代码实现

```ts
function combinationSum2(candidates: number[], target: number): number[][] {
    const res: number[][] = []
    const path:number[] = []
    candidates.sort((a,b) => a-b)
    let sum:number = 0
    function backTrickng(startIndex:number){
        // if(sum > target) {
        //     return
        // }
        if(sum === target) {
            res.push([...path])
            return
        }
        for(let i = startIndex;i<candidates.length;i++) {
            // 直接去重加上了减枝的操作。
            // 使用used数组的判断条件为 (i>0 && candidates[i] === candidates[i-1] && used[i-1] = false)
            if(i > startIndex && candidates[i] === candidates[i-1] || sum + candidates[i] > target) {
                continue
            }
            sum += candidates[i]
            path.push(candidates[i])
            backTrickng(i+1)
            sum -= candidates[i]
            path.pop()
        }
    }
    backTrickng(0)
    return res
};
```

## 216.组合总和Ⅲ

### 题目描述

找出所有相加之和为 n 的 k 个数的组合，且满足下列条件：

只使用数字1到9
每个数字 最多使用一次 
返回 所有可能的有效组合的列表 。该列表**不能包含相同的组合两次**，组合可以以任何顺序返回

::: tip

输入: k = 3, n = 7

输出: [[1,2,4]]

解释:

1 + 2 + 4 = 7

没有其他符合的组合了。

:::

### 思路

收集结果的判断条件有一点不一样，需要先满足K个数的条件，然后判断sum的数值是否和结果相等。

### 代码实现

```ts
function combinationSum3(k: number, n: number): number[][] {
    let res: number[][] = []
    let path: number[] = []
    let sum: number = 0
    function backTracking(startIndex: number) {
        if(sum > n) return
        if (path.length === k) {
            if (sum === n) {
                res.push([...path])
                return
            }
        }
        for (let i = startIndex; i <= 9; i++) {
            sum+=i
            path.push(i)
            backTracking(i+1)
            sum-=i
            path.pop()
        }
    }
    backTracking(1)
    return res
};
```