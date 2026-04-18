export type Priority = 'low' | 'medium' | 'high'
export type Status = 'open' | 'done'

export interface Category {
  id: string
  name: string
  color: string   // hex string, e.g. "#0075de"
}

export interface Task {
  id: string
  description: string
  status: Status
  priority: Priority
  dueDate: string | null
  categoryId: string | null
  createdAt: string
}