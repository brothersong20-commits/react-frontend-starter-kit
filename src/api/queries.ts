import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

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

export interface Post {
  id: number
  title: string
  body: string
  userId: number
}

async function fetchPosts(): Promise<Post[]> {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5')
  if (!res.ok) throw new Error('Failed to fetch posts')
  return res.json() as Promise<Post[]>
}

export function usePosts() {
  return useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  })
}

async function createPost(data: { title: string; body: string }): Promise<Post> {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...data, userId: 1 }),
  })
  if (!res.ok) throw new Error('Failed to create post')
  return res.json() as Promise<Post>
}

export function useCreatePost() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      // 포스트 생성 성공 시 목록 캐시 무효화 → 자동 리페칭
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })
}
