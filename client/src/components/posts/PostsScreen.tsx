import { PostType } from "../../types";
import { PostCard } from "./PostCard";

interface PostsScreenProps {
  posts: {
    items: PostType[];
    status: string;
  };
}

export function PostsScreen(props: PostsScreenProps) {
  return (
    <div className="flex flex-col items-center gap-[20px] h-full">
      {props.posts.status === "loading" ? (
        <div>loading</div>
      ) : (
        props.posts.items.map((post) => <PostCard key={post.id} post={post} />)
      )}
    </div>
  );
}
