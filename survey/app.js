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
          <div class="sampleCol resultCol">
            <img class="sampleImg" src="${s.result}" alt="理想結果">
            <div class="checkmark">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#27ae60" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.285 6.709a1 1 0 0 0-1.414-1.418l-9.192 9.192-4.243-4.243a1 1 0 0 0-1.414 1.414l4.95 4.95a1 1 0 0 0 1.414 0l9.899-9.895z"/>
              </svg>
            </div>
            <div class="sampleLabel">理想結果</div>
          </div>

        </div>
      </div>
    `).join("");

    // 組裝完整的介紹頁 HTML
    const introHTML = `
      <div class="intro-page">
        
        <div class="intro-section">
          <h3>研究簡介</h3>
          <p>您好，感謝您撥冗參與本次的研究問卷。<br>本問卷旨在評估在「品牌 Logo」與「真實材質」進行視覺融合時的表現。</p>
        </div>

        <div class="intro-section">
          <h3>任務說明</h3>
          <p>接下來，在每一題中您都會看到「設計圖」、「材質圖」、以及由模型融合生成的多張「結果圖」。<br>從這些結果圖中，選出您認為<b>整體視覺效果最平衡</b>的一張。</p>
        </div>

        <div class="intro-section">
          <h3>判斷標準與範例</h3>
          <div class="sampleHeader" style="font-size: 1.2em; color: #27ae60; margin-top: 15px;">✅ 理想的融合範例</div>
          <div class="sampleSubHeader">說明：能清楚辨識 Logo 的原始結構與色彩，同時又能真實、自然地呈現材質的紋理與質感。</div>
          ${goodExampleCardsHTML}

          <div class="sampleHeader" style="font-size: 1.2em; color: #c0392b; margin-top: 30px;">❌ 不理想的融合範例 </div>

          <div class="sampleBlock bad">
            <div class="sampleSubHeader"><b>1. 結構模糊 :</b> Logo 的輪廓變得模糊，色彩被覆蓋，或重要細節消失，失去了品牌的識別度。</b></div>
            <div class="sampleRow">
              <div class="sampleCol"><img class="sampleImg" src="${examples.structureLoss.logo}" alt="設計圖"><div class="sampleLabel">設計圖</div></div>
              <div class="sampleCol"><img class="sampleImg" src="${examples.structureLoss.material}" alt="材質圖"><div class="sampleLabel">材質圖</div></div>
              <div class="sampleCol"><img class="sampleImg" src="${examples.structureLoss.result}" alt="結構失真結果"><div class="sampleLabel">結構失真結果</div></div>
            </div>
          </div>

          <div class="sampleBlock bad">
            <div class="sampleSubHeader"><b>2. 材質感不足 :</b> Logo 結構雖然清晰，但未能有效呈現材質的紋理與質感。</div>
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
                <li>本問卷共 ${cfg.cases.length} 題。</li>
                <li>建議使用色彩顯示正常的螢幕填答。</li>
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
        { type: "imagepicker", name: c.id, title: "請比較各張圖片的融合效果，選擇您認為最佳的一張。",
          isRequired: true, imageHeight: 250, imageWidth: 250, choicesOrder: "none", showLabel: false, choices }
      ]
    });
    
  });

  const json = {
    title: cfg.title || "LOGO × 材質 融合問卷",
    firstPageIsStarted: !!(cfg.instructionExamples),
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
  // const saved = localStorage.getItem(STORAGE_KEY);
  // if (saved) { try { survey.data = JSON.parse(saved); } catch(_){} }
  // survey.onValueChanged.add(() => localStorage.setItem(STORAGE_KEY, JSON.stringify(survey.data)));
  // survey.onCurrentPageChanged.add(() => {
  //   localStorage.setItem(STORAGE_KEY, JSON.stringify(survey.data));
  //   // 新增：換頁時回到頁面頂端
  //   window.scrollTo({ top: 0, behavior: "smooth" });
  // });
  // 1. 【讀取進度】在 survey 載入初期，嘗試從 localStorage 讀取舊進度
  const savedProgressJSON = localStorage.getItem(STORAGE_KEY);
  if (savedProgressJSON) {
    try {
      const savedProgress = JSON.parse(savedProgressJSON);
      // 恢復答題內容
      if(savedProgress.data) {
        survey.data = savedProgress.data;
      }
      // 恢復上次所在的頁碼 (關鍵！)
      if(typeof savedProgress.currentPageNo !== 'undefined') {
        survey.currentPageNo = savedProgress.currentPageNo - 1;
        survey.firstPageIsStarted = false;
      }
    } catch(e) {
      console.error("無法解析儲存的進度", e);
      localStorage.removeItem(STORAGE_KEY); // 如果解析失敗，清除壞掉的資料
    }
  }

  // 2. 【儲存進度】當答案或頁面改變時，將新進度存回 localStorage
  function saveProgress() {
    const dataToSave = {
      currentPageNo: survey.currentPageNo, // 儲存目前的頁碼
      data: survey.data                 // 儲存所有答案
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
  }

  survey.onValueChanged.add(saveProgress);
  survey.onCurrentPageChanged.add(() => {
    saveProgress();
    // 換頁時回到頁面頂端
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
