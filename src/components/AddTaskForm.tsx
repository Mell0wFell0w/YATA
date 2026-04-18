import { useState } from 'react'
import type { Priority } from '../types'

interface Props {
  onAdd: (input: { description: string; priority: Priority; dueDate: string | null }) => void
}

export function AddTaskForm({ onAdd }: Props) {
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState<Priority>('medium')
  const [dueDate, setDueDate] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!description.trim()) return
    onAdd({
      description,
      priority,
      dueDate: dueDate || null,
    })
    setDescription('')
    setPriority('medium')
    setDueDate('')
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[12px] whisper-border shadow-card bg-white p-4 mb-6"
    >
      <input
        type="text"
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="What needs doing?"
        className="w-full text-base outline-none placeholder:text-warm-gray-300"
      />
      <div className="flex items-center gap-3 mt-3 pt-3 border-t border-black/10">
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