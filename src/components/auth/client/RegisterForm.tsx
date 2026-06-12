import * as React from "react"

import { useForm } from "@tanstack/react-form"
import { Link, useNavigate } from "@tanstack/react-router"
import { ArrowRight, KeyRound, Mail } from "lucide-react"
import { toast } from "sonner"
import { z } from "zod"

import {
  useRequestPasswordSignup,
  useSendMagicLink,
} from "@/shared/hooks/use-auth"
import { getApiError } from "@/shared/lib/api-error"

import { AuthHeader } from "../shared/AuthHeader"
import { FormField } from "../shared/FormField"
import { SubmitButton } from "../shared/SubmitButton"

const magicSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.email({ message: "Enter a valid email address" }),
})

const passwordSchema = z
  .object({
    name: z.string().min(2, { message: "Name must be at least 2 characters" }),
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
    defaultValues: { name: "", email: "" },
    validators: { onChange: magicSchema },
    onSubmit: async ({ value }) => {
      try {
        await sendMagicLink.mutateAsync({ email: value.email })
        navigate({
          to: "/verify",
          search: { email: value.email, flow: "magic", name: value.name },
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
      <form.Field name="name">
        {(field) => (
          <FormField
            label="Your name"
            field={field}
            type="text"
            placeholder="Jane Doe"
            autoComplete="name"
            autoFocus
          />
        )}
      </form.Field>

      <form.Field name="email">
        {(field) => (
          <FormField
            label="Email"
            field={field}
            type="email"
            placeholder="name@email.com"
            autoComplete="email"
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
            <ArrowRight className="h-4 w-4" />
          </SubmitButton>
        )}
      </form.Subscribe>
    </form>
  )
}

function PasswordForm() {
  const requestSignup = useRequestPasswordSignup()
  const navigate = useNavigate()

  const form = useForm({
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
    validators: { onChange: passwordSchema },
    onSubmit: async ({ value }) => {
      try {
        await requestSignup.mutateAsync({ email: value.email, password: value.password })
        navigate({
          to: "/verify",
          search: { email: value.email, flow: "signup", name: value.name },
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
      <form.Field name="name">
        {(field) => (
          <FormField
            label="Your name"
            field={field}
            type="text"
            placeholder="Jane Doe"
            autoComplete="name"
            autoFocus
          />
        )}
      </form.Field>

      <form.Field name="email">
        {(field) => (
          <FormField
            label="Email"
            field={field}
            type="email"
            placeholder="name@email.com"
            autoComplete="email"
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
            autoComplete="new-password"
          />
        )}
      </form.Field>

      <form.Field name="confirmPassword">
        {(field) => (
          <FormField
            label="Confirm password"
            field={field}
            type="password"
            placeholder="........"
            autoComplete="new-password"
          />
        )}
      </form.Field>

      <form.Subscribe selector={(s) => [s.canSubmit, s.isSubmitting] as const}>
        {([canSubmit, isSubmitting]) => (
          <SubmitButton
            loading={isSubmitting || requestSignup.isPending}
            disabled={!canSubmit}
            loadingText="Creating account..."
          >
            Create account
            <ArrowRight className="h-4 w-4" />
          </SubmitButton>
        )}
      </form.Subscribe>
    </form>
  )
}

export function ClientRegisterForm() {
  const [mode, setMode] = React.useState<Mode>("magic")

  return (
    <div className="space-y-6">
      <AuthHeader
        title="Create your client account"
        description="Get started quickly with just your name and email. No organization setup required."
      />

      <ModeToggle mode={mode} onChange={setMode} />

      {mode === "magic" ? <MagicLinkForm /> : <PasswordForm />}

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-semibold text-primary hover:underline transition-colors"
        >
          Sign in
        </Link>
      </p>

      <p className="text-center text-sm text-muted-foreground">
        Offering services?{" "}
        <Link
          to="/vendor/register"
          className="font-semibold text-primary hover:underline transition-colors"
        >
          Create a vendor account
        </Link>
      </p>
    </div>
  )
}
