# Frontend Component Usage Rules

## Data Presentation: Tables vs. Cards
- **Use Tables:** When presenting dense, easily sortable, or comparable tabular data intended for desktop or detailed analytical views.
- **Use Cards:** When summarizing information, presenting visual-heavy data, or optimizing for mobile/responsive interfaces.

## Layouts: Right Panels vs. Modals vs. Pages
- **Right Panels (Slide-overs):** Use for contextual actions, secondary forms, or detail views that allow the user to retain the context of the primary screen.
- **Modals:** Use for critical, blocking interactions, quick confirmations, or small self-contained forms.
- **Pages:** Use for entirely new navigational contexts, complex multi-step workflows, or when the screen requires a dedicated URL route.

## Component Extraction (The 5-Line Rule)
- **Inline Iteration Limitation:** When iterating over data arrays using `.map()` inside TSX, if the inline element or component markup exceeds 5 lines, you MUST extract it into its own dedicated component file. Do not clutter the main render function with large inline loops.

## Global Standard Components
- **Status Badges:** Use the single global `StatusBadge` component for rendering statuses across the entire project. DO NOT create custom ad-hoc status badges inline.
