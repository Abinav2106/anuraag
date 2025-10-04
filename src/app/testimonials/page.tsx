"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

const initialTestimonials = [
  {
    name: "Vembu",
    location: "Salem, Tamil Nadu",
    product: "Surgical Dressing",
    date: "03-Apr-23",
    rating: 5,
    feedback: "Response 👍  Quality 👍  Delivery 👍"
  },
  {
    name: "Kapil Kumar",
    location: "New Delhi, Delhi",
    product: "Medical Pads",
    date: "08-May-25",
    rating: 5,
    feedback: "Excellent service and quality products. Highly recommended!"
  },
  {
    name: "Sanjay Nevhal",
    location: "Navi Mumbai, Maharashtra",
    product: "Hospital Dressings",
    date: "18-Sep-22",
    rating: 5,
    feedback: "Outstanding quality and timely delivery. Will definitely order again."
  }
];

const satisfactionData = [
  { label: "Response", percentage: 100 },
  { label: "Quality", percentage: 100 },
  { label: "Delivery", percentage: 100 }
];

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const [showModal, setShowModal] = useState(false);
  const [newReview, setNewReview] = useState({
    name: "",
    location: "",
    rating: 0,
    feedback: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name || !newReview.rating || !newReview.feedback) return;
    
    const date = new Date().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "2-digit",
    });
    
    const review = {
      name: newReview.name,
      location: newReview.location,
      product: "General Review",
      date,
      rating: newReview.rating,
      feedback: newReview.feedback,
    };
    
    setTestimonials([review, ...testimonials]);
    setNewReview({ name: "", location: "", rating: 0, feedback: "" });
    setShowModal(false);
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-white to-stone-100">
      <motion.section 
        className="max-w-6xl mx-auto py-16 px-6"
        initial="initial"
        animate="animate"
        variants={staggerChildren}
      >
        {/* Page Header */}
        <motion.div className="text-center mb-16" variants={fadeInUp}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-gray-900 mb-6">
            Ratings & Reviews
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            See what our clients across India say about Anuraag Medicals.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Left Column - Rating Summary */}
          <motion.div 
            className="space-y-8"
            variants={fadeInUp}
          >
            {/* Overall Rating */}
            <div className="bg-white/50 backdrop-blur-sm rounded-xl p-8 shadow-md border border-gray-100">
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">Overall Rating</h2>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex text-4xl text-amber-500">
                  ★★★★★
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900">5.0</div>
                  <div className="text-gray-600">out of 5</div>
                </div>
              </div>
              <p className="text-gray-600">Based on 3 ratings</p>
            </div>

            {/* User Satisfaction */}
            <div className="bg-white/50 backdrop-blur-sm rounded-xl p-8 shadow-md border border-gray-100">
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">User Satisfaction</h2>
              <div className="space-y-4">
                {satisfactionData.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 font-medium">{item.label}</span>
                      <span className="text-gray-600 font-semibold">{item.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-yellow-500 to-amber-500 h-3 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column - Individual Testimonials */}
          <motion.div 
            className="space-y-6"
            variants={staggerChildren}
          >
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">Customer Reviews</h2>
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white/50 backdrop-blur-sm rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300"
                variants={fadeInUp}
                whileHover={{ y: -2 }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">{testimonial.name}</h3>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-amber-500 mb-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <span key={i}>★</span>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500">{testimonial.date}</p>
                  </div>
                </div>
                
                <div className="mb-3">
                  <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                    Product: {testimonial.product}
                  </span>
                </div>
                
                <p className="text-gray-700 italic leading-relaxed">
                  "{testimonial.feedback}"
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Write a Review Button */}
        <motion.div 
          className="text-center"
          variants={fadeInUp}
        >
          <button 
            onClick={() => setShowModal(true)}
            className="inline-block bg-gradient-to-r from-yellow-500 to-amber-500 text-black font-semibold px-8 py-3 rounded-full hover:from-amber-400 hover:to-yellow-500 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105"
          >
            Write a Review
          </button>
        </motion.div>
      </motion.section>

      {/* Review Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          />
          <motion.form
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onSubmit={handleSubmit}
            className="relative bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md z-10"
          >
            <h3 className="text-xl font-semibold mb-6 text-gray-900 text-center">
              Write a Review
            </h3>
            
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Your Name *"
                value={newReview.name}
                onChange={(e) =>
                  setNewReview({ ...newReview, name: e.target.value })
                }
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                required
              />
              
              <input
                type="text"
                placeholder="Location (optional)"
                value={newReview.location}
                onChange={(e) =>
                  setNewReview({ ...newReview, location: e.target.value })
                }
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
              />
              
              {/* Star Rating */}
              <div className="flex gap-1 justify-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={28}
                    className={`cursor-pointer transition-colors ${
                      newReview.rating > i
                        ? "text-amber-500 fill-amber-500"
                        : "text-gray-300 hover:text-amber-300"
                    }`}
                    onClick={() =>
                      setNewReview({ ...newReview, rating: i + 1 })
                    }
                  />
                ))}
              </div>
              
              <textarea
                rows={4}
                placeholder="Write your review... *"
                value={newReview.feedback}
                onChange={(e) =>
                  setNewReview({ ...newReview, feedback: e.target.value })
                }
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors resize-none"
                required
              />
            </div>
            
            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-6 py-2 rounded-full border border-gray-400 text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-semibold hover:from-amber-600 hover:to-yellow-600 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Submit Review
              </button>
            </div>
          </motion.form>
        </div>
      )}
    </div>
  );
}
