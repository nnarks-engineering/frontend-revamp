// ── Industry ────────────────────────────────────────────────────────────────
export const Industry = {
  agriculture: "agriculture",
  construction: "construction",
  technology: "technology",
  healthcare: "healthcare",
  education: "education",
  manufacturing: "manufacturing",
  retail: "retail",
  other: "other",
} as const;
export type Industry = (typeof Industry)[keyof typeof Industry];

// ── ProjectPreset ─────────────────────────────────────────────────────────────
export const ProjectPreset = {
  start_a_project: "start_a_project",
} as const;
export type ProjectPreset = (typeof ProjectPreset)[keyof typeof ProjectPreset];

// ── SupervisionLevel ────────────────────────────────────────────────────────
export const SupervisionLevel = {
  unsupervised: "unsupervised",
  basic: "basic",
  enhanced: "enhanced",
  full: "full",
} as const;
export type SupervisionLevel = (typeof SupervisionLevel)[keyof typeof SupervisionLevel];

// ── ProjectStatus ────────────────────────────────────────────────────────────
export const ProjectStatus = {
  draft: "draft",
  pre_project: "pre_project",
  active: "active",
  paused: "paused",
  completed: "completed",
  archived: "archived",
} as const;
export type ProjectStatus = (typeof ProjectStatus)[keyof typeof ProjectStatus];



// ── MemberRole ───────────────────────────────────────────────────────────────
export const ProjectMemberRole = {
  owner: "owner",
  partner: "partner",
  supervisor: "supervisor",
} as const;
export type ProjectMemberRole = (typeof ProjectMemberRole)[keyof typeof ProjectMemberRole];

// ── MemberStatus ─────────────────────────────────────────────────────────────
export const ProjectMemberStatus = {
  pending: "pending",
  active: "active",
  rejected: "rejected",
} as const;
export type ProjectMemberStatus = (typeof ProjectMemberStatus)[keyof typeof ProjectMemberStatus];

// ── MilestoneStatus ──────────────────────────────────────────────────────────
export const ProjectMilestoneStatus = {
  pending: "pending",
  in_progress: "in_progress",
  under_review: "under_review",
  approved: "approved",
  failed: "failed",
  skipped: "skipped",
} as const;
export type ProjectMilestoneStatus = (typeof ProjectMilestoneStatus)[keyof typeof ProjectMilestoneStatus];

// ── EvidenceType ─────────────────────────────────────────────────────────────

// ── ReviewStatus ─────────────────────────────────────────────────────────────
export const ProjectReviewStatus = {
  pending: "pending",
  approved: "approved",
  rejected: "rejected",
} as const;
export type ProjectReviewStatus = (typeof ProjectReviewStatus)[keyof typeof ProjectReviewStatus];

// ── ReviewerType ─────────────────────────────────────────────────────────────
export const ProjectReviewerType = {
  human: "human",
  ai: "ai",
} as const;
export type ProjectReviewerType = (typeof ProjectReviewerType)[keyof typeof ProjectReviewerType];

export const ProjectFileType = {
  image: "image",
  video: "video",
  document: "document",
  audio: "audio",
} as const;
export type ProjectFileType = (typeof ProjectFileType)[keyof typeof ProjectFileType];