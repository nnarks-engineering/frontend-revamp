export interface TrustCircle {
  id: string;
  name: string;
  members: number;
  pooled: number;
  status: string;
  voteOpen?: boolean;
}

export const MOCK_TRUST_CIRCLES: TrustCircle[] = [
  {
    id: "1",
    name: "Accra Tech Fund",
    members: 12,
    pooled: 24000,
    status: "Active",
    voteOpen: true,
  },
  {
    id: "2",
    name: "Lagos Builders",
    members: 8,
    pooled: 11500,
    status: "Active",
  },
  {
    id: "3",
    name: "Nairobi Seed Group",
    members: 5,
    pooled: 6000,
    status: "Forming",
  },
];
