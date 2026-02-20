import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ArrowRight, BrainCircuit, Box, Code, FileText, Glasses, Users, ScanEye } from 'lucide-react';
import { ServiceItem } from '../types';
import TextBlock from './TextBlock';
import { ViewState } from '../App';

interface SolutionsProps {
  onNavigate?: (view: ViewState) => void;
}

const servicesData: ServiceItem[] = [
  { 
    id: '1', 
    title: 'AI Workshop', 
    icon: BrainCircuit,
    isSolution: false,
    content: {
      forWho: "Średnie firmy produkcyjne, logistyka i retail. Liderzy operacji, transformacji i IT.",
      when: "Czujesz presję na automatyzację/AI, ale nie wiesz od czego zacząć i co da ROI.",
      what: "Mapa potrzeb i priorytetów, lista use-case’ów, rekomendacje danych i integracji, wstępna roadmapa.",
      effect: "Szybka decyzja co ma sens, mniej ryzyka, jasny plan kolejnych kroków.",
      differentiator: "Łączymy doświadczenie przemysłowe z praktyką dowożenia rozwiązań AI."
    }
  },
  { 
    id: '2', 
    title: 'AI Prototyping & Product Discovery', 
    icon: Box,
    isSolution: false,
    content: {
      forWho: "Duże organizacje produkcyjne/logistyczne z zespołami IT i innowacji.",
      when: "Masz pomysł na AI, ale chcesz go zweryfikować zanim zainwestujesz w pełny projekt.",
      what: "Prototyp (PoC) + opis funkcji i wymagań, backlog oraz plan pilotażu.",
      effect: "Walidacja wartości i użyteczności, krótszy czas do pierwszych wyników.",
      differentiator: "Prototypujemy tak, by szybko potwierdzić wartość biznesową."
    }
  },
  { 
    id: '3', 
    title: 'Digitalizacja i Custom Development', 
    icon: Code,
    isSolution: false,
    content: {
      forWho: "Duże firmy, gdy gotowe narzędzia nie pasują i potrzebne są integracje (MES/ERP).",
      when: "Masz specyficzny proces lub system, którego nie da się ‘z pudełka’ ogarnąć.",
      what: "Dedykowaną aplikację (web/mobile/panele), integracje i rozwiązanie dopasowane do procesu.",
      effect: "Dopasowanie do realiów produkcji, skalowalność i szybkie iteracje.",
      differentiator: "Podejście PoC-first: nie przepalasz budżetu zanim nie ma potwierdzenia sensu."
    }
  }
];

const solutionsData: ServiceItem[] = [
  { 
    id: '4', 
    title: 'Zdigitalizowane procedury dla produkcji', 
    icon: FileText,
    isSolution: true,
    content: {
      forWho: "Średnie i duże zakłady. Produkcja, utrzymanie ruchu, liderzy zmian.",
      when: "Procedury są papierowe/rozproszone, a błędy i braki instrukcji powodują przestoje.",
      what: "Instrukcje i checklisty w formie cyfrowej, dostępne na stanowisku pracy + historia użycia.",
      effect: "Mniej błędów i przestojów, szybsze wdrożenie nowych pracowników, większa zgodność.",
      differentiator: "Rozwiązanie projektowane pod realne warunki hali produkcyjnej."
    }
  },
  { 
    id: '5', 
    title: 'Audio-wizualne wsparcie pracowników (Smart Glasses)', 
    icon: Glasses,
    isSolution: true,
    content: {
      forWho: "Utrzymanie ruchu, serwis, liderzy produkcji w zakładach rozproszonych.",
      when: "Ekspert nie zawsze jest na miejscu, a czas reakcji na awarie jest krytyczny.",
      what: "Wsparcie ‘hands-free’ na smart-okularach / tablecie + kontekstowe instrukcje.",
      effect: "Szybsze usuwanie awarii, mniej delegacji, lepsze bezpieczeństwo pracy.",
      differentiator: "Nastawienie na prostotę użycia i szybki start na produkcji."
    }
  },
  { 
    id: '6', 
    title: 'Matryca kompetencji oparta o zadania', 
    icon: Users,
    isSolution: true,
    content: {
      forWho: "Kierownicy produkcji, HR/L&D, liderzy zespołów.",
      when: "Brakuje obiektywnego obrazu kompetencji i trudno obsadzać zmiany oraz planować szkolenia.",
      what: "Panel do mapowania kompetencji do zadań + raporty i widok luk kompetencyjnych.",
      effect: "Lepsze przydziały, mniej ryzyka jakości, czytelny plan rozwoju.",
      differentiator: "Kompetencje liczone ‘od zadań’, nie od deklaracji."
    }
  },
  { 
    id: '7', 
    title: 'Automatyzacja kontroli jakości (Computer Vision)', 
    icon: ScanEye,
    isSolution: true,
    content: {
      forWho: "Quality Manager, działy jakości, linie o wysokich wymaganiach zgodności (np. GMP).",
      when: "Kontrola jakości jest manualna, kosztowna i generuje reklamacje.",
      what: "Automatyczną inspekcję wizyjną + alerty i raportowanie odchyleń.",
      effect: "Mniej reklamacji, stabilniejsza jakość, oszczędność czasu kontroli.",
      differentiator: "Łączymy wiedzę branżową z praktyką wdrożeń computer vision."
    }
  },
];

const AccordionItem: React.FC<{ 
  item: ServiceItem; 
  isOpen: boolean; 
  onToggle: () => void;
  onNavigate?: (view: ViewState) => void;
}> = ({ item, isOpen, onToggle, onNavigate }) => {

  const handleLinkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigate) {
      if (item.isSolution) {
        onNavigate('solutions');
      } else {
        onNavigate('services');
      }
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="border border-gray-100 rounded-lg shadow-sm overflow-hidden transition-all duration-300 bg-white">
      <button 
        onClick={onToggle}
        className={`w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors ${isOpen ? 'text-apzumi-dark' : 'text-gray-700'}`}
      >
        <div className="flex items-center gap-4 text-left">
          <div className={`p-2 rounded-md shrink-0 ${isOpen ? 'bg-blue-50 text-blue-600' : 'bg-gray-50 text-gray-500'}`}>
            <item.icon size={20} />
          </div>
          <div className="flex flex-col md:flex-row md:items-center gap-2">
            <span className="font-semibold text-sm md:text-base">
                <TextBlock id={`sol_title_${item.id}`}>{item.title}</TextBlock>
            </span>
            {item.isSolution && (
               <span className="inline-block bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                 <TextBlock id="sol_label_spatial">Apzumi Spatial</TextBlock>
               </span>
            )}
          </div>
        </div>
        {isOpen ? <ChevronUp size={20} className="text-gray-400 shrink-0 ml-4" /> : <ChevronDown size={20} className="text-gray-400 shrink-0 ml-4" />}
      </button>

      {isOpen && (
        <div className="bg-gray-50 p-6 md:p-8 border-t border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6 mb-8">
            <div className="space-y-2">
              <h5 className="font-bold text-gray-900 uppercase tracking-wider text-[10px]">
                <TextBlock id="sol_label_who">DLA KOGO</TextBlock>
              </h5>
              <p className="text-gray-600 text-sm leading-relaxed">
                <TextBlock id={`sol_${item.id}_forWho`}>{item.content.forWho}</TextBlock>
              </p>
            </div>
            <div className="space-y-2">
              <h5 className="font-bold text-gray-900 uppercase tracking-wider text-[10px]">
                <TextBlock id="sol_label_when">KIEDY WARTO</TextBlock>
              </h5>
              <p className="text-gray-600 text-sm leading-relaxed">
                <TextBlock id={`sol_${item.id}_when`}>{item.content.when}</TextBlock>
              </p>
            </div>
            <div className="space-y-2">
              <h5 className="font-bold text-gray-900 uppercase tracking-wider text-[10px]">
                <TextBlock id="sol_label_what">CO DOSTAJESZ</TextBlock>
              </h5>
              <p className="text-gray-600 text-sm leading-relaxed">
                <TextBlock id={`sol_${item.id}_what`}>{item.content.what}</TextBlock>
              </p>
            </div>
            <div className="space-y-2">
              <h5 className="font-bold text-gray-900 uppercase tracking-wider text-[10px]">
                <TextBlock id="sol_label_effect">EFEKT</TextBlock>
              </h5>
              <p className="text-gray-600 text-sm leading-relaxed">
                <TextBlock id={`sol_${item.id}_effect`}>{item.content.effect}</TextBlock>
              </p>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center pt-6 border-t border-gray-200 gap-4">
            <div className="text-sm">
              <span className="font-bold text-gray-900">
                <TextBlock id="sol_label_diff">Nasz wyróżnik: </TextBlock>
              </span>
              <span className="text-gray-600">
                <TextBlock id={`sol_${item.id}_diff`}>{item.content.differentiator}</TextBlock>
              </span>
            </div>
            <a 
              href="#" 
              onClick={handleLinkClick}
              className="text-apzumi-red text-sm font-bold hover:text-red-600 flex items-center gap-1 shrink-0 group"
            >
              <TextBlock id="sol_more">Dowiedz się więcej</TextBlock>
              <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

const Solutions: React.FC<SolutionsProps> = ({ onNavigate }) => {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleOpen = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6 text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-apzumi-dark mb-4">
          <TextBlock id="solutions_heading">
            Wybierz usługę lub rozwiązanie dla Twojej produkcji
          </TextBlock>
        </h2>
        <div className="text-gray-500 max-w-3xl mx-auto text-lg">
          <TextBlock id="solutions_subheading">
            Jeśli dopiero zaczynasz — wybierz usługę. Jeśli masz konkretny problem — wybierz gotowe rozwiązanie Apzumi Spatial.
          </TextBlock>
        </div>
      </div>

      <div className="max-w-5xl mx-auto space-y-12 px-4">
        
        {/* Rozwiązania Section */}
        <div>
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6 ml-1">
             <TextBlock id="solutions_section_ready">Gotowe rozwiązania Apzumi Spatial</TextBlock>
          </h3>
          <div className="space-y-3">
            {solutionsData.map((item) => (
              <AccordionItem 
                key={item.id} 
                item={item} 
                isOpen={openId === item.id} 
                onToggle={() => toggleOpen(item.id)}
                onNavigate={onNavigate} 
              />
            ))}
          </div>
        </div>

        {/* Usługi Section */}
        <div>
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6 ml-1">
            <TextBlock id="solutions_section_services">Usługi</TextBlock>
          </h3>
          <div className="space-y-3">
            {servicesData.map((item) => (
              <AccordionItem 
                key={item.id} 
                item={item} 
                isOpen={openId === item.id} 
                onToggle={() => toggleOpen(item.id)}
                onNavigate={onNavigate} 
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Solutions;