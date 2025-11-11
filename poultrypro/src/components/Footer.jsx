import React from "react";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Github } from "lucide-react";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200">
      {/* Main Footer Content */}
      <div className="max-w-screen-xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-10">
          
          {/* Brand Info */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div >
                <img src="poultrypro\src\assets\images\weblogo.jpg" alt="logo" className="w-10 h-10 bg-green-600 rounded-full " />
              </div>
              <h3 className="text-2xl font-bold text-green-900">
                Poultry-Pro
              </h3>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              Empowering poultry farmers with smart management tools and connecting them with buyers seamlessly.
            </p>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <MapPin size={16} className="text-green-600" />
                <span>Nairobi, Kenya</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone size={16} className="text-green-600" />
                <span>+254 111 980 660 </span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail size={16} className="text-green-600" />
                <span>info@poultrypro.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-green-900 mb-4 text-sm uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="/" className="text-gray-600 hover:text-green-600 transition text-sm">
                  Home
                </a>
              </li>
              <li>
                <a href="/features/livestock" className="text-gray-600 hover:text-green-600 transition text-sm">
                  Livestock Management
                </a>
              </li>
              <li>
                <a href="/features/accounting" className="text-gray-600 hover:text-green-600 transition text-sm">
                  Farm Accounting
                </a>
              </li>
              <li>
                <a href="/features/reports" className="text-gray-600 hover:text-green-600 transition text-sm">
                  Reports & Analytics
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-600 hover:text-green-600 transition text-sm">
                  About Us
                </a>
              </li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h4 className="font-bold text-green-900 mb-4 text-sm uppercase tracking-wider">
              Features
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="/features/tasks" className="text-gray-600 hover:text-green-600 transition text-sm">
                  Task Management
                </a>
              </li>
              <li>
                <a href="/features/weather" className="text-gray-600 hover:text-green-600 transition text-sm">
                  Climate & Weather
                </a>
              </li>
              <li>
                <a href="/features/orders" className="text-gray-600 hover:text-green-600 transition text-sm">
                  Orders & eCommerce
                </a>
              </li>
              <li>
                <a href="/pricing" className="text-gray-600 hover:text-green-600 transition text-sm">
                  Pricing
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-600 hover:text-green-600 transition text-sm">
                  Contact Support
                </a>
              </li>
            </ul>
          </div>

          {/* Social & Newsletter */}
          <div>
            <h4 className="font-bold text-green-900 mb-4 text-sm uppercase tracking-wider">
              Stay Connected
            </h4>
            <p className="text-gray-600 text-sm mb-4">
              Follow us on social media for updates and farming tips.
            </p>
            
            {/* Social Icons */}
            <div className="flex space-x-3 mb-6">
              <a 
                href="#" 
                className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center hover:bg-green-600 hover:text-white transition"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a 
                href="https://x.com/AlvinParsaloi" 
                className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center hover:bg-green-600 hover:text-white transition"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
              <a 
                href="https://www.instagram.com/alvin_sarisar/" 
                className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center hover:bg-green-600 hover:text-white transition"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a 
                href="https://linkedin.com/in/alvin-parsaloi-311b08266" 
                className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center hover:bg-green-600 hover:text-white transition"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a 
                href="https://github.com/alvinp540" 
                className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center hover:bg-green-600 hover:text-white transition"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
            </div>

            {/* Newsletter Signup */}
            <div>
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent mb-2"
              />
              <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition text-sm font-medium">
                Subscribe to Newsletter
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-200 bg-gray-50">
        <div className="max-w-screen-xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-600">
              &copy; {currentYear} Poultry-Pro Cooperative. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="/privacy" className="text-gray-600 hover:text-green-600 transition">
                Privacy Policy
              </a>
              <a href="/terms" className="text-gray-600 hover:text-green-600 transition">
                Terms of Service
              </a>
              <a href="/cookies" className="text-gray-600 hover:text-green-600 transition">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;