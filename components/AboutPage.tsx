import React from 'react';
import TextBlock from './TextBlock';
import { ViewState } from '../App';

interface AboutPageProps {
    onNavigate: (view: ViewState) => void;
    version?: 'v1' | 'v2' | 'v3';
}

const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, version = 'v1' }) => {
    return (
        <div className="pt-28 pb-20 min-h-screen bg-white font-sans text-apzumi-dark selection:bg-apzumi-red selection:text-white">

            {/* HEADER - ABOUT */}
            <section className="text-center px-4 mb-16 relative">
                <div className="absolute left-0 top-0 bottom-0 w-64 hidden xl:block pointer-events-none opacity-60">
                    <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=400&auto=format&fit=crop" className="object-cover w-full h-[180px] rounded-r-full shadow-lg" alt="Team 1" />
                </div>
                <div className="absolute right-0 top-0 bottom-0 w-64 hidden xl:block pointer-events-none opacity-60">
                    <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=400&auto=format&fit=crop" className="object-cover w-full h-[180px] rounded-l-full shadow-lg" alt="Team 2" />
                </div>

                <div className="max-w-3xl mx-auto py-8">
                    <h1 className="text-5xl md:text-6xl font-bold mb-4">
                        <TextBlock id="about_main_title">About</TextBlock>
                    </h1>
                    <p className="text-sm md:text-base text-gray-600 font-semibold uppercase tracking-wide max-w-lg mx-auto mb-6">
                        <TextBlock id="about_main_subtitle">Get to know the people, purpose, and principles driving our operations in the digital health industry</TextBlock>
                    </p>
                    <div className="flex justify-center items-center gap-3">
                        <button className="border border-apzumi-dark text-apzumi-dark hover:bg-gray-50 rounded-full px-6 py-2 text-xs font-bold transition-colors">
                            <TextBlock id="about_btn_mission">Mission and values <span className="text-[10px] opacity-70 ml-1">▼</span></TextBlock>
                        </button>
                        <button
                            onClick={() => {
                                onNavigate('home');
                                setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 100);
                            }}
                            className="bg-apzumi-dark text-white rounded-full px-6 py-2 text-xs font-bold hover:bg-black transition-colors"
                        >
                            <TextBlock id="about_btn_contact">Contact Us <span className="text-[10px] opacity-70 ml-1">▶</span></TextBlock>
                        </button>
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
                        <div className="md:w-1/2 h-64 md:h-auto bg-gray-200">
                            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover grayscale opacity-90 mix-blend-multiply" alt="Apzumi Team" />
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
                    <div className="border border-[#2a3c7b] rounded-xl p-6 flex flex-col justify-center items-center shadow-sm hover:shadow-md transition-shadow">
                        <h3 className="text-3xl font-extrabold text-[#2a3c7b] mb-1">12 <span className="text-sm">years</span></h3>
                        <p className="text-xs text-gray-500 mb-3">on the market</p>
                        <p className="text-sm font-bold text-black border-t border-gray-200 pt-3 w-full">Stable Partner</p>
                    </div>
                    {/* Card 2 */}
                    <div className="border border-[#2a3c7b] rounded-xl p-6 flex flex-col justify-center items-center shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex gap-2 mb-4 h-12 items-center">
                            {/* EU flag simulation */}
                            <div className="w-10 h-7 bg-blue-700 flex items-center justify-center rounded-sm"><span className="text-[8px] text-yellow-400">★ ★</span></div>
                            <div className="w-10 h-7 bg-red-600 rounded-sm"></div>
                        </div>
                        <p className="text-sm font-bold text-black border-t border-gray-200 pt-3 w-full">Cost-Effectiveness</p>
                    </div>
                    {/* Card 3 */}
                    <div className="border border-[#2a3c7b] rounded-xl p-6 flex flex-col justify-center items-center shadow-sm hover:shadow-md transition-shadow">
                        <h3 className="text-lg font-bold text-black mb-1">Clutch</h3>
                        <div className="text-apzumi-red text-xs mb-3">★★★★★</div>
                        <p className="text-sm font-bold text-black border-t border-gray-200 pt-3 w-full">Market Recognition</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Card 4 */}
                    <div className="border border-[#2a3c7b] rounded-xl p-6 flex items-start text-left shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 flex-shrink-0 bg-blue-50 flex items-center justify-center rounded-lg mr-4">
                            <span className="text-2xl text-apzumi-red text-center mx-auto block w-full text-center">💻</span>
                        </div>
                        <div>
                            <p className="text-sm font-bold text-black mb-1">Digital Health Specialization</p>
                            <p className="text-xs text-black font-semibold">Go beyond standard software house; choose partner with deep understanding of healthcare software requirements.</p>
                        </div>
                    </div>
                    {/* Card 5 */}
                    <div className="border border-[#2a3c7b] rounded-xl p-6 flex items-start text-left shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 flex-shrink-0 bg-blue-50 flex items-center justify-center rounded-lg mr-4 pb-2">
                            <span className="text-2xl mx-auto block w-full text-center">🧠</span>
                        </div>
                        <div>
                            <p className="text-sm font-bold text-black mb-1">Problem Solving</p>
                            <p className="text-xs text-black font-semibold">We focus on your business needs - we analyze challenges, and seek solutions that solve real problems and deliver value.</p>
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
                            <img src="https://images.unsplash.com/photo-1616599725890-0f231e6b3564?q=80&w=400&auto=format&fit=crop" className="w-full h-full object-cover" alt="Diamonds" />
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
                            <img src="https://images.unsplash.com/photo-1542382103-68d27fb4cefa?q=80&w=400&auto=format&fit=crop" className="w-full h-full object-cover" alt="Deloitte" />
                        </div>
                    </div>

                    {/* Recognition 3 */}
                    <div className="flex flex-col md:flex-row gap-4 h-auto md:h-32">
                        <div className="w-full md:w-1/3 rounded-xl overflow-hidden shadow-sm">
                            <img src="https://images.unsplash.com/photo-1507676184212-d0330a15183ca?q=80&w=400&auto=format&fit=crop" className="w-full h-full object-cover" alt="Financial Times" />
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
                            <img src="https://images.unsplash.com/photo-1555529902-5261145633bf?q=80&w=400&auto=format&fit=crop" className="w-full h-full object-cover" alt="Clutch team" />
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default AboutPage;
