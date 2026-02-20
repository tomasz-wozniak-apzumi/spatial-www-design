import React, { useState, useRef, useEffect } from 'react';
import { ViewState } from '../App';
import { X, AlertCircle } from 'lucide-react';

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
    10: { x: 0, y: 0, width: 0, height: 0 }, // No interaction for the last video
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
    const videoRef = useRef<HTMLVideoElement>(null);

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
            setCurrentVideo(prev => prev + 1);
            setIsVideoEnded(false);
            setShowFeedback(false);
        } else {
            setShowFeedback(true);
            setTimeout(() => setShowFeedback(false), 3000);
        }
    };

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.play().catch(err => console.log("Autoplay blocked:", err));
        }
    }, [currentVideo]);

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
                <video
                    ref={videoRef}
                    key={currentVideo}
                    src={`/videos/video${currentVideo}.mp4`}
                    className="max-w-full max-h-full w-full h-full object-contain"
                    onEnded={handleVideoEnd}
                    autoPlay
                    muted={false}
                    playsInline
                    controlsList="nodownload nofullscreen noremoteplayback"
                    disablePictureInPicture
                    onContextMenu={(e) => e.preventDefault()}
                />

                {/* Interaction Overlay (only active when video ends and it's not the last one) */}
                {isVideoEnded && currentVideo < 10 && (
                    <div className="absolute inset-0 cursor-pointer bg-black/20">
                        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 text-white text-center animate-pulse pointer-events-none">
                            <p className="text-xl font-bold uppercase tracking-widest drop-shadow-lg">
                                Kliknij w interaktywny obszar, aby kontynuować
                            </p>
                        </div>

                        <FuturisticFrame zone={TARGET_ZONES[currentVideo]} />
                    </div>
                )}

                {/* Feedback Message */}
                {showFeedback && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-600/90 text-white px-8 py-4 rounded-2xl shadow-2xl backdrop-blur-md flex items-center gap-3 animate-in fade-in zoom-in duration-300 pointer-events-none">
                        <AlertCircle size={24} />
                        <span className="font-bold text-lg">To nie jest ten obszar! Spróbuj kliknąć wewnątrz ramki.</span>
                    </div>
                )}

                {/* Completion Screen for Video 10 */}
                {isVideoEnded && currentVideo === 10 && (
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center text-white p-8">
                        <h2 className="text-4xl font-bold mb-6">Gratulacje!</h2>
                        <p className="text-xl mb-8 text-center max-w-md">Ukończyłeś interaktywne demo rozwiązań Apzumi Spatial.</p>
                        <button
                            onClick={() => onNavigate('solutions')}
                            className="bg-apzumi-red hover:bg-red-600 px-8 py-4 rounded-full font-bold text-lg transition-transform hover:scale-105"
                        >
                            Powrót do rozwiązań
                        </button>
                    </div>
                )}
            </div>

            {/* Progress Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
                {Array.from({ length: 10 }).map((_, i) => (
                    <div
                        key={i}
                        className={`h-1.5 transition-all duration-300 rounded-full ${i + 1 === currentVideo ? 'w-8 bg-apzumi-red' : 'w-4 bg-white/30'}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default InteractiveDemo;
