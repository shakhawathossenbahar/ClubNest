// pages/MyClubs.jsx
import React, { useContext } from "react";
import { Plus, Package } from "lucide-react";
import { Link } from "react-router";
import { AuthContext } from "../../../provider/authProvider";
import ClubCard from "./ClubCard";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/animation/Loading";
import Container from "../../../components/Container";

const MyClub = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const {
    data: myClubs,
    refetch,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["myClubs", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/clubs?email=${user.email}`);
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
            <h1 className="text-4xl font-bold text-gray-900">My Clubs</h1>
            <p className="mt-3 text-lg text-gray-600">
              Manage and track all clubs you've created
            </p>
          </div>

          <Link to="/dashboard/create-club">
            <button className="flex items-center gap-3 bg-main text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:bg-main/90 hover:shadow-xl transition-all">
              <Plus className="w-6 h-6" />
              Create New Club
            </button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl shadow text-center">
            <div className="text-3xl font-bold text-main">
              {myClubs?.length}
            </div>
            <p className="text-gray-600">Total Clubs</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow text-center">
            <div className="text-3xl font-bold text-green-600">
              {myClubs?.filter((c) => c.status === "approved")?.length}
            </div>
            <p className="text-gray-600">Approved</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow text-center">
            <div className="text-3xl font-bold text-amber-600">
              {myClubs?.filter((c) => c.status === "pending")?.length}
            </div>
            <p className="text-gray-600">Pending</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow text-center">
            <div className="text-3xl font-bold text-red-600">
              {myClubs?.filter((c) => c.status === "rejected")?.length}
            </div>
            <p className="text-gray-600">Rejected</p>
          </div>
          {/* <div className="bg-white p-6 rounded-2xl shadow text-center">
            <Package className="w-10 h-10 text-main mx-auto mb-2" />
            <p className="text-gray-600">Total Earnings</p>
          </div> */}
        </div>

        {/* Clubs Grid */}
        {myClubs?.length === 0 ? (
          <div className="text-center py-20">
            <Package className="w-20 h-20 text-gray-400 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-gray-700">No clubs yet</h3>
            <p className="text-gray-500 mt-3">
              Start by creating your first club!
            </p>
            <Link to="/dashboard/create-club">
              <button className="mt-6 bg-main text-white px-10 py-4 rounded-2xl font-bold hover:bg-main/90 transition">
                + Create Club
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {myClubs?.map((club) => (
              <ClubCard key={club._id} club={club} refetch={refetch} />
            ))}
          </div>
        )}
      </Container>
    </div>
  );
};

export default MyClub;
