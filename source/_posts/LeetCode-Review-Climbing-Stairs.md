---
title: 'LeetCode Review: No.76(Climbing Stairs)'
date: 2026-06-17 23:48:46
tags: leetcode
categories : 
    - LeetCode Review
---

## 題目連結
<https://leetcode.com/problems/climbing-stairs/description/>

## 版本一: 遞迴
缺點: 耗費太多空間
```python
class Solution(object):
    def climbStairs(self, n):
        """
        :type n: int
        :rtype: int
        """
        step_n = {}
        def steps(m):
            if m<2:
                return 1
            if m in step_n:
                return step_n[m]
            step_n[m] = steps(m-1) + steps(m-2)
            return step_n[m]

        return steps(n)
```

## 版本二: 迴圈(較優解)
整理歸納上下關係 n2=n0+n1,n3=n1+n2以此類推使用迴圈buttom-up計算
省下記錄空間和判斷成本
```python
class Solution(object):
    def climbStairs(self, n):
        """
        :type n: int
        :rtype: int
        """
        #已知n1 = 1 ,n2 = 2 => n3 = n1+n2以此類推bottom-Up
        prev1 = 0
        prev2 = 1
        for i in range (1,n+1):
            cur = prev1+prev2
            prev1 = prev2
            prev2 = cur
        
        return prev2
```