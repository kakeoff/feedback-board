import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="w-full h-screen flex flex-col gap-[20px] justify-center items-center">
      <p className="text-[35px] font-[700]">PAGE NOT FOUND</p>
      <button
        className="bg-blue-100 px-[10px] font-[700] py-[5px] rounded-[6px] hover:scale-[1.05] hover:bg-blue-200 transition duration-200"
        onClick={goBack}
      >
        RETURN BACK
      </button>
    </div>
  );
}
