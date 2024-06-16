import { Link } from "react-router-dom";
import { useState } from "react";
import { AuthModal } from "./auth/AuthModal";
import { RegisterModal } from "./auth/RegisterModal";
import { useDispatch, useSelector } from "react-redux";
import {
  checkIsAuth,
  fetchAuth,
  fetchRegister,
  logout,
  updateMe,
} from "../redux/slices/auth";
import { AuthFormData } from "../types";
import { AppDispatch } from "../redux/store";
import { ConfirmModal } from "./common/ConfirmModal";
import { uploadFile } from "../helpers/uploadFile";

export interface RegisterFormDataWithAvatarFile {
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
  const [authError, setAuthError] = useState<string | null>(null);
  const isAuth: boolean = useSelector(checkIsAuth);

  const onLogin = async (data: AuthFormData) => {
    const result = await dispatch(fetchAuth(data));
    if (fetchAuth.fulfilled.match(result)) {
      setShowLogin(false);
      setAuthError(null);
    } else if (fetchAuth.rejected.match(result)) {
      setAuthError("Authorization failed. Please check your credentials.");
    }
  };

  const onRegister = async (data: RegisterFormDataWithAvatarFile) => {
    const result = await dispatch(
      fetchRegister({
        avatarUrl: null,
        email: data.email,
        fullName: data.userName,
        password: data.password,
      })
    );
    if (fetchRegister.fulfilled.match(result)) {
      if (data.avatar) {
        const avatarUrl = await uploadFile(data.avatar);
        await dispatch(updateMe({ avatarUrl }));
      }
      setShowRegister(false);
      setAuthError(null);
    } else if (fetchRegister.rejected.match(result)) {
      if (result.error.code === "ERR_BAD_REQUEST") {
        setAuthError("Registration failed. User is already exists.");
        return;
      }
      setAuthError("Registration failed. Please check your credentials.");
    }
  };

  const onCloseAuthModal = () => {
    setShowLogin(false);
    setAuthError(null);
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
              <Link to="/profile">
                <button
                  onClick={() => {}}
                  className="bg-green-300 px-[10px] py-[5px] rounded-[6px] hover:scale-[1.05] hover:bg-green-400 transition duration-200"
                >
                  PROFILE
                </button>
              </Link>
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
          error={authError}
        />
      )}
      {showRegister && (
        <RegisterModal
          onClose={() => setShowRegister(false)}
          onRegister={onRegister}
          error={authError}
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
