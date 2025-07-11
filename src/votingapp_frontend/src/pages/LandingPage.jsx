import React from "react";
import Navigation from "../components/LandingPage/Navigation";
import CallToAction from "../components/LandingPage/CallToAction";
import Hero from "../components/LandingPage/Hero";
import Features from "../components/LandingPage/Features";
import Footer from "../components/LandingPage/Footer";
import '../global.css';

const LandingPage = () => {
  return (
    <div className="bg-edem-gray-light text-edem-dark">
      <Navigation />
      <Hero />
      <Features />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default LandingPage;
