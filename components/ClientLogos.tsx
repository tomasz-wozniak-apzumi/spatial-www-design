import React from 'react';
import { Building2, Zap, Car, Anchor, ShieldCheck, Briefcase } from 'lucide-react';
import TextBlock from './TextBlock';

const ClientLogos: React.FC = () => {
  return (
    <div className="bg-white py-12 px-6 overflow-hidden relative">
      <div className="max-w-7xl mx-auto">
        <div className="bg-[#293b7b] rounded-3xl py-8 md:py-10 overflow-hidden shadow-lg border border-[#1e285a]/20">
          <div className="w-full flex">
            {/* CSS Animation defined in index.css */}
            <div className="flex animate-scroll whitespace-nowrap transition-opacity duration-300">
              <img src="/images/customers.png" alt="Our Clients" className="h-12 md:h-16 object-contain mr-12 brightness-110" />
              <img src="/images/customers.png" alt="Our Clients" className="h-12 md:h-16 object-contain mr-12 brightness-110" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientLogos;