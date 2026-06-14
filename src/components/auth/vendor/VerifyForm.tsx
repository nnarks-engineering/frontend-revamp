import { Link } from "@tanstack/react-router"
import { ArrowRight, RefreshCw } from "lucide-react"
import * as React from "react"
import { toast } from "sonner"

import {
    useSendMagicLink,
    useVerifyMagicLink,
    useVerifyPasswordSignup,
} from "@/shared/hooks/auth/use-auth"
import { getApiError } from "@/shared/lib/api-error"

import { AuthHeader } from "../shared/AuthHeader"
import { OTPInput } from "../shared/OTPInput"
import { SubmitButton } from "../shared/SubmitButton"



interface VendorVerifyFormProps {
  /** Destination email — shown in the description */
  readonly email?: string
  /** Present when the user clicks the magic link in the email */
  readonly token?: string
  /**
   * "signup"  — user registered with password; verify the OTP with password endpoint.
   * "magic"   — magic-link OTP (default when omitted).
   */
  readonly flow?: "magic" | "signup"
}

export function VendorVerifyForm({ email, token, flow }: VendorVerifyFormProps) {
  const verifyMagicLink = useVerifyMagicLink()
  const verifyPasswordSignup = useVerifyPasswordSignup()
  const sendMagicLink = useSendMagicLink()

  const isSignupFlow = flow === "signup"
  const activeVerify = isSignupFlow ? verifyPasswordSignup : verifyMagicLink

  const [otp, setOtp] = React.useState(["", "", "", "", "", ""])
  const isOtpComplete = otp.every((d) => d !== "")

const hasAutoVerified = React.useRef(false);

React.useEffect(() => {
  if (
    !isSignupFlow &&
    token &&
    !verifyMagicLink.isPending &&
    !verifyMagicLink.isSuccess &&
    !hasAutoVerified.current
  ) {
    hasAutoVerified.current = true;
    verifyMagicLink.mutate({ token });
  }
}, [isSignupFlow, token, verifyMagicLink]);

  // ── Resend ────────────────────────────────────────────────────────────
  function handleResend() {
    if (!email) return
    sendMagicLink.mutate(
      { email },
      {
        onSuccess: () =>
          toast.success("A new link and code have been sent to your inbox."),
        onError: (error) =>
          toast.error(getApiError(error, "Couldn't resend. Please try again in a moment.")),
      },
    )
  }

  // ── OTP submit ──────────────────────────────────────────────────────
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!isOtpComplete) return
    activeVerify.mutate(
      { code: otp.join("") },
      {
        onError: (error) => {
          toast.error(getApiError(error, "Invalid or expired code. Please check and try again."))
          setOtp(["", "", "", "", "", ""])
        },
      },
    )
  }

  // ── Auto-verify loader / error state (magic-link token click) ───────
  if (!isSignupFlow && token) {
    return (
      <div className="flex flex-col items-center gap-6 text-center py-16 animate-in fade-in-0 duration-500">
        {verifyMagicLink.isError ? (
          <>
            <p className="text-sm text-destructive font-medium">
              {getApiError(verifyMagicLink.error, "This link has expired or is invalid.")}
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
          isSignupFlow ? (
            email ? (
              <>
                We sent a 6-character verification code to{" "}
                <span className="font-medium text-foreground">{email}</span>.
                Enter it below to activate your account.
              </>
            ) : (
              "Enter the 6-character verification code we sent to your email."
            )
          ) : email ? (
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
          disabled={activeVerify.isPending}
        />

        <div className="space-y-3">
          <SubmitButton
            loading={activeVerify.isPending}
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
