import { useLocalStorage } from './useLocalStorage'
import type { Category } from '../types'
import { randomCategoryColor } from '../lib/categoryColors'

const STORAGE_KEY = 'yata.categories.v1'

export function useCategories() {
  const [categories, setCategories] = useLocalStorage<Category[]>(STORAGE_KEY, [])

  function addCategory(name: string, color?: string) {
    const trimmed = name.trim()
    if (!trimmed) return
    const category: Category = {
      id: crypto.randomUUID(),
      name: trimmed,
      color: color ?? randomCategoryColor(),
    }
    setCategories(prev => [...prev, category])
  }

  function updateCategory(id: string, update: { name?: string; color?: string }) {
    setCategories(prev =>
      prev.map(c => {
        if (c.id !== id) return c
        return {
          ...c,
          ...(update.name !== undefined && { name: update.name.trim() }),
          ...(update.color !== undefined && { color: update.color }),
        }
      })
    )
  }

  function deleteCategory(id: string) {
    setCategories(prev => prev.filter(c => c.id !== id))
  }

  return { categories, addCategory, updateCategory, deleteCategory }
}