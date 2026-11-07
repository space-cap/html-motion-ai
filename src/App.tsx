import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles,
  Play,
  RotateCcw,
  Code2,
  Copy,
  Check,
  Wand2,
  Sliders,
  Layers,
  Flame,
  Zap,
  Waves,
  Box,
} from 'lucide-react'
import './App.css'

interface MotionPreset {
  id: string
  name: string
  icon: typeof Flame
  description: string
  code: string
  component: (isPlaying: boolean, speed: number) => React.ReactNode
}

export default function App() {
  const [prompt, setPrompt] = useState('')
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview')
  const [isPlaying, setIsPlaying] = useState(true)
  const [speed, setSpeed] = useState(1)
  const [copied, setCopied] = useState(false)
  const [selectedPreset, setSelectedPreset] = useState<string>('neon-pulse')

  const presets: MotionPreset[] = [
    {
      id: 'neon-pulse',
      name: '네온 펄스 카드',
      icon: Zap,
      description: '은은한 네온 글로우와 부드럽게 호흡하는 인터랙티브 카드',
      code: `<div class="relative group p-8 rounded-2xl bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 border border-purple-500/30 shadow-[0_0_50px_rgba(168,85,247,0.25)] animate-pulse">
  <div class="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-1000"></div>
  <h3 class="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-violet-300">
    Neon Glow Motion
  </h3>
</div>`,
      component: (playing, spd) => (
        <motion.div
          animate={
            playing
              ? {
                  scale: [1, 1.05, 1],
                  boxShadow: [
                    '0 0 20px rgba(168, 85, 247, 0.3)',
                    '0 0 60px rgba(236, 72, 153, 0.6)',
                    '0 0 20px rgba(168, 85, 247, 0.3)',
                  ],
                }
              : {}
          }
          transition={{
            duration: 3 / spd,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="relative p-10 rounded-3xl bg-slate-900/90 border border-purple-500/40 backdrop-blur-xl flex flex-col items-center justify-center text-center max-w-sm cursor-pointer select-none"
        >
          <motion.div
            animate={playing ? { rotate: [0, 360] } : {}}
            transition={{ duration: 12 / spd, repeat: Infinity, ease: 'linear' }}
            className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-pink-500 to-purple-500 flex items-center justify-center mb-5 shadow-lg shadow-purple-500/50"
          >
            <Zap className="w-8 h-8 text-white" />
          </motion.div>
          <h4 className="text-xl font-bold text-white mb-2">Cyberpunk Pulse</h4>
          <p className="text-sm text-slate-400">
            AI가 생성한 네온 글로우 & 스케일 호흡 애니메이션
          </p>
        </motion.div>
      ),
    },
    {
      id: 'spring-bounce',
      name: '스프링 플로팅 큐브',
      icon: Box,
      description: '부드러운 스프링 물리를 적용한 3D 플로팅 효과',
      code: `<div class="p-8 bg-gradient-to-tr from-cyan-900/80 to-blue-900/80 border border-cyan-400/40 rounded-3xl backdrop-blur-md shadow-2xl">
  <div class="w-16 h-16 bg-cyan-400 rounded-2xl rotate-12 flex items-center justify-center shadow-lg shadow-cyan-500/50">
    <!-- Spring Animated Box -->
  </div>
</div>`,
      component: (playing, spd) => (
        <motion.div
          animate={
            playing
              ? {
                  y: [-15, 15, -15],
                  rotateZ: [-5, 5, -5],
                }
              : {}
          }
          transition={{
            duration: 2.5 / spd,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="p-10 rounded-3xl bg-gradient-to-b from-cyan-950/60 to-slate-900 border border-cyan-500/30 flex flex-col items-center justify-center text-center shadow-2xl backdrop-blur-xl max-w-sm"
        >
          <motion.div
            animate={playing ? { rotateY: [0, 180, 360], scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 4 / spd, repeat: Infinity, ease: 'easeInOut' }}
            className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-cyan-400 to-blue-500 flex items-center justify-center mb-5 shadow-xl shadow-cyan-500/40"
          >
            <Box className="w-10 h-10 text-slate-950" />
          </motion.div>
          <h4 className="text-xl font-bold text-cyan-200 mb-2">Spring Physics</h4>
          <p className="text-sm text-slate-400">
            반응형 물리 엔진 기반 인터랙티브 부유 모션
          </p>
        </motion.div>
      ),
    },
    {
      id: 'wave-ripple',
      name: '오로라 웨이브',
      icon: Waves,
      description: '잔잔하게 출렁이는 물결과 그러데이션 컬러 시프트',
      code: `<div class="relative overflow-hidden rounded-3xl bg-slate-900 p-8 border border-emerald-500/30">
  <div class="absolute inset-0 bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-sky-500/20 blur-xl"></div>
  <p class="relative text-white font-semibold">Aurora Wave Effect</p>
</div>`,
      component: (playing, spd) => (
        <div className="relative p-10 rounded-3xl bg-slate-900/90 border border-emerald-500/40 flex flex-col items-center justify-center text-center shadow-2xl max-w-sm overflow-hidden">
          <motion.div
            animate={
              playing
                ? {
                    scale: [1, 1.4, 1],
                    rotate: [0, 180, 360],
                    opacity: [0.3, 0.7, 0.3],
                  }
                : {}
            }
            transition={{ duration: 6 / spd, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -inset-10 bg-gradient-to-tr from-emerald-500/30 via-teal-500/20 to-sky-500/30 blur-2xl -z-10 rounded-full"
          />
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-emerald-400 to-teal-500 flex items-center justify-center mb-5 shadow-lg shadow-emerald-500/40">
            <Waves className="w-8 h-8 text-slate-950" />
          </div>
          <h4 className="text-xl font-bold text-emerald-200 mb-2">Aurora Waves</h4>
          <p className="text-sm text-slate-400">
            부드럽게 회전하며 색이 변하는 파동 시각 효과
          </p>
        </div>
      ),
    },
  ]

  const currentPreset = presets.find((p) => p.id === selectedPreset) || presets[0]

  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentPreset.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault()
    if (!prompt.trim()) return
    // AI 생성 시뮬레이션: 프롬프트에 따라 프리셋 전환
    const nextIdx = (presets.findIndex((p) => p.id === selectedPreset) + 1) % presets.length
    setSelectedPreset(presets[nextIdx].id)
  }

  return (
    <div className="min-h-screen bg-[#0a0c13] text-slate-100 flex flex-col">
      {/* Top Header */}
      <header className="border-b border-slate-800/80 bg-slate-950/60 backdrop-blur-md px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-violet-600 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-violet-500/30">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              HTML Motion AI
            </span>
            <span className="ml-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/30">
              v0.1.0 Beta
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/space-cap/html-motion-ai"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-slate-300 hover:text-white bg-slate-800/70 hover:bg-slate-700/80 px-3 py-1.5 rounded-lg border border-slate-700 transition"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            <span>GitHub</span>
          </a>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: AI Prompt & Preset Selector */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* AI Prompt Card */}
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm shadow-xl">
            <div className="flex items-center gap-2 text-violet-400 text-sm font-semibold mb-3">
              <Wand2 className="w-4 h-4" />
              <span>AI 모션 프롬프트 생성기</span>
            </div>
            <form onSubmit={handleGenerate} className="flex flex-col gap-3">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="예: 클릭하면 튕기면서 빛나는 네온 카드 모션 만들어줘..."
                rows={3}
                className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl p-3 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-violet-500 transition resize-none"
              />
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-medium py-2.5 px-4 rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg shadow-violet-600/20 transition cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                모션 생성하기 (AI)
              </button>
            </form>
          </div>

          {/* Preset Buttons */}
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm shadow-xl flex-1 flex flex-col">
            <div className="flex items-center gap-2 text-slate-300 text-sm font-semibold mb-4">
              <Layers className="w-4 h-4 text-violet-400" />
              <span>모션 프리셋 라이브러리</span>
            </div>
            <div className="flex flex-col gap-2.5">
              {presets.map((preset) => {
                const Icon = preset.icon
                const isSelected = selectedPreset === preset.id
                return (
                  <button
                    key={preset.id}
                    onClick={() => setSelectedPreset(preset.id)}
                    className={`flex items-start gap-3.5 p-3.5 rounded-xl border text-left transition cursor-pointer ${
                      isSelected
                        ? 'bg-violet-950/40 border-violet-500/60 shadow-lg shadow-violet-500/10'
                        : 'bg-slate-950/40 border-slate-800/80 hover:border-slate-700 hover:bg-slate-800/40'
                    }`}
                  >
                    <div
                      className={`p-2 rounded-lg ${
                        isSelected
                          ? 'bg-violet-500 text-white'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-slate-200">
                        {preset.name}
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5 line-clamp-1">
                        {preset.description}
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>

            {/* Motion Controls */}
            <div className="mt-6 pt-5 border-t border-slate-800 flex flex-col gap-4">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5" />
                  재생 속도 ({speed}x)
                </span>
                <input
                  type="range"
                  min="0.5"
                  max="2.5"
                  step="0.25"
                  value={speed}
                  onChange={(e) => setSpeed(parseFloat(e.target.value))}
                  className="w-32 accent-violet-500 cursor-pointer"
                />
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="flex-1 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 flex items-center justify-center gap-1.5 transition cursor-pointer"
                >
                  <Play className={`w-3.5 h-3.5 ${isPlaying ? 'text-emerald-400' : ''}`} />
                  {isPlaying ? '일시정지' : '재생'}
                </button>
                <button
                  onClick={() => {
                    setIsPlaying(true)
                    setSpeed(1)
                  }}
                  className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-400 hover:text-slate-200 transition cursor-pointer"
                  title="초기화"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Live Motion Canvas & Code Inspector */}
        <div className="lg:col-span-7 flex flex-col rounded-2xl bg-slate-900/60 border border-slate-800 overflow-hidden shadow-2xl backdrop-blur-sm">
          {/* Tab Header */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-slate-800 bg-slate-950/40">
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab('preview')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
                  activeTab === 'preview'
                    ? 'bg-violet-600/30 text-violet-300 border border-violet-500/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                라이브 프리뷰
              </button>
              <button
                onClick={() => setActiveTab('code')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'code'
                    ? 'bg-violet-600/30 text-violet-300 border border-violet-500/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Code2 className="w-3.5 h-3.5" />
                생성된 코드
              </button>
            </div>

            {activeTab === 'code' && (
              <button
                onClick={handleCopyCode}
                className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 px-2.5 py-1 rounded-md transition cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-400">복사됨!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>코드 복사</span>
                  </>
                )}
              </button>
            )}
          </div>

          {/* Tab Body */}
          <div className="flex-1 flex items-center justify-center p-8 min-h-[460px] relative">
            <AnimatePresence mode="wait">
              {activeTab === 'preview' ? (
                <motion.div
                  key={currentPreset.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="w-full flex items-center justify-center"
                >
                  {currentPreset.component(isPlaying, speed)}
                </motion.div>
              ) : (
                <motion.div
                  key="code"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full h-full"
                >
                  <pre className="w-full h-full p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 font-mono overflow-auto leading-relaxed select-all">
                    {currentPreset.code}
                  </pre>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Canvas Footer */}
          <div className="px-5 py-3 border-t border-slate-800/80 bg-slate-950/40 flex items-center justify-between text-xs text-slate-500">
            <span>렌더러: Framer Motion + Tailwind CSS</span>
            <span>FPS: 60 | GPU 가속 활성화됨</span>
          </div>
        </div>
      </main>
    </div>
  )
}
