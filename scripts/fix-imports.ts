import * as fs from 'fs';
import * as path from 'path';

const SRC_DIR = path.join(process.cwd(), 'src');

function getAllFiles(dirPath: string, arrayOfFiles: string[] = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      arrayOfFiles.push(path.join(dirPath, "/", file));
    }
  });

  return arrayOfFiles;
}

const files = getAllFiles(SRC_DIR).filter(f => f.endsWith('.ts') || f.endsWith('.tsx'));

const domains = ['enums', 'companies', 'wallet', 'messaging', 'kyc', 'services', 'notifications', 'proposals', 'users', 'vendors', 'documents', 'schedules', 'onboarding', 'auth'];

let updatedCount = 0;

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    for (const domain of domains) {
        // Regex to match imports from "@/types/domain"
        // It could be import { ... } from "@/types/domain"; or import type { ... } from "@/types/domain";
        const regex = new RegExp('from "(@/types)/' + domain + '"', 'g');
        content = content.replace(regex, 'from "$1"');
        
        // Also handle single quotes
        const regexSq = new RegExp("from '(@/types)/" + domain + "'", 'g');
        content = content.replace(regexSq, "from '$1'");
    }

    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        updatedCount++;
    }
}

console.log('Updated imports in ' + updatedCount + ' files.');
