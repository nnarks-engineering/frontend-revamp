import { HomePage } from "@/components/app/page/home/HomePage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/home")({
  component: HomePage,
});

