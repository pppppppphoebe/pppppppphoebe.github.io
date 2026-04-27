---
title: 'Tainan Restaurant Decision(3): Backend'
date: 2026-04-24 12:35:00
tags: Side Project
categories: [Side Project,Tainan Restaurant Decision]
---

### 後端server設計 : ASP.NET

#### 需要server來做什麼?

- 通過website->postgres可能會發生的問題: 
  - 所有人都看的到我的資料庫帳密
  - 所有人都可以存取我資料庫
  - 所有人都可以修改資料內容

- 改成Website->server->postgres的好處是....?
  - 資料庫帳號密碼只在後端，使用者看不到
  - 你決定哪些 API 可以呼叫
  - 你可以過濾、驗證資料
  - 你可以控制存取權限

#### 為甚麼用ASP.NET?
- 大企業常用
- 專案結構清楚
- 強型別、效率較高

### 開始建置~

1. 安裝ASP.NET:
   - .NET SDK（軟體開發工具包）是一套免費開源的工具和函式庫，用於建立和運行使用 C# 的應用程式。
   - 下載 : <https://dotnet.microsoft.com/en-us/learn/aspnet/blazor-tutorial/install> 

2. 建立.NET專案，在資料夾中開啟cmd輸入:
   ```dotnet new webapi -n TainanBackend``` 

3. 建立完畢後資料夾內會有以下這些內容 :
   {%asset_img "dotnet_install.png" ".net初創檔案內容"%}  

4. 測試專案是否可以建置並運行:
   ```doetnet run```
   {%asset_img "dotnet_test_run.png" "測試.net初創專案是否可以成功運行"%} 

5. 安裝 Entity Framework Core
   - 目的:
     - Npgsql.EntityFrameworkCore.PostgreSQL : EF -> SQL 與PostgreSQL 溝通
     - Microsoft.EntityFrameworkCore.Design : 開發時幫你寫程式的助手(待釐清)
    ```cmd
    dotnet add package Npgsql.EntityFrameworkCore.PostgreSQL
    dotnet add package Microsoft.EntityFrameworkCore.Design
    ``` 

6. 在程式碼內連接資料庫 :
   -  Program.cs（伺服器收到請求）
   -  RestaurantsController.cs（決定要做什麼）
   -  AppDbContext.cs（翻譯成 SQL）
   -  appsettings.json (設定連線資料庫參數)
 
7. 先在本地測試連接
   
8. 撰寫Dockerfile並推到Github上
   
   ```dockerfile
    FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
    WORKDIR /src
    COPY . .
    RUN dotnet publish -c Release -o /app

    FROM mcr.microsoft.com/dotnet/aspnet:10.0
    WORKDIR /app
    COPY --from=build /app .
    ENV ASPNETCORE_URLS=http://+:8080
    ENTRYPOINT ["dotnet", "TainanBackend.dll"]``` 

9.  在Render上建置設定website service  
  