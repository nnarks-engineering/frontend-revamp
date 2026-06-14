import {
  faHouseChimney,
  faFolderOpen,
  faGavel,
  faLock,
  faUserShield,
  faInbox,
  faEnvelopeOpen,
  faBell,
  faPeopleGroup,
  faChartPie,
  faUserGroup,
  faIdCard,
  faWallet,
  faMicrochip,
  faSearch,
  faFileInvoiceDollar,
  faSliders,
  faProjectDiagram,
} from "@fortawesome/free-solid-svg-icons";

import type { NavGroup } from "./nav-config-si";

export const NAV_GROUPS: NavGroup[] = [
  {
    title: "Overview",
    items: [
      {
        id: "home",
        label: "Home",
        description: "Overview of your business, activity, and key metrics.",
        icon: faHouseChimney,
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
        icon: faFolderOpen,
        to: "/projects",
        userTypes: ["client", "vendor"],
        childrenLayout: "vertical-sidebar",
        children: [
           {
            id: "projects-overview",
            label: "Projects Overview",
            icon: faProjectDiagram,
            to: "/projects",
          },
          {
            id: "projects-tasks",
            label: "Tasks & Timeline",
            icon: faBell,
            to: "/projects/tasks-timeline",
          },
          {
            id: "projects-documents",
            label: "Documents",
            icon: faEnvelopeOpen,
            to: "/projects/documents",
          },
          {
            id: "projects-disputes",
            label: "Disputes",
            icon: faGavel,
            to: "/projects/disputes",
          },
          {
            id: "projects-supervisors",
            label: "Supervisors",
            icon: faUserShield,
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
        icon: faWallet,
        to: "/escrow",
        userTypes: ["vendor", "client"],
        childrenLayout: "vertical-sidebar",
        children: [
          {
            id: "wallet-overview",
            label: "Wallet Overview",
            icon: faChartPie,
            to: "/escrow",
          },
          {
            id: "wallet-contributors",
            label: "Contributors",
            icon: faUserGroup,
            to: "/organization/team",
            userTypes: ["vendor"],
          },
          {
            id: "wallet-bank-integration",
            label: "Bank Integration",
            icon: faLock,
            to: "/organization",
            userTypes: ["vendor"],
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
        icon: faInbox,
        to: "/inbox",
        userTypes: ["client", "vendor"],
        childrenLayout: "vertical-sidebar",
      },
    ],
  },
  {
    title: "Organization",
    items: [
      {
        id: "organization",
        label: "Organization",
        icon: faPeopleGroup,
        to: "/organization",
        userTypes: ["vendor"],
        childrenLayout: "vertical-sidebar",
        children: [
          { id: "org-overview", label: "Overview", icon: faChartPie, to: "/organization" },
          { id: "org-team", label: "Team", icon: faUserGroup, to: "/organization/team" },
          { id: "org-kyc", label: "KYC & Compliance", icon: faIdCard, to: "/organization/kyc" },
          { id: "org-agents", label: "Agents", icon: faMicrochip, to: "/organization/agents" },
          { id: "org-evidence", label: "Evidence", icon: faSearch, to: "/organization/evidence" },
          {
            id: "org-billing",
            label: "Billing & Plan",
            icon: faFileInvoiceDollar,
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
            icon: faSliders,
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
