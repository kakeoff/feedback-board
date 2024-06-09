import axios from "../axios";

export const uploadFile = async (file: File): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append("image", file);
    const response = await axios.post<{ url: string }>("/upload", formData);
    return response.data.url;
  } catch (error) {
    console.error("Error while uploading file", error);
    throw error;
  }
};
