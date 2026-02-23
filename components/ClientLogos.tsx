import React from 'react';

const logos = Array.from({ length: 15 }, (_, i) => `/images/logos/logo_${i + 1}.png`);
const partners = [
  '/images/partners/Group (14).png',
  '/images/partners/Group (15).png',
  '/images/partners/Group (16).png',
  '/images/partners/Group (17).png',
  '/images/partners/Group (18).png'
];
const extendedPartners = [...partners, ...partners, ...partners];

const ClientLogos: React.FC = () => {
  return (
    <div className="py-12 px-6 overflow-hidden relative w-full">
      <div className="max-w-7xl mx-auto">
        <div className="bg-[#293b7b] rounded-3xl py-12 md:py-16 overflow-hidden shadow-lg border border-[#1e285a]/20">
          <p className="text-white text-center font-bold text-sm tracking-widest uppercase mb-8 opacity-80">Trusted by Companies</p>
          <div className="w-full flex mb-12">
            {/* First Row: Trusted by Companies */}
            <div className="flex animate-scroll whitespace-nowrap items-center w-[200%]">
              {logos.map((src, idx) => (
                <div key={`g1-${idx}`} className="bg-white rounded-[50px] px-8 py-5 mx-4 md:mx-6 flex items-center justify-center shadow-md min-w-[200px] h-[90px]">
                  <img src={src} alt="Client Logo" className="max-h-12 md:max-h-14 object-contain" />
                </div>
              ))}
              {logos.map((src, idx) => (
                <div key={`g2-${idx}`} className="bg-white rounded-[50px] px-8 py-5 mx-4 md:mx-6 flex items-center justify-center shadow-md min-w-[200px] h-[90px]">
                  <img src={src} alt="Client Logo" className="max-h-12 md:max-h-14 object-contain" />
                </div>
              ))}
            </div>
          </div>

          {/* Second Row: Our Partners */}
          <p className="text-white text-center font-bold text-sm tracking-widest uppercase mb-8 opacity-80 mt-8">Our Partners</p>
          <div className="w-full flex">
            <div className="flex animate-scroll-reverse whitespace-nowrap items-center w-[200%]">
              {extendedPartners.map((src, idx) => (
                <div key={`p1-${idx}`} className="bg-white rounded-[50px] px-8 py-5 mx-4 md:mx-6 flex items-center justify-center shadow-md min-w-[200px] h-[90px]">
                  <img src={src} alt="Partner Logo" className="max-h-12 md:max-h-14 object-contain" />
                </div>
              ))}
              {extendedPartners.map((src, idx) => (
                <div key={`p2-${idx}`} className="bg-white rounded-[50px] px-8 py-5 mx-4 md:mx-6 flex items-center justify-center shadow-md min-w-[200px] h-[90px]">
                  <img src={src} alt="Partner Logo" className="max-h-12 md:max-h-14 object-contain" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientLogos;