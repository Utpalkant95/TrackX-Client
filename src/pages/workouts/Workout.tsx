import { useState } from "react";
import { format } from "date-fns";
import {
  CalendarIcon,
  Edit2,
  Trash2,
  Repeat,
  ClipboardList,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useQuery } from "@tanstack/react-query";
import { getWorkout, getWorkoutsStats } from "@/Api/workout";
import { IWorkoutData } from "@/Api/interfaces/Response";

// Mock data for exercises
const exercises = [
  { id: 1, name: "Bench Press", image: "/exercises/bench-press.png" },
  { id: 2, name: "Squats", image: "/exercises/squats.png" },
  { id: 3, name: "Deadlifts", image: "/exercises/deadlifts.png" },
  { id: 4, name: "Shoulder Press", image: "/exercises/shoulder-press.png" },
  { id: 5, name: "Bicep Curls", image: "/exercises/bicep-curls.png" },
];

interface Set {
  weight: number;
  reps: number;
  difficulty: "easy" | "hard";
}

interface Exercise {
  name: string;
  sets: Set[];
}

interface Workout {
  date: Date;
  exercises: Exercise[];
}

const RenderWorkoutStatsElement = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => {
  return (
    <div>
      <Label className="text-gray-400">{label}</Label>
      <p className="text-2xl font-bold">{String(value)}</p>
    </div>
  );
};

export default function Workouts() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isLoggingWorkout, setIsLoggingWorkout] = useState(false);
  const [currentWorkout, setCurrentWorkout] = useState<Workout>({
    date: new Date(),
    exercises: [
      { name: "", sets: [{ weight: 0, reps: 0, difficulty: "easy" }] },
    ],
  });

  const { data } = useQuery({
    queryKey: ["workouts"],
    queryFn: getWorkout,
  });

  const { data: workoutStats } = useQuery({
    queryKey: ["workouts-stats"],
    queryFn: getWorkoutsStats,
  });

  console.log("workoutStats", workoutStats);
  

  const addExercise = () => {
    setCurrentWorkout((prev) => ({
      ...prev,
      exercises: [
        ...prev.exercises,
        { name: "", sets: [{ weight: 0, reps: 0, difficulty: "easy" }] },
      ],
    }));
  };

  const addSet = (exerciseIndex: number) => {
    setCurrentWorkout((prev) => {
      const newExercises = [...prev.exercises];
      newExercises[exerciseIndex].sets.push({
        weight: 0,
        reps: 0,
        difficulty: "easy",
      });
      return { ...prev, exercises: newExercises };
    });
  };

  const updateExercise = (
    exerciseIndex: number,
    field: string,
    value: string
  ) => {
    setCurrentWorkout((prev) => {
      const newExercises = [...prev.exercises];
      newExercises[exerciseIndex] = {
        ...newExercises[exerciseIndex],
        [field]: value,
      };
      return { ...prev, exercises: newExercises };
    });
  };

  const updateSet = (
    exerciseIndex: number,
    setIndex: number,
    field: keyof Set,
    value: number | string
  ) => {
    setCurrentWorkout((prev) => {
      const newExercises = [...prev.exercises];
      newExercises[exerciseIndex].sets[setIndex] = {
        ...newExercises[exerciseIndex].sets[setIndex],
        [field]: field === "difficulty" ? value : Number(value),
      };
      return { ...prev, exercises: newExercises };
    });
  };

  const saveWorkout = () => {
    console.log("Saving workout:", currentWorkout);
    setIsLoggingWorkout(false);
    // Here you would typically send the workout data to your backend
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-[#121212] min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Workouts</h1>
          <p className="text-gray-400">
            Log new workouts and track your exercise history.
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Popover>
            <PopoverTrigger asChild>
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
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-[#2A2A2A]" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <Dialog open={isLoggingWorkout} onOpenChange={setIsLoggingWorkout}>
            <DialogTrigger asChild>
              <Button className="bg-[#00BFFF] text-white hover:bg-[#00A0D0]">
                Log New Workout
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#1E1E1E] text-white max-w-3xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Log New Workout</DialogTitle>
                <DialogDescription>
                  Record your exercises, sets, and reps for this workout
                  session.
                </DialogDescription>
              </DialogHeader>
              <ScrollArea className="h-[60vh] pr-4">
                {currentWorkout.exercises.map((exercise, exerciseIndex) => (
                  <Card
                    key={exerciseIndex}
                    className="mb-4 bg-[#2A2A2A] border-none"
                  >
                    <CardHeader>
                      <CardTitle className="text-lg">
                        Exercise {exerciseIndex + 1}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <Select
                          value={exercise.name}
                          onValueChange={(value) =>
                            updateExercise(exerciseIndex, "name", value)
                          }
                        >
                          <SelectTrigger className="w-full bg-[#3A3A3A] text-white">
                            <SelectValue placeholder="Select an exercise" />
                          </SelectTrigger>
                          <SelectContent className="bg-[#3A3A3A] text-white">
                            {exercises.map((ex) => (
                              <SelectItem key={ex.id} value={ex.name}>
                                <div className="flex items-center">
                                  <img
                                    src={ex.image || "/placeholder.svg"}
                                    alt={ex.name}
                                    className="w-6 h-6 mr-2 rounded"
                                  />
                                  {ex.name}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {exercise.sets.map((set, setIndex) => (
                          <div
                            key={setIndex}
                            className="flex items-center space-x-2"
                          >
                            <Input
                              type="number"
                              placeholder="Weight"
                              value={set.weight}
                              onChange={(e) =>
                                updateSet(
                                  exerciseIndex,
                                  setIndex,
                                  "weight",
                                  e.target.value
                                )
                              }
                              className="w-24 bg-[#3A3A3A] text-white"
                            />
                            <Input
                              type="number"
                              placeholder="Reps"
                              value={set.reps}
                              onChange={(e) =>
                                updateSet(
                                  exerciseIndex,
                                  setIndex,
                                  "reps",
                                  e.target.value
                                )
                              }
                              className="w-24 bg-[#3A3A3A] text-white"
                            />
                            <div className="flex items-center space-x-2">
                              <Switch
                                id={`difficulty-${exerciseIndex}-${setIndex}`}
                                checked={set.difficulty === "hard"}
                                onCheckedChange={(checked) =>
                                  updateSet(
                                    exerciseIndex,
                                    setIndex,
                                    "difficulty",
                                    checked ? "hard" : "easy"
                                  )
                                }
                              />
                              <Label
                                htmlFor={`difficulty-${exerciseIndex}-${setIndex}`}
                              >
                                {set.difficulty === "hard" ? "Hard" : "Easy"}
                              </Label>
                            </div>
                          </div>
                        ))}
                        <Button
                          onClick={() => addSet(exerciseIndex)}
                          variant="outline"
                          className="w-full"
                        >
                          + Add Another Set
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                <Button
                  onClick={addExercise}
                  variant="outline"
                  className="w-full mb-4"
                >
                  + Add Another Exercise
                </Button>
              </ScrollArea>
              <DialogFooter>
                <Button
                  onClick={saveWorkout}
                  className="bg-[#00BFFF] text-white hover:bg-[#00A0D0]"
                >
                  Save Workout
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-8">
          {/* Past Workout History */}
          <Card className="bg-[#1E1E1E] text-white">
            <CardHeader>
              <CardTitle>Workout History</CardTitle>
              <CardDescription>
                View and edit your past workouts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {data?.data?.map((workout: IWorkoutData | undefined) => (
                  <AccordionItem
                    key={workout?._id}
                    value={`workout-${workout?._id}`}
                  >
                    <AccordionTrigger className="text-left">
                      <div className="flex justify-between items-center w-full">
                        <span>
                          {format(
                            new Date(workout?.date as string),
                            "MMMM d, yyyy"
                          )}
                        </span>
                        <Badge variant="secondary">
                          {workout?.exercises.length} exercises
                        </Badge>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      {workout?.exercises.map((exercise, index) => (
                        <div key={index} className="mb-2">
                          <h4 className="font-semibold">{exercise.name}</h4>
                          <p className="text-sm text-gray-400">
                            {exercise.sets.map((set, setIndex) => (
                              <span key={setIndex}>
                                {set.weight}kg x {set.reps}
                                {setIndex < exercise.sets.length - 1
                                  ? ", "
                                  : ""}
                              </span>
                            ))}
                          </p>
                        </div>
                      ))}
                      <div className="flex justify-end space-x-2 mt-2">
                        <Button variant="outline" size="sm">
                          <Edit2 className="w-4 h-4 mr-1" /> Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-500 hover:text-red-600"
                        >
                          <Trash2 className="w-4 h-4 mr-1" /> Delete
                        </Button>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          {/* Quick Workout Stats */}
          <Card className="bg-[#1E1E1E] text-white">
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <RenderWorkoutStatsElement
                label="Total Weight Lifted"
                value={String(workoutStats?.totalWorkouts)}
              />
              <RenderWorkoutStatsElement
                label="Most Frequent Exercise"
                value={String(workoutStats?.mostFrequentExercise)}
              />
              <RenderWorkoutStatsElement
                label="Total Weight Lifted (Last 7 Days)"
                value={String(workoutStats?.totalWeightLifted + " kg")}
              />
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-[#1E1E1E] text-white">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full bg-[#2A2A2A] text-white hover:bg-[#3A3A3A]">
                <Repeat className="mr-2 h-4 w-4" /> Repeat Last Workout
              </Button>
              <Button className="w-full bg-[#2A2A2A] text-white hover:bg-[#3A3A3A]">
                <ClipboardList className="mr-2 h-4 w-4" /> Import from Templates
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
