import React, { useState } from 'react';
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

const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate }) => {
  const [activeSituation, setActiveSituation] = useState<SituationId>('start');
  const { getText } = useTextContext();

  const handleFilter = (sit: SituationId) => {
    setActiveSituation(sit);
    const el = document.getElementById('services-grid');
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
    <div className="bg-apzumi-dark min-h-screen text-white font-sans selection:bg-apzumi-red selection:text-white">

      {/* 1. HERO */}
      <section className="relative pt-40 pb-20 px-6 overflow-hidden min-h-[70vh] flex items-center">
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

      {/* 2. STICKY FILTER */}
      <div className="sticky top-[72px] z-40 bg-apzumi-dark/90 backdrop-blur-xl border-y border-white/10 py-6">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-lg font-bold mb-4">
            <TextBlock id="serv_filter_title">{textConfig['serv_filter_title'][0]}</TextBlock>
          </h2>
          <div className="inline-flex bg-white/5 rounded-full p-1 border border-white/10">
            {[
              { id: 'start', labelKey: 'serv_filter_start' },
              { id: 'valid', labelKey: 'serv_filter_valid' },
              { id: 'build', labelKey: 'serv_filter_build' }
            ].map((opt) => (
              <button
                key={opt.id}
                onClick={() => handleFilter(opt.id as SituationId)}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all
                    ${activeSituation === opt.id
                    ? 'bg-white text-apzumi-dark shadow-md'
                    : 'text-gray-400 hover:text-white'}`}
              >
                <TextBlock id={opt.labelKey}>{textConfig[opt.labelKey]?.[0] || ''}</TextBlock>
              </button>
            ))}
          </div>

          <div className="mt-4 text-xs text-gray-500 flex items-center justify-center gap-2">
            <span className="bg-apzumi-red/20 text-apzumi-red px-2 py-0.5 rounded uppercase font-bold tracking-wider">
              <TextBlock id="serv_rec_label">{textConfig['serv_rec_label'][0]}</TextBlock>
            </span>
            <TextBlock id="serv_filter_desc">{textConfig['serv_filter_desc'][0]}</TextBlock>
          </div>
        </div>
      </div>

      {/* 3. BENTO GRID */}
      <section id="services-grid" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
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
          <p className="text-center text-gray-500 text-xs mt-8">
            <TextBlock id="serv_grid_note">{textConfig['serv_grid_note'][0]}</TextBlock>
          </p>
        </div>
      </section>

      {/* 4. DETAILS */}
      {servicesData.map((service) => (
        <ServiceDetail key={service.id} data={service} />
      ))}

      {/* 5. PROCESS (3 STEPS) */}
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