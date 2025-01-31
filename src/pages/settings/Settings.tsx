"use client";

import { lazy, useState } from "react";
import { Button } from "@/components/ui/button";
import { CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

const ProfileSectionWrapperAtom = lazy(
  () => import("@/atmos/ProfileSectionWrapperAtom")
);

export default function Settings() {
  const [workoutReminder, setWorkoutReminder] = useState(true);

  return (
    <div className="container mx-auto px-4 py-8 h-[calc(100vh-64px)] ">
      <h1 className="mb-2 text-3xl font-bold text-white">Settings</h1>
      <p className="mb-8 text-gray-400">
        Manage your preferences and account settings.
      </p>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Profile & Account Settings */}

        {/* Notifications & Preferences */}
        <div className="space-y-8">
          <ProfileSectionWrapperAtom title="Notifications & Preferences">
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
                  <Label>Reminder Time</Label>
                  <Select>
                    <SelectTrigger className="w-full bg-[#2A2A2A] text-white">
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#2A2A2A] text-white">
                      <SelectItem value="morning">Morning (8:00 AM)</SelectItem>
                      <SelectItem value="afternoon">
                        Afternoon (2:00 PM)
                      </SelectItem>
                      <SelectItem value="evening">Evening (7:00 PM)</SelectItem>
                    </SelectContent>
                  </Select>
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
          </ProfileSectionWrapperAtom>
        </div>
      </div>

      <div className="flex justify-end space-x-4 mt-4 md:mt-0">
        <Button variant="destructive">Reset to Default</Button>
        <Button variant="secondary">Save Changes</Button>
      </div>
    </div>
  );
}