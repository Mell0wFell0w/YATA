import type { Category } from '../types'

interface Props {
  categories: Category[]
  value: string | null
  onChange: (categoryId: string | null) => void
}

export function CategorySelect({ categories, value, onChange }: Props) {
  return (
    <select
      value={value ?? ''}
      onChange={e => onChange(e.target.value || null)}
      className="text-sm font-medium text-warm-gray-500 bg-transparent outline-none cursor-pointer"
    >
      <option value="">No category</option>
      {categories.map(c => (
        <option key={c.id} value={c.id}>
          {c.name}
        </option>
      ))}
    </select>
  )
}