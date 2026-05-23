import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AlertCircle, Calendar, Check, Mail, X } from "lucide-react";
import Loading from "../../../components/animation/Loading";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const {
    data: allUsers,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const { mutate: updateStatus, isPending } = useMutation({
    mutationFn: async ({ id, updateInfo }) => {
      const res = await axiosSecure.patch(`/user/${id}`, updateInfo);
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
      queryClient.invalidateQueries(["users"]);
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

  const updateUserRole = (user, status) => {
    const updateInfo = { email: user?.email, status: status };
    updateStatus({ id: user._id, updateInfo });
  };

  const makeAdmin = (user) => {
    updateUserRole(user, "admin");
  };

  const removeAdmin = (user) => {
    updateUserRole(user, "member");
  };

  const makeClubManager = (user) => {
    updateUserRole(user, "Club-Manager");
  };

  if (isLoading || isFetching || isPending) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  const allAdmin = allUsers?.filter((user) => user.role === "admin");
  const allClubManager = allUsers?.filter(
    (user) => user.role === "Club-Manager"
  );
  const allMember = allUsers?.filter((user) => user.role === "member");

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="w-10/12 mx-auto">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-gray-900 ">
            User Managment Dashboard
          </h1>
          <p className="mt-3 text-lg text-gray-600">
            Review and approve users who access to admin panel
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
            <div className="text-3xl font-bold text-main">
              {allAdmin?.length}
            </div>
            <p className="text-gray-600 mt-1">Admin</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
            <div className="text-3xl font-bold text-green-600">
              {allClubManager?.length}
            </div>
            <p className="text-gray-600 mt-1">Club Managers</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
            <div className="text-3xl font-bold text-orange-600">
              {allMember?.length}
            </div>
            <p className="text-gray-600 mt-1">Members</p>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800">All Users list</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    User
                  </th>

                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                    Created
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
                {allUsers?.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50 transition">
                    {/* User Info */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <img
                          src={user.photoURL}
                          alt={user.displayName}
                          className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-200"
                        />
                        <div>
                          <p className="font-semibold text-gray-900">
                            {user.displayName}
                          </p>

                          <div className="flex items-center gap-2 text-gray-700">
                            <Mail className="w-4 h-4" />
                            <span className="text-sm">{user.email}</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* created Date */}
                    <td className="px-6 py-5 text-center">
                      <div className="flex items-center justify-center gap-2 text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">
                          {formatDate(user.createdAt)}
                        </span>
                      </div>
                    </td>

                    <td>
                      <div className="flex justify-center items-center">
                        <p>{user.role}</p>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-5">
                      <div className="flex items-center justify-center gap-3">
                        <button
                          onClick={() => makeAdmin(user)}
                          className="p-3 bg-green-100 text-green-700 rounded-xl hover:bg-green-200 transition group font-semibold cursor-pointer"
                        >
                          Make Admin
                        </button>
                        <button
                          onClick={() => removeAdmin(user)}
                          className="p-3 bg-orange-100 text-orange-600 rounded-xl hover:bg-orange-200 transition group font-semibold cursor-pointer"
                        >
                          Make Member
                        </button>

                        <button
                          onClick={() => makeClubManager(user)}
                          className="p-3 bg-blue-100 text-main rounded-xl hover:bg-main/10 transition group font-semibold cursor-pointer"
                        >
                          Make Club Manager
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State (if no applications) */}
          {allUsers?.length === 0 && (
            <div className="text-center py-16">
              <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No users at the moment.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
