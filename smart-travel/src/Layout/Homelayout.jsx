// src/Layout/Homelayout.jsx
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import Navber from "../Components/Navber";

const Homelayout = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* শুধু হোম পেজে Navber দেখাবে */}
      {isHome && <Navber />}

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Homelayout;
