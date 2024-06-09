import { UserType } from "../types/userTypes";

interface UserResponse {
  id: string;
  email: string;
  fullName: string;
  avatarUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export const userMapper = (userFromBd: UserType): UserResponse => {
  return {
    id: userFromBd._id,
    email: userFromBd.email,
    fullName: userFromBd.fullName,
    avatarUrl: userFromBd.avatarUrl,
    createdAt: userFromBd.createdAt,
    updatedAt: userFromBd.updatedAt,
  };
};
