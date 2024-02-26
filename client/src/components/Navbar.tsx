import { Link } from "react-router-dom";
import { Modalbox } from "./common/Modalbox";
import { FormEvent, useState } from "react";

export function Navbar() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const onLogin = (event: FormEvent) => {
    event.preventDefault();
    console.log("Login logic here");
    setShowLogin(false);
  };

  const onRegister = (event: FormEvent) => {
    event.preventDefault();
    console.log("Reg logic here");
    setShowRegister(false);
  };

  return (
    <>
      <nav className="w-full flex fixed z-[10] bg-white justify-center pt-[10px]">
        <div className="w-[90%] p-[10px] rounded-[6px] flex justify-between items-center border-[1px] shadow-lg">
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
        <Modalbox
          width={"300px"}
          title={"Login"}
          onClose={() => setShowLogin(false)}
        >
          <form
            onSubmit={onLogin}
            className="text-[13px] text-gray-500 flex flex-col items-end gap-[10px]"
          >
            <div className="flex flex-col gap-[5px] w-full">
              <p>Email</p>
              <input
                placeholder="Type your email..."
                className="w-full bg-gray-100 p-[5px] rounded-[6px] focus:outline-none focus:bg-gray-200 hover:scale-[1.03] transition duration-200"
                type="text"
              />
            </div>
            <div className="flex flex-col gap-[5px] w-full">
              <p>Password</p>
              <input
                placeholder="Type your password..."
                className="w-full bg-gray-100 p-[5px] rounded-[6px] focus:outline-none focus:bg-gray-200 hover:scale-[1.03] transition duration-200"
                type="password"
              />
            </div>
            <button
              type="submit"
              className="bg-green-100 px-[10px] py-[5px] w-[100px] rounded-[6px] hover:scale-[1.03] hover:bg-green-200 transition duration-200"
            >
              Submit
            </button>
          </form>
        </Modalbox>
      )}
      {showRegister && (
        <Modalbox
          width={"300px"}
          title={"Register"}
          onClose={() => setShowRegister(false)}
        >
          <form
            onSubmit={onRegister}
            className="text-[13px] text-gray-500 flex flex-col items-end gap-[10px]"
          >
            <div className="flex flex-col gap-[5px] w-full">
              <p>Email</p>
              <input
                placeholder="Type your username..."
                className="w-full bg-gray-100 p-[5px] rounded-[6px] focus:outline-none focus:bg-gray-200 hover:scale-[1.03] transition duration-200"
                type="text"
              />
            </div>
            <div className="flex flex-col gap-[5px] w-full">
              <p>Username</p>
              <input
                placeholder="Type your username..."
                className="w-full bg-gray-100 p-[5px] rounded-[6px] focus:outline-none focus:bg-gray-200 hover:scale-[1.03] transition duration-200"
                type="text"
              />
            </div>
            <div className="flex flex-col gap-[5px] w-full">
              <p>Password</p>
              <input
                placeholder="Type your password..."
                className="w-full bg-gray-100 p-[5px] rounded-[6px] focus:outline-none focus:bg-gray-200 hover:scale-[1.03] transition duration-200"
                type="password"
              />
            </div>
            <div className="flex flex-col gap-[5px] w-full">
              <p>Avatar</p>
              <input
                className="w-full bg-gray-100 p-[5px] rounded-[6px] focus:outline-none focus:bg-gray-200 hover:scale-[1.03] transition duration-200"
                type="file"
              />
            </div>
            <button
              type="submit"
              className="bg-green-100 px-[10px] py-[5px] w-[100px] rounded-[6px] hover:scale-[1.03] hover:bg-green-200 transition duration-200"
            >
              Submit
            </button>
          </form>
        </Modalbox>
      )}
    </>
  );
}
