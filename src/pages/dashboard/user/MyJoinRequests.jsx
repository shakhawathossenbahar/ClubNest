import React, { useContext } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../../../provider/authProvider";
import {
  AlertCircle,
  BadgeDollarSign,
  Calendar,
  PlusCircle,
} from "lucide-react";
import Swal from "sweetalert2";
import Loading from "../../../components/animation/Loading";

const MyJoinRequests = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const {
    data: joinReqData,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["joinReqData"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/membershipGet?email=${user.email}`);
      return res.data;
    },
  });

  const queryClient = useQueryClient();
  const { mutate: payClubFee, isPending: pendings } = useMutation({
    mutationFn: async (paymentInfo) => {
      const res = await axiosSecure.post(
        "/create-checkout-session",
        paymentInfo
      );
      return res.data.url;
    },
    onSuccess: (url) => {
      window.location.href = url;
      queryClient.invalidateQueries(["joinReqData"]);
    },
  });

  const handlePayment = (data) => {
    const paymentInfo = {
      clubFee: data.clubFee,
      clubName: data.clubName,
      managerEmail: data.managerEmail,
      clubId: data.clubId,
      memberEmail: data.memberEmail,
      memberName: data.memberName,
      memberId: data._id,
      status: data.status,
    };
    
    payClubFee(paymentInfo);
  };

  const { mutate: freeJoin, isPending } = useMutation({
    mutationFn: async (clubInfo) => {
      const res = await axiosSecure.patch("/freeJoin", clubInfo);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Joined successfully",
        showConfirmButton: false,
        timer: 2000,
      });
      queryClient.invalidateQueries(["joinReqData"]);
    },
  });

  const handleFreeJoin = (data) => {
    const clubInfo = {
      clubFee: data.clubFee,
      clubName: data.clubName,
      managerEmail: data.managerEmail,
      clubId: data.clubId,
      memberEmail: data.memberEmail,
      memberName: data.memberName,
      memberId: data._id,
      status: data.status,
    };
    freeJoin(clubInfo);
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

  const activateClub = joinReqData?.filter((data) => data.status === "active");
  const pending = joinReqData?.filter(
    (data) => data.status === "pendingPayment"
  );

  const pendingJoin = joinReqData?.filter(
    (data) => data.status === "pending join"
  );
  const expiredClub = joinReqData?.filter((data) => data.status === "expired");
  if (isLoading || isFetching || isPending || pendings) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="w-10/12 mx-auto">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-gray-900 ">
            My Club Join Requests
          </h1>
          <p className="mt-3 text-lg text-gray-600">
            Track your club membership requests, payment progress, and
            activation status easily.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
            <div className="text-3xl font-bold text-main">
              {activateClub?.length || 0}
            </div>
            <p className="text-gray-600 mt-1">Active</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
            <div className="text-3xl font-bold text-green-600">
              {pending?.length + pendingJoin?.length || 0}
            </div>
            <p className="text-gray-600 mt-1">Pending</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
            <div className="text-3xl font-bold text-orange-600">
              {expiredClub?.length || 0}
            </div>
            <p className="text-gray-600 mt-1">expired</p>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800">All </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Club Banner
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Club Name
                  </th>

                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                    Created
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                    Status
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Club Fee
                  </th>

                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {joinReqData?.map((reqData) => (
                  <tr key={reqData._id} className="hover:bg-gray-50 transition">
                    {/* User Info */}
                    <td className="px-6 py-5">
                      <img
                        src={reqData.clubImage}
                        alt={reqData.clubName}
                        className="w-46 h-22 rounded-xl object-cover ring-2 ring-gray-200"
                      />
                    </td>

                    <td className="px-6 py-5">
                      <div>
                        <p className="font-bold text-gray-900 md:text-xl">
                          {reqData.clubName}
                        </p>
                      </div>
                    </td>

                    {/* created Date */}
                    <td className="px-6 py-5 text-center">
                      <div className="flex items-center justify-center gap-2 text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">
                          {formatDate(reqData.createdAt)}
                        </span>
                      </div>
                    </td>

                    <td>
                      <div className="flex justify-center items-center">
                        {reqData.status === "pendingPayment" ? (
                          <p className="text-orange-500 font-semibold bg-amber-100 py-1 px-2 rounded-full">
                            {reqData.status.split("g").join("g ")}
                          </p>
                        ) : (
                          <p
                            className={` font-semibold  py-1 px-2.5 rounded-full ${
                              reqData.status === "pending join" ||
                              reqData.status === "expired"
                                ? "text-orange-500 bg-amber-100"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {reqData.status}
                          </p>
                        )}
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <div>
                        {reqData.clubFee === 0 || "" ? (
                          <p className="font-bold text-green-700">Free</p>
                        ) : (
                          <p className="text-main font-bold">
                            $ {reqData.clubFee}
                          </p>
                        )}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-5">
                      <div className="flex items-center justify-center gap-3">
                        {reqData.clubFee === 0 ? (
                          <button
                            disabled={reqData?.status === "active"}
                            onClick={() => handleFreeJoin(reqData)}
                            className={`p-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-400 hover:text-black cursor-pointer transition group flex justify-center items-center gap-2 ${
                              reqData.status === "active" &&
                              "opacity-60 cursor-not-allowed! hover:bg-green-600 hover:text-white"
                            }`}
                          >
                            <PlusCircle /> Join Now
                          </button>
                        ) : reqData.status === "active" ? (
                          <button className="p-3 bg-green-300  font-bold rounded-xl text-black cursor-not-allowed flex justify-center items-center gap-2">
                            <BadgeDollarSign /> Paid
                          </button>
                        ) : (
                          <button
                            onClick={() => handlePayment(reqData)}
                            className="p-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-400 hover:text-black cursor-pointer transition group flex justify-center items-center gap-2"
                          >
                            <BadgeDollarSign /> Pay Now
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State (if no applications) */}
          {joinReqData?.length === 0 && (
            <div className="text-center py-16">
              <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">
                No club data at the moment.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyJoinRequests;
