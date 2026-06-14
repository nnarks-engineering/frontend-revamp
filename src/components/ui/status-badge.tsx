"use client"

import type { LucideIcon } from "lucide-react"
import { AlertTriangle, Ban, Calendar, Check, Clock, Crown, Minus, Play, ShieldCheck, User, X } from "lucide-react"

import { cn } from "@/shared/lib/utils"

type StatusVariant =
    | 'active'
    | 'inactive'
    | 'approved'
    | 'pending'
    | 'review'
    | 'rejected'
    | 'cancelled'
    | 'warning'
    | 'success'
    | 'current'
    | 'past'
    | 'draft'
    | 'closed'
    | 'view'
    | 'info'
    | 'error'
    | 'default'
    | 'completed'
    | 'ongoing'
    | 'ended'
    | 'published'
    | 'upcoming'
    | 'owner'
    | 'admin'
    | 'member'
    | 'pre_project'
    | 'paused'
    | 'in_progress'
    | 'under_review'
    | 'failed'
    | 'skipped'
    | 'partner'
    | 'supervisor'
    | 'accepted'
    | 'expired'

interface StatusConfig {
    icon: LucideIcon
    iconBgColor: string
    textColor: string
    borderColor: string
    bgColor: string
    defaultText: string
}

const statusConfigs: Record<StatusVariant, StatusConfig> = {
  active: {
    icon: Check,
    iconBgColor: "bg-green-600",
    textColor: "text-green-900",
    borderColor: "border-green-600/50!",
    bgColor: "bg-green-50",
    defaultText: "Active",
  },
  inactive: {
    icon: Minus,
    iconBgColor: "bg-red-600",
    textColor: "text-red-900",
    borderColor: "border-red-600/50!",
    bgColor: "bg-red-50",
    defaultText: "Archived",
  },
  approved: {
    icon: Check,
    iconBgColor: "bg-green-600",
    textColor: "text-green-900",
    borderColor: "border-green-600/50!",
    bgColor: "bg-green-50",
    defaultText: "Approved",
  },
  completed: {
    icon: Check,
    iconBgColor: "bg-green-700",
    textColor: "text-green-900",
    borderColor: "border-green-600/50!",
    bgColor: "bg-green-50",
    defaultText: "Completed",
  },
  pending: {
    icon: Clock,
    iconBgColor: "bg-amber-500",
    textColor: "text-amber-900",
    borderColor: "border-amber-500/50!",
    bgColor: "bg-amber-50",
    defaultText: "Pending",
  },
  review: {
    icon: Clock,
    iconBgColor: "bg-amber-400",
    textColor: "text-amber-900",
    borderColor: "border-amber-400/50!",
    bgColor: "bg-amber-50",
    defaultText: "In Review",
  },
  rejected: {
    icon: X,
    iconBgColor: "bg-red-600",
    textColor: "text-red-900",
    borderColor: "border-red-600/50!",
    bgColor: "bg-red-50",
    defaultText: "Rejected",
  },
  cancelled: {
    icon: Ban,
    iconBgColor: "bg-gray-500",
    textColor: "text-gray-800",
    borderColor: "border-gray-400/50!",
    bgColor: "bg-gray-100",
    defaultText: "Cancelled",
  },
  warning: {
    icon: AlertTriangle,
    iconBgColor: "bg-orange-500",
    textColor: "text-orange-900",
    borderColor: "border-orange-500/50!",
    bgColor: "bg-orange-50",
    defaultText: "Warning",
  },
  success: {
    icon: Check,
    iconBgColor: "bg-emerald-600",
    textColor: "text-emerald-900",
    borderColor: "border-emerald-600/50!",
    bgColor: "bg-emerald-50",
    defaultText: "Success",
  },
  current: {
    icon: Check,
    iconBgColor: "bg-emerald-600",
    textColor: "text-emerald-900",
    borderColor: "border-emerald-600/50!",
    bgColor: "bg-emerald-50",
    defaultText: "Current",
  },
  past: {
    icon: Minus,
    iconBgColor: "bg-slate-400",
    textColor: "text-slate-700",
    borderColor: "border-slate-400/50!",
    bgColor: "bg-slate-100",
    defaultText: "Past",
  },
  draft: {
    icon: Clock,
    iconBgColor: "bg-slate-500",
    textColor: "text-slate-900",
    borderColor: "border-slate-500/20!",
    bgColor: "bg-slate-50",
    defaultText: "Draft",
  },
  closed: {
    icon: X,
    iconBgColor: "bg-red-500",
    textColor: "text-red-900",
    borderColor: "border-red-500!/50!",
    bgColor: "bg-red-50",
    defaultText: "Closed",
  },
  info: {
    icon: Clock,
    iconBgColor: "bg-blue-500",
    textColor: "text-blue-900",
    borderColor: "border-blue-500/50!",
    bgColor: "bg-blue-50",
    defaultText: "Info",
  },
  error: {
    icon: X,
    iconBgColor: "bg-red-500",
    textColor: "text-red-900",
    borderColor: "border-red-500/50!",
    bgColor: "bg-red-50",
    defaultText: "Error",
  },
  default: {
    icon: Minus,
    iconBgColor: "bg-gray-400",
    textColor: "text-gray-700",
    borderColor: "border-gray-300/50!",
    bgColor: "bg-gray-100",
    defaultText: "",
  },
  view: {
    icon: Minus,
    iconBgColor: "bg-gray-400",
    textColor: "text-gray-700",
    borderColor: "border-gray-300/50!",
    bgColor: "bg-gray-100",
    defaultText: "View Details",
  },
  ongoing: {
    icon: Play,
    iconBgColor: "bg-green-500",
    textColor: "text-green-900",
    borderColor: "border-green-500/50!",
    bgColor: "bg-green-50",
    defaultText: "Ongoing",
  },
  ended: {
    icon: Check,
    iconBgColor: "bg-slate-400",
    textColor: "text-slate-700",
    borderColor: "border-slate-400/50!",
    bgColor: "bg-slate-100",
    defaultText: "Ended",
  },
  published: {
    icon: Check,
    iconBgColor: "bg-emerald-600",
    textColor: "text-emerald-900",
    borderColor: "border-emerald-600/50!",
    bgColor: "bg-emerald-50",
    defaultText: "Published",
  },
  upcoming: {
    icon: Calendar,
    iconBgColor: "bg-blue-600",
    textColor: "text-blue-900",
    borderColor: "border-blue-600/50!",
    bgColor: "bg-blue-50",
    defaultText: "Upcoming",
  },
  owner: {
    icon: Crown,
    iconBgColor: "bg-violet-600",
    textColor: "text-violet-900",
    borderColor: "border-violet-600/50!",
    bgColor: "bg-violet-50",
    defaultText: "Owner",
  },
  admin: {
    icon: ShieldCheck,
    iconBgColor: "bg-pink-600",
    textColor: "text-pink-900",
    borderColor: "border-pink-600/50!",
    bgColor: "bg-pink-50",
    defaultText: "Admin",
  },
  member: {
    icon: User,
    iconBgColor: "bg-sky-600",
    textColor: "text-sky-900",
    borderColor: "border-sky-600/50!",
    bgColor: "bg-sky-50",
    defaultText: "Member",
  },
  pre_project: {
    icon: Clock,
    iconBgColor: "bg-slate-400",
    textColor: "text-slate-700",
    borderColor: "border-slate-400/50!",
    bgColor: "bg-slate-100",
    defaultText: "Pre-project",
  },
  paused: {
    icon: AlertTriangle,
    iconBgColor: "bg-orange-500",
    textColor: "text-orange-900",
    borderColor: "border-orange-500/50!",
    bgColor: "bg-orange-50",
    defaultText: "Paused",
  },
  in_progress: {
    icon: Play,
    iconBgColor: "bg-blue-500",
    textColor: "text-blue-900",
    borderColor: "border-blue-500/50!",
    bgColor: "bg-blue-50",
    defaultText: "In Progress",
  },
  under_review: {
    icon: Clock,
    iconBgColor: "bg-amber-400",
    textColor: "text-amber-900",
    borderColor: "border-amber-400/50!",
    bgColor: "bg-amber-50",
    defaultText: "Under Review",
  },
  failed: {
    icon: X,
    iconBgColor: "bg-red-600",
    textColor: "text-red-900",
    borderColor: "border-red-600/50!",
    bgColor: "bg-red-50",
    defaultText: "Failed",
  },
  skipped: {
    icon: Minus,
    iconBgColor: "bg-gray-400",
    textColor: "text-gray-700",
    borderColor: "border-gray-300/50!",
    bgColor: "bg-gray-100",
    defaultText: "Skipped",
  },
  partner: {
    icon: User,
    iconBgColor: "bg-indigo-600",
    textColor: "text-indigo-900",
    borderColor: "border-indigo-600/50!",
    bgColor: "bg-indigo-50",
    defaultText: "Partner",
  },
  supervisor: {
    icon: ShieldCheck,
    iconBgColor: "bg-fuchsia-600",
    textColor: "text-fuchsia-900",
    borderColor: "border-fuchsia-600/50!",
    bgColor: "bg-fuchsia-50",
    defaultText: "Supervisor",
  },
  accepted: {
    icon: Check,
    iconBgColor: "bg-green-600",
    textColor: "text-green-900",
    borderColor: "border-green-600/50!",
    bgColor: "bg-green-50",
    defaultText: "Accepted",
  },
  expired: {
    icon: Clock,
    iconBgColor: "bg-gray-400",
    textColor: "text-gray-700",
    borderColor: "border-gray-300/50!",
    bgColor: "bg-gray-100",
    defaultText: "Expired",
  },
}

interface StatusBadgeProps {
    readonly variant: string
    readonly text?: string
    readonly className?: string
    readonly showIcon?: boolean
    readonly size?: 'sm' | 'md' | 'lg'
}

const sizeClasses = {
    sm: {
        container: "px-2 py-0.5 text-xs",
        icon: "size-2",
        iconPadding: "p-0.5"
    },
    md: {
        container: "px-2.5 py-1 text-xs",
        icon: "size-2.5",
        iconPadding: "p-0.5"
    },
    lg: {
        container: "px-3 py-1.5 text-sm",
        icon: "size-3",
        iconPadding: "p-1"
    }
}

export function StatusBadge({
    variant,
    text,
    className,
    showIcon = true,
    size = 'sm'
}: StatusBadgeProps): React.ReactElement {
    const normalizedVariant = (variant || 'default').toLowerCase() as StatusVariant
    const config = statusConfigs[normalizedVariant] || statusConfigs.default
    const Icon = config.icon
    const displayText = text || config.defaultText || variant
    const sizeConfig = sizeClasses[size]

    return (
      <span
  className={cn(
    "inline-flex w-fit gap-1.5 items-center bg-background rounded-sm border border-primary font-medium ",
    config.textColor,
   `${config.borderColor}`,
    sizeConfig.container,
    className
  )}
>
            {showIcon && (
                <span className={cn("rounded-full flex items-center justify-center text-white", config.iconBgColor, sizeConfig.iconPadding)}>
                    <Icon className={cn(sizeConfig.icon, "stroke-[3]")} />
                </span>
            )}
            {displayText}
        </span>
    )
}

// Backward compatibility wrapper for the old API
interface LegacyStatusBadgeProps {
    readonly isActive: boolean
    readonly activeText?: string
    readonly inactiveText?: string
    readonly className?: string
    readonly variant?: 'default' | 'employment'
}

export function LegacyStatusBadge({
    isActive,
    activeText = "Active",
    inactiveText = "Archived",
    className,
    variant = 'default',
}: LegacyStatusBadgeProps): React.ReactElement {
    const getStatusVariant = (): StatusVariant => {
        if (variant === 'employment') {
            return isActive ? 'current' : 'past'
        }
        return isActive ? 'active' : 'inactive'
    }

    const getDisplayText = (): string | undefined => {
        if (variant === 'employment') {
            return undefined
        }
        return isActive ? activeText : inactiveText
    }

    return <StatusBadge variant={getStatusVariant()} text={getDisplayText()} className={className} />
}
