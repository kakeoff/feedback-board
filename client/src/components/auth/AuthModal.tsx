import { AuthFormData } from "../Navbar";
import { Modalbox } from "../common/Modalbox";
import { useForm, SubmitHandler } from "react-hook-form";

interface AuthModalProps {
  onClose: () => void;
  onLogin: (data: AuthFormData) => void;
}

export function AuthModal(props: AuthModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormData>();

  const onSubmit: SubmitHandler<AuthFormData> = (data) => {
    props.onLogin(data);
  };
  return (
    <Modalbox width={"300px"} title={"Login"} onClose={props.onClose}>
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
            type="email"
          />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
        </div>
        <div className="flex flex-col gap-[5px] w-full">
          <p>Password</p>
          <input
            {...register("password", { required: "Password is required" })}
            placeholder="Type your password..."
            className="w-full bg-gray-100 p-[5px] rounded-[6px] focus:outline-none focus:bg-gray-200  transition duration-200"
            type="password"
          />
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}
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
