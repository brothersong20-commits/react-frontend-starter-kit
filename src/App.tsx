import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AppLayout } from '@/components/layout/AppLayout'
import { LandingPage } from '@/pages/LandingPage'
import { ZustandPage } from '@/pages/ZustandPage'
import { QueryPage } from '@/pages/QueryPage'
import { FormPage } from '@/pages/FormPage'
import { FlowPage } from '@/pages/FlowPage'
import { ComponentsPage } from '@/pages/ComponentsPage'

const router = createBrowserRouter([
  { path: '/', element: <LandingPage /> },
  {
    element: <AppLayout />,
    children: [
      { path: 'zustand', element: <ZustandPage /> },
      { path: 'query', element: <QueryPage /> },
      { path: 'form', element: <FormPage /> },
      { path: 'flow', element: <FlowPage /> },
      { path: 'components', element: <ComponentsPage /> },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
