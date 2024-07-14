import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, fetchTags } from "../redux/slices/posts";
import { AppDispatch, RootState } from "../redux/store";
import { PostsScreen } from "../components/posts/PostsScreen";
import { TagsList } from "../components/tags/TagsList";
import { PostsScreenLoader } from "../components/posts/PostsScreenLoader";
import { LoadingStatus } from "../types";

export function HomeView() {
  const dispatch = useDispatch<AppDispatch>();
  const { posts, tags } = useSelector((state: RootState) => state.posts);
  const isPostsLoading = posts.status === LoadingStatus.LOADING;
  React.useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
  }, []);

  return (
    <div className="pb-[30px] px-[20px] md:px-[150px]">
      <div className="flex md:flex-row flex-col-reverse justify-between gap-[20px]">
        {isPostsLoading ? (
          <PostsScreenLoader
            showSpinner={false}
            itemHeight={300}
            itemsCount={3}
          />
        ) : (
          <PostsScreen posts={posts} />
        )}
        <TagsList tags={tags} />
      </div>
    </div>
  );
}
