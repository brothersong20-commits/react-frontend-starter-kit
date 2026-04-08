import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useCounterStore } from '@/store/useCounterStore'
import { Minus, Plus, RotateCcw } from 'lucide-react'

export function ZustandPage() {
  const { count, inc, dec, reset } = useCounterStore()

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Zustand</h2>
        <p className="mt-1 text-muted-foreground">
          간결한 클라이언트 상태 관리 — 보일러플레이트 없이 스토어 정의
        </p>
      </div>

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
    </div>
  )
}
