import { Quote } from "lucide-react";
import { useTranslation } from "react-i18next";
import FamilyManImage from "@/assets/landing/family-man.webp";
import CalBankLogo from "@/assets/products/calbank.png";

const LandingBigTrustedBusinessCard = () => {
  const { t } = useTranslation(["landing"]);

  return (
    <div className="bg-white max-w-2xl h-full   shadow-md p-6 pb-0 overflow-clip bg-gradient-to-br from-primary-50 to-primary-400 relative flex flex-col justify-between">
      <div className=" overflow-hidden z-10 relative shadow-md p-6  border-primary-400 bg-gradient-to-br from-primary-200 to-primary-400 text-slate-800 py-10">
        <div>
          <Quote
            strokeWidth={0}
            fill="currentColor"
            className="absolute scale-x-[-1] left-1/2 top-5 text-primary-50/15 stroke-[0.5] stroke-primary-50/5 size-40"
          />
        </div>
        <div className="z-2 relative text-sm leading-relaxed">
          {t("landing:testimonials.bigCard.quote")}
        </div>
      </div>

      {/* Feature image */}
      <div className="-mx-6 -mt-10 z-10 relative">
        <img
          alt="Trusted team"
          width={240}
          height={300}
          src={FamilyManImage}
          className="w-full h-auto max-w-[300px] object-cover"
        />
      </div>

      {/* Organization badge */}
      <div className="absolute z-50 -bottom-1 -right-1 bg-white border-2 border-white backdrop-blur-sm">
        <div className="relative w-32 h-20">
          <img
            src={CalBankLogo}
            alt={t("landing:testimonials.bigCard.company")}
            className="object-contain w-full h-full"
          />
        </div>
        <p className="text-sm font-medium text-center font-clash-display text-primary-500">
          {t("landing:testimonials.bigCard.company")}
        </p>
      </div>
    </div>
  );
};

export default LandingBigTrustedBusinessCard;
