import { useEffect, useState } from "react";
import Icon from "@mdi/react";
import { mdiCamera, mdiDelete } from "@mdi/js";
import FileInputElement from "../common/FileInputElement";

interface ImageUploaderProps {
  onFileSelect: (file: File | null) => void;
  initialPreview?: string | null;
  customClassName?: string;
}

function ImageUploader({
  onFileSelect,
  initialPreview = null,
  customClassName,
}: ImageUploaderProps) {
  useEffect(() => {
    setPreview(initialPreview);
  }, [initialPreview]);
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      onFileSelect(file);
    }
  };

  const handleClearFile = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();
    setSelectedFile(null);
    setPreview(null);
    onFileSelect(null);
  };

  return (
    <FileInputElement
      onChange={handleFileChange}
      accept=".jpg,.gif,.png"
      customClassName={`!bg-gray-100 group cursor-pointer flex justify-center items-center ${
        customClassName ? customClassName : ""
      }`}
    >
      {preview ? (
        <div className="relative w-full rounded-[6px] h-full">
          <div className="absolute w-full opacity-0 group-hover:opacity-100 transition duration-200 flex items-center justify-center h-full rounded-[6px] bg-black/50">
            <Icon path={mdiCamera} size={5} className="text-white" />
          </div>
          <img
            src={preview}
            alt="Preview"
            className="w-full h-full object-cover rounded-[6px]"
          />
          <button
            onClick={handleClearFile}
            className="absolute top-[10px] right-[10px] opacity-0 group-hover:opacity-100 transition duration-200"
          >
            <Icon
              path={mdiDelete}
              size={1.5}
              className="text-red-500 hover:text-red-400 hover:scale-[1.1] transition duration-200"
            />
          </button>
        </div>
      ) : (
        <Icon path={mdiCamera} size={5} className="text-gray-400" />
      )}
    </FileInputElement>
  );
}

export default ImageUploader;
