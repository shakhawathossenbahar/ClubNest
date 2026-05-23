/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  XCircle,
  Clock,
  Users,
  Calendar,
  Mail,
  X,
} from "lucide-react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import Loading from "../../../components/animation/Loading";
import { AuthContext } from "../../../provider/authProvider";
import Container from "../../../components/Container";

const Membership = () => {
  const axiosSecure = useAxiosSecure();
  const {user} = useContext(AuthContext)
  const {
    data: memberships,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["membership"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/membershipGet?managerEmail=${user.email}`);
      return res.data;
    },
  });

  const queryClient = useQueryClient();
  const { mutate: updateStatus, isPending } = useMutation({
    mutationFn: async ({ id, updateInfo }) => {
      const res = await axiosSecure.patch(
        `/updateMembershipStatus/${id}`,
        updateInfo
      );
      return res.data;
    },
    onSuccess: () => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Status updated successfully",
        showConfirmButton: false,
        timer: 2000,
      });
      queryClient.invalidateQueries(["membership"]);
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

  const activeMember = (id) => {
    const updateInfo = { status: "active" };
    updateStatus({ id, updateInfo });
  };

  const expireMember = (id) => {
    const updateInfo = { status: "expired" };
    updateStatus({ id, updateInfo });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const statusConfig = {
    active: { color: "bg-green-100 text-green-800", icon: CheckCircle2 },
    expired: { color: "bg-red-100 text-red-800", icon: XCircle },
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  if (isLoading || isFetching || isPending) {
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
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-main/10 rounded-full mb-6">
            <Users className="w-10 h-10 text-main" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            My Clubs Memberships
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            View all clubs memberships you're created and manage your members
            status
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
        >
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
            <div className="text-4xl font-bold text-main">
              {memberships?.length}
            </div>
            <p className="text-gray-600 mt-2">Total Memberships</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
            <div className="text-4xl font-bold text-green-600">
              {memberships?.filter((m) => m.status === "active")?.length}
            </div>
            <p className="text-gray-600 mt-2">Active</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
            <div className="text-4xl font-bold text-amber-600">
              {memberships?.filter((m) => m.status === "expired").length}
            </div>
            <p className="text-gray-600 mt-2">Expired</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
            <div className="text-4xl font-bold text-main">
              $
              {memberships
                ?.reduce((sum, m) => sum + m.clubFee, 0)
                .toLocaleString()}
            </div>
            <p className="text-gray-600 mt-2">Total Earn</p>
          </div>
        </motion.div>

        {/* Membership Table */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-white rounded-3xl shadow-xl overflow-hidden"
        >
          <div className="p-6 border-b border-gray-200 bg-linear-to-r from-main/5 to-purple-50">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
              <Users className="w-7 h-7 text-main" />
              Your Club Memberships
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr>
                  <th className="px-6 py-5 text-left text-sm font-bold text-gray-700">
                    Club
                  </th>
                  <th className="px-6 py-5 text-left text-sm font-bold text-gray-700">
                    Member
                  </th>
                  <th className="px-6 py-5 text-center text-sm font-bold text-gray-700">
                    Fee
                  </th>
                  <th className="px-6 py-5 text-center text-sm font-bold text-gray-700">
                    Joined
                  </th>
                  <th className="px-6 py-5 text-center text-sm font-bold text-gray-700">
                    Status
                  </th>
                  <th className="px-6 py-5 text-center text-sm font-bold text-gray-700">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {memberships?.map((membership) => {
                  const StatusIcon =
                    statusConfig[membership.status]?.icon || Clock;
                  return (
                    <tr>
                      {/* Club Info */}
                      <td className="px-6 py-6">
                        <div className="flex items-center gap-4">
                          <img
                            src={membership.clubImage}
                            alt={membership.clubName}
                            className="w-14 h-14 rounded-xl object-cover ring-2 ring-gray-200"
                          />
                          <div>
                            <h4 className="font-bold text-lg text-gray-900">
                              {membership.clubName}
                            </h4>
                            <p className="text-sm text-gray-500">
                              Club ID: {membership.clubId}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Member Info */}
                      <td className="px-6 py-6">
                        <div className="flex items-center gap-4">
                          <img
                            src={membership.memberImage}
                            alt={membership.memberName}
                            className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-200"
                          />
                          <div>
                            <p className="font-semibold text-gray-900">
                              {membership.memberName}
                            </p>
                            <p className="text-sm text-gray-500 flex items-center gap-2">
                              <Mail className="w-4 h-4" />
                              {membership.memberEmail}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Fee */}
                      <td className="px-6 py-6 text-center">
                        {membership.clubFee === 0 ? (
                          <span className="px-5 py-2 bg-green-100 text-green-800 rounded-full font-bold text-lg">
                            FREE
                          </span>
                        ) : (
                          <span className="text-2xl font-bold text-main">
                            ${membership.clubFee.toLocaleString()}
                          </span>
                        )}
                      </td>

                      {/* Joined Date */}
                      <td className="px-6 py-6 text-center">
                        <div className="flex flex-col items-center text-gray-600">
                          <Calendar className="w-5 h-5 mb-1" />
                          <span className="text-sm">
                            {formatDate(membership.createdAt)}
                          </span>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-6 text-center">
                        <span
                          className={`px-5 py-2 rounded-full text-sm font-bold flex items-center justify-center gap-2 w-fit mx-auto ${
                            statusConfig[membership.status]?.color ||
                            "bg-gray-100 text-gray-800"
                          }`}
                        >
                          <StatusIcon className="w-5 h-5" />
                          {membership.status.charAt(0).toUpperCase() +
                            membership.status.slice(1)}
                        </span>
                      </td>

                      <td className="px-6 py-6 text-center">
                        <div className="flex justify-center items-center gap-2">
                          <button
                            onClick={() => activeMember(membership._id)}
                            className="px-4 py-2 rounded-xl bg-green-100 text-green-800 font-semibold flex justify-center items-center gap-2 cursor-pointer"
                          >
                            <StatusIcon className="w-5 h-5" /> Active
                          </button>
                          <button
                            onClick={() => expireMember(membership._id)}
                            className="px-4 py-2 rounded-xl bg-red-50 text-red-600 font-semibold flex justify-center items-center gap-2 cursor-pointer"
                          >
                            <X /> Expire
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {memberships?.length === 0 && (
            <div className="text-center py-20">
              <Users className="w-20 h-20 text-gray-400 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-700">
                No memberships yet
              </h3>
              <p className="text-gray-500 mt-3">
                Join your first club to see it here!
              </p>
            </div>
          )}
        </motion.div>
      </Container>
    </div>
  );
};

export default Membership;
