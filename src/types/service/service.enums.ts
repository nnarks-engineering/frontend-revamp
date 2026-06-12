export const ServiceStatus = {
  draft: "draft",
  published: "published",
  archived: "archived",
} as const;
export type ServiceStatus = (typeof ServiceStatus)[keyof typeof ServiceStatus];
