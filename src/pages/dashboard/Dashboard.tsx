"use client"

import { useState } from "react"
import { format } from "date-fns"
import { CalendarIcon, Plus, ArrowRight, Dumbbell, Zap, Flame, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Mock data for recent workouts
const recentWorkouts = [
  {
    id: 1,
    date: "2025-01-28",
    exercises: [
      {
        name: "Bench Press",
        sets: [
          { weight: 60, reps: 10 },
          { weight: 65, reps: 8 },
          { weight: 70, reps: 6 },
        ],
      },
      {
        name: "Squats",
        sets: [
          { weight: 80, reps: 12 },
          { weight: 90, reps: 10 },
          { weight: 100, reps: 8 },
        ],
      },
    ],
  },
  {
    id: 2,
    date: "2025-01-26",
    exercises: [
      {
        name: "Deadlifts",
        sets: [
          { weight: 100, reps: 8 },
          { weight: 110, reps: 6 },
          { weight: 120, reps: 4 },
        ],
      },
      {
        name: "Pull-ups",
        sets: [
          { weight: 0, reps: 12 },
          { weight: 0, reps: 10 },
          { weight: 0, reps: 8 },
        ],
      },
    ],
  },
  {
    id: 3,
    date: "2025-01-24",
    exercises: [
      {
        name: "Shoulder Press",
        sets: [
          { weight: 40, reps: 10 },
          { weight: 45, reps: 8 },
          { weight: 50, reps: 6 },
        ],
      },
      {
        name: "Bicep Curls",
        sets: [
          { weight: 20, reps: 12 },
          { weight: 22.5, reps: 10 },
          { weight: 25, reps: 8 },
        ],
      },
    ],
  },
]

// Mock data for progress chart
const progressData = [
  { day: "Mon", weight: 200, reps: 30 },
  { day: "Tue", weight: 220, reps: 28 },
  { day: "Wed", weight: 230, reps: 32 },
  { day: "Thu", weight: 240, reps: 30 },
  { day: "Fri", weight: 250, reps: 34 },
  { day: "Sat", weight: 260, reps: 32 },
  { day: "Sun", weight: 270, reps: 35 },
]

export default function Dashboard() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [chartMetric, setChartMetric] = useState<"weight" | "reps">("weight")

  return (
    <div className="container mx-auto px-4 py-8 bg-[#121212] min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-gray-400">Track your progress and stay on top of your workouts.</p>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-4 md:mt-0">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[240px] justify-start text-left font-normal bg-[#2A2A2A] text-white",
                  !date && "text-muted-foreground",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-[#2A2A2A]" align="start">
              <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
            </PopoverContent>
          </Popover>
          <div className="flex space-x-2">
            <Button className="bg-[#00BFFF] text-white hover:bg-[#00A0D0]">
              <Plus className="mr-2 h-4 w-4" /> Log Workout
            </Button>
            <Button variant="outline" className="bg-[#2A2A2A] text-white hover:bg-[#3A3A3A]">
              View Progress
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-8">
          {/* Today's Workout Plan */}
          <Card className="bg-[#1E1E1E] text-white">
            <CardHeader>
              <CardTitle>Today's Workout Plan</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400 mb-4">No workout scheduled for today.</p>
              <Button className="w-full bg-[#00BFFF] text-white hover:bg-[#00A0D0]">
                Quick Start Workout <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          {/* Recent Workouts */}
          <Card className="bg-[#1E1E1E] text-white">
            <CardHeader>
              <CardTitle>Recent Workouts</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px] pr-4">
                {recentWorkouts.map((workout) => (
                  <Card key={workout.id} className="mb-4 bg-[#2A2A2A] border-none">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{format(new Date(workout.date), "MMMM d, yyyy")}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {workout.exercises.map((exercise, index) => (
                        <div key={index} className="mb-2">
                          <p className="font-semibold">{exercise.name}</p>
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
                    </CardContent>
                  </Card>
                ))}
              </ScrollArea>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Repeat Last Workout
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="space-y-8">
          {/* Progress & Analytics Overview */}
          <Card className="bg-[#1E1E1E] text-white">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Weekly Progress</CardTitle>
                <Select value={chartMetric} onValueChange={(value: "weight" | "reps") => setChartMetric(value)}>
                  <SelectTrigger className="w-[120px] bg-[#2A2A2A] text-white">
                    <SelectValue placeholder="Select metric" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#2A2A2A] text-white">
                    <SelectItem value="weight">Weight</SelectItem>
                    <SelectItem value="reps">Reps</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={progressData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="day" stroke="#888" />
                    <YAxis stroke="#888" />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#1E1E1E", border: "none" }}
                      itemStyle={{ color: "#00BFFF" }}
                    />
                    <Line type="monotone" dataKey={chartMetric} stroke="#00BFFF" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Personal Bests */}
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
            <Card className="bg-[#1E1E1E] text-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  <Dumbbell className="h-4 w-4 inline-block mr-1" /> Heaviest Lift
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">120 kg</div>
                <p className="text-xs text-muted-foreground">Deadlift</p>
              </CardContent>
            </Card>
            <Card className="bg-[#1E1E1E] text-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  <Flame className="h-4 w-4 inline-block mr-1" /> Longest Streak
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">14 days</div>
                <p className="text-xs text-muted-foreground">Dec 1 - Dec 14</p>
              </CardContent>
            </Card>
            <Card className="bg-[#1E1E1E] text-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  <Zap className="h-4 w-4 inline-block mr-1" /> Most Frequent
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Bench Press</div>
                <p className="text-xs text-muted-foreground">3x per week</p>
              </CardContent>
            </Card>
          </div>

          {/* AI-Based Insights & Recommendations */}
          <Card className="bg-[#1E1E1E] text-white">
            <CardHeader>
              <CardTitle>AI Insights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert className="bg-[#2A2A2A] border-orange-500">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Plateau Detected</AlertTitle>
                <AlertDescription>
                  No progress in Squats for 2 weeks. Consider adjusting weight or reps.
                </AlertDescription>
              </Alert>
              <Alert className="bg-[#2A2A2A] border-green-500">
                <Zap className="h-4 w-4" />
                <AlertTitle>Workout Suggestion</AlertTitle>
                <AlertDescription>
                  Try increasing Bench Press weight by 2.5kg next session for progressive overload.
                </AlertDescription>
              </Alert>
              <Alert className="bg-[#2A2A2A] border-blue-500">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Recovery Alert</AlertTitle>
                <AlertDescription>
                  You've worked out 6 days in a row. Consider taking a rest day for better recovery.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

