import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface IPrimaryCard {
  title: string;
  children: React.ReactNode;
  cardClassName?: string;
  cardHeaderClassName?: string;
  cardTitleClassName?: string;
  cardContentClassName?: string;
}

const PrimaryCard = ({
  children,
  title,
  cardClassName = "bg-[#1E1E1E] text-white",
  cardContentClassName,
  cardHeaderClassName,
  cardTitleClassName,
}: IPrimaryCard) => {
  return (
    <Card className={cardClassName}>
      <CardHeader className={cardHeaderClassName}>
        <CardTitle className={cardTitleClassName}>{title}</CardTitle>
      </CardHeader>
      <CardContent className={cardContentClassName}>{children}</CardContent>
      
    </Card>
  );
};

export default PrimaryCard;
