import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import TextBlock from './TextBlock';

const Hero: React.FC = () => {
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

  return (
    <section className="bg-gradient-to-br from-apzumi-dark to-[#1a2350] text-white pt-32 pb-16 px-6 relative overflow-hidden min-h-[60vh] flex items-center">
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