import React from "react";
import error404Animation from "../../assets/animation/Error404.json";
import Lottie from "lottie-react";
import { Link } from "react-router";
import { ArrowRight, Home, Users } from "lucide-react";

const Error404 = () => {
  return (
    <div className="flex justify-center items-center mx-auto min-h-screen">
      <div>
        <Lottie animationData={error404Animation} loop={true} autoplay={true} />
        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          <Link
            to="/clubs"
            className="rounded-full py-4 text-lg bg-main hover:bg-main/75 text-white font-semibold flex items-center justify-center gap-3"
          >
            <Users className="w-6 h-6" />
            Explore Clubs
            <ArrowRight className="w-5 h-5" />
          </Link>

          <Link
            to="/"
            className="rounded-full py-4 text-lg font-semibold bg-gray-100 text-gray-800 hover:bg-gray-200 flex items-center justify-center gap-3"
          >
            <Home className="w-6 h-6" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Error404;
