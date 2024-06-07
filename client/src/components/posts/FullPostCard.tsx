import { PostType } from "../../types";
import { mdiEyeOutline, mdiUpdate, mdiCalendarCheckOutline } from "@mdi/js";
import Icon from "@mdi/react";

interface FullPostCardProps {
  post: PostType;
}

export function FullPostCard(props: FullPostCardProps) {
  const url = "http://localhost:3001";

  const createdAt = new Date(props.post.createdAt).toLocaleDateString();
  const updatedAt = new Date(props.post.updatedAt).toLocaleString();

  return (
    <div className="w-full min-w-[350px] flex flex-col rounded-[8px] shadow-lg border overflow-hidden">
      {props.post.imageUrl && (
        <img
          className="w-[100%] h-[500px] object-cover"
          src={`${url}/${props.post.imageUrl}`}
          alt="post img"
        />
      )}

      <div className="bg-gray-100 p-[10px] flex flex-col gap-[8px]">
        <p className="font-[700] text-[21px]">{props.post.title}</p>
        <p>{props.post.text}</p>
        <div className="flex gap-[5px] items-center">
          <Icon path={mdiCalendarCheckOutline} size={1} color="black" />
          <p className="font-[700] text-[13px]">Published {createdAt}</p>
        </div>

        <div className="flex flex-wrap gap-[5px]">
          {props.post.tags.map((tag) => (
            <span
              key={tag}
              className="bg-blue-100 px-[5px] py-[2px] rounded-[4px]"
            >
              #{tag}
            </span>
          ))}
        </div>
        <div className="flex justify-between items-center mt-[20px]">
          <div className="flex flex-row gap-[10px] items-center">
            <img
              className="w-[32px] h-[32px] object-contain rounded-[100%]"
              src={`${url}/${props.post.user.avatarUrl}`}
              alt="avatar"
            />
            <p className="font-[700] text-[16px]">{props.post.user.fullName}</p>
          </div>
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
    </div>
  );
}