import { lazy, useState } from "react";
import { format, subDays, addDays } from "date-fns";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { CalendarIcon, Download, Share2, Target } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
const UiLayout = lazy(() => import("@/layout/UiLayout"));
const LayoutGridWrapper = lazy(() => import("@/Wrappers/LayoutGridWrapper"));
const PrimaryCard = lazy(() => import("@/components/PrimaryCard/PrimaryCard"));
const PrimaryPopover = lazy(
  () => import("@/components/PrimaryPopOver/PrimaryPopOver")
);
const PrimaryAlert = lazy(
  () => import("@/components/PrimaryAlert/PrimaryAlert")
);
const PrimarySelect = lazy(() => import("@/components/PrimarySelect/PrimarySelect"));

// Mock data for the progress chart
const generateMockData = (days: number) => {
  const data = [];
  const startDate = subDays(new Date(), days - 1);
  for (let i = 0; i < days; i++) {
    const date = addDays(startDate, i);
    data.push({
      date: format(date, "MMM dd"),
      weight: Math.floor(Math.random() * 20) + 80,
      reps: Math.floor(Math.random() * 5) + 8,
    });
  }
  return data;
};

const exercises = [
  "Bench Press",
  "Squats",
  "Deadlifts",
  "Shoulder Press",
  "Bicep Curls",
];

export default function Progress() {
  const [selectedExercise, setSelectedExercise] = useState(exercises[0]);
  const [dateRange, setDateRange] = useState("30");
  const [showWeight, setShowWeight] = useState(true);
  const [date, setDate] = useState<Date>();
  const [chartType, setChartType] = useState<"line" | "bar">("line");

  const data = generateMockData(Number.parseInt(dateRange));

  return (
    <UiLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Progress Tracker</h1>
        <p className="text-gray-400">
          Analyze your workout performance over time.
        </p>
      </div>

      <LayoutGridWrapper Cols={2}>
        <div className="space-y-8">
          {/* Filters */}
          <PrimaryCard cardContentClassName="p-6">
            <div className="flex flex-wrap gap-4">
              <div className="w-full sm:w-auto">
                <PrimarySelect 
                  data={exercises}
                  label="Select Exercise"
                  placeholder="Select exercise"
                  onValueChange={setSelectedExercise}
                  value={selectedExercise}
                />
                {/* <Label
                  htmlFor="exercise-select"
                  className="text-white mb-2 block"
                >
                  Select Exercise
                </Label>
                <Select
                  value={selectedExercise}
                  onValueChange={setSelectedExercise}
                >
                  <SelectTrigger
                    id="exercise-select"
                    className="w-full sm:w-[180px] bg-[#2A2A2A] text-white"
                  >
                    <SelectValue placeholder="Select exercise" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#2A2A2A] text-white">
                    {exercises.map((exercise) => (
                      <SelectItem key={exercise} value={exercise}>
                        {exercise}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select> */}
              </div>
              <div className="w-full sm:w-auto">
                <Label htmlFor="date-range" className="text-white mb-2 block">
                  Date Range
                </Label>
                <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger
                    id="date-range"
                    className="w-full sm:w-[180px] bg-[#2A2A2A] text-white"
                  >
                    <SelectValue placeholder="Select date range" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#2A2A2A] text-white">
                    <SelectItem value="7">Last 7 days</SelectItem>
                    <SelectItem value="30">Last 30 days</SelectItem>
                    <SelectItem value="90">Last 90 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full sm:w-auto flex items-end">
                <PrimaryPopover
                  btn={() => (
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full sm:w-[200px] justify-start text-left font-normal bg-[#2A2A2A] text-white",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Custom range</span>}
                    </Button>
                  )}
                >
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PrimaryPopover>
              </div>
            </div>
          </PrimaryCard>

          {/* Progress Visualization */}
          <PrimaryCard title={` ${selectedExercise} Progress`}>
            <div className="flex justify-between items-center mb-4">
              <div className="space-x-2">
                <Switch
                  id="weight-toggle"
                  checked={showWeight}
                  onCheckedChange={setShowWeight}
                />
                <Label htmlFor="weight-toggle" className="text-white">
                  {showWeight ? "Weight" : "Reps"}
                </Label>
              </div>
              <div className="space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setChartType("line")}
                  className={cn(
                    "bg-[#2A2A2A] text-white",
                    chartType === "line" && "bg-[#00BFFF]"
                  )}
                >
                  Line
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setChartType("bar")}
                  className={cn(
                    "bg-[#2A2A2A] text-white",
                    chartType === "bar" && "bg-[#00BFFF]"
                  )}
                >
                  Bar
                </Button>
              </div>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                {chartType === "line" ? (
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="date" stroke="#888" />
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
                      dataKey={showWeight ? "weight" : "reps"}
                      stroke="#00BFFF"
                      strokeWidth={2}
                    />
                  </LineChart>
                ) : (
                  <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="date" stroke="#888" />
                    <YAxis stroke="#888" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1E1E1E",
                        border: "none",
                      }}
                      itemStyle={{ color: "#00BFFF" }}
                    />
                    <Bar
                      dataKey={showWeight ? "weight" : "reps"}
                      fill="#00BFFF"
                    />
                  </BarChart>
                )}
              </ResponsiveContainer>
            </div>
          </PrimaryCard>

          {/* Weekly Progress Comparison */}
          <PrimaryCard title="Weekly Progress">
            <div className="space-y-2">
              <p className="text-green-400">
                You lifted 10% more weight this week compared to last.
              </p>
              <p className="text-blue-400">
                Reps increased by 5 on average in the last 7 days.
              </p>
            </div>
          </PrimaryCard>
        </div>

        <div className="space-y-8">
          {/* Personal Best Achievements */}
          <PrimaryCard title="Personal Bests">
            <div className="space-y-4">
              <div>
                <Label className="text-gray-400">Heaviest Weight Lifted</Label>
                <p className="text-2xl font-bold text-white">
                  100 kg{" "}
                  <span className="text-sm text-gray-400">
                    ({selectedExercise})
                  </span>
                </p>
              </div>
              <div>
                <Label className="text-gray-400">Max Reps in Single Set</Label>
                <p className="text-2xl font-bold text-white">
                  15 reps{" "}
                  <span className="text-sm text-gray-400">
                    ({selectedExercise})
                  </span>
                </p>
              </div>
              <div>
                <Label className="text-gray-400">Longest Workout Streak</Label>
                <p className="text-2xl font-bold text-white">14 days</p>
              </div>
            </div>
          </PrimaryCard>

          {/* AI-Based Insights & Recommendations */}
          <PrimaryCard title="AI Insights" cardContentClassName="space-y-4">
            <PrimaryAlert
              title="Plateau Detected"
              description="No progress detected in Deadlifts for 2 weeks. Consider adjusting sets or weight."
            />
            <PrimaryAlert
              title="Workout Suggestion"
              description="Try increasing weight by 2.5kg next session for progressive overload."
            />
            <PrimaryAlert
              title="Recovery Alert"
              description="You've worked out 6 days in a row. Consider a rest day for
                optimal muscle recovery."
            />
          </PrimaryCard>

          {/* Quick Actions */}
          <PrimaryCard title="Quick Actions" cardContentClassName="space-y-4">
            <Button className="w-full bg-[#2A2A2A] text-white hover:bg-[#3A3A3A]">
              <Download className="mr-2 h-4 w-4" /> Download Report
            </Button>
            <Button className="w-full bg-[#2A2A2A] text-white hover:bg-[#3A3A3A]">
              <Share2 className="mr-2 h-4 w-4" /> Share Progress
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
