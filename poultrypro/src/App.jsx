import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { FarmContext } from "./context/FarmContext";

// Import all management components
import TaskManagement from "./components/TaskManagement";


// Pages
import Home from "./pages/Home";
import TermsAndConditions from "./pages/TermsAndConditions";

// Future auth pages (commented out)
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import FarmerDashboard from "./components/FarmerDashboard";
// import SellerDashboard from "./components/SellerDashboard";

function App() {
  const { role } = useContext(FarmContext);

  // Private Route wrapper component
  const PrivateRoute = ({ children, allowedRole }) => {
    if (!role) return <Navigate to="/login" replace />;
    if (allowedRole && role !== allowedRole) return <Navigate to="/" replace />;
    return children;
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-grow">
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/terms" element={<TermsAndConditions />} />

            {/* Management Feature Routes - These can be public or made private later */}
            <Route path="/task-management" element={<TaskManagement />} />
            

            {/* Future Auth Routes - Uncomment when ready */}
            {/* <Route path="/login" element={<Login />} /> */}
            {/* <Route path="/register" element={<Register />} /> */}

            {/* Private Routes (for later use with authentication) */}
            {/* 
            <Route
              path="/farmer-dashboard"
              element={
                <PrivateRoute allowedRole="farmer">
                  <FarmerDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/seller-dashboard"
              element={
                <PrivateRoute allowedRole="seller">
                  <SellerDashboard />
                </PrivateRoute>
              }
            />
            */}

            {/* Alternative: Make management routes private when authentication is ready */}
            {/*
            <Route
              path="/task-management"
              element={
                <PrivateRoute>
                  <TaskManagement />
                </PrivateRoute>
              }
            />
            <Route
              path="/livestock-management"
              element={
                <PrivateRoute>
                  <LivestockManagement />
                </PrivateRoute>
              }
            />
            <Route
              path="/accounting"
              element={
                <PrivateRoute>
                  <FarmAccounting />
                </PrivateRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <PrivateRoute>
                  <ECommerce />
                </PrivateRoute>
              }
            />
            <Route
              path="/analytics"
              element={
                <PrivateRoute>
                  <Analytics />
                </PrivateRoute>
              }
            />
            <Route
              path="/weather"
              element={
                <PrivateRoute>
                  <Weather />
                </PrivateRoute>
              }
            />
            */}

            {/* Catch-all route - redirect to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;