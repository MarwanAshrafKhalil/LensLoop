import { ChangeEvent, FormEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/app/hooks";
import { signinUser } from "../redux/features/user/user.action";
import "../styles/signin.css";

export default function SignIn() {
  const userError = useAppSelector((state) => state.user.error);
  const [formData, setFormData] = useState<FormData>({} as FormData);
  const dispatch = useAppDispatch();

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      dispatch(signinUser(formData));
      if (userError) {
        return;
      }
    } catch (error) {
      console.log("failed: ", error);
    }
  }
  return (
    <div className="signin_form">
      <p className="text-2xl">Login Required</p>
      <form onSubmit={handleSubmit} className=" ">
        <div className="my-5">
          <label htmlFor="username">Username</label>

          <input
            id="username"
            type="text"
            required
            placeholder="Username"
            onChange={handleChange}
          />
        </div>

        <div className="mb-10 flex-col">
          <label htmlFor="password">Password</label>

          <input
            id="password"
            type="password"
            required
            placeholder="Password"
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col gap-2">
          {userError && <span className="py-1 text-red-600">{userError}</span>}
          <button type="submit" className=" bg-slate-600 ">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
