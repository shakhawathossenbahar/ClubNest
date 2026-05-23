/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import Container from "./Container";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import ClubCard from "../pages/dashboard/clubManager/ClubCard";
import Loading from "./animation/Loading";
import { Link } from "react-router";
import { Sparkles } from "lucide-react";

const FeaturedClubs = () => {
  const axiosSecure = useAxiosSecure();

  const { data: clubs = [], isLoading } = useQuery({
    queryKey: ["featuredClubs"],
    queryFn: async () => {
      const res = await axiosSecure.get("/clubs?status=approved");
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
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15,
      },
    },
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
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
        className="my-20"
      >
        {/* Section Header */}
        <motion.div
          variants={titleVariants}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-12"
        >
          <div>
            <h3 className="text-4xl md:text-5xl font-extrabold text-gray-900 flex items-center gap-4">
              <Sparkles className="w-10 h-10 text-main" />
              Clubs You Might Like
            </h3>
            <p className="text-lg text-gray-600 mt-3">
              Discover vibrant communities and connect with passionate people
            </p>
          </div>

          <Link to="/clubs">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-2xl border-2 border-main text-main font-bold text-lg hover:bg-main hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-3"
            >
              See All Clubs
              <Sparkles className="w-5 h-5" />
            </motion.button>
          </Link>
        </motion.div>

        {/* Clubs Grid */}
        {clubs.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="w-32 h-32 bg-gray-100 rounded-full mx-auto mb-6 flex items-center justify-center">
              <Sparkles className="w-16 h-16 text-gray-400" />
            </div>
            <h4 className="text-2xl font-bold text-gray-700 mb-3">
              No clubs yet
            </h4>
            <p className="text-gray-500">
              Be the first to explore when new clubs are approved!
            </p>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4  gap-8"
          >
            {clubs.map((club, index) => (
              <motion.div
                key={club._id}
                variants={cardVariants}
                custom={index}
                className="h-full"
              >
                <ClubCard club={club} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.section>
    </Container>
  );
};

export default FeaturedClubs;
