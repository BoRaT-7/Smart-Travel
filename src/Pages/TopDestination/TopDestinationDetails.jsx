import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MapPin, Clock, ArrowLeft } from "lucide-react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";

const TopDestinationDetails = () => {
  const { id } = useParams();
  const [destination, setDestination] = useState(null);
  const navigate = useNavigate(); // ✅ Add navigate

  useEffect(() => {
    fetch("/TopDestination/data.json")
      .then(res => res.json())
      .then(data => {
        const found = data.find(item => item.id === parseInt(id));
        setDestination(found);
      });
  }, [id]);

  if (!destination)
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg text-emerald-600"></span>
      </div>
    );

  return (
    <div>
      <Header />
      <main>
        <div className="min-h-screen bg-gradient-to-b from-gray-100 mt-5 to-white p-6 md:p-12">
          <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl mt-5 overflow-hidden">
            {/* Image */}
            <div className="relative">
              <img
                src={destination.image}
                alt={destination.destination}
                className="w-full h-[350px] object-cover"
              />
              <div className="absolute top-4 left-4 bg-emerald-600 text-white px-4 py-1 rounded-full flex items-center gap-2 shadow-md">
                <Clock size={16} /> {destination.duration}
              </div>
            </div>

            {/* Details */}
            <div className="p-8">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold text-emerald-700">{destination.destination}</h1>
                <p className="text-lime-600 font-semibold text-lg">
                  From {destination.price} {destination.currency}
                </p>
              </div>

              <p className="flex items-center text-gray-600 mb-4">
                <MapPin className="mr-2 text-emerald-600" size={18} /> {destination.location}
              </p>

              <p className="text-gray-700 leading-relaxed">
                {destination.description ||
                  "Experience this breathtaking destination filled with adventure, culture, and relaxation."}
              </p>

              {/* Buttons */}
              <div className="mt-8 flex justify-between items-center">
                <button
                  onClick={() => navigate(-1)}
                  className="flex items-center gap-2 border border-emerald-600 text-emerald-600 px-4 py-2 rounded-lg hover:bg-emerald-600 hover:text-white transition"
                >
                  <ArrowLeft size={16} /> Back
                </button>

                {/* ✅ Book Now navigates to DestinationBook with state */}
                <button
                  onClick={() =>
                    navigate("/destination/book", { state: { destination } })
                  }
                  className="px-6 py-2 rounded-lg bg-gradient-to-r from-emerald-600 to-lime-500 text-white font-semibold hover:brightness-110 transition"
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TopDestinationDetails;
