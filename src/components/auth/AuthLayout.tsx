import * as React from "react"
import { Link } from "@tanstack/react-router"
import { useTranslation } from "react-i18next"
import NnarksLogo from "@/assets/nnarks-logo-sm.svg?react"
import FaceBookIcon from "@/assets/svg/facebook.svg?react";
import InstagramIcon from "@/assets/svg/instagram.svg?react";
import LinkedInIcon from "@/assets/svg/linked-in.svg?react";
import TiktokIcon from "@/assets/svg/tiktok.svg?react";
import { LinkPreview } from "@/components/ui/link-preview";
import LogoText from "@/assets/nnarks-logo.svg?react"

import realBuilding from "@/assets/landing/real-building.png"
import RoundingLine from "@/assets/svg/rounding-line.svg?react"


interface AuthLayoutProps {
  children: React.ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  const { t } = useTranslation(["common"])

  const socials = [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/company/nnarks/",
      icon: <LinkedInIcon className="w-4 h-4 fill-primary" />,
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com/nnarksescrow",
      icon: <InstagramIcon className="w-4 h-4 fill-primary" />,
    },
    {
      label: "Facebook",
      href: "https://www.facebook.com/people/Nnarks/61588222332102/",
      icon: <FaceBookIcon className="w-4 h-4 fill-primary" />,
    },
    {
      label: "TikTok",
      href: "https://www.tiktok.com/@nnarksescrow",
      icon: <TiktokIcon className="w-4 h-4 fill-primary" />,
    },
  ] as const

  return (
    <div className="h-dvh w-full overflow-clip flex bg-primary-400 sm:bg-white dark:sm:bg-background items-end sm:items-stretch">

      {/* Ghost background text — mobile only */}
      <p
        style={{ backgroundImage: `url(${realBuilding})` }}

        aria-hidden="true"
        className="fixed top-6 inset-x-0 text-center select-none z-0 sm:hidden"
      >
        <RoundingLine className="w-full h-full" />
        <div className=" absolute left-[calc(50%-24px)]  top-10  w-fit  flex-col items-start mb-6">
          <Link to="/" className="flex items-center gap-2 group">
            <NnarksLogo className="h-10 w-auto  text-primary group-hover:scale-105 transition-transform" />
          </Link>
        </div>

        <div className="flex shadow absolute bottom-8 items-center w-fit mx-auto gap-3 bg-white p-2 px-10 rounded-full">
          {socials.map((social) => (
            <LinkPreview
              key={social.label}
              url={social.href}
              className="w-9 h-9 flex items-center justify-center rounded-full border border-slate-200 hover:bg-primary-50 hover:border-primary-300 transition-all text-primary"
            >
              {social.icon}
            </LinkPreview>
          ))}
        </div>
      </p>

      {/* Form panel */}
      <div className="relative z-10 flex flex-col bg-background flex-1 rounded-t-[28px] sm:rounded-none shadow-[0_-8px_40px_rgba(0,0,0,0.15)] sm:shadow-none max-h-[92dvh] sm:max-h-none min-h-[78dvh] sm:min-h-0 overflow-hidden">
        <div className="flex-1 overflow-y-auto p-6 sm:flex sm:flex-col sm:items-center sm:justify-center">


          <div className="w-full sm:max-w-[400px] space-y-8">
            {/* Logo — sm+ only */}
            <div className="hidden sm:flex lg:hidden flex-col items-center mb-8">
              <Link to="/" className="flex items-center gap-2 group">
                <LogoText className="h-9 w-auto text-primary group-hover:scale-105 transition-transform" />
              </Link>
            </div>

            <main>{children}</main>

            <div className="pt-8 border-t border-border space-y-6">
              <p className="text-xs text-muted-foreground leading-relaxed">
                {t("common:auth.termsNotice")}
              </p>

              <div className="flex items-center lg:hidden  w-fit mx-auto gap-3">
                {socials.map((social) => (
                  <LinkPreview
                    key={social.label}
                    url={social.href}
                    className="w-9 h-9 flex items-center justify-center rounded-full border border-slate-200 hover:bg-primary-50 hover:border-primary-300 transition-all text-primary"
                  >
                    {social.icon}
                  </LinkPreview>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side: Visual Panel (lg+ only) */}
      {/* Right side: Visual Panel (lg+ only) */}
      <div
        style={{ backgroundImage: `url(${realBuilding})` }}
        className="hidden lg:flex lg:w-1/2 bg-secondary relative overflow-hidden items-center justify-center  border-border">
        <RoundingLine className="w-full h-full text-secondary" />
        <div className=" absolute mx-auto top-10  flex-col items-start mb-6">
          <Link to="/" className="flex items-center gap-2 group">
            <LogoText className="h-10 w-auto text-primary group-hover:scale-105 transition-transform" />
          </Link>
        </div>

        <div className="flex shadow absolute bottom-8 items-center w-fit mx-auto gap-3 bg-white p-2 px-10 rounded-full">
          {socials.map((social) => (
            <LinkPreview
              key={social.label}
              url={social.href}
              className="w-9 h-9 flex items-center justify-center rounded-full border border-slate-200 hover:bg-primary-50 hover:border-primary-300 transition-all text-primary"
            >
              {social.icon}
            </LinkPreview>
          ))}
        </div>
      </div>
    </div>
  )
}