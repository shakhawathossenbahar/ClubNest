import React, { useContext } from "react";
import { Plus, Package } from "lucide-react";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../provider/authProvider";
import EventCard from "../clubManager/EventCard";
import Loading from "../../../components/animation/Loading";

const JoinedEvents = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const {
    data: allEvents,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["allEvents", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get("/getEvents");
      return res.data;
    },
  });

  const {
    data: joinedEvents,
    isLoading: loading,
    isFetching: fetching,
  } = useQuery({
    queryKey: ["joinedEvents"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/getRegisteredEvents?email=${user.email}`
      );
      return res.data;
    },
  });

  const registeredEvents = joinedEvents?.filter(
    (event) => event.status === "registered"
  );

  const joinedEventMap = registeredEvents?.map((reg) => ({
    eventId: reg.eventId,
    registerId: reg._id,
  }));

  const joinedEventIds = registeredEvents?.map((e) => e.eventId);

  const joinedEvent = allEvents?.filter((event) =>
    joinedEventIds?.includes(event._id)
  );

  if (isLoading || isFetching || loading || fetching) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">
              My Joined Events
            </h1>
            <p className="mt-3 text-lg text-gray-600">
              Manage and track all Event you've Joined
            </p>
          </div>

          <Link to="/events">
            <button className="flex items-center gap-3 bg-main text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:bg-main/90 hover:shadow-xl transition-all">
              <Plus className="w-6 h-6" />
              Join New Event
            </button>
          </Link>
        </div>

        {/* Stats */}
        <div className="mb-10">
          <div className="bg-white p-6 rounded-2xl shadow text-center">
            <div className="text-3xl font-bold text-main">
              {joinedEvents?.length}
            </div>
            <p className="text-gray-600">Total Joined Events</p>
          </div>
        </div>

        {/* Clubs Grid */}
        {allEvents?.length === 0 ? (
          <div className="text-center py-20">
            <Package className="w-20 h-20 text-gray-400 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-gray-700">No Events yet</h3>
            <p className="text-gray-500 mt-3">
              Start by joining your first Events!
            </p>
            <Link to="/events">
              <button className="mt-6 bg-main text-white px-10 py-4 rounded-2xl font-bold hover:bg-main/90 transition">
                + Join Event
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {joinedEvent?.map((event) => {
              const regInfo = joinedEventMap.find(
                (r) => r.eventId === event._id
              );

              return (
                <EventCard
                  key={event._id}
                  event={event}
                  registerId={regInfo?.registerId}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default JoinedEvents;
