import { useFormik } from "formik";
import * as Yup from "yup";

const initialValues = {
  exercises: [
    {
      name: "",
      set: [
        {
          weight: 0,
          reps: 0,
          difficulty: "",
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
        set: Yup.array()
          .of(
            Yup.object().shape({
              weight: Yup.number()
                .min(0, "Weight cannot be negative")
                .required("Weight is required"),
              reps: Yup.number()
                .min(1, "Reps must be at least 1")
                .required("Reps are required"),
              difficulty: Yup.string()
                .trim()
                .oneOf(["easy", "medium", "hard"], "Invalid difficulty")
                .required("Difficulty is required"),
            })
          )
          .min(1, "At least one set is required"),
      })
    )
    .min(1, "At least one exercise is required"),
});

const useLogNewWorkout = () => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log("Workout Data:", values);
    },
  });

  return formik;
};

export default useLogNewWorkout;