import { Link } from 'react-router-dom'
import { ArrowRight, ExternalLink, Sun, Moon, ArrowUpRight } from 'lucide-react'
import { useThemeStore } from '@/store/useThemeStore'

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
    version: '19.2.5',
    description: '동시성 렌더링, Server Components 지원',
    simple: '화면을 부품처럼 나눠서 만드는 UI 라이브러리예요. 버튼 하나, 카드 하나가 모두 독립적인 컴포넌트입니다.',
    badge: { dark: 'bg-sky-500/20 text-sky-300 border border-sky-500/30', light: 'bg-sky-100 text-sky-700 border border-sky-200' },
    href: 'https://react.dev',
    internal: false,
  },
  {
    name: 'Vite',
    version: '8.0.8',
    description: 'HMR, ESM 네이티브, 번들 최적화',
    simple: '코드를 저장하면 브라우저에 즉시 반영되는 초고속 개발 환경이에요. 기다림 없이 바로 결과를 확인할 수 있어요.',
    badge: { dark: 'bg-violet-500/20 text-violet-300 border border-violet-500/30', light: 'bg-violet-100 text-violet-700 border border-violet-200' },
    href: 'https://vitejs.dev',
    internal: false,
  },
  {
    name: 'TypeScript',
    version: '6.0.2',
    description: 'Go 기반 컴파일러, strict 기본값',
    simple: '오타나 잘못된 타입을 코드 작성 시점에 잡아주는 JavaScript 확장판이에요. 실수를 미리 예방해줘요.',
    badge: { dark: 'bg-blue-500/20 text-blue-300 border border-blue-500/30', light: 'bg-blue-100 text-blue-700 border border-blue-200' },
    href: 'https://www.typescriptlang.org',
    internal: false,
  },
  {
    name: 'Tailwind CSS',
    version: '4.2.2',
    description: 'CSS-first 설정, @import 방식',
    simple: 'class 이름만으로 스타일을 입히는 CSS 도구예요. 별도 CSS 파일 없이 HTML에서 바로 디자인할 수 있어요.',
    badge: { dark: 'bg-teal-500/20 text-teal-300 border border-teal-500/30', light: 'bg-teal-100 text-teal-700 border border-teal-200' },
    href: 'https://tailwindcss.com',
    internal: false,
  },
  {
    name: 'shadcn/ui',
    version: undefined,
    description: '복사 붙여넣기 컴포넌트, Radix UI 기반',
    simple: '버튼, 카드, 모달 등 완성된 UI 컴포넌트를 복사해서 내 프로젝트에 붙여넣기만 하면 돼요.',
    badge: { dark: 'bg-zinc-500/20 text-zinc-300 border border-zinc-500/30', light: 'bg-zinc-100 text-zinc-600 border border-zinc-200' },
    href: '/components',
    internal: true,
  },
  {
    name: 'React Router',
    version: '7.14.0',
    description: 'URL 기반 클라이언트 라우팅',
    simple: 'URL 주소에 따라 다른 화면을 보여주는 페이지 이동 관리자예요. /home, /about 같은 경로 처리를 담당해요.',
    badge: { dark: 'bg-red-500/20 text-red-300 border border-red-500/30', light: 'bg-red-100 text-red-700 border border-red-200' },
    href: 'https://reactrouter.com',
    internal: false,
  },
  {
    name: 'Zustand',
    version: '5.0.12',
    description: '가볍고 간결한 클라이언트 상태 관리',
    simple: '여러 컴포넌트가 공유해야 하는 데이터를 한 곳에서 관리하는 저장소예요. 장바구니, 로그인 정보 등에 활용해요.',
    badge: { dark: 'bg-orange-500/20 text-orange-300 border border-orange-500/30', light: 'bg-orange-100 text-orange-700 border border-orange-200' },
    href: '/zustand',
    internal: true,
  },
  {
    name: 'TanStack Query',
    version: '5.97.0',
    description: '캐싱, 리페칭, 로딩/에러 상태 관리',
    simple: '서버에서 데이터를 가져올 때 로딩 중, 에러, 재시도를 자동으로 처리해줘요. API 연동이 훨씬 쉬워져요.',
    badge: { dark: 'bg-rose-500/20 text-rose-300 border border-rose-500/30', light: 'bg-rose-100 text-rose-700 border border-rose-200' },
    href: '/query',
    internal: true,
  },
  {
    name: 'React Hook Form',
    version: '7.72.1',
    description: '비제어 컴포넌트 방식 폼 상태 관리',
    simple: '이름, 이메일 등 입력 폼을 쉽게 만들고, 값을 효율적으로 관리해줘요. 불필요한 리렌더링 없이 빠르게 동작해요.',
    badge: { dark: 'bg-pink-500/20 text-pink-300 border border-pink-500/30', light: 'bg-pink-100 text-pink-700 border border-pink-200' },
    href: '/form',
    internal: true,
  },
  {
    name: 'Zod',
    version: '4.3.6',
    description: 'TypeScript-first 스키마 유효성 검증',
    simple: '입력값이 올바른 형식인지 규칙을 정의하고 자동으로 검사해줘요. 이메일 형식, 최소 글자 수 같은 검증에 써요.',
    badge: { dark: 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30', light: 'bg-indigo-100 text-indigo-700 border border-indigo-200' },
    href: '/form',
    internal: true,
  },
  {
    name: '@xyflow/react',
    version: '12.10.2',
    description: '드래그, 연결, 인터랙티브 플로우 차트',
    simple: '노드와 선을 드래그로 연결하는 다이어그램 에디터를 만드는 라이브러리예요. 플로우차트나 워크플로우 UI에 써요.',
    badge: { dark: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30', light: 'bg-emerald-100 text-emerald-700 border border-emerald-200' },
    href: '/flow',
    internal: true,
  },
  {
    name: 'lucide-react',
    version: '1.8.0',
    description: 'Tree-shakeable 오픈소스 아이콘',
    simple: '깔끔한 디자인의 아이콘을 React 컴포넌트처럼 바로 가져다 쓸 수 있어요. 사용하지 않는 아이콘은 번들에 포함되지 않아요.',
    badge: { dark: 'bg-amber-500/20 text-amber-300 border border-amber-500/30', light: 'bg-amber-100 text-amber-700 border border-amber-200' },
    href: '/components',
    internal: true,
  },
]

// 이럴 때 이렇게 활용하세요 — 단계별 가이드 데이터
const usageSteps = [
  {
    step: '01',
    title: '여러 페이지에서 같은 데이터를 써야 할 때',
    when: '로그인 사용자 이름을 헤더, 마이페이지, 댓글에 모두 보여줘야 해요',
    how: 'Zustand 스토어를 만들면 props 없이 어디서든 꺼내 쓸 수 있습니다',
    link: '/zustand',
    label: 'Zustand 예시 보기',
    color: { dark: 'border-orange-500/20 bg-orange-500/5', light: 'border-orange-200 bg-orange-50' },
    badge: { dark: 'bg-orange-500/20 text-orange-300', light: 'bg-orange-100 text-orange-700' },
  },
  {
    step: '02',
    title: 'API에서 데이터를 가져와야 할 때',
    when: '서버에서 상품 목록, 유저 정보를 불러오고 로딩·에러도 처리하고 싶어요',
    how: 'TanStack Query의 useQuery로 API 연동 + 캐싱을 자동화하세요',
    link: '/query',
    label: 'TanStack Query 예시 보기',
    color: { dark: 'border-rose-500/20 bg-rose-500/5', light: 'border-rose-200 bg-rose-50' },
    badge: { dark: 'bg-rose-500/20 text-rose-300', light: 'bg-rose-100 text-rose-700' },
  },
  {
    step: '03',
    title: '입력 폼을 만들어야 할 때',
    when: '회원가입, 상품 등록 폼을 만드는데 유효성 검사도 넣고 싶어요',
    how: 'React Hook Form + Zod로 폼 상태와 검증 규칙을 동시에 선언하세요',
    link: '/form',
    label: 'Form 예시 보기',
    color: { dark: 'border-pink-500/20 bg-pink-500/5', light: 'border-pink-200 bg-pink-50' },
    badge: { dark: 'bg-pink-500/20 text-pink-300', light: 'bg-pink-100 text-pink-700' },
  },
  {
    step: '04',
    title: '프로세스 흐름을 시각화해야 할 때',
    when: '업무 흐름, AI 파이프라인, 조직도를 다이어그램으로 보여주고 싶어요',
    how: '@xyflow/react로 드래그 가능한 노드-엣지 다이어그램을 만드세요',
    link: '/flow',
    label: 'Flow 예시 보기',
    color: { dark: 'border-emerald-500/20 bg-emerald-500/5', light: 'border-emerald-200 bg-emerald-50' },
    badge: { dark: 'bg-emerald-500/20 text-emerald-300', light: 'bg-emerald-100 text-emerald-700' },
  },
  {
    step: '05',
    title: 'UI 컴포넌트가 필요할 때',
    when: '버튼, 카드, 입력창, 모달 같은 완성된 UI 부품이 필요해요',
    how: 'shadcn/ui 컴포넌트를 명령어 한 줄로 추가하고 바로 커스터마이징하세요',
    link: '/components',
    label: 'Components 예시 보기',
    color: { dark: 'border-zinc-500/20 bg-zinc-500/5', light: 'border-zinc-200 bg-zinc-50' },
    badge: { dark: 'bg-zinc-500/20 text-zinc-300', light: 'bg-zinc-100 text-zinc-600' },
  },
]

// ── Theme token maps ─────────────────────────────────────────────────────────
const T = {
  dark: {
    page:         'bg-[#05050f] text-white',
    orb1:         'bg-violet-600/25',
    orb2:         'bg-blue-600/20',
    orb3:         'bg-cyan-500/15',
    nav:          'border-white/[0.08] bg-white/[0.04]',
    navLogo:      'text-white',
    navLink:      'text-white/50 hover:bg-white/[0.08] hover:text-white',
    toggle:       'bg-white/[0.08] text-white/70 hover:bg-white/[0.14] hover:text-white',
    pill:         'border-white/[0.12] bg-white/[0.06]',
    pillDot:      'bg-emerald-400',
    pillText:     'text-white/60',
    titleGrad:    'bg-gradient-to-b from-white to-white/50',
    subtitle:     'text-white/40',
    btnPrimary:   'bg-white text-black hover:bg-white/90',
    btnSecondary: 'border-white/[0.15] bg-white/[0.06] text-white/80 hover:border-white/25 hover:bg-white/[0.10] hover:text-white',
    label:        'text-white/30',
    card:         'border-white/[0.08] bg-white/[0.03] hover:border-white/[0.18] hover:bg-white/[0.07]',
    cardName:     'text-white/90',
    cardDesc:     'text-white/45',
    cardSimple:   'text-white/30',
    cardArrow:       'text-white/25 group-hover:text-violet-400',
    cardLinkDoc:     'border border-sky-500/30 text-sky-400/70 group-hover:border-sky-400/60 group-hover:text-sky-300',
    cardLinkExample: 'bg-violet-500/10 text-violet-400 group-hover:bg-violet-500/20 group-hover:text-violet-300',
    divider:         'border-white/[0.06]',
    copyHighlight:   'text-violet-300',
    copyBody:        'text-white/40',
  },
  light: {
    page:         'bg-[#f4f4f9] text-gray-900',
    orb1:         'bg-violet-300/30',
    orb2:         'bg-blue-300/25',
    orb3:         'bg-cyan-300/20',
    nav:          'border-gray-200/70 bg-white/70',
    navLogo:      'text-gray-900',
    navLink:      'text-gray-500 hover:bg-gray-100/80 hover:text-gray-900',
    toggle:       'bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700',
    pill:         'border-gray-200 bg-white',
    pillDot:      'bg-emerald-500',
    pillText:     'text-gray-500',
    titleGrad:    'bg-gradient-to-b from-gray-900 to-gray-600',
    subtitle:     'text-gray-500',
    btnPrimary:   'bg-gray-900 text-white hover:bg-gray-800',
    btnSecondary: 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50',
    label:        'text-gray-400',
    card:         'border-gray-200/80 bg-white hover:border-violet-300 hover:shadow-md',
    cardName:     'text-gray-900',
    cardDesc:     'text-gray-500',
    cardSimple:   'text-gray-400',
    cardArrow:       'text-gray-300 group-hover:text-violet-500',
    cardLinkDoc:     'border border-sky-300 text-sky-600 group-hover:border-sky-400 group-hover:text-sky-700',
    cardLinkExample: 'bg-violet-50 text-violet-600 group-hover:bg-violet-100 group-hover:text-violet-700',
    divider:         'border-gray-100',
    copyHighlight:   'text-violet-600',
    copyBody:        'text-gray-500',
  },
}

export function LandingPage() {
  const { isDark, toggle } = useThemeStore()
  const t = isDark ? T.dark : T.light

  return (
    <div className={`relative min-h-screen overflow-x-hidden ${t.page}`}>

      {/* ── Gradient orbs ── */}
      <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className={`absolute -left-60 -top-20 h-[700px] w-[700px] rounded-full blur-[140px] ${t.orb1}`} />
        <div className={`absolute -right-60 top-10 h-[600px] w-[600px] rounded-full blur-[130px] ${t.orb2}`} />
        <div className={`absolute bottom-0 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full blur-[120px] ${t.orb3}`} />
      </div>

      {/* ── Top Nav ── */}
      <header className={`sticky top-0 z-50 border-b backdrop-blur-2xl ${t.nav}`}>
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <span className={`text-sm font-semibold tracking-tight ${t.navLogo}`}>
            React Starter Kit
          </span>
          <nav className="hidden items-center gap-0.5 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`rounded-lg px-3 py-1.5 text-sm transition-all duration-150 ${t.navLink}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <button
            onClick={toggle}
            aria-label="테마 전환"
            className={`ml-3 flex h-8 w-8 items-center justify-center rounded-lg transition-all duration-150 ${t.toggle}`}
          >
            {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </button>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="relative flex flex-col items-center px-6 pb-24 pt-32 text-center">
        {/* Version pill */}
        <div className={`mb-8 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 backdrop-blur-sm ${t.pill}`}>
          <span className={`h-1.5 w-1.5 rounded-full ${t.pillDot}`} />
          <span className={`text-xs font-medium tracking-wide ${t.pillText}`}>
            React 19 &nbsp;·&nbsp; Vite 8 &nbsp;·&nbsp; TypeScript 6
          </span>
        </div>

        {/* Title — Tailwind bg-clip-text 방식 (inline style 제거) */}
        <h1 className={`mb-5 bg-clip-text text-6xl font-bold tracking-tight text-transparent md:text-7xl ${t.titleGrad}`}>
          React Starter Kit
        </h1>

        {/* Subtitle */}
        <p className={`mb-8 max-w-sm text-base leading-relaxed ${t.subtitle}`}>
          최신 React 생태계를 한 곳에서 탐색하세요.
          <br />
          각 라이브러리의 실제 동작을 직접 확인해보세요.
        </p>

        {/* 타겟 카피라이팅 */}
        <div className="mb-10 max-w-lg text-center space-y-3">
          <p className={`text-lg font-semibold leading-snug ${t.copyHighlight}`}>
            "AI한테 코드 짜달라고 했는데<br />왜 동작을 안 하는지 모르겠다면"
          </p>
          <p className={`text-sm leading-relaxed ${t.copyBody}`}>
            Claude, ChatGPT와 함께 바이브 코딩하는 입문자를 위해 만들었습니다.<br />
            각 라이브러리가 실제로 어떻게 동작하는지, 어디를 어떻게 바꾸면 되는지<br />
            — 직접 클릭하고 입력하면서 익힐 수 있습니다.
          </p>
        </div>

        {/* CTA */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/zustand"
            className={`inline-flex items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-semibold transition-all duration-150 active:scale-[0.98] ${t.btnPrimary}`}
          >
            탐색 시작하기
            <ArrowRight className="size-4" />
          </Link>
          <a
            href="https://github.com/brothersong20/react-frontend-starter-kit"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 rounded-xl border px-6 py-2.5 text-sm font-semibold backdrop-blur-sm transition-all duration-150 active:scale-[0.98] ${t.btnSecondary}`}
          >
            <ExternalLink className="size-4" />
            GitHub
          </a>
        </div>
      </section>

      {/* ── Tech Stack ── */}
      <section className="relative mx-auto max-w-6xl px-6 pb-32">
        <p className={`mb-10 text-center text-xs font-semibold uppercase tracking-[0.2em] ${t.label}`}>
          기술 스택
        </p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {stack.map((item) => {
            const cardClass = `group rounded-2xl border p-5 backdrop-blur-sm transition-all duration-200 ${t.card}`

            const inner = (
              <>
                <div className="mb-2 flex items-center justify-between gap-2">
                  <span className={`text-sm font-semibold ${t.cardName}`}>{item.name}</span>
                  <div className="flex items-center gap-1.5">
                    {item.version && (
                      <span className={`rounded-md px-2 py-0.5 text-[10px] font-semibold ${item.badge[isDark ? 'dark' : 'light']}`}>
                        v{item.version}
                      </span>
                    )}
                    <ArrowUpRight className={`h-3.5 w-3.5 transition-colors ${t.cardArrow}`} />
                  </div>
                </div>

                <p className={`mb-3 text-xs leading-relaxed ${t.cardDesc}`}>{item.description}</p>

                <div className={`mb-3 border-t ${t.divider}`} />

                <p className={`text-xs leading-relaxed ${t.cardSimple}`}>{item.simple}</p>

                <div className="mt-3">
                  <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium transition-colors ${item.internal ? t.cardLinkExample : t.cardLinkDoc}`}>
                    {item.internal ? '예시 보기 →' : '공식 문서 ↗'}
                  </span>
                </div>
              </>
            )

            return item.internal ? (
              <Link key={item.name} to={item.href} className={cardClass}>
                {inner}
              </Link>
            ) : (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cardClass}
              >
                {inner}
              </a>
            )
          })}
        </div>
      </section>

      {/* ── 이럴 때 이렇게 활용하세요 ── */}
      <section className="relative mx-auto max-w-6xl px-6 pb-32">
        <p className={`mb-3 text-center text-xs font-semibold uppercase tracking-[0.2em] ${t.label}`}>
          사용 가이드
        </p>
        <h2 className={`mb-2 text-center text-2xl font-bold ${t.cardName}`}>
          이럴 때 이렇게 활용하세요
        </h2>
        <p className={`mb-10 text-center text-sm ${t.subtitle}`}>
          AI에게 아래 상황을 설명하고, 각 예시 페이지를 참고로 붙여넣으세요
        </p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {usageSteps.map((step, index) => (
            <Link
              key={step.step}
              to={step.link}
              className={`group rounded-2xl border p-5 backdrop-blur-sm transition-all duration-200 ${step.color[isDark ? 'dark' : 'light']} ${index === usageSteps.length - 1 ? 'sm:col-span-2' : ''}`}
            >
              <div className="flex items-start gap-4">
                <span className={`shrink-0 text-2xl font-black tabular-nums ${t.subtitle}`}>{step.step}</span>
                <div className="space-y-1.5 min-w-0">
                  <p className={`text-[10px] font-semibold uppercase tracking-wider ${t.label}`}>이럴 때</p>
                  <p className={`text-sm font-semibold leading-snug ${t.cardName}`}>{step.title}</p>
                  <p className={`text-xs leading-relaxed ${t.cardSimple}`}>{step.when}</p>
                  <p className={`text-[10px] font-semibold uppercase tracking-wider mt-2 ${t.label}`}>이렇게</p>
                  <p className={`text-xs leading-relaxed ${t.cardDesc}`}>{step.how}</p>
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-medium mt-1 ${step.badge[isDark ? 'dark' : 'light']}`}>
                    {step.label} →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

    </div>
  )
}
