import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { FaTasks, FaShoppingCart, FaChartBar, FaMoneyBillWave } from "react-icons/fa";
import { MdOutlineWbSunny } from "react-icons/md";
import { GiChicken } from "react-icons/gi";

function Navbar() {
  const [role, setRole] = useState("farmer"); 
  const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    setRole(null);
    navigate("/");
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
    { name: "Task & Work Management", path: "/task-management", icon: <FaTasks /> },
    { name: "Livestock Management", path: "/livestock-management", icon: <GiChicken /> },
    { name: "Farm Accounting", path: "/accounting", icon: <FaMoneyBillWave /> },
    { name: "Climate & Weather", path: "/weather", icon: <MdOutlineWbSunny /> },
    { name: "Orders & eCommerce", path: "/orders", icon: <FaShoppingCart /> },
    { name: "Reports & Analytics", path: "/analytics", icon: <FaChartBar /> },
  ];

  return (
    <nav className="bg-gray-400 bg-opacity-80 shadow-md backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between p-4">
        
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center space-x-2 text-white hover:text-green-300 transition"
        >
          <img 
            src="/src/assets/images/logo.jpg" 
            alt="Poultry-Pro Logo"  
            className="w-15 h-15 rounded-full object-cover"
          />
          <span className="text-2xl font-semibold">Poultry-Pro</span>
        </Link>

        {/* Navigation Links */}
        <ul className="flex space-x-6 text-white font-medium items-center">
          <li>
            <Link 
              to="/" 
              className="hover:text-green-300 transition"
            >
              Home
            </Link>
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
                  <Link
                    key={index}
                    to={feature.path}
                    onClick={() => setIsFeaturesOpen(false)}
                    className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-purple-50 transition text-gray-800 border-b border-gray-100 last:border-b-0"
                  >
                    <span className="text-xl text-green-600">{feature.icon}</span>
                    <span className="text-sm font-medium text-left">{feature.name}</span>
                  </Link>
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
                className="px-3 text-gray-900 py-2 bg-white border border-green-800 rounded-md text-sm font-medium hover:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              >
                <option value="farmer" className="text-green-900"> Farmer</option>
                <option value="seller" className="text-purple-900"> Seller</option>
              </select>
            </li>
          )}

          {/* Dashboard Links based on role */}
          {role === "farmer" && (
            <li>
              <Link 
                to="/farmer-dashboard" 
                className="hover:text-green-300 transition"
              >
                Dashboard
              </Link>
            </li>
          )}

          {role === "seller" && (
            <li>
              <Link 
                to="/seller-dashboard" 
                className="hover:text-green-300 transition"
              >
                Dashboard
              </Link>
            </li>
          )}

          {/* Auth Links - Only show when not logged in */}
          {!role && (
            <>
              <li>
                <Link 
                  to="/login" 
                  className="hover:text-green-300 transition"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link 
                  to="/register" 
                  className="bg-green-400 text-purple-900 font-semibold px-4 py-2 rounded-md hover:bg-green-300 transition"
                >
                  Register
                </Link>
              </li>
            </>
          )}

          {/* Logout Button - Only show when logged in */}
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
  );
}

export default Navbar;