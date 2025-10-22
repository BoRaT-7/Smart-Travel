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
  ];

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 shadow-sm bg-gradient-to-r from-[#0A6CFF] via-[#157ECE] to-[#0AC8FF] backdrop-blur-md"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 lg:px-10 py-3 text-white">
        
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
              className="text-yellow-400 text-4xl font-black"
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              S
            </motion.span>
            mart <span className="text-gray-100">Travel</span>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex gap-8 font-medium tracking-wide">
          {navItems.map(({ name, path }) => (
            <motion.li
              key={name}
              whileHover={{ scale: 1.1, y: -2 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="cursor-pointer hover:text-yellow-300"
            >
              <Link to={path}>{name}</Link>
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
                  className="w-9 h-9 rounded-full border border-white shadow-md cursor-pointer"
                  whileHover={{ scale: 1.15 }}
                />
              ) : (
                <FaUserCircle size={30} className="text-gray-100" />
              )}
              <motion.span
                className="font-semibold text-sm"
                whileHover={{ scale: 1.05, color: "#FFD700" }}
              >
                {getFirstName()}
              </motion.span>
              <motion.button
                onClick={logout}
                className="bg-white text-[#157ECE] font-medium px-3 py-1.5 rounded-full hover:bg-yellow-400 hover:text-white transition"
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
                  className="bg-white text-[#157ECE] font-medium px-3 py-1.5 rounded-full hover:bg-yellow-400 hover:text-white transition"
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
            className="text-2xl text-white"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-[#157ECE] bg-opacity-95 backdrop-blur-md text-white flex flex-col items-center py-5 space-y-4 shadow-lg"
          >
            {navItems.map(({ name, path }) => (
              <Link
                key={name}
                to={path}
                onClick={() => setMenuOpen(false)}
                className="text-lg font-medium hover:text-yellow-300 transition"
              >
                {name}
              </Link>
            ))}
            <div className="flex flex-col gap-3 pt-3 border-t border-white/20 w-full text-center">
              {user ? (
                <>
                  <span className="font-semibold">{getFirstName()}</span>
                  <button
                    onClick={logout}
                    className="bg-white text-[#157ECE] px-4 py-2 rounded-full font-medium hover:bg-yellow-400 hover:text-white transition"
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
                    className="bg-white text-[#157ECE] px-4 py-2 rounded-full font-medium hover:bg-yellow-400 hover:text-white transition"
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
