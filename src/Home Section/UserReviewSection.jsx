import React, { useState, useEffect, useRef } from "react";
import { FaStar, FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";

const UserReviewSection = () => {
  const [reviews, setReviews] = useState([]);
  const [query, setQuery] = useState("");
  const [newReview, setNewReview] = useState({
    name: "",
    comment: "",
    rating: 0,
  });
  const sliderRef = useRef(null);

  // Load reviews from local JSON or API
  useEffect(() => {
    fetch("/reviews/data.json")
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch((err) => console.error("Failed to load reviews:", err));
  }, []);

  // Auto scroll slider
  useEffect(() => {
    if (!sliderRef.current || reviews.length === 0) return;

    const scrollAmount = sliderRef.current.offsetWidth / 3;
    const interval = setInterval(() => {
      if (sliderRef.current) {
        if (
          sliderRef.current.scrollLeft + sliderRef.current.offsetWidth >=
          sliderRef.current.scrollWidth
        ) {
          sliderRef.current.scrollLeft = 0;
        } else {
          sliderRef.current.scrollLeft += scrollAmount;
        }
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [reviews]);

  // Filter reviews by query
  const filteredReviews = reviews.filter(
    (review) =>
      review.name.toLowerCase().includes(query.toLowerCase()) ||
      review.comment.toLowerCase().includes(query.toLowerCase())
  );

  // Handle new review input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview((prev) => ({ ...prev, [name]: value }));
  };

  const handleRatingChange = (rating) => {
    setNewReview((prev) => ({ ...prev, rating }));
  };

  // Submit new review
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newReview.name || !newReview.comment || newReview.rating === 0) return;
    const reviewToAdd = {
      ...newReview,
      id: reviews.length + 1,
      date: new Date().toISOString().split("T")[0],
    };
    setReviews([reviewToAdd, ...reviews]);
    setNewReview({ name: "", comment: "", rating: 0 });
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        {/* Title */}
        <h2 className="text-4xl font-extrabold text-emerald-700 text-center mb-6">
          What Our Users Say
        </h2>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
          Read genuine feedback from our satisfied users. Your experience matters!
        </p>

        {/* Reviews Slider */}
        {filteredReviews.length === 0 ? (
          <p className="text-center text-gray-500 py-10">No reviews found.</p>
        ) : (
          <div
            ref={sliderRef}
            className="flex gap-6 overflow-x-auto px-2 scrollbar-hide scroll-smooth"
          >
            {filteredReviews.map((review) => (
              <motion.div
                key={review.id}
                whileHover={{ scale: 1.03 }}
                className="flex-shrink-0 w-80 bg-white rounded-2xl shadow-lg border border-emerald-100 p-6 flex flex-col justify-between transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={review.avatar || "/default-avatar.png"}
                    alt={review.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-emerald-300"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-emerald-700">
                      {review.name}
                    </h3>
                    <p className="text-gray-400 text-sm">{review.date}</p>
                  </div>
                </div>

                {/* Stars */}
                <div className="flex mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <FaStar
                      key={i}
                      className={`${
                        i < review.rating ? "text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>

                {/* Comment */}
                <p className="text-gray-600 text-sm leading-relaxed">{review.comment}</p>

                {review.reply && (
                  <div className="mt-4 bg-emerald-50 text-emerald-700 p-2 rounded-lg text-sm">
                    Reply: {review.reply}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}

        {/* Submit Review Form */}
        <div className="mt-16 bg-white shadow-md rounded-2xl p-8 max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold text-emerald-700 mb-4">Submit Your Review</h3>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              name="name"
              value={newReview.name}
              onChange={handleInputChange}
              placeholder="Your Name"
              className="w-full px-4 py-3 border border-emerald-300 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-700"
            />
            <textarea
              name="comment"
              value={newReview.comment}
              onChange={handleInputChange}
              placeholder="Write your review..."
              className="w-full px-4 py-3 border border-emerald-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-700 resize-none"
              rows={4}
            />
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  onClick={() => handleRatingChange(star)}
                  className={`cursor-pointer ${
                    newReview.rating >= star ? "text-yellow-400" : "text-gray-300"
                  }`}
                  size={24}
                />
              ))}
            </div>
            <button
              type="submit"
              className="border-2 border-emerald-600 bg-transparent text-emerald-600 px-5 py-2 rounded-full font-medium hover:bg-gradient-to-r hover:from-emerald-600 hover:to-lime-500 hover:text-white hover:brightness-110 transition"
            >
              Submit Review
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default UserReviewSection;
