import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthClient } from "@dfinity/auth-client";
import { votingapp_backend } from "../../../../declarations/votingapp_backend";

const Navigation = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const authClient = await AuthClient.create();
      const authenticated = await authClient.isAuthenticated();

      if (authenticated) {
        const identity = authClient.getIdentity();
        const principal = identity.getPrincipal();
        setIsAuthenticated(true);

        try {
          const isAdmin = await votingapp_backend.isAdmin(principal);
          setUserRole(isAdmin ? "admin" : "voter");
        } catch (err) {
          console.error("Error checking user role:", err);
        }
      }
    };

    checkAuth();
  }, []);

  const handleDashboardClick = () => {
    if (userRole === "admin") {
      navigate("/admin-dashboard");
    } else if (userRole === "voter") {
      navigate("/voter-dashboard");
    } else {
      navigate("/login"); // fallback
    }
  };

  return (
    <nav className="w-full h-[100px] bg-edem-gray-card shadow-[0_3px_3px_rgba(0,0,0,0.25)] relative z-50">
      <div className="container mx-auto px-4 h-full">
        <div className="flex items-center justify-between h-full max-w-[1367px] mx-auto">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/03b6822b2085525f1e1a0940ab68661b8364add1?width=72"
              alt="Indonesia Flag Logo"
              className="w-9 h-10"
            />
            <h1 className="text-edem-dark font-poppins text-4xl font-bold">
              E-DEMOKRASI
            </h1>
          </div>

          {/* Navigation Links */}
          <div className="hidden lg:flex items-center gap-8">
            <Link
              to="/"
              className="text-edem-dark font-poppins text-xl hover:text-edem-teal transition-colors"
            >
              Beranda
            </Link>
            <Link
              to="/tentang-kami"
              className="text-edem-dark font-inter text-xl hover:text-edem-teal transition-colors"
            >
              Tentang Kami
            </Link>
            <Link
              to="/verifikasi-identitas"
              className="text-edem-dark font-inter text-xl hover:text-edem-teal transition-colors"
            >
              Verifikasi Identitas
            </Link>
            <Link
              to="/voting"
              className="text-edem-dark font-poppins text-xl hover:text-edem-teal transition-colors"
            >
              Voting
            </Link>
          </div>

          {/* Right side - Language Toggle and Login/Dashboard */}
          <div className="flex items-center gap-4">
            {/* Language Toggle */}
            <div className="relative">
              <div className="w-[85px] h-7 bg-edem-purple rounded-full relative">
                <div className="absolute left-1 top-1 w-[38px] h-[21px] bg-edem-gray-card rounded-full transition-transform duration-200"></div>
                <span className="absolute left-4 top-1 text-edem-purple font-inter text-xs font-bold">ID</span>
                <span className="absolute right-4 top-1 text-white font-inter text-xs font-bold">EN</span>
              </div>
            </div>

            {/* Login / Dashboard Button */}
            <button
              onClick={handleDashboardClick}
              className="w-[143px] h-[46px] bg-edem-purple rounded-[10px] text-white font-poppins text-xl font-bold hover:bg-edem-purple/90 transition-colors"
            >
              {isAuthenticated ? "Dashboard" : "Login"}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button className="text-edem-dark">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
