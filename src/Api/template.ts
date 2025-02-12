import axios from "axios";
import { IRES } from "./interfaces/Response";
import { ITemplate } from "./interfaces/Project";

export const getTemplates = async () => {
    const response = await axios.get("http://localhost:3000/api/v1/template/get-templates", {
        withCredentials : true
    })
    return response.data as IRES;
}

export const createTemplate = async (data : ITemplate) => {
    const response = await axios.post("http://localhost:3000/api/v1/template/create-template", data, {
        withCredentials : true
    })
    return response.data as IRES;
}

export const deleteTemplate = async (id : string | undefined) => {
    const response = await axios.delete(`http://localhost:3000/api/v1/template/delete-template/${id}`, {
        withCredentials : true
    })
    return response.data as IRES;
}