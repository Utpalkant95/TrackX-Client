import axios from "axios";
import { IREQLOGIN, IREQREGISTER, IUPDATEPASSWORD } from "./interfaces/Request";
import { IRES } from "./interfaces/Response";

export const Register = async (data : IREQREGISTER) => {
    const response = await axios.post("http://localhost:3000/api/v1/auth/register", data, {
        withCredentials : true
    });
    return response.data as IRES;
}

export const Login = async (data : IREQLOGIN) => {
    const response = await axios.post("http://localhost:3000/api/v1/auth/login", data, {
        withCredentials : true
    });
    return response.data as IRES;
}

export const Logout = async () => {
    const response = await axios.get("http://localhost:3000/api/v1/auth/logout", {
        withCredentials : true
    })
    return response.data as IRES;
}

export const CheckAuth = async () => {
    const response = await axios.get("http://localhost:3000/api/v1/auth/check-auth", {
        withCredentials : true
    });
    return response.data;
}

export const UpdatePassword = async (data : IUPDATEPASSWORD) => {
    const response = await axios.put("http://localhost:3000/api/v1/auth/update-password", data, {
        withCredentials : true
    });
    return response.data as IRES;
}

export const EraseAccount = async () => {
    const response = await axios.delete("http://localhost:3000/api/v1/auth/erase-account", {
        withCredentials : true
    });
    return response.data as IRES;
}