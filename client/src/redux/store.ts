import { configureStore } from "@reduxjs/toolkit";
import { postsReducer } from "./slices/posts";

const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
