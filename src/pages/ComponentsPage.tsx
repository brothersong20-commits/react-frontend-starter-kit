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
  Info,
  Rocket,
  Bell,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  User,
  Mail,
  ArrowUpRight,
} from 'lucide-react'

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
          <div>
            <p className="text-xs text-muted-foreground mb-2">variant</p>
            <div className="flex flex-wrap gap-2">
              <Button>Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="link">Link</Button>
            </div>
          </div>
          <Separator />
          <div>
            <p className="text-xs text-muted-foreground mb-2">size</p>
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
            </div>
          </div>
          <Separator />
          <div>
            <p className="text-xs text-muted-foreground mb-2">아이콘 조합 & 상태</p>
            <div className="flex flex-wrap items-center gap-2">
              <Button>
                <Download className="mr-1" /> 다운로드
              </Button>
              <Button variant="outline">
                <Plus className="mr-1" /> 추가
              </Button>
              <Button variant="outline" disabled>
                비활성
              </Button>
              <Button variant="destructive">
                <Trash2 className="mr-1" /> 삭제
              </Button>
              <Button variant="secondary">
                <Check className="mr-1" /> 완료 처리
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Badge */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Badge</CardTitle>
          <CardDescription>상태 표시 레이블 — variant & 커스텀 색상</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-xs text-muted-foreground mb-2">기본 variant</p>
            <div className="flex flex-wrap gap-2">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="destructive">Destructive</Badge>
            </div>
          </div>
          <Separator />
          <div>
            <p className="text-xs text-muted-foreground mb-2">상태 표시 (커스텀 색상)</p>
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-emerald-500/15 text-emerald-600 border-emerald-200">
                <Check className="size-3 mr-1" />
                완료
              </Badge>
              <Badge className="bg-amber-500/15 text-amber-600 border-amber-200">진행 중</Badge>
              <Badge className="bg-sky-500/15 text-sky-600 border-sky-200">
                <ExternalLink className="size-3 mr-1" />
                링크
              </Badge>
              <Badge className="bg-red-500/15 text-red-600 border-red-200">오류</Badge>
              <Badge className="bg-violet-500/15 text-violet-600 border-violet-200">베타</Badge>
              <Badge className="bg-slate-500/15 text-slate-600 border-slate-200">보류</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Input + Label */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Input + Label</CardTitle>
          <CardDescription>폼 입력 컴포넌트 — type 별 사용 예시</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="demo-name">이름 (text)</Label>
              <Input id="demo-name" placeholder="홍길동" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="demo-email">이메일 (email)</Label>
              <Input id="demo-email" type="email" placeholder="example@email.com" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="demo-password">비밀번호 (password)</Label>
              <Input id="demo-password" type="password" placeholder="8자 이상" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="demo-number">숫자 (number)</Label>
              <Input id="demo-number" type="number" placeholder="1000" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="demo-search">검색 (search)</Label>
              <Input id="demo-search" type="search" placeholder="검색어 입력..." />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="demo-disabled">비활성 입력</Label>
              <Input id="demo-disabled" placeholder="입력 불가" disabled />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Separator */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Separator</CardTitle>
          <CardDescription>가로/세로 구분선 — 섹션 분리에 사용</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-xs text-muted-foreground mb-3">가로 구분선 (horizontal, 기본값)</p>
            <div className="space-y-3 text-sm">
              <p>첫 번째 섹션</p>
              <Separator />
              <p>두 번째 섹션</p>
              <Separator />
              <p>세 번째 섹션</p>
            </div>
          </div>
          <Separator />
          <div>
            <p className="text-xs text-muted-foreground mb-3">세로 구분선 (vertical)</p>
            <div className="flex items-center gap-4 text-sm">
              <span>홈</span>
              <Separator orientation="vertical" className="h-4" />
              <span>소개</span>
              <Separator orientation="vertical" className="h-4" />
              <span>서비스</span>
              <Separator orientation="vertical" className="h-4" />
              <span>연락처</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Card</CardTitle>
          <CardDescription>컨텐츠 컨테이너 — Header / Content / Footer 구조</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {['분석', '리포트', '설정', '사용자'].map((title) => (
              <Card key={title} className="border-border">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">{title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">
                    {title} 관련 내용이 여기에 표시됩니다.
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 실전 UI 패턴 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">실전 UI 패턴</CardTitle>
          <CardDescription>컴포넌트를 조합해서 만드는 일반적인 레이아웃 패턴</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">

          {/* 알림 아이템 패턴 */}
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground">알림 아이템 (Badge + Icon + Card)</p>
            <div className="space-y-2">
              {[
                {
                  icon: Bell,
                  iconColor: 'text-sky-500',
                  title: '새 댓글이 달렸습니다',
                  desc: '2분 전',
                  badge: '새 알림',
                  badgeClass: 'bg-sky-500/15 text-sky-600 border-sky-200',
                },
                {
                  icon: Check,
                  iconColor: 'text-emerald-500',
                  title: '주문 #1042가 배송 완료되었습니다',
                  desc: '1시간 전',
                  badge: '완료',
                  badgeClass: 'bg-emerald-500/15 text-emerald-600 border-emerald-200',
                },
                {
                  icon: AlertTriangle,
                  iconColor: 'text-amber-500',
                  title: '결제 수단이 만료될 예정입니다',
                  desc: '어제',
                  badge: '주의',
                  badgeClass: 'bg-amber-500/15 text-amber-600 border-amber-200',
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div className="flex items-center gap-3">
                    <item.icon className={`size-4 shrink-0 ${item.iconColor}`} />
                    <div>
                      <p className="text-sm font-medium">{item.title}</p>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                  <Badge className={`shrink-0 ${item.badgeClass}`}>{item.badge}</Badge>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* 통계 카드 패턴 */}
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground">통계 카드 (Card + Badge + Icon)</p>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: '총 사용자', value: '1,284', change: '+12%', up: true },
                { label: '오늘 주문', value: '48건', change: '+5%', up: true },
                { label: '취소율', value: '2.4%', change: '+0.3%', up: false },
              ].map((stat) => (
                <Card key={stat.label} className="border">
                  <CardContent className="pt-4">
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold mt-1">{stat.value}</p>
                    <div className="flex items-center gap-1 mt-2">
                      {stat.up ? (
                        <TrendingUp className="size-3 text-emerald-500" />
                      ) : (
                        <TrendingDown className="size-3 text-red-500" />
                      )}
                      <Badge
                        className={`text-xs ${
                          stat.up
                            ? 'bg-emerald-500/15 text-emerald-600 border-emerald-200'
                            : 'bg-red-500/15 text-red-600 border-red-200'
                        }`}
                      >
                        {stat.change}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Separator />

          {/* 사용자 프로필 카드 패턴 */}
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground">사용자 목록 아이템 (Card + Badge + Button)</p>
            <div className="space-y-2">
              {[
                { name: '김민준', email: 'minjun@example.com', role: '관리자', active: true },
                { name: '이서연', email: 'seoyeon@example.com', role: '편집자', active: true },
                { name: '박도윤', email: 'doyun@example.com', role: '뷰어', active: false },
              ].map((user) => (
                <div
                  key={user.email}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="size-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                      <User className="size-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Mail className="size-3" />
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className={
                        user.active
                          ? 'bg-emerald-500/10 text-emerald-600 border-emerald-200'
                          : 'text-muted-foreground'
                      }
                    >
                      {user.active ? '활성' : '비활성'}
                    </Badge>
                    <Badge variant="secondary">{user.role}</Badge>
                    <Button size="icon" variant="ghost" className="size-7">
                      <ArrowUpRight className="size-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
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
