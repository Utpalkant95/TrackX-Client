import axios from "axios";
import { IRES, IWorkoutResponse, IWorkoutStats } from "./interfaces/Response";
import { Workout } from "./interfaces/Project";

export const getWorkout = async () => {
    const response = await axios.get("http://localhost:3000/api/v1/workout/get-workouts", {
        withCredentials : true
    })
    return response.data as IWorkoutResponse;
}

export const getWorkoutsStats = async () => {
    const response = await axios.get("http://localhost:3000/api/v1/workout/get-workouts-stats", {
        withCredentials : true
    })

    return response.data.data as IWorkoutStats
}

export const logNewWorkout = async (data : Workout) => {
    const response = await axios.post("http://localhost:3000/api/v1/workout/create-workout", data, {
        withCredentials : true
    });
    return response.data as IRES;
}

export const deleteWorkout = async (id : string | undefined) => {
    const response = await axios.delete(`http://localhost:3000/api/v1/workout/delete-workout/${id}`, {
        withCredentials : true
    });
    return response.data as IRES;
}