/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
} from "lucide-react";
import Button from "./Button";
import Swal from "sweetalert2";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
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
      title: "Thanks for Messaging Us",
      showConfirmButton: false,
      timer: 2000,
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 80 },
    },
  };

  return (
    <section className="py-20 px-4 bg-linear-to-b from-white via-purple-50 to-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-100px" }}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2"
        >
          {/* Left: Contact Info */}
          <motion.div
            variants={itemVariants}
            className="bg-linear-to-br from-main to-purple-700 p-10 md:p-16 text-white"
          >
            <h2 className="text-4xl md:text-5xl font-extrabold mb-8">
              Get in Touch
            </h2>
            <p className="text-xl opacity-90 mb-12 leading-relaxed">
              Have a question, suggestion, or just want to say hi? We'd love to
              hear from you!
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shrink-0">
                  <Mail className="w-7 h-7" />
                </div>
                <div>
                  <p className="text-lg font-semibold">Email Us</p>
                  <a
                    href="mailto:hello@clubnest.com"
                    className="text-xl opacity-90 hover:opacity-100 transition"
                  >
                    hello@clubnest.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shrink-0">
                  <Phone className="w-7 h-7" />
                </div>
                <div>
                  <p className="text-lg font-semibold">Call Us</p>
                  <p className="text-xl opacity-90">+880 1234 567890</p>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shrink-0">
                  <MapPin className="w-7 h-7" />
                </div>
                <div>
                  <p className="text-lg font-semibold">Visit Us</p>
                  <p className="text-xl opacity-90">Dhaka, Bangladesh</p>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <p className="text-lg font-semibold mb-4">Follow Us</p>

              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-12 h-12 rounded-xl flex items-center justify-center
                 bg-white/20 backdrop-blur-sm
                 hover:bg-blue-500 hover:text-white
                 transition-all duration-300"
                >
                  <Facebook size={20} />
                </a>

                <a
                  href="#"
                  className="w-12 h-12 rounded-xl flex items-center justify-center
                 bg-white/20 backdrop-blur-sm
                 hover:bg-pink-500 hover:text-white
                 transition-all duration-300"
                >
                  <Instagram size={20} />
                </a>

                <a
                  href="#"
                  className="w-12 h-12 rounded-xl flex items-center justify-center
                 bg-white/20 backdrop-blur-sm
                 hover:bg-sky-500 hover:text-white
                 transition-all duration-300"
                >
                  <Twitter size={20} />
                </a>

                <a
                  href="#"
                  className="w-12 h-12 rounded-xl flex items-center justify-center
                 bg-white/20 backdrop-blur-sm
                 hover:bg-blue-700 hover:text-white
                 transition-all duration-300"
                >
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div variants={itemVariants} className="p-10 md:p-16">
            {submitted ? (
              <div className="text-center py-20">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <CheckCircle2 className="w-24 h-24 text-green-500 mx-auto mb-6" />
                </motion.div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  Thank You!
                </h3>
                <p className="text-xl text-gray-600">
                  Your message has been sent successfully. We'll get back to you
                  soon.
                </p>
              </div>
            ) : (
              <>
                <h3 className="text-3xl font-bold text-gray-900 mb-8">
                  Send Us a Message
                </h3>

                <form onSubmit={handleSubmit} className="space-y-6">
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
                      className="w-full px-6 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent transition"
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
                      className="w-full px-6 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent transition"
                      placeholder="yourmail@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-lg font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="6"
                      required
                      className="w-full px-6 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent resize-none transition"
                      placeholder="Write your message here..."
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full py-5 text-xl font-bold rounded-xl bg-main hover:bg-main/90 text-white shadow-xl flex items-center justify-center gap-3 transform hover:scale-105 transition"
                  >
                    <Send className="w-6 h-6" />
                    Send Message
                  </Button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
