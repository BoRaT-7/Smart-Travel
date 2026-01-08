import React from "react";
import { motion } from "framer-motion";

const Footer = () => {
  const links = ["About Us", "Contact", "Jobs", "Press Kit"];
  const socials = [
    {
      name: "Twitter",
      href: "#",
      icon: (
        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
      ),
    },
    {
      name: "YouTube",
      href: "#",
      icon: (
        <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
      ),
    },
    {
      name: "Facebook",
      href: "#",
      icon: (
        <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
      ),
    },
  ];

  return (
    <footer className="w-full bg-black/80 backdrop-blur-xl border-t border-white/10 p-10">
      {/* Top Section: Links and Socials */}
      <div className="flex flex-col md:flex-row md:justify-between items-center gap-6 max-w-7xl mx-auto">
        {/* Navigation Links */}
        <div className="flex flex-wrap gap-6 justify-center md:justify-start">
          {links.map((link, idx) => (
            <motion.a
              key={idx}
              href="#"
              className="text-gray-200 text-sm font-medium hover:text-cyan-400 transition-colors"
              whileHover={{ scale: 1.1 }}
            >
              {link}
            </motion.a>
          ))}
        </div>

        {/* Social Icons */}
        <div className="flex gap-6 justify-center md:justify-end">
          {socials.map((social, idx) => (
            <motion.a
              key={idx}
              href={social.href}
              className="text-gray-200 hover:text-cyan-400 transition-colors"
              whileHover={{ scale: 1.2, rotate: 10 }}
              aria-label={social.name}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                {social.icon}
              </svg>
            </motion.a>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="my-6 border-t border-white/20 max-w-7xl mx-auto"></div>

      {/* Bottom Section */}
      <div className="text-center text-gray-400 text-sm max-w-7xl mx-auto">
        © {new Date().getFullYear()} SmartTravel — All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;
