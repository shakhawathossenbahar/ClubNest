import React, { useContext } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import {
  MapPin,
  Calendar,
  Clock,
  Users,
  Ticket,
  Music,
  AlertCircle,
  Check,
} from "lucide-react";
import Loading from "../components/animation/Loading";
import useRole from "../hooks/useRole";
import { AuthContext } from "../provider/authProvider";
import Swal from "sweetalert2";

const EventDetails = () => {
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const { role } = useRole();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    data: eventData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["event", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/getEvent/${id}`);
      return res.data;
    },
  });

  const { data: membershipData } = useQuery({
    queryKey: ["membershipData", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/membershipGet?email=${user.email}`);
      return res.data;
    },
  });

  const { data: RegisteredEvent } = useQuery({
    queryKey: ["registeredEvents", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/getRegisteredEvents?email=${user.email}`
      );
      return res.data;
    },
  });

  const existEventRegistration = RegisteredEvent?.find((e) => e.eventId === id);
  const event = eventData?.[0];

  const currentMembership = membershipData?.find(
    (data) => data.clubId === event?.clubId
  );

  const hasJoinedClub = !!currentMembership;
  const isPaymentCompleted = currentMembership?.status === "active";

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
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
  const queryClient = useQueryClient();
  const { mutate: registerEvent } = useMutation({
    mutationFn: async (eventData) => {
      const res = await axiosSecure.post("/addEventRegistration", eventData);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Event Registration successfully",
        showConfirmButton: false,
        timer: 2000,
      });
      queryClient.invalidateQueries(["event"]);
    },
  });

  const handleRegister = () => {
    if (!hasJoinedClub) {
      Swal.fire({
        icon: "error",
        title: "Join the club first",
        text: "You must join this club before registering for the event.",
      });
      return navigate(`/clubs/${event.clubId}`);
    }

    if (!isPaymentCompleted) {
      Swal.fire({
        icon: "warning",
        title: "Payment Required",
        text: "Please complete your club membership payment first.",
      });
      return navigate("/dashboard/my-join-requests");
    }

    const eventData = {
      eventId: id,
      status: "registered",
      userEmail: user.email,
      clubId: event.clubId,
    };

    registerEvent(eventData);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loading />
        </div>
      </div>
    );
  }

  if (isError || !event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-10">
          <AlertCircle className="w-20 h-20 text-red-500 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-800 mb-3">
            Event Not Found
          </h2>
          <p className="text-gray-600">
            The event you're looking for doesn't exist or has been removed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-11/12 mx-auto mt-8">
      {/* Hero Banner */}
      <div className="relative h-96 md:h-[500px]">
        <img
          src={event.eventImage}
          alt={event.eventName}
          className="w-full h-full object-cover rounded-4xl"
        />
        <div className="absolute rounded-4xl inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />

        {/* Category Badge */}
        <div className="absolute top-8 left-8">
          <span className="px-6 py-3 bg-main/90 text-white rounded-full text-lg font-bold flex items-center gap-2 backdrop-blur-sm">
            <Music className="w-6 h-6" />
            {event.category}
          </span>
        </div>

        {/* Event Title & Basic Info */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 drop-shadow-2xl">
            {event.eventName}
          </h1>
          <div className="flex flex-wrap gap-6 text-lg">
            <div className="flex items-center gap-3">
              <Calendar className="w-6 h-6" />
              <span>{formatDate(event.eventDate)}</span>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-6 h-6" />
              <span>{formatTime(event.eventDate)}</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-6 h-6" />
              <span>{event.location}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12 -mt-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left: Description & Details */}
          <div className="lg:col-span-2 space-y-10">
            {/* About the Event */}
            <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                About This Event
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-wrap">
                {event.description ||
                  "No description available for this event."}
              </p>
            </div>

            {/* Additional Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-linear-to-br from-main/10 to-purple-100 rounded-2xl p-8 text-center">
                <Users className="w-14 h-14 text-main mx-auto mb-4" />
                <p className="text-gray-600">Organized By</p>
                <p className="text-2xl font-bold text-main mt-2">
                  {event.clubName || "Club Manager"}
                </p>
              </div>
              <div className="bg-linear-to-br from-blue-50 to-indigo-100 rounded-2xl p-8 text-center">
                <Ticket className="w-14 h-14 text-blue-600 mx-auto mb-4" />
                <p className="text-gray-600">Registration</p>
                <p className="text-2xl font-bold text-blue-700 mt-2 capitalize">
                  Open for Members
                </p>
              </div>
            </div>
          </div>

          {/* Right: Registration CTA */}
          <div className="space-y-8">
            <div className="bg-white rounded-3xl shadow-xl p-8 sticky top-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Get Your Ticket
              </h3>

              <div className="space-y-6">
                <div className="text-center py-8 bg-linear-to-r from-green-50 to-emerald-50 rounded-2xl">
                  <p className="text-gray-600 mb-2">Ticket Price</p>
                  <p className="text-5xl font-extrabold text-green-600">FREE</p>
                  <p className="text-sm text-gray-500 mt-3">
                    Limited seats available
                  </p>
                </div>

                {role === "member" &&
                (!existEventRegistration ||
                  existEventRegistration?.status === "cancelled") ? (
                  <button
                    onClick={handleRegister}
                    className="w-full py-5 md:text-xl font-bold rounded-2xl bg-main hover:bg-main/90 text-white shadow-xl flex items-center justify-center gap-3 transform hover:scale-105 transition"
                  >
                    <Ticket className="w-7 h-7" />
                    Register Now
                  </button>
                ) : existEventRegistration?.status === "registered" ? (
                  <p className="w-full py-4 md:text-xl font-bold rounded-2xl bg-main cursor-not-allowed text-white shadow-xl flex items-center justify-center gap-3">
                    <Check />
                    Already Registered
                  </p>
                ) : (
                  <p className="font-bold text-xl text-center text-main">
                    Only Club Members Can Register
                  </p>
                )}

                <div className="text-center text-sm text-gray-500">
                  <p>By registering, you agree to our terms and conditions.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
