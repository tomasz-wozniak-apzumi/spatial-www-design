import React, { useState, useRef, useEffect } from 'react';
import { ViewState } from '../App';
import { X, AlertCircle, ArrowBigDown } from 'lucide-react';

interface InteractiveDemoProps {
    onNavigate: (view: ViewState) => void;
}

interface TargetZone {
    x: number;
    y: number;
    width: number;
    height: number;
}

const TARGET_ZONES: Record<number, TargetZone> = {
    1: { x: 60, y: 60, width: 30, height: 30 },
    2: { x: 10, y: 10, width: 30, height: 30 },
    3: { x: 40, y: 40, width: 20, height: 20 },
    4: { x: 70, y: 10, width: 25, height: 25 },
    5: { x: 10, y: 70, width: 25, height: 25 },
    6: { x: 30, y: 60, width: 30, height: 20 },
    7: { x: 60, y: 30, width: 20, height: 30 },
    8: { x: 20, y: 20, width: 40, height: 20 },
    9: { x: 50, y: 70, width: 40, height: 20 },
    10: { x: 0, y: 0, width: 0, height: 0 },
};

const FuturisticFrame: React.FC<{ zone: TargetZone }> = ({ zone }) => (
    <div
        className="futuristic-frame"
        style={{
            left: `${zone.x}%`,
            top: `${zone.y}%`,
            width: `${zone.width}%`,
            height: `${zone.height}%`,
        }}
    >
        <div className="arrow-indicator">
            <ArrowBigDown size={48} fill="currentColor" />
        </div>
        <div className="frame-corner corner-tl" />
        <div className="frame-corner corner-tr" />
        <div className="frame-corner corner-bl" />
        <div className="frame-corner corner-br" />
    </div>
);

const InteractiveDemo: React.FC<InteractiveDemoProps> = ({ onNavigate }) => {
    const [currentVideo, setCurrentVideo] = useState<number>(1);
    const [isVideoEnded, setIsVideoEnded] = useState(false);
    const [showFeedback, setShowFeedback] = useState(false);
    const [activeBuffer, setActiveBuffer] = useState<'A' | 'B'>('A');

    const videoRefA = useRef<HTMLVideoElement>(null);
    const videoRefB = useRef<HTMLVideoElement>(null);

    const handleVideoEnd = () => {
        setIsVideoEnded(true);
    };

    const handleInteraction = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isVideoEnded || currentVideo >= 10) return;

        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        const zone = TARGET_ZONES[currentVideo];
        const isCorrectArea =
            x >= zone.x &&
            x <= zone.x + zone.width &&
            y >= zone.y &&
            y <= zone.y + zone.height;

        if (isCorrectArea) {
            const nextVideo = currentVideo + 1;
            const nextBuffer = activeBuffer === 'A' ? 'B' : 'A';

            // Play the preloaded video
            const nextRef = nextBuffer === 'A' ? videoRefA : videoRefB;
            if (nextRef.current) {
                nextRef.current.play().catch(err => console.log("Play failed:", err));
            }

            setCurrentVideo(nextVideo);
            setActiveBuffer(nextBuffer);
            setIsVideoEnded(false);
            setShowFeedback(false);
        } else {
            setShowFeedback(true);
            setTimeout(() => setShowFeedback(false), 3000);
        }
    };

    // Initial play and preloading logic
    useEffect(() => {
        // Initial setup for first load
        if (currentVideo === 1) {
            if (videoRefA.current && !videoRefA.current.src.includes("/videos/video1.mp4")) {
                videoRefA.current.src = "/videos/video1.mp4";
                videoRefA.current.play().catch(err => console.log("Initial play failed:", err));
            }
            if (videoRefB.current && !videoRefB.current.src.includes("/videos/video2.mp4")) {
                videoRefB.current.src = "/videos/video2.mp4";
                videoRefB.current.load();
            }
        }

        // Preload next video in the inactive buffer
        const nextVideoIndex = currentVideo + 1;
        if (nextVideoIndex <= 10) {
            const inactiveBuffer = activeBuffer === 'A' ? 'B' : 'A';
            const inactiveRef = inactiveBuffer === 'A' ? videoRefA : videoRefB;
            if (inactiveRef.current) {
                const nextSrc = `/videos/video${nextVideoIndex}.mp4`;
                if (!inactiveRef.current.src.includes(nextSrc)) {
                    inactiveRef.current.src = nextSrc;
                    inactiveRef.current.load();
                }
            }
        }
    }, [currentVideo, activeBuffer]);

    return (
        <div className="fixed inset-0 bg-black z-[10000] flex items-center justify-center overflow-hidden">
            {/* Close Button */}
            <button
                onClick={() => onNavigate('solutions')}
                className="absolute top-6 right-6 z-[10002] p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
            >
                <X size={24} />
            </button>

            <div
                className="relative w-full h-full flex items-center justify-center"
                onClick={handleInteraction}
            >
                {/* Dual Video Buffers */}
                <video
                    ref={videoRefA}
                    className={`absolute inset-0 w-full h-full object-contain video-container ${activeBuffer === 'A' ? 'video-active' : 'pointer-events-none'}`}
                    onEnded={activeBuffer === 'A' ? handleVideoEnd : undefined}
                    muted={false}
                    playsInline
                    controlsList="nodownload nofullscreen noremoteplayback"
                    disablePictureInPicture
                    onContextMenu={(e) => e.preventDefault()}
                />
                <video
                    ref={videoRefB}
                    className={`absolute inset-0 w-full h-full object-contain video-container ${activeBuffer === 'B' ? 'video-active' : 'pointer-events-none'}`}
                    onEnded={activeBuffer === 'B' ? handleVideoEnd : undefined}
                    muted={false}
                    playsInline
                    controlsList="nodownload nofullscreen noremoteplayback"
                    disablePictureInPicture
                    onContextMenu={(e) => e.preventDefault()}
                />

                {/* Interaction Overlay */}
                {isVideoEnded && currentVideo < 10 && (
                    <div className="absolute inset-0 cursor-pointer bg-black/40 z-[10001]">
                        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 text-white text-center animate-pulse pointer-events-none">
                            <p className="text-3xl font-black uppercase tracking-tighter drop-shadow-[0_0_20px_rgba(240,78,78,0.8)]">
                                Kliknij w podświetlony obszar
                            </p>
                        </div>

                        <FuturisticFrame zone={TARGET_ZONES[currentVideo]} />
                    </div>
                )}

                {/* Feedback Message */}
                {showFeedback && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-600 text-white px-10 py-5 rounded-2xl shadow-[0_0_50px_rgba(240,78,78,0.5)] flex items-center gap-4 animate-in fade-in zoom-in duration-300 pointer-events-none z-[10010]">
                        <AlertCircle size={40} />
                        <span className="font-black text-2xl uppercase italic">Zły obszar! Kliknij w ramkę!</span>
                    </div>
                )}

                {/* Completion Screen */}
                {isVideoEnded && currentVideo === 10 && (
                    <div className="absolute inset-0 bg-black/90 backdrop-blur-xl flex flex-col items-center justify-center text-white p-8 z-[10020]">
                        <div className="w-32 h-32 bg-apzumi-red rounded-full flex items-center justify-center mb-10 shadow-[0_0_60px_rgba(240,78,78,0.8)] animate-bounce">
                            <ArrowBigDown size={64} className="rotate-180" />
                        </div>
                        <h2 className="text-6xl font-black mb-6 tracking-tighter uppercase text-center">Scenariusz Gotowy</h2>
                        <p className="text-2xl mb-12 text-center max-w-2xl text-gray-400 font-medium">Poznałeś wszystkie kroki cyfrowego workflow wspieranego przez Apzumi Spatial.</p>
                        <button
                            onClick={() => onNavigate('solutions')}
                            className="bg-white text-apzumi-dark hover:bg-apzumi-red hover:text-white px-16 py-6 rounded-full font-black text-2xl uppercase tracking-tighter transition-all hover:scale-110 shadow-[0_0_40px_rgba(255,255,255,0.2)]"
                        >
                            Zakończ Demo
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default InteractiveDemo;
