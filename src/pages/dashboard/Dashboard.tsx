import { lazy } from "react";
import { format } from "date-fns";
import {
  Plus,
  ArrowRight,
  Dumbbell,
  Zap,
  Flame,
  LucideProps,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getWorkout,
  getWorkoutPerformance,
  repeatLastWorkout,
} from "@/Api/workout";
import { Link } from "react-router-dom";
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
  const { data: workouts } = useQuery({
    queryKey: ["get-recent-workouts"],
    queryFn: () => getWorkout(7),
  });

  const { mutate: repeatLastWorkoutMutate, isPending } = useMutation({
    mutationKey: ["repeat-last-workout"],
    mutationFn: repeatLastWorkout,
  });

  const { data: performanceData } = useQuery({
    queryKey: ["get-workout-performance"],
    queryFn: getWorkoutPerformance,
  });

  return (
    <UiLayout>
      <LayoutContentWrapper
        header="Dashboard"
        des="Track your progress and stay on top of your workouts."
      >
        <div className="flex space-x-2">
          <Button className="bg-[#00BFFF] text-white hover:bg-[#00A0D0]">
            <Link to={"/workouts"} className="flex items-center">
              <Plus className="mr-2 h-4 w-4" /> Log Workout
            </Link>
          </Button>
          <Button
            variant="outline"
            className="bg-[#2A2A2A] text-white hover:bg-[#3A3A3A]"
          >
            <Link to={"/progress"}>View Progress</Link>
          </Button>
        </div>
      </LayoutContentWrapper>
      <LayoutGridWrapper Cols={2}>
        <div className="space-y-8">
          {/* Today's Workout Plan */}
          <PrimaryCard title="Today's Workout Plan">
            <p className="text-gray-400 mb-4">
              No workout scheduled for today.
            </p>
            <Button className="w-full bg-[#00BFFF] text-white hover:bg-[#00A0D0]">
              Quick Start Workout <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
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
                    <div key={index} className="mb-2">
                      <p className="font-semibold text-[#edfafa]">
                        {exercise.name}
                      </p>
                      <p className="text-sm text-gray-400">
                        {exercise.sets.map((set, setIndex) => (
                          <span key={setIndex}>
                            {set.weight}kg x {set.reps}
                            {setIndex < exercise.sets.length - 1 ? ", " : ""}
                          </span>
                        ))}
                      </p>
                    </div>
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
          <ProgressGraphFrag data={[]} selectedExercise="Weekly Progress"/>

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
