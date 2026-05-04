const fs = require('fs');

const en = JSON.parse(fs.readFileSync('src/locales/en/landing.json', 'utf8'));
const navMenu = en.navMenu;
const faqsSection = en.faqsSection;

const locales = ['es', 'fr', 'zh'];

locales.forEach(locale => {
    const filePath = `src/locales/${locale}/landing.json`;
    if (fs.existsSync(filePath)) {
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        delete data.nav;
        data.navMenu = navMenu;
        data.faqsSection = faqsSection;
        
        // Put navMenu at the beginning (after platform)
        const newData = {};
        for (const key in data) {
            if (key === 'hero') {
                newData.navMenu = navMenu;
            }
            if (key !== 'navMenu') {
                newData[key] = data[key];
            }
        }
        
        fs.writeFileSync(filePath, JSON.stringify(newData, null, 2));
        console.log(`Updated ${filePath}`);
    }
});
