import type { Task } from '../types'
import type { TaskUpdate } from '../hooks/useTasks'
import { TaskItem } from './TaskItem'

interface Props {
  tasks: Task[]
  onToggle: (id: string) => void
  onUpdate: (id: string, update: TaskUpdate) => void
  onDelete: (id: string) => void
}

export function TaskList({ tasks, onToggle, onUpdate, onDelete }: Props) {
  if (tasks.length === 0) {
    return (
      <div className="rounded-[12px] whisper-border bg-white p-8 text-center">
        <p className="text-warm-gray-500">No tasks yet. Add one above.</p>
      </div>
    )
  }

  return (
    <ul className="space-y-2">
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </ul>
  )
}