const fs = require('fs');

const targetFile = 'src/components/landing/nav/NavBar.tsx';
let content = fs.readFileSync(targetFile, 'utf8');

// Replace pricing path
content = content.replace(/\/pricing/g, '/financials');

// Replace t(`landing:navMenu.${something}`) with (t as any)(`landing:navMenu.${something}`)
content = content.replace(/t\(`landing:navMenu\.\$\{([^}]+)\}`\)/g, '(t as any)(`landing:navMenu.${$1}`)');

fs.writeFileSync(targetFile, content);
console.log('Fixed NavBar.tsx');
