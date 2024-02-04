import { Request } from "express";
import { UserType } from "./userTypes";

export interface CreateOrUpdatePostDto {
  title: string;
  text: string;
  tags: Array<string>;
  imageUrl: string;
}

export interface CreateOrUpdatePostRequest extends Request {
  userId?: string;
  body: CreateOrUpdatePostDto;
}

export type PostType = {
  _id: string;
  title: string;
  text: string;
  tags: Array<string>;
  viewsCount: number;
  user: UserType;
  createdAt: string;
  updatedAt: string;
};
