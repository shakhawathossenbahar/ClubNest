import React, { useEffect, useRef, useState } from "react";
import { useSearchParams, Link } from "react-router";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { CheckCircle2, ArrowRight, Home, Calendar, Users } from "lucide-react";
import Loading from "../components/animation/Loading";
import PaymentSuccessAnimation from "../components/animation/PaymentSuccessAnimation";

const PaymentSuccess = () => {
  const axiosSecure = useAxiosSecure();
  const [searchParams] = useSearchParams();

  const [paymentInfo, setPaymentInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const isMounted = useRef(false);

  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (isMounted.current) return;
    isMounted.current = true;

    if (sessionId) {
      axiosSecure
        .patch(`/payment-success?session_id=${sessionId}`)
        .then((res) => {
          setPaymentInfo({
            transactionId: res.data.transactionId,
            amount: res.data.amount,
            clubName: res.data.clubName
          });
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [sessionId, axiosSecure]);


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center flex flex-col gap-5 items-center">
          <div className="w-32 h-32 mx-auto mb-6">
            <Loading />
          </div>
          <p className="text-xl text-gray-600 mt-8 text-center">Processing your payment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full">
        {/* Success Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Header with Animation */}
          <div className="bg-linear-to-r from-main to-purple-700 p-10 text-center">
            <div className="w-56 mx-auto mb-6">
              <PaymentSuccessAnimation />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
              Payment Successful!
            </h1>
            <p className="text-xl text-white/90">
              Thank you for your payment. You're all set!
            </p>
          </div>

          {/* Details Section */}
          <div className="p-8 md:p-12">
            <div className="flex items-center justify-center mb-8">
              <CheckCircle2 className="w-16 h-16 text-green-500" />
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 mb-8 space-y-6">
              <div className="text-center">
                <p className="text-gray-600 text-lg">Transaction ID</p>
                <p className="text-2xl font-bold text-main mt-2 font-mono">
                  {paymentInfo.transactionId || "TRX-XXXX-XXXX-XXXX"}
                </p>
              </div>

              {paymentInfo.clubName && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center md:text-left">
                  <div>
                    <p className="text-gray-600 flex items-center justify-center md:justify-start gap-2">
                      <Users className="w-5 h-5" />
                      Club
                    </p>
                    <p className="text-xl font-semibold text-gray-900 mt-1">
                      {paymentInfo.clubName}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 flex items-center justify-center md:justify-start gap-2">
                      <Calendar className="w-5 h-5" />
                      Purchased For
                    </p>
                    <p className="text-xl font-semibold text-gray-900 mt-1">
                      {paymentInfo.eventName || "Club Membership"}
                    </p>
                  </div>
                </div>
              )}

              {paymentInfo.amount && (
                <div className="text-center pt-6 border-t border-gray-200">
                  <p className="text-gray-600">Amount Paid</p>
                  <p className="text-3xl font-bold text-main mt-2">
                    ${paymentInfo.amount}
                  </p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link to="/dashboard/joined-clubs"
                className="rounded-full py-4 text-lg bg-main hover:bg-main/75 text-white font-semibold flex items-center justify-center gap-3"
              >
                <Users className="w-6 h-6" />
                View My Clubs
                <ArrowRight className="w-5 h-5" />
              </Link>

              <Link to="/"
                className="rounded-full py-4 text-lg font-semibold bg-gray-100 text-gray-800 hover:bg-gray-200 flex items-center justify-center gap-3"
              >
                <Home className="w-6 h-6" />
                Back to Home
              </Link>
            </div>

            {/* Footer Note */}
            <div className="mt-10 text-center">
              <p className="text-sm text-gray-500">
                A confirmation email has been sent to your inbox.
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Need help? Contact support at{" "}
                <a href="mailto:support@clubnest.com" className="text-main font-medium hover:underline">
                  support@clubnest.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;