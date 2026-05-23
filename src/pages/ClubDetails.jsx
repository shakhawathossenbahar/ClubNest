import React, { useContext, useRef, useState } from "react";
import {
  MapPin,
  Calendar,
  DollarSign,
  Users,
  Tag,
  Mail,
  Upload,
} from "lucide-react";
import useRole from "../hooks/useRole";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { AuthContext } from "../provider/authProvider";
import Button from "../components/Button";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { subDays } from "date-fns";
import { imageUpload } from "../utils";
import Swal from "sweetalert2";

const ClubDetails = () => {
  const { id } = useParams();
  const { role } = useRole();
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const modalRef = useRef();
  const [bannerPreview, setBannerPreview] = useState(null);
  const [bannerPhoto, setBannerPhoto] = useState();
  const [eventDate, setEventDate] = useState(null);

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

  const { data } = useQuery({
    queryKey: ["club", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/clubs/${id}`);
      return res.data;
    },
  });

  const { data: membershipData } = useQuery({
    queryKey: ["membershipData"],
    queryFn: async () => {
      const res = await axiosSecure.get("/membershipGet");
      return res.data;
    },
  });

  const club = data?.[0];
  const existMembershipData = membershipData?.find(
    (data) => data.clubId == club?._id && data.memberEmail === user.email
  );

  const { mutate: joinReq } = useMutation({
    mutationFn: async (membershipInfo) => {
      const res = await axiosSecure.post("/addMembership", membershipInfo);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your join request has been added.",
        showConfirmButton: false,
        timer: 2000,
      });
      navigate("/dashboard/my-join-requests");
    },
  });

  const handleJoinRequest = () => {
    const membershipData = {
      clubId: club._id,
      clubName: club.clubName,
      clubImage: club.clubImage,
      clubFee: club.memberShipFee,
      memberEmail: user.email,
      memberName: user.displayName,
      memberImage: user.photoURL,
      managerEmail: club.managerEmail,
    };
    joinReq(membershipData);
  };

  const handleOpenModal = () => {
    modalRef.current.showModal();
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const queryClient = useQueryClient();
  const { mutate: createEvent } = useMutation({
    mutationFn: async (eventData) => {
      const res = axiosSecure.post("/addEvent", eventData);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Event Created successfully",
        showConfirmButton: false,
        timer: 2000,
      });

      queryClient.invalidateQueries(["club"]);
      reset();
      setBannerPreview(null);
      modalRef.current.close();
    },
  });

  const handleCreateEvent = async (data) => {
    const image = await imageUpload(bannerPhoto);
    const eventData = {
      ...data,
      clubId: club._id,
      eventImage: image,
      clubEmail: club.managerEmail,
      clubName: club.clubName,
      eventDate: eventDate.toISOString(),
    };
    createEvent(eventData);
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <>
      <div className="min-h-screen w-11/12 mx-auto">
        {/* Hero Section with Banner */}
        <div className="relative h-96 md:h-[500px] overflow-hidden mt-8 rounded-4xl">
          <img
            src={club?.clubImage}
            alt={club?.clubName}
            className="w-full h-full object-cover rounded-4xl"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />

          {/* Club Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white">
            <h1 className="text-5xl md:text-7xl font-extrabold mb-4 drop-shadow-2xl">
              {club?.clubName}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-lg">
              <div className="flex items-center gap-2">
                <MapPin className="w-6 h-6" />
                <span>{club?.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-6 h-6" />
                <span>{club?.membersCount || "0"} Members</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-6 h-6" />
                <span>{club?.eventsCount || "0"} Events</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-12 -mt-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/*  Description */}
            <div className="lg:col-span-2 space-y-10">
              {/* About Section */}
              <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  About This Club
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {club?.description}
                </p>
              </div>

              {/* Quick Info Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-linear-to-br from-main/10 to-purple-100 rounded-2xl p-6 text-center">
                  <Tag className="w-12 h-12 text-main mx-auto mb-3" />
                  <p className="text-gray-600">Category</p>
                  <p className="text-2xl font-bold text-main">
                    {club?.category}
                  </p>
                </div>
                <div className="bg-linear-to-br from-green-50 to-emerald-100 rounded-2xl p-6 text-center">
                  <DollarSign className="w-12 h-12 text-green-600 mx-auto mb-3" />
                  <p className="text-gray-600">Membership Fee</p>
                  <p className="text-3xl font-bold text-green-700">
                    ${club?.memberShipFee}
                  </p>
                </div>
                <div className="bg-linear-to-br from-blue-50 to-indigo-100 rounded-2xl p-6 text-center">
                  <Calendar className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                  <p className="text-gray-600">Established</p>
                  <p className="text-xl font-bold text-blue-700">
                    {formatDate(club?.createdAt)}
                  </p>
                </div>
              </div>
            </div>

            {/* Manager info Card */}
            <div className="space-y-8">
              {/* Manager Info */}
              <div className="bg-white rounded-3xl shadow-xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Club Manager
                </h3>
                <div className="flex items-center gap-5">
                  <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                    <Users className="w-10 h-10 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-gray-900">
                      {club?.managerName}
                    </p>
                    <p className="text-gray-500">Club Leader</p>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex items-center gap-3 text-gray-700">
                    <Mail className="w-5 h-5" />
                    <span className="text-lg">{club?.managerEmail}</span>
                  </div>
                </div>
              </div>

              {role === "member" && (
                <>
                  {/* Join Button */}
                  <div className="bg-linear-to-r from-main to-purple-700 rounded-3xl p-8 text-center text-white shadow-2xl">
                    <h3 className="text-2xl font-bold mb-4">Ready to Join?</h3>
                    <p className="text-lg mb-8 opacity-90">
                      Become a member and get access to exclusive events and
                      community!
                    </p>
                    {existMembershipData ? (
                      <button className="w-full bg-white text-main font-bold text-xl py-5 rounded-2xl cursor-not-allowed shadow-lg">
                        Already Joined
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={handleJoinRequest}
                          className="w-full bg-white text-main font-bold text-xl py-5 rounded-2xl hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg"
                        >
                          Join Club — $ {club?.memberShipFee}
                        </button>
                      </>
                    )}
                    {club?.memberShipFee === 0 && (
                      <p className="mt-4 text-lg font-medium">
                        Free Membership Available!
                      </p>
                    )}
                  </div>
                </>
              )}

              {role === "Club-Manager" && (
                <>
                  <div className="bg-linear-to-r from-main to-purple-700 rounded-3xl p-8 text-center text-white shadow-2xl">
                    <h3 className="text-2xl font-bold mb-4">
                      Want to Create Event?
                    </h3>
                    <p className="text-lg mb-8 opacity-90">
                      Create an Event from this Club
                    </p>

                    {club?.status === "pending" ? (
                      <button
                        disabled
                        className="w-full bg-white text-main cursor-not-allowed font-bold text-xl py-5 rounded-2xl hover:bg-gray-100 transform  transition-all duration-300 shadow-lg"
                      >
                        Wait For Club Approval
                      </button>
                    ) : club?.status === "rejected" ? (
                      <button className="w-full bg-white text-main font-bold text-xl py-5 rounded-2xl hover:bg-gray-100 cursor-not-allowed shadow-lg">
                        admin rejected your club
                      </button>
                    ) : (
                      <button
                        onClick={handleOpenModal}
                        className="w-full bg-white text-main font-bold text-xl py-5 rounded-2xl hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg"
                      >
                        Create Event
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
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
                  Create Event
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
                    <div className="flex flex-col items-center justify-center h-full text-center px-8">
                      <Upload className="w-20 h-20 text-main/70 mb-4" />
                      <p className="text-2xl font-bold text-main/80">
                        Upload Event Banner
                      </p>
                      <p className="text-gray-600 mt-2">
                        Recommended: 1600x600px
                      </p>
                    </div>
                  )}

                  <label className="absolute bottom-6 right-6 bg-white px-8 py-4 rounded-2xl shadow-xl cursor-pointer hover:shadow-2xl hover:bg-gray-50 transition-all flex items-center gap-3">
                    <Upload className="w-6 h-6 text-main" />
                    <span className="font-semibold text-lg">
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
                  onSubmit={handleSubmit(handleCreateEvent)}
                  className=" md:p-12 space-y-10"
                >
                  {/* Event Name */}
                  <div>
                    <label className="block text-lg font-semibold text-gray-800 mb-3">
                      Event Name
                    </label>
                    <input
                      type="text"
                      name="eventName"
                      {...register("eventName", { required: true })}
                      placeholder="e.g., Dhaka Photography Club"
                      className="w-full px-6 py-4 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-main/20 focus:border-main transition"
                    />
                    {errors?.eventName?.type === "required" && (
                      <p className="text-sm text-red-500">
                        Event Name is Required
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
                      rows="6"
                      {...register("description", { required: true })}
                      placeholder="What is your Event about? What activities will you organize? Who should join?"
                      className="w-full px-6 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-main/20 focus:border-main resize-none transition"
                    ></textarea>
                    {errors?.description?.type === "required" && (
                      <p className="text-sm text-red-500">
                        Event Description is Required
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
                        Event Category is Required
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
                          Event Location is Required
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="flex items-center gap-3 text-lg font-semibold text-gray-800 mb-3">
                        <Calendar className="w-6 h-6 text-main" />
                        Event Date
                      </label>
                      <DatePicker
                        wrapperClassName="w-full"
                        selected={eventDate}
                        onChange={(date) => setEventDate(date)}
                        minDate={subDays(new Date(), -1)}
                        dateFormat="yyyy-MM-dd"
                        placeholderText="Select Event Date"
                        className="w-full px-4 py-2 border
                 border-gray-300 rounded-lg
                   focus:ring-2 focus:ring-primary focus:border-transparent
                   outline-none transition"
                        required
                      />
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
                      Create Event
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

export default ClubDetails;
