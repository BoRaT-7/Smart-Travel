import React, { useState } from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { AiFillApple, AiFillFacebook } from 'react-icons/ai';
import slid1log from "../assets/login/slid1log.jpg";
import { Link } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header>
        <Header />
      </header>

      {/* Main Content */}
      <main className="flex-1">
         <div className="flex flex-col-reverse lg:flex-row items-center justify-center lg:justify-between bg-black relative w-full min-h-screen">
    {/* Hero Section */}
    <div className="relative w-full lg:w-1/2 h-[400px] lg:h-screen flex items-center justify-center">
      <img
        src={slid1log}
        alt="Login Background"
        className="absolute inset-0 w-full h-full object-cover opacity-30 z-0"
      />
     <div className="relative z-20 text-center px-6 lg:px-12">
  <h1 className="font-bold text-white">
    <span className="text-red-500 text-8xl lg:text-9xl">S</span>
    <span className="text-5xl sm:text-6xl lg:text-7xl ml-2">MART TRAVEL</span>
  </h1>
  <p className="mt-6 text-[#2196F3] text-lg sm:text-2xl lg:text-3xl font-semibold">
    We are ready <br /> Are you ready?
  </p>
</div>
    </div>

          {/* Login Form Section */}
           <div className="w-full lg:w-1/2 flex items-center justify-center py-10 px-4 lg:px-12 bg-[#0F3554]">
      <div className="w-full max-w-md px-6 sm:px-8 py-8 rounded-md shadow-md bg-opacity-100">
              <h2 className="text-white text-2xl sm:text-3xl font-bold mb-6 text-center">
                Sign in to your account
              </h2>

              <form className="space-y-4">
                {/* Email */}
                <div>
                  <label className="block text-white font-medium mb-1">
                    Email or Username *
                  </label>
                  <input
                    type="text"
                    placeholder="Email or Username"
                    className="w-full px-4 py-2  text-black rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-white font-medium mb-1">
                    Password *
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      className="w-full px-4 py-2 rounded-md bg-white  border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                    />
                    <span
                      className="absolute right-3 top-2.5 text-gray-700 cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                    </span>
                  </div>
                </div>

                {/* Remember Me */}
                <div className="flex items-center">
                  <input type="checkbox" id="remember" className="mr-2" />
                  <label htmlFor="remember" className="text-white text-sm">
                    Remember me
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#2196F3] text-white py-2 rounded-md hover:bg-[#1976D2] transition font-semibold"
                >
                  Log in
                </button>
              </form>

              {/* OR Divider */}
              <div className="flex items-center my-6">
                <hr className="flex-grow border-gray-400" />
                <span className="text-white px-2 text-sm">OR</span>
                <hr className="flex-grow border-gray-400" />
              </div>

              {/* Social Login Buttons */}
              <div className="flex flex-wrap justify-center gap-4">
                <button className="flex items-center bg-white px-4 py-2 rounded-md shadow-md hover:scale-105 transition">
                  <FcGoogle className="w-5 h-5 mr-2" /> Google
                </button>
                <button className="flex items-center bg-white px-4 py-2 rounded-md shadow-md hover:scale-105 transition">
                  <AiFillApple className="w-5 h-5 mr-2" /> Apple
                </button>
                <button className="flex items-center bg-white px-4 py-2 rounded-md shadow-md hover:scale-105 transition">
                  <AiFillFacebook className="w-5 h-5 mr-2" /> Facebook
                </button>
              </div>

              {/* Register Link */}
              <p className="text-white text-sm text-center mt-6">
  Don't have an account?{" "}
  <Link
    to="/auth/register"
    className="text-blue-400 hover:underline"
  >
    Register
  </Link>
</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Login;
