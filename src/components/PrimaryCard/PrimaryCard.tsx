import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideProps } from "lucide-react";

interface IPrimaryCard {
  title: string;
  children: React.ReactNode;
  cardClassName?: string;
  cardHeaderClassName?: string;
  cardTitleClassName?: string;
  cardContentClassName?: string;
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
}: IPrimaryCard) => {
  return (
    <Card className={cardClassName}>
      <CardHeader className={cardHeaderClassName}>
        <CardTitle className={cardTitleClassName}>
          {Icon && <Icon className="h-4 w-4 inline-block mr-1" />}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className={cardContentClassName}>{children}</CardContent>
    </Card>
  );
};

export default PrimaryCard;
