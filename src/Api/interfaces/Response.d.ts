export interface IRES {
  message: string;
  success: boolean;
  data?: any;
}

export interface IUserProfile {
  success: boolean;
  message: string;
  data?: {
    _id: string;
    name: string;
    email: string;
    avatar: {
      public_id: string;
      secure_url: string;
    };
    createdAt: string;
  };
}


interface ExerciseSet {
  weight: number;
  reps: number;
  difficulty: "Easy" | "Hard"; // You can add more difficulty levels if needed
  _id: string;
}

interface Exercise {
  name: string;
  sets: ExerciseSet[];
  _id: string;
}

export interface IWorkoutData {
  _id: string;
  userId: string;
  date: string; // ISO date string
  exercises: Exercise[];
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
}

export interface IWorkoutResponse {
  data: IWorkoutData[];
}


export interface IWorkoutStats {
  totalWorkouts : number;
  mostFrequentExercise: string,
  totalWeightLifted : number
}

export interface ITemplateData {
  _id: string;
  userId : string;
  name: string;
  exercises: Exercise[];
  __v : number;
}

export interface IPersonalBests {
  heaviestWeight: {
    exercise: string;  // Name of the exercise where the heaviest weight was lifted
    weight: number;    // The maximum weight lifted
    unit: string;      // Unit of weight (e.g., "kg", "lbs")
  };
  maxReps: {
    exercise: string;  // Name of the exercise where max reps were performed in a single set
    reps: number;      // The highest number of reps done in a single set
  };
  longestStreak: number;  // The longest streak of consecutive workout days
}

interface IAIInsight {
  type: "plateauDetected" | "workoutSuggestion" | "recoveryAlert" | "info"; 
  message: string;
  exercise?: string;
}

interface IWeeklyProgress {
  success: boolean;
  data: {
    weightProgress: string;
    repsProgress: string;
  };
}