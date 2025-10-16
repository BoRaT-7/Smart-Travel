import React, { useState } from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { Link } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const Register = () => {
  const [method, setMethod] = useState('email');
  const [form, setForm] = useState({
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const validate = () => {
    const e = {};

    if (method === 'email') {
      if (!form.email) e.email = 'Email is required';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email';
    } else {
      if (!form.phone) e.phone = 'Phone number is required';
      else if (!/^\+?[0-9]{7,15}$/.test(form.phone)) e.phone = 'Invalid phone number';
    }

    if (!form.firstName) e.firstName = 'First name is required';
    if (!form.lastName) e.lastName = 'Last name is required';

    if (!form.password) e.password = 'Password is required';
    else if (form.password.length < 6) e.password = 'Password must be at least 6 characters';

    if (!form.confirmPassword) e.confirmPassword = 'Confirm your password';
    else if (form.password !== form.confirmPassword)
      e.confirmPassword = 'Passwords do not match';

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;

    console.log('Registering user:', form);
    alert('✅ Registration successful (demo)');
    setForm({ email: '', phone: '', firstName: '', lastName: '', password: '', confirmPassword: '' });
    setErrors({});
  };

  return (
    <div className="bg-gradient-to-b from-[#0F3554] to-[#1B4965] flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center p-6 mt-20 ">
        <div className="w-full max-w-md bg-white/95 rounded-2xl shadow-2xl p-8 backdrop-blur-sm">
          <h2 className="text-3xl font-bold text-center text-[#157ECE] mb-6">Create Account</h2>

          {/* Switch Method */}
          <div className="flex justify-center gap-3 ">
            <button
              type="button"
              onClick={() => setMethod('email')}
              className={`px-4 py-2 rounded-md font-medium transition ${
                method === 'email'
                  ? 'bg-[#157ECE] text-white shadow-md'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              Use Email
            </button>
            <button
              type="button"
              onClick={() => setMethod('phone')}
              className={`px-4 py-2 rounded-md font-medium transition ${
                method === 'phone'
                  ? 'bg-[#157ECE] text-white shadow-md'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              Use Phone
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email / Phone */}
            {method === 'email' ? (
              <div>
                <label className="block text-gray-700 font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className={`w-full px-4 py-2 rounded-md bg-white border ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-[#157ECE]`}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
            ) : (
              <div>
                <label className="block text-gray-700 font-medium mb-1">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+8801XXXXXXXXX"
                  className={`w-full px-4 py-2 rounded-md bg-white border ${
                    errors.phone ? 'border-red-500' : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-[#157ECE]`}
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>
            )}

            {/* First / Last Name */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-gray-700 font-medium mb-1">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  placeholder="John"
                  className={`w-full px-4 py-2 rounded-md bg-white border ${
                    errors.firstName ? 'border-red-500' : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-[#157ECE]`}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  placeholder="Doe"
                  className={`w-full px-4 py-2 rounded-md bg-white border ${
                    errors.lastName ? 'border-red-500' : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-[#157ECE]`}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                )}
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Create password"
                  className={`w-full px-4 py-2 rounded-md bg-white border ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-[#157ECE] pr-10`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-2 text-gray-500"
                >
                  {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">Confirm Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password"
                className={`w-full px-4 py-2 rounded-md bg-white border ${
                  errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-[#157ECE]`}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-[#157ECE] text-white font-semibold py-2 rounded-md hover:bg-[#0F3554] transition-all duration-300"
            >
              Register
            </button>

            {/* Login Link */}
            <p className="text-center text-sm text-gray-600 mt-4">
              Already have an account?{' '}
              <Link to="/auth/login" className="text-[#157ECE] font-medium hover:underline">
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
