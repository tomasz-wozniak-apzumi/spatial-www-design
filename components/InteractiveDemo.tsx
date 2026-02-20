import React, { useState, useRef, useEffect } from 'react';
import { ViewState } from '../App';
import { X, AlertCircle } from 'lucide-react';

interface InteractiveDemoProps {
    onNavigate: (view: ViewState) => void;
}

const InteractiveDemo: React.FC<InteractiveDemoProps> = ({ onNavigate }) => {
    const [currentVideo, setCurrentVideo] = useState<1 | 2>(1);
    const [isVideo1Ended, setIsVideo1Ended] = useState(false);
    const [showFeedback, setShowFeedback] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    const handleVideo1End = () => {
        setIsVideo1Ended(true);
    };

    const handleInteraction = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isVideo1Ended || currentVideo === 2) return;

        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        // Target area: bottom-right, roughly 1/3 from both edges.
        // Let's define it as X > 60% and Y > 60% with some margin from the very edge if needed.
        // "w 1/3 odległości od obu krawędzi" suggesting it's around 66% X and 66% Y.
        const isCorrectArea = x > 60 && x < 90 && y > 60 && y < 90;

        if (isCorrectArea) {
            setCurrentVideo(2);
            setIsVideo1Ended(false);
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
                    onEnded={currentVideo === 1 ? handleVideo1End : undefined}
                    autoPlay
                    muted={false}
                    playsInline
                    // Disable seeking and other controls
                    controlsList="nodownload nofullscreen noremoteplayback"
                    disablePictureInPicture
                    onContextMenu={(e) => e.preventDefault()}
                />

                {/* Interaction Overlay (only active when video 1 ends) */}
                {isVideo1Ended && currentVideo === 1 && (
                    <div className="absolute inset-0 cursor-pointer flex items-center justify-center bg-black/20">
                        <div className="text-white text-center animate-pulse">
                            <p className="text-xl font-bold uppercase tracking-widest drop-shadow-lg">
                                Kliknij w interaktywny obszar, aby kontynuować
                            </p>
                        </div>

                        {/* Optional: Dev hint for debugging (uncomment to see the box) */}
                        {/* <div className="absolute border-2 border-dashed border-red-500/30" style={{ left: '60%', top: '60%', width: '30%', height: '30%' }}></div> */}
                    </div>
                )}

                {/* Feedback Message */}
                {showFeedback && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-600/90 text-white px-8 py-4 rounded-2xl shadow-2xl backdrop-blur-md flex items-center gap-3 animate-in fade-in zoom-in duration-300">
                        <AlertCircle size={24} />
                        <span className="font-bold text-lg">To nie jest ten obszar! Spróbuj kliknąć w dolnym prawym rogu.</span>
                    </div>
                )}
            </div>

            {/* Progress Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4 opacity-50">
                <div className={`h-1.5 w-12 rounded-full ${currentVideo === 1 ? 'bg-apzumi-red' : 'bg-white/30'}`} />
                <div className={`h-1.5 w-12 rounded-full ${currentVideo === 2 ? 'bg-apzumi-red' : 'bg-white/30'}`} />
            </div>
        </div>
    );
};

export default InteractiveDemo;
