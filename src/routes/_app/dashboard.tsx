import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  Users,
  ArrowLeftRight,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  MoreHorizontal,
  ChevronRight,
  Building2,
} from "lucide-react";
import { cn } from "@/shared/lib/utils";

export const Route = createFileRoute("/_app/dashboard")({
  component: DashboardPage,
});

/* ───────── Stat Card ───────── */
interface StatCardProps {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: React.ElementType;
  accentClass: string;
}

function StatCard({ title, value, change, trend, icon: Icon, accentClass }: StatCardProps) {
  return (
    <div className="group relative bg-white rounded-2xl border border-border/50 p-5 hover:shadow-md hover:shadow-primary/5 hover:border-primary/20 transition-all duration-250 overflow-hidden">
      {/* Subtle gradient accent */}
      <div className={cn("absolute top-0 right-0 w-24 h-24 rounded-full blur-3xl opacity-20 -translate-y-8 translate-x-8 transition-opacity duration-300 group-hover:opacity-30", accentClass)} />

      <div className="flex items-start justify-between relative">
        <div className="space-y-2.5">
          <p className="text-[12px] font-medium text-muted-foreground uppercase tracking-wide">{title}</p>
          <p className="text-2xl font-bold text-foreground tracking-tight">{value}</p>
          <div className="flex items-center gap-1.5">
            {trend === "up" ? (
              <ArrowUpRight className="w-3.5 h-3.5 text-success" />
            ) : (
              <ArrowDownRight className="w-3.5 h-3.5 text-destructive" />
            )}
            <span
              className={cn(
                "text-[11.5px] font-semibold",
                trend === "up" ? "text-success" : "text-destructive"
              )}
            >
              {change}
            </span>
            <span className="text-[11px] text-muted-foreground">vs last month</span>
          </div>
        </div>
        <div
          className={cn(
            "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
            accentClass
          )}
        >
          <Icon className="w-5 h-5 text-white" />
        </div>
      </div>
    </div>
  );
}

/* ───────── Activity Item ───────── */
interface ActivityItemProps {
  title: string;
  description: string;
  time: string;
  status: "completed" | "pending" | "alert";
}

function ActivityItem({ title, description, time, status }: ActivityItemProps) {
  const statusConfig = {
    completed: { icon: CheckCircle2, color: "text-success", bg: "bg-success/10" },
    pending: { icon: Clock, color: "text-warning", bg: "bg-warning/10" },
    alert: { icon: AlertCircle, color: "text-destructive", bg: "bg-destructive/10" },
  };
  const { icon: StatusIcon, color, bg } = statusConfig[status];

  return (
    <div className="flex items-start gap-3 px-4 py-3 hover:bg-muted/30 rounded-xl transition-colors duration-150 cursor-pointer group">
      <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5", bg)}>
        <StatusIcon className={cn("w-4 h-4", color)} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-medium text-foreground truncate group-hover:text-primary transition-colors">{title}</p>
        <p className="text-[11.5px] text-muted-foreground truncate">{description}</p>
      </div>
      <span className="text-[10.5px] text-muted-foreground/60 shrink-0 mt-1">{time}</span>
    </div>
  );
}

/* ───────── Transaction Row ───────── */
interface TransactionRowProps {
  name: string;
  type: string;
  amount: string;
  status: "Completed" | "Processing" | "Pending";
  date: string;
}

function TransactionRow({ name, type, amount, status, date }: TransactionRowProps) {
  const statusStyles = {
    Completed: "bg-success/10 text-success",
    Processing: "bg-primary/10 text-primary",
    Pending: "bg-warning/10 text-warning",
  };

  return (
    <div className="flex items-center gap-3 px-4 py-3.5 hover:bg-muted/30 rounded-xl transition-colors duration-150 cursor-pointer group">
      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center shrink-0">
        <Building2 className="w-4 h-4 text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-medium text-foreground truncate group-hover:text-primary transition-colors">{name}</p>
        <p className="text-[11px] text-muted-foreground">{type}</p>
      </div>
      <div className="text-right shrink-0">
        <p className="text-[13px] font-semibold text-foreground">{amount}</p>
        <div className="flex items-center gap-1.5 justify-end">
          <span className={cn("text-[10px] font-medium px-1.5 py-0.5 rounded-full", statusStyles[status])}>
            {status}
          </span>
          <span className="text-[10px] text-muted-foreground/60">{date}</span>
        </div>
      </div>
    </div>
  );
}

/* ───────── Dashboard Page ───────── */
function DashboardPage() {
  const stats: StatCardProps[] = [
    {
      title: "Total Revenue",
      value: "GH₵ 124,560",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      accentClass: "bg-primary",
    },
    {
      title: "Active Clients",
      value: "1,248",
      change: "+8.2%",
      trend: "up",
      icon: Users,
      accentClass: "bg-secondary-500",
    },
    {
      title: "Transactions",
      value: "3,462",
      change: "+23.1%",
      trend: "up",
      icon: ArrowLeftRight,
      accentClass: "bg-success",
    },
    {
      title: "Growth Rate",
      value: "18.4%",
      change: "-2.1%",
      trend: "down",
      icon: TrendingUp,
      accentClass: "bg-warning",
    },
  ];

  const recentActivity: ActivityItemProps[] = [
    { title: "Escrow payment released", description: "Transaction #TXN-4821 completed successfully", time: "2m ago", status: "completed" },
    { title: "New client registered", description: "Kwame Asante joined the platform", time: "15m ago", status: "completed" },
    { title: "Payment verification pending", description: "Transaction #TXN-4819 awaiting confirmation", time: "1h ago", status: "pending" },
    { title: "Dispute flagged", description: "Client reported an issue with #TXN-4815", time: "3h ago", status: "alert" },
    { title: "Monthly report generated", description: "April 2026 financial summary ready", time: "5h ago", status: "completed" },
    { title: "Bulk transfer initiated", description: "15 payments queued for processing", time: "8h ago", status: "pending" },
  ];

  const transactions: TransactionRowProps[] = [
    { name: "Accra Heights Ltd", type: "Property Escrow", amount: "GH₵ 45,000", status: "Completed", date: "May 3" },
    { name: "Kumasi Ventures", type: "Service Payment", amount: "GH₵ 12,800", status: "Processing", date: "May 3" },
    { name: "Cape Coast Realty", type: "Property Escrow", amount: "GH₵ 78,500", status: "Pending", date: "May 2" },
    { name: "Tema Industrial Co.", type: "Trade Finance", amount: "GH₵ 34,200", status: "Completed", date: "May 2" },
    { name: "Takoradi Shipping", type: "Logistics Payment", amount: "GH₵ 22,100", status: "Completed", date: "May 1" },
  ];

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto font-outfit">
      {/* Welcome Section */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-foreground tracking-tight">
            Welcome back 👋
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Here's what's happening with your business today.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 text-[13px] font-medium text-muted-foreground bg-white border border-border/60 rounded-xl hover:bg-muted/40 hover:border-primary/20 transition-all duration-150">
            Export
          </button>
          <button className="px-4 py-2 text-[13px] font-medium text-white bg-primary rounded-xl hover:bg-primary-600 transition-all duration-150 shadow-sm shadow-primary/20">
            + New Transaction
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Main Grid — Activity + Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-border/50 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border/40">
            <h3 className="text-[14px] font-semibold text-foreground">Recent Activity</h3>
            <button className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all duration-150">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
          <div className="py-1.5 max-h-[420px] overflow-y-auto scrollbar-hide">
            {recentActivity.map((item, idx) => (
              <ActivityItem key={idx} {...item} />
            ))}
          </div>
          <div className="px-5 py-3 border-t border-border/40">
            <button className="flex items-center gap-1 text-[12px] font-medium text-primary hover:text-primary-600 transition-colors">
              View all activity
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Latest Transactions */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-border/50 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border/40">
            <h3 className="text-[14px] font-semibold text-foreground">Latest Transactions</h3>
            <button className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all duration-150">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
          <div className="py-1.5">
            {transactions.map((txn, idx) => (
              <TransactionRow key={idx} {...txn} />
            ))}
          </div>
          <div className="px-5 py-3 border-t border-border/40">
            <button className="flex items-center gap-1 text-[12px] font-medium text-primary hover:text-primary-600 transition-colors">
              View all transactions
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions / Performance Banner */}
      <div className="relative bg-gradient-to-r from-primary-950 via-primary-900 to-primary-800 rounded-2xl p-6 md:p-8 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-1/3 w-40 h-40 bg-secondary/15 rounded-full blur-2xl translate-y-1/2" />

        <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-white mb-1">
              Performance Overview
            </h3>
            <p className="text-sm text-primary-200/80 max-w-md">
              Your transaction volume is up 23% this month. Keep the momentum going with automated payment reminders.
            </p>
          </div>
          <button className="px-5 py-2.5 text-[13px] font-semibold text-primary-950 bg-white rounded-xl hover:bg-primary-50 transition-all duration-150 shadow-lg shadow-black/20 shrink-0">
            View Full Report
          </button>
        </div>
      </div>
    </div>
  );
}
