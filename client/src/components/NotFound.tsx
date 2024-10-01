import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="w-full h-screen flex flex-col gap-[20px] justify-center items-center">
      <p className="text-[35px] font-[700]">PAGE NOT FOUND</p>
      <Link to={"/"}>
        <button className="bg-blue-100 px-[10px] font-[700] py-[5px] rounded-[6px] hover:scale-[1.05] hover:bg-blue-200 transition duration-200">
          RETURN
        </button>
      </Link>
    </div>
  );
}
