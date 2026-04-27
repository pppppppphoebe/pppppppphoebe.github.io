---
title: 'Tainan Restaurant Decision(1): Fetch restaurant details'
date: 2026-04-22 18:49:10
tags: Side Project
categories: [Side Project,Tainan Restaurant Decision]
---

### 介紹我的Side Project
不論是來台南旅遊的遊客，或是居住在台南的居民，如果午餐或晚餐一時不知道該吃什麼，不妨打開這個拉霸機，隨機抽取餐廳作為參考。

### 餐廳資料來源
- 需要資料 : **餐廳名稱、地址、電話、google map連結、營業時間、一張縮圖**
- 2026-4-22紀錄 : 我先讓OpenClaw想辦法幫我取得。
- 2026-4-23紀錄 : OpenClaw需要Google Map API有連線費用限制，印此先用目前抓到的四十筆資料來做測試。
- 2026-4-23紀錄 : 透先暫時透過OpenClaw抓取所有ERM需要的資料以及生成SQL Insert。

### 資料庫選擇 : PostgreSQL
- 選擇用SQL的原因 : 
    需要 ID + 餐廳資料結構固定 + 未來可能要做篩選/排序(複雜操作)
- 相比於MySQL，有擴增套件PostGIS能讓資料庫能直接處理地理資訊。 

### ERM(Entity Relationship Model)

1. 確認核心資料
   - 目前主要核心實體是**餐廳**
2. 定義欄位
   - 實體有哪些屬性
   - 欄位 : 
     - ID
     - 餐廳名稱(name)
     - 地址(address)
     - 營業時間(opening_hours)
     - 座標(location)
     - 種類(category)
     - 連結(google_maps_url)
     - 評分(rating)
     - 評價人數(review_count)
  
3. Primary Key確保每筆資料獨立 : ID
4. Normalization正規化 :
   - 1NF : 分類欄位可能有多值 (ex. 台南小吃、早餐...)
   - 2026-4-23暫定table
5. Schema 設計
   1. 餐廳表 (Restaurants Table)
    ```sql
    CREATE TABLE restaurants (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        address TEXT NOT NULL,
        opening_hours TEXT,
        location POINT,
        google_maps_url TEXT,
        rating DECIMAL(3,2),
        review_count INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    ```
   2. 分類表 (Categories Table)
    ```sql
    CREATE TABLE categories (
        id SERIAL PRIMARY KEY,
        name VARCHAR(50) UNIQUE NOT NULL
    );
    ```
   3. 餐廳-分類關係表 (Relationship Table)
    ```sql
    CREATE TABLE restaurant_categories (
        restaurant_id INT REFERENCES restaurants(id),
        category_id INT REFERENCES categories(id),
        PRIMARY KEY (restaurant_id, category_id)
    );
    ```

### 資料庫建置
考慮到求職要展示，可能還是需要雲端伺服器來提供後端服務。
- 2026-4-23紀錄 : 暫時用render作為資料庫以及後端的雲端伺服器平台。
- 使用dbeaver來連接控制雲端資料庫，下載連結: <https://dbeaver.io/download/>
- 2026-4-24紀錄 : 資料上傳與schema建置完畢。