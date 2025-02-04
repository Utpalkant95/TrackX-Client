import axios from "axios";
import { IWorkoutResponse } from "./interfaces/Response";

export const getWorkout = async () => {
    const response = await axios.get("http://localhost:3000/api/v1/workout/get-workouts", {
        withCredentials : true
    })
    return response.data as IWorkoutResponse;
}