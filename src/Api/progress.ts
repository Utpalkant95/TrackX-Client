import axios from "axios";
import { IAIInsight, IPersonalBests, IWeeklyProgress} from "./interfaces/Response";

export const getPersonalBest = async () => {
    const response = await axios.get("http://localhost:3000/api/v1/progress/personal-best", {withCredentials : true});
    return response.data as IPersonalBests;
}

export const getAiInsights = async () => {
    const response = await axios.get("http://localhost:3000/api/v1/progress/ai-insights", {withCredentials : true});
    return response.data.data as IAIInsight[];
}

export const getWeeklyProgress = async () => {
    const response = await axios.get("http://localhost:3000/api/v1/progress/weekly-progress", {withCredentials : true});
    return response.data as IWeeklyProgress;
}