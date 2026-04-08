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
    </div>
  )
}
