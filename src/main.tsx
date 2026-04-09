import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App'
import './index.css'

// 오류 발생 시 화면에 직접 표시 (진단용) — innerHTML 대신 DOM API 사용하여 XSS 방지
function showError(msg: string) {
  const root = document.getElementById('root')
  if (!root) return
  root.innerHTML = ''

  const wrapper = document.createElement('div')
  wrapper.setAttribute('style', 'padding:2rem;font-family:monospace;background:#1a1a1a;color:#ff6b6b;min-height:100vh')

  const title = document.createElement('h2')
  title.setAttribute('style', 'color:#ff6b6b;margin:0 0 1rem')
  title.textContent = '앱 초기화 오류'

  const pre = document.createElement('pre')
  pre.setAttribute('style', 'white-space:pre-wrap;font-size:0.85rem;color:#ffa07a')
  pre.textContent = msg // textContent → HTML 자동 이스케이프

  const hint = document.createElement('p')
  hint.setAttribute('style', 'color:#888;margin-top:1rem;font-size:0.8rem')
  hint.textContent = '브라우저 F12 → Console 탭에서 상세 오류를 확인하세요.'

  wrapper.appendChild(title)
  wrapper.appendChild(pre)
  wrapper.appendChild(hint)
  root.appendChild(wrapper)
}

window.addEventListener('error', (e) => {
  showError(`${e.message}\n\n파일: ${e.filename}\n줄: ${e.lineno}`)
})

window.addEventListener('unhandledrejection', (e) => {
  showError(String(e.reason))
})

// 첫 로드 시 저장된 테마 적용 (FOUC 방지)
try {
  const saved = JSON.parse(localStorage.getItem('rsk-theme') ?? '{}')
  if (saved?.state?.isDark !== false) {
    document.documentElement.classList.add('dark')
  }
} catch {
  document.documentElement.classList.add('dark')
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
    },
  },
})

const rootEl = document.getElementById('root')
if (!rootEl) {
  showError('#root 엘리먼트를 찾을 수 없습니다. index.html을 확인하세요.')
} else {
  createRoot(rootEl).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </StrictMode>
  )
}
