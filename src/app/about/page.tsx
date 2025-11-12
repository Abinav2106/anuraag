"use client";

import { motion } from "framer-motion";
import { AnimatedText } from "@/components/animated-text";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: "easeOut" }
};

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-white to-stone-100">
      <motion.section 
        className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-white/50 backdrop-blur-sm"
        initial="initial"
        animate="animate"
        variants={staggerChildren}
      >
        <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8">
          {/* Page Heading */}
          <motion.div className="text-center" variants={fadeInUp}>
            <AnimatedText 
              text="About Us"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-gray-900 tracking-tight"
            />
            
            {/* Gold Divider */}
            <div className="w-20 sm:w-24 h-[2px] bg-gradient-to-r from-yellow-500 to-amber-500 mx-auto mt-4 sm:mt-6"></div>
          </motion.div>
          
          {/* Content Paragraphs */}
          <motion.div 
            className="space-y-4 sm:space-y-6 text-left max-w-4xl mx-auto"
            variants={staggerChildren}
          >
            <motion.p 
              className="text-gray-700 leading-relaxed text-sm sm:text-base md:text-lg lg:text-xl px-4 sm:px-0"
              variants={fadeInUp}
            >
              Founded in 2001 and headquartered in Chennai, Tamil Nadu, Anuraag Medicals is a leading manufacturer and distributor of first aid kits and essential medical supplies across India. For over two decades, Anuraag Medicals has been dedicated to providing healthcare institutions, educational facilities, and corporate organizations with reliable, high-quality products and unmatched service standards.
            </motion.p>
            
            <motion.p 
              className="text-gray-700 leading-relaxed text-sm sm:text-base md:text-lg lg:text-xl px-4 sm:px-0"
              variants={fadeInUp}
            >
              Driven by a commitment to quality and customer satisfaction, Anuraag Medicals offers an extensive range of products, including plastic and vinyl first aid boxes, transparent and family kits, as well as medical essentials like sterile gauze, adhesive bandages, antiseptic wipes, disposable gloves, and more. Our product lineup is trusted by thousands of clients who value consistent supply, robust quality control, and responsive support.
            </motion.p>
            
            <motion.p 
              className="text-gray-700 leading-relaxed text-sm sm:text-base md:text-lg lg:text-xl px-4 sm:px-0"
              variants={fadeInUp}
            >
              As Chennai&apos;s foremost supplier, our reputation is built on transparency, integrity, and an unwavering focus on client needs. We pride ourselves on long-standing partnerships with hospitals, clinics, schools, and corporations throughout India, supporting both retail and wholesale requirements with tailor-made supply solutions.
            </motion.p>
            
            <motion.p 
              className="text-gray-700 leading-relaxed text-sm sm:text-base md:text-lg lg:text-xl px-4 sm:px-0"
              variants={fadeInUp}
            >
              Anuraag Medicals is led by a professional team and operates under strict compliance with industry standards and regulatory guidelines. Our continuing mission is to contribute to a healthier, safer community by making first aid and medical supplies accessible and dependable, wherever they are needed.
            </motion.p>
          </motion.div>

          {/* Gold Divider */}
          <motion.hr 
            className="border-t border-yellow-500/30 my-10"
            variants={fadeInUp}
          />

          {/* Factsheet Content */}
          <motion.div 
            className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-6 sm:space-y-8 text-gray-800"
            variants={staggerChildren}
          >
            <motion.h2 
              className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900 border-l-4 border-yellow-500 pl-3 mb-3 sm:mb-4"
              variants={fadeInUp}
            >
              Factsheet
            </motion.h2>

            <motion.div 
              className="space-y-4 sm:space-y-6"
              variants={staggerChildren}
            >
              <motion.div variants={fadeInUp}>
                <h3 className="text-lg sm:text-xl font-medium text-amber-600 mt-6 sm:mt-8 mb-3 sm:mb-4">Basic Information</h3>
                <div className="space-y-2 text-sm sm:text-base text-gray-700">
                  <p><strong>Nature of Business:</strong> Retailer</p>
                  <p><strong>Additional Business:</strong> Retail Business, Wholesale Business</p>
                  <p><strong>Company CEO:</strong> V. V. S. Mani</p>
                  <p><strong>Total Number of Employees:</strong> 11 – 25 People</p>
                  <p><strong>GST Registration Date:</strong> 01-07-2017</p>
                  <p><strong>Legal Status of Firm:</strong> Proprietorship</p>
                  <p><strong>Annual Turnover:</strong> ₹0 – ₹40 L (approx.)</p>
                  <p><strong>GST Partner Name:</strong> Venkatasubramani Neelavathi</p>
                </div>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <h3 className="text-lg sm:text-xl font-medium text-amber-600 mt-6 sm:mt-8 mb-3 sm:mb-4">Manufacturing Facilities & Distributors</h3>
                <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-gray-700 leading-relaxed">
                  <p>We have a good, hygienic, conducive manufacturing facility to produce products like Gauze Pad, Dressing Pad, Trauma Pad, Eye Pad, CPR Mask & Instant Cool Pack.</p>
                  <p>We outsource items such as Antiseptic Solution, Paracetamol Tablet, and Burn Ointment from reputed pharmaceutical companies.</p>
                  <p>Anuraag First Aid Boxes are prepared with the right supplies confirming to the best quality for our customers.</p>
                  <p>We have more than 50 dealers across India who promote and distribute our first-aid boxes to a wide variety of customers.</p>
                </div>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <h3 className="text-lg sm:text-xl font-medium text-amber-600 mt-6 sm:mt-8 mb-3 sm:mb-4">Quality Assurance</h3>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">All our disposable items undergo strict quality control and are sterilized thoroughly before being placed inside the First Aid Boxes.</p>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <h3 className="text-lg sm:text-xl font-medium text-amber-600 mt-6 sm:mt-8 mb-3 sm:mb-4">Product Portfolio</h3>
                <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-gray-700 leading-relaxed">
                  <p>We are one of the leading manufacturers and distributors of medical first-aid kits such as Plastic First Aid Box, Vinyl First Aid Kit, First Aid Pouch, See-Through Box, Family Kit, Eye Wash Solutions, Eye Pads, Sterile Gauze Dressing Pads, Trauma Pads, Dressing Pads, Burn Dressings and CPR Masks.</p>
                  
                  <div>
                    <p className="font-medium mb-2">Key features of our Medical First Aid Kits and consumables:</p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Sterile</li>
                      <li>Pure</li>
                      <li>Ready to use</li>
                      <li>Disposable</li>
                      <li>Lightweight box</li>
                      <li>Easy to carry</li>
                    </ul>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <h3 className="text-lg sm:text-xl font-medium text-amber-600 mt-6 sm:mt-8 mb-3 sm:mb-4">Customization</h3>
                <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-gray-700 leading-relaxed">
                  <p>As a client-centric organization, we specialize in customizing Medical First Aid Kits according to specific requirements and budgets.</p>
                  <p>We offer competitive pricing and tailor-made solutions that ensure customer satisfaction across industries.</p>
                </div>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <h3 className="text-lg sm:text-xl font-medium text-amber-600 mt-6 sm:mt-8 mb-3 sm:mb-4">Our Clientele</h3>
                <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-gray-700 leading-relaxed">
                  <p>Owing to our superior quality and reasonable prices, we have built a strong client base across India and neighboring countries.</p>
                  <div>
                    <p className="font-medium mb-2">Some of our esteemed clients include:</p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>OTIS Elevators Company (I) Ltd</li>
                      <li>Sterlite Industries</li>
                      <li>BSNL</li>
                      <li>HDFC Bank Ltd</li>
                      <li>Bus Body Builders</li>
                      <li>Public and Private Sector Banks</li>
                      <li>Petrol Retail Outlets</li>
                      <li>Leading Fire Extinguisher Dealers</li>
                      <li>Surgical Stores</li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
