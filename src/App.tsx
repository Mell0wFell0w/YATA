function App() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-2xl px-6 py-16 md:py-24">
        <header className="mb-12">
          <h1 className="text-6xl font-bold tracking-[-0.133em] leading-none">
            YATA
          </h1>
          <p className="mt-4 text-lg font-semibold text-warm-gray-500">
            Yet Another ToDo App
          </p>
        </header>

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