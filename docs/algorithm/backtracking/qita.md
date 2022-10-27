# 其他
## 491.递增子序列（和子集问题很像）

### 题目描述

给你一个整数数组 nums ，找出并返回所有该数组中不同的递增子序列，递增子序列中 至少有两个元素 。你可以按 任意顺序 返回答案。

数组中可能含有重复元素，如出现两个整数相等，也可以视作递增序列的一种特殊情况。

::: tip

输入：nums = [4,6,7,7]

输出：[[4,6],[4,6,7],[4,6,7,7],[4,7],[4,7,7],[6,7],[6,7,7],[7,7]]

:::

### 思路

与子集的去重方式相同，同一父节点下本层不可以重复使用。可以使用set控制本层不可以重复，或者使用映射数组的方式控制。

跳过当前值的条件`(nums[i] < temp[temp.length - 1] && temp.length >0) || used[nums[i] + 100] === true`

### 代码实现

```ts
function findSubsequences(nums: number[]): number[][] {
    const temp: number[] = [], res: Array<Array<number>> = []
    const backTracking = (nums: number[], startIndex: number) => {
        // 不是收集树叶上的结果，收集全部结果，所以不需要有返回值。
        if (temp.length >= 2) {
            res.push([...temp])
        }
        // 只是控制本层的重复，区别于排序的数组
        const used: boolean[] = new Array(201).fill(false)
        for (let i = startIndex; i < nums.length; i++) {
            if ((nums[i] < temp[temp.length - 1] && temp.length >0) || used[nums[i] + 100] === true) {
                continue
            }
            used[nums[i] + 100] = true
            temp.push(nums[i])
            backTracking(nums, i + 1)
            temp.pop()
        }
    }
    backTracking(nums, 0)
    return res
};
```

## 332.重新安排旅程

### 题目描述

### 思路

### 代码实现

```ts
function findItinerary(tickets: string[][]): string[] {
    const res: string[] = ['JFK']
    const map: Map<string, string[]> = new Map();
    // 将from的地方进行map映射，值为一个数组表示from可以到的地方的集合
    for (const ticket of tickets) {
        const [from, to] = ticket
        if (!map[from]) {
            map[from] = []
        }
        map[from].push(to)
    }
    // 对map[from]进行排队，可以收集按照字典排序的结果。
    for (const city in map) {
        map[city].sort()
    }
    function backTracking() {
        if (res.length === tickets.length + 1) {
            return true
        }
        if (!map[res[res.length - 1]] || !map[res[res.length - 1]].length) {
            return false
        }
        for (let i = 0; i < map[res[res.length - 1]].length; i++) {
            const city: string = map[res[res.length - 1]][i]
            // 删除已经走过的城市，避免进入到死循环当中。
            map[res[res.length - 1]].splice(i, 1)
            res.push(city)
            if (backTracking()) {
                return true
            }
            res.pop()
            // 回溯添加已经删除的城市。
            map[res[res.length - 1]].splice(i, 0, city)
        }
    }
    backTracking()
    return res
};
```

