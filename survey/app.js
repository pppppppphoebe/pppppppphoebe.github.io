// app.js - SurveyJS 問卷主程式（配合 index.html 使用）
//import { Model } from "survey-core";
import { LayeredDarkPanelless } from "survey-core/themes";
// === 可調設定 ===
const STORAGE_KEY     = "surveyjs-image-study-v1";  // 續填
const DATA_URL        = "./data.json";              // 題庫檔（與 index.html 同層）
const SUBMIT_ENDPOINT = "";                         // 後端 API（留空=只在 console 顯示）

const container = document.getElementById("surveyContainer");


// 健檢：確認 SurveyJS 已載入
if (typeof Survey === "undefined" || !Survey.Model) {
  container.innerHTML = '<div class="notice">⚠ 無法載入 SurveyJS。若你使用離線版，請確保 <b>vendor/modern.min.css</b>、<b>vendor/survey.core.min.js</b>、<b>vendor/survey-ui.min.js</b> 已正確引入；或改用 CDN。</div>';
} else {
  // 套主題（需與所引入 CSS 一致：modern / defaultV2 / default 等）
  Survey.StylesManager.applyTheme(LayeredDarkPanelless);

  // 載入題庫
  fetch(DATA_URL)
    .then(r => {
      if (!r.ok) throw new Error(`讀取 data.json 失敗：HTTP ${r.status}`);
      return r.json();
    })
    .then(cfg => {
      if (!cfg || !Array.isArray(cfg.cases)) {
        throw new Error("data.json 格式錯誤，缺少 cases 陣列");
      }
      buildSurvey(cfg);
    })
    .catch(err => {
      console.error(err);
      container.innerHTML =
        `<div class="notice">⚠ 無法載入題庫：${String(err.message)}<br>
         請確認 <b>data.json</b> 與 <b>images/</b> 路徑、檔名大小寫。</div>`;
    });
}

function buildSurvey(cfg) {
  const pages = [];
  cfg.cases.forEach((c, idx) => {
    const htmlIntro =
      `<div class="intro">
        <div>第 ${idx+1} 題｜請綜合考慮 <b>結構</b>（logo 形狀）、<b>顏色</b>（與設計稿一致性）、<b>材質</b>（紋理是否自然），選出最適合的一張。</div>
        <div class="metaRow">
          <div class="metaCol">
            <div style="font-size:12px;color:#555;">材質圖</div>
            <img src="${c.material}" alt="material" onerror="this.style.opacity=0.2; this.title='找不到材質圖';"/>
          </div>
          <div class="metaCol">
            <div style="font-size:12px;color:#555;">設計圖</div>
            <img src="${c.logo}" alt="logo" onerror="this.style.opacity=0.2; this.title='找不到設計圖';"/>
          </div>
        </div>
      </div>`;

    // 選項隨機
    const choices = shuffle((c.options || []).map(o => ({
      value: o.value,
      imageLink: o.image,
      text: o.value
    })));

    pages.push({
      name: c.id,
      elements: [
        { type: "html", name: c.id + "_intro", html: htmlIntro },
        {
          type: "imagepicker",
          name: c.id,
          title: "請選擇整體融合最佳的一張",
          isRequired: true,
          imageHeight: 220,
          imageWidth: 220,
          choicesOrder: "none",
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
    firstPageIsStarted: false,
    pageNextText: "下一題 ▶",
    pagePrevText: "◀ 上一題",
    completeText: "提交",
    showQuestionNumbers: "off",
    pages
  };

  const survey = new Survey.Model(json);

  // 續填
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) { try { survey.data = JSON.parse(saved); } catch (_) {} }
  survey.onValueChanged.add(() => localStorage.setItem(STORAGE_KEY, JSON.stringify(survey.data)));
  survey.onCurrentPageChanged.add(() => localStorage.setItem(STORAGE_KEY, JSON.stringify(survey.data)));

  // 送出
  survey.onComplete.add(async (sender) => {
    const payload = { ts: new Date().toISOString(), ua: navigator.userAgent, answers: sender.data };
    console.log("提交結果", payload);
    if (SUBMIT_ENDPOINT) {
      try {
        await fetch(SUBMIT_ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
        alert("已提交，感謝你的填答！");
      } catch (e) {
        alert("送出失敗，但你的答案已保存在本機。稍後再試。");
        console.error(e);
      }
    } else {
      alert("測試模式：結果已在瀏覽器 Console 顯示。設定 SUBMIT_ENDPOINT 可上傳到你的後端。");
    }
    localStorage.removeItem(STORAGE_KEY);
  });

  container.innerHTML = "";
  survey.render(container);
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
