import React from 'react';
import TextBlock from './TextBlock';
import { ViewState } from '../App';
import { Target, Cpu, Zap, Layers } from 'lucide-react';


interface AboutPageProps {
    onNavigate: (view: ViewState) => void;
    version?: 'v1' | 'v2' | 'v3';
}

const MaskPill = ({ src, top, left, width, height, containerW, containerH }: { src: string, top: number, left: number, width: number, height: number, containerW: number, containerH: number }) => (
    <div
        className="absolute rounded-full overflow-hidden bg-gray-200"
        style={{ top, left, width, height }}
    >
        <img
            src={src}
            className="absolute object-cover max-w-none pointer-events-none"
            style={{ top: -top, left: -left, width: containerW, height: containerH }}
            alt=""
        />
    </div>
);

const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, version = 'v1' }) => {
    return (
        <div className="bg-white font-sans text-apzumi-dark selection:bg-apzumi-red selection:text-white">

            {/* HEADER - ABOUT */}
            <section className="text-center w-full bg-gradient-to-br from-[#121c43] to-[#0a0f29] pt-40 pb-20 relative overflow-hidden transition-colors duration-500 mb-20">
                <div className="max-w-[1400px] mx-auto px-4 relative flex flex-col justify-center min-h-[360px]">
                    {/* LEFT MASKED IMAGE */}
                    <div className="absolute left-[-40px] lg:left-8 top-[36px] hidden sm:block w-[360px] h-[240px] opacity-80 pointer-events-none">
                        <div className="relative w-full h-full origin-left scale-75 md:scale-90 lg:scale-100">
                            {/* Row 1 */}
                            <MaskPill src="/images/about/about1.png" top={0} left={30} width={40} height={36} containerW={360} containerH={240} />
                            <MaskPill src="/images/about/about1.png" top={0} left={80} width={130} height={36} containerW={360} containerH={240} />
                            {/* Row 2 */}
                            <MaskPill src="/images/about/about1.png" top={46} left={0} width={50} height={36} containerW={360} containerH={240} />
                            <MaskPill src="/images/about/about1.png" top={46} left={60} width={260} height={36} containerW={360} containerH={240} />
                            {/* Row 3 */}
                            <MaskPill src="/images/about/about1.png" top={92} left={0} width={340} height={36} containerW={360} containerH={240} />
                            {/* Row 4 */}
                            <MaskPill src="/images/about/about1.png" top={138} left={0} width={40} height={36} containerW={360} containerH={240} />
                            <MaskPill src="/images/about/about1.png" top={138} left={50} width={210} height={36} containerW={360} containerH={240} />
                            {/* Row 5 */}
                            <MaskPill src="/images/about/about1.png" top={184} left={0} width={160} height={36} containerW={360} containerH={240} />
                            <MaskPill src="/images/about/about1.png" top={184} left={170} width={50} height={36} containerW={360} containerH={240} />
                        </div>
                    </div>

                    {/* RIGHT MASKED IMAGE */}
                    <div className="absolute right-[-40px] lg:right-8 top-[36px] hidden sm:block w-[360px] h-[240px] opacity-80 pointer-events-none">
                        <div className="relative w-full h-full origin-right scale-75 md:scale-90 lg:scale-100">
                            {/* Row 1 */}
                            <MaskPill src="/images/about/about2.png" top={0} left={130} width={50} height={36} containerW={360} containerH={240} />
                            <MaskPill src="/images/about/about2.png" top={0} left={190} width={170} height={36} containerW={360} containerH={240} />
                            {/* Row 2 */}
                            <MaskPill src="/images/about/about2.png" top={46} left={0} width={150} height={36} containerW={360} containerH={240} />
                            <MaskPill src="/images/about/about2.png" top={46} left={160} width={200} height={36} containerW={360} containerH={240} />
                            {/* Row 3 */}
                            <MaskPill src="/images/about/about2.png" top={92} left={70} width={290} height={36} containerW={360} containerH={240} />
                            {/* Row 4 */}
                            <MaskPill src="/images/about/about2.png" top={138} left={120} width={130} height={36} containerW={360} containerH={240} />
                            <MaskPill src="/images/about/about2.png" top={138} left={260} width={100} height={36} containerW={360} containerH={240} />
                            {/* Row 5 */}
                            <MaskPill src="/images/about/about2.png" top={184} left={80} width={140} height={36} containerW={360} containerH={240} />
                            <MaskPill src="/images/about/about2.png" top={184} left={230} width={130} height={36} containerW={360} containerH={240} />
                        </div>
                    </div>

                    <div className="max-w-[600px] mx-auto py-12 relative z-10 px-4 sm:px-0">
                        <h1 className="text-5xl md:text-[64px] font-extrabold mb-4 text-white tracking-tight">
                            <TextBlock id="about_main_title">Apzumi Spatial</TextBlock>
                        </h1>
                        <p className="text-sm md:text-[15px] leading-relaxed text-gray-300 mx-auto mb-8 max-w-[480px]">
                            <TextBlock id="about_main_subtitle">Twój partner w digitalizacji.<br />Tworzymy inteligentne rozwiązania AI, które przekładają się na realny wzrost efektywności w przemyśle</TextBlock>
                        </p>
                    </div>
                </div>
            </section>

            {/* WHO WE ARE */}
            <section className="max-w-[1000px] mx-auto px-6 mb-20">
                <div className="bg-[#2a3c7b] rounded-[2rem] p-8 md:p-12 text-center text-white shadow-xl relative overflow-hidden">
                    <h2 className="text-2xl font-bold mb-10"><TextBlock id="about_who_we_are">Kim <span className="font-extrabold">Jesteśmy</span></TextBlock></h2>

                    <div className="bg-white rounded-2xl flex flex-col md:flex-row overflow-hidden text-left mb-8">
                        <div className="p-8 md:p-10 md:w-1/2 flex flex-col justify-center">
                            <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-2"><TextBlock id="about_who_pre">Jesteśmy</TextBlock></p>
                            <h3 className="text-[#2a3c7b] text-3xl font-extrabold mb-4 leading-tight"><TextBlock id="about_who_title">Ekspertami od Software<br />i Artificial Intelligence</TextBlock></h3>
                            <p className="text-gray-700 text-sm font-semibold pr-4"><TextBlock id="about_who_desc">Eksperci od oprogramowania tworzący inteligentne rozwiązania dla przemysłu 4.0, logistyki i produkcji</TextBlock></p>
                        </div>
                        <div className="md:w-1/2 h-64 md:h-auto overflow-hidden">
                            <img src="/images/about/about3.png" className="w-full h-full object-cover" alt="Apzumi Team" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            { stat: "12+", label: "lat na rynku", id: "1" },
                            { stat: "150+", label: "zrealizowanych projektów", id: "2" },
                            { stat: "70+", label: "osób w zespole", id: "3" },
                            { stat: "15+", label: "obsłużonych rynków", id: "4" }
                        ].map((item) => (
                            <div key={item.id} className="bg-white text-[#2a3c7b] py-6 px-4 rounded-xl flex flex-col items-center justify-center shadow-sm">
                                <span className="text-2xl font-extrabold mb-1"><TextBlock id={`about_stat_${item.id}`}>{item.stat}</TextBlock></span>
                                <span className="text-[10px] text-gray-500 font-bold uppercase"><TextBlock id={`about_stat_lbl_${item.id}`}>{item.label}</TextBlock></span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ADDED VALUE */}
            <section className="max-w-[1000px] mx-auto px-6 mb-20 text-center">
                <h2 className="text-xl md:text-2xl font-bold mb-8 text-black">Wartość <span className="font-extrabold">Dodana</span></h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    {/* Card 1 */}
                    <div className="border border-[#2a3c7b] rounded-xl p-6 flex flex-col justify-between items-center shadow-sm hover:shadow-md transition-shadow min-h-[160px]">
                        <div className="flex-1 flex items-center justify-center mb-4 min-h-[64px] w-full">
                            <img src="/images/about/about4.png" className="h-20 w-auto object-contain" alt="12 years" />
                        </div>
                        <p className="text-sm font-bold text-black border-t border-gray-100 pt-4 w-full">Stabilny Partner</p>
                    </div>
                    {/* Card 2 */}
                    <div className="border border-[#2a3c7b] rounded-xl p-6 flex flex-col justify-between items-center shadow-sm hover:shadow-md transition-shadow min-h-[160px]">
                        <div className="flex-1 flex items-center justify-center mb-4 min-h-[64px] w-full">
                            <img src="/images/about/about5.png" className="h-[52px] w-auto object-contain" alt="Cost Effectiveness" />
                        </div>
                        <p className="text-sm font-bold text-black border-t border-gray-100 pt-4 w-full">Optymalizacja Kosztów</p>
                    </div>
                    {/* Card 3 */}
                    <div className="border border-[#2a3c7b] rounded-xl p-6 flex flex-col justify-between items-center shadow-sm hover:shadow-md transition-shadow min-h-[160px]">
                        <div className="flex-1 flex items-center justify-center mb-4 min-h-[64px] w-full">
                            <img src="/images/about/about6.png" className="h-16 w-auto object-contain" alt="Market Recognition" />
                        </div>
                        <p className="text-sm font-bold text-black border-t border-gray-100 pt-4 w-full">Uznanie w Branży</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Card 4 */}
                    <div className="border border-[#2a3c7b] rounded-xl p-6 flex items-start text-left shadow-sm hover:shadow-md transition-shadow">
                        <img src="/images/about/about7.png" className="w-14 h-14 object-contain mr-4 flex-shrink-0" alt="Specjalizacja Przemysłowa" />
                        <div>
                            <p className="text-sm font-bold text-black mb-1">Specjalizacja Przemysłowa</p>
                            <p className="text-[13px] leading-relaxed text-black font-semibold">Wybierz sprawdzonego partnera z głębokim zrozumieniem wymagań technologicznych dla przemysłu 4.0 i produkcji.</p>
                        </div>
                    </div>
                    {/* Card 5 */}
                    <div className="border border-[#2a3c7b] rounded-xl p-6 flex items-start text-left shadow-sm hover:shadow-md transition-shadow">
                        <img src="/images/about/about8.png" className="w-14 h-14 object-contain mr-4 flex-shrink-0" alt="Rozwiązywanie Problemów" />
                        <div>
                            <p className="text-sm font-bold text-black mb-1">Rozwiązywanie Problemów</p>
                            <p className="text-[13px] leading-relaxed text-black font-semibold">Skupiamy się na Twoich biznesowych wyzwaniach - analizujemy potrzeby i dostarczamy rozwiązania dające realną wartość.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* INDUSTRY RECOGNITION */}
            <section className="max-w-[1000px] mx-auto px-6 mb-24 text-center">
                <h2 className="text-xl md:text-2xl font-bold mb-8 text-black">Uznanie <span className="font-extrabold">Branżowe</span></h2>

                <div className="grid gap-4">
                    {/* Recognition 1 */}
                    <div className="flex flex-col md:flex-row gap-4 h-auto md:h-32">
                        <div className="w-full md:w-1/3 rounded-xl overflow-hidden shadow-sm">
                            <img src="/images/about/about9.png" className="w-full h-full object-cover" alt="Diamonds" />
                        </div>
                        <div className="w-full md:w-2/3 border border-[#2a3c7b] rounded-xl p-6 flex justify-between items-center text-left hover:shadow-md transition-shadow">
                            <div className="pr-6">
                                <h4 className="font-bold text-black mb-2 text-sm">Diamenty Forbesa</h4>
                                <p className="text-[10px] text-gray-700 font-semibold">Firma Apzumi zdobyła prestiżowy tytuł Diamentów Forbesa w 2024 roku, dołączając do grona najszybciej rozwijających się polskich przedsiębiorstw.</p>
                            </div>
                            <div className="w-16 h-16 flex-shrink-0 opacity-80 border-2 border-blue-400 rotate-45 flex items-center justify-center p-2"><span className="text-[8px] -rotate-45 block font-bold text-blue-500 text-center">Forbes<br />2024</span></div>
                        </div>
                    </div>

                    {/* Recognition 2 */}
                    <div className="flex flex-col md:flex-row gap-4 h-auto md:h-32">
                        <div className="w-full md:w-2/3 border border-[#2a3c7b] rounded-xl p-6 flex justify-between items-center text-left hover:shadow-md transition-shadow">
                            <div className="pr-6">
                                <h4 className="font-bold text-black mb-2 text-sm">Deloitte Fast 50</h4>
                                <p className="text-[10px] text-gray-700 font-semibold">Przez trzy lata z rzędu w latach 2022, 2023 i 2024 zostaliśmy wyróżnieni w rankingu Deloitte Fast 50 w Europie Środkowej.</p>
                            </div>
                            <div className="text-green-500 font-bold text-4xl whitespace-nowrap"><span className="text-xl text-gray-400 font-normal">3x</span> 50</div>
                        </div>
                        <div className="w-full md:w-1/3 rounded-xl overflow-hidden shadow-sm">
                            <img src="/images/about/about10.png" className="w-full h-full object-cover p-8 object-contain bg-gray-50 bg-opacity-50" alt="Deloitte" />
                        </div>
                    </div>

                    {/* Recognition 3 */}
                    <div className="flex flex-col md:flex-row gap-4 h-auto md:h-32">
                        <div className="w-full md:w-1/3 rounded-xl overflow-hidden shadow-sm">
                            <img src="/images/about/about11.png" className="w-full h-full object-cover p-8 object-contain bg-gray-50 bg-opacity-50" alt="Financial Times" />
                        </div>
                        <div className="w-full md:w-2/3 border border-[#2a3c7b] rounded-xl p-6 flex justify-between items-center text-left hover:shadow-md transition-shadow">
                            <div className="pr-6">
                                <h4 className="font-bold text-black mb-2 text-sm">Financial Times</h4>
                                <p className="text-[10px] text-gray-700 font-semibold">Zdobycie miejsca w prestiżowym rankingu Financial Times Top 1000 najszybciej rozwijających się firm w Europie 2024!</p>
                            </div>
                            <div className="text-right text-[8px] text-gray-400 font-bold leading-tight">FINANCIAL TIMES<br /><br />1000 Europe's<br />Fastest Growing Companies<br />2024</div>
                        </div>
                    </div>

                    {/* Recognition 4 */}
                    <div className="flex flex-col md:flex-row gap-4 h-auto md:h-32">
                        <div className="w-full md:w-2/3 border border-[#2a3c7b] rounded-xl p-6 flex justify-between items-center text-left hover:shadow-md transition-shadow">
                            <div className="pr-6">
                                <h4 className="font-bold text-black mb-2 text-sm">Nagrody Clutch</h4>
                                <p className="text-[10px] text-gray-700 font-semibold">Apzumi zyskało miano lidera i wielokrotnie zostało nagrodzone statuetkami serwisu Clutch, w tym tytułem Top B2B Worldwide.</p>
                            </div>
                            <div className="flex gap-2">
                                <div className="w-6 h-8 bg-gray-200 rounded-sm"></div>
                                <div className="w-6 h-8 bg-gray-300 rounded-full"></div>
                                <div className="w-6 h-8 bg-green-700 rounded-sm"></div>
                            </div>
                        </div>
                        <div className="w-full md:w-1/3 rounded-xl overflow-hidden shadow-sm">
                            <img src="/images/about/about12.png" className="w-full h-full object-cover p-6 object-contain bg-gray-50 bg-opacity-50" alt="Clutch awards" />
                        </div>
                    </div>
                </div>
            </section>

            {/* QUALITY STANDARDIZATION */}
            <section className="max-w-[1000px] mx-auto px-6 mb-24">
                <div className="bg-[#1e285a] rounded-3xl py-14 px-8 shadow-xl text-center text-white">
                    <h2 className="text-2xl md:text-3xl font-medium mb-10">
                        Standardy <span className="font-bold">Jakości</span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mx-auto">
                        {/* Card 1 */}
                        <div className="bg-white rounded-xl overflow-hidden flex flex-col text-left shadow-lg">
                            <div className="bg-[#a3bce2] p-8 flex justify-center items-center h-48">
                                <img src="/images/about/about13.png" alt="ISO 27001" className="h-full object-contain mix-blend-multiply" />
                            </div>
                            <div className="p-8">
                                <h3 className="text-black font-extrabold text-lg mb-3">ISO 27001</h3>
                                <p className="text-gray-600 text-[11px] leading-relaxed font-semibold">
                                    Nasz system zarządzania bezpieczeństwem informacji posiada certyfikat <span className="font-extrabold text-black">ISO 27001</span>, zapewniając najwyższe standardy ochrony danych i zarządzania ryzykiem.
                                </p>
                            </div>
                        </div>
                        {/* Card 2 */}
                        <div className="bg-white rounded-xl overflow-hidden flex flex-col text-left shadow-lg">
                            <div className="bg-[#a3bce2] p-8 flex justify-center items-center h-48">
                                <img src="/images/about/about14.png" alt="ISO 13485" className="h-full object-contain mix-blend-multiply" />
                            </div>
                            <div className="p-8">
                                <h3 className="text-black font-extrabold text-lg mb-3">ISO 13485</h3>
                                <p className="text-gray-600 text-[11px] leading-relaxed font-semibold">
                                    Rozwiązania tworzone przez Apzumi są zgodne z procedurami opartymi o <span className="font-extrabold text-black">ISO 13485</span> w pełnym procesie kontroli wytwarzania oprogramowania, zapewniając najwyższą jakość wdrażanych systemów dla naszych klientów.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* MISSION & VALUES (V2 ONLY) */}
            {version === 'v2' && (
                <section className="max-w-[1200px] mx-auto px-6 mb-24">
                    <div className="bg-[#2a3c7b] rounded-[2rem] p-8 md:p-12 shadow-xl">
                        <h2 className="text-center text-3xl md:text-4xl text-white mb-12">
                            <TextBlock id="about_v2_heading">Misja & <span className="font-extrabold">Wartości</span></TextBlock>
                        </h2>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                            {/* Left Column */}
                            <div className="flex flex-col h-full">
                                <h3 className="text-white text-xl font-bold mb-6"><TextBlock id="about_v2_mission_heading">Nasza Misja</TextBlock></h3>
                                <div className="bg-white rounded-2xl flex flex-col overflow-hidden shadow-lg h-full relative">
                                    <div className="flex-1 w-full bg-gray-100">
                                        <img src="/images/about/about15.png" alt="Apzumi Team" className="w-full h-[300px] lg:h-full object-cover object-center" />
                                    </div>
                                    <div className="p-8 md:p-10 relative bg-white flex flex-col items-center justify-center shrink-0 min-h-[140px]">
                                        <span className="text-[#2a3c7b] text-6xl md:text-7xl font-serif font-bold absolute top-2 left-6 leading-none">“</span>
                                        <p className="text-lg md:text-xl font-extrabold text-center text-black px-6 z-10 w-full relative pt-2">
                                            <TextBlock id="about_v2_mission_quote">Przekształcamy złożone wyzwania produkcyjne w mierzalne zyski.</TextBlock>
                                        </p>
                                        <span className="text-[#2a3c7b] text-6xl md:text-7xl font-serif font-bold absolute bottom-0 right-6 leading-none rotate-180">“</span>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column */}
                            <div className="flex flex-col h-full">
                                <h3 className="text-white text-xl font-bold mb-6"><TextBlock id="about_v2_comp_heading">Kompetencje i doświadczenie</TextBlock></h3>
                                <div className="flex flex-col gap-4">
                                    {/* Podejscie */}
                                    <div className="bg-white rounded-2xl p-6 flex items-start gap-4 shadow-sm">
                                        <div className="w-12 h-12 rounded-full border-2 border-[#2a3c7b]/20 text-[#2a3c7b] flex items-center justify-center flex-shrink-0 bg-blue-50">
                                            <Target size={22} className="text-[#2a3c7b]" />
                                        </div>
                                        <div className="mt-1">
                                            <h4 className="font-extrabold text-black mb-1 text-sm"><TextBlock id="about_v2_approach_t">Wiodące Podejście</TextBlock></h4>
                                            <p className="text-xs font-semibold text-gray-700 leading-relaxed"><TextBlock id="about_v2_approach_d">Proces wyznacza cel, technologia podąża za nim.</TextBlock></p>
                                        </div>
                                    </div>

                                    {/* Comp 1 */}
                                    <div className="bg-white rounded-2xl p-6 flex items-start gap-4 shadow-sm">
                                        <div className="w-12 h-12 rounded-full border-2 border-[#2a3c7b]/20 text-[#2a3c7b] flex items-center justify-center flex-shrink-0 bg-blue-50">
                                            <Cpu size={22} />
                                        </div>
                                        <div className="mt-1">
                                            <h4 className="font-extrabold text-black mb-1 text-sm"><TextBlock id="about_v2_exp1_t">Spatial Computing & AI</TextBlock></h4>
                                            <p className="text-xs font-semibold text-gray-700 leading-relaxed"><TextBlock id="about_v2_exp1_d">Doświadczenie w pracy z technologiami Spatial Computing i AI oraz głębokie zrozumienie specyfiki nowoczesnego przemysłu.</TextBlock></p>
                                        </div>
                                    </div>

                                    {/* Comp 2 */}
                                    <div className="bg-white rounded-2xl p-6 flex items-start gap-4 shadow-sm">
                                        <div className="w-12 h-12 rounded-full border-2 border-red-500/20 text-apzumi-red flex items-center justify-center flex-shrink-0 bg-red-50">
                                            <Zap size={22} className="text-apzumi-red" />
                                        </div>
                                        <div className="mt-1">
                                            <h4 className="font-extrabold text-black mb-1 text-sm"><TextBlock id="about_v2_exp2_t">Agile & Rapid Prototyping</TextBlock></h4>
                                            <p className="text-xs font-semibold text-gray-700 leading-relaxed"><TextBlock id="about_v2_exp2_d">Zwinne podejście do rozwoju, szybkie prototypowanie (PoC) oraz błyskawiczna walidacja w warunkach fabrycznych.</TextBlock></p>
                                        </div>
                                    </div>

                                    {/* Comp 3 */}
                                    <div className="bg-white rounded-2xl p-6 flex items-start gap-4 shadow-sm">
                                        <div className="w-12 h-12 rounded-full border-2 border-[#2a3c7b]/20 text-[#2a3c7b] flex items-center justify-center flex-shrink-0 bg-blue-50">
                                            <Layers size={22} />
                                        </div>
                                        <div className="mt-1">
                                            <h4 className="font-extrabold text-black mb-1 text-sm"><TextBlock id="about_v2_exp3_t">Unikalne Know-how</TextBlock></h4>
                                            <p className="text-xs font-semibold text-gray-700 leading-relaxed"><TextBlock id="about_v2_exp3_d">Unikalne wiedza umożliwiająca szybkie dostarczanie wartości w oparciu o otwartą platformę Apzumi Spatial.</TextBlock></p>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

        </div>
    );
};

export default AboutPage;
