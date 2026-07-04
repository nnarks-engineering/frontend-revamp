import type { Currency } from "../shared/shared.enums";

import type { Industry, ProjectPreset, ProjectStatus, SupervisionLevel } from "./project.enums";

// ── Shared sub-objects ───────────────────────────────────────────────────────

export interface AddressBase {
  street_line_1: string;
  street_line_2?: string;
  city: string;
  region: string;
  postal_code?: string;
  country_code: string;
}

export interface AddressResponse extends AddressBase {
  country_name: string;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

// ── Shared project fields returned by every project endpoint ─────────────────
export interface ProjectBase {
  id: string;
  owner_company_id: string;
  title: string;
  description: string;
  industry: Industry;
  status: ProjectStatus;
  preset: ProjectPreset;
  supervision_level: SupervisionLevel;
  location_address: AddressResponse;
  location_coordinates: Coordinates | null;
  start_date: string;
  end_date: string;
  total_budget: string;
  currency: Currency;
  wallet_id: string;
  chat_session_id: string;
}
