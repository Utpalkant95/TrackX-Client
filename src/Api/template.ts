import axios from "axios";
import { IRES } from "./interfaces/Response";

export const getTemplates = async () => {
    const response = await axios.get("http://localhost:3000/api/v1/templates/get-templates", {
        withCredentials : true
    })
    return response.data as IRES;
}