// script.js — 帶「範例起始頁」版本
const STORAGE_KEY     = "ml-image-study-v1";
const DATA_URL        = "./data.json";
const SUBMIT_ENDPOINT = "https://script.google.com/macros/s/AKfycbyxcCSB3I3px9DjxjwqBix0UG-ij2lBWLI05NvFfr8mPraMK3wjmgt_iwA3O86nCXRivw/exec";

const container = document.getElementById("surveyContainer");

// 主題
if (window.Survey && Survey.StylesManager) {
  //Survey.StylesManager.applyTheme("modern");
} else {
  container.innerHTML = warn("無法載入 SurveyJS（請改用 vendor 離線檔或檢查 CDN 連線）");
}

// 載題庫
fetch(DATA_URL)
  .then(r => { if(!r.ok) throw new Error(`讀取 data.json 失敗：HTTP ${r.status}`); return r.json(); })
  .then(cfg => {
    if (!cfg || !Array.isArray(cfg.cases)) throw new Error("data.json 缺少 cases 陣列");
    buildSurvey(cfg);
  })
  .catch(err => {
    console.error(err);
    container.innerHTML = warn(`無法載入題庫：${String(err.message)}<br>請確認 <b>data.json</b> 與 <b>images/</b> 路徑/大小寫。`);
  });

function buildSurvey(cfg){
  const pages = [];

  // ===== 第 1 頁：範例頁（若 data.json 有 samples 就顯示） =====
  if (Array.isArray(cfg.samples) && cfg.samples.length > 0) {
    const cards = cfg.samples.slice(0, 4).map(s => `
      <div class="sampleBlock">
        <div class="sampleHeader">${escapeHTML(s.title || "")}</div>
        <div class="sampleRow">
          <div class="sampleCol">
            <img class="sampleImg" src="${s.logo}" alt="設計圖" onerror="this.style.opacity=0.25">
            <div class="sampleLabel">設計圖</div>
          </div>
          <div class="sampleCol">
            <img class="sampleImg" src="${s.material}" alt="材質圖" onerror="this.style.opacity=0.25">
            <div class="sampleLabel">材質圖</div>
          </div>
          <div class="sampleCol">
            <img class="sampleImg" src="${s.result}" alt="真實結果" onerror="this.style.opacity=0.25">
            <div class="sampleLabel">真實結果</div>
          </div>
        </div>
      </div>
    `).join("");

    const introHTML = `
      <div class="intro">
        <h3 style="margin:0 0 6px">說明與範例</h3>
        <div>下列四組為真實案例示意：由「設計圖」與「材質圖」融合後產生「真實結果」。接下來請在每題 5 張候選圖中，依 <b>結構</b>、<b>顏色</b>、<b>材質</b> 三面向，選出整體最合適的一張。</div>
        <div class="sampleList">${cards}</div>
        <!--<button class="startBtn" onclick="window.__startSurvey && window.__startSurvey()">開始作答 ▶</button>-->
      </div>
    `;

    pages.push({ name: "intro", elements: [{ type: "html", name: "intro_html", html: introHTML }] });
  }

  // ===== 後續各題 =====
  cfg.cases.forEach((c, idx) => {

    const intro = `
      <div class="intro">
        <div>
        第 ${idx + 1} 題
        </div>
        <!--<div>
        請綜合考慮 <b>結構</b>（Logo 形狀）、<b>顏色</b>（與設計圖一致性）、<b>材質</b>（紋理是否自然），選出最適合的一張。
        </div>-->
        <div class="qPairRow">
          <div class="qPairCol">
            <img class="qPairImg" src="${c.material}" alt="material" onerror="this.style.opacity=0.25">
            <div class="qPairLabel">材質圖</div>
          </div>
          <div class="qPairCol">
            <img class="qPairImg" src="${c.logo}" alt="logo" onerror="this.style.opacity=0.25">
            <div class="qPairLabel">設計圖</div>
          </div>
        </div>
      </div>`;


    const choices = shuffle((c.options || []).map(o => ({ value:o.value, imageLink:o.image, text:o.value })));

    pages.push({
      name: c.id,
      elements: [
        { type: "html", name: `${c.id}_intro`, html: intro },
        { type: "imagepicker", name: c.id, title: "請選擇整體融合最佳的一張",
          isRequired: true, imageHeight: 250, imageWidth: 250, choicesOrder: "none", showLabel: false, choices }
      ]
    });
    
  });

  const json = {
    title: cfg.title || "LOGO × 材質 融合問卷",
    firstPageIsStarted: !!(cfg.samples && cfg.samples.length),
    startSurveyText: "開始作答 ▶", // 若 firstPageIsStarted=true，會出現在第一頁下方
    showProgressBar: "top",
    progressBarType: "questions",
    showQuestionNumbers: "off",
    pageNextText: "下一題 ▶",
    pagePrevText: "◀ 上一題",
    completeText: "提交",
    pages
  };

  const survey = new Survey.Model(json);

  // 讓「開始作答」按鈕頁面回到頂端
  survey.onStarted.add(()=>{
    window.scrollTo({ top: 0, behavior: "smooth" });
  })

  // 續填
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) { try { survey.data = JSON.parse(saved); } catch(_){} }
  survey.onValueChanged.add(() => localStorage.setItem(STORAGE_KEY, JSON.stringify(survey.data)));
  survey.onCurrentPageChanged.add(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(survey.data));
    // 新增：換頁時回到頁面頂端
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  

  // 送出
  survey.onComplete.add(async (sender) => {
    const payload = {
      ts: new Date().toISOString(),
      ua: navigator.userAgent,
      answers: sender.data
    };
    console.log("提交結果", payload);

    if (SUBMIT_ENDPOINT) {
      try {
        await fetch(SUBMIT_ENDPOINT, {
          method: "POST",
          // 用 text/plain 降低預檢機率（GAS 端仍以 JSON.parse 嘗試解析）
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify(payload)
        });
        alert("已提交，感謝你的填答！");
      } catch (e) {
        alert("送出失敗，但你的答案已保存在本機。稍後再試。");
        console.error(e);
      }
    } else {
      alert("測試模式：結果已在瀏覽器 Console 顯示。");
    }
    localStorage.removeItem(STORAGE_KEY);
  });


  container.innerHTML = "";
  survey.render(container);
}

// 工具
function shuffle(arr){ for(let i=arr.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [arr[i],arr[j]]=[arr[j],arr[i]]; } return arr; }
function warn(html){ return `<div style="padding:16px;background:#fff3cd;border:1px solid #ffeeba;border-radius:8px;color:#856404">${html}</div>`; }
function escapeHTML(s){ return String(s||"").replace(/[&<>"']/g, m=>({ "&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;" }[m])); }
