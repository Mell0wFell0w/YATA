import { useLocalStorage } from './useLocalStorage'
import type { Task, Priority } from '../types'

const STORAGE_KEY = 'yata.tasks.v1'

export interface TaskUpdate {
  description?: string
  priority?: Priority
  dueDate?: string | null
  categoryId?: string | null
}

export function useTasks() {
  const [tasks, setTasks] = useLocalStorage<Task[]>(STORAGE_KEY, [])

  function addTask(input: {
    description: string
    priority: Priority
    dueDate: string | null
    categoryId: string | null
  }) {
    const task: Task = {
      id: crypto.randomUUID(),
      description: input.description.trim(),
      status: 'open',
      priority: input.priority,
      dueDate: input.dueDate,
      categoryId: input.categoryId,
      createdAt: new Date().toISOString(),
    }
    setTasks(prev => [task, ...prev])
  }

  function toggleTask(id: string) {
    setTasks(prev =>
      prev.map(t =>
        t.id === id ? { ...t, status: t.status === 'open' ? 'done' : 'open' } : t
      )
    )
  }

  function updateTask(id: string, update: TaskUpdate) {
    setTasks(prev =>
      prev.map(t => {
        if (t.id !== id) return t
        return {
          ...t,
          ...(update.description !== undefined && { description: update.description.trim() }),
          ...(update.priority !== undefined && { priority: update.priority }),
          ...(update.dueDate !== undefined && { dueDate: update.dueDate }),
          ...(update.categoryId !== undefined && { categoryId: update.categoryId }),
        }
      })
    )
  }

  function deleteTask(id: string) {
    setTasks(prev => prev.filter(t => t.id !== id))
  }

  function clearCategoryFromTasks(categoryId: string) {
    setTasks(prev =>
      prev.map(t => (t.categoryId === categoryId ? { ...t, categoryId: null } : t))
    )
  }

  return {
    tasks,
    addTask,
    toggleTask,
    updateTask,
    deleteTask,
    clearCategoryFromTasks,
  }
}