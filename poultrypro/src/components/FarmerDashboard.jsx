import React, { useContext } from "react";
import { FarmContext } from "../context/FarmContext";

function FarmerDashboard() {
  const { batches, feeds, vaccinations, sales, expenses } = useContext(FarmContext);

  return (
    <div className="p-6 bg-purple-50 min-h-screen">
      <h1 className="text-3xl font-bold text-purple-900 mb-4">Farmer Dashboard</h1>
      <p className="text-gray-700 mb-6">
        Track your poultry batches, feeds, and performance below.
      </p>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white shadow-md p-4 rounded-lg">
          <h3 className="font-bold text-lg text-purple-800">Total Batches</h3>
          <p className="text-2xl mt-2">{batches.length}</p>
        </div>
        <div className="bg-white shadow-md p-4 rounded-lg">
          <h3 className="font-bold text-lg text-purple-800">Feeds Logged</h3>
          <p className="text-2xl mt-2">{feeds.length}</p>
        </div>
        <div className="bg-white shadow-md p-4 rounded-lg">
          <h3 className="font-bold text-lg text-purple-800">Vaccinations</h3>
          <p className="text-2xl mt-2">{vaccinations.length}</p>
        </div>
      </div>
    </div>
  );
}

export default FarmerDashboard;
