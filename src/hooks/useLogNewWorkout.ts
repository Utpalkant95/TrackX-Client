import { useFormik } from "formik";
import * as Yup from "yup";
import { ITemplate, Workout } from "@/Api/interfaces/Project";
import { useMutation } from "@tanstack/react-query";
import { logNewWorkout } from "@/Api/workout";
import { enqueueSnackbar } from "notistack";
import { AxiosError } from "axios";
import { IRES } from "@/Api/interfaces/Response";
import { createTemplate } from "@/Api/template";

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

const workoutValues: Workout = {
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

const templateValues: ITemplate = {
  name: "",
  ...workoutValues,
};

const templateValidationSchema = Yup.object().shape({
  name: Yup.string().trim().required("Template name is required"),
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
type FormikValues = Workout | ITemplate;

const useLogNewWorkout = ({
  refetch,
  type,
}: {
  refetch: () => void;
  type: string;
}) => {
  const { mutate, isPending } = useMutation({
    mutationKey: ["logNewWorkout"],
    mutationFn: logNewWorkout,
    onSuccess: (data) => {
      enqueueSnackbar(data.message, { variant: "success" });
      refetch();
    },
    onError: (error: AxiosError<IRES>) => {
      enqueueSnackbar(error.response?.data.message, { variant: "error" });
    },
  });

  const { mutate: templateMutate } = useMutation({
    mutationKey: ["create-template"],
    mutationFn: createTemplate,
  });

  const formik = useFormik<FormikValues>({
    initialValues: type === "WORKOUT" ? workoutValues : templateValues,
    validationSchema:
      type === "WORKOUT" ? workoutValidationSchema : templateValidationSchema,
    onSubmit: (values) => {
      if (isTemplate(values)) {
        templateMutate(values);
      } else {
        mutate(values);
      }
    },
  });

  const isTemplate = (values: FormikValues): values is ITemplate => {
    return (values as ITemplate).name !== undefined;
  };

  return {
    formik,
    isPending,
    isTemplate,
  };
};

export default useLogNewWorkout;
