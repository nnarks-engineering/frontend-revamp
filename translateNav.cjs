const fs = require('fs');

const esNav = {
    "home": {
      "label": "Inicio"
    },
    "modules": {
      "label": "Módulos",
      "items": {
        "escrow": {
          "label": "Custodia Inteligente",
          "description": "Pagos seguros multidivisa"
        },
        "supervision": {
          "label": "Supervisión",
          "description": "Verificación física en el lugar"
        },
        "contributions": {
          "label": "Aportes Grupales",
          "description": "Gestionar Susu o Tontina"
        }
      }
    },
    "features": {
      "label": "Características",
      "items": {
        "evidence": {
          "label": "Sistema de Evidencia",
          "description": "Registros a prueba de manipulaciones"
        },
        "identity": {
          "label": "KYC e Identidad",
          "description": "Niveles de verificación por niveles"
        }
      }
    },
    "company": {
      "label": "Compañía",
      "items": {
        "about": {
          "label": "Sobre Nosotros",
          "description": "Nuestra misión y visión"
        },
        "contact": {
          "label": "Contáctanos",
          "description": "Ponte en contacto con ventas"
        }
      }
    },
    "faqs": {
      "label": "Preguntas Frecuentes"
    },
    "pricing": {
      "label": "Precios"
    }
};

const frNav = {
    "home": {
      "label": "Accueil"
    },
    "modules": {
      "label": "Modules",
      "items": {
        "escrow": {
          "label": "Séquestre Intelligent",
          "description": "Paiements multidevises sécurisés"
        },
        "supervision": {
          "label": "Supervision",
          "description": "Vérification physique sur le terrain"
        },
        "contributions": {
          "label": "Contributions de Groupe",
          "description": "Gérer Tontine ou Susu"
        }
      }
    },
    "features": {
      "label": "Fonctionnalités",
      "items": {
        "evidence": {
          "label": "Système de Preuve",
          "description": "Journaux de suivi inviolables"
        },
        "identity": {
          "label": "KYC & Identité",
          "description": "Niveaux de vérification hiérarchisés"
        }
      }
    },
    "company": {
      "label": "Entreprise",
      "items": {
        "about": {
          "label": "À Propos",
          "description": "Notre mission et vision"
        },
        "contact": {
          "label": "Nous Contacter",
          "description": "Contactez l'équipe commerciale"
        }
      }
    },
    "faqs": {
      "label": "FAQ"
    },
    "pricing": {
      "label": "Tarification"
    }
};

const zhNav = {
    "home": {
      "label": "首页"
    },
    "modules": {
      "label": "模块",
      "items": {
        "escrow": {
          "label": "智能托管",
          "description": "安全的多币种支付"
        },
        "supervision": {
          "label": "监督",
          "description": "实地物理验证"
        },
        "contributions": {
          "label": "团体捐助",
          "description": "管理 Susu 或 Tontine"
        }
      }
    },
    "features": {
      "label": "功能",
      "items": {
        "evidence": {
          "label": "证据系统",
          "description": "防篡改跟踪日志"
        },
        "identity": {
          "label": "KYC 与身份",
          "description": "分级验证级别"
        }
      }
    },
    "company": {
      "label": "公司",
      "items": {
        "about": {
          "label": "关于我们",
          "description": "我们的使命和愿景"
        },
        "contact": {
          "label": "联系我们",
          "description": "与销售部门取得联系"
        }
      }
    },
    "faqs": {
      "label": "常见问题"
    },
    "pricing": {
      "label": "定价"
    }
};

const updates = { es: esNav, fr: frNav, zh: zhNav };

for (const [locale, nav] of Object.entries(updates)) {
  const filePath = `src/locales/${locale}/landing.json`;
  if (fs.existsSync(filePath)) {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    data.navMenu = nav;
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`Updated navMenu for ${locale}`);
  }
}
