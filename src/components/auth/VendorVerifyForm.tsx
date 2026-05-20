import { Link } from "@tanstack/react-router"
import { ArrowRight, RefreshCw } from "lucide-react"
import * as React from "react"
import { toast } from "sonner"

import { useSendMagicLink, useVerifyMagicLink } from "@/shared/hooks/use-auth"
import { AuthHeader } from "./AuthHeader"
import { OTPInput } from "./OTPInput"
import { SubmitButton } from "./SubmitButton"

interface VendorVerifyFormProps {
  /** Destination email — shown in the description */
  email?: string
  /** Present when the user clicks the magic link in the email */
  token?: string
}

export function VendorVerifyForm({ email, token }: VendorVerifyFormProps) {
  const verifyMagicLink = useVerifyMagicLink()
  const sendMagicLink = useSendMagicLink()

  const [otp, setOtp] = React.useState(["", "", "", "", "", ""])
  const isOtpComplete = otp.every((d) => d !== "")

  // ── Auto-verify when a magic-link token arrives in the URL ──────────
  React.useEffect(() => {
    if (token && !verifyMagicLink.isPending && !verifyMagicLink.isSuccess) {
      verifyMagicLink.mutate({ token })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  // ── Resend ──────────────────────────────────────────────────────────
  function handleResend() {
    if (!email) return
    sendMagicLink.mutate(
      { email },
      {
        onSuccess: () =>
          toast.success("A new link and code have been sent to your inbox."),
        onError: () =>
          toast.error("Couldn't resend. Please try again in a moment."),
      },
    )
  }

  // ── OTP submit ──────────────────────────────────────────────────────
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!isOtpComplete) return
    verifyMagicLink.mutate(
      { code: otp.join("") },
      {
        onError: () => {
          setOtp(["", "", "", "", "", ""])
        },
      },
    )
  }

  // ── Auto-verify loader / error state ───────────────────────────────
  if (token) {
    return (
      <div className="flex flex-col items-center gap-6 text-center py-16 animate-in fade-in-0 duration-500">
        {verifyMagicLink.isError ? (
          <>
            <p className="text-sm text-destructive font-medium">
              This link has expired or is invalid.
            </p>
            <Link
              to="/vendor/register"
              className="text-sm font-semibold text-primary hover:underline"
            >
              Back to sign up
            </Link>
          </>
        ) : (
          <p className="text-sm text-muted-foreground animate-pulse">
            Verifying your magic link…
          </p>
        )}
      </div>
    )
  }

  // ── OTP form ────────────────────────────────────────────────────────
  return (
    <div className="space-y-6">
      <AuthHeader
        title="Check your inbox"
        description={
          email ? (
            <>
              We sent a 6-character code and a magic link to{" "}
              <span className="font-medium text-foreground">{email}</span>.
              Enter the code below or click the link in the email.
            </>
          ) : (
            "Enter the 6-character code we sent to your email, or click the magic link."
          )
        }
      />

      <form
        onSubmit={handleSubmit}
        className="space-y-8 animate-in slide-in-from-right-4 duration-300"
      >
        <OTPInput
          value={otp}
          onChange={(index, value) => {
            const next = [...otp]
            next[index] = value
            setOtp(next)
          }}
          onPasteAll={(chars) => setOtp(chars)}
          onKeyDown={() => {}}
          disabled={verifyMagicLink.isPending}
        />

        <div className="space-y-3">
          <SubmitButton
            loading={verifyMagicLink.isPending}
            disabled={!isOtpComplete}
            loadingText="Verifying…"
          >
            Verify & continue
            <ArrowRight className="ml-2 h-4 w-4" />
          </SubmitButton>

          <button
            type="button"
            disabled={sendMagicLink.isPending || !email}
            onClick={handleResend}
            className="flex items-center justify-center gap-1.5 w-full text-sm text-muted-foreground hover:text-primary disabled:opacity-50 transition-colors"
          >
            <RefreshCw
              className={`h-3.5 w-3.5 ${sendMagicLink.isPending ? "animate-spin" : ""}`}
            />
            {sendMagicLink.isPending ? "Sending…" : "Resend code"}
          </button>
        </div>
      </form>

      <div className="text-center">
        <Link
          to="/vendor/register"
          className="text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          ← Use a different email
        </Link>
      </div>
    </div>
  )
}
