import { IUserProfile } from "./Response";

export interface IProfileAvatarFrag {
    data : IUserProfile | undefined;
    refetch : (options?: RefetchOptions | undefined) => Promise<QueryObserverResult<IUserProfile, Error>>;
}