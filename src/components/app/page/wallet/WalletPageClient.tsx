import { useMemo, useState } from "react";
import { useActiveCompany } from "@/shared/contexts/active-company-context";
import { useWallet, useWalletTransactions } from "@/shared/hooks/use-wallet";
import { useProjects } from "@/shared/hooks/use-projects";
import { MinimalStatCard } from "@/components/ui/minimal-stat-card";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  ModuleLayout,
  ModuleLayoutHeader,
  ModuleLayoutHeaderContent,
  ModuleLayoutTitle,
  ModuleLayoutDescription,
  ModuleLayoutHeaderActions,
  ModuleLayoutToolbar,
  ModuleLayoutToolbarCenter,
  ModuleLayoutToolbarRight,
} from "@/components/ui/module-layout";
import { StatusBadge, EmptyState } from "@/components/app/shared";
import RoundingLine from "@/assets/svg/rounding-line2.svg?react";
import NoMoneySvg from "@/assets/svg/no-money.svg?react";
import {
  Wallet,
  ArrowDownLeft,
  ArrowUpRight,
  Search,
  ListFilter,
  Loader2,
  CreditCard,
  TrendingUp,
} from "lucide-react";
import type { WalletTransaction } from "@/types/wallet";
import type { TxType } from "@/types/enums";

type TabKey = "all" | "deposits" | "releases" | "transfers";

const TX_TYPE_LABEL: Record<TxType, string> = {
  DEPOSIT: "Deposit",
  LOCK: "Lock",
  RELEASE: "Release",
  WITHDRAWAL: "Withdrawal",
  TRANSFER: "Transfer",
};

/**
 * Smart currency formatter — keeps values compact (max 6 chars for number portion).
 * Values >= 1,000,000,000 → B suffix
 * Values >= 1,000,000     → M suffix
 * Values >= 1,000         → K suffix
 * Below 1,000             → shown as-is with 2 decimal places
 */
function formatCompact(amount: number): string {
  const n = Number(amount) || 0; // guard against string bleed-through
  const abs = Math.abs(n);
  if (abs >= 1_000_000_000) {
    return `${(n / 1_000_000_000).toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 2 })}B`;
  }
  if (abs >= 1_000_000) {
    return `${(n / 1_000_000).toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 2 })}M`;
  }
  if (abs >= 1_000) {
    return `${(n / 1_000).toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 2 })}K`;
  }
  return n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

/** Full precision formatter — used for the sidebar where space allows. */
function formatFull(amount: number, currency = "GHS"): string {
  return `${currency} ${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

/** Compact stat formatter — currency prefix + compact number. */
function formatCurrency(amount: number, currency = "GHS"): string {
  return `${currency} ${formatCompact(amount)}`;
}

function TransactionRow({ tx, currency }: { tx: WalletTransaction; currency: string }) {
  const isCredit = tx.tx_type === "DEPOSIT" || tx.tx_type === "RELEASE";

  return (
    <div className="flex items-center justify-between px-4 py-3.5 hover:bg-muted/30 transition-colors border-b border-border/40 last:border-0">
      <div className="flex items-center gap-3">
        <div
          className={`flex h-9 w-9 items-center justify-center rounded-full shrink-0 ${
            isCredit
              ? "bg-emerald-100 text-emerald-600"
              : "bg-orange-100 text-orange-600"
          }`}
        >
          {isCredit ? (
            <ArrowDownLeft className="w-4 h-4" />
          ) : (
            <ArrowUpRight className="w-4 h-4" />
          )}
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">
            {TX_TYPE_LABEL[tx.tx_type] ?? tx.tx_type}
          </p>
          <p className="text-xs text-muted-foreground truncate max-w-48">
            {tx.reference || "—"}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <StatusBadge status={tx.status} />
        <span
          className={`text-sm font-semibold font-geist tabular-nums ${
            isCredit ? "text-emerald-600" : "text-foreground"
          }`}
        >
          {isCredit ? "+" : "-"}
          {formatCurrency(tx.amount, currency)}
        </span>
      </div>
    </div>
  );
}

export function WalletPageClient() {
  const { activeCompanyId } = useActiveCompany();
  const { data: wallet, isLoading: walletLoading } = useWallet(activeCompanyId);
  const { data: txData, isLoading: txLoading } = useWalletTransactions(activeCompanyId);
  const { data: projectsData } = useProjects();

  const [tab, setTab] = useState<TabKey>("all");
  const [search, setSearch] = useState("");

  // Derive stats from wallet + projects
  const stats = useMemo(() => {
    // API may return numeric strings — always coerce to Number first
    const totalBudget = projectsData?.items?.reduce(
      (sum, p) => sum + (Number(p.total_budget) || 0),
      0
    ) ?? 0;
    const available = Number(wallet?.available_balance) || 0;
    const locked = Number(wallet?.locked_balance) || 0;
    const released = txData?.items
      ?.filter((tx) => tx.tx_type === "RELEASE" && tx.status === "COMPLETED")
      .reduce((sum, tx) => sum + (Number(tx.amount) || 0), 0) ?? 0;

    return {
      totalBudget,
      locked,
      released,
      remaining: available,
      currency: wallet?.currency ?? "GHS",
    };
  }, [wallet, txData, projectsData]);

  // Filter transactions by tab
  const filteredTransactions = useMemo(() => {
    let txs = txData?.items ?? [];

    if (tab === "deposits") txs = txs.filter((t) => t.tx_type === "DEPOSIT");
    else if (tab === "releases") txs = txs.filter((t) => t.tx_type === "RELEASE");
    else if (tab === "transfers") txs = txs.filter((t) => t.tx_type === "TRANSFER" || t.tx_type === "LOCK");

    if (search.trim()) {
      const q = search.toLowerCase();
      txs = txs.filter((t) => t.reference?.toLowerCase().includes(q) || t.tx_type.toLowerCase().includes(q));
    }

    return txs;
  }, [txData, tab, search]);

  if (walletLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="mx-auto p-4 space-y-6 @container">
      {/* Stats Row */}
      <Card className="grid grid-cols-1 @sm:grid-cols-2 @5xl:grid-cols-4 gap-5">
        <MinimalStatCard
          label="Total Allocated Budget"
          value={formatCurrency(stats.totalBudget, stats.currency)}
          className="b"
        />
        <MinimalStatCard
          label="Locked Escrow Funds"
          value={formatCurrency(stats.locked, stats.currency)}
          className=""
        />
        <MinimalStatCard
          label="Released Funds"
          value={formatCurrency(stats.released, stats.currency)}
          className=""
        />
        <MinimalStatCard
          label="Remaining Balance"
          value={formatCurrency(stats.remaining, stats.currency)}
          className=""
        />
      </Card>

      <div className="flex flex-col @4xl:flex-row items-start gap-6">
        {/* Main Table Module */}
        <ModuleLayout className="w-full flex-1 min-w-0">
          <ModuleLayoutHeader variant="primary">
            <RoundingLine
              className="absolute -top-3 right-0 scale-x-[-1] text-primary/10 pointer-events-none"
              aria-hidden
            />
            <div className="absolute -right-12 -top-12 w-32 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -left-12 -bottom-12 w-32 h-32 bg-secondary/10 rounded-full blur-2xl pointer-events-none" />
            <ModuleLayoutHeaderContent>
              <ModuleLayoutTitle>Wallet Overview</ModuleLayoutTitle>
              <ModuleLayoutDescription>
                Monitor transactions, escrow locks, and fund releases across all your projects.
              </ModuleLayoutDescription>
            </ModuleLayoutHeaderContent>
            <ModuleLayoutHeaderActions>
              <Button variant="primary" size="sm" className="gap-2">
                <CreditCard className="w-4 h-4" />
                Fund Wallet
              </Button>
            </ModuleLayoutHeaderActions>
          </ModuleLayoutHeader>

          <Tabs value={tab} onValueChange={(v) => setTab(v as TabKey)} className="px-4 md:px-6">
            <div className="border rounded-md">
              <ModuleLayoutToolbar className="flex-wrap gap-2">
                <TabsList variant="primary" className="flex-wrap">
                  <TabsTrigger value="all" className="gap-1.5 font-poppins">
                    All
                  </TabsTrigger>
                  <TabsTrigger value="deposits" className="gap-1.5 font-poppins">
                    Deposits
                  </TabsTrigger>
                  <TabsTrigger value="releases" className="gap-1.5 font-poppins">
                    Releases
                  </TabsTrigger>
                  <TabsTrigger value="transfers" className="gap-1.5 font-poppins">
                    Transfers
                  </TabsTrigger>
                </TabsList>

                <ModuleLayoutToolbarCenter>
                  <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                    <Input
                      placeholder="Search transactions..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="pl-9 h-9"
                    />
                  </div>
                </ModuleLayoutToolbarCenter>

                <ModuleLayoutToolbarRight>
                  <Button variant="outline" className="gap-2">
                    <ListFilter className="w-4 h-4" />
                    Filter
                  </Button>
                </ModuleLayoutToolbarRight>
              </ModuleLayoutToolbar>

              {/* Transactions list */}
              <TabsContent value={tab} className="">
                {txLoading ? (
                  <div className="flex items-center justify-center py-20">
                    <Loader2 className="w-6 h-6 animate-spin text-primary" />
                  </div>
                ) : filteredTransactions.length === 0 ? (
                  <EmptyState
                    svgIcon={NoMoneySvg}
                    svgClassName="w-32"
                    title="No transactions yet"
                    description="Fund your wallet or start a project milestone to see activity here."
                    className="py-20"
                  />
                ) : (
                  <div className="flex flex-col">
                    {filteredTransactions.map((tx) => (
                      <TransactionRow key={tx.id} tx={tx} currency={stats.currency} />
                    ))}
                  </div>
                )}
              </TabsContent>
            </div>
          </Tabs>
        </ModuleLayout>

        {/* Right Panel — Wallet Card */}
        <aside className="w-full @4xl:w-72 shrink-0 flex flex-col gap-4 sticky top-0 self-start">
          <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary-50 to-background p-5 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Wallet className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Available Balance
                </p>
                <p className="text-xl font-bold text-foreground font-geist">
                  {formatFull(wallet?.available_balance ?? 0, stats.currency)}
                </p>
              </div>
            </div>

            <div className="h-px bg-border/60" />

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Locked</span>
                <span className="font-medium font-geist text-foreground">
                  {formatFull(wallet?.locked_balance ?? 0, stats.currency)}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Total</span>
                <span className="font-medium font-geist text-foreground">
                  {formatFull(
                    (wallet?.available_balance ?? 0) + (wallet?.locked_balance ?? 0),
                    stats.currency
                  )}
                </span>
              </div>
            </div>

            <Button className="w-full gap-2" size="sm">
              <CreditCard className="w-4 h-4" />
              Add Funds
            </Button>
          </div>

          {/* Quick Project Budget Overview */}
          {projectsData && projectsData.items && projectsData.items.length > 0 && (
            <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary-50 to-background p-5 space-y-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Project Budgets
                </p>
              </div>
              <div className="space-y-2.5">
                {projectsData.items.slice(0, 4).map((project) => (
                  <div key={project.id} className="flex items-center justify-between">
                    <span className="text-sm text-foreground truncate max-w-36">
                      {project.title}
                    </span>
                    <span className="text-xs font-medium font-geist text-muted-foreground">
                      {formatFull(project.total_budget, project.currency)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
