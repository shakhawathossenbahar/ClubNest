/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import { Quote, Star, Users } from "lucide-react";
import Container from "./Container";

const TestimonialSection = () => {
  const testimonials = [
    {
      name: "Sarah Rahman",
      role: "Club Manager, Dhaka Photographers",
      content:
        "ClubNest transformed how I manage my photography club. Creating events and collecting membership fees has never been easier. Our community grew 300% in just 3 months!",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    },
    {
      name: "Arif Hossain",
      role: "Member, Car Lovers International",
      content:
        "As a car enthusiast, finding real meets and passionate people was tough. ClubNest connected me with amazing events and like-minded friends. Highly recommended!",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "Fatima Ahmed",
      role: "Club Manager, Sylhet Food Hunters",
      content:
        "The platform is incredibly user-friendly. From approving members to organizing food tours — everything is seamless. My club now has over 800 active members!",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "Rahim Khan",
      role: "Member, Tech Innovators BD",
      content:
        "I joined multiple tech clubs and attended life-changing workshops. The payment system is secure and fast. ClubNest is the future of community building!",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/men/86.jpg",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 80, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15,
      },
    },
  };

  return (
    <section className="py-20 px-4 bg-linear-to-b from-purple-50 to-white overflow-hidden pt-26">
      <Container>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-main/10 rounded-full mb-6">
            <Quote className="w-10 h-10 text-main rotate-180" />
          </div>
          <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6">
            Loved by Thousands
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hear from our amazing club managers and members who are building
            real communities every day.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -12, scale: 1.03 }}
              className="relative group"
            >
              <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 h-full border border-gray-100">
                {/* Quote Icon */}
                <div className="absolute -top-6 left-8 w-14 h-14 bg-main text-white rounded-full flex items-center justify-center shadow-xl">
                  <Quote className="w-8 h-8 fill-current" />
                </div>

                {/* Rating Stars */}
                <div className="flex gap-1 mb-6 mt-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 fill-main text-main" />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-gray-700 text-lg leading-relaxed line-clamp-6 mb-8 italic">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4 mt-auto">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover ring-4 ring-main/10"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
};

export default TestimonialSection;
