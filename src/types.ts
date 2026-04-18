export type Priority = 'low' | 'medium' | 'high'
export type Status = 'open' | 'done'

export interface Task {
  id: string
  description: string
  status: Status
  priority: Priority
  dueDate: string | null   // ISO date string, e.g. "2026-05-01"
  categoryId: string | null
  createdAt: string        // ISO datetime string
}