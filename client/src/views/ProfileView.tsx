import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import {
  mdiAccountOutline,
  mdiArrowRight,
  mdiCalendarCheckOutline,
  mdiCamera,
  mdiEmailOutline,
  mdiPostOutline,
} from "@mdi/js";
import Icon from "@mdi/react";
import { useRef, useState } from "react";
import { uploadFile } from "../helpers/uploadFile";
import { updateMe } from "../redux/slices/auth";
import { LoadingStatus, PostType, UpdateMeData } from "../types";
import React from "react";
import { fetchMyPosts } from "../redux/slices/posts";
import { PostsScreenLoader } from "../components/posts/PostsScreenLoader";
import { useNavigate } from "react-router-dom";
import { ConfirmModal } from "../components/common/ConfirmModal";

interface PostsListProps {
  posts: PostType[];
}

function ProfileView() {
  const dispatch = useDispatch<AppDispatch>();
  const posts = useSelector((state: RootState) => state.posts);
  const userData = useSelector((state: RootState) => state.auth.data);
  const avatarUrl = `http://localhost:3001/${userData?.avatarUrl}`;
  const inputRef = useRef<HTMLInputElement>(null);
  const [showResetAvatar, setShowResetAvatar] = useState(false);

  React.useEffect(() => {
    dispatch(fetchMyPosts());
  }, []);

  const handleClickAvatar = (): void => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const onUpdateMe = async (data: UpdateMeData): Promise<void> => {
    await dispatch(updateMe(data));
    setShowResetAvatar(false);
  };
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    if (!event.target.files) return;
    const file = event.target.files[0];
    if (file) {
      const avatarUrl = await uploadFile(file);
      await onUpdateMe({ avatarUrl });
    }
  };

  return (
    <div className="flex w-full items-start h-[calc(100vh-110px)] pb-[10px] overflow-hidden justify-between gap-[20px] px-[100px]">
      <div className="bg-gray-100 border rounded-[8px] flex flex-col gap-[20px] items-center p-[20px] shadow-md h-full">
        <div className="w-[300px] h-[300px] flex-none overflow-hidden relative group rounded-[100%] shadow-md border-[1px] border-gray-500">
          <div onClick={handleClickAvatar} className="absolute w-full h-full">
            <div className="opacity-0 group-hover:opacity-100 flex transition-opacity duration-300 ease-in-out justify-center items-center w-full h-full bg-black/50 cursor-pointer">
              <Icon path={mdiCamera} size={5} color="white" />
            </div>
          </div>
          <input
            accept=".jpg,.gif,.png"
            onChange={handleFileChange}
            ref={inputRef}
            className="hidden"
            type="file"
          />
          <img
            className="w-full h-full object-cover"
            src={avatarUrl}
            alt="avatar"
          />
        </div>
        <div className="text-[25px] text-left flex justify-start gap-[10px] flex-col">
          <div className="flex items-center gap-[5px]">
            <Icon path={mdiAccountOutline} size={2} color="black" />
            <p>{userData?.fullName}</p>
          </div>
          <div className="flex items-center gap-[5px]">
            <Icon path={mdiEmailOutline} size={2} color="black" />
            <p>{userData?.email}</p>
          </div>
          <div className="flex items-center gap-[5px]">
            <Icon path={mdiCalendarCheckOutline} size={2} color="black" />
            <p>
              {userData?.createdAt &&
                new Date(userData.createdAt).toLocaleDateString()}
            </p>
          </div>
          <button
            className="bg-blue-300 px-[10px] py-[5px] text-[20px] rounded-[6px] hover:scale-[1.05] hover:bg-blue-400 transition duration-200"
            onClick={() => setShowResetAvatar(true)}
          >
            RESET AVATAR
          </button>
        </div>
      </div>
      <div className="bg-gray-100 border rounded-[8px] w-full flex flex-col gap-[20px] items-center p-[20px] shadow-md h-full">
        <div className="flex items-center text-[25px] gap-[5px]">
          <Icon path={mdiPostOutline} size={2} color="black" />
          <p>My posts</p>
        </div>
        <div className="h-full w-full flex flex-col gap-[10px] overflow-auto py-[10px]">
          {posts.posts.status !== LoadingStatus.LOADED ? (
            <PostsScreenLoader
              itemsCount={10}
              itemHeight={50}
              showSpinner={false}
            />
          ) : (
            <PostsList posts={posts.posts.items} />
          )}
        </div>
      </div>
      {showResetAvatar && (
        <ConfirmModal
          text="Are you sure you want to reset avatar?"
          title="Reset avatar"
          onClose={() => setShowResetAvatar(false)}
          onSubmit={() =>
            onUpdateMe({ avatarUrl: "uploads/default/default.png" })
          }
        />
      )}
    </div>
  );
}

const PostsList: React.FC<PostsListProps> = ({ posts }) => {
  const navigate = useNavigate();

  const gotoPost = (id: string) => {
    navigate(`/posts/${id}`);
  };
  return (
    <>
      {posts.map((post) => (
        <div
          key={post.id}
          className="shadow-md rounded-[8px] group relative hover:bg-gray-300 cursor-pointer transition duration-200 p-[15px] bg-gray-200"
        >
          <span>{post.title}</span>
          <button
            onClick={() => gotoPost(post.id)}
            className="bg-green-300 p-[5px] hidden group-hover:block absolute top-[8px] right-[8px] py-[5px] rounded-[6px] hover:scale-[1.05] hover:bg-green-400 transition duration-200"
          >
            <Icon path={mdiArrowRight} size={0.8} color="black" />
          </button>
        </div>
      ))}
    </>
  );
};

export default ProfileView;
