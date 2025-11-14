import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase";
import { FarmContext } from "./context/FarmContext";

// Layout Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Management Components
import TaskManagement from "./components/TaskManagement";
import LivestockManagement from "./components/LivestockManagement";
import FarmAccounting from "./components/FarmAccounting";

// Page Components
import Home from "./pages/Home";
import TermsAndConditions from "./pages/TermsAndConditions";
import Login from "./pages/Login";
import Register from "./pages/Register";

// ProtectedRoute: small wrapper used for routes that require authentication.
// Inputs:
// - children: React nodes to render if checks pass
// - isAuthenticated: boolean (true when Firebase reports a signed-in user)
// - isLoading: boolean (true while auth state is being determined)
// - allowedRole: optional string to enforce role-based access (e.g. 'farmer')
// - userRole: current user's role (from context or Firestore)
// Behavior:
// - While auth is loading, show a spinner to avoid flashes.
// - If not authenticated, redirect to the public home page.
// - If allowedRole is provided and the user's role doesn't match, redirect to home.
// - Otherwise render the protected children.
const ProtectedRoute = ({ children, isAuthenticated, isLoading, allowedRole, userRole }) => {
  // Still waiting for Firebase to tell us the auth state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // If no user is signed in, send them to the public landing page (could be /login)
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // If a role is required for this route, enforce it here
  if (allowedRole && userRole !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  // All checks passed: render the protected UI
  return children;
};

function App() {
  const { role } = useContext(FarmContext);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);

  // Subscribe to Firebase auth state changes and update local state accordingly.
  // This keeps `currentUser` in sync with Firebase and controls `isLoading` to
  // prevent UI flicker while Firebase initializes.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // When Firebase reports a user object, we know the session is active
      setCurrentUser(user);

      if (user) {
        // If a user is present, populate a role. In this demo the role is
        // taken from `FarmContext` (local app state). In a production app you
        // would typically fetch the role from Firestore using the user's uid.
        setUserRole(role || "farmer");
      } else {
        // No user means signed out
        setUserRole(null);
      }

      // Once Firebase has responded, clear the loading flag so UI can render
      setIsLoading(false);
    });

    // Cleanup the listener when component unmounts
    return () => unsubscribe();
  }, [role]);

  const isAuthenticated = !!currentUser;

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-grow">
          <Routes>
            {/* ========== PUBLIC ROUTES ========== */}
            <Route path="/" element={<Home />} />
            <Route path="/terms" element={<TermsAndConditions />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* ========== PROTECTED ROUTES (Require Authentication) ========== */}
            {/* Task Management - Protected */}
            <Route
              path="/task-management"
              element={
                <ProtectedRoute
                  isAuthenticated={isAuthenticated}
                  isLoading={isLoading}
                  allowedRole={null}
                  userRole={userRole}
                >
                  <TaskManagement />
                </ProtectedRoute>
              }
            />

            {/* Livestock Management - Protected */}
            <Route
              path="/livestock-management"
              element={
                <ProtectedRoute
                  isAuthenticated={isAuthenticated}
                  isLoading={isLoading}
                  allowedRole={null}
                  userRole={userRole}
                >
                  <LivestockManagement />
                </ProtectedRoute>
              }
            />

            {/* Accounting - Protected */}
            <Route
              path="/accounting"
              element={
                <ProtectedRoute
                  isAuthenticated={isAuthenticated}
                  isLoading={isLoading}
                  allowedRole={null}
                  userRole={userRole}
                >
                  <FarmAccounting />
                </ProtectedRoute>
              }
            />

            {/* ========== FUTURE: ROLE-BASED PROTECTED ROUTES ========== */}
            {/* Example: Farmer-only dashboard */}
            {/* 
            <Route
              path="/farmer-dashboard"
              element={
                <ProtectedRoute
                  isAuthenticated={isAuthenticated}
                  isLoading={isLoading}
                  allowedRole="farmer"
                  userRole={userRole}
                >
                  <FarmerDashboard />
                </ProtectedRoute>
              }
            />
            */}

            {/* Example: Seller-only dashboard */}
            {/*
            <Route
              path="/seller-dashboard"
              element={
                <ProtectedRoute
                  isAuthenticated={isAuthenticated}
                  isLoading={isLoading}
                  allowedRole="seller"
                  userRole={userRole}
                >
                  <SellerDashboard />
                </ProtectedRoute>
              }
            />
            */}

            {/* ========== CATCH-ALL: Redirect unknown routes to home ========== */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;