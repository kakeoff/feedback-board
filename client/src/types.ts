export type PostType = {
  id: string;
  text: string;
  title: string;
  tags: Array<string>;
  createdAt: string;
  updatedAt: string;
  viewsCount: number;
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
