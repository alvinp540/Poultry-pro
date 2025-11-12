import React from "react";
import { 
  BarChart3, 
  CloudRain, 
  ClipboardList, 
  ShoppingCart, 
  Users, 
  DollarSign,
  CheckCircle,
  TrendingUp,
  Shield,
  Zap
} from "lucide-react";

function Home() {
  const features = [
    {
      icon: <ClipboardList size={32} />,
      title: "Task & Work Management",
      description: "Organize daily farm operations and track worker assignments efficiently"
    },
    {
      icon: <Users size={32} />,
      title: "Livestock Management",
      description: "Monitor flock health, growth rates, and vaccination schedules"
    },
    {
      icon: <DollarSign size={32} />,
      title: "Farm Accounting",
      description: "Track expenses, revenue, and profitability in real-time"
    },
    {
      icon: <CloudRain size={32} />,
      title: "Climate & Weather",
      description: "Get weather forecasts and climate insights for better planning"
    },
    {
      icon: <ShoppingCart size={32} />,
      title: "Orders & eCommerce",
      description: "Connect with buyers and manage orders seamlessly"
    },
    {
      icon: <BarChart3 size={32} />,
      title: "Reports & Analytics",
      description: "Make data-driven decisions with comprehensive analytics"
    }
  ];

  const benefits = [
    { icon: <TrendingUp size={20} />, text: "Increase productivity by 40%" },
    { icon: <Shield size={20} />, text: "Secure cloud-based storage" },
    { icon: <Zap size={20} />, text: "Real-time updates & notifications" },
    { icon: <CheckCircle size={20} />, text: "Easy to use interface" }
  ];

  // const stats = [
  //   { number: "500+", label: "Active Farms" },
  //   { number: "50K+", label: "Chickens Managed" },
  //   { number: "98%", label: "Satisfaction Rate" },
  //   { number: "24/7", label: "Support Available" }
  // ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-50 via-white to-blue-50 py-20 px-6 overflow-hidden">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <div className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
                Smart Poultry Management
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                Manage Your Poultry Farm with
                <span className="text-green-600"> Confidence</span>
              </h1>
              <p className="text-lg text-gray-900 leading-relaxed">
                Poultry-Pro is your all-in-one platform for efficient poultry farm management. 
                Track production, manage inventory, connect with buyers, and grow your business with data-driven insights.
              </p>
              
              {/* Benefits List */}
              <div className="grid grid-cols-2 gap-3">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-2 text-gray-700">
                    <span className="text-green-700">{benefit.icon}</span>
                    <span className="text-sm">{benefit.text}</span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                <a
                  href="/register"
                  className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-400 transition font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Get Started Free
                </a>
                <a
                  href="/login"
                  className="border-2 border-green-600 text-green-600 px-8 py-3 rounded-lg hover:bg-green-400 transition font-semibold"
                >
                  Login
                </a>
              </div>

             
            </div>

            {/* Right Image/Illustration */}
            <div className="relative hidden md:block">
              <div className="bg-gradient-to-br from-green-200 to-green-600  w-96 h-96 flex items-center justify-center text-9xl shadow-2xl">
               <img src="/src/assets/images/hero2.jpg" alt="chicken" className="w-90 h-90 "/>
              </div>
              
            </div>
          </div>
        </div>
      </section>

    
      {/* Features Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Powerful features designed specifically for poultry farmers to streamline operations and maximize profits
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition border border-gray-100 hover:border-purple-200 group"
              >
                <div className="text-green-600 mb-4 group-hover:scale-110 transition">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

     

  
    </div>
  );
}

export default Home;