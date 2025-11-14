import React from "react";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Github } from "lucide-react";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-red-700 border-t-4 border-yellow-400">
      {/* Main Footer Content */}
      <div className="max-w-screen-xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-10">
          
          {/* Brand Info */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div >
                <img src="/src/assets/images/weblogo.jpg" alt="logo" className="w-10 h-10 bg-yellow-400 rounded-full " />
              </div>
              <h3 className="text-2xl font-bold text-yellow-300">
                Poultry-Pro
              </h3>
            </div>
            <p className="text-yellow-100 text-sm leading-relaxed mb-4">
              Empowering poultry farmers with smart management tools and connecting them with buyers seamlessly.
            </p>
            <div className="space-y-2 text-sm text-yellow-200">
              <div className="flex items-center space-x-2">
                <MapPin size={16} className="text-yellow-400" />
                <span>Nairobi, Kenya</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone size={16} className="text-yellow-400" />
                <span>+254 111 980 660 </span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail size={16} className="text-yellow-400" />
                <span>info@poultrypro.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-yellow-300 mb-4 text-sm uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="/" className="text-yellow-100 hover:text-yellow-400 transition text-sm font-semibold">
                  Home
                </a>
              </li>
              <li>
                <a href="/features/livestock" className="text-yellow-100 hover:text-yellow-400 transition text-sm font-semibold">
                  Livestock Management
                </a>
              </li>
              <li>
                <a href="/features/accounting" className="text-yellow-100 hover:text-yellow-400 transition text-sm font-semibold">
                  Farm Accounting
                </a>
              </li>
              <li>
                <a href="/features/reports" className="text-yellow-100 hover:text-yellow-400 transition text-sm font-semibold">
                  Reports & Analytics
                </a>
              </li>
              <li>
                <a href="/about" className="text-yellow-100 hover:text-yellow-400 transition text-sm font-semibold">
                  About Us
                </a>
              </li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h4 className="font-bold text-yellow-300 mb-4 text-sm uppercase tracking-wider">
              Features
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="/features/tasks" className="text-yellow-100 hover:text-yellow-400 transition text-sm font-semibold">
                  Task Management
                </a>
              </li>
              <li>
                <a href="/features/weather" className="text-yellow-100 hover:text-yellow-400 transition text-sm font-semibold">
                  Climate & Weather
                </a>
              </li>
              <li>
                <a href="/features/orders" className="text-yellow-100 hover:text-yellow-400 transition text-sm font-semibold">
                  Orders & eCommerce
                </a>
              </li>
              <li>
                <a href="/pricing" className="text-yellow-100 hover:text-yellow-400 transition text-sm font-semibold">
                  Pricing
                </a>
              </li>
              <li>
                <a href="/contact" className="text-yellow-100 hover:text-yellow-400 transition text-sm font-semibold">
                  Contact Support
                </a>
              </li>
            </ul>
          </div>

          {/* Social & Newsletter */}
          <div>
            <h4 className="font-bold text-yellow-300 mb-4 text-sm uppercase tracking-wider">
              Stay Connected
            </h4>
            <p className="text-yellow-100 text-sm mb-4">
              Follow us on social media for updates and farming tips.
            </p>
            
            {/* Social Icons */}
            <div className="flex space-x-3 mb-6">
              <a 
                href="#" 
                className="w-9 h-9 bg-yellow-300 rounded-full flex items-center justify-center hover:bg-red-400 hover:text-white transition text-red-700"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a 
                href="https://x.com/AlvinParsaloi" 
                className="w-9 h-9 bg-yellow-300 rounded-full flex items-center justify-center hover:bg-red-400 hover:text-white transition text-red-700"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
              <a 
                href="https://www.instagram.com/alvin_sarisar/" 
                className="w-9 h-9 bg-yellow-300 rounded-full flex items-center justify-center hover:bg-red-400 hover:text-white transition text-red-700"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a 
                href="https://linkedin.com/in/alvin-parsaloi-311b08266" 
                className="w-9 h-9 bg-yellow-300 rounded-full flex items-center justify-center hover:bg-red-400 hover:text-white transition text-red-700"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a 
                href="https://github.com/alvinp540" 
                className="w-9 h-9 bg-yellow-300 rounded-full flex items-center justify-center hover:bg-red-400 hover:text-white transition text-red-700"
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
                className="w-full px-4 py-2 text-sm border-2 border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent mb-2 bg-red-50"
              />
              <button className="w-full bg-yellow-400 text-red-700 py-2 rounded-lg hover:bg-yellow-300 transition text-sm font-bold">
                Subscribe to Newsletter
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t-2 border-yellow-400 bg-red-800">
        <div className="max-w-screen-xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-yellow-200">
              &copy; {currentYear} Poultry-Pro Cooperative. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="/privacy" className="text-yellow-200 hover:text-yellow-400 transition font-semibold">
                Privacy Policy
              </a>
              <a href="/terms" className="text-yellow-200 hover:text-yellow-400 transition font-semibold">
                Terms of Service
              </a>
              <a href="/cookies" className="text-yellow-200 hover:text-yellow-400 transition font-semibold">
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