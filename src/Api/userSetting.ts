import axios from "axios";
import { IRES } from "./interfaces/Response";
import { IUserSetting } from "./interfaces/Project";

export const saveUserSetting = async (data : IUserSetting) => {
    const response = await axios.put("http://localhost:3000/api/v1/userSetting/save-user-setting", data, {
        withCredentials : true
    })
    return response.data as IRES;
}

export const resetUserSetting = async () => {
    const response = await axios.delete("http://localhost:3000/api/v1/userSetting/reset-user-setting", {
        withCredentials : true
    })
    return response.data as IRES;
}