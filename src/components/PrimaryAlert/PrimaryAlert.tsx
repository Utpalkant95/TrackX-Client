import { lazy } from "react";
const Alert = lazy(() => import("@/components/ui/alert").then((module) => ({default : module.Alert})))
const AlertDescription = lazy(() => import("@/components/ui/alert").then((module) => ({default : module.AlertDescription})))
const AlertTitle = lazy(() => import("@/components/ui/alert").then((module) => ({default : module.AlertTitle})))

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