import React from "react";

const CallToAction = () => {
  return (
    <section className="bg-edem-gray-light py-16 px-4">
      <div className="container mx-auto">
        <div className="bg-edem-purple rounded-[15px] p-8 lg:p-16 max-w-[1279px] mx-auto relative">
          {/* Content Container */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            {/* Text Content */}
            <div className="lg:max-w-[761px]">
              <h2 className="text-white font-poppins text-2xl md:text-3xl lg:text-[43px] font-normal leading-tight mb-6">
                Sudah Siap Menjadi Bagian Dari Masa Depan Pemilu Indonesia?
              </h2>
              <p className="text-white font-poppins text-base md:text-lg lg:text-xl font-normal leading-relaxed max-w-[607px]">
                Mari jadi bagian dari sejarah baru demokrasi Indonesia aman,
                transparan, dan digital.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 lg:flex-col lg:gap-4 lg:items-end">
              {/* Get Started Button */}
              <button className="flex items-center gap-3 bg-edem-gray-secondary hover:bg-edem-gray-secondary/90 transition-colors duration-200 rounded-[15px] px-4 py-4 h-[74px] w-full sm:w-[198px]">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/4c310c2f72bd165ac2db93679f6a87b8a09da735?width=88"
                  alt="Get Started Icon"
                  className="w-11 h-11"
                />
                <span className="text-white font-poppins text-xl font-normal">
                  Get Started
                </span>
              </button>

              {/* Learn More Button */}
              <button className="border border-edem-gray-secondary hover:bg-edem-gray-secondary/10 transition-colors duration-200 rounded-[15px] px-6 py-4 h-[74px] w-full sm:w-[198px] flex items-center justify-center">
                <span className="text-white font-poppins text-xl font-normal">
                  Learn More
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
