import React from 'react';
import { Building2, Zap, Car, Anchor, ShieldCheck, Briefcase } from 'lucide-react';
import TextBlock from './TextBlock';

const ClientLogos: React.FC = () => {
  return (
    <div className="bg-white py-12 border-b border-gray-100 overflow-hidden relative">
      <div className="w-full flex">
        {/* CSS Animation defined in index.css */}
        <div className="flex animate-scroll whitespace-nowrap opacity-60 hover:opacity-100 transition-opacity duration-300">
          <img src="/image/customers.png" alt="Our Clients" className="h-12 md:h-16 object-contain mr-12" />
          <img src="/image/customers.png" alt="Our Clients" className="h-12 md:h-16 object-contain mr-12" />
        </div>
      </div>
    </div>
  );
};

export default ClientLogos;