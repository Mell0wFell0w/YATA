import { Hero } from './components/Hero'
import { AddTaskForm } from './components/AddTaskForm'
import { TaskList } from './components/TaskList'
import { CategoryManager } from './components/CategoryManager'
import { useTasks } from './hooks/useTasks'
import { useCategories } from './hooks/useCategories'

function App() {
  const { tasks, addTask, toggleTask, updateTask, deleteTask, clearCategoryFromTasks } = useTasks()
  const { categories, addCategory, updateCategory, deleteCategory } = useCategories()

  function handleDeleteCategory(id: string) {
    clearCategoryFromTasks(id)
    deleteCategory(id)
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-2xl px-6 py-16 md:py-24">
        <Hero />
        <main>
          <AddTaskForm categories={categories} onAdd={addTask} />
          <TaskList
            tasks={tasks}
            categories={categories}
            onToggle={toggleTask}
            onUpdate={updateTask}
            onDelete={deleteTask}
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