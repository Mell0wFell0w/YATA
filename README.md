# YATA: Yet Another ToDo App

A minimalist todo app built for IS 542 final. React + TypeScript + Vite + Tailwind v4, with localStorage persistence and a handwritten hero drawn stroke-by-stroke by Tegaki.

## Features

- Add, edit, delete, toggle done
- Due dates with overdue warnings
- Three priority levels with colored accents
- User-defined categories with CRUD and color picker
- Filter by status and category, sort by date or priority
- Auto-sizing description field for long tasks
- localStorage persistence
- Notion-inspired design system with handwritten Tegaki hero

## Reflection

### What I prioritized

I wanted to focus on styling. I was confident the React and TypeScript would come together, so I looked for a distinctive visual angle and landed on Tegaki for a hand-drawn hero that communicates the idea of note-taking. The plan shifted once I realized I would run out of time. I moved priority to core functionality, then to bug fixing and UX polish that did not depend on styling. I have used Supabase on previous projects and like it, but for a todo app with a single user it felt like overkill. Skipping it was the right call since I ran out of time anyway.

### Tradeoff

User-defined categories over predefined. More UI surface (a category manager, color picker, orphan cleanup when a category is deleted) in exchange for flexibility. It is the choice I would want in my own app. Even if I had gone with predefined categories, I would have made them editable because user autonomy matters to me.

### What I'm proud of

The Notion-inspired design system paired with the Tegaki handwritten logo. The handwriting gives the app personality without breaking the minimalism. Also the small things that are easy to miss: orphan cleanup when deleting a category, the date picker UX fix so clicking anywhere on the field opens the calendar, and the auto-sizing textarea for long task descriptions. Small change, real difference.

### Prompts that I used while building

- Why do I get a warning when using @theme in Tailwind v4?
- Explain discriminated unions and typed reducers in Python terms.
- Should I extract React state into a custom hook instead of keeping it in the component?
- How does Framer Motion handle layout animations for list items that enter and exit?
- How do React refs work with showPicker()?
- What TypeScript utility types are useful for update payloads? 
- When would I use Partial vs Pick?

## Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS v4
- Tegaki (Caveat font)
- localStorage