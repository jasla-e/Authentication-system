import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as api from "../services/authApi";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  const handleReset = async () => {
    try {
      const res = await api.checkUsername(); // your existing function

      // safety check
      if (!res || !res.data || !Array.isArray(res.data)) {
        alert("Server error");
        return;
      }

      const user = res.data.find((u) => u.email === email);

      if (!user) {
        alert("Email not found");
        return;
      }

      // update user
      await api.updateUser(user.id, {
        ...user,
        password: newPassword,
      });

      alert("Password updated!");
      navigate("/login");
    } catch (err) {
      console.error("RESET ERROR:", err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-6 shadow w-80">
        <h2 className="text-xl mb-4">Forgot Password</h2>

        <input
          placeholder="Enter Email"
          className="border p-2 w-full mb-2"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="New Password"
          className="border p-2 w-full mb-2"
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <button
          onClick={handleReset}
          className="bg-blue-500 text-white w-full p-2 mt-2"
        >
          Reset Password
        </button>
      </div>
    </div>
  );
}