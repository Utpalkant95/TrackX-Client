import axios from "axios";
import { IPersonalBests} from "./interfaces/Response";

export const getPersonalBest = async () => {
    const response = await axios.get("http://localhost:3000/api/v1/progress/personal-best", {withCredentials : true});
    return response.data as IPersonalBests;
}