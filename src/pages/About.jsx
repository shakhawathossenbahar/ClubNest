/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  HeartHandshake, 
  Sparkles, 
  Target, 
  Globe, 
  Trophy, 
  Mail, 
  MapPin, 
  Phone, 
  Calendar
} from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: <HeartHandshake className="w-12 h-12" />,
      title: "Community First",
      description: "We believe real connections are built through shared passions and meaningful interactions."
    },
    {
      icon: <Sparkles className="w-12 h-12" />,
      title: "Empower Leaders",
      description: "Anyone can become a leader. We provide tools to create and grow thriving communities."
    },
    {
      icon: <Globe className="w-12 h-12" />,
      title: "Local & Global",
      description: "Connect with people in your city or across the world   communities without borders."
    },
    {
      icon: <Trophy className="w-12 h-12" />,
      title: "Celebrate Passion",
      description: "Every interest matters. From photography to coding, sports to cooking   all passions are welcome."
    }
  ];

  const stats = [
    { number: "15K+", label: "Active Members", icon: <Users className="w-10 h-10" /> },
    { number: "800+", label: "Clubs Created", icon: <Sparkles className="w-10 h-10" /> },
    { number: "3K+", label: "Events Hosted", icon: <Calendar className="w-10 h-10" /> },
    { number: "60+", label: "Cities Connected", icon: <Globe className="w-10 h-10" /> }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 60, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { type: "spring", stiffness: 80, damping: 16 }
    }
  };

  const floatVariants = {
    float: {
      y: [0, -15, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-main/10 via-purple-50 to-pink-50 pt-16">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative  py-24 overflow-hidden"
      >
        <div className="w-10/12 mx-auto text-center relative z-10">
          <motion.div
            variants={floatVariants}
            animate="float"
            className="inline-block mb-8"
          >
            <div className="w-28 h-28 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-2xl">
              <Users className="w-14 h-14 text-main" />
            </div>
          </motion.div>

          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6"
          >
            About ClubNest
          </motion.h1>

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed"
          >
            We’re more than a platform  we’re a movement to bring people together through shared passions. 
            ClubNest empowers individuals to discover, join, and lead communities that truly matter.
          </motion.p>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-main/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl"></div>
      </motion.section>

      {/* Mission Statement */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="py-20 px-4"
      >
        <div className="w-10/12 mx-auto text-center">
          <motion.div variants={itemVariants}>
            <Target className="w-20 h-20 text-main mx-auto mb-8" />
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
              Our Mission
            </h2>
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed max-w-4xl mx-auto">
              To connect passionate people and help them build meaningful, real-world communities 
              where ideas flourish, friendships grow, and everyone belongs.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Values Grid */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="py-20 px-4"
      >
        <div className="w-10/12 mx-auto">
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-16"
          >
            Our Values
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-linear-to-br from-main/5 to-purple-50 rounded-3xl p-10 text-center shadow-lg hover:shadow-2xl transition-all duration-300 border border-main/10"
              >
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl text-main">
                  {value.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-20 px-4 bg-linear-to-r from-main to-purple-700"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-white text-center">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.2, type: "spring", stiffness: 100 }}
              >
                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6">
                  {stat.icon}
                </div>
                <div className="text-5xl md:text-6xl font-extrabold mb-3">
                  {stat.number}
                </div>
                <p className="text-xl opacity-90 font-medium">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Closing Message */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-20 px-4 text-center bg-white"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
            Join the Movement
          </h2>
          <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-10">
            Whether you're here to find your tribe, lead a community, or simply explore   
            <span className="font-bold text-main"> ClubNest is your home.</span>
          </p>
          <p className="text-lg text-gray-600">
            Let’s build the future of real-world connections, together.
          </p>
        </div>
      </motion.section>
    </div>
  );
};

export default About;