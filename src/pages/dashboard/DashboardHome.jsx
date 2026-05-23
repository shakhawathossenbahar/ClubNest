import React from "react";
import Loading from "../../components/animation/Loading";
import useRole from "../../hooks/useRole";
import AdminDashboardHome from "./admin/AdminDashboardHome";
import ClubManagerDashboardHome from "./clubManager/ClubManagerDashboardHome";
import UserDashboardHome from "./user/UserDashboardHome";

const DashboardHome = () => {
  const { role, isLoading } = useRole();
  if (isLoading) {
    return <Loading />
  }
  if (role === "admin") {
    return <AdminDashboardHome />;
  } else if (role === "Club-Manager") {
    return <ClubManagerDashboardHome />;
  } else {
    return <UserDashboardHome />;
  }
};

export default DashboardHome;