import { Hero } from './components/Hero'

function App() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-2xl px-6 py-16 md:py-24">
        <Hero />
        <main>
          <section className="rounded-[12px] whisper-border shadow-card bg-white p-8">
            <p className="text-warm-gray-500">
              Your tasks will live here.
            </p>
          </section>
        </main>
      </div>
    </div>
  )
}

export default App