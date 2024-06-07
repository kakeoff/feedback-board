import { Link } from "react-router-dom";
import { useState } from "react";
import { AuthModal } from "./auth/AuthModal";
import { RegisterModal } from "./auth/RegisterModal";
import { useDispatch, useSelector } from "react-redux";
import { checkIsAuth, fetchAuth, logout } from "../redux/slices/auth";
import { AuthFormData } from "../types";
import { AppDispatch } from "../redux/store";
import { ConfirmModal } from "./common/ConfirmModal";

export interface RegisterFormData {
  email: string;
  userName: string;
  password: string;
  avatar: File | null;
}

export function Navbar() {
  const dispatch = useDispatch<AppDispatch>();
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const isAuth: boolean = useSelector(checkIsAuth);

  const onLogin = async (data: AuthFormData) => {
    const result = await dispatch(fetchAuth(data));
    if (fetchAuth.fulfilled.match(result)) {
      setShowLogin(false);
      setLoginError(null);
    } else if (fetchAuth.rejected.match(result)) {
      setLoginError("Authorization failed. Please check your credentials.");
    }
  };

  const onRegister = (data: RegisterFormData) => {
    console.log(data);
    setShowRegister(false);
  };

  const onCloseAuthModal = () => {
    setShowLogin(false);
    setLoginError(null);
  };

  const onLogout = () => {
    dispatch(logout());
    setShowLogout(false);
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
          {!isAuth && (
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
          )}
          {isAuth && (
            <div className="flex flex-row gap-[5px] font-[700] text-[13px]">
              <button
                onClick={() => {}}
                className="bg-blue-300 px-[10px] py-[5px] rounded-[6px] hover:scale-[1.05] hover:bg-blue-400 transition duration-200"
              >
                CREATE POST
              </button>
              <button
                onClick={() => setShowLogout(true)}
                className="bg-red-300 px-[10px] py-[5px] rounded-[6px] hover:scale-[1.05] hover:bg-red-400 transition duration-200"
              >
                LOGOUT
              </button>
            </div>
          )}
        </div>
      </nav>
      {showLogin && (
        <AuthModal
          onClose={onCloseAuthModal}
          onLogin={onLogin}
          error={loginError}
        />
      )}
      {showRegister && (
        <RegisterModal
          onClose={() => setShowRegister(false)}
          onRegister={onRegister}
        />
      )}
      {showLogout && (
        <ConfirmModal
          text="Are you sure you want to exit?"
          title="Exit"
          onClose={() => setShowLogout(false)}
          onSubmit={onLogout}
        />
      )}
    </>
  );
}
