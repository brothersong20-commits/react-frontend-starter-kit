import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const stack = [
  {
    name: 'React',
    version: '19',
    description: '최신 React — 동시성 렌더링, Server Components 지원',
    color: 'bg-sky-500/10 text-sky-600 border-sky-200',
  },
  {
    name: 'Vite',
    version: '8',
    description: '빌드 도구 — HMR, ESM 네이티브, 번들 최적화',
    color: 'bg-violet-500/10 text-violet-600 border-violet-200',
  },
  {
    name: 'TypeScript',
    version: '6',
    description: 'Go 기반 컴파일러 전환 전 마지막 JS 버전 — strict 기본값',
    color: 'bg-blue-500/10 text-blue-600 border-blue-200',
  },
  {
    name: 'Tailwind CSS',
    version: '4',
    description: 'CSS-first 설정 — @import 방식, config 파일 불필요',
    color: 'bg-teal-500/10 text-teal-600 border-teal-200',
  },
  {
    name: 'shadcn/ui',
    description: '복사 붙여넣기 컴포넌트 라이브러리 — Radix UI 기반',
    color: 'bg-zinc-500/10 text-zinc-600 border-zinc-200',
  },
  {
    name: 'React Router',
    version: '7',
    description: 'URL 기반 클라이언트 라우팅 — createBrowserRouter 패턴',
    color: 'bg-red-500/10 text-red-600 border-red-200',
  },
  {
    name: 'Zustand',
    version: '5',
    description: '가볍고 간결한 클라이언트 상태 관리',
    color: 'bg-orange-500/10 text-orange-600 border-orange-200',
  },
  {
    name: 'TanStack Query',
    version: '5',
    description: '서버 상태 관리 — 캐싱, 리페칭, 로딩/에러 상태',
    color: 'bg-rose-500/10 text-rose-600 border-rose-200',
  },
  {
    name: 'React Hook Form',
    version: '7',
    description: '폼 상태 관리 — 비제어 컴포넌트 방식으로 성능 최적화',
    color: 'bg-pink-500/10 text-pink-600 border-pink-200',
  },
  {
    name: 'Zod',
    version: '4',
    description: '스키마 기반 유효성 검증 — TypeScript-first',
    color: 'bg-indigo-500/10 text-indigo-600 border-indigo-200',
  },
  {
    name: '@xyflow/react',
    version: '12',
    description: '노드 기반 에디터 — 드래그, 연결, 인터랙티브 플로우 차트',
    color: 'bg-emerald-500/10 text-emerald-600 border-emerald-200',
  },
  {
    name: 'lucide-react',
    version: '1',
    description: '일관된 오픈소스 아이콘 라이브러리 — Tree-shakeable',
    color: 'bg-amber-500/10 text-amber-600 border-amber-200',
  },
]

export function LandingPage() {
  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground">React SPA Starter Kit</h2>
        <p className="mt-2 text-muted-foreground">
          프로덕션 레디 React 애플리케이션을 위한 기술스택 쇼케이스.
          왼쪽 사이드바에서 각 라이브러리 예시를 탐색해보세요.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stack.map((item) => (
          <Card key={item.name} className="border-border">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">{item.name}</CardTitle>
                {item.version && (
                  <Badge variant="outline" className={item.color}>
                    v{item.version}
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-xs leading-relaxed">
                {item.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
