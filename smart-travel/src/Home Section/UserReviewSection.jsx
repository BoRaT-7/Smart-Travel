import React, { useState, useEffect, useRef } from "react";
import { FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";
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

  // Load reviews
  useEffect(() => {
    fetch("/reviews/data.json")
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch((err) => console.error("Failed to load reviews:", err));
  }, []);

  // Filter reviews
  const filteredReviews = reviews.filter(
    (review) =>
      review.name.toLowerCase().includes(query.toLowerCase()) ||
      review.comment.toLowerCase().includes(query.toLowerCase())
  );

  // Controlled inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview((prev) => ({ ...prev, [name]: value }));
  };

  const handleRatingChange = (rating) => {
    setNewReview((prev) => ({ ...prev, rating }));
  };

  // Submit review
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

  // Manual slide controls
  const scrollByCard = (direction) => {
    if (!sliderRef.current) return;
    const cardWidth = 320; // ~w-80
    const offset = direction === "left" ? -cardWidth : cardWidth;
    sliderRef.current.scrollBy({ left: offset, behavior: "smooth" });
  };

  // Average rating
  const averageRating =
    reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / reviews.length).toFixed(1)
      : 0;

  return (
    <section className="py-20 bg-gradient-to-br from-sky-50 via-white to-emerald-50">
      <div className="max-w-6xl mx-auto px-4 md:px-6 space-y-10">
        {/* Header / stats */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="space-y-3">
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-emerald-500">
              Traveler stories
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
              What our travelers say about their tours
            </h2>
            <p className="text-sm md:text-base text-slate-600 max-w-xl">
              Real experiences from people who explored with us. Read their stories before you book your next adventure.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex items-center gap-4 bg-white/70 backdrop-blur-xl border border-emerald-100/70 shadow-sm rounded-2xl px-4 py-3"
          >
            <div className="flex items-center gap-1 text-yellow-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <FaStar
                  key={i}
                  className={i < Math.round(averageRating) ? "text-yellow-400" : "text-slate-300"}
                  size={18}
                />
              ))}
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-slate-900">
                {averageRating}/5
              </span>
              <span className="text-xs text-slate-500">
                Based on {reviews.length || 0} traveler reviews
              </span>
            </div>
          </motion.div>
        </div>

        {/* Search + arrows */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative w-full md:max-w-md">
            <input
              type="text"
              placeholder="Search by traveler name or destination..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-4 pr-10 py-2.5 rounded-full border border-emerald-100 bg-white/70 backdrop-blur-md text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent shadow-sm"
            />
            <span className="absolute inset-y-0 right-3 flex items-center text-slate-400 text-xs">
              {filteredReviews.length} reviews
            </span>
          </div>

          <div className="flex items-center gap-2 self-end md:self-auto">
            <button
              type="button"
              onClick={() => scrollByCard("left")}
              className="h-9 w-9 flex items-center justify-center rounded-full border border-emerald-200 bg-white/80 text-emerald-600 hover:bg-emerald-600 hover:text-white shadow-sm transition"
            >
              <FaChevronLeft size={16} />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard("right")}
              className="h-9 w-9 flex items-center justify-center rounded-full border border-emerald-200 bg-white/80 text-emerald-600 hover:bg-emerald-600 hover:text-white shadow-sm transition"
            >
              <FaChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Slider */}
        {filteredReviews.length === 0 ? (
          <p className="text-center text-slate-500 py-10 text-sm">
            No reviews yet. Be the first traveler to share your experience.
          </p>
        ) : (
          <div className="relative">
            {/* edge fade */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-sky-50 via-sky-50/60 to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-sky-50 via-sky-50/60 to-transparent" />

            <div
              ref={sliderRef}
              className="flex gap-6 overflow-x-auto px-1 pb-3 pt-1 scroll-smooth snap-x snap-mandatory scrollbar-hide"
            >
              {filteredReviews.map((review, index) => (
                <motion.article
                  key={review.id}
                  initial={{ opacity: 0, y: 20, scale: 0.97 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.35, delay: index * 0.06 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="flex-shrink-0 w-80 snap-start bg-white/80 backdrop-blur-xl border border-emerald-100/70 shadow-[0_18px_40px_rgba(15,118,110,0.14)] rounded-3xl p-6 flex flex-col justify-between"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative">
                      <img
                        src={review.avatar || "/default-avatar.png"}
                        alt={review.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-emerald-300 shadow-sm"
                      />
                      <span className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-emerald-500 border-2 border-white" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-slate-900">
                        {review.name}
                      </h3>
                      <p className="text-[11px] uppercase tracking-wide text-emerald-500 font-medium">
                        Verified traveler
                      </p>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        {review.date}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 mb-3 text-yellow-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <FaStar
                        key={i}
                        className={i < review.rating ? "text-yellow-400" : "text-slate-200"}
                        size={16}
                      />
                    ))}
                  </div>

                  <p className="text-sm text-slate-700 leading-relaxed line-clamp-4">
                    {review.comment}
                  </p>

                  {review.reply && (
                    <div className="mt-4 border border-emerald-100 bg-emerald-50/80 text-emerald-800 rounded-2xl px-3 py-2 text-xs">
                      <span className="font-semibold">Tour operator reply: </span>
                      {review.reply}
                    </div>
                  )}
                </motion.article>
              ))}
            </div>
          </div>
        )}

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mt-4 bg-white/90 backdrop-blur-xl shadow-[0_16px_40px_rgba(15,23,42,0.10)] border border-emerald-100/70 rounded-3xl p-6 md:p-8 max-w-2xl mx-auto"
        >
          <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">
            Share your tour experience
          </h3>
          <p className="text-sm text-slate-500 mb-6">
            Tell other travelers what you loved about the trip, your guide and the destination.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              name="name"
              value={newReview.name}
              onChange={handleInputChange}
              placeholder="Your name"
              className="w-full px-4 py-2.5 border border-emerald-100 rounded-full bg-slate-50/80 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />

            <textarea
              name="comment"
              value={newReview.comment}
              onChange={handleInputChange}
              placeholder="How was your tour? What was your favorite moment?"
              className="w-full px-4 py-3 border border-emerald-100 rounded-2xl bg-slate-50/80 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
              rows={4}
            />

            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-slate-600 mr-1">
                  Your rating:
                </span>
                {[1, 2, 3, 4, 5].map((star) => (
                  <motion.button
                    key={star}
                    type="button"
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleRatingChange(star)}
                    className="focus:outline-none"
                  >
                    <FaStar
                      className={
                        newReview.rating >= star ? "text-yellow-400" : "text-slate-300"
                      }
                      size={22}
                    />
                  </motion.button>
                ))}
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border border-emerald-600 bg-gradient-to-r from-emerald-600 to-sky-500 text-white shadow-[0_12px_30px_rgba(22,163,74,0.45)] hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-1 transition-transform duration-150 hover:-translate-y-0.5 active:translate-y-0"
              >
                Submit review
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default UserReviewSection;
