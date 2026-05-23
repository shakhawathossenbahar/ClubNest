// src/pages/CreateClub.jsx
import React, { useContext, useState } from "react";
import {
  Image,
  Upload,
  MapPin,
  DollarSign,
  Tag,
  Calendar,
  Mail,
  AlertCircle,
} from "lucide-react";
import { AuthContext } from "../../../provider/authProvider";
import Button from "../../../components/Button";
import { useForm } from "react-hook-form";
import { imageUpload } from "../../../utils";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import Loading from "../../../components/animation/Loading";

const CreateClub = () => {
  const { user } = useContext(AuthContext);
  const [bannerPreview, setBannerPreview] = useState(null);
  const [bannerPhoto, setBannerPhoto] = useState(null);
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
    reset,
  } = useForm();

  const handleAddClub = async (data) => {
    const bannerImage = await imageUpload(bannerPhoto);
    const clubData = {
      ...data,
      clubImage: bannerImage,
      managerEmail: user.email,
      managerName: user.displayName,
      membersCount: Number(0),
      eventsCount: Number(0),
    };
    axiosSecure
      .post("/addClub", clubData)
      .then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Club submitted for approval",
            showConfirmButton: false,
            timer: 2000,
          });
          reset();
          setBannerPreview(null);
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

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  const categories = [
    "Photography",
    "Sports",
    "Tech",
    "Music",
    "Art & Design",
    "Gaming",
    "Education",
    "Business",
    "Health & Fitness",
    "Food & Cooking",
    "Travel",
    "Books",
    "Environment",
  ];

  const handleBannerChange = (e) => {
    const file = e.target.files[0];
    setBannerPhoto(file);
    if (file) {
      setBannerPreview(URL.createObjectURL(file));
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-10 bg-white rounded-3xl shadow-xl">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-800 mb-3">
            Access Denied
          </h2>
          <p className="text-gray-600">
            You must be logged in as a Club Manager to create a club.
          </p>
          <Button
            className="mt-8 rounded-full px-10"
            onClick={() => (window.location.href = "/login")}
          >
            Go to Login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="w-10/12 mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-main/10 rounded-full mb-6">
            <Tag className="w-10 h-10 text-main" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Create New Club
          </h1>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Build a community around your passion — your club will be reviewed
            and approved by admin.
          </p>
        </div>

        {/* Main Form Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Banner Upload */}
          <div className="relative h-80 bg-linear-to-br from-main/30 to-purple-600/30">
            {bannerPreview ? (
              <img
                src={bannerPreview}
                alt="Club banner preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center px-8">
                <Upload className="w-20 h-20 text-main/70 mb-4" />
                <p className="text-2xl font-bold text-main/80">
                  Upload Club Banner
                </p>
                <p className="text-gray-600 mt-2">Recommended: 1600x600px</p>
              </div>
            )}

            <label className="absolute bottom-6 right-6 bg-white px-8 py-4 rounded-2xl shadow-xl cursor-pointer hover:shadow-2xl hover:bg-gray-50 transition-all flex items-center gap-3">
              <Upload className="w-6 h-6 text-main" />
              <span className="font-semibold text-lg">Choose Banner Image</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleBannerChange}
                required
                className="hidden"
              />
            </label>
          </div>

          {/* Form Fields */}
          <form
            onSubmit={handleSubmit(handleAddClub)}
            className="p-8 md:p-12 space-y-10"
          >
            {/* Club Name */}
            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-3">
                Club Name
              </label>
              <input
                type="text"
                name="clubName"
                {...register("clubName", { required: true })}
                placeholder="e.g., Dhaka Photography Club"
                className="w-full px-6 py-4 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-main/20 focus:border-main transition"
              />
              {errors?.clubName?.type === "required" && (
                <p className="text-sm text-red-500">Club Name is Required</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-3">
                Description
              </label>
              <textarea
                name="description"
                rows="6"
                {...register("description", { required: true })}
                placeholder="What is your club about? What activities will you organize? Who should join?"
                className="w-full px-6 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-main/20 focus:border-main resize-none transition"
              ></textarea>
              {errors?.description?.type === "required" && (
                <p className="text-sm text-red-500">
                  Club Description is Required
                </p>
              )}
            </div>

            {/* Category Selection */}
            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-4">
                Select Category
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {categories.map((category) => (
                  <>
                    {" "}
                    <label
                      key={category}
                      className="flex items-center gap-3 cursor-pointer p-4 bg-gray-50 rounded-xl hover:bg-main/5 transition"
                    >
                      <input
                        type="radio"
                        name="category"
                        {...register("category", { required: true })}
                        value={category}
                        className="w-5 h-5 text-main focus:ring-main"
                      />

                      <span className="font-medium text-gray-700">
                        {category}
                      </span>
                    </label>
                  </>
                ))}
              </div>
              {errors?.category?.type === "required" && (
                <p className="text-sm text-red-500">
                  Club Category is Required
                </p>
              )}
            </div>

            {/* Location & Fee */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="flex items-center gap-3 text-lg font-semibold text-gray-800 mb-3">
                  <MapPin className="w-6 h-6 text-main" />
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  {...register("location", { required: true })}
                  placeholder="e.g., Dhaka, Chittagong, Online"
                  className="w-full px-6 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-main/20 focus:border-main transition"
                />
                {errors?.location?.type === "required" && (
                  <p className="text-sm text-red-500">
                    Club Location is Required
                  </p>
                )}
              </div>

              <div>
                <label className="flex items-center gap-3 text-lg font-semibold text-gray-800 mb-3">
                  <DollarSign className="w-6 h-6 text-main" />
                  Membership Fee (BDT)
                </label>
                <input
                  type="number"
                  name="membershipFee"
                  min="0"
                  defaultValue="0"
                  {...register("memberShipFee", { required: true })}
                  placeholder="0 = Free club"
                  className="w-full px-6 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-main/20 focus:border-main transition"
                />
                <p className="text-sm text-gray-500 mt-2">
                  Set 0 for free membership
                </p>
                {errors?.memberShipFee?.type === "required" && (
                  <p className="text-sm text-red-500">
                    Club Membership Fee is Required
                  </p>
                )}
              </div>
            </div>

            {/*  Info */}
            <div className="hidden md:block bg-linear-to-r from-main/5 to-purple-50 rounded-2xl p-6 space-y-4 border border-main/10">
              <div className="flex items-center gap-4 text-gray-700">
                <Calendar className="w-5 h-5 text-main" />
                <span>
                  <strong>Created:</strong>{" "}
                  {new Date().toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>

              <div className="flex items-center gap-4 text-gray-700">
                <Mail className="w-5 h-5 text-main" />
                <span>
                  <strong>Club Manager Email:</strong> {user.email}
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center pt-8">
              <Button
                type="submit"
                className="md:px-16 md:py-6 px-8 py-4 md:text-xl font-bold rounded-full bg-main hover:bg-main/90 text-white shadow-2xl hover:shadow-main/30 transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-4 mx-auto"
              >
                <Tag className="w-7 h-7" />
                Submit Club
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateClub;
