import "react-i18next";
import "i18next";
import common from "../../locales/en/common.json";
import landing from "../../locales/en/landing.json";

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
