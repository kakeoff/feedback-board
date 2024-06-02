import { Link } from "react-router-dom";
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
    <div className="flex flex-col items-center gap-[20px] h-full w-full">
      {props.posts.items.map((post) => (
        <Link key={post.id} className="w-full" to={`/posts/${post.id}`}>
          <PostCard post={post} />{" "}
        </Link>
      ))}
    </div>
  );
}
