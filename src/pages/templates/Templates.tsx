"use client"

import { useState } from "react"
import { Plus, Pencil, Trash2, ChevronRight, Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"

// Mock data for saved templates
const savedTemplates = [
  { id: 1, name: "Leg Day Routine", exercises: 5 },
  { id: 2, name: "Upper Body Blast", exercises: 7 },
  { id: 3, name: "Full Body Workout", exercises: 10 },
]

// Mock data for exercises
const exercises = [
  { id: 1, name: "Squats", image: "/exercises/squats.png" },
  { id: 2, name: "Bench Press", image: "/exercises/bench-press.png" },
  { id: 3, name: "Deadlifts", image: "/exercises/deadlifts.png" },
  { id: 4, name: "Shoulder Press", image: "/exercises/shoulder-press.png" },
  { id: 5, name: "Bicep Curls", image: "/exercises/bicep-curls.png" },
]

interface Set {
  weight: number
  reps: number
  difficulty: number
}

interface Exercise {
  name: string
  sets: Set[]
}

interface Template {
  name: string
  exercises: Exercise[]
}

export default function Templates() {
  const [newTemplate, setNewTemplate] = useState<Template>({
    name: "",
    exercises: [{ name: "", sets: [{ weight: 0, reps: 0, difficulty: 1 }] }],
  })

  const addExercise = () => {
    setNewTemplate((prev) => ({
      ...prev,
      exercises: [...prev.exercises, { name: "", sets: [{ weight: 0, reps: 0, difficulty: 1 }] }],
    }))
  }

  const addSet = (exerciseIndex: number) => {
    setNewTemplate((prev) => {
      const updatedExercises = [...prev.exercises]
      updatedExercises[exerciseIndex].sets.push({ weight: 0, reps: 0, difficulty: 1 })
      return { ...prev, exercises: updatedExercises }
    })
  }

  const handleExerciseChange = (exerciseIndex: number, field: string, value: string) => {
    setNewTemplate((prev) => {
      const updatedExercises = [...prev.exercises]
      updatedExercises[exerciseIndex] = { ...updatedExercises[exerciseIndex], [field]: value }
      return { ...prev, exercises: updatedExercises }
    })
  }

  const handleSetChange = (exerciseIndex: number, setIndex: number, field: string, value: number) => {
    setNewTemplate((prev) => {
      const updatedExercises = [...prev.exercises]
      updatedExercises[exerciseIndex].sets[setIndex] = {
        ...updatedExercises[exerciseIndex].sets[setIndex],
        [field]: value,
      }
      return { ...prev, exercises: updatedExercises }
    })
  }

  const removeSet = (exerciseIndex: number, setIndex: number) => {
    setNewTemplate((prev) => {
      const updatedExercises = [...prev.exercises]
      updatedExercises[exerciseIndex].sets.splice(setIndex, 1)
      return { ...prev, exercises: updatedExercises }
    })
  }

  const removeExercise = (exerciseIndex: number) => {
    setNewTemplate((prev) => {
      const updatedExercises = [...prev.exercises]
      updatedExercises.splice(exerciseIndex, 1)
      return { ...prev, exercises: updatedExercises }
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="mb-2 text-3xl font-bold text-white">Workout Templates</h1>
          <p className="text-gray-400">Create and save your custom workout routines for quick logging.</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-[#00BFFF] text-white hover:bg-[#00A0D0]">
              <Plus className="mr-2 h-4 w-4" /> Create New Template
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#1E1E1E] text-white">
            <DialogHeader>
              <DialogTitle>Create New Template</DialogTitle>
              <DialogDescription>Create a new workout template with detailed set information.</DialogDescription>
            </DialogHeader>
            <ScrollArea className="max-h-[60vh] pr-4">
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="template-name">Template Name</Label>
                  <Input
                    id="template-name"
                    placeholder="e.g., Leg Day Routine"
                    value={newTemplate.name}
                    onChange={(e) => setNewTemplate((prev) => ({ ...prev, name: e.target.value }))}
                    className="bg-[#2A2A2A] text-white"
                  />
                </div>
                {newTemplate.exercises.map((exercise, exerciseIndex) => (
                  <Card key={exerciseIndex} className="bg-[#2A2A2A] p-4">
                    <div className="mb-4 flex items-center justify-between">
                      <Label>Exercise {exerciseIndex + 1}</Label>
                      <Button variant="ghost" size="icon" onClick={() => removeExercise(exerciseIndex)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <Select onValueChange={(value) => handleExerciseChange(exerciseIndex, "name", value)}>
                      <SelectTrigger className="mb-4 bg-[#3A3A3A] text-white">
                        <SelectValue placeholder="Select exercise" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#3A3A3A] text-white">
                        {exercises.map((ex) => (
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
                          <Button variant="ghost" size="icon" onClick={() => removeSet(exerciseIndex, setIndex)}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <Label htmlFor={`weight-${exerciseIndex}-${setIndex}`}>Weight (kg)</Label>
                            <Input
                              id={`weight-${exerciseIndex}-${setIndex}`}
                              type="number"
                              value={set.weight}
                              onChange={(e) =>
                                handleSetChange(exerciseIndex, setIndex, "weight", Number(e.target.value))
                              }
                              className="bg-[#3A3A3A] text-white"
                            />
                          </div>
                          <div>
                            <Label htmlFor={`reps-${exerciseIndex}-${setIndex}`}>Reps</Label>
                            <Input
                              id={`reps-${exerciseIndex}-${setIndex}`}
                              type="number"
                              value={set.reps}
                              onChange={(e) => handleSetChange(exerciseIndex, setIndex, "reps", Number(e.target.value))}
                              className="bg-[#3A3A3A] text-white"
                            />
                          </div>
                        </div>
                        <div>
                          <Label>Difficulty</Label>
                          <Slider
                            min={1}
                            max={5}
                            step={1}
                            value={[set.difficulty]}
                            onValueChange={(value) => handleSetChange(exerciseIndex, setIndex, "difficulty", value[0])}
                            className="py-4"
                          />
                        </div>
                      </div>
                    ))}
                    <Button onClick={() => addSet(exerciseIndex)} variant="outline" className="mt-2 w-full">
                      <Plus className="mr-2 h-4 w-4" /> Add Another Set
                    </Button>
                  </Card>
                ))}
                <Button onClick={addExercise} variant="outline" className="w-full">
                  <Plus className="mr-2 h-4 w-4" /> Add Another Exercise
                </Button>
              </div>
            </ScrollArea>
            <DialogFooter>
              <Button type="submit" className="bg-[#00BFFF] text-white hover:bg-[#00A0D0]">
                Save Template
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Saved Templates */}
        <div>
          <h2 className="mb-4 text-2xl font-semibold text-white">Saved Templates</h2>
          <div className="space-y-4">
            {savedTemplates.map((template) => (
              <Card key={template.id} className="bg-[#1E1E1E] text-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-lg font-medium">{template.name}</CardTitle>
                  <div className="flex space-x-2">
                    <Button size="icon" variant="ghost">
                      <Pencil className="h-4 w-4 text-[#00BFFF]" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button size="icon" variant="ghost">
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="bg-[#1E1E1E] text-white">
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your "{template.name}" template.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="bg-gray-800 text-white hover:bg-gray-700">
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction className="bg-red-600 text-white hover:bg-red-700">
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-400">{template.exercises} exercises</CardDescription>
                  <Button className="mt-2 w-full bg-[#00BFFF] text-white hover:bg-[#00A0D0]">
                    Apply Template <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Import from History */}
        <div>
          <h2 className="mb-4 text-2xl font-semibold text-white">Import from History</h2>
          <Card className="bg-[#1E1E1E] text-white">
            <CardHeader>
              <CardTitle>Create Template from Past Workout</CardTitle>
              <CardDescription>Select a past workout to create a new template.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                <Input placeholder="Search past workouts" className="bg-[#2A2A2A] pl-8 text-white" />
              </div>
              {/* Add a list or calendar component to show past workouts */}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}