import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";
import { PostType } from "../../types";

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (): Promise<PostType[]> => {
    const { data } = await axios.get<PostType[]>("/posts");
    return data;
  }
);

export const fetchTags = createAsyncThunk(
  "posts/fetchTags",
  async (): Promise<String[]> => {
    const { data } = await axios.get<String[]>("/tags");
    return data;
  }
);

const initialState = {
  posts: {
    items: [] as PostType[],
    status: "loading",
  },
  tags: {
    items: [] as String[],
    status: "loading",
  },
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.posts.items = [];
        state.posts.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts.items = action.payload;
        state.posts.status = "loaded";
      })

      .addCase(fetchPosts.rejected, (state) => {
        state.posts.items = [];
        state.posts.status = "error";
      })

      .addCase(fetchTags.pending, (state) => {
        state.tags.items = [];
        state.tags.status = "loading";
      })
      .addCase(fetchTags.fulfilled, (state, action) => {
        state.tags.items = action.payload;
        state.tags.status = "loaded";
      })

      .addCase(fetchTags.rejected, (state) => {
        state.tags.items = [];
        state.tags.status = "error";
      });
  },
});

export const postsReducer = postsSlice.reducer;
