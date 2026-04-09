import { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AppLayout } from '@/components/layout/AppLayout'
import { LandingPage } from '@/pages/LandingPage'

// 내부 페이지는 지연 로딩: 한 페이지 오류가 전체 앱을 막지 않도록 분리
const ZustandPage = lazy(() => import('@/pages/ZustandPage').then((m) => ({ default: m.ZustandPage })))
const QueryPage = lazy(() => import('@/pages/QueryPage').then((m) => ({ default: m.QueryPage })))
const FormPage = lazy(() => import('@/pages/FormPage').then((m) => ({ default: m.FormPage })))
const FlowPage = lazy(() => import('@/pages/FlowPage').then((m) => ({ default: m.FlowPage })))
const ComponentsPage = lazy(() => import('@/pages/ComponentsPage').then((m) => ({ default: m.ComponentsPage })))
const LoginPage = lazy(() => import('@/pages/LoginPage').then((m) => ({ default: m.LoginPage })))

// 지연 로딩 중 표시할 폴백
function PageFallback() {
  return (
    <div className="flex h-full items-center justify-center text-muted-foreground text-sm">
      로딩 중...
    </div>
  )
}

const router = createBrowserRouter([
  { path: '/', element: <LandingPage /> },
  { path: '/login', element: <Suspense fallback={<PageFallback />}><LoginPage /></Suspense> },
  {
    element: <AppLayout />,
    children: [
      { path: 'zustand', element: <Suspense fallback={<PageFallback />}><ZustandPage /></Suspense> },
      { path: 'query', element: <Suspense fallback={<PageFallback />}><QueryPage /></Suspense> },
      { path: 'form', element: <Suspense fallback={<PageFallback />}><FormPage /></Suspense> },
      { path: 'flow', element: <Suspense fallback={<PageFallback />}><FlowPage /></Suspense> },
      { path: 'components', element: <Suspense fallback={<PageFallback />}><ComponentsPage /></Suspense> },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
