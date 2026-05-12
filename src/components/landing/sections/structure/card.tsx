import { type StructureItem } from "./locals";
import { useTranslation } from "react-i18next";
import { FeatureCard } from "../../FeatureCard";

interface StructureCardProps {
  item: StructureItem;
  index: number;
  layoutIdPrefix: string;
  onClick: () => void;
}

export function StructureCard({
  item,
  index,
  layoutIdPrefix,
  onClick,
}: StructureCardProps) {
  const { t } = useTranslation(["landing"]);

  return (
    <FeatureCard
      id={item.id}
      layoutIdPrefix={layoutIdPrefix}
      onClick={onClick}
      index={index}
      image={item.image}
      title={t(`landing:structure.items.${item.key}.title` as any)}
      description={t(`landing:structure.items.${item.key}.description` as any)}
      pill={{
        icon: item.icon,
        label: t(`landing:structure.items.${item.key}.subtitle` as any),
        value: t(`landing:structure.items.${item.key}.pillValue` as any),
      }}
    />
  );
}
