import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { CheckCircle, Info, Lightbulb, Rocket, Sparkles } from 'lucide-react'

// ─── 예시 1: 회원가입 폼 스키마 ──────────────────────────────
const signupSchema = z.object({
  name: z.string().min(2, '이름은 최소 2자 이상이어야 합니다'),
  email: z.string().email('올바른 이메일 형식을 입력해주세요'),
  password: z
    .string()
    .min(8, '비밀번호는 최소 8자 이상이어야 합니다')
    .regex(/[A-Z]/, '대문자를 포함해야 합니다')
    .regex(/[0-9]/, '숫자를 포함해야 합니다'),
})

type SignupValues = z.infer<typeof signupSchema>

// ─── 예시 2: 상품 등록 폼 스키마 ──────────────────────────────
// z.coerce.number() — input은 문자열을 반환하므로 숫자로 자동 변환
const productSchema = z.object({
  productName: z.string().min(2, '상품명은 최소 2자 이상이어야 합니다').max(50, '50자 이내로 입력해주세요'),
  price: z.coerce
    .number()
    .min(100, '최소 가격은 100원입니다')
    .max(10_000_000, '최대 가격은 1,000만원입니다'),
  stock: z.coerce
    .number()
    .int('정수만 입력 가능합니다')
    .min(0, '재고는 0개 이상이어야 합니다')
    .optional(),
  imageUrl: z
    .string()
    .url('올바른 URL 형식을 입력해주세요')
    .optional()
    .or(z.literal('')), // 빈 문자열도 허용
})

type ProductValues = z.infer<typeof productSchema>

export function FormPage() {
  const [signupSubmitted, setSignupSubmitted] = useState<SignupValues | null>(null)
  const [productSubmitted, setProductSubmitted] = useState<ProductValues | null>(null)

  // ─── 회원가입 폼 ──────────────────────────────────────────
  const {
    register: registerSignup,
    handleSubmit: handleSignupSubmit,
    reset: resetSignup,
    formState: { errors: signupErrors, isSubmitting: isSignupSubmitting },
  } = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
  })

  // ─── 상품 등록 폼 ──────────────────────────────────────────
  const {
    register: registerProduct,
    handleSubmit: handleProductSubmit,
    reset: resetProduct,
    formState: { errors: productErrors, isSubmitting: isProductSubmitting },
    // Zod v4에서 z.coerce는 input 타입을 unknown으로 추론하여 RHF와 타입 불일치가 발생합니다.
    // 런타임 동작에는 영향이 없으므로 any 캐스팅으로 우회합니다.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } = useForm<ProductValues>({ resolver: zodResolver(productSchema) as any })

  function onSignupSubmit(data: SignupValues) {
    setSignupSubmitted(data)
    resetSignup()
  }

  function onProductSubmit(data: ProductValues) {
    setProductSubmitted(data)
    resetProduct()
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
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
            아래 두 폼에서 빈 값으로 제출하거나 잘못된 형식을 입력해보면 각 Zod 규칙에 맞는 에러
            메시지가 바로 나타납니다.
          </p>
        </CardContent>
      </Card>

      {/* ─── 예시 1: 회원가입 폼 ─────────────────────────────── */}
      <Card>
        <CardHeader>
          <CardTitle>예시 1 — 회원가입 폼</CardTitle>
          <CardDescription>
            문자열 검증: 최소 길이, 이메일 형식, 정규식(regex) 패턴
          </CardDescription>
        </CardHeader>
        <CardContent>
          {signupSubmitted ? (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-emerald-600">
                <CheckCircle className="size-4" />
                제출 완료!
              </div>
              <div className="rounded-md bg-muted p-4 text-xs space-y-1">
                <p>
                  <span className="text-muted-foreground">이름:</span> {signupSubmitted.name}
                </p>
                <p>
                  <span className="text-muted-foreground">이메일:</span> {signupSubmitted.email}
                </p>
                <p>
                  <span className="text-muted-foreground">비밀번호:</span>{' '}
                  {'*'.repeat(signupSubmitted.password.length)}
                </p>
              </div>
              <Button variant="outline" size="sm" onClick={() => setSignupSubmitted(null)}>
                다시 입력
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSignupSubmit(onSignupSubmit)} noValidate className="space-y-5">
              <div className="space-y-1.5">
                <Label htmlFor="name">이름</Label>
                <Input id="name" placeholder="홍길동" {...registerSignup('name')} />
                {signupErrors.name && (
                  <p className="text-xs text-destructive">{signupErrors.name.message}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="email">이메일</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@email.com"
                  {...registerSignup('email')}
                />
                {signupErrors.email && (
                  <p className="text-xs text-destructive">{signupErrors.email.message}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="password">비밀번호</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="대문자 + 숫자 포함 8자 이상"
                  {...registerSignup('password')}
                />
                {signupErrors.password && (
                  <p className="text-xs text-destructive">{signupErrors.password.message}</p>
                )}
              </div>

              <div className="flex gap-2 pt-1">
                <Button type="submit" disabled={isSignupSubmitting}>
                  제출
                </Button>
                <Button type="button" variant="outline" onClick={() => resetSignup()}>
                  초기화
                </Button>
              </div>
            </form>
          )}

          <Separator className="my-4" />

          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground">적용된 검증 규칙</p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">이름 최소 2자</Badge>
              <Badge variant="outline">이메일 형식</Badge>
              <Badge variant="outline">비밀번호 8자 이상</Badge>
              <Badge variant="outline">대문자 포함</Badge>
              <Badge variant="outline">숫자 포함</Badge>
            </div>
          </div>

          <pre className="rounded-md bg-muted p-4 text-xs overflow-x-auto leading-relaxed mt-4">
            <code>{`const signupSchema = z.object({
  name: z.string().min(2, '이름은 최소 2자 이상이어야 합니다'),
  email: z.string().email('올바른 이메일 형식을 입력해주세요'),
  password: z.string()
    .min(8, '비밀번호는 최소 8자 이상이어야 합니다')
    .regex(/[A-Z]/, '대문자를 포함해야 합니다')
    .regex(/[0-9]/, '숫자를 포함해야 합니다'),
})`}</code>
          </pre>
        </CardContent>
      </Card>

      {/* ─── 예시 2: 상품 등록 폼 ─────────────────────────────── */}
      <Card>
        <CardHeader>
          <CardTitle>예시 2 — 상품 등록 폼</CardTitle>
          <CardDescription>
            숫자 변환(coerce), 범위 검증(min/max), 정수(int), 선택 필드(optional)
          </CardDescription>
        </CardHeader>
        <CardContent>
          {productSubmitted ? (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-emerald-600">
                <CheckCircle className="size-4" />
                상품 등록 완료!
              </div>
              <div className="rounded-md bg-muted p-4 text-xs space-y-1">
                <p>
                  <span className="text-muted-foreground">상품명:</span> {productSubmitted.productName}
                </p>
                <p>
                  <span className="text-muted-foreground">가격:</span>{' '}
                  {productSubmitted.price.toLocaleString()}원
                </p>
                <p>
                  <span className="text-muted-foreground">재고:</span>{' '}
                  {productSubmitted.stock !== undefined ? `${productSubmitted.stock}개` : '(미입력)'}
                </p>
                <p>
                  <span className="text-muted-foreground">이미지 URL:</span>{' '}
                  {productSubmitted.imageUrl || '(미입력)'}
                </p>
              </div>
              <Button variant="outline" size="sm" onClick={() => setProductSubmitted(null)}>
                다시 입력
              </Button>
            </div>
          ) : (
            <form
              onSubmit={handleProductSubmit(onProductSubmit)}
              noValidate
              className="space-y-5"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="productName">
                    상품명 <span className="text-destructive text-xs">*</span>
                  </Label>
                  <Input
                    id="productName"
                    placeholder="아메리카노"
                    {...registerProduct('productName')}
                  />
                  {productErrors.productName && (
                    <p className="text-xs text-destructive">{productErrors.productName.message}</p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="price">
                    가격 (원) <span className="text-destructive text-xs">*</span>
                  </Label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="4500"
                    {...registerProduct('price')}
                  />
                  {productErrors.price && (
                    <p className="text-xs text-destructive">{productErrors.price.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="stock">
                    재고 수량{' '}
                    <span className="text-muted-foreground text-xs">(선택)</span>
                  </Label>
                  <Input
                    id="stock"
                    type="number"
                    placeholder="100"
                    {...registerProduct('stock')}
                  />
                  {productErrors.stock && (
                    <p className="text-xs text-destructive">{productErrors.stock.message}</p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="imageUrl">
                    이미지 URL{' '}
                    <span className="text-muted-foreground text-xs">(선택)</span>
                  </Label>
                  <Input
                    id="imageUrl"
                    placeholder="https://example.com/image.png"
                    {...registerProduct('imageUrl')}
                  />
                  {productErrors.imageUrl && (
                    <p className="text-xs text-destructive">{productErrors.imageUrl.message}</p>
                  )}
                </div>
              </div>

              <div className="flex gap-2 pt-1">
                <Button type="submit" disabled={isProductSubmitting}>
                  등록
                </Button>
                <Button type="button" variant="outline" onClick={() => resetProduct()}>
                  초기화
                </Button>
              </div>
            </form>
          )}

          <Separator className="my-4" />

          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground">적용된 검증 규칙</p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">상품명 2~50자</Badge>
              <Badge variant="outline">z.coerce.number() 숫자 변환</Badge>
              <Badge variant="outline">가격 100 ~ 1,000만원</Badge>
              <Badge variant="outline">.int() 정수만</Badge>
              <Badge variant="outline">.optional() 선택 필드</Badge>
              <Badge variant="outline">.or(z.literal('')) 빈값 허용</Badge>
            </div>
          </div>

          <pre className="rounded-md bg-muted p-4 text-xs overflow-x-auto leading-relaxed mt-4">
            <code>{`const productSchema = z.object({
  productName: z.string().min(2).max(50),

  // input의 value는 항상 string → coerce로 number로 자동 변환
  price: z.coerce.number().min(100).max(10_000_000),

  // 정수 + 선택 필드 (입력 안 해도 됨)
  stock: z.coerce.number().int().min(0).optional(),

  // URL 검증 + 빈 문자열도 허용
  imageUrl: z.string().url().optional().or(z.literal('')),
})`}</code>
          </pre>
        </CardContent>
      </Card>

      {/* 예시 3: defaultValues로 편집 폼 구현 (코드 예시) */}
      <Card>
        <CardHeader>
          <CardTitle>예시 3 — 편집 폼 패턴 (defaultValues)</CardTitle>
          <CardDescription>
            기존 데이터를 수정할 때는{' '}
            <code className="text-xs bg-muted px-1 py-0.5 rounded">defaultValues</code>로 초기값을
            주입합니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <pre className="rounded-md bg-muted p-4 text-xs overflow-x-auto leading-relaxed">
            <code>{`// API에서 가져온 기존 데이터를 폼에 미리 채워넣기
const { data: user } = useQuery({ queryKey: ['user', id], queryFn: fetchUser })

const { register, handleSubmit } = useForm<FormValues>({
  resolver: zodResolver(schema),
  defaultValues: {
    name: user?.name ?? '',
    email: user?.email ?? '',
  },
})

// 데이터가 로드된 후 폼 값을 교체하려면 reset() 사용
useEffect(() => {
  if (user) reset({ name: user.name, email: user.email })
}, [user, reset])`}</code>
          </pre>
        </CardContent>
      </Card>

      {/* 예시 4: 체크박스 & enum 선택 필드 */}
      <Card>
        <CardHeader>
          <CardTitle>예시 4 — 체크박스 &amp; 선택(enum) 필드</CardTitle>
          <CardDescription>
            약관 동의, 역할 선택 등 boolean / enum 타입의 필드를 다루는 패턴입니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <pre className="rounded-md bg-muted p-4 text-xs overflow-x-auto leading-relaxed">
            <code>{`const settingsSchema = z.object({
  role: z.enum(['admin', 'editor', 'viewer'], {
    errorMap: () => ({ message: '역할을 선택해주세요' }),
  }),
  agreeToTerms: z.boolean().refine((v) => v === true, {
    message: '약관에 동의해야 합니다',
  }),
  newsletter: z.boolean().optional(),
})

// JSX에서 사용
<select {...register('role')}>
  <option value="">역할 선택</option>
  <option value="admin">관리자</option>
  <option value="editor">편집자</option>
  <option value="viewer">뷰어</option>
</select>
{errors.role && <p className="text-destructive text-xs">{errors.role.message}</p>}

<input type="checkbox" {...register('agreeToTerms')} />
<label>이용약관에 동의합니다</label>
{errors.agreeToTerms && <p className="text-destructive text-xs">{errors.agreeToTerms.message}</p>}`}</code>
          </pre>
        </CardContent>
      </Card>

      {/* 예시 5: 다단계 폼 패턴 */}
      <Card>
        <CardHeader>
          <CardTitle>예시 5 — 다단계 폼 (Multi-step Form)</CardTitle>
          <CardDescription>
            단계마다 다른 스키마를 적용하고, 마지막 단계에서 통합 제출하는 패턴입니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <pre className="rounded-md bg-muted p-4 text-xs overflow-x-auto leading-relaxed">
            <code>{`// 각 단계별 스키마 분리
const step1Schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
})
const step2Schema = z.object({
  phone: z.string().min(10, '전화번호를 입력해주세요'),
  address: z.string().min(5, '주소를 입력해주세요'),
})

// 단계 상태 관리
const [currentStep, setCurrentStep] = useState(1)
const [formData, setFormData] = useState({})

// 각 단계 완료 시 데이터 누적 + 다음 단계 이동
function onStep1Submit(data) {
  setFormData((prev) => ({ ...prev, ...data }))
  setCurrentStep(2)
}

// 마지막 단계에서 통합 제출
function onStep2Submit(data) {
  const fullData = { ...formData, ...data }
  // fullData를 API로 전송
  submitToAPI(fullData)
}`}</code>
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
            "이름(2자 이상), 이메일(형식 검증), 비밀번호(8자 이상, 대문자 포함, 숫자 포함) 필드가
            있는 회원가입 폼을 React Hook Form + Zod로 만들어줘. 각 필드 아래에 에러 메시지가
            빨간색으로 나타나게 해줘. shadcn/ui의 Input, Label, Button을 써줘."
          </div>
          <ul className="space-y-1.5">
            <li>
              •{' '}
              <strong className="text-foreground">에러 메시지는 Zod schema에</strong> 직접 씁니다:{' '}
              <code className="text-xs bg-muted px-1 py-0.5 rounded">
                z.string().min(2, '2자 이상 입력하세요')
              </code>
            </li>
            <li>
              •{' '}
              <strong className="text-foreground">기존 데이터 수정 폼</strong>:{' '}
              <code className="text-xs bg-muted px-1 py-0.5 rounded">defaultValues</code>에 API
              응답을 넣으면 폼이 미리 채워집니다 (예시 3 참고)
            </li>
            <li>
              •{' '}
              <strong className="text-foreground">제출 버튼 중복 클릭 방지</strong>:{' '}
              <code className="text-xs bg-muted px-1 py-0.5 rounded">
                disabled={'{isSubmitting}'}
              </code>
              으로 자동 처리됩니다
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
              • <strong className="text-foreground">회원가입 / 로그인 폼</strong> — 이메일, 비밀번호
              형식 검증 (예시 1)
            </li>
            <li>
              • <strong className="text-foreground">상품 등록/수정 폼</strong> — 가격, 수량 등 숫자
              타입 검증, 선택 필드 (예시 2)
            </li>
            <li>
              • <strong className="text-foreground">프로필 수정 폼</strong> — 기존 값을{' '}
              <code className="text-xs bg-muted px-1 py-0.5 rounded">defaultValues</code>로 채워넣기
              (예시 3)
            </li>
            <li>
              • <strong className="text-foreground">다단계 폼(step form)</strong> — 단계별로 다른
              schema를 적용
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
            <strong className="text-foreground">핵심:</strong> 검증 규칙이 바뀌면 schema만
            수정하면 됩니다. 에러 메시지도 schema에 같이 정의하므로 관리가 쉽습니다.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
