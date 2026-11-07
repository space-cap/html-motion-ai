import type { MotionItem } from '../types/motion'

export const MOTION_PRESETS: MotionItem[] = [
  {
    id: 'orange-bounce',
    title: '🟠 주황색 공 3단 리얼 물리 바운스 (GSAP)',
    category: 'card',
    description: 'GSAP 물리 가속도 + 부피 보존 스쿼시 & 스트레치 + 바닥 충격파 링 연동',
    tags: ['GSAP 3', 'Physics', 'Squash & Stretch', '5s Timeline'],
    html: `<div class="stage">
  <div class="floor-line"></div>
  <div class="shockwave" id="shockwave"></div>
  <div class="ball-shadow" id="shadow"></div>
  <div class="ball-container" id="ballContainer">
    <div class="ball" id="ball"></div>
  </div>
</div>`,
    css: `.stage {
  position: relative;
  width: 380px;
  height: 380px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 60px;
}

.floor-line {
  position: absolute;
  bottom: 60px;
  width: 320px;
  height: 2px;
  background: linear-gradient(90deg, transparent, #f97316, transparent);
  box-shadow: 0 0 16px rgba(249, 115, 22, 0.6);
}

.shockwave {
  position: absolute;
  bottom: 54px;
  width: 70px;
  height: 15px;
  border: 2px solid rgba(251, 146, 60, 0.8);
  border-radius: 50%;
  opacity: 0;
  transform: scale(0.2);
  pointer-events: none;
}

.ball-shadow {
  position: absolute;
  bottom: 54px;
  width: 80px;
  height: 16px;
  background: radial-gradient(ellipse, rgba(0, 0, 0, 0.9) 0%, rgba(249, 115, 22, 0.25) 35%, transparent 70%);
  border-radius: 50%;
  transform-origin: center center;
}

.ball-container {
  position: absolute;
  bottom: 60px;
  width: 72px;
  height: 72px;
  transform-origin: 50% 100%;
}

.ball {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  transform-origin: 50% 100%;
  background: radial-gradient(circle at 32% 28%, #fff7ed 0%, #fed7aa 20%, #fb923c 50%, #ea580c 78%, #7c2d12 100%);
  box-shadow: 
    inset -7px -7px 16px rgba(67, 20, 7, 0.85),
    inset 4px 4px 12px rgba(255, 255, 255, 0.8),
    0 12px 30px rgba(234, 88, 12, 0.45);
  position: relative;
}

.ball::before {
  content: '';
  position: absolute;
  top: 9px;
  left: 13px;
  width: 20px;
  height: 12px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.8);
  transform: rotate(-32deg);
  filter: blur(1px);
}`,
    js: `const ballContainer = document.getElementById('ballContainer');
const ball = document.getElementById('ball');
const shadow = document.getElementById('shadow');
const shockwave = document.getElementById('shockwave');

function triggerShockwave(intensity = 1) {
  if (typeof gsap === 'undefined' || !shockwave) return;
  gsap.fromTo(shockwave, 
    { scale: 0.2, opacity: 0.9 * intensity },
    { scale: 1.5 * intensity, opacity: 0, duration: 0.35, ease: "power2.out" }
  );
}

if (typeof gsap !== 'undefined') {
  const tl = gsap.timeline({ repeat: -1 });

  // 1단계 도약 준비
  tl.to(ball, { scaleX: 1.3, scaleY: 0.7, duration: 0.22, ease: "power1.in" }, 0)
    .to(shadow, { scale: 1.25, opacity: 0.95, duration: 0.22 }, 0);

  // 1회차 메가 도약 (-240px)
  tl.to(ball, { scaleX: 0.8, scaleY: 1.25, duration: 0.18, ease: "power2.out" }, 0.22)
    .to(ball, { scaleX: 1.0, scaleY: 1.0, duration: 0.65, ease: "sine.out" }, 0.40)
    .to(ballContainer, { y: -240, duration: 0.85, ease: "power2.out" }, 0.22)
    .to(shadow, { scale: 0.25, opacity: 0.18, duration: 0.85, ease: "power2.out" }, 0.22);

  // 1회차 가속 낙하 및 착지
  tl.to(ball, { scaleX: 0.85, scaleY: 1.18, duration: 0.4, ease: "power2.in" }, 1.25)
    .to(ballContainer, { y: 0, duration: 0.75, ease: "power2.in" }, 1.07)
    .to(shadow, { scale: 1.0, opacity: 0.9, duration: 0.75, ease: "power2.in" }, 1.07)
    .add(() => triggerShockwave(1.0), 1.82)
    .to(ball, { scaleX: 1.45, scaleY: 0.65, duration: 0.09, ease: "power2.out" }, 1.82)
    .to(shadow, { scale: 1.4, opacity: 0.98, duration: 0.09 }, 1.82);

  // 2회차 중간 도약 (-120px)
  tl.to(ball, { scaleX: 0.86, scaleY: 1.16, duration: 0.15, ease: "power2.out" }, 1.91)
    .to(ball, { scaleX: 1.0, scaleY: 1.0, duration: 0.5, ease: "sine.out" }, 2.06)
    .to(ballContainer, { y: -120, duration: 0.65, ease: "power2.out" }, 1.91)
    .to(shadow, { scale: 0.45, opacity: 0.35, duration: 0.65, ease: "power2.out" }, 1.91);

  // 2회차 낙하 및 착지
  tl.to(ball, { scaleX: 0.9, scaleY: 1.12, duration: 0.3, ease: "power2.in" }, 2.75)
    .to(ballContainer, { y: 0, duration: 0.6, ease: "power2.in" }, 2.56)
    .to(shadow, { scale: 1.0, opacity: 0.88, duration: 0.6, ease: "power2.in" }, 2.56)
    .add(() => triggerShockwave(0.65), 3.16)
    .to(ball, { scaleX: 1.28, scaleY: 0.78, duration: 0.08, ease: "power2.out" }, 3.16)
    .to(shadow, { scale: 1.25, opacity: 0.95, duration: 0.08 }, 3.16);

  // 3회차 작은 도약 (-50px)
  tl.to(ball, { scaleX: 0.92, scaleY: 1.09, duration: 0.12, ease: "power2.out" }, 3.24)
    .to(ball, { scaleX: 1.0, scaleY: 1.0, duration: 0.35, ease: "sine.out" }, 3.36)
    .to(ballContainer, { y: -50, duration: 0.48, ease: "power2.out" }, 3.24)
    .to(shadow, { scale: 0.72, opacity: 0.55, duration: 0.48, ease: "power2.out" }, 3.24);

  // 3회차 착지 및 안정화
  tl.to(ballContainer, { y: 0, duration: 0.42, ease: "power2.in" }, 3.72)
    .to(shadow, { scale: 1.0, opacity: 0.85, duration: 0.42, ease: "power2.in" }, 3.72)
    .add(() => triggerShockwave(0.35), 4.14)
    .to(ball, { scaleX: 1.14, scaleY: 0.88, duration: 0.07, ease: "power2.out" }, 4.14);

  // 미세 반동 후 5초 완성
  tl.to(ballContainer, { y: -10, duration: 0.16, ease: "power1.out" }, 4.21)
    .to(ballContainer, { y: 0, duration: 0.15, ease: "power1.in" }, 4.37)
    .to(ball, { scaleX: 1.0, scaleY: 1.0, duration: 0.25, ease: "elastic.out(1, 0.5)" }, 4.52)
    .to({}, { duration: 0.0 }, 5.0);
}`,
  },
  {
    id: 'neon-glow-btn',
    title: '네온 사이버 글로우 버튼',
    category: 'button',
    description: '호버 시 네온 빛이 퍼지며 펄스 효과를 주는 사이버펑크 스타일 버튼',
    tags: ['CSS Animation', 'Glow', 'Hover Effect'],
    html: `<button class="neon-button">
  <span>MOTION START</span>
</button>`,
    css: `.neon-button {
  position: relative;
  padding: 18px 42px;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 3px;
  color: #fff;
  background: #0f1016;
  border: 2px solid #8b5cf6;
  border-radius: 14px;
  cursor: pointer;
  overflow: hidden;
  box-shadow: 0 0 15px rgba(139, 92, 246, 0.4);
  transition: all 0.3s ease;
}

.neon-button::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: conic-gradient(
    transparent,
    transparent,
    transparent,
    #a855f7
  );
  animation: rotateGlow 4s linear infinite;
  z-index: 1;
}

.neon-button::after {
  content: '';
  position: absolute;
  inset: 3px;
  background: #0f1016;
  border-radius: 11px;
  z-index: 2;
}

.neon-button span {
  position: relative;
  z-index: 3;
  background: linear-gradient(90deg, #c084fc, #f472b6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.neon-button:hover {
  transform: translateY(-3px) scale(1.03);
  box-shadow: 0 0 35px rgba(168, 85, 247, 0.8), 0 0 70px rgba(236, 72, 153, 0.4);
}

@keyframes rotateGlow {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}`,
  },
  {
    id: '3d-holo-cube',
    title: '3D 회전 홀로그램 큐브',
    category: '3d',
    description: '순수 CSS 3D 트랜스폼과 퍼스펙티브로 구현한 영롱한 홀로그램 큐브',
    tags: ['CSS 3D', 'Perspective', 'Hologram'],
    html: `<div class="cube-scene">
  <div class="cube">
    <div class="cube-face front">HTML</div>
    <div class="cube-face back">CSS</div>
    <div class="cube-face right">MOTION</div>
    <div class="cube-face left">AI</div>
    <div class="cube-face top">✨</div>
    <div class="cube-face bottom">🚀</div>
  </div>
</div>`,
    css: `.cube-scene {
  width: 140px;
  height: 140px;
  perspective: 600px;
}

.cube {
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  animation: rotateCube 8s infinite linear;
}

.cube-face {
  position: absolute;
  width: 140px;
  height: 140px;
  border: 2px solid rgba(56, 189, 248, 0.6);
  background: rgba(14, 165, 233, 0.15);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 800;
  color: #38bdf8;
  box-shadow: inset 0 0 25px rgba(56, 189, 248, 0.3);
}

.front  { transform: rotateY(  0deg) translateZ(70px); }
.back   { transform: rotateY(180deg) translateZ(70px); }
.right  { transform: rotateY( 90deg) translateZ(70px); }
.left   { transform: rotateY(-90deg) translateZ(70px); }
.top    { transform: rotateX( 90deg) translateZ(70px); }
.bottom { transform: rotateX(-90deg) translateZ(70px); }

@keyframes rotateCube {
  0% { transform: rotateX(0deg) rotateY(0deg); }
  100% { transform: rotateX(360deg) rotateY(360deg); }
}`,
  },
  {
    id: 'orbital-loader',
    title: '네온 오비탈 로딩 링',
    category: 'loader',
    description: '여러 겹의 궤도가 서로 다른 속도로 회전하는 유려한 로딩 인디케이터',
    tags: ['Loader', 'Keyframes', 'Spinner'],
    html: `<div class="loader-container">
  <div class="orbital-ring ring-1"></div>
  <div class="orbital-ring ring-2"></div>
  <div class="orbital-ring ring-3"></div>
  <div class="loader-core"></div>
</div>`,
    css: `.loader-container {
  position: relative;
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.orbital-ring {
  position: absolute;
  border-radius: 50%;
  border: 2px solid transparent;
}

.ring-1 {
  width: 100px;
  height: 100px;
  border-top-color: #ec4899;
  border-right-color: #ec4899;
  animation: spinClockwise 1.8s cubic-bezier(0.5, 0, 0.5, 1) infinite;
}

.ring-2 {
  width: 75px;
  height: 75px;
  border-bottom-color: #8b5cf6;
  border-left-color: #8b5cf6;
  animation: spinCounter 1.3s cubic-bezier(0.5, 0, 0.5, 1) infinite;
}

.ring-3 {
  width: 50px;
  height: 50px;
  border-top-color: #06b6d4;
  animation: spinClockwise 0.8s linear infinite;
}

.loader-core {
  width: 16px;
  height: 16px;
  background: #fff;
  border-radius: 50%;
  box-shadow: 0 0 20px #a855f7;
  animation: corePulse 1s ease-in-out infinite alternate;
}

@keyframes spinClockwise {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes spinCounter {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(-360deg); }
}

@keyframes corePulse {
  0% { transform: scale(0.8); opacity: 0.6; }
  100% { transform: scale(1.3); opacity: 1; }
}`,
  },
  {
    id: 'glitch-typewriter',
    title: '사이버펑크 타이핑 & 글리치',
    category: 'text',
    description: '타자기 효과와 함께 나타나는 디지털 글리치 텍스트 애니메이션',
    tags: ['Typography', 'Typewriter', 'Glitch'],
    html: `<div class="glitch-wrapper">
  <h2 class="glitch-text" data-text="HTML MOTION AI">HTML MOTION AI</h2>
</div>`,
    css: `.glitch-wrapper {
  text-align: center;
}

.glitch-text {
  font-size: 32px;
  font-weight: 900;
  letter-spacing: 4px;
  position: relative;
  color: #fff;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
  overflow: hidden;
  white-space: nowrap;
  border-right: 3px solid #10b981;
  animation: typing 3s steps(14) infinite alternate, blink 0.75s step-end infinite;
}

.glitch-text::before,
.glitch-text::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #0d0f17;
}

.glitch-text::before {
  left: 2px;
  text-shadow: -2px 0 #ff0055;
  clip-path: polygon(0 20%, 100% 20%, 100% 45%, 0 45%);
  animation: glitchAnim 2s infinite linear alternate-reverse;
}

.glitch-text::after {
  left: -2px;
  text-shadow: -2px 0 #00ffff;
  clip-path: polygon(0 60%, 100% 60%, 100% 80%, 0 80%);
  animation: glitchAnim 1.5s infinite linear alternate-reverse;
}

@keyframes typing {
  from { width: 0; }
  to { width: 100%; }
}

@keyframes blink {
  50% { border-color: transparent; }
}

@keyframes glitchAnim {
  0% { transform: translate(0); }
  20% { transform: translate(-2px, 2px); }
  40% { transform: translate(-1px, -2px); }
  60% { transform: translate(2px, 1px); }
  80% { transform: translate(1px, -1px); }
  100% { transform: translate(0); }
}`,
  },
  {
    id: 'liquid-card',
    title: '리퀴드 그러데이션 카드',
    category: 'card',
    description: '물결치듯 흐르는 액체 그러데이션 배경과 인터랙티브 리프트 효과',
    tags: ['Card', 'Liquid Gradient', 'Hover'],
    html: `<div class="liquid-card">
  <div class="liquid-bg"></div>
  <div class="card-content">
    <div class="card-icon">⚡</div>
    <h3>AI Motion Studio</h3>
    <p>HTML & CSS 애니메이션을 실시간으로 조작하고 생성해보세요.</p>
  </div>
</div>`,
    css: `.liquid-card {
  position: relative;
  width: 280px;
  padding: 30px 24px;
  border-radius: 24px;
  background: rgba(18, 20, 29, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.liquid-bg {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(236,72,153,0.3) 0%, rgba(99,102,241,0.2) 50%, transparent 70%);
  animation: liquidFlow 8s ease-in-out infinite alternate;
  z-index: 0;
}

.card-content {
  position: relative;
  z-index: 1;
}

.card-icon {
  font-size: 32px;
  margin-bottom: 12px;
}

.liquid-card h3 {
  margin: 0 0 8px;
  font-size: 20px;
  font-weight: 700;
  color: #fff;
}

.liquid-card p {
  margin: 0;
  font-size: 13px;
  color: #94a3b8;
  line-height: 1.5;
}

.liquid-card:hover {
  transform: translateY(-8px) scale(1.02);
  border-color: rgba(168, 85, 247, 0.5);
}

@keyframes liquidFlow {
  0% { transform: rotate(0deg) scale(1); }
  50% { transform: rotate(180deg) scale(1.2); }
  100% { transform: rotate(360deg) scale(1); }
}`,
  },
  {
    id: 'svg-ink-bloom',
    title: '🖋️ 수묵 먹물 번짐 (SVG 필터)',
    category: '3d',
    description: 'aimotion 기법: feTurbulence와 feDisplacementMap을 활용한 유기적 잉크 확산 효과',
    tags: ['SVG Filter', 'Ink Bloom', 'aimotion-01'],
    html: `<div class="ink-scene">
  <svg class="ink-filters" width="0" height="0">
    <filter id="inkDisplace">
      <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="4" result="noise" />
      <feDisplacementMap in="SourceGraphic" in2="noise" scale="35" xChannelSelector="R" yChannelSelector="G" />
    </filter>
  </svg>
  
  <div class="ink-wrapper">
    <div class="ink-drop main-drop"></div>
    <div class="ink-drop sub-drop-1"></div>
    <div class="ink-drop sub-drop-2"></div>
    <h3 class="ink-title">먹 한 방울</h3>
  </div>
</div>`,
    css: `.ink-scene {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: #f1ede4;
  border-radius: 16px;
  overflow: hidden;
}

.ink-wrapper {
  position: relative;
  width: 240px;
  height: 240px;
  display: flex;
  align-items: center;
  justify-content: center;
  filter: url(#inkDisplace);
}

.ink-drop {
  position: absolute;
  border-radius: 50%;
  background: #1c1917;
  opacity: 0.92;
}

.main-drop {
  width: 80px;
  height: 80px;
  animation: inkSpread 5s cubic-bezier(0.1, 0.8, 0.2, 1) infinite;
}

.sub-drop-1 {
  width: 45px;
  height: 45px;
  top: 40px;
  left: 30px;
  animation: inkSpread 5s cubic-bezier(0.1, 0.8, 0.2, 1) 0.3s infinite;
}

.sub-drop-2 {
  width: 55px;
  height: 55px;
  bottom: 45px;
  right: 35px;
  animation: inkSpread 5s cubic-bezier(0.1, 0.8, 0.2, 1) 0.6s infinite;
}

.ink-title {
  position: relative;
  z-index: 10;
  font-size: 24px;
  font-weight: 900;
  letter-spacing: 6px;
  color: #fff;
  filter: none;
  animation: titleFade 5s ease infinite;
}

@keyframes inkSpread {
  0% { transform: scale(0.1); opacity: 0; }
  15% { transform: scale(1); opacity: 0.95; }
  60% { transform: scale(2.2); opacity: 0.85; }
  90% { transform: scale(2.6); opacity: 0; }
  100% { transform: scale(2.6); opacity: 0; }
}

@keyframes titleFade {
  0%, 15% { opacity: 0; transform: translateY(10px); }
  30%, 75% { opacity: 1; transform: translateY(0); }
  90%, 100% { opacity: 0; transform: translateY(-5px); }
}`,
  },
  {
    id: 'gooey-liquid',
    title: '💧 끈적한 메타볼 유체 (Gooey)',
    category: 'card',
    description: 'aimotion 기법: SVG 매트릭스 필터를 활용하여 액체 방울이 서로 끌어당겨 융합되는 모션',
    tags: ['SVG Gooey', 'Metaballs', 'aimotion-117'],
    html: `<div class="gooey-scene">
  <svg style="position: absolute; width: 0; height: 0;">
    <defs>
      <filter id="goo">
        <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 25 -9" result="goo" />
        <feComposite in="SourceGraphic" in2="goo" operator="atop" />
      </filter>
    </defs>
  </svg>

  <div class="gooey-container">
    <div class="blob core-blob"></div>
    <div class="blob orbit-blob b1"></div>
    <div class="blob orbit-blob b2"></div>
    <div class="blob orbit-blob b3"></div>
  </div>
</div>`,
    css: `.gooey-scene {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: #090a0f;
  border-radius: 16px;
}

.gooey-container {
  position: relative;
  width: 260px;
  height: 260px;
  display: flex;
  align-items: center;
  justify-content: center;
  filter: url(#goo);
}

.blob {
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(135deg, #06b6d4, #3b82f6, #8b5cf6);
}

.core-blob {
  width: 90px;
  height: 90px;
  animation: corePulse 3s ease-in-out infinite;
}

.orbit-blob {
  width: 45px;
  height: 45px;
}

.b1 {
  animation: orbit1 4s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
}

.b2 {
  animation: orbit2 3.2s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
}

.b3 {
  animation: orbit3 4.8s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
}

@keyframes corePulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.15); }
}

@keyframes orbit1 {
  0% { transform: translate(-75px, 0px) scale(0.9); }
  50% { transform: translate(75px, 0px) scale(1.1); }
  100% { transform: translate(-75px, 0px) scale(0.9); }
}

@keyframes orbit2 {
  0% { transform: translate(0px, -70px) scale(1.1); }
  50% { transform: translate(0px, 70px) scale(0.85); }
  100% { transform: translate(0px, -70px) scale(1.1); }
}

@keyframes orbit3 {
  0% { transform: translate(55px, 55px) scale(0.95); }
  50% { transform: translate(-55px, -55px) scale(1.05); }
  100% { transform: translate(55px, 55px) scale(0.95); }
}`,
  },
]
