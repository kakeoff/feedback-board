import { useEffect, useState } from "react";
import InputElement from "../common/InputElement";
import ImageUploader from "../common/ImageUploader";
import { Editor } from "../common/editor/Editor";
import { uploadFile } from "../../helpers/uploadFile";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { PostDto } from "../../dto";
import { createPost, updatePost } from "../../redux/slices/posts";
import { mdiLoading } from "@mdi/js";
import Icon from "@mdi/react";
import { useNavigate, useParams } from "react-router-dom";
import { PostType, PostValidationError } from "../../types";
import axios from "../../axios";
import { PostsScreenLoader } from "./PostsScreenLoader";

function CreatePostScreen() {
  const dispatch = useDispatch<AppDispatch>();

  const { id } = useParams<{ id: string }>();

  const [title, setTitle] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [md, setMd] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<
    PostValidationError[] | string[] | undefined
  >([]);
  const navigate = useNavigate();
  const handleChangeTitle = (value: string): string => {
    setTitle(value);
    return value;
  };

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      axios
        .get<PostType>(`/posts/${id}`)
        .then((res) => {
          setTitle(res.data.title);
          setMd(res.data.text);
          setTags(res.data.tags);
          setImageUrl(
            res.data.imageUrl
              ? `${import.meta.env.VITE_SERVER_URL}${res.data.imageUrl}`
              : null
          );
        })
        .catch((error) => {
          console.error(error);
          alert("Error while loading post");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [id]);

  const handleChangeTags = (value: string): string => {
    const replaced = value.replaceAll(" ", "");
    value = replaced;
    const tags = replaced.split(",");
    setTags(tags);
    return replaced;
  };

  const handleChangeMd = (value: string): void => {
    setMd(value);
  };

  const handleChangeFile = (value: File | null): void => {
    setImageFile(value);
  };

  const handleCreatePost = async (): Promise<void> => {
    let imageUrl: string | undefined = undefined;
    setIsSaving(true);
    if (imageFile) {
      imageUrl = await uploadFile(imageFile);
    }
    const data: PostDto = {
      title,
      text: md,
      tags: tags,
      imageUrl,
    };
    const result = id
      ? await dispatch(updatePost({ id, dto: data }))
      : await dispatch(createPost(data));

    const postAction = id ? updatePost : createPost;
    if (postAction.fulfilled.match(result)) {
      navigate(`/posts/${result.payload.id}`);
    } else if (postAction.rejected.match(result)) {
      setErrors(result.payload);
    } else if (postAction.pending.match(result)) {
      setErrors([]);
    }
    setIsSaving(false);
  };

  return (
    <div className="h-full w-full px-[15px] md:px-[110px]">
      {isLoading ? (
        <PostsScreenLoader itemHeight={700} itemsCount={1} showSpinner />
      ) : (
        <div className="h-full w-full flex-col gap-[25px] text-[25px] pb-[30px] flex">
          <ImageUploader
            onFileSelect={handleChangeFile}
            initialPreview={imageUrl}
            customClassName="h-[700px]"
          />
          <InputElement
            type="text"
            value={title}
            placeholder="Type a title of post..."
            onChange={handleChangeTitle}
          />
          <div className="text-[20px]">
            <InputElement
              type="text"
              value={tags.join(",")}
              placeholder="Example tags: vue,react,angular,typescript..."
              onChange={handleChangeTags}
            />
          </div>
          <div className="border-[2px] rounded-b-[6px] rounded-t-[8px]">
            <Editor
              key={String(isLoading)}
              handleChange={handleChangeMd}
              markdown={md}
            />
          </div>
          <div className="text-[16px] ml-auto text-red-500">
            {errors &&
              errors.map((err, index) => (
                <div key={index}>{typeof err === "string" ? err : err.msg}</div>
              ))}
          </div>
          <button
            onClick={handleCreatePost}
            className="bg-blue-300 px-[10px] ml-auto py-[5px] h-[40px] flex justify-center items-center w-[300px] text-[20px] rounded-[6px] hover:scale-[1.05] hover:bg-blue-400 transition duration-200"
          >
            {isSaving ? (
              <Icon
                className="animate-spin"
                path={mdiLoading}
                size={1}
                color="white"
              />
            ) : (
              <>PUBLISH</>
            )}
          </button>
        </div>
      )}
    </div>
  );
}

export default CreatePostScreen;
