import { Request } from "express";

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
