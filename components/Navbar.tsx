import React from 'react';
import { Menu } from 'lucide-react';
import TextBlock from './TextBlock';
import { ViewState } from '../App';

interface NavbarProps {
  currentView?: ViewState;
  onNavigate?: (view: ViewState) => void;
  version?: 'v1' | 'v2' | 'v3';
}

const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate, version = 'v1' }) => {

  const handleNavClick = (e: React.MouseEvent, view: ViewState) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(view);
      window.scrollTo(0, 0);
    }
  };

  if (version === 'v2') {
    return (
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-4xl px-4">
        <div className="bg-white/90 backdrop-blur-md rounded-full px-6 py-2.5 flex items-center justify-between shadow-sm border border-gray-100/50">
          {/* Logo Placeholder - Version 2 */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={(e) => handleNavClick(e, 'home')}
          >
            <div className="flex flex-col gap-[2px] w-6 justify-center">
              {/* Red abstract logo parts */}
              <div className="h-[2px] w-3 bg-[#e11d48] rounded-full self-end"></div>
              <div className="h-[2px] w-full bg-[#e11d48] rounded-full"></div>
              <div className="h-[2px] w-4 bg-[#e11d48] rounded-full"></div>
              <div className="h-[2px] w-5 bg-[#e11d48] rounded-full self-center"></div>
              <div className="h-[2px] w-full bg-[#e11d48] rounded-full"></div>
            </div>
            <span className="font-bold text-xl tracking-wide text-[#1e285a]">apzumi</span>
          </div>

          {/* Navigation Links - Version 2 */}
          <div className="hidden md:flex items-center space-x-6 text-[13px] font-medium text-gray-600">
            <a
              href="#"
              onClick={(e) => handleNavClick(e, 'services')}
              className={`transition-colors py-2 ${currentView === 'services' ? 'text-[#1e285a] font-bold' : 'hover:text-[#1e285a]'}`}
            >
              <TextBlock id="nav_services_v2">Services</TextBlock>
            </a>
            <a
              href="#"
              onClick={(e) => handleNavClick(e, 'casestudies')}
              className={`transition-colors py-2 ${currentView === 'casestudies' ? 'text-[#1e285a] font-bold' : 'hover:text-[#1e285a]'}`}
            >
              <TextBlock id="nav_cases_v2">Case Studies</TextBlock>
            </a>
            <a href="#" className="transition-colors py-2 hover:text-[#1e285a]">
              <TextBlock id="nav_career_v2">Career</TextBlock>
            </a>
            <a href="#" className="transition-colors py-2 hover:text-[#1e285a]">
              <TextBlock id="nav_insights_v2">Insights</TextBlock>
            </a>
            <a
              href="#"
              onClick={(e) => handleNavClick(e, 'about')}
              className={`transition-colors py-2 ${currentView === 'about' ? 'text-[#1e285a] font-bold' : 'hover:text-[#1e285a]'}`}
            >
              <TextBlock id="nav_about_v2">About</TextBlock>
            </a>
          </div>

          {/* Contact Us Button - Version 2 */}
          <button
            onClick={(e) => {
              e.preventDefault();
              if (currentView !== 'home' && onNavigate) {
                onNavigate('home');
                setTimeout(() => {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              } else {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="bg-[#293b7b] hover:bg-[#1e285a] transition-colors text-white text-[13px] font-medium px-5 py-2 rounded-full cursor-pointer shadow-sm"
          >
            <TextBlock id="nav_contact_v2">Contact Us</TextBlock>
          </button>

          {/* Mobile Menu Icon (still needed for responsiveness) */}
          <div className="md:hidden text-[#1e285a]">
            <Menu size={20} />
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-apzumi-dark text-white py-4 px-6 md:px-12 fixed top-0 w-full z-50 border-b border-white/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo Placeholder */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={(e) => handleNavClick(e, 'home')}
        >
          <div className="w-8 h-8 bg-apzumi-red rounded-sm flex items-center justify-center">
            <span className="font-bold text-white text-lg">a</span>
          </div>
          <span className="font-bold text-xl tracking-wide">apzumi</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8 text-xs font-semibold tracking-wider uppercase">
          <a
            href="#"
            onClick={(e) => handleNavClick(e, 'solutions')}
            className={`transition-colors ${currentView === 'solutions' ? 'text-apzumi-red' : 'hover:text-apzumi-red'}`}
          >
            <TextBlock id="nav_spatial">Rozwiązania</TextBlock>
          </a>
          <a
            href="#"
            onClick={(e) => handleNavClick(e, 'services')}
            className={`transition-colors ${currentView === 'services' ? 'text-apzumi-red' : 'hover:text-apzumi-red'}`}
          >
            <TextBlock id="nav_services">Usługi</TextBlock>
          </a>
          <a
            href="#"
            onClick={(e) => handleNavClick(e, 'casestudies')}
            className={`transition-colors ${currentView === 'casestudies' ? 'text-apzumi-red' : 'hover:text-apzumi-red'}`}
          >
            <TextBlock id="nav_cases">Case Studies</TextBlock>
          </a>
          <a
            href="#"
            onClick={(e) => handleNavClick(e, 'about')}
            className={`transition-colors ${currentView === 'about' ? 'text-apzumi-red' : 'hover:text-apzumi-red'}`}
          >
            <TextBlock id="nav_about">O Nas</TextBlock>
          </a>
          <button
            onClick={(e) => {
              e.preventDefault();
              if (currentView !== 'home' && onNavigate) {
                onNavigate('home');
                setTimeout(() => {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              } else {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="hover:text-apzumi-red transition-colors uppercase cursor-pointer"
          >
            <TextBlock id="nav_contact">Porozmawiajmy</TextBlock>
          </button>
        </div>

        {/* Language Switcher */}
        <div className="hidden md:flex items-center space-x-2 text-xs font-bold">
          <span className="text-apzumi-red cursor-pointer">
            <TextBlock id="nav_lang_pl">PL</TextBlock>
          </span>
          <span className="text-gray-500">|</span>
          <span className="text-gray-300 hover:text-white cursor-pointer">
            <TextBlock id="nav_lang_en">EN</TextBlock>
          </span>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden text-white">
          <Menu size={24} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;