import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import TestAdmin from "./pages/TestAdmin";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import VoterDashboard from "./pages/VoterDashboard";
import { AuthClient } from "@dfinity/auth-client";
import { votingapp_backend } from "../../declarations/votingapp_backend";

const App = () => {
  const [userRole, setUserRole] = useState(""); // "admin" | "voter"
  const [elections, setElections] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [principal, setPrincipal] = useState(null);

  useEffect(() => {
    const initAuth = async () => {
      const authClient = await AuthClient.create();
      const authenticated = await authClient.isAuthenticated();

      if (authenticated) {
        const identity = authClient.getIdentity();
        const principalValue = identity.getPrincipal();
        setPrincipal(principalValue.toText());
        setIsAuthenticated(true);

        const isAdmin = await votingapp_backend.isAdmin(principalValue);
        setUserRole(isAdmin ? "admin" : "voter");
      }
    };

    const fetchElections = async () => {
      const fetchedElections = await votingapp_backend.getElections();
      setElections(fetchedElections);
    };

    initAuth();
    fetchElections();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/test" element={<TestAdmin/>} />
        <Route
  path="/login"
  element={<Login userRole={userRole} setUserRole={setUserRole} />}
/>

        {isAuthenticated && userRole === "admin" && (
          <Route
            path="/admin-dashboard"
            element={<AdminDashboard elections={elections} principal={principal} />}
          />
        )}

        {isAuthenticated && userRole === "voter" && (
          <Route
            path="/voter-dashboard"
            element={<VoterDashboard elections={elections} principal={principal} />}
          />
        )}
      </Routes>
    </Router>
  );
};

export default App;
