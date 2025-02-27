import { useFormik } from "formik";
import * as Yup from "yup";
import { Workout } from "@/Api/interfaces/Project";
import { useMutation } from "@tanstack/react-query";
import { logNewWorkout } from "@/Api/workout";
import { enqueueSnackbar } from "notistack";
import { AxiosError } from "axios";
import { IRES } from "@/Api/interfaces/Response";

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

const useLogNewWorkout = () => {
  const { mutate, isPending } = useMutation({
    mutationKey: ["logNewWorkout"],
    mutationFn: logNewWorkout,
    onSuccess: (data) => {
      formik.resetForm();
      enqueueSnackbar(data.message, { variant: "success" });
    },
    onError: (error: AxiosError<IRES>) => {
      enqueueSnackbar(error.response?.data.message, { variant: "error" });
    },
  });

  const formik = useFormik({
    initialValues: workoutInitialValues,
    validationSchema: workoutValidationSchema,
    onSubmit: (values) => {
      mutate(values);
    },
  });


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

  return {
    formik,
    isPending,
    addExercise,
    addSet,
    removeSet,
    removeExercise
  };
};

export default useLogNewWorkout;