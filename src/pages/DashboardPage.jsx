import { useAuth } from "../contexts/AuthContext";

export default function DashboardPage() {
  const { user, logout } = useAuth();

  return (
    <div className="p-6">
      <h1 className="text-2xl">Welcome {user?.fullName}</h1>

      <img src={user?.avatar} className="w-24 h-24 rounded-full mt-4" />

      <p>Email: {user?.email}</p>
      <p>Username: {user?.username}</p>

      <button
        onClick={logout}
        className="bg-red-500 text-white p-2 mt-4"
      >
        Logout
      </button>
    </div>
  );
}