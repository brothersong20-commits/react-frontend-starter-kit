import { useCallback } from 'react'
import {
  ReactFlow,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  MiniMap,
  Background,
  BackgroundVariant,
  type Connection,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Info, Lightbulb, Rocket, Sparkles } from 'lucide-react'

// ─── 예시 1: 주문 처리 플로우 ───────────────────────────────────
const orderNodes = [
  {
    id: '1',
    position: { x: 60, y: 160 },
    data: { label: '주문 접수' },
    type: 'input',
    style: { background: '#dbeafe', border: '1px solid #93c5fd', borderRadius: 8 },
  },
  {
    id: '2',
    position: { x: 280, y: 60 },
    data: { label: '결제 처리' },
    style: { background: '#fef9c3', border: '1px solid #fde047', borderRadius: 8 },
  },
  {
    id: '3',
    position: { x: 280, y: 260 },
    data: { label: '재고 확인' },
    style: { background: '#fef9c3', border: '1px solid #fde047', borderRadius: 8 },
  },
  {
    id: '4',
    position: { x: 500, y: 160 },
    data: { label: '배송 준비' },
    style: { background: '#d1fae5', border: '1px solid #6ee7b7', borderRadius: 8 },
  },
  {
    id: '5',
    position: { x: 700, y: 160 },
    data: { label: '배송 완료' },
    type: 'output',
    style: { background: '#ede9fe', border: '1px solid #c4b5fd', borderRadius: 8 },
  },
]

const orderEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true, label: '결제 요청' },
  { id: 'e1-3', source: '1', target: '3', animated: true, label: '재고 요청' },
  { id: 'e2-4', source: '2', target: '4', label: '결제 완료' },
  { id: 'e3-4', source: '3', target: '4', label: '재고 확인 완료' },
  { id: 'e4-5', source: '4', target: '5', animated: true, label: '배송 출발' },
]

// ─── 예시 2: AI 에이전트 파이프라인 ───────────────────────────────
const agentNodes = [
  {
    id: 'a1',
    position: { x: 60, y: 80 },
    data: { label: '사용자 입력' },
    type: 'input',
    style: { background: '#dbeafe', border: '1px solid #93c5fd', borderRadius: 8 },
  },
  {
    id: 'a2',
    position: { x: 280, y: 30 },
    data: { label: '의도 분석 Agent' },
    style: { background: '#fce7f3', border: '1px solid #f9a8d4', borderRadius: 8 },
  },
  {
    id: 'a3',
    position: { x: 280, y: 140 },
    data: { label: 'RAG 검색 Agent' },
    style: { background: '#fce7f3', border: '1px solid #f9a8d4', borderRadius: 8 },
  },
  {
    id: 'a4',
    position: { x: 500, y: 80 },
    data: { label: '응답 생성 Agent' },
    style: { background: '#fef9c3', border: '1px solid #fde047', borderRadius: 8 },
  },
  {
    id: 'a5',
    position: { x: 700, y: 80 },
    data: { label: '최종 출력' },
    type: 'output',
    style: { background: '#d1fae5', border: '1px solid #6ee7b7', borderRadius: 8 },
  },
]

const agentEdges = [
  { id: 'ae1-2', source: 'a1', target: 'a2', animated: true },
  { id: 'ae1-3', source: 'a1', target: 'a3', animated: true },
  { id: 'ae2-4', source: 'a2', target: 'a4' },
  { id: 'ae3-4', source: 'a3', target: 'a4' },
  { id: 'ae4-5', source: 'a4', target: 'a5', animated: true },
]

export function FlowPage() {
  const [orderNodesState, , onOrderNodesChange] = useNodesState(orderNodes)
  const [orderEdgesState, setOrderEdges, onOrderEdgesChange] = useEdgesState(orderEdges)

  const [agentNodesState, , onAgentNodesChange] = useNodesState(agentNodes)
  const [agentEdgesState, setAgentEdges, onAgentEdgesChange] = useEdgesState(agentEdges)

  const onOrderConnect = useCallback(
    (connection: Connection) => setOrderEdges((eds) => addEdge(connection, eds)),
    [setOrderEdges]
  )

  const onAgentConnect = useCallback(
    (connection: Connection) => setAgentEdges((eds) => addEdge(connection, eds)),
    [setAgentEdges]
  )

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold">@xyflow/react</h2>
        <p className="mt-1 text-muted-foreground">
          인터랙티브 노드 에디터 — 드래그, 연결, 미니맵 기능
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
            @xyflow/react는{' '}
            <strong className="text-foreground">
              드래그로 노드(박스)를 연결하는 다이어그램 라이브러리
            </strong>
            입니다.
          </p>
          <p>
            노드와 엣지(연결선)를 일반 JavaScript 배열로 정의하면, 드래그, 줌, 새 연결 생성이 모두
            가능한 인터랙티브 에디터가 자동으로 만들어집니다.
          </p>
          <p>
            아래 에디터에서 직접 노드를 드래그해서 위치를 바꾸거나, 노드 끝의 작은 점(핸들)을
            드래그해서 새 연결선을 만들어보세요.
          </p>
        </CardContent>
      </Card>

      {/* 예시 1: 주문 처리 플로우 */}
      <Card>
        <CardHeader>
          <CardTitle>예시 1 — 주문 처리 플로우</CardTitle>
          <CardDescription>
            주문 접수 → 결제/재고 병렬 처리 → 배송 준비 → 배송 완료. 노드를 드래그하거나 핸들에서
            새 연결선을 만들어보세요.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div style={{ height: 380 }} className="rounded-b-lg overflow-hidden">
            <ReactFlow
              nodes={orderNodesState}
              edges={orderEdgesState}
              onNodesChange={onOrderNodesChange}
              onEdgesChange={onOrderEdgesChange}
              onConnect={onOrderConnect}
              fitView
            >
              <Controls />
              <MiniMap />
              <Background variant={BackgroundVariant.Dots} gap={16} size={1} />
            </ReactFlow>
          </div>
        </CardContent>
      </Card>

      {/* 예시 2: AI 에이전트 파이프라인 */}
      <Card>
        <CardHeader>
          <CardTitle>예시 2 — AI 에이전트 파이프라인</CardTitle>
          <CardDescription>
            여러 AI 에이전트가 병렬로 처리한 결과를 합쳐서 응답을 생성하는 흐름입니다.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div style={{ height: 300 }} className="rounded-b-lg overflow-hidden">
            <ReactFlow
              nodes={agentNodesState}
              edges={agentEdgesState}
              onNodesChange={onAgentNodesChange}
              onEdgesChange={onAgentEdgesChange}
              onConnect={onAgentConnect}
              fitView
            >
              <Controls />
              <Background variant={BackgroundVariant.Dots} gap={16} size={1} />
            </ReactFlow>
          </div>
        </CardContent>
      </Card>

      {/* 예시 3: 노드 데이터 구조 */}
      <Card>
        <CardHeader>
          <CardTitle>예시 3 — 노드/엣지 데이터 구조</CardTitle>
          <CardDescription>
            API 응답 데이터를 그대로 nodes/edges 배열로 변환해서 동적 다이어그램을 생성할 수
            있습니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <pre className="rounded-md bg-muted p-4 text-xs overflow-x-auto leading-relaxed">
            <code>{`// 노드: id, position, data.label 이 필수
const nodes = [
  {
    id: '1',
    position: { x: 60, y: 160 },
    data: { label: '주문 접수' },
    type: 'input',                // 'input' | 'output' | undefined(기본)
    style: {                      // 인라인 스타일로 색상 커스터마이징
      background: '#dbeafe',
      border: '1px solid #93c5fd',
      borderRadius: 8,
    },
  },
]

// 엣지: id, source, target 이 필수
const edges = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    animated: true,     // 점선 애니메이션
    label: '결제 요청', // 엣지 위에 표시할 텍스트
  },
]`}</code>
          </pre>
        </CardContent>
      </Card>

      {/* 예시 4: 커스텀 노드 컴포넌트 */}
      <Card>
        <CardHeader>
          <CardTitle>예시 4 — 커스텀 노드 컴포넌트</CardTitle>
          <CardDescription>
            기본 사각형 노드 대신 React 컴포넌트로 만든 커스텀 노드를 사용하면 아이콘,
            상태 표시, 버튼 등을 자유롭게 넣을 수 있습니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <pre className="rounded-md bg-muted p-4 text-xs overflow-x-auto leading-relaxed">
            <code>{`import { Handle, Position } from '@xyflow/react'

// 상태(running/done/error)를 색상으로 표시하는 커스텀 노드
function StatusNode({ data }: { data: { label: string; status: 'running' | 'done' | 'error' } }) {
  const colorMap = {
    running: 'bg-amber-400',
    done: 'bg-emerald-400',
    error: 'bg-red-400',
  }

  return (
    <div className="rounded-lg border bg-white p-3 shadow-md min-w-32">
      <Handle type="target" position={Position.Left} />
      <div className="flex items-center gap-2">
        <span className={\`h-2 w-2 rounded-full \${colorMap[data.status]}\`} />
        <span className="text-sm font-medium">{data.label}</span>
      </div>
      <Handle type="source" position={Position.Right} />
    </div>
  )
}

// ReactFlow에 nodeTypes로 등록
const nodeTypes = { status: StatusNode }

const nodes = [
  { id: '1', type: 'status', position: { x: 0, y: 0 },
    data: { label: '데이터 수집', status: 'done' } },
  { id: '2', type: 'status', position: { x: 200, y: 0 },
    data: { label: '모델 학습', status: 'running' } },
]

<ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes} />`}</code>
          </pre>
        </CardContent>
      </Card>

      {/* 예시 5: API 데이터로 동적 다이어그램 */}
      <Card>
        <CardHeader>
          <CardTitle>예시 5 — API 데이터 → 동적 다이어그램</CardTitle>
          <CardDescription>
            서버에서 받은 데이터를 nodes/edges 배열로 변환해서 실시간 다이어그램을 만드는
            패턴입니다. TanStack Query와 함께 사용합니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <pre className="rounded-md bg-muted p-4 text-xs overflow-x-auto leading-relaxed">
            <code>{`// API 응답 타입
interface Task {
  id: string
  name: string
  dependsOn: string[] // 선행 작업 ID 목록
}

// API 데이터를 ReactFlow 형식으로 변환
function tasksToFlow(tasks: Task[]) {
  const nodes = tasks.map((task, index) => ({
    id: task.id,
    position: { x: (index % 3) * 220, y: Math.floor(index / 3) * 120 },
    data: { label: task.name },
  }))

  const edges = tasks.flatMap((task) =>
    task.dependsOn.map((dep) => ({
      id: \`\${dep}-\${task.id}\`,
      source: dep,
      target: task.id,
      animated: true,
    }))
  )

  return { nodes, edges }
}

// TanStack Query와 함께 사용
const { data: tasks } = useQuery({ queryKey: ['tasks'], queryFn: fetchTasks })
const { nodes, edges } = tasks ? tasksToFlow(tasks) : { nodes: [], edges: [] }`}</code>
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
            "xyflow/react로 업무 승인 프로세스를 시각화하고 싶어. 노드는 '요청 제출', '팀장 검토',
            '인사팀 검토', '최종 승인' 4단계고, 각 노드를 파란색/노란색/초록색으로 구분해줘. 노드를
            드래그해서 위치를 바꿀 수 있어야 해."
          </div>
          <ul className="space-y-1.5">
            <li>
              •{' '}
              <strong className="text-foreground">부모 div에 반드시 고정 높이</strong>를 줘야
              합니다:{' '}
              <code className="text-xs bg-muted px-1 py-0.5 rounded">
                {'<div style={{ height: 400 }}>'}
              </code>
            </li>
            <li>
              •{' '}
              <strong className="text-foreground">노드 색상 커스터마이징</strong>: 노드 객체의{' '}
              <code className="text-xs bg-muted px-1 py-0.5 rounded">style</code> 속성에 인라인
              스타일을 넣으세요 (예시 1, 2 참고)
            </li>
            <li>
              •{' '}
              <strong className="text-foreground">API 데이터 연동</strong>: TanStack Query +
              ReactFlow를 함께 쓰면 서버 데이터로 실시간 다이어그램을 만들 수 있습니다 (예시 5
              참고)
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
              • <strong className="text-foreground">AI 에이전트 파이프라인 시각화</strong> — 여러
              AI 모델이 데이터를 주고받는 흐름을 다이어그램으로 표현 (예시 2!)
            </li>
            <li>
              • <strong className="text-foreground">업무 프로세스/워크플로 설계 도구</strong> —
              결재선, 승인 흐름을 시각적으로 편집 (예시 1!)
            </li>
            <li>
              • <strong className="text-foreground">데이터 흐름 다이어그램</strong> — ETL 파이프라인,
              API 연결 구조 시각화
            </li>
            <li>
              • <strong className="text-foreground">마인드맵 / 조직도 빌더</strong> — 계층 구조를
              드래그로 편집
            </li>
            <li>
              • <strong className="text-foreground">노코드 자동화 빌더</strong> — n8n, Zapier처럼
              블록을 연결해 로직을 구성하는 UI
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
                npm install @xyflow/react
              </pre>
            </li>
            <li>
              <strong className="text-foreground">CSS import 추가</strong> — 없으면 스타일이
              깨집니다
              <pre className="mt-1 ml-4 rounded bg-muted px-3 py-2 text-xs">
                {`import '@xyflow/react/dist/style.css'`}
              </pre>
            </li>
            <li>
              <strong className="text-foreground">노드 배열 정의</strong>
              <pre className="mt-1 ml-4 rounded bg-muted px-3 py-2 text-xs overflow-x-auto">
                {`const nodes = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: '시작' } },
  { id: '2', position: { x: 200, y: 0 }, data: { label: '끝' } },
]`}
              </pre>
            </li>
            <li>
              <strong className="text-foreground">ReactFlow 렌더링</strong> — 부모 요소에 고정
              높이가 필요합니다
              <pre className="mt-1 ml-4 rounded bg-muted px-3 py-2 text-xs overflow-x-auto">
                {`<div style={{ height: 400 }}>
  <ReactFlow nodes={nodes} edges={edges} fitView />
</div>`}
              </pre>
            </li>
          </ol>
          <p className="mt-4 text-xs text-muted-foreground border-t pt-3">
            💡 <strong className="text-foreground">핵심:</strong> 노드/엣지는 일반 JS 배열이므로
            API에서 받은 데이터로 동적으로 다이어그램을 생성할 수 있습니다.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
