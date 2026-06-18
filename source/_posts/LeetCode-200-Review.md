---
title: 'LeetCode Review: No.200'
date: 2026-06-16 17:01:23
tags: leetcode
categories : 
    - LeetCode Review
---

## 記錄我的解題歷程
LeetCode連結: <https://leetcode.com/problems/number-of-islands/>
### version 1
```python
class Solution(object):
    def numIslands(self, grid):
        
        #:type grid: List[List[str]]
        #:rtype: int
        
        #dfs
        island_count = 0
        rows,cols = len(grid),len(grid[0])
        land = set()
        stack = []
        #先找到哪些是陸地
        for i in range(rows):
            for j in range(cols):
                if grid[i][j]=='1':
                    land.add((i,j))
        #開始走路!
        while land: #當還有陸地時繼續找
            island_count = island_count+1 #先加一
            stack.append(land.pop()) #從還沒踩過的路遞中隨機找一個點
            while stack: #從這個點開始做dfs
                #如果四周都是海或是沒有可以踩的陸地了就表示這個島嶼走完了
                r,c = stack.pop()
                land.discard((r,c))
                for dr,dc in [(0,1),(1,0),(0,-1),(-1,0)]:
                    if 0<=r+dr<rows and 0<=c+dc<cols and ((r+dr,c+dc) in land):
                        stack.append((r+dr,c+dc))
        
        return island_count
```
但是時間複雜度跟空間複雜度都太多了

### 最終版
修改重點: 直接在grid中操作(0表示不能踩and踩過的地方、1表示還可以進行的地方)，省去一開始記錄land的時間成本和空間成本。

```python
class Solution(object):
    def numIslands(self, grid):
        """
        :type grid: List[List[str]]
        :rtype: int
        """
        #dfs
        island_count = 0
        rows,cols = len(grid),len(grid[0])
        stack = []

        # 歷遍所有數值，如果有1就觸發dfs，dfs過程中經過就換成1
        for i in range(rows):
            for j in range(cols):
                if grid[i][j] == '1':
                    island_count = island_count+1
                    stack.append((i,j))
                    grid[i][j] = '0' 
                    while stack:
                        r,c = stack.pop() 
                        for dr,dc in [(1,0),(0,1),(0,-1),(-1,0)]:
                            if 0<=r+dr<rows and 0<=c+dc<cols and grid[r+dr][c+dc]=='1':
                                stack.append((r+dr,c+dc))
                                grid[r+dr][c+dc] = '0'
        
        return island_count
```