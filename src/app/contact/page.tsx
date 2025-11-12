"use client";

import { motion } from "framer-motion";
import { AnimatedText } from "@/components/animated-text";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

export default function ContactPage() {
  const LAT = 12.963528982295905;
  const LNG = 80.19031602269474;

  // More specific address format for better Google Maps recognition
  // const address = "Plot No.13 - A, 13th Street, Karthikeyapuram, Chennai - 600091, Tamil Nadu, India";

  // Use coordinates for both embedded map and clickable link to ensure exact location
  const gmapViewUrl = `https://www.google.com/maps/search/?api=1&query=${LAT},${LNG}`;
  const gmapEmbedUrl = `https://www.google.com/maps?q=${LAT},${LNG}&z=19&output=embed`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-white to-stone-100">
      <motion.section 
        className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-4 sm:space-y-6"
        initial="initial"
        animate="animate"
        variants={fadeInUp}
      >
        <AnimatedText 
          text="Reach Us"
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-900"
        />
        
        <motion.div 
          className="w-16 sm:w-20 h-[2px] bg-gradient-to-r from-yellow-500 to-amber-500 mx-auto mb-3 sm:mb-4"
          variants={fadeInUp}
        />

        <motion.div 
          className="bg-white/60 backdrop-blur-md border border-white/20 shadow-lg rounded-xl p-4 sm:p-5 md:p-6 space-y-2 sm:space-y-3"
          variants={fadeInUp}
        >
          <p className="text-sm sm:text-base text-gray-800">
            Plot No.13 – A, 13th Street, Karthikeyapuram, Chennai – 600091, Tamil Nadu, India
          </p>
          <p className="text-sm sm:text-base text-gray-800">Owner: V. V. S. Mani</p>
          <a 
            href="tel:08047764026" 
            className="text-sm sm:text-base text-gray-900 font-semibold hover:text-amber-600 transition-colors"
          >
            Call 08047764026
          </a>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <a
            href={gmapViewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-xl overflow-hidden shadow-lg hover:opacity-90 transition"
            aria-label="Open Anuraag Medicals location in Google Maps"
          >
            <iframe
              src={gmapEmbedUrl}
              width="100%"
              height="300"
              style={{ border: 0, pointerEvents: 'none' }}
              allowFullScreen
              loading="lazy"
              className="w-full h-[250px] sm:h-[300px] md:h-[380px] rounded-xl"
              title="Anuraag Medicals Exact Location"
            ></iframe>
          </a>
        </motion.div>
      </motion.section>
    </div>
  );
}
