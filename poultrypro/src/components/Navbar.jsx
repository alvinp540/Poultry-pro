import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDown, User, LogOut } from "lucide-react";
import { FaTasks, FaShoppingCart, FaChartBar, FaMoneyBillWave } from "react-icons/fa";
import { MdOutlineWbSunny } from "react-icons/md";
import { GiChicken } from "react-icons/gi";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";

function Navbar() {
  // (Role is handled by global context elsewhere; no local role state needed
  // here.)

  // Dropdown UI state
  const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Auth state (driven by Firebase). `currentUser` will be the Firebase user
  // object when signed in, or null otherwise. `isLoading` prevents UI flicker
  // while Firebase initializes.
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Refs used to close dropdowns when clicking outside
  const dropdownRef = useRef(null);
  const profileRef = useRef(null);
  const navigate = useNavigate();

  // Subscribe to Firebase auth state changes. This keeps the Navbar in sync
  // with the authentication state: when a user signs in or out we update
  // `currentUser` which controls whether to show Login/Register or the
  // profile dropdown.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setIsLoading(false);
    });

    // Cleanup the listener on unmount
    return () => unsubscribe();
  }, []);

  // Logout handler: sign out via Firebase, clear UI state and redirect home.
  const handleLogout = async () => {
    try {
  await signOut(auth);
  // Clear local UI state (the auth listener also clears currentUser)
  setCurrentUser(null);
  setIsProfileOpen(false);
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
      alert("Failed to logout. Please try again.");
    }
  };

  // Close dropdowns when clicking outside their bounds. We attach a single
  // document-level listener and check the refs to determine whether the
  // click happened outside the open dropdowns.
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsFeaturesOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Features shown in the dropdown. Only include routes that are wired in
  // App.jsx; these are protected pages that require authentication to use.
  const features = [
    { name: "Task & Work Management", path: "/task-management", icon: <FaTasks /> },
    { name: "Livestock Management", path: "/livestock-management", icon: <GiChicken /> },
    { name: "Farm Accounting", path: "/accounting", icon: <FaMoneyBillWave /> },
  ];

  return (
    <nav className="bg-red-600 bg-opacity-95 shadow-md backdrop-blur-md sticky top-0 z-50 border-b-4 border-yellow-400">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between p-4">
        
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center space-x-2 text-white hover:text-yellow-300 transition"
        >
          <img 
            src="/src/assets/images/weblogo.jpg" 
            alt="Poultry-Pro Logo"  
            className="w-20 h-20 rounded-full object-cover"
          />
          <span className="text-2xl font-semibold">Poultry-Pro</span>
        </Link>

        {/* Navigation Links */}
        <ul className="flex space-x-6 text-white font-medium items-center">
          <li>
            <Link 
              to="/" 
              className="hover:text-yellow-300 transition"
            >
              Home
            </Link>
          </li>

          {/* Features Dropdown */}
          <li className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsFeaturesOpen(!isFeaturesOpen)}
              className="flex items-center space-x-1 hover:text-yellow-300 transition"
            >
              <span>Features</span>
              <ChevronDown 
                size={16} 
                className={`transform transition-transform ${isFeaturesOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {/* Dropdown Menu */}
            {isFeaturesOpen && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-yellow-50 rounded-lg shadow-xl overflow-hidden border-2 border-red-500">
                {features.map((feature, index) => (
                  <Link
                    key={index}
                    to={feature.path}
                    onClick={() => setIsFeaturesOpen(false)}
                    className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-yellow-100 transition text-red-700 border-b border-yellow-200 last:border-b-0 font-semibold"
                  >
                    <span className="text-xl text-red-600">{feature.icon}</span>
                    <span className="text-sm font-medium text-left">{feature.name}</span>
                  </Link>
                ))}
              </div>
            )}
          </li>

          {/* Auth Links - Only show when not logged in */}
          {!currentUser && !isLoading && (
            <>
              <li>
                <Link 
                  to="/login" 
                  className="hover:text-yellow-300 transition"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link 
                  to="/register" 
                  className="bg-yellow-400 text-red-700 font-bold px-4 py-2 rounded-md hover:bg-yellow-300 transition shadow-md"
                >
                  Register
                </Link>
              </li>
            </>
          )}

          {/* Profile Icon & Dropdown - Only show when logged in */}
          {currentUser && !isLoading && (
            <li className="relative" ref={profileRef}>
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center justify-center w-10 h-10 bg-yellow-400 text-red-700 rounded-full hover:bg-yellow-300 transition shadow-md font-bold text-lg"
                title={currentUser.email}
              >
                <User size={20} />
              </button>

              {/* Profile Dropdown Menu */}
              {isProfileOpen && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-yellow-50 rounded-lg shadow-xl overflow-hidden border-2 border-red-500 z-50">
                  {/* User Info */}
                  <div className="px-4 py-3 border-b border-yellow-200 bg-white">
                    <p className="text-xs text-gray-600">Logged in as</p>
                    <p className="text-sm font-bold text-red-700 truncate">
                      {currentUser.email}
                    </p>
                  </div>

                  {/* Profile Menu Items */}
                  <Link
                    to="/"
                    onClick={() => setIsProfileOpen(false)}
                    className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-yellow-100 transition text-red-700 border-b border-yellow-200 font-semibold"
                  >
                    <User size={18} />
                    <span>Profile Settings</span>
                  </Link>

                  {/* Logout Button */}
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-red-100 transition text-red-700 font-semibold"
                  >
                    <LogOut size={18} />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </li>
          )}

          {/* Loading indicator */}
          {isLoading && (
            <li>
              <div className="animate-spin h-5 w-5 border-2 border-yellow-400 border-t-transparent rounded-full"></div>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;