import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import Button from "../../components/Button";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import GoogleLogin from "../../components/GoogleLogin";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../provider/authProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const Login = () => {
  const { signInUser, setLoading } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate()
  const location = useLocation()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const axiosSecure = useAxiosSecure();

  const handleLogin = (data) => {
    signInUser(data.email, data.password)
      .then((res) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Loged In successfully",
          showConfirmButton: false,
          timer: 2000,
        });
        navigate(`${location?.state ? location?.state : "/"}`)
        const userInfo = {
          email: res.user.email,
          displayName: res.user.displayName,
          photoURL: res.user.photoURL,
        };

        // user save in db
        axiosSecure.post(`/user`, userInfo).then((res) => {
          if (res.data.insertedId) {
            // console.log("user created successfully");
          }
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
      {/* Left Side*/}
      <div className="hidden lg:block w-1/2 bg-linear-to-br from-main to-blue-600 relative overflow-hidden rounded-4xl">
        <img
          src="https://i.ibb.co.com/215F8LYG/bg-gradient.jpg"
          alt="ClubSphere Community"
          className="absolute inset-0 w-full h-full object-cover opacity-90"
        />

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Club Nest</h1>
          <p className="text-lg md:text-xl leading-relaxed max-w-md">
            Your Community, Connected. Discover, manage, and grow with the
            ultimate platform for local clubs and events.
          </p>
        </div>
      </div>

      {/* Right Side  */}
      <div className="w-full lg:w-1/2 flex items-center justify-center  px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
            <p className="mt-2 text-gray-600">
              Log in to manage your clubs and events.
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit(handleLogin)}>
            <div className="space-y-5">
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
                  {errors?.email?.type === "required" && (
                    <p className="text-red-500 text-sm">Email Required</p>
                  )}
                </div>
              </div>

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
                    {...register("password", { required: true })}
                    placeholder="Your Password"
                    className="pl-12 pr-14 py-3 w-full border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent"
                  />
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
                  {errors?.password?.type === "required" && (
                    <p className="text-red-500 text-sm">Password Required</p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="h-4 w-4 text-main rounded" />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <p className="text-sm text-main/85 hover:text-main">
                Forgot Password?
              </p>
            </div>

            <Button className="w-full py-4 rounded-full text-lg font-semibold bg-main/85 hover:bg-main text-white">
              Log In
            </Button>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4  text-gray-500">OR</span>
              </div>
            </div>

            <GoogleLogin />

            <p className="text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-semibold text-main/95 hover:text-main"
              >
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
