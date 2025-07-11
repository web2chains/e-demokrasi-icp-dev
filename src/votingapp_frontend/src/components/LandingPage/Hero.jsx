import React from "react";

const Hero = () => {
  return (
    <section className="relative bg-edem-gray-light py-24 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col items-center text-center max-w-[1191px] mx-auto">
          {/* Main Heading */}
          <h1 className="text-edem-dark font-inter text-5xl md:text-6xl lg:text-7xl xl:text-[80px] font-bold leading-tight mb-8 max-w-[1191px]">
            Mudahnya Berdemokrasi Hanya Dengan Satu Klik
          </h1>

          {/* Subtitle */}
          <p className="text-edem-dark font-inter text-lg md:text-xl lg:text-2xl xl:text-[25px] font-normal leading-relaxed mb-12 max-w-[690px]">
            Setiap suara yang kamu berikan berharga untuk masa depan bangsa
            Indonesia
          </p>

          {/* Get Started Button */}
          <button className="flex items-center gap-3 bg-edem-purple hover:bg-edem-purple/90 transition-colors duration-200 rounded-[15px] px-7 py-3 h-[68px] group">
            <span className="text-white font-poppins text-xl font-bold">
              Get Started
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
