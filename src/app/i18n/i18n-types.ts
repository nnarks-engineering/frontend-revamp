import "react-i18next";
import "i18next";
import type common from "../../locales/en/common.json";
import type landing from "../../locales/en/landing.json";

declare module "react-i18next" {
  interface CustomTypeOptions {
    defaultNS: "common";
    resources: {
      common: typeof common;
      landing: typeof landing;
      es: typeof landing; // Assuming landing keys are the same
    };
  }
}

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "common";
    resources: {
      common: typeof common;
      landing: typeof landing;
      es: typeof landing;
    };
  }
}
