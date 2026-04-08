import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, Info, Lightbulb, Rocket } from 'lucide-react'

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
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold">React Hook Form + Zod</h2>
        <p className="mt-1 text-muted-foreground">
          비제어 컴포넌트 방식의 폼 관리와 스키마 기반 유효성 검증
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
            React Hook Form + Zod는{' '}
            <strong className="text-foreground">폼 관리 + 입력값 검증 자동화 콤보</strong>입니다.
          </p>
          <p>
            일반적으로 input마다{' '}
            <code className="text-xs bg-muted px-1 py-0.5 rounded">useState</code>를 만들고{' '}
            <code className="text-xs bg-muted px-1 py-0.5 rounded">if</code>문으로 검증하면 코드가
            금방 복잡해집니다. React Hook Form은 입력 상태를 자동으로 관리하고, Zod는 "어떤 값이
            유효한지" 규칙을 코드로 명확하게 선언합니다.
          </p>
          <p>
            아래 폼에서 빈 값으로 제출하거나 잘못된 형식을 입력해보면 Zod가 정의한 에러 메시지가
            바로 나타납니다.
          </p>
        </CardContent>
      </Card>

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
                <p>
                  <span className="text-muted-foreground">이름:</span> {submitted.name}
                </p>
                <p>
                  <span className="text-muted-foreground">이메일:</span> {submitted.email}
                </p>
                <p>
                  <span className="text-muted-foreground">비밀번호:</span>{' '}
                  {'*'.repeat(submitted.password.length)}
                </p>
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
              • <strong className="text-foreground">회원가입 / 로그인 폼</strong> — 이메일, 비밀번호
              형식 검증
            </li>
            <li>
              • <strong className="text-foreground">프로필 수정 폼</strong> — 기존 값을{' '}
              <code className="text-xs bg-muted px-1 py-0.5 rounded">defaultValues</code>로 채워넣기
            </li>
            <li>
              • <strong className="text-foreground">상품 등록/수정 폼</strong> — 가격, 수량 등 숫자
              타입 검증
            </li>
            <li>
              • <strong className="text-foreground">다단계 폼(step form)</strong> — 단계별로 다른
              schema를 적용
            </li>
          </ul>
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
                npm install react-hook-form zod @hookform/resolvers
              </pre>
            </li>
            <li>
              <strong className="text-foreground">Zod로 검증 규칙 정의</strong>
              <pre className="mt-1 ml-4 rounded bg-muted px-3 py-2 text-xs">
                {`const schema = z.object({ name: z.string().min(2) })`}
              </pre>
            </li>
            <li>
              <strong className="text-foreground">
                useForm에 resolver 연결 + register로 input 연결
              </strong>
              <pre className="mt-1 ml-4 rounded bg-muted px-3 py-2 text-xs overflow-x-auto">
                {`const { register, handleSubmit, formState: { errors } } =
  useForm({ resolver: zodResolver(schema) })

<input {...register('name')} />
{errors.name && <p>{errors.name.message}</p>}`}
              </pre>
            </li>
          </ol>
          <p className="mt-4 text-xs text-muted-foreground border-t pt-3">
            💡 <strong className="text-foreground">핵심:</strong> 검증 규칙이 바뀌면 schema만
            수정하면 됩니다. 에러 메시지도 schema에 같이 정의하므로 관리가 쉽습니다.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
