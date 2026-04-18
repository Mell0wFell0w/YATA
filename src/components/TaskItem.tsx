import { useEffect, useRef, useState } from 'react'
import type { Task, Priority, Category } from '../types'
import type { TaskUpdate } from '../hooks/useTasks'
import { CategorySelect } from './CategorySelect'
import { PRIORITY_STYLES } from '../lib/priorityStyles'
import { isOverdue, formatDueDate } from '../lib/dates'

interface Props {
  task: Task
  categories: Category[]
  onToggle: (id: string) => void
  onUpdate: (id: string, update: TaskUpdate) => void
  onDelete: (id: string) => void
}

export function TaskItem({ task, categories, onToggle, onUpdate, onDelete }: Props) {
  const [isEditing, setIsEditing] = useState(false)

  if (isEditing) {
    return (
      <TaskItemEdit
        task={task}
        categories={categories}
        onSave={update => {
          onUpdate(task.id, update)
          setIsEditing(false)
        }}
        onCancel={() => setIsEditing(false)}
      />
    )
  }

  return (
    <TaskItemView
      task={task}
      categories={categories}
      onToggle={onToggle}
      onEdit={() => setIsEditing(true)}
      onDelete={onDelete}
    />
  )
}

interface ViewProps {
  task: Task
  categories: Category[]
  onToggle: (id: string) => void
  onEdit: () => void
  onDelete: (id: string) => void
}

function TaskItemView({ task, categories, onToggle, onEdit, onDelete }: ViewProps) {
  const isDone = task.status === 'done'
  const overdue = isOverdue(task.dueDate, task.status)
  const category = categories.find(c => c.id === task.categoryId) ?? null
  const priorityStyle = PRIORITY_STYLES[task.priority]

  return (
    <li
      className={`group rounded-[8px] whisper-border bg-white p-4 pl-5 flex items-start gap-3 relative overflow-hidden transition-opacity ${
        isDone ? 'opacity-60' : 'opacity-100'
      }`}
    >
      <span
        aria-hidden
        className="absolute left-0 top-0 bottom-0 w-[3px]"
        style={{ backgroundColor: priorityStyle.accent }}
      />

      <button
        type="button"
        onClick={() => onToggle(task.id)}
        aria-label={isDone ? 'Mark as open' : 'Mark as done'}
        className={`mt-0.5 w-5 h-5 rounded-[4px] border flex items-center justify-center shrink-0 transition-colors ${
          isDone
            ? 'bg-notion-blue border-notion-blue'
            : 'border-black/20 hover:border-notion-blue'
        }`}
      >
        {isDone && (
          <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M3 8l3.5 3.5L13 5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>

      <button
        type="button"
        onClick={onEdit}
        className="flex-1 min-w-0 text-left cursor-text"
      >
        <p className={`text-base leading-snug break-words whitespace-pre-wrap ${isDone ? 'text-warm-gray-300 line-through' : 'text-notion-black'}`}>
          {task.description}
        </p>
        <div className="flex items-center gap-2 mt-1.5 text-xs font-semibold text-warm-gray-500 flex-wrap">
          <span
            className="uppercase tracking-[0.08em]"
            style={{ color: priorityStyle.accent }}
          >
            {priorityStyle.label}
          </span>
          {task.dueDate && (
            <>
              <span aria-hidden className="text-warm-gray-300">·</span>
              <span className={overdue ? 'text-accent-orange' : ''}>
                {overdue ? 'Overdue · ' : ''}{formatDueDate(task.dueDate)}
              </span>
            </>
          )}
          {category && (
            <>
              <span aria-hidden className="text-warm-gray-300">·</span>
              <span
                className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full"
                style={{
                  backgroundColor: `${category.color}1a`,
                  color: category.color,
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: category.color }}
                />
                {category.name}
              </span>
            </>
          )}
        </div>
      </button>

      <button
        type="button"
        onClick={() => onDelete(task.id)}
        aria-label="Delete task"
        className="opacity-0 group-hover:opacity-100 focus:opacity-100 text-warm-gray-300 hover:text-accent-orange transition-opacity transition-colors text-sm font-medium"
      >
        Delete
      </button>
    </li>
  )
}

interface EditProps {
  task: Task
  categories: Category[]
  onSave: (update: TaskUpdate) => void
  onCancel: () => void
}

interface AutoTextareaProps {
  value: string
  onChange: (value: string) => void
  onKeyDown?: (e: React.KeyboardEvent) => void
  autoFocus?: boolean
  placeholder?: string
}

export function AutoTextarea({ value, onChange, onKeyDown, autoFocus, placeholder }: AutoTextareaProps) {
  const ref = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${el.scrollHeight}px`
  }, [value])

  return (
    <textarea
      ref={ref}
      value={value}
      onChange={e => onChange(e.target.value)}
      onKeyDown={onKeyDown}
      autoFocus={autoFocus}
      placeholder={placeholder}
      rows={1}
      className="w-full text-base outline-none resize-none overflow-hidden bg-transparent placeholder:text-warm-gray-300"
    />
  )
}

function TaskItemEdit({ task, categories, onSave, onCancel }: EditProps) {
  const [description, setDescription] = useState(task.description)
  const [priority, setPriority] = useState<Priority>(task.priority)
  const [dueDate, setDueDate] = useState(task.dueDate ?? '')
  const [categoryId, setCategoryId] = useState<string | null>(task.categoryId)

  function handleSave() {
    if (!description.trim()) return
    onSave({
      description,
      priority,
      dueDate: dueDate || null,
      categoryId,
    })
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSave()
    } else if (e.key === 'Escape') {
      e.preventDefault()
      onCancel()
    }
  }

  return (
    <li className="rounded-[8px] whisper-border shadow-card bg-white p-4">
      <AutoTextarea
        value={description}
        onChange={setDescription}
        onKeyDown={handleKeyDown}
        autoFocus
      />
      <div className="flex items-center gap-3 mt-3 pt-3 border-t border-black/10 flex-wrap">
        <select
          value={priority}
          onChange={e => setPriority(e.target.value as Priority)}
          className="text-sm font-medium text-warm-gray-500 bg-transparent outline-none cursor-pointer"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <input
          type="date"
          value={dueDate}
          onChange={e => setDueDate(e.target.value)}
          className="text-sm font-medium text-warm-gray-500 bg-transparent outline-none cursor-pointer"
        />
        <CategorySelect
          categories={categories}
          value={categoryId}
          onChange={setCategoryId}
        />
        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="text-sm font-semibold text-warm-gray-500 px-3 py-2 rounded-[4px] hover:bg-warm-white transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="bg-notion-blue text-white text-sm font-semibold px-4 py-2 rounded-[4px] hover:bg-notion-blue-active transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </li>
  )
}