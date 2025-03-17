import { getWorkout } from "@/Api/workout";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { lazy, useState } from "react";

const PrimaryCard = lazy(() => import("@/components/PrimaryCard/PrimaryCard"));
const ScrollArea = lazy(() =>
  import("@/components/ui/scroll-area").then((module) => ({
    default: module.ScrollArea,
  }))
);
const RecentWorkoutAtom = lazy(() => import("@/atmos/RecentWorkoutAtom"));
const PrimaryAlertDialog = lazy(
  () => import("@/components/PrimaryAlertDialog/PrimaryAlertDialog")
);
const CreateTemplateFromWorkout = lazy(
  () => import("@/Fragments/CreateTemplateFromWorkout")
);

interface IRecentWorkoutFrag {
  title: string;
  des?: string;
  flag?: boolean;
}
const RecentWorkoutFrag = ({ title, des, flag }: IRecentWorkoutFrag) => {
  const [selectedWorkoutId, setSelectedWorkoutId] = useState<
    string | undefined
  >("");
  const [templateName, setTemplateName] = useState<string>("");
  const { data: workouts } = useQuery({
    queryKey: ["get-recent-workouts"],
    queryFn: () => getWorkout(7),
  });

  const formData = {
    name: templateName,
    workoutId: selectedWorkoutId,
  }
  
  return (
    <PrimaryCard title={title} des={des}>
      <ScrollArea className="h-[300px] pr-4">
        {workouts?.data?.map((workout) => (
          <div className="relative">
            <PrimaryCard
              key={workout._id}
              title={format(new Date(workout.date), "MMMM d, yyyy")}
              cardClassName="mb-4 bg-[#2A2A2A] border-none"
              cardHeaderClassName="pb-2"
              cardTitleClassName="text-lg text-[#edfafa]"
            >
              {workout.exercises.map((exercise, index) => (
                <RecentWorkoutAtom exercise={exercise} key={index} />
              ))}
            </PrimaryCard>
            {flag && (
              <PrimaryAlertDialog
                trigger={() => (
                  <Button
                    className="absolute bottom-2 right-2"
                    variant="ghost"
                    onClick={() =>
                      setSelectedWorkoutId && setSelectedWorkoutId(workout._id)
                    }
                  >
                    Select
                  </Button>
                )}
                btnName="Create Template"
                onClick={() =>console.log(formData)}
              >
                <CreateTemplateFromWorkout setTemplateName={setTemplateName}/>
              </PrimaryAlertDialog>
            )}
          </div>
        ))}
      </ScrollArea>
    </PrimaryCard>
  );
};

export default RecentWorkoutFrag;