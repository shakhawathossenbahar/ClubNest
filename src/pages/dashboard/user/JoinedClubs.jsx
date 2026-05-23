import React, { useContext } from "react";
import { Plus, Package } from "lucide-react";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../provider/authProvider";
import ClubCard from "../clubManager/ClubCard";
import Loading from "../../../components/animation/Loading";

const JoinedClubs = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const {
    data: allClubs,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["allClubs", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get("/clubs");
      return res.data;
    },
  });

  const {
    data: joinReqData,
    isLoading: loading,
    isFetching: fetching,
  } = useQuery({
    queryKey: ["joinReqData"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/membershipGet?email=${user.email}`);
      return res.data;
    },
  });

  const activeJoinedClubs = joinReqData?.filter(
    (club) => club.status === "active"
  );
  const joinedClubIds = activeJoinedClubs?.map((c) => c.clubId);
  const joinedClubs = allClubs?.filter((club) =>
    joinedClubIds?.includes(club._id)
  );

  const pending = joinReqData?.filter(
    (data) => data.status === "pendingPayment"
  );

  const pendingJoin = joinReqData?.filter(
    (data) => data.status === "pending join"
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
              My Joined Clubs
            </h1>
            <p className="mt-3 text-lg text-gray-600">
              Manage and track all clubs you've Joined
            </p>
          </div>

          <Link to="/clubs">
            <button className="flex items-center gap-3 bg-main text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:bg-main/90 hover:shadow-xl transition-all">
              <Plus className="w-6 h-6" />
              Join New Club
            </button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl shadow text-center">
            <div className="text-3xl font-bold text-main">
              {joinReqData?.length}
            </div>
            <p className="text-gray-600">Total Clubs</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow text-center">
            <div className="text-3xl font-bold text-green-600">
              {joinReqData?.filter((c) => c.status === "active")?.length}
            </div>
            <p className="text-gray-600">Active</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow text-center">
            <div className="text-3xl font-bold text-red-600">
              {joinReqData?.filter((c) => c.status === "expired")?.length}
            </div>
            <p className="text-gray-600">Expired</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow text-center">
            <div className="text-3xl font-bold text-red-600">
              {pending?.length + pendingJoin?.length || 0}
            </div>
            <p className="text-gray-600">Pending Payment</p>
          </div>
        </div>

        {/* Clubs Grid */}
        {allClubs?.length === 0 ? (
          <div className="text-center py-20">
            <Package className="w-20 h-20 text-gray-400 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-gray-700">No clubs yet</h3>
            <p className="text-gray-500 mt-3">
              Start by joining your first club!
            </p>
            <Link to="/clubs">
              <button className="mt-6 bg-main text-white px-10 py-4 rounded-2xl font-bold hover:bg-main/90 transition">
                + Join Club
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {joinedClubs?.map((club) => (
              <ClubCard key={club._id} club={club} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default JoinedClubs;
