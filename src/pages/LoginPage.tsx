import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

// 로그인 폼 유효성 검증 스키마
const loginSchema = z.object({
  email: z.string().email('올바른 이메일 형식을 입력해주세요'),
  password: z.string().min(8, '비밀번호는 최소 8자 이상이어야 합니다'),
})

type LoginValues = z.infer<typeof loginSchema>

export function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
  })

  // 실제 API 연동 없이 제출 동작 시뮬레이션
  async function onSubmit(data: LoginValues) {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    console.log('로그인 시도:', data)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/40 px-4">
      <div className="w-full max-w-sm flex flex-col gap-3">
        {/* 홈으로 돌아가기 */}
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors self-start"
        >
          <ArrowLeft className="size-4" />
          홈으로 돌아가기
        </Link>

      <Card className="w-full">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">로그인</CardTitle>
          <CardDescription>이메일과 비밀번호를 입력해 계정에 접속하세요</CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="flex flex-col gap-5 pb-6">
            {/* 이메일 필드 */}
            <div className="grid gap-2">
              <Label htmlFor="email">이메일</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                autoComplete="email"
                {...register('email')}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>

            {/* 비밀번호 필드 */}
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">비밀번호</Label>
                <a
                  href="#"
                  className="text-sm text-muted-foreground underline-offset-4 hover:underline"
                >
                  비밀번호 찾기
                </a>
              </div>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                {...register('password')}
              />
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password.message}</p>
              )}
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-3">
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? '로그인 중...' : '로그인하기'}
            </Button>

            <p className="text-sm text-center text-muted-foreground">
              계정이 없으신가요?{' '}
              <Link to="/" className="text-foreground underline-offset-4 hover:underline font-medium">
                회원가입
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
      </div>
    </div>
  )
}
