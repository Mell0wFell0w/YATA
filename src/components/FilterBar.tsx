import type { Category } from '../types'
import type { FilterState, StatusFilter, CategoryFilter, SortBy } from '../lib/filterSort'

interface Props {
  categories: Category[]
  filters: FilterState
  onChange: (filters: FilterState) => void
  taskCount: number
  visibleCount: number
}

export function FilterBar({ categories, filters, onChange, taskCount, visibleCount }: Props) {
  return (
    <div className="flex items-center gap-3 mb-3 px-1 flex-wrap">
      <div className="flex items-center gap-1 rounded-[6px] bg-warm-white p-1">
        <StatusPill
          label="All"
          active={filters.status === 'all'}
          onClick={() => onChange({ ...filters, status: 'all' })}
        />
        <StatusPill
          label="Open"
          active={filters.status === 'open'}
          onClick={() => onChange({ ...filters, status: 'open' })}
        />
        <StatusPill
          label="Done"
          active={filters.status === 'done'}
          onClick={() => onChange({ ...filters, status: 'done' })}
        />
      </div>

      <select
        value={filters.category}
        onChange={e => onChange({ ...filters, category: e.target.value as CategoryFilter })}
        className="text-sm font-medium text-warm-gray-500 bg-transparent outline-none cursor-pointer"
      >
        <option value="all">All categories</option>
        <option value="none">Uncategorized</option>
        {categories.map(c => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </select>

      <select
        value={filters.sortBy}
        onChange={e => onChange({ ...filters, sortBy: e.target.value as SortBy })}
        className="text-sm font-medium text-warm-gray-500 bg-transparent outline-none cursor-pointer"
      >
        <option value="createdDesc">Newest first</option>
        <option value="dueAsc">Due soonest</option>
        <option value="priorityDesc">Priority</option>
        <option value="alpha">A to Z</option>
      </select>

      <span className="ml-auto text-xs font-medium text-warm-gray-300">
        {visibleCount} of {taskCount}
      </span>
    </div>
  )
}

interface StatusPillProps {
  label: string
  active: boolean
  onClick: () => void
}

function StatusPill({ label, active, onClick }: StatusPillProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-1 rounded-[4px] text-xs font-semibold transition-colors ${
        active
          ? 'bg-white text-notion-black shadow-card'
          : 'text-warm-gray-500 hover:text-notion-black'
      }`}
    >
      {label}
    </button>
  )
}