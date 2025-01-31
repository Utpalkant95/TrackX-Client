import axios from "axios";
import { IRES, IUserProfile } from "./interfaces/Response";

export const getUserProfile = async () => {
    const response = await axios.get("http://localhost:3000/api/v1/user/get-user-profile", {
        withCredentials : true
    })
    return response.data as IUserProfile;
}

export const uploadAvatar = async (data : FormData) => {
    const response = await axios.put("http://localhost:3000/api/v1/user/upload-avatar", data, {
        withCredentials : true
    })
    return response.data as IRES;
}