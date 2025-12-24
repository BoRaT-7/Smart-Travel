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
    return "Traveler";
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "Packages", path: "/packages" },
    { name: "Hotel", path: "/hotel" },
  ];

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 
      bg-gradient-to-r from-sky-900/80 via-blue-800/80 to-cyan-800/80 
      backdrop-blur-xl border-b border-white/10 shadow-xl"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 lg:px-10 py-3 text-white">

        {/* Logo */}
        <motion.div whileHover={{ scale: 1.05 }}>
          <Link to="/" className="flex items-center gap-1 text-2xl lg:text-3xl font-extrabold">
            <motion.span
              className="text-cyan-300 text-4xl"
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 2.8 }}
            >
              ✈
            </motion.span>
            Smart<span className="text-sky-300 ml-1">Travel</span>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex gap-10 font-medium">
          {navItems.map(({ name, path }) => (
            <motion.li
              key={name}
              whileHover={{ y: -3 }}
              className="relative group"
            >
              <Link to={path} className="transition hover:text-cyan-300">
                {name}
              </Link>
              <span className="absolute left-0 -bottom-2 h-[2px] w-0 bg-cyan-300 transition-all duration-300 group-hover:w-full"></span>
            </motion.li>
          ))}
        </ul>

        {/* User Section */}
        <div className="hidden lg:flex items-center gap-3">
          {user ? (
            <>
              {user.photoURL ? (
                <motion.img
                  src={user.photoURL}
                  alt="profile"
                  className="w-9 h-9 rounded-full border border-cyan-300 shadow-md"
                  whileHover={{ scale: 1.15 }}
                />
              ) : (
                <FaUserCircle size={30} className="text-cyan-300" />
              )}

              <span className="font-semibold text-sm text-sky-100">
                {getFirstName()}
              </span>

              <motion.button
                onClick={logout}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border border-cyan-300 text-cyan-300 px-4 py-1.5 rounded-full hover:bg-cyan-300 hover:text-sky-900 transition"
              >
                Logout
              </motion.button>
            </>
          ) : (
            ["Login", "Register"].map((btn) => (
              <motion.div key={btn} whileHover={{ scale: 1.05 }}>
                <Link
                  to={`/auth/${btn.toLowerCase()}`}
                  className="bg-gradient-to-r from-cyan-400 to-sky-500 text-sky-900 font-semibold px-4 py-1.5 rounded-full hover:brightness-110 transition shadow-md"
                >
                  {btn}
                </Link>
              </motion.div>
            ))
          )}
        </div>

        {/* Mobile Button */}
        <div className="lg:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-2xl text-cyan-300"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="lg:hidden bg-gradient-to-b from-sky-900 to-blue-900 text-white py-6 flex flex-col items-center space-y-4 shadow-xl"
          >
            {navItems.map(({ name, path }) => (
              <Link
                key={name}
                to={path}
                onClick={() => setMenuOpen(false)}
                className="text-lg font-medium hover:text-cyan-300"
              >
                {name}
              </Link>
            ))}

            <div className="pt-4 w-full flex flex-col items-center gap-3 border-t border-white/20">
              {user ? (
                <>
                  <span className="font-semibold">{getFirstName()}</span>
                  <button
                    onClick={logout}
                    className="bg-cyan-400 text-sky-900 px-6 py-2 rounded-full font-semibold hover:brightness-110"
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
                    className="bg-cyan-400 text-sky-900 px-6 py-2 rounded-full font-semibold hover:brightness-110"
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
