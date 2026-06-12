import * as React from "react"

import { useForm } from "@tanstack/react-form"
import { Link, useNavigate } from "@tanstack/react-router"
import { ArrowRight, KeyRound, Mail } from "lucide-react"
import { toast } from "sonner"
import { z } from "zod"

import {
  useLoginWithPassword,
  useSendMagicLink,
} from "@/shared/hooks/use-auth"
import { getApiError } from "@/shared/lib/api-error"

import { AuthHeader } from "../shared/AuthHeader"
import { FormField } from "../shared/FormField"
import { SubmitButton } from "../shared/SubmitButton"

const magicSchema = z.object({
  email: z.email({ message: "Enter a valid email address" }),
})

const passwordSchema = z.object({
  email: z.email({ message: "Enter a valid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
})

type Mode = "magic" | "password"

interface ModeToggleProps {
  readonly mode: Mode
  readonly onChange: (m: Mode) => void
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

function MagicLinkForm() {
  const navigate = useNavigate()
  const sendMagicLink = useSendMagicLink()

  const form = useForm({
    defaultValues: { email: "" },
    validators: { onChange: magicSchema },
    onSubmit: async ({ value }) => {
      try {
        await sendMagicLink.mutateAsync({ email: value.email })
        navigate({ to: "/verify", search: { email: value.email } })
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
      <form.Field name="email">
        {(field) => (
          <FormField
            label="Email"
            field={field}
            type="email"
            placeholder="name@email.com"
            autoComplete="email"
            autoFocus
          />
        )}
      </form.Field>

      <form.Subscribe selector={(s) => [s.canSubmit, s.isSubmitting] as const}>
        {([canSubmit, isSubmitting]) => (
          <SubmitButton
            loading={isSubmitting || sendMagicLink.isPending}
            disabled={!canSubmit}
            loadingText="Sending link..."
          >
            <Mail className="mr-2 h-4 w-4" />
            Send magic link
            <ArrowRight className=" h-4 w-4" />
          </SubmitButton>
        )}
      </form.Subscribe>
    </form>
  )
}

function PasswordForm() {
  const login = useLoginWithPassword()

  const form = useForm({
    defaultValues: { email: "", password: "" },
    validators: { onChange: passwordSchema },
    onSubmit: async ({ value }) => {
      try {
        await login.mutateAsync({
          email: value.email,
          password: value.password,
          userType: "client",
        })
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
      <form.Field name="email">
        {(field) => (
          <FormField
            label="Email"
            field={field}
            type="email"
            placeholder="name@email.com"
            autoComplete="email"
            autoFocus
          />
        )}
      </form.Field>

      <form.Field name="password">
        {(field) => (
          <FormField
            label="Password"
            field={field}
            type="password"
            placeholder="........"
            autoComplete="current-password"
          />
        )}
      </form.Field>

      <form.Subscribe selector={(s) => [s.canSubmit, s.isSubmitting] as const}>
        {([canSubmit, isSubmitting]) => (
          <SubmitButton
            loading={isSubmitting || login.isPending}
            disabled={!canSubmit}
            loadingText="Signing in..."
          >
            Sign in
            <ArrowRight className="h-4 w-4" />
          </SubmitButton>
        )}
      </form.Subscribe>
    </form>
  )
}

export function ClientLoginForm() {
  const [mode, setMode] = React.useState<Mode>("magic")

  return (
    <div className="space-y-6">
      <AuthHeader
        title="Sign in to your client account"
        description="Welcome back. Enter your email to receive a magic link, or sign in with your password."
      />

      <ModeToggle mode={mode} onChange={setMode} />

      {mode === "magic" ? <MagicLinkForm /> : <PasswordForm />}

      <p className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link
          to="/register"
          className="font-semibold text-primary hover:underline transition-colors"
        >
          Create a client account
        </Link>
      </p>

      <p className="text-center text-sm text-muted-foreground">
        Offering services?{" "}
        <Link
          to="/vendor/login"
          className="font-semibold text-primary hover:underline transition-colors"
        >
          Vendor sign in
        </Link>
      </p>
    </div>
  )
}
