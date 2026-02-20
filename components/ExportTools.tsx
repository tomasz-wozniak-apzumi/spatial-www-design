import React from 'react';
import { Download } from 'lucide-react';
import { renderToStaticMarkup } from 'react-dom/server';
import { TextProvider } from '../context/TextContext';

// Import all application components
import Navbar from './Navbar';
import Hero from './Hero';
import ClientLogos from './ClientLogos';
import Solutions from './Solutions';
import Process from './Process';
import News from './News';
import Testimonial from './Testimonial';
import Contact from './Contact';
import Footer from './Footer';
import SolutionsPage from './SolutionsPage';
import ServicesPage from './ServicesPage';
import CaseStudiesPage from './CaseStudiesPage';

const ExportTools: React.FC = () => {

  const handleExportHTML = () => {
    // 1. Define the Full Static App Structure
    // We render all views into the DOM but hide them initially using CSS.
    // A custom script will handle toggling them.
    const FullStaticApp = () => (
      <TextProvider>
        <div className="font-sans text-gray-900 bg-white min-h-screen">
          {/* Static Navbar Wrapper */}
          <div id="static-navbar-container">
             <Navbar currentView="home" />
          </div>

          {/* VIEW: HOME */}
          <div id="view-home" className="view-section">
             <Hero />
             <ClientLogos />
             <Solutions onNavigate={() => {}} /> 
             <Process />
             <News />
             <Testimonial />
             <Contact />
          </div>

          {/* VIEW: SOLUTIONS */}
          <div id="view-solutions" className="view-section hidden">
             <SolutionsPage />
          </div>
          
          {/* VIEW: SERVICES */}
          <div id="view-services" className="view-section hidden">
             <ServicesPage onNavigate={() => {}} />
          </div>

          {/* VIEW: CASE STUDIES */}
          <div id="view-casestudies" className="view-section hidden">
             <CaseStudiesPage />
          </div>

          <Footer />
        </div>
      </TextProvider>
    );

    // 2. Render to Static Markup
    const appHtml = renderToStaticMarkup(<FullStaticApp />);

    // 3. Capture Head (Styles, Fonts)
    // Filter out existing scripts to avoid React conflicts, but keep Tailwind/Fonts
    const docHead = document.head.cloneNode(true) as HTMLElement;
    const scripts = docHead.querySelectorAll('script');
    scripts.forEach(s => {
       if (!s.src.includes('tailwindcss')) s.remove();
    });
    const headHtml = docHead.innerHTML;

    // 4. Inject Interactive Script for Navigation
    const interactiveScript = `
      <style>
        .hidden { display: none !important; }
        .view-section { animation: fadeIn 0.3s ease-in-out; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      </style>
      <script>
        document.addEventListener('DOMContentLoaded', () => {
          
          // --- Navigation Logic ---
          function showView(viewId) {
            document.querySelectorAll('.view-section').forEach(el => el.classList.add('hidden'));
            const target = document.getElementById('view-' + viewId);
            if (target) {
              target.classList.remove('hidden');
              window.scrollTo(0, 0);
              
              // Update Navbar State (Visual Approximation)
              document.querySelectorAll('nav a span').forEach(span => {
                 // Reset colors (simple reset)
                 if(span.parentElement) {
                    span.parentElement.classList.remove('text-apzumi-red');
                    span.parentElement.classList.add('text-white');
                 }
              });
            }
          }

          // --- Global Click Delegation ---
          document.addEventListener('click', (e) => {
             // Find closest anchor or button
             const el = e.target.closest('a') || e.target.closest('button');
             if (!el) return;

             // Extract text content for matching
             const text = (el.innerText || '').trim().toLowerCase();
             
             // 1. Main Navigation Matching
             if (text.includes('rozwiązania') || text.includes('solutions')) {
                e.preventDefault(); showView('solutions');
             } else if (text.includes('usługi') || text.includes('services')) {
                e.preventDefault(); showView('services');
             } else if (text.includes('case studies') || text.includes('realizacje')) {
                e.preventDefault(); showView('casestudies');
             } else if (text.includes('apzumi') || (el.tagName === 'DIV' && text === 'a')) { // Logo check
                e.preventDefault(); showView('home');
             } else if (text.includes('kontakt') || text.includes('porozmawiajmy')) {
                e.preventDefault(); showView('home');
                setTimeout(() => window.scrollTo(0, document.body.scrollHeight), 100);
             }

             // 2. Button / CTA Matching
             if (text.includes('poznaj platformę') || text.includes('zobacz demo') || text.includes('umów demo')) {
                e.preventDefault(); showView('solutions');
             }
             if (text.includes('czytaj case study') || text.includes('zobacz case study')) {
                e.preventDefault(); showView('casestudies');
             }
             if (text.includes('dowiedz się więcej')) {
                e.preventDefault(); showView('services');
             }
          });

          // Handle Logo Click specifically if markup structure varies
          const logo = document.querySelector('nav .flex.items-center.gap-2');
          if(logo) {
             logo.addEventListener('click', () => showView('home'));
          }
        });
      </script>
    `;

    // 5. Construct Final HTML
    const finalHtml = `
      <!DOCTYPE html>
      <html lang="pl">
        <head>
          ${headHtml}
        </head>
        <body>
          ${appHtml}
          ${interactiveScript}
        </body>
      </html>
    `;

    // 6. Download
    const blob = new Blob([finalHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'apzumi_full_site.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div 
      id="export-tools-container" 
      className="fixed bottom-6 right-6 z-[10000] flex flex-col gap-2"
    >
      <button
        onClick={handleExportHTML}
        className="bg-gray-900 hover:bg-black text-white px-4 py-3 rounded-full shadow-2xl flex items-center gap-2 font-semibold text-sm transition-all transform hover:scale-105 border border-gray-700"
        title="Pobierz całą stronę (wszystkie widoki) jako jeden plik HTML"
      >
        <Download size={18} />
        Pobierz HTML (Wszystkie strony)
      </button>
    </div>
  );
};

export default ExportTools;