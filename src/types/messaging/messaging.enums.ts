export const SessionType = {
  DM: "DM",
  GROUP: "GROUP",
  PROJECT: "PROJECT",
  AI_DM: "AI_DM",
  PROPOSAL: "PROPOSAL",
} as const;
export type SessionType = (typeof SessionType)[keyof typeof SessionType];

export const MemberType = {
  HUMAN: "HUMAN",
  AI: "AI",
} as const;
export type MemberType = (typeof MemberType)[keyof typeof MemberType];

export const MessageRole = {
  HUMAN: "HUMAN",
  AI: "AI",
  SYSTEM: "SYSTEM",
  TOOL: "TOOL",
} as const;
export type MessageRole = (typeof MessageRole)[keyof typeof MessageRole];
