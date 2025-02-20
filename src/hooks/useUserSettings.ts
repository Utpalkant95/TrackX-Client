import { IRES } from "@/Api/interfaces/Response";
import { resetUserSetting, saveUserSetting } from "@/Api/userSetting";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useFormik } from "formik";
import { enqueueSnackbar } from "notistack";
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
      is: true,
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
  const { mutate: saveUserSettingMutate, isPending: isSavePending } =
    useMutation({
      mutationKey: ["saveuserSetting"],
      mutationFn: saveUserSetting,
      onSuccess: (data) => {
        enqueueSnackbar(data.message, { variant: "success" });
      },
      onError: (error: AxiosError<IRES>) => {
        enqueueSnackbar(error.response?.data.message, { variant: "error" });
      },
    });

  const { mutate: resetUserSettingMutate, isPending: isResetPending } =
    useMutation({
      mutationKey: ["resetuserSetting"],
      mutationFn: resetUserSetting,
      onSuccess: (data) => {
        enqueueSnackbar(data.message, { variant: "success" });
      },
      onError: (error: AxiosError<IRES>) => {
        enqueueSnackbar(error.response?.data.message, { variant: "error" });
      },
    });
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return {
    formik,
    saveUserSettingMutate,
    resetUserSettingMutate,
    isResetPending,
    isSavePending,
  };
};

export default useUserSettings;
