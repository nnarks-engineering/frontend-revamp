export interface EscrowSummary {
  totalInEscrow: number;
  releasedLast30d: number;
  pendingRelease: number;
}

export interface EscrowEntry {
  id: string;
  projectName: string;
  milestone: string;
  amount: number;
  status: string;
  releaseDate?: string;
}

export const MOCK_ESCROW_SUMMARY: EscrowSummary = {
  totalInEscrow: 14300,
  releasedLast30d: 6200,
  pendingRelease: 840,
};

export const MOCK_ACTIVE_ESCROW: EscrowEntry[] = [
  {
    id: "e1",
    projectName: "Lagos Logistics",
    milestone: "Milestone 2",
    amount: 840,
    status: "Nnarks reviewing",
  },
  {
    id: "e2",
    projectName: "Mobile App MVP",
    milestone: "Milestone 1",
    amount: 3000,
    status: "In progress",
  },
  {
    id: "e3",
    projectName: "API Integration",
    milestone: "Milestone 2",
    amount: 1800,
    status: "In progress",
  },
];

export const MOCK_RELEASED_ESCROW: EscrowEntry[] = [
  {
    id: "e4",
    projectName: "Lagos Logistics",
    milestone: "Milestone 1",
    amount: 840,
    status: "Released",
    releaseDate: "Mar 4",
  },
  {
    id: "e5",
    projectName: "API Integration",
    milestone: "Milestone 1",
    amount: 600,
    status: "Released",
    releaseDate: "Feb 28",
  },
];
