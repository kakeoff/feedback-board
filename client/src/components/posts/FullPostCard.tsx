import { PostType } from "../../types";
import { mdiEyeOutline, mdiUpdate, mdiCalendarCheckOutline } from "@mdi/js";
import Icon from "@mdi/react";
import "@mdxeditor/editor/style.css";
import { Editor } from "../common/editor/Editor";
import { useState } from "react";
import { ConfirmModal } from "../common/ConfirmModal";
import { deletePost } from "../../redux/slices/posts";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { TagItem } from "../common/TagItem";

interface FullPostCardProps {
  post: PostType;
}

export function FullPostCard(props: FullPostCardProps) {
  const url = import.meta.env.VITE_SERVER_URL;
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const createdAt = new Date(props.post.createdAt).toLocaleDateString();
  const updatedAt = new Date(props.post.updatedAt).toLocaleString();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const userData = useSelector((state: RootState) => state.auth.data);
  const isMyPost = userData?.id === props.post.user.id;

  const onDeletePost = async (): Promise<void> => {
    await dispatch(deletePost(props.post.id));
    setShowDeleteDialog(false);
    navigate("/");
  };

  return (
    <div className="w-full flex flex-col gap-[10px]">
      {isMyPost && (
        <div className="flex gap-[10px] justify-end mb-[10px]">
          <button
            onClick={() => navigate(`/posts/${props.post.id}/edit`)}
            className="bg-green-100 px-[10px] py-[5px] rounded-[6px] hover:scale-[1.05] hover:bg-blue-200 transition duration-200"
          >
            EDIT
          </button>
          <button
            onClick={() => setShowDeleteDialog(true)}
            className="bg-red-100 px-[10px] py-[5px] rounded-[6px] hover:scale-[1.05] hover:bg-blue-200 transition duration-200"
          >
            DELETE
          </button>
        </div>
      )}

      <div className="w-full min-w-[350px] flex flex-col rounded-[8px] shadow-lg border overflow-hidden">
        {props.post.imageUrl && (
          <img
            className="w-[100%] h-[700px] object-cover"
            src={`${url}${props.post.imageUrl}`}
            alt="post img"
          />
        )}

        <div className="bg-gray-100 p-[10px] flex flex-col gap-[8px]">
          <p className="font-[700] break-words text-[35px]">
            {props.post.title}
          </p>
          <div className="flex flex-col flex-wrap text-[25px] gap-[10px]">
            <div className="flex gap-[5px] items-center">
              <Icon path={mdiCalendarCheckOutline} size={1.5} color="black" />
              <p className="font-[500]">Published {createdAt}</p>
            </div>
            <div className="flex flex-row gap-[10px] items-center">
              <img
                className="w-[32px] h-[32px] object-cover border-[1px] rounded-[100%]"
                src={`${url}${props.post.user.avatarUrl}`}
                alt="avatar"
              />
              <p className="font-[500]">{props.post.user.fullName}</p>
            </div>
            <div className="flex flex-wrap gap-[5px]">
              {props.post.tags.map((tag) => (
                <TagItem key={tag} tag={tag} />
              ))}
            </div>
          </div>
          <div className="my-[20px] h-[1px] bg-gray-300" />
          <Editor markdown={props.post.text} readOnly={true} />
          <div className="flex gap-[10px] justify-end">
            <div className="flex gap-[3px] text-gray-500 text-[13px] items-center">
              <Icon path={mdiUpdate} size={0.7} color="gray" />
              <span className="mt-[2px]">{updatedAt}</span>
            </div>
            <div className="flex gap-[3px] text-gray-500 text-[13px] items-center">
              <Icon path={mdiEyeOutline} size={0.7} color="gray" />
              <span className="mt-[2px]">{props.post.viewsCount}</span>
            </div>
          </div>
        </div>
      </div>
      {showDeleteDialog && (
        <ConfirmModal
          text="Are you sure you want to delete post?"
          title="Delete post"
          onClose={() => setShowDeleteDialog(false)}
          onSubmit={() => onDeletePost()}
        />
      )}
    </div>
  );
}
