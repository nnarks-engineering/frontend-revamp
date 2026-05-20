import { useForm } from "@tanstack/react-form"
import { Link, useNavigate } from "@tanstack/react-router"
import { ArrowRight, KeyRound, Mail } from "lucide-react"
import * as React from "react"
import { z } from "zod"

import {
  useSendMagicLink,
} from "@/shared/hooks/use-auth"
import { AuthHeader } from "./AuthHeader"
import { FormField } from "./FormField"
import { SubmitButton } from "./SubmitButton"

// ─── Schemas ────────────────────────────────────────────────────────────────

const magicSchema = z.object({
  email: z.string().email({ message: "Enter a valid email address" }),
})

const passwordSchema = z.object({
  email: z.string().email({ message: "Enter a valid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
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

  const form = useForm({
    defaultValues: { email: "" },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    validators: { onChange: magicSchema as any },
    onSubmit: async ({ value }) => {
      await sendMagicLink.mutateAsync(
        { email: value.email },
        {
          onSuccess: () =>
            navigate({
              to: "/vendor/verify",
              search: { email: value.email },
            }),
        },
      )
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
        name="email"
        children={(field) => (
          <FormField
            label="Work email"
            field={field}
            type="email"
            placeholder="you@company.com"
            autoComplete="email"
            autoFocus
          />
        )}
      />

      <form.Subscribe
        selector={(s) => [s.canSubmit, s.isSubmitting] as const}
        children={([canSubmit, isSubmitting]) => (
          <SubmitButton
            loading={isSubmitting || sendMagicLink.isPending}
            disabled={!canSubmit}
            loadingText="Sending link…"
          >
            <Mail className="mr-2 h-4 w-4" />
            Send magic link
            <ArrowRight className="ml-auto h-4 w-4" />
          </SubmitButton>
        )}
      />
    </form>
  )
}

// ─── Password sub-form ───────────────────────────────────────────────────────

function PasswordForm() {
  // const login = useVendorLoginWithPassword()

  const form = useForm({
    defaultValues: { email: "", password: "" },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    validators: { onChange: passwordSchema as any },
    onSubmit: async ({ value }) => {
      // await login.mutateAsync({
      //   email: value.email,
      //   password: value.password,
      // })
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
        name="email"
        children={(field) => (
          <FormField
            label="Work email"
            field={field}
            type="email"
            placeholder="you@company.com"
            autoComplete="email"
            autoFocus
          />
        )}
      />

      <form.Field
        name="password"
        children={(field) => (
          <FormField
            label="Password"
            field={field}
            type="password"
            placeholder="••••••••"
            autoComplete="current-password"
          />
        )}
      />

      <form.Subscribe
        selector={(s) => [s.canSubmit, s.isSubmitting] as const}
        children={([canSubmit, isSubmitting]) => (
          <SubmitButton
            loading={isSubmitting || login.isPending}
            disabled={!canSubmit}
            loadingText="Signing in…"
          >
            Sign in
            <ArrowRight className="ml-auto h-4 w-4" />
          </SubmitButton>
        )}
      />
    </form>
  )
}

// ─── Main component ──────────────────────────────────────────────────────────

export function VendorLoginForm() {
  const [mode, setMode] = React.useState<Mode>("magic")

  return (
    <div className="space-y-6">
      <AuthHeader
        title="Sign in to your vendor account"
        description="Welcome back. Enter your email to receive a magic link, or sign in with your password."
      />

      <ModeToggle mode={mode} onChange={setMode} />

      {mode === "magic" ? <MagicLinkForm /> : <PasswordForm />}

      <p className="text-center text-sm text-muted-foreground">
        Don't have an account?{" "}
        <Link
          to="/vendor/register"
          className="font-semibold text-primary hover:underline transition-colors"
        >
          Create a vendor account
        </Link>
      </p>

      <p className="text-center text-sm text-muted-foreground">
        Looking to hire?{" "}
        <Link
          to="/login"
          className="font-semibold text-primary hover:underline transition-colors"
        >
          Client sign in
        </Link>
      </p>
    </div>
  )
}
