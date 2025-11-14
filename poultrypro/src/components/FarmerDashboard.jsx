import React, { useContext } from "react";
import { FarmContext } from "../context/FarmContext";

function FarmerDashboard() {
  const { batches, feeds, vaccinations, sales, expenses } = useContext(FarmContext);

  return (
    <div className="p-6 bg-yellow-50 min-h-screen">
      <h1 className="text-3xl font-bold text-red-700 mb-4">Farmer Dashboard</h1>
      <p className="text-red-600 mb-6 font-semibold">
        Track your poultry batches, feeds, and performance below.
      </p>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white shadow-md p-4 rounded-lg border-l-4 border-red-600">
          <h3 className="font-bold text-lg text-red-700">Total Batches</h3>
          <p className="text-2xl mt-2 text-red-600">{batches.length}</p>
        </div>
        <div className="bg-white shadow-md p-4 rounded-lg border-l-4 border-yellow-500">
          <h3 className="font-bold text-lg text-red-700">Feeds Logged</h3>
          <p className="text-2xl mt-2 text-red-600">{feeds.length}</p>
        </div>
        <div className="bg-white shadow-md p-4 rounded-lg border-l-4 border-red-500">
          <h3 className="font-bold text-lg text-red-700">Vaccinations</h3>
          <p className="text-2xl mt-2 text-red-600">{vaccinations.length}</p>
        </div>
      </div>
    </div>
  );
}

export default FarmerDashboard;
