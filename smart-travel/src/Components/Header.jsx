import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../provider/Authprovider";

const Header = () => {
  const { user, logout } = useContext(AuthContext);

  const getFirstName = () => {
    if (!user) return "";
    if (user.displayName) return user.displayName.split(" ")[0];
    if (user.email) return user.email.split("@")[0];
    return "User";
  };

  return (
    <div className="bg-[#157ECE] fixed top-0 left-0 right-0 z-50 shadow-md">
      <div className="flex justify-between items-center lg:px-16 px-4 py-2 text-white">
        <Link to="/" className="text-2xl font-bold flex items-center gap-1">
          <span className="text-red-500 text-3xl">S</span>mart Travel
        </Link>

        <ul className="hidden lg:flex gap-6 font-semibold">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/shop">Shop</Link></li>
          <li><Link to="/packages">Packages</Link></li>
        </ul>

        <div className="flex gap-3 items-center">
          {user ? (
            <>
              <span className="font-semibold">{getFirstName()}</span>
              <button
                onClick={logout}
                className="btn btn-sm bg-white text-[#157ECE] hover:bg-blue-400 hover:text-white border-none"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/auth/login"
                className="btn btn-sm bg-white text-[#157ECE] hover:bg-blue-400 hover:text-white border-none"
              >
                Login
              </Link>
              <Link
                to="/auth/register"
                className="btn btn-sm bg-white text-[#157ECE] hover:bg-blue-400 hover:text-white border-none"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
