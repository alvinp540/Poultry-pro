import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { FarmContext } from "./context/FarmContext";

// Pages
import Home from "./pages/Home";

import TermsAndConditions from "./pages/TermsAndConditions";

// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import FarmerDashboard from "./components/FarmerDashboard";
// import SellerDashboard from "./components/SellerDashboard";

function App() {
  const { role } = useContext(FarmContext);

  // Example Private Route logic (optional for dashboards)
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
        

            {/* Future Auth Routes */}
            {/* <Route path="/login" element={<Login />} /> */}
            {/* <Route path="/register" element={<Register />} /> */}

            {/* Private Routes (for later use) */}
            {/* <Route
              path="/farmer-dashboard"
              element={
                <PrivateRoute allowedRole="farmer">
                  <FarmerDashboard />
                </PrivateRoute>
              }
            /> */}
            {/* <Route
              path="/seller-dashboard"
              element={
                <PrivateRoute allowedRole="seller">
                  <SellerDashboard />
                </PrivateRoute>
              }
            /> */}

            {/* Catch-all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
