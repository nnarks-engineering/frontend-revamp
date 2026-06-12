import { execSync } from "node:child_process";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { basename, extname, join, sep } from "node:path";


const ERRORS: string[] = [];
const SRC = "./src";

// Files to exclude from all checks
const IGNORED_FILES =new  Set(["routeTree.gen.ts"]);

// ── 1. File length check ────────────────────────────────────────────────────
function walkDir(dir: string): string[] {
  return readdirSync(dir).flatMap((f) => {
    const full = join(dir, f);
    return statSync(full).isDirectory() ? walkDir(full) : [full];
  });
}

for (const file of walkDir(SRC).filter(
  (f) => [".ts", ".tsx"].includes(extname(f)) && !IGNORED_FILES.has(basename(f)),
)) {
  const lines = readFileSync(file, "utf8").split("\n").length;
  const ext = extname(file);
  const name = basename(file);

  // Determine the correct limit based on file type
  let maxLines: number;
  if (ext === ".tsx") {
    maxLines = 250;
  } else if (name.startsWith("use-") && ext === ".ts") {
    maxLines = 150; // hook files
  } else if (file.includes(`${sep}types${sep}`) || file.includes("/types/")) {
    maxLines = 100; // type definition files
  } else {
    maxLines = 200; // all other .ts files
  }

  if (lines > maxLines) {
    ERRORS.push(`[LINE LIMIT] ${file} has ${lines} lines (max ${maxLines})`);
  }
}

// ── 2. Inline type in .tsx check ────────────────────────────────────────────
// Exception: components/ui/ follows shadcn convention (co-located types)
for (const file of walkDir(SRC).filter(
  (f) =>
    f.endsWith(".tsx") &&
    !IGNORED_FILES.has(basename(f)) &&
    !f.replaceAll("\\", "/").includes("components/ui/"),
)) {
  const content = readFileSync(file, "utf8");
  if (/^export (interface|type) \w+/m.test(content)) {
    ERRORS.push(`[INLINE TYPE] ${file} exports a type/interface — move to types/{domain}/`);
  }
}

// ── 3. Enum usage check (should use const objects instead) ──────────────────
for (const file of walkDir(SRC).filter(
  (f) => f.endsWith(".ts") && !f.includes("node_modules") && !IGNORED_FILES.has(basename(f)),
)) {
  const content = readFileSync(file, "utf8");
  if (/^export enum /m.test(content)) {
    ERRORS.push(`[ENUM] ${file} uses a TypeScript enum — convert to const object`);
  }
}

// ── 4. ESLint ────────────────────────────────────────────────────────────────
try {
  execSync("npx eslint ./src --ext .ts,.tsx --max-warnings 0", { stdio: "inherit" });
} catch {
  ERRORS.push("[ESLINT] ESLint reported errors");
}

// ── 5. TypeScript ────────────────────────────────────────────────────────────
try {
  execSync("npx tsc --noEmit", { stdio: "inherit" });
} catch {
  ERRORS.push("[TSC] TypeScript errors found");
}

// ── Report ───────────────────────────────────────────────────────────────────
if (ERRORS.length > 0) {
  console.error("\n🚨 Pre-push checks failed:\n");
  for (const e of ERRORS) console.error(` • ${e}`);
  process.exit(1);
} else {
  console.log("\n✅ All checks passed\n");
}
