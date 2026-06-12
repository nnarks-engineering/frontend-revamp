import {
  Bell,
  Brain,
  CreditCard,
  Cpu,
  FileText,
  FolderOpen,
  Gavel,
  Home,
  Inbox,
  Lock,
  Mail,
  MessageSquare,
  PieChart,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  UserCheck,
  Users,
  Wallet,
} from "lucide-react";

import type { NavGroup } from "./nav-config";

export const NAV_GROUPS: NavGroup[] = [
  {
    title: "Overview",
    items: [
      {
        id: "home",
        label: "Home",
        description: "Overview of your business, activity, and key metrics.",
        icon: Home,
        to: "/home",
        userTypes: ["client", "vendor"],
      },
    ],
  },
  {
    title: "Work",
    items: [
      {
        id: "projects",
        label: "Projects",
        icon: FolderOpen,
        to: "/projects",
        userTypes: ["client", "vendor"],
        childrenLayout: "vertical-sidebar",
        children: [
           {
            id: "projects-overview",
            label: "Overview",
            icon: Lock,
            to: "/projects",
          },
          {
            id: "projects-milestones",
            label: "Milestones",
            icon: Lock,
            to: "/projects/milestones",
          },
          {
            id: "projects-tasks",
            label: "Tasks & Timeline",
            icon: Bell,
            to: "/projects/tasks-timeline",
          },
          {
            id: "projects-documents",
            label: "Documents",
            icon: Mail,
            to: "/projects/documents",
          },
          {
            id: "projects-disputes",
            label: "Disputes",
            icon: Gavel,
            to: "/projects/disputes",
          },
          {
            id: "projects-supervisors",
            label: "Supervisors",
            icon: ShieldCheck,
            to: "/projects/supervisors",
          },
        ],
      },
    ],
  },
  {
    title: "Finance",
    items: [
      {
        id: "wallet",
        label: "Wallet",
        icon: Wallet,
        to: "/escrow",
        userTypes: ["vendor", "client"],
        childrenLayout: "vertical-sidebar",
        children: [
          {
            id: "wallet-overview",
            label: "Wallet Overview",
            icon: PieChart,
            to: "/escrow",
          },
          {
            id: "wallet-transactions",
            label: "Transactions",
            icon: FileText,
            to: "/escrow",
          },
          {
            id: "wallet-contributors",
            label: "Contributors",
            icon: Users,
            to: "/organization/team",
          },
          {
            id: "wallet-bank-integration",
            label: "Bank Integration",
            icon: Lock,
            to: "/organization",
          },
        ],
      },
    ],
  },
  {
    title: "Inbox",
    items: [
      {
        id: "inbox",
        label: "Inbox",
        icon: Inbox,
        to: "/inbox/direct",
        userTypes: ["client", "vendor"],
        childrenLayout: "vertical-sidebar",
        children: [
          {
            id: "inbox-chats",
            label: "Chats",
            icon: MessageSquare,
            to: "/inbox",
            userTypes: ["client", "vendor"],
            children: [
              {
                id: "inbox-chats-direct",
                label: "Direct Messages",
                to: "/inbox/direct",
                userTypes: ["client", "vendor"],
              },
              {
                id: "inbox-chats-org",
                label: "Organizational",
                to: "/inbox/org",
                userTypes: ["vendor"],
              },
            ],
          },
          {
            id: "inbox-email",
            label: "Email",
            icon: Mail,
            to: "/inbox/email",
            userTypes: ["client", "vendor"],
          },
          {
            id: "inbox-notifications",
            label: "Notifications",
            icon: Bell,
            to: "/inbox/notifications",
            userTypes: ["client", "vendor"],
          },
          {
            id: "inbox-ai", label: "Nnarks AI", icon: Brain, to: "/inbox/ai",
            description: "Chat with your intelligent assistant.",
            userTypes: ["client", "vendor"],
          },
        ],
      },
    ],
  },
  {
    title: "Organization",
    items: [
      {
        id: "organization",
        label: "Organization",
        icon: Users,
        to: "/organization",
        userTypes: ["vendor"],
        childrenLayout: "vertical-sidebar",
        children: [
          { id: "org-overview", label: "Overview", icon: PieChart, to: "/organization" },
          { id: "org-team", label: "Team", icon: Users, to: "/organization/team" },
          { id: "org-kyc", label: "KYC & Compliance", icon: UserCheck, to: "/organization/kyc" },
          { id: "org-agents", label: "Agents", icon: Cpu, to: "/organization/agents" },
          { id: "org-evidence", label: "Evidence", icon: Search, to: "/organization/evidence" },
          {
            id: "org-billing",
            label: "Billing & Plan",
            icon: CreditCard,
            to: "/organization/billing",
            children: [
              { id: "org-billing-plan", label: "Current Plan", to: "/organization/billing" },
              { id: "org-billing-invoices", label: "Invoices", to: "/organization/billing/invoices" },
              { id: "org-billing-payment", label: "Payment Methods", to: "/organization/billing/payment" },
            ],
          },
          {
            id: "org-settings",
            label: "Settings",
            icon: SlidersHorizontal,
            to: "/organization/settings",
            children: [
              { id: "org-settings-general", label: "General", to: "/organization/settings" },
              { id: "org-settings-security", label: "Security", to: "/organization/settings/security" },
              { id: "org-settings-integrations", label: "Integrations", to: "/organization/settings/integrations" },
              { id: "org-settings-notifications", label: "Notifications", to: "/organization/settings/notifications" },
            ],
          },
        ],
      },
    ],
  },
];
