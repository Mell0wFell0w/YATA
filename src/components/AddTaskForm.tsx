import { useState } from 'react'
import type { Priority, Category } from '../types'
import { CategorySelect } from './CategorySelect'
import { AutoTextarea } from './TaskItem'

interface Props {
  categories: Category[]
  onAdd: (input: {
    description: string
    priority: Priority
    dueDate: string | null
    categoryId: string | null
  }) => void
}

export function AddTaskForm({ categories, onAdd }: Props) {
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState<Priority>('medium')
  const [dueDate, setDueDate] = useState('')
  const [categoryId, setCategoryId] = useState<string | null>(null)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!description.trim()) return
    onAdd({
      description,
      priority,
      dueDate: dueDate || null,
      categoryId,
    })
    setDescription('')
    setPriority('medium')
    setDueDate('')
    setCategoryId(null)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[12px] whisper-border shadow-card bg-white p-4 mb-6"
    >
      <AutoTextarea
        value={description}
        onChange={setDescription}
        placeholder="What needs doing?"
        onKeyDown={e => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSubmit(e as unknown as React.FormEvent)
          }
        }}
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
        <button
          type="submit"
          className="ml-auto bg-notion-blue text-white text-sm font-semibold px-4 py-2 rounded-[4px] hover:bg-notion-blue-active transition-colors"
        >
          Add
        </button>
      </div>
    </form>
  )
}