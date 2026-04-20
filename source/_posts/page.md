---
title: "Hexo(1) : Installation and Key Configuration"
date: 2026-04-20 11:56:54
tags: hexo
#categories : 
#  - Work Log
#   - week
---

## Hexo是什麼?
是一個基於Node.js的部落格靜態網頁開發框架，使用Markdown（或其他標記語言）解析文章，並快速透過漂亮的主題產生靜態檔案。

## 為什麼使用他?
1. 配合github page建置個人靜態網站
2. 簡單使用markdown語言開發以及簡易的操作流程
3. 方便建置與更新上線

## 相關學習資源?
- hexo & github 記本搭建方式: <https://zhuanlan.zhihu.com/p/60578464>
- Chic主題: <https://github.com/Siricee/hexo-theme-Chic>
 
## 一些基本設定
主要的兩個config檔: myblog/_config.yml & myblog/themes/Chic/_config.yml
1. 設定主題 : 先按照上面Chic主題操作完，於myblog/_config.yml中進行修改
   
   {% asset_img "config_chic.png" "設定主題" %}
2. 標題與圖片 : 於myblog/themes/Chic/_config.yml中進行修改
    
   {% asset_img "config_title_info.png" "首頁標題與圖片設定資訊" %}
3. 接下來有其他更新再新增...


***其他小技巧 :***
- vscode中markdown及時查看 : SHIFT+CTRL+V 
