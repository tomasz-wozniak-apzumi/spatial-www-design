import React from 'react';
import { HomeVersion } from '../App';

interface DemoVideoProps {
    version?: HomeVersion;
}

const DemoVideo: React.FC<DemoVideoProps> = ({ version = 'v1' }) => {
    if (version !== 'v2') return null;

    return (
        <section className="bg-white py-8 md:py-16 px-6">
            <div className="max-w-7xl mx-auto rounded-[2rem] overflow-hidden shadow-2xl border border-gray-100 relative bg-gray-50 flex justify-center items-center aspect-video">
                <video
                    src="/videos/demoSpatialPL.mov"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                />
            </div>
        </section>
    );
};

export default DemoVideo;
