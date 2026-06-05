
import { useTranslation } from "react-i18next"
import { useNavigate } from "@tanstack/react-router"

import { SubmitButton } from "./SubmitButton"
import SucessIcon from "@/assets/svg/sucess.svg?react"

export function SuccessView() {
  const { t } = useTranslation(["common"])
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center text-center space-y-6 animate-in zoom-in-95 duration-500">
      <div className="size-40 flex items-center justify-center">
        < SucessIcon />
      </div>
      <div className="space-y-2">
        <h2 className="text-2xl font-bold font-clash-display tracking-tight">
          {t("common:auth.welcomeBack")}
        </h2>
        <p className="text-muted-foreground">
          {t("common:auth.successSignedIn")}
        </p>
      </div>
      <SubmitButton
        type="button"
        onClick={() => {
          navigate({ to: "/home" });
        }}
      >
        {t("common:navigation.dashboard")}
      </SubmitButton>
    </div>
  )
}
