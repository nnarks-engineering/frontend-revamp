import { createFileRoute } from "@tanstack/react-router";

import { HomePage } from "@/components/app/page/home/HomePage";

export const Route = createFileRoute("/_app/home")({
  component: HomePage,
});

