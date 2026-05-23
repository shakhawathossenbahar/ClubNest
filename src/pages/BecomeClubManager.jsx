/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router";
import {
  UserCheck,
  Mail,
  Phone,
  MessageSquare,
  Shield,
  AlertCircle,
  LocationEdit,
} from "lucide-react";
import { AuthContext } from "../provider/authProvider";
import Button from "../components/Button";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const BecomeManager = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleSubmitApplication = (data) => {
    const clubManagerData = { ...data, photoURL: user?.photoURL };
    axiosSecure
      .post("/clubManager", clubManagerData)
      .then((res) => {
        if (res.data.message) {
          Swal.fire({
            position: "center",
            icon: "error",
            title: res.data.message,
            showConfirmButton: true,
          });
        }
        if (res.data.insertedId) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Request successfully",
            showConfirmButton: false,
            timer: 2000,
          });
          reset();
          navigate("/");
        }
      })
      .catch((err) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: err.message,
          showConfirmButton: false,
          timer: 2000,
        });
      });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 80, damping: 16 },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  // If not logged in
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center p-8"
        >
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Please log in to continue
          </h2>
          <Link to="/login">
            <Button className="rounded-full px-8">Go to Login</Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={headerVariants}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-purple-100 rounded-full mb-6"
          >
            <UserCheck className="w-10 h-10 text-main" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Become a Club Manager
          </h1>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Create clubs, organize events, and lead passionate communities on
            ClubNest.
          </p>
        </motion.div>

        {/* Application Form */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden"
        >
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="bg-linear-to-r from-main to-purple-700 p-8 text-white"
          >
            <h2 className="text-2xl font-bold">Manager Application</h2>
            <p className="opacity-90 mt-1">
              One step away from leading communities
            </p>
          </motion.div>

          <form
            onSubmit={handleSubmit(handleSubmitApplication)}
            className="p-8 md:p-12 space-y-8"
          >
            {/* Name & Email Row */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div>
                <label className="flex items-center gap-2 font-medium text-gray-700 mb-2">
                  <UserCheck className="w-5 h-5" />
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={user?.displayName}
                  readOnly
                  {...register("name", { required: true })}
                  className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent transition cursor-not-allowed bg-gray-50"
                  placeholder="John Doe"
                />
                {errors?.name?.type === "required" && (
                  <p className="text-red-500 text-sm mt-1">Name is Required</p>
                )}
              </div>

              <div>
                <label className="flex items-center gap-2 font-medium text-gray-700 mb-2">
                  <Mail className="w-5 h-5" />
                  Email Address
                </label>
                <input
                  type="email"
                  value={user?.email}
                  readOnly
                  {...register("email", { required: true })}
                  className="w-full px-5 py-4 border border-gray-300 rounded-xl cursor-not-allowed bg-gray-50"
                />
                {errors?.email?.type === "required" && (
                  <p className="text-red-500 text-sm mt-1">Email is Required</p>
                )}
              </div>
            </motion.div>

            {/* Phone & Location */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div>
                <label className="flex items-center gap-2 font-medium text-gray-700 mb-2">
                  <Phone className="w-5 h-5" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  {...register("phone", { required: true })}
                  placeholder="+880 1XXX-XXXXXX"
                  className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-main transition"
                />
                {errors?.phone?.type === "required" && (
                  <p className="text-red-500 text-sm mt-1">Phone is Required</p>
                )}
              </div>

              <div>
                <label className="flex items-center gap-2 font-medium text-gray-700 mb-2">
                  <LocationEdit className="w-5 h-5" />
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  {...register("location", { required: true })}
                  placeholder="e.g., Dhaka, Bangladesh"
                  className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-main transition"
                />
                {errors?.location?.type === "required" && (
                  <p className="text-red-500 text-sm mt-1">
                    Location is Required
                  </p>
                )}
              </div>
            </motion.div>

            {/* Motivation */}
            <motion.div variants={itemVariants}>
              <label className="flex items-center gap-2 font-medium text-gray-700 mb-2">
                <MessageSquare className="w-5 h-5" />
                Why do you want to be a Club Manager?
              </label>
              <textarea
                name="motivation"
                rows={6}
                {...register("motivation", { required: true })}
                placeholder="Share your passion, ideas, or past experience in building communities..."
                className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-main resize-none transition"
              />
              {errors?.motivation?.type === "required" && (
                <p className="text-red-500 text-sm mt-1">
                  Motivation is Required
                </p>
              )}
            </motion.div>

            {/* Submit Button */}
            <motion.div variants={itemVariants} className="text-center pt-6">
              <Button
                type="submit"
                className="px-12 py-5 text-xl font-semibold rounded-full bg-main hover:bg-main/90 text-white shadow-xl flex items-center gap-3 mx-auto transform hover:scale-105 transition-all duration-300"
              >
                <Shield className="w-6 h-6" />
                Submit Application
              </Button>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default BecomeManager;
