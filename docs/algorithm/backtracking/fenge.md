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
