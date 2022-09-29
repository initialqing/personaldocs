
[[toc]]

## 226.反转二叉树

### 题目描述

给你一棵二叉树的根节点 `root` ，翻转这棵二叉树，并返回其根节点。

::: tip 示例

输入：root = [4,2,7,1,3,6,9]

输出：[4,7,2,9,6,3,1]

:::

![image-20220927214930789](https://example.qingcc.top/image-20220927214930789.png)

### 思路

中序遍历，可以先反转当前节点的左右两个节点，然后再分别向左右递归反转，需要注意的是当输入为空节点的时候直接返回null。

### 代码实现

```ts
function invertTree(root: TreeNode | null): TreeNode | null {
    if(!root) return null
    if (!root.left && !root.right) return root
    const temp = root.left // 中的逻辑
    root.left = root.right
    root.right = temp
    invertTree(root.left) // 左
    invertTree(root.right) // 右
    return root
};
```

## 654.最大二叉树

### 题目描述

给定一个不重复的整数数组 `nums` 。 最大二叉树 可以用下面的算法从 nums 递归地构建:

1. 创建一个根节点，其值为 `nums` 中的最大值。

2. 递归地在最大值 左边 的 子数组前缀上 构建左子树。

3. 递归地在最大值 右边 的 子数组后缀上 构建右子树。

返回 `nums` 构建的 最大二叉树 。

::: tip 示例

输入：nums = [3,2,1,6,0,5]

输出：[6,3,5,null,2,0,null,null,1]

:::

解释：递归调用如下所示：
- [3,2,1,6,0,5] 中的最大值是 6 ，左边部分是 [3,2,1] ，右边部分是 [0,5] 。
    - [3,2,1] 中的最大值是 3 ，左边部分是 [] ，右边部分是 [2,1] 。
        - 空数组，无子节点。
        - [2,1] 中的最大值是 2 ，左边部分是 [] ，右边部分是 [1] 。
            - 空数组，无子节点。
            - 只有一个元素，所以子节点是一个值为 1 的节点。
    - [0,5] 中的最大值是 5 ，左边部分是 [0] ，右边部分是 [] 。
        - 只有一个元素，所以子节点是一个值为 0 的节点。
        - 空数组，无子节点。

![image-20220927215228420](https://example.qingcc.top/image-20220927215228420.png)

### 思路

中序遍历直接模拟递归构造二叉树，先找到根节点然后根据题目要求再找到根节点的左边节点右边节点，递归就完了。

### 代码实现

```ts
// 获得数组指定区间内的最大索引
function findMaxIndex(nums: number[], left: number, right: number): number {
    const temp = nums.slice(left, right+1)
    return nums.indexOf(Math.max(...temp))
}
// 定义的区间为左右都闭合的区间也就是[0,nums.length - 1]
function constructMaximumBinaryTree(nums: number[]): TreeNode | null {
    // 递归遍历构造二叉树
    const order = (left: number, right: number): TreeNode | null => {
        // 递归终止条件
        if (left > right) return null
        const index = findMaxIndex(nums, left, right)
        const node = new TreeNode(nums[index])
        node.left = order(left, index-1)
        node.right = order(index + 1, right)
        return node
    }
    return order(0, nums.length-1)
};
```

## 617.合并二叉树

### 题目描述

给你两棵二叉树： root1 和 root2 。

想象一下，当你将其中一棵覆盖到另一棵之上时，两棵树上的一些节点将会重叠（而另一些不会）。你需要将这两棵树合并成一棵新二叉树。合并的规则是：如果两个节点重叠，那么将这两个节点的值相加作为合并后节点的新值；否则，不为 null 的节点将直接作为新二叉树的节点。

返回合并后的二叉树。

注意: 合并过程必须从两个树的根节点开始。

::: tip 示例

输入：root1 = [1,3,2,5], root2 = [2,1,3,null,4,null,7]

输出：[3,4,5,5,4,null,7]

:::

![image-20220928185423032](https://example.qingcc.top/image-20220928185423032.png)

### 思路

1. 前序遍历

   先操作节点然后再进行递归遍历迭代，递归终止条件：两个树中有任意一棵树不存在节点，返回另外一个节点，都存在的话将两个节点的值加到任意一个节点上。

2. 中序遍历

   在处理节点的时候处理方式是一样的。

3. 后序遍历

   在处理节点的时候同前序遍历一样。

### 代码实现

```ts
function mergeTrees(root1: TreeNode | null, root2: TreeNode | null): TreeNode | null {
    if (!root1) return root2
    if (!root2) return root1
    root1.val += root2.val
    root1.left = mergeTrees(root1.left, root2.left)
    root1.right = mergeTrees(root1.right, root2.right)
    return root1
};
```

## 106.从中序遍历和后续遍历构造二叉树

### 题目描述

给定两个整数数组 `inorder` 和 `postorder` ，其中 `inorder` 是二叉树的中序遍历， `postorder` 是同一棵树的后序遍历，请你构造并返回这颗 二叉树

::: tip 示例

输入：inorder = [9,3,15,20,7], postorder = [9,15,7,20,3]

输出：[3,9,20,null,null,15,7]

:::

![image-20220928190622606](https://example.qingcc.top/image-20220928190622606.png)

### 思路

递归进行左右分割，后序遍历的最后一个节点一定是当前层递归的一个节点，再根据后序遍历最后一个节点在中序遍历中的位置进行分割新的前序遍历和中序遍历的数组。

![image-20220928191306091](https://example.qingcc.top/image-20220928191306091.png)

### 代码实现

```ts
function getIndex(nums: number[], number: number) {
    return nums.indexOf(number)
}

function buildTree(inorder: number[], postorder: number[]): TreeNode | null {
    if (!inorder.length && !postorder.length) return null
    if (!postorder.length) return null
    // 创建节点
    const node = new TreeNode(postorder[postorder.length - 1])
    if (postorder.length === 1) return node
    // 找到分割点
    const index = getIndex(inorder, postorder.pop())
    const inorderLeft = inorder.slice(0, index)
    const postorderLeft = postorder.slice(0, index)

    const inorderRight = inorder.slice(index + 1)
    // 注意分割边界
    const postorderRight = postorder.slice(index)

    node.left = buildTree(inorderLeft, postorderLeft)
    node.right = buildTree(inorderRight, postorderRight)
    return node
};
```
