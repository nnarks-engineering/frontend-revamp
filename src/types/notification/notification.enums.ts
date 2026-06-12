export const NotificationType = {
  system_announcement: "system_announcement",
} as const;
export type NotificationType = (typeof NotificationType)[keyof typeof NotificationType];

export const NotificationLevel = {
  info: "info",
  warning: "warning",
  critical: "critical",
} as const;
export type NotificationLevel = (typeof NotificationLevel)[keyof typeof NotificationLevel];

export const NotificationScope = {
  user: "user",
  company: "company",
} as const;
export type NotificationScope = (typeof NotificationScope)[keyof typeof NotificationScope];

export const NotificationSource = {
  system: "system",
  user_action: "user_action",
  integration: "integration",
} as const;
export type NotificationSource = (typeof NotificationSource)[keyof typeof NotificationSource];
