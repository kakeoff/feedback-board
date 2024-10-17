import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, fetchTags } from "../redux/slices/posts";
import { AppDispatch, RootState } from "../redux/store";
import { PostsScreen } from "../components/posts/PostsScreen";
import { TagsList } from "../components/tags/TagsList";
import { PostsScreenLoader } from "../components/posts/PostsScreenLoader";
import { LoadingStatus } from "../types";
import { useNavigate, useSearchParams } from "react-router-dom";

export function HomeView() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  let currentPage: number = searchParams.get("page")
    ? Number(searchParams.get("page"))
    : 1;

  const selectedTag: string | undefined = searchParams.get("tag") || undefined;

  const { posts, tags } = useSelector((state: RootState) => state.posts);
  const isPostsLoading = posts.status === LoadingStatus.LOADING;
  const cachedPage = useSelector(
    (state: RootState) => state.posts.posts.currentPage
  );
  const totalPages = useSelector(
    (state: RootState) => state.posts.posts.totalPages
  );

  const cachedTag = useSelector(
    (state: RootState) => state.posts.posts.selectedTag
  );

  React.useEffect(() => {
    if (cachedPage !== currentPage || cachedTag !== selectedTag) {
      dispatch(fetchPosts({ page: currentPage, limit: 5, tag: selectedTag }));
    }
  }, [currentPage, selectedTag, dispatch]);

  React.useEffect(() => {
    if (!tags.items.length) {
      dispatch(fetchTags());
    }
  }, []);
  React.useEffect(() => {
    if (currentPage > totalPages && totalPages !== 0) {
      navigatePage(totalPages);
    }
  }, [totalPages]);

  const navigatePage = (page: number) => {
    const currentParams = new URLSearchParams(window.location.search);
    currentParams.set("page", page.toString());
    navigate(`?${currentParams.toString()}`);
  };
  return (
    <div className="pb-[30px] px-[20px] lg:px-[200px]">
      <div className="flex md:flex-row flex-col-reverse justify-between gap-[20px]">
        <div className="w-full overflow-hidden h-full px-[10px]">
          {isPostsLoading ? (
            <PostsScreenLoader
              showSpinner={false}
              itemHeight={300}
              itemsCount={3}
            />
          ) : (
            <div className="flex flex-col gap-[15px]">
              <PostsScreen posts={posts} />
              <div className="flex gap-[5px] flex-wrap">
                {[
                  ...Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => navigatePage(i + 1)}
                      className={`w-[40px] h-[30px] rounded-[8px] hover:bg-blue-300 transition duration-200 bg-blue-100 flex items-center justify-center ${
                        currentPage === i + 1 ? "bg-blue-300" : ""
                      }`}
                    >
                      {i + 1}
                    </button>
                  )),
                ]}
              </div>
            </div>
          )}
        </div>
        <TagsList tags={tags} />
      </div>
    </div>
  );
}
