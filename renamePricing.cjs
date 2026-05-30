const fs = require('fs');

const updates = {
  en: "Financials",
  es: "Finanzas",
  fr: "Finances",
  zh: "财务"
};

for (const [locale, newLabel] of Object.entries(updates)) {
  const filePath = `src/locales/${locale}/landing.json`;
  if (fs.existsSync(filePath)) {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    if (data.navMenu && data.navMenu.pricing) {
      data.navMenu.pricing.label = newLabel;
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
      console.log(`Updated pricing label for ${locale}`);
    }
  }
}
