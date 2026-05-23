import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { Camera, Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import Button from "../../components/Button";
import GoogleLogin from "../../components/GoogleLogin";
import { useForm } from "react-hook-form";
import { imageUpload } from "../../utils";
import { AuthContext } from "../../provider/authProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const Register = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const { createUser, updateUser, setLoading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const location = useLocation();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRegister = async (data) => {
    const imageUrl = await imageUpload(profilePic);

    // email password registration
    createUser(data.email, data.password)
      .then((res) => {
        // console.log(res.user);

        const userProfile = {
          displayName: data.name,
          photoURL: imageUrl,
        };

        // user save in db
        const userInfo = {
          email: res.user.email,
          displayName: data.name,
          photoURL: imageUrl,
        };
        axiosSecure.post(`/user`, userInfo).then((res) => {
          if (res.data.insertedId) {
            // console.log("user created successfully");
          }
        });

        // update profile
        updateUser(userProfile)
          .then(() => {
            navigate(`${location?.state ? location?.state : "/"}`);
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Registration successfully",
              showConfirmButton: false,
              timer: 2000,
            });
          })
          .catch((err) => {
            Swal.fire({
              position: "center",
              icon: "error",
              title: err.message,
              showConfirmButton: false,
              timer: 2000,
            });
          });
      })
      .catch((err) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: err.message,
          showConfirmButton: false,
          timer: 2000,
        });
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="min-h-screen flex py-8 md:py-12 w-10/12 mx-auto">
      {/*  Register Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
            <p className="mt-2 text-gray-600">
              Join ClubNest and build your community
            </p>
          </div>

          <form
            className="mt-8 space-y-6"
            onSubmit={handleSubmit(handleRegister)}
          >
            {/* Profile Photo Upload in imagebb */}
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className="w-28 h-28 rounded-full overflow-hidden bg-gray-100 border-4 border-dashed border-gray-300">
                  {previewUrl ? (
                    <img
                      src={previewUrl}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200">
                      <User className="w-12 h-12 text-gray-400" />
                    </div>
                  )}
                </div>

                <label
                  htmlFor="profile-pic"
                  className="absolute bottom-1 right-1 bg-main text-white rounded-full p-2.5 cursor-pointer shadow-xl hover:bg-main/90 transition"
                >
                  <Camera className="w-5 h-5" />
                </label>
              </div>

              <input
                type="file"
                id="profile-pic"
                accept="image/*"
                onChange={handleImageChange}
                required
                className="hidden"
              />
              <p className="mt-4 text-sm text-gray-500">
                Click to upload profile photo
              </p>
            </div>

            {/* Full Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <div className="mt-2 relative">
                <User className="absolute left-4 top-6 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  id="name"
                  {...register("name", { required: true })}
                  placeholder="John Doe"
                  className="pl-12 pr-4 py-3 w-full border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent"
                />
                {errors.name?.type === "required" && (
                  <p className="text-red-500">Name Required</p>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <div className="mt-2 relative">
                <Mail className="absolute left-4 top-6 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  {...register("email", { required: true })}
                  placeholder="you@example.com"
                  className="pl-12 pr-4 py-3 w-full border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent"
                />
                {errors.email?.type === "required" && (
                  <p className="text-red-500">Email Required</p>
                )}
              </div>
            </div>

            {/* Password  */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-2 relative">
                <Lock className="absolute left-4 top-6 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                      message:
                        "Password must contain at least one uppercase, one lowercase and one number",
                    },
                  })}
                  placeholder="Create a strong password"
                  className="pl-12 pr-14 py-3 w-full border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-6 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <Button className="w-full py-4 rounded-full text-lg font-semibold bg-main/90 hover:bg-main text-white transition shadow-lg">
              Sign Up
            </Button>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-gray-50 text-gray-500">OR</span>
              </div>
            </div>

            <GoogleLogin />

            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-main hover:text-main/80 transition"
              >
                Log In
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* Right Side */}
      <div className="hidden lg:block w-1/2 bg-linear-to-br from-main to-blue-600 relative overflow-hidden rounded-4xl">
        <img
          src="https://i.ibb.co.com/215F8LYG/bg-gradient.jpg"
          alt="ClubNest Community"
          className="absolute inset-0 w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-black/20" />

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-12">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight">
            ClubNest
          </h1>
          <p className="text-lg md:text-xl leading-relaxed max-w-lg">
            Your Community, Connected. Discover, manage, and grow with the
            ultimate platform for local clubs and events.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
