import { Project } from "ts-morph";
import * as fs from "fs";
import * as path from "path";

const project = new Project({
    tsConfigFilePath: "tsconfig.app.json",
});

const hookMap: Record<string, string> = {
    "use-auth.ts": "auth",
    "use-permissions.ts": "auth",
    "use-companies.ts": "company",
    "use-company-members.ts": "company",
    "use-projects.ts": "project",
    "use-documents.ts": "project",
    "use-vendors.ts": "vendor",
    "use-wallet.ts": "wallet",
    "use-messaging.ts": "messaging",
    "use-onboarding.ts": "onboarding",
    "use-isomorphic-layout-effect.tsx": "core",
    "use-outside-click.ts": "core",
    "use-media-query.ts": "core",
    "use-location-preference.ts": "core",
    "use-weather.ts": "core",
    "use-right-panel.ts": "core",
};

const apiMap: Record<string, string> = {
    "auth.ts": "auth",
    "companies.ts": "company",
    "kyc.ts": "company",
    "projects.ts": "project",
    "proposals.ts": "project",
    "schedules.ts": "project",
    "services.ts": "service",
    "users.ts": "user",
    "wallet.ts": "wallet",
    "messaging.ts": "messaging",
    "notifications.ts": "notification",
    "onboarding.ts": "onboarding",
};

const contextMap: Record<string, string> = {
    "active-company-context.tsx": "company",
    "right-panel-context.tsx": "ui",
};

function moveFiles(dir: string, map: Record<string, string>) {
    const basePath = path.join("src/shared", dir);
    if (!fs.existsSync(basePath)) return;
    
    for (const [filename, domain] of Object.entries(map)) {
        const filePath = path.join(basePath, filename);
        if (!fs.existsSync(filePath)) {
            console.warn(`File not found: ${filePath}`);
            continue;
        }

        const sourceFile = project.getSourceFile(filePath);
        if (!sourceFile) {
            console.warn(`Could not get SourceFile for: ${filePath}`);
            continue;
        }

        const targetDir = path.join(basePath, domain);
        if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir, { recursive: true });
        }

        const targetPath = path.join(targetDir, filename);
        console.log(`Moving ${filePath} to ${targetPath}`);
        sourceFile.move(targetPath);
    }
}

// 1. Enums Replacement
const useAuth = project.getSourceFile("src/shared/hooks/use-auth.ts");
if (useAuth) {
    useAuth.addImportDeclaration({
        namedImports: ["UserType"],
        moduleSpecifier: "@/types/shared.enums"
    });
    // Replace "client" and "vendor"
    useAuth.replaceWithText(useAuth.getFullText().replace(/userType === "client"/g, "userType === UserType.client"));
    useAuth.replaceWithText(useAuth.getFullText().replace(/type === "client"/g, "type === UserType.client"));
    useAuth.replaceWithText(useAuth.getFullText().replace(/\/vendor\/login/g, "/vendor/login")); // just to be safe
}

const usePerm = project.getSourceFile("src/shared/hooks/use-permissions.ts");
if (usePerm) {
    usePerm.addImportDeclaration({
        namedImports: ["UserType"],
        moduleSpecifier: "@/types/shared.enums"
    });
    usePerm.replaceWithText(usePerm.getFullText().replace(/userType === "client"/g, "userType === UserType.client"));
    usePerm.replaceWithText(usePerm.getFullText().replace(/userType === "vendor"/g, "userType === UserType.vendor"));
}

const useVendors = project.getSourceFile("src/shared/hooks/use-vendors.ts");
if (useVendors) {
    useVendors.addImportDeclaration({
        namedImports: ["FilterCategory"],
        moduleSpecifier: "@/types/shared.enums"
    });
    useVendors.replaceWithText(useVendors.getFullText().replace(/category === "ALL"/g, "category === FilterCategory.all"));
}

const useDocs = project.getSourceFile("src/shared/hooks/use-documents.ts");
if (useDocs) {
    useDocs.addImportDeclaration({
        namedImports: ["FilterCategory"],
        moduleSpecifier: "@/types/shared.enums"
    });
    useDocs.replaceWithText(useDocs.getFullText().replace(/category === "ALL"/g, "category === FilterCategory.all"));
}

// 2. Move files
console.log("Moving hooks...");
moveFiles("hooks", hookMap);

console.log("Moving api...");
moveFiles("api", apiMap);

console.log("Moving contexts...");
moveFiles("contexts", contextMap);

console.log("Saving project...");
project.saveSync();
console.log("Done.");
