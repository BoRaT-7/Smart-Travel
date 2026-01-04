// src/pages/AdminDashboard.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "../context/AuthContext";
import Sidebar from "../Components/SideBar";
import Navbar from "../Components/Navber";

const StatCard = ({ label, value }) => (
  <div className="rounded-2xl border border-slate-100 bg-white/70 backdrop-blur p-4 flex flex-col gap-1">
    <p className="text-[11px] font-medium text-slate-500 uppercase tracking-[0.12em]">
      {label}
    </p>
    <p className="text-2xl font-semibold text-slate-900">
      {value ?? 0}
    </p>
  </div>
);

const Panel = ({ title, children, onViewAll }) => (
  <div className="rounded-2xl border border-slate-100 bg-white/80 backdrop-blur p-4">
    <div className="flex items-center justify-between mb-3">
      <h2 className="text-sm font-semibold text-slate-900">{title}</h2>
      {onViewAll && (
        <button
          onClick={onViewAll}
          className="text-xs text-sky-600 hover:text-sky-700"
        >
          View all
        </button>
      )}
    </div>
    {children}
  </div>
);

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
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });

        const json = await res.json();
        if (!res.ok) {
          throw new Error(json.message || "Failed to load dashboard");
        }
        setData(json);
      } catch (err) {
        setError(err.message || "Something went wrong");
      }
    };

    fetchData();
  }, [admin, token, navigate]);

  if (!admin) return null;

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-sky-50 via-slate-50 to-indigo-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />

        <main className="p-6 lg:p-8 space-y-6 max-w-7xl mx-auto w-full">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <p className="inline-flex items-center text-[11px] font-semibold tracking-[0.16em] text-sky-600 uppercase bg-sky-50 border border-sky-100 rounded-full px-3 py-1">
                Smart travel admin
              </p>
              <h1 className="mt-3 text-2xl md:text-3xl font-semibold text-slate-900">
                Admin Dashboard
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                See users, bookings, trips and content in one clean overview.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs px-3 py-1 rounded-full bg-white/70 border border-slate-100 text-slate-600">
                Logged in as {admin?.email}
              </span>
              <button
                onClick={() => navigate("/")}
                className="text-xs rounded-full bg-slate-900 text-white px-4 py-2 hover:bg-slate-800 transition"
              >
                View site
              </button>
            </div>
          </div>

          {error && (
            <p className="text-sm text-rose-600 bg-rose-50 border border-rose-100 px-3 py-2 rounded-xl">
              {error}
            </p>
          )}

          {/* Loading */}
          {!data ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-slate-100 bg-white/70 backdrop-blur p-4 animate-pulse"
                >
                  <div className="h-3 w-20 bg-slate-200 rounded mb-3" />
                  <div className="h-7 w-16 bg-slate-200 rounded" />
                </div>
              ))}
            </div>
          ) : (
            <>
              {/* Top stats – all previous fields but in a modern grid */}
              <section className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
                <StatCard label="Total Users" value={data?.stats?.totalUsers} />
                <StatCard label="Admins" value={data?.stats?.totalAdmins} />
                <StatCard
                  label="All Bookings"
                  value={data?.stats?.totalBookings}
                />
                <StatCard
                  label="Hotel Bookings"
                  value={data?.stats?.totalHotelBookings}
                />
                <StatCard
                  label="Transport Bookings"
                  value={data?.stats?.totalTransportBookings}
                />
                <StatCard
                  label="Trip Plans"
                  value={data?.stats?.totalTripPlans}
                />
                <StatCard
                  label="Gear Orders"
                  value={data?.stats?.totalGearOrders}
                />
                <StatCard
                  label="Shop Orders"
                  value={data?.stats?.totalShopOrders}
                />
                <StatCard
                  label="Destinations"
                  value={data?.stats?.totalDestinations}
                />
                <StatCard label="Guides" value={data?.stats?.totalGuides} />
                <StatCard label="Reviews" value={data?.stats?.totalReviews} />
              </section>

              {/* Recent lists – same data, cleaner cards */}
              <section className="grid grid-cols-1 xl:grid-cols-3 gap-4">
                {/* Recent Users */}
                <Panel
                  title="Recent users"
                  onViewAll={() => navigate("/admin/users")}
                >
                  {data?.recentUsers?.length ? (
                    <ul className="divide-y divide-slate-100">
                      {data.recentUsers.map((u) => (
                        <li
                          key={u._id}
                          className="py-2.5 flex justify-between items-center text-sm"
                        >
                          <div>
                            <p className="font-medium text-slate-800">
                              {u.name || "Unknown"}
                            </p>
                            <p className="text-xs text-slate-500">
                              {u.email}
                            </p>
                          </div>
                          <span className="text-[11px] px-2 py-1 rounded-full bg-slate-100 text-slate-600">
                            {u.role || "user"}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-xs text-slate-500">
                      No recent users found.
                    </p>
                  )}
                </Panel>

                {/* Recent Bookings */}
                <Panel
                  title="Recent bookings"
                  onViewAll={() => navigate("/admin/bookings")}
                >
                  {data?.recentBookings?.length ? (
                    <ul className="divide-y divide-slate-100">
                      {data.recentBookings.map((b) => (
                        <li
                          key={b._id}
                          className="py-2.5 flex justify-between items-center text-sm"
                        >
                          <div>
                            <p className="font-medium text-slate-800">
                              {b?.destination?.name ??
                                b?.hotelName ??
                                "N/A"}
                            </p>
                            <p className="text-xs text-slate-500">
                              {b?.user?.name || "Unknown user"} •{" "}
                              {b?.type || "booking"}
                            </p>
                          </div>
                          <span
                            className={`text-[11px] px-2 py-1 rounded-full capitalize ${
                              b.status === "completed"
                                ? "bg-emerald-50 text-emerald-700"
                                : b.status === "cancelled"
                                ? "bg-rose-50 text-rose-700"
                                : "bg-amber-50 text-amber-700"
                            }`}
                          >
                            {b.status || "pending"}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-xs text-slate-500">
                      No recent bookings found.
                    </p>
                  )}
                </Panel>

                {/* Recent Trip Plans */}
                <Panel
                  title="Recent trip plans"
                  onViewAll={() => navigate("/admin/trip-plans")}
                >
                  {data?.recentTripPlans?.length ? (
                    <ul className="divide-y divide-slate-100">
                      {data.recentTripPlans.map((t) => (
                        <li
                          key={t._id}
                          className="py-2.5 flex justify-between items-center text-sm"
                        >
                          <div>
                            <p className="font-medium text-slate-800">
                              {t.title || "Trip plan"}
                            </p>
                            <p className="text-xs text-slate-500">
                              {t.startDate} - {t.endDate}
                            </p>
                          </div>
                          <span className="text-[11px] px-2 py-1 rounded-full bg-slate-100 text-slate-600">
                            {t?.status || "planned"}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-xs text-slate-500">
                      No recent trip plans found.
                    </p>
                  )}
                </Panel>
              </section>

              {/* Orders + Destinations */}
              <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Gear / Shop Orders */}
                <Panel
                  title="Recent gear & shop orders"
                  onViewAll={() => navigate("/admin/orders")}
                >
                  {data?.recentGearOrders?.length ||
                  data?.recentShopOrders?.length ? (
                    <ul className="divide-y divide-slate-100 text-sm">
                      {data?.recentGearOrders?.map((o) => (
                        <li
                          key={o._id}
                          className="py-2.5 flex justify-between items-center"
                        >
                          <div>
                            <p className="font-medium text-slate-800">
                              {o.itemName || "Gear item"}
                            </p>
                            <p className="text-xs text-slate-500">
                              {o?.user?.name || "Unknown buyer"} • gear
                            </p>
                          </div>
                          <span
                            className={`text-[11px] px-2 py-1 rounded-full capitalize ${
                              o.status === "delivered"
                                ? "bg-emerald-50 text-emerald-700"
                                : "bg-amber-50 text-amber-700"
                            }`}
                          >
                            {o.status || "processing"}
                          </span>
                        </li>
                      ))}

                      {data?.recentShopOrders?.map((o) => (
                        <li
                          key={o._id}
                          className="py-2.5 flex justify-between items-center"
                        >
                          <div>
                            <p className="font-medium text-slate-800">
                              {o.itemName || "Shop item"}
                            </p>
                            <p className="text-xs text-slate-500">
                              {o?.user?.name || "Unknown buyer"} • shop
                            </p>
                          </div>
                          <span
                            className={`text-[11px] px-2 py-1 rounded-full capitalize ${
                              o.status === "delivered"
                                ? "bg-emerald-50 text-emerald-700"
                                : "bg-amber-50 text-amber-700"
                            }`}
                          >
                            {o.status || "processing"}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-xs text-slate-500">
                      No recent gear/shop orders found.
                    </p>
                  )}
                </Panel>

                {/* Destinations & Guides */}
                <Panel
                  title="Destinations & guides"
                  onViewAll={() => navigate("/admin/destinations")}
                >
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">
                        Active destinations
                      </span>
                      <span className="font-semibold text-slate-900">
                        {data?.stats?.totalDestinations ?? 0}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">
                        Registered guides
                      </span>
                      <span className="font-semibold text-slate-900">
                        {data?.stats?.totalGuides ?? 0}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">Total reviews</span>
                      <span className="font-semibold text-slate-900">
                        {data?.stats?.totalReviews ?? 0}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-2">
                      Manage destination, guide and review details from their dedicated pages.
                    </p>
                  </div>
                </Panel>
              </section>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
