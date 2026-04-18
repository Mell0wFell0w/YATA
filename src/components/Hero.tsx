import { TegakiRenderer } from 'tegaki'
import caveat from 'tegaki/fonts/caveat'

export function Hero() {
  return (
    <header className="mb-12">
      <TegakiRenderer
        font={caveat}
        style={{
          fontSize: '96px',
          lineHeight: 1,
          color: 'rgba(0, 0, 0, 0.95)',
        }}
      >
        YATA
      </TegakiRenderer>
      <p className="mt-2 text-lg font-semibold text-warm-gray-500">
        Yet Another ToDo App
      </p>
    </header>
  )
}