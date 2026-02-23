import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  ArrowRight, CheckCircle2, Target, ShieldCheck, FileText, Settings,
  HelpCircle, Lightbulb, TrendingUp, Cpu, Layers, Users
} from 'lucide-react';
import TextBlock from './TextBlock';
import { useTextContext } from '../context/TextContext';
import { ViewState } from '../App';
import { textConfig } from '../textConfig';

type ServiceId = 'workshop' | 'proto' | 'custom';
type SituationId = 'start' | 'valid' | 'build';

interface ServicesPageProps {
  onNavigate: (view: ViewState) => void;
  version?: 'v1' | 'v2' | 'v3';
}

interface ServiceData {
  id: ServiceId;
  situation: SituationId;
  titleKey: string;
  valKey: string;
  trigKey: string;
  btnKey: string;
  chips: string[];
  bullets: string[];
  details: {
    descKey: string;
    forWhoKey: string;
    whenKey: string;
    whatKey: string;
    effectKey: string;
    diffKey: string;
    processKey: string;
    artifactsKey: string;
    valueTabKey: string;
  }
}

const servicesData: ServiceData[] = [
  {
    id: 'workshop',
    situation: 'start',
    titleKey: 'serv_item_workshop_title',
    valKey: 'serv_item_workshop_val',
    trigKey: 'serv_item_workshop_trig',
    btnKey: 'serv_item_workshop_btn',
    chips: ['Średnie firmy', 'Produkcja', 'Logistyka'],
    bullets: [
      'Mapa procesów i problemów + priorytetyzacja',
      'KPI i kryteria sukcesu (mierzalne)',
      'Roadmapa: pilot → skalowanie'
    ],
    details: {
      descKey: 'serv_workshop_desc',
      forWhoKey: 'serv_workshop_forWho',
      whenKey: 'serv_workshop_when',
      whatKey: 'serv_workshop_what',
      effectKey: 'serv_workshop_effect',
      diffKey: 'serv_workshop_diff',
      processKey: 'serv_workshop_process',
      artifactsKey: 'serv_workshop_artifacts',
      valueTabKey: 'serv_workshop_effect'
    }
  },
  {
    id: 'proto',
    situation: 'valid',
    titleKey: 'serv_item_proto_title',
    valKey: 'serv_item_proto_val',
    trigKey: 'serv_item_proto_trig',
    btnKey: 'serv_item_proto_btn',
    chips: ['Duże firmy', 'Innowacje', 'R&D'],
    bullets: [
      'Discovery + wymagania + prototyp w 48h',
      'Testy z użytkownikami (User Testing)',
      'Raport z weryfikacji i plan pilota'
    ],
    details: {
      descKey: 'serv_proto_desc',
      forWhoKey: 'serv_proto_forWho',
      whenKey: 'serv_proto_when',
      whatKey: 'serv_proto_what',
      effectKey: 'serv_proto_effect',
      diffKey: 'serv_proto_diff',
      processKey: 'serv_proto_process',
      artifactsKey: 'serv_proto_artifacts',
      valueTabKey: 'serv_proto_effect'
    }
  },
  {
    id: 'custom',
    situation: 'build',
    titleKey: 'serv_item_custom_title',
    valKey: 'serv_item_custom_val',
    trigKey: 'serv_item_custom_trig',
    btnKey: 'serv_item_custom_btn',
    chips: ['Duże firmy', 'Operacje', 'IT/OT'],
    bullets: [
      'PoC-first: działający fragment jako dowód',
      'Integracje Enterprise (ERP/MES)',
      'Pełne IP i kod źródłowy'
    ],
    details: {
      descKey: 'serv_custom_desc',
      forWhoKey: 'serv_custom_forWho',
      whenKey: 'serv_custom_when',
      whatKey: 'serv_custom_what',
      effectKey: 'serv_custom_effect',
      diffKey: 'serv_custom_diff',
      processKey: 'serv_custom_process',
      artifactsKey: 'serv_custom_artifacts',
      valueTabKey: 'serv_custom_effect'
    }
  }
];

const ServiceCard: React.FC<{
  data: ServiceData;
  isActive: boolean;
  onSelect: () => void;
}> = ({ data, isActive, onSelect }) => {
  return (
    <div
      className={`group relative p-8 rounded-3xl transition-all duration-500 overflow-hidden flex flex-col h-full border backdrop-blur-sm
        ${isActive
          ? 'bg-blue-900/30 border-apzumi-red/50 shadow-[0_0_40px_rgba(240,78,78,0.15)] scale-[1.02]'
          : 'bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10'
        }`}
    >
      {/* Chips */}
      <div className="flex flex-wrap gap-2 mb-6">
        {data.chips.map((chip, idx) => (
          <span key={idx} className="bg-white/10 text-gray-300 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wide">
            {chip}
          </span>
        ))}
      </div>

      <div className="mb-6">
        <h3 className="text-2xl font-bold text-white mb-3 leading-tight">
          <TextBlock id={data.titleKey}>{textConfig[data.titleKey]?.[0] || ''}</TextBlock>
        </h3>
        <p className="text-gray-300 text-sm leading-relaxed min-h-[40px]">
          <TextBlock id={data.valKey}>{textConfig[data.valKey]?.[0] || ''}</TextBlock>
        </p>
      </div>

      <div className="space-y-3 mb-8 flex-grow">
        {data.bullets.map((bullet, idx) => (
          <div key={idx} className="flex items-start gap-2">
            <CheckCircle2 size={16} className="text-apzumi-red shrink-0 mt-0.5" />
            <span className="text-gray-400 text-xs">{bullet}</span>
          </div>
        ))}
      </div>

      {/* Trigger Context */}
      <div className="mb-6 pl-4 border-l-2 border-gray-600 italic text-gray-400 text-xs">
        "<TextBlock id={data.trigKey}>{textConfig[data.trigKey]?.[0] || ''}</TextBlock>"
      </div>

      <button
        onClick={onSelect}
        className="mt-auto w-full py-3 rounded-xl border border-white/20 text-white font-semibold text-sm hover:bg-white hover:text-apzumi-dark transition-all flex items-center justify-center gap-2 group-hover:border-white/40"
      >
        <TextBlock id="serv_card_btn">Zobacz szczegóły</TextBlock> <ArrowRight size={16} />
      </button>
    </div>
  );
};

const ServiceCardV2: React.FC<{
  data: ServiceData;
  isActive: boolean;
}> = ({ data, isActive }) => {
  return (
    <div
      className={`group relative p-8 rounded-3xl transition-all duration-500 overflow-hidden flex flex-col md:flex-row items-center gap-8 border backdrop-blur-sm
        ${isActive
          ? 'bg-[#1e285a]/5 border-[#4a7de8]/50 shadow-md scale-[1.02]'
          : 'bg-white border-gray-200 hover:border-gray-300 shadow-sm'
        }`}
    >
      <div className="flex-1 w-full">
        {/* Chips */}
        <div className="flex flex-wrap gap-2 mb-4">
          {data.chips.map((chip, idx) => (
            <span key={idx} className="bg-gray-100 text-gray-600 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wide">
              {chip}
            </span>
          ))}
        </div>

        <div className="mb-4 md:mb-0">
          <h3 className="text-2xl font-bold text-[#1e285a] mb-2 leading-tight">
            <TextBlock id={data.titleKey}>{textConfig[data.titleKey]?.[0] || ''}</TextBlock>
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed max-w-xl">
            <TextBlock id={data.valKey}>{textConfig[data.valKey]?.[0] || ''}</TextBlock>
          </p>
        </div>
      </div>

      <div className="flex-1 w-full space-y-3">
        {data.bullets.map((bullet, idx) => (
          <div key={idx} className="flex items-start gap-2">
            <CheckCircle2 size={16} className="text-[#4a7de8] shrink-0 mt-0.5" />
            <span className="text-gray-600 text-sm">{bullet}</span>
          </div>
        ))}
      </div>

      <div className="md:w-56 w-full flex-shrink-0 mt-6 md:mt-0">
        <button
          onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          className="w-full py-4 rounded-xl border border-white/20 text-white font-bold text-sm bg-apzumi-red hover:bg-red-600 transition-all flex items-center justify-center shadow-lg shadow-apzumi-red/20"
        >
          <TextBlock id="serv_card_btn_v2">Umów konsultację</TextBlock> <ArrowRight size={16} className="ml-2" />
        </button>
      </div>
    </div>
  );
};

const ServiceCardV3: React.FC<{
  data: ServiceData;
  isActive: boolean;
  onHover: () => void;
}> = ({ data, isActive, onHover }) => {
  return (
    <div
      onMouseEnter={onHover}
      onClick={onHover}
      className={`group relative transition-all duration-500 overflow-hidden flex flex-col cursor-pointer min-h-[400px] bg-white/5 border backdrop-blur-sm
        ${isActive
          ? 'border-white/20 shadow-xl -translate-y-2'
          : 'border-white/10 hover:border-white/15'
        }`}
    >
      {/* Base structured padding */}
      <div className="p-8 md:p-10 flex flex-col h-full z-10 relative">
        <div className="mb-auto">
          {/* Top Tag */}
          <div className="flex flex-wrap gap-2 mb-8">
            <span className="text-gray-400 font-semibold text-[10px] tracking-[0.1em] uppercase border border-gray-600/50 px-3 py-1 bg-black/20">
              {data.chips[0]}
            </span>
          </div>

          {/* Clean Sans-serif Title */}
          <h3 className={`font-bold text-white leading-tight transition-all duration-300 mb-4 
            ${isActive ? 'text-3xl lg:text-4xl' : 'text-2xl'}`}>
            <TextBlock id={data.titleKey}>{textConfig[data.titleKey]?.[0] || ''}</TextBlock>
          </h3>

          <p className="text-gray-300 text-sm md:text-base leading-relaxed tracking-wide font-light">
            <TextBlock id={data.valKey}>{textConfig[data.valKey]?.[0] || ''}</TextBlock>
          </p>
        </div>

        {/* Revealed Clean Content */}
        <div className={`transition-all duration-500 ease-in-out flex flex-col justify-end overflow-hidden
          ${isActive ? 'max-h-[500px] opacity-100 mt-8' : 'max-h-0 opacity-0 mt-0'}
        `}>
          <div className="space-y-4 mb-8">
            {data.bullets.map((bullet, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <span className="text-apzumi-red font-bold text-lg leading-none mt-1 shrink-0">-</span>
                <span className="text-gray-300 font-medium text-sm leading-relaxed tracking-wide">{bullet}</span>
              </div>
            ))}
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="self-start text-white font-bold text-sm hover:text-apzumi-red transition-colors duration-300 flex items-center gap-2 group/btn"
          >
            <TextBlock id="serv_card_btn_v3">Dowiedz się więcej</TextBlock>
            <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Subtle Red Highlight at the bottom indicating active state */}
      <div className={`absolute bottom-0 left-0 w-full h-[4px] bg-apzumi-red transition-all duration-500 origin-left 
         ${isActive ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-30'}`}>
      </div>
    </div>
  );
};

const ServiceSectionV3: React.FC<{
  data: ServiceData;
  isActive: boolean;
  onVisible: () => void;
}> = ({ data, isActive, onVisible }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onVisible();
        }
      },
      { threshold: 0.5, rootMargin: "-10% 0px -10% 0px" }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [onVisible]);

  return (
    <div ref={ref} id={`v3-section-${data.id}`} className="min-h-[80vh] flex flex-col justify-center py-20 pr-0 md:pr-16 relative">
      {/* Category Chips */}
      <div className="flex flex-wrap gap-3 mb-8">
        {data.chips.map((chip, idx) => (
          <span key={idx} className="bg-transparent border border-white/20 text-gray-300 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest">
            {chip}
          </span>
        ))}
      </div>

      {/* Massive Typography Title */}
      <h3 className={`font-bold text-white mb-8 leading-[1.05] transition-all duration-700 ease-out tracking-tight
        ${isActive ? 'text-5xl md:text-7xl lg:text-8xl opacity-100 translate-y-0' : 'text-4xl md:text-5xl lg:text-6xl opacity-30 translate-y-8'}`}>
        <TextBlock id={data.titleKey}>{textConfig[data.titleKey]?.[0] || ''}</TextBlock>
      </h3>

      {/* Value Prop */}
      <p className={`text-xl md:text-3xl font-light leading-relaxed max-w-2xl mb-12 transition-all duration-700 ease-out delay-100
        ${isActive ? 'text-gray-200 opacity-100 translate-y-0' : 'text-gray-500 opacity-0 translate-y-8'}`}>
        <TextBlock id={data.valKey}>{textConfig[data.valKey]?.[0] || ''}</TextBlock>
      </p>

      {/* Simple Bullets */}
      <div className={`space-y-6 mb-16 transition-all duration-700 ease-out delay-200
        ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        {data.bullets.map((bullet, idx) => (
          <div key={idx} className="flex items-center gap-6 border-b border-white/10 pb-6">
            <span className="text-apzumi-red font-mono text-sm opacity-50">0{idx + 1}</span>
            <span className="text-gray-300 text-lg md:text-2xl">{bullet}</span>
          </div>
        ))}
      </div>

      {/* Modern Button */}
      <div className={`transition-all duration-700 ease-out delay-300 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <button
          onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          className="group flex items-center gap-6 text-white text-lg md:text-2xl font-light hover:text-gray-300 transition-colors"
        >
          <span className="relative">
            <TextBlock id="serv_card_btn_v3">Rozpocznij projekt</TextBlock>
            <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-current transition-all duration-500 group-hover:w-full"></span>
          </span>
          <div className="w-14 h-14 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-white group-hover:text-black group-hover:border-white transition-all duration-500">
            <ArrowRight size={24} className="-rotate-45 group-hover:rotate-0 transition-transform duration-500" />
          </div>
        </button>
      </div>
    </div>
  );
};

const V3StickyVisual: React.FC<{ activeSituation: SituationId }> = ({ activeSituation }) => {
  const getColor = () => {
    switch (activeSituation) {
      case 'start': return 'from-fuchsia-600 to-purple-800';
      case 'valid': return 'from-blue-600 to-indigo-800';
      case 'build': return 'from-rose-500 to-orange-700';
      default: return 'from-fuchsia-600 to-purple-800';
    }
  };

  const getShape = () => {
    switch (activeSituation) {
      case 'start': return 'rounded-[100px] rotate-0 scale-100';
      case 'valid': return 'rounded-[300px] rotate-45 scale-110';
      case 'build': return 'rounded-[50px] rotate-90 scale-95';
      default: return 'rounded-[100px] rotate-0 scale-100';
    }
  };

  return (
    <div className="h-screen sticky top-0 flex items-center justify-center overflow-hidden">
      {/* Abstract Shape */}
      <div className={`absolute w-[80%] aspect-square bg-gradient-to-br ${getColor()} ${getShape()} blur-[80px] md:blur-[120px] opacity-60 mix-blend-screen transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]`}></div>

      <div className={`absolute w-[40%] aspect-square bg-white ${getShape()} blur-[80px] opacity-20 mix-blend-overlay transition-all duration-1500 delay-150 ease-[cubic-bezier(0.25,1,0.5,1)]`}></div>

      {/* Floating Glass Box Overlay */}
      <div className="absolute w-[80%] bottom-32 border border-white/10 bg-white/5 backdrop-blur-3xl rounded-3xl p-8 flex flex-col justify-end transition-all duration-700 shadow-2xl">
        <div className="text-white/50 font-mono text-xs uppercase tracking-[0.3em] mb-4">Aktywna Faza</div>
        <div className="text-white text-2xl md:text-4xl font-light tracking-tight">
          {activeSituation === 'start' && "Strategia & Odkrycia"}
          {activeSituation === 'valid' && "Szybkie Prototypowanie"}
          {activeSituation === 'build' && "Architektura Docelowa"}
        </div>
      </div>
    </div>
  );
};

const ServiceDetail: React.FC<{ data: ServiceData }> = ({ data }) => {
  // Tabs now include the 4 items that were previously in the grid + the 2 original bottom tabs
  const [activeTab, setActiveTab] = useState<'who' | 'when' | 'what' | 'effect' | 'process' | 'arts'>('who');

  return (
    <section id={`detail-${data.id}`} className="py-20 border-t border-white/5 bg-apzumi-darker/50">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header - Title, Desc, and Differentiator */}
        <div className="mb-12 pb-8 border-b border-white/5">
          <h3 className="text-4xl font-bold text-white mb-6">
            <TextBlock id={data.titleKey}>{textConfig[data.titleKey]?.[0] || ''}</TextBlock>
          </h3>
          <div className="text-gray-300 text-lg leading-relaxed max-w-5xl space-y-6">
            <p>
              <TextBlock id={data.details.descKey}>{textConfig[data.details.descKey]?.[0] || ''}</TextBlock>
            </p>

            {/* INTEGRATED DIFFERENTIATOR */}
            <div className="flex gap-4 items-start bg-apzumi-red/5 border-l-4 border-apzumi-red p-6 rounded-r-lg">
              <Lightbulb size={24} className="text-apzumi-red shrink-0 mt-1" />
              <div>
                <h4 className="text-apzumi-red text-xs font-bold uppercase tracking-widest mb-1 flex items-center gap-2">
                  <TextBlock id="serv_diff_label">Nasz Wyróżnik</TextBlock>
                </h4>
                <p className="text-white font-medium text-base">
                  <TextBlock id={data.details.diffKey}>{textConfig[data.details.diffKey]?.[0] || ''}</TextBlock>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Unified Tabs Section (Merged Grid + Previous Tabs) */}
        {/* REDUCED PADDING: p-8 -> p-6 */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 relative backdrop-blur-md">

          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-2 mb-8 border-b border-white/10 pb-4">
            {[
              { id: 'who', labelKey: 'serv_label_for_who', icon: Users },
              { id: 'when', labelKey: 'serv_label_when', icon: Target },
              { id: 'what', labelKey: 'serv_label_what', icon: Layers },
              { id: 'effect', labelKey: 'serv_label_effect', icon: TrendingUp },
              { id: 'process', labelKey: 'serv_tab_process', icon: Settings },
              { id: 'arts', labelKey: 'serv_tab_arts', icon: FileText },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-full text-xs md:text-sm font-bold transition-all flex items-center gap-2
                    ${activeTab === tab.id
                    ? 'bg-white text-apzumi-dark'
                    : 'bg-transparent text-gray-400 hover:text-white border border-transparent hover:border-white/10'}`}
              >
                <tab.icon size={16} className={activeTab === tab.id ? 'text-apzumi-red' : ''} />
                <TextBlock id={tab.labelKey}>{textConfig[tab.labelKey]?.[0] || ''}</TextBlock>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {/* REDUCED HEIGHT: min-h-[200px] -> min-h-[120px] */}
          <div className="animate-in fade-in zoom-in-95 duration-300 min-h-[120px]">

            {activeTab === 'who' && (
              <div className="flex items-start gap-6">
                <div className="p-4 bg-[#0f1535] rounded-xl shrink-0 border border-white/10">
                  <Users className="text-gray-300" size={32} />
                </div>
                <div>
                  <h5 className="text-gray-300 font-bold text-xs uppercase mb-3 tracking-widest"><TextBlock id="serv_label_for_who">Dla kogo</TextBlock></h5>
                  <p className="text-white text-lg leading-relaxed"><TextBlock id={data.details.forWhoKey}>{textConfig[data.details.forWhoKey]?.[0] || ''}</TextBlock></p>
                </div>
              </div>
            )}

            {activeTab === 'when' && (
              <div className="flex items-start gap-6">
                <div className="p-4 bg-[#0f1535] rounded-xl shrink-0 border border-white/10">
                  <Target className="text-gray-300" size={32} />
                </div>
                <div>
                  <h5 className="text-gray-300 font-bold text-xs uppercase mb-3 tracking-widest"><TextBlock id="serv_label_when">Sytuacja Klienta</TextBlock></h5>
                  <p className="text-white text-lg leading-relaxed"><TextBlock id={data.details.whenKey}>{textConfig[data.details.whenKey]?.[0] || ''}</TextBlock></p>
                </div>
              </div>
            )}

            {activeTab === 'what' && (
              <div className="flex items-start gap-6">
                <div className="p-4 bg-[#0f1535] rounded-xl shrink-0 border border-white/10">
                  <Layers className="text-gray-300" size={32} />
                </div>
                <div>
                  <h5 className="text-gray-300 font-bold text-xs uppercase mb-3 tracking-widest"><TextBlock id="serv_label_what">Co robimy (Ops)</TextBlock></h5>
                  <p className="text-white text-lg leading-relaxed"><TextBlock id={data.details.whatKey}>{textConfig[data.details.whatKey]?.[0] || ''}</TextBlock></p>
                </div>
              </div>
            )}

            {activeTab === 'effect' && (
              <div className="flex items-start gap-6">
                <div className="p-4 bg-blue-900/20 rounded-xl shrink-0 border border-blue-500/20">
                  <TrendingUp className="text-blue-400" size={32} />
                </div>
                <div>
                  <h5 className="text-blue-400 font-bold text-xs uppercase mb-3 tracking-widest"><TextBlock id="serv_label_effect">Cel / Efekt</TextBlock></h5>
                  <p className="text-white text-lg font-semibold leading-relaxed"><TextBlock id={data.details.effectKey}>{textConfig[data.details.effectKey]?.[0] || ''}</TextBlock></p>
                </div>
              </div>
            )}

            {activeTab === 'process' && (
              <div className="flex items-start gap-6">
                <div className="p-4 bg-green-500/10 rounded-xl shrink-0 border border-green-500/10">
                  <Settings className="text-green-400" size={32} />
                </div>
                <div>
                  <h5 className="text-green-400 font-bold text-xs uppercase mb-3 tracking-widest"><TextBlock id="serv_tab_process">Jak to robimy</TextBlock></h5>
                  <p className="text-gray-200 text-lg whitespace-pre-line leading-relaxed"><TextBlock id={data.details.processKey}>{textConfig[data.details.processKey]?.[0] || ''}</TextBlock></p>
                </div>
              </div>
            )}

            {activeTab === 'arts' && (
              <div className="flex items-start gap-6">
                <div className="p-4 bg-blue-500/10 rounded-xl shrink-0 border border-blue-500/10">
                  <FileText className="text-blue-400" size={32} />
                </div>
                <div>
                  <h5 className="text-blue-400 font-bold text-xs uppercase mb-3 tracking-widest"><TextBlock id="serv_tab_arts">Co dostajesz (Artefakty)</TextBlock></h5>
                  <p className="text-gray-200 text-lg whitespace-pre-line leading-relaxed"><TextBlock id={data.details.artifactsKey}>{textConfig[data.details.artifactsKey]?.[0] || ''}</TextBlock></p>
                </div>
              </div>
            )}
          </div>

          {/* CTA Section */}
          <div className="mt-10 pt-6 border-t border-white/10 flex justify-end">
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-apzumi-red hover:bg-red-600 text-white font-bold py-3 px-8 rounded-full transition-colors shadow-lg shadow-apzumi-red/20 text-sm"
            >
              <TextBlock id={data.btnKey}>{textConfig[data.btnKey]?.[0] || ''}</TextBlock>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

// --- MAIN PAGE COMPONENT ---

const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate, version = 'v1' }) => {
  const [activeSituation, setActiveSituation] = useState<SituationId>('start');
  const { getText } = useTextContext();

  const getBgClass = () => {
    switch (version) {
      case 'v2': return 'bg-apzumi-dark'; // Changed from emerald, but keep body mostly dark
      case 'v1':
      case 'v3':
      default: return 'bg-apzumi-dark';
    }
  };

  const handleSectionVisible = useCallback((sit: SituationId) => {
    setActiveSituation(sit);
  }, []);

  const handleFilter = (sit: SituationId) => {
    setActiveSituation(sit);
    const gridId = 'services-grid';
    const el = document.getElementById(gridId);
    if (el) {
      const y = el.getBoundingClientRect().top + window.pageYOffset - 140;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const scrollToDetail = (id: string) => {
    const el = document.getElementById(`detail-${id}`);
    if (el) {
      const y = el.getBoundingClientRect().top + window.pageYOffset - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className={`${getBgClass()} min-h-screen text-white font-sans selection:bg-apzumi-red selection:text-white transition-colors duration-500`}>

      {/* 1. HERO */}
      <section className={`relative pt-40 pb-20 px-6 overflow-hidden min-h-[70vh] flex items-center ${version === 'v2' ? 'bg-[#1e285a] text-white' : ''}`}>
        {/* Background Gradients */}
        <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-900/20 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto w-full relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 tracking-tight leading-tight">
            <TextBlock id="serv_hero_title">{textConfig['serv_hero_title'][0]}</TextBlock>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-6 leading-relaxed">
            <TextBlock id="serv_hero_lead">{textConfig['serv_hero_lead'][0]}</TextBlock>
          </p>
          <p className="text-sm md:text-base text-gray-400 max-w-2xl mx-auto mb-12 uppercase tracking-wide font-medium">
            <TextBlock id="serv_hero_sublead">{textConfig['serv_hero_sublead'][0]}</TextBlock>
          </p>

          <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-20">
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-apzumi-red hover:bg-red-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-transform hover:scale-105 shadow-[0_0_30px_rgba(240,78,78,0.4)]"
            >
              <TextBlock id="serv_hero_cta_primary">{textConfig['serv_hero_cta_primary'][0]}</TextBlock>
            </button>
            <button
              onClick={() => { onNavigate('solutions'); window.scrollTo(0, 0); }}
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-8 py-4 rounded-full font-bold text-lg backdrop-blur-sm transition-all"
            >
              <TextBlock id="serv_hero_cta_secondary">{textConfig['serv_hero_cta_secondary'][0]}</TextBlock>
            </button>
          </div>

          {/* Trust Row Placeholder */}
          <div className="border-t border-white/10 pt-8 opacity-40 grayscale flex justify-center gap-8 md:gap-16 flex-wrap text-sm font-bold tracking-widest">
            <span>VW</span> • <span>NGK</span> • <span>KAN</span> • <span>HALEON</span> • <span>IMPEL</span> • <span>TAURON</span>
          </div>
        </div>
      </section>

      {/* 2. STICKY FILTER - HIDDEN IN V3 */}
      {version !== 'v3' && (
        <div className={`sticky top-[72px] z-40 backdrop-blur-xl border-y py-6 ${version === 'v2' ? 'bg-white/90 border-gray-200' : 'bg-apzumi-dark/90 border-white/10'}`}>
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className={`text-lg font-bold mb-4 ${version === 'v2' ? 'text-gray-700' : ''}`}>
              <TextBlock id="serv_filter_title">{textConfig['serv_filter_title'][0]}</TextBlock>
            </h2>
            <div className={`inline-flex rounded-full p-1 border ${version === 'v2' ? 'bg-gray-100 border-gray-200' : 'bg-white/5 border-white/10'}`}>
              {[
                { id: 'start', labelKey: 'serv_filter_start' },
                { id: 'valid', labelKey: 'serv_filter_valid' },
                { id: 'build', labelKey: 'serv_filter_build' }
              ].map((opt) => {
                const isActive = activeSituation === opt.id;
                const btnClassV2 = isActive
                  ? 'bg-[#1e285a] text-white shadow-md'
                  : 'text-gray-500 hover:text-[#1e285a]';
                const btnClassDark = isActive
                  ? 'bg-white text-apzumi-dark shadow-md'
                  : 'text-gray-400 hover:text-white';
                return (
                  <button
                    key={opt.id}
                    onClick={() => handleFilter(opt.id as SituationId)}
                    className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${version === 'v2' ? btnClassV2 : btnClassDark}`}
                  >
                    <TextBlock id={opt.labelKey}>{textConfig[opt.labelKey]?.[0] || ''}</TextBlock>
                  </button>
                )
              })}
            </div>

            <div className="mt-4 text-xs text-gray-500 flex items-center justify-center gap-2">
              <span className={`px-2 py-0.5 rounded uppercase font-bold tracking-wider ${version === 'v2' ? 'bg-[#1e285a]/10 text-[#1e285a]' : 'bg-apzumi-red/20 text-apzumi-red'}`}>
                <TextBlock id="serv_rec_label">{textConfig['serv_rec_label'][0]}</TextBlock>
              </span>
              <TextBlock id="serv_filter_desc">{textConfig['serv_filter_desc'][0]}</TextBlock>
            </div>
          </div>
        </div>
      )}

      {/* 3. BENTO GRID */}
      <section id="services-grid" className={`py-20 px-6 relative ${version === 'v2' ? 'bg-gray-50' : ''}`}>
        <div className="max-w-7xl mx-auto relative z-10">
          {version === 'v3' ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 min-h-[500px]">
              {servicesData.map((service, index) => (
                <ServiceCardV3
                  key={service.id}
                  data={service}
                  isActive={activeSituation === service.situation || (activeSituation === 'start' && index === 0 && !servicesData.some(s => s.situation === activeSituation))} // Default to first if none match
                  onHover={() => setActiveSituation(service.situation)}
                />
              ))}
            </div>
          ) : version === 'v2' ? (
            <div className="grid grid-cols-1 gap-6 lg:gap-8">
              {servicesData.map((service) => (
                <div key={service.id} className={`transition-all duration-500
                   ${activeSituation === service.situation ? 'opacity-100 scale-100' : 'opacity-40 scale-95'}`}>
                  <ServiceCardV2
                    data={service}
                    isActive={activeSituation === service.situation}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {servicesData.map((service) => (
                <div key={service.id} className={`transition-all duration-500
                   ${activeSituation === service.situation ? 'opacity-100 scale-100' : 'opacity-40 scale-95'}`}>
                  <ServiceCard
                    data={service}
                    isActive={activeSituation === service.situation}
                    onSelect={() => scrollToDetail(service.id)}
                  />
                </div>
              ))}
            </div>
          )}
          <p className="text-center text-gray-500 text-xs mt-12 mb-4">
            <TextBlock id="serv_grid_note">{textConfig['serv_grid_note'][0]}</TextBlock>
          </p>
        </div>
      </section>

      {/* 4. DETAILS - HIDDEN IN V2 AND V3 */}
      {version !== 'v2' && version !== 'v3' && servicesData.map((service) => (
        <ServiceDetail key={service.id} data={service} />
      ))}

      {/* 5. PROCESS (3 STEPS) - HIDDEN IN V2 AND V3 */}
      {version !== 'v2' && version !== 'v3' && (
        <section className="py-24 bg-white text-apzumi-dark px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-16">
              <TextBlock id="sol_proc_heading">{textConfig['sol_proc_heading'][0]}</TextBlock>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              <div className="hidden md:block absolute top-6 left-0 w-full h-1 bg-gray-200 z-0"></div>
              {[
                { step: "1", titleKey: "sol_proc_step1_title", descKey: "sol_proc_step1_desc" },
                { step: "2", titleKey: "sol_proc_step2_title", descKey: "sol_proc_step2_desc" },
                { step: "3", titleKey: "sol_proc_step3_title", descKey: "sol_proc_step3_desc" }
              ].map((item, idx) => (
                <div key={idx} className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-14 h-14 bg-apzumi-red text-white rounded-full flex items-center justify-center font-bold text-xl mb-6 shadow-xl border-4 border-white">
                    {item.step}
                  </div>
                  <h3 className="font-bold text-xl mb-3">
                    <TextBlock id={item.titleKey}>{textConfig[item.titleKey]?.[0] || ''}</TextBlock>
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
                    <TextBlock id={item.descKey}>{textConfig[item.descKey]?.[0] || ''}</TextBlock>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 8. FINAL FORM */}
      <section id="contact" className="py-24 bg-apzumi-dark px-6 border-t border-white/10">
        <div className="max-w-4xl mx-auto bg-white/5 border border-white/10 rounded-3xl p-8 md:p-16 backdrop-blur-sm">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <TextBlock id="serv_form_heading">{textConfig['serv_form_heading'][0]}</TextBlock>
            </h2>
            <p className="text-gray-400">
              <TextBlock id="serv_form_desc">{textConfig['serv_form_desc'][0]}</TextBlock>
            </p>
          </div>

          <form className="space-y-4 max-w-lg mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder={getText('sol_form_ph_name', "Imię i nazwisko")} className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-apzumi-red transition-colors" />
              <input type="text" placeholder={getText('sol_form_ph_company', "Firma")} className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-apzumi-red transition-colors" />
            </div>
            <input type="email" placeholder={getText('sol_form_ph_email', "E-mail służbowy")} className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-apzumi-red transition-colors" />
            <select className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-gray-300 focus:outline-none focus:border-apzumi-red transition-colors">
              <option>{getText('sol_form_ph_area', "Wybierz obszar...")}</option>
              <option>Produkcja</option>
              <option>Utrzymanie Ruchu</option>
              <option>Jakość</option>
              <option>HR / Szkolenia</option>
              <option>IT</option>
            </select>
            <textarea placeholder={getText('sol_form_ph_msg', "Wiadomość (opcjonalnie)")} rows={4} className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-apzumi-red transition-colors"></textarea>

            <div className="flex items-start gap-3 text-xs text-gray-500 my-4">
              <input type="checkbox" className="mt-1" />
              <span><TextBlock id="sol_form_consent">{textConfig['sol_form_consent'][0]}</TextBlock></span>
            </div>

            <button className="w-full bg-apzumi-red hover:bg-red-600 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-apzumi-red/20">
              <TextBlock id="serv_form_btn">{textConfig['serv_form_btn'][0]}</TextBlock>
            </button>
            <div className="text-center mt-4">
              <button className="text-gray-400 text-sm hover:text-white underline">
                <TextBlock id="serv_form_link">{textConfig['serv_form_link'][0]}</TextBlock>
              </button>
            </div>
          </form>
        </div>
      </section>

    </div>
  );
};

export default ServicesPage;