// === 基本設定（與官方範例相同做法：在外部 JS 裡初始化 Survey） ===
const STORAGE_KEY     = "ml-image-study-v1";
const DATA_URL        = "./data.json";     // 放在 /survey/data.json
const SUBMIT_ENDPOINT = "";                // 有後端就填 URL；留空=只在 console 顯示

const container = document.getElementById("surveyContainer");

// 1) 套主題（名稱需和 CSS 對應：modern / defaultV2 / default）
if (window.Survey && Survey.StylesManager) {
  Survey.StylesManager.applyTheme("modern");
} else {
  container.innerHTML = warn("無法載入 SurveyJS（請改用 vendor 離線檔或檢查 CDN 連線）");
}

// 2) 讀題庫 → 動態產生問卷
fetch(DATA_URL)
  .then(r => {
    if (!r.ok) throw new Error(`讀取 data.json 失敗：HTTP ${r.status}`);
    return r.json();
  })
  .then(cfg => {
    if (!cfg || !Array.isArray(cfg.cases)) throw new Error("data.json 缺少 cases 陣列");
    buildSurvey(cfg);
  })
  .catch(err => {
    console.error(err);
    container.innerHTML = warn(`無法載入題庫：${String(err.message)}<br>請確認 <b>data.json</b> 和 <b>images/</b> 路徑、檔名大小寫。`);
  });

function buildSurvey(cfg) {
  const pages = [];

  cfg.cases.forEach((c, idx) => {
    const introHTML = `
      <div class="intro">
        <div>第 ${idx + 1} 題｜請綜合考慮 <b>結構</b>（Logo 形狀）、<b>顏色</b>（與設計圖一致性）、<b>材質</b>（紋理是否自然），選出最適合的一張。</div>
        <div class="metaRow">
          <div class="metaCol">
            <div style="font-size:12px;color:#555;">材質圖</div>
            <img src="${c.material}" alt="material" onerror="this.style.opacity=0.25;this.title='找不到材質圖'">
          </div>
          <div class="metaCol">
            <div style="font-size:12px;color:#555;">設計圖</div>
            <img src="${c.logo}" alt="logo" onerror="this.style.opacity=0.25;this.title='找不到設計圖'">
          </div>
        </div>
      </div>`;

    // 每題的五張結果圖（A~E）做隨機化
    const choices = shuffle((c.options || []).map(o => ({
      value: o.value, imageLink: o.image, text: o.value
    })));

    pages.push({
      name: c.id,
      elements: [
        { type: "html", name: `${c.id}_intro`, html: introHTML },
        {
          type: "imagepicker",
          name: c.id,
          title: "請選擇整體融合最佳的一張",
          isRequired: true,
          imageHeight: 220,
          imageWidth: 220,
          choicesOrder: "none",   // 我們已自行隨機
          showLabel: true,
          choices
        }
      ]
    });
  });

  const json = {
    title: cfg.title || "材質 × LOGO 融合問卷",
    showProgressBar: "top",
    progressBarType: "questions",
    showQuestionNumbers: "off",
    pageNextText: "下一題 ▶",
    pagePrevText: "◀ 上一題",
    completeText: "提交",
    pages
  };

  const survey = new Survey.Model(json);

  // 續填（localStorage）
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) { try { survey.data = JSON.parse(saved); } catch(_){} }
  survey.onValueChanged.add(() => localStorage.setItem(STORAGE_KEY, JSON.stringify(survey.data)));
  survey.onCurrentPageChanged.add(() => localStorage.setItem(STORAGE_KEY, JSON.stringify(survey.data)));

  // 送出
  survey.onComplete.add(async (sender) => {
    const payload = { ts: new Date().toISOString(), ua: navigator.userAgent, answers: sender.data };
    console.log("提交結果", payload);

    if (SUBMIT_ENDPOINT) {
      try {
        await fetch(SUBMIT_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        alert("已提交，感謝你的填答！");
      } catch (e) {
        alert("送出失敗，但答案已保存在本機。稍後再試。");
        console.error(e);
      }
    } else {
      alert("測試模式：結果在瀏覽器 Console 顯示。設定 SUBMIT_ENDPOINT 可上傳到你的後端。");
    }
    localStorage.removeItem(STORAGE_KEY);
  });

  container.innerHTML = "";
  survey.render(container);
}

// ===== 小工具 =====
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
function warn(html) {
  return `<div style="padding:16px;background:#fff3cd;border:1px solid #ffeeba;border-radius:8px;color:#856404">${html}</div>`;
}