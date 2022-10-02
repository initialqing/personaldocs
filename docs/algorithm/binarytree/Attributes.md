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

## 404. 左叶子之和

### 题目描述

给定二叉树的根节点 `root` ，返回所有左叶子之和。

::: tip 示例

输入: root = [3,9,20,null,null,15,7] 

输出: 24 

解释: 在这个二叉树中，有两个左叶子，分别是 9 和 15，所以返回 24

:::

![image-20220929210118191](https://example.qingcc.top/image-20220929210118191.png)

### 思路

核心：找到左边叶子的判断公式`if (root.left !== null && root.left.left === null && root.left.right === null)`,然后加上求和，再按照前序遍历的方式递归，最后返回sum值。

### 代码实现

```ts
function sumOfLeftLeaves(root: TreeNode | null): number {
    let sum: number = 0
    function recur(root: TreeNode) {
        if (!root) {
            return
        }
        // 找到左边叶子节点。
        if (root.left !== null && root.left.left === null && root.left.right === null) {
            sum += root.left.val
        }
        recur(root.left)
        recur(root.right)
    }
    recur(root)
    return sum
};
```

## 222. 完全二叉树的节点个数

### 题目描述

给你一棵 完全二叉树 的根节点 root ，求出该树的节点个数。

完全二叉树 的定义如下：在完全二叉树中，除了最底层节点可能没填满外，其余每层节点数都达到最大值，并且最下面一层的节点都集中在该层最左边的若干位置。若最底层为第 h 层，则该层包含 1~ 2h 个节点。

::: tip 示例

输入：root = []

输出：0

:::

![image-20220929210217294](https://example.qingcc.top/image-20220929210217294.png)

### 思路

思路一：不利用完全二叉树节点的特性，直接一行代码搞定`return root === null ? 0 : 1 + countNodes(root.left) + countNodes(root.right)`

思路二：利用完全二叉树的特性，判断每个节点及其左右两个节点是否是完全二叉树，完全二叉树的节点个数`2^h-1`，计算后作为当前递归层的返回值，

### 代码实现

```ts
function countNodes(root: TreeNode | null): number {
    let left = root, right = root
    // 初始化高度值 当left 和 right 都为null的时候本层递归就返回0，也就是root为null。
    let cL = 0, cR = 0
    // 计算左右边的高度值
    while (left !== null) {
        left = left.left
        cL++
    }
    while (right !== null) {
        right = right.left
        cL++
    }
    // 左右节点的高度值是一样的，满二叉树用公式计算节点值
    if (cL === cR) {
        return Math.pow(2, cR) - 1
    }
    // 不是完全二叉树，返回左右节点的节点值
    return 1 + countNodes(root.left) + countNodes(root.right)
};
// 第一种思路直接统计所有的节点个数
function countNodes(root: TreeNode | null): number {
    return root === null ? 0 : 1 + countNodes(root.left) + countNodes(root.right)
};
```



## 104.二叉树的最大深度

### 题目描述

给定一个二叉树，找出其最大深度。

二叉树的深度为根节点到最远叶子节点的最长路径上的节点数。

**说明:** 叶子节点是指没有子节点的节点。

::: tip 示例

输入：[3,9,20,null,null,15,7]

输出：3

:::

![image-20220929210118191](https://example.qingcc.top/image-20220929210118191.png)

### 思路

思路一：直接返回二叉树的所有节点

思路二：前序遍历，靠递归一直更新depth中的数值。

### 代码实现

```ts
function maxDepth(root: TreeNode | null): number {
    let result = 0
    function recur(node: TreeNode, depth: number) {
		// 节点为空直接返回
        if(node === null) return
		// 更新结果值
        result = result > depth? result :depth
		
        recur(node.left, depth + 1)
        recur(node.right, depth + 1)
    }
    recur(root,1)
    return result
};

function maxDepth(root: TreeNode | null): number {
   return root == null ? 0 : Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
};
```



## 111.二叉树的最小深度

### 题目描述

给定一个二叉树，找出其最小深度。

最小深度是从根节点到最近叶子节点的最短路径上的节点数量。

**说明：**叶子节点是指没有子节点的节点。

::: tip 示例

输入：root = [3,9,20,null,null,15,7]

输出：2

:::

![image-20220929210118191](https://example.qingcc.top/image-20220929210118191.png)

### 思路

思路一：递归

递归法需要注意的是，左右边有一个空节点的情况是需要特殊处理，返回另一个不是空节点的递归的返回值。左右都不为空节点就返回`return 1 + Math.min(minDepth(root.left), minDepth(root.right))`.

思路二：层序遍历

需要注意的是，返回一个遇到的叶子节点所在的层数，所以需要判断当前的节点是否为叶子节点，在将节点的左右节点放进队列中。

### 代码实现

:::: code-group
::: code-group-item 递归法

```ts

function minDepth(root: TreeNode | null): number {
    if (!root) return 0
    if (root.left === null && root.right) {
        return 1 + minDepth(root.right)
    }
    if (root.left && root.right === null) {
        return 1 + minDepth(root.left)
    }
    return 1 + Math.min(minDepth(root.left), minDepth(root.right))
};
```
:::

::: code-group-item 层序遍历
```ts
function minDepthLevelOrder(root: TreeNode | null): number {
    let res = 0
    let queue: TreeNode[] = [root]
    while (queue.length) {
        const length = queue.length
        // 记录当前节点的层数
        res++
        for (let i = 0; i < length; i++) {
            const node = queue.shift()
            // 判断是否为叶子节点
            if(!node.left && !node.right) {
                return res
            }
            // 将下一层加入到队列当中
            if(node.left) queue.push(node.left)
            if(node.right) queue.push(node.right)
        }
    }
    return res
};
```
:::
::::

## 101.对称二叉树

### 题目描述

给你一个二叉树的根节点 `root` ， 检查它是否轴对称。

::: tip 示例

输入：root = [1,2,2,3,4,4,3]

输出：true

:::

![image-20220929210619815](https://example.qingcc.top/image-20220929210619815.png)

### 思路

递归遍历，需要注意递归的终止条件。

1. 左右节点都为空
2. 左右节点中其中有一个节点为空
3. 左节点的值不等于右节点的值

层序遍历：在队列中一下弹出两个节点,并在队列中加入节点的时候进行判断。

1. 判断条件为`if (!left || !right ||left.val !== right.val)`
2. 当两个节点都为空的时候`if (!left && !right) continue`

### 代码实现

:::: code-group
::: code-group-item 递归遍历

```ts
function isSymmetric(root: TreeNode | null): boolean {
    function isMirror(left: TreeNode | null, right: TreeNode | null) {
        // 递归终止的条件
        if (!left && !right) return true
        if (!left && right) return false
        if (!right && left) return false
        if (left.val !== right.val) return false
		// 返回左右两个节点的&&
        return isMirror(left.left, right.right) && isMirror(left.right, right.left)
    }
    return isMirror(root.left, root.right)
};
```
:::

::: code-group-item 层序遍历
```ts
function isSymmetric(root: TreeNode | null): boolean {
    const queue: TreeNode[] = [root.left, root.right]
    while (queue.length) {
        const length = queue.length
        for (let i = 0; i < length; i++) {
            const left = queue.shift()
            const right = queue.shift()
            // 递归终止条件
            if (!left || !right ||left.val !== right.val) {
                return false
            }
            // 左右两个节点都为空，继续下一轮
            if (!left && !right) continue
 
            queue.push(left.left, right.right)
            queue.push(left.right, right.left)
        }
    }
    return true
};
```
:::
::::

## 513.找树左下角的值

### 题目描述

给定一个二叉树的 **根节点** `root`，请找出该二叉树的 **最底层 最左边** 节点的值。

假设二叉树中至少有一个节点。

::: tip 示例

输入: [1,2,3,4,null,5,6,null,null,7]

输出: 7

:::

![image-20220929210725797](https://example.qingcc.top/image-20220929210725797.png)

### 思路

递归遍历：找树最左下角的值，最左下角的值一定是树最深的位置，需要dep变量记录当前树的一个深度。当树的深度超过最大深度之后变更结果，可以这样操作的原因是前序遍历一定会先到达最左侧的节点处，当有超过的才更新，这样就可以保证得到的节点是最左侧最深的节点值。

层序遍历：最后一层的第一个数值就是结果。

### 代码实现

:::: code-group
::: code-group-item 递归遍历

```ts

function findBottomLeftValue(root: TreeNode | null): number {
    let maxDep: number = 0
    // 记录当前树的深度
    let dep = 1
    // 记录最终的结果
    let result: number = 0
    function recur(root: TreeNode, dep: number) {
        // 遇到空节点返回
        if (!root) {
            return
        }
        // 找树最左下角的值，最左下角的值一定是树最深的位置，因为此时的深度超过了之前的最大深度，更新结果。
        if (dep > maxDep) {
            maxDep = dep
            result = root.val
        }
        // 左递归
        recur(root.left, dep + 1)
        // 右递归
        recur(root.right, dep + 1)
    }
    recur(root, dep)
    return result
};
```
:::

::: code-group-item 层序遍历
```ts
function findBottomLeftValue(root: TreeNode | null): number {
    const queue: TreeNode[] = [root]
    const levelOrder: number[][] = []
    while (queue.length) {
        const length = queue.length
        const temp: number[] = []
        for (let i = 0; i < length; i++) {
            const node = queue.shift()
            temp.push(node.val)
            if (node.left) queue.push(node.left)
            if (node.right) queue.push(node.right)
        }
        levelOrder.push(temp)
    }
    return levelOrder[levelOrder.length - 1][0]
};
```
:::
::::

## 110.平衡二叉树

### 题目描述

给定一个二叉树，判断它是否是高度平衡的二叉树。

本题中，一棵高度平衡二叉树定义为：

> 一个二叉树*每个节点* 的左右两个子树的高度差的绝对值不超过 1 

::: tip 示例

输入：root = [3,9,20,null,null,15,7]

输出：true

:::

![image-20220929210820905](https://example.qingcc.top/image-20220929210820905.png)

### 思路

思路一：结合[104.二叉树的最大深度](#104.二叉树的最大深度)和[111.二叉树的最小深度](#111.二叉树的最小深度),分别计算最大深度和最小深度之后再相减。

思路二：递归遍历，单层递归的返回值为：左右节点的高度值+1，但是还需要左右节点高度进行特殊的处理再返回。

1. -1  不合理的结果  一、左右节点的高度差大于1，返回-1。二、左右两边的递归层的返回值大于1
2. 0   空节点   空节点返回0
3. 左右节点递归返回值的最大值+1   不满足上述情况返回当前节点的高度

### 代码实现

思路二：

```ts
// 递归当前层返回值意义：返回当前节点左右两边的高度，假如高度差大于1了就直接返回-1。
// 后序遍历，从最底层一层层返回节点高度
function isBalanced(root: TreeNode | null): boolean {
    function recur(node: TreeNode | null) {
        if (!node) return 0
        
        let left = recur(node.left)
        if (left === -1) return left
        let right = recur(node.right)
        if (right === -1) return right

        if (Math.abs(left - right) > 1) {
            return -1
        }
        return 1 + Math.max(left, right)
    }
    return recur(root) === -1 ? false : true
};
```

思路yi

```ts
function maxDepth(root: TreeNode | null): number {
    let result = 0
    function recur(node: TreeNode, depth: number) {
        if (node === null) return

        result = result > depth ? result : depth

        recur(node.left, depth + 1)
        recur(node.right, depth + 1)
    }
    recur(root, 1)
    return result
};

function minDepth(root: TreeNode | null): number {
    if (!root) return 0
    if (root.left === null && root.right) {
        return 1 + minDepth(root.right)
    }
    if (root.left && root.right === null) {
        return 1 + minDepth(root.left)
    }
    return 1 + Math.min(minDepth(root.left), minDepth(root.right))
};
function isBalanced(root: TreeNode | null): boolean {
    return maxDepth(root) - minDepth(root) <= 1
};
```