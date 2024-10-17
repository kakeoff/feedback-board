import { PostType } from "./types";

export type PostDto = {
  title: string;
  text: string;
  tags: string[];
  imageUrl?: string;
};

export type GetPostsResponse = {
  posts: PostType[];
  currentPage: number;
  totalPages: number;
  totalPosts: number;
  selectedTag?: string;
};
