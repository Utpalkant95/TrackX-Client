import axios from "axios";
import { IExercise } from "./interfaces/Response";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL


export const getBodyPartList = async () => {
  const response = await axios.get(
    `${API_BASE_URL}/exercise/body-part-list`,
    { withCredentials: true }
  );
  return response.data.data as string[];
};

export const getEquipmentsList = async () => {
  const response = await axios.get(
    `${API_BASE_URL}/exercise/equipments-list`,
    { withCredentials: true }
  );
  return response.data.data as string[];
};

export const getExerciseByEquipmentsAndBodyPart = async ({
  equipment,
  bodyPart,
}: {
  equipment: string;
  bodyPart: string;
}) => {
  const response = await axios.get(
    `${API_BASE_URL}/exercise/exercises-by-equipment-and-by-body-part/${equipment}/${bodyPart}`,
    { withCredentials: true }
  );
  return response.data.data as IExercise[];
};
