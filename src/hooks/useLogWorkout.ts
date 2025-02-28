import { FormikProps, useFormik } from "formik";
import * as Yup from "yup";
import { Workout } from "@/Api/interfaces/Project";
import { useMutation } from "@tanstack/react-query";
import {
  createWorkoutFromTemplate,
  logNewWorkout,
  updateWorkout,
} from "@/Api/workout";
import { enqueueSnackbar } from "notistack";
import { AxiosError } from "axios";
import { IRES, ITemplateData, IWorkoutData } from "@/Api/interfaces/Response";

const workoutInitialValues: Workout = {
  exercises: [
    {
      name: "",
      sets: [
        {
          weight: 0,
          reps: 1,
          difficulty: "Easy",
        },
      ],
    },
  ],
};

const workoutValidationSchema = Yup.object().shape({
  exercises: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string().trim().required("Exercise name is required"),
        sets: Yup.array()
          .of(
            Yup.object().shape({
              weight: Yup.number()
                .min(0, "Weight cannot be negative")
                .required("Weight is required"),
              reps: Yup.number()
                .min(1, "Reps must be at least 1")
                .required("Reps are required"),
              difficulty: Yup.string()
                .oneOf(["Easy", "Medium", "Hard"], "Invalid difficulty")
                .required("Difficulty is required"),
            })
          )
          .min(1, "At least one set is required"),
      })
    )
    .min(1, "At least one exercise is required"),
});

interface IUseLogNewWorkout {
  selectedWorkout: IWorkoutData | undefined;
  refetch: () => void;
  selectedTemplate: ITemplateData | null | undefined;
}

const useLogNewWorkout = ({
  selectedWorkout,
  refetch,
  selectedTemplate,
}: IUseLogNewWorkout) => {
  const { mutate: logNewWorkoutMutate, isPending: logNewWorkoutIsPending } =
    useMutation({
      mutationKey: ["logNewWorkout"],
      mutationFn: logNewWorkout,
      onSuccess: (data) => {
        formik.resetForm();
        refetch();
        enqueueSnackbar(data.message, { variant: "success" });
      },
      onError: (error: AxiosError<IRES>) => {
        enqueueSnackbar(error.response?.data.message, { variant: "error" });
      },
    });

  const { mutate: updateWorkoutMutate, isPending: updateWorkoutIsPending } =
    useMutation({
      mutationKey: ["updateWorkout"],
      mutationFn: updateWorkout,
      onSuccess: (data) => {
        formik.resetForm();
        refetch();
        enqueueSnackbar(data.message, { variant: "success" });
      },
      onError: (error: AxiosError<IRES>) => {
        enqueueSnackbar(error.response?.data.message, { variant: "error" });
      },
    });

  const {mutate : createWorkoutFromTemplateMutate, isPending : createWorkoutFromTemplateIsPending} = useMutation({
    mutationKey: ["createWorkoutFromTemplate"],
    mutationFn: createWorkoutFromTemplate,
    onSuccess: (data) => {
      enqueueSnackbar(data.message, { variant: "success" });
    },
    onError: (error: AxiosError<IRES>) => {
      enqueueSnackbar(error.response?.data.message, { variant: "error" });
    },
  });

  const formik : FormikProps<Workout> = useFormik({
    initialValues: selectedWorkout
      ? selectedWorkout
      : selectedTemplate?.exercises
      ? { ...selectedTemplate }
      : workoutInitialValues,
    validationSchema: workoutValidationSchema,
    onSubmit: (values) => {
      if (selectedWorkout) {
        const data = {
          id: selectedWorkout._id,
          data: values,
        };
        updateWorkoutMutate(data);
      } else if (selectedTemplate) {
        createWorkoutFromTemplateMutate(values);
      } else {
        logNewWorkoutMutate(values);
      }
    },
  });

 return {
    formik,
    logNewWorkoutIsPending,
    updateWorkoutMutate,
    updateWorkoutIsPending,
    addExercise,
    addSet,
    removeSet,
    removeExercise,
    createWorkoutFromTemplateMutate,
    createWorkoutFromTemplateIsPending
  };
};

export default useLogNewWorkout;