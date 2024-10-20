import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, fetchTags } from "../redux/slices/posts";
import { AppDispatch, RootState } from "../redux/store";
import { PostsScreen } from "../components/posts/PostsScreen";
import { TagsList } from "../components/tags/TagsList";
import { PostsScreenLoader } from "../components/posts/PostsScreenLoader";
import { LoadingStatus } from "../types";
import { useNavigate, useSearchParams } from "react-router-dom";
import { SearchInput } from "../components/common/SearchInput";

export function HomeView() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  let currentPageQuery: number = searchParams.get("page")
    ? Number(searchParams.get("page"))
    : 1;

  const tagQuery: string | undefined = searchParams.get("tag") || undefined;
  const searchQuery: string | undefined =
    searchParams.get("search") || undefined;

  const { posts, tags } = useSelector((state: RootState) => state.posts);
  const isPostsLoading = posts.status === LoadingStatus.LOADING;
  const cachedPostsData: {
    tag?: string;
    search?: string;
    page: number | null;
  } = useSelector((state: RootState) => ({
    tag: state.posts.posts.selectedTag,
    search: state.posts.posts.search,
    page: state.posts.posts.currentPage,
  }));
  const totalPages = useSelector(
    (state: RootState) => state.posts.posts.totalPages
  );

  React.useEffect(() => {
    if (
      cachedPostsData.page !== currentPageQuery ||
      cachedPostsData.tag !== tagQuery?.toString().toLowerCase().trim() ||
      cachedPostsData.search !== searchQuery?.toString().toLowerCase().trim()
    ) {
      dispatch(
        fetchPosts({
          page: currentPageQuery,
          limit: 5,
          tag: tagQuery,
          search: searchQuery,
        })
      );
    }
  }, [currentPageQuery, tagQuery, searchQuery, dispatch]);

  React.useEffect(() => {
    if (!tags.items.length) {
      dispatch(fetchTags());
    }
  }, []);
  React.useEffect(() => {
    if (currentPageQuery > totalPages && totalPages !== 0) {
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
          <div className="w-full mb-[20px]">
            <SearchInput />
          </div>
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
                        currentPageQuery === i + 1 ? "bg-blue-300" : ""
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
        <div className="flex flex-col gap-[10px]">
          <TagsList tags={tags} />
        </div>
      </div>
    </div>
  );
}
