
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface IPrimaryAlert {
    title: string;
    description: string;
}
const PrimaryAlert = ({title, description}: IPrimaryAlert) => {
  return (
    <Alert>
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>
        {description}
      </AlertDescription>
    </Alert>
  );
};

export default PrimaryAlert;