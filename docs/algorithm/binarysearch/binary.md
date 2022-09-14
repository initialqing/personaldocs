# 目录
[[toc]]

::: tip
涉及到的题目有如下几个
:::
-  [leetcode35 搜索插入位置](#leetcode35-搜索插入位置)
-  [leetcode 34在排序数组中查找元素的第一个和最后一个位置](#leetcode34-在排序数组中查找第一个和最后一个位置)
-  [leetcode33搜索旋转排序数组](#leetcode33搜索旋转排序数组)
-  [leetcode81. 搜索旋转排序数组 II](#leetcode81.-搜索旋转排序数组-II)
-  [leetcode 153 寻找旋转数组中的最小值](#leetcode-153-寻找旋转数组中的最小值)
-  [leetcode 74 搜索二维矩阵](#leetcode-74-搜索二维矩阵)

## 二分查找

二分查找适用于有序数组，是在有序数组中查找某一个特定元素的搜索算法。二分查找的使用条件是有序的，输入的还可能是区间的某一段的数据。

> 基础二分查找的第一种写法

不同的写法主要区别在于我们定义target所在的区间，这种写法我们定义target在的区间位于

`[left,right]`这个左闭右闭的区间。相应的left与right的初始化写法为`let left = 0, right = nums.length - 1`。两个特点：

- `while(left <= right)`
- `right = mid - 1`，`left = mid + 1`

```typescript
function binarySearch(nums: number[], target: number): number {
    let left = 0, right = nums.length - 1
    while (left <= right) { // target的区间在左闭右闭区间中。[left,right]
        const mid = Math.floor(left + (right - left) / 2) // 得到中间索引 避免溢出
        if (nums[mid] > target) {
            right = mid - 1 // tartget在左边区间，[left,mid - 1]
        } else if (nums[mid] < target) {
            left = mid + 1 // target在右边区间，[mid + 1,right]
        } else {
            return mid //找到索引
        }
    }
    return -1
}
```



> 第二种写法

这种写法我们定义target在的区间位于`[left,right)`这个左闭右闭的区间。相应的left与right的初始化写法为`let left = 0, right = nums.length`。两个特点：

- `while(left < right)`
- `right = mid`，`left = mid + 1`

```typescript
function binarySearch(nums: number[], target: number): number {
    let left = 0,right = nums.length
    while (left < right) { // target的区间在左闭右闭区间中。[left,right]
        const mid = Math.floor(left + (right - left) / 2) // 得到中间索引 避免溢出
        if (nums[mid] > target) {
            right = mid // tartget在左边区间，[left,mid)
        } else if (nums[mid] < target) {
            left = mid + 1 // target在右边区间，[mid + 1,right)
        } else {
            return mid //找到索引
        }
    }
    return -1
}
```

> 递归写法

```typescript
function binarySearch(nums: number[], target: number, left: number, right: number): number {
    if (left <= right) {
        const mid = Math.floor(left + (right - left) / 2)
        if (nums[mid] > target) {
            // 在新的左边区间查找
            return binarySearch(nums, target, left, mid - 1)
        } else if (nums[mid] < target) {
            // 在新的右边去检查找
            return binarySearch(nums, target, mid + 1, right)
        } else {
            return mid //找到索引
        }
    }
    // 不存在
    return -1
}
```



## 完全有序

### leetcode35 搜索插入位置

**题目描述**

给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。如果目标值不存在于数组中，返回它将会被按顺序插入的位置。

你可以假设数组中无重复元素。

示例 1:

> 输入: [1,3,5,6], 5
> 输出: 2

```typescript
function binarySearch(nums: number[], target: number): number {
    let left = 0, right = nums.length - 1
    while (left <= right) { // target的区间在左闭右闭区间中。[left,right]
        const mid = Math.floor(left + (right - left) / 2) // 得到中间索引 避免溢出
        if (nums[mid] > target) {
            right = mid - 1 // tartget在左边区间，[left,mid - 1]
        } else if (nums[mid] < target) {
            left = mid + 1 // target在右边区间，[mid + 1,right]
        } else {
            return mid //找到索引
        }
    }
    return left
}
```

### leetcode34 在排序数组中查找第一个和最后一个位置

**题目描述**

给定一个按照升序排列的整数数组 nums，和一个目标值 target。找出给定目标值在数组中的开始位置和结束位置。

如果数组中不存在目标值 target，返回 [-1, -1]。

**题目解析**

题目很容易理解，我们的思路是可以先找出下边界再找出上边界，再上边标准二分查找的代码中，`nums[mid]===target`的时候返回，`nums[mid] < target`的时候在右半部分区间进行查找，target大在右半区间，target小在左半区间。

![image-20220913201451404](https://example.qingcc.top/image-20220913201451404.png)

此时虽然`nums[mid]===target`但是我们还是不知道数组的target的第一个位置的索引是多少，还需要继续查找，我们需要在mid的左边区间继续寻找，所以只需要修改为`target<=nums[i]`的时候继续向左边进行查找。

==计算上边界的代码==

```typescript
// 计算下边界的代码
function binarySearch(nums: number[], target: number): number {
    let left = 0, right = nums.length - 1
    while (left <= right) { // target的区间在左闭右闭区间中。[left,right]
        const mid = Math.floor(left + (right - left) / 2) // 得到中间索引 避免溢出
        if (nums[mid] >= target) {
            right = mid - 1 // tartget在左边区间，[left,mid - 1]
        } else if (nums[mid] < target) {
            left = mid + 1 // target在右边区间，[mid + 1,right]
        } else {
            return mid //找到索引
        }
    }
    return left
}

```

上下边界计算的条件正好相反

题目的完整代码

```typescript
/**
 *
 * @param nums
 * @param target
 */
function searchRange(nums: number[], target: number): number[] {
    const low = lowerBound(nums, target)
    const upper = upperBound(nums, target)
    if (upper < low) {
        return [-1, -1]
    }
    return [low, upper]
};
// 计算下边界
function lowerBound(nums: number[], target: number): number {
    let left = 0, right = nums.length - 1
    while (left <= right) {
        const mid = Math.floor(left + (right - left) / 2)

        if (nums[mid] >= target) {
            right = mid - 1
        } else if (nums[mid] < target) {
            left = mid + 1
        }
    }
    return left
}
// 计算上边界
function upperBound(nums: number[], target: number): number {
    let left = 0, right = nums.length - 1
    while (left <= right) {
        const mid = Math.floor(left + (right - left) / 2)
        if (nums[mid] > target) {
            right = mid - 1
        } else if (nums[mid] <= target) {
            left = mid + 1
        }
    }
    return right
}
```

### 找出第一个大于目标元素的索引

target作为目标元素的几种情况：

- 数组包含目标元素，找出在他后面的第一个元素
- 目标元素不在数组中，数组内的部分元素大于它，此时我们需要返回第一个大于他的元素
- 目标元素不在数组中，且数组中的所有元素都大于它，那么我们此时返回数组的第一个元素即可
- 目标元素不在数组中，且数组中的所有元素都小于它，那么我们此时没有查询到，返回 -1 即可。

![image-20220913204537226](https://example.qingcc.top/image-20220913204537226.png)

==找出第一个大于目标元素索引的代码==

```typescript
function lowBound(nums: number[], target: number, left: number, right: number): number {
    while (left <= right) {
        const mid = Math.floor(left + (right - left) / 2)
        // mid比目标元素大，看看是不是第一个比他大的
        if (nums[mid] > target) {
            // 假如mid是0的话说明target没在数组之中
            if (mid === 0 || nums[mid - 1] <= target) {
                return mid
            } else {
                right = mid - 1
            }
        } else if (nums[mid] <= target) {
            left = mid + 1
        }
    }
    return -1
}
```

### 找出第一个小于目标元素的索引

==第一个小于目标元素索引的代码==

```typescript
function upperBound(nums: number[], target: number, left: number, right: number): number {
    while (left <= right) {
        const mid = Math.floor(left + (right - left) / 2)
        if (nums[mid] < target) {
            if (mid === right || nums[mid + 1] >= target) {
                return mid
            } else {
                left = mid + 1
            }
        } else if (nums[mid] >= target) {
            right = mid - 1
        }
    }
    return -1
}
```

## 不完全有序

有的时候数组是部分有序的并不是完全有序，所以可以分割为两个有序数组，大多是有序数组进行翻折得到的。

### 查找目标元素

不完全有序的数组例子：

![image-20220913205804250](https://example.qingcc.top/image-20220913205804250.png)

考虑mid在数组中的落点

mid的落点相对于left会出现以下几种情况，1、**mid与left同时落在数组1或者数组2**。2、**mid与left不落在同一个数组。**

mid的落点可以通过nums[mid]与nums[left]的值比较来判断，因为mid一定在left右边

1. nums[mid] >= nums[left] mid与left位于同一个数组当中
2. nums[mid] < nums[left] 时，说明他俩落在了不同的数组

> 当left与mid位于同一个数组当中分析target的可能位置情况

- 位于mid的左边

  条件:`target>=nums[left] && target < nums[mid]`

- 位于mid的右边

  条件:`target>nums[mid] || target < nums[left]`,此时存在两种情况,一个是traget为8的时候一个是target为0-2的时候.

![image-20220914094636982](https://example.qingcc.top/image-20220914094636982.png)

> 当left和mid位于不同的数组当中分析target的可能位置情况(mid位于数组2)

- 位于mid的左边

  条件:`target > nums[right] || target < nums[mid]`

- 位于mid的右边

  条件:`target <= nums[right] && target > nums[mid]`

![image-20220914094925377](https://example.qingcc.top/image-20220914094925377.png)

### leetcode33搜索旋转排序数组

**题目描述**
给你一个整数数组 nums ，和一个整数 target 。

该整数数组原本是按升序排列，但输入时在预先未知的某个点上进行了旋转。（例如，数组 [0,1,2,4,5,6,7] 可能变为 [4,5,6,7,0,1,2] ）。

请你在数组中搜索 target ，如果数组中存在这个目标值，则返回它的索引，否则返回 -1 。

示例 1：

> 输入：nums = [4,5,6,7,0,1,2], target = 0
> 输出：4



```typescript
function binarySearch(nums: number[], target: number): number {
    let left = 0, right = nums.length - 1
    while (left <= right) {
        const mid = Math.floor(left + (right - left) / 2)
        if(nums[mid] === target) {
            return mid
        }
        if (nums[mid] >= nums[left]) {
            if(nums[mid]  > target && target >= nums[left]) {
                right = mid - 1
            }else if(target > nums[mid] || target < nums[left]) {
                left = mid + 1
            }
        }else if(nums[mid] < nums[left]) {
            if(nums[mid] < target && target <= nums[right]) {
                left = mid + 1
            }else if (target < nums[mid] || target > nums[right]) {
                right = mid - 1
            }
        }
    }
    return -1
}
```

### 查找目标元素(含有重复元素)

![image-20220914104222295](https://example.qingcc.top/image-20220914104222295.png)

这个例子中的目标元素为`target=3`,此时的`nums[mid]>=nums[left] && target>nums[mid]`之前代码的规则就会让`left = mid + 1`,跳过目标元素.此时可以抽离`nums[mid] === nums[left]`的情况,当出现mid对应的值和left对应的值相同的情况直接left++

### leetcode81. 搜索旋转排序数组 II

**题目描述**
假设按照升序排序的数组在预先未知的某个点上进行了旋转。

( 例如，数组 [0,0,1,2,2,5,6] 可能变为 [2,5,6,0,0,1,2] )。

编写一个函数来判断给定的目标值是否存在于数组中。若存在返回 true，否则返回 false。

示例 1：

> 输入：nums = [2,5,6,0,0,1,2], target = 0 输出：true

**题目代码**

```typescript
function search(nums: number[], target: number): number {
    // 定义左右指针
    let left = 0, right = nums.length - 1
    while (left <= right) {
        const mid = Math.floor(left + (right - left) / 2);
        if (nums[mid] === target) {
            return mid
        }
        if (nums[mid] === nums[left]) {
            left++
            continue
        }
        // 落在同一个数组的情况下,同时落在数组1或者数组2
        if (nums[mid] > nums[left]) {
            // target在left 和 mid之间,在一个我完全有序的区间中查找
            if (target >= nums[left] && target < nums[mid]) {
                right = mid - 1
                // target在mid和right之间，可能在数组1或者在数组2
            } else if (target > nums[mid] || target < nums[left]) {
                left = mid + 1
            }
            // 不在同一个数组的情况，left在数组1 mid落在数组2
        } else if (nums[mid] < nums[left]) {
            // target在mid和right 的有序区间之间
            if (nums[mid] < target && target <= nums[right]) {
                left = mid + 1
                // target 在 left 和mid之间
            } else if (target < nums[mid] || target > nums[right]) {
                right = mid - 1
            }
        }
    }
    return -1
}
```

### 寻找旋转数组的最小值

旋转数组最小值的`nums[mid]`和`nums[left]`的几种情况:

![image-20220914110559070](https://example.qingcc.top/image-20220914110559070.png)

- 情况一:完全有序的数组区间内,直接返回nums[left]就是最小值
- 情况二:left和mid都在同一个前半部分,是一个单调区间,所以需要移动left在右半区间进行查找
- 情况三:left在前半部分min在后半部分,最小值一定在left和mid区间,需要向左边去检查找,right = mid

### leetcode 153 寻找旋转数组中的最小值

示例 1：

> 输入：nums = [3,4,5,1,2]输出：1

**代码实现**

```typescript

function findMIn(nums: number[]) {
    let left = 0, right = nums.length - 1
    while (left <= right) {
        if (nums[left]<=nums[right]) {
            return nums[left]
        }
        const mid = Math.floor(left + (right - left) / 2)
		// mid和left位于同一个单调递增的区间,最小值不在这
        if (nums[left] <= nums[mid]) {
            left = mid + 1
            // 必定存在最小值的情况,需要注意的是right = mid
        }else if(nums[left] > nums[mid]) {
            right = mid
        }
    }
    return -1
}
```

## 二维数组

在二维矩阵中实现二分查找,可以将二维数组转为一维数组,实现二分查找,然后得到索引之后再从新映射为二维数组的索引`[x,x]`.那么一维坐标和二维坐标的转换规则是什么呢?设有一维坐标x,二位坐标只是涉及到行列,所以找到行列的对应关系即可.我们可以使用(mid/列数) + 1表示mid对应的数字在数组中的位置是第二行,当然索引为mid/列数.列的对应关系为,mid % 列数.

![image-20220914145649679](https://example.qingcc.top/image-20220914145649679.png)

### leetcode 74 搜索二维矩阵

**题目描述**

编写一个高效的算法来判断 m x n 矩阵中，是否存在一个目标值。该矩阵具有如下特性：

每行中的整数从左到右按升序排列。
每行的第一个整数大于前一行的最后一个整数。

示例1

> 输入：matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,50]], target = 3
> 输出：true

**题目代码**

```typescript
function searchMatrix(nums:number[][],target:number):boolean {
    if (nums.length===0) {
        return false
    }
    let row = nums.length;
    let col = nums[0].length

    let left = 0,right = row * col - 1
    while(left <= right) {
        const mid = Math.floor(left + (right - left) / 2)
        let rownum = Math.floor(mid / col)
        let colnum = Math.floor(mid % col)
        if (nums[rownum][colnum]===target) {
            return true           
        }else if (nums[rownum][colnum] > target){
            right = mid - 1
        }else if(nums[rownum][colnum] < target) {
            left = mid + 1
        }
    }
    return false
}
```
