import { lazy } from "react";
import { format } from "date-fns";
import { Edit2, Trash2, Repeat, ClipboardList } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  deleteWorkout,
  getWorkout,
  getWorkoutsStats,
  repeatLastWorkout,
} from "@/Api/workout";
import { IRES, IWorkoutData } from "@/Api/interfaces/Response";
import { enqueueSnackbar } from "notistack";
import { AxiosError } from "axios";

const LogNewWorkout = lazy(() => import("@/forms/LogNewWorkoutForm"));

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

  const { data, refetch } = useQuery({
    queryKey: ["workouts"],
    queryFn: getWorkout,
  });

  const { data: workoutStats } = useQuery({
    queryKey: ["workouts-stats"],
    queryFn: getWorkoutsStats,
  });

  const { mutate } = useMutation({
    mutationKey: ["delete workout"],
    mutationFn: deleteWorkout,
    onSuccess: (data: IRES) => {
      refetch();
      enqueueSnackbar(data.message, { variant: "success" });
    },
    onError: (error: AxiosError<IRES>) => {
      enqueueSnackbar(error.response?.data.message, { variant: "error" });
    },
  });

  const {
    mutate: repeatLastWorkoutMutate,
    isPending: repeatLastWorkoutIsPending,
  } = useMutation({
    mutationKey: ["repeat workout"],
    mutationFn: repeatLastWorkout,
    onSuccess : (data: IRES) => {
      refetch();
      enqueueSnackbar(data.message, { variant: "success" });
    },
    onError: (error: AxiosError<IRES>) => {
      enqueueSnackbar(error.response?.data.message, { variant: "error" });
    }
  });

  return (
    <div className="container mx-auto px-4 py-8 bg-[#121212] min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Workouts</h1>
          <p className="text-gray-400">
            Log new workouts and track your exercise history.
          </p>
        </div>

        <div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-[#00BFFF] text-white hover:bg-[#00A0D0]">
                Log New Workout
              </Button>
            </DialogTrigger>
            <LogNewWorkout refetch={refetch} />
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
                        <Button variant="secondary" size="sm">
                          <Edit2 className="w-4 h-4 mr-1" /> Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-500 hover:text-red-600"
                          onClick={() => mutate(workout?._id)}
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
              <Button
                className="w-full bg-[#2A2A2A] text-white hover:bg-[#3A3A3A]"
                onClick={() => repeatLastWorkoutMutate()}
              >
                <Repeat className="mr-2 h-4 w-4" />{" "}
                {repeatLastWorkoutIsPending
                  ? "Repeating..."
                  : "Repeat Last Workout"}
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
