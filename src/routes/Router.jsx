import { createBrowserRouter } from "react-router";
import Mainlayouts from "../layouts/Mainlayouts";
import Home from "../pages/Home";
import Login from "../pages/authentication/Login";
import Register from "../pages/authentication/Register";
import MyProfile from "../pages/MyProfile";
import DashboardLayout from "../layouts/DashboardLayout";
import DashboardHome from "../pages/dashboard/DashboardHome";
import BecomeClubManager from "../pages/BecomeClubManager";
import ClubManagerApproval from "../pages/dashboard/admin/ClubManagerApproval";
import CreateClub from "../pages/dashboard/clubManager/CreateClub";
import MyClub from "../pages/dashboard/clubManager/MyClub";
import ClubDetails from "../pages/ClubDetails";
import ClubApprovalList from "../pages/dashboard/admin/ClubApprovalList";
import ManageUsers from "../pages/dashboard/admin/ManageUsers";
import Clubs from "../pages/Clubs";
import MyJoinRequests from "../pages/dashboard/user/MyJoinRequests";
import PaymentSuccess from "../pages/PaymentSuccess";
import PaymentHistory from "../pages/dashboard/user/PaymentHistory";
import JoinedClubs from "../pages/dashboard/user/JoinedClubs";
import MyEvents from "../pages/dashboard/clubManager/MyEvents";
import Events from "../pages/Events";
import EventDetails from "../pages/EventDetails";
import JoinedEvents from "../pages/dashboard/user/JoinedEvents";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Membership from "../pages/dashboard/clubManager/Membership";
import PrivateRoute from "../provider/PrivateRoute";
import AdminOnlyRoute from "../provider/AdminOnlyRoute";
import ClubManagerOnlyRoute from "../provider/ClubManagerOnlyRoute";
import Error404 from "../components/animation/Error404";
import AllTransactionHistroy from "../pages/dashboard/admin/AllTransactionHistroy";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Mainlayouts,
    errorElement: <Error404 />,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/myProfile",
        element: (
          <PrivateRoute>
            <MyProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "/becomeClubManager",
        Component: BecomeClubManager,
      },
      {
        path: "/clubs/:id",
        element: (
          <PrivateRoute>
            <ClubDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/clubs",
        Component: Clubs,
      },
      {
        path: "/events",
        Component: Events,
      },
      {
        path: "/eventDetails/:id",
        element: (
          <PrivateRoute>
            <EventDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/aboutUs",
        Component: About,
      },
      {
        path: "/contactUs",
        Component: Contact,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <DashboardHome />
          </PrivateRoute>
        ),
      },
      {
        path: "approve-club-manager",
        element: (
          <AdminOnlyRoute>
            <ClubManagerApproval />
          </AdminOnlyRoute>
        ),
      },
      {
        path: "create-club",
        element: (
          <ClubManagerOnlyRoute>
            <CreateClub />
          </ClubManagerOnlyRoute>
        ),
      },
      {
        path: "my-clubs",
        element: (
          <ClubManagerOnlyRoute>
            <MyClub />
          </ClubManagerOnlyRoute>
        ),
      },
      {
        path: "approve-clubs",
        element: (
          <AdminOnlyRoute>
            <ClubApprovalList />
          </AdminOnlyRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <AdminOnlyRoute>
            <ManageUsers />
          </AdminOnlyRoute>
        ),
      },
      {
        path: "my-join-requests",
        element: (
          <PrivateRoute>
            <MyJoinRequests />
          </PrivateRoute>
        ),
      },
      {
        path: "payment-success",
        element: (
          <PrivateRoute>
            <PaymentSuccess />
          </PrivateRoute>
        ),
      },
      {
        path: "payment-history",
        element: (
          <PrivateRoute>
            <PaymentHistory />
          </PrivateRoute>
        ),
      },
      {
        path: "joined-clubs",
        element: (
          <PrivateRoute>
            <JoinedClubs />
          </PrivateRoute>
        ),
      },
      {
        path: "my-events",
        element: (
          <ClubManagerOnlyRoute>
            <MyEvents />
          </ClubManagerOnlyRoute>
        ),
      },
      {
        path: "joined-events",
        element: (
          <PrivateRoute>
            <JoinedEvents />
          </PrivateRoute>
        ),
      },
      {
        path: "membership",
        element: (
          <ClubManagerOnlyRoute>
            <Membership />
          </ClubManagerOnlyRoute>
        ),
      },
      {
        path: "AllTransaction",
        element: (
          <AdminOnlyRoute>
            <AllTransactionHistroy />
          </AdminOnlyRoute>
        ),
      },
    ],
  },
]);
