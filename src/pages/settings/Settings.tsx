import { lazy, useState } from "react";
import { Button } from "@/components/ui/button";
import { CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { PrimaryCard } from "@/components";
const UiLayout = lazy(() => import("@/layout/UiLayout"));
const LayoutGridWrapper = lazy(() => import("@/Wrappers/LayoutGridWrapper"));
const PrimarySelect = lazy(
  () => import("@/components/PrimarySelect/PrimarySelect")
);

const reminderTimes = [
  {
    key: "Morning (8:00 AM)",
    value: "morning",
  },
  {
    key: "Afternoon (2:00 PM)",
    value: "afternoon",
  },
  {
    key: "Evening (7:00 PM)",
    value: "evening",
  },
];

export default function Settings() {
  const [workoutReminder, setWorkoutReminder] = useState(true);
  const [remiderTime, setRemiderTime] = useState("");

  return (
    <UiLayout>
      <h1 className="mb-2 text-3xl font-bold text-white">Settings</h1>
      <p className="mb-8 text-gray-400">
        Manage your preferences and account settings.
      </p>

      <LayoutGridWrapper Cols={2}>
        {/* Profile & Account Settings */}

        {/* Notifications & Preferences */}
        <div className="space-y-8">
          <PrimaryCard title="Notifications & Preferences">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Workout Reminders</Label>
                  <CardDescription>
                    Receive daily workout reminders
                  </CardDescription>
                </div>
                <Switch
                  checked={workoutReminder}
                  onCheckedChange={setWorkoutReminder}
                />
              </div>
              {workoutReminder && (
                <div className="ml-6 space-y-2">
                  <PrimarySelect
                    data={reminderTimes}
                    label="Reminder Time"
                    onValueChange={setRemiderTime}
                    value={remiderTime}
                    placeholder="Select time"
                  />
                </div>
              )}
              <Separator />
              <div className="space-y-2">
                <Label>Progress & AI Alerts</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="plateau" />
                    <label
                      htmlFor="plateau"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Plateau Alerts
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="goals" />
                    <label
                      htmlFor="goals"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Goal Tracking Alerts
                    </label>
                  </div>
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <Label>Email Notifications</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="weekly-report" />
                    <label
                      htmlFor="weekly-report"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Receive weekly progress reports
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="tips-updates" />
                    <label
                      htmlFor="tips-updates"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Receive special training tips & updates
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </PrimaryCard>
        </div>
      </LayoutGridWrapper>

      <div className="flex justify-end space-x-4 mt-4 md:mt-0">
        <Button variant="destructive">Reset to Default</Button>
        <Button variant="secondary">Save Changes</Button>
      </div>
    </UiLayout>
  );
}
