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
import { Info, Lightbulb, Rocket } from 'lucide-react'

const initialNodes = [
  {
    id: '1',
    position: { x: 80, y: 80 },
    data: { label: 'Input Node' },
    type: 'input',
  },
  {
    id: '2',
    position: { x: 320, y: 80 },
    data: { label: 'Process Node' },
  },
  {
    id: '3',
    position: { x: 320, y: 220 },
    data: { label: 'Another Process' },
  },
  {
    id: '4',
    position: { x: 560, y: 150 },
    data: { label: 'Output Node' },
    type: 'output',
  },
]

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e1-3', source: '1', target: '3' },
  { id: 'e2-4', source: '2', target: '4' },
  { id: 'e3-4', source: '3', target: '4' },
]

export function FlowPage() {
  const [nodes, , onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  const onConnect = useCallback(
    (connection: Connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
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

      <Card>
        <CardHeader>
          <CardTitle>노드 에디터 데모</CardTitle>
          <CardDescription>
            노드를 드래그하거나, 핸들을 드래그해서 새 연결을 만들어보세요.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div style={{ height: 400 }} className="rounded-b-lg overflow-hidden">
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              fitView
            >
              <Controls />
              <MiniMap />
              <Background variant={BackgroundVariant.Dots} gap={16} size={1} />
            </ReactFlow>
          </div>
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
              AI 모델이 데이터를 주고받는 흐름을 다이어그램으로 표현
            </li>
            <li>
              • <strong className="text-foreground">업무 프로세스/워크플로 설계 도구</strong> —
              결재선, 승인 흐름을 시각적으로 편집
            </li>
            <li>
              • <strong className="text-foreground">데이터 흐름 다이어그램</strong> — ETL 파이프라인,
              API 연결 구조 시각화
            </li>
            <li>
              • <strong className="text-foreground">마인드맵 / 조직도 빌더</strong> — 계층 구조를
              드래그로 편집
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
              <strong className="text-foreground">엣지 배열 정의</strong>
              <pre className="mt-1 ml-4 rounded bg-muted px-3 py-2 text-xs">
                {`const edges = [{ id: 'e1-2', source: '1', target: '2' }]`}
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
