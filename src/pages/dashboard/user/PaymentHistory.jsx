import React, { useContext } from "react";
import { AuthContext } from "../../../provider/authProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { AlertCircle, Calendar, History } from "lucide-react";
import Loading from "../../../components/animation/Loading";

const PaymentHistory = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const {
    data: payments,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    },
  });

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
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="w-10/12 mx-auto">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-gray-900 ">
            All of my Payment History
          </h1>
          <p className="mt-3 text-lg text-gray-600">
            Track your club Payment History & payment progress.
          </p>
        </div>

        {/* Table */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <History /> Payment History
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Club Name
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Club Id
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Transaction Id
                  </th>

                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                    Paid At
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {payments?.map((payment) => (
                  <tr key={payment._id} className="hover:bg-gray-50 transition">
                    {/* club Info */}
                    <td className="px-6 py-5">{payment.clubName}</td>

                    <td className="px-6 py-5">
                      <div>
                        <p className=" text-gray-900">{payment.clubId}</p>
                      </div>
                    </td>

                    {/* transactionId  */}
                    <td>
                      <p className=" py-1 px-2 rounded-full">
                        {payment.transactionId}
                      </p>
                    </td>

                    {/* created Date */}
                    <td className="px-6 py-5 text-center">
                      <div className="flex items-center justify-center gap-2 text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">
                          {formatDate(payment.PaidAt)}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex justify-center">
                        {payment.amount === 0 || "" ? (
                          <p className="font-bold text-green-700">Free</p>
                        ) : (
                          <p className="text-main font-bold">
                            $ {payment.amount}
                          </p>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State (if no applications) */}
          {payments?.length === 0 && (
            <div className="text-center py-16">
              <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">
                No Payment Histroy at the moment.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;
