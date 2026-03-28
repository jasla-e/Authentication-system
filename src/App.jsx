import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";
import ForgotPassword from "./pages/ForgotPassword";
import React, { useState } from "react";
import { Toaster } from "react-hot-toast";

function App() {
   const [dark, setDark] = useState(false);
  return (

     <div
      style={{
        background: dark ? "black" : "white",
        color: dark ? "white" : "black",
        minHeight: "100vh",
      }}
    >
    
      <button onClick={() => setDark(!dark)}
         style={{
         padding: "10px 20px",
         fontSize: "20px",
         borderRadius: "8px",
         cursor: "pointer"
        }}
        >
        {dark ? "💡" : "🌙"}
      </button>

    <AuthProvider>
      <BrowserRouter>
      <Toaster position="top-center"/>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
    </div>
  );
}

export default App;
