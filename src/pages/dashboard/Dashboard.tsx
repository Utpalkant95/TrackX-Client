import { lazy, useState } from "react";
import { format } from "date-fns";
import {
  CalendarIcon,
  Plus,
  ArrowRight,
  Dumbbell,
  Zap,
  Flame,
  AlertTriangle,
  LucideProps,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
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

const PrimaryPopOver = lazy(
  () => import("@/components/PrimaryPopOver/PrimaryPopOver")
);

const PrimaryAlert = lazy(
  () => import("@/components/PrimaryAlert/PrimaryAlert")
);

// Mock data for progress chart
const progressData = [
  { day: "Mon", weight: 200, reps: 30 },
  { day: "Tue", weight: 220, reps: 28 },
  { day: "Wed", weight: 230, reps: 32 },
  { day: "Thu", weight: 240, reps: 30 },
  { day: "Fri", weight: 250, reps: 34 },
  { day: "Sat", weight: 260, reps: 32 },
  { day: "Sun", weight: 270, reps: 35 },
];

const AiInsightItem = ({
  Icon,
  description,
  title,
}: {
  Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  title: string;
  description: string;
}) => {
  return (
    <PrimaryAlert title={title} description={description} Icon={Icon} alertClassName="bg-[#2A2A2A] border-orange-500"/>
  );
};

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
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [chartMetric] = useState<"weight" | "reps">("weight");

  const { data: workouts } = useQuery({
    queryKey: ["get-recent-workouts"],
    queryFn: getWorkout,
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
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-gray-400">
            Track your progress and stay on top of your workouts.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-4 md:mt-0">
          <PrimaryPopOver
            btn={() => (
              <Button
                variant={"outline"}
                className={cn(
                  "w-[240px] justify-start text-left font-normal bg-[#2A2A2A] text-white",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            )}
          >
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PrimaryPopOver>
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
        </div>
      </div>

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
          <PrimaryCard title="Weekly Progress">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={progressData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="day" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1E1E1E",
                      border: "none",
                    }}
                    itemStyle={{ color: "#00BFFF" }}
                  />
                  <Line
                    type="monotone"
                    dataKey={chartMetric}
                    stroke="#00BFFF"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </PrimaryCard>

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
          <PrimaryCard title="AI Insights">
            <div className="flex flex-col space-y-4">
              <AiInsightItem
                Icon={AlertTriangle}
                title="Plateau Detected"
                description="No progress in Squats for 2 weeks. Consider adjusting weight
                  or reps."
              />
              <AiInsightItem
                Icon={Zap}
                title="Workout Suggestion"
                description="Try increasing Bench Press weight by 2.5kg next session for
                  progressive overload."
              />
              <AiInsightItem
                Icon={AlertTriangle}
                title="Recovery Alert"
                description="You've worked out 6 days in a row. Consider taking a rest day
                  for better recovery."
              />
            </div>
          </PrimaryCard>
        </div>
      </LayoutGridWrapper>
    </UiLayout>
  );
}
