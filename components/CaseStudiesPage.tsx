import React, { useState } from 'react';
import { 
  ArrowRight, Check, Clock, ChevronDown, 
  Settings, Zap, BarChart3, Play, X, Search
} from 'lucide-react';
import TextBlock from './TextBlock';
import { useTextContext } from '../context/TextContext';
import { CaseStudyItem } from '../types';
import { textConfig } from '../textConfig';

// Extended interface for the rich content from the articles
interface RichCaseStudy extends CaseStudyItem {
  fullContent: {
    heroImage: string;
    challengeKey: string;
    solutionKey: string;
    implementationKey: string;
    quoteKey?: string;
    quoteAuthorKey?: string;
  };
}

const caseStudiesData: RichCaseStudy[] = [
  {
    id: 'kan',
    clientKey: 'cs_kan_client',
    titleKey: 'cs_kan_title',
    descKey: 'cs_kan_desc',
    resultsKeys: ['cs_kan_res_1', 'cs_kan_res_2', 'cs_kan_res_3', 'cs_kan_res_4', 'cs_kan_res_5'],
    tags: {
      area: 'Utrzymanie ruchu',
      tech: 'HoloLens 2',
      industry: 'Manufacturing'
    },
    imageType: 'glasses',
    readTime: '3 min',
    fullContent: {
      heroImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800&h=600', 
      challengeKey: 'cs_kan_chal',
      solutionKey: 'cs_kan_sol',
      implementationKey: 'cs_kan_impl',
      quoteKey: 'cs_kan_quote',
      quoteAuthorKey: 'cs_kan_quote_auth'
    }
  },
  {
    id: 'tauron',
    clientKey: 'cs_tauron_client',
    titleKey: 'cs_tauron_title',
    descKey: 'cs_tauron_desc',
    resultsKeys: ['cs_tauron_res_1', 'cs_tauron_res_2', 'cs_tauron_res_3', 'cs_tauron_res_4', 'cs_tauron_res_5'],
    tags: {
      area: 'Serwis Terenowy',
      tech: 'Remote Assist',
      industry: 'Energy'
    },
    imageType: 'glasses',
    readTime: '5 min',
    fullContent: {
      heroImage: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=800&h=600',
      challengeKey: 'cs_tauron_chal',
      solutionKey: 'cs_tauron_sol',
      implementationKey: 'cs_tauron_impl',
      quoteKey: 'cs_tauron_quote',
      quoteAuthorKey: 'cs_tauron_quote_auth'
    }
  },
  {
    id: 'vw',
    clientKey: 'cs_vw_client',
    titleKey: 'cs_vw_title',
    descKey: 'cs_vw_desc',
    resultsKeys: ['cs_vw_res_1', 'cs_vw_res_2', 'cs_vw_res_3', 'cs_vw_res_4', 'cs_vw_res_5'],
    tags: {
      area: 'Logistyka',
      tech: 'AR Planning',
      industry: 'Automotive'
    },
    imageType: 'tablet',
    readTime: '2 min',
    fullContent: {
      heroImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800&h=600',
      challengeKey: 'cs_vw_chal',
      solutionKey: 'cs_vw_sol',
      implementationKey: 'cs_vw_impl',
      quoteKey: 'cs_vw_quote',
      quoteAuthorKey: 'cs_vw_quote_auth'
    }
  }
];

const CaseStudyCard: React.FC<{ data: RichCaseStudy; index: number }> = ({ data, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Dynamic color for tags based on index to add variety
  const tagColors = [
    'bg-blue-100 text-blue-700 border-blue-200',
    'bg-emerald-100 text-emerald-700 border-emerald-200',
    'bg-purple-100 text-purple-700 border-purple-200'
  ];
  const currentTagColor = tagColors[index % tagColors.length];

  return (
    <div 
      className={`group bg-white rounded-[2rem] shadow-sm hover:shadow-2xl transition-all duration-500 mb-10 border border-gray-100 overflow-hidden
      ${isExpanded ? 'ring-2 ring-apzumi-red/10 shadow-xl' : ''}`}
    >
      {/* CARD HEADER (Always Visible) - Now split Image/Content */}
      <div 
        onClick={() => setIsExpanded(!isExpanded)}
        className="cursor-pointer flex flex-col md:flex-row min-h-[280px]"
      >
        {/* LEFT: Graphics Area */}
        <div className="md:w-5/12 relative overflow-hidden h-64 md:h-auto bg-gray-100">
           {/* Image with overlay */}
           <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
             <img 
               src={data.fullContent.heroImage} 
               alt="Case Study Thumbnail" 
               className="w-full h-full object-cover"
             />
             <div className="absolute inset-0 bg-gradient-to-tr from-apzumi-dark/40 to-transparent mix-blend-multiply" />
           </div>

           {/* Floating Client Badge on Image */}
           <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg border border-white/50 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-apzumi-red animate-pulse"></div>
              <span className="font-bold text-apzumi-dark text-sm tracking-wide">
                <TextBlock id={data.clientKey}>{textConfig[data.clientKey]?.[0] || ''}</TextBlock>
              </span>
           </div>

           {/* Read Time Badge */}
           <div className="absolute bottom-6 left-6 text-white text-xs font-medium flex items-center gap-1.5 bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-sm">
              <Clock size={12} /> {data.readTime}
           </div>
        </div>

        {/* RIGHT: Content Area */}
        <div className="md:w-7/12 p-8 md:p-10 flex flex-col justify-between relative bg-white">
           <div>
              {/* Tags Row */}
              <div className="flex flex-wrap gap-2 mb-6">
                 <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${currentTagColor}`}>
                   {data.tags.area}
                 </span>
                 <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gray-50 text-gray-500 border border-gray-200">
                   {data.tags.industry}
                 </span>
              </div>

              {/* Title */}
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight group-hover:text-blue-700 transition-colors">
                 <TextBlock id={data.titleKey}>{textConfig[data.titleKey]?.[0] || ''}</TextBlock>
              </h3>

              {/* Short Description */}
              <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-6">
                 <TextBlock id={data.descKey}>{textConfig[data.descKey]?.[0] || ''}</TextBlock>
              </p>
           </div>

           {/* Bottom Action Row */}
           <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-50">
              <div className="flex items-center gap-3">
                 <div className="flex -space-x-2">
                    {/* Fake avatars for "Team" feel */}
                    <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white"></div>
                    <div className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white"></div>
                 </div>
                 <span className="text-xs text-gray-400 font-medium">Zespół projektowy</span>
              </div>
              
              <button className="flex items-center gap-2 text-sm font-bold text-apzumi-dark group-hover:text-apzumi-red transition-colors">
                {isExpanded ? 'Zwiń szczegóły' : 'Zobacz case study'}
                <div className={`w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center transition-all group-hover:bg-apzumi-red group-hover:text-white ${isExpanded ? 'rotate-180' : ''}`}>
                   <ChevronDown size={16} />
                </div>
              </button>
           </div>
        </div>
      </div>

      {/* EXPANDED CONTENT DETAILS */}
      {isExpanded && (
        <div className="bg-gray-50/50 border-t border-gray-100 animate-in slide-in-from-top-4 duration-500 ease-out">
          <div className="p-8 md:p-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Main Narrative */}
            <div className="lg:col-span-2 space-y-10">
               <div className="prose prose-blue max-w-none">
                  {/* Challenge */}
                  <div className="mb-8">
                     <h4 className="flex items-center gap-3 text-sm font-bold text-gray-900 uppercase tracking-widest mb-4">
                        <span className="w-8 h-1 bg-red-500 rounded-full"></span>
                        Wyzwanie
                     </h4>
                     <p className="text-gray-600 leading-relaxed text-lg">
                        <TextBlock id={data.fullContent.challengeKey}>
                           {textConfig[data.fullContent.challengeKey]?.[0] || ''}
                        </TextBlock>
                     </p>
                  </div>

                  {/* Solution */}
                  <div className="mb-8">
                     <h4 className="flex items-center gap-3 text-sm font-bold text-gray-900 uppercase tracking-widest mb-4">
                        <span className="w-8 h-1 bg-blue-500 rounded-full"></span>
                        Rozwiązanie
                     </h4>
                     <p className="text-gray-600 leading-relaxed text-lg">
                        <TextBlock id={data.fullContent.solutionKey}>
                           {textConfig[data.fullContent.solutionKey]?.[0] || ''}
                        </TextBlock>
                     </p>
                  </div>

                  {/* Implementation */}
                  <div>
                     <h4 className="flex items-center gap-3 text-sm font-bold text-gray-900 uppercase tracking-widest mb-4">
                        <span className="w-8 h-1 bg-green-500 rounded-full"></span>
                        Wdrożenie
                     </h4>
                     <p className="text-gray-600 leading-relaxed">
                        <TextBlock id={data.fullContent.implementationKey}>
                           {textConfig[data.fullContent.implementationKey]?.[0] || ''}
                        </TextBlock>
                     </p>
                  </div>
               </div>
            </div>

            {/* Sidebar Results */}
            <div className="lg:col-span-1">
               <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 sticky top-24">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                     <BarChart3 size={16} className="text-apzumi-red" /> Kluczowe Wyniki
                  </h4>
                  <ul className="space-y-4">
                    {data.resultsKeys.map((resKey, i) => (
                      <li key={i} className="flex items-start gap-3 group/item">
                        <div className="mt-1 p-1 rounded-full bg-green-100 text-green-600 group-hover/item:bg-green-500 group-hover/item:text-white transition-colors">
                           <Check size={12} strokeWidth={4} />
                        </div>
                        <span className="text-sm font-bold text-gray-700 leading-snug">
                           <TextBlock id={resKey}>{textConfig[resKey]?.[0] || ''}</TextBlock>
                        </span>
                      </li>
                    ))}
                  </ul>

                  {data.fullContent.quoteKey && (
                     <div className="mt-8 pt-8 border-t border-gray-100">
                        <p className="italic text-gray-500 text-sm mb-4">
                          "<TextBlock id={data.fullContent.quoteKey}>
                             {textConfig[data.fullContent.quoteKey]?.[0] || ''}
                           </TextBlock>"
                        </p>
                        <div className="flex items-center gap-3">
                           <div className="w-8 h-8 bg-apzumi-dark rounded-full flex items-center justify-center text-white font-bold text-xs">
                              <TextBlock id={data.fullContent.quoteAuthorKey}>
                                 {textConfig[data.fullContent.quoteAuthorKey]?.[0] || ''}
                              </TextBlock>
                              {/* Using charAt(0) logic inside JSX would require pure string, so we just simplify to show first letter if possible, but TextBlock returns element. 
                                  Simplification: Just show generic user icon or letter 'A' if name is complex component, 
                                  OR extract first char from default config for the avatar circle. 
                              */}
                           </div>
                           <div>
                              <p className="text-xs font-bold text-gray-900">
                                 <TextBlock id={data.fullContent.quoteAuthorKey}>
                                    {textConfig[data.fullContent.quoteAuthorKey]?.[0] || ''}
                                 </TextBlock>
                              </p>
                              <p className="text-[10px] text-gray-400 uppercase">Klient</p>
                           </div>
                        </div>
                     </div>
                  )}
               </div>
            </div>

          </div>
          
          <div className="bg-white p-4 border-t border-gray-100 flex justify-center">
             <button 
                onClick={(e) => { e.stopPropagation(); setIsExpanded(false); }}
                className="text-gray-400 hover:text-apzumi-dark text-sm font-bold flex items-center gap-2 transition-colors px-4 py-2"
             >
                <X size={14} /> Zamknij
             </button>
          </div>
        </div>
      )}
    </div>
  );
};

const CaseStudiesPage: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      
      {/* 1. HERO */}
      <section className="bg-gradient-to-br from-apzumi-dark to-[#0a0f29] text-white pt-40 pb-20 px-6 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-apzumi-red/10 blur-[100px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 blur-[80px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
            <TextBlock id="cs_hero_title">{textConfig['cs_hero_title'][0]}</TextBlock>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed">
            <TextBlock id="cs_hero_lead">{textConfig['cs_hero_lead'][0]}</TextBlock>
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            <button className="bg-apzumi-red hover:bg-red-600 text-white font-bold py-4 px-8 rounded-full shadow-lg shadow-apzumi-red/25 transition-transform hover:scale-105">
              <TextBlock id="cs_hero_cta_primary">{textConfig['cs_hero_cta_primary'][0]}</TextBlock>
            </button>
            <button className="bg-white/10 hover:bg-white/20 text-white font-bold py-4 px-8 rounded-full backdrop-blur-sm border border-white/20 transition-all">
              <TextBlock id="cs_hero_cta_secondary">{textConfig['cs_hero_cta_secondary'][0]}</TextBlock>
            </button>
          </div>

          {/* Proof Strip */}
          <div className="border-t border-white/10 pt-8 flex flex-col items-center">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">
              <TextBlock id="cs_proof_label">{textConfig['cs_proof_label'][0]}</TextBlock>
            </p>
            <div className="flex gap-8 md:gap-12 opacity-40 grayscale items-center justify-center flex-wrap">
               <span className="text-xl font-bold font-serif">KAN</span>
               <span className="text-xl font-bold flex items-center gap-1"><Zap size={20} /> TAURON</span>
               <span className="text-xl font-bold">Volkswagen</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CASE LIST - No Filter Bar anymore */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          {caseStudiesData.map((item, idx) => (
            <CaseStudyCard key={item.id} data={item} index={idx} />
          ))}
        </div>
      </section>

      {/* 3. PROCESS RECAP */}
      <section className="bg-white py-24 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
           <h2 className="text-3xl font-bold text-apzumi-dark mb-16">
             <TextBlock id="cs_proc_heading">{textConfig['cs_proc_heading'][0]}</TextBlock>
           </h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              {/* Line */}
              <div className="hidden md:block absolute top-8 left-0 w-full h-0.5 bg-gray-100 z-0"></div>
              
              {[
                { step: 1, icon: Search, id: '1' },
                { step: 2, icon: Settings, id: '2' },
                { step: 3, icon: BarChart3, id: '3' }
              ].map((s) => (
                <div key={s.step} className="relative z-10 flex flex-col items-center">
                   <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 shadow-xl border-4 border-white text-white font-bold text-xl
                     ${s.step === 2 ? 'bg-apzumi-red' : 'bg-apzumi-dark'}`}>
                     <s.icon size={24} />
                   </div>
                   <h3 className="font-bold text-lg mb-2">
                     <TextBlock id={`cs_proc_${s.id}_title`}>{textConfig[`cs_proc_${s.id}_title`]?.[0] || ''}</TextBlock>
                   </h3>
                   <p className="text-gray-500 text-sm">
                     <TextBlock id={`cs_proc_${s.id}_desc`}>{textConfig[`cs_proc_${s.id}_desc`]?.[0] || ''}</TextBlock>
                   </p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* 4. FINAL CTA (Premium Block) */}
      <section className="py-24 px-6 bg-apzumi-darker">
         <div className="max-w-5xl mx-auto bg-gradient-to-br from-apzumi-dark to-blue-900 rounded-[2.5rem] p-10 md:p-16 text-center relative overflow-hidden border border-white/10 shadow-2xl">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-apzumi-red/20 blur-[80px] rounded-full"></div>

            <div className="relative z-10">
               <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                 <TextBlock id="cs_form_heading">{textConfig['cs_form_heading'][0]}</TextBlock>
               </h2>
               <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10">
                 <TextBlock id="cs_form_desc">{textConfig['cs_form_desc'][0]}</TextBlock>
               </p>

               <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 md:p-8 max-w-3xl mx-auto border border-white/10 text-left">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                     <input type="text" placeholder="Imię i nazwisko" className="bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-apzumi-red transition-colors" />
                     <input type="email" placeholder="E-mail służbowy" className="bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-apzumi-red transition-colors" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                     <input type="text" placeholder="Firma" className="bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-apzumi-red transition-colors" />
                     <select className="bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-gray-400 focus:outline-none focus:border-apzumi-red transition-colors">
                        <option>Wybierz obszar...</option>
                        <option>Produkcja</option>
                        <option>Utrzymanie Ruchu</option>
                        <option>Logistyka</option>
                        <option>Jakość</option>
                     </select>
                  </div>
                  <textarea rows={3} placeholder="Wiadomość (opcjonalnie)" className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-apzumi-red transition-colors mb-6"></textarea>
                  
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                     <label className="flex items-center gap-2 text-xs text-gray-400 cursor-pointer">
                        <input type="checkbox" className="rounded bg-black/20 border-white/20" />
                        <span>Akceptuję politykę prywatności</span>
                     </label>
                     <button className="bg-apzumi-red hover:bg-red-600 text-white font-bold py-3 px-8 rounded-full shadow-lg shadow-red-900/20 transition-all w-full md:w-auto">
                        <TextBlock id="cs_form_btn">{textConfig['cs_form_btn'][0]}</TextBlock>
                     </button>
                  </div>
               </div>
               
               <p className="mt-8 text-xs text-gray-500 font-mono">
                  Lub napisz bezpośrednio: <span className="text-white hover:underline cursor-pointer">contact@apzumi.com</span>
               </p>
            </div>
         </div>
      </section>

    </div>
  );
};

export default CaseStudiesPage;