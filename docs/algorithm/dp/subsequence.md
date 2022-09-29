[[toc]]

![子序列问题](https://example.qingcc.top/%E5%AD%90%E5%BA%8F%E5%88%97%E9%97%AE%E9%A2%98.png)

## 491.递增子序列

#### 题目描述:question:

给你一个整数数组 nums ，找出并返回所有该数组中不同的递增子序列，递增子序列中 至少有两个元素 。你可以按 任意顺序 返回答案。

数组中可能含有重复元素，如出现两个整数相等，也可以视作递增序列的一种特殊情况。

::: tip 示例
   输入：nums = [4,6,7,7]

   输出：[[4,6],[4,6,7],[4,6,7,7],[4,7],[4,7,7],[6,7],[6,7,7],[7,7]]
:::

#### 思路:bulb:

题目要求找出所有的递增子序列，且答案的递增子序列**至少有两个元素**，可以想到的方法是回溯，因为需要都穷举出来，同时可以手写一下回溯树，基本回溯都可以抽象出一颗树形结构。题目中的元素在树的不同层（递归的不同深度）明显不可以重复选择因此需要使用在每一层**使用`strartIndex`**。在排序数组中使用`nums[i] === nums[i-1]`的方式也就不可取，需要转换思路使用set去重或者使用**数组哈希去重。**

#### 代码实现:100:

``` ts {8}
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
# 子序列(不连续)
## 300.最长递增子序列

#### 题目描述:question:

给你一个整数数组 nums ，找到其中最长严格递增子序列的长度。

子序列 是由数组派生而来的序列，删除（或不删除）数组中的元素而不改变其余元素的顺序。例如，[3,6,2,7] 是数组 [0,3,1,6,2,2,7] 的子序列。

找到最长的连续子序列并返回其值

::: tip 示例
输入：nums = [10,9,2,5,3,7,101,18]

输出：4

解释：最长递增子序列是 [2,3,7,101]，因此长度为 4 。
:::

#### 思路:bulb:

大思路为动态规划:

1. dp[i]的含义与定义

   **dp[i]表示i之前包括以nums[i]结尾最长上升子序列的长度**

2. dp数组的推导

   **dp[i]的数值来源于j从0~i的各个位置最长上升子序列 + 1和dp[i]的最大值**

   所以dp的递推公式为:

   **if(nums[i] > nums[j])  dp[i] = Math.max(dp[i],dp[j]+1)**

3. dp数组的初始化

   因为每个位置最长上升子序列的长度至少为1,所以可以初始化为1.

4. dp数组的遍历顺序

   因为i位置的最长上升子序列由前面0-i个位置推来,所以一定是从前往后遍历

#### 代码实现:100:

```ts
function lengthOfLIS(nums: number[]): number {
    const dp: number[] = new Array(nums.length).fill(1)
    let res = 1
    for (let i = 1; i < nums.length; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[i] > nums[j]) {
                dp[i] = Math.max(dp[i], dp[j] + 1)
            }
            res = Math.max(res, dp[i])
        }
    }
    return res
};
```

## 1143.最长公共子序列

#### 题目描述:question:

找出两个字符串中最长的公共部分，可以是不连续的，题目保证输入的字符串的长度大于1，返回最长公共部分的长度。

::: tip 示例

输入：text1 = "abcde", text2 = "ace" 
输出：3  
解释：最长公共子序列是 "ace" ，它的长度为 3 。

:::

#### 思路:bulb:

动态规划：

1. **dp[i][j\]的含义：以i-1结尾的字符串和j-1结尾的字符串最长公共序列的长度**

2. dp\[i\]\[j\]的递推公式：与前面递推公式类似，但是当遇到两个字符不相等的时候`dp[i][j]`来自于两个不同的方向。此题目的思路与[最长重复子数组](#718.最长重复子数组)的思路相同，

   ```ts
   if(text1Arr[i-1] === text2Arr[j-1]) {
       dp[i][j] = dp[i-1][j-1] + 1
   }else {
       dp[i][j] = Math.max(dp[i-1][j],dp[i][j-1])
   }
   ```

dp\[i\][j\]的初始化：`dp[0][j]、dp[i][0]`表示空字符串和i与j之间的关系，空字符串与i、j必定没有公共的区间，dp\[i]\[j\]就初始化为0

遍历顺序：根据dp的依赖关系可以看出，从上到下从前往后。

#### 代码实现:100:

```ts
function longestCommonSubsequence(text1: string, text2: string): number {
    const dp:number[][] = new Array(text1.length+1).fill(0).map(_ => new Array(text2.length+1).fill(0));
    dp[0][0] = 0
    let text1Arr = text1.split('')
    let text2Arr = text2.split('')
    for(let i = 1;i<=text1.length;i++) {
        for(let j = 1;j<=text2.length;j++) {
            if(text1Arr[i-1] === text2Arr[j-1]) {
                dp[i][j] = dp[i-1][j-1] + 1
            }else {
                dp[i][j] = Math.max(dp[i-1][j],dp[i][j-1])
            }
        }
    }
    return dp[text1.length][text2.length]
};
```


## 1035.不相交的线

#### 题目描述:question:

在两条独立的水平线上按给定的顺序写下 nums1 和 nums2 中的整数。

现在，可以绘制一些连接两个数字 nums1[i] 和 nums2[j] 的直线，这些直线需要同时满足满足：

-  nums1[i] == nums2[j]

- 且绘制的直线不与任何其他连线（非水平线）相交。

请注意，连线即使在端点也不能相交：每个数字只能属于一条连线。

以这种方法绘制线条，并返回可以绘制的最大连线数。

::: tip 示例

​	输入：nums1 = [1,4,2], nums2 = [1,2,4]
​	输出：2
​	解释：可以画出两条不交叉的线，如上图所示。 

但无法画出第三条不相交的直线，因为从 nums1[1]=4 到 nums2[2]=4 的直线将与从 nums1[2]=2 到 nums2[1]=2 的直线相交。

​	输入：nums1 = [2,5,1,2,5], nums2 = [10,5,2,1,5,2]
​	输出：3

:::

![image-20220922155038297](https://example.qingcc.top/image-20220922155038297.png)



#### 思路:bulb:

题目要求找两个数组不相交的线的最大数量，也就是两个数组的公共部分(不不连续)的数量，因为根据连线的要求来看，两个数组的公共部分的相对位置是不变的，这个题目也就是求[1143.最长公共子序列](#1143.最长公共子序列)，两个公共序列的要求是不连续的，代码也基本一样，这个题目不用将字符串转为数组跟为给的就是一个数组。

#### 代码实现:100:

```ts
function maxUncrossedLines(nums1: number[], nums2: number[]): number {
    const dp:number[][] = new Array(nums1.length+1).fill(0).map(_ => new Array(nums2.length+1).fill(0));
    dp[0][0] = 0
    for(let i = 1;i<=nums1.length;i++) {
        for(let j = 1;j<=nums2.length;j++) {
            if(nums1[i-1] === nums2[j-1]) {
                dp[i][j] = dp[i-1][j-1] + 1
            }else {
                dp[i][j] = Math.max(dp[i-1][j],dp[i][j-1])
            }
        }
    }
    return dp[nums1.length][nums2.length]
};
```
# 子序列(连续)
## 674.最长连续递增序列

#### 题目描述:question:

给定一个未经排序的整数数组，找到最长且 连续递增的子序列，并返回该序列的长度。

连续递增的子序列 可以由两个下标 l 和 r（l < r）确定，如果对于每个 l <= i < r，都有 nums[i] < nums[i + 1] ，那么子序列 [nums[l], nums[l + 1], ..., nums[r - 1], nums[r]] 就是连续递增子序列。

**需要上升的子序列是连续的**

::: tip 示例
输入：nums = [1,3,5,4,7]

输出：3

解释：最长连续递增序列是 [1,3,5], 长度为3。

尽管 [1,3,5,7] 也是升序的子序列, 但它不是连续的，因为 5 和 7 在原数组里被 4 隔开。 
:::

#### 思路:bulb:

##### 双指针（滑动窗口）

题目要求需要连续上升的子序列所以可以考虑双指针维护一个动态的窗口，当后者比前者大的时候就更新结果。

##### 动态规划

1. dp[i]以i结尾的最长上升子序列的长度

2. 递推公式

   nums[i-1] < nums[i] 的时候dp[i] = dp[i-1] + 1 否则就保持dp[i]不变，简单总结：比前一个大我就更新，小我就重置起点，看看小的后面是不是比这个当前的值大，然后再更新

3.  初始化

   dp[i]的最小值为1所以初始化为1

4. 遍历顺序

   从前往后，后者的dp[i]依赖于dp[i-1]

#### 代码实现

:::: code-group
::: code-group-item 双指针

```ts
function findLengthOfLCIS(nums: number[]): number {
    let left = 0,right = 1,res = 0
    for(let i = 1;i<nums.length;i++) {
        if(nums[i]> nums[i-1]) {
            right++
        }else {
            res = Math.max(res,right - left)
            left = right
            right = left + 1
        }
    }
    res = Math.max(res,right - left)
    return res
};
```
:::

::: code-group-item 动态规划
```ts
function findLengthOfLCISDp(nums: number[]): number {
    if(nums.length === 1) return 1
    const dp: number[] = new Array(nums.length).fill(1)
    dp[0] = 1
    let res = 0
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] > nums[i-1]) {
            dp[i] = dp[i-1] + 1
        }
        res = Math.max(dp[i],res)
    }
    return res
};
```
:::
::::

## 673.最长递增子序列的个数

#### 题目描述:question:

给定一个未排序的整数数组 `nums` ， *返回最长递增子序列的个数* 。

**注意** 这个数列必须是 **严格** 递增的。

::: tip 示例

​	输入: [1,3,5,4,7]

​	输出: 2

​	解释: 有两个最长递增子序列，分别是 [1, 3, 4, 7] 和[1, 3, 5, 7]。

:::

#### 思路:bulb:

这个题需要与[300.最长递增子序列](#300.最长递增子序列)结合来看,这个题目返回的是最长上升子序列的长度，递推公式为**if(nums[i] > nums[j])  dp[i] = Math.max(dp[i],dp[j]+1)**，这个题同时采用动态规划

1. dp数组的含义

   dp[i] : 以i结尾的最长递增子序列的长度

   count[i]：以i结尾的最长递增子序列的个数

2. dp数组的递推公式

   ```ts
   if (nums[i] > nums[j]) {
       // 说明找到了一个更长的序列，
       if (dp[i] < dp[j] + 1) {
           dp[i] = dp[j] + 1
           // 更新最长子序列的个数
           // 以j结尾的最长递增子序列的长度就是 以i结尾最长递增子序列的长度
           count[i] = count[j]
           // 说明找到了两个相同长度的递增子序列，更新最长子序列的个数
           // 此时i结尾的最长递增子序列的个数就是当前最长子序列的个数加上以j结尾的最长子序列的个数
       }else if(dp[i] === dp[j] + 1) {
           count[i] += count[j]
       }
   }
   ```

3. dp数组的初始化

   根据dp数组的定义，两个状态变量都初始化为1

4. 遍历顺序

   dp[i]是根据nums[i]从前往后遍历推导出来，j是遍历从0~i区间的数值所以放在循环的内侧。

#### 代码实现:100:

:::: code-group
::: code-group-item 第一种写法

```ts
function findNumberOfLIS(nums: number[]): number {
    const dp: number[] = new Array(nums.length).fill(1)
    const count: number[] = new Array(nums.length).fill(1)
    let maxLen = 0,res = 0
    for (let i = 0; i < nums.length; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[i] > nums[j]) {
                if (dp[i] < dp[j] + 1) {
                    dp[i] = dp[j] + 1
                    count[i] = count[j]
                }else if(dp[i] === dp[j] + 1) {
                    console.log(dp[i],i)
                    count[i] += count[j]
                }
            }
        }
        // 更新数组的最大长度
        if(dp[i] > maxLen) {
            maxLen = dp[i]
            res = count[i]
            // 收集结果 dp[i] === maxLen 因为找的最长的上升子序列，这个等式说明i位置就是最长的上升子序列，可以收集i位置
            // 对应的count[i]为结果
        }else if(dp[i] === maxLen) {
            res += count[i]
        }
    }
    return res
}
```
:::

::: code-group-item 第二种写法
```ts
function findNumberOfLIS(nums: number[]): number {
    const dp: number[] = new Array(nums.length).fill(1)
    const count: number[] = new Array(nums.length).fill(1)
    // 记录最长子序列的长度，最长子序列的个数
    let maxLen = 0,res = 0
    for (let i = 0; i < nums.length; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[i] > nums[j]) {
                if (dp[i] < dp[j] + 1) {
                    dp[i] = dp[j] + 1
                    count[i] = count[j]
                }else if(dp[i] === dp[j] + 1) {
                    
                    count[i] += count[j]
                }
            }
        }
        // 更新最大长度
        if(dp[i] > maxLen) {
            maxLen = dp[i]
        }  
    }
    // 统计最大长度位置的count[i]
    for(let i = 0;i<nums.length;i++) {
        if(maxLen===dp[i]) {
            res += count[i]
        }
    }
    return res
}
```
:::
::::

## 718.最长重复子数组

#### 题目描述:question:

给两个整数数组 `nums1` 和 `nums2` ，返回 *两个数组中 **公共的** 、长度最长的子数组的长度* 。

::: tip 示例

输入：nums1 = [1,2,3,2,1], nums2 = [3,2,1,4,7]

输出：3

解释：长度最长的公共子数组是 [3,2,1] 。

:::

#### 思路:bulb:

动态规划：

1. 确定dp数组的含义

   **`dp[i][j]`表示以`i-1`和以`j-1`结尾的最长公共子数组的长度**

2. dp数组的递推公式

   情况一：`nums[i-1]===nums[j-1]`那么最长公共子数组的长度就一定会+1，至于i位置和j位置的总长度还取决于不包含当前这个相等的数，也就是这个数以前两个数组的最长公共子数组的长度。

   情况二：`nums[i-1]!==nums[j-1]`最长公共子数组的长度为0

   ```ts
   if(nums1[i-1]===nums2[j-1]) {
       dp[i][j] = dp[i-1][j-1] + 1
   }
   ```

3. 初始化dp数组

   根据dp数组定义某一个数组为空就不存在重复子数组长度也就为0

   ```ts
   const dp:number[][] = new Array(nums1.length+1).fill(0).map(_ => new Array(nums2.length+1).fill(0))
   ```

4. dp数组的遍历顺序

   从上到下，从前往后

#### 代码实现:100:

```ts
function findLength(nums1: number[], nums2: number[]): number {
    const dp:number[][] = new Array(nums1.length+1).fill(0).map(_ => new Array(nums2.length+1).fill(0))
    let res = 0
    for(let i = 1;i<=nums1.length;i++) {
        for(let j = 1;j<=nums2.length;j++) {
            if(nums1[i-1]===nums2[j-1]) {
                dp[i][j] = dp[i-1][j-1] + 1
            }
            res = Math.max(dp[i][j],res)
        }
    }
    return res
};
```

## 53.最大子数组和

#### 题目描述:question:

给你一个整数数组 `nums` ，请你找出一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。

**子数组** 是数组中的一个连续部分。

::: tip 示例

​	输入：nums = [-2,1,-3,4,-1,2,1,-5,4]
​	输出：6
​	解释：连续子数组 [4,-1,2,1] 的和最大，为 6 。

:::

#### 思路:bulb:

##### 1、贪心

数组求得是最大的子数组和且连续，当和为负数的时候只会造成负收益，当连续和为负数的时候就直接放弃，从一个新的数开始累计和。

举例来说：当此时的sum和为-4，要加上的当前元素未知设为为x

两种选择：1、从x开始从新累加求和，也就是sum = x  2、sum+x 继续累加求和。 sum = sum + x

第二种选择显然不对，因为此时sum已经为负数，负数只会拖累求和，假如继续加下去就没有意义，不如我把这一部分拖累我的给去掉，从新的x位置处从新求和，这样才有可能出现大的连续子数组和。

##### 2、动态规划

1. dp的含义

   `dp[i]`表示以i结尾的数组的最大子数组的和

2. dp的递推公式

   `dp[i]`的由来有两种选择：1、`dp[i-1] + nums[i]`前一个状态加上这个位置的数 2、直接取`nums[i]`也就是这个位置的数

   ```ts
   dp[i] = Math.max(nums[i] + dp[i-1],nums[i])
   res = dp[i] > res ? dp[i] : res
   ```

3. dp的初始化

   根据dp数组的长度初始化:

   - 长度为`nums.length`，初始化为`dp[0] = nums[0]`。`dp[0]`表示前面1个数的最大子数组和。
   - 长度为`nums.length + 1`，初始化`dp[0] = 0`，`dp[0]`表示前面0个数的最大子数组和

   ```ts
   // dp长度为nums.length的写法
   const dp = new Array(nums.length).fill(0)
   let res = nums[0]
   dp[0] = nums[0]
   // dp长度为nums.length + 1的写法
   const dp = new Array(nums.length).fill(0)
   let res = nums[0]
   dp[0] = 0
   for (let i = 1; i <= nums.length; i++) {
       dp[i] = Math.max(nums[i] + dp[i-1],nums[i])
       res = dp[i] > res ? dp[i] : res
   }
   ```

4. dp的遍历顺序

   从前往后

##### 3、暴力

以nums数组中的每一个数都为起点都试一试，看看以哪个数为起点得到的最大子数组的和比较大。

#### 代码实现:100:

:::: code-group
::: code-group-item 贪心

```ts
function maxSubArray(nums: number[]): number {
    let sum:number = 0,res = -Infinity
    for(const num of nums) {
        if(sum > 0) {
         sum += num

        }else {
            sum = num
        }
        res = Math.max(res,sum)
    }
    return res
};
```
:::

::: code-group-item 动态规划
```ts
function maxSubArray(nums: number[]): number {
    const dp = new Array(nums.length).fill(0)
    let res = nums[0]
    dp[0] = nums[0]
    for (let i = 1; i < nums.length; i++) {
        dp[i] = Math.max(nums[i] + dp[i-1],nums[i])
        res = dp[i] > res ? dp[i] : res
    }
    return res
};
```
:::

::: code-group-item 暴力

```ts
function maxSubArray(nums: number[]): number {
    let sum:number = 0,res = -Infinity
    for(let i = 0;i<nums.length;i++) {
        sum = 0
        for(let j = i;j<nums.length;j++) {
            sum+=nums[j]
            res = Math.max(sum,res)

        }
    }
    return res
};
```

:::

::::
# 编辑距离
## 115.不同的子序列

#### 题目描述:question:

从s中的到t可以有多少种不同的方案？

::: tip 示例

​	输入：s = "rabbbit", t = "rabbit"
​	输出：3
​	解释：
​	如下图所示, 有 3 种可以从 s 中得到 "rabbit" 的方案。
​	rabbbit
​	rabbbit
​	rabbbit

:::

#### 思路:bulb:

动态规划：此类问题为匹配类问题匹配类问题的动态规划需要考虑的情况就分别为`s[i-1] === s[j-1]` 和 `s[i-1] !== s[j-1]` 两种情况。、

1. dp数组的含义

   **dp\[i][j]表示以i-1结尾的s和以j-1结尾的t中，s可以得到t的方案数量**

2. dp的递推公式

   情况一、`s[i-1] === s[j-1]` 说明两个字符相等
   
   - 使用这个字符匹配的话，dp[i][j\]===dp[i-1\][j-1\]，也就是说当前这两个字符已经相等了，用这个字符匹配的话，这个方案数量就看一下dp[i-1\][j-1\]。
   - 不用这个字符匹配，那么就用i-1匹配j，方案数量也就是dp[i-1\][j\]。 

​	   情况二、`s[i-1] !== s[j-1]` 那么就不可以使用i-1进行匹配， 那么就用i-1匹配j，方案数量也就是dp[i-1\][j\]。 

```ts
if(s[i-1] === t[j-1]) {
    dp[i][j] = dp[i-1][j-1] + dp[i-1][j]
}else {
    dp[i][j] = dp[i-1][j]
}
```

3. dp数组初始化

   考虑`dp[i][0]、dp[0][j]`，`dp[i][0]`表示i-1去匹配空字符串所以`dp[i][0]`初始化为1，`dp[0][j]`用空字符串去匹配j那么必然不可以匹配，dp[0\][j\]全部初始化为0

4. dp数组遍历顺序：从前往后，从上到下。

   ::: tip 遍历顺序技巧

   ​    **根据dp数组的递推公式进行判断。**

   :::

#### 代码实现:100:

```ts
function numDistinct(s: string, t: string): number {
    const dp:number[][] = new Array(s.length+1).fill(0).map(_ => new Array(t.length+1).fill(0))
    // 初始化dp数组
    for(let i = 0;i<s.length+1;i++) {
        dp[i][0] = 1
    }
    for(let i = 1;i<s.length+1;i++) {
        for(let j = 1;j<t.length+1;j++) {
            if(s[i-1] === t[j-1]) {
                dp[i][j] = dp[i-1][j-1] + dp[i-1][j]
            }else {
                dp[i][j] = dp[i-1][j]
            }
        }
    }

    return dp[s.length][t.length]
};
```

## 392.判断子序列

#### 题目描述:question:

字符s是不是能由t中的字符串组成？能返回true不能返回false。

::: tip 示例

​	输入：s = "abc", t = "ahbgdc"
​	输出：true

:::

#### 思路:bulb:
1. 动态规划

   **dp[i][j\]的含义：以i-1结尾的字符串是否是j-1结尾的子序列**

   dp\[i\]\[j\]的递推公式：dp\[i\]\[j\]的来源取决于两种情况：情况一、s\[i-1\] === t\[j-1\] 相等的话就看 dp\[i-1\]\[j-1\]是不是符合要求，因为反正这两个字母相等了，就看其前面，前面行那么dp\[i\]\[j\]也就行。情况二、s[i-1] !\=\= t\[j-1\] 不相等的话就看 dp\[i\][j-1]是不是可以符合要求，说明i结尾的字符已经可以被j-1结尾的字符所表示了，那么j再多一个字符也当然可以表示。

   ```ts
   if(t[j-1] === s[i-1]) {
       dp[i][j] = dp[i-1][j-1]
   }else {
       dp[i][j] = dp[i][j-1]
   }
   ```

   dp\[i\][j\]的初始化：dp\[0\][j\]初始化为true 空字符串肯定可以被t所表示。dp\[i\][0\]初始化为false t为空字符串不能组成除了空字符串之外的字符。

   遍历顺序：根据dp的依赖关系可以看出，从上到下从前往后。

2. 双指针

   两个指针分别指向两个字符串，当出现相等的情况说明匹配成功，i++，j++如果不相等的话说明没有匹配成功，只需要j++。

   i指向短字符串，j指向长的字符串。

#### 代码实现:100:

:::: code-group
::: code-group-item 动态规划

```ts
function isSubsequence(s: string, t: string): boolean {
    if(!s.length) return true
    const dp: boolean[][] = new Array(s.length + 1).fill(false).map(_ => new Array(t.length + 1).fill(false))
    for (let i = 0; i < t.length + 1; i++) {
        dp[0][i] = true
    }

    for (let i = 1; i <= s.length; i++) {
        for(let j = 1;j<=t.length;j++) {
            if(t[j-1] === s[i-1]) {
                dp[i][j] = dp[i-1][j-1]
            }else {
                dp[i][j] = dp[i][j-1]
            }
        }
    }
    // console.log(dp)
    return dp[s.length][t.length]
};
```
:::

::: code-group-item 双指针
```ts
function isSubsequence(s: string, t: string): boolean {
    let i = 0,j = 0
    while(i<s.length && j < t.length) {
        if(s[i] === s[j]) {
            i++
        }
        // 相等或者不相等都会执行的操作
        j++
    }
    return s.length === i
}
```
:::
::::

