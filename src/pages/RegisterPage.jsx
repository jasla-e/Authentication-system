import { useState } from "react";
import { validateRegister } from "../utils/Validation";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [data, setData] = useState({});
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validateRegister(data);
    setErrors(errs);

    if (Object.keys(errs).length === 0) {
      try {
        await register(data);
        navigate("/login");
      } catch (err) {
        alert(err.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 shadow w-96 mx-auto mt-20">
      <h2 className="text-xl mb-4">Register</h2>

      <input placeholder="Username" onChange={(e) => setData({ ...data, username: e.target.value })} />
      <p className="text-red-500">{errors.username}</p>

      <input placeholder="Email" onChange={(e) => setData({ ...data, email: e.target.value })} />
      <p className="text-red-500">{errors.email}</p>

      <input type="password" placeholder="Password" onChange={(e) => setData({ ...data, password: e.target.value })} />
      <p className="text-red-500">{errors.password}</p>

      <input placeholder="Full Name" onChange={(e) => setData({ ...data, fullName: e.target.value })} />
      <p className="text-red-500">{errors.fullName}</p>

      <button className="bg-green-500 text-white w-full p-2 mt-2">
        Register
      </button>
      <p className="mt-2 text-sm">
  Already have an account?{" "}
  <span
    className="text-blue-500 cursor-pointer"
    onClick={() => navigate("/login")}
  >
    Login
  </span>
  </p>
    </form>
  );
}