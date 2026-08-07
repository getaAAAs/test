// ========== 数据线路配置 ==========
const DATA_SOURCES = [
    "https://cdn.jsdelivr.net/gh/getaAAAs/test@main/data1.js",
    "https://u.pone.rs/lnbzirtg.js",
    "data.js"
];

// ========== 注入全局 CSS ==========
(function injectCSS() {
    const style = document.createElement('style');
    style.textContent = `
        :root {
            --bg: #f5f0f8; --card-bg: #ffffff; --header-bg: linear-gradient(135deg, #1a1a2e 0%, #16213e 40%, #0f3460 100%);
            --accent: #e8618c; --accent2: #7c3aed; --text: #2d2d3a; --text-secondary: #5a5a6e; --text-light: #8888a0;
            --border: #e8e4f0; --tag-bg: #fdf2f6; --tag-text: #c93a6b; --link-color: #4a6cf7; --link-visited: #7c3aed;
            --btn-bg: #f8f6fb; --btn-hover: #efeaf5; --copy-bg: #f0eaf8; --copy-hover: #e4d8f5;
            --shadow-sm: 0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04);
            --shadow-md: 0 4px 16px rgba(0,0,0,0.08), 0 2px 6px rgba(0,0,0,0.04);
            --shadow-lg: 0 8px 30px rgba(0,0,0,0.10), 0 4px 10px rgba(0,0,0,0.05);
            --radius-sm: 8px; --radius: 14px; --radius-lg: 20px; --transition: 0.2s cubic-bezier(0.4, 0, 0.2, 1);
            --font-mono: 'SF Mono', 'Cascadia Code', 'Consolas', 'Monaco', 'PingFang SC', 'Microsoft YaHei', monospace;
        }
        * { margin:0; padding:0; box-sizing:border-box; }
        html { scroll-behavior:smooth; -webkit-tap-highlight-color:transparent; -webkit-text-size-adjust:100%; scroll-padding-top:20px; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Noto Sans SC', sans-serif;
            background: var(--bg); color: var(--text); line-height:1.6; min-height:100vh; -webkit-font-smoothing:antialiased;
            padding-bottom:70px;
            background-image: radial-gradient(ellipse at 15% 5%, rgba(232,97,140,0.04) 0%, transparent 60%),
                radial-gradient(ellipse at 85% 30%, rgba(124,58,237,0.03) 0%, transparent 55%),
                radial-gradient(ellipse at 50% 70%, rgba(232,97,140,0.03) 0%, transparent 50%);
        }
        .hero { background: var(--header-bg); color:#fff; padding:28px 16px 26px; text-align:center; position:relative; overflow:hidden; box-shadow:0 4px 24px rgba(15,15,40,0.25); }
        .hero::before { content:''; position:absolute; top:-60px; right:-50px; width:180px; height:180px; background:radial-gradient(circle, rgba(232,97,140,0.25) 0%, transparent 70%); border-radius:50%; pointer-events:none; }
        .hero::after { content:''; position:absolute; bottom:-40px; left:-40px; width:140px; height:140px; background:radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 70%); border-radius:50%; pointer-events:none; }
        .hero-content { position:relative; z-index:1; max-width:640px; margin:0 auto; }
        .hero h1 { font-size:clamp(1.3rem,3.5vw,1.7rem); font-weight:700; letter-spacing:0.02em; margin-bottom:4px; text-shadow:0 2px 8px rgba(0,0,0,0.3); }
        .hero .subtitle { font-size:0.85rem; opacity:0.8; font-weight:400; letter-spacing:0.03em; margin-bottom:4px; }
        .hero .badge-row { display:flex; flex-wrap:wrap; gap:8px; justify-content:center; margin-top:8px; }
        .hero .badge { display:inline-block; background:rgba(255,255,255,0.13); border:1px solid rgba(255,255,255,0.2); color:#fff; padding:5px 13px; border-radius:20px; font-size:0.78rem; font-weight:500; letter-spacing:0.03em; backdrop-filter:blur(4px); -webkit-backdrop-filter:blur(4px); transition:var(--transition); cursor:default; user-select:none; }
        .hero .badge:hover { background:rgba(255,255,255,0.2); border-color:rgba(255,255,255,0.35); }
        .badge.clickable { cursor:pointer; }
        .badge.clickable:hover { background:rgba(255,255,255,0.25); border-color:rgba(255,255,255,0.5); transform:translateY(-1px); box-shadow:0 4px 12px rgba(0,0,0,0.2); }
        .badge.clickable:active { transform:scale(0.95); transition:0.08s; }
        .main-container { max-width:720px; margin:0 auto; padding:16px 12px 32px; }
        .card { background:var(--card-bg); border-radius:var(--radius-lg); padding:18px 16px; margin-bottom:14px; box-shadow:var(--shadow-md); border:1px solid var(--border); transition:var(--transition); position:relative; }
        .card:hover { box-shadow:var(--shadow-lg); transform:translateY(-1px); }
        .card.primary-card { border:2px solid #e8d5f5; background:linear-gradient(180deg, #fefcff 0%, #fdf8fc 100%); box-shadow:var(--shadow-lg), 0 0 0 1px rgba(124,58,237,0.06); }
        .card.primary-card::before { content:'🔝 重磅推荐Coser、网红、玉足、总链接'; position:absolute; top:-11px; left:20px; background:#7c3aed; color:#fff; font-size:0.7rem; font-weight:700; padding:3px 12px; border-radius:20px; letter-spacing:0.04em; z-index:2; box-shadow:0 2px 8px rgba(124,58,237,0.3); }
        .card.tutorial-card { border:2px solid #fcd5d5; background:linear-gradient(180deg, #fffbfb 0%, #fff8f7 100%); box-shadow:var(--shadow-md), 0 0 0 1px rgba(232,97,140,0.05); }
        .card.tutorial-card::before { content:'⚠️ 新人必看教程'; position:absolute; top:-11px; left:20px; background:#e8618c; color:#fff; font-size:0.7rem; font-weight:700; padding:3px 12px; border-radius:20px; letter-spacing:0.04em; z-index:2; box-shadow:0 2px 8px rgba(232,97,140,0.3); }
        .card-title { font-weight:700; font-size:1rem; margin-bottom:10px; color:#1a1a2e; display:flex; align-items:center; gap:6px; flex-wrap:wrap; cursor:pointer; user-select:none; -webkit-tap-highlight-color:transparent; }
        .card-title .icon { font-size:1.2rem; }
        .card-title .toggle-indicator { margin-left:auto; font-size:0.85rem; color:var(--text-light); transition:transform 0.3s ease; }
        .card-title .toggle-indicator.open { transform:rotate(0deg); }
        .card-title .toggle-indicator.closed { transform:rotate(-90deg); }
        .collapse-content { overflow:hidden; transition:max-height 0.35s ease, opacity 0.3s ease; max-height:5000px; opacity:1; }
        .collapse-content.collapsed { max-height:0; opacity:0; padding-top:0; margin-top:0; pointer-events:none; }
        .link-row { display:flex; flex-wrap:wrap; align-items:center; gap:8px; margin-bottom:6px; background:var(--btn-bg); border-radius:var(--radius-sm); padding:10px 12px; word-break:break-all; transition:var(--transition); }
        .link-row:hover { background:var(--btn-hover); }
        .link-row .link-label { font-weight:600; font-size:0.78rem; color:var(--text-secondary); white-space:nowrap; }
        .link-row a { color:var(--link-color); text-decoration:none; font-size:0.8rem; font-family:var(--font-mono); word-break:break-all; flex:1; min-width:0; transition:var(--transition); line-height:1.4; }
        .link-row a:hover { color:#2d4fd9; text-decoration:underline; text-underline-offset:3px; }
        .link-row a:visited { color:var(--link-visited); }
        .pwd-tag { display:inline-flex; align-items:center; gap:5px; background:var(--tag-bg); color:var(--tag-text); font-weight:700; font-family:var(--font-mono); font-size:0.85rem; padding:4px 10px; border-radius:6px; letter-spacing:0.06em; border:1px solid #fcd5e2; cursor:pointer; transition:var(--transition); user-select:all; -webkit-user-select:all; }
        .pwd-tag:hover { background:#fde8ef; border-color:#f8b8cc; }
        .pwd-tag:active { transform:scale(0.96); }
        .site-ref { font-size:0.73rem; color:var(--text-light); text-align:right; margin-top:2px; letter-spacing:0.02em; }
        .site-ref a { color:var(--accent2); text-decoration:none; font-weight:600; }
        .site-ref a:hover { text-decoration:underline; }
        .qq-card { display:block; background:#f0f7ff; border:2px dashed #b8d4f8; border-radius:var(--radius); padding:18px 16px; margin-bottom:18px; box-shadow:var(--shadow-sm); transition:var(--transition); }
        .qq-card:hover { border-color:#7ab4f0; background:#eaf4ff; }
        .qq-card .qq-inner { display:flex; align-items:center; gap:12px; flex-wrap:wrap; }
        .qq-card .qq-icon { font-size:2rem; flex-shrink:0; }
        .qq-card .qq-info { flex:1; min-width:0; }
        .qq-card .qq-info .qq-label { font-weight:700; font-size:0.9rem; color:#1a3a5c; }
        .qq-card .qq-info .qq-number { font-family:var(--font-mono); font-size:1.1rem; font-weight:700; color:#1a5ca8; letter-spacing:0.04em; }
        .qq-card .qq-btn { flex-shrink:0; background:#1a5ca8; color:#fff; padding:9px 18px; border-radius:22px; text-decoration:none; font-weight:600; font-size:0.85rem; letter-spacing:0.03em; transition:var(--transition); white-space:nowrap; min-height:40px; display:inline-flex; align-items:center; gap:5px; box-shadow:0 2px 8px rgba(26,92,168,0.3); }
        .qq-card .qq-btn:hover { background:#144a8a; box-shadow:0 4px 14px rgba(26,92,168,0.4); transform:translateY(-1px); }
        .qq-card .qq-btn:active { transform:scale(0.96); }
        .section-header { display:flex; align-items:center; gap:8px; margin:22px 0 14px; padding:0 4px; }
        .section-header .line { flex:1; height:1px; background:#d5cce0; border-radius:1px; }
        .section-header .section-title { font-weight:700; font-size:1rem; color:#3d3055; letter-spacing:0.04em; white-space:nowrap; padding:0 8px; }
        .section-header .count-badge { background:#e8e0f5; color:#5a3d8a; font-weight:700; font-size:0.75rem; padding:3px 10px; border-radius:14px; white-space:nowrap; }
        .update-card { background:var(--card-bg); border-radius:var(--radius); padding:15px 16px; margin-bottom:11px; box-shadow:var(--shadow-sm); border:1px solid var(--border); transition:var(--transition); position:relative; overflow:hidden; }
        .update-card:hover { box-shadow:var(--shadow-md); border-color:#d5c8e8; transform:translateY(-1px); }
        .update-card .date-badge { display:inline-block; background:#f0eaf8; color:#5a3d8a; font-weight:700; font-size:0.73rem; padding:4px 10px; border-radius:14px; letter-spacing:0.04em; margin-bottom:8px; border:1px solid #e0d5f0; }
        .update-card .coser-name { font-weight:700; font-size:1.05rem; color:#1a1a2e; margin-bottom:2px; display:flex; align-items:center; gap:6px; flex-wrap:wrap; }
        .update-card .coser-name .tag { font-size:0.7rem; font-weight:500; background:#fff0f5; color:#c93a6b; padding:2px 8px; border-radius:10px; border:1px solid #fcd5e2; white-space:nowrap; }
        .preview-toggle-btn { display:inline-flex; align-items:center; gap:4px; background:#fff0f5; border:1px solid #f8b8cc; color:#c93a6b; font-weight:600; font-size:0.72rem; padding:5px 12px; border-radius:16px; cursor:pointer; transition:all 0.22s ease; white-space:nowrap; user-select:none; -webkit-tap-highlight-color:transparent; margin:6px 4px 4px 0; }
        .preview-toggle-btn:hover { background:#ffe0ea; border-color:#f08aaa; transform:translateY(-1px); }
        .preview-toggle-btn:active { transform:scale(0.95); }
        .preview-gallery { margin-top:10px; margin-bottom:6px; padding:8px; background:#fcf9ff; border-radius:12px; border:1px solid #e8ddf5; overflow-x:auto; white-space:nowrap; -webkit-overflow-scrolling:touch; scrollbar-width:thin; scrollbar-color:#d5c0e8 #f5f0fa; }
        .preview-gallery::-webkit-scrollbar { height:4px; }
        .preview-gallery::-webkit-scrollbar-track { background:#f5f0fa; border-radius:4px; }
        .preview-gallery::-webkit-scrollbar-thumb { background:#d5c0e8; border-radius:4px; }
        .preview-gallery img { display:inline-block; width:110px; height:auto; border-radius:8px; margin-right:8px; border:1px solid #e0d0f0; box-shadow:0 2px 6px rgba(0,0,0,0.06); transition:transform 0.2s ease; vertical-align:middle; cursor:pointer; }
        .preview-gallery img:hover { transform:scale(1.03); box-shadow:0 4px 12px rgba(0,0,0,0.12); }
        .lightbox-overlay { position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.9); backdrop-filter:blur(8px); -webkit-backdrop-filter:blur(8px); z-index:11000; display:flex; align-items:center; justify-content:center; padding:20px; opacity:0; visibility:hidden; transition:opacity 0.25s ease, visibility 0.25s ease; }
        .lightbox-overlay.active { opacity:1; visibility:visible; }
        .lightbox-overlay img { max-width:85%; max-height:85%; border-radius:12px; box-shadow:0 20px 50px rgba(0,0,0,0.5); transition:transform 0.3s ease; pointer-events:none; }
        .lightbox-nav { position:absolute; top:50%; transform:translateY(-50%); background:rgba(255,255,255,0.2); border:none; color:#fff; font-size:2.5rem; width:60px; height:60px; border-radius:50%; display:flex; align-items:center; justify-content:center; cursor:pointer; transition:background 0.2s; z-index:11001; user-select:none; }
        .lightbox-nav:hover { background:rgba(255,255,255,0.4); }
        .lightbox-nav.prev { left:20px; } .lightbox-nav.next { right:20px; }
        .lightbox-counter { position:absolute; bottom:30px; left:50%; transform:translateX(-50%); color:#fff; background:rgba(0,0,0,0.5); padding:6px 16px; border-radius:20px; font-size:0.9rem; }
        .footer-note { background:#fffdf7; border:1px solid #e8e0cc; border-radius:var(--radius); padding:16px; margin-top:18px; font-size:0.82rem; color:#5a4a2e; line-height:1.7; box-shadow:var(--shadow-sm); text-align:center; }
        .footer-note .heart { color:#e8618c; font-size:1.1rem; }
        .footer-site-link { text-align:center; margin-top:10px; font-weight:700; font-size:0.9rem; }
        .footer-site-link a { color:#7c3aed; text-decoration:none; font-size:1rem; letter-spacing:0.04em; padding:6px 16px; border:2px dashed #c8b8e8; border-radius:20px; display:inline-block; transition:var(--transition); }
        .footer-site-link a:hover { background:#f8f4ff; border-color:#7c3aed; }
        .bottom-nav { position:fixed; bottom:0; left:0; right:0; z-index:990; display:flex; justify-content:center; align-items:center; gap:8px; padding:8px 16px; background:rgba(255,255,255,0.9); backdrop-filter:blur(14px); -webkit-backdrop-filter:blur(14px); border-top:1px solid rgba(200,185,220,0.45); box-shadow:0 -4px 12px rgba(100,70,150,0.1); }
        .bottom-nav .nav-item { display:flex; flex-direction:column; align-items:center; gap:2px; }
        .bottom-nav .nav-btn { display:flex; align-items:center; justify-content:center; width:44px; height:44px; border-radius:50%; background:rgba(255,255,255,0.7); border:1px solid transparent; cursor:pointer; font-size:1.25rem; transition:all 0.22s ease; color:#5a4a70; text-decoration:none; box-shadow:0 1px 3px rgba(0,0,0,0.04); }
        .bottom-nav .nav-btn:hover { background:rgba(240,232,250,0.9); border-color:#d5c8e8; transform:scale(1.08); box-shadow:0 3px 12px rgba(100,70,150,0.15); color:#3d2d55; }
        .bottom-nav .nav-label { font-size:0.62rem; font-weight:600; color:#5a4a70; letter-spacing:0.04em; line-height:1.2; white-space:nowrap; text-align:center; }
        .msg-bubble { position:fixed; bottom:90px; right:20px; width:60px; height:60px; background:var(--accent); border-radius:50%; display:flex; align-items:center; justify-content:center; color:#fff; font-size:1.8rem; box-shadow:0 4px 14px rgba(232,97,140,0.5); cursor:pointer; z-index:980; animation:bubblePulse 1.2s infinite; }
        .msg-bubble:hover { transform:scale(1.1); }
        @keyframes bubblePulse { 0% { transform:scale(1); } 50% { transform:scale(1.12); } 100% { transform:scale(1); } }
        .modal-overlay { position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.55); backdrop-filter:blur(6px); -webkit-backdrop-filter:blur(6px); z-index:10000; display:flex; align-items:center; justify-content:center; padding:20px; opacity:0; visibility:hidden; transition:opacity 0.3s ease, visibility 0.3s ease; }
        .modal-overlay.active { opacity:1; visibility:visible; }
        .modal-dialog { background:#fff; border-radius:24px; max-width:420px; width:100%; padding:28px 22px 20px; box-shadow:0 20px 50px rgba(0,0,0,0.3); transform:translateY(30px) scale(0.96); transition:transform 0.35s cubic-bezier(0.34,1.56,0.64,1); text-align:center; color:#2d2d3a; }
        .modal-overlay.active .modal-dialog { transform:translateY(0) scale(1); }
        .modal-dialog .modal-icon { font-size:2.8rem; margin-bottom:8px; }
        .modal-dialog .modal-title { font-weight:700; font-size:1.2rem; color:#1a1a2e; margin-bottom:14px; }
        .modal-dialog .modal-content { font-size:0.88rem; color:#4a4a5e; line-height:1.7; margin-bottom:20px; text-align:left; background:#fdf8fb; border-radius:16px; padding:14px 16px; border:1px solid #f0dce8; }
        .modal-dialog .modal-close-btn { background:var(--accent); border:none; color:#fff; font-weight:700; font-size:0.95rem; padding:12px 28px; border-radius:30px; cursor:pointer; box-shadow:0 4px 14px rgba(232,97,140,0.35); min-width:120px; -webkit-tap-highlight-color:transparent; }
        .modal-dialog .modal-close-btn:hover { background:#d44a72; box-shadow:0 6px 18px rgba(232,97,140,0.45); transform:translateY(-1px); }
        .toast { position:fixed; bottom:80px; left:50%; transform:translateX(-50%) translateY(100px); background:#1a1a2e; color:#fff; padding:10px 22px; border-radius:24px; font-size:0.85rem; font-weight:600; z-index:9999; opacity:0; transition:all 0.35s ease; pointer-events:none; box-shadow:0 8px 28px rgba(0,0,0,0.3); }
        .toast.show { opacity:1; transform:translateX(-50%) translateY(0); }
        .toast.success { background:#1a6b3a; }
        .sub-card { background:#f8f6fb; border-radius:10px; padding:10px; margin:8px 0; border:1px solid #e4d9f2; transition:background 0.2s; }
        .sub-card:hover { background:#f0e9fa; }
        .sub-card-header { display:flex; align-items:center; flex-wrap:wrap; gap:8px; margin-bottom:6px; }
        .sub-pagination { display:flex; justify-content:center; align-items:center; gap:8px; margin-top:10px; flex-wrap:wrap; }
        .sub-page-btn { background:#7c3aed; color:#fff; border:none; padding:4px 12px; border-radius:12px; font-size:0.75rem; cursor:pointer; }
        .sub-page-btn:disabled { background:#ccc; cursor:default; }
        .view-all-btn { background:#e8618c; color:#fff; border:none; padding:4px 12px; border-radius:12px; font-size:0.75rem; cursor:pointer; margin-left:8px; }
        .collapse-all-btn { background:#666; color:#fff; border:none; padding:4px 12px; border-radius:12px; font-size:0.75rem; cursor:pointer; margin-top:8px; display:block; width:100%; text-align:center; }
        @media (max-width:480px) {
            .hero { padding:20px 10px 18px; } .hero h1 { font-size:1.15rem; } .hero .badge { font-size:0.7rem; padding:4px 10px; }
            .main-container { padding:10px 8px 24px; } .card { padding:14px 10px; border-radius:var(--radius); margin-bottom:10px; }
            .card.primary-card::before, .card.tutorial-card::before { font-size:0.65rem; padding:2px 10px; top:-10px; left:12px; }
            .update-card { padding:12px 10px; border-radius:var(--radius-sm); margin-bottom:8px; }
            .link-row { padding:8px 10px; gap:5px; border-radius:6px; } .link-row a { font-size:0.7rem; }
            .pwd-tag { font-size:0.73rem; padding:3px 7px; } .qq-card { padding:12px; } .qq-card .qq-inner { flex-direction:column; align-items:stretch; text-align:center; gap:8px; }
            .qq-card .qq-btn { justify-content:center; width:100%; } .section-header .section-title { font-size:0.85rem; }
            .update-card .coser-name { font-size:0.9rem; } .footer-note { font-size:0.74rem; padding:12px; }
            .preview-gallery img { width:90px; } .lightbox-nav { width:44px; height:44px; font-size:2rem; } .lightbox-nav.prev { left:10px; } .lightbox-nav.next { right:10px; }
            .bottom-nav { padding:6px 8px; gap:4px; } .bottom-nav .nav-btn { width:38px; height:38px; font-size:1.1rem; }
            .msg-bubble { bottom:85px; right:15px; width:55px; height:55px; font-size:1.6rem; }
        }
    `;
    document.head.appendChild(style);
})();

// ========== 主函数 initApp ==========
function initApp() {
    // 1. 先构建页面框架，确保所有元素存在
    buildPage();
    // 2. 显示加载遮罩并开始加载数据
    document.getElementById('loadingOverlay').style.display = 'flex';
    loadDataFromFirstSource();
}

let updateCardsData = [];
const subStates = {};

function loadScript(url, timeout = 5000) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = url;
        script.async = true;
        const timer = setTimeout(() => { script.onload = null; script.onerror = null; script.remove(); reject(new Error('超时')); }, timeout);
        script.onload = () => { clearTimeout(timer); script.remove(); resolve(); };
        script.onerror = () => { clearTimeout(timer); script.remove(); reject(new Error('加载失败')); };
        document.head.appendChild(script);
    });
}

async function loadDataFromFirstSource() {
    try {
        await loadScript(DATA_SOURCES[0]);
        document.getElementById('loadingOverlay').style.display = 'none';
        if (window.__CARDS_DATA__?.length) {
            updateCardsData = window.__CARDS_DATA__;
            startDynamicCards();
        } else {
            throw new Error('数据为空');
        }
    } catch (e) {
        document.getElementById('loadingOverlay').style.display = 'none';
        showDataFallbackUI();
    }
}

function showDataFallbackUI() {
    const container = document.getElementById('update-container');
    if (!container) return;
    let html = '<div style="text-align:center; padding:20px;">';
    html += '<p>⚠️ 数据加载失败，请选择备用线路：</p>';
    DATA_SOURCES.forEach((url, i) => {
        html += `<button class="line-btn" style="margin:4px auto; display:block;" data-url="${url}">🚀 线路${i+1}：${url.split('/').pop()}</button>`;
    });
    html += '<p style="font-size:0.75rem; color:#888; margin-top:8px;">您也可以稍后刷新页面重试</p>';
    html += '</div>';
    container.innerHTML = html;

    container.querySelectorAll('.line-btn').forEach(btn => {
        btn.addEventListener('click', async function() {
            const url = this.dataset.url;
            document.getElementById('loadingOverlay').style.display = 'flex';
            try {
                await loadScript(url);
                document.getElementById('loadingOverlay').style.display = 'none';
                if (window.__CARDS_DATA__?.length) {
                    updateCardsData = window.__CARDS_DATA__;
                    startDynamicCards();
                } else {
                    throw new Error('数据为空');
                }
            } catch (e) {
                document.getElementById('loadingOverlay').style.display = 'none';
                alert('该线路加载失败，请刷新或尝试其他线路。');
            }
        });
    });
}

// ========== 构建完整页面框架（不包含动态卡片） ==========
function buildPage() {
    // 移除旧元素
    document.querySelectorAll('.hero, .bottom-nav, .msg-bubble, .lightbox-overlay, .modal-overlay, .toast, .main-container').forEach(el => el.remove());

    const fullHTML = `
    <header class="hero">
        <div class="hero-content">
            <h1>Coser 网红福利姬资源合集</h1>
            <p class="subtitle">文档可上下滑动浏览哦~</p>
            <div class="badge-row">
                <span class="badge">📡 tp34.cn</span>
                <span class="badge clickable" data-action="show-share-dialog">🎁 无偿分享</span>
                <span class="badge clickable" data-action="scroll-to-updates">📅 持续更新</span>
            </div>
        </div>
    </header>

    <nav class="bottom-nav" id="bottomNav">
        <div class="nav-item"><button class="nav-btn" data-target="top">🔝</button><span class="nav-label">回到顶部</span></div>
        <div class="nav-item"><button class="nav-btn" data-target="update-list">📋</button><span class="nav-label">近期更新</span></div>
        <div class="nav-item"><button class="nav-btn" data-target="hot-yz">🔗</button><span class="nav-label">玉足</span></div>
        <div class="nav-item"><button class="nav-btn" data-target="hot-links">🔗</button><span class="nav-label">抖音网红</span></div>
        <div class="nav-item"><button class="nav-btn" data-target="top">🔗</button><span class="nav-label">解压教程</span></div>
    </nav>

    <div class="msg-bubble" id="msgBubble" title="新朋友必看">💡</div>

    <div class="lightbox-overlay" id="lightboxOverlay">
        <img alt="大图预览" id="lightboxImage" src=""/>
        <button class="lightbox-nav prev" id="lightboxPrev">‹</button>
        <button class="lightbox-nav next" id="lightboxNext">›</button>
        <div class="lightbox-counter" id="lightboxCounter"></div>
    </div>

    <div class="modal-overlay" id="shareModal">
        <div class="modal-dialog">
            <div class="modal-icon">❤️</div>
            <div class="modal-title">感谢支持与理解</div>
            <div class="modal-content">
                <p>资源是本人付费收集的，所以请珍惜对待。<br/>本人是资深Coser收集家，爱好分享所以<strong>无偿分享</strong>给大家~</p>
                <p>每个资源都很大，不要在QQ群里求来求去的让别人发给你。<br/>都放到网盘里了你还想怎样~ 网盘是可以免费下载的，<br/>要是嫌下载慢的你自己开个会员，首充几块钱的玩意儿别磨磨唧唧的像个男人好吧~</p>
            </div>
            <button class="modal-close-btn" id="closeModalBtn">我知道了</button>
        </div>
    </div>

    <div class="modal-overlay" id="tutorialModal">
        <div class="modal-dialog">
            <div class="modal-icon">📺</div>
            <div class="modal-title">新人必看解压教程</div>
            <div class="modal-content">
                <p>新进来的朋友一定一定要看解压教程，否则无法解压、无法观看~</p>
                <p>看不懂多看几遍，文档最好用<strong>迅雷</strong>打开，这样会省很多事儿。</p>
                <p>迅雷直接输入 <strong>tp34.cn</strong> 即可直达本文档。</p>
            </div>
            <button class="modal-close-btn" id="closeTutorialBtn">我知道了</button>
        </div>
    </div>

    <div class="main-container">
        <div class="card tutorial-card">
            <div class="card-title" onclick="toggleCollapse(this)">
                <span class="icon">📺</span> 观看教程/解压教程-点我看解压看教程 <span class="toggle-indicator closed">▶</span>
            </div>
            <div class="collapse-content collapsed">
                <div class="link-row">
                    <span class="link-label">📥 迅雷链接</span>
                    <a href="https://pan.xunlei.com/s/VOzRp5FniqYezSeLudryWJ1TA1?pwd=nkm8#" target="_blank" rel="noopener">https://pan.xunlei.com/s/VOzRp5FniqYezSeLudryWJ1TA1?pwd=nkm8#</a>
                </div>
                <div style="display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin-top:4px;">
                    <span style="font-weight:600;font-size:0.8rem;color:#c93a6b;">🔑 提取码：</span>
                    <span class="pwd-tag" data-copy="nkm8">nkm8</span>
                    <span class="site-ref" style="margin-left:auto;">网址：<a href="http://tp34.cn" target="_blank" rel="noopener">tp34.cn</a></span>
                </div>
            </div>
        </div>

        <div class="qq-card">
            <div class="card-title" onclick="toggleCollapse(this)" style="margin-bottom:0; padding-bottom:0;">
                🐧 Coser 问题处理群 -点我查看问题处理QQ群 <span class="toggle-indicator closed">▶</span>
            </div>
            <div class="collapse-content collapsed" style="padding-top:10px;">
                <div class="qq-inner">
                    <span class="qq-icon">🐧</span>
                    <div class="qq-info">
                        <div class="qq-label">Coser 问题处理群</div>
                        <div class="qq-number">群号：1026669574</div>
                        <div style="font-size:0.7rem;color:#6b8aaa;">进群前先把本文档看完再进群~ 处理一切不会看的疑难杂症</div>
                    </div>
                    <a class="qq-btn" href="https://qm.qq.com/q/KvtbT0EheU" target="_blank" rel="noopener">💬 点击直达Q群</a>
                </div>
            </div>
        </div>

        <div class="section-header" id="update-list">
            <span class="line"></span>
            <span class="section-title">📋 更新内容列表</span>
            <span class="count-badge">20000+资源逐步更新中.....</span>
            <span class="line"></span>
        </div>
        <div id="update-container"></div>
        <div id="load-more-sentinel" style="height:1px;"></div>

        <div class="card primary-card" id="hot-yz">
            <div class="card-title" onclick="toggleCollapse(this)">
                <span class="icon">🔥</span> Coser玉足脚丫子 <span class="toggle-indicator open">▼</span>
            </div>
            <div class="collapse-content">
                <div class="link-row">
                    <span class="link-label">📥 迅雷链接</span>
                    <a href="https://pan.xunlei.com/s/VOyIHVlf_XTPk_un4fE2yheqA1?pwd=24nk#" target="_blank" rel="noopener">https://pan.xunlei.com/s/VOyIHVlf_XTPk_un4fE2yheqA1?pwd=24nk#</a>
                </div>
                <div style="display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin-top:4px;">
                    <span style="font-weight:600;font-size:0.8rem;color:#5a3d8a;">🔑 提取码：</span>
                    <span class="pwd-tag" data-copy="24nk">24nk</span>
                    <span class="site-ref" style="margin-left:auto;">网址：<a href="http://tp34.cn" target="_blank" rel="noopener">tp34.cn</a></span>
                </div>
            </div>
        </div>

        <div class="card primary-card" id="hot-links">
            <div class="card-title" onclick="toggleCollapse(this)">
                <span class="icon">🔗</span> 热门网红童锣烧、小霞佩奇等 <span class="toggle-indicator open">▼</span>
            </div>
            <div class="collapse-content">
                <div class="link-row">
                    <span class="link-label">📥 迅雷链接</span>
                    <a href="https://pan.xunlei.com/s/VOyII-5iSvv0JeoxqEEWuc5vA1?pwd=jwkn#" target="_blank" rel="noopener">https://pan.xunlei.com/s/VOyII-5iSvv0JeoxqEEWuc5vA1?pwd=jwkn#</a>
                </div>
                <div style="display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin-top:4px;">
                    <span style="font-weight:600;font-size:0.8rem;color:#5a3d8a;">🔑 提取码：</span>
                    <span class="pwd-tag" data-copy="jwkn">jwkn</span>
                    <span class="site-ref" style="margin-left:auto;">网址：<a href="http://tp34.cn" target="_blank" rel="noopener">tp34.cn</a></span>
                </div>
            </div>
        </div>

        <div class="footer-note">
            <p><span class="heart">❤️</span> 资源是本人付费收集的，所以请珍惜对待。<br/>本人是资深Coser收集家，爱好分享所以<strong>无偿分享</strong>给大家~</p>
            <p style="margin-top:6px;font-size:0.75rem;color:#8a7a5e;">每个资源都很大，不要在QQ群里求来求去的让别人发给你。<br/>都放到网盘里了你还想怎样~ 网盘是可以免费下载的，<br/>要是嫌下载慢的你自己开个会员，首充几块钱的玩意儿别磨磨唧唧的像个男人好吧~</p>
        </div>
        <div class="footer-site-link">
            📖 文档直达浏览器地址（浏览器直接搜即可）：<br/>
            <a href="http://tp34.cn" target="_blank" rel="noopener">👉 tp34.cn</a>
        </div>
    </div>
    <div class="toast" id="toast"></div>
    `;

    const temp = document.createElement('div');
    temp.innerHTML = fullHTML;
    while (temp.firstChild) {
        document.body.appendChild(temp.firstChild);
    }

    // 绑定全局事件（导航、弹窗、气泡等）
    bindGlobalEvents();
}

// ========== 动态卡片加载（数据成功后才调用） ==========
function startDynamicCards() {
    const container = document.getElementById('update-container');
    const sentinel = document.getElementById('load-more-sentinel');
    if (!container || !sentinel) return;
    const LOAD_BATCH = 4;
    let loadedCount = 0, isLoading = false;

    // 清空容器
    container.innerHTML = '';

    function createUpdateCardHTML(card, index) {
        const imgsHTML = (card.images || []).map(src => `<img alt="预览图片" loading="lazy" onclick="openGallery(this)" src="${src}" />`).join('');
        const hasSub = card.subCards?.length > 0;
        let subHTML = hasSub ? `<div style="margin-top:10px;"><button class="sub-load-btn" data-index="${index}" style="background:#7c3aed; color:#fff; border:none; padding:6px 16px; border-radius:16px; font-size:0.75rem; cursor:pointer;">📂 查看全部子资源 (${card.subCards.length}个)</button><span class="site-ref" style="display:inline-block; margin-left:8px;">网站永久网址 <a href="http://tp34.cn" target="_blank" rel="noopener">tp34.cn</a> 请牢记</span><div class="sub-container" id="sub-container-${index}" style="margin-top:8px; display:none;"></div></div>` : '';
        return `<article class="update-card" data-index="${index}">
            <span class="date-badge">📅 ${card.date}</span>
            <div class="coser-name">🔝 ${card.name}<span class="tag">${card.tag}</span></div>
            <button class="preview-toggle-btn" onclick="var g=this.nextElementSibling;if(g.style.display==='none'){g.style.display='block';this.innerHTML='🖼️ 点我收起预览';}else{g.style.display='none';this.innerHTML='🖼️ 点我查看预览';}">🖼️ 点我收起预览</button>
            <div class="preview-gallery" style="display:block;">${imgsHTML}</div>
            ${subHTML}
        </article>`;
    }

    function createSubCardHTML(item) {
        const imgs = (item.images || []).map(src => `<img alt="预览" loading="lazy" onclick="openGallery(this)" src="${src}" />`).join('');
        const previewHTML = imgs ? `<div class="preview-gallery" style="display:block;">${imgs}</div>` : '';
        return `<div class="sub-card">
            <div class="sub-card-header"><strong style="flex:1;">${item.name}</strong></div>
            ${previewHTML}
            <div style="display:flex; justify-content:flex-end; align-items:center; gap:6px; margin-top:8px; flex-wrap:wrap;">
                <span style="color:red; font-weight:bold; font-size:0.75rem;">网站永久地址 tp34.cn 请牢记</span>
                <a href="https://pan.xunlei.com/s/VOzRp5FniqYezSeLudryWJ1TA1?pwd=nkm8#" target="_blank" style="background:#7c3aed; color:#fff; padding:6px 10px; border-radius:16px; font-size:0.75rem; text-decoration:none; font-weight:600;">解压教程</a>
                <a href="${item.link}" target="_blank" style="background:#e8618c; color:#fff; padding:6px 14px; border-radius:16px; font-size:0.75rem; text-decoration:none; font-weight:600;">点我下载</a>
                <span class="pwd-tag" data-copy="${item.pwd}" style="font-size:0.75rem; padding:3px 8px;">🔑 提取码：${item.pwd}</span>
            </div>
        </div>`;
    }

    function scrollToCard(index) {
        const cardEl = document.querySelector(`.update-card[data-index="${index}"]`);
        if (cardEl) cardEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function renderSubPage(index) {
        const card = updateCardsData[index], sub = document.getElementById('sub-container-' + index);
        if (!card || !sub) return;
        const data = card.subCards;
        if (!data?.length) return;
        const state = subStates[index] = subStates[index] || { mode: 'page', page: 1 };
        state.mode = 'page';
        const per = 10, total = Math.ceil(data.length / per);
        if (state.page < 1) state.page = 1;
        if (state.page > total) state.page = total;
        const start = (state.page - 1) * per, end = Math.min(start + per, data.length);
        let html = data.slice(start, end).map(item => createSubCardHTML(item)).join('');
        if (total > 1) html += `<div class="sub-pagination">
            <button class="sub-page-btn" data-index="${index}" data-page="${state.page - 1}" ${state.page <= 1 ? 'disabled' : ''}>上一页</button>
            <span style="font-size:0.8rem;">${state.page} / ${total}</span>
            <button class="sub-page-btn" data-index="${index}" data-page="${state.page + 1}" ${state.page >= total ? 'disabled' : ''}>下一页</button>
            <button class="view-all-btn" data-index="${index}">查看全部</button></div>`;
        sub.innerHTML = html;
        const btn = document.querySelector(`.sub-load-btn[data-index="${index}"]`);
        if (btn) btn.textContent = '📂 收起子资源';
    }

    function startViewAll(index) {
        const card = updateCardsData[index], sub = document.getElementById('sub-container-' + index);
        if (!card || !sub) return;
        const data = card.subCards;
        if (!data?.length) return;
        const state = subStates[index] = subStates[index] || { mode: 'all', allLoaded: 0 };
        state.mode = 'all'; state.allLoaded = 0;
        sub.innerHTML = `<button class="collapse-all-btn" data-index="${index}">⬆️ 收起全部子资源</button>`;
        (function loadMore() {
            if (state.allLoaded >= data.length) return;
            const batch = data.slice(state.allLoaded, state.allLoaded + 20);
            const frag = document.createDocumentFragment(), div = document.createElement('div');
            batch.forEach(item => { div.innerHTML = createSubCardHTML(item); while (div.firstChild) frag.appendChild(div.firstChild); });
            sub.appendChild(frag);
            state.allLoaded += batch.length;
            if (state.allLoaded < data.length) {
                const sentinelDiv = document.createElement('div'); sentinelDiv.className = 'sub-all-sentinel'; sentinelDiv.style.height = '1px';
                sub.appendChild(sentinelDiv);
                new IntersectionObserver((entries, obs) => { if (entries[0].isIntersecting) { obs.disconnect(); loadMore(); } }, { rootMargin: '200px' }).observe(sentinelDiv);
            }
        })();
        const btn = document.querySelector(`.sub-load-btn[data-index="${index}"]`);
        if (btn) btn.textContent = '📂 收起子资源';
    }

    function hideSubContainer(index) {
        const sub = document.getElementById('sub-container-' + index);
        if (sub) sub.style.display = 'none';
        const btn = document.querySelector(`.sub-load-btn[data-index="${index}"]`);
        if (btn) btn.textContent = `📂 查看全部子资源 (${updateCardsData[index].subCards.length}个)`;
    }

    document.addEventListener('click', function(e) {
        const t = e.target;
        if (t.matches('.sub-page-btn')) {
            const idx = parseInt(t.dataset.index), page = parseInt(t.dataset.page);
            if (subStates[idx]?.mode === 'page') { subStates[idx].page = page; renderSubPage(idx); scrollToCard(idx); }
        } else if (t.matches('.view-all-btn')) startViewAll(parseInt(t.dataset.index));
        else if (t.matches('.collapse-all-btn')) {
            const idx = parseInt(t.dataset.index); hideSubContainer(idx); subStates[idx] = { mode: 'page', page: 1 };
        } else if (t.matches('.sub-load-btn')) {
            const idx = parseInt(t.dataset.index);
            const sub = document.getElementById('sub-container-' + idx);
            if (sub) {
                if (sub.style.display !== 'none') hideSubContainer(idx);
                else { if (!subStates[idx] || subStates[idx].mode !== 'page') subStates[idx] = { mode: 'page', page: 1 }; renderSubPage(idx); sub.style.display = 'block'; }
            }
        }
    });

    function loadMoreCards() {
        if (isLoading || loadedCount >= updateCardsData.length) return;
        isLoading = true;
        const batch = updateCardsData.slice(loadedCount, loadedCount + LOAD_BATCH);
        const frag = document.createDocumentFragment(), div = document.createElement('div');
        batch.forEach((card, idx) => { div.innerHTML = createUpdateCardHTML(card, loadedCount + idx); while (div.firstChild) frag.appendChild(div.firstChild); });
        container.appendChild(frag);
        loadedCount += batch.length;
        isLoading = false;
    }

    loadMoreCards();
    new IntersectionObserver((entries) => { if (entries[0].isIntersecting && !isLoading && loadedCount < updateCardsData.length) loadMoreCards(); }, { rootMargin: '200px' }).observe(sentinel);
}

// ========== 全局交互事件绑定 ==========
function bindGlobalEvents() {
    // 底部导航
    document.querySelectorAll('.bottom-nav .nav-btn[data-target]').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.dataset.target;
            if (targetId === 'top') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                showToast('🔝 已回到顶部', 'success');
            } else {
                const target = document.getElementById(targetId);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    showToast('📌 已定位', 'success');
                }
            }
        });
    });

    // 弹窗
    const shareModal = document.getElementById('shareModal');
    const tutorialModal = document.getElementById('tutorialModal');
    if (shareModal) {
        document.querySelector('[data-action="show-share-dialog"]')?.addEventListener('click', () => shareModal.classList.add('active'));
        document.getElementById('closeModalBtn')?.addEventListener('click', () => shareModal.classList.remove('active'));
        shareModal.addEventListener('click', (e) => { if (e.target === shareModal) shareModal.classList.remove('active'); });
    }
    if (tutorialModal) {
        document.getElementById('closeTutorialBtn')?.addEventListener('click', () => tutorialModal.classList.remove('active'));
        tutorialModal.addEventListener('click', (e) => { if (e.target === tutorialModal) tutorialModal.classList.remove('active'); });
    }
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (shareModal?.classList.contains('active')) shareModal.classList.remove('active');
            if (tutorialModal?.classList.contains('active')) tutorialModal.classList.remove('active');
        }
    });

    // 消息气泡
    const msgBubble = document.getElementById('msgBubble');
    if (msgBubble) {
        msgBubble.addEventListener('click', () => {
            try {
                const ctx = new (window.AudioContext || window.webkitAudioContext)();
                const playBeep = (t, dur, freq) => { const o = ctx.createOscillator(), g = ctx.createGain(); o.type = 'sine'; o.frequency.value = freq; g.gain.setValueAtTime(0.3, t); g.gain.exponentialRampToValueAtTime(0.0001, t + dur); o.connect(g); g.connect(ctx.destination); o.start(t); o.stop(t + dur); };
                const now = ctx.currentTime; playBeep(now, 0.1, 880); playBeep(now + 0.15, 0.1, 880);
            } catch (e) {}
            tutorialModal?.classList.add('active');
        });
    }

    // 滚动到更新列表
    document.querySelector('[data-action="scroll-to-updates"]')?.addEventListener('click', () => {
        document.getElementById('update-list')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        showToast('📅 已跳转到更新列表', 'success');
    });

    // 全局复制和预览委托
    document.addEventListener('click', function(e) {
        const t = e.target;
        if (t.matches && (t.matches('.pwd-tag[data-copy]') || t.matches('.pwd-inline[data-copy]'))) {
            e.preventDefault();
            copyToClipboard(t.dataset.copy, t);
        }
        if (t.matches && t.matches('.preview-gallery img') && !t.hasAttribute('onclick')) {
            openGallery(t);
        }
    });
}

// ========== 工具函数 ==========
window.toggleCollapse = function(titleEl) {
    const card = titleEl.closest('.card, .qq-card');
    if (!card) return;
    const content = card.querySelector('.collapse-content');
    if (!content) return;
    content.classList.toggle('collapsed');
    const indicator = titleEl.querySelector('.toggle-indicator');
    if (indicator) {
        const isCollapsed = content.classList.contains('collapsed');
        indicator.textContent = isCollapsed ? '▶' : '▼';
        indicator.className = 'toggle-indicator ' + (isCollapsed ? 'closed' : 'open');
    }
};

// Toast
let toastTimer;
function showToast(msg, type) {
    let toast = document.getElementById('toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast';
        toast.className = 'toast';
        document.body.appendChild(toast);
    }
    if (toastTimer) clearTimeout(toastTimer);
    toast.textContent = msg;
    toast.className = 'toast ' + (type === 'success' ? 'success' : '');
    void toast.offsetWidth;
    toast.classList.add('show');
    toastTimer = setTimeout(() => { toast.classList.remove('show'); toast.className = 'toast'; }, 1800);
}

function copyToClipboard(text, trigger) {
    if (navigator.clipboard) navigator.clipboard.writeText(text).then(() => onCopySuccess(text, trigger)).catch(() => fallbackCopy(text, trigger));
    else fallbackCopy(text, trigger);
}
function fallbackCopy(text, trigger) {
    const ta = document.createElement('textarea'); ta.value = text; ta.style.position = 'fixed'; ta.style.left = '-9999px'; document.body.appendChild(ta);
    ta.select(); ta.setSelectionRange(0, 999999);
    try { if (document.execCommand('copy')) onCopySuccess(text, trigger); else showToast('⚠️ 复制失败'); } catch (e) { showToast('⚠️ 复制失败'); }
    document.body.removeChild(ta);
}
function onCopySuccess(text, trigger) {
    showToast('✅ 已复制：' + text, 'success');
    if (trigger) { trigger.classList.add('copied-flash'); setTimeout(() => trigger.classList.remove('copied-flash'), 1200); }
}

// 灯箱
let gallery = [], curIdx = 0;
window.openGallery = function(img) {
    const lightbox = document.getElementById('lightboxOverlay');
    if (!lightbox) return;
    const gal = img.closest('.preview-gallery');
    if (!gal) return;
    const imgs = gal.querySelectorAll('img');
    gallery = Array.from(imgs).map(i => i.src);
    curIdx = Array.from(imgs).indexOf(img);
    if (curIdx === -1) curIdx = 0;
    showImage(curIdx);
    lightbox.classList.add('active');
};
function showImage(i) {
    const lightboxImg = document.getElementById('lightboxImage');
    const prevBtn = document.getElementById('lightboxPrev');
    const nextBtn = document.getElementById('lightboxNext');
    const counter = document.getElementById('lightboxCounter');
    if (!gallery.length || !lightboxImg) return;
    if (i < 0) i = 0; if (i >= gallery.length) i = gallery.length - 1;
    curIdx = i;
    lightboxImg.src = gallery[i];
    if (counter) counter.textContent = `${curIdx + 1} / ${gallery.length}`;
    if (prevBtn) prevBtn.style.display = curIdx > 0 ? 'flex' : 'none';
    if (nextBtn) nextBtn.style.display = curIdx < gallery.length - 1 ? 'flex' : 'none';
}
function closeLightbox() {
    const lightbox = document.getElementById('lightboxOverlay');
    if (lightbox) lightbox.classList.remove('active');
    setTimeout(() => {
        const img = document.getElementById('lightboxImage');
        if (img) img.src = '';
        gallery = [];
    }, 300);
}
document.addEventListener('click', function(e) {
    if (e.target.id === 'lightboxPrev') { e.stopPropagation(); if (curIdx > 0) showImage(curIdx - 1); }
    if (e.target.id === 'lightboxNext') { e.stopPropagation(); if (curIdx < gallery.length - 1) showImage(curIdx + 1); }
    if (e.target.id === 'lightboxOverlay') closeLightbox();
});
document.addEventListener('keydown', (e) => {
    const lightbox = document.getElementById('lightboxOverlay');
    if (!lightbox?.classList.contains('active')) return;
    if (e.key === 'ArrowLeft') { e.preventDefault(); if (curIdx > 0) showImage(curIdx - 1); }
    if (e.key === 'ArrowRight') { e.preventDefault(); if (curIdx < gallery.length - 1) showImage(curIdx + 1); }
    if (e.key === 'Escape') closeLightbox();
});

console.log('✅ app.js 加载完毕，所有元素已生成并绑定事件');