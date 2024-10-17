import { Request, Response } from "express";
import { postMapper } from "../mappers/post.mapper";
import PostModel from "../models/Post";
import {
  CreateOrUpdatePostRequest,
  RequestWithUserId,
} from "../types/postTypes";

export const getLastTags = async (req: Request, res: Response) => {
  try {
    const posts = await PostModel.find().sort({ createdAt: -1 }).exec();
    const tags = posts.map((post) => post.tags).flat();
    const uniqueItems = [...new Set(tags)].slice(0, 10);
    res.json(uniqueItems);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Failed to get tags" });
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, tag } = req.query;

    const pageNumber = Number(page);
    const limitNumber = Number(limit);

    const tagsQuery = tag ? { tags: tag } : {};

    const totalPosts = await PostModel.countDocuments(tagsQuery);
    const totalPages = Math.ceil(totalPosts / limitNumber);

    const posts = await PostModel.find(tagsQuery)
      .populate("user")
      .sort([["createdAt", -1]])
      .limit(limitNumber)
      .skip((pageNumber - 1) * limitNumber)
      .exec();
    console.log(posts);
    const mappedPosts = posts.map(postMapper);

    res.json({
      posts: mappedPosts,
      currentPage: pageNumber,
      totalPages: totalPages,
      totalPosts: totalPosts,
      selectedTag: tag || undefined,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Failed to get posts" });
  }
};

export const getMyPosts = async (req: RequestWithUserId, res: Response) => {
  const userId = req.userId;
  if (!userId) return res.status(403).json({ message: "User not found" });
  try {
    const posts = await PostModel.find({ user: userId })
      .populate("user")
      .exec();
    const mappedPosts = posts.map(postMapper);
    res.json(mappedPosts);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Failed to get posts" });
  }
};

export const getOne = async (req: Request, res: Response) => {
  try {
    const postId = req.params.id;
    const post = await PostModel.findOneAndUpdate(
      {
        _id: postId,
      },
      {
        $inc: { viewsCount: 1 },
      },
      { returnDocument: "after" }
    )
      .populate("user")
      .exec();
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(postMapper(post));
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Failed to get or update post" });
  }
};

export const create = async (req: CreateOrUpdatePostRequest, res: Response) => {
  const userId = req.userId;
  if (!userId) return res.status(403).json({ message: "User not found" });
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      tags: req.body.tags,
      imageUrl: req.body.imageUrl,
      user: userId,
    });

    const post = await doc.save();

    res.json(postMapper(post));
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Failed to create post" });
  }
};

export const remove = async (req: RequestWithUserId, res: Response) => {
  try {
    const postId = req.params.id;
    const userId = req.userId;
    if (!userId) {
      return res.status(404).json({ message: "UserId not found" });
    }
    const post = await PostModel.findOneAndDelete({
      _id: postId,
      user: userId,
    });
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json({ success: true });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Failed to delete post" });
  }
};

export const update = async (req: CreateOrUpdatePostRequest, res: Response) => {
  try {
    const postId = req.params.id;
    const userId = req.userId;
    if (!userId) return res.status(403).json({ message: "UserId not found" });
    const post = await PostModel.findOneAndUpdate(
      {
        _id: postId,
        user: userId,
      },
      {
        title: req.body.title,
        text: req.body.text,
        tags: req.body.tags,
        imageUrl: req.body.imageUrl,
        user: userId,
      },
      { returnDocument: "after" }
    ).populate("user");
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(postMapper(post));
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Failed to update post" });
  }
};
