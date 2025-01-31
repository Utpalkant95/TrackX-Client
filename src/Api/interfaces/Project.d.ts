import { IUserProfile } from "./Response";

export interface IProfileAvatarFrag {
  data: IUserProfile | undefined;
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<IUserProfile, Error>>;
}

export interface INavItem {
  name: string;
  href: string;
  icon: LucideIcon;
}

interface IMobileMenuProps {
  navItems: INavItem[];
}

export interface IProfileSectionWrapperAtom {
  children: React.ReactNode;
  title: string;
  className ?: string;
}
