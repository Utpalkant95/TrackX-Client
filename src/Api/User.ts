import axios from "axios";
import { IFitnessStats, IRES, IUserProfile } from "./interfaces/Response";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL

export const getUserProfile = async () => {
    const response = await axios.get(`${API_BASE_URL}/user/get-user-profile`, {
        withCredentials : true
    })
    return response.data as IUserProfile;
}

export const uploadAvatar = async (data : FormData) => {
    const response = await axios.put(`${API_BASE_URL}/user/upload-avatar`, data, {
        withCredentials : true
    })
    return response.data as IRES;
}

export const getFitnessStats = async () => {
    const response = await axios.get(`${API_BASE_URL}/user/fitness-stats`, {
        withCredentials : true
    })
    return response.data.data as IFitnessStats[];
}

export const updatePreferences = async (preferences : string) => {
    const response = await axios.put(`${API_BASE_URL}/user/update-preferences/${preferences}`, {}, {
        withCredentials : true
    })
    return response.data as IRES
}