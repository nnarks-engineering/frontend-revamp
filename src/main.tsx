import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/app/i18n/i18n";
import "@/app/styles/index.css";
import { AppProviders } from "@/app/providers/AppProviders";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppProviders />
  </StrictMode>
);