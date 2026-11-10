window.IM=["img/p00.webp", "img/p01.webp", "img/p02.webp", "img/p03.webp", "img/p04.webp", "img/p05.webp", "img/p06.webp", "img/p07.webp", "img/p08.webp", "img/p09.webp", "img/p10.webp", "img/p11.webp", "img/p12.webp", "img/p13.webp", "img/p14.webp"];
(function(){
var G=[[0,'Proud to be an Indian','Celebrations'],[1,'Young cadets on stage','Celebrations'],[4,'Voices of the nation','Celebrations'],[2,'Human pyramid in the courtyard','Sports & fitness'],[3,'Pyramid on the green','Sports & fitness'],[5,'Morning assembly prayer','Daily life'],[6,'Investiture ceremony','Leadership'],[7,'Champions with medals & certificates','Sports'],[8,'Sports meet inauguration','Sports'],[9,'Art & craft: Labour Day cards','Classroom'],[10,'Save Mother Earth','Classroom'],[11,'Clean environment drawings','Classroom'],[12,'Merry-go-round fun','Kids’ play area'],[13,'Kids’ play area','Kids’ play area']];
document.querySelectorAll('img[data-im]').forEach(function(i){i.src=IM[+i.dataset.im]});
var gg=document.getElementById('gg'),lb=document.getElementById('lb'),li=lb.querySelector('img'),lc=lb.querySelector('figcaption'),ci=0,tx=0;
function sh(i){ci=(i+G.length)%G.length;li.src=IM[G[ci][0]];li.alt=G[ci][1];lc.textContent=G[ci][1]+' · '+G[ci][2]}
function op(i){sh(i);lb.hidden=!1;document.documentElement.style.overflow='hidden'}
function cl(){lb.hidden=!0;document.documentElement.style.overflow=''}
G.forEach(function(g,i){var f=document.createElement('figure');f.className='gi reveal'+(i%5==0?' w2':'');f.tabIndex=0;f.innerHTML='<img alt="'+g[1]+'" loading="lazy" decoding="async"><figcaption><small>'+g[2]+'</small><b>'+g[1]+'</b></figcaption>';f.firstChild.src=IM[g[0]];f.onclick=function(){op(i)};f.onkeydown=function(e){if(e.key=='Enter')op(i)};gg.appendChild(f)});
lb.querySelector('.lbx').onclick=cl;lb.querySelector('.lbp').onclick=function(){sh(ci-1)};lb.querySelector('.lbn').onclick=function(){sh(ci+1)};lb.onclick=function(e){if(e.target==lb)cl()};
lb.addEventListener('touchstart',function(e){tx=e.touches[0].clientX},{passive:!0});lb.addEventListener('touchend',function(e){var d=e.changedTouches[0].clientX-tx;if(Math.abs(d)>50)sh(ci+(d<0?1:-1))},{passive:!0});
addEventListener('keydown',function(e){if(lb.hidden)return;if(e.key=='Escape')cl();if(e.key=='ArrowLeft')sh(ci-1);if(e.key=='ArrowRight')sh(ci+1)});
var hp=[].slice.call(document.querySelectorAll('.hp')),hb=[].slice.call(document.querySelectorAll('[data-h]'));
function oh(n){hp.forEach(function(p){p.classList.toggle('on',p.id=='hub-'+n)});hb.forEach(function(b){var o=b.dataset.h==n;b.classList.toggle('on',o);b.setAttribute('aria-selected',o)})}
hb.forEach(function(b){b.onclick=function(){oh(b.dataset.h)}});document.querySelectorAll('[data-hub]').forEach(function(a){a.addEventListener('click',function(){oh(a.dataset.hub)})});
var io=window.IntersectionObserver&&new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}})},{threshold:.08});
document.querySelectorAll('.nx .section-kicker,.nx .section-title,.nx .lead,.nx .pr,.nx .hub,.gi').forEach(function(e){e.classList.add('reveal');io?io.observe(e):e.classList.add('visible')});
})();
