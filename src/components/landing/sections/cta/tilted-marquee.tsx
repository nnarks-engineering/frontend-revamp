import { useTranslation } from "react-i18next";

interface CardProps {
  label?: string;
  children?: React.ReactNode;
  className?: string;
}

function Card({ label, children, className }: CardProps) {
  return (
    <div
      className={`bg-background rounded-2xl border border-border p-6 shadow-sm w-full h-full flex flex-col ${className}`}
    >
      {label && (
        <p className="text-[10px] text-muted-foreground mb-4 uppercase tracking-widest font-medium">
          {label}
        </p>
      )}
      <div className="flex-1">{children}</div>
    </div>
  );
}

interface MarqueeRowProps {
  cards: React.ReactNode[];
  direction: "left" | "right";
  speed: string;
}

function MarqueeRow({ cards, direction, speed }: MarqueeRowProps) {
  const doubled = [...cards, ...cards];

  return (
    <div className="overflow-visible [mask-image:linear-gradient(to_right,transparent_0%,black_10%,black_100%,black_100%)]">
      <div
        className={`flex gap-6 ${
          direction === "right"
            ? "animate-marquee-right"
            : "animate-marquee-left"
        }`}
        style={{ animationDuration: speed }}
      >
        {doubled.map((card, index) => {
          const cardKey = `${
            (card as React.ReactElement)?.key ?? "card"
          }-${index}`;
          return (
            <div key={cardKey} className="w-[290px] flex-shrink-0">
              {card}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function MarqueeSection() {
  const { t } = useTranslation(["landing"]);

  const marqueeRows = [
    {
      key: "row1",
      direction: "left" as const,
      speed: "36s",
      cards: [
        <Card key="conversion">
          <span className="text-4xl font-semibold text-primary">15%</span>
          <p className="text-xs text-primary-600 mt-1">
            {t("landing:ctaMarquee.conversionRate")}
          </p>
        </Card>,
        <Card key="leads">
          <span className="text-4xl font-semibold text-primary">19</span>
          <p className="text-xs text-secondary-600 mt-1">
            {t("landing:ctaMarquee.projectsFunded")}
          </p>
        </Card>,
        <Card
          key="person"
          className="bg-[url('/images/landing/narks-engineer-orange.webp')] bg-cover bg-center"
        />,
        <Card key="balance">
          <span className="text-4xl font-semibold text-primary">$5,512.70</span>
          <span className="mt-2 inline-block bg-primary-50 text-primary-600 text-xs px-3 py-1 rounded-full font-medium">
            {t("landing:ctaMarquee.inEscrow")}
          </span>
        </Card>,
      ],
    },
    {
      key: "row2",
      direction: "right" as const,
      speed: "44s",
      cards: [
        <Card key="newsletter">
          <p className="text-sm font-medium text-foreground mb-3">
            {t("landing:ctaMarquee.recentInvestors")}
          </p>
          <div className="space-y-3 text-sm text-foreground/80">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-primary-200" />
              Amanda Harvey
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-secondary-200" />
              David Harrison
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-primary-300" />
              Bob Dean
            </div>
          </div>
        </Card>,
        <Card key="teams">
          <div className="text-3xl font-bold text-primary mb-1">$39</div>
          <p className="text-xs text-muted-foreground">
            {t("landing:ctaMarquee.perMonth")}
          </p>
          <ul className="mt-5 space-y-2 text-sm text-foreground/80">
            <li>✓ {t("landing:ctaMarquee.teamFeature1")}</li>
            <li>✓ {t("landing:ctaMarquee.teamFeature2")}</li>
            <li>✓ {t("landing:ctaMarquee.teamFeature3")}</li>
          </ul>
        </Card>,
        <Card key="payouts">
          <p className="text-sm font-medium text-foreground mb-4">
            {t("landing:ctaMarquee.recentReleases")}
          </p>
          <div className="space-y-4 text-sm">
            <div>
              <span className="font-medium">Chris Glynch</span>
              <span className="text-muted-foreground ml-2 text-xs">
                Milestone 3 ✓
              </span>
            </div>
            <div>
              <span className="font-medium">Dillon Wanner</span>
              <span className="text-muted-foreground ml-2 text-xs">
                Milestone 2 ✓
              </span>
            </div>
          </div>
        </Card>,
      ],
    },
    {
      key: "row3",
      direction: "left" as const,
      speed: "32s",
      cards: [
        <Card key="upload">
          <div className="bg-primary-50 border border-primary-200 rounded-2xl p-5 text-center">
            <p className="text-primary-700 text-sm font-medium">
              ✓ {t("landing:ctaMarquee.evidenceUploaded")}
            </p>
          </div>
        </Card>,
        <Card key="activity">
          <p className="text-xs text-muted-foreground mb-3">
            {t("landing:ctaMarquee.activityOverview")}
          </p>
          <div className="space-y-3">
            {[68, 42, 91].map((w, i) => (
              <div
                key={i}
                className="h-2 bg-border rounded-full overflow-hidden"
              >
                <div
                  className="h-2 bg-primary rounded-full"
                  style={{ width: `${w}%` }}
                />
              </div>
            ))}
          </div>
        </Card>,
        <Card key="user">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-primary-400 to-secondary-500 bg-[url('/images/landing/family-man.webp')] bg-cover flex-shrink-0" />
            <div>
              <p className="font-semibold text-foreground">Maria Thompson</p>
              <p className="text-xs text-muted-foreground">
                {t("landing:ctaMarquee.signedInAs")} • maria@nnarks.com
              </p>
            </div>
          </div>
        </Card>,
      ],
    },
  ];

  return (
    <div className="w-full">
      <div style={{ perspective: "1400px" }}>
        <div
          style={{
            transform: "rotateX(16deg) rotateY(-20deg) rotateZ(-7deg)",
            transformStyle: "preserve-3d",
          }}
          className="flex flex-col gap-8 max-w-4xl mx-auto"
        >
          {marqueeRows.map((row) => (
            <MarqueeRow
              key={row.key}
              cards={row.cards}
              direction={row.direction}
              speed={row.speed}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
