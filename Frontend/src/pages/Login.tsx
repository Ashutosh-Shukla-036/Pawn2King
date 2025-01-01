import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userAtom } from "../atoms/userAtom";
import { LoginAPI } from "../api_calls/LoginAPI";
import {
  Alert,
  Snackbar,
  Box,
  Typography,
} from "@mui/material";
import { HiOutlineMail, HiOutlineLockClosed } from "react-icons/hi";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Logo from "../assets/LogoChess.png";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const setUser = useSetRecoilState(userAtom);
  const navigate = useNavigate();

  const handleSnackbarClose = () => setSnackbarOpen(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await LoginAPI(email, password);
      const { user, token } = response;

      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);

      setSnackbarOpen(true);
      navigate("/dashboard");
    } catch (err: any) {
      setError(
        err.response?.data?.message || err.message || "Invalid email or password. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-teal-900 to-gray-900 p-6 rounded-xl shadow-lg max-w-md w-full text-white relative">
        {/* Glow Effects */}
        <div className="absolute -top-4 -left-4 w-32 h-32 bg-orange-500 blur-3xl opacity-30"></div>
        <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-teal-500 blur-3xl opacity-30"></div>

        {/* Logo */}
        <div className="flex flex-col items-center mb-6">
          <img
            src={Logo}
            alt="Pawn2King Logo"
            className="w-16 h-16 mb-2 transition-transform duration-700 hover:rotate-360"
          />
          <Typography variant="h5" className="font-bold">
            Pawn2King
          </Typography>
          <Typography variant="body2" className="text-gray-400">
            Secure Login to Your Chess Portal
          </Typography>
        </div>

        {/* Welcome Message */}
        <Typography variant="h6" className="text-yellow-400 mb-4 text-center">
          Welcome back! Ready to play some chess?
        </Typography>

        <form onSubmit={handleSubmit}>
          <Box
            className="p-4 rounded-lg shadow-lg bg-white/10 border border-gray-600"
            component="div"
          >
            {/* Email Field */}
            <div className="mb-4 relative">
              <label className="block text-white font-medium mb-2">
                Email <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <HiOutlineMail className="text-white/80 h-6 w-6" />
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 pl-12 border border-orange-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white/80 shadow-md dark:bg-gray-900 dark:border-gray-700 dark:focus:ring-orange-600 dark:text-white hover:shadow-orange-500/50"
                  placeholder="Enter your email"
                  required
                  aria-label="Email"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="relative">
              <label className="block text-white font-medium mb-2">
                Password <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <HiOutlineLockClosed className="text-white/80 h-6 w-6" />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 pl-12 border border-orange-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white/80 shadow-md dark:bg-gray-900 dark:border-gray-700 dark:focus:ring-orange-600 dark:text-white hover:shadow-orange-500/50"
                  placeholder="Enter your password"
                  required
                  aria-label="Password"
                />
                <span
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                  role="button"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    <AiFillEye className="text-white/80 h-6 w-6" />
                  ) : (
                    <AiFillEyeInvisible className="text-white/80 h-6 w-6" />
                  )}
                </span>
              </div>
            </div>
          </Box>

          <br />
          {/* Forgot Password */}
          <Typography
            variant="body2"
            className="text-indigo-400 cursor-pointer hover:underline text-right mt-2"
            onClick={() => navigate("/forgot-password")}
          >
            Forgot Password?
          </Typography>

          {/* Error Message */}
          {error && (
            <Alert severity="error" className="mt-4 mb-4">
              {error}
            </Alert>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-2 mt-6 font-bold text-white bg-yellow-400 rounded-lg transition-all duration-300 hover:bg-yellow-500 ${
              isLoading ? "cursor-not-allowed opacity-70" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="w-5 h-5 text-white animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
                Signing In...
              </span>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <br />
        {/* Register Redirect */}
        <Typography
          variant="body2"
          className="text-gray-400 text-center cursor-pointer hover:underline hover:text-blue-500 mt-4"
          onClick={() => navigate("/register")}
        >
          Not registered? Click here to register.
        </Typography>

        {/* Inspirational Quote */}
        <Box className="mt-8 text-center">
          <Typography variant="body2" className="text-gray-500 italic">
            "Chess is the gymnasium of the mind." - Blaise Pascal
          </Typography>
        </Box>

        {/* Snackbar for success */}
        <Snackbar
          open={snackbarOpen}
          onClose={handleSnackbarClose}
          message="Login successful!"
          autoHideDuration={3000}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        />
      </div>
    </div>
  );
};

export default Login;
