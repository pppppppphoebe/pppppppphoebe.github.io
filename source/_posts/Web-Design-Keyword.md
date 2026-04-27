---
title: Web Design Keyword
date: 2026-04-21 20:19:46
tags: web
categories: Basic Knowledge
---
## 前端/後端

- **為甚麼要分前後端?** 
    前後端分離的目的是**分離職責、提升 安全性**，並且讓**資料流更清晰**。前端專注於使用者體驗與介面呈現，後端則負責資料處理與系統效能，兩者協作能讓網站更穩定、可維護。
  
- Frontend : 前端相關技術會在後面詳細說明。
  
- Backend
  - 資料庫 : 設計與維護資料庫，確保資料正確與安全。 
  - 效能與擴展 : 大型網站需要考慮伺服器效能、負載平衡、快取機制。
  - API介面 : 提供前端提取資料的介面，通常使用 RESTful API 或 GraphQL。
  - 安全性 : 處理使用者驗證、授權、資料加密，避免SQL Injection、XSS等攻擊。
  - 商業邏輯 : 負責核心功能的運算比如 : 訂單查詢、會員系統。

## Frontend Skills

### UI/UX (User Interface/User Experience)
- UI : 視覺排版，包含顏色、字體、形狀、按鈕位置等。
- UX : 操作流暢性、網頁結構層級、動線等等，可能會影響SEO成效。

### RWD (Responsive Web Design)
網頁可以依據使用者使用裝置來調整網頁排版以及元件大小，同時也是SEO關鍵因素之一。

### HTML、CSS、JS
- HTML : 網站的結構語言，包含文字、連結、圖片等等。
- CSS : 負責美化與排版，包含顏色、間距、大小、版面等視覺效果。 
- JS : 是一種強大得網頁標記語言，可以撰寫一些互動性功能，比如表單驗證、滑動、動畫效果等等。

### DOM (Document Object Model)
將文件結構(如:HTML)表示到記憶體中，以此連結網頁到腳本或程式設計語言，以下大概是DOM與HTML、CSS、JS的關係。
{%asset_img "image.png" "DOM與HTML、CSS、JSS關係圖"%}

### Framework?
- 基本上就是一組定義好的規範，讓使用者可以快速開發需要的功能、建構網站。
- 目的 : 提升開發效率、維護性、可擴展性。
- 有哪些工具?
  - 前端框架：專注於使用者介面（UI/UX），如 React、Vue、Angular。
  - 後端框架：專注於伺服器邏輯與資料處理，如 Django、Ruby on Rails、Spring。
  - 全端框架：同時涵蓋前後端功能，如 Next.js、Nuxt.js。

### SEO (Search Engine Optimization)
- 讓網站在搜尋結果中排名更高，更容易被使用者點擊。

- 以下是一些關於SEO的策略
  - 站內 SEO：
    - 關鍵字研究與佈局（標題、內文、圖片 ALT）。
    - 網站結構清晰（H1/H2 標題、內部連結）。
    - 技術優化（速度、響應式設計、XML Sitemap）。
  - 站外 SEO：
    - 外部連結建設（高品質反向連結）。
    - 品牌信號（社交媒體討論度、曝光率）。
  - 內容 SEO：
    - 原創且有價值的內容，符合使用者搜尋意圖。
    - 定期更新，保持網站活躍。

### 網站規劃相關流程

- Wireframe : 簡易的排版設計規劃，包含按鈕位置與簡單的文字位置。
- Mockup : 實際設計產物，包含美術視覺呈現。
- Prototype : 進階網站規劃手法，透過設計工具（如Figma、Adobe XD）將靜態的Mockup轉化成可操作的互動模型，模擬網站上線後點擊流程，驗證導覽路徑是否符合使用者習慣。 
- 切版(Slicing) : 就是把設計稿「做成真的網站畫面」，這個階段會關係到網站的版面是否與設計圖一致、是否具備響應式RWD效果。切版階段通常也包含基本的動態效果（如滑鼠滑過變色、下拉選單展開等），是將靜態視覺具體化成為可以互動的第一步。

## Other Key Word

### CI/CD (Continuous Intergation/ Continuous Deployment)
- CI
  - 開發者頻繁提交程式碼到版本控制平台
  - 自動化流程進行建置(build)&測試(test)
  - 確保程式碼可以正確執行避免合併錯誤
- CD
  - 程式碼經過測試後，自動部屬到正式環境。
  - 包含:Release(發布)、Deploy(部屬)、Operate(運行)、Monitor(監視)
- 流程 : 
  - Plan：釐清需求。
  - Code：撰寫程式。
  - Build：建置程式碼（Webpack、Maven、Gradle）。
  - Test：執行單元測試、自動化測試。
  - Release：發佈版本。
  - Deploy：部署到伺服器（AWS、GCP、Docker、Kubernetes）。
  - Monitor：持續監控服務狀態。

### IDE (Integrated Development Environment)
是一種軟體開發工具，將編輯器、編譯器、除錯器等功能整合到同一個介面中。

### CRUD (Create / Read / Update / Delete)
CRUD 是資料操作的四大基本功能，分別代表 Create（建立）、Read（讀取）、Update（更新）、Delete（刪除）。它是幾乎所有資料庫與後端系統的核心操作模式。

- 資料庫操作：SQL 語句通常對應 CRUD
  - INSERT → Create
  - SELECT → Read
  - UPDATE → Update
  - DELETE → Delete
 
- RESTful API：HTTP 方法對應 CRUD
  - POST → Create
  - GET → Read
  - PUT / PATCH → Update
  - DELETE → Delete
 
- 前端應用：表單提交、新增/編輯/刪除功能都依循 CRUD。以下以會員系統舉例說明。
  - Create：註冊新帳號 → POST /users
  - Read：查看使用者清單 → GET /users
  - Update：修改使用者資料 → PUT /users/{id}
  - Delete：刪除使用者 → DELETE /users/{id}


### SQL & noSQL