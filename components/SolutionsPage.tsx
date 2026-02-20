import React, { useState } from 'react';
import {
  ArrowRight, CheckCircle2, Zap, BrainCircuit, Users, Eye,
  FileText, Activity, ShieldCheck, Layers, Settings
} from 'lucide-react';
import TextBlock from './TextBlock';
import { useTextContext } from '../context/TextContext';
import { ViewState } from '../App';

interface SolutionsPageProps {
  onNavigate?: (view: ViewState) => void;
}

// --- DATA STRUCTURES ---

type SolutionId = 'proc' | 'remote' | 'skills' | 'cv';
type CategoryId = 'all' | 'production' | 'maintenance' | 'hr' | 'quality';

interface SolutionData {
  id: SolutionId;
  category: CategoryId;
  title: string;
  valueLine: string;
  bullets: string[];
  effects: string[];
  trigger: string;
  details: {
    problem: string;
    how: string;
    what: string;
    who: string;
  };
}

const solutionsData: SolutionData[] = [
  {
    id: 'proc',
    category: 'production',
    title: 'Zdigitalizowane procedury dla produkcji',
    valueLine: 'Zamień papier i rozproszone pliki w ustandaryzowane procedury krok-po-kroku z asystentem AI.',
    bullets: [
      'Digitalizacja dokumentów (foto → treść → procedura)',
      'Procedury z wideo, zdjęciami i potwierdzeniami kroków',
      'AI Agent (głos/tekst): wyszukiwanie w DTR i doprecyzowanie instrukcji'
    ],
    effects: [
      '↓ przestoje nawet o 20%',
      '↓ onboarding nowych pracowników do 50%',
      '↑ OEE nawet do ~90%'
    ],
    trigger: 'Awaria i długi przestój, bo zabrakło kompetentnej osoby lub szybkiego dostępu do wiedzy.',
    details: {
      problem: 'Rozproszona dokumentacja, brak wersjonowania i różny sposób wykonywania tych samych czynności. Trudny transfer wiedzy, brak potwierdzeń kroków krytycznych i wolne wyszukiwanie informacji w DTR.',
      how: 'Digitalizujemy dokumenty i zamieniamy je w wykonywalne procedury krok-po-kroku. Pracownik realizuje zadania w aplikacji mobilnej/tabletowej lub na smart okularach (AR). AI Agent pomaga znaleźć właściwe informacje i doprecyzować instrukcje.',
      what: 'Aplikacja dla pracownika (mobile/tablet), opcjonalnie AR na smart okularach, panel web dla managera (raporty, Excel/PDF), baza wiedzy (DTR/manuale/filmy) + integracje (ERP/MES/CMMS).',
      who: 'Plant/Production/Ops management, liderzy zmian, brygadziści, lean/BHP, koordynatorzy optymalizacji, NPI/Engineering.'
    }
  },
  {
    id: 'remote',
    category: 'maintenance',
    title: 'Audio-wizualne wsparcie dla pracowników (Remote Assist)',
    valueLine: 'Wolne ręce, szybka diagnoza i zdalna asysta eksperta — na smart okularach, z automatyczną transkrypcją i bazą wiedzy.',
    bullets: [
      'Dwukierunkowe audio/wideo + AR wskazówki',
      'Transkrypcja rozmów → notatki/procedury i aktualizacja bazy wiedzy',
      'Tryb szkoleń: zdalny trener + AI asystent'
    ],
    effects: [
      '↓ przestoje nawet o 20%',
      '↑ First Time Fix Rate',
      '↓ utrata wiedzy nawet o 90%'
    ],
    trigger: 'Potrzebujesz natychmiastowego wsparcia przy awarii bez czekania na przyjazd serwisu.',
    details: {
      problem: 'Brak szybkiej, wizualnej komunikacji z ekspertem. Błędna diagnoza awarii, długie przestoje, brak historii napraw i materiałów szkoleniowych.',
      how: 'Pracownik łączy się z ekspertem przez smart okulary (wolne ręce). Rozmowy są transkrybowane, a wiedza trafia do bazy i może zamieniać się w procedury.',
      what: 'Aplikacja na smart okulary (audio/wideo/AR), panel web (historia, transkrypcje, raporty), AI asystent do podpowiedzi i wyszukiwania.',
      who: 'Maintenance/Service management, assets/UR, kierownicy serwisu, zespoły szkoleniowe.'
    }
  },
  {
    id: 'skills',
    category: 'hr',
    title: 'Matryca kompetencji i alokacja zadań (Skills Matrix + AI)',
    valueLine: 'Obiektywna matryca kompetencji budowana na podstawie realnie wykonanych zadań — z podpowiedziami i automatycznym przydziałem.',
    bullets: [
      'Kompetencje rosną wraz z wykonanymi zadaniami i procedurami',
      'Podpowiedzi: kto pasuje do zadania, a kto powinien budować kompetencje',
      'Tryb auto-alokacji: AI dobiera ludzi wg umiejętności i dostępności'
    ],
    effects: [
      '↓ ryzyko błędnych przydziałów i opóźnień',
      '↑ przejrzystość rozwoju i planowania'
    ],
    trigger: 'Harmonogramy i przydziały robione ręcznie, na subiektywnych ocenach.',
    details: {
      problem: 'Ocena kompetencji i planowanie pracy ręcznie, bez obiektywnych danych. Trudno planować rozwój i dobierać ludzi do zadań.',
      how: 'Zliczamy wykonane zadania/procedury i budujemy skills matrix. AI wspiera harmonogramowanie: podpowiada i (opcjonalnie) automatyzuje przydział.',
      what: 'Aplikacja web dla managera i HR (kompetencje, ścieżki rozwoju), moduł dla harmonogramisty (rekomendacje/auto-alokacja).',
      who: 'HR/People development, head of transformation/innovation, planista/harmonogramista, team coach.'
    }
  },
  {
    id: 'cv',
    category: 'quality',
    title: 'Automatyzacja kontroli jakości (Computer Vision)',
    valueLine: 'Wykrywanie błędów i zanieczyszczeń na linii w czasie rzeczywistym — alarm wizualny i dźwiękowy + monitoring dla QA.',
    bullets: [
      'Model CV wykrywa obiekty (np. blistry, kartoniki, pozostałości)',
      'Działa na: smart okulary / kamera stacjonarna / kamera noszona / robot',
      'Dashboard QA: monitoring, dowody, redukcja reklamacji'
    ],
    effects: [
      '↓ reklamacje nawet o 50%',
      '↓ koszty obsługi reklamacji',
      '↓ liczba osób w podwójnej kontroli'
    ],
    trigger: 'Mimo double-check nadal trafiają się pozostałości — ryzyko reklamacji i kosztów.',
    details: {
      problem: 'Podwójna kontrola nadal nie eliminuje błędów. Ryzyko reklamacji, kosztów i strat logistycznych.',
      how: 'Sieć neuronowa wykrywa zadane obiekty w obszarze kontroli. Pracownik dostaje alert wizualny i dźwiękowy. QA ma monitoring i dowody procesu.',
      what: 'Aplikacja AI (na urządzeniu: okulary/kamera/robot), panel QA, możliwość skalowania na kolejne linie.',
      who: 'Quality/GMP management, operatorzy linii, digital engineering, transformation/automation.'
    }
  }
];

// --- COMPONENTS ---

const SolutionCard: React.FC<{
  data: SolutionData;
  isActive: boolean;
  onSelect: () => void
}> = ({ data, isActive, onSelect }) => {
  return (
    <div
      className={`group relative p-8 rounded-3xl transition-all duration-500 overflow-hidden flex flex-col h-full border
        ${isActive
          ? 'bg-blue-900/30 border-apzumi-red/50 shadow-[0_0_40px_rgba(240,78,78,0.15)] scale-[1.02]'
          : 'bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10'
        } backdrop-blur-sm`}
    >
      {/* Trigger Callout */}
      {isActive && (
        <div className="absolute top-0 left-0 w-full bg-apzumi-red/90 text-white text-xs font-bold px-6 py-2 uppercase tracking-wider animate-in slide-in-from-top-2">
          <TextBlock id="sol_grid_rec_label">Rekomendowane dla Ciebie</TextBlock>
        </div>
      )}

      <div className="mt-6 mb-4">
        <h3 className="text-2xl font-bold text-white mb-3 leading-tight">
          <TextBlock id={`sol_item_${data.id}_title`}>{data.title}</TextBlock>
        </h3>
        <p className="text-gray-300 text-sm leading-relaxed min-h-[40px]">
          <TextBlock id={`sol_item_${data.id}_val`}>{data.valueLine}</TextBlock>
        </p>
      </div>

      <div className="space-y-3 mb-8 flex-grow">
        {data.bullets.map((bullet, idx) => (
          <div key={idx} className="flex items-start gap-2">
            <CheckCircle2 size={16} className="text-apzumi-red shrink-0 mt-0.5" />
            <span className="text-gray-400 text-xs">
              <TextBlock id={`sol_item_${data.id}_bull_${idx}`}>{bullet}</TextBlock>
            </span>
          </div>
        ))}
      </div>

      <div className="bg-black/20 rounded-xl p-4 mb-6 border border-white/5">
        <div className="text-[10px] uppercase tracking-widest text-gray-500 mb-2 font-bold">
          <TextBlock id="sol_grid_effects_label">Potencjalne efekty</TextBlock>
        </div>
        <div className="space-y-1">
          {data.effects.map((effect, idx) => (
            <div key={idx} className="text-green-400 text-xs font-mono font-bold">
              <TextBlock id={`sol_item_${data.id}_eff_${idx}`}>{effect}</TextBlock>
            </div>
          ))}
        </div>
      </div>

      {/* Trigger Context */}
      <div className="mb-6 pl-4 border-l-2 border-gray-600 italic text-gray-400 text-xs">
        "<TextBlock id={`sol_item_${data.id}_trig`}>{data.trigger}</TextBlock>"
      </div>

      <button
        onClick={onSelect}
        className="mt-auto w-full py-3 rounded-xl border border-white/20 text-white font-semibold text-sm hover:bg-white hover:text-apzumi-dark transition-all flex items-center justify-center gap-2 group-hover:border-white/40"
      >
        <TextBlock id="sol_grid_btn_details">Zobacz szczegóły</TextBlock> <ArrowRight size={16} />
      </button>
    </div>
  );
};

const DetailSection: React.FC<{ data: SolutionData; id: string }> = ({ data, id }) => {
  const [activeTab, setActiveTab] = useState<'problem' | 'how' | 'what' | 'who'>('problem');

  return (
    <section id={id} className="py-24 border-t border-white/5 bg-apzumi-darker/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Header */}
          <div className="lg:col-span-1">
            <h3 className="text-3xl font-bold text-white mb-4">
              <TextBlock id={`sol_item_${data.id}_title`}>{data.title}</TextBlock>
            </h3>
            <p className="text-gray-400 mb-8 text-lg">
              <TextBlock id={`sol_item_${data.id}_val`}>{data.valueLine}</TextBlock>
            </p>
            <div className="hidden lg:block">
              <button className="bg-apzumi-red hover:bg-red-600 text-white font-bold py-3 px-8 rounded-full transition-colors w-full shadow-lg shadow-apzumi-red/20">
                <TextBlock id={`sol_item_${data.id}_btn`}>
                  {data.id === 'proc' ? "Porozmawiajmy o procedurach w Twojej fabryce" :
                    data.id === 'remote' ? "Umów demo Remote Assist" :
                      data.id === 'skills' ? "Zobacz, jak działa Skills Matrix" :
                        "Porozmawiajmy o Computer Vision"}
                </TextBlock>
              </button>
            </div>
          </div>

          {/* Content Tabs */}
          <div className="lg:col-span-2">
            <div className="flex flex-wrap gap-2 mb-8">
              {[
                { id: 'problem', labelId: 'sol_tab_problem', default: 'Problem' },
                { id: 'how', labelId: 'sol_tab_how', default: 'Jak działa' },
                { id: 'what', labelId: 'sol_tab_what', default: 'Co dostajesz' },
                { id: 'who', labelId: 'sol_tab_who', default: 'Dla kogo' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-6 py-2 rounded-full text-sm font-bold transition-all
                    ${activeTab === tab.id
                      ? 'bg-white text-apzumi-dark'
                      : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
                >
                  <TextBlock id={tab.labelId}>{tab.default}</TextBlock>
                </button>
              ))}
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 min-h-[250px] relative overflow-hidden backdrop-blur-md">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Activity size={120} className="text-white" />
              </div>

              <div className="relative z-10 animate-in fade-in zoom-in-95 duration-300" key={activeTab}>
                {activeTab === 'problem' && (
                  <p className="text-xl text-gray-200 leading-relaxed">
                    <TextBlock id={`sol_item_${data.id}_det_prob`}>{data.details.problem}</TextBlock>
                  </p>
                )}
                {activeTab === 'how' && (
                  <p className="text-xl text-gray-200 leading-relaxed">
                    <TextBlock id={`sol_item_${data.id}_det_how`}>{data.details.how}</TextBlock>
                  </p>
                )}
                {activeTab === 'what' && (
                  <p className="text-xl text-gray-200 leading-relaxed">
                    <TextBlock id={`sol_item_${data.id}_det_what`}>{data.details.what}</TextBlock>
                  </p>
                )}
                {activeTab === 'who' && (
                  <p className="text-xl text-gray-200 leading-relaxed">
                    <TextBlock id={`sol_item_${data.id}_det_who`}>{data.details.who}</TextBlock>
                  </p>
                )}
              </div>
            </div>

            <div className="lg:hidden mt-8">
              <button className="bg-apzumi-red hover:bg-red-600 text-white font-bold py-3 px-8 rounded-full transition-colors w-full">
                <TextBlock id={`sol_item_${data.id}_btn`}>Zobacz więcej</TextBlock>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- MAIN PAGE COMPONENT ---

const SolutionsPage: React.FC<SolutionsPageProps> = ({ onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState<CategoryId>('all');
  const { getText } = useTextContext();

  const scrollToGrid = () => {
    const el = document.getElementById('solutions-grid');
    if (el) {
      // Offset for sticky header
      const y = el.getBoundingClientRect().top + window.pageYOffset - 140;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleFilter = (cat: CategoryId) => {
    setActiveCategory(cat);
    if (cat !== 'all') {
      scrollToGrid();
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

      {/* 1. HERO SECTION */}
      <section className="relative pt-40 pb-20 px-6 overflow-hidden min-h-[70vh] flex items-center">
        {/* Background Gradients */}
        <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-apzumi-red/10 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto w-full relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight leading-tight">
            <TextBlock id="sol_page_hero_title">Rozwiązania Apzumi Spatial</TextBlock><br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-apzumi-red">
              <TextBlock id="sol_page_hero_title_suffix">dla produkcji</TextBlock>
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-4 leading-relaxed">
            <TextBlock id="sol_page_hero_lead">
              Jedna platforma, która łączy ludzi, procedury i wiedzę w jednym workflow — wspierana przez AI i Spatial Computing.
            </TextBlock>
          </p>
          <p className="text-sm md:text-base text-gray-400 max-w-2xl mx-auto mb-12 uppercase tracking-wide font-medium">
            <TextBlock id="sol_page_hero_sublead">
              Wybierz gotowe rozwiązanie dla swojego obszaru i zobacz, jak szybko dowozimy efekt: od pilota do skali.
            </TextBlock>
          </p>

          <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-20">
            <button
              onClick={() => onNavigate?.('interactive_demo')}
              className="bg-apzumi-red hover:bg-red-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-transform hover:scale-105 shadow-[0_0_30px_rgba(240,78,78,0.4)]"
            >
              <TextBlock id="sol_page_hero_cta_demo">Umów demo</TextBlock>
            </button>
            <button className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-8 py-4 rounded-full font-bold text-lg backdrop-blur-sm transition-all">
              <TextBlock id="sol_page_hero_cta_cases">Zobacz case studies</TextBlock>
            </button>
          </div>

          {/* Trust Row Placeholder */}
          <div className="border-t border-white/10 pt-8 opacity-40 grayscale flex justify-center gap-8 md:gap-16 flex-wrap text-sm font-bold tracking-widest">
            <span>VW</span> • <span>NGK</span> • <span>KAN</span> • <span>HALEON</span> • <span>IMPEL</span> • <span>TAURON</span>
          </div>
        </div>
      </section>

      {/* 2. STICKY FILTER NAV */}
      <div className="sticky top-[72px] z-40 bg-apzumi-dark/80 backdrop-blur-xl border-y border-white/10 py-4">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm font-bold text-gray-400 hidden md:block">
            <TextBlock id="sol_page_filter_label">Wybierz obszar:</TextBlock>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              { id: 'all', labelId: 'sol_filter_all', default: 'Wszystkie' },
              { id: 'production', labelId: 'sol_filter_production', default: 'Produkcja' },
              { id: 'maintenance', labelId: 'sol_filter_maintenance', default: 'Utrzymanie ruchu' },
              { id: 'hr', labelId: 'sol_filter_hr', default: 'HR & Kompetencje' },
              { id: 'quality', labelId: 'sol_filter_quality', default: 'Jakość' }
            ].map((filter) => (
              <button
                key={filter.id}
                onClick={() => handleFilter(filter.id as CategoryId)}
                className={`px-4 py-2 rounded-full text-xs md:text-sm font-bold transition-all border
                   ${activeCategory === filter.id
                    ? 'bg-white text-apzumi-dark border-white shadow-[0_0_15px_rgba(255,255,255,0.3)]'
                    : 'bg-transparent text-gray-400 border-white/10 hover:border-white/30 hover:text-white'}`}
              >
                <TextBlock id={filter.labelId}>{filter.default}</TextBlock>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3. BENTO GRID - SOLUTIONS */}
      <section id="solutions-grid" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">
              <TextBlock id="sol_grid_heading">Wybierz obszar i dopasuj rozwiązanie</TextBlock>
            </h2>
            <p className="text-gray-400">
              <TextBlock id="sol_grid_desc">
                Jeśli masz konkretny problem — wybierz rozwiązanie. Jeśli dopiero zaczynasz — przejdź do ‘Usług’.
              </TextBlock>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {solutionsData.map((solution) => (
              <div key={solution.id} className={`transition-opacity duration-500 
                ${activeCategory !== 'all' && activeCategory !== solution.category ? 'opacity-40 blur-[1px]' : 'opacity-100'}`}>
                <SolutionCard
                  data={solution}
                  isActive={activeCategory === solution.category}
                  onSelect={() => scrollToDetail(`detail-${solution.id}`)}
                />
              </div>
            ))}
          </div>
          <p className="text-center text-gray-500 text-xs mt-8">
            <TextBlock id="sol_grid_disclaimer">
              Wartości efektów są orientacyjne — zależą od procesu, danych i warunków wdrożenia.
            </TextBlock>
          </p>
        </div>
      </section>

      {/* 4. DETAILS SECTIONS */}
      {solutionsData.map((solution) => (
        <div key={solution.id} id={`detail-${solution.id}`}>
          <DetailSection data={solution} id={`detail-${solution.id}`} />
        </div>
      ))}

      {/* 5. PLATFORM SECTION */}
      <section className="py-24 bg-gradient-to-b from-apzumi-dark to-[#050a1f] px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <TextBlock id="sol_plat_heading">Jedna, zintegrowana platforma zamiast trzech narzędzi</TextBlock>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              <TextBlock id="sol_plat_desc">
                Procedury + zdalne wsparcie + baza wiedzy + AI Agent + raportowanie. To samo środowisko, te same dane, jeden workflow.
              </TextBlock>
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { icon: FileText, label: "Baza wiedzy", sub: "DTR, manuale, wideo", id: "1" },
              { icon: BrainCircuit, label: "AI Agent", sub: "Głos / Tekst", id: "2" },
              { icon: Layers, label: "Procedury", sub: "Krok-po-kroku", id: "3" },
              { icon: Eye, label: "Remote Assist", sub: "Smart Glasses", id: "4" },
              { icon: Activity, label: "Raporty", sub: "Excel / PDF", id: "5" },
              { icon: Settings, label: "Integracje", sub: "ERP / MES / CMMS", id: "6" },
            ].map((item, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-colors group">
                <div className="w-12 h-12 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <item.icon className="text-blue-400" size={24} />
                </div>
                <h4 className="font-bold text-sm mb-1">
                  <TextBlock id={`sol_plat_item_${item.id}`}>{item.label}</TextBlock>
                </h4>
                <p className="text-xs text-gray-500">
                  <TextBlock id={`sol_plat_sub_${item.id}`}>{item.sub}</TextBlock>
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 bg-yellow-900/20 border border-yellow-700/30 rounded-lg text-center text-yellow-500 text-xs font-mono">
            <ShieldCheck size={14} className="inline mr-2" />
            <TextBlock id="sol_plat_note">
              Dopasowujemy architekturę do polityki IT: możemy uruchomić model po stronie klienta (on-prem) albo integrować się z istniejącym LLM/RAG.
            </TextBlock>
          </div>
        </div>
      </section>

      {/* 6. PROCESS STEPS */}
      <section className="py-24 bg-white text-apzumi-dark px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">
            <TextBlock id="sol_proc_heading">Od rozpoznania do skali — w 3 prostych krokach</TextBlock>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-6 left-0 w-full h-1 bg-gray-200 z-0"></div>

            {[
              {
                step: "1",
                title: "Rozpoznanie i doprecyzowanie celu",
                desc: "Mapujemy proces, potrzeby i ograniczenia. Ustalamy KPI oraz to, co ma powstać."
              },
              {
                step: "2",
                title: "Pilot / PoC-first",
                desc: "Budujemy i uruchamiamy pilota na realnym fragmencie procesu, żeby zweryfikować założenia i policzyć efekt."
              },
              {
                step: "3",
                title: "Skalowanie i utrzymanie efektu",
                desc: "Rozszerzamy rozwiązanie na kolejne obszary, monitorujemy wyniki i optymalizujemy."
              }
            ].map((item, idx) => (
              <div key={idx} className="relative z-10 flex flex-col items-center text-center">
                <div className="w-14 h-14 bg-apzumi-red text-white rounded-full flex items-center justify-center font-bold text-xl mb-6 shadow-xl border-4 border-white">
                  {item.step}
                </div>
                <h3 className="font-bold text-xl mb-3">
                  <TextBlock id={`sol_proc_step${item.step}_title`}>{item.title}</TextBlock>
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
                  <TextBlock id={`sol_proc_step${item.step}_desc`}>{item.desc}</TextBlock>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CASE STUDIES PREVIEW */}
      <section className="py-24 bg-gray-50 text-apzumi-dark px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12">
            <TextBlock id="sol_cases_heading">Sprawdzone w środowisku produkcyjnym</TextBlock>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { id: '1', default: "Automotive: optymalizacja pracy na linii" },
              { id: '2', default: "Utrzymanie ruchu: skrócenie czasu diagnozy awarii" },
              { id: '3', default: "Quality/GMP: automatyzacja kontroli czystości linii" }
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow group cursor-pointer">
                <div className="h-48 bg-gray-200 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-apzumi-dark opacity-80 group-hover:scale-105 transition-transform duration-700"></div>
                  <div className="absolute top-4 left-4 bg-white text-apzumi-dark text-[10px] font-bold px-2 py-1 rounded uppercase">
                    <TextBlock id="sol_case_label">Case Study</TextBlock>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="font-bold text-lg mb-4">
                    <TextBlock id={`sol_case_${item.id}`}>{item.default}</TextBlock>
                  </h3>
                  <span className="text-apzumi-red font-bold text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                    <TextBlock id="sol_case_link">Czytaj więcej</TextBlock> <ArrowRight size={16} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FINAL CTA FORM */}
      <section className="py-24 bg-apzumi-dark px-6 border-t border-white/10">
        <div className="max-w-4xl mx-auto bg-white/5 border border-white/10 rounded-3xl p-8 md:p-16 backdrop-blur-sm">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <TextBlock id="sol_form_heading">Masz konkretny problem na produkcji?</TextBlock>
            </h2>
            <p className="text-gray-400">
              <TextBlock id="sol_form_desc">
                Opowiedz nam w 15 minut, co chcesz poprawić. Zaproponujemy najlepsze rozwiązanie Apzumi Spatial i plan pilota.
              </TextBlock>
            </p>
          </div>

          <form className="space-y-4 max-w-lg mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder={getText('sol_form_ph_name', "Imię i nazwisko")}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-apzumi-red transition-colors"
              />
              <input
                type="text"
                placeholder={getText('sol_form_ph_company', "Firma")}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-apzumi-red transition-colors"
              />
            </div>
            <input
              type="email"
              placeholder={getText('sol_form_ph_email', "E-mail służbowy")}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-apzumi-red transition-colors"
            />
            <select className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-gray-300 focus:outline-none focus:border-apzumi-red transition-colors">
              <option>{getText('sol_form_ph_area', "Wybierz obszar...")}</option>
              <option>{getText('sol_filter_production', "Produkcja")}</option>
              <option>{getText('sol_filter_maintenance', "Utrzymanie Ruchu")}</option>
              <option>{getText('sol_filter_quality', "Jakość")}</option>
              <option>{getText('sol_filter_hr', "HR / Szkolenia")}</option>
            </select>
            <textarea
              placeholder={getText('sol_form_ph_msg', "Wiadomość (opcjonalnie)")}
              rows={4}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-apzumi-red transition-colors"
            ></textarea>

            <div className="flex items-start gap-3 text-xs text-gray-500 my-4">
              <input type="checkbox" className="mt-1" />
              <span>
                <TextBlock id="sol_form_consent">Wyrażam zgodę na przetwarzanie danych osobowych w celu kontaktu.</TextBlock>
              </span>
            </div>

            <button className="w-full bg-apzumi-red hover:bg-red-600 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-apzumi-red/20">
              <TextBlock id="sol_form_btn">Porozmawiajmy</TextBlock>
            </button>
            <div className="text-center mt-4">
              <button className="text-gray-400 text-sm hover:text-white underline">
                <TextBlock id="sol_form_link">Poproś o demo</TextBlock>
              </button>
            </div>
          </form>
        </div>
      </section>

    </div>
  );
};

export default SolutionsPage;