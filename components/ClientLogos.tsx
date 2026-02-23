import React from 'react';

const logos = Array.from({ length: 15 }, (_, i) => `/images/logos/logo_${i + 1}.png`);

const ClientLogos: React.FC = () => {
  return (
    <div className="py-12 px-6 overflow-hidden relative w-full">
      <div className="max-w-7xl mx-auto">
        <div className="bg-[#293b7b] rounded-3xl py-4 md:py-5 overflow-hidden shadow-lg border border-[#1e285a]/20">
          <div className="w-full flex bg-white py-6 md:py-8">
            {/* CSS Animation defined in index.css */}
            <div className="flex animate-scroll whitespace-nowrap items-center">
              {logos.map((src, idx) => (
                <img key={`g1-${idx}`} src={src} alt="Client Logo" className="h-10 md:h-14 object-contain mx-6 md:mx-10" />
              ))}
              {logos.map((src, idx) => (
                <img key={`g2-${idx}`} src={src} alt="Client Logo" className="h-10 md:h-14 object-contain mx-6 md:mx-10" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientLogos;