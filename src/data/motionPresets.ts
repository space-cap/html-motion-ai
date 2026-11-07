import type { MotionItem } from '../types/motion'

export const MOTION_PRESETS: MotionItem[] = [
  {
    id: 'orange-bounce',
    title: '🟠 주황색 공 3단 바운스 (5초)',
    category: 'card',
    description: '물리 탄성(Squash & Stretch)과 그림자가 연동된 5초 3회 바운스 모션',
    tags: ['Physics', 'Squash & Stretch', '5s Animation', 'Ball'],
    html: `<div class="stage">
  <div class="floor"></div>
  <div class="ball-shadow"></div>
  <div class="ball-wrapper">
    <div class="ball"></div>
  </div>
</div>`,
    css: `.stage {
  position: relative;
  width: 360px;
  height: 320px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 50px;
}

.floor {
  position: absolute;
  bottom: 50px;
  width: 320px;
  height: 2px;
  background: linear-gradient(90deg, transparent, #f97316, transparent);
  box-shadow: 0 0 16px rgba(249, 115, 22, 0.6);
}

.ball-shadow {
  position: absolute;
  bottom: 44px;
  width: 80px;
  height: 16px;
  background: radial-gradient(ellipse, rgba(0, 0, 0, 0.85) 0%, rgba(249, 115, 22, 0.2) 50%, transparent 75%);
  border-radius: 50%;
  animation: shadowBounce 5s cubic-bezier(0.25, 1, 0.5, 1) infinite;
}

.ball-wrapper {
  position: absolute;
  bottom: 50px;
  animation: ballBounce 5s cubic-bezier(0.28, 0.84, 0.42, 1) infinite;
  transform-origin: center bottom;
}

.ball {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 25%, #ffedd5 0%, #fed7aa 15%, #fb923c 45%, #ea580c 75%, #9a3412 100%);
  box-shadow: 
    inset -6px -6px 14px rgba(124, 45, 18, 0.8),
    inset 4px 4px 10px rgba(255, 255, 255, 0.7),
    0 8px 24px rgba(234, 88, 12, 0.45);
  position: relative;
}

.ball::before {
  content: '';
  position: absolute;
  top: 9px;
  left: 13px;
  width: 18px;
  height: 11px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.7);
  transform: rotate(-35deg);
}

@keyframes ballBounce {
  0% { transform: translateY(0px) scale(1, 1); }
  4% { transform: translateY(0px) scale(1.22, 0.78); }
  8% { transform: translateY(-38px) scale(0.88, 1.15); }
  20% { transform: translateY(-220px) scale(1, 1); }
  35% { transform: translateY(0px) scale(1.28, 0.72); }
  39% { transform: translateY(-25px) scale(0.92, 1.1); }
  49% { transform: translateY(-110px) scale(1, 1); }
  62% { transform: translateY(0px) scale(1.18, 0.84); }
  75% { transform: translateY(-42px) scale(1, 1); }
  82% { transform: translateY(0px) scale(1.09, 0.93); }
  87% { transform: translateY(-8px) scale(0.99, 1.01); }
  92%, 100% { transform: translateY(0px) scale(1, 1); }
}

@keyframes shadowBounce {
  0% { transform: scale(1); opacity: 0.7; }
  4% { transform: scale(1.25); opacity: 0.9; }
  20% { transform: scale(0.28); opacity: 0.15; }
  35% { transform: scale(1.35); opacity: 0.95; }
  49% { transform: scale(0.48); opacity: 0.28; }
  62% { transform: scale(1.2); opacity: 0.88; }
  75% { transform: scale(0.75); opacity: 0.45; }
  82% { transform: scale(1.1); opacity: 0.8; }
  92%, 100% { transform: scale(1); opacity: 0.75; }
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
]
