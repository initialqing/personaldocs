[[toc]]

每一次递归都会把函数的局部变量入栈，等递归函数返回在把函数的各个参数弹出，用栈可以实现二叉树的迭代遍历

## 迭代遍历

### 前序遍历（迭代）

前序遍历的顺序是中左右，每次先处理中间节点，再将右节点、左节点入栈，这样处理的话在栈弹出的时候就是中左右的顺序。

1. 将元素放如result数组
2. 处理节点入栈

```ts
function preOrderTraversal(root: TreeNode:null):number[] {
    const stack:TreeNode[] = []
    const res:number[] = []
    stack.push(root)
    while (stack.length) {
        const node = stack.pop();
        res.push(node.val)  // 处理节点 中
        if(node.right) stack.push(node.right) //  右
        if(node.left) stack.push(node.left)   //  左
    }
    return result
}
```

### 中序遍历（迭代）

中续遍历：先将将所有节点的左边节点入栈，然后一边出栈，一边处理右边节点。

```ts
function midOrderTraversal(root: TreeNode:null):number[] {
    const stack: TreeNode[] = []
    const res: number[] = []
    let cur = root
    while (cur || stack.length) {
        if (cur) { // 访问节点，一直访问到最最左边的节点。
            stack.push(cur) // 把需要访问节点入栈
            cur = cur.left // 向左入栈 
        } else {
            cur = stack.pop()
            res.push(cur.val) // 中 处理节点
            cur = cur.right // 右边节点入栈
        }
    }
    return res
}
```

### 后续遍历（迭代）

后序遍历：这种情况跟前序遍历正好完全相反。

![image-20220923200346376](https://example.qingcc.top/image-20220923200346376.png)

```ts
function postOrderTraversal(root: TreeNode:null):number[] {
    const stack: TreeNode[] = []
    const res: number[] = []
    stack.push(root)
    while (stack.length) {
        const cur = stack.pop()
        if(cur.left) stack.push(cur.left)
        if(cur.right) stack.push(cur.right)
        res.push(cur.val)
    }
    return res.reverse()
}
```

## 递归遍历

### 前序遍历（递归）

> 中左右

```ts
const res = []
function preOrderTraversal(root: TreeNode:null) {
    if (!root) return
    res.push(root.val)
    preOrderTraversal(root.left)
    preOrderTraversal(root.right) 
}
```

### 中序遍历（递归）

> 左中右

```ts
const res = []
function midOrderTraversal(root: TreeNode:null) {
    if (!root) return
    midOrderTraversal(root.left)
    res.push(root.val)
    midOrderTraversal(root.right)   
}
```

### 后序遍历（递归）

> 左右中

```ts
const res = []
function postOrderTraversal(root: TreeNode:null) {
    if (!root) return
    postOrderTraversal(root.left)
    postOrderTraversal(root.right)
    res.push(root.val)
}
```