import React from 'react';
import TextBlock from './TextBlock';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-24 bg-apzumi-dark px-6 border-t border-white/10 text-white font-sans">
      <div className="max-w-4xl mx-auto bg-white/5 border border-white/10 rounded-3xl p-8 md:p-16 backdrop-blur-sm relative z-10 shadow-2xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
            <TextBlock id="contact_heading">Masz konkretny problem na produkcji?</TextBlock>
          </h2>
          <p className="text-gray-400 text-lg">
            <TextBlock id="contact_desc">
              Opowiedz nam w 15 minut, co chcesz poprawić. Zaproponujemy najlepsze rozwiązanie Apzumi Spatial i plan pilota.
            </TextBlock>
          </p>
        </div>

        <form className="space-y-4 max-w-lg mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Imię i nazwisko"
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-4 text-[15px] text-white placeholder-gray-500 focus:outline-none focus:border-apzumi-red transition-colors"
            />
            <input
              type="text"
              placeholder="Firma"
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-4 text-[15px] text-white placeholder-gray-500 focus:outline-none focus:border-apzumi-red transition-colors"
            />
          </div>
          <input
            type="email"
            placeholder="E-mail służbowy"
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-4 text-[15px] text-white placeholder-gray-500 focus:outline-none focus:border-apzumi-red transition-colors"
          />
          <select className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-4 text-[15px] text-gray-300 focus:outline-none focus:border-apzumi-red transition-colors">
            <option>Wybierz obszar...</option>
            <option>Produkcja</option>
            <option>Utrzymanie Ruchu</option>
            <option>Jakość</option>
            <option>HR / Szkolenia</option>
          </select>
          <textarea
            placeholder="Wiadomość (opcjonalnie)"
            rows={5}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-4 text-[15px] text-white placeholder-gray-500 focus:outline-none focus:border-apzumi-red transition-colors resize-none"
          ></textarea>

          <div className="flex items-start gap-3 flex-row my-6 pl-1">
            <input type="checkbox" className="mt-[2px] w-4 h-4 cursor-pointer accent-apzumi-red" />
            <span className="text-[13px] text-gray-500">
              <TextBlock id="contact_consent">Wyrażam zgodę na przetwarzanie danych osobowych w celu kontaktu.</TextBlock>
            </span>
          </div>

          <button type="button" className="w-full bg-[#f44e54] hover:bg-[#ff6166] text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-apzumi-red/20 active:scale-95 text-[15px]">
            <TextBlock id="contact_btn">Porozmawiajmy</TextBlock>
          </button>
          <div className="text-center mt-6">
            <button type="button" className="text-gray-400 text-sm hover:text-white underline transition-colors">
              <TextBlock id="contact_link">Poproś o demo</TextBlock>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;