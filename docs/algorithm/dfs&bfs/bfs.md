[[toc]]

## 并查集

### 并查集基础知识

#### 一、并查集图解

并查集的英文名称为：UnionFind，可以把一个数据集合分离成若干个子集，举例来说，有一个数组`[0,2,2,2,0,1]`,数组的下标索引表示五个节点，从0~5五个节点，索引代表的数值为这个节点的指向，可以发现索引0指向了它子集说明节点0是一个根节点，`5—>1—>2—>2`,`3—>2`,这就可以形成了一棵树，`4—>0`表示第二棵树。

![image-20220920192911337](https://example.qingcc.top/image-20220920192911337.png)

![image-20220920192452559](https://example.qingcc.top/image-20220920192452559.png)

并查集的基本结构已经构造出来了，下一步要完善union合并两个树，和find找到某个节点的父节点的操作，我们把UnionFind并查集写成一个工具类模板代码。

#### 二、find和union方法的实现

> 因为写在了工具类中所以下面代码加入了this

1. find方法寻找某个元素所在树的根节点

   ```ts
   find(index: number) {
       while (this.parents[index] !== index) {
           index = this.parent[index]
       }
       return index
   }
   ```

2. union方法是将两个集合进行合并

   ```ts
   // 合并的方法
   union(child: number, parent: number) {
       const childRoot = this.find(child)
       const parentRoot = this.find(parent)
       // 有相同的父节点，说明有环，不能合并。
       if (childRoot === parentRoot) return false
       this.parents[childRoot] = parentRoot
       return true
   }
   ```

::: tip find方法优化

find方法的隔代压缩和彻底压缩方法

:::

- 隔代压缩：性能高但是压缩不完全

  需要加入`parent[x] = this.parent[parent[x]]`将路径上的每个节点指向其祖父节点然后再跳到祖父节点的位置。

  ```ts
  find(index: number) {
      while (this.parents[index] !== index) {
          parent[x] = this.parent[parent[x]]
          index = this.parent[index]
      }
      return index
  }
  ```

  

- 彻底压缩：消耗性能但是压缩但是足够完全

  ```ts
  find(index: number) {
      if (this.parents[index] !== index) {
          this.parents[index] = this.find(this.parents[index])
      }
      return this.parents[index]
  }
  ```

**完整代码：**

```ts
class UnionFind {
    parents: number[]
    count:number
    constructor(size: number) {
        this.parents = Array(size).fill(0).map((_, index) => index)
        this.count = number
    }
    // 使用了路径压缩
    find(index: number) {
        if (this.parents[index] !== index) {
            this.parents[index] = this.find(this.parents[index])
        }
        return this.parents[index]
    }
    // 合并的方法
    union(child: number, parent: number) {
        const childRoot = this.find(child)
        const parentRoot = this.find(parent)
        // 有相同的父节点，说明有环，不能合并。
        if (childRoot === parentRoot) return false
        this.parents[childRoot] = parentRoot
        return true
    }
    // 判断两个父节点是否相同
    same(child: number, parent: number) {
        return this.find(child) === this.find(parent)
    }
    // 返回连同分量的个数
    countNum(){
        return this.count
    }
}
```



### 684.冗余连接

#### 题目描述

树可以看成是一个连通且 无环 的 无向 图。

给定往一棵 n 个节点 (节点值 1～n) 的树中添加一条边后的图。添加的边的两个顶点包含在 1 到 n 中间，且这条附加的边不属于树中已存在的边。图的信息记录于长度为 n 的二维数组 edges ，edges[i] = [ai, bi] 表示图中在 ai 和 bi 之间存在一条边。

请找出一条可以删去的边，删除后可使得剩余部分是一个有着 n 个节点的树。如果有多个答案，则返回数组 edges 中最后出现的边。

::: tip 示例

```js
输入: edges = [[1,2], [1,3], [2,3]]
输出: [2,3]
```

```js
输入: edges = [[1,2], [2,3], [3,4], [1,4], [1,5]]
输出: [1,4]
```

:::

#### 思路

题目中给出了n个节点，使n个节点形成树的最小边数为n-1，题目给出了n个边会形成环，所以必定有一个边是多余的。可以将题目中所给的节点进行联合union，当遇到第一个不能联合的边<font color="red">(边对应的两个节点祖先节点是同一个)</font>就返回这个边对应的这两个节点，也即是edges中给的这条边。

#### :100:代码实现

```ts
function findRedundantConnection(edges: number[][]): number[] {
    // 初始化
	const father: number[] = new Array(1005).fill(0).map((_,index) => index)
    for(const [edgesA,edgesB] of edges) {
        // 遇到两个节点不能形成边，这个边阻碍了形成树，所以这个边就是要找的答案
        if(!union(edgesA,edgesB)) {
            return [edgesA,edgesB]
        }
    }
};
/*并查集的基础*/
// 找到某一个节点的根节点
function find(x: number): number {
    if (father[x] !== x) {
        father[x] = find(father[x])
    }
    return father[x]
}
// 判断两个节点是不是属于同一个父节点
function same(x: number, y: number) {
    const fatherX = find(x)
    const fatherY = find(y)
    return fatherX === fatherY
}
// 合并两个集合
function union(x: number, y: number) {
    const collectionA = find(x)
    const collectionB = find(y)
    if (collectionA === collectionB) return false
    // 集合B挂在到集合A上
    father[collectionB] = collectionA
    return true
}
```



### 685.冗余连接Ⅱ

#### 题目描述

题目形成相对于题目1来说形成的图为有向图，edges中的节点指向为，第一个节点指向第二个节点，这个题目的冗余情况有三种：

1. 冗余连接Ⅰ的情况，没有入度为2 的点。
2. 存在入度为2的点<font color='red'>(有两个不一样的祖先节点)</font>，从而不符合题目的要求

::: tip 示例

```js
输入：edges = [[1,2],[1,3],[2,3]]
输出：[2,3]
```

```js
输入：edges = [[1,2],[2,3],[3,4],[4,1],[1,5]]
输出：[4,1]
```

:::

#### 思路

1. 找到度大于1的节点，返回其节点对应两条边的索引，比如[[1,2] [3,2],[4,2]]，返回[0,1] 解释: 2节点有两条入度，分别是1,3 第一次出现的边索引为0，第二次出现的边索引为1，从而删去对应的两条边试试是否符合要求(能不能形成树)，需要注意的是需要先删除后面索引对应的边，因为需要返回较后面的结果。
2. 假如第一种情况没解决说明没有度为2的节点，可以直接使用冗余连接Ⅰ的结论


#### :100:代码实现

```ts
/**
 * 
 * @param {number[][]}edges 
 * @returns {number[]}
 */
const findRedundantDirectedConnection = (edges: number[][]): number[] => {
    const [indexA, indexB] = findDegreeThanOne(edges);
    // 能进入下面两个if判断说明，有两个节点的入度大于1，尝试删除这两个节点看看是不是树。
    if (indexA >= 0 && isTreeRemoveEdge(edges, indexB)) {
        return edges[indexB]
    }
    if (indexB >= 0 && isTreeRemoveEdge(edges, indexA)) {
        return edges[indexA]
    }
    // 前面都没有返回，这说明和冗余连接的题目的题解就一样了
    return redundantEdges(edges)
}
// 找到度大于1的节点，返回其节点对应两条边的索引，比如[[1,2] [3,2],[4,2]]，返回[0,1] 解释: 2节点有两条入度，分别是1,3 第一次出现的边索引为0，第二次出现的边索引为1    
const findDegreeThanOne = (edges: number[][]): number[] => {
    const hash = new Map<number, number>()
    for (let i = 0; i < edges.length; i++) {
        if (!hash.has(edges[i][1])) {
            hash.set(edges[i][1], i)
        } else {
            return [hash.get(edges[i][1])!, i]
        }
    }
    return []
}
// 判断去除一条边之后剩余的边能不能组成一颗树。
const isTreeRemoveEdge = (edges: number[][], removeIndex: number): boolean => {
    const uf = new UnionFind(edges.length + 1);
    for (let i = 0; i < edges.length; i++) {
        // uf.union(edges[i][1], edges[i][0]) 返回的返回值为false说明不是一棵树，说明两个节点没法合并，说明有环。
        if (i !== removeIndex && !uf.union(edges[i][1], edges[i][0])) {
            return false
        }
    }
    return true
}

const redundantEdges = (edges: number[][]): number[] => {
    const uf = new UnionFind(edges.length + 1);
    for (const [parent, child] of edges) {
        // 如果有环，说明可以删去这个生成环的边，冗余连接1的题目就是这样做的。
        if (!uf.union(child, parent)) {
            return [parent, child]
        }
    }
    return []
}
// 并查集工具类
class UnionFind {
    parents: number[]
    count: number
    constructor(size: number) {
        this.parents = Array(size).fill(0).map((_, index) => index)
        this.count = size
    }
    find(index: number) {
        if (this.parents[index] !== index) {
            this.parents[index] = this.find(this.parents[index])
        }
        return this.parents[index]
    }
    union(child: number, parent: number) {
        const childRoot = this.find(child)
        const parentRoot = this.find(parent)
        // 有相同的父节点，说明有环，不能合并。
        if (childRoot === parentRoot) return false
        this.parents[childRoot] = parentRoot
        this.count--
        return true
    }
    same(child: number, parent: number) {
        return this.find(child) === this.find(parent)
    }
    countNum() {
        return this.count
    }
}
```

