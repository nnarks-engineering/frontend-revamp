import { StrictMode } from "react";

import { createRoot } from "react-dom/client";

import "@/app/i18n/i18n";
import { AppProviders } from "@/app/providers/AppProviders";
import "@/app/styles/index.css";

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <AppProviders />
  </StrictMode>
);
