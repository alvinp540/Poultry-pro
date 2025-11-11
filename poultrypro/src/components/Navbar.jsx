import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { FaTasks, FaShoppingCart, FaChartBar, FaMoneyBillWave } from "react-icons/fa";
import { MdOutlineWbSunny } from "react-icons/md";
import { GiChicken } from "react-icons/gi";

function Navbar() {
  const [role, setRole] = useState("farmer"); // Can be: null, "farmer", or "seller"
  const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    setRole(null);
  };

  const handleNavigation = (path) => {
    console.log("Navigating to:", path);
    // In your actual app, this would use navigate(path)
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsFeaturesOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

 const features = [
  { name: "Task & Work Management", path: "/features/tasks", icon: <FaTasks /> },
  { name: "Livestock Management", path: "/features/livestock", icon: <GiChicken /> },
  { name: "Farm Accounting", path: "/features/accounting", icon: <FaMoneyBillWave /> },
  { name: "Climate & Weather", path: "/features/weather", icon: <MdOutlineWbSunny /> },
  { name: "Orders & eCommerce", path: "/features/orders", icon: <FaShoppingCart /> },
  { name: "Reports & Analytics", path: "/features/reports", icon: <FaChartBar /> },
];
  return (
    <div className=" ">
      <nav className="bg-gray-400 bg-opacity-80 shadow-md backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-screen-xl mx-auto flex items-center justify-between p-4">
          
          {/* Logo */}
          <button
            onClick={() => handleNavigation("/")}
            className="flex items-center space-x-2 text-white hover:text-green-300 transition"
          >
           <img src="poultrypro\src\assets\images\WhatsApp Image 2025-10-29 at 10.04.07.jpeg" alt=""  className="w-10 h-10 rounded-full flex items-center justify-center text-2xl"/>
            
            <span className="text-2xl font-semibold">Poultry-Pro</span>
          </button>

          {/* Navigation Links */}
          <ul className="flex space-x-6 text-white font-medium items-center">
            <li>
              <button 
                onClick={() => handleNavigation("/")} 
                className="hover:text-green-300 transition"
              >
                Home
              </button>
            </li>

            {/* Features Dropdown */}
            <li className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsFeaturesOpen(!isFeaturesOpen)}
                className="flex items-center space-x-1 hover:text-green-300 transition"
              >
                <span>Features</span>
                <ChevronDown 
                  size={16} 
                  className={`transform transition-transform ${isFeaturesOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {/* Dropdown Menu */}
              {isFeaturesOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl overflow-hidden">
                  {features.map((feature, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        handleNavigation(feature.path);
                        setIsFeaturesOpen(false);
                      }}
                      className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-purple-50 transition text-gray-800 border-b border-gray-100 last:border-b-0"
                    >
                      <span className="text-xl">{feature.icon}</span>
                      <span className="text-sm font-medium text-left">{feature.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </li>

            {/* Role Selector - Only show when logged in */}
            {role && (
              <li>
                <select 
                  value={role} 
                  onChange={(e) => setRole(e.target.value)}
                  className="px-3  text-gray-900 py-2 bg-white  border border-green-800 rounded-md text-sm font-medium hover:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                >
                  <option value="farmer" className="text-green-900"> Farmer</option>
                  <option value="seller" className="text-purple-900"> Seller</option>
                </select>
              </li>
            )}

            {role === "farmer" && (
              <li>
                <button 
                  onClick={() => handleNavigation("/farmer")} 
                  className="hover:text-green-300 transition"
                >
                  Dashboard
                </button>
              </li>
            )}

            {role === "seller" && (
              <li>
                <button 
                  onClick={() => handleNavigation("/seller")} 
                  className="hover:text-green-300 transition"
                >
                  Dashboard
                </button>
              </li>
            )}

            {!role && (
              <>
                <li>
                  <button 
                    onClick={() => handleNavigation("/login")} 
                    className="hover:text-green-300 transition"
                  >
                    Login
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleNavigation("/register")} 
                    className="bg-green-400 text-purple-900 font-semibold px-4 py-2 rounded-md hover:bg-green-300 transition"
                  >
                    Register
                  </button>
                </li>
              </>
            )}

            {role && (
              <li>
                <button
                  onClick={handleLogout}
                  className="bg-green-400 text-purple-900 font-semibold px-4 py-2 rounded-md hover:bg-green-300 transition"
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </nav>

      
    </div>
  );
}

export default Navbar;