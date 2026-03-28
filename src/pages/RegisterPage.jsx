import { useState } from "react";
import { validateRegister } from "../utils/Validation";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [data, setData] = useState({});
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

const handleImage = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  // 🚫 limit size (1MB)
  if (file.size > 1000000) {
    alert("Image too large (max 1MB)");
    return;
  }

  const reader = new FileReader();
  reader.onloadend = () => {
    setData({ ...data, avatar: reader.result });
  };

  reader.readAsDataURL(file);
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validateRegister(data);
    setErrors(errs);

    if (Object.keys(errs).length === 0) {
      try {
        await register(data);
      toast.success("Registered successfully 🎉")
        navigate("/login");
      } catch (err) {
       toast.error(err.message)
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 shadow w-96 mx-auto mt-20 bg-gray-100 dark:bg-gray-100">
      <h2 className="text-xl mb-4 text-black dark:text-black">Register</h2>

      <input placeholder="username"
      className="border p-2 w-full rounded 
             placeholder:text-gray-400 
             dark:placeholder:text-gray-500 
             bg-white dark:bg-white text-black border-black"
      onChange={(e) => setData({ ...data, username: e.target.value })} />
      <p className="text-red-500">{errors.username}</p>
       
        <input placeholder="Full Name"
        className="border p-2 w-full rounded mt-2
             placeholder:text-gray-400 
             dark:placeholder:text-gray-500 
             bg-white dark:bg-white text-black border-black"
        onChange={(e) => setData({ ...data, fullName: e.target.value })} />
      <p className="text-red-500">{errors.fullName}</p>
       
      

      <input placeholder="Email" 
      className="border p-2 w-full rounded mt-2
             placeholder:text-gray-400 
             dark:placeholder:text-gray-500 
             bg-white dark:bg-white text-black border-black"
      onChange={(e) => setData({ ...data, email: e.target.value })} />
      <p className="text-red-500">{errors.email}</p>

      <div className="relative">
  
  <input
    type={showPassword ? "text" : "password"}
    placeholder="Password"
    className="border p-2 w-full rounded mt-2
             placeholder:text-gray-400 
             dark:placeholder:text-gray-500 
             bg-white dark:bg-white text-black border-black"
    onChange={(e) => setData({ ...data, password: e.target.value })}
  />

  <span
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-3 bottom-2 cursor-pointer text-sm text-black dark:text-black"
  >
    {showPassword ? "Hide" : "Show"}
  </span>
 </div>
      <p className="text-red-500">{errors.password}</p>
      
   
      <div className="mt-3">
  <p className="text-sm mb-1 text-black">Upload Profile Picture:</p>

  <input
    type="file"
    accept="image/*"
    onChange={handleImage}
    className="text-sm text-black "
  />
</div>
      <div className="mt-3">
  <p className=" text-black dark:text-black">Select Avatar:</p>

  <div className="flex gap-2 mt-2">
    {[
      "https://i.pravatar.cc/150?img=21",
      "https://i.pravatar.cc/150?img=2",
      "https://i.pravatar.cc/150?img=5",
      "https://i.pravatar.cc/150?img=4",
      "https://i.pravatar.cc/150?img=48",
      "https://i.pravatar.cc/150?img=54",
    ].map((img) => (
      <img
        key={img}
        src={img}
        onClick={() => setData({ ...data, avatar: img })}
        className={`w-12 h-12 rounded-full cursor-pointer border ${
          data.avatar === img ? "border-blue-500" : ""
        }`}
      />
    ))}
  </div>
</div>


      <button className="bg-green-500 text-white w-full p-2 mt-2">
        Register
      </button>
      <p className="mt-2 text-sm  text-black dark:text-black">
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