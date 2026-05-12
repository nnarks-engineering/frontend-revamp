import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { cn } from "@/shared/lib/utils";

interface CtaAction {
  text: string;
  onClick?: () => void;
  href?: string;
}

interface CallToActionProps {
  title: string;
  description?: string;
  primaryCta: CtaAction;
  secondaryCta?: CtaAction;
  background?: {
    type: "image" | "video";
    src: string;
  };
  className?: string;
  containerClassName?: string;
}

function CtaButton({
  action,
  variant = "default",
}: {
  action: CtaAction;
  variant?: "default" | "outline";
}) {
  if (action.href) {
    return (
      <Link to={action.href}>
        <Button size="lg" variant={variant}>
          {action.text}
        </Button>
      </Link>
    );
  }
  return (
    <Button size="lg" variant={variant} onClick={action.onClick}>
      {action.text}
    </Button>
  );
}

export function CallToAction({
  title,
  description,
  primaryCta,
  secondaryCta,
  background,
  className,
  containerClassName,
}: CallToActionProps) {
  return (
    <section className={cn("relative mb-12 md:mb-20 py-12 md:py-16 overflow-hidden", className)}>
      {/* Background Layer */}
      {background && (
        <div className="absolute inset-0 z-0">
          {background.type === "image" ? (
            <img
              src={background.src}
              alt="CTA Background"
              className="w-full h-full object-cover"
            />
          ) : (
            <video
              src={background.src}
              autoPlay
              muted
              loop
              className="w-full h-full object-cover"
            />
          )}
          {/* Overlay to ensure readability */}
          <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px]" />
        </div>
      )}

      <div className={cn("max-w-[90rem] mx-auto px-6 relative z-10", containerClassName)}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "circOut" }}
          className="bg-white rounded-tr-4xl p-12 md:p-24 shadow-2xl flex flex-col items-center text-center space-y-10"
        >
          <div className="space-y-6 max-w-4xl">
            <h2 className="text-4xl md:text-7xl font-black font-clash-display text-black tracking-tight leading-[0.9]">
              {title}
            </h2>
            {description && (
              <p className="text-sm md:text-base text-muted-foreground">
                {description}
              </p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            <CtaButton action={primaryCta} variant="default" />
            {secondaryCta && (
              <CtaButton action={secondaryCta} variant="outline" />
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

