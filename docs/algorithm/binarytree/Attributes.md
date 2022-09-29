[[toc]]

## 129.求根节点到叶节点数字之和

### 题目描述

给你一个二叉树的根节点 root ，树中每个节点都存放有一个 0 到 9 之间的数字。
每条从根节点到叶节点的路径都代表一个数字：

- 例如，从根节点到叶节点的路径 1 -> 2 -> 3 表示数字 123 。
  计算从根节点到叶节点生成的 所有数字之和 。

叶节点 是指没有子节点的节点。

::: tip 示例

输入：root = [4,9,0,5,1]

输出：1026

解释：从根到叶子节点路径 4->9->5 代表数字 495   从根到叶子节点路径 4->9->1 代表数字 491   从根到叶子

节点路径 4->0 代表数字 40  因此，数字总和 = 495 + 491 + 40 = 1026

:::

![image-20220928192424394](https://example.qingcc.top/image-20220928192424394.png)

### 思路

在叶节点收集结果，可以不让空节点进入递归，`if (!root.left && !root.right)`作为递归的终止条件，`path`存放路径上的数字，当到叶子节点的时候将数组转为一个数，顺便收集结果。`result += sumArr(path)`。

### 代码实现

:::: code-group
::: code-group-item 无回溯

```ts
function sumNumbersMethod1(root: TreeNode | null): number {
    const resArr: number[] = []
    let res: number = 0
    const order = (sum: number, root: TreeNode) => {
        if (!root) return null
        sum = sum * 10 + root.val
        if (!root.left && !root.right) {
            resArr.push(sum)
            return
        }
        order(sum, root.left)
        order(sum, root.right)
    }
    order(0, root)
    resArr.forEach(item => {
        res += item
    })
    return res
};
```
:::

::: code-group-item 含回溯
```ts
function sumArr(nums: number[]): number {
    let sum = 0
    nums.forEach(item => {
        sum = sum * 10 + item
    })
    return sum
}
function sumNumbersMethod2(root: TreeNode | null): number {
    let result = 0
    const path: number[] = [root.val]
    const order = (root: TreeNode) => {
        if (!root.left && !root.right) {
            result += sumArr(path)
            return
        }
        if (root.left) {
            path.push(root.left.val)
            order(root.left)
            path.pop()
        }
        if (root.right) {
            path.push(root.right.val)
            order(root.right)
            path.pop()
        }
        return 
    }
    order(root)
    return result
};
```
:::
::::

## 112.路径总和

### 题目描述

给你二叉树的根节点 root 和一个表示目标和的整数 targetSum 。判断该树中是否存在 根节点到叶子节点 的路径，这条路径上所有节点值相加等于目标和 targetSum 。如果存在，返回 true ；否则，返回 false 。

叶子节点 是指没有子节点的节点。

::: tip 示例

输入：root = [5,4,8,11,null,13,4,7,2,null,null,null,1], targetSum = 22

输出：true

解释：等于目标和的根节点到叶节点路径如上图所示。

:::

![image-20220928193436020](https://example.qingcc.top/image-20220928193436020.png)

### 思路

叶节点收集结果，节点的左右两边任意一个返回了true说明最终的结果为真的，**需要注意的是初始状态的值**，当 `dfs(root, targetSum - root.val)`为初始值的时候，收集结果的根节点的剩余值就会正好被减为0，初始值不减root.val的时候最终就会正好剩余叶子节点的值。

### 代码实现

:::: code-group
::: code-group-item 方法一

```ts
function hasPathSum1(root: TreeNode | null, targetSum: number): boolean {
    const dfs = (node: TreeNode, last: number): boolean => {
        if (!node.left && !node.right) {
            return last === 0
        }
        if (node.left) {
            let left = dfs(node.left, last - node.left.val)
            if (left) return true
        }
        if (node.right) {
            let right = dfs(node.right, last - node.right.val)
            if (right) return true
        }
        return false
    }
    return dfs(root, targetSum - root.val)
};
```
:::

::: code-group-item 简写
```ts
function hasPathSum2(root: TreeNode | null, targetSum: number): boolean {
    if (!root) return false
    if (targetSum === root.val && !root.left && !root.right) {
        return true
    }
    return hasPathSum2(root.left, targetSum - root.val) || hasPathSum2(root.right, targetSum - root.val)
};
```
:::
::::

## 257.二叉树的所有路径

### 题目描述

给你一个二叉树的根节点 `root` ，按 **任意顺序** ，返回所有从根节点到叶子节点的路径。

**叶子节点** 是指没有子节点的节点。

::: tip 示例

输入：root = [1,2,3,null,5]

输出：["1->2->5","1->3"]

:::

![image-20220928203628483](https://example.qingcc.top/image-20220928203628483.png)

### 思路

参考[129.求根节点到叶节点数字之和](#129.求根节点到叶节点数字之和),思路相同，只不过需要在最后收集结果的时候需要写一个处理函数，转化为题解需要的样子。

### 代码实现

```ts
// 转化为题解需要的样子
function mergeString(nums: number[]): string {
    let string: string = ''
    for (let i = 0; i < nums.length; i++) {
        if (i === nums.length - 1) {
            string += nums[i]
            break
        }
        string += nums[i] + '->'
    }
    return string
}

function binaryTreePaths(root: TreeNode | null): string[] {
    const path: number[] = [root.val], res: string[] = []
    function recur(node: TreeNode) {
        if (!node.left && !node.right) {
            res.push(mergeString(path))
            return 
        }
        if(node.left) {
            path.push(node.left.val)
            recur(node.left)
            path.pop()
        }
        if(node.right) {
            path.push(node.right.val)
            recur(node.right)
            path.pop()
        }
        return 
    }
    recur(root)
    return res
};
```