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
import { TextProvider } from './context/TextContext';

export type ViewState = 'home' | 'solutions' | 'services' | 'casestudies';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('home');

  return (
    <TextProvider>
      <div className="min-h-screen bg-white font-sans text-gray-900 overflow-x-hidden relative">
        <Navbar currentView={currentView} onNavigate={setCurrentView} />
        
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
          <SolutionsPage />
        ) : currentView === 'services' ? (
          <ServicesPage onNavigate={setCurrentView} />
        ) : (
          <CaseStudiesPage />
        )}
        
        <Footer />
        
        {/* Floating Export Button */}
        <ExportTools />
      </div>
    </TextProvider>
  );
};

export default App;