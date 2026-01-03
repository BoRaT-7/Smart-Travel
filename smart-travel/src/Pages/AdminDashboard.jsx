// src/pages/AdminDashboard.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "../context/AuthContext";
import Sidebar from "../Components/SideBar";
import Navbar from "../Components/Navber";

const AdminDashboard = () => {
  const { admin, token } = useAdminAuth();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!admin || admin.role !== "admin") {
      navigate("/admin/login");
      return;
    }

    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/admin/dashboard", {
          headers: token
            ? { Authorization: `Bearer ${token}` }
            : {},
        });

        const json = await res.json();
        if (!res.ok) {
          throw new Error(json.message || "Failed to load dashboard");
        }
        setData(json);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, [admin, token, navigate]);

  // admin না থাকলে কিছুই render করবো না
  if (!admin) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="p-6 space-y-4">
          <h1 className="text-2xl font-semibold">Admin Dashboard</h1>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          {!data ? (
            <p>Loading...</p>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded shadow">
                  <p className="text-sm text-gray-500">Total Users</p>
                  <p className="text-2xl font-bold">
                    {data.stats.totalUsers}
                  </p>
                </div>
                <div className="bg-white p-4 rounded shadow">
                  <p className="text-sm text-gray-500">Admins</p>
                  <p className="text-2xl font-bold">
                    {data.stats.totalAdmins}
                  </p>
                </div>
                <div className="bg-white p-4 rounded shadow">
                  <p className="text-sm text-gray-500">Bookings</p>
                  <p className="text-2xl font-bold">
                    {data.stats.totalBookings}
                  </p>
                </div>
                <div className="bg-white p-4 rounded shadow">
                  <p className="text-sm text-gray-500">Reviews</p>
                  <p className="text-2xl font-bold">
                    {data.stats.totalReviews}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded shadow">
                  <h2 className="font-semibold mb-2">Recent Users</h2>
                  <ul className="space-y-1 text-sm">
                    {data.recentUsers.map((u) => (
                      <li key={u._id} className="flex justify-between">
                        <span>{u.name}</span>
                        <span className="text-gray-500">{u.email}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white p-4 rounded shadow">
                  <h2 className="font-semibold mb-2">Recent Bookings</h2>
                  <ul className="space-y-1 text-sm">
                    {data.recentBookings.map((b) => (
                      <li key={b._id} className="flex justify-between">
                        <span className="font-medium">
  {b?.destination?.name ?? "N/A"}
</span>

                        <span className="text-gray-500">
                          {b.status || "pending"}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
