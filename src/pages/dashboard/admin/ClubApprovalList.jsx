// pages/admin/ClubApprovalList.jsx
import React from "react";
import {
  Check,
  X,
  Clock,
  MapPin,
  Users,
  Calendar,
  DollarSign,
  Eye,
} from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router";
import Loading from "../../../components/animation/Loading";
import Swal from "sweetalert2";

const ClubApprovalList = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: Clubs,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["allClubs"],
    queryFn: async () => {
      const res = await axiosSecure.get("/clubs");
      return res.data;
    },
  });

  const queryClient = useQueryClient();
  const { mutate: updateStatus } = useMutation({
    mutationFn: async ({ id, updateInfo }) => {
      const res = await axiosSecure.patch(`/clubStatus/${id}`, updateInfo);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Status Updated Successfully",
        showConfirmButton: false,
        timer: 2000,
      });
      queryClient.invalidateQueries(["allClubs"]);
    },
  });

  const handleUpdateStatus = (id, status) => {
    const updateInfo = { status: status };
    updateStatus({ id, updateInfo });
  };

  const handleApprove = (id) => {
    handleUpdateStatus(id, "approved");
  };

  const handleReject = (id) => {
    handleUpdateStatus(id, "rejected");
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading || isFetching) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loading />
      </div>
    );
  }
  const pendingClubs = Clubs.filter((c) => c.status === "pending");
  const approvedClubs = Clubs.filter((c) => c.status === "approved");
  const rejectedClubs = Clubs.filter((c) => c.status === "rejected");

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-10/12 mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Club Approval Dashboard
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Review and approve/reject new club requests
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-10">
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
            <div className="text-4xl font-bold text-amber-600">
              {pendingClubs.length}
            </div>
            <p className="text-gray-600 mt-2">Pending</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
            <div className="text-4xl font-bold text-green-600">
              {approvedClubs.length}
            </div>
            <p className="text-gray-600 mt-2">Approved</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
            <div className="text-4xl font-bold text-red-600">
              {rejectedClubs.length}
            </div>
            <p className="text-gray-600 mt-2">Rejected</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
            <div className="text-4xl font-bold text-main">{Clubs.length}</div>
            <p className="text-gray-600 mt-2">Total Clubs</p>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="p-6 border-b border-gray-200 bg-linear-to-r from-main/5 to-purple-50">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
              All Club List
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
                    Manager
                  </th>
                  <th className="px-6 py-5 text-center text-sm font-bold text-gray-700">
                    Fee
                  </th>
                  <th className="px-6 py-5 text-center text-sm font-bold text-gray-700">
                    Applied
                  </th>
                  <th className="px-6 py-5 text-left text-sm font-bold text-gray-700">
                    Status
                  </th>
                  <th className="px-6 py-5 text-center text-sm font-bold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {Clubs.map((club) => (
                  <tr
                    key={club._id}
                    className="hover:bg-main/5 transition duration-200"
                  >
                    {/* Club Info */}
                    <td className="px-6 py-6">
                      <div className="flex items-center gap-4">
                        <img
                          src={club.clubImage}
                          alt={club.clubName}
                          className="w-16 h-16 rounded-xl object-cover ring-2 ring-gray-200"
                        />
                        <div>
                          <h4 className="font-bold text-lg text-gray-900">
                            {club.clubName}
                          </h4>
                        </div>
                      </div>
                    </td>

                    {/* Manager */}
                    <td className="px-6 py-6">
                      <div>
                        <p className="font-semibold text-gray-900">
                          {club.managerName}
                        </p>
                        <p className="text-sm text-gray-500">
                          {club.managerEmail}
                        </p>
                      </div>
                    </td>

                    {/* Fee */}
                    <td className="px-6 py-6 text-center">
                      {club.memberShipFee === 0 ? (
                        <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full font-bold">
                          FREE
                        </span>
                      ) : (
                        <span className="text-2xl font-bold text-main">
                          ${club.memberShipFee.toLocaleString()}
                        </span>
                      )}
                    </td>

                    {/* Applied Date */}
                    <td className="px-6 py-6 text-center text-gray-600">
                      <div className="flex flex-col items-center">
                        <Calendar className="w-5 h-5 mb-1" />
                        <span className="text-sm">
                          {formatDate(club.createdAt)}
                        </span>
                      </div>
                    </td>

                    {/* status */}
                    <td className="px-6 py-6">
                      <div
                        className={`flex items-center justify-center py-0.5 rounded-full ${
                          club.status === "approved"
                            ? "bg-green-50 text-green-600"
                            : club.status === "pending"
                            ? "bg-orange-50 text-orange-600"
                            : "bg-red-50 text-red-600"
                        }`}
                      >
                        <span className="font-medium">{club.status}</span>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-6">
                      <div className="flex items-center justify-center gap-4">
                        {/* View Details */}
                        <Link
                          to={`/clubs/${club._id}`}
                          title="View Club Details"
                          className="p-3 bg-blue-100 text-blue-700 rounded-xl hover:bg-blue-200 transition group"
                        >
                          <Eye className="w-5 h-5 group-hover:scale-110 transition" />
                        </Link>

                        {/* Approve */}
                        <button
                          onClick={() => handleApprove(club._id)}
                          className="p-3 bg-green-100 text-green-700 rounded-xl hover:bg-green-200 transition group"
                        >
                          <Check className="w-6 h-6 group-hover:scale-110 transition" />
                        </button>

                        {/* Reject */}
                        <button
                          onClick={() => handleReject(club._id)}
                          className="p-3 bg-red-100 text-red-700 rounded-xl hover:bg-red-200 transition group"
                        >
                          <X className="w-6 h-6 group-hover:scale-110 transition" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {Clubs.length === 0 && (
            <div className="text-center py-20">
              <Clock className="w-20 h-20 text-gray-400 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-700">
                No Pending Requests
              </h3>
              <p className="text-gray-500 mt-3">
                All club requests have been processed.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClubApprovalList;
