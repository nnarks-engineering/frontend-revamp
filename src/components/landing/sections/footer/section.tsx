import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { LinkPreview } from "@/components/ui/link-preview";
import NnarksLogo from "@/assets/nnarks-logo-sm.svg?react";
import NnarksLogoSm from "@/assets/nnarks-logo.svg?react";

import FaceBookIcon from "@/assets/svg/facebook.svg?react";
import InstagramIcon from "@/assets/svg/instagram.svg?react";
import LinkedInIcon from "@/assets/svg/linked-in.svg?react";
import TiktokIcon from "@/assets/svg/tiktok.svg?react";



export default function LandingFooter() {
  const { t } = useTranslation(["landing", "common"]);
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-background dark:bg-background-space overflow-hidden">
      {/* Large subtle Logo Background */}
      <NnarksLogo
        className="absolute opacity-10 bottom-0 left-1/2 text-slate-100 -translate-x-1/2 w-[600px] sm:w-[1000px] md:w-[1440px] h-auto pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16">
          {/* Brand Column */}
          <div className="md:col-span-5">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <NnarksLogoSm className="h-16 text-primary " />
              <p className="text-xs font-medium text-primary tracking-widest uppercase mt-0.5">
                  {t("common:platform.tagline")}
                </p>
            </Link>

            <p className="text-foreground/60 max-w-md leading-relaxed mb-8">
              {t("landing:footer.description")}
            </p>

           {/* Social Icons */}
<div className="flex gap-4">
  {[
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/company/nnarks/",
      icon: <LinkedInIcon />,
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com/nnarksescrow",
      icon: <InstagramIcon />,
    },
    {
      label: "Facebook",
      href: "https://www.facebook.com/people/Nnarks/61588222332102/",
      icon: <FaceBookIcon />,
    },
    {
      label: "TikTok",
      href: "https://www.tiktok.com/@nnarksescrow",
      icon: <TiktokIcon />,
    },
  ].map(({ label, href, icon }) => (
    <LinkPreview
      key={label}
      url={href}
      className="w-10 h-10 flex items-center justify-center rounded-full border border-slate-200 hover:bg-primary-50 hover:border-primary-300 transition-all"
    >
      {icon}
    </LinkPreview>
  ))}
</div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-7 grid grid-cols-3 sm:grid-cols-3 gap-10">
            <div>
              <h4 className="font-semibold text-foreground mb-5">
                {t("landing:footer.sections.product")}
              </h4>
              <ul className="space-y-3 text-sm text-foreground/60">
                <li>
                  <Link
                    to="/"
                    hash="features"
                    className="hover:text-primary transition-colors"
                  >
                    {t("landing:footer.links.features")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    hash="modules"
                    className="hover:text-primary transition-colors"
                  >
                    {t("landing:footer.links.modules")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    hash="pricing"
                    className="hover:text-primary transition-colors"
                  >
                    {t("landing:footer.links.pricing")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    className="hover:text-primary transition-colors"
                  >
                    {t("landing:footer.links.liveDemo")}
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-5">
                {t("landing:footer.sections.company")}
              </h4>
              <ul className="space-y-3 text-sm text-foreground/60">
                <li>
                  <Link
                    to="/"
                    className="hover:text-primary transition-colors"
                  >
                    {t("landing:footer.links.about")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    className="hover:text-primary transition-colors"
                  >
                    {t("landing:footer.links.careers")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    className="hover:text-primary transition-colors"
                  >
                    {t("landing:footer.links.blog")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    className="hover:text-primary transition-colors"
                  >
                    {t("landing:footer.links.contact")}
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-5">
                {t("landing:footer.sections.support")}
              </h4>
              <ul className="space-y-3 text-sm text-foreground/60">
                <li>
                  <Link
                    to="/"
                    className="hover:text-primary transition-colors"
                  >
                    {t("landing:footer.links.documentation")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    className="hover:text-primary transition-colors"
                  >
                    {t("landing:footer.links.helpCenter")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    className="hover:text-primary transition-colors"
                  >
                    {t("landing:footer.links.tutorials")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    className="hover:text-primary transition-colors"
                  >
                    {t("landing:footer.links.community")}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative bg-primary-200 dark:bg-black pt-8 overflow-hidden">
        <NnarksLogo
          className="absolute opacity-10 bottom-0 left-1/2 text-white/10 -translate-x-1/2 w-[600px] sm:w-[1000px] md:w-[1440px] h-auto pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-8">
          <div className="flex pb-6 flex-col md:flex-row justify-between items-center gap-6 text-sm">
            {/* Copyright */}
            <div className="text-foreground/70 flex items-center gap-2">
              {t("landing:footer.copyright", { year: currentYear })}
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap gap-x-6 [&>a]:hover:text-primary-700 gap-y-2 text-foreground/70 text-sm">
              <Link to="/" className=" transition-colors">
                {t("landing:footer.links.terms")}
              </Link>
              <Link to="/" className=" transition-colors">
                {t("landing:footer.links.privacy")}
              </Link>
              <Link to="/" className=" transition-colors">
                {t("landing:footer.links.cookies")}
              </Link>
              <Link to="/" className=" transition-colors">
                {t("landing:footer.links.security")}
              </Link>
            </div>

            {/* Trust / Status */}
            <div className="flex items-center gap-2 text-xs text-foreground/80">
              <div className="w-2 h-2 bg-background rounded-full animate-pulse" />
              {t("landing:footer.systemOperational")}
            </div>
          </div>
        </div>
      </div>

      {/* Top glow lines */}
      <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-primary-200 dark:via-secondary-950 to-transparent h-[2px] w-3/4 blur-sm" />
      <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-primary-300 dark:via-secondary-900 to-transparent h-px w-3/4" />
      <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-primary-200 dark:via-secondary-950 to-transparent h-[5px] w-2/4 blur-sm" />
      <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-primary dark:via-secondary-900 to-transparent h-px w-1/4" />
    </footer>
  );
}
