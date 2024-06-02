import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";
import { LoadingStatus, PostType } from "../../types";

interface PostsState {
  posts: {
    items: PostType[];
    status: LoadingStatus;
  };
  tags: {
    items: String[];
    status: LoadingStatus;
  };
}

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

const initialState: PostsState = {
  posts: {
    items: [],
    status: LoadingStatus.LOADING,
  },
  tags: {
    items: [],
    status: LoadingStatus.LOADING,
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
        state.posts.status = LoadingStatus.LOADING;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts.items = action.payload;
        state.posts.status = LoadingStatus.LOADED;
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.posts.items = [];
        state.posts.status = LoadingStatus.ERROR;
      })

      .addCase(fetchTags.pending, (state) => {
        state.tags.items = [];
        state.tags.status = LoadingStatus.LOADING;
      })
      .addCase(fetchTags.fulfilled, (state, action) => {
        state.tags.items = action.payload;
        state.tags.status = LoadingStatus.LOADED;
      })

      .addCase(fetchTags.rejected, (state) => {
        state.tags.items = [];
        state.tags.status = LoadingStatus.ERROR;
      });
  },
});

export const postsReducer = postsSlice.reducer;
