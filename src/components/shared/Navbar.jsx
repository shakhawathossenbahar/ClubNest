import React, { useContext, useState } from "react";
import logo from "../../assets/ClubNest-logo.png";
import { Link, NavLink, useNavigate } from "react-router";
import Button from "../Button";
import {
  Menu,
  X,
  User,
  LayoutDashboard,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { AuthContext } from "../../provider/authProvider";
import useRole from "../../hooks/useRole";
import Swal from "sweetalert2";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, logOut } = useContext(AuthContext);
  const { role } = useRole();
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure to Log out?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Log Out",
    }).then((result) => {
      if (result.isConfirmed) {
        logOut();
        setIsDropdownOpen(false);
        setIsMobileMenuOpen(false);
        navigate("/");
        Swal.fire({
          title: "Log outed",
          text: "Log out Successfully",
          icon: "success",
        });
      }
    });
  };

  const Navlinks = (
    <>
      <NavLink
        to="/"
        end
        className="hover:text-main transition"
        onClick={() => setIsMobileMenuOpen()}
      >
        <li>Home</li>
      </NavLink>
      <NavLink
        to="/clubs"
        className="hover:text-main transition"
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <li>Clubs</li>
      </NavLink>

      <NavLink
        to="/events"
        className="hover:text-main transition"
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <li>Events</li>
      </NavLink>

      <NavLink
        to="/aboutUs"
        className="hover:text-main transition"
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <li>About Us</li>
      </NavLink>

      <NavLink
        to="/contactUs"
        className="hover:text-main transition"
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <li>Contact Us</li>
      </NavLink>

      {role === "member" && user?.email && (
        <NavLink
          to="/becomeClubManager"
          className="hover:text-main transition"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <li>Become Club Manager</li>
        </NavLink>
      )}
    </>
  );

  const setMenuClose = () => {
    setIsMobileMenuOpen(false);
    setIsDropdownOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/40 backdrop-blur-3xl border-b border-main/10">
      <div className="w-10/12 mx-auto flex items-center justify-between py-4">
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="ClubNest" className="w-32" />
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex list-none gap-10 font-semibold text-gray-700">
          {Navlinks}
        </div>

        {/* Desktop Auth Section */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-3 hover:bg-gray-100 rounded-full px-3 py-2 transition"
              >
                <img
                  src={user.photoURL || "https://via.placeholder.com/40"}
                  alt={user.displayName}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-main/20"
                />
                <div className="flex flex-col items-start">
                  <span className="font-medium text-gray-800">
                    {user.displayName?.split(" ")[0]}
                  </span>
                  <span className="text-xs">{role}</span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                  <div className="py-2">
                    <Link
                      to="/myProfile"
                      onClick={setMenuClose}
                      className="flex items-center gap-3 px-5 py-3 hover:bg-main/5 transition"
                    >
                      <User className="w-5 h-5" />
                      <span>My Profile</span>
                    </Link>
                    <Link
                      to="/dashboard"
                      onClick={setMenuClose}
                      className="flex items-center gap-3 px-5 py-3 hover:bg-main/5 transition"
                    >
                      <LayoutDashboard className="w-5 h-5" />
                      <span>Dashboard</span>
                    </Link>
                    <hr className="my-2 border-gray-100" />
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 px-5 py-3 hover:bg-red-50 text-red-600 w-full text-left transition"
                    >
                      <LogOut className="w-5 h-5" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login">
                <Button className="rounded-full px-6">Log In</Button>
              </Link>
              <Link to="/register">
                <Button className="rounded-full bg-main hover:bg-main/90 text-white px-6">
                  Register
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-3xl focus:outline-none"
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-main/25">
          <div className="flex flex-col items-center gap-6 py-8 font-semibold list-none">
            {Navlinks}

            <div className="w-full px-8 space-y-3">
              {user ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-4 px-4 py-3 bg-gray-50 rounded-xl">
                    <img
                      src={user.photoURL}
                      alt={user.displayName}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <p className="font-bold">{user.displayName}</p>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                  </div>

                  <Link to="/myProfile" onClick={setMenuClose} className="w-full">
                    <Button className="w-full rounded-full">My Profile</Button>
                  </Link>
                  <Link to="/dashboard" onClick={setMenuClose}>
                    <Button className="w-full my-2 rounded-full bg-main text-main hover:bg-main/20">
                      Dashboard
                    </Button>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full rounded-full bg-red-500 hover:bg-red-600 text-white py-1.5"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <>
                  <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button className="w-full rounded-full mb-2">Log In</Button>
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Button className="w-full rounded-full bg-main hover:bg-main/90 text-white">
                      Register
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
