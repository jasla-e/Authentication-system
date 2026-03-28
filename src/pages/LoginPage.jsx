import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { validateLogin } from "../utils/Validation";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [data, setData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validateLogin(data);
    setErrors(errs);

    if (Object.keys(errs).length === 0) {
      try {
        await login(data);
        toast.success("Login successful ✅");
        navigate("/dashboard");
      } catch (err) {
        toast.error(err.message);
      }
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <form onSubmit={handleSubmit} className="p-8 shadow-lg rounded-lg w-[420px] bg-gray-100">
        <h2 className="text-xl mb-4 text-black ">Login</h2>

        <input
          placeholder="Email"
          className="border p-2 w-full mb-2 placeholder:text-gray-400 dark:placeholder:text-gray-500 text-black border-black"
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
        <p className="text-red-500">{errors.email}</p>

        <div className="relative">
    <input
    type={showPassword ? "text" : "password"}
    placeholder="Password"
    className="border p-2 w-full mb-2 placeholder:text-gray-400 dark:placeholder:text-gray-500  text-bl border-black"
    onChange={(e) => setData({ ...data, password: e.target.value })}
   />

  <span
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-3 top-2 cursor-pointer text-sm text-black"
  >
    {showPassword ? "Hide" : "Show"}
  </span>
  </div>
        <p className="text-red-500">{errors.password}</p>

        <button className="bg-blue-500 text-white w-full p-2 mt-2">
          Login
        </button>


           <p className="mt-2 text-sm text-black">
        Don't have an account?{" "}
    <span
    className="text-blue-500 cursor-pointer"
    onClick={() => navigate("/register")}
   >
    Register
   </span>
   </p>

 <p
  className="text-blue-500 text-sm cursor-pointer mt-2 text-center"
  onClick={() => navigate("/forgot-password")}
>
  Forgot Password?
</p>


      </form>
    </div>
  );
}