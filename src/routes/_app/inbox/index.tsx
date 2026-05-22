import { createFileRoute } from "@tanstack/react-router";
import { MessagesSquare } from "lucide-react";
import { EmptyState } from "@/components/app/shared";

export const Route = createFileRoute("/_app/inbox/")({
  component: InboxIndexPage,
});

function InboxIndexPage() {
  return (
    <div className="flex flex-col h-full overflow-hidden bg-background">
      <EmptyState
        icon={MessagesSquare}
        title="Inbox"
        description="Select a conversation from the sidebar to continue your discussion or start a new AI session."
        className="h-full"
      />
    </div>
  );
}
