import json
from pathlib import Path
import sys
import os, re, uuid, shutil

from datatrans import pad3

# ★ 改成你的根目錄
ROOT = r"D:\Research\pppppppphoebe.github.io\survey\images"
DATA_JSON   = Path(r"D:\Research\pppppppphoebe.github.io\survey\data.json")
PREFIX = "q"
PAD = 3
DRY_RUN = False  # 先試跑；確認 OK 後改成 False 真的改名

pat = re.compile(rf"^{re.escape(PREFIX)}(\d+)$", re.IGNORECASE)

# Filenames mapping for 5 options inside each source group
OPTION_FILES = {
    "A": "ours.jpg",
    "B": "p_01-09.jpg",
    "C": "p_10-19.jpg",
    "D": "p_30-39.jpg",
    "E": "p_40-49.jpg",
}


def load_existing_title_samples(data_json: Path):
    title = "LOGO x 材質 融合問卷"
    samples = []
    if data_json.exists():
        try:
            with data_json.open("r", encoding="utf-8") as f:
                data = json.load(f)
            title = data.get("title", title)
            samples = data.get("instructionExamples", samples)
        except Exception as e:
            print(f"[WARN] Failed to parse existing data.json: {e}", file=sys.stderr)
    return title, samples

title, samples = load_existing_title_samples(DATA_JSON)
cases = []

# 1) 取得現有 q### 資料夾並依數字排序
entries = []
for name in os.listdir(ROOT):
    full = os.path.join(ROOT, name)
    if os.path.isdir(full):
        m = pat.match(name)
        if m:
            entries.append((int(m.group(1)), name))
entries.sort(key=lambda x: x[0])

# 2) 產生目標名稱（連號）
targets = []
for i, (_, old_name) in enumerate(entries, start=1):
    qid = f"q{pad3(i)}"
    new_name = f"{PREFIX}{i:0{PAD}d}"
    targets.append((old_name, new_name))
    case = {
        "id": qid,
        "material": f"images/{qid}/texture.jpg",
        "logo":     f"images/{qid}/logo.jpg",
        "options": [
            {"value": "A", "image": f"images/{qid}/{OPTION_FILES['A']}"},
            {"value": "B", "image": f"images/{qid}/{OPTION_FILES['B']}"},
            {"value": "C", "image": f"images/{qid}/{OPTION_FILES['C']}"},
            {"value": "D", "image": f"images/{qid}/{OPTION_FILES['D']}"},
            {"value": "E", "image": f"images/{qid}/{OPTION_FILES['E']}"},
        ]
    }
    cases.append(case)

if not targets:
    print("沒有找到要處理的 q### 資料夾。")
    raise SystemExit

# 顯示規劃
print("Renaming plan:")
for old, new in targets:
    mark = " (skip)" if old == new else ""
    print(f"  {old} -> {new}{mark}")

if DRY_RUN:
    print("\nDRY_RUN=True：僅顯示規劃，不會實際改名。把 DRY_RUN 改為 False 後再跑一次。")
    raise SystemExit

# 3) 兩段式改名：先改成暫名，避免衝突；再改成最終名
temp_map = {}
for old, new in targets:
    if old == new:
        continue
    src = os.path.join(ROOT, old)
    tmp = os.path.join(ROOT, f"__tmp__{uuid.uuid4().hex[:8]}__{old}")
    os.rename(src, tmp)
    temp_map[tmp] = os.path.join(ROOT, new)

# 第二段：暫名 -> 最終名（若新名已存在則先刪空/報錯）
for tmp, final in temp_map.items():
    if os.path.exists(final):
        # 如果不希望覆蓋就改成 raise
        raise FileExistsError(f"目標已存在：{final}")
    os.rename(tmp, final)

data = {"title": title, "instructionExamples": samples, "cases": cases}
DATA_JSON.parent.mkdir(parents=True, exist_ok=True)
with DATA_JSON.open("w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print("完成！")