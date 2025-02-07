import { useFormik } from "formik";
import * as Yup from "yup";
import { Workout } from "@/Api/interfaces/Project";
import { useMutation } from "@tanstack/react-query";
import { logNewWorkout } from "@/Api/workout";
import { enqueueSnackbar } from "notistack";
import { AxiosError } from "axios";
import { IRES } from "@/Api/interfaces/Response";

const initialValues: Workout = {
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

const validationSchema = Yup.object().shape({
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
  const {mutate, isPending} = useMutation({
    mutationKey : ["logNewWorkout"],
    mutationFn : logNewWorkout,
    onSuccess : (data) => {
      enqueueSnackbar(data.message, {variant : "success"})
    },
    onError : (error : AxiosError<IRES>) => {
      enqueueSnackbar(error.response?.data.message, {variant : "error"})
    }
  })

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      mutate(values);
    },
  });

  return {
    formik, isPending
  };
};

export default useLogNewWorkout;