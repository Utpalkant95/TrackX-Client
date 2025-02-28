import axios from "axios";
import { IRES, ITemplateData } from "./interfaces/Response";
import { ITemplate } from "./interfaces/Project";

export const getTemplates = async () => {
    const response = await axios.get("http://localhost:3000/api/v1/template/get-templates", {
        withCredentials : true
    })
    return response.data.data as ITemplateData[];
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

export const getTemplateById = async (id : string | null) => {
    const response = await axios.get(`http://localhost:3000/api/v1/template/get-template/${id}`, {
        withCredentials : true
    })
    return response.data as IRES;
}

export const updateTemplate = async ({data, id} : {data : ITemplate, id : string}) => {
    const response = await axios.put(`http://localhost:3000/api/v1/template/update-template/${id}`, data, {
        withCredentials : true
    })
    return response.data as IRES;
}