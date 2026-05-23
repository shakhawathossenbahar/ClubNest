/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Users, Calendar, Sparkles, Trophy, HeartHandshake } from 'lucide-react';
import { Link } from 'react-router';
import Button from './Button';
import Container from './Container';

const GetStarted = () => {
  const steps = [
    {
      icon: <Users className="w-10 h-10" />,
      title: "Discover Clubs",
      description: "Explore communities based on your passions and interests.",
      delay: 0.2
    },
    {
      icon: <HeartHandshake className="w-10 h-10" />,
      title: "Join or Create",
      description: "Become a member or start your own club to lead others.",
      delay: 0.4
    },
    {
      icon: <Calendar className="w-10 h-10" />,
      title: "Attend Events",
      description: "Participate in exciting meetups, workshops, and gatherings.",
      delay: 0.6
    },
    {
      icon: <Trophy className="w-10 h-10" />,
      title: "Build Connections",
      description: "Grow your network and make lifelong friends.",
      delay: 0.8
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 60, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
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
    <section className="py-20 px-4 bg-linear-to-b from-white to-purple-50 overflow-hidden">
      <Container>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            variants={floatVariants}
            animate="float"
            className="inline-block mb-6"
          >
            <div className="w-20 h-20 bg-main/10 rounded-full flex items-center justify-center mx-auto">
              <Sparkles className="w-10 h-10 text-main" />
            </div>
          </motion.div>

          <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6">
            Get Started in Minutes
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of passionate people building real communities. Whether you're here to explore, connect, or lead , your journey starts now.
          </p>
        </motion.div>

        {/* Steps Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative group"
            >
              <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 h-full border border-gray-100">
                <div className="w-20 h-20 bg-main/10 rounded-2xl flex items-center justify-center mb-6 text-main group-hover:bg-main group-hover:text-white transition-all duration-300">
                  {step.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>

                
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-center"
        >
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link to="/clubs">
              <Button className="px-12 py-5 text-xl font-bold rounded-full bg-main hover:bg-main/90 text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center gap-4">
                Explore Clubs
                <ArrowRight className="w-6 h-6" />
              </Button>
            </Link>

            <Link to="/register">
              <Button className="px-12 py-5 text-xl font-bold rounded-full border-2 border-main text-main  hover:bg-main hover:text-white shadow-xl transition-all duration-300 flex items-center gap-4">
                Join ClubNest
                <Sparkles className="w-6 h-6" />
              </Button>
            </Link>
          </div>

          
        </motion.div>
      </Container>
    </section>
  );
};

export default GetStarted;