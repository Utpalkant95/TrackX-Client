import axios from "axios";
import { IREQLOGIN, IREQREGISTER } from "./interfaces/Request";
import { IRES } from "./interfaces/Response";

export const Register = async (data : IREQREGISTER) => {
    const response = await axios.post("http://localhost:3000/api/v1/auth/register", data);
    return response.data as IRES;
}

export const Login = async (data : IREQLOGIN) => {
    const response = await axios.post(`${process.env.BASE_URL}/auth/login`, data);
    return response.data as IRES;
}