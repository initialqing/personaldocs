
[[toc]]

## 235.二叉搜索树的最近公共祖先

### 题目描述

给定一个二叉搜索树, 找到该树中两个指定节点的最近公共祖先。

**百度百科**中最近公共祖先的定义为：“对于有根树 T 的两个结点 p、q，最近公共祖先表示为一个结点 x，满足 x 是 p、q 的祖先且 x 的深度尽可能大（一个节点也可以是它自己的祖先）。”

::: tip 示例

输入: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8

输出: 6 

解释: 节点 2 和节点 8 的最近公共祖先是 6。

:::

![image-20220927205536496](https://example.qingcc.top/image-20220927205536496.png)

### 思路

因为是二叉搜索树，二叉搜索树有序，p、q节点分别在这个root节点的左右两边，那么root节点一定是这pq这两个节点的公共祖先。

### 代码实现

```ts

function lowestCommonAncestor(root: TreeNode | null, p: TreeNode | null, q: TreeNode | null): TreeNode | null {
    if (!root) return null
    // p、q节点root节点的同一边
    if (root.val < p.val && root.val < q.val) {
        return lowestCommonAncestor(root.right, p, q)
    }
    if (root.val > p.val && root.val > q.val) {
        return lowestCommonAncestor(root.left, p, q)
    }
    // p、q节点在root节点的两边，这个节点就是公共祖先节点。
    return root
};
```



## 236.二叉树的最近公共祖先

### 题目描述

给定一个二叉树, 找到该树中两个指定节点的最近公共祖先。

**百度百科**中最近公共祖先的定义为：“对于有根树 T 的两个节点 p、q，最近公共祖先表示为一个节点 x，满足 x 是 p、q 的祖先且 x 的深度尽可能大（一个节点也可以是它自己的祖先）。”

::: tip 示例

输入：root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1

输出：3

解释：节点 5 和节点 1 的最近公共祖先是节点 3 。

:::

![image-20220927210913714](https://example.qingcc.top/image-20220927210913714.png)

### 思路

后续遍历，单层逻辑为，看这个节点的左边节点、右边节点是否查找到pq中的任意一个，加入查到了任意一个就返回，没有的话就返回null，假如两边都有返回值的话，说明当前的这一层的节点就是pq两个节点的公共祖先。

### 代码实现

```ts

function lowestCommonAncestor(root: TreeNode | null, p: TreeNode | null, q: TreeNode | null): TreeNode | null {
    if(!root) return null
    if (root.val === p.val || root.val === q.val) return root
    let left = lowestCommonAncestor(root.left, p, q) // 左
    let right = lowestCommonAncestor(root.right, p, q)// 右
    if(!left && !right) return null
    if(!left) return right // 中
    if(!right) return left 
    if(left && right) return root
};
```
