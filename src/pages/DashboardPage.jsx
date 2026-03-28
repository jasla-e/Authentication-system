import { useAuth } from "../contexts/AuthContext";

export default function DashboardPage() {
  const { user, logout } = useAuth();

  return (
    <div className="p-6 text-center flex flex-col items-center">
      <h1 className="text-2xl mt-3">Welcome {user?.fullName}</h1>

    <img
  src={user?.avatar || "https://i.pravatar.cc/150"}
  className="w-50 h-50 mt-15 rounded-full "
  />

      <p className="mt-9">Email: {user?.email}</p>
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