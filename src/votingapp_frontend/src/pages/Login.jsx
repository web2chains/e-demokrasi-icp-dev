import React, { useState, useEffect } from "react";
import { AuthClient } from "@dfinity/auth-client";
import { useNavigate } from "react-router-dom";
import { votingapp_backend } from "../../../declarations/votingapp_backend";

const Login = ({ userRole, setUserRole }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [principal, setPrincipal] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const initAuth = async () => {
      const authClient = await AuthClient.create();
      if (await authClient.isAuthenticated()) {
        await handleAuthSuccess(authClient);
      }
    };
    initAuth();
  }, []);

  const handleAuthSuccess = async (authClient) => {
    const identity = authClient.getIdentity();
    const p = identity.getPrincipal();
    setPrincipal(p.toText());
    setIsAuthenticated(true);

    try {
      const isAdmin = await votingapp_backend.isAdmin(p);
      setUserRole(isAdmin ? "admin" : "voter");
    } catch (error) {
      console.error("Failed to check role:", error);
    }
  };

  const login = async () => {
    const authClient = await AuthClient.create();
    await authClient.login({
      identityProvider: "https://identity.ic0.app",
      onSuccess: () => handleAuthSuccess(authClient),
      onError: (err) => console.error("Authentication failed:", err),
    });
  };

  const logout = async () => {
    const authClient = await AuthClient.create();
    await authClient.logout();
    setIsAuthenticated(false);
    setPrincipal(null);
    setUserRole("");
    navigate("/");
  };

  const goToDashboard = () => {
    if (userRole === "admin") {
      navigate("/admin-dashboard");
    } else if (userRole === "voter") {
      navigate("/voter-dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 px-4">
      <div className="bg-white shadow-xl rounded-xl p-8 max-w-md w-full text-center space-y-6">
        <h1 className="text-3xl font-bold text-gray-800">E-Demokrasi</h1>

        {isAuthenticated ? (
          <div className="space-y-4">
            <p className="text-gray-600">Welcome to E-Demokrasi App!</p>

            {userRole && (
              <button
                onClick={goToDashboard}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-all duration-200"
              >
                Go to {userRole === "admin" ? "Admin" : "Voter"} Dashboard
              </button>
            )}

            <button
              onClick={logout}
              className="w-full border border-red-500 text-red-500 hover:bg-red-100 py-2 px-4 rounded-lg transition-all duration-200"
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={login}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-all duration-200"
          >
            Login with Internet Identity
          </button>
        )}
      </div>
    </div>
  );
};

export default Login;
