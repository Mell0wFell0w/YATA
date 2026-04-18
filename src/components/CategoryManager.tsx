import { useState } from 'react'
import type { Category } from '../types'
import { CATEGORY_COLORS } from '../lib/categoryColors'

interface Props {
  categories: Category[]
  onAdd: (name: string, color?: string) => void
  onUpdate: (id: string, update: { name?: string; color?: string }) => void
  onDelete: (id: string) => void
}

export function CategoryManager({ categories, onAdd, onUpdate, onDelete }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const [newName, setNewName] = useState('')
  const [newColor, setNewColor] = useState<string>(CATEGORY_COLORS[0].value)

  function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    if (!newName.trim()) return
    onAdd(newName, newColor)
    setNewName('')
  }

  return (
    <div className="mt-8">
      <button
        type="button"
        onClick={() => setIsOpen(v => !v)}
        className="text-sm font-semibold text-warm-gray-500 hover:text-notion-black transition-colors"
      >
        {isOpen ? 'Hide categories' : `Manage categories (${categories.length})`}
      </button>

      {isOpen && (
        <div className="mt-4 rounded-[12px] whisper-border bg-warm-white p-4">
          <form onSubmit={handleAdd} className="flex items-center gap-3 flex-wrap">
            <input
              type="text"
              value={newName}
              onChange={e => setNewName(e.target.value)}
              placeholder="New category name"
              className="flex-1 min-w-[150px] text-sm bg-white px-3 py-2 rounded-[4px] whisper-border outline-none focus:border-notion-blue"
            />
            <ColorPicker value={newColor} onChange={setNewColor} />
            <button
              type="submit"
              className="bg-notion-blue text-white text-sm font-semibold px-4 py-2 rounded-[4px] hover:bg-notion-blue-active transition-colors"
            >
              Add
            </button>
          </form>

          {categories.length > 0 && (
            <ul className="mt-4 space-y-2">
              {categories.map(c => (
                <CategoryRow
                  key={c.id}
                  category={c}
                  onUpdate={update => onUpdate(c.id, update)}
                  onDelete={() => onDelete(c.id)}
                />
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}

interface RowProps {
  category: Category
  onUpdate: (update: { name?: string; color?: string }) => void
  onDelete: () => void
}

function CategoryRow({ category, onUpdate, onDelete }: RowProps) {
  const [name, setName] = useState(category.name)

  function commitName() {
    if (name.trim() && name !== category.name) {
      onUpdate({ name })
    } else {
      setName(category.name)
    }
  }

  return (
    <li className="flex items-center gap-3 bg-white p-3 rounded-[8px] whisper-border">
      <ColorPicker
        value={category.color}
        onChange={color => onUpdate({ color })}
      />
      <input
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
        onBlur={commitName}
        onKeyDown={e => {
          if (e.key === 'Enter') (e.target as HTMLInputElement).blur()
        }}
        className="flex-1 text-sm outline-none bg-transparent"
      />
      <button
        type="button"
        onClick={onDelete}
        className="text-sm font-medium text-warm-gray-300 hover:text-accent-orange transition-colors"
      >
        Delete
      </button>
    </li>
  )
}

interface ColorPickerProps {
  value: string
  onChange: (color: string) => void
}

function ColorPicker({ value, onChange }: ColorPickerProps) {
  return (
    <div className="flex items-center gap-1">
      {CATEGORY_COLORS.map(c => (
        <button
          key={c.value}
          type="button"
          onClick={() => onChange(c.value)}
          aria-label={c.name}
          className={`w-5 h-5 rounded-full transition-transform ${
            value === c.value ? 'ring-2 ring-offset-1 ring-notion-blue scale-110' : 'hover:scale-110'
          }`}
          style={{ backgroundColor: c.value }}
        />
      ))}
    </div>
  )
}