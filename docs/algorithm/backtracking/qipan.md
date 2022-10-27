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
