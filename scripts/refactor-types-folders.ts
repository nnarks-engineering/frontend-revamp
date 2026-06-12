import * as fs from 'fs';
import * as path from 'path';

const TYPES_DIR = path.join(process.cwd(), 'src/types');

const enumsToGenerate: Record<string, string> = {
    company: `
export const CompanyRole = {
  owner: "owner",
  admin: "admin",
  member: "member",
  viewer: "viewer",
  agent: "agent",
} as const;
export type CompanyRole = (typeof CompanyRole)[keyof typeof CompanyRole];

export const CompanyMemberStatus = {
  pending: "pending",
  active: "active",
  removed: "removed",
  left: "left",
} as const;
export type CompanyMemberStatus = (typeof CompanyMemberStatus)[keyof typeof CompanyMemberStatus];

export const PartnershipTier = {
  none: "none",
  verified: "verified",
  nnarks_partner: "nnarks_partner",
} as const;
export type PartnershipTier = (typeof PartnershipTier)[keyof typeof PartnershipTier];

export const CompanyPermission = {
  company_edit_profile: "company_edit_profile",
  company_delete: "company_delete",
  company_transfer_ownership: "company_transfer_ownership",
  member_invite: "member_invite",
  member_remove: "member_remove",
  member_change_role: "member_change_role",
  service_create: "service_create",
  service_edit: "service_edit",
  service_delete: "service_delete",
  service_publish: "service_publish",
  project_create: "project_create",
  escrow_accept: "escrow_accept",
  escrow_fulfill: "escrow_fulfill",
  escrow_dispute: "escrow_dispute",
  kyc_submit: "kyc_submit",
  wallet_view: "wallet_view",
  wallet_withdraw: "wallet_withdraw",
  proposal_propose: "proposal_propose",
  proposal_vote: "proposal_vote",
  agent_manage: "agent_manage",
} as const;
export type CompanyPermission = (typeof CompanyPermission)[keyof typeof CompanyPermission];
`,
    wallet: `
export const WalletOwnerType = {
  USER: "USER",
  PROJECT: "PROJECT",
} as const;
export type WalletOwnerType = (typeof WalletOwnerType)[keyof typeof WalletOwnerType];

export const TxType = {
  DEPOSIT: "DEPOSIT",
  LOCK: "LOCK",
  RELEASE: "RELEASE",
  WITHDRAWAL: "WITHDRAWAL",
  TRANSFER: "TRANSFER",
} as const;
export type TxType = (typeof TxType)[keyof typeof TxType];

export const TxStatus = {
  PENDING: "PENDING",
  COMPLETED: "COMPLETED",
  FAILED: "FAILED",
} as const;
export type TxStatus = (typeof TxStatus)[keyof typeof TxStatus];

export const WalletPaymentProvider = {
  SIMULATOR: "SIMULATOR",
  FLUTTERWAVE: "FLUTTERWAVE",
  STRIPE: "STRIPE",
} as const;
export type WalletPaymentProvider = (typeof WalletPaymentProvider)[keyof typeof WalletPaymentProvider];
`,
    messaging: `
export const SessionType = {
  DM: "DM",
  GROUP: "GROUP",
  PROJECT: "PROJECT",
  AI_DM: "AI_DM",
  PROPOSAL: "PROPOSAL",
} as const;
export type SessionType = (typeof SessionType)[keyof typeof SessionType];

export const MemberType = {
  HUMAN: "HUMAN",
  AI: "AI",
} as const;
export type MemberType = (typeof MemberType)[keyof typeof MemberType];

export const MessageRole = {
  HUMAN: "HUMAN",
  AI: "AI",
  SYSTEM: "SYSTEM",
  TOOL: "TOOL",
} as const;
export type MessageRole = (typeof MessageRole)[keyof typeof MessageRole];
`,
    kyc: `
export const KycTier = {
  none: "none",
  basic: "basic",
  standard: "standard",
  enhanced: "enhanced",
} as const;
export type KycTier = (typeof KycTier)[keyof typeof KycTier];

export const KycBadge = {
  none: "none",
  bronze: "bronze",
  silver: "silver",
  gold: "gold",
} as const;
export type KycBadge = (typeof KycBadge)[keyof typeof KycBadge];

export const KycDocumentType = {
  passport: "passport",
  drivers_license: "drivers_license",
  national_id: "national_id",
  utility_bill: "utility_bill",
  bank_statement: "bank_statement",
  certificate_of_incorporation: "certificate_of_incorporation",
  tax_id: "tax_id",
  business_license: "business_license",
} as const;
export type KycDocumentType = (typeof KycDocumentType)[keyof typeof KycDocumentType];

export const KycDocumentStatus = {
  pending: "pending",
  approved: "approved",
  rejected: "rejected",
} as const;
export type KycDocumentStatus = (typeof KycDocumentStatus)[keyof typeof KycDocumentStatus];
`,
    service: `
export const ServiceStatus = {
  draft: "draft",
  published: "published",
  archived: "archived",
} as const;
export type ServiceStatus = (typeof ServiceStatus)[keyof typeof ServiceStatus];
`,
    proposal: `
export const ProposalStatus = {
  PENDING: "PENDING",
  ACCEPTED: "ACCEPTED",
  REJECTED: "REJECTED",
  EXPIRED: "EXPIRED",
} as const;
export type ProposalStatus = (typeof ProposalStatus)[keyof typeof ProposalStatus];

export const ProposalSubjectType = {
  PROJECT: "PROJECT",
  MILESTONE: "MILESTONE",
} as const;
export type ProposalSubjectType = (typeof ProposalSubjectType)[keyof typeof ProposalSubjectType];

export const ProposalAction = {
  ARCHIVE: "ARCHIVE",
  SKIP: "SKIP",
} as const;
export type ProposalAction = (typeof ProposalAction)[keyof typeof ProposalAction];

export const VoteChoice = {
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
} as const;
export type VoteChoice = (typeof VoteChoice)[keyof typeof VoteChoice];
`,
    notification: `
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
`,
    vendor: `
export const VendorServiceCategory = {
  ALL: "ALL",
  CONSTRUCTION: "CONSTRUCTION",
  ENGINEERING: "ENGINEERING",
  ARCHITECTURE: "ARCHITECTURE",
  PLUMBING: "PLUMBING",
  ELECTRICAL: "ELECTRICAL",
  INTERIOR_DESIGN: "INTERIOR_DESIGN",
  LANDSCAPING: "LANDSCAPING",
  PROJECT_MANAGEMENT: "PROJECT_MANAGEMENT",
  CONSULTING: "CONSULTING",
  IT_SERVICES: "IT_SERVICES",
  LOGISTICS: "LOGISTICS",
  OTHER: "OTHER",
} as const;
export type VendorServiceCategory = (typeof VendorServiceCategory)[keyof typeof VendorServiceCategory];
`,
    document: `
export const DocumentCategory = {
  ALL: "ALL",
  CONTRACT: "CONTRACT",
  PAY_SLIP: "PAY_SLIP",
  EMPLOYMENT_LETTER: "EMPLOYMENT_LETTER",
  REPORT: "REPORT",
  INVOICE: "INVOICE",
  OTHER: "OTHER",
} as const;
export type DocumentCategory = (typeof DocumentCategory)[keyof typeof DocumentCategory];
`
};

const domains = [
    { name: 'company', file: 'companies.ts' },
    { name: 'wallet', file: 'wallet.ts' },
    { name: 'messaging', file: 'messaging.ts' },
    { name: 'kyc', file: 'kyc.ts' },
    { name: 'service', file: 'services.ts' },
    { name: 'notification', file: 'notifications.ts' },
    { name: 'proposal', file: 'proposals.ts' },
    { name: 'user', file: 'users.ts' },
    { name: 'vendor', file: 'vendors.ts' },
    { name: 'document', file: 'documents.ts' },
    { name: 'schedule', file: 'schedules.ts' },
    { name: 'onboarding', file: 'onboarding.ts' }
];

async function run() {
    for (const domain of domains) {
        const domainDir = path.join(TYPES_DIR, domain.name);
        if (!fs.existsSync(domainDir)) {
            fs.mkdirSync(domainDir, { recursive: true });
        }

        // Write enums file if there are enums
        if (enumsToGenerate[domain.name]) {
            fs.writeFileSync(path.join(domainDir, domain.name + ".enums.ts"), enumsToGenerate[domain.name].trim() + "\\n");
        }

        // Copy the flat file to types.ts and update imports
        const flatFilePath = path.join(TYPES_DIR, domain.file);
        if (fs.existsSync(flatFilePath)) {
            let content = fs.readFileSync(flatFilePath, 'utf8');
            // Change import from "./enums" to "./{domain}.enums" if they exist
            if (enumsToGenerate[domain.name]) {
                content = content.replace(/from "\.\/enums"/g, 'from "./' + domain.name + '.enums"');
            } else {
                content = content.replace(/from "\.\/enums"/g, 'from "../shared/enums"');
            }
            
            // Write to {domain}.types.ts
            fs.writeFileSync(path.join(domainDir, domain.name + ".types.ts"), content);
            
            // Delete the flat file
            fs.unlinkSync(flatFilePath);
        }

        // Create index.ts
        let indexContent = 'export * from "./' + domain.name + '.types";\\n';
        if (enumsToGenerate[domain.name]) {
            indexContent = 'export * from "./' + domain.name + '.enums";\\n' + indexContent;
        }
        fs.writeFileSync(path.join(domainDir, 'index.ts'), indexContent);
    }
    
    // Auth domain (already exists but auth.ts is flat)
    const authDir = path.join(TYPES_DIR, 'auth');
    if (fs.existsSync(path.join(TYPES_DIR, 'auth.ts'))) {
        fs.renameSync(path.join(TYPES_DIR, 'auth.ts'), path.join(authDir, 'auth.types.ts'));
        fs.writeFileSync(path.join(authDir, 'index.ts'), 'export * from "./auth.types";\\n');
    }

    // Delete enums.ts
    if (fs.existsSync(path.join(TYPES_DIR, 'enums.ts'))) {
        fs.unlinkSync(path.join(TYPES_DIR, 'enums.ts'));
    }

    console.log("Domain folders created and flat files migrated!");
}

run().catch(console.error);
