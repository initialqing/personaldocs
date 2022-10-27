---
title:回溯
---
# 回溯算法

![回溯算法](https://example.qingcc.top/%E5%9B%9E%E6%BA%AF%E7%AE%97%E6%B3%95.png)

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

# 分割
## 131.分割回文串

### 题目描述

给你一个字符串 `s`，请你将 `s` 分割成一些子串，使每个子串都是 **回文串** 。返回 `s` 所有可能的分割方案。

**回文串** 是正着读和反着读都一样的字符串。

::: tip

输入：s = "aab"

输出：[["a","a","b"],["aa","b"]]

输入：s = "a"

输出：[["a"]]

:::

### 思路

收集结果的条件：startIdnex索引也就是分割字符串的起点已经等于字符串的长度

写一个判断回文串的方法

跳过分割后不是回文字符串的str

### 代码实现

```ts
function partition(s: string): string[][] {
    const res: string[][] = []
    const path: string[] = []
    function backTricking(startIndex: number, str: string) {
        // 收集结果
        if (startIndex >= str.length) {
            res.push([...path])
            return
        }
        for (let i = startIndex; i < str.length; i++) {
			// 判断区间是不是回文串
            if (isPalindrome(str, startIndex, i)) {
        		// 是回文串收集结果
                const s = str.substr(startIndex, i - startIndex+1)
                path.push(s)
            } else {
                continue
            }
            // 递归
            backTricking(i + 1, str)
            path.pop()
        }
    }
    backTricking(0, s)
    return res
};
function isPalindrome(string: string, start: number, end: number): boolean {
    for (let i = start, j = end; i < j; i++, j--) {
        if (string[i] !== string[j]) return false
    }
    return true
}
```

## 93.复原IP地址

### 题目描述

有效 **IP 地址** 正好由四个整数（每个整数位于 0 到 255 之间组成，且不能含有前导 0），整数之间用 '.' 分隔。

例如：`"0.1.2.201"` 和 `"192.168.1.1"` 是 有效 IP 地址，但是 `"0.011.255.245"`、`"192.168.1.312"` 和 `"192.168@1.1"` 是 无效 IP 地址。
给定一个只包含数字的字符串 s ，用以表示一个 IP 地址，返回**所有可能的有效 IP 地址**，这些地址可以通过在 s 中插入 '.' 来形成。你 不能 重新排序或删除 s 中的任何数字。你可以按 **任何** 顺序返回答案。

::: tip

输入：s = "25525511135"

输出：["255.255.11.135","255.255.111.35"]

:::

### 思路

使用path数组收集ip地址的具体数值，最后使用join方法进行连接

先分割字符串字符串长度大于3或者+str  > 255 不符合要求直接退出循环

首位0的影响：`str.length  > 1`或者`str[0] === '0'`都是不符合要求的结果。

### 代码实现

```ts
function restoreIpAddresses(s: string): string[] {
    const res: string[] = []
    const path: string[] = []
    function backTricking(startIndex: number) {
        if (path.length > 4) return
        if (startIndex === s.length && path.length === 4) {
            // 收集结果并拼接
            res.push(path.join('.'))
            return
        }
        for (let i = startIndex; i < s.length; i++) {
            // 需要注意substr和substirng的区别，一个是指定提取的字符数量，一个是按照区间提取
            const str:string = s.substring(startIndex,i + 1)
            //越界了，不保存结果
            if(str.length > 3 || +str>255) break
            // 首位0的影响
            if(str.length > 1 && str[0] === '0') {
                break
            }
            path.push(str)
            backTricking(i+1)
            path.pop()
        }
    }
    backTricking(0)
    return res
};
```

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



# 棋盘问题
## 51.N皇后

### 题目描述

按照国际象棋的规则，皇后可以攻击与之处在同一行或同一列或同一斜线上的棋子。

n 皇后问题 研究的是如何将 n 个皇后放置在 n×n 的棋盘上，并且使皇后彼此之间不能相互攻击。

给你一个整数 n ，返回所有不同的 n 皇后问题 的解决方案。

每一种解法包含一个不同的 n 皇后问题 的棋子放置方案，该方案中 'Q' 和 '.' 分别代表了皇后和空位。

### 思路

收集结果：当row的数值等于行的值的时候就收集结果，收集结果需要将符合条件的chessBoard进行转换，转换成需要的样子。

单独写一个判断是否可以放置皇后的方法

可以放置皇后在进行递归进入下一层

因为每一层只取一个皇后，也就是每一行，不需要再判断是否冲突

### 代码实现

```ts
function solveNQueens(n: number): string[][] {
    const chessBoard: string[][] = new Array(n).fill(0).map(_ => new Array(n).fill('.'))
    const res: string[][] = []
    
    function backTracking(row: number, chessBoard: string[][]) {
        if (row === n) {
            res.push(transform(chessBoard))
            return
        }
        for (let col = 0; col < n; col++) {
            if (isValid(row, col, chessBoard, n)) {
                chessBoard[row][col] = 'Q'
                backTracking(row + 1, chessBoard)
                chessBoard[row][col] = '.'
            }
        }
    }
    backTracking(0, chessBoard)
    return res
};
function isValid(row: number, col: number, chessBoard: string[][], n: number): boolean {
    // 同一行不用去重，选择的时候只会选同一行的一个元素，然后就进入递归了
    // 同一列
    for (let i = 0; i < row; i++) {
        if (chessBoard[i][col] === 'Q') {
            return false
        }
    }
    // 斜对角45度
    for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
        if (chessBoard[i][j] === 'Q') {
            return false
        }
    }
    for (let i = row - 1, j = col + 1; i >= 0 && j >= 0; i--, j++) {
        if (chessBoard[i][j] === 'Q') {
            return false
        }
    }
    return true
}
function transform(chessBoard: string[][]) {
    let transformed: string[] = []
    chessBoard.forEach(row => {
        let s = ''
        row.forEach(item => {
            s += item
        })
        transformed.push(s)
    })
    return transformed
}
```



## 52.N皇后Ⅱ

### 题目描述

n 皇后问题 研究的是如何将 n 个皇后放置在 n × n 的棋盘上，并且使皇后彼此之间不能相互攻击。

给你一个整数 n ，返回 n 皇后问题 不同的**解决方案的数量**。

### 思路

返回不同解决方案的数量，相对于N皇后简单了不少，可以在收集结果的时候直接让Count++,而不是存放结果，在最后返回结果的时候直接返回count的值就可以了。

### 代码实现

```ts
/**
 * 
 * @param {number} n
 * @returns {number} 
 */
function totalNQueens(n: number): number {
    const chessBoard: string[][] = new Array(n).fill([]).map(_ => new Array(n).fill('.'))
    let count = 0
    const isValid = (row: number, col: number, chess: string[][], n: number): boolean => {
        // 检查同一个列是否合法
        for (let i = 0; i < row; i++) {
            if (chess[i][col] === 'Q') {
                return false
            }
        }

        for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
            if (chess[row][col] === 'Q') {
                return false
            }
        }

        for (let i = row - 1, j = col + 1; i >= 0 && j >= 0; i--, j++) {
            if (chess[row][col] === 'Q') {
                return false
            }
        }
        return true
    }
    const backTracking = (row: number, chess: string[][]) => {
        if (row === n) {
            count++
            return
        }
        for (let col = 0; col < n; col++) {
            if (isValid(row, col, chess, n)) {
                chess[row][col] = 'Q'
                backTracking(row + 1, chess)
                chess[row][col] = '.'
            }
        }

    }
    backTracking(0, chessBoard)
    return count
};

```

## 37.解数独

### 题目描述

编写一个程序，通过填充空格来解决数独问题。

数独的解法需 遵循如下规则：

- 数字 1-9 在每一行只能出现一次。
- 数字 1-9 在每一列只能出现一次。
- 数字 1-9 在每一个以粗实线分隔的 3x3 宫内只能出现一次。（请参考示例图）
  数独部分空格内已填入了数字，空白格用 '.' 表示。

### 思路

直接看代码

### 代码实现

```ts
/**
 Do not return anything, modify board in-place instead.
 */
function solveSudoku(board: string[][]): void {
    backTracking(board)
};
function backTracking(board: string[][]) {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            if (board[i][j] !== '.') {
                continue
            }
            for (let val = 1; val <= 9; val++) {
                if (isValid(i, j, `${val}`, board)) {
                    board[i][j] = `${val}`
                    if (backTracking(board)) {
                        return true
                    }
                    board[i][j] = '.'
                }
            }
            return false
        }
    }
    return true
}

function isValid(row: number, col: number, val: string, board: string[][]) {
    // 同一列
    for (let i = 0; i < 9; i++) {
        if (board[i][col] === val) {
            return false
        }
    }
    // 同一行
    for (let j = 0; j < 9; j++) {
        if (board[row][j] === val) {
            return false
        }
    }
    let startRow = Math.floor(row / 3) * 3
    let startCol = Math.floor(col / 3) * 3
    for (let i = startRow; i < startRow + 3; i++) {
        for (let j = startCol; j < startCol + 3; j++) {
            if (board[i][j] === val) {
                return false
            }
        }
    }
    return true
}
```



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

