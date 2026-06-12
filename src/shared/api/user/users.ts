import { api } from "@/shared/lib/api-client";
import { USER_ENDPOINTS } from "@/shared/lib/constants";
import type {
  AgentSettingsRead,
  AgentSettingsUpdate,
  ProfileRead,
  ProfileUpdate,
  UserRead,
  UserUpdate,
  UsernameAvailability,
} from "@/types";

export type { AgentSettingsRead, AgentSettingsUpdate, ProfileRead, ProfileUpdate, UserRead, UserUpdate, UsernameAvailability };

// ── API calls ────────────────────────────────────────────────────────

/** GET /users/me — requires auth */
export async function getMe(): Promise<UserRead> {
  const res = await api.get<UserRead>(USER_ENDPOINTS.ME);
  return res.data;
}

export async function updateMe(data: UserUpdate): Promise<UserRead> {
  const res = await api.patch<UserRead>(USER_ENDPOINTS.ME, data);
  return res.data;
}

export async function deleteMe(): Promise<void> {
  await api.delete(USER_ENDPOINTS.ME);
}

export async function getMyProfile(): Promise<ProfileRead> {
  const res = await api.get<ProfileRead>(USER_ENDPOINTS.MY_PROFILE);
  return res.data;
}

export async function updateMyProfile(data: ProfileUpdate): Promise<ProfileRead> {
  const res = await api.patch<ProfileRead>(USER_ENDPOINTS.MY_PROFILE, data);
  return res.data;
}

export async function checkUsernameAvailable(
  username: string,
): Promise<UsernameAvailability> {
  const res = await api.get<UsernameAvailability>(
    USER_ENDPOINTS.USERNAME_AVAILABLE(username),
  );
  return res.data;
}

export async function getAgentSettings(): Promise<AgentSettingsRead> {
  const res = await api.get<AgentSettingsRead>(USER_ENDPOINTS.AGENT_SETTINGS);
  return res.data;
}

export async function updateAgentSettings(
  data: AgentSettingsUpdate,
): Promise<AgentSettingsRead> {
  const res = await api.patch<AgentSettingsRead>(USER_ENDPOINTS.AGENT_SETTINGS, data);
  return res.data;
}

