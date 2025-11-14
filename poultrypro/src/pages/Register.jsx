import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, User as UserIcon, LogIn } from "lucide-react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import { FarmContext } from "../context/FarmContext";

export default function Register() {
  const navigate = useNavigate();
  const { setRole } = useContext(FarmContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setSelectedRole] = useState("farmer");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validate passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Validate password length
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);

    try {
      // Create user with Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save user info to Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: email,
        name: name || email.split("@")[0],
        role: role,
        createdAt: new Date().toISOString(),
      });

      // Set role in context
      setRole(role);

      // Show success message
      setSuccess("Registration successful! Redirecting to login...");

      // Redirect to login after a short delay
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      console.error("Register error:", err);
      if (err.code === "auth/email-already-in-use") {
        setError("Email is already registered. Please use a different email or login.");
      } else if (err.code === "auth/invalid-email") {
        setError("Invalid email address.");
      } else if (err.code === "auth/weak-password") {
        setError("Password is too weak. Please use a stronger password.");
      } else {
        setError(err.message || "Registration failed. Please try again.");
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
            <h1 className="text-3xl font-bold text-red-700 mb-2">Create Account</h1>
            <p className="text-red-600">Join Poultry-Pro and start managing your farm</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-4 bg-red-100 border-l-4 border-red-600 text-red-700 rounded">
              <p className="font-semibold">Error</p>
              <p className="text-sm">{error}</p>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="mb-4 p-4 bg-green-100 border-l-4 border-green-600 text-green-700 rounded">
              <p className="font-semibold">Success!</p>
              <p className="text-sm">{success}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleRegister} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-red-700 mb-2">
                Full Name (Optional)
              </label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-3 text-red-600" size={20} />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="alvin sarisar"
                  className="w-full pl-10 pr-4 py-2 border-2 border-red-300 rounded-lg focus:outline-none focus:border-red-600 transition"
                />
              </div>
            </div>

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

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-semibold text-red-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-red-600" size={20} />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-grow border-t-2 border-red-300"></div>
            <span className="px-3 text-gray-500 text-sm">Already have an account?</span>
            <div className="flex-grow border-t-2 border-red-300"></div>
          </div>

          {/* Login Link */}
          <Link
            to="/login"
            className="block w-full bg-yellow-400 text-red-700 py-3 rounded-lg hover:bg-yellow-300 transition font-bold text-center shadow-md"
          >
            Sign In
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
