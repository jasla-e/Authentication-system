import { createContext, useContext, useEffect, useState } from "react"; 
import * as api from "../services/authApi"; 

const AuthContext=createContext();

export const AuthProvider=({children})=>{

    const [user,setUser]=useState(null);
    const [isLoading,setIsLoading]=useState(false);


    const login=async({email,password})=>{
        setIsLoading(true)
        const res = await api.loginUser(email);
        const foundUser = res.data[0];

    if (!foundUser || foundUser.password !== password) {
      throw new Error("Invalid credentials");
    }
    localStorage.setItem("userId", foundUser.id);
    setUser(foundUser);
    setIsLoading(false)
    };

    const register=async (data)=>{
        setIsLoading(true);
    const res = await api.checkUsername();

const exists = res.data.find(
  (user) => user.username === data.username
);

if (exists) {
  throw new Error("Username already exists");
}

const newUser = {
  ...data,
  avatar: data.avatar || "https://i.pravatar.cc/150", // fallback
  createdAt: new Date().toISOString(),
};

    await api.registerUser(newUser);
    setIsLoading(false);
    }
    const logout = () => {
    localStorage.removeItem("userId");
    setUser(null);
  };
  const fetchCurrentUser = async () => {
    const id = localStorage.getItem("userId");
    if (!id) return;

    setIsLoading(true);
    const res = await api.getUserById(id);
    setUser(res.data);
    setIsLoading(false);
  };

  const isAuthenticated = () => !!user;

  useEffect(() => {
    fetchCurrentUser();
  }, []);


  return (
    <AuthContext.Provider
    value={{user,
      isLoading,
      login,
      register,
      logout,
      isAuthenticated,
      fetchCurrentUser,

    }}>
      {children}
    </AuthContext.Provider>
  )

}

export const useAuth = () => useContext(AuthContext);