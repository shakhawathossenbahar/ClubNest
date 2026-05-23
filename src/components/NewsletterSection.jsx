/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, Sparkles, BellRing } from "lucide-react";
import Button from "./Button";
import Swal from "sweetalert2";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Thanks for Subscribing",
      showConfirmButton: false,
      timer: 2000,
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 80 },
    },
  };

  return (
    <section className="py-38 px-4 bg-linear-to-b from-white to-purple-50 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden relative"
        >
          {/* Decorative Background Elements */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-main/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          {/* <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div> */}

          <div className="relative grid grid-cols-1 lg:grid-cols-2">
            {/* Left: Content */}
            <motion.div
              variants={itemVariants}
              className="p-10 md:p-16 text-center lg:text-left flex flex-col justify-center"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="inline-block mb-6"
              >
                <div className="w-20 h-20 bg-main/10 rounded-full flex items-center justify-center mx-auto lg:mx-0">
                  <BellRing className="w-10 h-10 text-main" />
                </div>
              </motion.div>

              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
                Stay in the Loop
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Get the latest updates on new clubs, exciting events, and
                exclusive community highlights delivered straight to your inbox.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 items-center lg:items-start">
                <div className="flex items-center gap-3 text-gray-700">
                  <Sparkles className="w-6 h-6 text-main" />
                  <span className="font-medium">New Club Alerts</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <Sparkles className="w-6 h-6 text-main" />
                  <span className="font-medium">Event Invitations</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <Sparkles className="w-6 h-6 text-main" />
                  <span className="font-medium">Weekly Highlights</span>
                </div>
              </div>
            </motion.div>

            {/* Right: Subscription Form */}
            <motion.div
              variants={itemVariants}
              className="p-10 md:p-16 bg-linear-to-br from-main to-purple-700 flex items-center justify-center"
            >
              <div className="w-full max-w-md">
                {subscribed ? (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center text-white"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.6 }}
                    >
                      <Mail className="w-20 h-20 mx-auto mb-6" />
                    </motion.div>
                    <h3 className="text-3xl font-bold mb-4">You're All Set!</h3>
                    <p className="text-lg opacity-90">
                      Thank you for subscribing. Get ready for exciting updates!
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <h3 className="text-3xl font-bold text-white text-center mb-8">
                      Subscribe to Our Newsletter
                    </h3>

                    <div className="relative">
                      <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 z-30 text-white/80" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        required
                        className="w-full pl-14 pr-6 py-5 text-lg rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white placeholder-white/80 focus:outline-none focus:ring-4 focus:ring-white/30 transition"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full py-5 text-xl font-bold rounded-full  text-main hover:bg-main/80 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
                    >
                      <Send className="w-6 h-6" />
                      Subscribe Now
                    </Button>

                    <p className="text-sm text-white/80 text-center">
                      No spam, ever. Unsubscribe anytime.
                    </p>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterSection;
