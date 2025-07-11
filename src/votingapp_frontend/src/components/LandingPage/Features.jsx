import React from "react";

const Features = () => {
  const features = [
    {
      title: "Keamanan Tingkat Tinggi",
      description:
        "Data pengguna, suara pemilih, dan hasil voting disimpan di jaringan blockchain yang tidak dapat dimanipulasi atau diretas.",
    },
    {
      title: "Transparansi & Terpercaya",
      description:
        "Setiap suara yang masuk dapat dilacak dan diaudit secara publik tanpa mengungkapkan identitas pribadi, membangun kepercayaan dalam proses demokrasi.",
    },
    {
      title: "Akses Mudah Dimana Saja",
      description:
        "Pemilih dapat memberikan suaranya dengan aman dari lokasi mana pun tanpa perlu datang ke TPS, mendukung pemilu inklusif.",
    },
  ];

  return (
    <section className="bg-edem-gray-light py-16 px-4">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-edem-teal font-poppins text-xl md:text-2xl lg:text-[25px] font-normal mb-4">
            Berdemokrasi hanya dengan satu kali klik
          </p>
          <h2 className="text-edem-dark font-poppins text-3xl md:text-4xl lg:text-[50px] font-bold leading-tight">
            Masa Depan Demokrasi Indonesia
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[1320px] mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-edem-gray-card rounded-[15px] p-8 shadow-[0_4px_4px_rgba(0,0,0,0.25)] h-[226px] flex flex-col justify-center"
            >
              <h3 className="text-black font-poppins text-lg md:text-xl lg:text-[22px] font-bold mb-4 leading-tight">
                {feature.title}
              </h3>
              <p className="text-edem-teal font-poppins text-sm md:text-base lg:text-[15px] font-normal leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
