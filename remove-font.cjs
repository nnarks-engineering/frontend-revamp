const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else if (file.endsWith('.tsx')) { 
            results.push(file);
        }
    });
    return results;
}

const files = walk('src/components/app');
let count = 0;
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    if (content.includes('font-poppins')) {
        content = content.replace(/\s?\bfont-poppins\b/g, '');
        fs.writeFileSync(file, content);
        console.log(`Updated ${file}`);
        count++;
    }
});
console.log(`Done. Updated ${count} files.`);
