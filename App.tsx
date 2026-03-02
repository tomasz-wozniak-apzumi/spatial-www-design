import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Awards from './components/Awards';
import ClientLogos from './components/ClientLogos';
import DemoVideo from './components/DemoVideo';
import Solutions from './components/Solutions';
import Process from './components/Process';
import News from './components/News';
import Testimonial from './components/Testimonial';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ExportTools from './components/ExportTools';
import SolutionsPage from './components/SolutionsPage';
import ServicesPage from './components/ServicesPage';
import CaseStudiesPage from './components/CaseStudiesPage';
import AboutPage from './components/AboutPage';
import { TextProvider } from './context/TextContext';
import { CommentProvider } from './context/CommentContext';

import InteractiveDemo from './components/InteractiveDemo';
import KnowledgeBaseDemo from './components/KnowledgeBaseDemo';

export type ViewState = 'home' | 'solutions' | 'services' | 'casestudies' | 'interactive_demo' | 'knowledge_base' | 'about';
export type HomeVersion = 'v1' | 'v2' | 'v3';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [globalVersion, setGlobalVersion] = useState<'v1' | 'v2' | 'v3'>('v2');

  const isDemoPage = currentView === 'interactive_demo' || currentView === 'knowledge_base';
  const scopeId = isDemoPage ? currentView : `${currentView}_${globalVersion}`;

  return (
    <TextProvider
      viewScope={scopeId}
    >
      <CommentProvider
        currentView={scopeId}
      >
        <div className="min-h-screen bg-white font-sans text-gray-900 overflow-x-hidden relative">
          {currentView !== 'interactive_demo' && (
            <Navbar currentView={currentView} onNavigate={setCurrentView} version={globalVersion} />
          )}

          {currentView === 'home' ? (
            <>
              <Hero version={globalVersion} />
              <Awards version={globalVersion} />
              <ClientLogos version={globalVersion} />
              <DemoVideo version={globalVersion} />
              <Solutions onNavigate={setCurrentView} version={globalVersion} />
              <Process />
              <News />
              <Testimonial />
              <Contact />
            </>
          ) : currentView === 'solutions' ? (
            <SolutionsPage onNavigate={setCurrentView} version={globalVersion} />
          ) : currentView === 'services' ? (
            <ServicesPage onNavigate={setCurrentView} version={globalVersion} />
          ) : currentView === 'interactive_demo' ? (
            <InteractiveDemo onNavigate={setCurrentView} />
          ) : currentView === 'knowledge_base' ? (
            <KnowledgeBaseDemo onNavigate={setCurrentView} />
          ) : currentView === 'about' ? (
            <AboutPage onNavigate={setCurrentView} version={globalVersion} />
          ) : (
            <CaseStudiesPage onNavigate={setCurrentView} version={globalVersion} />
          )}

          {currentView !== 'interactive_demo' && currentView !== 'knowledge_base' && <Footer />}

          {/* Version Selector for ALL standard pages */}
          {!isDemoPage && (
            <div className="fixed top-24 right-4 z-[9000] bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg shadow-lg p-3 flex items-center gap-3">
              <label htmlFor="global-version" className="text-sm font-bold text-gray-700">Wersja strony:</label>
              <select
                id="global-version"
                value={globalVersion}
                onChange={(e) => setGlobalVersion(e.target.value as 'v1' | 'v2' | 'v3')}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 outline-none cursor-pointer"
              >
                <option value="v2">Wersja 2 (Zielona) - Podstawowa</option>
                <option value="v1">Wersja 1 (Oryginalna)</option>
              </select>
            </div>
          )}

          {/* Design Mode Hint */}
          {currentView !== 'interactive_demo' && currentView !== 'knowledge_base' && (
            <div className="fixed bottom-4 left-4 z-[9999] bg-white/80 backdrop-blur-sm border border-gray-200 px-3 py-1.5 rounded-full shadow-sm pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity">
              <span className="text-[10px] text-gray-500 font-medium tracking-tight">
                Design Mode: <kbd className="bg-gray-100 px-1.5 py-0.5 rounded border border-gray-300">Ctrl/Cmd + Click</kbd> to add comment
              </span>
            </div>
          )}

          {/* Floating Export Button */}
          {currentView !== 'interactive_demo' && currentView !== 'knowledge_base' && <ExportTools />}
        </div>
      </CommentProvider>
    </TextProvider>
  );
};

export default App;