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

interface IPrimaryDailog {
  btn: () => JSX.Element;
  children: React.ReactNode;
}
const PrimaryDailog = ({ btn, children }: IPrimaryDailog) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{btn()}</DialogTrigger>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

export default PrimaryDailog;