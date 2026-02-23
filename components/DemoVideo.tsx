import React, { useState, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { HomeVersion } from '../App';

interface DemoVideoProps {
    version?: HomeVersion;
}

const DemoVideo: React.FC<DemoVideoProps> = ({ version = 'v1' }) => {
    const [isMuted, setIsMuted] = useState(true);
    const videoRef = useRef<HTMLVideoElement>(null);

    if (version !== 'v2') return null;

    const toggleMute = () => {
        setIsMuted(!isMuted);
        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
        }
    };

    return (
        <section className="bg-white py-8 md:py-16 px-6">
            <div
                className="max-w-7xl mx-auto rounded-[2rem] overflow-hidden shadow-2xl border border-gray-100 relative bg-gray-50 flex justify-center items-center aspect-video cursor-pointer group"
                onClick={toggleMute}
            >
                <video
                    ref={videoRef}
                    src="/videos/demoSpatialPL.mov"
                    autoPlay
                    loop
                    muted={isMuted}
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Overlay for icon visibility and interaction cue */}
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="bg-white/20 backdrop-blur-md p-4 rounded-full text-white">
                        {isMuted ? <VolumeX size={32} /> : <Volume2 size={32} />}
                    </div>
                </div>

                {/* Permanent subtle indicator on the bottom right */}
                <div className="absolute bottom-6 right-6 bg-black/40 backdrop-blur-sm p-3 rounded-full text-white opacity-60 group-hover:opacity-100 transition-opacity">
                    {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </div>
            </div>
        </section>
    );
};

export default DemoVideo;
