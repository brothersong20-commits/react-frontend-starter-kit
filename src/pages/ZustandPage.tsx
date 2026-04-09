import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useCounterStore } from '@/store/useCounterStore'
import { useCartStore } from '@/store/useCartStore'
import { Minus, Plus, RotateCcw, Info, Lightbulb, Rocket, ShoppingCart, X, Trash2, Sparkles } from 'lucide-react'

// 장바구니 데모에 사용할 샘플 상품
const PRODUCTS = [
  { id: 1, name: '아메리카노', price: 4500 },
  { id: 2, name: '카페라떼', price: 5000 },
  { id: 3, name: '초콜릿케이크', price: 6500 },
]

export function ZustandPage() {
  const { count, inc, dec, reset } = useCounterStore()
  const { items, addItem, removeItem, clearCart } = useCartStore()

  // 합계 계산
  const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0)
  const totalCount = items.reduce((sum, i) => sum + i.quantity, 0)

  return (
    <div className="max-w-3xl mx-auto space-y-6">
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

      {/* 예시 1: 카운터 */}
      <Card>
        <CardHeader>
          <CardTitle>예시 1 — 카운터</CardTitle>
          <CardDescription>
            <code className="text-xs bg-muted px-1 py-0.5 rounded">useCounterStore</code>의
            숫자 상태와 액션(inc / dec / reset)을 사용합니다.
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
          <pre className="rounded-md bg-muted p-4 text-xs overflow-x-auto leading-relaxed mt-2">
            <code>{`// useCounterStore.ts
export const useCounterStore = create<CounterState>((set) => ({
  count: 0,
  inc: () => set((state) => ({ count: state.count + 1 })),
  dec: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}))`}</code>
          </pre>
        </CardContent>
      </Card>

      {/* 예시 2: 장바구니 */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>예시 2 — 장바구니</CardTitle>
              <CardDescription className="mt-1">
                <strong>상품 목록</strong>과 <strong>장바구니</strong> 두 영역이 같은{' '}
                <code className="text-xs bg-muted px-1 py-0.5 rounded">useCartStore</code>를
                공유합니다. 상품을 담아보세요.
              </CardDescription>
            </div>
            {totalCount > 0 && (
              <Badge className="shrink-0">
                <ShoppingCart className="size-3 mr-1" />
                {totalCount}
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {/* 상품 목록 패널 */}
            <div className="space-y-2">
              <p className="text-xs font-medium text-muted-foreground">상품 목록</p>
              {PRODUCTS.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between rounded-md border p-3"
                >
                  <div>
                    <p className="text-sm font-medium">{product.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {product.price.toLocaleString()}원
                    </p>
                  </div>
                  <Button size="sm" variant="outline" onClick={() => addItem(product)}>
                    <Plus className="size-3 mr-1" />
                    담기
                  </Button>
                </div>
              ))}
            </div>

            {/* 장바구니 패널 */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium text-muted-foreground">장바구니</p>
                {items.length > 0 && (
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-6 px-2 text-xs"
                    onClick={clearCart}
                  >
                    <Trash2 className="size-3 mr-1" />
                    비우기
                  </Button>
                )}
              </div>

              {items.length === 0 ? (
                <p className="text-xs text-muted-foreground py-6 text-center border rounded-md">
                  담은 상품이 없습니다
                </p>
              ) : (
                <>
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between rounded-md border p-3"
                    >
                      <div>
                        <p className="text-sm">{item.name}</p>
                        <p className="text-xs text-muted-foreground">수량 {item.quantity}개</p>
                      </div>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="size-7"
                        onClick={() => removeItem(item.id)}
                      >
                        <X className="size-3" />
                      </Button>
                    </div>
                  ))}
                  <div className="rounded-md bg-muted p-3 flex justify-between text-sm">
                    <span className="text-muted-foreground">합계</span>
                    <span className="font-semibold">{totalPrice.toLocaleString()}원</span>
                  </div>
                </>
              )}
            </div>
          </div>

          <pre className="rounded-md bg-muted p-4 text-xs overflow-x-auto leading-relaxed mt-4">
            <code>{`// useCartStore.ts — 배열 상태 + 액션 정의
export const useCartStore = create<CartState>((set) => ({
  items: [],
  addItem: (product) =>
    set((state) => {
      const existing = state.items.find((i) => i.id === product.id)
      if (existing) {
        // 이미 있으면 수량 증가
        return { items: state.items.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        )}
      }
      return { items: [...state.items, { ...product, quantity: 1 }] }
    }),
  removeItem: (id) =>
    set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
  clearCart: () => set({ items: [] }),
}))`}</code>
          </pre>
        </CardContent>
      </Card>

      {/* 예시 3: persist 미들웨어 (코드 예시) */}
      <Card>
        <CardHeader>
          <CardTitle>예시 3 — localStorage 연동 (persist)</CardTitle>
          <CardDescription>
            새로고침해도 상태가 유지되게 하려면{' '}
            <code className="text-xs bg-muted px-1 py-0.5 rounded">persist</code> 미들웨어를
            사용합니다. 이 앱의 다크 모드 설정이 이 방식으로 저장됩니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <pre className="rounded-md bg-muted p-4 text-xs overflow-x-auto leading-relaxed">
            <code>{`import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useThemeStore = create(
  persist(
    (set) => ({
      isDark: false,
      toggle: () => set((state) => ({ isDark: !state.isDark })),
    }),
    {
      name: 'rsk-theme', // localStorage 키 이름
    }
  )
)`}</code>
          </pre>
        </CardContent>
      </Card>

      {/* 예시 4: 알림 토스트 스토어 */}
      <Card>
        <CardHeader>
          <CardTitle>예시 4 — 알림(Toast) 스토어</CardTitle>
          <CardDescription>
            어느 컴포넌트에서든 알림을 띄우는 전역 알림 패턴입니다. push로 추가하고
            dismiss로 닫습니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <pre className="rounded-md bg-muted p-4 text-xs overflow-x-auto leading-relaxed">
            <code>{`// useNotificationStore.ts
interface Notification {
  id: string
  message: string
  type: 'success' | 'error' | 'info'
}

export const useNotificationStore = create<{
  notifications: Notification[]
  push: (message: string, type?: Notification['type']) => void
  dismiss: (id: string) => void
}>((set) => ({
  notifications: [],
  push: (message, type = 'info') =>
    set((state) => ({
      notifications: [
        ...state.notifications,
        { id: crypto.randomUUID(), message, type },
      ],
    })),
  dismiss: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),
}))

// 어디서든 호출
const { push } = useNotificationStore()
push('저장되었습니다!', 'success')
push('오류가 발생했습니다.', 'error')`}</code>
          </pre>
        </CardContent>
      </Card>

      {/* 예시 5: AI 채팅 히스토리 스토어 */}
      <Card>
        <CardHeader>
          <CardTitle>예시 5 — AI 채팅 히스토리 스토어</CardTitle>
          <CardDescription>
            ChatGPT, Claude 같은 AI 채팅 UI를 만들 때 메시지 목록을 관리하는 패턴입니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <pre className="rounded-md bg-muted p-4 text-xs overflow-x-auto leading-relaxed">
            <code>{`// useChatStore.ts
interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
}

export const useChatStore = create<{
  messages: Message[]
  addMessage: (role: Message['role'], content: string) => void
  clearHistory: () => void
}>((set) => ({
  messages: [],
  addMessage: (role, content) =>
    set((state) => ({
      messages: [
        ...state.messages,
        { id: crypto.randomUUID(), role, content },
      ],
    })),
  clearHistory: () => set({ messages: [] }),
}))

// 컴포넌트에서 사용
const { messages, addMessage, clearHistory } = useChatStore()
addMessage('user', '안녕하세요!')
addMessage('assistant', '안녕하세요! 무엇을 도와드릴까요?')`}</code>
          </pre>
        </CardContent>
      </Card>

      {/* 바이브 코더 Tip */}
      <Card className="border-amber-500/20 bg-amber-500/5">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-1.5">
            <Sparkles className="size-4 text-amber-500" />
            바이브 코더를 위한 Tip
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-3">
          <p>
            <strong className="text-foreground">AI 프롬프트 예시:</strong>
          </p>
          <div className="rounded-md bg-muted p-3 text-xs leading-relaxed">
            "React 앱에서 로그인한 사용자 정보(이름, 이메일, 권한)를 헤더, 사이드바, 마이페이지에서
            모두 공유하고 싶어. Zustand로 useAuthStore를 만들어줘. 로그아웃하면 초기화되게 하고,
            새로고침해도 유지되게 persist도 써줘."
          </div>
          <ul className="space-y-1.5">
            <li>
              •{' '}
              <strong className="text-foreground">스토어 이름</strong>은 기능을 반영해서 지으세요:{' '}
              <code className="text-xs bg-muted px-1 py-0.5 rounded">useAuthStore</code>,{' '}
              <code className="text-xs bg-muted px-1 py-0.5 rounded">useCartStore</code>,{' '}
              <code className="text-xs bg-muted px-1 py-0.5 rounded">useModalStore</code>
            </li>
            <li>
              •{' '}
              <strong className="text-foreground">새로고침 후에도 유지</strong>되어야 하면 AI에게
              "persist 미들웨어도 써줘"라고 추가하세요 (예시 3 참고)
            </li>
            <li>
              •{' '}
              <strong className="text-foreground">스토어가 너무 커지면</strong> 기능별로 파일을
              분리하세요:{' '}
              <code className="text-xs bg-muted px-1 py-0.5 rounded">useAuthStore.ts</code>,{' '}
              <code className="text-xs bg-muted px-1 py-0.5 rounded">useCartStore.ts</code>
            </li>
          </ul>
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
              변경을 여러 페이지에서 공유 (위 데모!)
            </li>
            <li>
              • <strong className="text-foreground">다크/라이트 테마</strong> — 테마 설정을 모든
              컴포넌트에서 읽고 토글 (이 앱도 Zustand + persist로 테마를 관리합니다!)
            </li>
            <li>
              • <strong className="text-foreground">알림 메시지(Toast)</strong> — 어디서든
              알림을 띄우고 닫는 전역 컨트롤
            </li>
            <li>
              • <strong className="text-foreground">모달/드로어 열기</strong> — 버튼과 모달이 다른
              컴포넌트 트리에 있어도 스토어로 열고 닫기
            </li>
          </ul>
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
