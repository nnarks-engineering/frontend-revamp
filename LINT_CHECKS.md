# Code Quality Checks

## Commands

| Command                         | What it does                                        |
| ------------------------------- | --------------------------------------------------- |
| `npx tsx scripts/lint-check.ts` | Run all checks manually                             |
| `pnpm lint:fix`                 | Auto-fix Biome issues and organize imports          |
| `git push`                      | Triggers all checks automatically via pre-push hook |

---

## Checks

### 1. File Length — `[LINE LIMIT]`

**Rule:** No `.tsx` file may exceed **450 lines** (excluding `src/components/ui/`).  
**Rule:** No hook file (`use-*.ts`) may exceed **250 lines**.  
**Rule:** No type file (`types/{domain}/{domain}.types.ts`) may exceed **150 lines**.  
**Rule:** No other `.ts` file may exceed **250 lines**.  
**Why:** Forces single-responsibility. If a file is too long, split by concern.  
**Fix:** Extract components, hooks, or types into separate files.

---

### 2. Inline Types in Components — `[INLINE TYPE]`

**Rule:** No `export interface` or `export type` inside `.tsx` files.  
**Why:** Types belong in `types/{domain}/{domain}.types.ts`, not component files.  
**Fix:** Move the type to the matching types file and import it.

```
// ❌ ProjectCard.tsx
export interface ProjectCardProps { ... }

// ✅ types/projects/projects.types.ts
export interface ProjectCardProps { ... }
```

---

### 3. TypeScript Enums & String Literals — `[ENUM]`

**Rule:** No `export enum` anywhere in the codebase. Use `as const` objects so the same identifier works as both a type and a value you can loop over.  
**Rule:** ALWAYS use enum object properties for comparisons, rather than inline string literals.  
**Why:** Comparing via inline string values like `status === "active"` is fragile. Using `ProjectStatus.active` ensures type safety and consistency if the value ever changes.  
**Fix:**

```typescript
// ❌
export enum DurationUnit {
  days = "days",
  weeks = "weeks",
}

// ✅
export const DurationUnit = {
  days: "days",
  weeks: "weeks",
} as const;
export type DurationUnit = (typeof DurationUnit)[keyof typeof DurationUnit];
```

---

### 4. Biome (Linting & Imports) — `[BIOME]`

**Rule:** Zero errors allowed.  
**Key rules enforced:**

| Rule                                          | Effect                                            |
| --------------------------------------------- | ------------------------------------------------- |
| `correctness/noUnusedImports`                 | Error on unused imports                           |
| `correctness/noUnusedVariables`               | Warn on unused vars                               |
| `assist/source/organizeImports`               | Organizes imports                                 |
| `suspicious/noRestrictedSyntax`               | Blocks TypeScript enums                           |
| `style/noDefaultExport`                       | Warns outside route/page/config files             |
| `style/useImportType`                         | Forces `import type` for type-only imports        |
| `suspicious/noConsole`                        | Warns on `console.log`                            |

**Fix:** Run `pnpm lint:fix` to auto-fix what Biome can, then resolve remaining manually.

---

### 5. TypeScript — `[TSC]`

**Rule:** `tsc --noEmit` must pass with zero errors.  
**Why:** Catches type errors that ESLint misses.  
**Fix:** Resolve all type errors before pushing.

---

## File Structure Rules (enforced by `[INLINE TYPE]` + `[ENUM]`)

```
src/
  types/
    {domain}/
      {domain}.types.ts      # interfaces only
      {domain}.enums.ts      # const objects + types
      {domain}.form.ts       # UI/form specific types
      {domain}.constants.ts  # static primitive constants
      index.ts               # barrel export for the module
    shared.enums.ts          # enums used across 2+ modules
    shared.types.ts          # types used across 2+ modules
    index.ts                 # global barrel export
  hooks/
    use-{domain}.ts
  components/
    {domain}/
      {ComponentName}.tsx    # no exported types here
```

---

## Naming Conventions (human-enforced)

| Thing                           | Convention                 | Example                                   |
| ------------------------------- | -------------------------- | ----------------------------------------- |
| Interface                       | PascalCase + intent suffix | `ProjectCreatePayload`, `ProjectResponse` |
| Domain Type/Enum                | Module Prefix              | `ProjectMemberRole`, `ProjectStatus`      |
| Const object (enum replacement) | PascalCase singular        | `DurationUnit`, `ProjectType`             |
| Primitive constant              | SCREAMING_SNAKE_CASE       | `MAX_FILE_SIZE`                           |
| Hook file                       | `use-{domain}.ts`          | `use-projects.ts`                         |
| Hook function                   | `use{Domain}`              | `useProjects`                             |

**Interface suffixes:**

| Suffix     | Use for                         |
| ---------- | ------------------------------- |
| `Payload`  | Data sent TO the API            |
| `Response` | Data received FROM the API      |
| `State`    | Local component / form state    |
| `Props`    | React component props           |
| `Config`   | Configuration objects           |
| `Options`  | Dropdown / select option shapes |
