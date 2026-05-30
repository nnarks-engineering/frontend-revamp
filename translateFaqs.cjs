const fs = require('fs');

const esFaqs = {
  "title": "Preguntas Frecuentes",
  "subtitle": "Encuentra respuestas a preguntas comunes sobre Nnarks.",
  "items": [
    {
      "question": "¿Qué es Nnarks?",
      "answer": "Nnarks es una plataforma de infraestructura de confianza que ayuda a los inversores y socios de la diáspora a gestionar proyectos remotos de forma segura mediante custodia basada en hitos y ejecución verificada."
    },
    {
      "question": "¿Cómo funciona el servicio de custodia (escrow)?",
      "answer": "Los fondos se mantienen de forma segura en un depósito de garantía multidivisa. Solo se liberan al socio o contratista local cuando se cumplen y verifican hitos específicos predefinidos."
    },
    {
      "question": "¿Quién verifica los hitos?",
      "answer": "Los hitos se pueden verificar subiendo pruebas con etiquetas de GPS y marcas de tiempo (fotos, videos, documentos) o asignando a un supervisor local verificado por Nnarks."
    },
    {
      "question": "¿Cómo funcionan las aportaciones grupales?",
      "answer": "Las aportaciones grupales le permiten gestionar modelos como Susu, Chama o Tontine de forma eficiente con un seguimiento automatizado de las aportaciones y programación de pagos."
    },
    {
      "question": "¿Están seguros mis fondos?",
      "answer": "Sí, todos los fondos están bloqueados de forma segura en cuentas de custodia regidas por estrictas condiciones de liberación. Tienes visibilidad total sobre dónde y cuándo se mueve tu dinero."
    }
  ]
};

const frFaqs = {
  "title": "Foire Aux Questions",
  "subtitle": "Trouvez des réponses aux questions courantes sur Nnarks.",
  "items": [
    {
      "question": "Qu'est-ce que Nnarks ?",
      "answer": "Nnarks est une plateforme d'infrastructure de confiance qui aide les investisseurs et partenaires de la diaspora à gérer des projets à distance en toute sécurité, en utilisant un séquestre basé sur des étapes et une exécution vérifiée."
    },
    {
      "question": "Comment fonctionne le compte séquestre ?",
      "answer": "Les fonds sont conservés en toute sécurité dans un séquestre multidevise. Ils ne sont débloqués au partenaire local ou à l'entrepreneur que lorsque des étapes spécifiques et prédéfinies sont atteintes et vérifiées."
    },
    {
      "question": "Qui vérifie les étapes ?",
      "answer": "Les étapes peuvent être vérifiées en téléchargeant des preuves géolocalisées et horodatées (photos, vidéos, documents), ou en affectant un superviseur de terrain Nnarks vérifié."
    },
    {
      "question": "Comment fonctionnent les contributions de groupe ?",
      "answer": "Les contributions de groupe vous permettent de gérer efficacement les modèles de Tontine, Susu ou Chama avec un suivi automatisé des contributions et une planification des paiements."
    },
    {
      "question": "Mes fonds sont-ils en sécurité ?",
      "answer": "Oui, tous les fonds sont verrouillés en toute sécurité dans des comptes séquestres régis par des conditions de déblocage strictes. Vous avez une visibilité totale sur l'endroit et le moment où votre argent circule."
    }
  ]
};

const zhFaqs = {
  "title": "常见问题",
  "subtitle": "查找有关 Nnarks 的常见问题解答。",
  "items": [
    {
      "question": "Nnarks 是什么？",
      "answer": "Nnarks 是一个信任基础设施平台，帮助侨民投资者和合作伙伴使用基于里程碑的托管和经过验证的执行安全地管理远程项目。"
    },
    {
      "question": "托管如何运作？",
      "answer": "资金安全地保存在多币种托管账户中。只有在达到并验证了预先定义的特定里程碑后，资金才会释放给当地合作伙伴或承包商。"
    },
    {
      "question": "谁来验证里程碑？",
      "answer": "可以通过上传带有 GPS 标签和时间戳的证据（照片、视频、文件）或指派经过 Nnarks 认证的现场主管来验证里程碑。"
    },
    {
      "question": "团体捐助是如何运作的？",
      "answer": "团体捐助使您能够通过自动化的捐助跟踪和支付安排，高效管理 Susu、Chama 或 Tontine 模式。"
    },
    {
      "question": "我的资金安全吗？",
      "answer": "是的，所有资金都安全地锁定在受严格释放条件约束的托管账户中。您对资金的流动时间和去向拥有完全的可见性。"
    }
  ]
};

const updates = { es: esFaqs, fr: frFaqs, zh: zhFaqs };

for (const [locale, faqs] of Object.entries(updates)) {
  const filePath = `src/locales/${locale}/landing.json`;
  if (fs.existsSync(filePath)) {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    data.faqsSection = faqs;
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`Updated translations for ${locale}`);
  }
}
