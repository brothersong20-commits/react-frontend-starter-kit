import { useCallback, useMemo, useState } from 'react'
import {
  ReactFlow,
  addEdge,
  useNodesState,
  useEdgesState,
  useReactFlow,
  Controls,
  MiniMap,
  Background,
  BackgroundVariant,
  Handle,
  Panel,
  Position,
  type Connection,
  type Node,
  type Edge,
  type NodeChange,
  type EdgeChange,
  type NodeProps,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Info, Lightbulb, Rocket, Sparkles } from 'lucide-react'
import { useThemeStore } from '@/store/useThemeStore'

// ─── 커스텀 노드: 동서남북 4방향 핸들 ───────────────────────────
// 각 방향에 source + target 핸들을 겹쳐 배치 → 어느 방향으로든 연결 가능
function MultiHandleNode({ data }: NodeProps) {
  const borderColor = (data.borderColor as string) ?? '#555'
  const hs = { width: 8, height: 8 } // 핸들 크기

  return (
    <div
      className="bg-background text-foreground text-xs font-medium px-3 py-1.5 rounded-lg"
      style={{ border: `2px solid ${borderColor}`, minWidth: 80, textAlign: 'center' }}
    >
      {/* 북(Top) */}
      <Handle type="target" position={Position.Top} id="top-t" style={hs} />
      <Handle type="source" position={Position.Top} id="top-s" style={hs} />
      {/* 동(Right) */}
      <Handle type="target" position={Position.Right} id="right-t" style={hs} />
      <Handle type="source" position={Position.Right} id="right-s" style={hs} />
      {/* 남(Bottom) */}
      <Handle type="target" position={Position.Bottom} id="bottom-t" style={hs} />
      <Handle type="source" position={Position.Bottom} id="bottom-s" style={hs} />
      {/* 서(Left) */}
      <Handle type="target" position={Position.Left} id="left-t" style={hs} />
      <Handle type="source" position={Position.Left} id="left-s" style={hs} />
      {data.label as string}
    </div>
  )
}

// ─── Undo/Redo 히스토리 훅 ─────────────────────────────────────
// 노드·엣지 삭제 / 드래그 완료 / 연결 시 스냅샷 저장 → undo/redo 지원
function useFlowHistory(initNodes: Node[], initEdges: Edge[]) {
  const [nodes, setNodes, baseOnNodesChange] = useNodesState(initNodes)
  const [edges, setEdges, baseOnEdgesChange] = useEdgesState(initEdges)
  const [past, setPast] = useState<Array<{ nodes: Node[]; edges: Edge[] }>>([])
  const [future, setFuture] = useState<Array<{ nodes: Node[]; edges: Edge[] }>>([])

  // 현재 상태를 과거 스택에 저장
  const snapshot = useCallback(() => {
    setPast((p) => [...p.slice(-19), { nodes, edges }])
    setFuture([])
  }, [nodes, edges])

  // 삭제 변경 시 자동 스냅샷
  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {
      if (changes.some((c) => c.type === 'remove')) snapshot()
      baseOnNodesChange(changes)
    },
    [snapshot, baseOnNodesChange]
  )
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      if (changes.some((c) => c.type === 'remove')) snapshot()
      baseOnEdgesChange(changes)
    },
    [snapshot, baseOnEdgesChange]
  )

  const undo = useCallback(() => {
    if (!past.length) return
    const prev = past[past.length - 1]
    setFuture((f) => [{ nodes, edges }, ...f.slice(0, 19)])
    setPast((p) => p.slice(0, -1))
    setNodes(prev.nodes)
    setEdges(prev.edges)
  }, [past, nodes, edges, setNodes, setEdges])

  const redo = useCallback(() => {
    if (!future.length) return
    const next = future[0]
    setPast((p) => [...p.slice(-19), { nodes, edges }])
    setFuture((f) => f.slice(1))
    setNodes(next.nodes)
    setEdges(next.edges)
  }, [future, nodes, edges, setNodes, setEdges])

  return {
    nodes, edges,
    onNodesChange, onEdgesChange, setEdges,
    snapshot, undo, redo,
    canUndo: past.length > 0,
    canRedo: future.length > 0,
  }
}

// ─── 되돌리기·삭제 컨트롤 패널 ─────────────────────────────────
// ReactFlow 컨텍스트 내부에서 렌더되므로 useReactFlow 사용 가능
function FlowControls({
  onUndo, onRedo, canUndo, canRedo,
}: {
  onUndo: () => void
  onRedo: () => void
  canUndo: boolean
  canRedo: boolean
}) {
  const { setNodes, setEdges } = useReactFlow()

  // 선택된 노드·엣지 삭제
  const deleteSelected = useCallback(() => {
    setNodes((nds) => nds.filter((n) => !n.selected))
    setEdges((eds) => eds.filter((e) => !e.selected))
  }, [setNodes, setEdges])

  const btn =
    'rounded border border-border bg-background px-2 py-1 text-[11px] text-foreground hover:bg-muted disabled:opacity-30 cursor-pointer disabled:cursor-default'

  return (
    <Panel position="top-right" className="flex gap-1 m-2">
      <button onClick={onUndo} disabled={!canUndo} title="되돌리기" className={btn}>↩ 되돌리기</button>
      <button onClick={onRedo} disabled={!canRedo} title="앞돌리기" className={btn}>↪ 앞돌리기</button>
      <button
        onClick={deleteSelected}
        title="선택한 노드·엣지 삭제 (Delete 키도 가능)"
        className="rounded border border-red-500/40 bg-background px-2 py-1 text-[11px] text-red-400 hover:bg-red-500/10 cursor-pointer"
      >
        ✕ 삭제
      </button>
    </Panel>
  )
}

// ─── 예시 1: 주문 처리 플로우 ───────────────────────────────────
const orderNodes = [
  { id: '1', type: 'multiHandle', position: { x: 200, y: 0 },   data: { label: '주문 접수', borderColor: '#93c5fd' } },
  { id: '2', type: 'multiHandle', position: { x: 60,  y: 130 }, data: { label: '결제 처리', borderColor: '#fde047' } },
  { id: '3', type: 'multiHandle', position: { x: 340, y: 130 }, data: { label: '재고 확인', borderColor: '#fde047' } },
  { id: '4', type: 'multiHandle', position: { x: 200, y: 260 }, data: { label: '배송 준비', borderColor: '#6ee7b7' } },
  { id: '5', type: 'multiHandle', position: { x: 430, y: 260 }, data: { label: '배송 완료', borderColor: '#c4b5fd' } },
]

const orderEdges = [
  { id: 'e1-2', source: '1', sourceHandle: 'bottom-s', target: '2', targetHandle: 'top-t',    animated: true, label: '결제 요청' },
  { id: 'e1-3', source: '1', sourceHandle: 'bottom-s', target: '3', targetHandle: 'top-t',    animated: true, label: '재고 요청' },
  { id: 'e2-4', source: '2', sourceHandle: 'bottom-s', target: '4', targetHandle: 'top-t',    label: '결제 완료' },
  { id: 'e3-4', source: '3', sourceHandle: 'bottom-s', target: '4', targetHandle: 'top-t',    label: '재고 확인 완료' },
  { id: 'e4-5', source: '4', sourceHandle: 'right-s',  target: '5', targetHandle: 'left-t',   animated: true, label: '배송 출발' },
]

// ─── 예시 2: AI 에이전트 파이프라인 ───────────────────────────────
const agentNodes = [
  { id: 'a1', type: 'multiHandle', position: { x: 150, y: 0 },   data: { label: '사용자 입력',    borderColor: '#93c5fd' } },
  { id: 'a2', type: 'multiHandle', position: { x: 0,   y: 130 }, data: { label: '의도 분석 Agent', borderColor: '#f9a8d4' } },
  { id: 'a3', type: 'multiHandle', position: { x: 300, y: 130 }, data: { label: 'RAG 검색 Agent',  borderColor: '#f9a8d4' } },
  { id: 'a4', type: 'multiHandle', position: { x: 150, y: 260 }, data: { label: '응답 생성 Agent', borderColor: '#fde047' } },
  { id: 'a5', type: 'multiHandle', position: { x: 380, y: 260 }, data: { label: '최종 출력',       borderColor: '#6ee7b7' } },
]

const agentEdges = [
  { id: 'ae1-2', source: 'a1', sourceHandle: 'bottom-s', target: 'a2', targetHandle: 'top-t',  animated: true },
  { id: 'ae1-3', source: 'a1', sourceHandle: 'bottom-s', target: 'a3', targetHandle: 'top-t',  animated: true },
  { id: 'ae2-4', source: 'a2', sourceHandle: 'bottom-s', target: 'a4', targetHandle: 'top-t' },
  { id: 'ae3-4', source: 'a3', sourceHandle: 'bottom-s', target: 'a4', targetHandle: 'top-t' },
  { id: 'ae4-5', source: 'a4', sourceHandle: 'right-s',  target: 'a5', targetHandle: 'left-t', animated: true },
]

// ─── 예시 3: 플랜트 건설 설계 검토 절차 (EPC) ────────────────────
const plantNodes = [
  { id: 'p1', type: 'multiHandle', position: { x: 0,   y: 0   }, data: { label: '설계 착수',          borderColor: '#93c5fd' } },
  { id: 'p2', type: 'multiHandle', position: { x: 170, y: 0   }, data: { label: '기본 설계',           borderColor: '#fde047' } },
  { id: 'p3', type: 'multiHandle', position: { x: 0,   y: 120 }, data: { label: '공정 설계 (P&ID)',    borderColor: '#f9a8d4' } },
  { id: 'p4', type: 'multiHandle', position: { x: 170, y: 120 }, data: { label: '배관/기계 설계',      borderColor: '#f9a8d4' } },
  { id: 'p5', type: 'multiHandle', position: { x: 340, y: 120 }, data: { label: '구조/토목 설계',      borderColor: '#f9a8d4' } },
  { id: 'p6', type: 'multiHandle', position: { x: 510, y: 120 }, data: { label: '전기/계장 설계',      borderColor: '#f9a8d4' } },
  { id: 'p7', type: 'multiHandle', position: { x: 255, y: 250 }, data: { label: 'HAZOP 안전성 검토',   borderColor: '#fca5a5' } },
  { id: 'p8', type: 'multiHandle', position: { x: 450, y: 250 }, data: { label: '발주처(Client) 검토', borderColor: '#fde047' } },
  { id: 'p9', type: 'multiHandle', position: { x: 640, y: 250 }, data: { label: 'IFC 설계 확정',       borderColor: '#6ee7b7' } },
]

const plantEdges = [
  { id: 'pe1-2', source: 'p1', sourceHandle: 'right-s',  target: 'p2', targetHandle: 'left-t',   animated: true, label: '착수 승인' },
  { id: 'pe2-3', source: 'p2', sourceHandle: 'bottom-s', target: 'p3', targetHandle: 'top-t',    animated: true, label: 'P&ID 착수' },
  { id: 'pe2-4', source: 'p2', sourceHandle: 'bottom-s', target: 'p4', targetHandle: 'top-t',    animated: true, label: '3D 착수' },
  { id: 'pe2-5', source: 'p2', sourceHandle: 'bottom-s', target: 'p5', targetHandle: 'top-t',    animated: true, label: '구조 착수' },
  { id: 'pe2-6', source: 'p2', sourceHandle: 'bottom-s', target: 'p6', targetHandle: 'top-t',    animated: true, label: '계장 착수' },
  { id: 'pe3-7', source: 'p3', sourceHandle: 'bottom-s', target: 'p7', targetHandle: 'top-t',    label: 'P&ID 확정' },
  { id: 'pe4-7', source: 'p4', sourceHandle: 'bottom-s', target: 'p7', targetHandle: 'top-t',    label: '모델 확정' },
  { id: 'pe5-7', source: 'p5', sourceHandle: 'bottom-s', target: 'p7', targetHandle: 'top-t',    label: '구조 확정' },
  { id: 'pe6-7', source: 'p6', sourceHandle: 'bottom-s', target: 'p7', targetHandle: 'top-t',    label: '계장 확정' },
  { id: 'pe7-8', source: 'p7', sourceHandle: 'right-s',  target: 'p8', targetHandle: 'left-t',   animated: true, label: 'HAZOP 통과' },
  { id: 'pe8-9', source: 'p8', sourceHandle: 'right-s',  target: 'p9', targetHandle: 'left-t',   animated: true, label: 'Client 승인' },
]

// ─── 예시 4: 엣지 타입 비교 ───────────────────────────────────────
// 각 행: source(x:0) → target(x:340), y 간격 80px
const ROW_GAP = 80
const edgeTypeRows = [
  { label: 'default (bezier)', type: 'default', animated: false, color: undefined, width: undefined },
  { label: 'straight', type: 'straight', animated: false, color: undefined, width: undefined },
  { label: 'step', type: 'step', animated: false, color: undefined, width: undefined },
  { label: 'smoothstep', type: 'smoothstep', animated: false, color: undefined, width: undefined },
  { label: 'simplebezier', type: 'simplebezier', animated: false, color: undefined, width: undefined },
  { label: 'animated (bezier)', type: 'default', animated: true, color: undefined, width: undefined },
  { label: 'style: stroke + strokeWidth', type: 'default', animated: false, color: '#f9a8d4', width: 3 },
]

const edgeTypeNodes = edgeTypeRows.flatMap((_, i) => [
  {
    id: `es${i}`,
    position: { x: 0, y: i * ROW_GAP },
    data: { label: '시작' },
    style: { border: '2px solid #93c5fd', borderRadius: 8, fontSize: 11 },
  },
  {
    id: `et${i}`,
    position: { x: 340, y: i * ROW_GAP },
    data: { label: '끝' },
    style: { border: '2px solid #6ee7b7', borderRadius: 8, fontSize: 11 },
  },
])

const edgeTypeEdges = edgeTypeRows.map((row, i) => ({
  id: `ee${i}`,
  source: `es${i}`,
  target: `et${i}`,
  type: row.type,
  animated: row.animated,
  label: row.label,
  style: row.color ? { stroke: row.color, strokeWidth: row.width ?? 1 } : undefined,
}))

export function FlowPage() {
  const isDark = useThemeStore((state) => state.isDark)
  const colorMode = isDark ? 'dark' : 'light'

  // nodeTypes는 렌더마다 재생성되면 안 되므로 useMemo 사용
  const nodeTypes = useMemo(() => ({ multiHandle: MultiHandleNode }), [])

  const order = useFlowHistory(orderNodes, orderEdges)
  const agent = useFlowHistory(agentNodes, agentEdges)
  const plant = useFlowHistory(plantNodes, plantEdges)

  const onOrderConnect = useCallback(
    (connection: Connection) => { order.snapshot(); order.setEdges((eds) => addEdge(connection, eds)) },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [order.snapshot, order.setEdges]
  )
  const onAgentConnect = useCallback(
    (connection: Connection) => { agent.snapshot(); agent.setEdges((eds) => addEdge(connection, eds)) },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [agent.snapshot, agent.setEdges]
  )
  const onPlantConnect = useCallback(
    (connection: Connection) => { plant.snapshot(); plant.setEdges((eds) => addEdge(connection, eds)) },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [plant.snapshot, plant.setEdges]
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
          <div style={{ height: 400 }} className="rounded-b-lg overflow-hidden">
            <ReactFlow
              nodes={order.nodes}
              edges={order.edges}
              onNodesChange={order.onNodesChange}
              onEdgesChange={order.onEdgesChange}
              onConnect={onOrderConnect}
              onNodeDragStop={order.snapshot}
              nodeTypes={nodeTypes}
              colorMode={colorMode}
              defaultEdgeOptions={{ type: 'smoothstep' }}
              deleteKeyCode={['Delete', 'Backspace']}
              fitView
              fitViewOptions={{ padding: 0.12 }}
            >
              <Controls />
              <MiniMap style={{ height: 80, width: 120 }} />
              <Background variant={BackgroundVariant.Dots} gap={16} size={1} />
              <FlowControls onUndo={order.undo} onRedo={order.redo} canUndo={order.canUndo} canRedo={order.canRedo} />
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
          <div style={{ height: 400 }} className="rounded-b-lg overflow-hidden">
            <ReactFlow
              nodes={agent.nodes}
              edges={agent.edges}
              onNodesChange={agent.onNodesChange}
              onEdgesChange={agent.onEdgesChange}
              onConnect={onAgentConnect}
              onNodeDragStop={agent.snapshot}
              nodeTypes={nodeTypes}
              colorMode={colorMode}
              defaultEdgeOptions={{ type: 'smoothstep' }}
              deleteKeyCode={['Delete', 'Backspace']}
              fitView
              fitViewOptions={{ padding: 0.12 }}
            >
              <Controls />
              <MiniMap style={{ height: 80, width: 120 }} />
              <Background variant={BackgroundVariant.Dots} gap={16} size={1} />
              <FlowControls onUndo={agent.undo} onRedo={agent.redo} canUndo={agent.canUndo} canRedo={agent.canRedo} />
            </ReactFlow>
          </div>
        </CardContent>
      </Card>

      {/* 예시 3: 플랜트 건설 설계 검토 절차 */}
      <Card>
        <CardHeader>
          <CardTitle>예시 3 — 플랜트 건설 설계 검토 절차 (EPC)</CardTitle>
          <CardDescription>
            기본 설계 완료 후 공정(P&ID)·배관·구조·전기/계장 4개 분야가 병렬로 상세 설계를
            진행하고, HAZOP 안전성 검토 → 발주처(Client) 승인 → IFC(Issued for Construction)
            확정으로 이어지는 실제 EPC 플랜트 건설 프로젝트의 설계 검토 플로우입니다.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div style={{ height: 420 }} className="rounded-b-lg overflow-hidden">
            <ReactFlow
              nodes={plant.nodes}
              edges={plant.edges}
              onNodesChange={plant.onNodesChange}
              onEdgesChange={plant.onEdgesChange}
              onConnect={onPlantConnect}
              onNodeDragStop={plant.snapshot}
              nodeTypes={nodeTypes}
              colorMode={colorMode}
              defaultEdgeOptions={{ type: 'smoothstep' }}
              deleteKeyCode={['Delete', 'Backspace']}
              fitView
              fitViewOptions={{ padding: 0.12 }}
            >
              <Controls />
              <MiniMap style={{ height: 80, width: 120 }} />
              <Background variant={BackgroundVariant.Dots} gap={16} size={1} />
              <FlowControls onUndo={plant.undo} onRedo={plant.redo} canUndo={plant.canUndo} canRedo={plant.canRedo} />
            </ReactFlow>
          </div>
        </CardContent>
      </Card>

      {/* 예시 4: 엣지 타입 & 스타일 옵션 */}
      <Card>
        <CardHeader>
          <CardTitle>예시 4 — 엣지(연결선) 타입 & 스타일 옵션</CardTitle>
          <CardDescription>
            ReactFlow가 제공하는 5가지 내장 엣지 타입과 색상·두께·화살표 커스터마이징 옵션을
            한눈에 비교합니다.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div style={{ height: 520 }} className="rounded-b-lg overflow-hidden">
            <ReactFlow
              nodes={edgeTypeNodes}
              edges={edgeTypeEdges}
              colorMode={colorMode}
              fitView
              fitViewOptions={{ padding: 0.1 }}
              nodesDraggable={false}
              nodesConnectable={false}
              elementsSelectable={false}
            >
              <Controls />
              <Background variant={BackgroundVariant.Dots} gap={16} size={1} />
            </ReactFlow>
          </div>
        </CardContent>
      </Card>

      {/* 예시 4-2: 엣지 옵션 코드 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">엣지 주요 옵션 코드 예시</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="rounded-md bg-muted p-4 text-xs overflow-x-auto leading-relaxed">
            <code>{`import { MarkerType } from '@xyflow/react'

const edges = [
  // ① 기본 (bezier 곡선 — 타입 생략 시 기본값)
  { id: 'e1', source: '1', target: '2' },

  // ② 엣지 타입 직접 지정
  { id: 'e2', source: '1', target: '2', type: 'straight'    },  // 직선
  { id: 'e3', source: '1', target: '2', type: 'step'        },  // 90° 꺾임
  { id: 'e4', source: '1', target: '2', type: 'smoothstep'  },  // 부드럽게 꺾임
  { id: 'e5', source: '1', target: '2', type: 'simplebezier'},  // 단순 베지어

  // ③ 점선 애니메이션
  { id: 'e6', source: '1', target: '2', animated: true },

  // ④ 라벨 텍스트
  { id: 'e7', source: '1', target: '2', label: '승인 완료' },

  // ⑤ 색상·두께 커스터마이징
  { id: 'e8', source: '1', target: '2',
    style: { stroke: '#f9a8d4', strokeWidth: 3 } },

  // ⑥ 화살표 마커 (시작/끝)
  { id: 'e9', source: '1', target: '2',
    markerEnd: { type: MarkerType.ArrowClosed, color: '#6ee7b7' } },
]

// ReactFlow 전체 기본 엣지 타입 일괄 지정
<ReactFlow defaultEdgeOptions={{ type: 'smoothstep' }} ... />`}</code>
          </pre>
        </CardContent>
      </Card>

      {/* 예시 5: 노드 데이터 구조 */}
      <Card>
        <CardHeader>
          <CardTitle>예시 5 — 노드/엣지 데이터 구조</CardTitle>
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

      {/* 예시 5: 커스텀 노드 컴포넌트 */}
      <Card>
        <CardHeader>
          <CardTitle>예시 6 — 커스텀 노드 컴포넌트</CardTitle>
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

      {/* 예시 6: API 데이터로 동적 다이어그램 */}
      <Card>
        <CardHeader>
          <CardTitle>예시 7 — API 데이터 → 동적 다이어그램</CardTitle>
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
              ReactFlow를 함께 쓰면 서버 데이터로 실시간 다이어그램을 만들 수 있습니다 (예시 6
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
            <strong className="text-foreground">핵심:</strong> 노드/엣지는 일반 JS 배열이므로
            API에서 받은 데이터로 동적으로 다이어그램을 생성할 수 있습니다.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
