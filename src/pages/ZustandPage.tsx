import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useCounterStore } from '@/store/useCounterStore'
import { Minus, Plus, RotateCcw, Info, Lightbulb, Rocket } from 'lucide-react'

export function ZustandPage() {
  const { count, inc, dec, reset } = useCounterStore()

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Zustand</h2>
        <p className="mt-1 text-muted-foreground">
          간결한 클라이언트 상태 관리 — 보일러플레이트 없이 스토어 정의
        </p>
      </div>

      {/* 개념 설명 */}
      <Card className="border-blue-500/20 bg-blue-500/5">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-1.5">
            <Info className="size-4 text-blue-500" />
            이게 뭔가요?
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
          <p>
            Zustand는 <strong className="text-foreground">앱 전체에서 공유하는 변수 저장소</strong>입니다.
          </p>
          <p>
            <code className="text-xs bg-muted px-1 py-0.5 rounded">useState</code>는 그 컴포넌트
            안에서만 값을 기억하지만, Zustand 스토어는 어떤 컴포넌트에서든 같은 값을 읽고 바꿀 수
            있습니다.
          </p>
          <p>
            예를 들어 헤더와 사이드바가 모두 로그인 사용자 이름을 보여줘야 할 때, props를 계속
            넘길 필요 없이 두 컴포넌트 모두 스토어에서 바로 꺼내 쓰면 됩니다.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>카운터 데모</CardTitle>
          <CardDescription>
            <code className="text-xs bg-muted px-1 py-0.5 rounded">useCounterStore</code> 스토어를
            사용하는 카운터입니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center gap-6 py-4">
            <div className="text-7xl font-bold tabular-nums text-foreground">{count}</div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="icon" onClick={dec}>
                <Minus />
              </Button>
              <Button variant="outline" size="icon" onClick={reset}>
                <RotateCcw />
              </Button>
              <Button variant="outline" size="icon" onClick={inc}>
                <Plus />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 활용 예시 */}
      <Card className="border-emerald-500/20 bg-emerald-500/5">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-1.5">
            <Lightbulb className="size-4 text-emerald-500" />
            이런 상황에 써요
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="text-sm space-y-2 text-muted-foreground">
            <li>
              • <strong className="text-foreground">로그인 상태 관리</strong> — 사용자 이름, 이메일,
              권한 정보를 앱 전체에서 사용
            </li>
            <li>
              • <strong className="text-foreground">쇼핑몰 장바구니</strong> — 상품 담기/삭제/수량
              변경을 여러 페이지에서 공유
            </li>
            <li>
              • <strong className="text-foreground">다크/라이트 테마</strong> — 테마 설정을 모든
              컴포넌트에서 읽고 토글 (이 앱도 Zustand로 테마를 관리합니다!)
            </li>
            <li>
              • <strong className="text-foreground">알림 메시지(Toast)</strong> — 어디서든
              알림을 띄우고 닫는 전역 컨트롤
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">스토어 코드</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="rounded-md bg-muted p-4 text-xs overflow-x-auto leading-relaxed">
            <code>{`import { create } from 'zustand'

interface CounterState {
  count: number
  inc: () => void
  dec: () => void
  reset: () => void
}

export const useCounterStore = create<CounterState>((set) => ({
  count: 0,
  inc: () => set((state) => ({ count: state.count + 1 })),
  dec: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}))`}</code>
          </pre>
        </CardContent>
      </Card>

      {/* 적용 가이드 */}
      <Card className="border-violet-500/20 bg-violet-500/5">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-1.5">
            <Rocket className="size-4 text-violet-500" />
            내 프로젝트에 적용하기
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="text-sm space-y-3 text-muted-foreground list-decimal list-inside">
            <li>
              <strong className="text-foreground">설치</strong>
              <pre className="mt-1 ml-4 rounded bg-muted px-3 py-2 text-xs">
                npm install zustand
              </pre>
            </li>
            <li>
              <strong className="text-foreground">스토어 파일 생성</strong> —{' '}
              <code className="text-xs bg-muted px-1 py-0.5 rounded">src/store/useMyStore.ts</code>{' '}
              파일을 만들고{' '}
              <code className="text-xs bg-muted px-1 py-0.5 rounded">create()</code>로 상태와
              액션을 정의합니다
            </li>
            <li>
              <strong className="text-foreground">컴포넌트에서 훅처럼 호출</strong>
              <pre className="mt-1 ml-4 rounded bg-muted px-3 py-2 text-xs">
                {`const { value, setValue } = useMyStore()`}
              </pre>
            </li>
          </ol>
          <p className="mt-4 text-xs text-muted-foreground border-t pt-3">
            💡 <strong className="text-foreground">핵심:</strong> props를 계속 넘기지 않아도
            어떤 컴포넌트에서든 스토어를 바로 꺼내 쓸 수 있습니다.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
