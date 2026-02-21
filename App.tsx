import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ClientLogos from './components/ClientLogos';
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

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('home');

  return (
    <TextProvider>
      <CommentProvider currentView={currentView}>
        <div className="min-h-screen bg-white font-sans text-gray-900 overflow-x-hidden relative">
          {currentView !== 'interactive_demo' && (
            <Navbar currentView={currentView} onNavigate={setCurrentView} />
          )}

          {currentView === 'home' ? (
            <>
              <Hero />
              <ClientLogos />
              <Solutions onNavigate={setCurrentView} />
              <Process />
              <News />
              <Testimonial />
              <Contact />
            </>
          ) : currentView === 'solutions' ? (
            <SolutionsPage onNavigate={setCurrentView} />
          ) : currentView === 'services' ? (
            <ServicesPage onNavigate={setCurrentView} />
          ) : currentView === 'interactive_demo' ? (
            <InteractiveDemo onNavigate={setCurrentView} />
          ) : currentView === 'knowledge_base' ? (
            <KnowledgeBaseDemo onNavigate={setCurrentView} />
          ) : currentView === 'about' ? (
            <AboutPage onNavigate={setCurrentView} />
          ) : (
            <CaseStudiesPage onNavigate={setCurrentView} />
          )}

          {currentView !== 'interactive_demo' && currentView !== 'knowledge_base' && <Footer />}

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