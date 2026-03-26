import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { validateLogin } from "../utils/Validation";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [data, setData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validateLogin(data);
    setErrors(errs);

    if (Object.keys(errs).length === 0) {
      try {
        await login(data);
        navigate("/dashboard");
      } catch (err) {
        alert(err.message);
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="p-6 shadow w-80">
        <h2 className="text-xl mb-4">Login</h2>

        <input
          placeholder="Email"
          className="border p-2 w-full mb-2"
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
        <p className="text-red-500">{errors.email}</p>

        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-2"
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
        <p className="text-red-500">{errors.password}</p>

        <button className="bg-blue-500 text-white w-full p-2 mt-2">
          Login
        </button>


           <p className="mt-2 text-sm">
        Don't have an account?{" "}
    <span
    className="text-blue-500 cursor-pointer"
    onClick={() => navigate("/register")}
   >
    Register
   </span>
   </p>
      </form>
   
    </div>
  );
}