import type { Task, Priority } from '../types'

export type StatusFilter = 'all' | 'open' | 'done'
export type CategoryFilter = string | 'all' | 'none'   // category id, "all", or "none" for uncategorized
export type SortBy = 'createdDesc' | 'dueAsc' | 'priorityDesc' | 'alpha'

export interface FilterState {
  status: StatusFilter
  category: CategoryFilter
  sortBy: SortBy
}

export const DEFAULT_FILTERS: FilterState = {
  status: 'all',
  category: 'all',
  sortBy: 'createdDesc',
}

const PRIORITY_RANK: Record<Priority, number> = { high: 3, medium: 2, low: 1 }

export function applyFilters(tasks: Task[], filters: FilterState): Task[] {
  const filtered = tasks.filter(t => {
    if (filters.status !== 'all' && t.status !== filters.status) return false
    if (filters.category === 'none' && t.categoryId !== null) return false
    if (filters.category !== 'all' && filters.category !== 'none' && t.categoryId !== filters.category) return false
    return true
  })

  const sorted = [...filtered].sort((a, b) => {
    switch (filters.sortBy) {
      case 'createdDesc':
        return b.createdAt.localeCompare(a.createdAt)
      case 'dueAsc':
        // Tasks with no due date sink to the bottom.
        if (a.dueDate === null && b.dueDate === null) return 0
        if (a.dueDate === null) return 1
        if (b.dueDate === null) return -1
        return a.dueDate.localeCompare(b.dueDate)
      case 'priorityDesc':
        return PRIORITY_RANK[b.priority] - PRIORITY_RANK[a.priority]
      case 'alpha':
        return a.description.localeCompare(b.description)
    }
  })

  return sorted
}