import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { cn } from "@/shared/lib/utils";
import { ChatThreadList } from "@/components/app/inbox/ChatThreadList";
import { ChatMessages } from "@/components/app/inbox/ChatMessages";
import { ParticipantsOverlay } from "@/components/app/inbox/ParticipantsOverlay";
import { useSessions, useMessages, useSendMessage } from "@/shared/hooks/use-messaging";
import {
  ModuleLayout,
  ModuleLayoutHeader,
  ModuleLayoutHeaderContent,
  ModuleLayoutTitle,
  ModuleLayoutDescription,
  ModuleLayoutToolbar,
} from "@/components/ui/module-layout";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RoundingLine from "@/assets/svg/rounding-line2.svg?react";
import type { SessionType } from "@/types/enums";
import type { ChatSession } from "@/types/messaging";
import NoMessageSvg from "@/assets/svg/no-message.svg?react";

export const Route = createFileRoute("/_app/inbox/")({
  component: InboxIndexPage,
});

function InboxIndexPage() {
  const [activeTab, setActiveTab] = useState<SessionType | "ALL">("ALL");
  const [activeThread, setActiveThread] = useState<ChatSession | null>(null);
  const [message, setMessage] = useState("");
  const [viewingParticipants, setViewingParticipants] = useState<ChatSession | null>(null);

  const { data: sessionsData, isLoading: sessionsLoading } = useSessions(
    activeTab === "ALL" ? undefined : activeTab,
    // { limit: 50 }
  );

  const { data: messagesData, isLoading: messagesLoading } = useMessages(
    activeThread?.id
  );

  const { mutate: sendMessage, isPending: isSending } = useSendMessage(
    activeThread?.id || ""
  );

  const handleTabChange = (tabId: SessionType | "ALL") => {
    setActiveTab(tabId);
    setActiveThread(null);
  };

  const handleSend = () => {
    if (!message.trim() || !activeThread) return;
    sendMessage({ content: message }, {
      onSuccess: () => setMessage(""),
    });
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const threads = sessionsData?.items || [];
  const currentMessages = messagesData || [];

  return (
    <div className="mx-auto h-full">
      <ModuleLayout className="h-full rounded-none">
        <Tabs
          value={activeTab}
          onValueChange={(v) => handleTabChange(v as SessionType | "ALL")}
          className="h-full"
        >
          <div className="border bg-card flex h-full overflow-hidden shadow-sm">
            {/* SIDEBAR */}
            <div
              className={cn(
                "w-full md:w-80 lg:w-104 shrink-0 flex-col border-r border-border bg-background/50",
                activeThread ? "hidden md:flex" : "flex"
              )}
            >
              <ModuleLayoutHeader variant="primary" className="border-b border-border p-6 pb-6 rounded-none relative overflow-hidden">
                <RoundingLine
                  className="absolute -top-3 right-0 scale-x-[-1] text-primary/10 pointer-events-none"
                  aria-hidden
                />
                <div className="absolute -right-12 -top-12 w-32 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute -left-12 -bottom-12 w-32 h-32 bg-secondary/10 rounded-full blur-2xl pointer-events-none" />
                <ModuleLayoutHeaderContent className="relative z-10">
                  <ModuleLayoutTitle>Inbox</ModuleLayoutTitle>
                  <ModuleLayoutDescription>
                    Manage your messages and AI sessions
                  </ModuleLayoutDescription>
                </ModuleLayoutHeaderContent>
              </ModuleLayoutHeader>

              <ModuleLayoutToolbar className="border-b border-border p-2">
                <TabsList variant="primary" className="w-full flex-wrap">
                  <TabsTrigger value="ALL" className="flex-1 text-[13px]">All</TabsTrigger>
                  <TabsTrigger value="DM" className="flex-1 text-[13px]">DMs</TabsTrigger>
                  <TabsTrigger value="GROUP" className="flex-1 text-[13px]">Groups</TabsTrigger>
                  <TabsTrigger value="PROJECT" className="flex-1 text-[13px]">Projects</TabsTrigger>
                </TabsList>
              </ModuleLayoutToolbar>

              <div className="flex-1 overflow-hidden">
                {sessionsLoading ? (
                  <div className="p-4 flex justify-center text-muted-foreground">Loading...</div>
                ) : (
                  <ChatThreadList
                    threads={threads}
                    activeThreadId={activeThread?.id}
                    onThreadClick={(thread) => setActiveThread(thread)}
                    onParticipantClick={(thread) => setViewingParticipants(thread)}
                  />
                )}
              </div>
            </div>

            {/* MAIN CONTENT AREA */}
            <div
              className={cn(
                "relative min-w-0 flex-1 flex-col overflow-hidden bg-background-space",
                activeThread ? "flex" : "hidden md:flex"
              )}
            >
              {activeThread ? (
                <div className="relative flex min-h-0 flex-1 flex-col">
                  <ChatMessages
                    thread={activeThread}
                    messages={currentMessages}
                    message={message}
                    setMessage={setMessage}
                    onSend={handleSend}
                    onKeyDown={onKeyDown}
                    onBack={() => setActiveThread(null)}
                    onParticipantClick={(thread) => setViewingParticipants(thread)}
                    isLoading={messagesLoading || isSending}
                  />
                  {viewingParticipants && (
                    <ParticipantsOverlay
                      thread={viewingParticipants}
                      onClose={() => setViewingParticipants(null)}
                    />
                  )}
                </div>
              ) : threads.length === 0 && !sessionsLoading ? (
                <div className="animate-in fade-in zoom-in-95 flex flex-1 flex-col items-center justify-center p-8 text-center duration-500">
                  <div className="mb-6 flex items-center justify-center">
                    <NoMessageSvg className="text-primary size-32" />
                  </div>

                  <p className="text-muted-foreground max-w-sm leading-relaxed">
                    Start a new session or project to see your connections here.
                  </p>
                </div>
              ) : (
                <div className="animate-in fade-in zoom-in-95 flex flex-1 flex-col items-center justify-center p-8 text-center duration-500">
                  <div className="mb-6 flex items-center justify-center">
                    <NoMessageSvg className="text-primary size-32" />
                  </div>

                  <p className="text-muted-foreground max-w-sm leading-relaxed">
                    Choose a thread from the sidebar to continue your discussion.
                  </p>
                </div>
              )}
            </div>
          </div>
        </Tabs>
      </ModuleLayout>
    </div>
  );
}
