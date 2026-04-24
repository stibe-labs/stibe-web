'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/* ── constants ────────────────────────────────────────── */
const SIM_SIZE = 256;
const DENSITY = 150;
const PARTICLES_SCALE = 0.5;
const CAMERA_ZOOM = 3.5;
const COLOR1 = '#0a1f6e';   // deep navy blue
const COLOR2 = '#9b1030';   // rich maroon
const COLOR3 = '#ff8800';   // warm orange-amber

/* ── helpers ──────────────────────────────────────────── */
function mapRange(n: number, inMin: number, inMax: number, outMin: number, outMax: number) {
  return (n - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}

/* Bridson's Poisson-disk sampling */
function poissonDisk(w: number, h: number, minDist: number, maxDist: number, tries: number) {
  const cell = minDist / Math.SQRT2;
  const gw = Math.ceil(w / cell);
  const gh = Math.ceil(h / cell);
  const grid = new Int32Array(gw * gh).fill(-1);
  const pts: [number, number][] = [];
  const active: number[] = [];

  function addPoint(x: number, y: number) {
    const i = pts.length;
    pts.push([x, y]);
    active.push(i);
    grid[Math.floor(y / cell) * gw + Math.floor(x / cell)] = i;
  }

  addPoint(w / 2, h / 2);

  while (active.length) {
    const ai = Math.floor(Math.random() * active.length);
    const [px, py] = pts[active[ai]];
    let found = false;
    for (let t = 0; t < tries; t++) {
      const a = Math.random() * Math.PI * 2;
      const r = minDist + Math.random() * (maxDist - minDist);
      const nx = px + Math.cos(a) * r;
      const ny = py + Math.sin(a) * r;
      if (nx < 0 || nx >= w || ny < 0 || ny >= h) continue;
      const gi = Math.floor(nx / cell);
      const gj = Math.floor(ny / cell);
      let ok = true;
      for (let di = -2; di <= 2 && ok; di++)
        for (let dj = -2; dj <= 2 && ok; dj++) {
          const ni = gi + di, nj = gj + dj;
          if (ni < 0 || ni >= gw || nj < 0 || nj >= gh) continue;
          const pi = grid[nj * gw + ni];
          if (pi >= 0) {
            const dx = pts[pi][0] - nx, dy = pts[pi][1] - ny;
            if (dx * dx + dy * dy < minDist * minDist) ok = false;
          }
        }
      if (ok) { addPoint(nx, ny); found = true; break; }
    }
    if (!found) active.splice(ai, 1);
  }
  return pts;
}

/* ── GLSL: simplex noise ──────────────────────────────── */
const NOISE_GLSL = `
vec3 permute(vec3 x){return mod(((x*34.0)+1.0)*x,289.0);}
vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x,289.0);}
float permute(float x){return floor(mod(((x*34.0)+1.0)*x,289.0));}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float taylorInvSqrt(float r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec2 v){
  const vec4 C=vec4(0.211324865405187,0.366025403784439,-0.577350269189626,0.024390243902439);
  vec2 i=floor(v+dot(v,C.yy));
  vec2 x0=v-i+dot(i,C.xx);
  vec2 i1=(x0.x>x0.y)?vec2(1.0,0.0):vec2(0.0,1.0);
  vec4 x12=x0.xyxy+C.xxzz;x12.xy-=i1;
  i=mod(i,289.0);
  vec3 p=permute(permute(i.y+vec3(0.0,i1.y,1.0))+i.x+vec3(0.0,i1.x,1.0));
  vec3 m=max(0.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.0);
  m=m*m;m=m*m;
  vec3 x=2.0*fract(p*C.www)-1.0;
  vec3 h=abs(x)-0.5;
  vec3 ox=floor(x+0.5);
  vec3 a0=x-ox;
  m*=1.79284291400159-0.85373472095314*(a0*a0+h*h);
  vec3 g;
  g.x=a0.x*x0.x+h.x*x0.y;
  g.yz=a0.yz*x12.xz+h.yz*x12.yw;
  return 130.0*dot(m,g);
}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);
  const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy));
  vec3 x0=v-i+dot(i,C.xxx);
  vec3 g2=step(x0.yzx,x0.xyz);
  vec3 l=1.0-g2;
  vec3 i1=min(g2.xyz,l.zxy);
  vec3 i2=max(g2.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;
  vec3 x2=x0-i2+2.0*C.xxx;
  vec3 x3=x0-1.0+3.0*C.xxx;
  i=mod(i,289.0);
  vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=1.0/7.0;
  vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z);
  vec4 y_=floor(j-7.0*x_);
  vec4 x4=x_*ns.x+ns.yyyy;
  vec4 y4=y_*ns.x+ns.yyyy;
  vec4 h2=1.0-abs(x4)-abs(y4);
  vec4 b0=vec4(x4.xy,y4.xy);
  vec4 b1=vec4(x4.zw,y4.zw);
  vec4 s0=floor(b0)*2.0+1.0;
  vec4 s1=floor(b1)*2.0+1.0;
  vec4 sh=-step(h2,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
  vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h2.x);
  vec3 p1=vec3(a0.zw,h2.y);
  vec3 p2=vec3(a1.xy,h2.z);
  vec3 p3=vec3(a1.zw,h2.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
  m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}
`;

/* ── GLSL: GPGPU simulation fragment shader ───────────── */
const SIM_FRAG = /* glsl */ `
precision highp float;
uniform sampler2D uPosition;
uniform sampler2D uPosRefs;
uniform vec2 uMousePos;
uniform float uTime;
uniform float uDeltaTime;
uniform float uIsHovering;

vec2 hash(vec2 p){
  p=vec2(dot(p,vec2(2127.1,81.17)),dot(p,vec2(1269.5,283.37)));
  return fract(sin(p)*43758.5453);
}

void main(){
  vec2 simUV=gl_FragCoord.xy/${SIM_SIZE.toFixed(1)};
  vec4 pFrame=texture2D(uPosition,simUV);

  float scale=pFrame.z;
  float velocity=pFrame.w;
  vec2 refPos=texture2D(uPosRefs,simUV).xy;
  float seed=hash(simUV).x;
  float seed2=hash(simUV).y;

  float time=uTime*0.5;
  float lifeEnd=3.0+sin(seed2*100.0)*1.0;
  float lifeTime=mod((seed*100.0)+time,lifeEnd);

  vec2 pos=pFrame.xy;
  float distRadius=0.15;

  // cursor-spatial target: particles near mouse gather slightly toward it
  float mouseDist=length(refPos-uMousePos);
  float mouseInfluence=smoothstep(0.35,0.0,mouseDist);
  vec2 cursorTarget=refPos+(uMousePos-refPos)*0.25*mouseInfluence;
  vec2 targetPos=mix(refPos,cursorTarget,uIsHovering*uIsHovering);

  vec2 direction=normalize(targetPos-pos+vec2(0.0001));
  direction*=0.01;
  float dist=length(targetPos-pos);
  float distStrength=smoothstep(distRadius,0.0,dist);

  if(dist>0.005){
    pos+=direction*distStrength;
  }

  if(lifeTime<0.01){
    pos=refPos;
    pFrame.xy=refPos;
    scale=0.0;
  }

  // scale: lifecycle + hover boost for nearby particles
  float targetScale=smoothstep(0.01,0.5,lifeTime)-smoothstep(0.5,1.0,lifeTime/lifeEnd);
  targetScale+=smoothstep(0.1,0.0,smoothstep(0.001,0.1,dist))*1.5*uIsHovering;
  targetScale+=mouseInfluence*0.8*uIsHovering;

  float scaleDiff=targetScale-scale;
  scaleDiff*=0.1;
  scale+=scaleDiff;

  // final position
  vec2 finalPos=pos;
  vec2 diff=finalPos-pFrame.xy;
  diff*=0.2;

  velocity=smoothstep(distRadius,0.001,dist)*uIsHovering;
  velocity+=mouseInfluence*uIsHovering*0.5;

  gl_FragColor=vec4(pFrame.xy+diff,scale,velocity);
}
`;

/* ── GLSL: render vertex shader ───────────────────────── */
const RENDER_VERT = /* glsl */ `
precision highp float;
attribute vec4 seeds;

uniform sampler2D uPosition;
uniform float uTime;
uniform float uParticleScale;
uniform float uPixelRatio;
uniform int uColorScheme;
uniform float uIsHovering;
uniform float uPulseProgress;

varying vec4 vSeeds;
varying float vVelocity;
varying vec2 vLocalPos;
varying vec2 vScreenPos;
varying float vScale;

${NOISE_GLSL}

void main(){
  vec4 pos=texture2D(uPosition,uv);
  vSeeds=seeds;

  float noiseX=snoise(vec3(pos.xy*10.0,uTime*0.2+100.0));
  float noiseY=snoise(vec3(pos.xy*10.0,uTime*0.2));
  float noiseX2=snoise(vec3(pos.xy*0.5,uTime*0.15+45.0));
  float noiseY2=snoise(vec3(pos.xy*0.5,uTime*0.15+87.0));

  // smooth disc pulse
  float cDist=length(pos.xy);
  float progress=uPulseProgress;
  float t=smoothstep(progress-0.25,progress,cDist)-smoothstep(progress,progress+0.25,cDist);
  t*=smoothstep(1.0,0.0,cDist);
  pos.xy*=1.0+(t*0.02);

  float dist=smoothstep(0.0,0.9,pos.w);
  dist=mix(0.0,dist,uIsHovering);

  pos.y+=noiseY*0.005*dist;
  pos.x+=noiseX*0.005*dist;
  pos.y+=noiseY2*0.02;
  pos.x+=noiseX2*0.02;

  vVelocity=pos.w;
  vScale=pos.z;
  vLocalPos=pos.xy;
  vec4 viewSpace=modelViewMatrix*vec4(pos.xy,0.0,1.0);

  gl_Position=projectionMatrix*viewSpace;
  vScreenPos=gl_Position.xy;

  float minScale=0.25;
  minScale+=float(uColorScheme)*0.75;

  gl_PointSize=((vScale*7.0)*(uPixelRatio*0.5)*uParticleScale)+(minScale*uPixelRatio);
}
`;

/* ── GLSL: render fragment shader ─────────────────────── */
const RENDER_FRAG = /* glsl */ `
precision highp float;

varying vec4 vSeeds;
varying vec2 vScreenPos;
varying vec2 vLocalPos;
varying float vScale;
varying float vVelocity;

uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;

uniform vec2 uMousePos;
uniform vec2 uRez;

uniform float uAlpha;
uniform float uTime;
uniform int uColorScheme;

${NOISE_GLSL}

#define PI 3.1415926535897932384626433832795

float sdRoundBox(in vec2 p,in vec2 b,in vec4 r){
  r.xy=(p.x>0.0)?r.xy:r.zw;
  r.x=(p.y>0.0)?r.x:r.y;
  vec2 q=abs(p)-b+r.x;
  return min(max(q.x,q.y),0.0)+length(max(q,0.0))-r.x;
}

vec2 rotate(vec2 v,float a){
  float s=sin(a);float c=cos(a);
  return mat2(c,s,-s,c)*v;
}

void main(){
  float uBorderSize=0.2;
  float ratio=uRez.x/uRez.y;
  float angle=atan(vLocalPos.y-uMousePos.y,vLocalPos.x-uMousePos.x);

  vec2 uv=gl_PointCoord.xy;
  uv-=vec2(0.5);
  uv.y*=-1.0;

  float h=0.8;
  float progress=vVelocity;
  vec3 col=mix(mix(uColor1,uColor2,progress/h),mix(uColor2,uColor3,(progress-h)/(1.0-h)),step(h,progress));
  vec3 color=col;

  float disc=smoothstep(0.5,0.45,length(uv));

  float a=uAlpha*disc*smoothstep(0.1,0.2,vScale);

  if(a<0.01){discard;}

  color=clamp(color,0.0,1.0);
  color=mix(color,color*clamp(vVelocity,0.0,1.0),float(uColorScheme));

  gl_FragColor=vec4(color,clamp(a,0.0,1.0));
}
`;

/* ── R3F inner component: GPGPU particles ─────────────── */
function ParticleSystem() {
  const { gl, viewport, size, camera } = useThree();
  const meshRef = useRef<THREE.Points>(null);
  const mouseNDC = useRef(new THREE.Vector2(999, 999));
  const mouseWorld = useRef(new THREE.Vector2(0, 0));
  const smoothMouse = useRef(new THREE.Vector2(0, 0));
  const hoverProgress = useRef(0);
  const pushProgress = useRef(0);
  const mouseIsOver = useRef(false);
  const lastTime = useRef(0);
  const everRendered = useRef(false);
  const rtRef = useRef<{ rt1: THREE.WebGLRenderTarget; rt2: THREE.WebGLRenderTarget } | null>(null);

  /* one-time setup */
  const setup = useMemo(() => {
    /* poisson disk points */
    const minD = mapRange(DENSITY, 0, 300, 10, 2);
    const maxD = mapRange(DENSITY, 0, 300, 11, 3);
    const points = poissonDisk(500, 500, minD, maxD, 20);
    const count = Math.min(points.length, SIM_SIZE * SIM_SIZE);

    /* position data texture (initial + reference) */
    const len = SIM_SIZE * SIM_SIZE;
    const posData = new Float32Array(len * 4);
    for (let i = 0; i < count; i++) {
      posData[i * 4] = (points[i][0] - 250) / 250;
      posData[i * 4 + 1] = (points[i][1] - 250) / 250;
    }
    const posTex = new THREE.DataTexture(posData, SIM_SIZE, SIM_SIZE, THREE.RGBAFormat, THREE.FloatType);
    posTex.needsUpdate = true;
    const refTex = new THREE.DataTexture(posData.slice(), SIM_SIZE, SIM_SIZE, THREE.RGBAFormat, THREE.FloatType);
    refTex.needsUpdate = true;

    /* render targets (ping-pong) */
    const rtOpts: THREE.WebGLRenderTargetOptions = {
      format: THREE.RGBAFormat,
      type: THREE.FloatType,
      minFilter: THREE.NearestFilter,
      magFilter: THREE.NearestFilter,
      depthBuffer: false,
      stencilBuffer: false,
    };
    const rt1 = new THREE.WebGLRenderTarget(SIM_SIZE, SIM_SIZE, rtOpts);
    const rt2 = new THREE.WebGLRenderTarget(SIM_SIZE, SIM_SIZE, rtOpts);

    /* simulation scene */
    const simScene = new THREE.Scene();
    const simCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const simMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uPosition: { value: posTex },
        uPosRefs: { value: refTex },
        uMousePos: { value: new THREE.Vector2(0, 0) },
        uTime: { value: 0 },
        uDeltaTime: { value: 0 },
        uIsHovering: { value: 0 },
      },
      vertexShader: `void main(){gl_Position=vec4(position,1.0);}`,
      fragmentShader: SIM_FRAG,
    });
    const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), simMaterial);
    simScene.add(quad);

    /* render geometry */
    const positions = new Float32Array(count * 3);
    const uvs = new Float32Array(count * 2);
    const seeds = new Float32Array(count * 4);
    for (let i = 0; i < count; i++) {
      uvs[i * 2] = (i % SIM_SIZE) / SIM_SIZE;
      uvs[i * 2 + 1] = Math.floor(i / SIM_SIZE) / SIM_SIZE;
      seeds[i * 4] = Math.random();
      seeds[i * 4 + 1] = Math.random();
      seeds[i * 4 + 2] = Math.random();
      seeds[i * 4 + 3] = Math.random();
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
    geometry.setAttribute('seeds', new THREE.BufferAttribute(seeds, 4));

    /* render material */
    const pixelRatio = typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 2) : 1;
    const renderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uPosition: { value: posTex },
        uTime: { value: 0 },
        uColor1: { value: new THREE.Color(COLOR1) },
        uColor2: { value: new THREE.Color(COLOR2) },
        uColor3: { value: new THREE.Color(COLOR3) },
        uAlpha: { value: 1 },
        uIsHovering: { value: 0 },
        uPulseProgress: { value: 0 },
        uMousePos: { value: new THREE.Vector2(0, 0) },
        uRez: { value: new THREE.Vector2(1, 1) },
        uParticleScale: { value: PARTICLES_SCALE },
        uPixelRatio: { value: pixelRatio },
        uColorScheme: { value: 1 },
      },
      vertexShader: RENDER_VERT,
      fragmentShader: RENDER_FRAG,
      transparent: true,
      depthTest: false,
      depthWrite: false,
    });

    return { posTex, refTex, rt1, rt2, simScene, simCamera, simMaterial, geometry, renderMaterial, count };
  }, []);

  /* store rt refs for swapping */
  useEffect(() => {
    rtRef.current = { rt1: setup.rt1, rt2: setup.rt2 };
  }, [setup]);

  /* raycaster + invisible plane */
  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const raycastPlane = useMemo(() => {
    const m = new THREE.Mesh(
      new THREE.PlaneGeometry(20, 20),
      new THREE.MeshBasicMaterial({ visible: false, side: THREE.DoubleSide })
    );
    return m;
  }, []);

  /* mouse events */
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      mouseNDC.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseNDC.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseIsOver.current = true;
    };
    const onLeave = () => { mouseIsOver.current = false; };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerleave', onLeave);
    window.addEventListener('blur', onLeave);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('blur', onLeave);
    };
  }, []);

  /* cleanup */
  useEffect(() => {
    return () => {
      setup.rt1.dispose();
      setup.rt2.dispose();
      setup.posTex.dispose();
      setup.refTex.dispose();
      setup.simMaterial.dispose();
      setup.renderMaterial.dispose();
      setup.geometry.dispose();
    };
  }, [setup]);

  /* frame loop */
  useFrame((state) => {
    if (!rtRef.current) return;
    const { rt1, rt2 } = rtRef.current;
    const elapsed = state.clock.elapsedTime;
    const dt = elapsed - lastTime.current;
    lastTime.current = elapsed;

    /* raycast mouse to world plane */
    raycaster.setFromCamera(mouseNDC.current, camera);
    const hits = raycaster.intersectObject(raycastPlane);
    if (hits.length > 0 && mouseIsOver.current) {
      mouseWorld.current.set(hits[0].point.x * 0.175, hits[0].point.y * 0.175);
    }
    smoothMouse.current.x += (mouseWorld.current.x - smoothMouse.current.x) * Math.min(1, dt * 8);
    smoothMouse.current.y += (mouseWorld.current.y - smoothMouse.current.y) * Math.min(1, dt * 8);

    /* hover animation (GSAP-equivalent lerp) */
    const hoverTarget = mouseIsOver.current ? 1 : 0;
    hoverProgress.current += (hoverTarget - hoverProgress.current) * Math.min(1, dt * 4);

    /* push progress (2s ease) */
    pushProgress.current += dt * 0.5;
    if (pushProgress.current > 1) pushProgress.current = 1;

    /* particle scale (matches Antigravity formula) */
    const canvasW = gl.domElement.width;
    const pixelRatio = Math.min(window.devicePixelRatio, 2);
    const particleScale = (canvasW / pixelRatio / 2000) * PARTICLES_SCALE;

    /* ── GPGPU simulation pass ── */
    const simU = setup.simMaterial.uniforms;
    simU.uPosition.value = everRendered.current ? rt1.texture : setup.posTex;
    simU.uTime.value = elapsed;
    simU.uDeltaTime.value = dt;
    simU.uMousePos.value.copy(smoothMouse.current);
    simU.uIsHovering.value = hoverProgress.current;

    gl.setRenderTarget(rt2);
    gl.render(setup.simScene, setup.simCamera);
    gl.setRenderTarget(null);

    /* ── update render material ── */
    const rU = setup.renderMaterial.uniforms;
    rU.uPosition.value = everRendered.current ? rt2.texture : setup.posTex;
    rU.uTime.value = elapsed;
    rU.uMousePos.value.copy(smoothMouse.current);
    rU.uParticleScale.value = particleScale;
    rU.uIsHovering.value = hoverProgress.current;
    rU.uPulseProgress.value = pushProgress.current;
    rU.uPixelRatio.value = pixelRatio;
    rU.uRez.value.set(gl.domElement.width, gl.domElement.height);

    /* swap buffers */
    rtRef.current = { rt1: rt2, rt2: rt1 };
    everRendered.current = true;
  });

  return (
    <>
      <primitive object={raycastPlane} />
      <points ref={meshRef} geometry={setup.geometry} material={setup.renderMaterial} scale={[5, -5, 5]} />
    </>
  );
}

/* ── exported wrapper ─────────────────────────────────── */
export default function ParticlesBackground() {
  // Skip the heavy GPGPU particle simulation on mobile / low-power devices
  // and when the user prefers reduced motion — keeps animations smooth.
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isCoarse = window.matchMedia('(hover: none), (pointer: coarse)').matches;
    const isNarrow = window.innerWidth < 768;
    const lowCores =
      typeof navigator !== 'undefined' &&
      (navigator as any).hardwareConcurrency &&
      (navigator as any).hardwareConcurrency < 4;
    if (reduce || isCoarse || isNarrow || lowCores) {
      setEnabled(false);
      return;
    }
    setEnabled(true);
  }, []);

  if (!enabled) return null;

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ fov: 40, near: 0.1, far: 1000, position: [0, 0, CAMERA_ZOOM] }}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance', precision: 'highp', stencil: false }}
        frameloop="always"
      >
        <ParticleSystem />
      </Canvas>
    </div>
  );
}
