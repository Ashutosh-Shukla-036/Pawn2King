import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userAtom } from "../atoms/userAtom";
import { LoginAPI } from "../api_calls/LoginAPI";
import {
  Alert,
  Snackbar,
  Box,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Email, Lock, Visibility, VisibilityOff } from "@mui/icons-material";
import Logo from "../assets/LogoChess.png";

const Login: React.FC = () => {
  // State management
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // Recoil and navigation hooks
  const setUser = useSetRecoilState(userAtom);
  const navigate = useNavigate();

  // Handlers
  const handleSnackbarClose = () => setSnackbarOpen(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  // Submit login form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const userData = await LoginAPI(email, password);
      setUser(userData);
      localStorage.setItem("token", userData.token);
      setSnackbarOpen(true);

      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (err: any) {
      console.error("Login error:", err);
      setError(
        err.response?.data?.message ||
          "Invalid email or password. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-teal-900 to-gray-900 p-6 rounded-xl shadow-lg max-w-md w-full text-white">
        {/* Logo and Branding */}
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
        <Typography variant="h6" className="text-yellow-400 mb-4">
          Welcome back! Ready to play some chess?
        </Typography>

        <br />

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          {/* Email Field */}
          <Box className="mb-4">
            <TextField
              label="Email"
              type="email"
              fullWidth
              required
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email className="text-white" />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiInputBase-root": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  color: "white",
                },
                "& .MuiInputLabel-root": { color: "white" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "gray" },
                  "&:hover fieldset": { borderColor: "white" },
                  "&.Mui-focused fieldset": { borderColor: "white" },
                },
                "& input::placeholder": { color: "white" },
              }}
            />
          </Box>

          {/* Password Field */}
          <Box className="mb-4">
            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              fullWidth
              required
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock className="text-white" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={togglePasswordVisibility}
                      edge="end"
                      className="text-white"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiInputBase-root": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  color: "white",
                },
                "& .MuiInputLabel-root": { color: "white" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "gray" },
                  "&:hover fieldset": { borderColor: "white" },
                  "&.Mui-focused fieldset": { borderColor: "white" },
                },
                "& input::placeholder": { color: "white" },
              }}
            />
          </Box>

          {/* Forgot Password */}
          <Typography
            variant="body2"
            className="text-indigo-400 cursor-pointer hover:underline text-right"
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

        {/* Snackbar */}
        <Snackbar
          open={snackbarOpen}
          onClose={handleSnackbarClose}
          message="Login successful!"
          autoHideDuration={3000}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          ContentProps={{
            role: "alert",
          }}
        />
      </div>
    </div>
  );
};

export default Login;
