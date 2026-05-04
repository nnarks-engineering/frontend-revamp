/**
 * User & Profile API functions.
 *
 * Maps to the backend `/users/` endpoints.
 */

import { api } from "@/shared/lib/api-client";
import { USER_ENDPOINTS } from "@/shared/lib/constants";

// ── Types (mirror backend UserRead / ProfileRead) ────────────────────

export interface UserRead {
  id: string;
  email: string;
  username: string | null;
  is_active: boolean;
  is_superuser: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProfileRead {
  id: string;
  user_id: string;
  display_name: string | null;
  bio: string | null;
  avatar_url: string | null;
  updated_at: string;
}

export interface ProfileUpdate {
  display_name?: string;
  bio?: string;
  avatar_url?: string;
}

export interface UserUpdate {
  username?: string;
}

export interface UsernameAvailability {
  available: boolean;
}

// ── API calls ────────────────────────────────────────────────────────

/** GET /users/me — requires auth */
export async function getMe(): Promise<UserRead> {
  const res = await api.get<UserRead>(USER_ENDPOINTS.ME);
  return res.data;
}

/** PATCH /users/me */
export async function updateMe(data: UserUpdate): Promise<UserRead> {
  const res = await api.patch<UserRead>(USER_ENDPOINTS.ME, data);
  return res.data;
}

/** GET /users/me/profile — requires auth */
export async function getMyProfile(): Promise<ProfileRead> {
  const res = await api.get<ProfileRead>(USER_ENDPOINTS.MY_PROFILE);
  return res.data;
}

/** PATCH /users/me/profile */
export async function updateMyProfile(data: ProfileUpdate): Promise<ProfileRead> {
  const res = await api.patch<ProfileRead>(USER_ENDPOINTS.MY_PROFILE, data);
  return res.data;
}

/** GET /users/username/:username/available */
export async function checkUsernameAvailable(
  username: string,
): Promise<UsernameAvailability> {
  const res = await api.get<UsernameAvailability>(
    USER_ENDPOINTS.USERNAME_AVAILABLE(username),
  );
  return res.data;
}
