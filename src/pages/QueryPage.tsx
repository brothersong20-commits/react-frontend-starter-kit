import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useUsers, usePosts, useCreatePost } from '@/api/queries'
import { Loader2, AlertCircle, Info, Lightbulb, Rocket, RefreshCw, CheckCircle } from 'lucide-react'

export function QueryPage() {
  const { data: users, isLoading, isError, error, isFetching, refetch } = useUsers()
  const { data: posts, isLoading: postsLoading } = usePosts()

  // useMutation 데모용 상태
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const { mutate: createPost, isPending, isSuccess, data: createdPost, reset: resetMutation } = useCreatePost()

  function handleCreate() {
    if (!title.trim()) return
    createPost({ title, body })
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold">TanStack Query</h2>
        <p className="mt-1 text-muted-foreground">
          서버 상태 관리 — 자동 캐싱, 백그라운드 리페칭, 로딩/에러 상태
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
            TanStack Query는{' '}
            <strong className="text-foreground">서버에서 데이터 가져오기 + 관리 자동화 도구</strong>
            입니다.
          </p>
          <p>
            직접{' '}
            <code className="text-xs bg-muted px-1 py-0.5 rounded">
              fetch + useState + useEffect
            </code>
            를 쓰면 로딩 상태, 에러 처리, 중복 요청 방지, 캐시 관리를 모두 손으로 짜야 합니다.
            TanStack Query는 이 모든 것을 자동으로 처리해줍니다.
          </p>
          <p>
            탭을 다시 클릭하거나 창을 포커스하면 데이터를 자동으로 새로 가져오고, 같은 데이터를
            여러 곳에서 요청해도 실제 API 호출은 한 번만 합니다.
          </p>
        </CardContent>
      </Card>

      {/* 예시 1: useQuery — 사용자 목록 */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>예시 1 — useQuery (데이터 조회)</CardTitle>
              <CardDescription className="mt-1">
                JSONPlaceholder API에서 사용자 데이터를 가져옵니다.
              </CardDescription>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {isFetching && !isLoading && (
                <Badge variant="outline" className="text-xs">
                  <Loader2 className="size-3 mr-1 animate-spin" />
                  리페칭
                </Badge>
              )}
              {users && <Badge variant="secondary">{users.length}명</Badge>}
              <Button size="sm" variant="outline" onClick={() => refetch()} disabled={isFetching}>
                <RefreshCw className={`size-3 mr-1 ${isFetching ? 'animate-spin' : ''}`} />
                다시 불러오기
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading && (
            <div className="flex items-center justify-center py-12 text-muted-foreground">
              <Loader2 className="size-5 animate-spin mr-2" />
              불러오는 중...
            </div>
          )}

          {isError && (
            <div className="flex items-center gap-2 rounded-md border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
              <AlertCircle className="size-4 shrink-0" />
              {error.message}
            </div>
          )}

          {users && (
            <ul className="divide-y divide-border">
              {users.map((user) => (
                <li key={user.id} className="flex items-center justify-between py-3">
                  <div>
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                  <Badge variant="outline" className="text-xs shrink-0">
                    {user.company.name}
                  </Badge>
                </li>
              ))}
            </ul>
          )}

          <pre className="rounded-md bg-muted p-4 text-xs overflow-x-auto leading-relaxed mt-4">
            <code>{`// queryKey가 같으면 캐시를 공유합니다
const { data, isLoading, isError, refetch } = useQuery({
  queryKey: ['users'],   // 캐시 키 — 배열로 계층 구조 표현 가능
  queryFn: fetchUsers,   // 실제 fetch 함수
  staleTime: 30_000,     // 30초 동안은 캐시된 데이터 사용
})`}</code>
          </pre>
        </CardContent>
      </Card>

      {/* 예시 2: useQuery — 포스트 목록 (다른 엔드포인트) */}
      <Card>
        <CardHeader>
          <CardTitle>예시 2 — useQuery (다른 엔드포인트)</CardTitle>
          <CardDescription>
            같은 페이지에서 여러 엔드포인트를 동시에 조회할 수 있습니다. queryKey가 다르면 각자
            독립적인 캐시를 가집니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {postsLoading && (
            <div className="flex items-center justify-center py-8 text-muted-foreground">
              <Loader2 className="size-4 animate-spin mr-2" />
              불러오는 중...
            </div>
          )}
          {posts && (
            <ul className="space-y-3">
              {posts.map((post) => (
                <li key={post.id} className="rounded-md border p-3">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-medium leading-snug">{post.title}</p>
                    <Badge variant="outline" className="text-xs shrink-0">
                      #{post.id}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{post.body}</p>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      {/* 예시 3: useMutation — 데이터 생성 */}
      <Card>
        <CardHeader>
          <CardTitle>예시 3 — useMutation (데이터 생성)</CardTitle>
          <CardDescription>
            <code className="text-xs bg-muted px-1 py-0.5 rounded">useMutation</code>은 데이터를
            생성·수정·삭제할 때 사용합니다. isPending, isSuccess 상태를 자동으로 제공합니다.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isSuccess && createdPost ? (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-emerald-600">
                <CheckCircle className="size-4" />
                포스트가 생성되었습니다 (JSONPlaceholder가 id: {createdPost.id}로 응답)
              </div>
              <div className="rounded-md bg-muted p-4 text-xs space-y-1">
                <p>
                  <span className="text-muted-foreground">id:</span> {createdPost.id}
                </p>
                <p>
                  <span className="text-muted-foreground">title:</span> {createdPost.title}
                </p>
                <p>
                  <span className="text-muted-foreground">body:</span> {createdPost.body}
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  resetMutation()
                  setTitle('')
                  setBody('')
                }}
              >
                다시 작성
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="post-title">제목</Label>
                <Input
                  id="post-title"
                  placeholder="포스트 제목"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="post-body">내용</Label>
                <Input
                  id="post-body"
                  placeholder="포스트 내용"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                />
              </div>
              <Button onClick={handleCreate} disabled={isPending || !title.trim()}>
                {isPending && <Loader2 className="size-4 mr-2 animate-spin" />}
                {isPending ? '생성 중...' : '포스트 생성'}
              </Button>
            </div>
          )}

          <pre className="rounded-md bg-muted p-4 text-xs overflow-x-auto leading-relaxed">
            <code>{`const { mutate, isPending, isSuccess, data } = useMutation({
  mutationFn: (newPost) =>
    fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify(newPost),
    }).then((r) => r.json()),

  // 성공 후 관련 쿼리 캐시 무효화 → 목록 자동 갱신
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['posts'] })
  },
})

mutate({ title: '새 포스트', body: '내용...' })`}</code>
          </pre>
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
              • <strong className="text-foreground">게시글 목록/상세 불러오기</strong> — 로딩
              스피너, 에러 메시지 자동 처리
            </li>
            <li>
              • <strong className="text-foreground">상품 목록 + 무한 스크롤</strong> —{' '}
              <code className="text-xs bg-muted px-1 py-0.5 rounded">useInfiniteQuery</code>로
              페이지네이션 구현
            </li>
            <li>
              • <strong className="text-foreground">로그인 사용자 프로필</strong> — 한 번 가져온
              데이터를 캐싱해서 페이지 이동해도 재요청 없음
            </li>
            <li>
              • <strong className="text-foreground">댓글 작성 후 목록 갱신</strong> —{' '}
              <code className="text-xs bg-muted px-1 py-0.5 rounded">useMutation</code> +{' '}
              <code className="text-xs bg-muted px-1 py-0.5 rounded">invalidateQueries</code>로
              자동 동기화 (위 예시 3!)
            </li>
            <li>
              • <strong className="text-foreground">낙관적 업데이트(Optimistic Update)</strong> —
              서버 응답 전에 UI를 먼저 업데이트해서 빠른 반응성 제공
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
                npm install @tanstack/react-query
              </pre>
            </li>
            <li>
              <strong className="text-foreground">
                <code className="text-xs bg-muted px-1 py-0.5 rounded">main.tsx</code>에{' '}
                QueryClientProvider 감싸기
              </strong>
              <pre className="mt-1 ml-4 rounded bg-muted px-3 py-2 text-xs overflow-x-auto">
                {`const queryClient = new QueryClient()
<QueryClientProvider client={queryClient}>
  <App />
</QueryClientProvider>`}
              </pre>
            </li>
            <li>
              <strong className="text-foreground">API 함수 작성</strong>
              <pre className="mt-1 ml-4 rounded bg-muted px-3 py-2 text-xs">
                {`const fetchPosts = () => fetch('/api/posts').then(r => r.json())`}
              </pre>
            </li>
            <li>
              <strong className="text-foreground">컴포넌트에서 useQuery 호출</strong>
              <pre className="mt-1 ml-4 rounded bg-muted px-3 py-2 text-xs overflow-x-auto">
                {`const { data, isLoading, isError } = useQuery({
  queryKey: ['posts'],
  queryFn: fetchPosts,
})`}
              </pre>
            </li>
          </ol>
          <p className="mt-4 text-xs text-muted-foreground border-t pt-3">
            💡 <strong className="text-foreground">핵심:</strong>{' '}
            <code className="text-xs bg-muted px-1 py-0.5 rounded">isLoading</code>,{' '}
            <code className="text-xs bg-muted px-1 py-0.5 rounded">isError</code>,{' '}
            <code className="text-xs bg-muted px-1 py-0.5 rounded">data</code>가 자동으로 제공되어
            로딩/에러 처리 코드를 따로 짤 필요가 없습니다.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
