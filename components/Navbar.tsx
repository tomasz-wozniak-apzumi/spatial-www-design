import React from 'react';
import { Menu } from 'lucide-react';
import TextBlock from './TextBlock';
import { ViewState } from '../App';

interface NavbarProps {
  currentView?: ViewState;
  onNavigate?: (view: ViewState) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate }) => {

  const handleNavClick = (e: React.MouseEvent, view: ViewState) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(view);
      window.scrollTo(0, 0);
    }
  };

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