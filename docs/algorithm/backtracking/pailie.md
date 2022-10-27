# 排列
## 46.全排列

### 题目描述

给定一个不含重复数字的数组 `nums` ，返回其 *所有可能的全排列* 。你可以 **按任意顺序** 返回答案。

::: tip

输入：nums = [1,2,3]

输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]

:::

### 思路

相对于组合问题来说`[1,2]，[2,1]`是两个不同的排列，所以不需要startIndex来限制，但是需要引入一个额外的used数组记录已经选择了那个位置的数。

### 代码实现

```ts
function permute(nums: number[]): number[][] {
    const res: number[][] = [], length = nums.length
    const temp: number[] = [], used: boolean[] = []
    function recur(used: boolean[]) {
        if (temp.length === length) {
            res.push([...temp])
            return
        }
        for (let i = 0; i < length; i++) {
            if (used[i]) continue
            temp.push(nums[i])
            used[i] = true
            recur( used)
            used[i] = false
            temp.pop()
        }
    }
    recur(used)
    return res
};
```



## 47.全排列Ⅱ

### 题目描述

给定一个可包含重复数字的序列 `nums` ，***按任意顺序*** 返回所有不重复的全排列。

::: tip 示例

输入：nums = [1,2,3]

输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]

:::

### 思路

相比于全排列多了一个去重的操作，去重操作的判断条件为`i > 0 && nums[i] === nums[i-1] && used[i-1] === false`,除此之外其他的代码和全排列没有什么大的不同。

**需要去重说明得先将数组排序，让相同的数组元素紧挨在一起**

### 代码实现

```ts
function permuteUnique(nums: number[]): number[][] {
    const result:number[][] = [],used:boolean[] = new Array(nums.length).fill(false)
    const temp:number[] = []
    // 排序让一样的数字挨在一起
    nums.sort((a,b) => a-b)
    function recur(used:boolean[]){
        if(temp.length === nums.length) {
            result.push([...temp])
            return
        }
        for(let i = 0;i<nums.length;i++) {
            // 去重
            if(i > 0 && nums[i] === nums[i-1] && used[i-1] === false) {
                continue
            }
            if(!used[i]) {
                temp.push(nums[i])
                used[i] = true
                recur(used)
                temp.pop()
                used[i] = false
            }
        }
    }
    recur(used)
    return result
};
```