import { useFormik } from "formik";
import * as Yup from "yup";

const initialValues = {
  workoutReminder: {
    workoutReminder: false,
    reminderTime: "",
  },
  progessAiAlerts: {
    plateauAlerts: false,
    goalTrackingAlerts: false,
  },
  emailNotifications: {
    receiveWeeklyProgressReports: false,
    receiveSpecialTrainingTipsUpdates: false,
  },
};

const validationSchema = Yup.object().shape({
  workoutReminder: Yup.object().shape({
    workoutReminder: Yup.boolean(),
    reminderTime: Yup.string().when("workoutReminder", {
      is : true,
      then: (schema) => schema.required("Reminder time is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
  }),
  progessAiAlerts: Yup.object().shape({
    plateauAlerts: Yup.boolean(),
    goalTrackingAlerts: Yup.boolean(),
  }),
  emailNotifications: Yup.object().shape({
    receiveWeeklyProgressReports: Yup.boolean(),
    receiveSpecialTrainingTipsUpdates: Yup.boolean(),
  }),
});

const useUserSettings = () => {
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

export default useUserSettings;
