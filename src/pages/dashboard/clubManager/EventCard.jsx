import React, { useContext, useRef, useState } from "react";
import {
  MapPin,
  Calendar,
  Clock,
  User,
  Pencil,
  Trash,
  Info,
  Upload,
  Mail,
  Tag,
  X,
} from "lucide-react";
import useRole from "../../../hooks/useRole";
import { NavLink, useLocation } from "react-router";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { subDays } from "date-fns";
import { AuthContext } from "../../../provider/authProvider";
import Button from "../../../components/Button";
import { imageUpload } from "../../../utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const EventCard = ({ event, registerId }) => {
  const { user } = useContext(AuthContext);
  const modalRef = useRef();
  const { role } = useRole();
  const Location = useLocation();
  const [bannerPreview, setBannerPreview] = useState(null);
  const [bannerPhoto, setBannerPhoto] = useState();
  const [eventNewDate, setEventNewDate] = useState(null);
  const axiosSecure = useAxiosSecure();
  const handleBannerChange = (e) => {
    const file = e.target.files[0];
    setBannerPhoto(file);
    if (file) {
      setBannerPreview(URL.createObjectURL(file));
    }
  };
  const {
    eventName,
    description,
    category,
    location,
    eventImage,
    eventDate,
    clubEmail,
    _id,
  } = event;
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleEdit = () => {
    modalRef.current.showModal();
    setBannerPhoto(eventImage);
  };
  const queryClient = useQueryClient();
  const { mutate: editEvent } = useMutation({
    mutationFn: async ({ id, eventData }) => {
      const res = await axiosSecure.patch(`/editEvent/${id}`, eventData);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Event Edited Successfully",
        showConfirmButton: false,
        timer: 2000,
      });
      queryClient.invalidateQueries(["events"]);
      modalRef.current.close();
    },
  });

  const handleEditEvent = async (data) => {
    const Image = await imageUpload(bannerPhoto);
    const eventData = {
      ...data,
      eventImage: Image,
      eventDate: eventNewDate.toISOString(),
    };
    editEvent({ id: _id, eventData });
  };

  const { mutate: handleDelete } = useMutation({
    mutationFn: async () => {
      const res = await axiosSecure.delete(`/deleteEvent/${_id}`);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Deleted successfully",
        showConfirmButton: false,
        timer: 2000,
      });
      queryClient.invalidateQueries(["events"]);
    },
  });

  const { mutate: cancelRegister } = useMutation({
    mutationFn: async () => {
      const res = await axiosSecure.delete(`/cancelRegister/${registerId}`);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Registration cancelled successfully",
        showConfirmButton: false,
        timer: 2000,
      });
      queryClient.invalidateQueries(["events"]);
    },
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  return (
    <>
      <div className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
        {/* Event Image */}
        <div className="relative h-56 overflow-hidden">
          <img
            src={eventImage}
            alt={eventName}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4">
            <span className="px-4 py-2 bg-main/90 text-white rounded-full text-sm font-bold backdrop-blur-sm">
              {category}
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-3 h-16">
            {eventName}
          </h3>

          <p className="text-gray-600 line-clamp-2 mb-5 h-12">{description}</p>

          {/* Event Details */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-gray-700">
              <Calendar className="w-5 h-5 text-main" />
              <span className="font-medium">{formatDate(eventDate)}</span>
            </div>

            <div className="flex items-center gap-3 text-gray-700">
              <Clock className="w-5 h-5 text-main" />
              <span>{formatTime(eventDate)}</span>
            </div>

            <div className="flex items-center gap-3 text-gray-700">
              <MapPin className="w-5 h-5 text-main" />
              <span className="text-nowrap">{location}</span>
            </div>

            <div className="flex items-center gap-3 text-gray-700">
              <User className="w-5 h-5 text-main" />
              <span>{clubEmail}</span>
            </div>
          </div>

          {/* Action Buttons */}
          {role !== "Club-Manager" ? (
            <>
              <div className="mt-5 pt-5 flex flex-col xl:flex-row gap-3">
                {Location.pathname === "/" ||
                  Location.pathname === "/events" ||
                  (role === "member" && (
                    <>
                      <button
                        onClick={() => {
                          Swal.fire({
                            title: "Are you sure?",
                            text: "You won't be able to revert this!",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#3085d6",
                            cancelButtonColor: "#d33",
                            confirmButtonText: "Cancel Register",
                          }).then((result) => {
                            if (result.isConfirmed) {
                              cancelRegister();
                            }
                          });
                        }}
                        className="bg-red-600 text-white font-semibold py-2 w-full rounded-xl flex justify-center items-center gap-2 cursor-pointer"
                      >
                        <X /> Cancel Register
                      </button>
                    </>
                  ))}

                <NavLink to={`/eventDetails/${_id}`} className={`w-full`}>
                  <button className="bg-green-500 text-white font-semibold py-2 w-full rounded-xl flex justify-center items-center gap-2 cursor-pointer">
                    {" "}
                    <Info size={18} /> Details
                  </button>
                </NavLink>
              </div>
            </>
          ) : (
            <>
              <div className="mt-6 pt-6 border-t border-gray-100">
                {/* edit delete button display only for club manager */}
                {(Location.pathname === "/" ||
                  Location.pathname === "/events") &&
                role === "Club-Manager" ? (
                  <NavLink to={`/eventDetails/${_id}`} className={`w-full`}>
                    <button className="bg-green-500 text-white font-semibold py-2 w-full rounded-xl flex justify-center items-center gap-2 cursor-pointer">
                      {" "}
                      <Info size={18} /> Details
                    </button>
                  </NavLink>
                ) : (
                  role === "Club-Manager" && (
                    <>
                      <div className="flex justify-between items-center gap-2 md:text-base text-sm">
                        <button
                          onClick={handleEdit}
                          className="bg-green-600 text-white font-semibold py-2 w-full rounded-xl flex justify-center items-center gap-2 cursor-pointer"
                        >
                          {" "}
                          <Pencil size={18} /> Edit
                        </button>
                        <button
                          onClick={() => {
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
                                handleDelete();
                              }
                            });
                          }}
                          className="bg-red-600 text-white font-semibold py-2 w-full rounded-xl flex justify-center items-center gap-2 cursor-pointer"
                        >
                          {" "}
                          <Trash size={18} /> Delete
                        </button>

                        <NavLink
                          to={`/eventDetails/${_id}`}
                          className={`w-full`}
                        >
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
            </>
          )}
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
                  Edit Event Info
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
                        src={eventImage}
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
                  onSubmit={handleSubmit(handleEditEvent)}
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
                      defaultValue={eventName}
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
                      defaultValue={description}
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
                        defaultValue={location}
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
                        selected={eventNewDate}
                        onChange={(date) => setEventNewDate(date)}
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
                      <Pencil className="w-7 h-7" />
                      Edit Event
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

export default EventCard;
