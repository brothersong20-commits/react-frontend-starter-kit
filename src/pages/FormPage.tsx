import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { CheckCircle } from 'lucide-react'

const schema = z.object({
  name: z.string().min(2, '이름은 최소 2자 이상이어야 합니다'),
  email: z.string().email('올바른 이메일 형식을 입력해주세요'),
  password: z
    .string()
    .min(8, '비밀번호는 최소 8자 이상이어야 합니다')
    .regex(/[A-Z]/, '대문자를 포함해야 합니다')
    .regex(/[0-9]/, '숫자를 포함해야 합니다'),
})

type FormValues = z.infer<typeof schema>

export function FormPage() {
  const [submitted, setSubmitted] = useState<FormValues | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  })

  function onSubmit(data: FormValues) {
    setSubmitted(data)
    reset()
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h2 className="text-2xl font-bold">React Hook Form + Zod</h2>
        <p className="mt-1 text-muted-foreground">
          비제어 컴포넌트 방식의 폼 관리와 스키마 기반 유효성 검증
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>회원가입 폼</CardTitle>
          <CardDescription>
            빈 채로 제출하거나 잘못된 값을 입력해 Zod 검증 메시지를 확인해보세요.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {submitted ? (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-emerald-600">
                <CheckCircle className="size-4" />
                제출 완료!
              </div>
              <div className="rounded-md bg-muted p-4 text-xs space-y-1">
                <p><span className="text-muted-foreground">이름:</span> {submitted.name}</p>
                <p><span className="text-muted-foreground">이메일:</span> {submitted.email}</p>
                <p><span className="text-muted-foreground">비밀번호:</span> {'*'.repeat(submitted.password.length)}</p>
              </div>
              <Button variant="outline" size="sm" onClick={() => setSubmitted(null)}>
                다시 입력
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
              <div className="space-y-1.5">
                <Label htmlFor="name">이름</Label>
                <Input id="name" placeholder="홍길동" {...register('name')} />
                {errors.name && (
                  <p className="text-xs text-destructive">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="email">이메일</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@email.com"
                  {...register('email')}
                />
                {errors.email && (
                  <p className="text-xs text-destructive">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="password">비밀번호</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="대문자 + 숫자 포함 8자 이상"
                  {...register('password')}
                />
                {errors.password && (
                  <p className="text-xs text-destructive">{errors.password.message}</p>
                )}
              </div>

              <div className="flex gap-2 pt-1">
                <Button type="submit" disabled={isSubmitting}>
                  제출
                </Button>
                <Button type="button" variant="outline" onClick={() => reset()}>
                  초기화
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Zod 스키마</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="rounded-md bg-muted p-4 text-xs overflow-x-auto leading-relaxed">
            <code>{`const schema = z.object({
  name: z.string().min(2, '이름은 최소 2자 이상이어야 합니다'),
  email: z.string().email('올바른 이메일 형식을 입력해주세요'),
  password: z
    .string()
    .min(8, '비밀번호는 최소 8자 이상이어야 합니다')
    .regex(/[A-Z]/, '대문자를 포함해야 합니다')
    .regex(/[0-9]/, '숫자를 포함해야 합니다'),
})

const { register, handleSubmit, formState: { errors } } =
  useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  })`}</code>
          </pre>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">검증 규칙</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <Badge variant="outline">이름 최소 2자</Badge>
          <Badge variant="outline">이메일 형식</Badge>
          <Badge variant="outline">비밀번호 8자 이상</Badge>
          <Badge variant="outline">대문자 포함</Badge>
          <Badge variant="outline">숫자 포함</Badge>
        </CardContent>
      </Card>
    </div>
  )
}
