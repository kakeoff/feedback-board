import { Link } from "react-router-dom";
import { useState } from "react";
import { AuthModal } from "./auth/AuthModal";
import { RegisterModal } from "./auth/RegisterModal";

export interface AuthFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  email: string;
  userName: string;
  password: string;
  avatar: File | null;
}

export function Navbar() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const onLogin = (data: AuthFormData) => {
    console.log(data);
    setShowLogin(false);
  };

  const onRegister = (data: RegisterFormData) => {
    console.log(data);
    setShowRegister(false);
  };

  return (
    <>
      <nav className="w-full flex fixed z-[10] bg-white justify-center pt-[10px]">
        <div className="w-full mx-[15px] md:mx-[100px] p-[10px] rounded-[6px] flex justify-between items-center border-[1px] shadow-lg">
          <Link to="/">
            <span className="font-[700] transition duration-200 hover:text-blue-900">
              MERN-POSTS
            </span>
          </Link>
          <div className="flex flex-row gap-[5px] font-[700] text-[13px]">
            <button
              onClick={() => setShowLogin(true)}
              className="bg-blue-100 px-[10px] py-[5px] rounded-[6px] hover:scale-[1.05] hover:bg-blue-200 transition duration-200"
            >
              LOGIN
            </button>
            <button
              onClick={() => setShowRegister(true)}
              className="bg-green-100 px-[10px] py-[5px] rounded-[6px] hover:scale-[1.05] hover:bg-green-200 transition duration-200"
            >
              REGISTER
            </button>
          </div>
        </div>
      </nav>
      {showLogin && (
        <AuthModal onClose={() => setShowLogin(false)} onLogin={onLogin} />
      )}
      {showRegister && (
        <RegisterModal
          onClose={() => setShowRegister(false)}
          onRegister={onRegister}
        />
      )}
    </>
  );
}
