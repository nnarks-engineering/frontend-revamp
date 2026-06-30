import { useForm } from "@tanstack/react-form"
import { Link, useNavigate, useSearch } from "@tanstack/react-router"
import { ArrowRight, KeyRound, Mail } from "lucide-react"
import * as React from "react"
import { toast } from "sonner"
import { z } from "zod"

import {
  useRequestPasswordSignup,
  useSendMagicLink,
} from "@/shared/hooks/auth/use-auth"
import { getApiError } from "@/shared/lib/api-error"

import { AuthHeader } from "../shared/AuthHeader"
import { FormField } from "../shared/FormField"
import { SubmitButton } from "../shared/SubmitButton"



// ─── Schemas ────────────────────────────────────────────────────────────────

const magicSchema = z.object({
  email: z.email({ message: "Enter a valid email address" }),
})

const passwordSchema = z
  .object({
    email: z.email({ message: "Enter a valid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

// ─── Mode toggle ─────────────────────────────────────────────────────────────

type Mode = "magic" | "password"

interface ModeToggleProps {
  mode: Mode
  onChange: (m: Mode) => void
}

function ModeToggle({ mode, onChange }: ModeToggleProps) {
  return (
    <div className="flex rounded-lg border border-border overflow-hidden text-sm">
      <button
        type="button"
        onClick={() => onChange("magic")}
        className={`flex-1 flex items-center justify-center gap-1.5 py-2 transition-colors ${
          mode === "magic"
            ? "bg-primary text-primary-foreground font-medium"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        <Mail className="h-3.5 w-3.5" />
        Magic link
      </button>
      <button
        type="button"
        onClick={() => onChange("password")}
        className={`flex-1 flex items-center justify-center gap-1.5 py-2 transition-colors ${
          mode === "password"
            ? "bg-primary text-primary-foreground font-medium"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        <KeyRound className="h-3.5 w-3.5" />
        Password
      </button>
    </div>
  )
}

// ─── Magic-link sub-form ─────────────────────────────────────────────────────

function MagicLinkForm() {
  const navigate = useNavigate()
  const sendMagicLink = useSendMagicLink()

  const { returnTo } = useSearch({ strict: false }) as { returnTo?: string }

  const form = useForm({
    defaultValues: { email: "" },
    validators: { onChange: magicSchema },
    onSubmit: async ({ value }) => {
      try {
        await sendMagicLink.mutateAsync({ email: value.email, return_to: returnTo })
        navigate({ to: "/vendor/verify", search: { email: value.email, returnTo } })
      } catch (error) {
        toast.error(getApiError(error))
      }
    },
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
      className="space-y-5 animate-in slide-in-from-right-4 duration-300"
    >
      <form.Field
        name="email">
        {(field) => (
          <FormField
            label="Work email"
            field={field}
            type="email"
            placeholder="you@company.com"
            autoComplete="email"
            autoFocus
          />
        )}
      </form.Field>

      <form.Subscribe
        selector={(s) => [s.canSubmit, s.isSubmitting] as const}>
        {([canSubmit, isSubmitting]) => (
          <SubmitButton
            loading={isSubmitting || sendMagicLink.isPending}
            disabled={!canSubmit}
            loadingText="Sending link…"
          >
            <Mail className="mr-2 h-4 w-4" />
            Send magic link
            <ArrowRight className="h-4 w-4" />
          </SubmitButton>
        )}
      </form.Subscribe>
    </form>
  )
}

// ─── Password sub-form ───────────────────────────────────────────────────────

function PasswordForm() {
  const requestSignup = useRequestPasswordSignup()
  const navigate = useNavigate()

  const { returnTo } = useSearch({ strict: false }) as { returnTo?: string }

  const form = useForm({
    defaultValues: { email: "", password: "", confirmPassword: "" },
    validators: { onChange: passwordSchema },
    onSubmit: async ({ value }) => {
      try {
        await requestSignup.mutateAsync({ email: value.email, password: value.password, return_to: returnTo })
        navigate({ to: "/vendor/verify", search: { email: value.email, flow: "signup", returnTo } })
      } catch (error) {
        toast.error(getApiError(error))
      }
    },
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
      className="space-y-5 animate-in slide-in-from-right-4 duration-300"
    >
      <form.Field
        name="email">
        {(field) => (
          <FormField
            label="Work email"
            field={field}
            type="email"
            placeholder="you@company.com"
            autoComplete="email"
            autoFocus
          />
        )}
      </form.Field>

      <form.Field
        name="password">
        {(field) => (
          <FormField
            label="Password"
            field={field}
            type="password"
            placeholder="••••••••"
            autoComplete="new-password"
          />
        )}
      </form.Field>

      <form.Field
        name="confirmPassword">
        {(field) => (
          <FormField
            label="Confirm password"
            field={field}
            type="password"
            placeholder="••••••••"
            autoComplete="new-password"
          />
        )}
      </form.Field>

      <form.Subscribe
        selector={(s) => [s.canSubmit, s.isSubmitting] as const}>
        {([canSubmit, isSubmitting]) => (
          <SubmitButton
            loading={isSubmitting || requestSignup.isPending}
            disabled={!canSubmit}
            loadingText="Creating account…"
          >
            Create account
            <ArrowRight className="h-4 w-4" />
          </SubmitButton>
        )}
      </form.Subscribe>
    </form>
  )
}

// ─── Main component ──────────────────────────────────────────────────────────

export function VendorRegisterForm() {
  const [mode, setMode] = React.useState<Mode>("magic")

  return (
    <div className="space-y-6">
      <AuthHeader
        title="Create your vendor account"
        description="List your services and connect with clients looking for your expertise."
      />

      <ModeToggle mode={mode} onChange={setMode} />

      {mode === "magic" ? <MagicLinkForm /> : <PasswordForm />}

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          to="/vendor/login"
          className="font-semibold text-primary hover:underline transition-colors"
        >
          Sign in
        </Link>
      </p>

      <p className="text-center text-sm text-muted-foreground">
        Looking to hire?{" "}
        <Link
          to="/register"
          className="font-semibold text-primary hover:underline transition-colors"
        >
          Create a client account
        </Link>
      </p>
    </div>
  )
}
