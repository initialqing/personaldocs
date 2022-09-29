[[toc]]

二叉搜索树中的每个节点都是有数值的，**二叉搜索树的中序遍历是一个有序的数组**

- 若它的左子树不空，则左子树上所有结点的值均小于它的根结点的值；
- 若它的右子树不空，则右子树上所有结点的值均大于它的根结点的值；
- 它的左、右子树也分别为二叉排序树

![image-20220923204509556](https://example.qingcc.top/image-20220923204509556.png)

平衡二叉搜索树：又被称为AVL（Adelson-Velsky and Landis）树，且具有以下性质：它是一棵空树或它的左右两个子树的高度差的绝对值不超过1，并且左右两个子树都是一棵平衡二叉树。

![image-20220923204706001](https://example.qingcc.top/image-20220923204706001.png)

## 二叉搜索树的修改和构造

这一系列题目主要是对二叉搜索树本身的操作，涉及到构造和修改。

### 701.二叉搜索树的插入操作

#### 题目描述

给定二叉搜索树（BST）的根节点 root 和要插入树中的值 value ，将值插入二叉搜索树。 返回插入后二叉搜索树的根节点。 输入数据 保证 ，新值和原始二叉搜索树中的任意节点值都不同。

注意，可能存在多种有效的插入方式，只要树在插入后仍保持为二叉搜索树即可。 你可以返回 任意有效的结果 。

::: tip 示例

输入：root = [4,2,7,1,3], val = 5

输出：[4,2,7,1,3,5]

:::

![image-20220923210529382](https://example.qingcc.top/image-20220923210529382.png)

#### 思路

用递归的方法实现，特殊情况处理：当传入的root值为空的时候就创建一个新的TreeNode直接返回即可，另外利用二叉搜索树的性质左右递归。

#### 代码实现

:::: code-group
::: code-group-item 带返回值递归

```ts
function insertIntoBST(root: TreeNode | null, val: number): TreeNode | null {
    if(!root) return new TreeNode(val)
    if(root.val > val) {
        root.left = insertIntoBST(root.left,val)
    }
    if(root.val < val) {
        root.right = insertIntoBST(root.right,val)
    }
    return root
};
```
:::

::: code-group-item 无返回值递归
```ts
function insertIntoBST(root: TreeNode | null, val: number): TreeNode | null {
    if(!root) return new TreeNode(val)
    const helper = (root:TreeNode):void => {
        if(!root) return
        if(root.val<val) {
            if(!root.right) {
                root.right = new TreeNode(val)
            }else {
                helper(root.right)
            }
        }else {
            if(!root.left) {
                root.left = new TreeNode(val)
            }else {
                helper(root.left)
            }
        }
    }
    helper(root)
    return root
};
```
:::

::: code-group-item 迭代法
```ts
留个坑还没写呢
```
:::

::::

### 450.删除二叉搜索树中的节点

#### 题目描述

给定一个二叉搜索树的根节点 root 和一个值 key，删除二叉搜索树中的 key 对应的节点，并保证二叉搜索树的性质不变。返回二叉搜索树（有可能被更新）的根节点的引用。

一般来说，删除节点可分为两个步骤：

首先找到需要删除的节点；
如果找到了，删除它。

::: tip 示例 

输入：root = [5,3,6,2,4,null,7], key = 3

输出：[5,4,6,2,null,null,7]

:::

![image-20220923211606627](https://example.qingcc.top/image-20220923211606627.png)

#### 思路

情况一：要删除节点只存在一个节点，返回另一个存在的节点

情况二：要删除节点左右两个节点都存在，这种情况就需要要找第一个大于要删除节点值的节点，也就是加入node是要删除的节点，找node.right之后，的node.right.left.left ... 一直找到null为止。

#### 代码实现

:::: code-group
::: code-group-item 非平衡二叉搜索树

```js
/**
 * @param {TreeNode} root
 * @param {number} key
 * @return {TreeNode}
 */
var deleteNode = function (root, key) {
    if (!root) return root
    if (root.val === key) {
        if (!root.left) {
            return root.right
        }
        if (!root.right) {
            return root.left
        }
        let cur = root.right
        while (cur.left) {
            cur = cur.left
        }
        cur.left = root.left
        root = root.right
        return root
    }
    if (root.val > key) {
        root.left = deleteNode(root.left, key)
    }
    if (root.val < key) {
        root.right = deleteNode(root.right, key)
    }
    return root
};
```
:::

::: code-group-item 平衡二叉搜索树
```ts
const bar = 'bar'function deleteNode(root: TreeNode | null, key: number): TreeNode | null {
    if(!root) return null
    if(root.val === key) {
        if(!root.left) {
            return root.right
        }
        if(!root.right)  {
            return root.left
        }
        // 此时表示要删除节点的右侧节点
        let node = root.right
        // node的前一个节点
        let pre = root
		// 找到第一个必要删除节点大的节点
        while(node.left) {
            pre = node
            node = node.left
        }
        // 交换数值来删除root，也就是目标节点
        root.val = node.val

		 // 此时node的left一定为null只需要处理node.left
        if(pre.left.val === node.val) {
            // 相当于用其前一个节点来消除node这个节点，这个node节点值就是第一个大于要删除的目标节点的值。将它的值和目标节点值交换之后就要删除也就是工具人。
            pre.left = node.right
        }else {
            // 这种情况参考示例
            pre.right = node.right
        }
        return root
    }
    if(root.val > key) {
        root.left = deleteNode(root.left,key)
    }
    if(root.val < key) {
        root.right = deleteNode(root.right,key)
    }
    return root
};
```
:::
::::

### 669.修剪二叉搜索树

#### 题目描述

给你二叉搜索树的根节点 root ，同时给定最小边界low 和最大边界 high。通过修剪二叉搜索树，使得所有节点的值在[low, high]中。修剪树 不应该 改变保留在树中的元素的相对结构 (即，如果没有被移除，原有的父代子代关系都应当保留)。 可以证明，存在 唯一的答案 。

所以结果应当返回修剪好的二叉搜索树的新的根节点。注意，根节点可能会根据给定的边界发生改变

::: tip 示例

输入：root = [3,0,4,null,2,null,null,1], low = 1, high = 3

输出：[3,2,null,1]

:::

![image-20220925191518225](https://example.qingcc.top/image-20220925191518225.png)

#### 思路

递归：前序遍历，题目给的区间为闭区间，我们需要思考的有两件事：

1. 假如当前节点的值位于要删除节点的区间内，怎么办？
2. 当前节点的值不位于要删除的区间内，怎么办？

第一种情况：当前节点的值越界了，是超哪个边界了呢？也就是大了还是小了，假如大了，那么这个节点右边的节点也显然需要删除，假如小了，那么这个节点的左边显然都需要删除。这种情况我们可以直接考虑其相反的节点的情况进行递归

第二种情况：正常递归不做任何处理

#### 代码实现

```ts
class TreeNode {
     val: number
    left: TreeNode | null
    right: TreeNode | null
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.left = (left===undefined ? null : left)
        this.right = (right===undefined ? null : right)
    }
}

function trimBST(root: TreeNode | null, low: number, high: number): TreeNode | null {
        if(!root) return null
        // 判断当前节点是否越界
        if(root.val < low) {
            // 已经越界，因为二叉搜索树root的左边节点也一定越界了，需要看看右边节点有没有越界
            return trimBST(root.right,low,high)
        }
        if(root.val > high) {
            // 已经越界，因为二叉搜索树root的右边节点也一定越界了，需要看看左边节点有没有越界
            return trimBST(root.left,low,high)
        }
        // 当前节点没有越界
        root.left = trimBST(root.left,low,high)
        root.right = trimBST(root.right,low,high)
        return root
};
```

### 108.将有序数组转换为二叉搜索树

#### 题目描述

给你一个整数数组 nums ，其中元素已经按 升序 排列，请你将其转换为一棵 高度平衡 二叉搜索树。

高度平衡 二叉树是一棵满足「每个节点的左右两个子树的高度差的绝对值不超过 1 」的二叉树。

::: tip 示例

输入：nums = [-10,-3,0,5,9]

输出：[0,-3,9,-10,null,5]

解释：[0,-10,5,null,-3,null,9] 也将被视为正确答案：

:::

#### 思路

不停的取数组最中间的那个数建立新节点就可以了，节点左节点向左递归，节点右节点向右递归。

#### 代码实现

```ts

function sortedArrayToBST(nums: number[]): TreeNode | null {
    const helper = (nums: number[], left: number, right: number): TreeNode => {
        if (left > right) return null
        const mid = Math.floor(left + (right - left) / 2)
        const node = new TreeNode(nums[mid])
        node.left = helper(nums, left, mid - 1)
        node.right = helper(nums, mid + 1, right)
        return node
    }
    return helper(nums, 0, nums.length - 1)
};
```

### 1382. 将二叉搜索树变平衡

#### 题目描述

给你一棵二叉搜索树，请你返回一棵 平衡后 的二叉搜索树，新生成的树应该与原来的树有着相同的节点值。如果有多种构造方法，请你返回任意一种。

如果一棵二叉搜索树中，每个节点的两棵子树高度差不超过 1 ，我们就称这棵二叉搜索树是 平衡的 。

::: tip 示例

输入：root = [1,null,2,null,3,null,4,null,null]

输出：[2,1,3,null,null,null,4]

解释：这不是唯一的正确答案，[3,1,4,null,2,null,null] 也是一个可行的构造方案。

:::

#### 思路

利用这个题目[108.将有序数组转换为二叉搜索树](#108.将有序数组转换为二叉搜索树)的结论，中序遍历转为有序数组，再转为二叉搜索树。

#### 代码实现

```ts

// 108有序数组转为二叉搜索树
function createSearchTree(nums: number[], left: number, right: number): TreeNode {
    if (left > right) return null
    const mid = Math.floor(left + (right - left) / 2)
    const node = new TreeNode(nums[mid])
    node.left = createSearchTree(nums, left, mid - 1)
    node.right = createSearchTree(nums, mid + 1, right)
    return node
}
function balanceBST(root: TreeNode | null): TreeNode | null {
    const nums: number[] = []
    // 中序遍历得到有序数组
    function midOrder(root: TreeNode | null): void {
        if (!root) return null
        midOrder(root.left)
        nums.push(root.val)
        midOrder(root.right)
    }
    midOrder(root)
    return createSearchTree(nums, 0, nums.length - 1)
};
```

## 二叉搜索树的性质

### 700.二叉搜索树中的搜索

#### 题目描述

给定二叉搜索树（BST）的根节点 root 和一个整数值 val。

你需要在 BST 中找到节点值等于 val 的节点。 返回以该节点为根的子树。 如果节点不存在，则返回 null 。

::: tip 示例

输入：root = [4,2,7,1,3], val = 2

输出：[2,1,3]

:::

![image-20220926192816373](https://example.qingcc.top/image-20220926192816373.png)

#### 思路

简单题，遇到比这个节点大的就往右边找(递归)，遇到比这个节点小就往左边找，等于这个节点就直接返回

#### 代码实现

```ts
function searchBST(root: TreeNode | null, val: number): TreeNode | null {
    if(!root) return null
    if(root.val > val) {
        // 向左边找
        return searchBST(root.left,val)
    }
    if(root.val < val) {
        // 向右边找
        return searchBST(root.right,val)
    }
    // 相等直接返回
    return root
};
```

### 98.验证二叉搜索树

#### 题目描述

给你一个二叉树的根节点 `root` ，判断其是否是一个有效的二叉搜索树。

**有效** 二叉搜索树定义如下：

- 节点的左子树只包含 **小于** 当前节点的数。
- 节点的右子树只包含 **大于** 当前节点的数。
- 所有左子树和右子树自身必须也是二叉搜索树。

::: tip 示例

输入：root = [4,2,6,1,3]

输出：1

:::

#### 思路

二叉搜索树一般用中序遍历，因为中序遍历正好是一个有序数组。

#### 代码实现

```ts
// 思路中序遍历
function isValidBST(root: TreeNode | null): boolean {
    let max = -Infinity
    const midOrder = (root:TreeNode):boolean => {
        if (!root) return true
        let left = midOrder(root.left) // 左边
        if (root.val > max) {
            max = root.val  //  中
        } else {
            return false
        }
        let right = midOrder(root.right) // 右边
        return left && right
    }
    return midOrder(root)
};
```

### 530.二叉搜索树中的最小绝对差

#### 题目描述

给你一个二叉搜索树的根节点 `root` ，返回 **树中任意两不同节点值之间的最小差值** 。

差值是一个正数，其数值等于两值之差的绝对值。

::: tip 示例

输入：root = [4,2,6,1,3]

输出：1

:::

#### 思路

依旧是利用中序遍历有序的特性，不同节点的最小差值一定相邻，一次遍历树即可，这边提供两个解法，递归和迭代。

#### 代码实现

:::: code-group
::: code-group-item 递归实现

```ts
function getMinimumDifference(root: TreeNode | null): number {
    let min:number = +Infinity
    let pre:number = +Infinity
    const order = (root:TreeNode) => {
        if(!root) return null
        order(root.left)// 左
        min = Math.min(min,Math.abs(pre - root.val)) // 中
        pre = root.val
        order(root.right)  // 右
    }
    order(root)
    return min
};
```
:::

::: code-group-item 遍历实现
```ts
function getMinimumDifference(root: TreeNode | null): number {
    let queue:TreeNode[] = [],pre:TreeNode = null,min:number = +Infinity,node:TreeNode = root
    while(node || queue.length) {
        if(node) {
            queue.push(node)
            node = node.left  // 左
        }else {
            node = queue.pop()
            if(pre) {
                min = Math.min(min,node.val - pre.val)   // 中
            }
            pre = node
            node = node.right // 右
        }
    }
    return min
};
```
:::
::::

### 501.二叉搜索树中的众数

#### 题目描述

给你一个含重复值的二叉搜索树（BST）的根节点 root ，找出并返回 BST 中的所有 众数（即，出现频率最高的元素）。

如果树中有不止一个众数，可以按 **任意顺序** 返回。

假定 BST 满足如下定义：

- 结点左子树中所含节点的值 **小于等于** 当前节点的值

- 结点右子树中所含节点的值 **大于等于** 当前节点的值

- 左子树和右子树都是二叉搜索树

::: tip 示例

输入：root = [1,null,2,2]

输出：[2]

:::

#### 思路

题目的大方向一定是中序遍历，需要思考中的位置需要进行什么操作？

1、首先需要pre节点记录前一个节点，这样才能统计count是否应该++

```ts
if (!root) return null// 递归的终止条件
order(root.left) // 中序遍历的左
if (!pre) { // 初始第一个节点
    count = 1
} else if (root.val === pre.val) {// 与前一个节点相等
    count++
} else {
    count = 1 // 与前一个节点不相等
}
```

2、记录结果,但是此时的结果不一定是最终结果，这取决于count是否可以超过maxCount

```ts
 if (count === maxCount) { // 统计频率等于最大频率，加入结果，但是这个结果可能不合理
     res.push(root.val)
 }
```

3、 更新结果,当count的数值大于maxCount需要更新结果。

```ts
// count 统计频率大于最大频率  更新众数
if (maxCount < count) {// 判断结果是否合理
    maxCount = count
    // 清空之前的结果
    res.length = 0
    res.push(root.val)
}
pre = root // 记录当前节点作为下一个节点的前一个节点
```



#### 代码实现

```ts
function findMode(root: TreeNode | null): number[] {
    let count: number = 0, // 统计频率
        maxCount: number = 1, // 最大频率 
        res: number[] = [] // 存放结果
    let pre: TreeNode = null
    const order = (root: TreeNode):void => {
        if (!root) return null
        order(root.left) // 中序遍历的左
        if (!pre) { // 初始第一个节点
            count = 1
        } else if (root.val === pre.val) {// 与前一个节点相等
            count++
        } else {
            count = 1 // 与前一个节点不相等
        }
        if (count === maxCount) { // 统计频率等于最大频率，加入结果，但是这个结果可能不合理
            res.push(root.val)
        }
        // count 统计频率大于最大频率  更新众数
        if (maxCount < count) {// 判断结果是否合理
            maxCount = count
            // 清空之前的结果
            res.length = 0
            res.push(root.val)
        }
        pre = root
        order(root.right)
    }
    order(root)
    return res
};
```

### 538.把二叉搜索树转为累加数

#### 题目描述

给定一个二叉搜索树 root (BST)，请将它的每个节点的值替换成树中大于或者等于该节点值的所有节点值之和。

提醒一下， 二叉搜索树 满足下列约束条件：

- 节点的左子树仅包含键 **小于** 节点键的节点。

- 节点的右子树仅包含键 **大于** 节点键的节点。

- 左右子树也必须是二叉搜索树。

::: tip 示例

输入：[4,1,6,0,2,5,7,null,null,null,3,null,null,null,8]

输出：[30,36,21,36,35,26,15,null,null,null,33,null,null,null,8]

:::

![image-20220926201955467](https://example.qingcc.top/image-20220926201955467.png)

#### 思路

直接在root上修改每个节点的数值，遍历顺序为反中序遍历，右中左，这样的原因是每个节点都需要全部大于此节点的数值的累加和。

#### 代码实现

```ts
function bstToGst(root: TreeNode | null): TreeNode | null {
    let pre:number = 0
    const order = (root:TreeNode):number => {
        if(!root) return 0
        order(root.right)// 右
        root.val += pre// 此节点+上前一个节点
        pre = root.val // 记录当前节点为下一个节点的前一个节点
        order(root.left) // 左
        return root.val
    }
    order(root)
    return root
};
```