import { lazy, useState } from "react";
import { Download, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useQuery } from "@tanstack/react-query";
import {
  getPersonalBest,
  getProgressGraph,
  getWeeklyProgress,
} from "@/Api/progress";
import { useSelectExercise } from "@/hooks";
const UiLayout = lazy(() => import("@/layout/UiLayout"));
const LayoutGridWrapper = lazy(() => import("@/Wrappers/LayoutGridWrapper"));
const PrimaryCard = lazy(() => import("@/components/PrimaryCard/PrimaryCard"));
const PrimarySelect = lazy(
  () => import("@/components/PrimarySelect/PrimarySelect")
);
const LayoutContentWrapper = lazy(
  () => import("@/Wrappers/LayoutContentWrapper")
);
const AiInsights = lazy(() => import("@/Fragments/AiInsights"));
const ProgressGraphFrag = lazy(() => import("@/Fragments/ProgressGraphFrag"));

const dateRanges = [
  {
    key: "Last 7 days",
    value: "7",
  },
  {
    key: "Last 30 days",
    value: "30",
  },
  {
    key: "Last 90 days",
    value: "90",
  },
];

const _RenderPersonalBest = ({
  heading,
  value,
  exercise,
  unit,
}: {
  heading: string;
  value: string;
  exercise?: string | undefined;
  unit: string | undefined;
}) => {
  return (
    <div>
      <Label className="text-gray-400">{heading}</Label>
      <p className="text-2xl font-bold text-white">
        {value} {unit}{" "}
        <span className="text-sm text-gray-400">({exercise})</span>
      </p>
    </div>
  );
};

export default function Progress() {
  const {
    BDData,
    EQData,
    EXData,
    selectedBodyPart,
    selectedEquipment,
    setSelectedBodyPart,
    setSelectedEquipment,
    selectedExercise,
    setSelectedExercise,
  } = useSelectExercise();
  const [dateRange, setDateRange] = useState<string>("30");

  const { data: personalBest } = useQuery({
    queryKey: ["persoanl-best"],
    queryFn: getPersonalBest,
  });

  const { data: weeklyProgress } = useQuery({
    queryKey: ["weekly-progress"],
    queryFn: getWeeklyProgress,
  });

  const { data: ProgressGraph } = useQuery({
    queryKey: ["getProgressGraph"],
    queryFn: () => getProgressGraph(selectedExercise),
    enabled: !!selectedExercise,
  });

  

  return (
    <UiLayout>
      <LayoutContentWrapper
        header="Progress Tracker"
        des="Analyze your workout performance over time."
      />

      <LayoutGridWrapper Cols={2}>
        <div className="space-y-8">
          {/* Filters */}
          <PrimaryCard cardContentClassName="p-6">
            <div className="flex flex-wrap gap-4">
              <div className="w-full sm:w-auto">
                <PrimarySelect
                  data={BDData}
                  label="Select Body Part"
                  placeholder="Select Body Part"
                  onValueChange={setSelectedBodyPart}
                  value={selectedBodyPart}
                />
              </div>
              <div className="w-full sm:w-auto">
                <PrimarySelect
                  data={EQData}
                  label="Select Equipment"
                  placeholder="Select Equipment"
                  onValueChange={setSelectedEquipment}
                  value={selectedEquipment}
                />
              </div>
              <div className="w-full sm:w-auto">
                <PrimarySelect
                  data={EXData}
                  label="Select Exercise"
                  placeholder="Select exercise"
                  onValueChange={setSelectedExercise}
                  value={selectedExercise}
                />
              </div>
              <div className="w-full sm:w-auto">
                <PrimarySelect
                  data={dateRanges}
                  label="Date Range"
                  onValueChange={setDateRange}
                  placeholder="Select date range"
                  value={dateRange}
                />
              </div>
              {/* aur inputs */}
            </div>
          </PrimaryCard>

          {/* Progress Visualization */}

          <ProgressGraphFrag
            data={ProgressGraph}
            selectedExercise={` ${selectedExercise} Progress`}
          />

          {/* Weekly Progress Comparison */}
          <PrimaryCard title="Weekly Progress">
            <div className="space-y-2">
              <p className="text-green-400">
                {weeklyProgress?.data.weightProgress}
              </p>
              <p className="text-blue-400">
                {weeklyProgress?.data.repsProgress}
              </p>
            </div>
          </PrimaryCard>
        </div>

        <div className="space-y-8">
          {/* Personal Best Achievements */}
          <PrimaryCard title="Personal Bests">
            <div className="space-y-4">
              <_RenderPersonalBest
                heading="Heaviest Weight Lifted"
                value={String(personalBest?.heaviestWeight.weight)}
                exercise={personalBest?.heaviestWeight.exercise}
                unit={personalBest?.heaviestWeight.unit}
              />
              <_RenderPersonalBest
                heading="Max Reps in Single Set"
                value={String(personalBest?.maxReps.reps)}
                exercise={personalBest?.maxReps.exercise}
                unit="Reps"
              />

              <_RenderPersonalBest
                heading="Longest Workout Streak"
                value={String(personalBest?.longestStreak)}
                exercise={String(personalBest?.longestStreak)}
                unit="Days"
              />
            </div>
          </PrimaryCard>

          {/* AI-Based Insights & Recommendations */}
          <AiInsights />

          {/* Quick Actions */}
          <PrimaryCard title="Quick Actions" cardContentClassName="space-y-4">
            <Button className="w-full bg-[#2A2A2A] text-white hover:bg-[#3A3A3A]">
              <Download className="mr-2 h-4 w-4" /> Download Report
            </Button>
            <Button className="w-full bg-[#00BFFF] text-white hover:bg-[#00A0D0]">
              <Target className="mr-2 h-4 w-4" /> Set New Goal
            </Button>
          </PrimaryCard>
        </div>
      </LayoutGridWrapper>
    </UiLayout>
  );
}