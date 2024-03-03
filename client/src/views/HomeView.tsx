import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, fetchTags } from "../redux/slices/posts";
import { AppDispatch, RootState } from "../redux/store";
import { PostsScreen } from "../components/posts/PostsScreen";
import { TagsList } from "../components/tags/TagsList";

export function HomeView() {
  const dispatch = useDispatch<AppDispatch>();
  const { posts, tags } = useSelector((state: RootState) => state.posts);
  const isPostsLoading = posts.status === "loading";
  React.useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
  }, []);

  console.log(posts);
  console.log(tags);
  return (
    <div className=" pt-[90px] pb-[30px] px-[20px] md:px-[150px]">
      <div className="flex md:flex-row flex-col-reverse justify-between gap-[20px]">
        {isPostsLoading ? <span>loading</span> : <PostsScreen posts={posts} />}
        <TagsList tags={tags} />
      </div>
    </div>
  );
}
