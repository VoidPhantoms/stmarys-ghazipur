window.IM=["img/p00.webp", "img/p01.webp", "img/p02.webp", "img/p03.webp", "img/p04.webp", "img/p05.webp", "img/p06.webp", "img/p07.webp", "img/p08.webp", "img/p09.webp", "img/p10.webp", "img/p11.webp", "img/p12.webp", "img/p13.webp", "img/p14.webp"];

(function(){
var G=[
[0,'Proud to be an Indian','Celebrations'],
[1,'Young cadets on stage','Celebrations'],
[4,'Voices of the nation','Celebrations'],
[2,'Human pyramid in the courtyard','Sports & fitness'],
[3,'Pyramid on the green','Sports & fitness'],
[5,'Morning assembly prayer','Daily life'],
[6,'Investiture ceremony','Leadership'],
[7,'Champions with medals & certificates','Sports'],
[8,'Sports meet inauguration','Sports'],
[9,'Art & craft: Labour Day cards','Classroom'],
[10,'Save Mother Earth','Classroom'],
[11,'Clean environment drawings','Classroom'],
[12,'Merry-go-round fun','Kids’ play area'],
[13,'Kids’ play area','Kids’ play area']
];

document.querySelectorAll('img[data-im]').forEach(function(i){
    i.src=IM[+i.dataset.im];
});

var gg=document.getElementById('gg'),
    lb=document.getElementById('lb');

if(!gg||!lb)return;

var li=lb.querySelector('img'),
    lc=lb.querySelector('figcaption'),
    ci=0,
    tx=0;

/* Gallery-only visual styling */
var css=document.createElement('style');

css.textContent=`
#gg{
display:grid!important;
grid-template-columns:repeat(3,minmax(0,1fr))!important;
gap:clamp(12px,2vw,24px)!important;
align-items:stretch!important
}

#gg .gi{
position:relative!important;
display:block!important;
grid-column:span 1!important;
min-width:0!important;
margin:0!important;
padding:0!important;
overflow:hidden!important;
isolation:isolate!important;
aspect-ratio:1.12!important;
border:1px solid rgba(190,158,99,.22)!important;
border-radius:18px!important;
background:#111!important;
box-shadow:0 10px 30px rgba(0,0,0,.12)!important;
cursor:pointer!important;
transition:transform .55s cubic-bezier(.2,.75,.25,1),
box-shadow .55s,border-color .4s!important
}

#gg .gi:nth-child(5n+1),
#gg .gi:nth-child(5n+4){
aspect-ratio:1.35!important
}

#gg .gi.w2{
grid-column:span 2!important;
aspect-ratio:2.12!important
}

#gg .gi[hidden]{
display:none!important
}

#gg .gi img{
display:block!important;
width:100%!important;
height:100%!important;
object-fit:cover!important;
transition:transform .9s cubic-bezier(.2,.7,.2,1),
filter .7s!important;
filter:saturate(.88)!important
}

#gg .gi:after{
content:"";
position:absolute;
inset:25% 0 0;
z-index:1;
pointer-events:none;
background:linear-gradient(
180deg,
transparent 0%,
rgba(7,12,10,.12) 28%,
rgba(7,12,10,.86) 100%
)
}

#gg .gi figcaption{
position:absolute!important;
z-index:2!important;
left:0!important;
right:0!important;
bottom:0!important;
display:flex!important;
flex-direction:column!important;
gap:6px!important;
padding:clamp(14px,2.2vw,24px)!important;
color:#fff!important;
text-align:left!important;
background:none!important
}

#gg .gi figcaption small{
font-size:10px!important;
letter-spacing:.18em!important;
text-transform:uppercase!important;
color:#e4c98f!important;
font-weight:700!important
}

#gg .gi figcaption b{
font-size:clamp(14px,1.5vw,20px)!important;
line-height:1.25!important;
font-weight:600!important;
letter-spacing:-.02em!important;
color:#fff!important
}

#gg .gi:hover{
transform:translateY(-6px)!important;
border-color:rgba(218,185,121,.75)!important;
box-shadow:0 22px 50px rgba(0,0,0,.22)!important
}

#gg .gi:hover img{
transform:scale(1.075)!important;
filter:saturate(1.08)!important
}

#gg .gi:focus-visible{
outline:2px solid #d7b879!important;
outline-offset:4px!important
}

.gallery-filterbar{
display:flex;
flex-wrap:wrap;
align-items:center;
gap:9px;
margin:0 0 clamp(18px,3vw,30px);
padding:0
}

.gallery-filterbar button{
appearance:none;
border:1px solid rgba(177,151,103,.3);
border-radius:999px;
padding:9px 15px;
background:rgba(255,255,255,.055);
color:inherit;
font:600 11px/1.2 inherit;
letter-spacing:.055em;
cursor:pointer;
transition:background .25s,color .25s,
border-color .25s,transform .25s
}

.gallery-filterbar button:hover{
transform:translateY(-2px);
border-color:#b99b63
}

.gallery-filterbar button[aria-pressed="true"]{
background:#b99b63;
border-color:#b99b63;
color:#171712
}

.gallery-filterbar button span{
margin-left:7px;
opacity:.7;
font-variant-numeric:tabular-nums
}

@media(max-width:760px){
#gg{
grid-template-columns:repeat(2,minmax(0,1fr))!important;
gap:12px!important
}

#gg .gi.w2{
grid-column:span 2!important;
aspect-ratio:1.8!important
}

#gg .gi{
border-radius:14px!important
}
}

@media(max-width:420px){
#gg .gi{
aspect-ratio:.92!important
}

#gg .gi.w2{
aspect-ratio:1.45!important
}

#gg .gi figcaption{
padding:12px!important
}

#gg .gi figcaption b{
font-size:13px!important
}
}

@media(prefers-reduced-motion:reduce){
#gg .gi,
#gg .gi img,
.gallery-filterbar button{
transition:none!important
}
}
`;

document.head.appendChild(css);

/* Gallery category filters */
var categories=[
'All',
'Celebrations',
'Sports & fitness',
'Daily life',
'Leadership',
'Sports',
'Classroom',
'Kids’ play area'
];

var filter=document.createElement('nav');

filter.className='gallery-filterbar';
filter.setAttribute('aria-label','Filter gallery by category');
filter.setAttribute('data-gallery-controls','');

categories.forEach(function(cat){

    var count=cat==='All'
        ?G.length
        :G.filter(function(g){
            return g[2]===cat;
        }).length;

    if(!count)return;

    var b=document.createElement('button');

    b.type='button';
    b.dataset.category=cat;

    b.setAttribute(
        'aria-pressed',
        cat==='All'?'true':'false'
    );

    b.appendChild(document.createTextNode(cat));

    var s=document.createElement('span');
    s.textContent=String(count);

    b.appendChild(s);
    filter.appendChild(b);
});

gg.parentNode.insertBefore(filter,gg);

/* Fullscreen image viewer */
var LBL=null;
function sh(i){
    var n=LBL?LBL.length:G.length;
    ci=(i+n)%n;
    var it=LBL?LBL[ci]:[IM[G[ci][0]],G[ci][1],G[ci][2]];
    li.src=it[0];
    li.alt=it[1];
    lc.textContent=it[1]+' · '+it[2];
}

function op(i){
    LBL=null;
    sh(i);
    lb.hidden=false;
    document.documentElement.style.overflow='hidden';
}

function cl(){
    lb.hidden=true;
    document.documentElement.style.overflow='';
}

/* Generate gallery cards */
G.forEach(function(g,i){

    var f=document.createElement('figure');

    f.className='gi'+
        (i%5==0?' w2':'');

    f.tabIndex=0;

    f.setAttribute('role','button');

    f.setAttribute(
        'aria-label',
        'Open photo: '+g[1]
    );

    f.innerHTML=
        '<img alt="'+g[1]+'" loading="lazy" decoding="async">'+
        '<figcaption>'+
        '<small>'+g[2]+'</small>'+
        '<b>'+g[1]+'</b>'+
        '</figcaption>';

    f.firstChild.src=IM[g[0]];

    f.onclick=function(){
        op(i);
    };

    f.onkeydown=function(e){
        if(e.key==='Enter'||e.key===' '){
            e.preventDefault();
            op(i);
        }
    };

    gg.appendChild(f);
});

/* Photo albums: a horizontal rail of albums; each opens a vertically scrolling photo feed */
(function(){
var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
var AL=[{"f": "01-gandhi-jayanti-2026", "t": "Gandhi Jayanti 2026", "s": "Campaign · 2 Oct 2026", "n": 17}, {"f": "02-investiture-ceremony", "t": "Investiture Ceremony", "s": "", "n": 52}, {"f": "03-icse-result-2023-2024", "t": "ICSE Result 2023–2024", "s": "", "n": 13}, {"f": "04-labours-day", "t": "Labour’s Day", "s": "", "n": 12}, {"f": "05-games-2023", "t": "Games 2023", "s": "", "n": 8}, {"f": "06-annual-function-2022", "t": "Annual Function 2022", "s": "", "n": 152}];
function src(a,k){return 'img/albums/'+a.f+'/'+(a.p?a.p[k]:'p'+('00'+(k+1)).slice(-3)+'.webp')}
var wrap=document.createElement('div');wrap.className='alw';
wrap.innerHTML='<div class="alw-h"><small>PHOTO ALBUMS</small><b>Browse by event</b><span>Swipe or drag &rarr;</span></div><div class="alr" role="list"></div>';
var rail=wrap.querySelector('.alr');
AL.forEach(function(a,ai){var b=document.createElement('button');b.type='button';b.className='alb';b.setAttribute('role','listitem');b.setAttribute('aria-label','Open album: '+a.t+', '+a.n+' photos');
  b.innerHTML='<span class="alb-st"><i></i><i></i><img alt="" decoding="async"'+(ai>1?' loading="lazy"':'')+'></span><span class="alb-t"><small></small><b></b></span><span class="alb-go">Open album <em>&rarr;</em></span>';
  b.querySelector('img').src=src(a,0);b.querySelector('small').textContent=(a.s?a.s+' · ':'')+a.n+' photos';b.querySelector('b').textContent=a.t;
  b.addEventListener('click',function(e){openAl(ai,b)});rail.appendChild(b)});
var hl=document.createElement('div');hl.className='alw-h alw-h2';hl.innerHTML='<small>HIGHLIGHTS</small><b>Moments from school life</b>';
filter.parentNode.insertBefore(wrap,filter);filter.parentNode.insertBefore(hl,filter);
(function(){var d=false,sx=0,sl=0,mv=false;rail.addEventListener('pointerdown',function(e){if(e.pointerType!=='mouse')return;d=true;mv=false;sx=e.clientX;sl=rail.scrollLeft});addEventListener('pointermove',function(e){if(!d)return;var x=e.clientX-sx;if(Math.abs(x)>4){mv=true;rail.classList.add('drag')}rail.scrollLeft=sl-x});addEventListener('pointerup',function(){d=false;setTimeout(function(){rail.classList.remove('drag')},0)});rail.addEventListener('click',function(e){if(mv){e.preventDefault();e.stopPropagation();mv=false}},true)})();
var al=document.createElement('div');al.className='al';al.hidden=true;al.setAttribute('role','dialog');al.setAttribute('aria-modal','true');al.setAttribute('aria-label','Photo album');
al.innerHTML='<div class="al-bar"><button type="button" class="al-x" aria-label="Close album">&#10005;</button><div class="al-tt"><small>PHOTO ALBUM</small><b></b></div><span class="al-n"></span></div><div class="al-prog" aria-hidden="true"><span></span></div><div class="al-body" tabindex="-1" data-lenis-prevent><div class="al-grid"></div></div>';
document.body.appendChild(al);
var body=al.querySelector('.al-body'),grid=al.querySelector('.al-grid'),prog=al.querySelector('.al-prog span'),cur=null,list=[],io=null,last=null,items=[],tk=0;
function openAl(i,from){var a=AL[i];cur=a;last=from||document.activeElement;
  var r=from?from.getBoundingClientRect():null;al.style.setProperty('--ox',(r?r.left+r.width/2:innerWidth/2)+'px');al.style.setProperty('--oy',(r?r.top+r.height/2:innerHeight/2)+'px');
  al.querySelector('.al-tt b').textContent=a.t;al.querySelector('.al-n').textContent=a.n+' photos';
  grid.innerHTML='';items=[];list=[];var frag=document.createDocumentFragment();
  for(var k=0;k<a.n;k++){(function(k){var s=src(a,k),f=document.createElement('button');f.type='button';f.className='al-c';f.style.setProperty('--d',(k%6*55)+'ms');f.setAttribute('aria-label','Open photo '+(k+1)+' of '+a.n);
    var im=document.createElement('img');im.alt=a.t+' photo '+(k+1);im.decoding='async';im.loading='lazy';im.src=s;f.appendChild(im);
    var n=document.createElement('span');n.textContent=('0'+(k+1)).slice(-2);f.appendChild(n);f.addEventListener('click',function(){LBL=list;sh(k);lb.hidden=false;document.documentElement.style.overflow='hidden'});
    list.push([s,a.t,(k+1)+' / '+a.n]);frag.appendChild(f);items.push(f)})(k)}
  grid.appendChild(frag);al.hidden=false;document.documentElement.classList.add('al-open');body.scrollTop=0;prog.style.transform='scaleX(0)';
  if(io)io.disconnect();
  if('IntersectionObserver' in window&&!reduce){io=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target)}})},{root:body,rootMargin:'0px 0px 6% 0px',threshold:.05});items.forEach(function(it){io.observe(it)})}else items.forEach(function(it){it.classList.add('in')});
  requestAnimationFrame(function(){requestAnimationFrame(function(){al.classList.add('open');var x=al.querySelector('.al-x');if(x)x.focus({preventScroll:true})})})}
function closeAl(){if(al.hidden)return;al.classList.remove('open');document.documentElement.classList.remove('al-open');
  setTimeout(function(){if(!al.classList.contains('open')){al.hidden=true;grid.innerHTML='';items=[];list=[];if(io)io.disconnect()}},reduce?0:560);if(last&&last.focus)last.focus({preventScroll:true})}
al.querySelector('.al-x').onclick=closeAl;
body.addEventListener('scroll',function(){if(tk)return;tk=requestAnimationFrame(function(){tk=0;var m=body.scrollHeight-body.clientHeight;prog.style.transform='scaleX('+(m>0?body.scrollTop/m:0).toFixed(3)+')'})},{passive:true});
addEventListener('keydown',function(e){if(e.key==='Escape'&&!al.hidden&&lb.hidden)closeAl()});
})();

/* Filter functionality */
filter.addEventListener('click',function(e){

    var b=e.target.closest(
        'button[data-category]'
    );

    if(!b)return;

    var cat=b.dataset.category;

    filter.querySelectorAll('button').forEach(
        function(x){
            x.setAttribute(
                'aria-pressed',
                x===b?'true':'false'
            );
        }
    );

    gg.querySelectorAll('.gi').forEach(
        function(card,i){
            card.hidden=
                cat!=='All'&&G[i][2]!==cat;
        }
    );
});

/* Viewer controls */
lb.querySelector('.lbx').onclick=cl;

lb.querySelector('.lbp').onclick=function(){
    sh(ci-1);
};

lb.querySelector('.lbn').onclick=function(){
    sh(ci+1);
};

lb.onclick=function(e){
    if(e.target===lb)cl();
};

/* Touch swipe */
lb.addEventListener(
    'touchstart',
    function(e){
        tx=e.touches[0].clientX;
    },
    {passive:true}
);

lb.addEventListener(
    'touchend',
    function(e){
        var d=e.changedTouches[0].clientX-tx;

        if(Math.abs(d)>50){
            sh(ci+(d<0?1:-1));
        }
    },
    {passive:true}
);

/* Keyboard navigation */
addEventListener('keydown',function(e){

    if(lb.hidden)return;

    if(e.key==='Escape')cl();
    if(e.key==='ArrowLeft')sh(ci-1);
    if(e.key==='ArrowRight')sh(ci+1);

});

/* Preserve existing school hub functionality */
var hp=[].slice.call(
    document.querySelectorAll('.hp')
);

var hb=[].slice.call(
    document.querySelectorAll('[data-h]')
);

function oh(n){

    hp.forEach(function(p){
        p.classList.toggle(
            'on',
            p.id==='hub-'+n
        );
    });

    hb.forEach(function(b){

        var o=b.dataset.h===n;

        b.classList.toggle('on',o);

        b.setAttribute(
            'aria-selected',
            o
        );
    });
}

hb.forEach(function(b){
    b.onclick=function(){
        oh(b.dataset.h);
    };
});

document.querySelectorAll('[data-hub]').forEach(
    function(a){
        a.addEventListener('click',function(){
            oh(a.dataset.hub);
        });
    }
);

/* Preserve existing scroll reveal functionality */
var io=window.IntersectionObserver&&
    new IntersectionObserver(
        function(es){

            es.forEach(function(e){

                if(e.isIntersecting){

                    e.target.classList.add('visible');

                    io.unobserve(e.target);
                }
            });

        },
        {threshold:.08}
    );

document.querySelectorAll(
    '.nx .section-kicker,.nx .section-title,.nx .lead,.nx .pr,.nx .hub'
).forEach(function(e){

    e.classList.add('reveal');

    io
        ?io.observe(e)
        :e.classList.add('visible');

});

})();

/* =========================================
   CINEMATIC GALLERY MOTION
   Append after the existing images.js code
========================================= */

(function () {
  "use strict";

  function startGalleryMotion() {
    var gallery = document.getElementById("gg");
    var viewer = document.getElementById("lb");

    if (!gallery) return;

    var cards = Array.from(gallery.querySelectorAll(".gi"));
    var hasGSAP = !!(window.gsap && window.ScrollTrigger);
    var reducedMotion = window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!cards.length) return;

    /* Register GSAP ScrollTrigger */
    if (hasGSAP) {
      gsap.registerPlugin(ScrollTrigger);
    }

    /* LENIS SMOOTH SCROLL */
    var lenis = null;

    if (!reducedMotion && window.Lenis) {
      try {
        lenis = new Lenis({
          duration: 1.15,
          smoothWheel: true,
          wheelMultiplier: 0.9,
          touchMultiplier: 1.05
        });

        if (hasGSAP) {
          lenis.on("scroll", ScrollTrigger.update);

          gsap.ticker.add(function (time) {
            lenis.raf(time * 1000);
          });

          gsap.ticker.lagSmoothing(0);
        } else {
          function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
          }
          requestAnimationFrame(raf);
        }

      } catch (error) {
        console.warn("Lenis could not start:", error);
      }
    }

    /* STAGGERED SCROLL REVEALS */
    if (hasGSAP && !reducedMotion) {
      gsap.set(cards, {
        autoAlpha: 0,
        y: 65,
        scale: 0.94,
        rotateX: 7,
        transformPerspective: 1200
      });

      ScrollTrigger.batch(cards, {
        start: "top 88%",
        once: true,
        onEnter: function (elements) {
          gsap.to(elements, {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            rotateX: 0,
            duration: 1.05,
            stagger: 0.12,
            ease: "power3.out",
            overwrite: true
          });
        }
      });
    } else {
      cards.forEach(function (card) {
        card.style.opacity = "1";
        card.style.visibility = "visible";
      });
    }

    /* INTERACTIVE 3D CARD TILT */
    var desktop = window.matchMedia &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    if (desktop && hasGSAP && !reducedMotion) {
      cards.forEach(function (card) {
        var image = card.querySelector("img");
        if (!image) return;

        card.addEventListener("pointermove", function (event) {
          var rect = card.getBoundingClientRect();

          var x = (event.clientX - rect.left) / rect.width;
          var y = (event.clientY - rect.top) / rect.height;

          gsap.to(card, {
            rotateY: (x - 0.5) * 14,
            rotateX: (0.5 - y) * 12,
            z: 15,
            transformPerspective: 1100,
            duration: 0.3,
            ease: "power2.out",
            overwrite: "auto"
          });

          gsap.to(image, {
            x: (x - 0.5) * -14,
            y: (y - 0.5) * -12,
            scale: 1.12,
            duration: 0.4,
            ease: "power2.out",
            overwrite: "auto"
          });
        });

        card.addEventListener("pointerleave", function () {
          gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            z: 0,
            duration: 0.65,
            ease: "elastic.out(1, 0.55)",
            overwrite: "auto"
          });

          gsap.to(image, {
            x: 0,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: "power3.out",
            overwrite: "auto"
          });
        });
      });
    }

    /* CINEMATIC FULLSCREEN VIEWER */
    if (viewer && hasGSAP && !reducedMotion) {
      var figure = viewer.querySelector("figure");
      var image = viewer.querySelector("img");

      var observer = new MutationObserver(function () {
        if (!viewer.hidden) {
          document.documentElement.classList.add(
            "gallery-viewer-open"
          );

          gsap.killTweensOf(viewer);

          gsap.fromTo(viewer,
            {
              autoAlpha: 0,
              filter: "blur(12px)"
            },
            {
              autoAlpha: 1,
              filter: "blur(0px)",
              duration: 0.48,
              ease: "power2.out"
            }
          );

          if (figure) {
            gsap.fromTo(figure,
              {
                y: 45,
                scale: 0.88,
                rotateX: 7,
                autoAlpha: 0,
                transformPerspective: 1200
              },
              {
                y: 0,
                scale: 1,
                rotateX: 0,
                autoAlpha: 1,
                duration: 0.78,
                ease: "power3.out"
              }
            );
          }
        } else {
          document.documentElement.classList.remove(
            "gallery-viewer-open"
          );
        }
      });

      observer.observe(viewer, {
        attributes: true,
        attributeFilter: ["hidden"]
      });

      /* Animate slideshow image changes */
      if (image) {
        var imageObserver = new MutationObserver(function () {
          gsap.fromTo(image,
            {
              autoAlpha: 0,
              scale: 1.045,
              y: 15
            },
            {
              autoAlpha: 1,
              scale: 1,
              y: 0,
              duration: 0.6,
              ease: "power3.out"
            }
          );
        });

        imageObserver.observe(image, {
          attributes: true,
          attributeFilter: ["src"]
        });
      }
    }

    /* Refresh layout after images load */
    if (hasGSAP) {
      window.addEventListener("load", function () {
        ScrollTrigger.refresh();
      });

      window.addEventListener("resize", function () {
        ScrollTrigger.refresh();
      });
    }

  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      startGalleryMotion,
      { once: true }
    );
  } else {
    startGalleryMotion();
  }

})();
