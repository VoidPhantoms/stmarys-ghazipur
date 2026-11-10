window.IM=["img/p00.webp", "img/p01.webp", "img/p02.webp", "img/p03.webp", "img/p04.webp", "img/p05.webp", "img/p06.webp", "img/p07.webp", "img/p08.webp", "img/p09.webp", "img/p10.webp", "img/p11.webp", "img/p12.webp", "img/p13.webp", "img/p14.webp"];
(function(){
var G=[[0,'Proud to be an Indian','Celebrations'],[1,'Young cadets on stage','Celebrations'],[4,'Voices of the nation','Celebrations'],[2,'Human pyramid in the courtyard','Sports & fitness'],[3,'Pyramid on the green','Sports & fitness'],[5,'Morning assembly prayer','Daily life'],[6,'Investiture ceremony','Leadership'],[7,'Champions with medals & certificates','Sports'],[8,'Sports meet inauguration','Sports'],[9,'Art & craft: Labour Day cards','Classroom'],[10,'Save Mother Earth','Classroom'],[11,'Clean environment drawings','Classroom'],[12,'Merry-go-round fun','Kids’ play area'],[13,'Kids’ play area','Kids’ play area']];
document.querySelectorAll('img[data-im]').forEach(function(i){i.src=IM[+i.dataset.im]});
var gg=document.getElementById('gg'),lb=document.getElementById('lb'),li=lb.querySelector('img'),lc=lb.querySelector('figcaption'),ci=0,tx=0;
function sh(i){ci=(i+G.length)%G.length;li.src=IM[G[ci][0]];li.alt=G[ci][1];lc.textContent=G[ci][1]+' · '+G[ci][2]}
function op(i){sh(i);lb.hidden=!1;document.documentElement.style.overflow='hidden'}
function cl(){lb.hidden=!0;document.documentElement.style.overflow=''}
/* cinematic drag gallery */
(function(){var N=G.length,Wa=0,ar=1.6,pos=0,target=0,vel=0,drag=false,sx=0,sp=0,moved=0,lastX=0,lastT=0,raf=0,wh=0,rm=matchMedia('(prefers-reduced-motion: reduce)').matches;
function cl2(v,a,b){return Math.min(b,Math.max(a,v))}
gg.className='gx';gg.setAttribute('role','region');gg.setAttribute('aria-label','School photo gallery. Drag, swipe or use the arrow keys to browse.');gg.tabIndex=0;
gg.innerHTML='<div class="gx-hint" aria-hidden="true"><i>Keep exploring</i><span>Drag to explore<em></em></span></div><div class="gx-line" aria-hidden="true"><span></span></div><div class="gx-nav"><button type="button" class="gx-p" aria-label="Previous photo">&#8249;</button><button type="button" class="gx-n" aria-label="Next photo">&#8250;</button></div><div class="gx-meta" aria-live="polite"><b></b><small></small></div>';
var hint=gg.querySelector('.gx-hint'),line=gg.querySelector('.gx-line span'),mb=gg.querySelector('.gx-meta b'),ms=gg.querySelector('.gx-meta small'),S=[];
function go(i){target=cl2(Math.round(i),0,N-1);kick()}
G.forEach(function(g,i){var f=document.createElement('figure');f.className='gx-s';f.setAttribute('aria-label',(i+1)+' of '+N+': '+g[1]);
  var w=document.createElement('div');w.className='gx-i';var m=document.createElement('img');m.alt=g[1];m.decoding='async';if(i>2)m.loading='lazy';m.draggable=false;m.src=IM[g[0]];w.appendChild(m);
  var c=document.createElement('figcaption');c.className='gx-t';c.innerHTML='<small></small><b></b>';c.firstChild.textContent=g[2];c.lastChild.textContent=g[1];f.appendChild(w);f.appendChild(c);gg.appendChild(f);S.push([f,m,0]);
  f.addEventListener('click',function(){if(moved>6)return;if(Math.round(pos)===i)op(i);else go(i)})});
function lay(){var C=gg.clientWidth,mob=C<640;ar=mob?1.25:1.6;Wa=Math.min(mob?C*.74:C*.58,mob?520:800);var h=Wa/ar;gg.style.setProperty('--wa',Wa+'px');gg.style.setProperty('--sh',h+'px');gg.style.setProperty('--lt',Math.round(h*.8)+'px');gg.style.height=Math.round(h+78)+'px';render()}
function render(){var step=Wa*.84,i;for(i=0;i<N;i++){var d=i-pos,a=Math.abs(d),e=S[i],st=e[0].style;
  if(a>2.3){if(e[2]){st.visibility='hidden';e[2]=0}continue}e[2]=1;
  var sc=1-.18*Math.min(a,1),o=a<=1?1-.5*a:Math.max(0,.5-(a-1)*.5);
  st.visibility='visible';st.opacity=o.toFixed(3);st.zIndex=10-Math.round(a*3);st.transform='translate3d('+(d*step).toFixed(1)+'px,0,0) scale('+sc.toFixed(3)+')';
  e[1].style.transform='scale(1.16) translate3d('+(-d*6).toFixed(2)+'%,0,0)';st.setProperty('--tv',cl2(1-a*1.7,0,1).toFixed(3))}
  var r=Math.round(cl2(pos,0,N-1));mb.textContent=('0'+(r+1)).slice(-2)+' / '+('0'+N).slice(-2);ms.textContent=G[r][2];line.style.width=((cl2(pos,0,N-1)+1)/N*100).toFixed(2)+'%';hint.style.opacity=cl2(1-pos*2.2,0,1).toFixed(2)}
function tick(){var df=target-pos;if(Math.abs(df)<.0015&&!drag){pos=target;render();raf=0;return}if(!drag)pos+=df*(rm?1:.13);render();raf=requestAnimationFrame(tick)}
function kick(){if(!raf)raf=requestAnimationFrame(tick)}
function mv(e){var dx=e.clientX-sx;moved=Math.max(moved,Math.abs(dx));pos=cl2(sp-dx/(Wa*.84),-.3,N-.7);target=pos;var t=performance.now(),dt=t-lastT||1;vel=.8*vel+.2*((e.clientX-lastX)/dt);lastX=e.clientX;lastT=t}
function up(){if(!drag)return;drag=false;removeEventListener('pointermove',mv);removeEventListener('pointerup',up);removeEventListener('pointercancel',up);gg.classList.remove('is-drag');var v=-vel*1000/(Wa*.84)*.18;target=cl2(Math.round(pos+(Math.abs(v)>.15?v:0)),0,N-1);kick()}
gg.addEventListener('pointerdown',function(e){if(e.target.closest('button')||(e.pointerType==='mouse'&&e.button!==0))return;drag=true;moved=0;sx=lastX=e.clientX;sp=pos;vel=0;lastT=performance.now();gg.classList.add('is-drag');addEventListener('pointermove',mv);addEventListener('pointerup',up);addEventListener('pointercancel',up);kick()});
gg.addEventListener('wheel',function(e){if(Math.abs(e.deltaX)>Math.abs(e.deltaY)&&Math.abs(e.deltaX)>4){e.preventDefault();wh+=e.deltaX;if(Math.abs(wh)>60){go(target+(wh>0?1:-1));wh=0}}},{passive:false});
gg.addEventListener('keydown',function(e){if(e.key==='ArrowRight'){e.preventDefault();go(target+1)}else if(e.key==='ArrowLeft'){e.preventDefault();go(target-1)}else if(e.key==='Enter'&&e.target===gg)op(Math.round(pos))});
gg.querySelector('.gx-p').onclick=function(){go(target-1)};gg.querySelector('.gx-n').onclick=function(){go(target+1)};
var rz=0;addEventListener('resize',function(){cancelAnimationFrame(rz);rz=requestAnimationFrame(lay)});lay()})();
lb.querySelector('.lbx').onclick=cl;lb.querySelector('.lbp').onclick=function(){sh(ci-1)};lb.querySelector('.lbn').onclick=function(){sh(ci+1)};lb.onclick=function(e){if(e.target==lb)cl()};
lb.addEventListener('touchstart',function(e){tx=e.touches[0].clientX},{passive:!0});lb.addEventListener('touchend',function(e){var d=e.changedTouches[0].clientX-tx;if(Math.abs(d)>50)sh(ci+(d<0?1:-1))},{passive:!0});
addEventListener('keydown',function(e){if(lb.hidden)return;if(e.key=='Escape')cl();if(e.key=='ArrowLeft')sh(ci-1);if(e.key=='ArrowRight')sh(ci+1)});
var hp=[].slice.call(document.querySelectorAll('.hp')),hb=[].slice.call(document.querySelectorAll('[data-h]'));
function oh(n){hp.forEach(function(p){p.classList.toggle('on',p.id=='hub-'+n)});hb.forEach(function(b){var o=b.dataset.h==n;b.classList.toggle('on',o);b.setAttribute('aria-selected',o)})}
hb.forEach(function(b){b.onclick=function(){oh(b.dataset.h)}});document.querySelectorAll('[data-hub]').forEach(function(a){a.addEventListener('click',function(){oh(a.dataset.hub)})});
var io=window.IntersectionObserver&&new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}})},{threshold:.08});
document.querySelectorAll('.nx .section-kicker,.nx .section-title,.nx .lead,.nx .pr,.nx .hub,.gi').forEach(function(e){e.classList.add('reveal');io?io.observe(e):e.classList.add('visible')});
})();
