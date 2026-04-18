import type { Task } from '../types'

interface Props {
  tasks: Task[]
}

export function TaskList({ tasks }: Props) {
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
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  )
}

function TaskItem({ task }: { task: Task }) {
  return (
    <li className="rounded-[8px] whisper-border bg-white p-4 flex items-start gap-3">
      <div className="flex-1">
        <p className="text-base text-notion-black">{task.description}</p>
        <div className="flex items-center gap-2 mt-1 text-xs font-semibold text-warm-gray-500">
          <span className="uppercase tracking-wider">{task.priority}</span>
          {task.dueDate && (
            <>
              <span>·</span>
              <span>{formatDate(task.dueDate)}</span>
            </>
          )}
        </div>
      </div>
    </li>
  )
}

function formatDate(iso: string): string {
  const d = new Date(iso + 'T00:00:00')
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}