// Pulled from the DESIGN.md accent palette plus Notion blue.
export const CATEGORY_COLORS = [
  { name: 'Blue',   value: '#0075de' },
  { name: 'Teal',   value: '#2a9d99' },
  { name: 'Green',  value: '#1aae39' },
  { name: 'Orange', value: '#dd5b00' },
  { name: 'Pink',   value: '#ff64c8' },
  { name: 'Purple', value: '#391c57' },
  { name: 'Brown',  value: '#523410' },
] as const

export function randomCategoryColor(): string {
  const i = Math.floor(Math.random() * CATEGORY_COLORS.length)
  return CATEGORY_COLORS[i].value
}