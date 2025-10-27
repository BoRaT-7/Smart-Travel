import React, { useEffect, useState, useMemo } from "react";
import { MapPin, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { FaSearch } from "react-icons/fa";

const TopDestinationAll = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/TopDestination/data.json")
      .then((res) => res.json())
      .then((data) => {
        setDestinations(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
  };

  const filteredDestinations = useMemo(
    () =>
      destinations.filter(
        (item) =>
          item.destination.toLowerCase().includes(query.toLowerCase()) ||
          item.location.toLowerCase().includes(query.toLowerCase())
      ),
    [destinations, query]
  );

  if (loading)
    return (
      <div className="py-32 text-center text-emerald-700 font-semibold">
        Loading...
      </div>
    );

  return (
    <>
      <Header />
      <section className="min-h-screen py-24 px-6 bg-gradient-to-b from-[#f7faf6] to-[#e5e7eb]">
        {/* Page Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-emerald-700 mb-2">
            Explore Top Destinations
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto text-sm md:text-base">
            Discover the most beautiful destinations. Book your next trip or view details of each place.
          </p>
        </div>

        {/* Search Bar */}
        <div className="flex justify-center mb-10">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              name="search"
              placeholder="Search destinations..."
              value={query}
              onChange={handleSearchChange}
              className="w-full pr-10 pl-4 py-3 rounded-full border border-emerald-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-700 placeholder-gray-400 transition duration-200 bg-white"
            />
            <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-emerald-500 text-lg" />
          </div>
        </div>

        {/* Destination Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {filteredDestinations.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 25px 45px rgba(16,185,129,0.25)",
              }}
              className="bg-white rounded-3xl overflow-hidden shadow-md flex flex-col hover:shadow-xl transition duration-300"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.destination}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-emerald-600 text-white px-3 py-1 rounded-full flex items-center gap-1 text-xs shadow-md">
                  <Clock size={14} /> {item.duration}
                </div>
              </div>

              <div className="p-5 flex flex-col flex-grow justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-emerald-700 mb-1">
                    {item.destination}
                  </h2>
                  <p className="flex items-center gap-2 text-gray-500 text-sm mb-2">
                    <MapPin size={14} /> {item.location}
                  </p>
                  <p className="text-lime-500 font-bold text-lg">
                    {item.price} {item.currency}/person
                  </p>
                </div>

                {/* Buttons */}
                <div className="mt-4 flex gap-3">
                  <motion.button
                    onClick={() => navigate(`/destination/${item.id}`)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 px-4 py-2 rounded-lg border border-emerald-500 text-emerald-700 font-semibold hover:bg-emerald-500 hover:text-white transition"
                  >
                    Details
                  </motion.button>
                  <motion.button
                    onClick={() =>
                      navigate("/destination/book", { state: { destination: item } })
                    }
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-600 to-lime-500 text-white font-semibold hover:brightness-110 transition"
                  >
                    Book Now
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default TopDestinationAll;
