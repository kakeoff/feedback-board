import { useState } from "react";
import { RegisterFormDataWithAvatarFile } from "../Navbar";
import { Modalbox } from "../common/Modalbox";
import { useForm, SubmitHandler } from "react-hook-form";

interface RegisterModalProps {
  onClose: () => void;
  onRegister: (data: RegisterFormDataWithAvatarFile) => void;
  error: string | null;
}

export function RegisterModal(props: RegisterModalProps) {
  const [avatar, setAvatar] = useState<File | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormDataWithAvatarFile>();

  const onSubmit: SubmitHandler<RegisterFormDataWithAvatarFile> = (
    data: RegisterFormDataWithAvatarFile
  ) => {
    props.onRegister({ ...data, avatar });
  };
  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setAvatar(event.target.files[0]);
    }
  };
  return (
    <Modalbox width={"300px"} title={"Register"} onClose={props.onClose}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="text-[13px] text-gray-500 flex flex-col items-end gap-[10px]"
      >
        <div className="flex flex-col gap-[5px] w-full">
          <p>Email</p>
          <input
            {...register("email", { required: "Email is required" })}
            placeholder="Type your email..."
            className="w-full bg-gray-100 p-[5px] rounded-[6px] focus:outline-none focus:bg-gray-200 transition duration-200"
            style={errors.email ? { border: "1px solid red" } : {}}
            type="email"
          />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
        </div>
        <div className="flex flex-col gap-[5px] w-full">
          <p>Username</p>
          <input
            {...register("userName", { required: "Username is required" })}
            style={errors.userName ? { border: "1px solid red" } : {}}
            placeholder="Type your username..."
            className="w-full bg-gray-100 p-[5px] rounded-[6px] focus:outline-none focus:bg-gray-200  transition duration-200"
            type="text"
          />
          {errors.userName && (
            <span className="text-red-500">{errors.userName.message}</span>
          )}
        </div>
        <div className="flex flex-col gap-[5px] w-full">
          <p>Password</p>
          <input
            {...register("password", { required: "Password is required" })}
            style={errors.password ? { border: "1px solid red" } : {}}
            placeholder="Type your password..."
            className="w-full bg-gray-100 p-[5px] rounded-[6px] focus:outline-none focus:bg-gray-200  transition duration-200"
            type="password"
          />
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}
        </div>
        <div className="flex flex-col gap-[5px] w-full">
          <p>Avatar</p>
          <input
            className="w-full bg-gray-100 p-[5px] rounded-[6px] focus:outline-none focus:bg-gray-200  transition duration-200"
            type="file"
            accept=".jpg,.gif,.png"
            onChange={onFileChange}
          />
        </div>
        <div className="w-full">
          {props.error && <span className="text-red-500">{props.error}</span>}
        </div>
        <button
          type="submit"
          className="bg-green-100 px-[10px] py-[5px] w-[100px] rounded-[6px] hover:scale-[1.03] hover:bg-green-200 transition duration-200"
        >
          Submit
        </button>
      </form>
    </Modalbox>
  );
}
