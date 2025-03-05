import { lazy, useState } from "react";
import {
  User,
  Mail,
  Calendar,
  Award,
  Dumbbell,
  Zap,
  Flame,
  Lock,
  LogOut,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
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
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { useEraseAccount, useLogout, useUpdatePassword } from "@/hooks";
import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "@/Api/User";
const PrimaryCard = lazy(() => import("@/components/PrimaryCard/PrimaryCard"));
const ProfileAvatarFrag = lazy(() => import("@/Fragments/ProfileAvatarFrag"));
const UiLayout = lazy(() => import("@/layout/UiLayout"));
const LayoutGridWrapper = lazy(() => import("@/Wrappers/LayoutGridWrapper"));

export default function Profile() {
  const { data, refetch } = useQuery({
    queryKey: ["get-user-profile"],
    queryFn: getUserProfile,
  });
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const { mutate } = useLogout();
  const { formik, isPending } = useUpdatePassword();
  const { isPending: erasePending, mutate: eraseMutate } = useEraseAccount();

  const formattedDateTime = new Date(
    data?.data?.createdAt as string
  ).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  return (
    <UiLayout>
      <ProfileAvatarFrag data={data} refetch={refetch} />

      <LayoutGridWrapper>
        {/* User Information Section */}
        <div className="md:col-span-2">
          <PrimaryCard
           title="Basic Information" cardClassName="mb-8">
            <div className="grid gap-4">
              <div className="flex items-center">
                <User className="mr-2 h-5 w-5 text-[#00BFFF]" />
                <span>{data?.data?.name}</span>
              </div>
              <div className="flex items-center">
                <Mail className="mr-2 h-5 w-5 text-[#00BFFF]" />
                <span>{data?.data?.email}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-[#00BFFF]" />
                <span>Joined: {formattedDateTime}</span>
              </div>
            </div>
          </PrimaryCard>
          <PrimaryCard title="Fitness Stats">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center rounded-lg bg-gray-800 p-4">
                <Dumbbell className="mb-2 h-8 w-8 text-[#00BFFF]" />
                <span className="text-2xl font-bold">42</span>
                <span className="text-sm text-gray-400">Total Workouts</span>
              </div>
              <div className="flex flex-col items-center rounded-lg bg-gray-800 p-4">
                <Zap className="mb-2 h-8 w-8 text-[#00BFFF]" />
                <span className="text-2xl font-bold">Chest Day</span>
                <span className="text-sm text-gray-400">Most Frequent</span>
              </div>
              <div className="flex flex-col items-center rounded-lg bg-gray-800 p-4">
                <Award className="mb-2 h-8 w-8 text-[#00BFFF]" />
                <span className="text-2xl font-bold">225 lbs</span>
                <span className="text-sm text-gray-400">Personal Best</span>
              </div>
              <div className="flex flex-col items-center rounded-lg bg-gray-800 p-4">
                <Flame className="mb-2 h-8 w-8 text-[#00BFFF]" />
                <span className="text-2xl font-bold">7 Days</span>
                <span className="text-sm text-gray-400">Workout Streak</span>
              </div>
            </div>
          </PrimaryCard>
        </div>

        {/* Settings & Preferences */}
        <div>
          <PrimaryCard
            title="Settings & Preferences"
            cardClassName="mb-8"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Dark Mode</span>
                <Switch checked={isDarkMode} onCheckedChange={setIsDarkMode} />
              </div>
              <div className="flex items-center justify-between">
                <span>Use Metric System (kg)</span>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <span>Workout Reminders</span>
                <Switch
                  checked={notificationsEnabled}
                  onCheckedChange={setNotificationsEnabled}
                />
              </div>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button className="w-full" variant="secondary">
                    <Lock className="mr-2 h-4 w-4" />
                    Change Password
                  </Button>
                </AlertDialogTrigger>

                <AlertDialogContent className="bg-gray-900 text-white">
                  <div className="relative">
                    <Lock
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                    <Input
                      type="password"
                      value={formik.values.oldPassword}
                      onChange={formik.handleChange}
                      placeholder="Old Password"
                      name="oldPassword"
                      autoComplete="off"
                      className="pl-10 bg-[#2A2A2A] border-gray-600 text-white placeholder-gray-400"
                    />
                  </div>
                  <div className="relative">
                    <Lock
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                    <Input
                      type="password"
                      value={formik.values.newPassword}
                      onChange={formik.handleChange}
                      placeholder="New Password"
                      name="newPassword"
                      autoComplete="off"
                      className="pl-10 bg-[#2A2A2A] border-gray-600 text-white placeholder-gray-400"
                    />
                  </div>

                  <AlertDialogFooter>
                    <AlertDialogCancel className="bg-gray-800 text-white hover:bg-gray-700">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      className=" bg-[#00BFFF] hover:bg-[#33CCFF] text-white"
                      type="submit"
                      disabled={isPending}
                      onClick={() => formik.handleSubmit()}
                    >
                      {isPending ? "Updating..." : "Update Password"}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </PrimaryCard>
          <PrimaryCard title="Account Actions">
            <Button
              className="w-full bg-red-600 hover:bg-red-700"
              variant="destructive"
              onClick={() => mutate()}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild className="mt-4">
                <Button className="w-full" variant="secondary">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Account
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-gray-900 text-white">
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription className="text-gray-400">
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="bg-gray-800 text-white hover:bg-gray-700">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-red-600 text-white hover:bg-red-700"
                    onClick={() => eraseMutate()}
                  >
                    {erasePending ? "Deleting..." : "Delete Account"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </PrimaryCard>
        </div>
      </LayoutGridWrapper>
    </UiLayout>
  );
}