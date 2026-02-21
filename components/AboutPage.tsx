import React from 'react';
import TextBlock from './TextBlock';
import { ViewState } from '../App';

interface AboutPageProps {
    onNavigate: (view: ViewState) => void;
}

const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
    return (
        <div className="pt-24 min-h-screen bg-white">
            {/* Hero Section */}
            <section className="bg-apzumi-dark text-white py-24 px-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-apzumi-red/20 to-transparent pointer-events-none"></div>
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="max-w-3xl">
                        <div className="text-apzumi-red font-bold tracking-widest uppercase text-sm mb-4">
                            <TextBlock id="about_pre">O nas</TextBlock>
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                            <TextBlock id="about_title">Tworzymy rozwiązania z myślą o ludziach.</TextBlock>
                        </h1>
                        <p className="text-xl text-gray-400 leading-relaxed">
                            <TextBlock id="about_desc">W Apzumi Spatial wierzymy, że nowe technologie nie mają zastępować pracowników, ale dawać im supermoce. Projektujemy aplikacje wspierające produkcję i utrzymanie ruchu.</TextBlock>
                        </p>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-24 px-6">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
                    <div>
                        <h2 className="text-3xl font-bold mb-6 text-apzumi-dark">
                            <TextBlock id="about_mission">Nasza Misja</TextBlock>
                        </h2>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            <TextBlock id="about_mission_desc">
                                Łączymy świat cyfrowy z fizycznym, aby ułatwiać pracę tam, gdzie technologia do tej pory nie docierała. Dzięki instrukcjom przestrzennym, asystentom AI oraz rozwiązaniom mobilnym zwiększamy bezpieczeństwo i wydajność zespołów pracujących w najtrudniejszych warunkach na liniach produkcyjnych.
                            </TextBlock>
                        </p>
                    </div>
                    <div className="bg-gray-50 p-8 py-12 rounded-3xl border border-gray-100 flex flex-col justify-center shadow-sm">
                        <h3 className="text-2xl font-bold mb-4 text-apzumi-dark">
                            <TextBlock id="about_vision">Skupienie na jakości</TextBlock>
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                            <TextBlock id="about_vision_desc">
                                Od lat dostarczamy najwyższej klasy oprogramowanie dla międzynarodowych marek. Nie idziemy na kompromisy - nasze aplikacje muszą działać szybko, niezawodnie i być na tyle intuicyjne, aby wdrożenie zespołu na produkcji trwało minuty, a nie tygodnie.
                            </TextBlock>
                        </p>
                    </div>
                </div>
            </section>

            {/* Call to action */}
            <section className="py-24 px-6 bg-apzumi-dark text-center">
                <h2 className="text-3xl font-bold text-white mb-6">
                    <TextBlock id="about_cta_title">Chcesz nas lepiej poznać?</TextBlock>
                </h2>
                <button onClick={() => {
                    onNavigate('home');
                    setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 100);
                }}
                    className="bg-apzumi-red text-white px-8 py-4 rounded font-bold hover:bg-red-600 transition-colors inline-block"
                >
                    <TextBlock id="about_cta_btn">Skontaktuj się z nami</TextBlock>
                </button>
            </section>
        </div>
    );
};

export default AboutPage;
