// src/Components/SideBar.jsx
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAdminAuth } from "../context/AuthContext";

const SideBar = () => {
    const { admin, logout } = useAdminAuth(); 
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  const menuItems = [
    { path: "/admin/dashboard", label: "Dashboard" },
    // চাইলে future এ আরো add করো:
    // { path: "/admin/bookings", label: "Bookings" },
    // { path: "/admin/users", label: "Users" },
  ];

  return (
    <aside className="hidden md:flex md:flex-col w-64 bg-white shadow-lg border-r">
      {/* Logo / title */}
      <div className="h-16 flex items-center px-4 border-b">
        <span className="text-lg font-semibold text-blue-600">
          Smart Travel Admin
        </span>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const active = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                active
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom user + logout */}
      <div className="border-t px-4 py-3 text-sm">
        <p className="text-gray-600">
          Logged in as{" "}
          <span className="font-medium">
            {admin?.name || admin?.email || "Admin"}
          </span>
        </p>
        <button
          onClick={handleLogout}
          className="mt-2 inline-flex items-center text-red-500 hover:text-red-600 text-xs font-medium"
        >
          Logout
        </button>
      </div>
    </aside>
  );
};

export default SideBar;
