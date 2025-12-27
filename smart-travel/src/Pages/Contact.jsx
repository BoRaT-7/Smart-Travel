import React from "react";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaWhatsapp,
  FaInstagram,
  FaFacebook,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useToast } from "../context/ToastContext";

const Contact = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
      subject: e.target.subject.value,
      message: e.target.message.value,
    };

    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        showToast(data.message || "Something went wrong", "error");
        return;
      }

      e.target.reset();
      showToast("Your message has been sent successfully!", "success");
      navigate("/");
    } catch (err) {
      console.error(err);
      showToast("Failed to send message. Please try again.", "error");
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F8F5] flex items-center justify-center py-16 px-4">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left info */}
        <div className="bg-gradient-to-br from-emerald-600 to-lime-500 text-white rounded-3xl p-8 shadow-xl flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
            <p className="text-emerald-50 mb-6">
              Have questions about a tour, hotel booking, or custom package?
              Send a message and the support team will respond as soon as possible.
            </p>

            <div className="space-y-4 text-sm">
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-xl" />
                <div>
                  <p className="font-semibold">Email</p>
                  <p>support@smarttravel.com</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <FaPhoneAlt className="text-xl" />
                <div>
                  <p className="font-semibold">Phone</p>
                  <p>+880 1700-000000</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-xl" />
                <div>
                  <p className="font-semibold">Office</p>
                  <p>Savar, Dhaka, Bangladesh</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <p className="font-semibold mb-3">Connect on social</p>
            <div className="flex items-center gap-4">
              <a
                href="https://wa.me/8801700000000"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition"
              >
                <FaWhatsapp className="text-xl" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition"
              >
                <FaInstagram className="text-xl" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition"
              >
                <FaFacebook className="text-xl" />
              </a>
            </div>
          </div>
        </div>

        {/* Right form */}
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-emerald-100">
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">
            Send a Message
          </h3>
          <p className="text-gray-500 text-sm mb-6">
            Fill out the form and the team will get back to you within 24 hours.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  name="name"
                  required
                  type="text"
                  placeholder="Enter your name"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  name="email"
                  required
                  type="email"
                  placeholder="you@example.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  name="phone"
                  type="tel"
                  placeholder="+8801XXXXXXXXX"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <input
                  name="subject"
                  type="text"
                  placeholder="Tour, Hotel, Guide..."
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                name="message"
                required
                rows="4"
                placeholder="Write your message..."
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full border-2 border-emerald-600 bg-gradient-to-r from-emerald-600 to-lime-500 text-white px-5 py-2.5 rounded-full font-medium hover:brightness-110 transition"
            >
              Send Message
            </button>

            <p className="text-xs text-gray-400 text-center">
              By sending this message you agree to be contacted about your request.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
