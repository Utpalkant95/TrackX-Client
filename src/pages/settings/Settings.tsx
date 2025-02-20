import { lazy } from "react";
import { Button } from "@/components/ui/button";
import { CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { PrimaryCard } from "@/components";
import { useUserSettings } from "@/hooks";
import { useQuery } from "@tanstack/react-query";
import { getUserSetting } from "@/Api/userSetting";
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

  const { data } = useQuery({
    queryKey: ["userSettings"],
    queryFn: getUserSetting,
  });
  
  const {
    formik,
    isResetPending,
    isSavePending,
    resetUserSettingMutate,
  } = useUserSettings({data});

  console.log(data);
  

  return (
    <UiLayout>
      <h1 className="mb-2 text-3xl font-bold text-white">Settings</h1>
      <p className="mb-8 text-gray-400">
        Manage your preferences and account settings.
      </p>

      <form onSubmit={formik.handleSubmit}>
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
                    name="workoutReminder"
                    checked={
                      formik.values.workoutReminder.workoutReminder ||
                      data?.workoutReminder?.workoutReminder
                    }
                    onCheckedChange={(value) =>
                      formik.setFieldValue(
                        "workoutReminder.workoutReminder",
                        value
                      )
                    }
                  />
                </div>
                {formik.values.workoutReminder.workoutReminder && (
                  <div className="ml-6 space-y-2">
                    <PrimarySelect
                      data={reminderTimes}
                      label="Reminder Time"
                      onValueChange={(value) =>
                        formik.setFieldValue(
                          "workoutReminder.reminderTime",
                          value
                        )
                      }
                      value={
                        (formik.values.workoutReminder
                          .reminderTime as string) ||
                        (data?.workoutReminder.reminderTime as string)
                      }
                      placeholder="Select time"
                    />
                  </div>
                )}
                <Separator />
                <div className="space-y-2">
                  <Label>Progress & AI Alerts</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="plateau"
                        onCheckedChange={(value) =>
                          formik.setFieldValue(
                            "progessAiAlerts.plateauAlerts",
                            value
                          )
                        }
                        checked={
                          formik.values.progessAiAlerts.plateauAlerts ||
                          data?.progessAiAlerts.plateauAlerts
                        }
                      />
                      <label
                        htmlFor="plateau"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Plateau Alerts
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="goals"
                        onCheckedChange={(value) =>
                          formik.setFieldValue(
                            "progessAiAlerts.goalTrackingAlerts",
                            value
                          )
                        }
                        checked={
                          formik.values.progessAiAlerts.goalTrackingAlerts ||
                          data?.progessAiAlerts.goalTrackingAlerts
                        }
                      />
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
                      <Checkbox
                        id="weekly-report"
                        onCheckedChange={(value) =>
                          formik.setFieldValue(
                            "emailNotifications.receiveWeeklyProgressReports",
                            value
                          )
                        }
                        checked={
                          formik.values.emailNotifications
                            .receiveWeeklyProgressReports ||
                          data?.emailNotifications.receiveWeeklyProgressReports
                        }
                      />
                      <label
                        htmlFor="weekly-report"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Receive weekly progress reports
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="tips-updates"
                        onCheckedChange={(value) =>
                          formik.setFieldValue(
                            "emailNotifications.receiveSpecialTrainingTipsUpdates",
                            value
                          )
                        }
                        checked={
                          formik.values.emailNotifications
                            .receiveSpecialTrainingTipsUpdates ||
                          data?.emailNotifications
                            .receiveSpecialTrainingTipsUpdates
                        }
                      />
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
          <Button
            variant="destructive"
            onClick={() => resetUserSettingMutate()}
          >
            {isResetPending ? "Reseting..." : "Reset to Default"}
          </Button>
          <Button variant="secondary" type="submit">
            {isSavePending ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </UiLayout>
  );
}
