import React, { useState } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import slid1log from "../assets/login/slid1log.jpg";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      console.log("LOGIN RESPONSE:", data);

      if (data.success) {
        // save user data if needed
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/");
      } else {
        setError(data.message || "Invalid email or password!");
      }
    } catch (err) {
      console.error(err);
      setError("Server error!");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-center lg:justify-between bg-gradient-to-r from-emerald-900 to-green-800 relative w-full min-h-screen">
          
          {/* Hero */}
          <div className="relative w-full lg:w-1/2 h-[400px] lg:h-screen flex items-center justify-center">
            <img
              src={slid1log}
              alt="Login Background"
              className="absolute inset-0 w-full h-full object-cover opacity-30 z-0"
            />
            <div className="relative z-20 text-center px-6 lg:px-12">
              <h1 className="font-bold text-white">
                <span className="text-lime-400 text-8xl lg:text-9xl">S</span>
                <span className="text-5xl sm:text-6xl lg:text-7xl ml-2 text-white">
                  MART TRAVEL
                </span>
              </h1>
              <p className="mt-6 text-emerald-300 text-lg sm:text-2xl lg:text-3xl font-semibold">
                We are ready <br /> Are you ready?
              </p>
            </div>
          </div>

          {/* Login form */}
          <div className="w-full lg:w-1/2 flex items-center justify-center py-10 px-4 lg:px-12 bg-[#063a2f]">
            <div className="w-full max-w-md px-6 sm:px-8 py-8 rounded-md shadow-md bg-opacity-100">
              <h2 className="text-white text-2xl sm:text-3xl font-bold mb-6 text-center">
                Sign in to your account
              </h2>

              <form className="space-y-4" onSubmit={handleLogin}>
                <div>
                  <label className="block text-white font-medium mb-1">
                    Email *
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="w-full px-4 py-2 text-black rounded-md border border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-1">
                    Password *
                  </label>
                  <div className="relative">
                    <input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={form.password}
                      onChange={handleChange}
                      placeholder="Password"
                      className="w-full px-4 py-2 rounded-md bg-white border border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 pr-10"
                      required
                    />
                    <span
                      className="absolute right-3 top-2.5 text-emerald-700 cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                    </span>
                  </div>
                </div>

                {error && (
                  <p className="text-red-500 text-center font-medium">{error}</p>
                )}

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-emerald-600 to-lime-500 text-white py-2 rounded-md font-semibold hover:brightness-110 transition"
                >
                  Log in
                </button>
              </form>

              <div className="flex items-center my-6">
                <hr className="flex-grow border-emerald-500" />
                <span className="text-white px-2 text-sm">OR</span>
                <hr className="flex-grow border-emerald-500" />
              </div>

              {/* Google Login (optional) */}
              <div className="flex flex-wrap justify-center gap-4">
                <button className="flex items-center bg-white px-4 py-2 rounded-md shadow-md hover:scale-105 transition">
                  <FcGoogle className="w-5 h-5 mr-2" /> Login with Google
                </button>
              </div>

              <p className="text-white text-sm text-center mt-6">
                Don’t have an account?{" "}
                <Link to="/auth/register" className="text-lime-400 hover:underline">
                  Register
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Login;
