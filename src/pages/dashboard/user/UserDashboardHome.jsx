import React from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import {
  Users,
  Calendar,
  DollarSign,
  LayoutDashboard,
  TrendingUp,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/animation/Loading";

const UserDashboardHome = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: userStats,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["member-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/member-stats");
      return res.data;
    },
  });

  // Transform data into array format for stats and chart
  const statsData = [
    {
      status: "Total Events Attended",
      count: userStats?.totalEventsAttended || 0,
    },
    { status: "Total Clubs Joined", count: userStats?.totalClubsJoined || 0 },
    { status: "Total Spent", count: userStats?.totalSpent || 0 },
  ];

  // For the area chart (using all metrics)
  const chartData = statsData.map((item) => ({
    name: item.status.replace("Total ", ""),
    value: item.count,
  }));

  if (isLoading || isFetching) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="w-11/12 mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-main/10 rounded-full mb-6">
            <LayoutDashboard className="w-10 h-10 text-main" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            User Dashboard
          </h1>
          <p className="text-xl text-gray-600">
            Overview of your ClubNest activity and statistics
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {statsData?.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl shadow-xl p-8 text-center"
            >
              <div className="w-16 h-16 bg-main/10 rounded-full flex items-center justify-center mx-auto mb-6">
                {stat.status === "Total Clubs Joined" && (
                  <Users className="w-8 h-8 text-main" />
                )}
                {stat.status === "Total Events Attended" && (
                  <Calendar className="w-8 h-8 text-main" />
                )}
                {stat.status === "Total Spent" && (
                  <DollarSign className="w-8 h-8 text-main" />
                )}
              </div>
              <h3 className="text-4xl font-extrabold text-gray-900 mb-2">
                {stat.status === "Total Spent"
                  ? `$ ${stat.count.toLocaleString()}`
                  : stat.count.toLocaleString()}
              </h3>
              <p className="text-gray-600 font-medium text-lg">{stat.status}</p>
            </div>
          ))}
        </div>

        {/* Statistics Area Chart */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <TrendingUp className="w-7 h-7 text-main" />
            Activity Overview (Area View)
          </h2>
          <div className="w-full h-80 rounded-2xl flex justify-center border-2 border-gray-300 md:p-6">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{ top: 20, right: 20, left: 0, bottom: 0 }}
              >
                {/* Soft Grid */}
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                {/* X Axis */}
                <XAxis dataKey="name" />
                {/* Y Axis */}
                <YAxis />
                {/* Tooltip */}
                <Tooltip
                  contentStyle={{
                    borderRadius: "10px",
                    border: "none",
                    boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
                  }}
                  labelStyle={{ fontWeight: "bold" }}
                  itemStyle={{ color: "#3713ec" }}
                />
                {/* Gradient Fill */}
                <defs>
                  <linearGradient id="colorBlue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3713ec" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="#3713ec" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                {/* Smooth Area Line */}
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#3713ec"
                  strokeWidth={3}
                  fill="url(#colorBlue)"
                  activeDot={{ r: 6, fill: "#3713ec" }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboardHome;
