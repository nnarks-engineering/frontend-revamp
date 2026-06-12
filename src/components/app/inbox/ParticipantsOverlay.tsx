import { Users, X } from "lucide-react";

import type { ChatSession } from "@/types/messaging/messaging.types";

import { Avatar } from "./Avatar";


interface ParticipantsOverlayProps {
  thread: ChatSession;
  onClose: () => void;
}

export const ParticipantsOverlay: React.FC<ParticipantsOverlayProps> = ({onClose }) => {
  // Mock participants for now since backend ChatSession doesn't always include them fully populated
  const participants = [{ name: "You" }];

  return (
    <div className="bg-background/80 animate-in fade-in zoom-in-95 absolute inset-0 z-50 flex flex-col backdrop-blur-md duration-200">
      <div className="border-border bg-card/50 flex items-center justify-between border-b px-4 py-3">
        <div className="flex items-center gap-2">
          <Users className="text-primary h-4 w-4" />
          <h3 className="text-foreground text-[14px] font-bold">
            Participants ({participants.length})
          </h3>
        </div>
        <button
        type="button"
          onClick={onClose}
          className="hover:bg-primary/10 text-muted-foreground cursor-pointer rounded-lg p-1.5 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="custom-scrollbar flex-1 overflow-y-auto p-4">
        <div className="flex flex-col gap-3">
          {participants.map((p) => (
            <div
              key={p.name}
              className="group/member hover:bg-primary/5 flex items-center gap-3 rounded-xl p-2 transition-all"
            >
              <Avatar
                src={null}
                name={p.name}
                className="border-border group-hover/member:border-primary h-10 w-10 cursor-pointer border transition-colors"
                fallbackClassName="bg-primary/20"
              />
              <div className="min-w-0 flex-1">
                <button type="button" className="text-foreground hover:text-primary block w-full cursor-pointer truncate text-left text-[13px] font-medium transition-colors focus:outline-none">
                  {p.name}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
