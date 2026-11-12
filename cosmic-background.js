/*
 * ST. MARY'S CONVENT SCHOOL — COSMIC BACKGROUND OVERRIDE
 * Load after Three.js + OrbitControls, but BEFORE script.js.
 * This deliberately reuses the site's existing WebGL contexts.
 */
(function () {
  "use strict";

  var GLOBAL_COSMIC_SHADER = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform vec2 r;
uniform vec2 m;
uniform float t;
uniform float s;
uniform float b;
uniform float k;

float hash21(vec2 p){
  p=fract(p*vec2(123.34,456.21));
  p+=dot(p,p+45.32);
  return fract(p.x*p.y);
}
float noise2(vec2 p){
  vec2 i=floor(p),f=fract(p);
  f=f*f*(3.0-2.0*f);
  float a=hash21(i),bb=hash21(i+vec2(1.0,0.0));
  float c=hash21(i+vec2(0.0,1.0)),d=hash21(i+vec2(1.0,1.0));
  return mix(mix(a,bb,f.x),mix(c,d,f.x),f.y);
}
float fbm(vec2 p){
  float v=0.0,w=0.52;
  for(int i=0;i<5;i++){
    v+=noise2(p)*w;
    p=mat2(1.62,1.18,-1.18,1.62)*p+vec2(17.17,9.23);
    w*=0.5;
  }
  return v;
}
float starLayer(vec2 p,float scale,float cutoff){
  vec2 cell=floor(p*scale),f=fract(p*scale)-0.5;
  float rnd=hash21(cell);
  vec2 off=vec2(hash21(cell+11.7),hash21(cell+37.2))-0.5;
  float radius=mix(0.008,0.035,hash21(cell+68.8));
  float d=length(f-off);
  float core=1.0-smoothstep(radius*0.18,radius,d);
  float twinkle=0.62+0.38*sin(t*(1.1+hash21(cell+21.0)*2.4)+rnd*6.28318);
  return core*step(cutoff,rnd)*twinkle;
}
float meteor(vec2 p,vec2 start,vec2 finish,float seed,float speed){
  float phase=fract(t*speed+seed);
  vec2 dir=normalize(finish-start);
  vec2 rel=p-mix(start,finish,phase);
  float along=dot(rel,dir);
  float side=dot(rel,vec2(-dir.y,dir.x));
  float active=smoothstep(0.0,0.035,phase)*(1.0-smoothstep(0.20,0.31,phase));
  float tail=exp(-side*side*2700.0)*exp(-max(-along,0.0)*4.8)
    *smoothstep(-0.72,-0.48,along)*(1.0-smoothstep(-0.055,0.0,along));
  float head=exp(-dot(rel,rel)*1050.0);
  return (tail*1.0+head*1.5)*active;
}
void main(){
  vec2 uv=gl_FragCoord.xy/r;
  vec2 p=(uv-0.5)*vec2(r.x/r.y,1.0);
  vec2 pointer=(m-0.5)*vec2(r.x/r.y,1.0);
  float md=length(p-pointer);
  float touch=b*exp(-md*3.0);
  float ring=sin(md*47.0-t*8.0)*exp(-md*4.5)*b;
  p+=vec2(sin(t*0.32+md*8.0),cos(t*0.28-md*7.0))*(0.006+0.035*touch);
  p+=vec2(0.0,s*0.035);
  p+=normalize(p-pointer+vec2(0.0001))*ring*0.012;

  vec2 warp=vec2(
    fbm(p*2.25+vec2(2.1,t*0.010)),
    fbm(p*2.25+vec2(7.4,-t*0.008))
  );
  float broad=fbm(p*2.85+warp*1.55+vec2(t*0.006,-t*0.009));
  float detail=fbm(p*7.2+warp*2.35+vec2(-t*0.012,t*0.010));
  float filament=fbm(p*12.5+warp*3.0+vec2(t*0.018,-t*0.015));
  float cloud=smoothstep(0.34,0.80,broad*0.72+detail*0.28);
  float ridge=pow(max(0.0,1.0-abs(detail-(0.46+0.08*sin(p.x*2.7+p.y*2.0+t*0.035)))*6.5),2.1);
  float wisps=smoothstep(0.48,0.78,filament)*cloud;

  vec3 col=vec3(0.0025,0.0040,0.016);
  col=mix(col,vec3(0.018,0.026,0.095),cloud*0.66);
  col+=vec3(0.075,0.045,0.24)*pow(max(0.0,broad-0.40),1.4)*1.8;
  col+=vec3(0.025,0.15,0.39)*pow(max(0.0,detail-0.43),1.55)*1.5;
  col+=vec3(0.045,0.25,0.48)*ridge*0.56;
  col+=vec3(0.19,0.10,0.44)*wisps*0.45;
  float warmA=exp(-dot((p-vec2(0.78,0.16))*vec2(1.0,1.35),(p-vec2(0.78,0.16))*vec2(1.0,1.35))*5.8);
  float warmB=exp(-dot((p-vec2(-0.82,-0.22))*vec2(1.1,1.4),(p-vec2(-0.82,-0.22))*vec2(1.1,1.4))*8.0);
  float warm=(warmA*0.72+warmB*0.28)*smoothstep(0.39,0.72,broad);
  col+=vec3(0.92,0.25,0.065)*warm*0.60;
  col+=vec3(1.0,0.58,0.20)*pow(warm,3.0)*0.35;

  float stars=starLayer(uv,190.0,0.970)*0.75
    +starLayer(uv,390.0,0.988)*0.68
    +starLayer(uv,720.0,0.994)*0.46;
  float bright=starLayer(uv,54.0,0.991);
  float starGlow=bright;
  col+=vec3(0.58,0.72,1.0)*stars*1.15;
  col+=vec3(0.48,0.70,1.0)*starGlow*0.24;
  col+=vec3(0.20,0.42,1.0)*ring*0.18;

  float m1=meteor(p,vec2(-1.42,0.56),vec2(1.38,-0.34),0.12,0.027);
  float m2=meteor(p,vec2(1.40,0.48),vec2(-1.30,-0.18),0.53,0.036);
  float m3=meteor(p,vec2(-1.35,-0.54),vec2(1.26,0.22),0.81,0.043);
  col+=vec3(0.66,0.84,1.0)*m1*1.05;
  col+=vec3(1.0,0.62,0.31)*m2*0.90;
  col+=vec3(0.72,0.79,1.0)*m3*0.75;
  col+=vec3(0.09,0.18,0.42)*touch*0.55;

  float vignette=1.0-smoothstep(0.34,1.58,length((uv-0.5)*vec2(r.x/r.y,1.0)))*0.40;
  col*=vignette;
  col+=(hash21(gl_FragCoord.xy+floor(t*24.0))-0.5)/310.0;
  gl_FragColor=vec4(max(col,vec3(0.0)),1.0);
}`;

  var HERO_NEBULA_SHADER = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform float uTime;
uniform vec3 uRipples[6];
varying vec2 vUv;
varying float vWave;
float h21(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}
float n2(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.0-2.0*f);return mix(mix(h21(i),h21(i+vec2(1.0,0.0)),f.x),mix(h21(i+vec2(0.0,1.0)),h21(i+vec2(1.0,1.0)),f.x),f.y);}
float fb(vec2 p){float v=0.0,w=0.52;for(int i=0;i<5;i++){v+=n2(p)*w;p=mat2(1.62,1.18,-1.18,1.62)*p+vec2(17.17,9.23);w*=0.5;}return v;}
float star(vec2 p,float scale,float cutoff){vec2 cell=floor(p*scale),f=fract(p*scale)-0.5;float rnd=h21(cell);vec2 off=vec2(h21(cell+11.7),h21(cell+37.2))-0.5;float rad=mix(0.008,0.032,h21(cell+68.8));float core=1.0-smoothstep(rad*0.18,rad,length(f-off));return core*step(cutoff,rnd)*(0.7+0.3*sin(uTime*(1.3+h21(cell+21.0)*2.0)+rnd*6.28318));}
float shoot(vec2 p,vec2 a,vec2 z,float seed,float speed){float phase=fract(uTime*speed+seed);vec2 d=normalize(z-a),rel=p-mix(a,z,phase);float along=dot(rel,d),side=dot(rel,vec2(-d.y,d.x));float live=smoothstep(0.0,0.04,phase)*(1.0-smoothstep(0.20,0.32,phase));float tail=exp(-side*side*2400.0)*exp(-max(-along,0.0)*4.6)*smoothstep(-0.70,-0.46,along)*(1.0-smoothstep(-0.05,0.0,along));float head=exp(-dot(rel,rel)*950.0);return (tail+head*1.4)*live;}
void main(){
  vec2 uv=vUv,p=(uv-0.5)*vec2(1.85,1.0);
  float touch=0.0;
  for(int i=0;i<6;i++){float age=uTime-uRipples[i].z;if(age>=0.0&&age<2.9){float d=distance(uv,uRipples[i].xy);float radius=0.018+age*0.22;touch+=exp(-abs(d-radius)*76.0)*exp(-age*1.16);}}
  p+=vec2(sin(p.y*2.1+uTime*0.07),cos(p.x*2.2-uTime*0.06))*(0.009+touch*0.022+vWave*0.006);
  vec2 warp=vec2(fb(p*2.35+vec2(2.0,uTime*0.008)),fb(p*2.35+vec2(7.0,-uTime*0.009)));
  float broad=fb(p*3.0+warp*1.6+vec2(uTime*0.006,-uTime*0.008));
  float detail=fb(p*7.6+warp*2.2+vec2(-uTime*0.012,uTime*0.010));
  float fine=fb(p*13.0+warp*3.0);
  float cloud=smoothstep(0.32,0.80,broad*0.72+detail*0.28);
  float filament=pow(max(0.0,1.0-abs(detail-(0.46+0.09*sin(p.x*2.7+p.y*1.8+uTime*0.03)))*6.2),2.0);
  vec3 c=vec3(0.002,0.004,0.018);
  c=mix(c,vec3(0.018,0.025,0.11),cloud*0.72);
  c+=vec3(0.10,0.055,0.34)*pow(max(0.0,broad-0.39),1.45)*1.6;
  c+=vec3(0.025,0.17,0.45)*pow(max(0.0,detail-0.43),1.5)*1.55;
  c+=vec3(0.07,0.32,0.56)*filament*0.56;
  c+=vec3(0.22,0.10,0.47)*smoothstep(0.49,0.78,fine)*cloud*0.38;
  float ember=exp(-dot((p-vec2(0.80,0.16))*vec2(1.0,1.4),(p-vec2(0.80,0.16))*vec2(1.0,1.4))*5.4)*smoothstep(0.38,0.72,broad);
  c+=vec3(0.95,0.27,0.07)*ember*0.68+vec3(1.0,0.62,0.23)*pow(ember,3.0)*0.32;
  float stars=star(uv,170.0,0.972)*0.8+star(uv,350.0,0.989)*0.65+star(uv,660.0,0.995)*0.4;
  c+=vec3(0.60,0.76,1.0)*stars*1.25;
  c+=vec3(0.55,0.82,1.0)*shoot(p,vec2(-1.25,0.55),vec2(1.22,-0.3),0.14,0.030)*1.0;
  c+=vec3(1.0,0.62,0.30)*shoot(p,vec2(1.25,0.48),vec2(-1.2,-0.18),0.56,0.038)*0.85;
  c+=vec3(0.62,0.78,1.0)*touch*0.38;
  c+=vec3(0.015,0.035,0.075)*abs(vWave)*0.25;
  float vignette=1.0-smoothstep(0.52,1.52,length(p))*0.36;
  gl_FragColor=vec4(max(c*vignette,vec3(0.0)),1.0);
}`;

  var HERO_SKY_SHADER = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
varying vec3 v;
uniform vec3 top,hor,sunDir,sunCol;
uniform float stars;
float h21(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}
float n2(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.0-2.0*f);return mix(mix(h21(i),h21(i+vec2(1.0,0.0)),f.x),mix(h21(i+vec2(0.0,1.0)),h21(i+vec2(1.0,1.0)),f.x),f.y);}
float fb(vec2 p){float a=0.0,w=0.52;for(int i=0;i<5;i++){a+=n2(p)*w;p=mat2(1.62,1.18,-1.18,1.62)*p+vec2(17.17,9.23);w*=0.5;}return a;}
float star(vec2 p,float scale,float cut){vec2 cell=floor(p*scale),f=fract(p*scale)-0.5;float rnd=h21(cell);vec2 off=vec2(h21(cell+11.7),h21(cell+37.2))-0.5;float rad=mix(0.009,0.034,h21(cell+68.8));return (1.0-smoothstep(rad*0.18,rad,length(f-off)))*step(cut,rnd);}
void main(){
 vec3 d=normalize(v);
 vec2 p=vec2(atan(d.z,d.x)*0.72,asin(clamp(d.y,-1.0,1.0))*0.90);
 vec2 warp=vec2(fb(p*2.8+vec2(2.1,3.4)),fb(p*2.8+vec2(7.3,1.6)));
 float broad=fb(p*3.6+warp*1.55),detail=fb(p*8.2+warp*2.35);
 float cloud=smoothstep(0.34,0.79,broad*0.72+detail*0.28);
 float fil=pow(max(0.0,1.0-abs(detail-0.53)*7.0),2.0)*cloud;
 vec3 col=vec3(0.002,0.004,0.015);
 col=mix(col,vec3(0.016,0.023,0.09),cloud*0.72);
 col+=vec3(0.085,0.045,0.27)*pow(max(0.0,broad-0.39),1.45)*1.7;
 col+=vec3(0.028,0.16,0.42)*pow(max(0.0,detail-0.42),1.5)*1.45;
 col+=vec3(0.055,0.29,0.52)*fil*0.62;
 float ember=exp(-dot((p-vec2(0.78,0.12))*vec2(1.1,1.4),(p-vec2(0.78,0.12))*vec2(1.1,1.4))*5.7)*cloud;
 col+=vec3(0.85,0.22,0.055)*ember*0.50;
 float st=star(p,245.0,0.972)*0.85+star(p,460.0,0.989)*0.75+star(p,780.0,0.995)*0.48;
 col+=vec3(0.62,0.76,1.0)*st*(0.72+0.28*stars);
 float sun=max(dot(d,normalize(sunDir)),0.0);
 col+=sunCol*(pow(sun,80.0)*0.20+pow(sun,18.0)*0.025);
 col+=hor*0.018+top*0.012;
 gl_FragColor=vec4(col,1.0);
}`;

  function wrapConstructor(THREE, name, transform) {
    var Original = THREE[name];
    if (typeof Original !== "function" || Original.__cosmicWrapped) return;
    function Wrapped(options) {
      var next = transform(options || {});
      return Reflect.construct(Original, [next], new.target || Original);
    }
    Wrapped.prototype = Original.prototype;
    Object.setPrototypeOf(Wrapped, Original);
    Wrapped.__cosmicWrapped = true;
    THREE[name] = Wrapped;
  }

  function capOpacity(material, maximum) {
    var value = material.opacity;
    try {
      Object.defineProperty(material, "opacity", {
        configurable: true,
        enumerable: true,
        get: function () { return value; },
        set: function (next) { value = Math.max(0, Math.min(maximum, Number(next) || 0)); }
      });
      material.opacity = value;
    } catch (e) { material.opacity = Math.min(value, maximum); }
  }

  if (window.THREE) {
    wrapConstructor(THREE, "ShaderMaterial", function (options) {
      var p = Object.assign({}, options);
      var fragment = p.fragmentShader || "";
      if (fragment.indexOf("vec3 deep=vec3(.006,.025,.036)") !== -1 && fragment.indexOf("uRipples") !== -1) {
        p.fragmentShader = HERO_NEBULA_SHADER;
        p.transparent = false;
        p.depthWrite = true;
      } else if (fragment.indexOf("vec3 c=mix(vec3(.015,.32,.26),vec3(.68,.48,.24)") !== -1) {
        p.fragmentShader = "varying vec2 vUv; varying vec3 vN; void main(){gl_FragColor=vec4(0.0);}";
      } else if (fragment.indexOf("uniform vec3 top,hor,sunDir,sunCol") !== -1 && fragment.indexOf("uniform float stars") !== -1) {
        p.fragmentShader = HERO_SKY_SHADER;
      } else if (fragment.indexOf("vec3 c=mix(vec3(.43,.92,.82),vec3(.98,.77,.47)") !== -1) {
        p.fragmentShader = "varying vec3 vN;varying vec3 vV;void main(){float f=pow(1.0-max(dot(normalize(vN),normalize(vV)),0.0),2.25);vec3 c=mix(vec3(.23,.39,.92),vec3(.70,.54,1.0),smoothstep(.45,.95,f));gl_FragColor=vec4(c,.012+f*.18);}";
      }
      return p;
    });

    wrapConstructor(THREE, "MeshPhysicalMaterial", function (options) {
      var p = Object.assign({}, options);
      if (p.color === 0xe8f5f1 && p.roughness >= 0.9 && p.opacity === 0.15) {
        p.color = 0x45549a;
        p.emissive = 0x101a4a;
        p.emissiveIntensity = 0.14;
        p.opacity = 0.055;
        p.transparent = true;
        p.__cosmicHaze = true;
      } else if (p.color === 0x9cebdd && p.transmission > 0.5) {
        p.color = 0x7e91df;
        p.emissive = 0x111a48;
        p.emissiveIntensity = 0.07;
        p.opacity = 0.075;
        p.roughness = 0.035;
        p.transmission = 0.72;
        p.__cosmicOrb = true;
      }
      var material = Object.assign({}, p);
      delete material.__cosmicHaze;
      delete material.__cosmicOrb;
      return material;
    });

    /* Opacity is set again by the existing campus theme switch; keep the
       glass haze and orbs restrained when that happens. */
    var MeshPhysicalOriginal = THREE.MeshPhysicalMaterial;
    if (MeshPhysicalOriginal && !MeshPhysicalOriginal.__cosmicOpacityCap) {
      var prior = THREE.MeshPhysicalMaterial;
      function CappedPhysicalMaterial(options) {
        var p = Object.assign({}, options || {});
        var isHaze = p.color === 0x45549a && p.opacity === 0.055;
        var isOrb = p.color === 0x7e91df && p.transmission > 0.5;
        var mat = Reflect.construct(prior, [p], new.target || prior);
        if (isHaze) capOpacity(mat, 0.055);
        if (isOrb) capOpacity(mat, 0.075);
        return mat;
      }
      CappedPhysicalMaterial.prototype = prior.prototype;
      Object.setPrototypeOf(CappedPhysicalMaterial, prior);
      CappedPhysicalMaterial.__cosmicOpacityCap = true;
      THREE.MeshPhysicalMaterial = CappedPhysicalMaterial;
    }

    wrapConstructor(THREE, "PointsMaterial", function (options) {
      var p = Object.assign({}, options);
      if (p.vertexColors && p.size === 1.15 && p.opacity === 0.65) {
        p.color = 0x9db8ff;
        p.size = 0.92;
        p.opacity = 0.92;
      }
      return p;
    });

    /* Add one restrained, textured 3D planet to the existing sky dome scene.
       It is attached to the scene that owns the 1800-unit sky sphere; the
       school geometry itself is never touched. */
    var sceneAdd = THREE.Scene.prototype.add;
    var skySphereScenes = 0;
    var planetTexture = null;
    function buildPlanetTexture() {
      if (planetTexture) return planetTexture;
      var canvas = document.createElement("canvas");
      canvas.width = 1024;
      canvas.height = 512;
      var ctx = canvas.getContext("2d");
      var base = ctx.createLinearGradient(0, 0, 1024, 512);
      base.addColorStop(0, "#222b48");
      base.addColorStop(0.45, "#52607b");
      base.addColorStop(1, "#18203b");
      ctx.fillStyle = base;
      ctx.fillRect(0, 0, 1024, 512);
      for (var i = 0; i < 9200; i++) {
        var x = Math.random() * 1024, y = Math.random() * 512;
        var radius = 0.4 + Math.random() * 2.8;
        ctx.fillStyle = Math.random() > 0.5 ? "rgba(176,190,218,0.045)" : "rgba(4,8,24,0.10)";
        ctx.beginPath(); ctx.arc(x, y, radius, 0, Math.PI * 2); ctx.fill();
      }
      for (var j = 0; j < 230; j++) {
        var cx = Math.random() * 1024, cy = Math.random() * 512;
        var rr = 1.8 + Math.random() * 11.0;
        var crater = ctx.createRadialGradient(cx - rr * 0.24, cy - rr * 0.28, rr * 0.12, cx, cy, rr);
        crater.addColorStop(0, "rgba(7,12,29,0.32)");
        crater.addColorStop(0.58, "rgba(10,17,39,0.19)");
        crater.addColorStop(0.82, "rgba(184,198,225,0.10)");
        crater.addColorStop(1, "rgba(7,12,29,0.02)");
        ctx.fillStyle = crater;
        ctx.beginPath(); ctx.arc(cx, cy, rr, 0, Math.PI * 2); ctx.fill();
      }
      var shade = ctx.createLinearGradient(0, 0, 0, 512);
      shade.addColorStop(0, "rgba(1,3,12,0.28)");
      shade.addColorStop(0.48, "rgba(4,8,20,0.00)");
      shade.addColorStop(1, "rgba(1,3,12,0.38)");
      ctx.fillStyle = shade; ctx.fillRect(0, 0, 1024, 512);
      planetTexture = new THREE.CanvasTexture(canvas);
      planetTexture.encoding = THREE.sRGBEncoding;
      planetTexture.anisotropy = 4;
      return planetTexture;
    }
    function attachCosmicPlanet(scene) {
      if (!scene || scene.userData.__cosmicPlanetAttached) return;
      var group = new THREE.Group();
      var texture = buildPlanetTexture();
      var body = new THREE.Mesh(
        new THREE.SphereGeometry(34, 48, 32),
        new THREE.MeshStandardMaterial({ map: texture, bumpMap: texture, bumpScale: 1.25, color: 0x8998bd, roughness: 0.98, metalness: 0.015 })
      );
      body.rotation.set(0.18, -0.52, 0.12);
      group.add(body);
      var atmosphere = new THREE.Mesh(
        new THREE.SphereGeometry(35.3, 48, 32),
        new THREE.ShaderMaterial({
          transparent: true,
          depthWrite: false,
          side: THREE.BackSide,
          vertexShader: "varying vec3 n;varying vec3 v;void main(){vec4 mv=modelViewMatrix*vec4(position,1.0);n=normalize(normalMatrix*normal);v=normalize(-mv.xyz);gl_Position=projectionMatrix*mv;}",
          fragmentShader: "varying vec3 n;varying vec3 v;void main(){float f=pow(1.0-max(dot(normalize(n),normalize(v)),0.0),2.3);vec3 c=mix(vec3(0.12,0.24,0.72),vec3(0.42,0.30,0.80),f);gl_FragColor=vec4(c,0.12+f*0.36);}"
        })
      );
      group.add(atmosphere);
      var moon = new THREE.Mesh(
        new THREE.SphereGeometry(7.2, 24, 16),
        new THREE.MeshStandardMaterial({ color: 0x7784a7, roughness: 1.0, metalness: 0.0 })
      );
      moon.position.set(48, 14, 2);
      group.add(moon);
      group.position.set(-158, 132, -292);
      group.rotation.z = -0.12;
      group.userData.__cosmicDrift = true;
      sceneAdd.call(scene, group);
      scene.userData.__cosmicPlanetAttached = true;
      scene.userData.__cosmicPlanet = group;
    }
    if (sceneAdd && !THREE.Scene.prototype.__cosmicScenePatch) {
      THREE.Scene.prototype.add = function () {
        var result = sceneAdd.apply(this, arguments);
        for (var a = 0; a < arguments.length; a++) {
          var object = arguments[a];
          var radius = object && object.geometry && object.geometry.parameters && object.geometry.parameters.radius;
          if (object && object.isMesh && radius === 1800) {
            skySphereScenes++;
            /* The first 1800-unit sky sphere belongs to the unused helper
               scene; attach the planet only to the rendered campus scene. */
            if (skySphereScenes === 2) attachCosmicPlanet(this);
          }
        }
        return result;
      };
      THREE.Scene.prototype.__cosmicScenePatch = true;
    }

    var renderOriginal = THREE.WebGLRenderer.prototype.render;
    if (renderOriginal && !THREE.WebGLRenderer.prototype.__cosmicPlanetMotion) {
      THREE.WebGLRenderer.prototype.render = function (scene, camera) {
        var planet = scene && scene.userData && scene.userData.__cosmicPlanet;
        if (planet && document.visibilityState !== "hidden") planet.rotation.y += 0.000045;
        return renderOriginal.call(this, scene, camera);
      };
      THREE.WebGLRenderer.prototype.__cosmicPlanetMotion = true;
    }
  }

  /* Replace only the site's identifiable full-screen liquid fragment shader.
     It keeps using the existing canvas, context and adaptive render loop. */
  if (window.WebGLRenderingContext) {
    var proto = WebGLRenderingContext.prototype;
    var originalShaderSource = proto.shaderSource;
    if (originalShaderSource && !proto.__cosmicShaderPatch) {
      proto.shaderSource = function (shader, source) {
        if (typeof source === "string" &&
            source.indexOf("uniform vec2 r,m;uniform float t,s,b,k;") !== -1 &&
            source.indexOf("float h(vec2 p)") !== -1) {
          source = GLOBAL_COSMIC_SHADER;
        }
        return originalShaderSource.call(this, shader, source);
      };
      proto.__cosmicShaderPatch = true;
    }
  }

  document.documentElement.classList.add("cosmic-background-enabled");
})();
