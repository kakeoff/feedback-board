import { Request } from "express";
import { UserType } from "./userTypes";

export interface CreateOrUpdatePostDto {
  title: string;
  text: string;
  tags: Array<string>;
  imageUrl: string;
}

export interface RequestWithUserId extends Request {
  userId?: string;
}

export interface CreateOrUpdatePostRequest extends RequestWithUserId {
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
  imageUrl?: string;
};
