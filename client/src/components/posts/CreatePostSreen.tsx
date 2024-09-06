import { useState } from "react";
import InputElement from "../common/InputElement";

function CreatePostScreen() {
  const [title, setTitle] = useState<string>("");
  const handleChangeTitle = (value: string) => {
    setTitle(value);
  };
  return (
    <div className="h-full w-full pb-[30px] px-[15px] md:px-[110px] flex">
      <InputElement
        placeholder="Type a title of post..."
        onChange={handleChangeTitle}
      />
      {title}
    </div>
  );
}
export default CreatePostScreen;
