export type PostType = {
  id: string;
  text: string;
  title: string;
  tags: Array<string>;
  createdAt: string;
  updatedAt: string;
  viewsCount: number;
  imageUrl: string;
  user: UserType;
};

export type UserType = {
  id: string;
  email: string;
  fullName: string;
  avatarUrl: string;
  createdAt: string;
  updatedAt: string;
};

export type UserWithToken = {
  user: UserType;
  token: string;
};

export enum LoadingStatus {
  LOADING = "loading",
  LOADED = "loaded",
  ERROR = "error",
}
export interface AuthFormData {
  email: string;
  password: string;
}
