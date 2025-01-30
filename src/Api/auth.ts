import axios from "axios";
import { IREQLOGIN, IREQREGISTER } from "./interfaces/Request";
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