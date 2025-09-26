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

  // ===== 第 1 頁：範例與說明頁 =====
  // 檢查 data.json 中是否有我們定義好的 instructionExamples 物件
  if (cfg.instructionExamples) {
    const examples = cfg.instructionExamples;

    // 動態生成 "理想範例" 的 HTML 卡片
    // 我們使用 .map() 迴圈來處理 good 陣列中的每一個範例
    const goodExampleCardsHTML = examples.good.map(s => `
      <div class="sampleBlock ideal">
        <div class="sampleHeader">${escapeHTML(s.title || "理想範例")}</div>
        <div class="sampleRow">
          <div class="sampleCol"><img class="sampleImg" src="${s.logo}" alt="設計圖"><div class="sampleLabel">設計圖</div></div>
          <div class="sampleCol"><img class="sampleImg" src="${s.material}" alt="材質圖"><div class="sampleLabel">材質圖</div></div>
          <div class="sampleCol"><img class="sampleImg" src="${s.result}" alt="理想結果"><div class="sampleLabel">理想結果</div></div>
        </div>
      </div>
    `).join("");

    // 組裝完整的介紹頁 HTML
    const introHTML = `
      <div class="intro-page">
        
        <div class="intro-section">
          <h3>歡迎與研究簡介</h3>
          <p>您好，非常感謝您撥冗參與本次的研究問卷。<br>本問卷旨在評估一種人工智慧模型，在「品牌 Logo」與「真實材質」進行視覺融合時的表現。您的寶貴意見將是我們改進技術的關鍵依據。</p>
        </div>

        <div class="intro-section">
          <h3>任務說明</h3>
          <p>接下來，在每一題中您都會看到「設計圖」、「材質圖」、以及由模型融合生成的多張「結果圖」。<br>您的任務是，從這些結果圖中，選出您認為<b>整體視覺效果最平衡、最自然</b>的一張。</p>
        </div>

        <div class="intro-section">
          <h3>判斷標準與範例</h3>
          <p>為了讓大家的判斷標準更一致，請參考以下的好壞範例。我們希望您從<b>「結構清晰度」</b>與<b>「材質真實感」</b>兩個主要面向進行權衡。</p>

          <div class="sampleHeader" style="font-size: 1.2em; color: #27ae60; margin-top: 15px;">✅ 理想的融合範例</div>
          <div class="sampleSubHeader">說明：能清楚辨識 Logo 的原始輪廓與細節，同時又能真實、自然地呈現材質的紋理與質感。</div>
          ${goodExampleCardsHTML}

          <div class="sampleHeader" style="font-size: 1.2em; color: #c0392b; margin-top: 30px;">❌ 不理想的融合範例 (使用同一組 Logo/材質對比)</div>

          <div class="sampleBlock bad">
            <div class="sampleSubHeader"><b>1. 結構失真 (Structure Loss):</b> Logo 的輪廓變得模糊、扭曲，或重要細節消失，失去了品牌的識別度。</div>
            <div class="sampleRow">
              <div class="sampleCol"><img class="sampleImg" src="${examples.structureLoss.logo}" alt="設計圖"><div class="sampleLabel">設計圖</div></div>
              <div class="sampleCol"><img class="sampleImg" src="${examples.structureLoss.material}" alt="材質圖"><div class="sampleLabel">材質圖</div></div>
              <div class="sampleCol"><img class="sampleImg" src="${examples.structureLoss.result}" alt="結構失真結果"><div class="sampleLabel">結構失真結果</div></div>
            </div>
          </div>

          <div class="sampleBlock bad">
            <div class="sampleSubHeader"><b>2. 材質感不足 (Texture Loss):</b> Logo 結構雖然清晰，但看起來僅像顏色覆蓋，未能有效呈現材質的紋理與質感。</div>
            <div class="sampleRow">
              <div class="sampleCol"><img class="sampleImg" src="${examples.textureLoss.logo}" alt="設計圖"><div class="sampleLabel">設計圖</div></div>
              <div class="sampleCol"><img class="sampleImg" src="${examples.textureLoss.material}" alt="材質圖"><div class="sampleLabel">材質圖</div></div>
              <div class="sampleCol"><img class="sampleImg" src="${examples.textureLoss.result}" alt="材質不足結果"><div class="sampleLabel">材質不足結果</div></div>
            </div>
          </div>
        </div>
        
        <div class="intro-section">
            <h3>注意事項</h3>
            <ul style="padding-left: 20px; margin: 0; color: #555;">
                <li>本問卷共 ${cfg.cases.length} 題，預計花費您 5-10 分鐘。</li>
                <li>您的判斷沒有絕對的對錯，請依照您的直覺選擇即可。</li>
                <li>建議使用色彩顯示正常的電腦螢幕填答，以獲得最佳體驗。</li>
            </ul>
        </div>

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
