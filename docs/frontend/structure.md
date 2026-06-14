# Frontend Component Structure Rules

## File Naming and Nesting
- **Avoid Overly Long Filenames:** Do not name files with extensive context prefixes like `ProjectUserCard.tsx`.
- **Use Directory Nesting:** Rely on the directory path to provide context. Place the file at `project/user/card.tsx` or similar nested paths.
- **Exported Component Naming:** Even though the file name is short (e.g., `card.tsx`), the exported component name MUST retain the full context to prevent import collisions: `export function ProjectUserCard() {}`.

## Component Reusability
- **Shared Components:** If a component is needed across multiple independent pages or domains, it MUST be moved to a shared directory (`src/components/shared/` or `src/components/app/shared/`).
- **No Duplication:** Do not create duplicate components with identical or highly similar logic across different page directories. Extract the common functionality to a shared location instead.
