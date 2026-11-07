export interface GeneratedMotion {
  title: string
  description: string
  html: string
  css: string
  js?: string
  tags?: string[]
}

const SYSTEM_INSTRUCTION = `당신은 세계 최고 수준의 웹 프론트엔드 모션 그래픽 및 CSS 애니메이션 전문가입니다.
사용자의 자연어 요청을 분석하여, 외부 의존성(라이브러리) 없이 순수 HTML5와 CSS3(@keyframes), 그리고 필요하다면 바닐라 JavaScript만으로 브라우저에서 환상적으로 움직이는 애니메이션 모션 코드를 생성해야 합니다.

반드시 아래와 같은 순수한 JSON 형식만 반환하세요 (마크다운 백틱 없이 순수 JSON 문자열):
{
  "title": "모션의 매력적인 한글 이름",
  "description": "어떤 기법과 연출이 적용되었는지 1~2문장 한글 설명",
  "html": "<div class=\\"...\\">...</div>",
  "css": "/* CSS 애니메이션 코드, @keyframes 필수 */",
  "js": "/* 필요 시 바닐라 JS 코드, 없으면 빈 문자열 */",
  "tags": ["키워드1", "키워드2"]
}

주의사항:
1. HTML 태그 내부 요소들은 중앙 정렬된 부모 컨테이너(너비 360px~480px) 안에서 잘 어우러지도록 크기를 지정하세요.
2. CSS에는 부드럽고 완성도 높은 @keyframes 애니메이션과 화려한 그러데이션, 그림자, 또는 변형(transform)을 적극 활용하세요.
3. 바닥 그림자, 탄성(Squash & Stretch), 네온 글로우 등 디테일한 비주얼을 신경 써주세요.`

export async function generateMotionWithGemini(
  prompt: string,
  apiKey: string,
  modelName: string = 'gemini-1.5-flash'
): Promise<GeneratedMotion> {
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`

  const requestBody = {
    contents: [
      {
        parts: [
          {
            text: `${SYSTEM_INSTRUCTION}\n\n사용자 요청: "${prompt}"`,
          },
        ],
      },
    ],
    generationConfig: {
      temperature: 0.7,
      responseMimeType: 'application/json',
    },
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(
      errorData?.error?.message || `API 호출 실패 (상태 코드: ${response.status})`
    )
  }

  const data = await response.json()
  const candidateText =
    data?.candidates?.[0]?.content?.parts?.[0]?.text || ''

  try {
    // 혹시 백틱 마크다운이 섞여있다면 제거
    const cleanJson = candidateText
      .replace(/^```json\s*/i, '')
      .replace(/^```\s*/i, '')
      .replace(/\s*```$/i, '')
      .trim()

    return JSON.parse(cleanJson) as GeneratedMotion
  } catch {
    throw new Error('AI 응답을 JSON 형식으로 해석하지 못했습니다. 다시 시도해 주세요.')
  }
}

