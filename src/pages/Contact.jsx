/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Clock,
  CheckCircle2,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
} from "lucide-react";
import Button from "../components/Button";
import Swal from "sweetalert2";
import Container from "../components/Container";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Thanks for messaging Us",
      showConfirmButton: false,
      timer: 2000,
    });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 80, damping: 16 },
    },
  };

  const floatVariants = {
    float: {
      y: [0, -20, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="min-h-screen pt-36 bg-linear-to-b from-purple-50 via-pink-50 to-white py-16 px-4">
      <Container>
        {/* Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            variants={floatVariants}
            animate="float"
            className="inline-block mb-8"
          >
            <div className="w-28 h-28 bg-main/10 rounded-full flex items-center justify-center shadow-2xl">
              <Mail className="w-14 h-14 text-main" />
            </div>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6">
            Get in Touch
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
            We’d love to hear from you! Whether you have a question, feedback,
            or just want to say hello.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
        >
          {/* Left: Contact Info & Map */}
          <motion.div variants={itemVariants} className="space-y-12">
            {/* Contact Details */}
            <div className="bg-white rounded-3xl shadow-2xl p-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Contact Information
              </h2>
              <div className="space-y-8">
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 bg-main/10 rounded-2xl flex items-center justify-center shrink-0">
                    <Mail className="w-7 h-7 text-main" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-gray-900">
                      Email Us
                    </p>
                    <a
                      href="mailto:hello@clubnest.com"
                      className="text-xl text-gray-600 hover:text-main transition"
                    >
                      hello@clubnest.com
                    </a>
                    <p className="text-sm text-gray-500 mt-1">
                      We reply within 24 hours
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 bg-main/10 rounded-2xl flex items-center justify-center shrink-0">
                    <Phone className="w-7 h-7 text-main" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-gray-900">
                      Call Us
                    </p>
                    <p className="text-xl text-gray-600">+880 1234 567 890</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Mon–Fri: 9AM–6PM
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 bg-main/10 rounded-2xl flex items-center justify-center shrink-0">
                    <MapPin className="w-7 h-7 text-main" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-gray-900">
                      Visit Us
                    </p>
                    <p className="text-xl text-gray-600">Dhaka, Bangladesh</p>
                    <p className="text-sm text-gray-500 mt-1">
                      House 12, Road 5, Banani
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 bg-main/10 rounded-2xl flex items-center justify-center shrink-0">
                    <Clock className="w-7 h-7 text-main" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-gray-900">
                      Working Hours
                    </p>
                    <p className="text-xl text-gray-600">Monday – Friday</p>
                    <p className="text-sm text-gray-500 mt-1">
                      9:00 AM – 6:00 PM (GMT+6)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white rounded-3xl shadow-2xl p-10">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Follow Us
              </h3>
              <div className="flex gap-6">
                <a
                  href="#"
                  className="w-14 h-14 bg-main/10 rounded-2xl flex items-center justify-center hover:bg-main hover:text-white transition group"
                >
                  <Facebook className="w-7 h-7 text-main group-hover:text-white" />
                </a>
                <a
                  href="#"
                  className="w-14 h-14 bg-main/10 rounded-2xl flex items-center justify-center hover:bg-main hover:text-white transition group"
                >
                  <Instagram className="w-7 h-7 text-main group-hover:text-white" />
                </a>
                <a
                  href="#"
                  className="w-14 h-14 bg-main/10 rounded-2xl flex items-center justify-center hover:bg-main hover:text-white transition group"
                >
                  <Twitter className="w-7 h-7 text-main group-hover:text-white" />
                </a>
                <a
                  href="#"
                  className="w-14 h-14 bg-main/10 rounded-2xl flex items-center justify-center hover:bg-main hover:text-white transition group"
                >
                  <Linkedin className="w-7 h-7 text-main group-hover:text-white" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div variants={itemVariants}>
            <div className="bg-white rounded-3xl shadow-2xl p-10 md:p-12 h-full">
              {submitted ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="text-center py-16"
                >
                  <CheckCircle2 className="w-24 h-24 text-green-500 mx-auto mb-6" />
                  <h3 className="text-4xl font-bold text-gray-900 mb-4">
                    Thank You!
                  </h3>
                  <p className="text-xl text-gray-600">
                    Your message has been sent successfully. We’ll get back to
                    you soon!
                  </p>
                </motion.div>
              ) : (
                <>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                    Send Us a Message
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-lg font-medium text-gray-700 mb-2">
                          Your Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-6 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-main focus:border-main transition"
                          placeholder="Full Name"
                        />
                      </div>

                      <div>
                        <label className="block text-lg font-medium text-gray-700 mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-6 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-main focus:border-main transition"
                          placeholder="mail@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-lg font-medium text-gray-700 mb-2">
                        Subject
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-6 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-main focus:border-main transition"
                        placeholder="How can we help you?"
                      />
                    </div>

                    <div>
                      <label className="block text-lg font-medium text-gray-700 mb-2">
                        Message
                      </label>
                      <textarea
                        name="message"
                        rows="7"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="w-full px-6 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-main focus:border-main resize-none transition"
                        placeholder="Write your message here..."
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full py-5 text-xl font-bold rounded-xl bg-main hover:bg-main/90 text-white shadow-xl flex items-center justify-center gap-3 transform hover:scale-105 transition-all duration-300"
                    >
                      <Send className="w-6 h-6" />
                      Send Message
                    </Button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </div>
  );
};

export default Contact;
