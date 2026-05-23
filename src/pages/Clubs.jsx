/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import ClubCard from "./dashboard/clubManager/ClubCard";
import Loading from "../components/animation/Loading";

const Clubs = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchText, setSearchText] = useState("");
  
  const { data: allClubs = [], isLoading, isFetching } = useQuery({
    queryKey: ["allClubs", selectedCategory, searchText],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/filteredClubs?clubType=${selectedCategory}&search=${searchText}`
      );
      return res.data;
    },
  });

  const categories = [
    "Photography", "Sports", "Tech", "Music", "Art & Design",
    "Gaming", "Education", "Business", "Health & Fitness",
    "Food & Cooking", "Travel", "Books", "Environment",
  ];

  // Animation variants
  const headerVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  const searchVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.7, delay: 0.3 } }
  };

  const filterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.5 } }
  };

  const cardContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 80, damping: 16 }
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Header */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={headerVariants}
        className="bg-white"
      >
        <div className="w-10/12 mx-auto px-4 py-16 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4">
            Discover Clubs
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore clubs based on your interests. Join communities, attend
            events, and connect with passionate people.
          </p>
        </div>
      </motion.div>

      {/* Search & Filters Section */}
      <div className="w-10/12 mx-auto py-10">
        {/* Search Bar */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={searchVariants}
          className="relative max-w-3xl mx-auto mb-10"
        >
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
          <input
            type="text"
            placeholder="Search by club name..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full pl-16 pr-6 py-5 text-lg bg-white border border-gray-300 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-main/30 focus:border-main transition"
          />
        </motion.div>

        {/* Category Filter & Count */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={filterVariants}
          className="flex flex-col lg:flex-row justify-between items-start gap-6"
        >
          <p className="font-bold text-2xl border-l-8 pl-3 border-main">
            <span className="text-main">{allClubs?.length}</span> Clubs Found
          </p>

          {/* Dropdown */}
          <div className="flex items-center gap-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="select select-lg px-8 py-3 bg-white border border-gray-300 rounded-full font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-main/30 cursor-pointer shadow-sm"
            >
              <option value="all">All Categories</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </motion.div>
      </div>

      {/* Clubs Grid */}
      <div className="w-10/12 mx-auto pb-20">
        {isLoading || isFetching ? (
          <div className="flex justify-center items-center py-20">
            <Loading />
          </div>
        ) : allClubs.length > 0 ? (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={cardContainerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8"
          >
            {allClubs.map((club, index) => (
              <motion.div
                key={club._id}
                variants={cardVariants}
                custom={index}
              >
                <ClubCard club={club} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          // No data state with animation
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center py-20"
          >
            <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-6 flex items-center justify-center">
              <Search className="w-16 h-16 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-700">No clubs found</h3>
            <p className="text-gray-500 mt-3">
              Try adjusting your filters or search term.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Clubs;