import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";
import { GetPostsResponse, PostDto } from "../../dto";
import { LoadingStatus, PostType, PostValidationError } from "../../types";

interface PostsState {
  posts: {
    items: PostType[];
    status: LoadingStatus;
    currentPage: number | null;
    totalPages: number;
    selectedTag?: string;
    search?: string;
  };
  myPosts: {
    items: PostType[];
    status: LoadingStatus;
  };
  tags: {
    items: string[];
    status: LoadingStatus;
  };
}

interface IPageParams {
  page: number;
  limit?: number;
  tag?: string;
  search?: string;
}

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async ({
    page,
    limit,
    tag,
    search,
  }: IPageParams): Promise<GetPostsResponse> => {
    const { data } = await axios.get<GetPostsResponse>("/posts", {
      params: { page, limit, tag, search },
    });
    return data;
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (postId: string): Promise<string> => {
    await axios.delete(`/posts/${postId}`);
    return postId;
  }
);

export const createPost = createAsyncThunk<
  PostType,
  PostDto,
  { rejectValue: PostValidationError[] | string[] }
>("posts/createPost", async (dto, { rejectWithValue }) => {
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

export const updatePost = createAsyncThunk<
  PostType,
  { id: string; dto: PostDto },
  { rejectValue: PostValidationError[] | string[] }
>("posts/updatePost", async ({ id, dto }, { rejectWithValue }) => {
  try {
    const { data } = await axios.patch<PostType>(`/posts/${id}`, dto);
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
  async (): Promise<string[]> => {
    const { data } = await axios.get<string[]>("/tags");
    return data;
  }
);

const initialState: PostsState = {
  posts: {
    items: [],
    status: LoadingStatus.LOADING,
    currentPage: null,
    totalPages: 0,
    selectedTag: undefined,
    search: undefined,
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
        state.posts.currentPage = null;
        state.posts.totalPages = 0;
        state.posts.selectedTag = undefined;
        state.posts.search = undefined;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts.items = action.payload.posts;
        state.posts.status = LoadingStatus.LOADED;
        state.posts.currentPage = action.payload.currentPage;
        state.posts.totalPages = action.payload.totalPages;
        state.posts.selectedTag = action.payload.selectedTag;
        state.posts.search = action.payload.search;
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.posts.items = [];
        state.posts.status = LoadingStatus.ERROR;
        state.posts.currentPage = null;
        state.posts.totalPages = 0;
        state.posts.selectedTag = undefined;
        state.posts.search = undefined;
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

      .addCase(updatePost.fulfilled, (state, action) => {
        const postIdx = state.posts.items.findIndex(
          (i) => i.id === action.payload.id
        );
        if (postIdx !== -1) {
          state.posts.items[postIdx] = action.payload;
        }
        const myPostIdx = state.myPosts.items.findIndex(
          (i) => i.id === action.payload.id
        );
        if (myPostIdx !== -1) {
          state.myPosts.items[postIdx] = action.payload;
        }
      })

      .addCase(deletePost.fulfilled, (state, action) => {
        const postIdx = state.posts.items.findIndex(
          (i) => i.id === action.payload
        );
        if (postIdx !== -1) {
          state.posts.items.splice(postIdx, 1);
        }
        const myPostIdx = state.myPosts.items.findIndex(
          (i) => i.id === action.payload
        );
        if (myPostIdx !== -1) {
          state.myPosts.items.splice(myPostIdx, 1);
        }
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
