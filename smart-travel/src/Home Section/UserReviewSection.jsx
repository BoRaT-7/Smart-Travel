// src/Home Section/UserReviewSection.jsx
import React, { useState, useEffect, useRef } from "react";
import { FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion } from "framer-motion";

// DEMO current user (TODO: replace with real auth user)
const currentUser = {
  id: "665a1b2c3d4e5f6a7b8c9d0",
  name: "Test User",
};

const UserReviewSection = () => {
  const [reviews, setReviews] = useState([]);
  const [query, setQuery] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const [editingId, setEditingId] = useState(null);
  const [editingComment, setEditingComment] = useState("");
  const [editingRating, setEditingRating] = useState(0);
  const [savingEdit, setSavingEdit] = useState(false);

  const sliderRef = useRef(null);

  // Load reviews from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/reviews")
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

  // Submit NEW review
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim() || rating === 0) {
      alert("Please add a rating and comment before submitting.");
      return;
    }
    setSubmitting(true);

    try {
      const res = await fetch("http://localhost:5000/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: currentUser.id,
          name: currentUser.name,
          comment: comment.trim(),
          rating,
        }),
      });

      const data = await res.json();
      if (data.success) {
        const reviewToAdd = {
          _id: data.reviewId,
          userId: currentUser.id,
          name: currentUser.name,
          comment: comment.trim(),
          rating,
          date: new Date().toISOString().split("T")[0],
        };
        setReviews((prev) => [reviewToAdd, ...prev]);
        setComment("");
        setRating(0);
      } else {
        alert(data.message || "Could not submit review.");
      }
    } catch (err) {
      console.error("Error posting review:", err);
    } finally {
      setSubmitting(false);
    }
  };

  // Delete review -> DELETE /api/reviews/:id
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this review?")) return;

    try {
      const res = await fetch(`http://localhost:5000/api/reviews/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: currentUser.id }),
      });

      const data = await res.json();
      if (data.success) {
        setReviews((prev) => prev.filter((r) => (r._id || r.id) !== id));
      } else {
        alert(data.message || "Could not delete review");
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  // Start editing own review
  const startEdit = (review) => {
    setEditingId(review._id || review.id);
    setEditingComment(review.comment);
    setEditingRating(review.rating);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingComment("");
    setEditingRating(0);
  };

  // Save edited review -> PUT /api/reviews/:id
  const saveEdit = async () => {
    if (!editingComment.trim() || editingRating === 0) {
      alert("Please add a rating and comment before saving.");
      return;
    }
    setSavingEdit(true);

    try {
      const res = await fetch(
        `http://localhost:5000/api/reviews/${editingId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            comment: editingComment.trim(),
            rating: editingRating,
            userId: currentUser.id, // needed for owner check
          }),
        }
      );

      const data = await res.json();
      if (data.success || data.modifiedCount || data.acknowledged) {
        setReviews((prev) =>
          prev.map((r) =>
            (r._id || r.id) === editingId
              ? { ...r, comment: editingComment.trim(), rating: editingRating }
              : r
          )
        );
        cancelEdit();
      } else {
        alert(data.message || "Could not update review.");
      }
    } catch (err) {
      console.error("Edit error:", err);
    } finally {
      setSavingEdit(false);
    }
  };

  // Slider controls
  const scrollByCard = (direction) => {
    if (!sliderRef.current) return;
    const cardWidth = 320;
    const offset = direction === "left" ? -cardWidth : cardWidth;
    sliderRef.current.scrollBy({ left: offset, behavior: "smooth" });
  };

  // Average rating
  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / reviews.length
        ).toFixed(1)
      : 0;

  return (
    <section className="py-20 bg-gradient-to-br from-sky-950 via-sky-900 to-emerald-800">
      <div className="max-w-6xl mx-auto px-4 md:px-6 space-y-10">
        {/* Header / stats */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="space-y-3">
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-emerald-300">
              Traveler stories
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">
              What travelers say about Smart Travel
            </h2>
            <p className="text-sm md:text-base text-sky-100/80 max-w-xl">
              Honest reviews from real guests who explored with us. Their
              experiences help new travelers book with confidence.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex items-center gap-4 bg-white/10 backdrop-blur-xl border border-emerald-300/40 shadow-lg rounded-2xl px-4 py-3"
          >
            <div className="flex items-center gap-1 text-yellow-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <FaStar
                  key={i}
                  className={
                    i < Math.round(averageRating)
                      ? "text-yellow-400"
                      : "text-slate-600"
                  }
                  size={18}
                />
              ))}
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-white">
                {averageRating}/5
              </span>
              <span className="text-xs text-sky-100/80">
                From {reviews.length || 0} verified travelers
              </span>
            </div>
          </motion.div>
        </div>

        {/* Search + arrows */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative w-full md:max-w-md">
            <input
              type="text"
              placeholder="Search by destination or traveler..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-4 pr-10 py-2.5 rounded-full border border-emerald-300/60 bg-white/10 backdrop-blur-md text-sm text-sky-50 placeholder:text-sky-200/60 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent shadow-sm"
            />
            <span className="absolute inset-y-0 right-3 flex items-center text-sky-200/70 text-xs">
              {filteredReviews.length} reviews
            </span>
          </div>

          <div className="flex items-center gap-2 self-end md:self-auto">
            <button
              type="button"
              onClick={() => scrollByCard("left")}
              className="h-9 w-9 flex items-center justify-center rounded-full border border-emerald-300/70 bg-white/10 text-emerald-200 hover:bg-emerald-400 hover:text-white shadow-sm transition"
            >
              <FaChevronLeft size={16} />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard("right")}
              className="h-9 w-9 flex items-center justify-center rounded-full border border-emerald-300/70 bg-white/10 text-emerald-200 hover:bg-emerald-400 hover:text-white shadow-sm transition"
            >
              <FaChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Slider */}
        {filteredReviews.length === 0 ? (
          <p className="text-center text-sky-100 py-10 text-sm">
            No reviews yet. Be the first traveler to share your experience.
          </p>
        ) : (
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-sky-950 via-sky-950/60 to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-sky-950 via-sky-950/60 to-transparent" />

            <div
              ref={sliderRef}
              className="flex gap-6 overflow-x-auto px-1 pb-3 pt-1 scroll-smooth snap-x snap-mandatory scrollbar-hide"
            >
              {filteredReviews.map((review, index) => {
                const isOwn = review.userId === currentUser.id;
                const isEditing = editingId === (review._id || review.id);

                return (
                  <motion.article
                    key={review._id || review.id}
                    initial={{ opacity: 0, y: 20, scale: 0.97 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.35, delay: index * 0.06 }}
                    whileHover={{ y: -4, scale: 1.02 }}
                    className="flex-shrink-0 w-80 snap-start bg-slate-900/70 backdrop-blur-xl border border-emerald-400/40 shadow-[0_18px_40px_rgba(8,47,73,0.7)] rounded-3xl p-6 flex flex-col justify-between"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="relative">
                        <img
                          src={review.avatar || "/default-avatar.png"}
                          alt={review.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-emerald-300 shadow-sm"
                        />
                        <span className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-emerald-400 border-2 border-slate-900" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-sky-50">
                          {review.name}
                        </h3>
                        <p className="text-[11px] uppercase tracking-wide text-emerald-300 font-medium">
                          Verified traveler
                        </p>
                        <p className="text-[11px] text-sky-300/80 mt-0.5">
                          {review.date}
                        </p>
                      </div>
                    </div>

                    {/* Rating stars (view or edit mode) */}
                    <div className="flex items-center gap-1 mb-3 text-yellow-400">
                      {Array.from({ length: 5 }).map((_, i) => {
                        const active =
                          isEditing ? editingRating > i : review.rating > i;
                        return (
                          <button
                            key={i}
                            type="button"
                            disabled={!isEditing}
                            onClick={() =>
                              isEditing && setEditingRating(i + 1)
                            }
                            className={
                              isEditing ? "cursor-pointer" : "cursor-default"
                            }
                          >
                            <FaStar
                              className={
                                active ? "text-yellow-400" : "text-slate-700"
                              }
                              size={16}
                            />
                          </button>
                        );
                      })}
                    </div>

                    {/* Comment: view or edit */}
                    {isEditing ? (
                      <textarea
                        value={editingComment}
                        onChange={(e) => setEditingComment(e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 rounded-xl text-sm bg-slate-900/80 border border-emerald-400/60 text-sky-50 focus:outline-none focus:ring-2 focus:ring-emerald-400 resize-none"
                      />
                    ) : (
                      <p className="text-sm text-sky-100/90 leading-relaxed line-clamp-4">
                        {review.comment}
                      </p>
                    )}

                    {/* Own controls */}
                    {isOwn && (
                      <div className="mt-3 flex items-center justify-end gap-3 text-xs">
                        {isEditing ? (
                          <>
                            <button
                              onClick={cancelEdit}
                              className="text-sky-200 hover:text-sky-100 underline"
                              disabled={savingEdit}
                            >
                              Cancel
                            </button>
                            <button
                              onClick={saveEdit}
                              className="text-emerald-300 hover:text-emerald-200 font-semibold underline"
                              disabled={savingEdit}
                            >
                              {savingEdit ? "Saving..." : "Save"}
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => startEdit(review)}
                              className="text-sky-200 hover:text-sky-100 underline"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() =>
                                handleDelete(review._id || review.id)
                              }
                              className="text-red-400 hover:text-red-300 underline"
                            >
                              Delete
                            </button>
                          </>
                        )}
                      </div>
                    )}

                    {review.reply && (
                      <div className="mt-4 border border-emerald-400/50 bg-emerald-900/40 text-emerald-100 rounded-2xl px-3 py-2 text-xs">
                        <span className="font-semibold">
                          Tour operator reply:{" "}
                        </span>
                        {review.reply}
                      </div>
                    )}
                  </motion.article>
                );
              })}
            </div>
          </div>
        )}

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mt-4 bg-slate-900/80 backdrop-blur-xl shadow-[0_16px_40px_rgba(8,47,73,0.8)] border border-emerald-400/50 rounded-3xl p-6 md:p-8 max-w-2xl mx-auto"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-white">
                Share your tour experience
              </h3>
              <p className="text-sm text-sky-200/80">
                Logged in as{" "}
                <span className="font-semibold">{currentUser.name}</span>
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="How was your tour? What was your favorite moment?"
              className="w-full px-4 py-3 border border-emerald-400/60 rounded-2xl bg-slate-900/60 text-sm text-sky-50 placeholder:text-sky-300/60 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent resize-none"
              rows={4}
            />

            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-sky-100 mr-1">
                  Your rating:
                </span>
                {[1, 2, 3, 4, 5].map((star) => (
                  <motion.button
                    key={star}
                    type="button"
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setRating(star)}
                    className="focus:outline-none"
                  >
                    <FaStar
                      className={
                        rating >= star ? "text-yellow-400" : "text-slate-700"
                      }
                      size={22}
                    />
                  </motion.button>
                ))}
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold border border-emerald-400 bg-gradient-to-r from-emerald-400 to-sky-400 text-slate-900 shadow-[0_12px_30px_rgba(34,211,238,0.4)] hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:ring-offset-1 focus:ring-offset-slate-900 transition-transform duration-150 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? "Submitting..." : "Submit review"}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default UserReviewSection;
