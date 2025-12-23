// src/Pages/Register.jsx
import React, { useState } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [serverMessage, setServerMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const e = {};

    if (!form.email) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Invalid email";

    if (!form.firstName) e.firstName = "First name is required";
    if (!form.lastName) e.lastName = "Last name is required";

    if (!form.password) e.password = "Password is required";
    else if (form.password.length < 6)
      e.password = "Password must be at least 6 characters";

    if (!form.confirmPassword) e.confirmPassword = "Confirm your password";
    else if (form.password !== form.confirmPassword)
      e.confirmPassword = "Passwords do not match";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    const { firstName, lastName, email, password } = form;
    const name = `${firstName} ${lastName}`;
    const newUser = { name, email, password };

    try {
      const res = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      const data = await res.json();

      if (data.success) {
        setServerMessage("Registration successful!");
        navigate("/auth/login");
      } else {
        setServerMessage(data.message || "Registration failed");
      }
    } catch (error) {
      console.error("ERROR:", error);
      setServerMessage("Server error. Try again later.");
    }
  };

  return (
    <div className="bg-gradient-to-b from-emerald-700 via-emerald-600 to-lime-600 flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex items-center justify-center p-6 mt-20">
        <div className="w-full max-w-md bg-white/95 rounded-2xl shadow-2xl p-8 backdrop-blur-sm">
          <h2 className="text-3xl font-bold text-center text-emerald-700 mb-6">
            Create Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* First Name */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                placeholder="John"
                className={`w-full px-4 py-2 rounded-md border ${
                  errors.firstName ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-emerald-600`}
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.firstName}
                </p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                placeholder="Doe"
                className={`w-full px-4 py-2 rounded-md border ${
                  errors.lastName ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-emerald-600`}
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.lastName}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className={`w-full px-4 py-2 rounded-md border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-emerald-600`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  className={`w-full px-4 py-2 rounded-md border ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-emerald-600 pr-10`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2 text-gray-500"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Confirm Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password"
                className={`w-full px-4 py-2 rounded-md border ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-emerald-600`}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Server Message */}
            {serverMessage && (
              <p className="text-center text-red-500 font-medium mt-1">
                {serverMessage}
              </p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full border-2 border-emerald-700 text-emerald-800 py-2 rounded-md font-semibold hover:text-white hover:bg-gradient-to-r hover:from-emerald-600 hover:to-lime-500 transition-all duration-300"
            >
              Register
            </button>

            <p className="text-center text-sm text-gray-600 mt-4">
              Already have an account?{" "}
              <Link
                to="/auth/login"
                className="text-emerald-700 font-medium hover:underline"
              >
                Log in
              </Link>
            </p>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Register;
