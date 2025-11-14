import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, LogIn } from "lucide-react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { FarmContext } from "../context/FarmContext";

export default function Login() {
  const navigate = useNavigate();
  const { setRole } = useContext(FarmContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setSelectedRole] = useState("farmer");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Sign in with Firebase
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Set the role in context (in a real app, fetch from Firestore)
      setRole(role);

      // Redirect to home/dashboard
      navigate("/");
    } catch (err) {
      console.error("Login error:", err);
      if (err.code === "auth/user-not-found") {
        setError("Email not found. Please register first.");
      } else if (err.code === "auth/wrong-password") {
        setError("Incorrect password. Please try again.");
      } else if (err.code === "auth/invalid-email") {
        setError("Invalid email address.");
      } else {
        setError(err.message || "Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-red-50 to-yellow-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-lg shadow-xl p-8 border-2 border-red-600">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-red-700 mb-2">Welcome Back</h1>
            <p className="text-red-600">Sign in to access your farm management features</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-4 bg-red-100 border-l-4 border-red-600 text-red-700 rounded">
              <p className="font-semibold">Error</p>
              <p className="text-sm">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-red-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-red-600" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="w-full pl-10 pr-4 py-2 border-2 border-red-300 rounded-lg focus:outline-none focus:border-red-600 transition"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-red-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-red-600" size={20} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-4 py-2 border-2 border-red-300 rounded-lg focus:outline-none focus:border-red-600 transition"
                />
              </div>
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-sm font-semibold text-red-700 mb-2">
                Select Role
              </label>
              <select
                value={role}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="w-full px-4 py-2 border-2 border-red-300 rounded-lg focus:outline-none focus:border-red-600 transition text-red-700 font-semibold"
              >
                <option value="farmer">Farmer</option>
                <option value="seller">Seller</option>
                <option value="employee">Employee</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition font-bold flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <LogIn size={20} />
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-grow border-t-2 border-red-300"></div>
            <span className="px-3 text-gray-500 text-sm">New to Poultry-Pro?</span>
            <div className="flex-grow border-t-2 border-red-300"></div>
          </div>

          {/* Register Link */}
          <Link
            to="/register"
            className="block w-full bg-yellow-400 text-red-700 py-3 rounded-lg hover:bg-yellow-300 transition font-bold text-center shadow-md"
          >
            Create Account
          </Link>

          {/* Back to Home */}
          <Link
            to="/"
            className="block text-center text-red-600 hover:text-red-700 transition font-semibold mt-4"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
