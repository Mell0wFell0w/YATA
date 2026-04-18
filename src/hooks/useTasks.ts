import { useLocalStorage } from './useLocalStorage'
import type { Task, Priority } from '../types'

const STORAGE_KEY = 'yata.tasks.v1'

export function useTasks() {
  const [tasks, setTasks] = useLocalStorage<Task[]>(STORAGE_KEY, [])

  function addTask(input: {
    description: string
    priority: Priority
    dueDate: string | null
  }) {
    const task: Task = {
      id: crypto.randomUUID(),
      description: input.description.trim(),
      status: 'open',
      priority: input.priority,
      dueDate: input.dueDate,
      categoryId: null,
      createdAt: new Date().toISOString(),
    }
    setTasks(prev => [task, ...prev])
  }

  return { tasks, addTask }
}