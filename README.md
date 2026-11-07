# 🎬 HTML Motion AI

> AI 기반 HTML/CSS/Canvas 인터랙티브 모션 생성 프로젝트

---

## 📌 프로젝트 소개
**HTML Motion AI**는 인공지능을 활용하여 웹 기반 인터랙티브 모션, SVG/CSS 애니메이션 및 Canvas 비주얼 효과를 손쉽게 생성하고 제어할 수 있도록 돕는 웹 애플리케이션입니다.

---

## 🎨 탑재된 스킬 (Built-in Skills)

### 🌟 `aimotion` (웹 그래픽 표현 기법 참고서)
* **출처**: [kstost/cokacmotion](https://github.com/kstost/cokacmotion)
* **데모 수량**: **총 166편**의 엄선된 웹 그래픽 기법 및 구현 노트(`NOTES.md`) 수록
* **분야**: 셰이더(SDF, fBm, 레이마칭), GPU 파티클, 캔버스 2D, SVG 필터, 아날로그 질감(수채화/유화/판화), 키네틱 타이포그래피, 3D 리그 등
* **사용법**:
  ```bash
  # 기법 목록 전체 확인
  node .agents/skills/aimotion/scripts/aimotion.mjs list

  # 원하는 표현 기법 검색 (예: 잉크, 파티클, 마스코트 등)
  node .agents/skills/aimotion/scripts/aimotion.mjs search <키워드>

  # 특정 데모 상세 노트 및 소스 확인
  node .agents/skills/aimotion/scripts/aimotion.mjs show <id> --notes
  ```

---

## 🛠️ 기술 스택
- **Framework**: React 19 + TypeScript
- **Styling & Motion**: Tailwind CSS v4 + Framer Motion + Pure HTML/CSS Keyframes
- **Bundler**: Vite
- **Icons**: Lucide React

---

## 🚀 빠른 시작 (Getting Started)

### 1. 패키지 설치
```bash
npm install
```

### 2. 개발 서버 실행
```bash
npm run dev
```

브라우저에서 `http://localhost:5173`으로 접속하여 실행 화면을 확인할 수 있습니다.

### 3. 주황색 공 3단 바운스 독립 HTML 실행
* `bouncing-ball.html` 파일을 브라우저로 직접 열람 가능!

---

## 📁 디렉토리 구조

```text
html-motion-ai/
├── .agents/skills/aimotion/  # 166편의 웹 모션/그래픽 테크닉 스킬
├── public/                   # 정적 에셋 및 독립 HTML
├── src/                      # React 소스코드
│   ├── components/           # SandboxPreview 등
│   ├── data/                 # 모션 프리셋 라이브러리
│   ├── App.tsx               # 모션 스튜디오 메인
│   └── ...
├── bouncing-ball.html        # 5초 3단 바운스 독립 실행형 파일
└── package.json
```

---

## 📄 라이선스 (License)
이 프로젝트는 MIT 라이선스를 따릅니다.
