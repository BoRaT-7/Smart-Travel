import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="bg-[#157ECE] fixed top-0 left-0 right-0 z-50">
      <div className="navbar text-white lg:px-16 shadow-sm">
        {/* Left: Logo */}
        <div className="navbar-start">
          <Link
            to="/"
            className="font-bold text-xl lg:text-2xl text-white flex items-center gap-1"
          >
            <span className="text-orange-400 text-3xl">S</span>mart Travel
          </Link>
        </div>

        {/* Center: Navigation Links */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-white font-semibold text-base">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/shop">Shop</Link>
            </li>
            <li>
              <Link to="/packages">Packages</Link>
            </li>
            <li>
              <details>
                <summary>Pages</summary>
                <ul className="p-2 bg-blue-400 rounded-md text-white">
                  <li>
                    <Link to="/top-destination">Top Destination</Link>
                  </li>
                  <li>
                    <Link to="/shop-gear">Shop Gear</Link>
                  </li>
                  <li>
                    <Link to="/plan-trip">Plan Trip</Link>
                  </li>
                  <li>
                    <Link to="/tour-guide">Tour Guide</Link>
                  </li>
                  <li>
                    <Link to="/client-review">Client Review</Link>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </div>

        {/* Right: Buttons */}
        <div className="navbar-end flex gap-2">
          <Link
            to="/auth/login"
            className="btn btn-sm bg-white text-[#157ECE] hover:bg-blue-400 hover:text-white font-semibold border-none transition-all duration-200"
          >
            Login
          </Link>
          <Link
            to="/auth/register"
            className="btn btn-sm bg-white text-[#157ECE] hover:bg-blue-400 hover:text-white font-semibold border-none transition-all duration-200"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
