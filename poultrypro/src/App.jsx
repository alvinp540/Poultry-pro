import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { FarmContext } from "./context/FarmContext";
import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import FarmerDashboard from "./components/FarmerDashboard";
// import SellerDashboard from "./components/SellerDashboard";


function App() {
  const { role } = useContext(FarmContext);

  // Private route wrapper
  // const PrivateRoute = ({ children, allowedRole }) => {
  //   if (!role) {
  //     return <Navigate to="/login" replace />;
  //   }
  //   if (allowedRole && role !== allowedRole) {
  //     return <Navigate to="/" replace />;
  //   }
  //   return children;
  // };

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />

        <Home/>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
