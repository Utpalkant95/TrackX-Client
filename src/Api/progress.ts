import axios from "axios";
import {
  IAIInsight,
  IPersonalBests,
  IProgressGraph,
  IRES,
  IWeeklyProgress,
} from "./interfaces/Response";

export const getPersonalBest = async () => {
  const response = await axios.get(
    "http://localhost:3000/api/v1/progress/personal-best",
    { withCredentials: true }
  );
  return response.data.data as IPersonalBests[];
};

export const getAiInsights = async () => {
  const response = await axios.get(
    "http://localhost:3000/api/v1/progress/ai-insights",
    { withCredentials: true }
  );
  return response.data.data as IAIInsight[];
};

export const getWeeklyProgress = async () => {
  const response = await axios.get(
    "http://localhost:3000/api/v1/progress/weekly-progress",
    { withCredentials: true }
  );
  return response.data as IWeeklyProgress;
};

export const getProgressGraph = async (exerciseName: string) => {
  const response = await axios.get(
    `http://localhost:3000/api/v1/progress/progress-graph/${exerciseName}`,
    { withCredentials: true }
  );
  return response.data.data as IProgressGraph[];
};

export const getProgressReport = async () => {
  const response = await axios.get(
    "http://localhost:3000/api/v1/progress/progress-report",
    { withCredentials: true, responseType: "blob" }
  );

  try {
    // Create a download link dynamically
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const a = document.createElement("a");
    a.href = url;
    a.download = "progress-report.pdf"; // Change filename as needed
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error downloading the report:", error);
  }
  return response.data as IRES;
};

export const getExerciseList = async () => {
  const response = await axios.get(
    "http://localhost:3000/api/v1/progress/exercise-list",
    { withCredentials: true }
  );
  return response.data.data as string[];
}