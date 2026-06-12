/**
 * Messaging types — mirrors backend ChatSessionRead, MessageRead, etc.
 */
import type {
  SessionType,
  MemberType,
  MessageRole,
} from "./messaging.enums";

export interface ChatSession {
  id: string;
  session_type: SessionType;
  name: string | null;
}

export interface ChatSessionMember {
  id: string;
  session_id: string;
  user_id: string | null;
  member_type: MemberType;
  agent_name: string | null;
  is_active: boolean;
}

export interface Message {
  id: string;
  session_id: string;
  sender_id: string | null;
  role: MessageRole;
  content: string;
  tool_calls: Record<string, unknown>[] | null;
  tool_call_id: string | null;
  name: string | null;
  checkpoint_id: string | null;
  created_at: string; // ISO datetime
  edited_at: string | null;
  deleted_at: string | null;
}

export interface CreateSessionPayload {
  session_type: SessionType;
  name?: string | null;
  member_ids?: string[];
}

export interface SendMessagePayload {
  content: string;
  restart_checkpoint_id?: string | null;
}
