import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles,
  RotateCcw,
  Code2,
  Copy,
  Check,
  Wand2,
  Download,
  ExternalLink,
  Eye,
  Layers,
  Sun,
  Moon,
  Grid,
} from 'lucide-react'
import SandboxPreview from './components/SandboxPreview'
import { MOTION_PRESETS } from './data/motionPresets'
import './App.css'

export default function App() {
  const [selectedPresetId, setSelectedPresetId] = useState<string>('orange-bounce')
  const [prompt, setPrompt] = useState('')
  const [activeTab, setActiveTab] = useState<'preview' | 'editor'>('preview')
  const [bgTheme, setBgTheme] = useState<'dark' | 'light' | 'grid'>('dark')
  const [copied, setCopied] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  // 현재 프리셋
  const currentPreset = useMemo(() => {
    return (
      MOTION_PRESETS.find((p) => p.id === selectedPresetId) || MOTION_PRESETS[0]
    )
  }, [selectedPresetId])

  // 사용자가 실시간 편집 가능한 HTML/CSS/JS 상태
  const [editableHtml, setEditableHtml] = useState(currentPreset.html)
  const [editableCss, setEditableCss] = useState(currentPreset.css)
  const [editableJs, setEditableJs] = useState(currentPreset.js || '')

  // 프리셋 변경 시 에디터 내용 동기화
  const handleSelectPreset = (id: string) => {
    setSelectedPresetId(id)
    const preset = MOTION_PRESETS.find((p) => p.id === id)
    if (preset) {
      setEditableHtml(preset.html)
      setEditableCss(preset.css)
      setEditableJs(preset.js || '')
    }
  }

  // 원래 프리셋 코드로 리셋
  const handleResetCode = () => {
    setEditableHtml(currentPreset.html)
    setEditableCss(currentPreset.css)
    setEditableJs(currentPreset.js || '')
  }

  // 코드 복사
  const handleCopyCode = () => {
    const jsBlock = editableJs ? `\n\n<script>\n${editableJs}\n</script>` : ''
    const fullCode = `<!-- ${currentPreset.title} -->\n${editableHtml}\n\n<style>\n${editableCss}\n</style>${jsBlock}`
    navigator.clipboard.writeText(fullCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // HTML 파일 다운로드 (Export)
  const handleExportHtml = () => {
    const fullHtml = `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${currentPreset.title}</title>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      width: 100vw;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #0d0f17;
      color: #f8fafc;
      font-family: system-ui, -apple-system, sans-serif;
      overflow: hidden;
    }
    ${editableCss}
  </style>
</head>
<body>
  ${editableHtml}
  <script>
    try {
      ${editableJs}
    } catch(e) {
      console.error(e);
    }
  </script>
</body>
</html>`

    const blob = new Blob([fullHtml], { type: 'text/html;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${currentPreset.id}-motion.html`
    a.click()
    URL.revokeObjectURL(url)
  }

  // 프롬프트 기반 생성 (시뮬레이션)
  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault()
    if (!prompt.trim()) return

    const lower = prompt.toLowerCase()
    let target = MOTION_PRESETS[0]

    if (lower.includes('공') || lower.includes('주황') || lower.includes('바운스')) {
      target = MOTION_PRESETS.find((p) => p.id === 'orange-bounce') || MOTION_PRESETS[0]
    } else if (lower.includes('버튼') || lower.includes('네온')) {
      target = MOTION_PRESETS.find((p) => p.id === 'neon-glow-btn') || MOTION_PRESETS[0]
    } else if (lower.includes('큐브') || lower.includes('3d') || lower.includes('입체')) {
      target = MOTION_PRESETS.find((p) => p.id === '3d-holo-cube') || MOTION_PRESETS[0]
    } else if (lower.includes('로딩') || lower.includes('스피너') || lower.includes('링')) {
      target = MOTION_PRESETS.find((p) => p.id === 'orbital-loader') || MOTION_PRESETS[0]
    } else if (lower.includes('글리치') || lower.includes('타이핑') || lower.includes('텍스트')) {
      target = MOTION_PRESETS.find((p) => p.id === 'glitch-typewriter') || MOTION_PRESETS[0]
    } else {
      // 순환 선택
      const currentIdx = MOTION_PRESETS.findIndex((p) => p.id === selectedPresetId)
      target = MOTION_PRESETS[(currentIdx + 1) % MOTION_PRESETS.length]
    }

    handleSelectPreset(target.id)
  }

  // 카테고리 필터링
  const filteredPresets = useMemo(() => {
    if (selectedCategory === 'all') return MOTION_PRESETS
    return MOTION_PRESETS.filter((p) => p.category === selectedCategory)
  }, [selectedCategory])

  return (
    <div className="min-h-screen bg-[#0a0c13] text-slate-100 flex flex-col font-sans">
      {/* Top Header */}
      <header className="border-b border-slate-800/80 bg-slate-950/70 backdrop-blur-md px-6 py-3.5 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-orange-500 via-rose-500 to-violet-600 flex items-center justify-center shadow-lg shadow-orange-500/20">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                HTML Motion AI
              </span>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-orange-500/15 text-orange-400 border border-orange-500/30">
                v0.2.0 Studio
              </span>
            </div>
            <p className="text-[11px] text-slate-400">인터랙티브 웹 모션 실시간 생성 & 에디터</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/bouncing-ball.html"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs font-semibold text-orange-300 bg-orange-950/40 hover:bg-orange-900/60 px-3 py-1.5 rounded-lg border border-orange-500/40 transition"
          >
            <span>🟠 주황색 공 모션 전체화면</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <a
            href="https://github.com/space-cap/html-motion-ai"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs text-slate-300 hover:text-white bg-slate-800/70 hover:bg-slate-700/80 px-3 py-1.5 rounded-lg border border-slate-700 transition"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            <span>GitHub</span>
          </a>
        </div>
      </header>

      {/* Main Studio Grid */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-5 grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: AI Prompt & Motion Library */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {/* Prompt Generator Card */}
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm shadow-xl">
            <div className="flex items-center gap-2 text-orange-400 text-xs font-semibold mb-2.5">
              <Wand2 className="w-3.5 h-3.5" />
              <span>AI 자연어 모션 생성 프롬프트</span>
            </div>
            <form onSubmit={handleGenerate} className="flex flex-col gap-2.5">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="예: 주황색 공이 세 번 튀는 모션 만들어줘 / 네온 3D 큐브..."
                rows={2}
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-orange-500 transition resize-none"
              />
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 to-rose-600 hover:from-orange-400 hover:to-rose-500 text-white font-semibold py-2 px-3 rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 transition cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                모션 생성 및 탐색
              </button>
            </form>
          </div>

          {/* Library & Categories */}
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm shadow-xl flex-1 flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1.5 text-slate-300 text-xs font-semibold">
                <Layers className="w-3.5 h-3.5 text-orange-400" />
                <span>HTML 모션 프리셋 ({filteredPresets.length})</span>
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex gap-1.5 overflow-x-auto pb-2.5 mb-2 scrollbar-none text-[11px]">
              {[
                { id: 'all', label: '전체' },
                { id: 'card', label: '공/카드' },
                { id: 'button', label: '버튼' },
                { id: '3d', label: '3D 비주얼' },
                { id: 'loader', label: '로딩' },
                { id: 'text', label: '텍스트' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-2.5 py-1 rounded-lg transition whitespace-nowrap cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-orange-500/20 text-orange-300 border border-orange-500/40 font-semibold'
                      : 'bg-slate-950/60 text-slate-400 border border-slate-800/80 hover:text-slate-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Presets List */}
            <div className="flex flex-col gap-2 overflow-y-auto max-h-[380px] pr-1">
              {filteredPresets.map((preset) => {
                const isSelected = selectedPresetId === preset.id
                return (
                  <button
                    key={preset.id}
                    onClick={() => handleSelectPreset(preset.id)}
                    className={`flex items-start gap-3 p-3 rounded-xl border text-left transition cursor-pointer ${
                      isSelected
                        ? 'bg-orange-950/30 border-orange-500/50 shadow-md shadow-orange-500/10'
                        : 'bg-slate-950/40 border-slate-800/70 hover:border-slate-700 hover:bg-slate-800/30'
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-sm font-bold ${
                        isSelected
                          ? 'bg-gradient-to-tr from-orange-500 to-rose-500 text-white shadow-sm'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {preset.id === 'orange-bounce' ? '🟠' : '⚡'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-slate-200 truncate">
                        {preset.title}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                        {preset.description}
                      </div>
                      <div className="flex gap-1 mt-1.5">
                        {preset.tags.slice(0, 2).map((t) => (
                          <span
                            key={t}
                            className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800/80 text-slate-400"
                          >
                            #{t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Live Sandbox & Realtime Code Editor */}
        <div className="lg:col-span-7 flex flex-col rounded-2xl bg-slate-900/60 border border-slate-800 overflow-hidden shadow-2xl backdrop-blur-sm">
          {/* Studio Header Toolbar */}
          <div className="flex flex-wrap items-center justify-between px-4 py-2.5 border-b border-slate-800 bg-slate-950/50 gap-2">
            {/* View Mode Tabs */}
            <div className="flex gap-1 bg-slate-900/80 p-0.5 rounded-lg border border-slate-800">
              <button
                onClick={() => setActiveTab('preview')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition cursor-pointer ${
                  activeTab === 'preview'
                    ? 'bg-orange-500 text-white shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                라이브 프리뷰
              </button>
              <button
                onClick={() => setActiveTab('editor')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition cursor-pointer ${
                  activeTab === 'editor'
                    ? 'bg-orange-500 text-white shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Code2 className="w-3.5 h-3.5" />
                실시간 코드 에디터
              </button>
            </div>

            {/* Background Theme Selector */}
            <div className="flex items-center gap-1 bg-slate-900/80 p-0.5 rounded-lg border border-slate-800">
              <button
                onClick={() => setBgTheme('dark')}
                title="다크 배경"
                className={`p-1.5 rounded-md transition cursor-pointer ${
                  bgTheme === 'dark' ? 'bg-slate-800 text-orange-400' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                <Moon className="w-3 h-3" />
              </button>
              <button
                onClick={() => setBgTheme('grid')}
                title="그리드 격자 배경"
                className={`p-1.5 rounded-md transition cursor-pointer ${
                  bgTheme === 'grid' ? 'bg-slate-800 text-orange-400' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                <Grid className="w-3 h-3" />
              </button>
              <button
                onClick={() => setBgTheme('light')}
                title="라이트 배경"
                className={`p-1.5 rounded-md transition cursor-pointer ${
                  bgTheme === 'light' ? 'bg-slate-800 text-orange-400' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                <Sun className="w-3 h-3" />
              </button>
            </div>

            {/* Action Buttons: Reset, Copy, Export */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleResetCode}
                title="원본 코드로 리셋"
                className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition cursor-pointer border border-slate-700/60"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleCopyCode}
                className="flex items-center gap-1 text-xs text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 px-2.5 py-1.5 rounded-lg border border-slate-700/60 transition cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">복사됨!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>코드 복사</span>
                  </>
                )}
              </button>
              <button
                onClick={handleExportHtml}
                className="flex items-center gap-1.5 text-xs font-semibold text-white bg-gradient-to-r from-orange-500 to-rose-600 hover:from-orange-400 hover:to-rose-500 px-3 py-1.5 rounded-lg shadow-sm transition cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>HTML 내보내기</span>
              </button>
            </div>
          </div>

          {/* Studio Body: Preview or Code Editor */}
          <div className="flex-1 p-4 flex flex-col min-h-[460px]">
            <AnimatePresence mode="wait">
              {activeTab === 'preview' ? (
                <motion.div
                  key="preview"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 flex flex-col"
                >
                  <SandboxPreview
                    html={editableHtml}
                    css={editableCss}
                    js={editableJs}
                    bgTheme={bgTheme}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="editor"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3"
                >
                  {/* HTML Editor */}
                  <div className="flex flex-col rounded-xl border border-slate-800 bg-slate-950 overflow-hidden">
                    <div className="px-3 py-1.5 bg-slate-900 border-b border-slate-800 text-[11px] font-mono text-orange-400 flex items-center justify-between">
                      <span>HTML (구조)</span>
                      <span className="text-slate-500 text-[10px]">수정 시 실시간 반영</span>
                    </div>
                    <textarea
                      value={editableHtml}
                      onChange={(e) => setEditableHtml(e.target.value)}
                      className="flex-1 p-3 bg-transparent text-xs font-mono text-slate-300 focus:outline-none resize-none leading-relaxed"
                      spellCheck={false}
                    />
                  </div>

                  {/* CSS Editor */}
                  <div className="flex flex-col rounded-xl border border-slate-800 bg-slate-950 overflow-hidden">
                    <div className="px-3 py-1.5 bg-slate-900 border-b border-slate-800 text-[11px] font-mono text-cyan-400 flex items-center justify-between">
                      <span>CSS (@keyframes & 스타일)</span>
                      <span className="text-slate-500 text-[10px]">수정 시 실시간 반영</span>
                    </div>
                    <textarea
                      value={editableCss}
                      onChange={(e) => setEditableCss(e.target.value)}
                      className="flex-1 p-3 bg-transparent text-xs font-mono text-slate-300 focus:outline-none resize-none leading-relaxed"
                      spellCheck={false}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Canvas Status Footer */}
          <div className="px-4 py-2 border-t border-slate-800/80 bg-slate-950/40 flex items-center justify-between text-[11px] text-slate-500">
            <span>엔진: Pure HTML5/CSS3 키프레임 샌드박스</span>
            <span>선택된 모션: {currentPreset.title}</span>
          </div>
        </div>
      </main>
    </div>
  )
}
