---
title: 'LeetCode Review: Linked List vs. Array'
date: 2026-06-18 11:46:20
tags: leetcode
categories : 
    - LeetCode Review
mathjax: true
---

<iframe 
  src="markmap.html" 
  style="width: 100%; height: 60vh; min-height: 400px; max-height: 800px; border: none; border-radius: 8px;"
  allowfullscreen>
</iframe>

--- 

# Array
## 核心概念
- 電影院裡的連號座位、在記憶體中則是一塊連續的空間。
## 架構與實作
### 內在架構
- 每個位置有固定index
- O(1)時間複雜度查詢固定位置資料
### python實作
- 使用List作Dynamic array
```python
# Array 在 Python 中直接使用 list
my_array = [10, 20, 30, 40]
print(my_array[2])  # 輸出 30 (透過 Index 直接讀取，速度極快)
```
## 使用情境
- 需要頻繁讀取的資料 : 使用index讀取快速
- 資料固定或不需變動 : 像是插入、刪除資料需要耗費較多資源
- 節省記憶體 : 不需耗費額外空間紀錄pointer
## 複雜度
### 時間複雜度
- 隨機讀取: O(n)
- 插入
  - 前: O(n)
  - 中: O(n)
  - 後: O(1)
- 刪除: O(n)

## 常見題型
- 通常考的是「如何不用暴力解（O(N^2)），而在 $ O(N) $ 內解決問題」。
- 雙指針 (Two Pointers)： 題目通常已排序，用前後兩個指標向中間靠攏（如：Two Sum II, 3Sum）。
- 滑動窗口 (Sliding Window)： 找連續子陣列的最大/最小值（如：Minimum Size Subarray Sum）。
---
# Linked List
## 核心概念
- 像是火車車廂，每個節點儲存在不同位置，透過pointer連接起來，有前後關係。
## 架構與實作
### 內在架構
1. val: 此節點儲存的資料
2. next: 下一個節點的位置(pointer)
### python實作
- 必須自訂一類別(class)把他們包起來，並進行連接。
```python
# 1. 定義節點結構
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val       # 儲存數值
        self.next = next     # 指向下一節車廂的指標

# 2. 實作並手動串接： 10 -> 20 -> 30 -> None
node1 = ListNode(10)
node2 = ListNode(20)
node3 = ListNode(30)

node1.next = node2
node2.next = node3

# 3. 走訪 Linked List (必須從頭開始數，無法直接用 index 拿資料)
curr = node1
while curr:
    print(curr.val)
    curr = curr.next
```
## 使用情境
- 需要頻繁在頭部或中間新增刪除的系統(如排隊系統)
- 資料量完全無法預估: 因為array在新增時需要定義一定連續空間
- 經典應用： 實作 Stack (堆疊)、Queue (佇列)，或是高階的 LRU Cache (快取淘汰機制)
## 複雜度
### 時間複雜度
- 隨機讀取: O(n)
- 插入: O(1) 前提是有紀錄前後指標
- 刪除: O(1)
### 空間複雜度
- 較多，需要額外空間存放指標

## 常見題型
- 考試重點: 通常不考高深的數學或複雜邏輯，純粹考你「指針操作的細心度」（面試極愛考，因為寫錯一個 next 就會造成死循環或斷軌）。
- 反轉鏈表 (Reverse Linked List - LC 206)： 將 A -> B -> C 變成 C -> B -> A。考驗你如何用一個 prev 暫存變數去翻轉指針。
- 快慢指針 / 龜兔賽跑 (Slow & Fast Pointers)： * 找中點：快指針一次走兩步，慢指針一次走一步，快指針到終點時，慢指針剛好在中點（Middle of the Linked List - LC 876）。
- 判斷有沒有環：如果鏈表繞成一個圈，快慢指針總有一天會相遇（Linked List Cycle - LC 141）。
- 合併兩個有序鏈表 (Merge Two Sorted Lists - LC 21)： 用一個虛擬頭節點（Dummy Node）沿路把小的節點勾過來。
