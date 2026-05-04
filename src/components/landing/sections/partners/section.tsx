import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { useTranslation } from "react-i18next";

const partners = [
  {
    name: "Hubtel",
    logo: "/images/products/hubtel.png",
    alt: "Hubtel Logo",
  },
  {
    name: "CalBank",
    logo: "/images/products/calbank.png",
    alt: "CalBank Logo",
  },
  {
    name: "Hubtel-2",
    logo: "/images/products/hubtel.png",
    alt: "Hubtel Logo",
  },
  {
    name: "CalBank-2",
    logo: "/images/products/calbank.png",
    alt: "CalBank Logo",
  },
];

export default function PartnersSection() {
  const { t } = useTranslation(["landing"]);

  return (
    <section
      id="partners"
      className="w-full relative py-10 bg-white/80 border-t border-b border-slate-100"
    >
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-medium font-clash-display text-slate-800">
          {t("landing:partners.count")}{" "}
          <span className="text-lg">{t("landing:partners.alreadyOn")} </span>
          <span className="text-primary-600">
            {t("landing:partners.brandName")}
          </span>
        </h2>
        <div className="max-w-7xl mx-auto">
          <InfiniteMovingCards
            items={partners.map((partner) => ({
              quote: (
                <div className="flex flex-col items-center justify-center py-2">
                  <img
                    src={partner.logo}
                    alt={partner.alt}
                    width={180}
                    height={60}
                    className="object-contain h-12 w-auto mb-2"
                  />
                </div>
              ),
              name: partner.name,
              title: "",
            }))}
            speed="normal"
            pauseOnHover={true}
            className="pt-2"
          />
        </div>
      </div>
    </section>
  );
}
