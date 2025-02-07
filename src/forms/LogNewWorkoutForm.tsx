import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useLogNewWorkout } from "@/hooks";
import { Select } from "@radix-ui/react-select";
import { Plus, X } from "lucide-react";
// import { useState } from "react";

// Mock data for exercises
const exerciseList = [
  { id: 1, name: "Squats", image: "/exercises/squats.png" },
  { id: 2, name: "Bench Press", image: "/exercises/bench-press.png" },
  { id: 3, name: "Deadlifts", image: "/exercises/deadlifts.png" },
  { id: 4, name: "Shoulder Press", image: "/exercises/shoulder-press.png" },
  { id: 5, name: "Bicep Curls", image: "/exercises/bicep-curls.png" },
];

const LogNewWorkoutForm = ({refetch} : {refetch : () => void}) => {
  const { formik, isPending } = useLogNewWorkout({refetch : refetch});

  // Function to add a new exercise
  const addExercise = () => {
    formik.setFieldValue("exercises", [
      ...formik.values.exercises,
      { name: "", sets: [{ weight: 0, reps: 1, difficulty: "Easy" }] },
    ]);
  };

  // Function to add a new set for a specific exercise
  const addSet = (exerciseIndex: number) => {
    formik.setFieldValue(`exercises.${exerciseIndex}.sets`, [
      ...formik.values.exercises[exerciseIndex].sets,
      { weight: 0, reps: 1, difficulty: "Easy" },
    ]);
  };

  // Function to remove a set for a specific exercise
  const removeSet = (exerciseIndex: number, setIndex: number) => {
    const newSets = [...formik.values.exercises[exerciseIndex].sets];
    newSets.splice(setIndex, 1);
    formik.setFieldValue(`exercises.${exerciseIndex}.sets`, newSets);
  };

  // Function to remove an exercise
  const removeExercise = (exerciseIndex: number) => {
    formik.setFieldValue(
      "exercises",
      formik.values.exercises.filter((_, index) => index !== exerciseIndex)
    );
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <DialogContent className="bg-[#1E1E1E] text-white">
        <DialogHeader>
          <DialogTitle>Log New Workout</DialogTitle>
          <DialogDescription>
            Record your exercises, sets, and reps for this workout session.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh] pr-4">
          <div className="space-y-4 py-4">
            {formik.values.exercises.map((exercise, exerciseIndex) => (
              <Card key={exerciseIndex} className="bg-[#2A2A2A] p-4">
                <div className="mb-4 flex items-center justify-between">
                  <Label>Exercise {exerciseIndex + 1}</Label>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeExercise(exerciseIndex)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <Select
                  onValueChange={(value) =>
                    formik.setFieldValue(
                      `exercises.${exerciseIndex}.name`,
                      value
                    )
                  }
                  value={exercise.name}
                >
                  <SelectTrigger className="mb-4 bg-[#3A3A3A] text-white">
                    <SelectValue placeholder="Select exercise" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#3A3A3A] text-white">
                    {exerciseList.map((ex) => (
                      <SelectItem key={ex.id} value={ex.name}>
                        <div className="flex items-center">
                          <img
                            src={ex.image || "/placeholder.svg"}
                            alt={ex.name}
                            className="mr-2 h-6 w-6 rounded"
                          />
                          {ex.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {exercise.sets.map((set, setIndex) => (
                  <div key={setIndex} className="mb-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Set {setIndex + 1}</Label>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeSet(exerciseIndex, setIndex)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label htmlFor={`weight-${exerciseIndex}-${setIndex}`}>
                          Weight (kg)
                        </Label>
                        <Input
                          type="number"
                          value={set.weight}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          name={`exercises.${exerciseIndex}.sets.${setIndex}.weight`}
                          className="bg-[#3A3A3A] text-white"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`reps-${exerciseIndex}-${setIndex}`}>
                          Reps
                        </Label>
                        <Input
                          type="number"
                          value={set.reps}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          name={`exercises.${exerciseIndex}.sets.${setIndex}.reps`}
                          className="bg-[#3A3A3A] text-white"
                        />
                      </div>
                    </div>
                    <div>
                      <Label>Difficulty</Label>
                      <Slider
                        min={1}
                        max={3}
                        step={1}
                        value={[
                          ["Easy", "Medium", "Hard"].indexOf(set.difficulty) +
                            1,
                        ]}
                        onValueChange={(value) => {
                          formik.setFieldValue(
                            `exercises.${exerciseIndex}.sets.${setIndex}.difficulty`,
                            ["Easy", "Medium", "Hard"][value[0] - 1]
                          );
                        }}
                        className="py-4"
                      />
                    </div>
                  </div>
                ))}
                <Button
                  onClick={() => addSet(exerciseIndex)}
                  variant="outline"
                  className="mt-2 w-full"
                >
                  <Plus className="mr-2 h-4 w-4" /> Add Another Set
                </Button>
              </Card>
            ))}
            <Button
              onClick={addExercise}
              variant="secondary"
              className="w-full"
            >
              <Plus className="mr-2 h-4 w-4" /> Add Another Exercise
            </Button>
          </div>
        </ScrollArea>
        <DialogFooter>
          <Button
            type="submit"
            className="bg-[#00BFFF] text-white hover:bg-[#00A0D0]"
            onClick={() => formik.handleSubmit()}
          >
            {isPending ? "Logging Workout..." : "Log Workout"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </form>
  );
};

export default LogNewWorkoutForm;
