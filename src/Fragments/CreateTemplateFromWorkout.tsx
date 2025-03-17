import { Dispatch, lazy, SetStateAction } from "react";
const Input = lazy(() =>
  import("@/components/ui/input").then((module) => ({ default: module.Input }))
);

const Label = lazy(() =>
  import("@/components/ui/label").then((module) => ({ default: module.Label }))
);

interface ICreateTemplateFromWorkout {
  setTemplateName: Dispatch<SetStateAction<string>>;
}
const CreateTemplateFromWorkout = ({
  setTemplateName,
}: ICreateTemplateFromWorkout) => {
  return (
    <>
      <Label htmlFor="template-name" className="text-white w-full">Template Name</Label>
      <Input
        type="text"
        id="template-name"
        placeholder="enter template name eg: Legs Day"
        className="text-black"
        onChange={(e) => setTemplateName(e.target.value)}
        required
      />
    </>
  );
};

export default CreateTemplateFromWorkout;