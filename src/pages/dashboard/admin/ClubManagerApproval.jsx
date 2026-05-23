import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Check,
  X,
  Clock,
  User,
  Mail,
  Phone,
  Calendar,
  AlertCircle,
} from "lucide-react";
import Loading from "../../../components/animation/Loading";
import Swal from "sweetalert2";
import Container from "../../../components/Container";

const ClubManagerApproval = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: clubManager,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["getClubManager"],
    queryFn: async () => {
      const res = await axiosSecure.get("/getClubManager");
      return res.data;
    },
  });

  const queryClient = useQueryClient();

  const { mutate: updateStatus, isPending } = useMutation({
    mutationFn: async ({ id, updateInfo }) => {
      const res = await axiosSecure.patch(`/clubManager/${id}`, updateInfo);
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
      queryClient.invalidateQueries(["getClubManager"]);
    },
    onError: (error) => {
      Swal.fire({
        position: "center",
        icon: "error",
        title: error.message,
        showConfirmButton: false,
        timer: 2000,
      });
    },
  });

  if (isLoading || isFetching || isPending) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  const updateClubManagerStatus = (manager, status) => {
    const updateInfo = { email: manager?.email, status: status };
    updateStatus({ id: manager._id, updateInfo });
  };

  const handleApprove = (manager) => {
    updateClubManagerStatus(manager, "approved");
  };

  const handleReject = (manager) => {
    updateClubManagerStatus(manager, "rejected");
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

  const approvedManager = clubManager?.filter((m) => m.status === "approved");
  const pendingManager = clubManager?.filter((m) => m.status === "pending");
  const rejectedManager = clubManager?.filter((m) => m.status === "rejected");

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <Container>
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-gray-900 ">
            Club Manager Applications
          </h1>
          <p className="mt-3 text-lg text-gray-600">
            Review and approve users who want to create clubs & events
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
            <div className="text-3xl font-bold text-main">
              {pendingManager?.length}
            </div>
            <p className="text-gray-600 mt-1">Pending Approval</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
            <div className="text-3xl font-bold text-green-600">
              {approvedManager?.length}
            </div>
            <p className="text-gray-600 mt-1">Approved Managers</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
            <div className="text-3xl font-bold text-red-600">
              {rejectedManager?.length}
            </div>
            <p className="text-gray-600 mt-1">Rejected</p>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800">
              All Applications
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    User
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Contact
                  </th>

                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                    Applied
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                    Status
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {clubManager?.map((app) => (
                  <tr key={app._id} className="hover:bg-gray-50 transition">
                    {/* User Info */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <img
                          src={app.photoURL}
                          alt={app.name}
                          className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-200"
                        />
                        <div>
                          <p className="font-semibold text-gray-900">
                            {app.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {app.location}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Contact */}
                    <td className="px-6 py-5">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-gray-700">
                          <Mail className="w-4 h-4" />
                          <span className="text-sm">{app.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-700">
                          <Phone className="w-4 h-4" />
                          <span className="text-sm">{app.phone}</span>
                        </div>
                      </div>
                    </td>

                    {/* Applied Date */}
                    <td className="px-6 py-5 text-center">
                      <div className="flex items-center justify-center gap-2 text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">
                          {formatDate(app.createdAt)}
                        </span>
                      </div>
                    </td>

                    <td>
                      <div className="flex justify-center items-center">
                        <p>{app.status}</p>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-5">
                      <div className="flex items-center justify-center gap-3">
                        <button
                          onClick={() => handleApprove(app)}
                          className="p-3 bg-green-100 text-green-700 rounded-xl hover:bg-green-200 transition group"
                        >
                          <Check className="w-5 h-5 group-hover:scale-110 transition" />
                        </button>
                        <button
                          onClick={() => handleReject(app)}
                          className="p-3 bg-red-100 text-red-700 rounded-xl hover:bg-red-200 transition group"
                        >
                          <X className="w-5 h-5 group-hover:scale-110 transition" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State (if no applications) */}
          {clubManager?.length === 0 && (
            <div className="text-center py-16">
              <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">
                No pending applications at the moment.
              </p>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default ClubManagerApproval;
