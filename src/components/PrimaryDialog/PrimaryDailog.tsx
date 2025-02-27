import React, { lazy } from "react";

const Dialog = lazy(() =>
  import("@/components/ui/dialog").then((module) => ({
    default: module.Dialog,
  }))
);
const DialogTrigger = lazy(() =>
  import("@/components/ui/dialog").then((module) => ({
    default: module.DialogTrigger,
  }))
);
const DialogContent = lazy(() =>
  import("@/components/ui/dialog").then((module) => ({
    default: module.DialogContent,
  }))
);
const DialogHeader = lazy(() =>
  import("@/components/ui/dialog").then((module) => ({
    default: module.DialogHeader,
  }))
);
const DialogTitle = lazy(() =>
  import("@/components/ui/dialog").then((module) => ({
    default: module.DialogTitle,
  }))
);
const DialogDescription = lazy(() =>
  import("@/components/ui/dialog").then((module) => ({
    default: module.DialogDescription,
  }))
);

interface IPrimaryDailog {
  btn: () => JSX.Element;
  children: React.ReactNode;
  title?: string;
  description?: string;
  openForm?: boolean;
  dialogClassName : string;
}

const PrimaryDailog = ({
  btn,
  children,
  title,
  description,
  openForm,
  dialogClassName
}: IPrimaryDailog) => {
  return (
    <Dialog open={openForm && openForm}>
      <DialogTrigger asChild>{btn()}</DialogTrigger>
      <DialogContent className={dialogClassName}>
        {title || description ? (
          <DialogHeader>
            {title && <DialogTitle>{title}</DialogTitle>}
            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </DialogHeader>
        ) : (
          ""
        )}
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default PrimaryDailog;
