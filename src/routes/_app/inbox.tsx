import { createFileRoute } from "@tanstack/react-router";
import { MessagesSquare } from "lucide-react";
import { EmptyState } from "@/components/app/shared";

export const Route = createFileRoute("/_app/inbox")({
  component: InboxPage,
});

function InboxPage() {
  return (
    <div className="flex flex-col h-full overflow-hidden bg-background">
      {/* 
        This is a placeholder for the full split-pane inbox view. 
        It will house the AiPanel's chat threads but in a dedicated full-screen layout.
      */}
      <EmptyState
        icon={MessagesSquare}
        title="Inbox"
        description="Select a conversation from the sidebar to continue your discussion or start a new AI session. Inbox layout integration is pending."
        className="h-full"
      />
    </div>
  );
}
