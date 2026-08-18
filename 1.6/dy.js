// ========== 抖音模式(dy模式) 顶部参数 ==========
// 想开启"全部"三级卡片：把 onlyYaoYiKou 改成 false 即可
const DY_CONFIG = {
    onlyYaoYiKou: true,      // true=只随机“咬一口兔娘”三级卡片；false=随机全部二级卡片下的三级卡片
    carouselInterval: 3000,  // 图片轮播间隔(毫秒)
    preCacheCount: 5         // 预缓存三级卡片数量
};

// ========== dy模式 背景音乐配置 ==========
// 音乐源：GDStudio 公共音乐 API（无需部署）+ 网易云热歌榜，循环播放热歌。
// 想换榜单：把 playlistId 换成其他歌单 ID 即可（如抖音榜歌单 ID）。
const DY_MUSIC = {
    enabled: true,           // 是否开启背景音乐
    autoplay: true,          // 进入dy模式自动播放
    volume: 0.6,             // 音量 0~1
    random: true,            // 随机播放（false=按榜单顺序）
    api: 'https://music-api.gdstudio.xyz/api.php',
    playlistId: '3778678',   // 网易云「热歌榜」，每日更新
    fallback: [              // API 失败时的兜底直链
        "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
        "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3"
    ]
};

// ========== 抖音模式 (dy模式) ==========
(function () {
    const TUTORIAL_LINK = 'https://pan.xunlei.com/s/VOzRp5FniqYezSeLudryWJ1TA1?pwd=nkm8#';
    const COMMENT_POOL = ['好看！', '求链接~', '太顶了', '已三连', '这腿绝了', '资源很好', '收藏了', '666', '感谢分享', '这是哪个Coser', '爱了爱了', 'up主好人一生平安'];

    function esc(s) {
        return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    }
    function randLike() { return 100 + Math.floor(Math.random() * 9900); }
    function randComment() { return Math.floor(Math.random() * 999); }

    // 注入样式
    const style = document.createElement('style');
    style.textContent = `
        .dy-overlay{position:fixed;inset:0;z-index:12000;background:#000;display:none;flex-direction:column;opacity:0;transition:opacity .25s ease;touch-action:none;-webkit-user-select:none;user-select:none;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','PingFang SC','Microsoft YaHei',sans-serif;}
        .dy-overlay.active{display:flex;opacity:1;}
        .dy-track{position:absolute;inset:0;display:flex;flex-direction:column;transition:transform .38s cubic-bezier(.16,1,.3,1);will-change:transform;}
        .dy-track.no-transition{transition:none!important;}
        .dy-slide{flex:0 0 100%;height:100%;width:100%;position:relative;overflow:hidden;background:#0b0b0b;}
        .dy-img-layer{position:absolute;inset:0;}
        .dy-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:none;background:#111;transition:transform .35s cubic-bezier(.4,0,.2,1);will-change:transform;}
        .dy-img-a{z-index:1;}
        .dy-img-b{z-index:2;}
        .dy-placeholder{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:1.3rem;color:#ccc;text-align:center;padding:0 24px;line-height:1.9;background:#1a1a1a;z-index:2;}
        .dy-dots{position:absolute;left:50%;bottom:74px;transform:translateX(-50%);display:flex;gap:8px;z-index:3;}
        .dy-dot{width:8px;height:8px;border-radius:50%;background:rgba(255,255,255,.45);transition:all .3s;}
        .dy-dot.on{background:#fff;width:22px;border-radius:4px;}
        .dy-top{position:absolute;top:0;left:0;right:0;z-index:10;display:flex;align-items:center;gap:12px;padding:16px 14px 30px;background:linear-gradient(180deg,rgba(0,0,0,.6),transparent);}
        .dy-close{background:rgba(255,255,255,.16);border:none;color:#fff;font-size:1.15rem;width:34px;height:34px;border-radius:50%;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
        .dy-close:active{transform:scale(.9);}
        .dy-music-bar{display:flex;align-items:center;gap:8px;flex:1;max-width:94%;min-width:0;background:rgba(0,0,0,.38);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,.12);padding:8px 10px 8px 12px;border-radius:22px;cursor:pointer;overflow:hidden;user-select:none;}
        .dy-music-bar-ico{font-size:1.4rem;flex-shrink:0;display:inline-block;}
        .dy-music-bar.playing .dy-music-bar-ico{animation:dySpin 4s linear infinite;}
        .dy-music-bar.paused .dy-music-bar-ico{opacity:.5;}
        .dy-music-bar-text{display:flex;flex-direction:column;min-width:0;flex-shrink:0;max-width:34%;}
        .dy-music-bar-name{font-size:.8rem;font-weight:700;color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;line-height:1.25;}
        .dy-music-bar-artist{font-size:.66rem;color:rgba(255,255,255,.78);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;line-height:1.25;}
        .dy-music-lyric{flex:1;min-width:0;font-size:.7rem;color:rgba(255,255,255,.9);white-space:nowrap;overflow:hidden;text-align:center;line-height:1.35;}
        .dy-music-lyric .lrc-text{display:inline-block;white-space:nowrap;}
        .dy-music-lyric .lrc-text.scroll{animation:lrcScroll 9s linear infinite;padding-left:100%;}
        @keyframes lrcScroll{to{transform:translateX(-100%);}}
        .dy-music-controls{display:flex;align-items:center;gap:40px;flex-shrink:0;}
        .dy-music-btn{background:none;border:none;color:#fff;font-size:1.45rem;cursor:pointer;padding:10px 0;line-height:1;}
        .dy-music-btn:active{transform:scale(.85);}
        .dy-info{position:absolute;left:14px;bottom:112px;right:78px;z-index:4;text-shadow:0 1px 6px rgba(0,0,0,.6);}
        .dy-tag{font-weight:700;font-size:.98rem;color:#fff;margin-bottom:6px;}
        .dy-name{font-size:.86rem;line-height:1.45;color:#fff;opacity:.95;margin-bottom:8px;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;}
        .dy-link-row{font-size:.74rem;color:#ffd0dd;opacity:.95;word-break:break-all;display:-webkit-box;-webkit-line-clamp:1;-webkit-box-orient:vertical;overflow:hidden;}
        .dy-right{position:absolute;right:12px;bottom:160px;z-index:5;display:flex;flex-direction:column;align-items:center;gap:22px;}
        .dy-act{background:none;border:none;color:#fff;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:3px;padding:0;}
        .dy-act-ico{font-size:1.9rem;filter:drop-shadow(0 2px 4px rgba(0,0,0,.5));transition:transform .15s;}
        .dy-act:active .dy-act-ico{transform:scale(1.25);}
        .dy-act-num{font-size:.72rem;color:#fff;text-shadow:0 1px 4px rgba(0,0,0,.6);}
        .dy-act.dy-like.liked .dy-act-ico{animation:dyHeart .4s ease;}
        @keyframes dyHeart{0%{transform:scale(1)}40%{transform:scale(1.4)}100%{transform:scale(1)}}
        .dy-act.dy-music .dy-act-ico{font-size:2.1rem;}
        .dy-act.dy-music.playing .dy-act-ico{animation:dySpin 4s linear infinite;}
        .dy-act.dy-music.paused .dy-act-ico{opacity:.45;filter:grayscale(.4);}
        @keyframes dySpin{from{transform:rotate(0)}to{transform:rotate(360deg)}}
        .dy-bottom-actions{position:absolute;right:12px;bottom:14px;z-index:6;display:flex;gap:8px;}
        .dy-btn{display:inline-flex;align-items:center;justify-content:center;gap:4px;padding:11px 16px;border-radius:24px;font-size:.85rem;font-weight:700;text-decoration:none;color:#fff;white-space:nowrap;box-shadow:0 4px 14px rgba(0,0,0,.35);}
        .dy-btn.dy-tutorial{background:rgba(124,58,237,.92);}
        .dy-btn.dy-tutorial:active{transform:scale(.95);}
        .dy-btn.dy-download{background:linear-gradient(135deg,#e8618c,#ff5f7e);animation:dyPulse 1.6s infinite;}
        @keyframes dyPulse{0%,100%{box-shadow:0 4px 14px rgba(232,97,140,.5)}50%{box-shadow:0 4px 24px rgba(232,97,140,.9)}}
        .dy-swipe-hint{position:absolute;left:50%;bottom:88px;transform:translateX(-50%);z-index:4;font-size:.68rem;color:rgba(255,255,255,.72);pointer-events:none;text-shadow:0 1px 4px rgba(0,0,0,.6);transition:opacity .4s;}
        .dy-swipe-hint.hide{opacity:0;}
        .dy-autoslide{position:absolute;right:12px;bottom:96px;z-index:6;display:flex;align-items:center;gap:5px;font-size:.68rem;color:rgba(255,255,255,.85);background:rgba(0,0,0,.35);padding:5px 10px;border-radius:14px;cursor:pointer;text-shadow:0 1px 3px rgba(0,0,0,.6);}
        .dy-autoslide input{width:13px;height:13px;margin:0;accent-color:#e8618c;}
        .dy-heart-burst{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);font-size:5rem;pointer-events:none;z-index:8;filter:drop-shadow(0 4px 14px rgba(232,97,140,.6));animation:dyHeartBurst .85s ease forwards;}
        @keyframes dyHeartBurst{0%{opacity:0;transform:translate(-50%,-50%) scale(0)}30%{opacity:1;transform:translate(-50%,-50%) scale(1.25)}55%{transform:translate(-50%,-50%) scale(1)}100%{opacity:0;transform:translate(-50%,-62%) scale(1.35)}}
    `;
    document.head.appendChild(style);

    let overlay = null, track = null;
    let pool = [];
    let items = [], slides = [];
    let pos = 0, overlayH = 0;
    let carouselTimer = null, curImgIdx = 0;
    let opened = false, lastPicked = null, hinted = false, wheelLock = false;
    let audio = null, musicIdx = 0, musicPlaying = false, musicErrCount = 0;
    let hotSongs = [], musicLoaded = false;
    let lyricLines = [], curLyricIdx = -1;
    let imgState = { scale: 1, tx: 0, ty: 0 };
    let autoSlideOn = false, autoSlideTimer = null;
    let zoomTimer = null;

    function buildPool() {
        const data = window.__CARDS_DATA__ || (typeof updateCardsData !== 'undefined' ? updateCardsData : []);
        const p = [];
        data.forEach(card => {
            (card.subCards || []).forEach(sub => {
                (sub.subSubCards || []).forEach(item => {
                    if (DY_CONFIG.onlyYaoYiKou && (sub.name || '').indexOf('咬一口兔娘') === -1) return;
                    p.push({
                        name: item.name || '未命名',
                        link: item.link || '',
                        pwd: item.pwd || '',
                        images: (item.images || []).filter(Boolean),
                        subName: sub.name || '',
                        cardName: card.name || '',
                        tag: card.tag || sub.name || ''
                    });
                });
            });
        });
        return p;
    }

    function pickRandom() {
        if (!pool.length) return null;
        if (pool.length === 1) return pool[0];
        let c, guard = 0;
        do { c = pool[Math.floor(Math.random() * pool.length)]; guard++; } while (c === lastPicked && guard < 30);
        lastPicked = c;
        return c;
    }

    function preloadImages(card) {
        (card.images || []).forEach(src => { const im = new Image(); im.src = src; });
    }

    function createSlide(card) {
        const slide = document.createElement('div');
        slide.className = 'dy-slide';
        const hasImgs = card.images && card.images.length > 0;
        const dots = (card.images || []).map((_, i) => `<span class="dy-dot${i === 0 ? ' on' : ''}"></span>`).join('');
        slide.innerHTML = `
            <div class="dy-img-layer">
                <img class="dy-img dy-img-a" alt="" draggable="false" />
                <img class="dy-img dy-img-b" alt="" draggable="false" />
                <div class="dy-placeholder" ${hasImgs ? 'style="display:none;"' : ''}>抱歉图片丢失了 5555-</div>
                ${hasImgs ? `<div class="dy-dots">${dots}</div>` : ''}
            </div>
            <div class="dy-right">
                <button class="dy-act dy-like"><span class="dy-act-ico">❤️</span><span class="dy-act-num">${randLike()}</span></button>
                <button class="dy-act dy-comment"><span class="dy-act-ico">💬</span><span class="dy-act-num">${randComment()}</span></button>
            </div>
            <div class="dy-info">
                <div class="dy-tag">@${esc(card.subName || card.cardName || '未知')}</div>
                <div class="dy-name">${esc(card.name)}</div>
                <div class="dy-link-row">🔗 ${esc(card.link || '暂无链接')}${card.pwd ? ' · 提取码 ' + esc(card.pwd) : ''}</div>
            </div>
            <div class="dy-bottom-actions">
                <a class="dy-btn dy-tutorial" href="${TUTORIAL_LINK}" target="_blank" rel="noopener">📖 解压教程</a>
                <a class="dy-btn dy-download" href="${card.link ? esc(card.link) : '#'}" target="_blank" rel="noopener" ${card.link ? '' : 'style="pointer-events:none;opacity:.6;"'}>📥 前往下载</a>
            </div>
            <div class="dy-swipe-hint">↑ 上滑换一个 · ↓ 下滑返回</div>
        `;
        slide.querySelectorAll('.dy-img').forEach(imgEl => {
            imgEl.addEventListener('error', () => {
                const ph = slide.querySelector('.dy-placeholder');
                if (ph) ph.style.display = 'flex';
                imgEl.style.display = 'none';
            });
        });
        return slide;
    }

    function appendCard(card) {
        if (!card) return;
        items.push(card);
        const slide = createSlide(card);
        slides.push(slide);
        track.appendChild(slide);
        preloadImages(card);
    }

    function ensureAhead() {
        let guard = 0;
        while ((items.length - 1 - pos) < DY_CONFIG.preCacheCount && guard < 30) {
            const c = pickRandom();
            if (!c) break;
            appendCard(c);
            guard++;
        }
    }

    function stopCarousel() {
        if (carouselTimer) { clearInterval(carouselTimer); carouselTimer = null; }
    }

    function setSlideImage(idx, imgIdx, dir) {
        const slide = slides[idx], card = items[idx];
        if (!slide || !card) return;
        const imgs = card.images || [];
        const a = slide.querySelector('.dy-img-a');
        const b = slide.querySelector('.dy-img-b');
        const ph = slide.querySelector('.dy-placeholder');
        const dots = slide.querySelectorAll('.dy-dot');
        if (!imgs.length || !imgs[imgIdx]) {
            if (a) a.style.display = 'none';
            if (b) b.style.display = 'none';
            if (ph) ph.style.display = 'flex';
            return;
        }
        if (ph) ph.style.display = 'none';
        dots.forEach((d, i) => d.classList.toggle('on', i === imgIdx));
        if (!a || !b) return;

        const curIsB = slide.dataset.curImg === 'b';
        const cur = curIsB ? b : a;
        const nxt = curIsB ? a : b;

        if (dir === 0 || !cur.getAttribute('src')) {
            cur.style.transition = 'none';
            cur.style.transform = 'translateX(0)';
            cur.style.display = 'block';
            cur.src = imgs[imgIdx];
            cur.style.zIndex = 1;
            slide.dataset.curImg = curIsB ? 'b' : 'a';
            return;
        }

        if (nxt.getAttribute('src') === imgs[imgIdx]) return;

        nxt.style.transition = 'none';
        nxt.style.transform = dir > 0 ? 'translateX(100%)' : 'translateX(-100%)';
        nxt.style.display = 'block';
        nxt.src = imgs[imgIdx];
        nxt.style.zIndex = 2;
        cur.style.zIndex = 1;

        void nxt.offsetWidth;

        nxt.style.transition = 'transform .35s cubic-bezier(.4,0,.2,1)';
        cur.style.transition = 'transform .35s cubic-bezier(.4,0,.2,1)';
        nxt.style.transform = 'translateX(0)';
        cur.style.transform = dir > 0 ? 'translateX(-100%)' : 'translateX(100%)';

        clearTimeout(slide._swapTimer);
        slide._swapTimer = setTimeout(() => {
            cur.style.display = 'none';
            cur.removeAttribute('src');
            cur.style.transform = 'translateX(0)';
            slide.dataset.curImg = nxt === a ? 'a' : 'b';
        }, 360);
    }

    function startCarousel(idx, reset) {
        stopCarousel();
        if (autoSlideTimer) { clearTimeout(autoSlideTimer); autoSlideTimer = null; }
        const card = items[idx];
        if (!card || !(card.images || []).length) {
            if (autoSlideOn) autoSlideTimer = setTimeout(() => { if (opened) goNext(); }, DY_CONFIG.carouselInterval);
            return;
        }
        if (reset) { curImgIdx = 0; setSlideImage(idx, 0, 0); }
        if (imgState.scale > 1) return;
        if ((card.images || []).length <= 1) {
            if (autoSlideOn) autoSlideTimer = setTimeout(() => { if (opened) goNext(); }, DY_CONFIG.carouselInterval);
            return;
        }
        carouselTimer = setInterval(() => {
            if (autoSlideOn && curImgIdx >= card.images.length - 1) {
                goNext();
            } else {
                curImgIdx = (curImgIdx + 1) % card.images.length;
                setSlideImage(idx, curImgIdx, 1);
            }
        }, DY_CONFIG.carouselInterval);
    }

    // ===== 图片缩放 / 切图 / 点赞 / 自动上滑 =====
    function getCurrentImg() {
        return slides[pos] ? slides[pos].querySelector('.dy-img-layer') : null;
    }
    function applyImgTransform() {
        const img = getCurrentImg();
        if (!img) return;
        img.style.transform = (imgState.scale > 1)
            ? `translate(${imgState.tx}px,${imgState.ty}px) scale(${imgState.scale})`
            : '';
    }
    function scheduleZoomReset() {
        if (zoomTimer) clearTimeout(zoomTimer);
        zoomTimer = setTimeout(() => { resetImgZoom(false); }, 1500);
    }
    function resetImgZoom(keepCarousel) {
        if (zoomTimer) { clearTimeout(zoomTimer); zoomTimer = null; }
        imgState.scale = 1; imgState.tx = 0; imgState.ty = 0;
        applyImgTransform();
        if (!keepCarousel) startCarousel(pos, false);
    }
    function setImgZoom(newScale) {
        imgState.scale = Math.max(1, Math.min(5, newScale));
        if (imgState.scale <= 1) { imgState.tx = 0; imgState.ty = 0; applyImgTransform(); startCarousel(pos, false); }
        else { applyImgTransform(); stopCarousel(); scheduleZoomReset(); }
    }
    function panImg(dx, dy) {
        imgState.tx += dx;
        imgState.ty += dy;
        applyImgTransform();
        scheduleZoomReset();
    }
    function swipeImage(dir) {
        const card = items[pos];
        if (!card || !(card.images || []).length) return;
        const len = card.images.length;
        curImgIdx = (curImgIdx + dir + len) % len;
        setSlideImage(pos, curImgIdx, dir);
        startCarousel(pos, false);
    }
    function likeCurrent() {
        const slide = slides[pos];
        if (!slide) return;
        const like = slide.querySelector('.dy-like');
        const numEl = like ? like.querySelector('.dy-act-num') : null;
        if (like && !like.classList.contains('liked')) {
            like.classList.add('liked');
            if (numEl) numEl.textContent = (parseInt(numEl.textContent, 10) || 0) + 1;
        }
        const burst = document.createElement('div');
        burst.className = 'dy-heart-burst';
        burst.textContent = '❤️';
        slide.appendChild(burst);
        setTimeout(() => burst.remove(), 900);
    }
    function startAutoSlide() {
        autoSlideOn = true;
        startCarousel(pos, false);
    }
    function stopAutoSlide() {
        autoSlideOn = false;
        startCarousel(pos, false);
    }

    function goTo(n) {
        if (n < 0) n = 0;
        if (n >= items.length) n = items.length - 1;
        pos = n;
        if (track) track.style.transform = `translateY(${-pos * overlayH}px)`;
        resetImgZoom(true);
        startCarousel(pos, true);
    }

    function goNext() {
        ensureAhead();
        pos++;
        goTo(pos);
        trimHistory();
    }

    function goPrev() {
        if (pos > 0) { pos--; goTo(pos); }
    }

    function trimHistory() {
        const KEEP = 8;
        if (pos > KEEP) {
            const cut = pos - KEEP;
            for (let i = 0; i < cut; i++) { if (slides[i]) slides[i].remove(); }
            items = items.slice(cut);
            slides = slides.slice(cut);
            pos -= cut;
            if (track) track.style.transform = `translateY(${-pos * overlayH}px)`;
            startCarousel(pos);
        }
    }

    // ===== 背景音乐（GDStudio 公共 API + 网易云热歌榜） =====
    function initAudio() {
        if (!DY_MUSIC.enabled) return;
        if (audio) return;
        audio = new Audio();
        audio.preload = 'auto';
        audio.volume = Math.min(1, Math.max(0, DY_MUSIC.volume || 0.6));
        audio.addEventListener('ended', nextMusic);
        audio.addEventListener('playing', () => { musicErrCount = 0; });
        audio.addEventListener('error', () => { if (musicPlaying) nextMusic(); });
        audio.addEventListener('timeupdate', updateLyric);
    }
    function updateSongInfo(name, artist) {
        const n = overlay && overlay.querySelector('#dyMusicName');
        const a = overlay && overlay.querySelector('#dyMusicArtist');
        if (n) n.textContent = name || '未知歌曲';
        if (a) a.textContent = artist || '';
    }
    function syncMusicUI() {
        if (!overlay) return;
        const bar = overlay.querySelector('.dy-music-bar');
        if (bar) { bar.classList.toggle('playing', musicPlaying); bar.classList.toggle('paused', !musicPlaying); }
    }
    function loadHotSongs() {
        if (musicLoaded) return Promise.resolve(hotSongs);
        const url = `${DY_MUSIC.api}?types=playlist&source=netease&id=${DY_MUSIC.playlistId}`;
        return fetch(url).then(r => r.json()).then(d => {
            const tracks = (d && d.playlist && d.playlist.tracks) || [];
            hotSongs = tracks.map(t => ({
                id: String(t.id || ''),
                name: t.name || '',
                artist: (t.ar && t.ar[0] && t.ar[0].name) || ''
            })).filter(s => s.id);
            musicLoaded = true;
            return hotSongs;
        }).catch(() => { return []; });
    }
    function fetchSongUrl(id) {
        const url = `${DY_MUSIC.api}?types=url&source=netease&id=${id}`;
        return fetch(url).then(r => r.json()).then(d => (d && d.url) ? d.url : null).catch(() => null);
    }
    function playFallback() {
        if (!audio || !(DY_MUSIC.fallback || []).length) return;
        const src = DY_MUSIC.fallback[Math.floor(Math.random() * DY_MUSIC.fallback.length)];
        updateSongInfo('备用音乐', '');
        hideLyric();
        audio.src = src;
        audio.play().then(() => { musicPlaying = true; syncMusicUI(); }).catch(() => { musicPlaying = false; syncMusicUI(); });
    }
    function playMusic() {
        initAudio();
        if (!audio) return;
        if (hotSongs.length) {
            const song = hotSongs[musicIdx % hotSongs.length];
            updateSongInfo(song.name, song.artist);
            loadLyric(song.id);
            fetchSongUrl(song.id).then(u => {
                if (!u) { playFallback(); return; }
                if (audio.getAttribute('src') !== u) audio.src = u;
                audio.play().then(() => { musicPlaying = true; syncMusicUI(); }).catch(() => { musicPlaying = false; syncMusicUI(); });
            });
        } else {
            loadHotSongs().then(songs => {
                if (songs && songs.length) {
                    musicIdx = Math.floor(Math.random() * songs.length);
                    playMusic();
                } else { playFallback(); }
            });
        }
    }
    function pauseMusic() {
        if (audio) audio.pause();
        musicPlaying = false;
        syncMusicUI();
    }
    function toggleMusic() {
        if (musicPlaying) pauseMusic(); else playMusic();
    }
    function nextMusic() {
        if (!hotSongs.length) { playFallback(); return; }
        if (DY_MUSIC.random) {
            let n;
            do { n = Math.floor(Math.random() * hotSongs.length); } while (n === musicIdx && hotSongs.length > 1);
            musicIdx = n;
        } else {
            musicIdx = (musicIdx + 1) % hotSongs.length;
        }
        playMusic();
    }
    function prevMusic() {
        if (!hotSongs.length) { playFallback(); return; }
        if (DY_MUSIC.random) {
            let n;
            do { n = Math.floor(Math.random() * hotSongs.length); } while (n === musicIdx && hotSongs.length > 1);
            musicIdx = n;
        } else {
            musicIdx = (musicIdx - 1 + hotSongs.length) % hotSongs.length;
        }
        playMusic();
    }
    function parseLrc(lrc) {
        const lines = [];
        const re = /\[(\d{2}):(\d{2})(?:[.:](\d{1,3}))?\]/g;
        String(lrc || '').split('\n').forEach(line => {
            const times = [];
            let m;
            while ((m = re.exec(line)) !== null) {
                times.push(parseInt(m[1]) * 60 + parseInt(m[2]) + (m[3] ? parseInt(m[3].padEnd(3, '0')) / 1000 : 0));
            }
            const text = line.replace(/\[[^\]]*\]/g, '').trim();
            if (!text) return;
            times.forEach(t => lines.push({ time: t, text }));
        });
        lines.sort((a, b) => a.time - b.time);
        return lines;
    }
    function hideLyric() {
        const el = overlay && overlay.querySelector('#dyMusicLyric');
        if (el) { el.style.display = 'none'; el.innerHTML = ''; }
        lyricLines = [];
        curLyricIdx = -1;
    }
    function updateLyric() {
        if (!audio || !lyricLines.length) return;
        const t = audio.currentTime;
        let idx = -1;
        for (let i = 0; i < lyricLines.length; i++) {
            if (lyricLines[i].time <= t) idx = i; else break;
        }
        if (idx === curLyricIdx) return;
        curLyricIdx = idx;
        const el = overlay && overlay.querySelector('#dyMusicLyric');
        if (!el) return;
        if (idx < 0) { el.innerHTML = ''; return; }
        el.innerHTML = `<span class="lrc-text">${esc(lyricLines[idx].text)}</span>`;
        const span = el.querySelector('.lrc-text');
        requestAnimationFrame(() => {
            if (span && span.scrollWidth > el.clientWidth) span.classList.add('scroll');
        });
    }
    function loadLyric(songId) {
        if (!songId) { hideLyric(); return; }
        const url = `${DY_MUSIC.api}?types=lyric&source=netease&id=${songId}`;
        fetch(url).then(r => r.json()).then(d => {
            lyricLines = parseLrc(d && d.lyric);
            curLyricIdx = -1;
            const el = overlay && overlay.querySelector('#dyMusicLyric');
            if (lyricLines.length) {
                if (el) el.style.display = '';
                updateLyric();
            } else {
                hideLyric();
            }
        }).catch(() => { hideLyric(); });
    }

    function closeDyMode() {
        opened = false;
        stopCarousel();
        stopAutoSlide();
        pauseMusic();
        if (overlay) overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    function openDyMode() {
        pool = buildPool();
        if (!pool.length) { showToast('⚠️ dy模式暂无可用资源', 'error'); return; }
        if (!overlay) createOverlay();
        items = []; slides = []; pos = 0;
        track.innerHTML = '';
        overlayH = overlay.clientHeight || window.innerHeight;
        appendCard(pickRandom());
        ensureAhead();
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        opened = true;
        hinted = false;
        const autoChk = overlay.querySelector('#dyAutoSlide');
        if (autoChk) autoChk.checked = false;
        stopAutoSlide();
        updateSongInfo('加载中...', '');
        hideLyric();
        syncMusicUI();
        overlay.querySelectorAll('.dy-swipe-hint').forEach(h => h.classList.remove('hide'));
        setTimeout(() => {
            overlay.querySelectorAll('.dy-swipe-hint').forEach(h => h.classList.add('hide'));
        }, 5000);
        goTo(0);
        if (DY_MUSIC.autoplay) { playMusic(); } else { syncMusicUI(); }
    }

    function createOverlay() {
        overlay = document.createElement('div');
        overlay.id = 'dyOverlay';
        overlay.className = 'dy-overlay';
        overlay.innerHTML = `
            <div class="dy-top">
                <button class="dy-close" id="dyClose">✕</button>
                <div class="dy-music-bar" id="dyMusicBar">
                    <span class="dy-music-bar-ico">🎵</span>
                    <div class="dy-music-bar-text">
                        <div class="dy-music-bar-name" id="dyMusicName">加载中...</div>
                        <div class="dy-music-bar-artist" id="dyMusicArtist"></div>
                    </div>
                    <div class="dy-music-lyric" id="dyMusicLyric" style="display:none;"></div>
                    <div class="dy-music-controls">
                        <button class="dy-music-btn" data-music="prev">⏮</button>
                        <button class="dy-music-btn" data-music="toggle">⏯</button>
                        <button class="dy-music-btn" data-music="next">⏭</button>
                    </div>
                </div>
            </div>
            <div class="dy-track" id="dyTrack"></div>
            <label class="dy-autoslide"><input type="checkbox" id="dyAutoSlide" /> 自动上滑</label>
        `;
        document.body.appendChild(overlay);
        track = overlay.querySelector('#dyTrack');
        overlayH = overlay.clientHeight || window.innerHeight;
        overlay.querySelector('#dyClose').addEventListener('click', closeDyMode);
        window.addEventListener('resize', () => { overlayH = overlay.clientHeight || window.innerHeight; if (opened) goTo(pos); });
        overlay.querySelector('#dyAutoSlide').addEventListener('change', e => {
            if (e.target.checked) startAutoSlide(); else stopAutoSlide();
        });
        bindSwipe();

        overlay.addEventListener('click', e => {
            const musicBtn = e.target.closest && e.target.closest('.dy-music-btn');
            if (musicBtn) {
                const action = musicBtn.dataset.music;
                if (action === 'prev') prevMusic();
                else if (action === 'next') nextMusic();
                else toggleMusic();
                return;
            }
            const music = e.target.closest && e.target.closest('.dy-music-bar');
            if (music) { toggleMusic(); return; }
            const like = e.target.closest && e.target.closest('.dy-like');
            if (like) {
                const numEl = like.querySelector('.dy-act-num');
                const liked = like.classList.toggle('liked');
                if (numEl) {
                    let v = parseInt(numEl.textContent, 10) || 0;
                    numEl.textContent = liked ? v + 1 : v - 1;
                }
                return;
            }
            const comment = e.target.closest && e.target.closest('.dy-comment');
            if (comment) {
                showToast('💬 ' + COMMENT_POOL[Math.floor(Math.random() * COMMENT_POOL.length)]);
                return;
            }
        });
    }

    function bindSwipe() {
        let mode = null;           // null | 'card-v' | 'img-h' | 'pan' | 'pinch'
        let startX = 0, startY = 0;
        let movedX = 0, movedY = 0;
        let lastPanX = 0, lastPanY = 0;
        let pinchDist = 0, pinchScale = 1;
        let lastTapTime = 0, tapTimer = null;
        let dragging = false;
        let downOnBtn = false;

        const getDist = ts => Math.hypot(ts[0].clientX - ts[1].clientX, ts[0].clientY - ts[1].clientY);

        const beginSingle = (x, y, target) => {
            startX = x; startY = y; movedX = 0; movedY = 0;
            lastPanX = 0; lastPanY = 0;
            downOnBtn = !!(target && target.closest && target.closest('.dy-music-btn, .dy-like, .dy-comment, .dy-music-bar, .dy-autoslide, .dy-close'));
            mode = null; dragging = true;
            track.classList.add('no-transition');
        };

        const moveSingle = (x, y) => {
            if (!dragging) return;
            const dx = x - startX, dy = y - startY;
            movedX = dx; movedY = dy;
            if (mode === null) {
                if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
                if (imgState.scale > 1) mode = 'pan';
                else if (Math.abs(dx) > Math.abs(dy)) mode = 'img-h';
                else mode = 'card-v';
            }
            if (mode === 'card-v') {
                track.style.transform = `translateY(${-pos * overlayH + dy}px)`;
            } else if (mode === 'pan') {
                panImg(dx - lastPanX, dy - lastPanY);
                lastPanX = dx; lastPanY = dy;
            }
        };

        const endSingle = () => {
            if (!dragging) return;
            dragging = false;
            track.classList.remove('no-transition');
            if (mode === null) {
                if (downOnBtn) { downOnBtn = false; mode = null; return; }
                const now = Date.now();
                if (now - lastTapTime < 300) {
                    if (tapTimer) clearTimeout(tapTimer);
                    tapTimer = null; lastTapTime = 0;
                    likeCurrent();
                } else {
                    lastTapTime = now;
                    tapTimer = setTimeout(() => {
                        if (Date.now() - lastTapTime >= 300) {
                            if (imgState.scale > 1) resetImgZoom(false);
                        }
                    }, 300);
                }
            } else if (mode === 'card-v') {
                const t = 60;
                if (movedY < -t) goNext();
                else if (movedY > t) goPrev();
                else goTo(pos);
            } else if (mode === 'img-h') {
                const t = 40;
                if (movedX < -t) swipeImage(1);
                else if (movedX > t) swipeImage(-1);
            }
            mode = null;
        };

        overlay.addEventListener('touchstart', e => {
            if (e.touches.length === 2) {
                mode = 'pinch'; dragging = false;
                pinchDist = getDist(e.touches); pinchScale = imgState.scale;
                return;
            }
            if (e.touches.length === 1) beginSingle(e.touches[0].clientX, e.touches[0].clientY, e.target);
        }, { passive: true });

        overlay.addEventListener('touchmove', e => {
            if (e.touches.length === 2 && mode === 'pinch') {
                setImgZoom(pinchScale * (getDist(e.touches) / pinchDist));
                e.preventDefault();
                return;
            }
            if (e.touches.length === 1) {
                moveSingle(e.touches[0].clientX, e.touches[0].clientY);
                if (mode === 'card-v' || mode === 'img-h' || mode === 'pan') e.preventDefault();
            }
        }, { passive: false });

        overlay.addEventListener('touchend', e => {
            if (mode === 'pinch') { mode = null; return; }
            if (e.touches.length === 0) endSingle();
        }, { passive: true });

        overlay.addEventListener('touchcancel', () => { mode = null; dragging = false; track.classList.remove('no-transition'); }, { passive: true });

        overlay.addEventListener('mousedown', e => { if (e.button === 0) beginSingle(e.clientX, e.clientY, e.target); });
        window.addEventListener('mousemove', e => { if (dragging) moveSingle(e.clientX, e.clientY); });
        window.addEventListener('mouseup', () => { endSingle(); });

        overlay.addEventListener('wheel', e => {
            e.preventDefault();
            if (wheelLock) return;
            wheelLock = true;
            setTimeout(() => { wheelLock = false; }, 400);
            if (e.deltaY > 0) goNext(); else goPrev();
        }, { passive: false });

        window.addEventListener('keydown', e => {
            if (!opened) return;
            if (e.key === 'ArrowUp') { e.preventDefault(); goPrev(); }
            else if (e.key === 'ArrowDown') { e.preventDefault(); goNext(); }
            else if (e.key === 'Escape') closeDyMode();
        });
    }

    // 入口按钮（buildPage 之后才存在，用事件委托）
    document.addEventListener('click', e => {
        if (e.target.closest && e.target.closest('#dyModeBtn')) openDyMode();
    });

    console.log('✅ dy模式已加载：上滑随机换图 / 轮播 / 前往下载 / 解压教程 / 点赞评论');
})();