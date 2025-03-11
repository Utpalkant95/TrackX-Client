import axios from "axios";
import { IRES, IWorkoutResponse, IWorkoutStats } from "./interfaces/Response";
import { Workout } from "./interfaces/Project";

export const getWorkout = async (limit ?: number | undefined) => {
    const response = await axios.get(`http://localhost:3000/api/v1/workout/get-workouts/${limit}`, {
        withCredentials : true
    })
    return response.data as IWorkoutResponse;
}

export const getWorkoutsStats = async () => {
    const response = await axios.get("http://localhost:3000/api/v1/workout/get-workouts-stats", {
        withCredentials : true
    })
    return response.data.data as IWorkoutStats[]
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

export const repeatLastWorkout = async () => {
    const response = await axios.put("http://localhost:3000/api/v1/workout/repeat-last-workout", {}, {
        withCredentials : true
    });
    return response.data as IRES;
}

export const getWorkoutPerformance = async () => {
    const response = await axios.get("http://localhost:3000/api/v1/workout/get-workout-performance", {
        withCredentials : true
    });
    return response.data as IRES;
}

export const updateWorkout = async (data  : any) => {
    const response = await axios.put("http://localhost:3000/api/v1/workout/update-workout", data, {
        withCredentials : true
    })
    return response.data as IRES
}

export const createWorkoutFromTemplate = async (data : any) => {
    const response = await axios.post("http://localhost:3000/api/v1/workout/create-workout-from-template", data, {
        withCredentials : true
    })
    return response.data as IRES
}