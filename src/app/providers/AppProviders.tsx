import { RouterProvider } from "@tanstack/react-router";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// import { ThemeProvider } from "next-themes";
import { I18nextProvider } from "react-i18next";
import { Toaster } from "sonner";
import i18n from "@/app/i18n/i18n";
import { router } from "@/app/router/router";
import { queryClient } from "@/shared/lib/query-client";
import { ActiveCompanyProvider } from "@/shared/contexts/active-company-context";

export function AppProviders() {
  return (
    // <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <I18nextProvider i18n={i18n}>
        <QueryClientProvider client={queryClient}>
          <ActiveCompanyProvider>
            <RouterProvider router={router} />
            <Toaster position="top-center" richColors closeButton />
            {import.meta.env.DEV && (
              <ReactQueryDevtools buttonPosition="bottom-left" initialIsOpen={false} />
            )}
          </ActiveCompanyProvider>
        </QueryClientProvider>
      </I18nextProvider>
    // </ThemeProvider>
  );
}
