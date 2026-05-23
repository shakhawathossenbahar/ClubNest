/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import Button from "./Button";
import Container from "./Container";
import bannerVideo from "../assets/banner_video.mp4";
import { Link, useNavigate } from "react-router";
import useRole from "../hooks/useRole";

const HeroBanner = () => {
  const { role } = useRole();
  const navigate = useNavigate();
  const createClub = () => {
    if (role !== "Club-Manager") {
      navigate("/becomeClubManager");
    } else {
      navigate("/dashboard/create-club");
    }
  };
  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: "easeOut",
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 1 + i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  const overlayVariants = {
    animate: {
      opacity: [0.5, 0.65, 0.5],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <Container>
      <section className="relative w-full overflow-hidden rounded-3xl mt-8 shadow-2xl">
        {/* Video Background */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={bannerVideo} type="video/mp4" />
          Your browser does not support this video
        </video>

        {/* Animated Dark Overlay */}
        <motion.div
          variants={overlayVariants}
          animate="animate"
          className="absolute inset-0 bg-black"
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] text-center py-46 px-6">
          {/* Heading */}
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={textVariants}
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight"
          >
            Find Your People.
            <br />
            Fuel Your Passion.
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial="hidden"
            animate="visible"
            variants={textVariants}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-gray-200 max-w-2xl mb-12 leading-relaxed"
          >
            ClubNest is the ultimate platform to discover, join, and manage
            local clubs that align with your interests and hobbies.
          </motion.p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-5">
            <motion.div
              custom={0}
              initial="hidden"
              animate="visible"
              variants={buttonVariants}
            >
              <Link to="/clubs">
                <Button className="rounded-full px-10 py-5 text-lg font-semibold border-2 border-main text-white hover:bg-white hover:text-main transition transform hover:scale-105">
                  Join a Club
                </Button>
              </Link>
            </motion.div>

            <motion.div
              custom={1}
              initial="hidden"
              animate="visible"
              variants={buttonVariants}
            >
              <button
                onClick={createClub}
                className="rounded-full text-white font-semibold bg-white/20 px-10 py-5 backdrop-blur-sm border border-white/30 hover:bg-white/30 transition text-lg cursor-pointer"
              >
                Create a Club
              </button>
            </motion.div>
          </div>
        </div>
      </section>
    </Container>
  );
};

export default HeroBanner;
