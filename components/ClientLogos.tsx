import React from 'react';
import { Building2, Zap, Car, Anchor, ShieldCheck, Briefcase } from 'lucide-react';
import TextBlock from './TextBlock';

const ClientLogos: React.FC = () => {
  // Using Lucide icons to simulate logos since we don't have the actual SVG assets
  const clients = [
    { id: 'polpharma', name: 'polpharma', icon: Building2 },
    { id: 'tauron', name: 'TAURON', icon: Zap },
    { id: 'volkswagen', name: 'Volkswagen', icon: Car },
    { id: 'sitech', name: 'sitech', icon: Anchor }, // Approximation
    { id: 'audi', name: 'AUDI', icon: ShieldCheck }, // Approximation
    { id: 'impel', name: 'Impel', icon: Briefcase }, // Added Impel
  ];

  return (
    <div className="bg-white py-8 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-wrap justify-center md:justify-between items-center gap-8 md:gap-12 opacity-50 grayscale">
          {clients.map((client) => (
            <div key={client.id} className="flex items-center gap-2 font-bold text-xl text-gray-800">
               <client.icon size={24} />
               <span>
                 <TextBlock id={`client_${client.id}`}>{client.name}</TextBlock>
               </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientLogos;