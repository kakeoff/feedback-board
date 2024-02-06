import { Request, Response } from "express";
import PostModel from "../models/Post";
import { CreateOrUpdatePostRequest } from "../types/postTypes";

export const getLastTags = async (req: Request, res: Response) => {
  try {
    const posts = await PostModel.find().limit(5).exec();
    const tags = posts
      .map((post) => post.tags)
      .flat()
      .slice(0, 5);
    res.json(tags);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Failed to get tags" });
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const posts = await PostModel.find().populate("user").exec();
    const mappedPosts = posts.map((post) => {
      return {
        id: post._id,
        text: post.text,
        title: post.title,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        viewsCount: post.viewsCount,
        user: {
          id: post.user._id,
          fullName: post.user.fullName,
          email: post.user.email,
          avatarUrl: post.user.avatarUrl,
        },
      };
    });
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
    );
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json({
      id: post._id,
      text: post.text,
      title: post.title,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      viewsCount: post.viewsCount,
      user: {
        id: post.user._id,
        fullName: post.user.fullName,
        email: post.user.email,
        avatarUrl: post.user.avatarUrl,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Failed to get or update post" });
  }
};

export const create = async (req: CreateOrUpdatePostRequest, res: Response) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      tags: req.body.tags,
      imageUrl: req.body.imageUrl,
      user: req.userId,
    });

    const post = await doc.save();

    res.json({
      id: post._id,
      text: post.text,
      title: post.title,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      viewsCount: post.viewsCount,
      user: {
        id: post.user._id,
        fullName: post.user.fullName,
        email: post.user.email,
        avatarUrl: post.user.avatarUrl,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Failed to create post" });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const postId = req.params.id;
    const post = await PostModel.findOneAndDelete({
      _id: postId,
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
    const post = await PostModel.updateOne(
      {
        _id: postId,
      },
      {
        title: req.body.title,
        text: req.body.text,
        tags: req.body.tags,
        imageUrl: req.body.imageUrl,
        user: req.userId,
      }
    );
    res.json({ success: true });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Failed to update post" });
  }
};
