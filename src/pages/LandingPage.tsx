import { Link } from 'react-router-dom'
import { ArrowRight, ExternalLink } from 'lucide-react'

const navLinks = [
  { label: 'Zustand', to: '/zustand' },
  { label: 'TanStack Query', to: '/query' },
  { label: 'React Hook Form', to: '/form' },
  { label: 'React Flow', to: '/flow' },
  { label: 'shadcn/ui', to: '/components' },
]

const stack = [
  {
    name: 'React',
    version: '19',
    description: '동시성 렌더링, Server Components 지원',
    badge: 'bg-sky-500/20 text-sky-300 border border-sky-500/30',
  },
  {
    name: 'Vite',
    version: '8',
    description: 'HMR, ESM 네이티브, 번들 최적화',
    badge: 'bg-violet-500/20 text-violet-300 border border-violet-500/30',
  },
  {
    name: 'TypeScript',
    version: '6',
    description: 'Go 기반 컴파일러, strict 기본값',
    badge: 'bg-blue-500/20 text-blue-300 border border-blue-500/30',
  },
  {
    name: 'Tailwind CSS',
    version: '4',
    description: 'CSS-first 설정, @import 방식',
    badge: 'bg-teal-500/20 text-teal-300 border border-teal-500/30',
  },
  {
    name: 'shadcn/ui',
    description: '복사 붙여넣기 컴포넌트, Radix UI 기반',
    badge: 'bg-zinc-500/20 text-zinc-300 border border-zinc-500/30',
  },
  {
    name: 'React Router',
    version: '7',
    description: 'URL 기반 클라이언트 라우팅',
    badge: 'bg-red-500/20 text-red-300 border border-red-500/30',
  },
  {
    name: 'Zustand',
    version: '5',
    description: '가볍고 간결한 클라이언트 상태 관리',
    badge: 'bg-orange-500/20 text-orange-300 border border-orange-500/30',
  },
  {
    name: 'TanStack Query',
    version: '5',
    description: '캐싱, 리페칭, 로딩/에러 상태 관리',
    badge: 'bg-rose-500/20 text-rose-300 border border-rose-500/30',
  },
  {
    name: 'React Hook Form',
    version: '7',
    description: '비제어 컴포넌트 방식 폼 상태 관리',
    badge: 'bg-pink-500/20 text-pink-300 border border-pink-500/30',
  },
  {
    name: 'Zod',
    version: '4',
    description: 'TypeScript-first 스키마 유효성 검증',
    badge: 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30',
  },
  {
    name: '@xyflow/react',
    version: '12',
    description: '드래그, 연결, 인터랙티브 플로우 차트',
    badge: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30',
  },
  {
    name: 'lucide-react',
    version: '1',
    description: 'Tree-shakeable 오픈소스 아이콘',
    badge: 'bg-amber-500/20 text-amber-300 border border-amber-500/30',
  },
]

export function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#05050f] text-white">

      {/* ── Gradient orbs (background depth) ── */}
      <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-60 -top-20 h-[700px] w-[700px] rounded-full bg-violet-600/25 blur-[140px]" />
        <div className="absolute -right-60 top-10 h-[600px] w-[600px] rounded-full bg-blue-600/20 blur-[130px]" />
        <div className="absolute bottom-0 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-cyan-500/15 blur-[120px]" />
      </div>

      {/* ── Top Nav (glass) ── */}
      <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-white/[0.04] backdrop-blur-2xl">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <span className="text-sm font-semibold tracking-tight text-white">
            React Starter Kit
          </span>
          <nav className="hidden items-center gap-0.5 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="rounded-lg px-3 py-1.5 text-sm text-white/50 transition-all duration-150 hover:bg-white/[0.08] hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="relative flex flex-col items-center px-6 pb-24 pt-32 text-center">

        {/* Version pill */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.06] px-4 py-1.5 backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          <span className="text-xs font-medium text-white/60 tracking-wide">
            React 19 &nbsp;·&nbsp; Vite 8 &nbsp;·&nbsp; TypeScript 6
          </span>
        </div>

        {/* Title */}
        <h1
          className="mb-5 text-6xl font-bold tracking-tight md:text-7xl"
          style={{
            background: 'linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,0.55) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          React Starter Kit
        </h1>

        {/* Subtitle */}
        <p className="mb-10 max-w-sm text-base leading-relaxed text-white/40">
          최신 React 생태계를 한 곳에서 탐색하세요.
          <br />
          각 라이브러리의 실제 동작을 직접 확인해보세요.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/zustand"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-2.5 text-sm font-semibold text-black transition-all duration-150 hover:bg-white/90 active:scale-[0.98]"
          >
            탐색 시작하기
            <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-white/[0.15] bg-white/[0.06] px-6 py-2.5 text-sm font-semibold text-white/80 backdrop-blur-sm transition-all duration-150 hover:border-white/25 hover:bg-white/[0.10] hover:text-white active:scale-[0.98]"
          >
            <ExternalLink className="h-4 w-4" />
            GitHub
          </a>
        </div>
      </section>

      {/* ── Tech Stack ── */}
      <section className="relative mx-auto max-w-6xl px-6 pb-32">
        <p className="mb-10 text-center text-xs font-semibold uppercase tracking-[0.2em] text-white/30">
          기술 스택
        </p>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {stack.map((item) => (
            <div
              key={item.name}
              className="group rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 backdrop-blur-sm transition-all duration-200 hover:border-white/[0.16] hover:bg-white/[0.06]"
            >
              <div className="mb-3 flex items-center justify-between gap-2">
                <span className="text-sm font-semibold text-white/90">{item.name}</span>
                {item.version && (
                  <span className={`rounded-md px-2 py-0.5 text-[10px] font-semibold ${item.badge}`}>
                    v{item.version}
                  </span>
                )}
              </div>
              <p className="text-xs leading-relaxed text-white/40">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  )
}
