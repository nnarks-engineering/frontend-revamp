/**
 * User & Profile types — mirrors backend UserRead, ProfileRead schemas.
 */

export interface User {
  id: string;
  email: string;
  username: string | null;
  is_active: boolean;
  is_superuser: boolean;
  created_at: string;
  updated_at: string;
}

export interface Profile {
  id: string;
  user_id: string;
  display_name: string | null;
  bio: string | null;
  avatar_url: string | null;
  updated_at: string;
}

export interface ProfileUpdatePayload {
  display_name?: string;
  bio?: string;
  avatar_url?: string;
}
