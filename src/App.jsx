import React from "react";
import axios from "axios";
import {
  House,
  Bike,
  ShoppingCart,
  Package,
  User,
  Headphones,
} from "lucide-react";

export default function BringGearHomepage() {
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [expandedCategories, setExpandedCategories] = React.useState({});
  const [activePage, setActivePage] = React.useState("home");
  const [searchTerm, setSearchTerm] = React.useState("");
  const [cartCount, setCartCount] = React.useState(0);
  const [cartItems, setCartItems] = React.useState({});
  const [orders, setOrders] = React.useState([]);
  const [trackingOrder, setTrackingOrder] = React.useState(null);
  const [cancelOrder, setCancelOrder] = React.useState(null);
  const [showLoginPopup, setShowLoginPopup] = React.useState(false);
  const [showSignupPopup, setShowSignupPopup] = React.useState(false);
  const [showCheckoutPopup, setShowCheckoutPopup] = React.useState(false);
  const [selectedPayment, setSelectedPayment] = React.useState("COD");
  const [couponCode, setCouponCode] = React.useState("");
  const [showAddAddressPopup, setShowAddAddressPopup] = React.useState(false);
  const [showEditPopup, setShowEditPopup] = React.useState(false);
  const [showForgotPasswordPopup, setShowForgotPasswordPopup] = React.useState(false);
  const [showLogoutPopup, setShowLogoutPopup] = React.useState(false);
  const [loginError, setLoginError] = React.useState("");
  const [signupError, setSignupError] = React.useState("");

  const [forgotPasswordData, setForgotPasswordData] = React.useState({
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [newAddressData, setNewAddressData] = React.useState({
    house_no: "",
    street: "",
    area: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    landmark: "",
  });

  const [loggedInUser, setLoggedInUser] = React.useState(() => {
  const savedUser = localStorage.getItem("bringgear_user");
  return savedUser ? JSON.parse(savedUser) : null;
});

  const [loginData, setLoginData] = React.useState({
    email: "",
    password: "",
  });

  const [signupData, setSignupData] = React.useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    country: "",
    state: "",
    city: "",
    pincode: "",
    house_no: "",
    street: "",
    area: "",
    landmark: "",
  });
  const [showSupportChat, setShowSupportChat] = React.useState(false);
  const [chatInput, setChatInput] = React.useState("");
  const [chatMessages, setChatMessages] = React.useState([
    {
      sender: "support",
      text: "Welcome to BRING GEAR Customer Services 👋",
    },
    {
      sender: "support",
      text: "How can we help you today?",
    },
  ]);

  const handleAddToCart = (bike) => {
    if (cartCount < 5) {
      setCartItems((prev) => ({
        ...prev,
        [bike]: (prev[bike] || 0) + 1,
      }));

      setCartCount((prev) => prev + 1);
    }
  };

  const increaseQuantity = (bike) => {
    if (cartCount < 5) {
      setCartItems((prev) => ({
        ...prev,
        [bike]: prev[bike] + 1,
      }));

      setCartCount((prev) => prev + 1);
    }
  };

  const decreaseQuantity = (bike) => {
    if (cartItems[bike] > 0) {
      setCartItems((prev) => ({
        ...prev,
        [bike]: prev[bike] - 1,
      }));

      setCartCount((prev) => prev - 1);
    }
  };

  React.useEffect(() => {
    if (searchTerm.trim() !== "") {
      const bikeExistsInCategories = categories.some((category) =>
        category.bikes.some((bike) =>
          bike.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );

      if (bikeExistsInCategories) {
        setActivePage("categories");
      } else {
        setActivePage("home");
      }

      setTimeout(() => {
        const resultsSection = document.getElementById(
          bikeExistsInCategories
            ? "categories-section"
            : "search-results"
        );

        resultsSection?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  }, [searchTerm]);
  const sidebarItems = [
    { name: "Home", icon: House },
    { name: "Categories", icon: Bike },
    { name: "Cart", icon: ShoppingCart },
    { name: "Orders", icon: Package },
    { name: "Profile", icon: User },
  ];

  const getBikeImage = (bikeName) => {
  const bikeImageMap = {
    "Trail Blazer": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIJKvvPX6Wof-fmBA5eaBCphDfcpyxYdZDXA&s",
    "Rock Rider": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3zhk5ikSBKlrz40pUoeSzJBtgkgsiXYwUyA&s",
    "Summit X": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5zOrzf8fEJouEO7CpYrbSp1VZAF98VnO-5Q&s",
    "Mountain Hawk": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFd2NhEoEZsTZASKXYH-khARwdgZ5OC0FDYA&s",
    "Peak Storm": "https://trackandtrail.in/cdn/shop/files/geolander-1.png?v=1773987796&width=533",
  };

  return bikeImageMap[bikeName] || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5zOrzf8fEJouEO7CpYrbSp1VZAF98VnO-5Q&s";
};

const bikeImages = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIJKvvPX6Wof-fmBA5eaBCphDfcpyxYdZDXA&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3zhk5ikSBKlrz40pUoeSzJBtgkgsiXYwUyA&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5zOrzf8fEJouEO7CpYrbSp1VZAF98VnO-5Q&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFd2NhEoEZsTZASKXYH-khARwdgZ5OC0FDYA&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTauVBHs1XPz3zubBqyUZKtRRu0QHNMqXUF5Q&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRq4NeqNB-oS-XiJfeUsXDvxN-dcLh2tWIc_w&s",
    "https://trackandtrail.in/cdn/shop/files/geolander-1.png?v=1773987796&width=533",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSc-7Hof38pD_CrGpEzKU8f5M7nPidmoBzC-A&s",
    "https://th.bing.com/th/id/OIP.VMO-2Nhzb3tYBi23rUsPugHaHa?w=179&h=180&c=7&r=0&o=7&pid=1.7&rm=3"
  ];

  const categories = [
    {
      title: "Mountain Bikes",
      image: bikeImages[0],
      bikes: [
        "Trail Blazer",
        "Rock Rider",
        "Summit X",
        "Mountain Hawk",
        "Peak Storm",
        "Terra Force",
        "Alpine Pro",
        "Thunder Trail",
        "Canyon Rider",
        "Wild Trek",
      ],
    },
    {
      title: "Road Bikes",
      image: bikeImages[1],
      bikes: [
        "Velocity R1",
        "Street Blade",
        "Road King",
        "Swift Pro",
        "Speed Nova",
        "Carbon Elite",
        "Turbo Ride",
        "Flash 700",
        "Road Hawk",
        "Aero Rush",
      ],
    },
    {
      title: "Hybrid Bikes",
      image: bikeImages[2],
      bikes: [
        "Urban Glide",
        "Fusion Rider",
        "Metro X",
        "City Sprint",
        "Velocity Hybrid",
        "Street Motion",
        "Cruise Max",
        "Rapid Hybrid",
        "Comet Ride",
        "Night Runner",
      ],
    },
    {
      title: "Kids Bikes",
      image: bikeImages[3],
      bikes: [
        "Mini Rocket",
        "Tiny Rider",
        "Junior Speed",
        "Happy Wheels",
        "Little Storm",
        "Rainbow Bike",
        "Fun Rider",
        "Turbo Kid",
        "Adventure Mini",
        "Spark Junior",
      ],
    },
  ];

  const bikeDetails = {
    "Trail Blazer": {
      price: 74999,
      quantity: 12,
      features: ["21 Speed", "Disc Brake", "Alloy Frame"],
    },
    "Rock Rider": {
      price: 89999,
      quantity: 7,
      features: ["24 Speed", "Hydraulic Brake", "Carbon Frame"],
    },
    "Summit X": {
      price: 65999,
      quantity: 0,
      features: ["21 Speed", "Disc Brake", "All Terrain"],
    },
    "Mountain Hawk": {
      price: 79999,
      quantity: 18,
      features: ["27 Speed", "Alloy Frame", "Tubeless Tire"],
    },
    "Velocity R1": {
      price: 99999,
      quantity: 5,
      features: ["Carbon Frame", "22 Speed", "Racing Tires"],
    },
    "Street Blade": {
      price: 58999,
      quantity: 0,
      features: ["Disc Brake", "Urban Ride", "Alloy Body"],
    },
    "Urban Glide": {
      price: 72999,
      quantity: 15,
      features: ["Comfort Seat", "21 Speed", "Hybrid Frame"],
    },
    "Fusion Rider": {
      price: 84999,
      quantity: 9,
      features: ["Shock Absorber", "Disc Brake", "Premium Gear"],
    },
    "Mini Rocket": {
      price: 45999,
      quantity: 2,
      features: ["Kids Edition", "Safety Brake", "Lightweight"],
    },
    "Peak Storm": {
      price: 82999,
      quantity: 14,
      features: ["29T Wheel", "Hydraulic Brake", "Carbon Fork"],
    },
    "Terra Force": {
      price: 68999,
      quantity: 6,
      features: ["24 Speed", "Trail Tires", "Alloy Body"],
    },
    "Alpine Pro": {
      price: 93999,
      quantity: 3,
      features: ["Premium Suspension", "Disc Brake", "Carbon Frame"],
    },
    "Thunder Trail": {
      price: 71999,
      quantity: 0,
      features: ["Shock Absorber", "Tubeless Tire", "21 Speed"],
    },
    "Canyon Rider": {
      price: 84999,
      quantity: 11,
      features: ["Hydraulic Disc", "Mountain Grip", "All Terrain"],
    },
    "Wild Trek": {
      price: 77999,
      quantity: 5,
      features: ["21 Gear", "Adventure Frame", "Trail Edition"],
    },
    "Road King": {
      price: 105999,
      quantity: 4,
      features: ["Carbon Aero", "Ultra Light", "22 Speed"],
    },
    "Swift Pro": {
      price: 88999,
      quantity: 8,
      features: ["Racing Handle", "Disc Brake", "Speed Frame"],
    },
    "Speed Nova": {
      price: 95999,
      quantity: 2,
      features: ["Aero Wheels", "Performance Tires", "Carbon Body"],
    },
    "Carbon Elite": {
      price: 119999,
      quantity: 1,
      features: ["Full Carbon", "Professional Racing", "Hydraulic Brake"],
    },
    "Turbo Ride": {
      price: 67999,
      quantity: 10,
      features: ["Road Grip", "Alloy Body", "High Speed"],
    },
    "Flash 700": {
      price: 73999,
      quantity: 7,
      features: ["Lightweight", "21 Speed", "Urban Racing"],
    },
    "Road Hawk": {
      price: 82999,
      quantity: 0,
      features: ["Road Suspension", "Carbon Seat", "Aero Build"],
    },
    "Aero Rush": {
      price: 97999,
      quantity: 12,
      features: ["Aero Dynamics", "Racing Tires", "Speed Gear"],
    },
    "Metro X": {
      price: 69999,
      quantity: 9,
      features: ["Comfort Ride", "Hybrid Tires", "Disc Brake"],
    },
    "City Sprint": {
      price: 64999,
      quantity: 13,
      features: ["Urban Ride", "Comfort Seat", "21 Speed"],
    },
    "Velocity Hybrid": {
      price: 87999,
      quantity: 4,
      features: ["Hybrid Suspension", "All Terrain", "Premium Frame"],
    },
    "Street Motion": {
      price: 58999,
      quantity: 15,
      features: ["Smooth Ride", "City Tires", "Alloy Frame"],
    },
    "Cruise Max": {
      price: 79999,
      quantity: 5,
      features: ["Long Ride Comfort", "Disc Brake", "Premium Seat"],
    },
    "Rapid Hybrid": {
      price: 76999,
      quantity: 6,
      features: ["Fast Hybrid", "Lightweight", "Urban Edition"],
    },
    "Comet Ride": {
      price: 70999,
      quantity: 0,
      features: ["Comfort Grip", "Shock Absorber", "Hybrid Body"],
    },
    "Night Runner": {
      price: 85999,
      quantity: 7,
      features: ["LED Reflector", "Night Tires", "Premium Build"],
    },
    "Tiny Rider": {
      price: 29999,
      quantity: 11,
      features: ["Kids Safe Brake", "Mini Wheels", "Training Support"],
    },
    "Junior Speed": {
      price: 35999,
      quantity: 8,
      features: ["Kids Racing", "Color Frame", "Safety Grip"],
    },
    "Happy Wheels": {
      price: 27999,
      quantity: 10,
      features: ["Comfort Seat", "Mini Handle", "Safety Brake"],
    },
    "Little Storm": {
      price: 38999,
      quantity: 3,
      features: ["Kids MTB", "Shock Absorber", "Adventure Tires"],
    },
    "Rainbow Bike": {
      price: 24999,
      quantity: 14,
      features: ["Color Edition", "Kids Safety", "Mini Frame"],
    },
    "Fun Rider": {
      price: 31999,
      quantity: 9,
      features: ["Smooth Ride", "Training Wheels", "Safety Grip"],
    },
    "Turbo Kid": {
      price: 42999,
      quantity: 2,
      features: ["Kids Racing", "Disc Brake", "Premium Wheels"],
    },
    "Adventure Mini": {
      price: 44999,
      quantity: 5,
      features: ["Adventure Build", "Shock Absorber", "Safe Ride"],
    },
    "Spark Junior": {
      price: 33999,
      quantity: 12,
      features: ["Junior Edition", "Color Tires", "Safety Frame"],
    },
  };

  const bikesList = categories.flatMap((cat) => cat.bikes);

  const filteredFeaturedBikes = searchTerm.trim()
    ? bikesList.filter((bike) =>
        bike.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : bikesList.slice(0, 9);

  const totalAmount = Object.entries(cartItems)
    .filter(([_, qty]) => qty > 0)
    .reduce(
      (total, [bike, qty]) =>
        total + qty * (bikeDetails[bike]?.price || 74999),
      0
    );

  const handleSignup = async () => {
    if (signupData.password !== signupData.confirmPassword) {
      setSignupError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        "https://bring-gear-backend.onrender.com//signup",
        signupData
      );

      alert(response.data.message);

      const newUser = {
        first_name: signupData.first_name,
        last_name: signupData.last_name,
        email: signupData.email,
      };

      setLoggedInUser(newUser);

      localStorage.setItem(
        "bringgear_user",
        JSON.stringify(newUser)
      );

      setSignupData({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        country: "",
        state: "",
        city: "",
        pincode: "",
        house_no: "",
        street: "",
        area: "",
        landmark: "",
      });

      setShowSignupPopup(false);
      setActivePage("home");
    } catch (error) {
      console.log(error);
      setSignupError("Signup Failed")
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0F14] text-white flex overflow-x-hidden">
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-[90] bg-[#0D0F14]/95 backdrop-blur-xl border-b border-gray-800 px-4 py-4 flex items-center justify-between">
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="w-12 h-12 rounded-2xl border border-orange-500 text-orange-400 text-2xl flex items-center justify-center"
        >
          ☰
        </button>

        <div className="flex items-center gap-3">
          <div className="bg-orange-500 w-12 h-12 rounded-2xl flex items-center justify-center text-black font-black text-xl shadow-lg shadow-orange-500/30">
            BG
          </div>

          <div>
            <h2 className="text-lg font-black leading-5">
              BRING
              <span className="block">GEAR</span>
            </h2>
          </div>
        </div>
      </div>
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen z-[100] bg-[#13161C] border-r border-gray-800 flex-col justify-between py-4 md:py-6 transition-all duration-300 ${mobileMenuOpen ? "flex w-full md:w-20" : "hidden"} md:flex ${sidebarCollapsed ? "md:w-20" : "md:w-64"}`}
      >
        <div>
          {/* Logo + Toggle */}
          <div className={`flex ${sidebarCollapsed ? "flex-col items-center" : "items-center justify-between"} px-4 pt-5 mb-8 gap-5`}>
            <div className={`flex items-center ${sidebarCollapsed ? "justify-center" : "gap-4"}`}>
              

              <div className={`${sidebarCollapsed ? "hidden" : "hidden md:block"}`}>
                <h2 className="text-3xl font-black leading-8">
                  BRING
                  <span className="block">GEAR</span>
                </h2>
                <p className="text-gray-400 text-sm mt-1">
                  Ride Beyond Limits
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                if (window.innerWidth < 768) {
                  setMobileMenuOpen(false);
                } else {
                  setSidebarCollapsed(!sidebarCollapsed);
                }
              }}
              className="w-12 h-12 rounded-2xl border border-orange-500 text-orange-400 hover:bg-orange-500 hover:text-black transition-all duration-300 font-bold text-xl"
            >
              {sidebarCollapsed ? "☰" : "←"}
            </button>
          </div>

          {/* Sidebar Menu */}
          <div className="space-y-4 px-4 flex-1">
            {sidebarItems.map((item, index) => (
              <button
                onClick={() => {
                    setActivePage(item.name.toLowerCase());

                    if (window.innerWidth < 768) {
                      setMobileMenuOpen(false);
                    }
                  }}
                key={index}
                className={`w-full flex items-center ${window.innerWidth < 768 ? "justify-start gap-5" : sidebarCollapsed ? "justify-center" : "gap-4"} px-5 py-4 rounded-2xl transition-all duration-300 ${
                  activePage === item.name.toLowerCase()
                    ? "bg-orange-500 text-black font-semibold"
                    : "hover:bg-[#1D212B] text-gray-300"
                }`}
              >
                <div className="relative">
  {item.name === "Profile" && loggedInUser ? (
    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black font-black text-sm shadow-lg shadow-white/30">
      <span className="text-sm">
        {`${loggedInUser.first_name?.charAt(0).toUpperCase()}${loggedInUser.last_name?.charAt(0).toUpperCase()}`}
      </span>
    </div>
  ) : (
    <item.icon size={30} strokeWidth={2.2} />
  )}

                  {item.name === "Cart" && cartCount > 0 && (
                    <span className="absolute -top-2 -right-3 bg-orange-500 text-black text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </div>
                <span
                  className={`
                    ${window.innerWidth < 768
                      ? "block"
                      : sidebarCollapsed
                      ? "hidden"
                      : "hidden md:block"}
                  `}
                >
                  {item.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Customer Services */}
        <div className="px-4 pb-5">
          <button
            onClick={() => setShowSupportChat(true)}
            className={`w-full flex ${sidebarCollapsed ? "justify-center" : "items-center gap-4"} px-4 py-4 rounded-2xl hover:bg-[#1D212B] text-gray-300 transition-all duration-300`}
          >
            <Headphones size={24} strokeWidth={2.2} />
            <span
              className={`
                ${window.innerWidth < 768
                  ? "block"
                  : sidebarCollapsed
                  ? "hidden"
                  : "hidden md:block"}
              `}
            >
              Customer Services
            </span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main
  className={`flex-1 ml-0 ${
    sidebarCollapsed ? "md:ml-20" : "md:ml-64"
  } p-4 md:p-8 transition-all duration-300`}
>
        {/* Top Navbar */}
        {(activePage === "home" || activePage === "categories") && (
          <div
  className={`md:fixed md:top-0 ${
    sidebarCollapsed ? "md:left-20" : "md:left-64"
  } left-0 right-0 z-40 bg-[#0D0F14]/95 backdrop-blur-xl border-b border-gray-800 flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-4 md:px-8 py-5 transition-all duration-300`}
>
            <div className="hidden md:flex items-center gap-5">
              <div className="bg-orange-500 w-16 h-16 rounded-3xl flex items-center justify-center text-black font-black text-3xl shadow-2xl shadow-orange-500/30">
                BG
              </div>

              <div>
                <h2 className="text-3xl font-bold">Welcome to BRING GEAR</h2>
                <p className="text-gray-400 mt-1">
                  Explore premium bicycles with futuristic experience.
                </p>
              </div>
            </div>

            <div className="flex items-center bg-[#1A1D24] rounded-2xl px-4 py-3 border border-gray-800 w-full md:w-[350px] mt-20 md:mt-0 shadow-lg">
              <span className="mr-3 text-gray-400">🔍</span>
              <input
                type="text"
                placeholder="Search bicycles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent outline-none w-full text-white placeholder-gray-500"
              />
            </div>
          </div>
        )}

        {activePage === "home" && (
          <>
            {/* Main Hero Card */}
            {/* Mobile Space Fix */}
            <div className="pt-24 md:pt-0 md:h-32"></div>

            <div className="relative bg-[#111318] rounded-[32px] border border-gray-800 overflow-hidden min-h-[720px] shadow-2xl">
              {/* Background Image */}
              

              {/* Orange Glow */}
              <img
                src="https://images.unsplash.com/photo-1541625602330-2277a4c46182?q=80&w=1600&auto=format&fit=crop"
                alt="Cycling Background"
                className="hidden md:block absolute inset-0 w-full h-full object-cover opacity-20"
              />

              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent"></div>
              <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-orange-500/20 to-transparent blur-2xl"></div>

              {/* Hero Content */}
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between h-full p-6 md:p-14 gap-8 md:gap-16">
                {/* Left Content */}
                <div className="max-w-xl pt-6 text-center md:text-left w-full">
                  <p className="uppercase tracking-[6px] text-orange-400 text-sm mb-5 font-semibold">
                    Ride Beyond Limits
                  </p>

                  <h1 className="text-4xl sm:text-5xl md:text-7xl font-black leading-[0.95] mb-8">
                    BUILT FOR
                    <span className="block text-orange-500 mt-2">
                      PERFORMANCE
                    </span>
                  </h1>

                  <p className="text-gray-300 text-lg leading-8 max-w-lg mb-10">
                    Experience futuristic bicycles designed for speed, power,
                    adventure, and durability with BRING GEAR.
                  </p>

                  <div className="flex flex-row gap-4 w-full md:w-auto">
                    <button
                      onClick={() => {
                        setActivePage("home");
                        window.scrollTo({ top: 850, behavior: "smooth" });
                      }}
                      className="flex-1 bg-orange-500 hover:bg-orange-400 text-black px-6 py-4 rounded-2xl font-bold text-base md:text-lg transition-all duration-300 hover:scale-105 shadow-lg shadow-orange-500/30"
                    >
                      Shop Now →
                    </button>

                    <button
                      onClick={() => {
                        setActivePage("categories");
                        setTimeout(() => {
                          const categoriesSection = document.getElementById("categories-section");
                          categoriesSection?.scrollIntoView({ behavior: "smooth" });
                        }, 100);
                      }}
                      className="flex-1 border border-gray-700 hover:border-orange-500 px-6 py-4 rounded-2xl font-semibold text-base md:text-lg transition-all duration-300 hover:bg-[#1A1D24]"
                    >
                      Explore More
                    </button>
                  </div>
                </div>

                {/* Moving Bicycle */}
                <div className="relative w-full md:w-auto flex items-center justify-center">
                  <img
                    src="https://images.unsplash.com/photo-1511994298241-608e28f14fde?q=80&w=1400&auto=format&fit=crop"
                    alt="Moving Bicycle"
                    className="w-full max-w-md md:max-w-2xl h-[220px] md:h-[520px] object-cover md:object-cover rounded-3xl md:rounded-none opacity-90 md:mt-0"
                  />
                </div>
              </div>

              {/* Bottom Stats */}
              <div className="relative z-10 px-6 md:px-14 pb-10">
                <div className="bg-[#11151C]/80 backdrop-blur-xl border border-gray-800 rounded-3xl p-6 grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div>
                    <p className="text-orange-400 text-3xl mb-2">⚡</p>
                    <h3 className="text-2xl font-bold">28 KM/H</h3>
                    <p className="text-gray-400 mt-1">Top Speed</p>
                  </div>

                  <div>
                    <p className="text-orange-400 text-3xl mb-2">⚙️</p>
                    <h3 className="text-2xl font-bold">21 Gear</h3>
                    <p className="text-gray-400 mt-1">Shimano Gear</p>
                  </div>

                  <div>
                    <p className="text-orange-400 text-3xl mb-2">🛡️</p>
                    <h3 className="text-2xl font-bold">5 Year</h3>
                    <p className="text-gray-400 mt-1">Warranty</p>
                  </div>

                  <div>
                    <p className="text-orange-400 text-3xl mb-2">🚚</p>
                    <h3 className="text-2xl font-bold">Free</h3>
                    <p className="text-gray-400 mt-1">Shipping</p>
                  </div>
                </div>
              </div>
            </div>

            <section id="search-results" className="mt-12">
              <div className="mb-8">
                <h2 className="text-4xl font-bold tracking-tight">
                  Featured Bicycles
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredFeaturedBikes.map((bike, index) => {
                  const image = getBikeImage(bike);
                  const quantity = cartItems[bike] || 0;

                  return (
                    <div
                      key={bike}
                      className="group bg-[#0F131B] border border-gray-800 rounded-[28px] overflow-hidden hover:border-orange-500/70 transition-all duration-300"
                    >
                      <div className="relative h-[260px] overflow-hidden bg-black">
                        <img
                          src={image}
                          alt={bike}
                          onError={(e) => {
                            e.target.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5zOrzf8fEJouEO7CpYrbSp1VZAF98VnO-5Q&s";
                          }}
                          className="w-full h-full object-contain p-2 group-hover:scale-105 transition-all duration-500 bg-white"
                        />
                      </div>

                      <div className="p-5">
                        <div className="flex items-center justify-between">
                          <h3 className="text-2xl font-semibold text-white">{bike}</h3>
                          <span className="text-orange-400 text-2xl font-bold">
                            ₹{(bikeDetails[bike]?.price || 74999).toLocaleString()}
                          </span>
                        </div>

                        <div className="flex flex-nowrap gap-2 mt-5 mb-5 overflow-x-auto scrollbar-hide">
                          {(bikeDetails[bike]?.features || ["21 Speed", "Disc Brake", "Alloy Frame"]).map((feature) => (
                            <span
                              key={feature}
                              className="bg-[#1F2530] text-gray-300 px-3 py-2 rounded-xl text-sm border border-gray-700"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>

                        {bikeDetails[bike]?.quantity === 0 ? (
                          <div className="w-full mt-2 bg-red-500 text-white py-3 rounded-2xl font-bold text-center">
                            Out Of Stock
                          </div>
                        ) : quantity > 0 ? (
                          <div className="w-full mt-2 flex items-center justify-between bg-orange-500 rounded-2xl px-6 py-3 text-black font-bold text-xl">
                            <button onClick={() => decreaseQuantity(bike)} className="text-2xl">-</button>
                            <span>{quantity}</span>
                            <button onClick={() => increaseQuantity(bike)} disabled={cartCount >= 5} className="text-2xl">+</button>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleAddToCart(bike)}
                            disabled={cartCount >= 5}
                            className={
  `w-full mt-2 py-3 rounded-2xl font-bold transition-all duration-300 ${
    cartCount >= 5
      ? "bg-gray-700 text-gray-400 cursor-not-allowed"
      : "bg-orange-500 hover:bg-orange-400 text-black"
  }`
}
                          >
                            {cartCount >= 5 ? "Cart Full" : "Add To Cart"}
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </>
        )}

        {activePage === "cart" && (
          <section className="mt-28 md:mt-12 pb-[220px] md:pb-20">
            <div className="mb-8 md:mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-4xl font-bold tracking-tight">
                  Your Cart
                </h2>
                <p className="text-gray-400 mt-2">
                  Review all selected bicycles before checkout.
                </p>
              </div>

              <div className="self-start sm:self-auto bg-orange-500 text-black px-5 py-3 rounded-2xl font-bold text-lg md:text-xl">
                {cartCount}/5 Items
              </div>
            </div>

            <div className="space-y-6">
              {Object.entries(cartItems)
                .filter(([_, qty]) => qty > 0)
                .map(([bike, qty], index) => {
                  const image = getBikeImage(bike);

                  return (
                    <div
                      key={bike}
                      className="bg-[#13161C] border border-gray-800 rounded-[32px] p-4 md:p-5 flex flex-col md:flex-row gap-5 md:gap-6 items-start md:items-center shadow-xl overflow-hidden"
                    >
                      <img
                        src={image}
                        alt={bike}
                        onError={(e) => {
                          e.target.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5zOrzf8fEJouEO7CpYrbSp1VZAF98VnO-5Q&s";
                        }}
                        className="w-full md:w-[260px] h-[220px] md:h-[200px] object-contain bg-white rounded-[24px] p-2"
                      />

                      <div className="flex-1 w-full">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                          <div>
                            <h3 className="text-3xl font-bold text-white">
                              {bike}
                            </h3>

                            <p className="text-gray-400 mt-3 leading-7 max-w-2xl">
                              Premium performance bicycle engineered for comfort,
                              speed, durability, and futuristic riding experience.
                            </p>
                          </div>

                          <div className="text-orange-400 text-3xl font-bold">
                            ₹{qty * 74999}
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mt-6 mb-6">
                          <span className="bg-[#1F2530] text-gray-300 px-3 py-2 rounded-xl text-sm border border-gray-700">
                            21 Speed
                          </span>

                          <span className="bg-[#1F2530] text-gray-300 px-3 py-2 rounded-xl text-sm border border-gray-700">
                            Disc Brake
                          </span>

                          <span className="bg-[#1F2530] text-gray-300 px-3 py-2 rounded-xl text-sm border border-gray-700">
                            Alloy Frame
                          </span>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="flex items-center justify-between bg-orange-500 rounded-2xl px-6 py-4 text-black font-bold text-2xl w-full sm:w-[190px] shadow-lg shadow-orange-500/20">
                            <button
                              onClick={() => decreaseQuantity(bike)}
                              className="text-2xl"
                            >
                              -
                            </button>

                            <span>{qty}</span>

                            <button
                              onClick={() => increaseQuantity(bike)}
                              disabled={cartCount >= 5}
                              className="text-2xl"
                            >
                              +
                            </button>
                          </div>

                          <button
                            onClick={() => {
                              setCartCount((prev) => prev - qty);
                              setCartItems((prev) => ({
                                ...prev,
                                [bike]: 0,
                              }));
                            }}
                            className="w-full sm:w-auto bg-red-500 hover:bg-red-400 text-white px-6 py-4 rounded-2xl font-bold transition-all duration-300"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}

              {cartCount === 0 && (
                <div className="bg-[#13161C] border border-gray-800 rounded-[32px] p-16 text-center">
                  <div className="text-7xl mb-6">🛒</div>
                  <h3 className="text-3xl font-bold mb-3">
                    Your Cart is Empty
                  </h3>
                  <p className="text-gray-400 text-lg mb-8">
                    Add premium bicycles to your cart to view them here.
                  </p>

                  <button
                    onClick={() => setActivePage("home")}
                    className="bg-orange-500 hover:bg-orange-400 text-black px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300"
                  >
                    Shop Now
                  </button>
                </div>
              )}
            </div>

            {cartCount > 0 && (
              <div className="fixed bottom-0 right-0 z-50 bg-[#13161C]/95 backdrop-blur-xl border-t border-gray-800 px-4 md:px-10 py-4 md:py-5 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 md:gap-5 shadow-2xl"
                style={{
                  left: window.innerWidth >= 768 ? (sidebarCollapsed ? "96px" : "256px") : "0px",
                }}
              >
                <div>
                  <p className="text-gray-400 text-sm">Total Amount</p>
                  <h2 className="text-4xl font-black text-orange-400">
                    ₹{totalAmount.toLocaleString()}
                  </h2>
                </div>

                <div className="flex items-center gap-4 w-full md:w-auto">
                  <div className="flex-1 md:flex-none text-center bg-[#1F2530] px-5 py-4 rounded-2xl border border-gray-700 text-lg font-semibold">
                    {cartCount} Items
                  </div>

                  <button
                    onClick={() => {
                    if (!loggedInUser) {
                      setShowLoginPopup(true);
                      return;
                    }

                    setShowCheckoutPopup(true);
                  }}
                    className="flex-1 md:flex-none bg-orange-500 hover:bg-orange-400 text-black px-10 py-4 rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-105"
                  >
                    Buy
                  </button>
                </div>
              </div>
            )}
          </section>
        )}

        {/* Checkout Popup */}
        {showCheckoutPopup && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[150] flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-[#13161C] border border-gray-800 rounded-[32px] w-full max-w-6xl max-h-[95vh] overflow-y-auto p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-4xl font-bold">Checkout</h2>
                  <p className="text-gray-400 mt-2">
                    Complete your bicycle purchase.
                  </p>
                </div>

                <button
                  onClick={() => setShowCheckoutPopup(false)}
                  className="w-12 h-12 rounded-2xl bg-[#1F2530] hover:bg-red-500 transition-all duration-300 text-xl"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                  <div className="bg-[#1A1D24] border border-gray-700 rounded-3xl p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-2xl font-bold">
                        Delivery Address
                      </h3>

                      <button className="text-orange-400 font-semibold hover:text-orange-300">
                        + Add New Address
                      </button>
                    </div>

                    <div className="bg-[#0F131B] border border-gray-700 rounded-2xl p-5 leading-8">
  <h4 className="text-2xl font-bold text-white mb-4">
    {loggedInUser?.first_name} {loggedInUser?.last_name}
  </h4>

  <div className="space-y-2 text-gray-300">
    <p>📧 {loggedInUser?.email}</p>

    <p>📞 {loggedInUser?.phone}</p>

    <p>
      🏠 {loggedInUser?.house_no}, {loggedInUser?.street}
    </p>

    <p>
      📍 {loggedInUser?.area}, {loggedInUser?.city}
    </p>

    <p>
      {loggedInUser?.state}, {loggedInUser?.country}
    </p>

    <p>
      Pincode: {loggedInUser?.pincode}
    </p>

    <p>
      Landmark: {loggedInUser?.landmark}
    </p>
  </div>
</div>

                    <button
  onClick={() => setShowAddAddressPopup(true)}
  className="w-full mt-5 border border-dashed border-orange-500 text-orange-400 hover:bg-orange-500 hover:text-black py-4 rounded-2xl font-bold transition-all duration-300"
>
  + Add New Address
</button>
                  </div>

                  <div className="bg-[#1A1D24] border border-gray-700 rounded-3xl p-6">
                    <h3 className="text-2xl font-bold mb-6">
                      Products
                    </h3>

                    <div className="space-y-4">
                      {Object.entries(cartItems)
                        .filter(([_, qty]) => qty > 0)
                        .map(([bike, qty], index) => (
                          <div
                            key={bike}
                            className="flex flex-col md:flex-row gap-5 bg-[#0F131B] border border-gray-700 rounded-2xl p-4"
                          >
                            <img
                              src={getBikeImage(bike)}
                              alt={bike}
                              className="w-full md:w-[160px] h-[130px] object-cover rounded-2xl bg-white"
                            />

                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <h4 className="text-2xl font-bold">
                                  {bike}
                                </h4>

                                <span className="text-orange-400 text-2xl font-bold">
                                  ₹{(qty * 74999).toLocaleString()}
                                </span>
                              </div>

                              <p className="text-gray-400 mt-3">
                                Quantity: {qty}
                              </p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-[#1A1D24] border border-gray-700 rounded-3xl p-6">
                    <h3 className="text-2xl font-bold mb-5">
                      Apply Coupon
                    </h3>

                    <div className="relative">
  <input
    type="text"
    placeholder="Enter Coupon"
    value={couponCode}
    onChange={(e) => setCouponCode(e.target.value)}
    className="w-full bg-[#0F131B] border border-gray-700 rounded-2xl px-5 pr-24 py-4 outline-none focus:border-orange-500"
  />

  <button
    onClick={() => {
      if (couponCode.trim() === "") {
        alert("Please Enter Coupon");
        return;
      }

      alert(`Coupon Applied: ${couponCode}`);
    }}
    className="absolute right-5 top-1/2 -translate-y-1/2 text-orange-400 font-bold hover:text-orange-300 transition-all duration-300"
  >
    Apply
  </button>
</div>

                    <div className="mt-6 space-y-4">
                      <div className="bg-[#0F131B] border border-green-500/40 rounded-2xl p-4">
                        <h4 className="text-green-400 font-bold">
                          SAVE500
                        </h4>
                        <p className="text-gray-400 text-sm mt-1">
                          Get ₹500 OFF on orders above ₹50,000
                        </p>
                      </div>

                      <div className="bg-[#0F131B] border border-blue-500/40 rounded-2xl p-4">
                        <h4 className="text-blue-400 font-bold">
                          FREEDELIVERY
                        </h4>
                        <p className="text-gray-400 text-sm mt-1">
                          Free express shipping on all bicycles.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#1A1D24] border border-gray-700 rounded-3xl p-6">
                    <h3 className="text-2xl font-bold mb-5">
                      Card Offers
                    </h3>

                    <div className="space-y-4">
                      <div className="bg-[#0F131B] rounded-2xl p-4 border border-gray-700">
                        <p className="font-semibold text-white">
                          HDFC Credit Card
                        </p>
                        <p className="text-gray-400 text-sm mt-1">
                          10% instant discount up to ₹5,000
                        </p>
                      </div>

                      <div className="bg-[#0F131B] rounded-2xl p-4 border border-gray-700">
                        <p className="font-semibold text-white">
                          SBI Debit Card
                        </p>
                        <p className="text-gray-400 text-sm mt-1">
                          Flat ₹2,000 cashback on EMI purchases.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#1A1D24] border border-gray-700 rounded-3xl p-6">
                    <h3 className="text-2xl font-bold mb-5">
                      Payment Method
                    </h3>

                    <div className="space-y-3">
                      {["COD", "UPI", "Credit Card", "Debit Card", "EMI"].map((method) => (
                        <button
                          key={method}
                          onClick={() => setSelectedPayment(method)}
                          className={`w-full text-left px-5 py-4 rounded-2xl border transition-all duration-300 ${
                            selectedPayment === method
                              ? "bg-orange-500 text-black border-orange-500 font-bold"
                              : "bg-[#0F131B] border-gray-700 text-white hover:border-orange-500"
                          }`}
                        >
                          {method}
                        </button>
                      ))}
                    </div>

                    <div className="mt-8 border-t border-gray-700 pt-6">
                      <div className="flex items-center justify-between mb-5">
                        <span className="text-gray-400 text-lg">
                          Total Amount
                        </span>

                        <span className="text-4xl font-black text-orange-400">
                          ₹{totalAmount.toLocaleString()}
                        </span>
                      </div>

                      <button
                        onClick={() => {
                          const purchasedItems = Object.entries(cartItems)
                            .filter(([_, qty]) => qty > 0)
                            .map(([bike, qty], index) => ({
                              bike,
                              qty,
                              image: getBikeImage(bike),
                              total: qty * 74999,
                            }));

                          setOrders((prev) => [...prev, ...purchasedItems]);
                          setCartItems({});
                          setCartCount(0);
                          setShowCheckoutPopup(false);
                          setActivePage("orders");

                          alert(`Order placed successfully using ${selectedPayment}`);
                        }}
                        className="w-full bg-orange-500 hover:bg-orange-400 text-black py-5 rounded-2xl font-bold text-xl transition-all duration-300"
                      >
                        Place Order
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        

        {activePage === "orders" && (
          <section className="mt-12 pb-20">
            <div className="mb-10">
              <h2 className="text-4xl font-bold tracking-tight">
                Your Orders
              </h2>
              <p className="text-gray-400 mt-2">
                Purchased bicycles will appear here.
              </p>
            </div>

            <div className="space-y-6">
              {orders.map((order, index) => (
                <div
                  key={`${order.bike}-${index}`}
                  className="bg-[#13161C] border border-gray-800 rounded-[32px] p-4 md:p-5 flex flex-col md:flex-row gap-5 md:gap-6 items-start md:items-center shadow-xl overflow-hidden"
                >
                  <img
                    src={order.image}
                    alt={order.bike}
                    onError={(e) => {
                      e.target.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5zOrzf8fEJouEO7CpYrbSp1VZAF98VnO-5Q&s";
                    }}
                    className="w-full md:w-[260px] h-[220px] md:h-[200px] object-contain bg-white rounded-[24px] p-2"
                  />

                  <div className="flex-1 w-full">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <h3 className="text-3xl font-bold text-white">
                          {order.bike}
                        </h3>

                        <p className="text-gray-400 mt-3 leading-7 max-w-2xl">
                          Premium bicycle successfully purchased from BRING GEAR.
                        </p>
                      </div>

                      <div className="text-orange-400 text-3xl font-bold">
                        ₹{order.total.toLocaleString()}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-6 mb-6">
                      <span className="bg-[#1F2530] text-gray-300 px-3 py-2 rounded-xl text-sm border border-gray-700">
                        Quantity: {order.qty}
                      </span>

                      <span className="bg-[#1F2530] text-gray-300 px-3 py-2 rounded-xl text-sm border border-gray-700">
                        Order Confirmed
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 mt-4">
                      <button
                        onClick={() => setTrackingOrder(order)}
                        className="bg-orange-500 hover:bg-orange-400 text-black px-6 py-3 rounded-2xl font-bold transition-all duration-300"
                      >
                        Track Order
                      </button>

                      <button
                        onClick={() => setCancelOrder(order)}
                        className="w-full sm:w-auto bg-red-500 hover:bg-red-400 text-white px-6 py-4 rounded-2xl font-bold transition-all duration-300"
                      >
                        Cancel Order
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {orders.length === 0 && (
                <div className="bg-[#13161C] border border-gray-800 rounded-[32px] p-16 text-center">
                  <div className="text-7xl mb-6">📦</div>
                  <h3 className="text-3xl font-bold mb-3">
                    No Orders Yet
                  </h3>
                  <p className="text-gray-400 text-lg mb-8">
                    Purchased bicycles will appear here.
                  </p>

                  <button
                    onClick={() => setActivePage("home")}
                    className="bg-orange-500 hover:bg-orange-400 text-black px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300"
                  >
                    Shop Now
                  </button>
                </div>
              )}
            </div>
          </section>
        )}

        {activePage === "profile" && (
          <section className="mt-28 md:mt-8 pb-20 flex justify-center items-start md:items-center min-h-[85vh] px-3 md:px-0">
            <div className="w-full max-w-xl mx-auto bg-[#13161C] border border-gray-800 rounded-[32px] md:rounded-[40px] px-5 md:px-10 py-10 md:py-16 relative overflow-hidden flex flex-col justify-between min-h-auto md:min-h-[700px]">

              <div className="absolute top-0 right-0 w-60 h-60 bg-orange-500/20 blur-3xl rounded-full"></div>

              <div className="relative z-10">

                <div className="flex flex-col items-center mb-8 md:mb-12">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-orange-500 flex items-center justify-center text-black text-4xl md:text-5xl font-black shadow-2xl shadow-orange-500/30">
                    {loggedInUser
                      ? `${loggedInUser.first_name?.charAt(0).toUpperCase()}${loggedInUser.last_name?.charAt(0).toUpperCase()}`
                      : "BG"}
                  </div>

                  <h2 className="text-2xl md:text-5xl font-black mt-5 md:mt-6 text-center capitalize leading-tight">
                    {loggedInUser
                      ? `${loggedInUser.first_name} ${loggedInUser.last_name}`
                      : "Welcome Rider"}
                  </h2>

                  <p className="text-lg md:text-2xl font-semibold text-gray-300/70 break-all mt-2">
                    {loggedInUser?.email}
                  </p>

                  <p className="text-gray-400 text-center mt-3 md:mt-4 max-w-2xl leading-7 text-base md:text-lg">
                    Manage your BRING GEAR profile, delivery address, and account details.
                  </p>
                </div>

                {loggedInUser ? (
                  <>
                    

                    <div className="flex flex-col md:flex-row gap-5 mt-14 w-full">
                      <button
                        onClick={() => {
                          setSignupData({
                            ...signupData,
                            phone: loggedInUser.phone || "",
                            country: loggedInUser.country || "",
                            state: loggedInUser.state || "",
                            city: loggedInUser.city || "",
                            pincode: loggedInUser.pincode || "",
                            house_no: loggedInUser.house_no || "",
                            street: loggedInUser.street || "",
                            area: loggedInUser.area || "",
                            landmark: loggedInUser.landmark || "",
                          });

                          setShowEditPopup(true);
                        }}
                        className="w-full md:w-1/2 bg-orange-500 hover:bg-orange-400 text-black py-5 rounded-3xl font-bold text-xl transition-all duration-300"
                      >
                        Edit Details
                      </button>

                      <button
                        onClick={() => {
                          setShowLogoutPopup(true);
                        }}
                        className="w-full md:w-1/2 bg-red-500 hover:bg-red-400 text-white py-5 rounded-3xl font-bold text-xl transition-all duration-300"
                      >
                        Logout
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="max-w-md mx-auto space-y-4 w-full">
                    <button
                      onClick={() => setShowLoginPopup(true)}
                      className="w-full bg-orange-500 hover:bg-orange-400 text-black py-4 rounded-2xl font-bold text-lg transition-all duration-300"
                    >
                      Login
                    </button>

                    <button
                      onClick={() => setShowSignupPopup(true)}
                      className="w-full border border-gray-700 hover:border-orange-500 hover:bg-[#1A1D24] py-4 rounded-2xl font-bold text-lg transition-all duration-300"
                    >
                      Sign Up
                    </button>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}


        {activePage === "categories" && (
          <section id="categories-section" className="mt-36 pb-20">
            <div className="mb-10">
              <h2 className="text-4xl font-bold tracking-tight">
                Bicycle Categories
              </h2>
            </div>

            <div className="space-y-10">
              {categories.map((category, categoryIndex) => (
                <div
                  key={category.title}
                  className="bg-[#13161C] border border-gray-800 rounded-[32px] p-6"
                >
                  <h3 className="text-3xl font-bold mb-8 text-orange-400">
                    {category.title}
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {(expandedCategories[category.title]
                      ? category.bikes
                      : category.bikes.slice(0, 4)
                    ).map((bike, bikeIndex) => {
                      const quantity = cartItems[bike] || 0;

                      return (
                        <div
                          key={bike}
                          className="bg-[#0F131B] border border-gray-800 rounded-2xl p-5"
                        >
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="text-xl font-semibold">{bike}</h4>
                            <span className="text-orange-400 font-bold">
                              ₹{(bikeDetails[bike]?.price || 74999).toLocaleString()}
                            </span>
                          </div>

                          <p className="text-gray-400 leading-7 mb-5">
                            High-performance bicycle built for speed, durability,
                            smooth riding experience, and advanced comfort across
                            all terrains.
                          </p>

                          <div className="flex flex-nowrap gap-2 mb-5 overflow-x-auto scrollbar-hide">
                            {(bikeDetails[bike]?.features || ["21 Speed", "Disc Brake", "Alloy Frame"]).map((feature) => (
                              <span
                                key={feature}
                                className="bg-[#1F2530] text-gray-300 px-3 py-2 rounded-xl text-sm border border-gray-700"
                              >
                                {feature}
                              </span>
                            ))}
                          </div>

                          {bikeDetails[bike]?.quantity === 0 ? (
                          <div className="w-full mt-2 bg-red-500 text-white py-3 rounded-2xl font-bold text-center">
                            Out Of Stock
                          </div>
                        ) : quantity > 0 ? (
                          <div className="w-full mt-2 flex items-center justify-between bg-orange-500 rounded-2xl px-6 py-3 text-black font-bold text-xl">
                            <button onClick={() => decreaseQuantity(bike)} className="text-2xl">-</button>
                            <span>{quantity}</span>
                            <button onClick={() => increaseQuantity(bike)} disabled={cartCount >= 5} className="text-2xl">+</button>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleAddToCart(bike)}
                            disabled={cartCount >= 5}
                            className={
  `w-full mt-2 py-3 rounded-2xl font-bold transition-all duration-300 ${
    cartCount >= 5
      ? "bg-gray-700 text-gray-400 cursor-not-allowed"
      : "bg-orange-500 hover:bg-orange-400 text-black"
  }`
}
                          >
                            {cartCount >= 5 ? "Cart Full" : "Add To Cart"}
                          </button>
                        )}
                      </div>
                      );
                    })}
                  </div>

                  <div className="flex justify-center mt-8">
                    <button
                      onClick={() =>
                        setExpandedCategories((prev) => ({
                          ...prev,
                          [category.title]: !prev[category.title],
                        }))
                      }
                      className="bg-orange-500 hover:bg-orange-400 text-black px-8 py-3 rounded-2xl font-bold"
                    >
                      {expandedCategories[category.title]
                        ? "Show Less"
                        : "Show More"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      {/* Customer Support Chat */}
      {showSupportChat && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[120] p-4">
          <div className="bg-[#13161C] border border-gray-800 rounded-[32px] w-full max-w-2xl h-[95vh] md:h-[700px] flex flex-col overflow-hidden">
            <div className="flex items-start md:items-center justify-between px-4 md:px-8 py-5 md:py-6 border-b border-gray-800 bg-[#181C24] gap-4">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3 leading-tight">
                  🎧 Customer Services
                </h2>
                <p className="text-gray-400 mt-1">
                  BRING GEAR live support chat
                </p>

                <div className="mt-3 text-xs md:text-sm text-gray-400 flex flex-col md:flex-row md:items-center gap-2 md:gap-3">
                  <p>📧 support@bringgear.com</p>
                  <span className="text-gray-600">|</span>
                  <p>📞 +91 XXXXX 3210</p>
                </div>
              </div>

              <button
                onClick={() => setShowSupportChat(false)}
                className="w-12 h-12 rounded-2xl bg-[#1F2530] hover:bg-red-500 transition-all duration-300 text-xl"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 md:space-y-5 bg-[#0D0F14]">
              {chatMessages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.sender === "support" ? "justify-start" : "justify-end"}`}
                >
                  <div
                    className={`max-w-[88%] md:max-w-[80%] px-4 md:px-5 py-3 md:py-4 rounded-3xl text-base md:text-lg leading-7 ${
                      message.sender === "support"
                        ? "bg-[#1F2530] text-white border border-gray-700"
                        : "bg-orange-500 text-black font-semibold"
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}

              <div className="flex justify-start">
                <button
                  onClick={() =>
                    setChatMessages((prev) => [
                      ...prev,
                      {
                        sender: "user",
                        text: "I need help with my bicycle order.",
                      },
                      {
                        sender: "support",
                        text: "Sure! Please check your Orders section to track or manage your order.",
                      },
                    ])
                  }
                  className="bg-[#1F2530] hover:border-orange-500 border border-gray-700 px-4 md:px-5 py-3 rounded-2xl text-sm md:text-base text-gray-300 transition-all duration-300 w-fit"
                >
                  Order Help
                </button>
              </div>

              <div className="flex justify-start">
                <button
                  onClick={() =>
                    setChatMessages((prev) => [
                      ...prev,
                      {
                        sender: "user",
                        text: "Tell me about delivery time.",
                      },
                      {
                        sender: "support",
                        text: "Most BRING GEAR bicycles are delivered within 3-5 business days 🚚",
                      },
                    ])
                  }
                  className="bg-[#1F2530] hover:border-orange-500 border border-gray-700 px-4 md:px-5 py-3 rounded-2xl text-sm md:text-base text-gray-300 transition-all duration-300 w-fit"
                >
                  Delivery Info
                </button>
              </div>

              <div className="flex justify-start">
                <button
                  onClick={() =>
                    setChatMessages((prev) => [
                      ...prev,
                      {
                        sender: "user",
                        text: "Do bicycles include warranty?",
                      },
                      {
                        sender: "support",
                        text: "Yes 👍 All bicycles include a 5 year warranty from BRING GEAR.",
                      },
                    ])
                  }
                  className="bg-[#1F2530] hover:border-orange-500 border border-gray-700 px-4 md:px-5 py-3 rounded-2xl text-sm md:text-base text-gray-300 transition-all duration-300 w-fit"
                >
                  Warranty Details
                </button>
              </div>
            </div>

            <div className="p-4 md:p-5 border-t border-gray-800 bg-[#181C24] flex flex-col md:flex-row items-stretch md:items-center gap-3 md:gap-4">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Type your message..."
                className="w-full flex-1 bg-[#1F2530] border border-gray-700 rounded-2xl px-4 md:px-5 py-3 md:py-4 outline-none focus:border-orange-500 text-sm md:text-base"
              />

              <button
                onClick={() =>
                  setChatMessages([
                    {
                      sender: "support",
                      text: "Welcome to BRING GEAR Customer Services 👋",
                    },
                    {
                      sender: "support",
                      text: "How can we help you today?",
                    },
                  ])
                }
                className="w-full md:w-auto bg-[#1F2530] hover:border-red-500 border border-gray-700 text-white px-5 py-3 rounded-2xl font-bold transition-all duration-300"
              >
                New Chat
              </button>

              <button
                onClick={() => {
                  if (chatInput.trim() === "") return;

                  const userMessage = chatInput;

                  setChatMessages((prev) => [
                    ...prev,
                    {
                      sender: "user",
                      text: userMessage,
                    },
                    {
                      sender: "support",
                      text:
                        userMessage.toLowerCase() === "hi" ||
                        userMessage.toLowerCase() === "hello"
                          ? "Hi 👋 How can I help you today?"
                          : "Our customer executive will connect with you within 24-48 hours. Sorry for the inconvenience caused 🙏",
                    },
                  ]);

                  setChatInput("");
                }}
                className="w-full md:w-auto bg-orange-500 hover:bg-orange-400 text-black px-8 py-3 rounded-2xl font-bold transition-all duration-300"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Login Popup */}
      {showLoginPopup && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[100] p-4 overflow-y-auto">
          <div className="bg-[#13161C] border border-gray-800 rounded-[32px] w-full max-w-sm p-5 md:p-8">
            <h2 className="text-3xl font-bold mb-2 text-center">Login Required</h2>
            <p className="text-gray-400 mb-6 text-center leading-7 text-sm">
              Please login or create account to continue your purchase.
            </p>

            {loginError && (
              <div className="bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded-2xl text-sm mb-5 text-center">
                {loginError}
              </div>
            )}

            <div className="space-y-5">
              <div>
                <label className="block text-sm text-gray-400 mb-2 font-semibold">Email Address</label>
                <input
                  type="email"
                  placeholder="Username or Email Address"
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  className="w-full bg-[#1A1D24] border border-gray-700 rounded-2xl px-4 md:px-5 py-3 md:py-4 outline-none focus:border-orange-500 text-sm md:text-base"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2 font-semibold">Password</label>
                <input
                  type="password"
                  placeholder="Password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  className="w-full bg-[#1A1D24] border border-gray-700 rounded-2xl px-4 md:px-5 py-3 md:py-4 outline-none focus:border-orange-500 text-sm md:text-base"
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-5">
                <label className="flex items-center gap-3 text-gray-300 cursor-pointer">
                  <input type="checkbox" className="w-5 h-5 accent-orange-500" />
                  <span>Save Details</span>
                </label>

                <button
                  onClick={async () => {
                    if (!loginData.email.trim()) {
                      setLoginError("Please Enter Email First");
                      return;
                    }

                    try {
                      const response = await axios.post("https://bring-gear-backend.onrender.com//check-email", {
                        email: loginData.email.trim(),
                      });

                      if (response.data.success) {
                        setForgotPasswordData({
                          ...forgotPasswordData,
                          email: loginData.email,
                        });

                        setShowForgotPasswordPopup(true);
                      } else {
                        setLoginError("Email Not Found");
                      }
                    } catch (error) {
                      console.log(error);
                      setLoginError("Server Error");
                    }
                  }}
                  className="text-orange-400 hover:text-orange-300 transition-all duration-300 text-left sm:text-right"
                >
                  Forgot Password?
                </button>
              </div>

              <div className="flex flex-col gap-3 mt-6">
                <button
                  onClick={() => setShowLoginPopup(false)}
                  className="flex-1 border border-gray-700 hover:border-orange-500 py-3 rounded-2xl font-bold transition-all duration-300"
                >
                  Cancel
                </button>

                <button
                  onClick={() => {
                    setSignupData({
                      first_name: "",
                      last_name: "",
                      email: "",
                      phone: "",
                      password: "",
                      confirmPassword: "",
                      country: "",
                      state: "",
                      city: "",
                      pincode: "",
                      house_no: "",
                      street: "",
                      area: "",
                      landmark: "",
                    });

                    setSignupError("");

                    setShowLoginPopup(false);
                    setShowSignupPopup(true);
                  }}
                  className="w-full border border-orange-500 text-orange-400 hover:bg-orange-500 hover:text-black py-3 rounded-2xl font-bold transition-all duration-300"
                >
                  Create Account
                </button>

                <button
                  onClick={async () => {
                    if (!loginData.email || !loginData.password) {
                      setLoginError("Please fill all login details");
                      return;
                    }

                    try {
                      const response = await axios.post("https://bring-gear-backend.onrender.com//login", {
                        email: loginData.email.trim(),
                        password: loginData.password.trim(),
                      });

                      if (response.data.success) {
                        setLoggedInUser(response.data.user);
                        setActivePage("home");
                        setSignupData(response.data.user);

                        localStorage.setItem("bringgear_user", JSON.stringify(response.data.user));

                        setLoginError("");
                        setShowLoginPopup(false);

                        setLoginData({
                          email: "",
                          password: "",
                        });
                      } else {
                        setLoginError("Invalid Email or Password");
                      }
                    } catch (error) {
                      console.log(error);
                      setLoginError("Server Error");
                    }
                  }}
                  className="flex-1 bg-orange-500 hover:bg-orange-400 text-black py-3 rounded-2xl font-bold transition-all duration-300"
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Signup Popup */}
      {showSignupPopup && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[100] p-4 overflow-y-auto">
          <div className="bg-[#13161C] border border-gray-800 rounded-[32px] w-full max-w-5xl max-h-[92vh] overflow-y-auto p-4 md:p-8 mx-2">
            <h2 className="text-3xl md:text-5xl font-black mb-3 leading-tight">
              Create Account
            </h2>

            <p className="text-gray-400 mb-6 md:mb-10 text-sm md:text-lg leading-7">
              Create your BRING GEAR rider account.
            </p>

            {signupError && (
              <div className="bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded-2xl text-sm mb-5 text-center">
                {signupError}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
              <div>
                <label className="block text-sm text-gray-400 mb-2 font-semibold">First Name</label>
                <input type="text" placeholder="First Name" value={signupData.first_name} onChange={(e) => setSignupData({ ...signupData, first_name: e.target.value })} className="w-full bg-[#1A1D24] border border-gray-700 rounded-2xl px-4 md:px-5 py-3 md:py-4 outline-none focus:border-orange-500 text-sm md:text-base" />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2 font-semibold">Last Name</label>
                <input type="text" placeholder="Last Name" value={signupData.last_name} onChange={(e) => setSignupData({ ...signupData, last_name: e.target.value })} className="w-full bg-[#1A1D24] border border-gray-700 rounded-2xl px-4 md:px-5 py-3 md:py-4 outline-none focus:border-orange-500 text-sm md:text-base" />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2 font-semibold">Email Address</label>
                <input type="email" placeholder="Email Address" value={signupData.email} onChange={(e) => setSignupData({ ...signupData, email: e.target.value })} className="w-full bg-[#1A1D24] border border-gray-700 rounded-2xl px-4 md:px-5 py-3 md:py-4 outline-none focus:border-orange-500 text-sm md:text-base" />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2 font-semibold">Phone Number</label>
                <input type="text" placeholder="Phone Number" value={signupData.phone} onChange={(e) => setSignupData({ ...signupData, phone: e.target.value })} className="w-full bg-[#1A1D24] border border-gray-700 rounded-2xl px-4 md:px-5 py-3 md:py-4 outline-none focus:border-orange-500 text-sm md:text-base" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
              <div>
                <label className="block text-sm text-gray-400 mb-2 font-semibold">Password</label>
                <input type="password" placeholder="Password" value={signupData.password} onChange={(e) => setSignupData({ ...signupData, password: e.target.value })} className="w-full bg-[#1A1D24] border border-gray-700 rounded-2xl px-4 md:px-5 py-3 md:py-4 outline-none focus:border-orange-500 text-sm md:text-base" />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2 font-semibold">Confirm Password</label>
                <input type="password" placeholder="Confirm Password" value={signupData.confirmPassword} onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })} className="w-full bg-[#1A1D24] border border-gray-700 rounded-2xl px-4 md:px-5 py-3 md:py-4 outline-none focus:border-orange-500 text-sm md:text-base" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
              {[
                ["Country", "country"],
                ["State", "state"],
                ["City", "city"],
                ["Pincode", "pincode"],
                ["House No", "house_no"],
                ["Street", "street"],
                ["Area", "area"],
                ["Landmark", "landmark"],
              ].map(([label, key]) => (
                <div key={key}>
                  <label className="block text-sm text-gray-400 mb-2 font-semibold">{label}</label>
                  <input
                    type="text"
                    placeholder={label}
                    value={signupData[key]}
                    onChange={(e) => setSignupData({ ...signupData, [key]: e.target.value })}
                    className="w-full bg-[#1A1D24] border border-gray-700 rounded-2xl px-4 md:px-5 py-3 md:py-4 outline-none focus:border-orange-500 text-sm md:text-base"
                  />
                </div>
              ))}
            </div>

            <div className="flex flex-col md:flex-row gap-4 mt-6 md:mt-8">
              <button
                onClick={() => setShowSignupPopup(false)}
                className="flex-1 border border-gray-700 hover:border-orange-500 py-4 rounded-2xl font-bold transition-all duration-300"
              >
                Close
              </button>

              <button
                onClick={handleSignup}
                className="flex-1 bg-orange-500 hover:bg-orange-400 text-black py-4 rounded-2xl font-bold transition-all duration-300"
              >
                Create Account
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Profile Popup */}
      {showEditPopup && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[120] p-4 overflow-y-auto">
          <div className="bg-[#13161C] border border-gray-800 rounded-[32px] w-full max-w-3xl max-h-[90vh] overflow-y-auto p-4 md:p-8 mx-2">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl md:text-5xl font-black leading-tight">
                  Edit Details
                </h2>

                <p className="text-gray-400 mt-2 text-sm md:text-lg leading-7">
                  Update your delivery and contact details.
                </p>
              </div>

              <button
                onClick={() => setShowEditPopup(false)}
                className="w-12 h-12 rounded-2xl bg-[#1F2530] hover:bg-red-500 transition-all duration-300 text-xl"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
              <input type="text" placeholder="Phone Number" value={signupData.phone} onChange={(e) => setSignupData({ ...signupData, phone: e.target.value })} className="bg-[#1A1D24] border border-gray-700 rounded-2xl px-5 py-4 outline-none focus:border-orange-500" />

              <input type="text" placeholder="Country" value={signupData.country} onChange={(e) => setSignupData({ ...signupData, country: e.target.value })} className="bg-[#1A1D24] border border-gray-700 rounded-2xl px-5 py-4 outline-none focus:border-orange-500" />

              <input type="text" placeholder="State" value={signupData.state} onChange={(e) => setSignupData({ ...signupData, state: e.target.value })} className="bg-[#1A1D24] border border-gray-700 rounded-2xl px-5 py-4 outline-none focus:border-orange-500" />

              <input type="text" placeholder="City" value={signupData.city} onChange={(e) => setSignupData({ ...signupData, city: e.target.value })} className="bg-[#1A1D24] border border-gray-700 rounded-2xl px-5 py-4 outline-none focus:border-orange-500" />

              <input type="text" placeholder="Pincode" value={signupData.pincode} onChange={(e) => setSignupData({ ...signupData, pincode: e.target.value })} className="bg-[#1A1D24] border border-gray-700 rounded-2xl px-5 py-4 outline-none focus:border-orange-500" />

              <input type="text" placeholder="House No" value={signupData.house_no} onChange={(e) => setSignupData({ ...signupData, house_no: e.target.value })} className="bg-[#1A1D24] border border-gray-700 rounded-2xl px-5 py-4 outline-none focus:border-orange-500" />

              <input type="text" placeholder="Street" value={signupData.street} onChange={(e) => setSignupData({ ...signupData, street: e.target.value })} className="bg-[#1A1D24] border border-gray-700 rounded-2xl px-5 py-4 outline-none focus:border-orange-500" />

              <input type="text" placeholder="Area" value={signupData.area} onChange={(e) => setSignupData({ ...signupData, area: e.target.value })} className="bg-[#1A1D24] border border-gray-700 rounded-2xl px-5 py-4 outline-none focus:border-orange-500" />

              <input type="text" placeholder="Landmark" value={signupData.landmark} onChange={(e) => setSignupData({ ...signupData, landmark: e.target.value })} className="bg-[#1A1D24] border border-gray-700 rounded-2xl px-5 py-4 outline-none focus:border-orange-500" />
            </div>

            <div className="flex flex-col md:flex-row gap-4 mt-8">
              <button
                onClick={() => setShowEditPopup(false)}
                className="flex-1 border border-gray-700 hover:border-orange-500 py-4 rounded-2xl font-bold transition-all duration-300"
              >
                Close
              </button>

              <button
                onClick={() => {
                  const updatedUser = {
                    ...loggedInUser,
                    ...signupData,
                  };

                  setLoggedInUser(updatedUser);

                  localStorage.setItem(
                    "bringgear_user",
                    JSON.stringify(updatedUser)
                  );

                  setShowEditPopup(false);

                  alert("Profile Updated Successfully");
                }}
                className="flex-1 bg-orange-500 hover:bg-orange-400 text-black py-4 rounded-2xl font-bold transition-all duration-300"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Forgot Password Popup */}
      {showForgotPasswordPopup && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[130] p-4">
          <div className="bg-[#13161C] border border-gray-800 rounded-[32px] w-full max-w-xl p-5 md:p-8">
            <h2 className="text-5xl font-black mb-2">
              Reset Password
            </h2>

            <p className="text-gray-400 mb-8 text-lg">
              Update your account password securely.
            </p>

            <div className="space-y-5">
              <input type="email" value={forgotPasswordData.email} disabled className="w-full bg-[#0F131B] border border-gray-700 rounded-2xl px-5 py-4 text-gray-500" />

              <input type="password" placeholder="Current Password" value={forgotPasswordData.currentPassword} onChange={(e) => setForgotPasswordData({ ...forgotPasswordData, currentPassword: e.target.value })} className="w-full bg-[#1A1D24] border border-gray-700 rounded-2xl px-4 md:px-5 py-3 md:py-4 outline-none focus:border-orange-500 text-sm md:text-base" />

              <input type="password" placeholder="New Password" value={forgotPasswordData.newPassword} onChange={(e) => setForgotPasswordData({ ...forgotPasswordData, newPassword: e.target.value })} className="w-full bg-[#1A1D24] border border-gray-700 rounded-2xl px-4 md:px-5 py-3 md:py-4 outline-none focus:border-orange-500 text-sm md:text-base" />

              <input type="password" placeholder="Confirm New Password" value={forgotPasswordData.confirmNewPassword} onChange={(e) => setForgotPasswordData({ ...forgotPasswordData, confirmNewPassword: e.target.value })} className={`w-full rounded-2xl px-5 py-4 outline-none border ${forgotPasswordData.newPassword !== forgotPasswordData.confirmNewPassword ? "border-red-500" : "border-gray-700"} bg-[#1A1D24]`} />

              {forgotPasswordData.newPassword !== forgotPasswordData.confirmNewPassword && (
                <div className="text-red-500 text-sm flex items-center gap-2">
                  ❌ Passwords do not match
                </div>
              )}
            </div>

            <div className="flex gap-4 mt-8">
              <button
                onClick={() => setShowForgotPasswordPopup(false)}
                className="flex-1 border border-gray-700 hover:border-orange-500 py-4 rounded-2xl font-bold transition-all duration-300"
              >
                Close
              </button>

              <button
                disabled={forgotPasswordData.newPassword !== forgotPasswordData.confirmNewPassword}
                onClick={() => {
                  alert("Password Updated Successfully");
                  setShowForgotPasswordPopup(false);
                }}
                className="flex-1 bg-orange-500 hover:bg-orange-400 text-black py-4 rounded-2xl font-bold transition-all duration-300 disabled:opacity-40"
              >
                Update Password
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Address Popup */}
      {showAddAddressPopup && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[200] p-4 overflow-y-auto">
          <div className="bg-[#13161C] border border-gray-800 rounded-[32px] w-full max-w-2xl p-5 md:p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-4xl font-bold">Add New Address</h2>
                <p className="text-gray-400 mt-2">
                  Enter your delivery address details.
                </p>
              </div>

              <button
                onClick={() => setShowAddAddressPopup(false)}
                className="w-12 h-12 rounded-2xl bg-[#1F2530] hover:bg-red-500 transition-all duration-300 text-xl"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
              <input
                type="text"
                placeholder="House No"
                value={newAddressData.house_no}
                onChange={(e) =>
                  setNewAddressData({
                    ...newAddressData,
                    house_no: e.target.value,
                  })
                }
                className="bg-[#1A1D24] border border-gray-700 rounded-2xl px-5 py-4 outline-none focus:border-orange-500"
              />

              <input
                type="text"
                placeholder="Street"
                value={newAddressData.street}
                onChange={(e) =>
                  setNewAddressData({
                    ...newAddressData,
                    street: e.target.value,
                  })
                }
                className="bg-[#1A1D24] border border-gray-700 rounded-2xl px-5 py-4 outline-none focus:border-orange-500"
              />

              <input
                type="text"
                placeholder="Area"
                value={newAddressData.area}
                onChange={(e) =>
                  setNewAddressData({
                    ...newAddressData,
                    area: e.target.value,
                  })
                }
                className="bg-[#1A1D24] border border-gray-700 rounded-2xl px-5 py-4 outline-none focus:border-orange-500"
              />

              <input
                type="text"
                placeholder="City"
                value={newAddressData.city}
                onChange={(e) =>
                  setNewAddressData({
                    ...newAddressData,
                    city: e.target.value,
                  })
                }
                className="bg-[#1A1D24] border border-gray-700 rounded-2xl px-5 py-4 outline-none focus:border-orange-500"
              />

              <input
                type="text"
                placeholder="State"
                value={newAddressData.state}
                onChange={(e) =>
                  setNewAddressData({
                    ...newAddressData,
                    state: e.target.value,
                  })
                }
                className="bg-[#1A1D24] border border-gray-700 rounded-2xl px-5 py-4 outline-none focus:border-orange-500"
              />

              <input
                type="text"
                placeholder="Country"
                value={newAddressData.country}
                onChange={(e) =>
                  setNewAddressData({
                    ...newAddressData,
                    country: e.target.value,
                  })
                }
                className="bg-[#1A1D24] border border-gray-700 rounded-2xl px-5 py-4 outline-none focus:border-orange-500"
              />

              <input
                type="text"
                placeholder="Pincode"
                value={newAddressData.pincode}
                onChange={(e) =>
                  setNewAddressData({
                    ...newAddressData,
                    pincode: e.target.value,
                  })
                }
                className="bg-[#1A1D24] border border-gray-700 rounded-2xl px-5 py-4 outline-none focus:border-orange-500"
              />

              <input
                type="text"
                placeholder="Landmark"
                value={newAddressData.landmark}
                onChange={(e) =>
                  setNewAddressData({
                    ...newAddressData,
                    landmark: e.target.value,
                  })
                }
                className="bg-[#1A1D24] border border-gray-700 rounded-2xl px-5 py-4 outline-none focus:border-orange-500"
              />
            </div>

            <div className="flex gap-4 mt-8">
              <button
                onClick={() => setShowAddAddressPopup(false)}
                className="flex-1 border border-gray-700 hover:border-orange-500 py-4 rounded-2xl font-bold transition-all duration-300"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  setLoggedInUser({
                    ...loggedInUser,
                    ...newAddressData,
                  });

                  localStorage.setItem(
                    "bringgear_user",
                    JSON.stringify({
                      ...loggedInUser,
                      ...newAddressData,
                    })
                  );

                  setShowAddAddressPopup(false);

                  alert("New Address Added Successfully");
                }}
                className="flex-1 bg-orange-500 hover:bg-orange-400 text-black py-4 rounded-2xl font-bold transition-all duration-300"
              >
                Save Address
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Logout Popup */}
      {showLogoutPopup && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[250] p-4">
          <div className="bg-[#13161C] border border-gray-800 rounded-[32px] w-full max-w-md p-8 text-center">
            <div className="text-6xl mb-5">⚠️</div>

            <h2 className="text-4xl font-bold mb-4">
              Logout Account?
            </h2>

            <p className="text-gray-400 text-lg leading-8 mb-10">
              Are you sure you want to logout from your BRING GEAR account?
            </p>

            <div className="flex gap-4">
              <button
                onClick={() => setShowLogoutPopup(false)}
                className="flex-1 border border-gray-700 hover:border-orange-500 py-4 rounded-2xl font-bold transition-all duration-300"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  localStorage.removeItem("bringgear_user");
                  setLoggedInUser(null);
                  setShowLogoutPopup(false);
                  setActivePage("home");
                }}
                className="flex-1 bg-red-500 hover:bg-red-400 text-white py-4 rounded-2xl font-bold transition-all duration-300"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Track Order Popup */}
      {trackingOrder && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <div className="bg-[#13161C] border border-gray-800 rounded-[32px] w-full max-w-2xl p-5 md:p-8">
            <h2 className="text-4xl font-bold mb-2">Track Order</h2>
            <p className="text-gray-400 mb-10">
              {trackingOrder.bike} delivery progress
            </p>

            <div className="space-y-10 relative">
              <div className="absolute left-[15px] top-5 bottom-5 w-[2px] bg-orange-500"></div>

              <div className="flex items-start gap-5 relative z-10">
                <div className="w-8 h-8 rounded-full bg-orange-500 border-4 border-[#13161C]"></div>
                <div>
                  <h3 className="text-2xl font-bold">Order Confirmed</h3>
                  <p className="text-gray-400 mt-1">
                    Your bicycle order has been confirmed.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-5 relative z-10">
                <div className="w-8 h-8 rounded-full bg-orange-500 border-4 border-[#13161C]"></div>
                <div>
                  <h3 className="text-2xl font-bold">Out From Warehouse</h3>
                  <p className="text-gray-400 mt-1">
                    Bicycle packed and dispatched from warehouse.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-5 relative z-10">
                <div className="w-8 h-8 rounded-full bg-orange-500 border-4 border-[#13161C]"></div>
                <div>
                  <h3 className="text-2xl font-bold">Out For Shipping</h3>
                  <p className="text-gray-400 mt-1">
                    Your order is on the way to your location.
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setTrackingOrder(null)}
              className="mt-10 w-full bg-orange-500 hover:bg-orange-400 text-black py-4 rounded-2xl font-bold text-lg transition-all duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Cancel Order Popup */}
      {cancelOrder && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <div className="bg-[#13161C] border border-gray-800 rounded-[32px] w-full max-w-xl p-5 md:p-8 text-center">
            <div className="text-7xl mb-6">⚠️</div>

            <h2 className="text-4xl font-bold mb-4">
              Cancel Order?
            </h2>

            <p className="text-gray-400 text-lg leading-8 mb-10">
              Do you really want to cancel your order for
              <span className="text-orange-400 font-semibold">
                {' '}{cancelOrder.bike}
              </span>
              ?
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setCancelOrder(null)}
                className="flex-1 border border-gray-700 hover:border-orange-500 py-3 rounded-2xl font-bold transition-all duration-300"
              >
                Close
              </button>

              <button
                onClick={() => {
                  setOrders((prev) =>
                    prev.filter(
                      (item, index) =>
                        !(item.bike === cancelOrder.bike && item.qty === cancelOrder.qty)
                    )
                  );
                  setCancelOrder(null);
                }}
                className="flex-1 bg-red-500 hover:bg-red-400 text-white py-3 rounded-2xl font-bold transition-all duration-300"
              >
                Cancel Order
              </button>
            </div>
          </div>
        </div>
      )}

      </main>

      {/* Custom Animation Styles */}
      <style>{`
        .animate-bikeFloat {
          animation: bikeFloat 4s ease-in-out infinite;
        }

        @keyframes bikeFloat {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
          100% {
            transform: translateY(0px);
          }
        }
      `}</style>
    </div>
  );
}
