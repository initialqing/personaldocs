# 子集
## 78.子集

### 题目描述

给你一个整数数组 `nums` ，数组中的元素 **互不相同** 。返回该数组所有可能的子集（幂集）。

解集 **不能** 包含重复的子集。你可以按 **任意顺序** 返回解集。

::: tip

输入：nums = [1,2,3]

输出：[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]

:::

### 思路

同一个子集进行操作，需要startIndex，在每一个递归层直接收集结果，因为是取的子集可以直接收集结果。

不同递归层的startIndex + 1，当startIndex > nums.length 的时候就不会进入递归了

### 代码实现

```ts
function subsets(nums: number[]): number[][] {
    const res:number[][] = []
    const path:number[] = []
    function backTricking(startIndex:number){
        // 收集结果
        res.push([...path])
		// 递归
        for(let i = startIndex;i<nums.length;i++) {
            path.push(nums[i])
            backTricking(i+1)
            path.pop()
        }
    }
    backTricking(0)
    return res
};
```

## 90.子集Ⅱ

### 题目描述

给你一个整数数组 nums ，其中可能包含重复元素，请你返回该数组所有可能的子集（幂集）。

解集 不能 包含重复的子集。返回的解集中，子集可以按 任意顺序 排列。

::: tip 示例

输入：nums = [1,2,2]

输出：[[],[1],[1,2],[1,2,2],[2],[2,2]]

:::

### 思路

与子集不同的情况是需要去重，去重的方法可以参考组合问题。

与排列问题去重方式不同的原因是这个题目可以不使用used的方式去重，也可以使用set集合去重，也可以使用 `i > startIndex && nums[i] === nums[i-1]`。三种去重的方式

### 代码实现

```ts
function subsetsWithDup(nums: number[]): number[][] {
    const result: number[][] = [];
    const path: number[] = [];
    // 去重之前先排序
    nums.sort((a, b) => a - b);
    function backTracking(startIndex: number) {
        // 收集结果
        result.push([...path])
        // 此处不返回也可以因为，每次递归都会使startIndex + 1，当这个数大到nums.length的时候就不会进入递归了。
        if (startIndex === nums.length) {
            return
        }
        // 定义每一个树层的set集合
        const set: Set<number> = new Set()
        for (let i = startIndex; i < nums.length; i++) {
            // 去重
            if (set.has(nums[i])) {
                continue
            }
            set.add(nums[i])
            path.push(nums[i])
            backTracking(i + 1)
            // 回溯
            path.pop()
        }
    }
    backTracking(0)
    return result
};
```