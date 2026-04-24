-- ============================================
-- 台南吃什麼 - 種子資料
-- 資料庫初始化 SQL
-- 包含 40 家台南經典餐廳
-- ============================================

-- 先清空舊資料（重新匯入時用）
TRUNCATE restaurant_categories, categories, restaurants RESTART IDENTITY CASCADE;

-- ============================================
-- 1. Categories（分類）
-- ============================================
INSERT INTO categories (name) VALUES
('牛肉湯'),
('傳統小吃'),
('鹹粥'),
('冰品甜點'),
('冰品飲料'),
('傳統餅舖'),
('伴手禮'),
('早餐'),
('宵夜'),
('海鮮粥'),
('熱炒'),
('炸物'),
('手搖飲料'),
('日式料理'),
('台式合菜'),
('火鍋'),
('速食');

-- ============================================
-- 2. Restaurants（餐廳）
-- 座標來源：OpenStreetMap Nominatim API
-- ============================================
INSERT INTO restaurants (name, address, opening_hours, location, google_maps_url, rating, review_count) VALUES
('文章牛肉湯', '台南市中西區民族路三段12號', '04:30-14:00 (週二休)', POINT(120.1697073, 22.9987295), 'https://maps.google.com/?q=文章牛肉湯+台南', 4.5, 1250),
('六千牛肉湯', '台南市中西區海安路一段63號', '05:00-09:00 (售完為止)', POINT(120.1947818, 22.9891834), 'https://maps.google.com/?q=六千牛肉湯+台南', 4.6, 1800),
('阿堂鹹粥', '台南市中西區西門路一段728號', '05:00-11:30 (週二休)', POINT(120.1979525, 22.9899355), 'https://maps.google.com/?q=阿堂鹹粥+台南', 4.3, 950),
('阿明豬心冬粉', '台南市中西區保安路72號', '17:30-00:00', POINT(120.1975, 22.9930), 'https://maps.google.com/?q=阿明豬心冬粉+台南', 4.4, 800),
('葉家小卷米粉', '台南市中西區國華街三段24號', '11:00-18:00 (售完為止)', POINT(120.1969856, 22.9910809), 'https://maps.google.com/?q=葉家小卷米粉+台南', 4.3, 700),
('矮仔成蝦仁飯', '台南市中西區海安路一段66號', '07:00-19:30 (週四休)', POINT(120.1952418, 22.9890071), 'https://maps.google.com/?q=矮仔成蝦仁飯+台南', 4.2, 600),
('阿松割包', '台南市中西區國華街三段181號', '08:00-17:00 (週一休)', POINT(120.1989068, 22.9975859), 'https://maps.google.com/?q=阿松割包+台南', 4.2, 500),
('金得春捲', '台南市中西區民族路三段19號', '08:30-17:30 (週四休)', POINT(120.1990649, 22.9976235), 'https://maps.google.com/?q=金得春捲+台南', 4.3, 650),
('江水號八寶冰', '台南市中西區國華街三段16巷13號', '12:00-21:00', POINT(120.1970, 22.9912), 'https://maps.google.com/?q=江水號八寶冰+台南', 4.3, 550),
('富盛號碗粿', '台南市中西區民族路三段11號', '07:00-17:30 (週四休)', POINT(120.1992343, 22.9975711), 'https://maps.google.com/?q=富盛號碗粿+台南', 4.2, 750),
('邱家小卷米粉', '台南市中西區國華街三段5號', '11:30-17:00 (售完為止)', POINT(120.1970, 22.9915), 'https://maps.google.com/?q=邱家小卷米粉+台南', 4.3, 600),
('武廟肉圓', '台南市中西區永福路二段194號', '13:30-18:30 (週二休)', POINT(120.2020, 22.9970), 'https://maps.google.com/?q=武廟肉圓+台南', 4.2, 400),
('連得堂餅舖', '台南市中西區崇安街54號', '09:00-17:00 (售完為止)', POINT(120.2010, 22.9960), 'https://maps.google.com/?q=連得堂餅舖+台南', 4.4, 350),
('修安扁擔豆花', '台南市中西區國華街三段157號', '08:00-21:30', POINT(120.1985, 22.9970), 'https://maps.google.com/?q=修安扁擔豆花+台南', 4.2, 450),
('赤崁棺材板', '台南市中西區康樂街180號', '11:00-21:00', POINT(120.1960, 22.9940), 'https://maps.google.com/?q=赤崁棺材板+台南', 4.0, 500),
('度小月擔仔麵（本店）', '台南市中西區中正路16號', '11:00-21:00', POINT(120.1990, 22.9920), 'https://maps.google.com/?q=度小月擔仔麵本店+台南', 4.1, 900),
('鄭記𩵚魠魚羹', '台南市中西區國華街三段30號', '08:00-19:00 (售完為止)', POINT(120.1972, 22.9913), 'https://maps.google.com/?q=鄭記𩵚魠魚羹+台南', 4.2, 450),
('莉莉水果店', '台南市中西區府前路一段199號', '11:00-23:00', POINT(120.2000, 22.9900), 'https://maps.google.com/?q=莉莉水果店+台南', 4.1, 700),
('保哥黑輪', '台南市中西區府前路一段196巷26號', '11:30-20:30 (週三休)', POINT(120.2005, 22.9905), 'https://maps.google.com/?q=保哥黑輪+台南', 4.1, 300),
('太陽牌冰品', '台南市中西區民權路一段41號', '10:00-21:00', POINT(120.2020, 22.9930), 'https://maps.google.com/?q=太陽牌冰品+台南', 4.2, 500),
('開元路無名虱目魚湯', '台南市北區開元路307號', '04:30-13:30 (售完為止)', POINT(120.2120, 23.0050), 'https://maps.google.com/?q=開元路無名虱目魚湯+台南', 4.5, 650),
('阿裕牛肉湯', '台南市仁德區中正路一段525號', '06:00-14:00 / 17:00-22:00 (週一休)', POINT(120.2510, 22.9700), 'https://maps.google.com/?q=阿裕牛肉湯+台南', 4.6, 1500),
('糯夫米糕', '台南市中西區府前路一段359巷22號', '11:00-14:00 (週三休，售完為止)', POINT(120.2015, 22.9908), 'https://maps.google.com/?q=糯夫米糕+台南', 4.4, 400),
('福記肉圓', '台南市中西區府前路一段215號', '09:00-18:30 (售完為止)', POINT(120.2002, 22.9902), 'https://maps.google.com/?q=福記肉圓+台南', 4.2, 350),
('進福大灣花生糖', '台南市中西區民族路二段287號', '09:00-21:30', POINT(120.2005, 22.9965), 'https://maps.google.com/?q=進福大灣花生糖+台南', 4.3, 300),
('勝利早點', '台南市東區勝利路79號', '17:00-11:00 (隔日)', POINT(120.2150, 22.9980), 'https://maps.google.com/?q=勝利早點+台南', 4.1, 800),
('丹丹漢堡（成功店）', '台南市北區成功路380號', '06:30-21:00', POINT(120.2080, 23.0020), 'https://maps.google.com/?q=丹丹漢堡成功店+台南', 4.3, 2000),
('一允堂海鮮粥', '台南市中西區民族路三段18號', '17:00-00:00', POINT(120.1995, 22.9978), 'https://maps.google.com/?q=一允堂海鮮粥+台南', 4.1, 400),
('小杜意麵', '台南市中西區友愛街143號', '16:00-01:00', POINT(120.1978, 22.9918), 'https://maps.google.com/?q=小杜意麵+台南', 4.2, 500),
('友愛街鹹酥雞', '台南市中西區友愛街206巷6號', '16:00-00:00', POINT(120.1975, 22.9915), 'https://maps.google.com/?q=友愛街鹹酥雞+台南', 4.2, 600),
('裕成水果店', '台南市中西區民生路一段122號', '12:00-23:00', POINT(120.1998, 22.9935), 'https://maps.google.com/?q=裕成水果店+台南', 4.3, 550),
('奉茶（本店）', '台南市中西區公園路47號', '10:00-22:00', POINT(120.2030, 22.9950), 'https://maps.google.com/?q=奉茶+台南公園路', 4.1, 300),
('順天冰棒', '台南市中西區開山路315號', '09:00-21:00', POINT(120.2040, 22.9880), 'https://maps.google.com/?q=順天冰棒+台南', 4.2, 250),
('鬍鬚忠牛肉湯', '台南市中西區民族路三段6號', '17:00-04:00', POINT(120.1998, 22.9975), 'https://maps.google.com/?q=鬍鬚忠牛肉湯+台南', 4.3, 500),
('石精臼蚵仔煎', '台南市中西區國華街三段180號', '11:00-20:00', POINT(120.1988, 22.9973), 'https://maps.google.com/?q=石精臼蚵仔煎+台南', 4.1, 350),
('原永林牛肉湯', '台南市東區中華東路三段180號', '07:00-14:00 / 17:00-22:00', POINT(120.2250, 22.9790), 'https://maps.google.com/?q=原永林牛肉湯+台南', 4.4, 600),
('水仙宮米糕', '台南市中西區民權路三段77號', '10:00-18:00 (售完為止)', POINT(120.1965, 22.9972), 'https://maps.google.com/?q=水仙宮米糕+台南', 4.2, 400),
('下大道蘭米糕', '台南市中西區西門路一段770號', '09:00-18:00 (週一休)', POINT(120.1960, 22.9910), 'https://maps.google.com/?q=下大道蘭米糕+台南', 4.2, 350),
('阿美飯店', '台南市中西區民權路二段98號', '11:00-14:00 / 17:00-21:00', POINT(120.1980, 22.9925), 'https://maps.google.com/?q=阿美飯店+台南', 4.3, 700),
('山根壽司', '台南市中西區民族路二段357號', '12:00-14:30 / 17:00-21:30 (週三休)', POINT(120.2010, 22.9970), 'https://maps.google.com/?q=山根壽司+台南', 4.1, 600);

-- ============================================
-- 3. Restaurant_Categories（餐廳與分類的關係）
-- ============================================
-- 餐廳 ID 1-40，分類 ID 1-17

-- 文章牛肉湯 → 牛肉湯, 傳統小吃
INSERT INTO restaurant_categories (restaurant_id, category_id) VALUES (1, 1), (1, 2);
-- 六千牛肉湯 → 牛肉湯, 傳統小吃
INSERT INTO restaurant_categories (restaurant_id, category_id) VALUES (2, 1), (2, 2);
-- 阿堂鹹粥 → 鹹粥, 傳統小吃
INSERT INTO restaurant_categories (restaurant_id, category_id) VALUES (3, 3), (3, 2);
-- 阿明豬心冬粉 → 傳統小吃
INSERT INTO restaurant_categories (restaurant_id, category_id) VALUES (4, 2);
-- 葉家小卷米粉 → 傳統小吃
INSERT INTO restaurant_categories (restaurant_id, category_id) VALUES (5, 2);
-- 矮仔成蝦仁飯 → 傳統小吃
INSERT INTO restaurant_categories (restaurant_id, category_id) VALUES (6, 2);
-- 阿松割包 → 傳統小吃
INSERT INTO restaurant_categories (restaurant_id, category_id) VALUES (7, 2);
-- 金得春捲 → 傳統小吃
INSERT INTO restaurant_categories (restaurant_id, category_id) VALUES (8, 2);
-- 江水號八寶冰 → 冰品甜點
INSERT INTO restaurant_categories (restaurant_id, category_id) VALUES (9, 4);
-- 富盛號碗粿 → 傳統小吃
INSERT INTO restaurant_categories (restaurant_id, category_id) VALUES (10, 2);
-- 邱家小卷米粉 → 傳統小吃
INSERT INTO restaurant_categories (restaurant_id, category_id) VALUES (11, 2);
-- 武廟肉圓 → 傳統小吃
INSERT INTO restaurant_categories (restaurant_id, category_id) VALUES (12, 2);
-- 連得堂餅舖 → 傳統餅舖, 伴手禮
INSERT INTO restaurant_categories (restaurant_id, category_id) VALUES (13, 6), (13, 7);
-- 修安扁擔豆花 → 冰品甜點
INSERT INTO restaurant_categories (restaurant_id, category_id) VALUES (14, 4);
-- 赤崁棺材板 → 傳統小吃
INSERT INTO restaurant_categories (restaurant_id, category_id) VALUES (15, 2);
-- 度小月擔仔麵（本店） → 傳統小吃
INSERT INTO restaurant_categories (restaurant_id, category_id) VALUES (16, 2);
-- 鄭記𩵚魠魚羹 → 傳統小吃
INSERT INTO restaurant_categories (restaurant_id, category_id) VALUES (17, 2);
-- 莉莉水果店 → 冰品飲料
INSERT INTO restaurant_categories (restaurant_id, category_id) VALUES (18, 5);
-- 保哥黑輪 → 傳統小吃
INSERT INTO restaurant_categories (restaurant_id, category_id) VALUES (19, 2);
-- 太陽牌冰品 → 冰品甜點
INSERT INTO restaurant_categories (restaurant_id, category_id) VALUES (20, 4);
-- 開元路無名虱目魚湯 → 早餐, 傳統小吃
INSERT INTO restaurant_categories (restaurant_id, category_id) VALUES (21, 8), (21, 2);
-- 阿裕牛肉湯 → 牛肉湯, 火鍋
INSERT INTO restaurant_categories (restaurant_id, category_id) VALUES (22, 1), (22, 16);
-- 糯夫米糕 → 傳統小吃
INSERT INTO restaurant_categories (restaurant_id, category_id) VALUES (23, 2);
-- 福記肉圓 → 傳統小吃
INSERT INTO restaurant_categories (restaurant_id, category_id) VALUES (24, 2);
-- 進福大灣花生糖 → 伴手禮
INSERT INTO restaurant_categories (restaurant_id, category_id) VALUES (25, 7);
-- 勝利早點 → 早餐, 宵夜
INSERT INTO restaurant_categories (restaurant_id, category_id) VALUES (26, 8), (26, 9);
-- 丹丹漢堡（成功店） → 速食
INSERT INTO restaurant_categories (restaurant_id, category_id) VALUES (27, 17);
-- 一允堂海鮮粥 → 海鮮粥, 熱炒
INSERT INTO restaurant_categories (restaurant_id, category_id) VALUES (28, 10), (28, 11);
-- 小杜意麵 → 傳統小吃, 宵夜
INSERT INTO restaurant_categories (restaurant_id, category_id) VALUES (29, 2), (29, 9);
-- 友愛街鹹酥雞 → 炸物, 宵夜
INSERT INTO restaurant_categories (restaurant_id, category_id) VALUES (30, 12), (30, 9);
-- 裕成水果店 → 冰品甜點
INSERT INTO restaurant_categories (restaurant_id, category_id) VALUES (31, 4);
-- 奉茶（本店） → 手搖飲料
INSERT INTO restaurant_categories (restaurant_id, category_id) VALUES (32, 13);
-- 順天冰棒 → 冰品甜點
INSERT INTO restaurant_categories (restaurant_id, category_id) VALUES (33, 4);
-- 鬍鬚忠牛肉湯 → 牛肉湯, 宵夜
INSERT INTO restaurant_categories (restaurant_id, category_id) VALUES (34, 1), (34, 9);
-- 石精臼蚵仔煎 → 傳統小吃
INSERT INTO restaurant_categories (restaurant_id, category_id) VALUES (35, 2);
-- 原永林牛肉湯 → 牛肉湯, 火鍋
INSERT INTO restaurant_categories (restaurant_id, category_id) VALUES (36, 1), (36, 16);
-- 水仙宮米糕 → 傳統小吃
INSERT INTO restaurant_categories (restaurant_id, category_id) VALUES (37, 2);
-- 下大道蘭米糕 → 傳統小吃
INSERT INTO restaurant_categories (restaurant_id, category_id) VALUES (38, 2);
-- 阿美飯店 → 台式合菜
INSERT INTO restaurant_categories (restaurant_id, category_id) VALUES (39, 15);
-- 山根壽司 → 日式料理
INSERT INTO restaurant_categories (restaurant_id, category_id) VALUES (40, 14);
