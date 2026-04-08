import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Star, Trash2, Download, Plus, ExternalLink, Check, Info, Rocket } from 'lucide-react'

export function ComponentsPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-bold">shadcn/ui 컴포넌트</h2>
        <p className="mt-1 text-muted-foreground">
          Radix UI 기반 접근성 컴포넌트 — Tailwind v4 + CSS Variables 스타일링
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
            shadcn/ui는{' '}
            <strong className="text-foreground">
              명령어 한 줄로 내 프로젝트에 추가하는 UI 컴포넌트 모음
            </strong>
            입니다.
          </p>
          <p>
            npm으로 설치하는 라이브러리가 아니라, 명령어를 실행하면 컴포넌트 소스코드가{' '}
            <code className="text-xs bg-muted px-1 py-0.5 rounded">src/components/ui/</code>에
            직접 생성됩니다. 그래서 디자인을 마음대로 수정할 수 있습니다.
          </p>
          <p>
            버튼, 입력창, 카드, 모달, 드롭다운 등 자주 쓰는 UI 요소들이 준비되어 있고, 다크 모드와
            접근성이 기본으로 지원됩니다.
          </p>
        </CardContent>
      </Card>

      {/* Button */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Button</CardTitle>
          <CardDescription>variant & size 조합</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Button>Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="link">Link</Button>
          </div>
          <Separator />
          <div className="flex flex-wrap items-center gap-2">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
            <Button size="icon" variant="outline">
              <Star />
            </Button>
            <Button size="icon" variant="outline">
              <Trash2 />
            </Button>
            <Button>
              <Download className="mr-1" /> 다운로드
            </Button>
            <Button variant="outline">
              <Plus className="mr-1" /> 추가
            </Button>
            <Button variant="outline" disabled>
              비활성
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Badge */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Badge</CardTitle>
          <CardDescription>상태 표시 레이블</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge className="bg-emerald-500/15 text-emerald-600 border-emerald-200">
              <Check className="size-3 mr-1" />
              완료
            </Badge>
            <Badge className="bg-amber-500/15 text-amber-600 border-amber-200">진행 중</Badge>
            <Badge className="bg-sky-500/15 text-sky-600 border-sky-200">
              <ExternalLink className="size-3 mr-1" />
              링크
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Input + Label */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Input + Label</CardTitle>
          <CardDescription>폼 입력 컴포넌트</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 max-w-sm">
          <div className="space-y-1.5">
            <Label htmlFor="demo-name">이름</Label>
            <Input id="demo-name" placeholder="홍길동" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="demo-email">이메일</Label>
            <Input id="demo-email" type="email" placeholder="example@email.com" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="demo-disabled">비활성 입력</Label>
            <Input id="demo-disabled" placeholder="입력 불가" disabled />
          </div>
        </CardContent>
      </Card>

      {/* Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Card</CardTitle>
          <CardDescription>컨텐츠 컨테이너 컴포넌트</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {['분석', '리포트', '설정', '사용자'].map((title) => (
              <Card key={title} className="border-border">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">{title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">{title} 관련 내용이 여기에 표시됩니다.</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 적용 가이드 */}
      <Card className="border-violet-500/20 bg-violet-500/5">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-1.5">
            <Rocket className="size-4 text-violet-500" />
            내 프로젝트에 컴포넌트 추가하기
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="text-sm space-y-3 text-muted-foreground list-decimal list-inside">
            <li>
              <strong className="text-foreground">원하는 컴포넌트 추가</strong> — button 자리에
              원하는 컴포넌트 이름을 넣으세요
              <pre className="mt-1 ml-4 rounded bg-muted px-3 py-2 text-xs">
                npx shadcn@latest add button
              </pre>
            </li>
            <li>
              <strong className="text-foreground">
                <code className="text-xs bg-muted px-1 py-0.5 rounded">
                  src/components/ui/button.tsx
                </code>{' '}
                파일이 생성됩니다
              </strong>{' '}
              — 이 파일을 직접 수정해서 디자인을 커스터마이징할 수 있습니다
            </li>
            <li>
              <strong className="text-foreground">import해서 바로 사용</strong>
              <pre className="mt-1 ml-4 rounded bg-muted px-3 py-2 text-xs overflow-x-auto">
                {`import { Button } from '@/components/ui/button'

<Button variant="outline" size="sm">클릭</Button>`}
              </pre>
            </li>
          </ol>
          <p className="mt-4 text-xs text-muted-foreground border-t pt-3">
            💡 <strong className="text-foreground">어떤 컴포넌트가 있나요?</strong> Button, Input,
            Card, Dialog, Select, Table, Toast 등 40개 이상의 컴포넌트가 준비되어 있습니다. 전체
            목록은{' '}
            <a
              href="https://ui.shadcn.com/docs/components"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline underline-offset-2"
            >
              shadcn/ui 공식 문서
            </a>
            에서 확인하세요.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
