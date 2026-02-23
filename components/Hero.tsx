import React, { useEffect, useState } from 'react';
import { ArrowRight, Search } from 'lucide-react';
import TextBlock from './TextBlock';

export type HomeVersion = 'v1' | 'v2' | 'v3';

interface HeroProps {
  version?: HomeVersion;
}

const Hero: React.FC<HeroProps> = ({ version = 'v1' }) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Parallax calculations
  const bgTranslate = scrollY * 0.5; // Moves slower than scroll (background depth)
  const textTranslate = scrollY * 0.2; // Moves slightly slower
  const textOpacity = Math.max(0, 1 - scrollY / 500); // Fades out
  const graphicScale = 1 + (scrollY * 0.0005); // Zooms in
  const graphicRotate = scrollY * 0.02; // Slight rotation

  const getBgClass = () => {
    switch (version) {
      case 'v3': return 'bg-gradient-to-br from-fuchsia-900 to-[#35123d]';
      case 'v1':
      default: return 'bg-gradient-to-br from-apzumi-dark to-[#1a2350]';
    }
  };

  if (version === 'v2') {
    return (
      <section className="bg-white min-h-screen pt-24 pb-0 flex flex-col lg:flex-row relative overflow-hidden">
        {/* Left Content Area */}
        <div className="w-full lg:w-5/12 px-6 lg:pl-16 xl:pl-32 xl:pr-12 pt-16 lg:pt-32 flex flex-col justify-center items-start lg:items-start z-10 transition-transform duration-1000 ease-out" style={{ transform: `translateY(${textTranslate}px)` }}>

          {/* Logo */}
          <div className="flex items-center gap-4 mb-4">
            {/* Red abstract logo parts (Larger for Hero) */}
            <div className="flex flex-col gap-1 w-12 xl:w-14 justify-center">
              <div className="h-1 w-6 xl:w-7 bg-[#e11d48] rounded-full self-end"></div>
              <div className="h-1 w-full bg-[#e11d48] rounded-full"></div>
              <div className="h-1 w-8 xl:w-9 bg-[#e11d48] rounded-full"></div>
              <div className="h-1 w-10 xl:w-11 bg-[#e11d48] rounded-full self-center"></div>
              <div className="h-1 w-full bg-[#e11d48] rounded-full"></div>
            </div>
            <span className="font-extrabold text-5xl xl:text-6xl tracking-wide text-[#1e285a]">apzumi</span>
          </div>

          {/* Tagline */}
          <h1 className="text-2xl xl:text-3xl text-[#4a5568] mb-10 pl-2">
            <TextBlock id="hero_tagline_v2" as="span">AI-first Software Partner</TextBlock>
          </h1>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pl-2">
            <button className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-full border border-gray-300 text-[#1e285a] hover:bg-gray-50 transition-colors font-medium text-sm">
              <TextBlock id="hero_services_btn_v2">Our Services</TextBlock>
              <Search size={16} className="text-[#1e285a]/70" />
            </button>
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#293b7b] hover:bg-[#1e285a] transition-colors text-white font-medium text-sm shadow-md shadow-blue-900/20"
            >
              <TextBlock id="hero_contact_btn_v2">Contact Us</TextBlock>
              <svg className="w-4 h-4 ml-1 transform rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
            </button>
          </div>
        </div>

        {/* Right Image Area */}
        <div className="w-full lg:w-7/12 h-[60vh] lg:h-auto min-h-[500px] mt-12 lg:mt-0 relative">
          <div
            className="absolute inset-y-0 right-0 left-4 lg:left-0 lg:ml-[-50px] overflow-hidden rounded-l-[100px] lg:rounded-l-[250px] bg-gray-200 transition-transform duration-1000 ease-out"
            style={{
              transform: `scale(${graphicScale}) translate(${scrollY * 0.05}px, ${scrollY * 0.05}px)`
            }}
          >
            {/* Overlay to give a slightly bluish tint as seen in screenshot */}
            <div className="absolute inset-0 bg-[#293b7b]/20 mix-blend-multiply z-10 pointer-events-none"></div>

            {/* The Image */}
            <img
              src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2670&auto=format&fit=crop"
              alt="Man using phone in modern home"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`transition-colors duration-1000 ${getBgClass()} text-white pt-32 pb-16 px-6 relative overflow-hidden min-h-[60vh] flex items-center`}>
      {/* Background Elements - Parallax Layer */}
      <div
        className="absolute top-0 right-0 w-1/2 h-full bg-blue-900/10 blur-3xl rounded-full translate-x-1/2 pointer-events-none will-change-transform"
        style={{ transform: `translateY(${bgTranslate}px) translateX(50%)` }}
      ></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">

        {/* Left Content - Fade & Slight Parallax */}
        <div
          className="space-y-8 will-change-transform"
          style={{
            transform: `translateY(${textTranslate}px)`,
            opacity: textOpacity
          }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            <TextBlock id="hero_title" as="span" className="block">
              Apzumi Spatial — Twój partner w procesach przemysłowych
            </TextBlock>
          </h1>
          <TextBlock id="hero_lead" as="p" className="text-gray-300 text-lg md:text-xl max-w-xl leading-relaxed">
            Łączymy ludzi, procedury i wiedzę w jednym workflow.
          </TextBlock>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-gradient-to-r from-apzumi-red to-rose-500 hover:brightness-110 text-white font-semibold py-4 px-8 rounded-full flex items-center gap-2 transition-all transform hover:scale-105 shadow-lg shadow-apzumi-red/30"
          >
            <TextBlock id="hero_cta">Poznaj platformę Apzumi Spatial</TextBlock>
            <ArrowRight size={18} />
          </button>
        </div>

        {/* Right Graphic Content - Zoom & Rotate Parallax */}
        <div className="relative w-full h-[300px] md:h-[350px] flex items-center justify-center perspective-1000">
          {/* Wrapper for the parallax effect */}
          <div
            className="w-full h-full flex items-center justify-center will-change-transform"
            style={{ transform: `scale(${graphicScale}) rotate(${graphicRotate}deg)` }}
          >
            {/* Frame Borders - Replicating the red corners */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-apzumi-red transition-transform duration-100 ease-out" style={{ transform: `translate(-${scrollY * 0.1}px, -${scrollY * 0.1}px)` }}></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-apzumi-red transition-transform duration-100 ease-out" style={{ transform: `translate(${scrollY * 0.1}px, -${scrollY * 0.1}px)` }}></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-apzumi-red transition-transform duration-100 ease-out" style={{ transform: `translate(-${scrollY * 0.1}px, ${scrollY * 0.1}px)` }}></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-apzumi-red transition-transform duration-100 ease-out" style={{ transform: `translate(${scrollY * 0.1}px, ${scrollY * 0.1}px)` }}></div>

            {/* Central Image/Graphic */}
            <div className="w-full h-full bg-blue-900/20 backdrop-blur-sm border border-blue-500/30 flex items-center justify-center p-8 shadow-2xl relative overflow-hidden">
              {/* Inner shine effect moving with scroll */}
              <div
                className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent z-20"
                style={{ transform: `translateX(${scrollY * 0.5}px)` }}
              ></div>

              {/* Using a tech-like placeholder image */}
              <div className="relative w-48 h-48 md:w-64 md:h-64">
                <img
                  src="https://picsum.photos/seed/techcube/400/400"
                  alt="AR/VR Cube"
                  className="w-full h-full object-cover rounded-lg opacity-80 mix-blend-screen shadow-[0_0_50px_rgba(59,130,246,0.5)]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-apzumi-dark via-transparent to-transparent"></div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;