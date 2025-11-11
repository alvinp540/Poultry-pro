import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../slices/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("employee");
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(registerUser(email, password, role));
  };
  // Watch for registration success or error
  useEffect(() => {
    if (user) {
      toast.success("Registration successful! Redirecting to login...");
      const timer = setTimeout(() => {
        navigate("/login");
      }, 2000);
      return () => clearTimeout(timer);
    }
    if (error) {
      toast.error(error || "Registration failed. Please try again.");
    }
  }, [user, error, navigate]);
  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded bg-white shadow-md">
      <h2 className="text-xl font-bold mb-4 text-center">Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          className="block w-full mb-3 p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="block w-full mb-3 p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <select
          className="block w-full mb-3 p-2 border rounded"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="employee">Employee</option>
          <option value="employer">Employer</option>
        </select>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
      {error && <p className="text-red-500 mt-3 text-center">{error}</p>}
      <p className="mt-4 text-center text-gray-600">
        Already have an account?{" "}
        <span
          className="text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
          onClick={() => navigate("/login")}
        >
          Login here
        </span>
      </p>
    </div>
  );
}