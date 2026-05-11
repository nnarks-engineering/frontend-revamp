import { Users, Zap, Sparkles, LineChart, type LucideIcon } from "lucide-react";

export interface StructureItem {
  id: string;
  key: "milestoneEscrow" | "communityTrust" | "aiPowered" | "marketIntelligence";
  image: string;
  icon: LucideIcon;
}

export const structureData: StructureItem[] = [
  {
    id: "milestone-escrow",
    key: "milestoneEscrow",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&h=800&fit=crop",
    icon: Zap,
  },
  {
    id: "community-trust",
    key: "communityTrust",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&h=800&fit=crop",
    icon: Users,
  },
  {
    id: "ai-powered",
    key: "aiPowered",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=800&fit=crop",
    icon: Sparkles,
  },
  {
    id: "market-intelligence",
    key: "marketIntelligence",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&h=800&fit=crop",
    icon: LineChart,
  }
];
