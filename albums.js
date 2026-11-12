/* St. Mary's Convent School - Albums gallery
   6 horizontal albums (accordion on desktop, snap carousel on phones),
   photos drifting vertically inside every card, vertical photo wall + lightbox on open.
   Self-contained: injects its own CSS, needs only img/albums/<folder>/p001.webp ... */
(function () {
  'use strict';

  var BASE = 'img/albums/';
  var A = [
    ['01-gandhi-jayanti-2026', 'Gandhi Jayanti 2026', 17],
    ['02-investiture-ceremony', 'Investiture Ceremony', 52],
    ['03-icse-result-2023-2024', 'ICSE Result 2023\u20132024', 13],
    ['04-labours-day', 'Labour\u2019s Day', 12],
    ['05-games-2023', 'Games 2023', 8],
    ['06-annual-function-2022', 'Annual Function 2022', 152]
  ];

  var sec = document.getElementById('gallery');
  if (!sec) return;

  var TOTAL = A.reduce(function (s, a) { return s + a[2]; }, 0);
  var rm = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var mq = matchMedia('(max-width:860px)');
  var root = document.documentElement;

  function $(s, r) { return (r || document).querySelector(s); }
  function el(t, c, h) { var e = document.createElement(t); if (c) e.className = c; if (h != null) e.innerHTML = h; return e; }
  function two(n) { return n < 10 ? '0' + n : '' + n; }
  function src(i, n) { return BASE + A[i][0] + '/p' + ('00' + n).slice(-3) + '.webp'; }

  /* ---------------------------------------------------------------- CSS */
  var css = el('style');
  css.id = 'alb-css';
  css.textContent = [
    '.alb-wrap{margin:34px 0 8px;position:relative;opacity:0;transform:translateY(26px);transition:opacity .8s ease,transform .8s cubic-bezier(.2,.7,.25,1)}',
    '.alb-wrap.in{opacity:1;transform:none}',
    '.alb-head{display:flex;justify-content:space-between;align-items:flex-end;gap:14px;flex-wrap:wrap;margin-bottom:18px}',
    '.alb-head small{display:block;margin-bottom:8px;font:700 10px/1 var(--sans);letter-spacing:.22em;text-transform:uppercase;color:var(--gold2)}',
    '.alb-head b{font:600 clamp(18px,2.4vw,26px)/1.2 var(--serif);color:var(--cream)}',
    '.alb-ctl{display:flex;gap:8px}',
    '.alb-ctl button{width:46px;height:46px;border-radius:50%;border:1px solid var(--line);background:rgba(8,25,30,.55);color:var(--cream);font:400 22px/1 var(--sans);cursor:pointer;transition:background .3s,border-color .3s,transform .3s}',
    '.alb-ctl button:hover{background:rgba(127,224,197,.16);border-color:var(--gold2);transform:translateY(-2px)}',
    '.alb-rail{--cw:380px;position:relative;display:flex;gap:12px;height:clamp(420px,64vh,580px)}',
    '.alb-card{position:relative;flex:1 1 0;min-width:0;border-radius:28px;overflow:hidden;isolation:isolate;contain:layout paint;cursor:pointer;outline:none;background:#07151b;border:1px solid var(--line);-webkit-tap-highlight-color:transparent;transition:flex-grow .85s cubic-bezier(.2,.7,.2,1),border-color .5s,box-shadow .6s,transform .6s cubic-bezier(.2,.7,.2,1)}',
    '.alb-card.on{flex-grow:4.4;border-color:rgba(226,201,149,.72);box-shadow:0 24px 70px rgba(0,0,0,.45),0 0 0 1px rgba(226,201,149,.18)}',
    '.alb-card:focus-visible{outline:2px solid var(--gold2);outline-offset:3px}',
    '.alb-reel{position:absolute;inset:0;overflow:hidden}',
    '.alb-track{position:absolute;left:50%;top:0;width:var(--cw);margin-left:calc(var(--cw) / -2);will-change:transform;animation:alb-up var(--dur,36s) linear infinite;animation-play-state:paused}',
    '.alb-card:nth-child(even) .alb-track{animation-direction:reverse}',
    '.alb-wrap.live .alb-track{animation-play-state:running}',
    '.alb-track img{display:block;width:calc(100% - 20px);margin:0 10px 10px;aspect-ratio:3/2;object-fit:cover;border-radius:16px;background:#0b2027;filter:saturate(.8) brightness(.7);transition:filter .8s}',
    '.alb-card.on .alb-track img{filter:saturate(1.06) contrast(1.04) brightness(1)}',
    '@keyframes alb-up{to{transform:translate3d(0,-50%,0)}}',
    '.alb-shade{position:absolute;inset:0;z-index:1;pointer-events:none;background:linear-gradient(180deg,rgba(5,14,18,.55) 0,rgba(5,14,18,0) 22%,rgba(5,14,18,.3) 50%,rgba(5,14,18,.93) 100%)}',
    '.alb-no{position:absolute;z-index:2;top:16px;left:50%;transform:translateX(-50%);font:700 11px/1 var(--sans);letter-spacing:.2em;color:var(--gold2);transition:left .8s cubic-bezier(.2,.7,.2,1),transform .8s cubic-bezier(.2,.7,.2,1)}',
    '.alb-card.on .alb-no{left:22px;transform:none}',
    '.alb-vt{position:absolute;z-index:2;left:50%;bottom:22px;transform:translateX(-50%) rotate(180deg);writing-mode:vertical-rl;white-space:nowrap;max-height:calc(100% - 90px);overflow:hidden;text-overflow:ellipsis;font:600 15px/1 var(--serif);letter-spacing:.04em;color:#fff;transition:opacity .35s}',
    '.alb-card.on .alb-vt{opacity:0}',
    '.alb-info{position:absolute;z-index:2;left:0;right:0;bottom:0;padding:clamp(16px,2.4vw,28px);opacity:0;transform:translateY(14px);transition:opacity .5s .12s,transform .75s .12s cubic-bezier(.2,.7,.2,1)}',
    '.alb-card.on .alb-info{opacity:1;transform:none}',
    '.alb-info small{display:block;margin-bottom:8px;font:700 10px/1 var(--sans);letter-spacing:.2em;text-transform:uppercase;color:var(--gold2)}',
    '.alb-info h3{margin:0 0 14px;font:600 clamp(20px,2.6vw,30px)/1.15 var(--serif);color:#fff}',
    '.alb-cta{display:inline-flex;align-items:center;gap:8px;padding:11px 17px;border-radius:99px;background:linear-gradient(135deg,var(--gold2),var(--gold));color:#07151b;font:700 11px/1 var(--sans);letter-spacing:.12em;text-transform:uppercase}',
    '.alb-cta i{font-style:normal}',
    '.alb-sub{display:flex;align-items:center;gap:14px;margin:38px 0 16px;font:700 11px/1 var(--sans);letter-spacing:.22em;text-transform:uppercase;color:var(--gold2)}',
    '.alb-sub:after{content:"";flex:1;height:1px;background:var(--line)}',
    /* phones / tablets: snap carousel, same look */
    '@media(max-width:860px){',
    '.alb-rail{overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none;-webkit-overflow-scrolling:touch;padding:0 calc((100% - min(78vw,380px)) / 2);height:clamp(400px,66vh,520px)}',
    '.alb-rail::-webkit-scrollbar{display:none}',
    '.alb-card{flex:0 0 min(78vw,380px);scroll-snap-align:center;transform:scale(.93)}',
    '.alb-card.on{flex-grow:0;transform:none}',
    '.alb-info{opacity:1;transform:none}',
    '.alb-vt,.alb-no{display:none}',
    '}',
    /* album viewer */
    'html.alb-lock{overflow:hidden;scrollbar-gutter:stable}',
    '#albv{position:fixed;inset:0;z-index:10000;display:flex;flex-direction:column;background:radial-gradient(120% 80% at 50% 0,#0d2a30 0,#07151b 55%,#050d11 100%);opacity:0;visibility:hidden;transform:translateY(28px) scale(.985);transition:opacity .45s,transform .7s cubic-bezier(.2,.7,.2,1),visibility 0s .7s}',
    '#albv.open{opacity:1;visibility:visible;transform:none;transition:opacity .45s,transform .7s cubic-bezier(.2,.7,.2,1)}',
    '.albv-bar{flex:0 0 auto;display:flex;align-items:center;gap:10px;padding:max(12px,env(safe-area-inset-top)) clamp(14px,3vw,34px) 12px;border-bottom:1px solid var(--line);background:rgba(7,21,27,.92)}',
    '.albv-btn{flex:0 0 auto;height:42px;min-width:42px;padding:0 14px;border-radius:99px;border:1px solid var(--line);background:rgba(255,255,255,.04);color:var(--cream);font:600 12px/1 var(--sans);letter-spacing:.08em;cursor:pointer;transition:background .3s,border-color .3s}',
    '.albv-btn:hover{background:rgba(127,224,197,.15);border-color:var(--gold2)}',
    '.albv-t{flex:1;min-width:0}',
    '.albv-t small{display:block;margin-bottom:5px;font:700 10px/1 var(--sans);letter-spacing:.2em;text-transform:uppercase;color:var(--gold2)}',
    '.albv-t h3{margin:0;font:600 clamp(17px,2.2vw,24px)/1.2 var(--serif);color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
    '.albv-body{flex:1;overflow-y:auto;overscroll-behavior:contain;-webkit-overflow-scrolling:touch;padding:clamp(14px,2.4vw,30px) clamp(14px,3vw,34px) max(48px,env(safe-area-inset-bottom))}',
    '.albv-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,230px),1fr));gap:12px;max-width:1280px;margin:0 auto}',
    '.albv-fig{position:relative;aspect-ratio:3/2;overflow:hidden;border-radius:16px;border:1px solid var(--line);background:#0b2027;cursor:zoom-in;outline:none;opacity:0;transform:translateY(26px) scale(.98);transition:opacity .8s ease,transform .8s cubic-bezier(.2,.7,.25,1),border-color .4s,box-shadow .5s;transition-delay:var(--d,0s)}',
    '.albv-fig.in{opacity:1;transform:none}',
    '.albv-fig.done{transition-delay:0s}',
    '.albv-fig img{display:block;width:100%;height:100%;object-fit:cover;filter:saturate(.92);transition:transform .9s cubic-bezier(.2,.7,.2,1),filter .6s}',
    '.albv-fig:hover,.albv-fig:focus-visible{border-color:rgba(226,201,149,.72);box-shadow:0 18px 44px rgba(0,0,0,.42)}',
    '.albv-fig:hover img,.albv-fig:focus-visible img{transform:scale(1.08);filter:saturate(1.1)}',
    '@media(max-width:600px){.albv-grid{grid-template-columns:repeat(2,1fr);gap:8px}.albv-btn{padding:0 12px}.albv-back{font-size:0;padding:0;width:42px}.albv-back:before{content:"\\2190";font-size:18px}}',
    /* lightbox */
    '#albx{position:fixed;inset:0;z-index:10001;display:flex;align-items:center;justify-content:center;background:rgba(3,9,11,.95);opacity:0;visibility:hidden;transition:opacity .35s,visibility 0s .35s}',
    '#albx.open{opacity:1;visibility:visible;transition:opacity .35s}',
    '#albx figure{margin:0;text-align:center}',
    '#albx img{display:block;width:min(94vw,680px);max-height:76vh;object-fit:contain;border-radius:16px;box-shadow:0 30px 90px rgba(0,0,0,.65);filter:contrast(1.05) saturate(1.05);transition:opacity .3s,transform .5s cubic-bezier(.2,.7,.2,1)}',
    '#albx img.sw{opacity:0;transform:scale(.96)}',
    '#albx figcaption{margin-top:14px;font:500 13px/1.4 var(--sans);letter-spacing:.05em;color:var(--cream)}',
    '#albx button{position:absolute;width:48px;height:48px;border-radius:50%;border:1px solid var(--line);background:rgba(8,25,30,.72);color:#fff;font:400 22px/1 var(--sans);cursor:pointer;transition:background .3s,border-color .3s}',
    '#albx button:hover{background:rgba(127,224,197,.18);border-color:var(--gold2)}',
    '.albx-x{top:max(16px,env(safe-area-inset-top));right:16px}.albx-p{left:12px;top:50%;margin-top:-24px}.albx-n{right:12px;top:50%;margin-top:-24px}',
    '@media(prefers-reduced-motion:reduce){.alb-track{animation:none}.alb-wrap,.alb-card,.alb-info,#albv,#albx img,.albv-fig{transition:none}.alb-wrap{opacity:1;transform:none}.albv-fig{opacity:1;transform:none}}'
  ].join('\n');
  document.head.appendChild(css);

  /* --------------------------------------------------------- build rail */
  var wrap = el('div', 'alb-wrap');
  wrap.appendChild(el('div', 'alb-head',
    '<div><small>Photo albums</small><b>' + A.length + ' albums \u00b7 ' + TOTAL + ' photos</b></div>' +
    '<div class="alb-ctl"><button type="button" class="alb-prev" aria-label="Previous album">\u2039</button><button type="button" class="alb-next" aria-label="Next album">\u203a</button></div>'));
  var rail = el('div', 'alb-rail');
  rail.setAttribute('role', 'list');
  var cards = [];

  A.forEach(function (a, i) {
    var c = el('div', 'alb-card');
    c.tabIndex = 0;
    c.setAttribute('role', 'button');
    c.setAttribute('aria-label', a[1] + ', ' + a[2] + ' photos. Open album');
    c.style.setProperty('--dur', (34 + i * 5) + 's');

    var reel = el('div', 'alb-reel'), tr = el('div', 'alb-track');
    var m = Math.min(a[2], 8), ids = [], k;
    for (k = 0; k < m; k++) ids.push(m > 1 ? Math.round(k * (a[2] - 1) / (m - 1)) + 1 : 1);
    ids.concat(ids).forEach(function (n) {          /* doubled list = seamless loop */
      var im = new Image();
      im.alt = ''; im.decoding = 'async'; im.draggable = false;
      im.dataset.s = src(i, n);
      tr.appendChild(im);
    });
    reel.appendChild(tr);
    c.appendChild(reel);
    c.appendChild(el('div', 'alb-shade'));
    c.appendChild(el('span', 'alb-no', two(i + 1)));
    c.appendChild(el('span', 'alb-vt', a[1]));
    c.appendChild(el('div', 'alb-info', '<small>Album ' + two(i + 1) + ' \u00b7 ' + a[2] + ' photos</small><h3>' + a[1] + '</h3><span class="alb-cta">Open album <i>\u2197</i></span>'));
    rail.appendChild(c);
    cards.push(c);
  });

  wrap.appendChild(rail);
  var lead = $('.lead', sec);
  if (lead) lead.insertAdjacentElement('afterend', wrap); else sec.appendChild(wrap);
  wrap.insertAdjacentElement('afterend', el('div', 'alb-sub', '<span>More moments</span>'));

  /* ----------------------------------------------------- rail behaviour */
  var act = 0, hover = false, live = false, loaded = false, ov = false, timer = 0, raf = 0;

  function setActive(i) {
    act = (i + A.length) % A.length;
    cards.forEach(function (c, j) { c.classList.toggle('on', j === act); });
  }
  function goTo(i) {
    i = (i + A.length) % A.length;
    if (mq.matches) {
      var c = cards[i];
      rail.scrollTo({ left: c.offsetLeft - (rail.clientWidth - c.offsetWidth) / 2, behavior: rm ? 'auto' : 'smooth' });
    }
    setActive(i);
  }
  function size() {
    var cw;
    if (mq.matches) cw = cards[0].offsetWidth;
    else { var n = A.length, g = 4.4; cw = (rail.clientWidth - 12 * (n - 1)) * g / (n - 1 + g); }
    rail.style.setProperty('--cw', Math.round(cw) + 'px');     /* fixed image width: no re-layout while cards expand */
  }
  function auto() {
    clearInterval(timer);
    if (rm) return;
    timer = setInterval(function () {
      if (mq.matches || hover || !live || ov || document.hidden) return;
      setActive(act + 1);
    }, 4300);
  }

  cards.forEach(function (c, i) {
    c.addEventListener('click', function () {
      if (mq.matches && i !== act) { goTo(i); return; }
      openAlbum(i, c);
    });
    c.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openAlbum(i, c); }
      else if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        e.preventDefault();
        cards[(i + (e.key === 'ArrowRight' ? 1 : -1) + A.length) % A.length].focus();
      }
    });
    c.addEventListener('focus', function () { if (!mq.matches) setActive(i); });
    c.addEventListener('pointerenter', function (e) {
      if (e.pointerType === 'mouse' && !mq.matches) { hover = true; setActive(i); }
    });
  });
  rail.addEventListener('pointerleave', function () { hover = false; });
  rail.addEventListener('scroll', function () {
    if (!mq.matches || raf) return;
    raf = requestAnimationFrame(function () {
      raf = 0;
      var mid = rail.scrollLeft + rail.clientWidth / 2, b = 0, bd = 1e9;
      cards.forEach(function (c, j) {
        var d = Math.abs(c.offsetLeft + c.offsetWidth / 2 - mid);
        if (d < bd) { bd = d; b = j; }
      });
      if (b !== act) setActive(b);
    });
  }, { passive: true });
  $('.alb-prev', wrap).addEventListener('click', function () { goTo(act - 1); });
  $('.alb-next', wrap).addEventListener('click', function () { goTo(act + 1); });

  var rt = 0;
  addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(size, 120); });
  if (mq.addEventListener) mq.addEventListener('change', function () { size(); goTo(act); });

  function loadReels() {
    [].forEach.call(rail.querySelectorAll('img[data-s]'), function (im) { im.src = im.dataset.s; im.removeAttribute('data-s'); });
  }
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        live = e.isIntersecting;
        wrap.classList.toggle('live', live);          /* animations only run while visible */
        if (live) { wrap.classList.add('in'); if (!loaded) { loaded = true; loadReels(); } }
      });
    }, { rootMargin: '200px 0px' }).observe(wrap);
  } else { loaded = live = true; loadReels(); wrap.classList.add('live', 'in'); }

  size(); setActive(0); auto();

  /* ------------------------------------------------------ album viewer */
  var v = el('div');
  v.id = 'albv';
  v.setAttribute('role', 'dialog'); v.setAttribute('aria-modal', 'true'); v.setAttribute('aria-label', 'Photo album');
  v.setAttribute('data-lenis-prevent', '');
  v.innerHTML = '<div class="albv-bar"><button type="button" class="albv-btn albv-back">\u2190 Albums</button>' +
    '<div class="albv-t"><small></small><h3></h3></div>' +
    '<button type="button" class="albv-btn albv-p" aria-label="Previous album">\u2039</button>' +
    '<button type="button" class="albv-btn albv-n" aria-label="Next album">\u203a</button>' +
    '<button type="button" class="albv-btn albv-x" aria-label="Close album">\u2715</button></div>' +
    '<div class="albv-body" data-lenis-prevent><div class="albv-grid"></div></div>';
  document.body.appendChild(v);
  var vs = $('small', v), vh = $('h3', v), body = $('.albv-body', v), grid = $('.albv-grid', v);

  var x = el('div');
  x.id = 'albx';
  x.setAttribute('role', 'dialog'); x.setAttribute('aria-modal', 'true'); x.setAttribute('aria-label', 'Photo viewer');
  x.setAttribute('data-lenis-prevent', '');
  x.innerHTML = '<button type="button" class="albx-x" aria-label="Close photo">\u2715</button>' +
    '<button type="button" class="albx-p" aria-label="Previous photo">\u2039</button>' +
    '<figure><img alt=""><figcaption></figcaption></figure>' +
    '<button type="button" class="albx-n" aria-label="Next photo">\u203a</button>';
  document.body.appendChild(x);
  var limg = $('img', x), lcap = $('figcaption', x);

  var cur = 0, pn = 1, isOpen = false, lbOpen = false, pushed = false, lastFocus = null, tx = 0, io = null;

  function reveal(es) {
    es.forEach(function (e) {
      if (!e.isIntersecting) return;
      var f = e.target;
      io.unobserve(f);
      f.classList.add('in');
      setTimeout(function () { f.classList.add('done'); }, 1100);   /* hover transitions without the stagger delay */
    });
  }

  function openAlbum(i, opener) {
    cur = (i + A.length) % A.length;
    var a = A[cur];
    vs.textContent = 'Album ' + two(cur + 1) + ' \u00b7 ' + a[2] + ' photos';
    vh.textContent = a[1];
    grid.textContent = '';
    body.scrollTop = 0;
    var frag = document.createDocumentFragment(), n, f, im;
    for (n = 1; n <= a[2]; n++) {
      f = el('div', 'albv-fig');
      f.tabIndex = 0;
      f.setAttribute('role', 'button');
      f.setAttribute('aria-label', a[1] + ', photo ' + n + ' of ' + a[2]);
      f.style.setProperty('--d', ((n - 1) % 4) * 70 + 'ms');
      f.dataset.n = n;
      im = new Image();
      im.alt = ''; im.loading = 'lazy'; im.decoding = 'async'; im.src = src(cur, n);
      f.appendChild(im);
      frag.appendChild(f);
    }
    grid.appendChild(frag);
    if (io) io.disconnect();
    if ('IntersectionObserver' in window) {
      io = new IntersectionObserver(reveal, { root: body, rootMargin: '0px 0px -3% 0px', threshold: 0.08 });
      [].forEach.call(grid.children, function (c) { io.observe(c); });
    } else { [].forEach.call(grid.children, function (c) { c.classList.add('in', 'done'); }); }

    if (!isOpen) {
      isOpen = true; ov = true;
      lastFocus = opener || document.activeElement;
      root.classList.add('alb-lock');
      v.classList.add('open');
      try { history.pushState({ alb: cur }, ''); pushed = true; } catch (err) { pushed = false; }
      setTimeout(function () { $('.albv-x', v).focus({ preventScroll: true }); }, 60);
    }
  }
  function closeAlbum() {
    if (!isOpen) return;
    closePhoto();
    isOpen = false; ov = false;
    v.classList.remove('open');
    root.classList.remove('alb-lock');
    if (pushed) { pushed = false; try { history.back(); } catch (err) {} }
    if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
  }
  addEventListener('popstate', function () { if (isOpen) { pushed = false; closeAlbum(); } });

  function showPhoto(first) {
    var a = A[cur], u = src(cur, pn), done = function () { limg.classList.remove('sw'); };
    lcap.textContent = a[1] + ' \u00b7 ' + pn + ' / ' + a[2];
    if (first) { limg.src = u; limg.alt = a[1] + ' photo ' + pn; done(); }
    else {
      limg.classList.add('sw');
      setTimeout(function () { limg.onload = done; limg.src = u; limg.alt = a[1] + ' photo ' + pn; setTimeout(done, 900); }, 190);
    }
    [pn - 1, pn + 1].forEach(function (k) { if (k >= 1 && k <= a[2]) { var p = new Image(); p.src = src(cur, k); } });
  }
  function step(d) {
    var c = A[cur][2];
    pn = ((pn - 1 + d + c) % c) + 1;
    showPhoto(false);
  }
  function openPhoto(n) { pn = n; showPhoto(true); x.classList.add('open'); lbOpen = true; $('.albx-x', x).focus({ preventScroll: true }); }
  function closePhoto() { if (!lbOpen) return; lbOpen = false; x.classList.remove('open'); }

  grid.addEventListener('click', function (e) {
    var f = e.target.closest ? e.target.closest('.albv-fig') : null;
    if (f) openPhoto(+f.dataset.n);
  });
  grid.addEventListener('keydown', function (e) {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    var f = e.target.closest ? e.target.closest('.albv-fig') : null;
    if (f) { e.preventDefault(); openPhoto(+f.dataset.n); }
  });
  $('.albv-x', v).addEventListener('click', closeAlbum);
  $('.albv-back', v).addEventListener('click', closeAlbum);
  $('.albv-p', v).addEventListener('click', function () { openAlbum(cur - 1); });
  $('.albv-n', v).addEventListener('click', function () { openAlbum(cur + 1); });
  $('.albx-x', x).addEventListener('click', closePhoto);
  $('.albx-p', x).addEventListener('click', function () { step(-1); });
  $('.albx-n', x).addEventListener('click', function () { step(1); });
  x.addEventListener('click', function (e) { if (e.target === x) closePhoto(); });
  x.addEventListener('touchstart', function (e) { tx = e.touches[0].clientX; }, { passive: true });
  x.addEventListener('touchend', function (e) {
    var d = e.changedTouches[0].clientX - tx;
    if (Math.abs(d) > 50) step(d < 0 ? 1 : -1);
  }, { passive: true });
  addEventListener('keydown', function (e) {
    if (!isOpen) return;
    if (e.key === 'Escape') { if (lbOpen) closePhoto(); else closeAlbum(); }
    else if (lbOpen && e.key === 'ArrowRight') step(1);
    else if (lbOpen && e.key === 'ArrowLeft') step(-1);
  });
})();
