import type { Currency } from "../shared/shared.enums";

import type { MemberResponse } from "./member.types";
import type { MilestoneResponse } from "./milestone.types";
import type { AddressBase, Coordinates, ProjectBase } from "./project.base";
import type { Industry, ProjectStatus, ProjectType } from "./project.enums";
import type { ProjectWalletResponse } from "./wallet.types";

// ── Payloads (sent TO the API) ───────────────────────────────────────────────

export interface ProjectCreatePayload {
  owner_company_id: string;
  title: string;
  description: string;
  industry: Industry;
  project_type: ProjectType;
  location_address: AddressBase;
  location_coordinates?: Coordinates;
  start_date: string;
  end_date: string;
  total_budget: number;
  currency?: Currency;
}

export interface ProjectUpdatePayload {
  title?: string | null;
  description?: string | null;
  status?: ProjectStatus | null;
  location_address?: AddressBase | null;
  location_coordinates?: Coordinates | null;
  start_date?: string | null;
  end_date?: string | null;
}

// ── Responses (received FROM the API) ────────────────────────────────────────

/** Returned by POST /projects and PATCH /projects/{id} */
export type ProjectResponse = ProjectBase;

/** Returned by GET /projects/{id} — includes related data */
export interface ProjectDashboardResponse extends ProjectBase {
  members: MemberResponse[];
  milestones: MilestoneResponse[];
  wallet: ProjectWalletResponse;
}
