import { LucideProps } from "lucide-react";
import { lazy } from "react";
const Card = lazy(() =>
  import("@/components/ui/card").then((module) => ({
    default: module.Card,
  }))
);
const CardContent = lazy(() =>
  import("@/components/ui/card").then((module) => ({
    default: module.CardContent,
  }))
);
const CardDescription = lazy(() =>
  import("@/components/ui/card").then((module) => ({
    default: module.CardDescription,
  }))
);
const CardHeader = lazy(() =>
  import("@/components/ui/card").then((module) => ({
    default: module.CardHeader,
  }))
);
const CardTitle = lazy(() =>
  import("@/components/ui/card").then((module) => ({
    default: module.CardTitle,
  }))
);

interface IPrimaryCard {
  title?: string;
  children: React.ReactNode;
  cardClassName?: string;
  cardHeaderClassName?: string;
  cardTitleClassName?: string;
  cardContentClassName?: string;
  des?: string;
  Icon?: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
}

const PrimaryCard = ({
  children,
  title,
  cardClassName = "bg-[#1E1E1E] text-white",
  cardContentClassName,
  cardHeaderClassName,
  cardTitleClassName,
  Icon,
  des,
}: IPrimaryCard) => {
  return (
    <Card className={cardClassName}>
      {title && (
        <CardHeader className={cardHeaderClassName}>
        {title && (
          <CardTitle className={cardTitleClassName}>
            {Icon && <Icon className="h-4 w-4 inline-block mr-1" />}
            {title}
          </CardTitle>
        )}
        {des && <CardDescription>{des}</CardDescription>}
      </CardHeader>
      )}
      <CardContent className={cardContentClassName}>{children}</CardContent>
    </Card>
  );
};

export default PrimaryCard;