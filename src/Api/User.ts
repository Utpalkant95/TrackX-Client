import axios from "axios";
import { IUserProfile } from "./interfaces/Response";

export const getUserProfile = async () => {
    const response = await axios.get("http://localhost:3000/api/v1/user/get-user-profile", {
        withCredentials : true
    })
    return response.data as IUserProfile;
}