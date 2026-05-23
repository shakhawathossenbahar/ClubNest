import React, { useContext, useRef, useState } from "react";
import {
  MapPin,
  Users,
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  Pencil,
  Trash,
  Info,
  Upload,
  DollarSign,
  Mail,
  Tag,
} from "lucide-react";
import useRole from "../../../hooks/useRole";
import { NavLink, useLocation } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../provider/authProvider";
import { useForm } from "react-hook-form";
import Button from "../../../components/Button";
import { imageUpload } from "../../../utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";

const ClubCard = ({ club }) => {
  const axiosSecure = useAxiosSecure();
  const { role } = useRole();
  const modalRef = useRef();
  const { user } = useContext(AuthContext);
  const [bannerPreview, setBannerPreview] = useState(null);
  const [bannerPhoto, setBannerPhoto] = useState();

  const Location = useLocation();

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

  const {
    _id,
    clubName,
    description,
    category,
    location,
    memberShipFee,
    clubImage,
    managerName,
    status,
    createdAt,
  } = club;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleEdit = () => {
    modalRef.current.showModal();
    setBannerPhoto(clubImage);
  };

  const queryClient = useQueryClient();
  const { mutate: updateClubInfo } = useMutation({
    mutationFn: async (clubData) => {
      const res = await axiosSecure.patch(`/clubEdit/${_id}`, clubData);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Edited successfully",
        showConfirmButton: false,
        timer: 2000,
      });
      queryClient.invalidateQueries(["myClubs"]);
      modalRef.current.close();
    },
  });

  const handleEditClub = async (data) => {
    const bannerImage = await imageUpload(bannerPhoto);
    const clubData = {
      ...data,
      clubImage: bannerImage,
      managerEmail: user.email,
      managerName: user.displayName,
    };

    updateClubInfo(clubData);
  };

  const { mutate: deleteClub } = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/club/${id}`);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Club Deleted Successfully",
        showConfirmButton: false,
        timer: 2000,
      });
      queryClient.invalidateQueries(["myClubs"]);
    },
    onError: (err) => {
      Swal.fire({
        position: "center",
        icon: "error",
        title: err.message,
        showConfirmButton: false,
        timer: 2000,
      });
    },
  });
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteClub(id);
      }
    });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const statusConfig = {
    approved: { color: "bg-green-100 text-green-800", icon: CheckCircle2 },
    pending: { color: "bg-amber-100 text-amber-800", icon: Clock },
    rejected: { color: "bg-red-100 text-red-800", icon: XCircle },
  };

  const StatusIcon = statusConfig[status]?.icon || Clock;

  return (
    <>
      <div className="bg-white rounded-3xl shadow-lg  overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
        {/* Club Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={clubImage}
            alt={clubName}
            className="w-full h-full object-cover"
          />
          {role !== "member" && (
            <div className="absolute top-4 left-4">
              <span
                className={`px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 ${
                  statusConfig[status]?.color || "bg-gray-100 text-gray-800"
                }`}
              >
                <StatusIcon className="w-4 h-4" />
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </span>
            </div>
          )}
        </div>

        {/* Card Body */}
        <div className="p-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-2 h-16">
            {clubName}
          </h3>

          <p className="text-gray-600 line-clamp-2 mb-4 h-12">{description}</p>

          {/* Meta Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-gray-700">
              <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                {category}
              </span>
            </div>

            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="w-5 h-5" />
              <span>{location}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-gray-700">
                <Calendar className="w-5 h-5" />
                <span className="text-sm">{formatDate(createdAt)}</span>
              </div>

              <div className="text-right">
                {memberShipFee === 0 ? (
                  <p className="font-bold text-green-600 text-xl">free</p>
                ) : (
                  <p className="text-2xl font-bold text-main">
                    ${memberShipFee.toLocaleString()}
                  </p>
                )}
                <p className="text-xs text-gray-500">membership fee</p>
              </div>
            </div>

            {/* manager info  */}
            <div className="flex items-center justify-between gap-5 border-t border-gray-100">
              <div className="flex-1 mt-5 pt-5  flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Managed by</p>
                  <p className="font-semibold text-gray-800">{managerName}</p>
                </div>
              </div>

              {role !== "Club-Manager" && (
                <div className="mt-5 pt-5 flex-1">
                  <NavLink to={`/clubs/${_id}`} className={`w-full`}>
                    <button className="bg-green-500 text-white font-semibold py-2 w-full rounded-xl flex justify-center items-center gap-2 cursor-pointer">
                      {" "}
                      <Info size={18} /> Details
                    </button>
                  </NavLink>
                </div>
              )}
            </div>

            {/* edit delete button display only for club manager */}
            {(Location.pathname === "/" || Location.pathname === "/clubs") &&
            role === "Club-Manager" ? (
              <NavLink to={`/clubs/${_id}`} className={`w-full`}>
                <button className="bg-green-500 text-white font-semibold py-2 mt-5 w-full rounded-xl flex justify-center items-center gap-2 cursor-pointer">
                  {" "}
                  <Info size={18} /> Details
                </button>
              </NavLink>
            ) : (
              role === "Club-Manager" && (
                <>
                  <div className="flex justify-between items-center gap-2">
                    <button
                      onClick={() => handleEdit(_id)}
                      className="bg-green-600 text-white font-semibold py-2 w-full rounded-xl flex justify-center items-center gap-2 cursor-pointer"
                    >
                      {" "}
                      <Pencil size={18} /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(_id)}
                      className="bg-red-600 text-white font-semibold py-2 w-full rounded-xl flex justify-center items-center gap-2 cursor-pointer"
                    >
                      {" "}
                      <Trash size={18} /> Delete
                    </button>

                    <NavLink to={`/clubs/${_id}`} className={`w-full`}>
                      <button className="bg-main text-white font-semibold py-2 w-full rounded-xl flex justify-center items-center gap-2 cursor-pointer">
                        {" "}
                        <Info size={18} /> Details
                      </button>
                    </NavLink>
                  </div>
                </>
              )
            )}
          </div>
        </div>
      </div>

      {/* edit modal here  */}
      <dialog ref={modalRef} className="modal">
        <div className="modal-box w-11/12 max-w-7xl">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>

          {/* edit form here  */}
          <div className=" py-12 ">
            <div className=" mx-auto">
              {/* Header */}
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                  Edit Club
                </h1>
              </div>

              {/* Main Form Card */}
              <div className="bg-white rounded-3xl  overflow-hidden">
                {/* Banner Upload */}
                <div className="relative h-80 bg-linear-to-br from-main/30 to-purple-600/30">
                  {bannerPreview ? (
                    <img
                      src={bannerPreview}
                      alt="Club banner preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <>
                      <img
                        src={clubImage}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </>
                  )}

                  <label className="absolute md:bottom-6 md:right-6 bottom-2 right-0.5 bg-white px-8 py-4 rounded-2xl shadow-xl cursor-pointer mx-2 hover:shadow-2xl hover:bg-gray-50 transition-all flex items-center gap-3">
                    <Upload className="w-6 h-6 text-main" />
                    <span className="font-semibold md:text-lg text-sm">
                      Choose Banner Image
                    </span>
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
                  onSubmit={handleSubmit(handleEditClub)}
                  className=" md:p-12 space-y-10"
                >
                  {/* Club Name */}
                  <div>
                    <label className="block text-lg font-semibold text-gray-800 mb-3">
                      Club Name
                    </label>
                    <input
                      type="text"
                      name="clubName"
                      defaultValue={clubName}
                      {...register("clubName", { required: true })}
                      placeholder="e.g., Dhaka Photography Club"
                      className="w-full px-6 py-4 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-main/20 focus:border-main transition"
                    />
                    {errors?.clubName?.type === "required" && (
                      <p className="text-sm text-red-500">
                        Club Name is Required
                      </p>
                    )}
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-lg font-semibold text-gray-800 mb-3">
                      Description
                    </label>
                    <textarea
                      name="description"
                      defaultValue={description}
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
                    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-2 gap-4">
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
                        defaultValue={location}
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
                        defaultValue={memberShipFee}
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
                        <strong>Club Manager Email:</strong> {user?.email}
                      </span>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="text-center pt-8">
                    <Button
                      type="submit"
                      className="md:px-16 py-6 text-xl font-bold rounded-full bg-main hover:bg-main/90 text-white  hover:shadow-main/30 transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-4 mx-auto"
                    >
                      <Tag className="w-7 h-7" />
                      Edit Club
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default ClubCard;
