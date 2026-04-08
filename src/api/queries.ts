import { useQuery } from '@tanstack/react-query'

export interface User {
  id: number
  name: string
  email: string
  company: { name: string }
}

async function fetchUsers(): Promise<User[]> {
  const res = await fetch('https://jsonplaceholder.typicode.com/users')
  if (!res.ok) throw new Error('Failed to fetch users')
  return res.json() as Promise<User[]>
}

export function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  })
}
