import { Plus, Calendar, MapPin, Users, Ticket } from "lucide-react";
import EventCard from "./EventCard";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/animation/Loading";
import { useContext } from "react";
import { AuthContext } from "../../../provider/authProvider";
import Container from "../../../components/Container";

const MyEvents = () => {
  const axiosSecure = useAxiosSecure();
  const {user} = useContext(AuthContext)

  const {
    data: events,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/getEvents?email=${user.email}`);
      return res.data;
    },
  });

  if (isLoading || isFetching) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <Container>
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">My Events</h1>
            <p className="mt-3 text-lg text-gray-600">
              Manage and track all Events you've created
            </p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white p-6 rounded-2xl shadow text-center">
            <div className="text-3xl font-bold text-main">{events?.length}</div>
            <p className="text-gray-600">Upcoming Events</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow text-center">
            <div className="text-3xl font-bold text-green-600">5</div>
            <p className="text-gray-600">Cities</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow text-center">
            <div className="text-3xl font-bold text-blue-600">1.2K+</div>
            <p className="text-gray-600">Attendees</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow text-center">
            <div className="text-3xl font-bold text-purple-600">8</div>
            <p className="text-gray-600">Booked Tickets</p>
          </div>
        </div>

        {/* Events Grid */}
        {events?.length === 0 ? (
          <div className="text-center py-20">
            <Calendar className="w-20 h-20 text-gray-400 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-gray-700">No events yet</h3>
            <p className="text-gray-500 mt-3">
              Check back later for exciting upcoming events!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events?.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        )}
      </Container>
    </div>
  );
};

export default MyEvents;
