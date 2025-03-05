import axios from "axios";
import { IExercise } from "./interfaces/Response";

export const getBodyPartList = async () => {
  const response = await axios.get(
    "http://localhost:3000/api/v1/exercise/body-part-list",
    { withCredentials: true }
  );
  return response.data.data as string[];
};

export const getEquipmentsList = async () => {
  const response = await axios.get(
    "http://localhost:3000/api/v1/exercise/equipments-list",
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
    `http://localhost:3000/api/v1/exercise/exercises-by-equipment-and-by-body-part/${equipment}/${bodyPart}`,
    { withCredentials: true }
  );
  return response.data.data as IExercise[];
};
