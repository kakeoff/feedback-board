import PostModel from "../models/Post";
import { Request, Response } from "express";
import { CreateOrUpdatePostRequest } from "../types/postTypes";

export const getAll = async (req: Request, res: Response) => {
  try {
    const posts = await PostModel.find().populate("user").exec();
    res.json(posts);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Failed to get posts" });
  }
};

export const getOne = async (req: Request, res: Response) => {
  try {
    const postId = req.params.id;
    const updatedDoc = await PostModel.findOneAndUpdate(
      {
        _id: postId,
      },
      {
        $inc: { viewsCount: 1 },
      },
      { returnDocument: "after" }
    );
    if (!updatedDoc) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(updatedDoc);
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

    res.json(post);
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
