import { PostType } from "../../types";
import { mdiEyeOutline, mdiUpdate, mdiCalendarCheckOutline } from "@mdi/js";
import Icon from "@mdi/react";
import { TagItem } from "../common/TagItem";

interface PostCardProps {
  post: PostType;
}

export function PostCard(props: PostCardProps) {
  const url = import.meta.env.VITE_SERVER_URL;

  const createdAt = new Date(props.post.createdAt).toLocaleDateString();
  const updatedAt = new Date(props.post.updatedAt).toLocaleString();

  return (
    <div className="w-full min-w-[350px] group transition duration-300 flex flex-col rounded-[8px] shadow-lg border overflow-hidden">
      {props.post.imageUrl && (
        <img
          className="w-[100%] h-[300px] object-cover"
          src={`${url}${props.post.imageUrl}`}
          alt="post img"
        />
      )}

      <div className="bg-gray-100 group-hover:bg-gray-200 transition overflow-hidden duration-200 p-[10px] flex flex-col gap-[8px]">
        <p className="font-[700] text-[21px] line-clamp-2 break-words">
          {props.post.title}
        </p>
        <div className="flex gap-[5px] items-center">
          <Icon path={mdiCalendarCheckOutline} size={1} color="black" />
          <p className="font-[700] text-[13px]">Published {createdAt}</p>
        </div>

        <div className="flex flex-row gap-[5px] items-center">
          <img
            className="w-[24px] h-[24px] object-cover border-[1px] rounded-[100%]"
            src={`${url}${props.post.user.avatarUrl}`}
            alt="avatar"
          />
          <p className="font-[700] text-[13px]">{props.post.user.fullName}</p>
        </div>

        <div className="flex flex-wrap gap-[5px]">
          {props.post.tags.map((tag) => (
            <TagItem key={tag} tag={tag} />
          ))}
        </div>

        <div className="flex gap-[10px] justify-end">
          <div className="flex gap-[3px] text-gray-500 text-[11px] items-center">
            <Icon path={mdiUpdate} size={0.7} color="gray" />
            <span className="mt-[2px]">{updatedAt}</span>
          </div>
          <div className="flex gap-[3px] text-gray-500 text-[11px] items-center">
            <Icon path={mdiEyeOutline} size={0.7} color="gray" />
            <span className="mt-[2px]">{props.post.viewsCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
