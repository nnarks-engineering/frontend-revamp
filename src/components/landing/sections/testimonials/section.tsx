import { Section } from "../../Section";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import LandingBigTrustedBusinessCard from "./big-card";
import LandingSmallTrustedBusinessCard from "./small-card";

export default function TestimonialsSection() {
  const { t } = useTranslation("landing");

  // Fetch the items as an object array to avoid TS errors with indexed keys
  const items = t("testimonials.items", { returnObjects: true }) as Array<{
    name: string;
    role: string;
    company: string;
    quote: string;
  }>;

  const testimonials = [
    {
      ...(items?.[0] || {}),
      gradientClass: "bg-gradient-to-br from-primary-50/0 to-primary-50",
      rating: 5,
      logo: "/images/products/calbank.png",
      videoUrl: "https://www.youtube.com/watch?v=6DDbLssMJRQ",
    },
    {
      ...(items?.[1] || {}),
      gradientClass: "bg-gradient-to-br from-primary-50 to-primary-100",
      rating: 5,
      logo: "/images/products/hubtel.png",
      videoUrl: "https://www.youtube.com/watch?v=1DKo86wPmQg",
    },
    {
      ...(items?.[2] || {}),
      gradientClass: "bg-gradient-to-br from-primary-50 to-primary-100",
      rating: 5,
      logo: "/images/products/calbank.png",
      featureImage: "/images/landing/nnarks-engineer1.webp",
    },
    {
      ...(items?.[3] || {}),
      gradientClass: "bg-gradient-to-br from-primary-50/0 to-primary-50",
      rating: 5,
      logo: "/images/products/hubtel.png",
    },
  ];

  return (
    <Section
      id="testimonials"
      className="relative w-full py-16 md:py-20 lg:py-24 bg-white overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex mb-6 flex-col items-center justify-center space-y-12 text-center"
      >
        <div className="max-w-xl mx-auto text-center mb-4">
          <h2 className="text-4xl font-bold font-clash-display">
            {t("testimonials.title")}
          </h2>
          <p className="text-slate-500 leading-relaxed mt-4">
            {t("testimonials.description")}
          </p>
        </div>
      </motion.div>

    <div className="flex flex-col lg:flex-row gap-4">
  <div className="lg:sticky flex-3/7 lg:top-4 self-stretch">
    <LandingBigTrustedBusinessCard />
  </div>
  <div className="grid @container gap-5  flex-4/7 flex-1 min-w-0 auto-rows-auto">
    {testimonials.slice(0, 3).map((testimonial) => (
      <LandingSmallTrustedBusinessCard
        key={testimonial.name}
        {...testimonial}
      />
    ))}
  </div>
</div>
    </Section>
  );
}