import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useUsers } from '@/api/queries'
import { Loader2, AlertCircle } from 'lucide-react'

export function QueryPage() {
  const { data: users, isLoading, isError, error, isFetching } = useUsers()

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h2 className="text-2xl font-bold">TanStack Query</h2>
        <p className="mt-1 text-muted-foreground">
          서버 상태 관리 — 자동 캐싱, 백그라운드 리페칭, 로딩/에러 상태
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>사용자 목록</CardTitle>
            <div className="flex items-center gap-2">
              {isFetching && !isLoading && (
                <Badge variant="outline" className="text-xs">
                  <Loader2 className="size-3 mr-1 animate-spin" />
                  리페칭
                </Badge>
              )}
              {users && (
                <Badge variant="secondary">{users.length}명</Badge>
              )}
            </div>
          </div>
          <CardDescription>JSONPlaceholder API에서 사용자 데이터를 가져옵니다.</CardDescription>
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
        </CardContent>
      </Card>
    </div>
  )
}
