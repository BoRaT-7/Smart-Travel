// src/Layout/AdminLayout.jsx
import { Outlet } from "react-router-dom";
import { AdminAuthProvider } from "../context/AuthContext";

const AdminLayout = () => {
  return (
    <AdminAuthProvider>
      <Outlet />
    </AdminAuthProvider>
  );
};

export default AdminLayout;
