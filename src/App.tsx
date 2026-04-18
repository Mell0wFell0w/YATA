import { useMemo, useState } from 'react'
import { Hero } from './components/Hero'
import { AddTaskForm } from './components/AddTaskForm'
import { FilterBar } from './components/FilterBar'
import { TaskList } from './components/TaskList'
import { CategoryManager } from './components/CategoryManager'
import { useTasks } from './hooks/useTasks'
import { useCategories } from './hooks/useCategories'
import { applyFilters, DEFAULT_FILTERS } from './lib/filterSort'

function App() {
  const { tasks, addTask, toggleTask, updateTask, deleteTask, clearCategoryFromTasks } = useTasks()
  const { categories, addCategory, updateCategory, deleteCategory } = useCategories()
  const [filters, setFilters] = useState(DEFAULT_FILTERS)

  const visibleTasks = useMemo(() => applyFilters(tasks, filters), [tasks, filters])
  const isFiltered =
    filters.status !== 'all' || filters.category !== 'all' || filters.sortBy !== 'createdDesc'

  function handleDeleteCategory(id: string) {
    clearCategoryFromTasks(id)
    deleteCategory(id)
    if (filters.category === id) {
      setFilters({ ...filters, category: 'all' })
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-2xl px-6 py-16 md:py-24">
        <Hero />
        <main>
          <AddTaskForm categories={categories} onAdd={addTask} />
          <FilterBar
            categories={categories}
            filters={filters}
            onChange={setFilters}
            taskCount={tasks.length}
            visibleCount={visibleTasks.length}
          />
          <TaskList
            tasks={visibleTasks}
            categories={categories}
            onToggle={toggleTask}
            onUpdate={updateTask}
            onDelete={deleteTask}
            isFiltered={isFiltered}
          />
          <CategoryManager
            categories={categories}
            onAdd={addCategory}
            onUpdate={updateCategory}
            onDelete={handleDeleteCategory}
          />
        </main>
      </div>
    </div>
  )
}

export default App