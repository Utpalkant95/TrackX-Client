import { IWorkoutData } from "@/Api/interfaces/Response";
import { getWorkout } from "@/Api/workout";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Dispatch, lazy, SetStateAction } from "react";

const PrimaryCard = lazy(() => import("@/components/PrimaryCard/PrimaryCard"));
const ScrollArea = lazy(() =>
  import("@/components/ui/scroll-area").then((module) => ({
    default: module.ScrollArea,
  }))
);
const RecentWorkoutAtom = lazy(() => import("@/atmos/RecentWorkoutAtom"));

interface IRecentWorkoutFrag {
  title: string;
  des?: string;
  flag?: boolean;
  setSelectedWorkout?: Dispatch<SetStateAction<IWorkoutData | undefined>>;
}
const RecentWorkoutFrag = ({
  title,
  des,
  flag,
  setSelectedWorkout,
}: IRecentWorkoutFrag) => {
  const { data: workouts } = useQuery({
    queryKey: ["get-recent-workouts"],
    queryFn: () => getWorkout(7),
  });

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
              <Button
                className="absolute bottom-2 right-2"
                variant="ghost"
                onClick={() =>
                  setSelectedWorkout && setSelectedWorkout(workout)
                }
              >
                Select
              </Button>
            )}
          </div>
        ))}
      </ScrollArea>
    </PrimaryCard>
  );
};

export default RecentWorkoutFrag;
