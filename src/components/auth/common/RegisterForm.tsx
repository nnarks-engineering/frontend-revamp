import { useForm } from "@tanstack/react-form"
import { Link, useNavigate } from "@tanstack/react-router"
import { ArrowRight, Check } from "lucide-react"
import * as React from "react"
import { useTranslation } from "react-i18next"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { CountryDropdown } from "@/components/ui/country-select"
import { Label } from "@/components/ui/label"


import { AuthHeader } from "../shared/AuthHeader"
import { FormField } from "../shared/FormField"
import { GoogleSignInButton } from "../shared/GoogleSignInButton"
import { OTPInput } from "../shared/OTPInput"
import { SubmitButton } from "../shared/SubmitButton"

const detailsSchema = z.object({
  fullName: z.string().min(2, { message: "Name must be at least 2 characters" }),
  country: z.string().min(1, { message: "Please select a country" }),
})

const emailSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
})

export function RegisterForm() {
  const { t } = useTranslation(["common"])
  const navigate = useNavigate()
  const [step, setStep] = React.useState(0)
  const [otp, setOtp] = React.useState(["", "", "", "", "", ""])

  const detailsForm = useForm({
    defaultValues: {
      fullName: "",
      country: "",
    },
    validators: {
      onChange: detailsSchema,
    },
    onSubmit: async () => setStep(1),
  })

  const emailForm = useForm({
    defaultValues: {
      email: "",
    },
    validators: {
      onChange: emailSchema,
    },
    onSubmit: async () => setStep(2),
  })

  const isOtpComplete = otp.every(d => d !== "")

  const [isVerifying, setIsVerifying] = React.useState(false)

  const handleVerifyOtp = async () => {
    setIsVerifying(true)
    // Mock verification

    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsVerifying(false)
    setStep(3)
  }

  if (step === 3) {
    return (
      <div className="flex flex-col items-center text-center space-y-6 animate-in zoom-in-95 duration-500">
        <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center text-green-600">
          <Check className="w-8 h-8" strokeWidth={3} />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold font-clash-display tracking-tight">
            {t("common:auth.allSet")}
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            {t("common:auth.accountReady", { name: detailsForm.getFieldValue("fullName").split(" ")[0] })}
          </p>
        </div>
        <Button 
          className="w-full h-11" 
          onClick={() => navigate({ to: "/" })}
        >
          {t("common:navigation.dashboard")}
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <AuthHeader
        title={
          step === 0 ? t("common:auth.registerTitle") :
          step === 1 ? t("common:auth.emailVerification") :
          t("common:auth.verifyEmail")
        }
        description={
          step === 0 ? t("common:auth.startBasics") :
          step === 1 ? t("common:auth.sendVerificationCode") :
          t("common:auth.enter6DigitCode", { email: emailForm.getFieldValue("email") })
        }
      />

      {step === 0 && (
        <form
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            detailsForm.handleSubmit()
          }}
          className="space-y-6 animate-in slide-in-from-right-4 duration-300"
        >
          <detailsForm.Field
            name="fullName"
            children={(field) => (
              <FormField
                label={t("common:auth.fullName")}
                field={field}
                type="text"
                placeholder="Jane Doe"
                autoComplete="name"
                className=""
                autoFocus
              />
            )}
          />

          <detailsForm.Field
            name="country"
            children={(field) => (
              <div className="space-y-2">
                <Label htmlFor="country">{t("common:labels.country")}</Label>
                <CountryDropdown
                  value={field.state.value}
                  onChange={(val) => field.handleChange(val)}
                  placeholder={t("common:auth.selectCountry")}
                />
                {field.state.meta.errors.length > 0 && (
                  <p className="text-[0.8rem] font-medium text-destructive">
                    {field.state.meta.errors[0]?.message}
                  </p>
                )}
              </div>
            )}
          />

        
          <detailsForm.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <SubmitButton 
                loading={isSubmitting}
                disabled={!canSubmit}
              >
                {t("common:actions.continue")}
                <ArrowRight className="ml-2 w-4 h-4" />
              </SubmitButton>
            )}
          />

           <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                {t("common:auth.orRegisterWith")}
              </span>
            </div>
          </div>

          <GoogleSignInButton onClick={() => {}} />
        </form>
      )}

      {step === 1 && (
        <form
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            emailForm.handleSubmit()
          }}
          className="space-y-6 animate-in slide-in-from-right-4 duration-300"
        >
          <emailForm.Field
            name="email"
            children={(field) => (
              <FormField
                label={t("common:labels.email")}
                field={field}
                type="email"
                placeholder="name@email.com"
                autoComplete="email"
                className=""
                autoFocus
              />
            )}
          />

          <div className="flex flex-col gap-4">
            <emailForm.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <SubmitButton 
                  loading={isSubmitting}
                  disabled={!canSubmit}
                >
                  {t("common:auth.sendCode")}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </SubmitButton>
              )}
            />
            <SubmitButton 
              variant="ghost" 
              type="button" 
              onClick={() => setStep(0)}
              className="h-11"
            >
              {t("common:actions.back")}
            </SubmitButton>
          </div>
        </form>
      )}

      {step === 2 && (
        <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
          <OTPInput
            value={otp}
            onChange={(i: number, val: string) => {
              const newOtp = [...otp]
              newOtp[i] = val
              setOtp(newOtp)
            }}
            onKeyDown={() => {}}
          />
          <div className="flex flex-col gap-4">
            <SubmitButton 
              loading={isVerifying}
              disabled={!isOtpComplete}
              onClick={handleVerifyOtp}
            >
              {t("common:auth.verifyComplete")}
              <ArrowRight className="ml-2 w-4 h-4" />
            </SubmitButton>
            <SubmitButton 
              variant="ghost" 
              type="button" 
              onClick={() => setStep(1)}
              className="h-11"
            >
              {t("common:auth.changeEmail")}
            </SubmitButton>
          </div>
        </div>
      )}

      {step < 3 && (
        <p className="text-center text-sm text-muted-foreground mt-4">
          {t("common:auth.alreadyHaveAccount")}{" "}
          <Link 
            to="/login" 
            className="font-semibold text-primary hover:underline"
          >
            {t("common:auth.login")}
          </Link>
        </p>
      )}
    </div>
  )
}
