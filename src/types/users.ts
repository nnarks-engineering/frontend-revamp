/**
 * User & Profile types — mirrors backend UserRead, ProfileRead schemas.
 */
import type { SessionType } from "./enums";

export interface User {
  id: string;
  email: string;
  username: string | null;
  is_active: boolean;
  is_superuser: boolean;
  is_llm: boolean;
  created_at: string;
  updated_at: string;
}

export interface Profile {
  id: string;
  user_id: string;
   country?: string | null;
  avatar?: string | null;
  first_name: string | null;
  last_name: string | null;
  other_names: string | null;
  updated_at: string;
}

export interface ProfileUpdatePayload {
  first_name?: string | null;
  last_name?: string | null;
  country?: string | null;
  avatar?: string | null;
  other_names?: string | null;
}

// ── API-aligned aliases ───────────────────────────────────────────────
export type UserRead = User;
export type ProfileRead = Profile;
export type ProfileUpdate = ProfileUpdatePayload;

export interface UserUpdate {
  username?: string;
}

export interface UsernameAvailability {
  available: boolean;
}

// ── Agent settings ────────────────────────────────────────────────────

export interface ToolSettings {
  dm: string[];
  ai_dm: string[];
  group: string[];
  project: string[];
  proposal: string[];
}

export interface AgentSettingsRead {
  id: string;
  user_id: string;
  tools: ToolSettings;
}

export interface AgentSettingsUpdate {
  tools?: Partial<Record<Lowercase<SessionType>, string[]>>;
}
