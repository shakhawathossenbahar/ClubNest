/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';
import { Users, HeartHandshake, Sparkles, Target, Globe, Trophy } from 'lucide-react';
import Container from './Container';

const AboutUs = () => {
  const values = [
    {
      icon: <HeartHandshake className="w-10 h-10" />,
      title: "Community First",
      description: "We believe real connections are built through shared passions and meaningful interactions."
    },
    {
      icon: <Sparkles className="w-10 h-10" />,
      title: "Empower Leaders",
      description: "Anyone can become a leader. We provide tools to create and grow thriving communities."
    },
    {
      icon: <Globe className="w-10 h-10" />,
      title: "Local & Global",
      description: "Connect with people in your city or across the world — communities without borders."
    },
    {
      icon: <Trophy className="w-10 h-10" />,
      title: "Celebrate Passion",
      description: "Every interest matters. From photography to coding, sports to cooking — all passions are welcome."
    }
  ];

  const stats = [
    { number: "10K+", label: "Active Members" },
    { number: "500+", label: "Clubs Created" },
    { number: "2K+", label: "Events Hosted" },
    { number: "50+", label: "Cities Connected" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { y: 60, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 80 } }
  };

  return (
    <section className="py-20 px-4 bg-linear-to-t from-white to-purple-50 overflow-hidden">
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
            <Users className="w-10 h-10 text-main" />
          </div>
          <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6">
            About ClubNest
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            We’re more than a platform — we’re a movement to bring people together through shared passions. 
            ClubNest empowers individuals to discover, join, and lead communities that matter.
          </p>
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="bg-linear-to-r from-main/10 to-purple-100 rounded-3xl p-12 md:p-16 text-center mb-20 shadow-xl"
        >
          <Target className="w-16 h-16 text-main mx-auto mb-6" />
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Our Mission
          </h3>
          <p className="text-xl md:text-2xl text-gray-700 max-w-5xl mx-auto leading-relaxed">
            To connect passionate people and help them build meaningful, real-world communities 
            where ideas flourish, friendships grow, and everyone belongs.
          </p>
        </motion.div>

        {/* Values Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
        >
          {values.map((value, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 text-center"
            >
              <div className="w-20 h-20 bg-main/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-main">
                {value.icon}
              </div>
              <h4 className="text-2xl font-bold text-gray-900 mb-4">
                {value.title}
              </h4>
              <p className="text-gray-600 leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 bg-linear-to-r from-main to-purple-700 rounded-3xl p-10 md:p-12 text-white shadow-2xl"
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: false }}
                transition={{ delay: index * 0.2, type: "spring", stiffness: 100 }}
                className="text-5xl md:text-6xl font-extrabold mb-3"
              >
                {stat.number}
              </motion.div>
              <p className="text-lg md:text-xl opacity-90 font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>

      </Container>
    </section>
  );
};

export default AboutUs;