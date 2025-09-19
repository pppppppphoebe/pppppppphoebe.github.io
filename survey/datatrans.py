"""
Build SurveyJS images folder structure and data.json
- Scans source groups like {logoName}_{textureName} under src_root
- Copies 5 option images + logo.jpg + texture.jpg into /images/q001 ... qNNN
- Generates/updates data.json (preserving "title" and "samples" if existing)

Usage:
  1) Edit the CONFIG section below to match your local paths.
  2) Run: python build_survey_dataset.py
"""

import json
import shutil
import sys
from pathlib import Path

# ========== CONFIG (EDIT ME) ==========
# Source folders: each folder is named {logo}_{texture} and contains 5 images
SRC_ROOT   = Path(r"C:\Users\PC18\Desktop\表單圖片\question_img")
# Logo and texture repositories
LOGO_ROOT  = Path(r"D:\Research\structure-texture-fusion\images\logo")
TEX_ROOT   = Path(r"D:\Research\structure-texture-fusion\images\texture")
# Destination in your web repo
DEST_IMAGES = Path(r"D:\Research\pppppppphoebe.github.io\survey\images")
DATA_JSON   = Path(r"D:\Research\pppppppphoebe.github.io\survey\data.json")

# Filenames mapping for 5 options inside each source group
OPTION_FILES = {
    "A": "ours.jpg",
    "B": "p_01-09.jpg",
    "C": "p_10-19.jpg",
    "D": "p_30-39.jpg",
    "E": "p_40-49.jpg",
}

# Acceptable extensions when searching logo/texture if .jpg not found
FALLBACK_EXTS = [".jpg", ".jpeg", ".png", ".webp"]
# =====================================
def resolve_stems_by_existing_files(folder_name: str, logo_dir: Path, tex_dir: Path):
    """
    folder_name: e.g. "my_super_logo_texture_v2_light_gray"
    會嘗試每個底線切點：
      "my" | "super_logo_texture_v2_light_gray"
      "my_super" | "logo_texture_v2_light_gray"
      ...
    並用 find_first() 去 logo_dir / tex_dir 找實際檔案（.jpg/.jpeg/.png/.webp）
    回傳 (logo_stem, texture_stem, found_score)
      found_score: 2=兩邊都找到、1=找到一邊、0=都找不到
    """
    parts = folder_name.split("_")
    best = (parts[0], "_".join(parts[1:]), -1)  # 預設用第一個切點
    for i in range(1, len(parts)):  # i 是切點位置，左邊至少一段、右邊至少一段
        logo_stem = "_".join(parts[:i])
        tex_stem  = "_".join(parts[i:])
        score = 0
        if find_first(logo_dir, logo_stem): score += 1
        if find_first(tex_dir,  tex_stem):  score += 1
        # 先選 score 高的；分數相同就選較長的 logo_stem（通常較接近實名）
        best_logo, best_tex, best_score = best
        if (score > best_score) or (score == best_score and len(logo_stem) > len(best_logo)):
            best = (logo_stem, tex_stem, score)
            if score == 2:  # 已經兩邊都命中，直接可以用
                break
    return best  # (logo_stem, tex_stem, score)

def pad3(i: int) -> str:
    return f"{i:03d}"


def find_first(base: Path, stem: str):
    """Return first existing file in base with any of FALLBACK_EXTS"""
    for ext in FALLBACK_EXTS:
        p = base / f"{stem}{ext}"
        if p.exists():
            return p
    return None


def load_existing_title_samples(data_json: Path):
    title = "LOGO x 材質 融合問卷"
    samples = []
    if data_json.exists():
        try:
            with data_json.open("r", encoding="utf-8") as f:
                data = json.load(f)
            title = data.get("title", title)
            samples = data.get("samples", samples)
        except Exception as e:
            print(f"[WARN] Failed to parse existing data.json: {e}", file=sys.stderr)
    return title, samples


def main():
    if not SRC_ROOT.exists():
        print(f"[ERR] SRC_ROOT not found: {SRC_ROOT}")
        sys.exit(1)

    DEST_IMAGES.mkdir(parents=True, exist_ok=True)

    title, samples = load_existing_title_samples(DATA_JSON)

    groups = sorted([d for d in SRC_ROOT.iterdir() if d.is_dir()], key=lambda p: p.name.lower())
    if not groups:
        print(f"[ERR] No group folders in {SRC_ROOT}")
        sys.exit(1)

    cases = []
    for idx, g in enumerate(groups, start=1):
        qid = f"q{pad3(idx)}"
        out_dir = DEST_IMAGES / qid
        out_dir.mkdir(parents=True, exist_ok=True)

        name = g.name
        if "_" not in name:
            print(f"[WARN] Skip (no underscore): {name}")
            continue

        # split only at first underscore: logo_stem, texture_stem(with underscores kept)
        #logo_stem, texture_stem = name.split("_", 1)
        logo_stem, texture_stem, hit = resolve_stems_by_existing_files(name, LOGO_ROOT, TEX_ROOT)
        if hit < 2:
            print(f"[WARN] 模糊切分：'{name}' → logo='{logo_stem}', texture='{texture_stem}'（命中 {hit}/2）。請確認檔名或圖庫。")

        # copy option images
        for key, fname in OPTION_FILES.items():
            src_img = g / fname
            if not src_img.exists():

                print(f"[WARN] Missing option image: {src_img}")
                continue
            shutil.copy2(src_img, out_dir / fname)

        # find and copy logo/texture
        logo_src = find_first(LOGO_ROOT, logo_stem)
        tex_src  = find_first(TEX_ROOT, texture_stem)

        if logo_src is None:
            print(f"[WARN] Logo not found for '{logo_stem}' in {LOGO_ROOT}")
        else:
            shutil.copy2(logo_src, out_dir / "logo.jpg")
        if tex_src is None:
            print(f"[WARN] Texture not found for '{texture_stem}' in {TEX_ROOT}")
        else:
            shutil.copy2(tex_src, out_dir / "texture.jpg")

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
        print(f"[OK] {qid}  ←  {name}")

    data = {"title": title, "samples": samples, "cases": cases}
    DATA_JSON.parent.mkdir(parents=True, exist_ok=True)
    with DATA_JSON.open("w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    print("\n✅ Done")
    print(f"  Images -> {DEST_IMAGES}")
    print(f"  data.json -> {DATA_JSON}")
    print(f"  Total cases: {len(cases)}")


if __name__ == "__main__":
    main()