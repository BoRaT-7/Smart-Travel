import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { MapPin, Clock, ArrowLeft } from "lucide-react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

const TopDestinationDetails = () => {
  const { id } = useParams();
  const [destination, setDestination] = useState(null);

  useEffect(() => {
    fetch("/Top Destination/data.json")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((item) => item.id === parseInt(id));
        setDestination(found);
      });
  }, [id]);

  if (!destination) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg text-blue-600"></span>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <main>
        <div className="min-h-screen bg-gradient-to-b from-gray-100 mt-5 to-white p-6 md:p-12">
          <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden">
            {/* Image */}
            <div className="relative">
              <img
                src={destination.image}
                alt={destination.destination}
                className="w-full h-[350px] object-cover"
              />
              <div className="absolute top-4 left-4 bg-blue-600 text-white px-4 py-1 rounded-full flex items-center gap-2 shadow-md">
                <Clock size={16} />
                {destination.duration}
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold text-[#0f304a]">
                  {destination.destination}
                </h1>
                <p className="text-red-500 font-semibold text-lg">
                  From {destination.price} {destination.currency}
                </p>
              </div>

              <p className="flex items-center text-gray-600 mb-4">
                <MapPin className="mr-2 text-blue-600" size={18} /> {destination.location}
              </p>

              <p className="text-gray-700 leading-relaxed">
                {destination.description ||
                  "Experience this breathtaking destination filled with adventure, culture, and relaxation. Perfect for travelers seeking unforgettable memories."}
              </p>

              <div className="mt-8 flex justify-between items-center">
                <Link
                  to="/"
                  className="btn btn-outline flex items-center gap-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                >
                  <ArrowLeft size={16} /> Back to Destinations
                </Link>

                <button className="btn bg-blue-600 hover:bg-blue-700 text-white px-6">
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