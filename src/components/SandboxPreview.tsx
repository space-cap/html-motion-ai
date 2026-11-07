import { useMemo } from 'react'

interface SandboxPreviewProps {
  html: string
  css: string
  js?: string
  bgTheme?: 'dark' | 'light' | 'grid'
}

export default function SandboxPreview({
  html,
  css,
  js = '',
  bgTheme = 'dark',
}: SandboxPreviewProps) {
  const srcDoc = useMemo(() => {
    const bgStyles =
      bgTheme === 'dark'
        ? 'background: #0d0f17; color: #f8fafc;'
        : bgTheme === 'light'
        ? 'background: #f8fafc; color: #0f172a;'
        : `background-color: #0f111a;
           background-image: linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
           background-size: 20px 20px;
           color: #f8fafc;`

    return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    html, body {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      ${bgStyles}
    }
    ${css}
  </style>
</head>
<body>
  ${html}
  <script>
    try {
      ${js}
    } catch (e) {
      console.error('Motion Script Error:', e);
    }
  </script>
</body>
</html>`
  }, [html, css, js, bgTheme])

  return (
    <div className="w-full h-full min-h-[380px] flex items-center justify-center rounded-xl overflow-hidden border border-slate-800 bg-slate-950/60 shadow-inner">
      <iframe
        title="HTML Motion Sandbox"
        srcDoc={srcDoc}
        sandbox="allow-scripts"
        className="w-full h-full min-h-[420px] border-none"
      />
    </div>
  )
}

