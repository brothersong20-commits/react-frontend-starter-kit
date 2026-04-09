import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App'
import './index.css'

// 오류 발생 시 화면에 직접 표시 (진단용)
function showError(msg: string) {
  const root = document.getElementById('root')
  if (root) {
    root.innerHTML = `<div style="padding:2rem;font-family:monospace;background:#1a1a1a;color:#ff6b6b;min-height:100vh">
      <h2 style="color:#ff6b6b;margin:0 0 1rem">앱 초기화 오류</h2>
      <pre style="white-space:pre-wrap;font-size:0.85rem;color:#ffa07a">${msg}</pre>
      <p style="color:#888;margin-top:1rem;font-size:0.8rem">브라우저 F12 → Console 탭에서 상세 오류를 확인하세요.</p>
    </div>`
  }
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
