import { Link } from "@tanstack/react-router"
import { ArrowRight } from "lucide-react"
import * as React from "react"
import { useTranslation } from "react-i18next"
import { AuthHeader } from "./AuthHeader"
import { OTPInput } from "./OTPInput"
import { SubmitButton } from "./SubmitButton"
import { SuccessView } from "./SuccessView"

interface VerifyFormProps {
  email?: string
}

export function VerifyForm({ email }: VerifyFormProps) {
  const { t } = useTranslation(["common"])

  const [otp, setOtp] = React.useState(["", "", "", "", "", ""])
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [isSuccess, setIsSuccess] = React.useState(false)

  const isOtpComplete = otp.every((digit) => digit !== "")

  const handleOtpChange = (index: number, value: string) => {
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isOtpComplete) return

    setIsSubmitting(true)

    try {
      // Mock API call
      console.log("Verifying code:", otp.join(""), "for email:", email)
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setIsSuccess(true)
    } catch (error) {
      console.error("Verification failed:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return <SuccessView />
  }

  return (
    <div className="space-y-6">
      <AuthHeader
        title={t("common:auth.verifyEmail")}
        description={t("common:auth.enter6DigitCode", { email: email || "your email" })}
      />

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="animate-in slide-in-from-right-4 duration-300">
          <OTPInput
            value={otp}
            onChange={handleOtpChange}
            onKeyDown={() => {}}
            disabled={isSubmitting}
          />
        </div>

        <div className="space-y-4">
          <SubmitButton
            loading={isSubmitting}
            disabled={!isOtpComplete}
          >
            {t("common:auth.verifyComplete")}
            <ArrowRight className="ml-2 w-4 h-4" />
          </SubmitButton>

          <p className="text-center text-sm text-muted-foreground">
            {t("common:auth.didntReceiveCode") || "Didn't receive a code?"}{" "}
            <button
              type="button"
              className="font-semibold text-primary hover:underline transition-colors"
              onClick={() => console.log("Resending code to:", email)}
            >
              {t("common:auth.resendCode")}
            </button>
          </p>
        </div>
      </form>

      <div className="text-center">
        <Link
          to="/login"
          className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
        >
          {t("common:auth.backToLogin")}
        </Link>
      </div>
    </div>
  )
}
