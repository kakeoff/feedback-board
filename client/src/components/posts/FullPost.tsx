import { useParams } from "react-router-dom";

export function FullPost() {
  const { id } = useParams();
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <p>postId {id}</p>
    </div>
  );
}
