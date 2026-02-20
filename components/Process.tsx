import React from 'react';
import { Search, FlaskConical, LineChart } from 'lucide-react';
import { ProcessStep } from '../types';
import TextBlock from './TextBlock';

const steps: ProcessStep[] = [
  { 
    id: 1, 
    title: 'Rozpoznanie i doprecyzowanie celu', 
    subtitle: 'KROK 1', 
    description: 'Mapujemy proces, potrzeby i ograniczenia. Ustalamy KPI oraz to, co ma powstać.', 
    icon: Search 
  },
  { 
    id: 2, 
    title: 'Pilot / PoC-first', 
    subtitle: 'KROK 2', 
    description: 'Budujemy i uruchamiamy pilota na realnym fragmencie procesu, żeby zweryfikować założenia i policzyć efekt.', 
    icon: FlaskConical 
  },
  { 
    id: 3, 
    title: 'Skalowanie i utrzymanie efektu', 
    subtitle: 'KROK 3', 
    description: 'Rozszerzamy rozwiązanie na kolejne obszary, monitorujemy wyniki i optymalizujemy.', 
    icon: LineChart 
  },
];

const Process: React.FC = () => {
  return (
    <section className="bg-apzumi-dark text-white py-24">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <TextBlock id="process_heading">Jak pracujemy / co oferujemy</TextBlock>
        </h2>
        <div className="text-gray-400 mb-20 max-w-2xl mx-auto block">
          <TextBlock id="process_subheading">
            Twój sukces to proces. Prowadzimy Cię od rozpoznania do skalowania — w 3 prostych krokach.
          </TextBlock>
        </div>

        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-[40px] left-0 w-full h-[2px] bg-white/10 z-0"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {steps.map((step) => (
              <div key={step.id} className="flex flex-col items-center group">
                {/* Icon Circle */}
                <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 transition-all duration-300 border-4 border-apzumi-dark
                  ${step.id === 1 ? 'bg-blue-600 shadow-[0_0_20px_rgba(37,99,235,0.5)]' : 
                    step.id === 2 ? 'bg-indigo-600' :
                    step.id === 3 ? 'bg-blue-700' : 'bg-transparent border-white/20' }`}>
                  <step.icon size={28} className="text-white" />
                </div>

                {/* Text Content */}
                <div className="text-center">
                  <span className="text-apzumi-red font-bold text-xs tracking-wider uppercase block mb-1">
                    <TextBlock id={`process_step${step.id}_sub`}>{step.subtitle}</TextBlock>
                  </span>
                  <h3 className="font-bold text-lg mb-3 leading-tight max-w-[280px] mx-auto">
                    <TextBlock id={`process_step${step.id}_title`}>{step.title}</TextBlock>
                  </h3>
                  <div className="text-gray-400 text-xs leading-relaxed max-w-[300px] mx-auto">
                    <TextBlock id={`process_step${step.id}_desc`}>{step.description}</TextBlock>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;