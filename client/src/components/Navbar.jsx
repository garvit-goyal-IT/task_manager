import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="bg-gray-800 border-b border-gray-700">
      <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Task Manager</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;