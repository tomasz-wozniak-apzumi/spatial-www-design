import React from 'react';
import { ArrowRight } from 'lucide-react';
import TextBlock from './TextBlock';

const Contact: React.FC = () => {
  return (
    <section className="bg-white py-24">
      <div className="max-w-2xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-apzumi-dark mb-12 text-center">
          <TextBlock id="contact_heading">Porozmawiajmy o szczegółach</TextBlock>
        </h2>
        
        <form className="space-y-4">
          <div>
            <input 
              type="text" 
              placeholder="Imię i nazwisko" 
              className="w-full px-4 py-3 rounded border border-gray-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm"
            />
          </div>
          <div>
            <input 
              type="email" 
              placeholder="Adres email" 
              className="w-full px-4 py-3 rounded border border-gray-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm"
            />
          </div>
          <div>
            <input 
              type="tel" 
              placeholder="Telefon kontaktowy" 
              className="w-full px-4 py-3 rounded border border-gray-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm"
            />
          </div>
          
          <button type="button" className="w-full bg-apzumi-red hover:bg-red-600 text-white font-bold py-3 rounded transition-colors flex items-center justify-center gap-2 mt-4">
            <TextBlock id="contact_btn">Wyślij - odpowiemy</TextBlock>
            <ArrowRight size={16} />
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;