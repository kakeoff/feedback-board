import { PostType } from "../types/postTypes";

interface PostResponse {
  id: string;
  text: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  viewsCount: number;
  imageUrl?: string;
  tags: string[];
  user: {
    id: string;
    fullName?: string;
    email: string;
    avatarUrl?: string;
  };
}

export const postMapper = (post: PostType): PostResponse => {
  return {
    id: post._id,
    text: post.text,
    title: post.title,
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,
    viewsCount: post.viewsCount,
    imageUrl: post.imageUrl,
    tags: post.tags,
    user: {
      id: post.user._id,
      fullName: post.user.fullName,
      email: post.user.email,
      avatarUrl: post.user.avatarUrl,
    },
  };
};
