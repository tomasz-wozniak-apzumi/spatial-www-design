import React from 'react';
import { Car } from 'lucide-react';
import TextBlock from './TextBlock';

const Testimonial: React.FC = () => {
  return (
    <section className="bg-gray-50 py-24">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
          <TextBlock id="testim_label">Rekomendacje</TextBlock>
        </div>
        
        <blockquote className="text-2xl md:text-3xl font-light text-gray-600 leading-relaxed mb-12">
          "<TextBlock id="testim_quote">W ramach projektu AR Container Planning utworzyliśmy bibliotekę opakowań i części, z których składają się nasze auta. Możliwość wizualizacji ich wirtualnych modeli bez dotychczasowej konieczności angażowania pracowników magazynu oraz wózka widłowego przenosi nas w inny wymiar planowania</TextBlock>"
        </blockquote>

        <div className="flex justify-between items-end border-t border-gray-200 pt-6">
          <div>
            <div className="font-bold text-gray-900">
              <TextBlock id="testim_author">Tomasz Rudalski</TextBlock>
            </div>
            <div className="text-xs text-gray-500 mt-1">
              <TextBlock id="testim_role">Projekty Logistyczne Września, Volkswagen</TextBlock>
            </div>
          </div>
          <div className="opacity-50 text-gray-400">
             <Car size={32} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;