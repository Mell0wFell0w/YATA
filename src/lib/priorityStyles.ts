import type { Priority } from '../types'

export const PRIORITY_STYLES: Record<Priority, { accent: string; label: string }> = {
  high:   { accent: '#dd5b00', label: 'High' },   // accent-orange
  medium: { accent: '#0075de', label: 'Medium' }, // notion-blue
  low:    { accent: '#a39e98', label: 'Low' },    // warm-gray-300
}