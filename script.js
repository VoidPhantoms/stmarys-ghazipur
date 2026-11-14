try{


(function(){
var cv=document.getElementById('c'),ld=document.getElementById('ld'),stage=document.getElementById('heroStage'),mob=innerWidth<800;
function finishLoader(msg){var t=document.getElementById('loaderStatus');if(t&&msg)t.textContent=msg;var b=document.getElementById('loaderBar');if(b)b.style.width='100%';var p=document.getElementById('loaderPct');if(p)p.textContent='100%';setTimeout(function(){ld.classList.add('h')},900);};window.addEventListener('error',function(e){if(e&&e.message){var t=document.getElementById('loaderStatus');if(t)t.textContent='Showing the school campus view';var f=document.getElementById('webglFallback');if(f)f.classList.add('show');finishLoader('Campus view ready');}});
if(!window.THREE){var f=document.getElementById('webglFallback');if(f)f.classList.add('show');finishLoader('Campus photograph ready');return}
var R;try{R=new THREE.WebGLRenderer({canvas:cv,alpha:true,antialias:true,powerPreference:'high-performance'})}catch(e){var f2=document.getElementById('webglFallback');if(f2)f2.classList.add('show');finishLoader('Campus photograph ready');return}
R.setPixelRatio(Math.min(devicePixelRatio||1,2));R.shadowMap.enabled=!mob;R.shadowMap.type=THREE.PCFSoftShadowMap;R.outputEncoding=THREE.sRGBEncoding;R.toneMapping=THREE.ACESFilmicToneMapping;R.toneMappingExposure=1.08;R.setClearColor(0x000000,0);
var S=new THREE.Scene(),C=new THREE.PerspectiveCamera(mob?58:42,1,1,2500),O=new THREE.OrbitControls(C,cv);
O.enableDamping=true;O.dampingFactor=.065;O.maxPolarAngle=1.53;O.enablePan=false;O.minDistance=20;O.maxDistance=210;O.target.set(mob?0:-13,6,0);O.autoRotate=true;O.autoRotateSpeed=.25;
function rs(){var w=Math.max(1,stage.clientWidth),h=Math.max(1,stage.clientHeight);R.setSize(w,h,false);C.aspect=w/h;C.fov=(w/h<.78)?58:42;C.updateProjectionMatrix()}rs();addEventListener('resize',rs);if(window.ResizeObserver){new ResizeObserver(rs).observe(stage);}
var rnd=function(a,b){return a+Math.random()*(b-a)},AN=R.capabilities.getMaxAnisotropy();
function cvs(w,h,f,rep){var c=document.createElement('canvas');c.width=w;c.height=h;f(c.getContext('2d'),w,h);var t=new THREE.CanvasTexture(c);t.encoding=THREE.sRGBEncoding;t.anisotropy=AN;t.wrapS=t.wrapT=THREE.RepeatWrapping;if(rep)t.repeat.set(rep[0],rep[1]);return t}
function noise(g,w,h,n,a,col){for(var i=0;i<n;i++){g.fillStyle=col(a);g.fillRect(Math.random()*w,Math.random()*h,rnd(1,4),rnd(1,4))}}
/* textures */
var plaster=cvs(512,512,function(g,w,h){g.fillStyle='#f1d9a6';g.fillRect(0,0,w,h);noise(g,w,h,9000,0,function(){return'rgba('+(120+Math.random()*60|0)+',90,50,'+Math.random()*.07+')'});for(var i=0;i<30;i++){var x=Math.random()*w,gr=g.createLinearGradient(0,0,0,h);g.fillStyle='rgba(70,55,35,.05)';g.fillRect(x,0,rnd(2,10),rnd(80,400))}},[10,2]);
var brick=cvs(512,512,function(g,w,h){g.fillStyle='#4a2118';g.fillRect(0,0,w,h);for(var y=0;y<h;y+=16)for(var x=(y/16%2)*16-16;x<w;x+=32){g.fillStyle='hsl('+rnd(5,14)+','+rnd(38,52)+'%,'+rnd(24,34)+'%)';g.fillRect(x+1,y+1,30,14)}},[8,1]);
var bump=cvs(512,512,function(g,w,h){g.fillStyle='#bbb';g.fillRect(0,0,w,h);g.fillStyle='#222';for(var y=0;y<h;y+=16){g.fillRect(0,y,w,2);for(var x=(y/16%2)*16-16;x<w;x+=32)g.fillRect(x,y,2,16)}},[8,1]);
var concrete=cvs(512,512,function(g,w,h){g.fillStyle='#8d8982';g.fillRect(0,0,w,h);noise(g,w,h,12000,0,function(){return'rgba('+(60+Math.random()*80|0)+','+(60+Math.random()*70|0)+',60,'+Math.random()*.1+')'});for(var i=0;i<14;i++){g.fillStyle='rgba(30,35,25,.12)';g.beginPath();g.ellipse(Math.random()*w,Math.random()*h,rnd(20,70),rnd(10,40),0,0,6.3);g.fill()}},[6,6]);
var grassT=cvs(1024,1024,function(g,w,h){g.fillStyle='#668a36';g.fillRect(0,0,w,h);noise(g,w,h,26000,0,function(){return'hsla('+rnd(65,105)+',48%,'+rnd(20,40)+'%,.4)'});for(var i=0;i<26;i++){g.fillStyle='rgba(110,95,50,.12)';g.beginPath();g.ellipse(Math.random()*w,Math.random()*h,rnd(30,120),rnd(20,70),0,0,6.3);g.fill()}},[60,60]);
var lawn=cvs(1024,720,function(g,w,h){g.fillStyle='#4f8f2b';g.fillRect(0,0,w,h);for(var x=0;x<w;x+=64){g.fillStyle=(x/64)%2?'rgba(255,255,255,.04)':'rgba(0,0,0,.05)';g.fillRect(x,0,64,h)}noise(g,w,h,30000,0,function(){return'hsla('+rnd(70,100)+',50%,'+rnd(20,36)+'%,.4)'});g.strokeStyle='rgba(150,120,60,.2)';g.lineWidth=26;g.strokeRect(70,70,w-140,h-140);g.lineWidth=14;g.beginPath();g.moveTo(w/2,70);g.lineTo(w/2,h-70);g.stroke()});
var tile=cvs(256,256,function(g){g.fillStyle='#b5776a';g.fillRect(0,0,256,256);for(var i=0;i<4;i++)for(var j=0;j<4;j++)if((i+j)%2==0){g.fillStyle='#aaa59d';g.fillRect(i*64+2,j*64+2,60,60)}noise(g,256,256,1200,0,function(){return'rgba(0,0,0,'+Math.random()*.08+')'})},[18,5]);
var sign=cvs(1024,128,function(g,w,h){g.fillStyle='#f6edd6';g.fillRect(0,0,w,h);g.fillStyle='#0fa0b8';g.font='700 70px "Comic Sans MS","Trebuchet MS",cursive';g.textAlign='center';g.textBaseline='middle';g.fillText("St. Mary's Convent School",w/2-14,h/2+5);g.fillStyle='#0fa0b8';g.fillRect(w-62,24,8,80);g.fillRect(w-80,44,44,8)});
var maroonT=cvs(512,512,function(g,w,h){g.fillStyle='#9c4d57';g.fillRect(0,0,w,h);noise(g,w,h,9000,0,function(){return'rgba(60,20,25,'+Math.random()*.08+')'});for(var i=0;i<26;i++){g.fillStyle='rgba(50,30,25,.06)';g.fillRect(Math.random()*w,0,rnd(2,9),rnd(80,420))}},[8,1]);
var slate=cvs(256,256,function(g){g.fillStyle='#585c60';g.fillRect(0,0,256,256);for(var y=0;y<256;y+=64)for(var x=(y/64%2)*32;x<256;x+=64){g.fillStyle='hsl(210,6%,'+rnd(30,40)+'%)';g.fillRect(x+2,y+2,60,60)}g.fillStyle='#eee';g.beginPath();g.arc(128,128,14,0,6.3);g.fill()},[30,1]);
var sandT=cvs(512,512,function(g,w,h){g.fillStyle='#d4c09a';g.fillRect(0,0,w,h);noise(g,w,h,16000,0,function(){return'rgba('+(150+Math.random()*60|0)+',125,85,'+Math.random()*.18+')'})},[24,8]);
var bdT=cvs(512,160,function(g,w,h){g.fillStyle='#2a1f5a';g.fillRect(0,0,w,h);var cs=['#e63e8a','#12b7c4','#f5a623','#7b3fe4','#3ecf6e'];for(var i=0;i<22;i++){g.fillStyle=cs[i%5];g.beginPath();g.moveTo(i*24,0);g.quadraticCurveTo(i*24+30,h/2,i*24-10,h);g.lineTo(i*24+22,h);g.quadraticCurveTo(i*24+60,h/2,i*24+24,0);g.fill()}});
function M(o){var m=new THREE.MeshStandardMaterial(o);if(o.envMapIntensity===undefined)m.envMapIntensity=.4;return m}
var mCream=M({map:plaster,roughness:.92}),mTrim=M({color:0xf3e6cf,roughness:.8}),mBrick=M({map:brick,bumpMap:bump,bumpScale:1.4,roughness:.95}),mRoof=M({map:concrete,roughness:1}),mDark=M({color:0x3b3a38,roughness:1});
function mesh(g,m,x,y,z,sh){var o=new THREE.Mesh(g,m);o.position.set(x,y,z);if(sh!==0){o.castShadow=o.receiveShadow=true}S.add(o);return o}
function box(w,h,d,x,y,z,m){return mesh(new THREE.BoxGeometry(w,h,d),m,x,y,z)}
var H=12.6,FH=4.2,HF=12.6,mMar=M({map:maroonT,roughness:.9}),mDM=M({color:0x7a3d3c,roughness:.85}),mCol=M({color:0x93453f,roughness:.8}),mFr=M({color:0x3a6fae,roughness:.55,metalness:.15});
/* sky dome + env */
var skyU={top:{value:new THREE.Color()},hor:{value:new THREE.Color()},sunDir:{value:new THREE.Vector3(0,1,0)},sunCol:{value:new THREE.Color()},stars:{value:0}};
var skyM=new THREE.ShaderMaterial({side:THREE.BackSide,depthWrite:false,fog:false,uniforms:skyU,vertexShader:'varying vec3 v;void main(){v=normalize(position);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
fragmentShader:'varying vec3 v;uniform vec3 top,hor,sunDir,sunCol;uniform float stars;float h(vec3 p){return fract(sin(dot(p,vec3(12.9,78.2,37.7)))*43758.5);}void main(){vec3 d=normalize(v);float e=max(d.y,0.);vec3 c=mix(hor,top,pow(e,.55));float s=max(dot(d,normalize(sunDir)),0.);c+=sunCol*(pow(s,900.)*4.+pow(s,24.)*.35+pow(s,4.)*.12);float st=step(.9975,h(floor(d*260.)))*stars*smoothstep(.05,.4,e);c+=vec3(st);gl_FragColor=vec4(c,1.);}'});
var skyGeo=new THREE.SphereGeometry(1800,32,16),skyScene=new THREE.Scene();skyScene.add(new THREE.Mesh(skyGeo,skyM));
var sky=new THREE.Mesh(skyGeo,skyM);sky.renderOrder=-1;S.add(sky);

/* ground, plaza, paths */
var _g0=S.children.length;var gm=M({map:grassT,roughness:1});mesh(new THREE.PlaneGeometry(1600,1600),gm,0,0,0,0).rotation.x=-Math.PI/2;S.children[S.children.length-1].receiveShadow=true;
function plane(w,d,m,x,y,z){var p=mesh(new THREE.PlaneGeometry(w,d),m,x,y,z,0);p.rotation.x=-Math.PI/2;p.receiveShadow=true;return p}
var t2=tile.clone();t2.needsUpdate=true;t2.repeat.set(2,9);plane(120,5,M({map:tile,roughness:.75}),0,.05,45.5);plane(150,40,M({map:sandT,roughness:1}),0,.04,82);plane(9,44,M({map:t2,roughness:.75}),0,.06,78);[0,1,2].forEach(function(i){box(80-i*2,.22,1.6,0,.11+(2-i)*.22,48.8+i*1.5,M({color:0xb8a79a,roughness:.9}))});
box(106,1.4,88,0,-3,2,M({color:0x0c2a2b,metalness:.55,roughness:.28}));box(108,.16,90,0,-2.2,2,M({color:0xc5a46b,metalness:.8,roughness:.3,emissive:0x6b5320,emissiveIntensity:.5}));var lw=plane(62,42,M({map:lawn,roughness:1}),0,.09,0);
/* main blocks */
mesh(new THREE.BoxGeometry(90,HF,14),[mCream,mCream,mCream,mCream,mMar,mCream],0,HF/2,28);box(90,H,14,0,H/2,-28,mCream);box(14,H,42,-38,H/2,0,mCream);box(14,H,42,38,H/2,0,mCream);
[[0,28,90,14,HF],[0,-28,90,14,H],[-38,0,14,42,H],[38,0,14,42,H]].forEach(function(r){box(r[2]-.4,.35,r[3]-.4,r[0],r[4]+.17,r[1],mRoof)});
box(90.4,1.6,.6,0,HF+.8,35.1,mMar);box(90.4,1.1,.6,0,H+.55,-35.1,mTrim);box(.6,1.1,56.4,-45.1,H+.55,-7,mTrim);box(.6,1.1,56.4,45.1,H+.55,-7,mTrim);box(.6,1.1,14.4,-45.1,HF+.55,28,mTrim);box(.6,1.1,14.4,45.1,HF+.55,28,mTrim);
box(62.4,1.1,.6,0,HF+.55,21,mTrim);box(62.4,1.1,.6,0,H+.55,-21,mTrim);box(.6,1.1,42.4,-31,H+.55,0,mTrim);box(.6,1.1,42.4,31,H+.55,0,mTrim);
/* plinth + floor cornices outside */
[[0,35.25,90.6,.6],[0,-35.25,90.6,.6]].forEach(function(p){[0,1,2].forEach(function(f){box(p[2],.3,.8,p[0],f*FH+.15+(f?0:0),p[1],mTrim)})});
box(.8,.3,70.6,-45.25,.15,0,mTrim);box(.8,.3,70.6,45.25,.15,0,mTrim);
[1,2].forEach(function(f){box(.8,.3,70.6,-45.25,f*FH,0,mTrim);box(.8,.3,70.6,45.25,f*FH,0,mTrim)});
/* maroon front, cream bays, hoods */
box(6.2,HF,.9,-42,HF/2,35.35,mCream);box(6.2,HF,.9,42,HF/2,35.35,mCream);box(78.4,.4,.9,0,FH,35.35,mTrim);box(78.4,.4,.9,0,FH*2,35.35,mTrim);
/* plain cream corner blocks on all four corners */
[-1,1].forEach(function(sx){box(6.2,H,.9,sx*42,H/2,-35.35,mCream);[-1,1].forEach(function(sz){box(.9,H,6.2,sx*45.35,H/2,sz*31.9,mCream)})});
box(40,.9,10,0,HF+.45,27,mDark);
/* rooftop details */
function tank(x,z){mesh(new THREE.CylinderGeometry(1.5,1.5,2.2,20),M({color:0x1c1c1c,roughness:.6}),x,H+1.4,z);mesh(new THREE.CylinderGeometry(.2,1.5,.5,20),M({color:0x1c1c1c}),x,H+2.75,z)}
[[-30,-30],[-24,-30],[30,-31],[-40,8],[40,-8],[-40,-12]].forEach(function(p){tank(p[0],p[1])});
box(6,3,6,-41,HF+1.5,26,mTrim);box(6,3,6,41,HF+1.5,26,mTrim);box(6,3,6,-41,H+1.5,-26,mTrim);box(6,3,6,41,H+1.5,-26,mTrim);
/* canopy with banner, maroon pillars, steps, doors */
box(26,.7,7.6,0,4.4,39.4,mTrim);box(26.2,1.5,.5,0,5.0,43.15,M({color:0xf6edd6,roughness:.7}));mesh(new THREE.PlaneGeometry(25,1.4),M({map:sign,roughness:.6}),0,5.0,43.42,0);
[-11,-6.5,-2,2,6.5,11].forEach(function(x){box(1,4.1,1,x,2.05,42.4,mCol)});
box(9,3.4,.2,0,1.7,35.4,M({color:0x20323a,metalness:.5,roughness:.3}));mesh(new THREE.PlaneGeometry(8.2,3),M({color:0x14a0b0,transparent:true,opacity:.35,roughness:.2}),0,1.7,35.55,0);
/* instanced windows, pilasters, sills */
var gMat=new THREE.MeshStandardMaterial({color:0x3a6a88,metalness:.1,roughness:.12,emissive:0x08141c}),litMat=new THREE.MeshBasicMaterial({color:0xffc86a,transparent:true,opacity:.92,fog:true}),fMat=mTrim;
var walls=[[0,35,0,78,13,1,3,'m'],[0,-35,Math.PI,88,22,0,3,'c'],[-45,-7,-Math.PI/2,56,14,0,3,'c'],[45,-7,Math.PI/2,56,14,0,3,'c'],[-45,28,-Math.PI/2,14,3,0,3,'c'],[45,28,Math.PI/2,14,3,0,3,'c'],[0,21,Math.PI,60,15,0,3,'d'],[0,-21,0,60,15,0,3,'d'],[-31,0,Math.PI/2,40,10,0,3,'d'],[31,0,-Math.PI/2,40,10,0,3,'d']];
var gates=[],wins=[];walls.forEach(function(w){var sp=w[3]/w[4],th=w[2],t=new THREE.Vector3(Math.cos(th),0,-Math.sin(th)),n=new THREE.Vector3(Math.sin(th),0,Math.cos(th));
 for(var i=0;i<w[4];i++)for(var f=0;f<w[6];f++){var xo=(i-(w[4]-1)/2)*sp,y=f*FH+2.5;if(w[5]&&f==0&&Math.abs(xo)<8)continue;var wx=w[0]+t.x*xo,wz=w[1]+t.z*xo;if(!w[5]&&Math.abs(wx)>=37.5&&Math.abs(wz)>=27.5)continue;if(f==0&&((w[5]&&Math.abs(xo)>35.5)||(!w[5]&&Math.abs(wx)>44&&(Math.abs(wz+25)<.6||Math.abs(wz-23.33)<.6)))){gates.push({p:new THREE.Vector3(w[0],0,w[1]).addScaledVector(t,xo).addScaledVector(n,w[5]?.85:.65),th:th});continue}wins.push({p:new THREE.Vector3(w[0],y,w[1]).addScaledVector(t,xo).addScaledVector(n,w[5]?.4:.05),th:th,n:n.clone(),t:t.clone(),sp:sp,xo:xo,y:y,off:w[5]?.4:.05,i:i,f:f})}});
/* modern gates: front ends + both sides, with raised landing, steps, rails and a highlighted path */
var gCh=M({color:0x2b3037,roughness:.55,metalness:.05}),gSt=M({color:0xcfd5da,roughness:.35}),gBk=M({color:0x101214,roughness:1}),gLed=new THREE.MeshBasicMaterial({color:0xffe2a8}),gStone=M({color:0xe3d8c2,roughness:.9}),gNose=M({color:0x9c4d57,roughness:.8}),tp=tile.clone();tp.needsUpdate=true;tp.repeat.set(1,1.5);var gPath=M({map:tp,roughness:.8});
gates.forEach(function(G){var g=new THREE.Group();function b(w,h,d,x,y,z,m){var o=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m);o.position.set(x,y,z);o.castShadow=o.receiveShadow=true;g.add(o)}
 var Y=.4;
 b(3.0,3.3,.2,0,Y+1.65,-.05,gBk);
 [-1.62,1.62].forEach(function(x){b(.26,3.5,.46,x,Y+1.75,.05,mTrim)});b(3.5,.28,.46,0,Y+3.5,.05,mTrim);
 [-1,1].forEach(function(sd){b(1.42,3.2,.06,sd*.72,Y+1.6,.12,gCh);for(var k=0;k<7;k++)b(.045,3.05,.09,sd*(.12+k*.2)+(sd>0?.0:0),Y+1.6,.18,gCh)});
 b(.04,.75,.07,-.12,Y+1.5,.24,gSt);b(.04,.75,.07,.12,Y+1.5,.24,gSt);b(2.9,.06,.1,0,Y+.12,.18,gSt);b(2.9,.06,.1,0,Y+3.05,.18,gSt);
 b(3.0,.05,.08,0,Y+3.32,.1,gLed);
 b(3.9,.4,1.35,0,.2,.68,gStone);b(3.9,.04,.1,0,.42,1.32,gNose);
 b(3.9,.27,.5,0,.135,1.6,gStone);b(3.9,.04,.08,0,.29,1.84,gNose);
 b(3.9,.13,.5,0,.065,2.1,gStone);b(3.9,.04,.08,0,.15,2.34,gNose);
 [-2.0,2.0].forEach(function(x){b(.05,.9,.05,x,.4+.45,.25,gSt);b(.05,.9,.05,x,.4+.45,1.95,gSt);b(.04,.04,1.75,x,.4+.9,1.1,gSt)});
 var pa=new THREE.Mesh(new THREE.PlaneGeometry(3.4,5),gPath);pa.rotation.x=-Math.PI/2;pa.position.set(0,.07,5.0);pa.receiveShadow=true;g.add(pa);
 g.position.copy(G.p);g.rotation.y=G.th;S.add(g)});
var N=wins.length,fr=new THREE.InstancedMesh(new THREE.BoxGeometry(2.7,3.3,.35),mFr,N),gl=new THREE.InstancedMesh(new THREE.BoxGeometry(2.25,2.85,.1),gMat,N),sl=new THREE.InstancedMesh(new THREE.BoxGeometry(3.2,.28,.8),fMat,N),lit=new THREE.InstancedMesh(new THREE.PlaneGeometry(2.1,2.7),litMat,N),mx=new THREE.Matrix4(),q=new THREE.Quaternion(),one=new THREE.Vector3(1,1,1),hide=new THREE.Matrix4().makeScale(0,0,0);
var litOn=[];
wins.forEach(function(w,k){q.setFromAxisAngle(new THREE.Vector3(0,1,0),w.th);
 mx.compose(w.p.clone().addScaledVector(w.n,.1),q,one);fr.setMatrixAt(k,mx);
 mx.compose(w.p.clone().addScaledVector(w.n,.34),q,one);gl.setMatrixAt(k,mx);
 mx.compose(new THREE.Vector3(w.p.x,w.p.y-1.75,w.p.z).addScaledVector(w.n,.28),q,one);sl.setMatrixAt(k,mx);
 mx.compose(w.p.clone().addScaledVector(w.n,.41),q,one);lit.setMatrixAt(k,mx);litOn.push(Math.random()<.75);
 var c=new THREE.Color().setHSL(.56,.25,rnd(.7,1.15));gl.setColorAt(k,c)});
[fr,gl,sl].forEach(function(m){m.castShadow=true;m.receiveShadow=true;S.add(m)});S.add(lit);lit.visible=false;
function setLit(on){lit.visible=on;wins.forEach(function(w,k){var a=new THREE.Matrix4();lit.getMatrixAt(k,a);if(!litOn[k]){a.makeScale(0,0,0);a.setPosition(0,-99,0)}lit.setMatrixAt(k,a)});lit.instanceMatrix.needsUpdate=true}
(function(){walls.forEach(function(w){var th=w[2],hh=w[6]*FH,t=new THREE.Vector3(Math.cos(th),0,-Math.sin(th)),n=new THREE.Vector3(Math.sin(th),0,Math.cos(th)),sp=w[3]/w[4],mat=w[7]=='m'?mMar:w[7]=='d'?mDM:mTrim,g=new THREE.InstancedMesh(new THREE.BoxGeometry(.7,hh,.5),mat,w[4]+1),c2=w[7]=='d'?new THREE.InstancedMesh(new THREE.BoxGeometry(.85,hh,.85),mCol,w[4]+1):null;q.setFromAxisAngle(new THREE.Vector3(0,1,0),th);
 for(var i=0;i<=w[4];i++){var xo=(i-w[4]/2)*sp;mx.compose(new THREE.Vector3(w[0],hh/2,w[1]).addScaledVector(t,xo).addScaledVector(n,w[5]?.55:.2),q,one);g.setMatrixAt(i,mx);if(c2){mx.compose(new THREE.Vector3(w[0],hh/2,w[1]).addScaledVector(t,xo).addScaledVector(n,1.75),q,one);c2.setMatrixAt(i,mx)}}
 g.castShadow=g.receiveShadow=true;S.add(g);if(c2){c2.castShadow=c2.receiveShadow=true;S.add(c2)}})})();
(function(){var pn=new THREE.InstancedMesh(new THREE.BoxGeometry(5,3.8,.3),mCream,39),hd=new THREE.InstancedMesh(new THREE.BoxGeometry(4.6,1.3,.6),mCream,13),lv=new THREE.InstancedMesh(new THREE.BoxGeometry(2,.4,.15),mDark,13),k=0;
 for(var i=0;i<13;i++){var x=(i-6)*6;for(var f=0;f<3;f++){if(f==0&&Math.abs(x)<8)continue;mx.makeTranslation(x,f*FH+2.5,35.2);pn.setMatrixAt(k++,mx)}mx.makeTranslation(x,HF+.75,35.5);hd.setMatrixAt(i,mx);mx.makeTranslation(x,HF+.8,35.82);lv.setMatrixAt(i,mx)}
 pn.count=k;[pn,hd,lv].forEach(function(m){m.castShadow=m.receiveShadow=true;S.add(m)})})();
/* inner corridors: slabs + rails */
[FH,FH*2].forEach(function(y){box(62,.3,1.6,0,y,-20.2,mDM);(y<HF)&&box(62,.3,1.6,0,y,20.2,mDM);box(1.6,.3,42,-30.2,y,0,mDM);box(1.6,.3,42,30.2,y,0,mDM);
 var rm=M({color:0xe8dcc3,roughness:.7});box(62,.9,.12,0,y+.65,-19.5,rm);(y<HF)&&box(62,.9,.12,0,y+.65,19.5,rm);box(.12,.9,42,-29.5,y+.65,0,rm);box(.12,.9,42,29.5,y+.65,0,rm)});
var slM=M({map:slate,roughness:.6});plane(62,1.9,slM,0,.14,-20.05);plane(62,1.9,slM,0,.14,20.05);[-30.05,30.05].forEach(function(x){var p=plane(1.9,42,slM,x,.14,0)});
/* stage + steps */
var stM=M({color:0xb3aea6,roughness:.85});var st=mesh(new THREE.CylinderGeometry(9,9,.45,56,1,false,-Math.PI/2,Math.PI),stM,0,.33,-19.9);
mesh(new THREE.CylinderGeometry(9.9,9.9,.28,56,1,false,-Math.PI/2,Math.PI),M({color:0xb6705a,roughness:.9}),0,.2,-19.9);
box(18,.15,.9,0,.1,-20.7,M({color:0xb6705a,roughness:.9}));mesh(new THREE.PlaneGeometry(16,5),M({map:bdT,roughness:.9,side:THREE.DoubleSide}),0,3.2,-18.6,0);
var _o0=S.children.length;/* boundary wall + gate */
function bw(w,d,x,z){box(w,2.4,d,x,1.2,z,mCream);box(w+.2,.25,d+.2,x,2.5,z,mTrim)}
bw(.5,160,-74,20);bw(.5,160,74,20);bw(148,.5,0,-60);bw(64,.5,-42,100);bw(64,.5,42,100);
[-10.5,10.5].forEach(function(x){box(1.6,4.2,1.6,x,2.1,100,mTrim);box(2,.4,2,x,4.4,100,mTrim);mesh(new THREE.SphereGeometry(.55,12,10),M({color:0xffe9b0,emissive:0xffcc66,emissiveIntensity:.3}),x,5.1,100)});
var bars=new THREE.InstancedMesh(new THREE.BoxGeometry(.12,3.2,.12),mDark,40);for(var i=0;i<40;i++){mx.makeTranslation(-9+i*.46,1.6,100);bars.setMatrixAt(i,mx)}S.add(bars);
/* flag pole */
mesh(new THREE.CylinderGeometry(.12,.18,16,10),M({color:0xcfd2d6,metalness:.8,roughness:.3}),0,8,50);
[[0xff9933,0],[0xffffff,.55],[0x138808,1.1]].forEach(function(c){var f=mesh(new THREE.PlaneGeometry(2.6,.55),new THREE.MeshStandardMaterial({color:c[0],side:THREE.DoubleSide,roughness:.9}),1.4,15.2-c[1],50,0)});
/* lamps */
var lampBulbs=[];[-34,-20,-6,6,20,34].forEach(function(x){mesh(new THREE.CylinderGeometry(.1,.14,5,8),mDark,x,2.5,49);var b=mesh(new THREE.SphereGeometry(.38,12,10),new THREE.MeshBasicMaterial({color:0xfff0c0}),x,5.2,49,0);lampBulbs.push(b);var l=new THREE.PointLight(0xffd9a0,0,15,2);l.position.set(x,5,49);S.add(l);lampBulbs.push(l)});
/* trees */
var tc=[0x2f6b2a,0x3d7d2e,0x56893a,0x265a2a,0x6a9a3c],tn=300,fol=new THREE.InstancedMesh(new THREE.IcosahedronGeometry(1,2),M({roughness:1,flatShading:false}),tn*6),tk=new THREE.InstancedMesh(new THREE.CylinderGeometry(.35,.7,1,7),M({color:0x5a3d28,roughness:1}),tn),fi=0,ti=0;
function tree(x,z){var s=rnd(5,9);mx.compose(new THREE.Vector3(x,s*.3,z),q.identity(),new THREE.Vector3(1,s*.6,1));tk.setMatrixAt(ti++,mx);
 for(var i=0;i<6;i++){var r=s*rnd(.28,.4);mx.compose(new THREE.Vector3(x+rnd(-s*.3,s*.3),s*.62+rnd(0,s*.4),z+rnd(-s*.3,s*.3)),q.identity(),new THREE.Vector3(r*1.2,r,r*1.2));fol.setMatrixAt(fi,mx);fol.setColorAt(fi++,new THREE.Color(tc[Math.random()*5|0]).offsetHSL(0,0,rnd(-.04,.04)))}}
for(i=0;i<34;i++){var a=Math.random()*6.283,r=rnd(50,72),x=Math.cos(a)*r*1.25,z=Math.sin(a)*r*.95;if(z>36&&Math.abs(x)<50)continue;if(Math.abs(x)<48&&Math.abs(z)<37)continue;if(ti>=tn)break;tree(x,z)}
for(i=0;i<5&&ti<tn;i++)tree(rnd(-70,70),rnd(48,60)*(Math.random()<.5?1:1));
for(i=0;i<14&&ti<tn;i++){var a3=Math.random()*6.283,r3=rnd(80,150);tree(Math.cos(a3)*r3,Math.sin(a3)*r3)}
tk.count=ti;fol.count=fi;fol.castShadow=tk.castShadow=true;fol.receiveShadow=true;S.add(fol,tk);for(var _i=_o0;_i<S.children.length;_i++)S.children[_i].visible=false;
/* flower beds along inner paths */
var fl=new THREE.InstancedMesh(new THREE.SphereGeometry(.34,8,6),M({roughness:.8}),260),fc=[0xe84a8a,0xf5a623,0xffd23f,0x9b4de0,0xff6b5a,0xffffff];
for(i=0;i<260;i++){var side=i%2?1:-1,onZ=i%5==0,fx=onZ?rnd(-24,24):side*rnd(23.4,26.6),fz=onZ?(i%2?1:-1)*rnd(15.4,17.8):rnd(-15,15);mx.makeTranslation(fx,.55+rnd(0,.3),fz);fl.setMatrixAt(i,mx);fl.setColorAt(i,new THREE.Color(fc[i%6]))}S.add(fl);
/* Off-campus neighbourhood blocks intentionally omitted. The full school ground, lawn, paths, boundary, steps and landscaped campus above remain intact. */
/* Original flat cloud sprites removed; volumetric 3D clouds are added below. */
var clouds=[];

/* ================= IMMERSIVE 3D ENVIRONMENT ================= */
var liquidUniforms={uTime:{value:0},uPointer:{value:new THREE.Vector2(.5,.5)},uPointerPower:{value:0},uRipples:{value:Array.from({length:6},function(){return new THREE.Vector3(.5,.5,-1000);})},uMode:{value:0}};
var liquidGeo=new THREE.PlaneGeometry(1250,760,96,64);
var liquidMat=new THREE.ShaderMaterial({
 uniforms:liquidUniforms,transparent:true,depthWrite:false,side:THREE.DoubleSide,fog:false,
 vertexShader:'uniform float uTime; uniform vec2 uPointer; uniform float uPointerPower; uniform vec3 uRipples[6]; varying vec2 vUv; varying float vWave; void main(){vUv=uv;vec3 p=position;float a=sin(p.x*.010+uTime*.22)*cos(p.y*.015-uTime*.18);float b=sin((p.x+p.y)*.018-uTime*.13);float c=sin(p.x*.024-p.y*.012+uTime*.16);float mouse=exp(-distance(uv,uPointer)*18.0)*uPointerPower;float touchWave=0.0;for(int i=0;i<6;i++){float age=uTime-uRipples[i].z;if(age>=0.0&&age<2.7){float d=distance(uv,uRipples[i].xy);float radius=age*.22;touchWave+=sin((d-radius)*84.0)*exp(-abs(d-radius)*17.0)*exp(-age*1.35);}}p.z+=a*18.0+b*9.0+c*4.0+mouse*13.0+touchWave*5.2;p.x+=sin(p.y*.014+uTime*.12)*4.0+touchWave*1.1;p.y+=cos(p.x*.012-uTime*.10)*3.0;vWave=a*.55+b*.3+c*.15+touchWave*.16;gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.0);}',
 fragmentShader:'uniform float uTime; uniform float uMode; uniform vec3 uRipples[6]; varying vec2 vUv; varying float vWave; void main(){float ringGlow=0.0;float lensFlow=0.0;for(int i=0;i<6;i++){float age=uTime-uRipples[i].z;if(age>=0.0&&age<2.9){float d=distance(vUv,uRipples[i].xy);float radius=.018+age*.22;float ring=exp(-abs(d-radius)*82.0)*exp(-age*1.12);ringGlow+=ring;lensFlow+=sin(d*58.0-age*13.0)*exp(-d*8.0)*exp(-age*1.25);}}float flow=sin(vUv.x*27.0+sin(vUv.y*13.0+uTime*.18)*3.0+uTime*.24+lensFlow*.34);float bands=sin(vUv.y*42.0-vUv.x*11.0+uTime*.20+flow*1.8+lensFlow*.22);float ridge=smoothstep(.15,.95,flow*.52+bands*.24+vWave*.5);vec3 deep=vec3(.006,.025,.036);vec3 emerald=vec3(.012,.19,.155);vec3 jade=vec3(.025,.43,.34);vec3 gold=vec3(.72,.48,.22);vec3 c=mix(deep,emerald,smoothstep(-.45,.65,vWave+flow*.22));c=mix(c,jade,ridge*.48);float shimmer=pow(max(0.0,sin(vUv.x*44.0+vUv.y*19.0+uTime*.34+vWave*4.0)),16.0);c+=gold*shimmer*(.12+uMode*.05);c+=mix(jade,gold,.42)*clamp(ringGlow,0.0,1.0)*.62;float alpha=.38+ridge*.19+shimmer*.16+clamp(ringGlow,0.0,1.0)*.2;gl_FragColor=vec4(c,alpha);}'
});
var liquidSheet=new THREE.Mesh(liquidGeo,liquidMat);liquidSheet.position.set(0,78,-205);liquidSheet.renderOrder=-4;S.add(liquidSheet);

/* Flowing 3D glass-liquid ribbons framing the actual campus. */
var ribbonUniforms=[];function addLiquidRibbon(points,radius,phase){var curve=new THREE.CatmullRomCurve3(points.map(function(p){return new THREE.Vector3(p[0],p[1],p[2])}));var geo=new THREE.TubeGeometry(curve,220,radius,10,false);var u={uTime:{value:phase}};ribbonUniforms.push(u);var mat=new THREE.ShaderMaterial({uniforms:u,transparent:true,depthWrite:false,side:THREE.DoubleSide,vertexShader:'varying vec2 vUv; varying vec3 vN; void main(){vUv=uv;vN=normalize(normalMatrix*normal);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}',fragmentShader:'uniform float uTime; varying vec2 vUv; varying vec3 vN; void main(){float f=.5+.5*sin(vUv.x*21.0+uTime*.35+vUv.y*8.0);vec3 c=mix(vec3(.015,.32,.26),vec3(.68,.48,.24),pow(f,5.0));float rim=pow(1.0-abs(dot(normalize(vN),vec3(0.0,0.0,1.0))),2.0);gl_FragColor=vec4(c,.12+rim*.24+f*.07);}' });var obj=new THREE.Mesh(geo,mat);obj.renderOrder=-2;S.add(obj);return obj;}
var liquidRibbons=[
 addLiquidRibbon([[-210,8,-100],[-165,38,-118],[-190,92,-140],[-135,145,-165],[-220,190,-190]],2.5,0),
 addLiquidRibbon([[205,0,-90],[165,42,-120],[198,86,-150],[140,142,-180],[218,185,-210]],2.2,2.4),
 addLiquidRibbon([[-250,22,-220],[-180,65,-230],[-80,45,-240],[40,78,-250],[175,35,-260],[250,72,-270]],1.5,4.2)
];

/* Translucent 3D cloud volumes made from joined soft spheres (not flat cloud sprites). */
var cloudVolumes=[],cloudMat=new THREE.MeshPhysicalMaterial({color:0xe8f5f1,roughness:.92,metalness:0,transparent:true,opacity:.15,depthWrite:false,clearcoat:.2});
function makeCloud(x,y,z,scale,phase){var g=new THREE.Group();for(var k=0;k<8;k++){var puff=new THREE.Mesh(new THREE.SphereGeometry(1,14,10),cloudMat);var ang=(k/8)*Math.PI*2;var rr=(k%2?1.0:.72)*scale*.27;puff.position.set(Math.cos(ang)*rr,(k%3)*scale*.055,Math.sin(ang)*rr*.55);puff.scale.set(scale*(.24+(k%3)*.035),scale*(.12+(k%2)*.035),scale*(.16+(k%4)*.02));g.add(puff);}g.position.set(x,y,z);g.userData={phase:phase,baseY:y};S.add(g);cloudVolumes.push(g);return g;}
makeCloud(-180,74,-135,65,0);makeCloud(178,92,-160,72,1.2);makeCloud(-245,134,-245,92,2.4);makeCloud(255,146,-260,105,3.5);makeCloud(0,185,-340,130,4.4);makeCloud(300,62,-100,58,5.2);

/* True glass bubbles: transmissive spheres plus Fresnel edge shells. */
var bubbleGeometry=new THREE.SphereGeometry(1,28,20);
var bubbleGlass=new THREE.MeshPhysicalMaterial({color:0x9cebdd,metalness:.06,roughness:.045,transparent:true,opacity:.24,transmission:.72,thickness:1.15,ior:1.28,clearcoat:1,clearcoatRoughness:.04,depthWrite:false});
var bubbleRim=new THREE.ShaderMaterial({transparent:true,depthWrite:false,side:THREE.FrontSide,vertexShader:'varying vec3 vN;varying vec3 vV;void main(){vec4 mv=modelViewMatrix*vec4(position,1.0);vN=normalize(normalMatrix*normal);vV=normalize(-mv.xyz);gl_Position=projectionMatrix*mv;}',fragmentShader:'varying vec3 vN;varying vec3 vV;void main(){float f=pow(1.0-max(dot(normalize(vN),normalize(vV)),0.0),2.25);vec3 c=mix(vec3(.43,.92,.82),vec3(.98,.77,.47),smoothstep(.45,.95,f));gl_FragColor=vec4(c,.06+f*.65);}' });
var bubbles=[];for(var bi=0;bi<17;bi++){var rad=1.6+(bi%5)*.72;var group=new THREE.Group();var core=new THREE.Mesh(bubbleGeometry,bubbleGlass);core.scale.setScalar(rad);var rim=new THREE.Mesh(bubbleGeometry,bubbleRim);rim.scale.setScalar(rad*1.018);group.add(core,rim);var side=bi%2?1:-1;var x=side*(78+(bi%6)*19),y=13+(bi%7)*15,z=-35-(bi%5)*29;group.position.set(x,y,z);group.userData={baseY:y,phase:bi*.87,speed:.36+(bi%4)*.08,baseX:x};S.add(group);bubbles.push(group);}

/* Floating gold dust and tiny light motes in the 3D atmosphere. */
var moteCount=420,motePos=new Float32Array(moteCount*3),moteCol=new Float32Array(moteCount*3);for(var mi=0;mi<moteCount;mi++){motePos[mi*3]=(Math.random()-.5)*420;motePos[mi*3+1]=Math.random()*210-8;motePos[mi*3+2]=-190+Math.random()*270;var mc=Math.random();moteCol[mi*3]=.55+mc*.35;moteCol[mi*3+1]=.48+mc*.28;moteCol[mi*3+2]=.24+mc*.28;}var moteGeo=new THREE.BufferGeometry();moteGeo.setAttribute('position',new THREE.BufferAttribute(motePos,3));moteGeo.setAttribute('color',new THREE.BufferAttribute(moteCol,3));var motes=new THREE.Points(moteGeo,new THREE.PointsMaterial({size:1.15,vertexColors:true,transparent:true,opacity:.65,depthWrite:false,sizeAttenuation:true}));S.add(motes);
var pointerN=new THREE.Vector2(0,0),sceneElapsed=0,pointerHeld=false,lastPointerAt=0,rippleCursor=0,lastRippleAt=0,lastRippleX=-10,lastRippleY=-10;
function liquidUV(e){var rect=cv.getBoundingClientRect();return {x:Math.max(0,Math.min(1,(e.clientX-rect.left)/Math.max(1,rect.width))),y:1-Math.max(0,Math.min(1,(e.clientY-rect.top)/Math.max(1,rect.height)))};}
function moveLiquidPointer(e){var p=liquidUV(e);pointerN.set(p.x*2-1,p.y*2-1);liquidUniforms.uPointer.value.set(p.x,p.y);lastPointerAt=performance.now();return p;}
function emitLiquidRipple(p){liquidUniforms.uRipples.value[rippleCursor].set(p.x,p.y,sceneElapsed);rippleCursor=(rippleCursor+1)%liquidUniforms.uRipples.value.length;lastRippleAt=performance.now();lastRippleX=p.x;lastRippleY=p.y;}
cv.addEventListener('pointerdown',function(e){pointerHeld=true;var p=moveLiquidPointer(e);emitLiquidRipple(p);},{passive:true});
cv.addEventListener('pointermove',function(e){var p=moveLiquidPointer(e);if(pointerHeld){var dx=p.x-lastRippleX,dy=p.y-lastRippleY,dist=Math.sqrt(dx*dx+dy*dy);if(dist>.035||performance.now()-lastRippleAt>95)emitLiquidRipple(p);}},{passive:true});
window.addEventListener('pointerup',function(e){if(!pointerHeld)return;var rect=cv.getBoundingClientRect();if(e.clientX>=rect.left&&e.clientX<=rect.right&&e.clientY>=rect.top&&e.clientY<=rect.bottom)emitLiquidRipple(liquidUV(e));pointerHeld=false;lastPointerAt=performance.now();},{passive:true});
window.addEventListener('pointercancel',function(){pointerHeld=false;lastPointerAt=performance.now();},{passive:true});
cv.addEventListener('pointerleave',function(){if(!pointerHeld)lastPointerAt=0;},{passive:true});
/* ================= END IMMERSIVE 3D ENVIRONMENT ================= */

/* lighting + themes */
var hemi=new THREE.HemisphereLight(0xdbe9ff,0x6a8a40,.5),sun=new THREE.DirectionalLight(0xfff1d6,1.3);sun.castShadow=true;sun.shadow.mapSize.set(mob?1024:4096,mob?1024:4096);var sc=sun.shadow.camera;sc.left=-88;sc.right=88;sc.top=88;sc.bottom=-88;sc.far=700;sun.shadow.bias=-.0003;sun.shadow.normalBias=.4;S.add(hemi,sun,sun.target);
var TH=[{top:'#4a86c8',hor:'#d3e3ef',sun:'#fff2d8',sp:[110,150,90],si:1.05,hi:.55,ex:1,fog:.0011,st:0,cl:1,night:false},{top:'#33518f',hor:'#f6a870',sun:'#ff9e5c',sp:[190,48,80],si:1.0,hi:.45,ex:1,fog:.0017,st:0,cl:.9,night:false},{top:'#04071d',hor:'#1a2756',sun:'#9db4ff',sp:[-90,130,60],si:.12,hi:.2,ex:1,fog:.0021,st:1,cl:.12,night:true}];
function theme(i){var t=TH[i];skyU.top.value.set(t.top);skyU.hor.value.set(t.hor);skyU.sunCol.value.set(t.sun);skyU.sunDir.value.set(t.sp[0],t.sp[1],t.sp[2]).normalize();skyU.stars.value=t.st;
 sun.color.set(t.sun);sun.intensity=t.si;sun.position.set(t.sp[0],t.sp[1],t.sp[2]);hemi.intensity=t.hi;R.toneMappingExposure=t.ex;S.fog=new THREE.FogExp2(new THREE.Color(t.hor).lerp(new THREE.Color(t.top),.15).getHex(),t.fog);
setLit(t.night);lampBulbs.forEach(function(b){if(b.isPointLight)b.intensity=t.night?6:0});clouds.forEach(function(c){c.material.opacity=.8*t.cl;c.material.color.set(i==1?0xffc9a0:0xffffff)});cloudMat.opacity=t.night?.11:.15;liquidUniforms.uMode.value=i;bubbleGlass.opacity=t.night?.3:.22;}
theme(2);
/* Cinematic camera presets, guided tour and adaptive render loop. */
var V=mob?[
 {p:[0,28,128],t:[0,9,6]},
 {p:[68,72,118],t:[0,4,0]},
 {p:[0,38,54],t:[0,0,-8]},
 {p:[0,170,8],t:[0,0,0]}
]:[
 {p:[-12,24,84],t:[-12,9,5]},
 {p:[64,62,100],t:[0,4,0]},
 {p:[0,34,55],t:[0,0,-10]},
 {p:[0,150,8],t:[0,0,0]}
],goal=null,rot=document.getElementById('rot');
function go(i){goal=V[i];O.autoRotate=false;rot.classList.remove('on')}
document.querySelectorAll('[data-v]').forEach(function(b){b.onclick=function(){document.querySelectorAll('[data-v]').forEach(function(x){x.classList.toggle('on',x==b)});go(+b.dataset.v)}});
document.querySelectorAll('[data-t]').forEach(function(b){b.onclick=function(){document.querySelectorAll('[data-t]').forEach(function(x){x.classList.toggle('on',x==b)});theme(+b.dataset.t)}});
rot.onclick=function(){O.autoRotate=!O.autoRotate;rot.classList.toggle('on',O.autoRotate);goal=null};
cv.addEventListener('pointerdown',function(){goal=null});
var tourBtn=document.getElementById('tourBtn'),tourTimers=[];
function stopTour(){tourTimers.forEach(clearTimeout);tourTimers=[];if(tourBtn)tourBtn.classList.remove('on');}
if(tourBtn){tourBtn.onclick=function(){stopTour();O.autoRotate=false;rot.classList.remove('on');tourBtn.classList.add('on');[0,1,2,3].forEach(function(v,k){tourTimers.push(setTimeout(function(){go(v);document.querySelectorAll('[data-v]').forEach(function(b){b.classList.toggle('on',+b.dataset.v===v)});},k*4200));});tourTimers.push(setTimeout(function(){stopTour();O.autoRotate=true;rot.classList.add('on');},17700));};}
var resetBtn=document.getElementById('resetView');if(resetBtn)resetBtn.onclick=function(){stopTour();go(1);document.querySelectorAll('[data-v]').forEach(function(b){b.classList.toggle('on',b.dataset.v==='1')});};
var fullBtn=document.getElementById('fullView');if(fullBtn)fullBtn.onclick=function(){if(stage.requestFullscreen)stage.requestFullscreen();else if(stage.webkitRequestFullscreen)stage.webkitRequestFullscreen();};
var startPos=new THREE.Vector3(mob?0:190,mob?130:120,mob?290:260),endPos=new THREE.Vector3(V[1].p[0],V[1].p[1],V[1].p[2]);C.position.copy(startPos);var startTarget=new THREE.Vector3(0,30,0),endTarget=new THREE.Vector3(V[1].t[0],V[1].t[1],V[1].t[2]);O.target.copy(startTarget);var tp=new THREE.Vector3(),tt=new THREE.Vector3(),t0=performance.now(),intro=true,clock=new THREE.Clock();
var pr=R.getPixelRatio(),gf=0,ga=0;var stageVisible=true;if(window.IntersectionObserver){var io=new IntersectionObserver(function(entries){stageVisible=entries[0].isIntersecting;});io.observe(stage);}
function renderFrame(){requestAnimationFrame(renderFrame);var delta=Math.min(clock.getDelta(),.04),now=performance.now(),elapsed=clock.elapsedTime;
 sceneElapsed=elapsed;if(liquidUniforms.uTime)liquidUniforms.uTime.value=elapsed;var pointerAge=(performance.now()-lastPointerAt)/1000,power=pointerHeld?1.0:Math.max(0,1.0-pointerAge/1.05);liquidUniforms.uPointerPower.value+=(power-liquidUniforms.uPointerPower.value)*Math.min(1,delta*7.5);
 ribbonUniforms.forEach(function(u){u.uTime.value=elapsed;});
 bubbles.forEach(function(b){var d=b.userData;b.position.y=d.baseY+Math.sin(elapsed*d.speed+d.phase)*2.4;b.position.x=d.baseX+Math.sin(elapsed*.22+d.phase)*1.3;b.rotation.y+=delta*.16;b.rotation.x=Math.sin(elapsed*.25+d.phase)*.08;});
 cloudVolumes.forEach(function(c){var d=c.userData;c.position.x+=delta*(1.2+Math.sin(d.phase)*.25);c.position.y=d.baseY+Math.sin(elapsed*.22+d.phase)*2.5;if(c.position.x>330)c.position.x=-330;c.rotation.y=Math.sin(elapsed*.13+d.phase)*.06;});
 motes.rotation.y=elapsed*.008;motes.position.y=Math.sin(elapsed*.15)*1.4;
 if(intro){var k=Math.min((now-t0)/3200,1),e=1-Math.pow(1-k,3);C.position.lerpVectors(startPos,endPos,e);O.target.lerpVectors(startTarget,endTarget,e);if(k>=1){intro=false;}}
 else if(goal){tp.set(goal.p[0],goal.p[1],goal.p[2]);tt.set(goal.t[0],goal.t[1],goal.t[2]);C.position.lerp(tp,.055);O.target.lerp(tt,.055);if(C.position.distanceTo(tp)<.55){goal=null;}}
 clouds.forEach(function(c){c.position.x+=.025;if(c.position.x>1000)c.position.x=-1000;});
 O.update();if(stageVisible&&document.visibilityState!=='hidden'){R.render(S,C);if(!intro){gf++;ga+=delta;if(gf>=60){if(ga/gf>.031&&pr>1){pr=Math.max(1,pr-.25);R.setPixelRatio(pr);rs()}gf=0;ga=0}}}
}
renderFrame();
var loaderStatus=document.getElementById('loaderStatus'),loaderBar=document.getElementById('loaderBar'),loaderPct=document.getElementById('loaderPct');
if(loaderStatus)loaderStatus.textContent='Campus model assembled';if(loaderBar)loaderBar.style.width='82%';if(loaderPct)loaderPct.textContent='82%';
setTimeout(function(){if(loaderStatus)loaderStatus.textContent='Lighting the campus';if(loaderBar)loaderBar.style.width='94%';if(loaderPct)loaderPct.textContent='94%';},380);
setTimeout(function(){finishLoader('Campus ready');},1550);
})();


}catch(e){console.error(e)}
try{

(function(){
 const $=s=>document.querySelector(s), $$=s=>Array.from(document.querySelectorAll(s));
 const menu=$('#menuBtn'),nav=$('#nav');menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',open?'true':'false');menu.textContent=open?'×':'☰';});
 $$('#nav a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.textContent='☰';}));
 $('#year').textContent=new Date().getFullYear();
 const progress=$('#progress'),header=$('#header'),topBtn=$('#backTop');
 function onScroll(){const max=document.documentElement.scrollHeight-innerHeight;progress.style.width=(max>0?scrollY/max*100:0)+'%';header.classList.toggle('scrolled',scrollY>35);topBtn.classList.toggle('show',scrollY>650);}addEventListener('scroll',onScroll,{passive:true});onScroll();topBtn.addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}));
 if('IntersectionObserver'in window){const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target);}}),{threshold:.13});$$('.reveal').forEach(el=>io.observe(el));}else $$('.reveal').forEach(el=>el.classList.add('visible'));
 // restrained 3D tilt on value cards; disabled for touch and reduced motion.
 const fine=matchMedia('(pointer:fine)').matches&&!matchMedia('(prefers-reduced-motion: reduce)').matches;
 if(fine){$$('.value-card').forEach(card=>{card.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;card.style.transform=`perspective(900px) rotateX(${(0.5-y)*5}deg) rotateY(${(x-.5)*6}deg) translateY(-3px)`;card.style.setProperty('--mx',x*100+'%');card.style.setProperty('--my',y*100+'%');});card.addEventListener('pointerleave',()=>{card.style.transform='';});});}
 addEventListener('pointermove',e=>{document.documentElement.style.setProperty('--mx',e.clientX+'px');document.documentElement.style.setProperty('--my',e.clientY+'px');},{passive:true});
 // loading percentage starts immediately; the 3D scene signals final readiness.
 let p=5;const bar=$('#loaderBar'),pct=$('#loaderPct'),status=$('#loaderStatus');const t=setInterval(()=>{if(p<65){p+=Math.max(2,Math.round((65-p)*.18));bar.style.width=p+'%';pct.textContent=String(p).padStart(2,'0')+'%';}},130);
 window.addEventListener('error',()=>{const fb=$('#webglFallback');if(fb)fb.classList.add('show');if(status)status.textContent='Campus photograph ready';bar.style.width='100%';pct.textContent='100%';setTimeout(()=>$('#ld').classList.add('h'),900);},{once:true});
 setTimeout(()=>{clearInterval(t);if(!$('#ld').classList.contains('h')){bar.style.width='100%';pct.textContent='100%';if(status)status.textContent='Campus ready';setTimeout(()=>$('#ld').classList.add('h'),900);}},6500);
})();

}catch(e){console.error(e)}
try{

(function(){
var rm=matchMedia('(prefers-reduced-motion: reduce)').matches,mob=innerWidth<800,ld=document.getElementById('ld');
if(ld){var q=document.createElement('div');q.className='lq';q.innerHTML='<i></i><i></i>';ld.insertBefore(q,ld.firstChild)}
/* 3 switchable 3D liquid shaders + bubbles + clouds */
var c=document.createElement('canvas');c.id='liq';c.setAttribute('aria-hidden','true');document.body.appendChild(c);
var lo=(navigator.hardwareConcurrency||4)<=4,at=document.createElement('div'),hh='<i class="cl a"></i><i class="cl b"></i><i class="cl c"></i>';at.id='atm';at.setAttribute('aria-hidden','true');
if(!rm)for(var i=0;i<(mob||lo?9:16);i++){var z=8+Math.random()*34|0;hh+='<u class="bb" style="left:'+(Math.random()*100|0)+'%;width:'+z+'px;height:'+z+'px;animation-duration:'+(14+Math.random()*18|0)+'s;animation-delay:-'+(Math.random()*30|0)+'s"></u>'}
at.innerHTML=hh;document.body.appendChild(at);
var K=0;
var g=c.getContext('webgl',{alpha:!1,antialias:!1,powerPreference:'low-power',depth:!1,stencil:!1});
if(g){
var vs='attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}',fs='#define OCT '+((mob||lo)?3:4)+'\n#ifdef GL_FRAGMENT_PRECISION_HIGH\nprecision highp float;\n#else\nprecision mediump float;\n#endif\nuniform vec2 r,m;uniform float t,s,b,k;\nfloat h(vec2 p){float a=0.,w=.5;for(int i=0;i<OCT;i++){a+=w*sin(p.x+sin(p.y*1.3+t*.4))*cos(p.y-sin(p.x*.8-t*.3));p=mat2(1.6,1.2,-1.2,1.6)*p;w*=.5;}return a;}\nfloat hs(vec2 p){return fract(sin(dot(p,vec2(12.9898,78.233)))*43758.5453);}\nvoid main(){vec2 u0=(gl_FragCoord.xy-.5*r)/r.y,u=u0+vec2(0.,s*.35),mp=(m-.5)*vec2(r.x/r.y,1.);float d=length(u0-mp);vec2 q=u*2.6+(.35*exp(-d*3.)+b*.6*exp(-d*2.))*vec2(sin(t*3.-d*14.),cos(t*3.-d*14.));vec3 c;\nif(k<.5){vec2 a=q*.8;float H=h(a),e=.02;vec3 n=normalize(vec3(h(a+vec2(e,0.))-H,h(a+vec2(0.,e))-H,.035));vec3 L=normalize(vec3(-.5,.6,.7));float df=dot(n,L)*.5+.5,sp=pow(max(dot(reflect(-L,n),vec3(0.,0.,1.)),0.),36.);c=mix(vec3(.01,.05,.05),vec3(.05,.5,.44),df*df)+vec3(.9,.92,.3)*sp*1.3+vec3(0.,.25,.2)*pow(1.-n.z,2.);}\ngl_FragColor=vec4(c*(1.-.45*dot(u0,u0))+(hs(gl_FragCoord.xy+t)-.5)/200.,1.);}';
function sh(t,s){var o=g.createShader(t);g.shaderSource(o,s);g.compileShader(o);return o}
var pr=g.createProgram();g.attachShader(pr,sh(g.VERTEX_SHADER,vs));g.attachShader(pr,sh(g.FRAGMENT_SHADER,fs));g.linkProgram(pr);
if(g.getProgramParameter(pr,g.LINK_STATUS)){
g.useProgram(pr);var bf=g.createBuffer();g.bindBuffer(g.ARRAY_BUFFER,bf);g.bufferData(g.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),g.STATIC_DRAW);var l=g.getAttribLocation(pr,'p');g.enableVertexAttribArray(l);g.vertexAttribPointer(l,2,g.FLOAT,!1,0,0);
var U={};['r','m','t','s','b','k'].forEach(function(k){U[k]=g.getUniformLocation(pr,k)});
var sc=mob?.55:.85,SCMIN=.4,fpsGap=mob?28:14,mx=.5,my=.5,tx=.5,ty=.5,pl=0,run=!1,lt=0,slow=0,t0=performance.now();
function rz(){c.width=Math.max(2,innerWidth*sc|0);c.height=Math.max(2,innerHeight*sc|0);g.viewport(0,0,c.width,c.height)}rz();
function kick(){if(!run&&!document.hidden){run=!0;lt=0;requestAnimationFrame(f)}}
addEventListener('resize',function(){rz();kick()});
function mvp(e){tx=e.clientX/innerWidth;ty=1-e.clientY/innerHeight}
var hero=document.getElementById('home'),hv=hero?scrollY<=hero.offsetHeight-innerHeight:!1;var lsy=scrollY;function chk(){var dy=Math.abs(scrollY-lsy);lsy=scrollY;pl=Math.min(1.2,pl+dy*.0014);hv=hero?scrollY<=hero.offsetHeight-innerHeight:!1;if(!hv)kick()}addEventListener('scroll',chk,{passive:!0});addEventListener('resize',chk);addEventListener('pointermove',mvp,{passive:!0});addEventListener('pointerdown',function(e){mvp(e);pl=1.4;kick()},{passive:!0});
document.addEventListener('visibilitychange',function(){if(document.hidden)run=!1;else kick()});
function f(n){if(!run)return;if(hv&&!LD){run=!1;return}requestAnimationFrame(f);var dt=n-lt;if(dt<fpsGap)return;
if(lt&&dt>(mob?45:24)){if(++slow>12){slow=0;if(sc>SCMIN){sc=Math.max(SCMIN,sc*.85);rz()}else fpsGap=Math.min(40,fpsGap+8)}}else if(slow>0)slow--;lt=n;mx+=(tx-mx)*.06;my+=(ty-my)*.06;pl*=.94;
g.uniform2f(U.r,c.width,c.height);g.uniform2f(U.m,mx,my);g.uniform1f(U.t,(n-t0)/1000);g.uniform1f(U.s,scrollY/innerHeight);g.uniform1f(U.b,pl);g.uniform1f(U.k,LD?0:K);g.drawArrays(g.TRIANGLES,0,3);if(rm)run=!1}
var LD=!1;

kick();

}else{c.remove()}}else c.remove();
/* click bubbles */
if(!rm)addEventListener('pointerdown',function(e){if(e.target.id=='c')return;for(var i=0;i<5;i++){var d=document.createElement('u'),z=6+Math.random()*12|0;d.className='pb';d.style.cssText='left:'+e.clientX+'px;top:'+e.clientY+'px;width:'+z+'px;height:'+z+'px;--dx:'+((Math.random()-.5)*130|0)+'px;--dy:-'+(50+Math.random()*80|0)+'px';document.body.appendChild(d);setTimeout(function(x){x.remove()},1300,d)}},{passive:!0});
/* cursor glow + 3D tilt (fine pointers only) */
if(matchMedia('(pointer:fine)').matches&&!rm){
var cu=document.createElement('div');cu.id='cur';document.body.appendChild(cu);var cx=0,cy=0,px=0,py=0,on=!1;
addEventListener('pointermove',function(e){cx=e.clientX;cy=e.clientY;if(!on){on=!0;requestAnimationFrame(mv)}},{passive:!0});
function mv(){px+=(cx-px)*.15;py+=(cy-py)*.15;cu.style.transform='translate3d('+px+'px,'+py+'px,0)';if(Math.abs(cx-px)+Math.abs(cy-py)>.5)requestAnimationFrame(mv);else on=!1}
document.querySelectorAll('.tilt,.btn,.value-card,.card,.fac,[class*=card]').forEach(function(el){
var mg=el.classList.contains('btn');
el.addEventListener('pointermove',function(e){var r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
el.style.transform=mg?'translate('+x*8+'px,'+y*6+'px)':'perspective(800px) rotateY('+x*7+'deg) rotateX('+-y*7+'deg) translateZ(0)'});
el.addEventListener('pointerleave',function(){el.style.transform=''})})}
/* map tools */
var mf=document.getElementById('mapFrame'),mb=document.getElementById('mapMode'),sat=!1,Q='St.%20Mary%27s%20Convent%20School%2C%20Tadvanva%2C%20Ghazipur%2C%20Uttar%20Pradesh%20233001';
if(mb)mb.onclick=function(){sat=!sat;mf.src='https://www.google.com/maps?q='+Q+'&output=embed'+(sat?'&t=k':'');mb.textContent=sat?'Map view':'Satellite view'};
var cp=document.getElementById('copyAddr');if(cp)cp.onclick=function(){var a="St. Mary's Convent School, Tadvanva, Ghazipur, Uttar Pradesh 233001";(navigator.clipboard?navigator.clipboard.writeText(a):Promise.reject()).then(function(){cp.textContent='Copied ✓'},function(){cp.textContent='Press & hold to copy'});setTimeout(function(){cp.textContent='Copy address'},2200)};
var io=window.IntersectionObserver&&new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}})},{threshold:.1});
document.querySelectorAll('.xplore .section-kicker,.xplore .section-title,.xplore .lead,.xc,.xm').forEach(function(e){e.classList.add('reveal');io?io.observe(e):e.classList.add('visible')});
})();

}catch(e){console.error(e)}
try{(function(){
var $$=function(s){return Array.prototype.slice.call(document.querySelectorAll(s))},reduce=matchMedia('(prefers-reduced-motion: reduce)').matches,fine=matchMedia('(hover: hover) and (pointer: fine)').matches;
function cnt(el){var t=el.textContent.trim(),m=t.match(/^(\d+)(\D*)$/);if(!m||t.charAt(0)==='0'||+m[1]>999)return;var to=+m[1],suf=m[2],t0=performance.now();(function f(n){var k=Math.min(1,(n-t0)/1500);el.textContent=Math.round(to*(1-Math.pow(1-k,3)))+(k>=1?suf:'');if(k<1)requestAnimationFrame(f)})(t0)}
function once(sel,fn,th){if(!('IntersectionObserver' in window)||reduce)return;var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){fn(e.target);io.unobserve(e.target)}})},{threshold:th||.5});$$(sel).forEach(function(e){io.observe(e)})}
once('.hero-stat b,.facility-card .num',cnt,.6);
once('.section-title',function(e){e.classList.add('fx-run')},.25);
$$('.facility-card,.value-card,.update-card,.contact-card').forEach(function(c){if(getComputedStyle(c).position==='static')c.style.position='relative';c.appendChild(Object.assign(document.createElement('i'),{className:'fx-spot'}))});
document.addEventListener('pointerdown',function(e){var b=e.target.closest&&e.target.closest('.btn');if(!b||reduce)return;var r=b.getBoundingClientRect(),s=document.createElement('span');s.className='fx-rip';s.style.left=(e.clientX-r.left)+'px';s.style.top=(e.clientY-r.top)+'px';b.appendChild(s);setTimeout(function(){s.remove()},750)},{passive:true});
if(fine&&!reduce){
  document.addEventListener('pointermove',function(e){var c=e.target.closest&&e.target.closest('.facility-card,.value-card,.update-card,.contact-card');if(c){var r=c.getBoundingClientRect();c.style.setProperty('--mx',(e.clientX-r.left)+'px');c.style.setProperty('--my',(e.clientY-r.top)+'px')}},{passive:true});
  var ring=document.createElement('div'),dot=document.createElement('div');ring.className='fx-ring';dot.className='fx-dot';document.body.appendChild(ring);document.body.appendChild(dot);
  var x=0,y=0,rx=0,ry=0,on=false;addEventListener('pointermove',function(e){if(e.pointerType!=='mouse')return;x=e.clientX;y=e.clientY;if(!on){on=true;rx=x;ry=y;ring.classList.add('on');dot.classList.add('on')}dot.style.transform='translate3d('+x+'px,'+y+'px,0)'},{passive:true});
  document.addEventListener('pointerover',function(e){ring.classList.toggle('big',!!(e.target.closest&&e.target.closest('a,button,.btn')))});
  (function lp(){if(on&&!document.hidden){rx+=(x-rx)*.18;ry+=(y-ry)*.18;ring.style.transform='translate3d('+rx.toFixed(1)+'px,'+ry.toFixed(1)+'px,0)'}requestAnimationFrame(lp)})();
  $$('.btn').forEach(function(b){b.addEventListener('pointermove',function(e){var r=b.getBoundingClientRect();b.style.transform='translate('+((e.clientX-r.left-r.width/2)*.14).toFixed(1)+'px,'+((e.clientY-r.top-r.height/2)*.22).toFixed(1)+'px)'},{passive:true});b.addEventListener('pointerleave',function(){b.style.transform=''})})}
})()}catch(e){console.error(e)}

try{(function(){
var $=function(s,r){return (r||document).querySelector(s)},$$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))},reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
var tt=document.createElement('div');tt.className='ix-toast';tt.setAttribute('role','status');document.body.appendChild(tt);var tT=0;function toast(m){tt.textContent=m;tt.classList.add('show');clearTimeout(tT);tT=setTimeout(function(){tt.classList.remove('show')},1800)}
/* side dots: jump between sections */
var ids=[];$$('.nav a[href^="#"],header a[href^="#"]').forEach(function(a){var id=a.getAttribute('href').slice(1);if(id&&document.getElementById(id)&&ids.indexOf(id)<0&&id!=='home')ids.push(id)});
if(ids.length){var dn=document.createElement('nav');dn.className='ix-dots';dn.setAttribute('aria-label','Sections');ids.unshift('home');ids=ids.filter(function(id){return document.getElementById(id)});
  ids.forEach(function(id){var a=document.createElement('a');a.href='#'+id;a.setAttribute('aria-label',id);a.innerHTML='<span>'+id.replace(/-/g,' ')+'</span>';dn.appendChild(a)});document.body.appendChild(dn);
  if('IntersectionObserver' in window){var so=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting)$$('a',dn).forEach(function(a){a.classList.toggle('on',a.getAttribute('href')==='#'+e.target.id)})})},{rootMargin:'-45% 0px -50% 0px'});ids.forEach(function(id){so.observe(document.getElementById(id))})}}
/* Ask St. Mary's: answers from the school's own web page content (grounded), with an optional free AI upgrade */
var AI_ENDPOINT='https://stmarys-helper.camelgoga451.workers.dev/';   /* optional: paste your Cloudflare Worker URL here to add AI-written answers (see ai-worker.js) */
var SCH={tel:'+91 94504 82895 / 0548-2222612',mail:'stmaryconventschoolgzp@gmail.com',addr:'Tadvanva, Ghazipur, Uttar Pradesh 233001',yt:'https://youtube.com/@st.marysconventschoolghazi4649?si=TslvxI4Q3ZIZOz5B'};
var st=document.createElement('style');st.id='ix-css';st.textContent=".ix-fab{position:fixed;right:18px;bottom:92px;z-index:800;width:54px;height:54px;border-radius:50%;display:grid;place-items:center;background:linear-gradient(135deg,#e2c995,#b8923f);color:#10201e;border:0;cursor:pointer;box-shadow:0 12px 28px -8px rgba(0,0,0,.6);transition:transform .25s}.ix-fab:hover{transform:translateY(-3px) scale(1.04)}.ix-fab svg{width:26px;height:26px}\n.ix-panel{position:fixed;right:18px;bottom:158px;z-index:801;width:min(380px,calc(100vw - 28px));max-height:min(560px,calc(100svh - 190px));display:flex;flex-direction:column;border-radius:22px;background:rgba(9,24,28,.98);border:1px solid rgba(226,201,149,.35);box-shadow:0 30px 70px -20px rgba(0,0,0,.8);color:#e8efe9;opacity:0;visibility:hidden;transform:translateY(14px) scale(.98);transform-origin:100% 100%;transition:opacity .3s,transform .35s cubic-bezier(.2,.8,.2,1),visibility 0s .35s;overflow:hidden}.ix-panel.open{opacity:1;visibility:visible;transform:none;transition:opacity .3s,transform .35s cubic-bezier(.2,.8,.2,1)}\n.ix-h{padding:14px 18px;border-bottom:1px solid rgba(255,255,255,.1)}.ix-h b{display:block;font:700 17px 'Playfair Display',Georgia,serif;color:#e2c995}.ix-h span{font-size:12px;opacity:.7}\n.ix-m{flex:1;min-height:0;overflow-y:auto;padding:14px;display:grid;gap:8px;align-content:start}.ix-b{max-width:90%;padding:9px 13px;border-radius:16px 16px 16px 4px;background:rgba(255,255,255,.08);font-size:14px;line-height:1.5;white-space:pre-wrap}.ix-b.me{justify-self:end;border-radius:16px 16px 4px 16px;background:rgba(226,201,149,.18)}.ix-b a{display:inline-block;margin-top:6px;color:#e2c995;font-weight:700;text-decoration:none;cursor:pointer}\n.ix-b.ty{display:flex;gap:5px;padding:12px 14px}.ix-b.ty i{width:7px;height:7px;border-radius:50%;background:#e2c995;opacity:.5;animation:ixd 1s infinite ease-in-out}.ix-b.ty i:nth-child(2){animation-delay:.15s}.ix-b.ty i:nth-child(3){animation-delay:.3s}@keyframes ixd{0%,80%,100%{transform:translateY(0);opacity:.4}40%{transform:translateY(-5px);opacity:1}}\n.ix-q{display:flex;flex-wrap:wrap;gap:6px;padding:0 14px 10px}.ix-q button{padding:6px 12px;border-radius:99px;border:1px solid rgba(226,201,149,.4);background:none;color:#e2c995;font-size:12px;cursor:pointer}\n.ix-f{display:flex;gap:8px;padding:10px 12px;border-top:1px solid rgba(255,255,255,.1)}.ix-f input{flex:1;min-width:0;padding:10px 14px;border-radius:99px;border:1px solid rgba(255,255,255,.18);background:rgba(255,255,255,.06);color:#fff;font-size:15px;outline:0}.ix-f input:focus{border-color:#e2c995}.ix-f button{width:42px;border-radius:50%;border:0;background:#e2c995;color:#10201e;cursor:pointer;font-size:15px}\n.ix-n{padding:0 16px 10px;font-size:10px;opacity:.55}.ix-n2{margin-top:6px;font-size:10px;opacity:.6;line-height:1.4}\n@media (max-width:560px){.ix-fab{bottom:88px;right:14px;width:50px;height:50px}.ix-panel{right:10px;bottom:148px}}@media (prefers-reduced-motion:reduce){.ix-panel,.ix-fab{transition:none}}";document.head.appendChild(st);
var STOP={a:1,an:1,the:1,is:1,are:1,was:1,were:1,do:1,does:1,did:1,of:1,to:1,in:1,on:1,for:1,and:1,or:1,i:1,me:1,my:1,you:1,your:1,it:1,this:1,that:1,what:1,which:1,who:1,whom:1,how:1,can:1,could:1,will:1,would:1,should:1,there:1,have:1,has:1,had:1,be:1,about:1,tell:1,please:1,at:1,by:1,with:1,from:1,any:1,get:1,know:1,want:1,need:1,school:1,st:1,mary:1,marys:1,convent:1,ghazipur:1,give:1,show:1,when:1,where:1,why:1,many:1,much:1,long:1,name:1,come:1};
var SYN={fees:'fee',facilities:'facility',transportation:'transport',start:'establish',began:'establish',beginning:'establish',timing:'time',timings:'time',hours:'time',apply:'admission',admit:'admission',admitted:'admission',enrol:'admission',enroll:'admission',enrolment:'admission',join:'admission',teacher:'staff',teachers:'staff',faculty:'staff',headmaster:'principal',head:'principal',laboratory:'lab',laboratories:'lab',labs:'lab',coed:'coeducation','co-education':'coeducation',result:'topper',results:'topper',toppers:'topper',rank:'topper',ranks:'topper',marks:'topper',percentage:'topper',topped:'topper',topper:'topper',started:'establish',founded:'establish',established:'establish',history:'establish',begin:'establish',cricket:'sport',football:'sport',games:'sport',sports:'sport',playground:'sport',grounds:'sport',bus:'transport',buses:'transport',medium:'language',english:'language',hindi:'language',phone:'contact',call:'contact',number:'contact',email:'contact',mail:'contact',reach:'contact',address:'contact',location:'contact',map:'contact',directions:'contact',donation:'donate',donations:'donate',recommendation:'recommend',uniform:'dress',dress:'dress',library:'library',books:'library',computer:'computer',computers:'computer',app:'ecare',mobile:'ecare',ecare:'ecare','e-care':'ecare',leave:'leave',vision:'objective',mission:'objective',aim:'objective',values:'objective',motto:'objective'};
function stem(w){w=SYN[w]||w;if(w.length>4)w=w.replace(/ies$/,'y');if(w.length>5)w=w.replace(/(ing|ed|es|e|s)$/,'');else if(w.length>3)w=w.replace(/s$/,'');return SYN[w]||w}
function toks(s){s=s.replace(/\b([a-z])\.([a-z])\.([a-z])\.?/gi,'$1$2$3').replace(/\b([a-z])\.([a-z])\.?(?=\s|$)/gi,'$1$2');return s.toLowerCase().replace(/[^a-z0-9\s-]/g,' ').split(/\s+/).filter(function(w){return w&&!STOP[w]}).map(stem)}
function lev(a,b){if(Math.abs(a.length-b.length)>1)return 9;var m=[],i,j;for(i=0;i<=a.length;i++)m[i]=[i];for(j=0;j<=b.length;j++)m[0][j]=j;for(i=1;i<=a.length;i++)for(j=1;j<=b.length;j++)m[i][j]=Math.min(m[i-1][j]+1,m[i][j-1]+1,m[i-1][j-1]+(a[i-1]===b[j-1]?0:1));return m[a.length][b.length]}
/* knowledge base built from the page itself, so it always matches the website */
var KB=[],DF={},VOC={},AVG=1,SECN={story:'Our Story',values:'Our Values',campus:'Campus',facilities:'Facilities',admissions:'Admissions',updates:'School information',principal:'Principal’s message',contact:'Contact',explore:'School Handbook',home:'Home'},HUBN={about:'About & history',academics:'Academics & admission procedure',campus:'Campus & facilities',rules:'Rules',toppers:'Toppers',notices:'Notices & app'};
function build(){var sels='h2,h3,h4,p,li,blockquote,figcaption,.tops,.tc,.contact-line,.story-fact,.hero-stat,.value-card,.facility-card';
  ['home','story','values','campus','facilities','admissions','updates','principal','contact','explore'].forEach(function(id){var root=document.getElementById(id);if(!root)return;var h='';
    Array.prototype.forEach.call(root.querySelectorAll(sels),function(el){if(el.closest('.ix-panel,#lb,.xo,nav,.scene-dock,.hero-bottom,.marquee,.fx-band'))return;var tag=el.tagName;
      if(/^H[234]$/.test(tag)){h=el.textContent.replace(/([a-z.!?])([A-Z])/g,'$1 $2').replace(/\s+/g,' ').trim();return}
      if(el.classList.contains('tc')&&el.closest('.tops'))return;
      var t;if(el.classList.contains('tops')){var yr='';var pv=el.previousElementSibling;if(pv&&/^H4$/.test(pv.tagName))yr=pv.textContent.trim();t='Class X toppers '+yr+': '+Array.prototype.map.call(el.querySelectorAll('.tc'),function(c){return c.children[0].textContent+'. '+c.children[1].textContent+' ('+c.children[2].textContent+')'}).join('; ')}
      else if(el.classList.contains('facility-card')||el.classList.contains('value-card')){var hh=el.querySelector('h3'),pp=el.querySelector('p');t=(hh?hh.textContent.trim():'')+': '+(pp?pp.textContent.trim():'')}else if(el.classList.contains('hero-stat')||el.classList.contains('story-fact'))t=Array.prototype.map.call(el.children,function(c){return c.textContent.trim()}).join(' ');else if(tag==='FIGCAPTION')t=Array.prototype.map.call(el.children,function(c){return c.textContent.trim()}).join(' ');else t=el.textContent.replace(/\s+/g,' ').trim();
      if(t.length<22&&!el.classList.contains('hero-stat')&&!el.classList.contains('story-fact')&&tag!=='FIGCAPTION')return;
      var hp=el.closest('.hp'),src=hp?'hub:'+hp.id.replace('hub-',''):id;
      KB.push({t:t,h:h,s:src,k:toks((h+' '+t).toString()),n:0})})});
  KB.forEach(function(c){c.n=c.k.length;c.f={};c.k.forEach(function(w){c.f[w]=(c.f[w]||0)+1});Object.keys(c.f).forEach(function(w){DF[w]=(DF[w]||0)+1;VOC[w]=1})});AVG=KB.reduce(function(a,c){return a+c.n},0)/Math.max(1,KB.length)}
function search(q){var qt=toks(q).map(function(w){if(VOC[w])return w;if(w.length>=5){for(var v in VOC){if(lev(w,v)<=1)return v}}return w});var uniq=[];qt.forEach(function(w){if(uniq.indexOf(w)<0)uniq.push(w)});
  var WEAK={facility:1,student:1,pupil:1,class:1,classroom:0},N=KB.length,res=[];KB.forEach(function(c){var s=0,hit=0;uniq.forEach(function(w){var f=c.f[w]||0;if(!f)return;hit++;var idf=Math.log(1+(N-(DF[w]||0)+.5)/((DF[w]||0)+.5));s+=(WEAK[w]?.45:1)*idf*(f*2.2)/(f+1.2*(.25+.75*c.n/AVG))});
    if(hit){var hw=toks(c.h);uniq.forEach(function(w){if(hw.indexOf(w)>-1)s+=.6});res.push({c:c,s:s*(.55+.45*hit/uniq.length),hit:hit})}});
  var cnt=/\b(how many|number of|how much|count)\b/i.test(q);res.forEach(function(x){if(cnt&&/\d/.test(x.c.t))x.s*=1.45;if(/rule/i.test(x.c.h)&&uniq.indexOf('rule')<0)x.s*=.6});res.sort(function(a,b){return b.s-a.s});return {r:res,q:uniq}}
function sents(t){t=t.replace(/\b(St|Mr|Mrs|Ms|Dr|Sr|Jr|Fr|No)\./g,'$1§').replace(/\b([A-Z])\./g,'$1§');var m=(t.match(/[^.!?]+[.!?]+(\s|$)|[^.!?]+$/g)||[t]).map(function(x){return x.replace(/§/g,'.')});return m.map(function(x){return x.trim()}).filter(Boolean)}
function pick(t,qt,max){if(t.length<=max)return t;var ss=sents(t),sc=ss.map(function(s,i){var k=toks(s),n=0;qt.forEach(function(w){if(k.indexOf(w)>-1)n++});return {i:i,n:n}});sc.sort(function(a,b){return b.n-a.n||a.i-b.i});var take=sc.slice(0,2).sort(function(a,b){return a.i-b.i}),out=take.map(function(x){return ss[x.i]}).join(' ');return out.length>max?out.slice(0,max).replace(/\s+\S*$/,'')+'…':out}
function srcLabel(s){return s.indexOf('hub:')===0?'Handbook · '+HUBN[s.slice(4)]:(SECN[s]||s)}
var $=function(s,r){return (r||document).querySelector(s)},reduce=matchMedia('(prefers-reduced-motion: reduce)').matches,hist=[],lastQ='',aiCount=0,aiLast=0,busy=false,pend=null;function free(){busy=false;if(pend){var p=pend;pend=null;ask(p)}}
var fab=document.createElement('button');fab.className='ix-fab';fab.type='button';fab.setAttribute('aria-label','Ask St. Mary\'s');fab.setAttribute('aria-expanded','false');fab.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16v11H9l-5 4z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M8 9.5h8M8 12.5h5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>';
var pn=document.createElement('div');pn.className='ix-panel';pn.setAttribute('role','dialog');pn.setAttribute('aria-label','Ask St. Mary\'s');pn.innerHTML='<div class="ix-h"><b>Ask St. Mary\'s</b><span>Answers from the school\'s own website</span></div><div class="ix-m" aria-live="polite" data-lenis-prevent></div><div class="ix-q"></div><form class="ix-f"><input type="text" placeholder="Ask about admissions, rules, labs…" aria-label="Your question" autocomplete="off"><button type="submit" aria-label="Send">&#10148;</button></form><div class="ix-n">For official confirmation please contact the school office.</div>';
document.body.appendChild(pn);document.body.appendChild(fab);
var mb=$('.ix-m',pn),qb=$('.ix-q',pn),inp=$('input',pn);
function openSrc(s){pn.classList.remove('open');fab.setAttribute('aria-expanded','false');if(s.indexOf('hub:')===0){var t=document.querySelector('.ht [data-h="'+s.slice(4)+'"]');if(t)t.click();s='explore'}var e=document.getElementById(s);if(e)e.scrollIntoView({behavior:reduce?'auto':'smooth'})}
function bubble(me){var m=document.createElement('div');m.className='ix-b'+(me?' me':'');mb.appendChild(m);mb.scrollTop=mb.scrollHeight;return m}
function reveal(m,text,link,done){var w=text.split(/(\s+)/),k=0,step=reduce?w.length:Math.max(2,Math.ceil(w.length/60));(function tick(){k=Math.min(w.length,k+step);m.textContent=w.slice(0,k).join('');mb.scrollTop=mb.scrollHeight;if(k<w.length)setTimeout(tick,24);else{if(link){var br=document.createElement('br'),a=document.createElement('a');a.textContent=link.l+' →';if(/^http/.test(link.s)){a.href=link.s;a.target='_blank';a.rel='noopener noreferrer'}else{a.tabIndex=0;a.setAttribute('role','link');a.onclick=function(){openSrc(link.s)}}m.appendChild(br);m.appendChild(a)}if(link&&link.ai){var sp=document.createElement('div');sp.className='ix-n2';sp.textContent='AI-assisted answer based on the school\u2019s website. Please confirm important details with the school office.';m.appendChild(sp)}done&&done()}})()}
function reply(text,link){var ty=bubble(false);ty.className='ix-b ty';ty.innerHTML='<i></i><i></i><i></i>';setTimeout(function(){ty.className='ix-b';ty.textContent='';reveal(ty,text,link,function(){hist.push({role:'assistant',content:text.slice(0,400)});if(hist.length>8)hist.shift();free()})},reduce?0:380+Math.min(500,text.length*2))}
function local(q){var l=q.toLowerCase();
  if(/^(hi|hello|hey|namaste|good (morning|afternoon|evening))\b/.test(l))return {t:'Hello! Ask me anything about St. Mary\'s: admissions, rules, labs, toppers, history or how to reach us.'};
  if(/^(thanks|thank you|thx|ok thanks|great)\b/.test(l))return {t:'You\'re welcome! Anything else you\'d like to know about the school?'};
  if(/who are you|are you (an )?(ai|bot|real)|what can you do/.test(l))return {t:'I\'m the St. Mary\'s helper. I answer questions using the information published on this website, and I\'ll say so when I can\'t find something.'};
  if(/\b(phone|call|contact number|telephone)\b/.test(l)&&!/rule|lab|computer/.test(l))return {t:'You can call the school office on '+SCH.tel+'.',l:{l:'Open Contact',s:'contact'}};
  if(/\be-?mail\b/.test(l))return {t:'Our email address is '+SCH.mail+'.',l:{l:'Open Contact',s:'contact'}};
  if(/youtube|video channel/.test(l))return {t:'Watch the school\'s YouTube channel here.',l:{l:'Open YouTube',s:SCH.yt}};
  if(/\b(where|address|location|directions?|map|reach)\b/.test(l)&&!/rule|lab/.test(l))return {t:'St. Mary\'s Convent School is at '+SCH.addr+'. The Contact section has a map and a satellite view.',l:{l:'Open map',s:'contact'}};
  var rs=search(q),top=rs.r[0];
  if(!top||top.s<1.4||(rs.q.length>1&&top.hit<Math.ceil(rs.q.length/2)))return {none:1,hits:[]};
  var hits=[top],i;for(i=1;i<rs.r.length&&hits.length<3;i++){if(rs.r[i].s>=top.s*.62&&rs.r[i].c.h===top.c.h)hits.push(rs.r[i])}
  if(/^Class X toppers/.test(top.c.t)){var tt=top.c.t,ci=tt.indexOf(': '),items=tt.slice(ci+2).split('; '),all=/\ball\b|list|every/.test(l),show=all?items:items.slice(0,3);return {t:tt.slice(0,ci)+':\n'+show.map(function(x){return '• '+x}).join('\n')+(all?'':'\n(…and more in the Toppers tab)'),l:{l:'See all toppers',s:'hub:toppers'},hits:[tt]}}
  var parts=hits.map(function(h){return pick(h.c.t,rs.q,hits.length>1?210:300)}),t;
  if(parts.length>1)t='From the school\'s website'+(top.c.h?' (“'+top.c.h+'”)':'')+':\n• '+parts.join('\n• ');else t=parts[0];
  return {t:t,l:{l:'Read more: '+srcLabel(top.c.s),s:top.c.s},hits:rs.r.slice(0,5).map(function(h){return h.c.h?h.c.h+': '+h.c.t:h.c.t})}}
function ask(q){q=q.trim().slice(0,300);if(!q)return;if(busy){pend=q;return}busy=true;var m=bubble(true);m.textContent=q;hist.push({role:'user',content:q});if(hist.length>8)hist.shift();
  var merged=q,r=local(q);if(r.none&&q.split(/\s+/).length<4&&lastQ){var r2=local(lastQ+' '+q);if(!r2.none){r=r2;merged=lastQ+' '+q}}if(!r.none)lastQ=merged;
  var now=Date.now();
  if(AI_ENDPOINT&&r.hits&&r.hits.length&&aiCount<20&&now-aiLast>2500){aiCount++;aiLast=now;var ty=bubble(false);ty.className='ix-b ty';ty.innerHTML='<i></i><i></i><i></i>';
    fetch(AI_ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({q:q,ctx:r.hits,hist:hist.slice(-5,-1)})}).then(function(x){return x.json()}).then(function(j){if(!j||!j.reply)throw 0;ty.className='ix-b';ty.textContent='';reveal(ty,String(j.reply),{l:r.l.l,s:r.l.s,ai:1},function(){hist.push({role:'assistant',content:String(j.reply).slice(0,400)});free()})}).catch(function(){ty.remove();reply(r.t,r.l)});return}
  if(r.none){reply('I couldn\'t find that on the school\'s website. Please call the school office on '+SCH.tel+' or email '+SCH.mail+'.',{l:'Open Contact',s:'contact'});return}
  reply(r.t,r.l)}
build();
var m0=bubble(false);m0.textContent='Hi! I\'m the St. Mary\'s helper. I answer from the school\'s website: admissions, rules, labs, toppers, history and more.';
['How do I apply for admission?','What are the lab rules?','Who topped Class X?','Is it a co-education school?','Where is the school?'].forEach(function(q){var b=document.createElement('button');b.type='button';b.textContent=q;b.addEventListener('click',function(){ask(q)});qb.appendChild(b)});
$('form',pn).addEventListener('submit',function(e){e.preventDefault();var v=inp.value;inp.value='';ask(v)});
fab.addEventListener('click',function(){var o=!pn.classList.contains('open');pn.classList.toggle('open',o);fab.setAttribute('aria-expanded',o?'true':'false');if(o)setTimeout(function(){inp.focus()},250)});
addEventListener('keydown',function(e){if(e.key==='Escape'&&pn.classList.contains('open')){pn.classList.remove('open');fab.setAttribute('aria-expanded','false');fab.focus()}});
})()}catch(e){console.error(e)}
