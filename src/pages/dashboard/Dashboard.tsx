import { lazy, useState } from "react";
import { format } from "date-fns";
import { ArrowRight, Dumbbell, Zap, Flame, LucideProps } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getWorkout,
  getWorkoutPerformance,
  repeatLastWorkout,
} from "@/Api/workout";
import { Link } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import { AxiosError } from "axios";
import { IRES } from "@/Api/interfaces/Response";
import { getProgressGraph } from "@/Api/progress";
import { RecentWorkoutAtom } from "@/atmos";
const UiLayout = lazy(() => import("@/layout/UiLayout"));
const LayoutGridWrapper = lazy(() => import("@/Wrappers/LayoutGridWrapper"));
const PrimaryCard = lazy(() => import("@/components/PrimaryCard/PrimaryCard"));
const CardFooter = lazy(() =>
  import("@/components/ui/card").then((module) => ({
    default: module.CardFooter,
  }))
);
const LayoutContentWrapper = lazy(
  () => import("@/Wrappers/LayoutContentWrapper")
);
const AiInsights = lazy(() => import("@/Fragments/AiInsights"));
const ProgressGraphFrag = lazy(() => import("@/Fragments/ProgressGraphFrag"));

const PersonalBestItem = ({
  Icon,
  description,
  exerciseName,
  title,
}: {
  Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  title: string;
  description: string;
  exerciseName: string;
}) => {
  return (
    <PrimaryCard
      title={title}
      cardHeaderClassName="pb-2"
      cardTitleClassName="text-sm font-medium"
      Icon={Icon}
    >
      <div className="text-2xl font-bold">{exerciseName}</div>
      <p className="text-xs text-muted-foreground">{description}</p>
    </PrimaryCard>
  );
};

export default function Dashboard() {
  const [selectedExercise, setSelectedExercise] = useState<string>("");
  const { data: workouts } = useQuery({
    queryKey: ["get-recent-workouts"],
    queryFn: () => getWorkout(7),
  });

  const { mutate: repeatLastWorkoutMutate, isPending } = useMutation({
    mutationKey: ["repeat-last-workout"],
    mutationFn: repeatLastWorkout,

    onSuccess: (data) => {
      enqueueSnackbar(data.message, { variant: "success" });
    },
    onError: (error: AxiosError<IRES>) => {
      enqueueSnackbar(error.response?.data.message, { variant: "error" });
    },
  });

  const { data: performanceData } = useQuery({
    queryKey: ["get-workout-performance"],
    queryFn: getWorkoutPerformance,
  });

  const { data: ProgressGraph } = useQuery({
    queryKey: ["getProgressGraph", selectedExercise],
    queryFn: () => getProgressGraph({exerciseName : selectedExercise}),
    enabled: !!selectedExercise,
  });
  return (
    <UiLayout>
      <LayoutContentWrapper
        header="Dashboard"
        des="Track your progress and stay on top of your workouts."
      />
      <LayoutGridWrapper Cols={2}>
        <div className="space-y-8">
          {/* Today's Workout Plan */}
          <PrimaryCard title="Today's Workout Plan">
            <p className="text-gray-400 mb-4">
              No workout scheduled for today.
            </p>
            <Link to={"/workouts"}>
              <Button className="w-full bg-[#00BFFF] text-white hover:bg-[#00A0D0]">
                Quick Start Workout <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </PrimaryCard>

          {/* Recent Workouts */}

          <PrimaryCard title="Recent Workouts">
            <ScrollArea className="h-[300px] pr-4">
              {workouts?.data?.map((workout) => (
                <PrimaryCard
                  key={workout._id}
                  title={format(new Date(workout.date), "MMMM d, yyyy")}
                  cardClassName="mb-4 bg-[#2A2A2A] border-none"
                  cardHeaderClassName="pb-2"
                  cardTitleClassName="text-lg text-[#edfafa]"
                >
                  {workout.exercises.map((exercise, index) => (
                    <RecentWorkoutAtom exercise={exercise} key={index}/>
                  ))}
                </PrimaryCard>
              ))}
            </ScrollArea>
            <CardFooter className="p-0">
              <Button
                variant="default"
                className="w-full"
                onClick={() => repeatLastWorkoutMutate()}
              >
                {isPending ? "Repeating..." : "Repeat Last Workout"}
              </Button>
            </CardFooter>
          </PrimaryCard>
        </div>

        <div className="space-y-8">
          {/* Progress & Analytics Overview */}
          <ProgressGraphFrag
            data={ProgressGraph}
            selectedExercise="Weekly Progress"
            setSelectedExercise={setSelectedExercise}
            flag={true}
          />

          {/* Personal Bests */}
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
            <PersonalBestItem
              Icon={Dumbbell}
              title="Heaviest Lift"
              description={performanceData?.data?.heaviestLiftExercise}
              exerciseName={performanceData?.data?.heaviestLift}
            />
            <PersonalBestItem
              Icon={Flame}
              title="Longest Streak"
              description={performanceData?.data?.StreakDate}
              exerciseName={performanceData?.data?.longestStreak}
            />
            <PersonalBestItem
              Icon={Zap}
              title="Most Frequent"
              description={`${performanceData?.data?.mostFrequentExerciseCount} x times`}
              exerciseName={performanceData?.data?.mostFrequentExercise}
            />
          </div>

          {/* AI-Based Insights & Recommendations */}
          <AiInsights />
        </div>
      </LayoutGridWrapper>
    </UiLayout>
  );
}
