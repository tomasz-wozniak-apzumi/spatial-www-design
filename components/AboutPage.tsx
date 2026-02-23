import React from 'react';
import TextBlock from './TextBlock';
import { ViewState } from '../App';

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
                            <TextBlock id="about_main_title">About</TextBlock>
                        </h1>
                        <p className="text-sm md:text-[15px] leading-relaxed text-gray-300 mx-auto mb-8 max-w-[480px]">
                            <TextBlock id="about_main_subtitle">Get to know the people, purpose, and principles behind our operations in the digital health industry</TextBlock>
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                            <button className="border border-white/20 text-white bg-transparent hover:bg-white/10 shadow-sm rounded-[24px] px-8 py-3 text-sm font-semibold transition-colors flex items-center justify-between min-w-[200px]">
                                <TextBlock id="about_btn_mission">Mission and Values</TextBlock>
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                            </button>
                            <button
                                className="bg-apzumi-red hover:bg-red-600 text-white shadow-md rounded-[24px] px-8 py-3 text-sm font-semibold transition-colors flex items-center justify-between min-w-[200px]"
                            >
                                <TextBlock id="about_btn_contact">Our Team</TextBlock>
                                <svg className="w-4 h-4 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* WHO WE ARE */}
            <section className="max-w-[1000px] mx-auto px-6 mb-20">
                <div className="bg-[#2a3c7b] rounded-[2rem] p-8 md:p-12 text-center text-white shadow-xl relative overflow-hidden">
                    <h2 className="text-2xl font-bold mb-10"><TextBlock id="about_who_we_are">Who <span className="font-extrabold">We Are</span></TextBlock></h2>

                    <div className="bg-white rounded-2xl flex flex-col md:flex-row overflow-hidden text-left mb-8">
                        <div className="p-8 md:p-10 md:w-1/2 flex flex-col justify-center">
                            <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-2"><TextBlock id="about_who_pre">We are a</TextBlock></p>
                            <h3 className="text-[#2a3c7b] text-3xl font-extrabold mb-4 leading-tight"><TextBlock id="about_who_title">Digital Health<br />Software House</TextBlock></h3>
                            <p className="text-gray-700 text-sm font-semibold pr-4"><TextBlock id="about_who_desc">Software experts shaping digital solutions in the fields of Healthcare, Fitness & Wellness and Digital Insurance</TextBlock></p>
                        </div>
                        <div className="md:w-1/2 h-64 md:h-auto overflow-hidden">
                            <img src="/images/about/about3.png" className="w-full h-full object-cover" alt="Apzumi Team" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            { stat: "12+", label: "years on the market", id: "1" },
                            { stat: "150+", label: "completed projects", id: "2" },
                            { stat: "70+", label: "people on board", id: "3" },
                            { stat: "15+", label: "markets reached", id: "4" }
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
                <h2 className="text-xl md:text-2xl font-bold mb-8 text-black">Added <span className="font-extrabold">Value</span></h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    {/* Card 1 */}
                    <div className="border border-[#2a3c7b] rounded-xl p-6 flex flex-col justify-between items-center shadow-sm hover:shadow-md transition-shadow min-h-[160px]">
                        <div className="flex-1 flex items-center justify-center mb-4 min-h-[64px] w-full">
                            <img src="/images/about/about4.png" className="h-20 w-auto object-contain" alt="12 years" />
                        </div>
                        <p className="text-sm font-bold text-black border-t border-gray-100 pt-4 w-full">Stable Partner</p>
                    </div>
                    {/* Card 2 */}
                    <div className="border border-[#2a3c7b] rounded-xl p-6 flex flex-col justify-between items-center shadow-sm hover:shadow-md transition-shadow min-h-[160px]">
                        <div className="flex-1 flex items-center justify-center mb-4 min-h-[64px] w-full">
                            <img src="/images/about/about5.png" className="h-[52px] w-auto object-contain" alt="Cost Effectiveness" />
                        </div>
                        <p className="text-sm font-bold text-black border-t border-gray-100 pt-4 w-full">Cost-Effectiveness</p>
                    </div>
                    {/* Card 3 */}
                    <div className="border border-[#2a3c7b] rounded-xl p-6 flex flex-col justify-between items-center shadow-sm hover:shadow-md transition-shadow min-h-[160px]">
                        <div className="flex-1 flex items-center justify-center mb-4 min-h-[64px] w-full">
                            <img src="/images/about/about6.png" className="h-16 w-auto object-contain" alt="Market Recognition" />
                        </div>
                        <p className="text-sm font-bold text-black border-t border-gray-100 pt-4 w-full">Market Recognition</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Card 4 */}
                    <div className="border border-[#2a3c7b] rounded-xl p-6 flex items-start text-left shadow-sm hover:shadow-md transition-shadow">
                        <img src="/images/about/about7.png" className="w-14 h-14 object-contain mr-4 flex-shrink-0" alt="Digital Health Specialization" />
                        <div>
                            <p className="text-sm font-bold text-black mb-1">Digital Health Specialization</p>
                            <p className="text-[13px] leading-relaxed text-black font-semibold">Go beyond standard software house; choose partner with deep understanding of healthcare software requirements.</p>
                        </div>
                    </div>
                    {/* Card 5 */}
                    <div className="border border-[#2a3c7b] rounded-xl p-6 flex items-start text-left shadow-sm hover:shadow-md transition-shadow">
                        <img src="/images/about/about8.png" className="w-14 h-14 object-contain mr-4 flex-shrink-0" alt="Problem Solving" />
                        <div>
                            <p className="text-sm font-bold text-black mb-1">Problem Solving</p>
                            <p className="text-[13px] leading-relaxed text-black font-semibold">We focus on your business needs - we analyze challenges, and seek solutions that solve real problems and deliver value.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* INDUSTRY RECOGNITION */}
            <section className="max-w-[1000px] mx-auto px-6 mb-24 text-center">
                <h2 className="text-xl md:text-2xl font-bold mb-8 text-black">Industry <span className="font-extrabold">Recognition</span></h2>

                <div className="grid gap-4">
                    {/* Recognition 1 */}
                    <div className="flex flex-col md:flex-row gap-4 h-auto md:h-32">
                        <div className="w-full md:w-1/3 rounded-xl overflow-hidden shadow-sm">
                            <img src="/images/about/about9.png" className="w-full h-full object-cover" alt="Diamonds" />
                        </div>
                        <div className="w-full md:w-2/3 border border-[#2a3c7b] rounded-xl p-6 flex justify-between items-center text-left hover:shadow-md transition-shadow">
                            <div className="pr-6">
                                <h4 className="font-bold text-black mb-2 text-sm">Forbes Diamond Award</h4>
                                <p className="text-[10px] text-gray-700 font-semibold">Apzumi has been awarded the prestigious Forbes Diamonds title for 2024, ranking among the fastest growing Polish companies.</p>
                            </div>
                            <div className="w-16 h-16 flex-shrink-0 opacity-80 border-2 border-blue-400 rotate-45 flex items-center justify-center p-2"><span className="text-[8px] -rotate-45 block font-bold text-blue-500 text-center">Forbes<br />2024</span></div>
                        </div>
                    </div>

                    {/* Recognition 2 */}
                    <div className="flex flex-col md:flex-row gap-4 h-auto md:h-32">
                        <div className="w-full md:w-2/3 border border-[#2a3c7b] rounded-xl p-6 flex justify-between items-center text-left hover:shadow-md transition-shadow">
                            <div className="pr-6">
                                <h4 className="font-bold text-black mb-2 text-sm">Deloitte Fast 50</h4>
                                <p className="text-[10px] text-gray-700 font-semibold">For three consecutive years - 2022, 2023, and 2024 we were recognized in the Deloitte Fast 50 ranking.</p>
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
                                <h4 className="font-bold text-black mb-2 text-sm">Finacial Times</h4>
                                <p className="text-[10px] text-gray-700 font-semibold">Apzumi has earned a spot in the prestigious Financial Times 1000 list of Europe's Fastest Growing Companies for 2024!</p>
                            </div>
                            <div className="text-right text-[8px] text-gray-400 font-bold leading-tight">FINANCIAL TIMES<br /><br />1000 Europe's<br />Fastest Growing Companies<br />2024</div>
                        </div>
                    </div>

                    {/* Recognition 4 */}
                    <div className="flex flex-col md:flex-row gap-4 h-auto md:h-32">
                        <div className="w-full md:w-2/3 border border-[#2a3c7b] rounded-xl p-6 flex justify-between items-center text-left hover:shadow-md transition-shadow">
                            <div className="pr-6">
                                <h4 className="font-bold text-black mb-2 text-sm">Clutch Awards</h4>
                                <p className="text-[10px] text-gray-700 font-semibold">Apzumi has earned multiple Clutch awards, like Top Health & Wellness App Developers and Top B2B Worldwide.</p>
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

        </div>
    );
};

export default AboutPage;
