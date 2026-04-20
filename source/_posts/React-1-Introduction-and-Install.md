---
title: 'React(1) : Introduction and Install'
date: 2026-04-20 17:53:33
tags: React
categories: React
---

## React 是什麼?
- 是一個用來建構使用者介面的函式庫
- 負責 Component (組件化)、State (狀態管理) 和 DOM 的更新機制 (Virtual DOM)
## 我為何學習 React?
1. **多元應用情境** 

    因為React不是框架並且可以和其他函式庫與web技術共同使用，例如搭配ReactDOM渲染網頁、ReactNative建立手機應用程式、React360建立VR應用程式等，除此之外還有很多應用。

2. **專案維護與效能** 
   
    此外，React 的**元件化(Component)設計** 讓程式碼更容易維護與重複使用，搭配 Virtual DOM 能提升效能與使用者體驗。

3. **生態系與社群支持**
   
    再加上龐大的生態系與社群支持，React 幾乎可以應用在各種前端開發場景，從個人專案到大型企業系統都十分合適。


## 建構工具(框架) : Vite

由於 React 使用 **JSX** 語法，瀏覽器無法直接理解，因此需要透過 建構工具或框架（例如 Vite、Webpack）將 JSX 轉換成原生 JavaScript 才能執行。這裡練習選擇 Vite 作為建構工具，它是目前最主流的選擇，具有啟動速度快、熱更新迅速、設定簡單等優點，非常適合用來建立 React 專案。

## 安裝

### Vite建構一個新專案
參考來源 : <https://cn.vite.dev/guide/>

- 在目標資料夾下cmd建置 : 
    ```npm create vite@latest```

- 以下是本次測試專案使用技術紀錄:
{% asset_img "web_config.png" "vite install config record" %}

- 進入到專案資料夾後，安裝套件:
    ```npm install```

- 開發模式，預覽網站目前效果:
    ```npm run dev```

- 打包專案，產生正式上線用的檔案: 
    ```npm run build```

- 模擬正式環境，預覽打包後的結果:
    ```npm run preview```



***(小補充) 為何要打包?***

1. 瀏覽器相容性  
React 使用 JSX、ES6+ 語法，瀏覽器不能直接理解，需要透過 Babel/Vite/Webpack 等工具轉換成原生 JavaScript。

2. 模組整合  
開發時程式碼通常拆成很多檔案（components、utils…），打包工具會把它們合併成少數幾個檔案，方便瀏覽器載入。

3. 效能優化  
打包過程會壓縮程式碼（minify）、移除沒用到的程式（tree-shaking）、壓縮圖片或 CSS，讓網頁載入更快。

4. 資源管理  
打包工具會幫你處理 CSS、圖片、字型等資源，並生成正確的路徑，避免手動管理的麻煩。

5. 部署需要  
開發環境的檔案不能直接放到伺服器上跑，打包後才會生成「正式環境可用的檔案」，例如 dist/ 資料夾。