import { ITemplate } from "@/Api/interfaces/Project";
import { useFormik } from "formik";
import * as Yup from "yup";

const initialValues: ITemplate = {
  name: "",
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

const useTemplate = () => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return {
    formik,
  };
};

export default useTemplate;
