import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";
import { PostDto } from "../../dto";
import { LoadingStatus, PostType, PostValidationError } from "../../types";

interface PostsState {
  posts: {
    items: PostType[];
    status: LoadingStatus;
  };
  myPosts: {
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

export const createPost = createAsyncThunk<
  PostType,
  PostDto,
  { rejectValue: PostValidationError[] | string[] }
>("posts/createPost", async (dto: PostDto, { rejectWithValue }) => {
  try {
    const { data } = await axios.post<PostType>("/posts", dto);
    return data;
  } catch (error: any) {
    if (error.response && Array.isArray(error.response.data)) {
      return rejectWithValue(error.response.data);
    }
    return rejectWithValue(["Unknown error occurred"]);
  }
});

export const fetchMyPosts = createAsyncThunk(
  "posts/fetchMyPosts",
  async (): Promise<PostType[]> => {
    const { data } = await axios.get<PostType[]>("/posts/my");
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
  myPosts: {
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

      .addCase(fetchMyPosts.pending, (state) => {
        state.myPosts.items = [];
        state.myPosts.status = LoadingStatus.LOADING;
      })
      .addCase(fetchMyPosts.fulfilled, (state, action) => {
        state.myPosts.items = action.payload;
        state.myPosts.status = LoadingStatus.LOADED;
      })
      .addCase(fetchMyPosts.rejected, (state) => {
        state.myPosts.items = [];
        state.myPosts.status = LoadingStatus.ERROR;
      })

      .addCase(createPost.fulfilled, (state, action) => {
        state.posts.items.push(action.payload);
        state.myPosts.items.push(action.payload);
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
