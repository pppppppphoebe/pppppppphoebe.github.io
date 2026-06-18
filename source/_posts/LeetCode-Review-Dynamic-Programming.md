---
title: 'LeetCode Review: Dynamic Programming'
date: 2026-06-17 16:57:13
tags: leetcode
categories : 
    - LeetCode Review
---

<iframe 
  src="markmap.html" 
  style="width: 100%; height: 60vh; min-height: 400px; max-height: 800px; border: none; border-radius: 8px;"
  allowfullscreen>
</iframe>
---

# 核心概念
- 以空間換時間
- 把大問題拆解成子問題，並記錄下來避免重新計算

# 分解問題框架
- 定義陣列: 儲存子問題的答案
- 狀態轉移方程式: 大小問題之間的關係
- 初始化條件: 條件邊界是什麼
- 確定歷遍順序: Top- Down 還是 Bottom-Up

# 實作方法
## Top-Down
### 遞迴 : 從最大目標一步步拆解問題
### (費式數列為例)
```python
def fib_top_down(n):
    memo = {} #以dictionary記錄每一層費式數列的數值避免重複計算
    def fib(m):
        if m in memo:
            return memo[m] #如果有算過就直接從memo中拿
        if m <= 1:
            return m
        memo[m] = fib(m-1) + fib(m-2)
        return memo[m]
    return fib(n)
```

## Bottom-Up

### 迴圈 : 從最基礎(底層)的已知條件中計算
### 費式數列為例

```python
def fib_bottom_up(n):
    if n<=1:
        return n
    dp = [0]*(n+1) #實際上為優化空間不需要(這邊是為了演示dp做法)
    dp[1] = 1
    for i in range(2,n+1):
        dp[i] = dp[i-1] + dp[i-2]
    
    return dp[n]
```

## Top-Down 和 Bottom-Up 使用上差別
```
【Top-Down (遞迴 + 記憶化)】                【Bottom-Up (迴圈填表)】

       f(5)  (從大問題開始看)                 dp[5]  (最後才算出來)
      /    \                                    ▲
    f(4)   f(3)                                 │  for 迴圈
    /   \                                       │  向上累積
  f(3)  f(2)                                    │
  /  \                                        dp[2] = dp[1] + dp[0]
f(2) f(1)                                     dp[1] = 1
 / \                                          dp[0] = 0
f(1) f(0) (一路向下探底)                      **(從最基礎的已知條件開始)**
```


# 常見題型
## 爬樓梯/路徑問題(Linear/Matrix DP)
- 常見題目： LeetCode 70. Climbing Stairs, LeetCode 62. Unique Paths
- 核心思維： 到達當前格子的方法數 = 到達前幾個可能格子的方法數之和。

## 背包問題(Knapsack Problem)
- 常見題目： LeetCode 322. Coin Change (完全背包), LeetCode 416. Partition Equal Subset Sum (0-1背包)
- 核心思維： 對於每一個物品，我們只有「選」或「不選」兩種抉擇。
    
## 序列、字串對齊問題(Sequence DP)
- 常見題目： LeetCode 300. Longest Increasing Subsequence (LIS), LeetCode 1143. Longest Common Subsequence (LCS)
- 核心思維： 通常需要用雙指針或二維陣列來比較兩個字串的結尾字元是否相同。
    
## 股票買賣、狀態機(StateMachine DP)
- 常見題目： LeetCode 121, 122, 123, 188, 309, 714 (股票系列全集)
- 核心思維： 每一天結束後，你身上只會有特定的幾種「狀態」（例如：手上有股票、手上沒股票）。


# 總結

## 觀察序列間邏輯
### 先在紙上列出 n=1, n=2, n=3 的規律，試圖把狀態轉移方程式寫出來
    
## 推薦刷題順序
### 費氏數列 (509) -> 爬樓梯 (70) -> 不同路徑 (62) -> 打家劫舍 (198) -> 零錢兌換 (322)。