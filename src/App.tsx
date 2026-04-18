import { Hero } from './components/Hero'
import { AddTaskForm } from './components/AddTaskForm'
import { TaskList } from './components/TaskList'
import { useTasks } from './hooks/useTasks'

function App() {
  const { tasks, addTask, toggleTask, updateTask, deleteTask } = useTasks()

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-2xl px-6 py-16 md:py-24">
        <Hero />
        <main>
          <AddTaskForm onAdd={addTask} />
          <TaskList
            tasks={tasks}
            onToggle={toggleTask}
            onUpdate={updateTask}
            onDelete={deleteTask}
          />
        </main>
      </div>
    </div>
  )
}

export default App