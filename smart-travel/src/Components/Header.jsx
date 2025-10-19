import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../provider/Authprovider";
import { FaUserCircle } from "react-icons/fa"; // default icon
import { motion } from "framer-motion";

const Header = () => {
  const { user, logout } = useContext(AuthContext);

  const getFirstName = () => {
    if (!user) return "";
    if (user.displayName) return user.displayName.split(" ")[0];
    if (user.email) return user.email.split("@")[0];
    return "User";
  };

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-[#157ECE] fixed top-0 left-0 right-0 z-50 shadow-md"
    >
      <div className="flex justify-between items-center lg:px-16 px-4 py-2 text-white">
        
        {/* Logo animation */}
        <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
          <Link to="/" className="text-2xl font-bold flex items-center gap-1">
            <motion.span className="text-red-500 text-3xl animate-bounce">S</motion.span>
            mart Travel
          </Link>
        </motion.div>

        {/* Navigation */}
        <ul className="hidden lg:flex gap-6 font-semibold">
          {["Home", "Shop", "Packages"].map((item) => (
            <motion.li
              key={item}
              whileHover={{ scale: 1.1, y: -2 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="cursor-pointer"
            >
              <Link to={item === "Home" ? "/" : `/${item.toLowerCase()}`}>{item}</Link>
            </motion.li>
          ))}
        </ul>

        {/* User/Profile Section */}
        <div className="flex gap-3 items-center">
          {user ? (
            <>
              {user.photoURL ? (
                <motion.img
                  src={user.photoURL}
                  alt="profile"
                  className="w-8 h-8 rounded-full border-2 border-white cursor-pointer"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
              ) : (
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <FaUserCircle size={28} />
                </motion.div>
              )}
              <motion.span
                className="font-semibold cursor-default"
                whileHover={{ scale: 1.05, color: "#FFD700" }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {getFirstName()}
              </motion.span>
              <motion.button
                onClick={logout}
                className="btn btn-sm bg-white px-2 text-[#157ECE] hover:bg-blue-400 hover:text-white border-none"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Logout
              </motion.button>
            </>
          ) : (
            <>
              {["Login", "Register"].map((btn) => (
                <motion.div
                  key={btn}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link
                    to={`/auth/${btn.toLowerCase()}`}
                    className="btn btn-sm bg-white text-[#157ECE] hover:bg-blue-400 hover:text-white border-none"
                  >
                    {btn}
                  </Link>
                </motion.div>
              ))}
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Header;
