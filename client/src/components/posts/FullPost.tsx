import axios from "../../axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PostType } from "../../types";
import { FullPostCard } from "./FullPostCard";
import { PostsScreenLoader } from "./PostsScreenLoader";

export function FullPost() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<PostType | null>(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`/posts/${id}`)
      .then((res) => {
        setPost(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        alert("Error while loading post");
      });
  }, []);
  return (
    <div className="h-full w-full pb-[30px] px-[15px] md:px-[110px] flex items-center justify-center">
      {isLoading || !post ? (
        <PostsScreenLoader showSpinner itemHeight={700} itemsCount={1} />
      ) : (
        <FullPostCard post={post} />
      )}
    </div>
  );
}
