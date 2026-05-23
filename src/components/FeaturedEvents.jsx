/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import Container from "./Container";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Loading from "./animation/Loading";
import { Link } from "react-router";
import EventCard from "../pages/dashboard/clubManager/EventCard";
import { Calendar, Sparkles } from "lucide-react";

const FeaturedEvents = () => {
  const axiosSecure = useAxiosSecure();

  const { data: events = [], isLoading } = useQuery({
    queryKey: ["featuredEvents"],
    queryFn: async () => {
      const res = await axiosSecure.get("/getEvents");
      return res.data.slice(0, 4);
    },
  });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 70, scale: 0.94 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 16,
      },
    },
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loading />
      </div>
    );
  }

  return (
    <Container>
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "-100px" }}
        variants={containerVariants}
        className="my-24"
      >
        {/* Section Header */}
        <motion.div
          variants={titleVariants}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8 mb-14"
        >
          <div>
            <h3 className="text-4xl md:text-5xl font-extrabold text-gray-900 flex items-center gap-4">
              <Calendar className="w-12 h-12 text-main" />
              Events from Different Clubs
            </h3>
            <p className="text-lg text-gray-600 mt-4 max-w-2xl">
              Join exciting meetups, workshops, and gatherings hosted by passionate communities near you
            </p>
          </div>

          <Link to="/events">
            <motion.button
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.96 }}
              className="px-10 py-5 rounded-2xl border-2 border-main text-main font-bold text-lg hover:bg-main hover:text-white transition-all duration-300 shadow-lg hover:shadow-2xl flex items-center gap-3"
            >
              <Sparkles className="w-6 h-6" />
              See All Events
            </motion.button>
          </Link>
        </motion.div>

        {/* Events Grid */}
        {events.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center py-24 bg-gray-50 rounded-3xl"
          >
            <div className="w-32 h-32 bg-gray-100 rounded-full mx-auto mb-8 flex items-center justify-center">
              <Calendar className="w-16 h-16 text-gray-400" />
            </div>
            <h4 className="text-3xl font-bold text-gray-700 mb-4">
              No events yet
            </h4>
            <p className="text-xl text-gray-500 max-w-md mx-auto">
              Exciting events are coming soon. Stay tuned for workshops, meetups, and more!
            </p>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10"
          >
            {events.map((event, index) => (
              <motion.div
                key={event._id}
                variants={cardVariants}
                custom={index}
                className="h-full"
              >
                <EventCard event={event} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.section>
    </Container>
  );
};

export default FeaturedEvents;