import { lazy, useState } from "react";
import { Plus, Pencil, Trash2, ChevronRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteTemplate, getTemplates } from "@/Api/template";
import { enqueueSnackbar } from "notistack";
import { IRES, ITemplateData } from "@/Api/interfaces/Response";
import { AxiosError } from "axios";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
import { LayoutContentWrapper } from "@/Wrappers";
import { PrimaryDailog } from "@/components";
const LogNewWorkout = lazy(() => import("@/forms/LogNewWorkoutForm"));
const UiLayout = lazy(() => import("@/layout/UiLayout"));
const LayoutGridWrapper = lazy(() => import("@/Wrappers/LayoutGridWrapper"));

export default function Templates() {
  const navigate = useNavigate();
  const [openForm, setOpenForm] = useState<boolean>(false);
  const { data, refetch } = useQuery({
    queryKey: ["templates"],
    queryFn: getTemplates,
  });

  const { mutate } = useMutation({
    mutationKey: ["deleteTemplate"],
    mutationFn: deleteTemplate,
    onSuccess: (data: IRES) => {
      refetch();
      enqueueSnackbar(data.message, { variant: "success" });
    },
    onError: (error: AxiosError<IRES>) => {
      enqueueSnackbar(error.message, { variant: "error" });
    },
  });
  return (
    <UiLayout>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="mb-2 text-3xl font-bold text-white">
            Workout Templates
          </h1>
          <p className="text-gray-400">
            Create and save your custom workout routines for quick logging.
          </p>
        </div>
        <div>
          <Dialog open={openForm}>
            <DialogTrigger asChild>
              <Button
                className="bg-[#00BFFF] text-white hover:bg-[#00A0D0]"
                onClick={() => setOpenForm(true)}
              >
                <Plus className="mr-2 h-4 w-4" /> Create New Template
              </Button>
            </DialogTrigger>
            <LogNewWorkout
              refetch={refetch}
              title="Create New Template"
              des="Create a new workout template with detailed set information."
              type="TEMPLATE"
              setOpenForm={setOpenForm}
            />
          </Dialog>
        </div>
      </div>

      <LayoutContentWrapper
        header="Workout Templates"
        des="Create and save your custom workout routines for quick logging."
      >
        <PrimaryDailog
          btn={() => (
            <Button
              className="bg-[#00BFFF] text-white hover:bg-[#00A0D0]"
              onClick={() => setOpenForm(true)}
            >
              <Plus className="mr-2 h-4 w-4" /> Create New Template
            </Button>
          )}
        >
          <LogNewWorkout />
        </PrimaryDailog>
      </LayoutContentWrapper>

      <LayoutGridWrapper Cols={2}>
        {/* Saved Templates */}
        <div>
          <h2 className="mb-4 text-2xl font-semibold text-white">
            Saved Templates
          </h2>
          <div className="space-y-4">
            {data?.data.map((template: ITemplateData, index: number) => (
              <Card key={index} className="bg-[#1E1E1E] text-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-lg font-medium">
                    {template.name}
                  </CardTitle>
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
                            This action cannot be undone. This will permanently
                            delete your "{template.name}" template.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="bg-gray-800 text-white hover:bg-gray-700">
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-red-600 text-white hover:bg-red-700"
                            onClick={() => mutate(template._id)}
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-400">
                    {template.exercises.length} exercises
                  </CardDescription>
                  <Button
                    className="mt-2 w-full bg-[#00BFFF] text-white hover:bg-[#00A0D0]"
                    onClick={() => navigate(`/workouts?id=${template._id}`)}
                  >
                    Apply Template <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Import from History */}
        <div>
          <h2 className="mb-4 text-2xl font-semibold text-white">
            Import from History
          </h2>
          <Card className="bg-[#1E1E1E] text-white">
            <CardHeader>
              <CardTitle>Create Template from Past Workout</CardTitle>
              <CardDescription>
                Select a past workout to create a new template.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search past workouts"
                  className="bg-[#2A2A2A] pl-8 text-white"
                />
              </div>
              {/* Add a list or calendar component to show past workouts */}
            </CardContent>
          </Card>
        </div>
      </LayoutGridWrapper>
    </UiLayout>
  );
}
