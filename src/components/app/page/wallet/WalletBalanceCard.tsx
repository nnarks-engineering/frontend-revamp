"use client";

import { useState } from "react";
import NarksIcon from "@/assets/nnarks-logo-sm.svg?react";

interface Wallet {
  available_balance: number;
  locked_balance: number;
}

interface PayoutAccountCardProps {
  wallet?: Wallet | null;
  currency?: string;
  formatFull?: (amount: number, currency: string) => string;
  bankName?: string;
  accountNumber?: string;
  accountName?: string;
  isMomo?: boolean;
  onEdit?: () => void;
}

const defaultFormat = (amount: number, currency: string) =>
  new Intl.NumberFormat("en-GH", { style: "currency", currency, minimumFractionDigits: 2 }).format(amount);

export function PayoutAccountCard({
  wallet = { available_balance: 4200.0, locked_balance: 800.0 },
  currency = "GHS",
  formatFull = defaultFormat,
  bankName = "GCB Bank",
  accountNumber = "0241234567",
  accountName = "Kwame Asante",
  isMomo = false,
  onEdit,
}: PayoutAccountCardProps) {
  const [flipped, setFlipped] = useState(false);

  const available = wallet?.available_balance ?? 0;
  const locked = wallet?.locked_balance ?? 0;

  const maskedNumber =
    accountNumber.length > 7
      ? `${accountNumber.slice(0, 3)} •••• ${accountNumber.slice(-4)}`
      : accountNumber;

  return (
    <div
      className="relative w-full max-w-sm h-[210px] cursor-pointer"
      style={{ perspective: 1000 }}
      onClick={() => setFlipped((f) => !f)}
    >
      <div
        className="relative w-full h-full transition-transform duration-500"
        style={{ transformStyle: "preserve-3d", transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
      >

        {/* ── FRONT: Balance ── */}
        <div
          className="absolute inset-0 rounded-md bg-primary-900 dark:bg-primary-950 overflow-hidden select-none"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/[0.06]" />
          <div className="absolute -bottom-14 -left-5 w-44 h-44 rounded-full bg-white/[0.04]" />

          {/* Logo */}
          <span className="absolute top-5 left-[22px]">
            <NarksIcon className="size-6" />
          </span>

          {/* Flip hint */}
          <span className="absolute top-[22px] right-5 text-[9px] text-white/35 tracking-[2px] uppercase">
            tap to flip
          </span>

          {/* Chip */}
          <div className="absolute top-[68px] left-[22px] w-[42px] h-8 rounded-sm bg-tertiary-700/50 border border-tertiary/20! p-[5px] box-border">
            <div className="w-full h-full grid grid-cols-2 grid-rows-2 gap-0.5">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-tertiary-700/90 rounded-[2px]" />
              ))}
            </div>
          </div>

          {/* Available balance */}
          <div className="absolute top-[112px] left-[22px] right-[22px]">
            <p className="m-0 mb-1 text-[9px] text-white/45 tracking-[2px] uppercase">Available Balance</p>
            <p className="m-0 text-[22px] font-semibold text-white tracking-tight font-mono">
              {formatFull(available, currency)}
            </p>
          </div>

          {/* Footer */}
          <div className="absolute bottom-[18px] left-[22px] right-[22px] flex justify-between items-end">
            <div>
              <p className="m-0 mb-0.5 text-[9px] text-white/45 tracking-[2px] uppercase">Locked</p>
              <p className="m-0 text-[13px] font-medium text-white/80">{formatFull(locked, currency)}</p>
            </div>
            <div className="text-right">
              <p className="m-0 mb-0.5 text-[9px] text-white/45 tracking-[2px] uppercase">Total</p>
              <p className="m-0 text-[13px] font-medium text-white/80">{formatFull(available + locked, currency)}</p>
            </div>
          </div>
        </div>

        {/* ── BACK: Account details ── */}
        <div
          className="absolute inset-0 rounded-md bg-primary-900 dark:bg-primary-950 overflow-hidden select-none"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/[0.06]" />
          <div className="absolute -bottom-14 -left-5 w-44 h-44 rounded-full bg-white/[0.04]" />

          {/* Logo */}
          <span className="absolute top-5 left-[22px]">
            <NarksIcon className="size-6" />
          </span>

          {/* Network badge */}
          <div className="absolute top-[18px] right-5 flex items-center -gap-1.5">
            {isMomo ? (
              <>
                <span className="w-2 h-2 rounded-full bg-tertiary-700" />
                <span className="text-[10px] text-white/60 tracking-[2px] uppercase">MoMo</span>
              </>
            ) : (
              <>
                <span className="w-5 h-5 rounded-full bg-primary-700 opacity-90" />
                <span className="w-5 h-5 rounded-full bg-primary-600 opacity-75 -ml-1.5" />
              </>
            )}
          </div>

          {/* Chip */}
          <div className="absolute top-[68px] left-[22px] w-[42px] h-8 rounded-sm bg-tertiary-700/50 border border-tertiary/20! p-[5px] box-border">
            <div className="w-full h-full grid grid-cols-2 grid-rows-2 gap-0.5">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-tertiary-700/90 rounded-[2px]" />
              ))}
            </div>
          </div>

          {/* Account number */}
          <div className="absolute top-[112px] left-[22px] right-[22px]">
            <p className="m-0 mb-1 text-[9px] text-white/45 tracking-[2px] uppercase">
              {isMomo ? "Phone Number" : "Account Number"}
            </p>
            <p className="m-0 text-[19px] font-medium text-white tracking-[4px] font-mono">
              {maskedNumber}
            </p>
          </div>

          {/* Footer */}
          <div className={`absolute left-[22px] right-[22px] flex justify-between items-end ${onEdit ? "bottom-9" : "bottom-[18px]"}`}>
            <div>
              <p className="m-0 mb-0.5 text-[9px] text-white/45 tracking-[2px] uppercase">Account Name</p>
              <p className="m-0 text-[13px] font-medium text-white tracking-wide">{accountName}</p>
            </div>
            <div className="text-right">
              <p className="m-0 mb-0.5 text-[9px] text-white/45 tracking-[2px] uppercase">
                {isMomo ? "Network" : "Bank"}
              </p>
              <p className="m-0 text-[12px] text-white/85 max-w-[140px] truncate">{bankName}</p>
            </div>
          </div>

          {/* Change account */}
          {onEdit && (
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onEdit(); }}
              className="absolute bottom-0 left-0 right-0 bg-transparent border-0 border-t border-white/[0.12] py-[7px] px-4 text-[11px] text-white/55 tracking-[2px] uppercase cursor-pointer hover:text-white/80 transition-colors"
            >
              Change account →
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
