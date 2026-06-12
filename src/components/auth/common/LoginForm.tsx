
import { useForm } from "@tanstack/react-form"
import { Link, useNavigate } from "@tanstack/react-router"
import { ArrowRight } from "lucide-react"
import { useTranslation } from "react-i18next"
import { z } from "zod"

import { AuthHeader } from "./AuthHeader"
import { FormField } from "./FormField"
import { GoogleSignInButton } from "./GoogleSignInButton"
import { SubmitButton } from "./SubmitButton"

const emailSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
})

export function LoginForm() {
  const { t } = useTranslation(["common"])
  const navigate = useNavigate()

  const form = useForm({
    defaultValues: {
      email: "",
    },
    validators: {
      onChange: emailSchema,
    },
    onSubmit: async ({ value }) => {
      // Mock sending OTP

      navigate({ to: "/verify", search: { email: value.email } })
    },
  })

  return (
    <div className="space-y-6">
      <AuthHeader 
        title={t("common:auth.login")}
        description={t("common:auth.sendVerificationCode")}
      />

      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
        className="space-y-6"
      >
        <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
          <form.Field
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

         
        </div>

        <form.Subscribe
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
                {t("common:auth.orContinueWith")}
              </span>
            </div>
          </div>

          <GoogleSignInButton onClick={() => {}} />
      </form>

      <p className="text-center text-sm text-muted-foreground mt-4">
        {t("common:auth.dontHaveAccount")}{" "}
        <Link 
          to="/register" 
          className="font-semibold text-primary hover:underline"
        >
          {t("common:auth.register")}
        </Link>
      </p>
    </div>
  )
}
