import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../provider/Authprovider";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";


const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const getFirstName = () => {
    if (!user) return "";
    if (user.displayName) return user.displayName.split(" ")[0];
    if (user.email) return user.email.split("@")[0];
    return "User";
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "Packages", path: "/packages" },
    {name:"Hotel",path:"/hotel"},
  ];

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#fefcf4]/90 via-[#f9f7ef]/90 to-[#fefcf4]/90 backdrop-blur-md border-b border-emerald-200/40 shadow-md"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 lg:px-10 py-3 text-emerald-900">
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Link
            to="/"
            className="text-2xl lg:text-3xl font-extrabold flex items-center gap-1 tracking-wide"
          >
            <motion.span
              className="text-emerald-600 text-4xl font-black"
              animate={{ y: [0, -4, 0] }}
              transition={{ repeat: Infinity, duration: 2.5 }}
            >
              S
            </motion.span>
            mart<span className="text-lime-600 ml-1">Travel</span>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex gap-10 font-medium tracking-wide">
          {navItems.map(({ name, path }) => (
            <motion.li
              key={name}
              whileHover={{ scale: 1.1, y: -2 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="cursor-pointer relative group"
            >
              <Link to={path} className="hover:text-emerald-600 transition">
                {name}
              </Link>
              <span className="absolute left-0 bottom-[-4px] w-0 h-[2px] bg-emerald-500 transition-all duration-300 group-hover:w-full"></span>
            </motion.li>
          ))}
        </ul>

        {/* User Section */}
        <div className="hidden lg:flex gap-3 items-center">
          {user ? (
            <>
              {user.photoURL ? (
                <motion.img
                  src={user.photoURL}
                  alt="profile"
                  className="w-9 h-9 rounded-full border border-emerald-400 shadow-md cursor-pointer"
                  whileHover={{ scale: 1.15 }}
                />
              ) : (
                <FaUserCircle size={30} className="text-emerald-500" />
              )}
              <motion.span
                className="font-semibold text-sm text-emerald-800"
                whileHover={{ scale: 1.05, color: "#059669" }}
              >
                {getFirstName()}
              </motion.span>
              <motion.button
                onClick={logout}
                className=" bg-white border border-emerald-600 text-emerald-600 font-medium px-2 py-0.80 rounded-full hover:bg-emerald-50 shadow-md transitionbackgr"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Logout
              </motion.button>
            </>
          ) : (
            ["Login", "Register"].map((btn) => (
              <motion.div
                key={btn}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={`/auth/${btn.toLowerCase()}`}
                  className="bg-gradient-to-r from-emerald-600 to-lime-500 text-white font-medium px-4 py-1.5 rounded-full hover:brightness-110 shadow-md transition"
                >
                  {btn}
                </Link>
              </motion.div>
            ))
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-2xl text-emerald-700"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white/90 backdrop-blur-xl text-emerald-900 flex flex-col items-center py-5 space-y-4 shadow-lg border-t border-emerald-100"
          >
            {navItems.map(({ name, path }) => (
              <Link
                key={name}
                to={path}
                onClick={() => setMenuOpen(false)}
                className="text-lg font-medium hover:text-emerald-600 transition"
              >
                {name}
              </Link>
            ))}

            <div className="flex flex-col gap-3 pt-3 border-t border-emerald-200 w-full text-center">
              {user ? (
                <>
                  <span className="font-semibold">{getFirstName()}</span>
                  <button
                    onClick={logout}
                    className="bg-gradient-to-r from-emerald-600 to-lime-500 text-white px-5 py-2 rounded-full font-medium hover:brightness-110 transition"
                  >
                    Logout
                  </button>
                </>
              ) : (
                ["Login", "Register"].map((btn) => (
                  <Link
                    key={btn}
                    to={`/auth/${btn.toLowerCase()}`}
                    onClick={() => setMenuOpen(false)}
                    className="bg-gradient-to-r from-emerald-600 to-lime-500 text-white px-5 py-2 rounded-full font-medium hover:brightness-110 transition"
                  >
                    {btn}
                  </Link>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
