import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  Star,
  Trash2,
  Download,
  Plus,
  ExternalLink,
  Check,
} from 'lucide-react'

export function ComponentsPage() {
  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h2 className="text-2xl font-bold">shadcn/ui 컴포넌트</h2>
        <p className="mt-1 text-muted-foreground">
          Radix UI 기반 접근성 컴포넌트 — Tailwind v4 + CSS Variables 스타일링
        </p>
      </div>

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
            <Button size="icon" variant="outline"><Star /></Button>
            <Button size="icon" variant="outline"><Trash2 /></Button>
            <Button><Download className="mr-1" /> 다운로드</Button>
            <Button variant="outline"><Plus className="mr-1" /> 추가</Button>
            <Button variant="outline" disabled>비활성</Button>
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
            <Badge className="bg-amber-500/15 text-amber-600 border-amber-200">
              진행 중
            </Badge>
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
    </div>
  )
}
