export interface MotionItem {
  id: string
  title: string
  category: 'button' | 'loader' | '3d' | 'text' | 'card'
  description: string
  html: string
  css: string
  js?: string
  tags: string[]
}

