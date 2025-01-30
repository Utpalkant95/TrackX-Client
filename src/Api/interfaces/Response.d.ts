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
    avatar: string;
    createdAt: string;
  };
}
