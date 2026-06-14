# Frontend Styling and Design Rules

## CSS-First Conditional Styling
- **Avoid JS Logic for Styles:** Rely on native Tailwind CSS utilities rather than writing verbose JavaScript conditional statements for styling components.
- **State Modifiers:** Use Tailwind state variants like `even:`, `odd:`, `group`, `group-hover:`, `peer-focus:` to handle dynamic visual states directly in the class string.

## Responsive Design
- **Container Queries Over Media Queries:** Use Tailwind's container query modifiers (e.g., `@md`, `@lg`) instead of viewport-based media queries (`md`, `lg`) whenever possible. This ensures components are intrinsically responsive based on their container size, making them much more reusable across different layout slots.
