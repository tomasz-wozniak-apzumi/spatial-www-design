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
    1: { x: 0, y: 0, width: 0, height: 0 },
    // Prawe 2/3 ekranu, marginesy góra/dół ~16.6% (1/6)
    2: { x: 33.33, y: 16.66, width: 66.66, height: 66.66 },
    3: { x: 0, y: 0, width: 0, height: 0 },
    4: { x: 33.33, y: 16.66, width: 66.66, height: 66.66 },
    5: { x: 0, y: 0, width: 0, height: 0 },
    6: { x: 0, y: 0, width: 0, height: 0 },
};

const INTERACTIVE_VIDEOS = [2, 4];
const AUTO_ADVANCE_VIDEOS = [1, 3, 5];
const TERMINAL_VIDEO = 6;

const FuturisticFrame: React.FC<{ zone: TargetZone; pending?: boolean }> = ({ zone, pending }) => (
    <div
        className={`futuristic-frame ${pending ? 'frame-pending' : ''}`}
        style={{
            left: `${zone.x}%`,
            top: `${zone.y}%`,
            width: `${zone.width}%`,
            height: `${zone.height}%`,
        }}
    >
        <div className="frame-scanline" />
        <div className="frame-crosshair" />
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
    const [activeBuffer, setActiveBuffer] = useState<'A' | 'B'>('A');
    const [pendingAdvance, setPendingAdvance] = useState(false);

    // Maintain state for dynamic URLs
    const [videoAUrl, setVideoAUrl] = useState<string>('');
    const [videoBUrl, setVideoBUrl] = useState<string>('');

    const videoRefA = useRef<HTMLVideoElement>(null);
    const videoRefB = useRef<HTMLVideoElement>(null);

    // Cache map so we don't spam HEAD requests
    const resolvedUrlsRef = useRef<Record<number, string>>({});

    const advanceToNext = async () => {
        const nextVideo = currentVideo + 1;
        const nextBuffer = activeBuffer === 'A' ? 'B' : 'A';

        // Play the newly active buffer immediately if it's ready.
        // Pre-caching ensures its 'src' state is usually populated.
        const nextRef = nextBuffer === 'A' ? videoRefA : videoRefB;
        if (nextRef.current) {
            nextRef.current.play().catch(err => console.log("Play failed:", err));
        }

        setCurrentVideo(nextVideo);
        setActiveBuffer(nextBuffer);
        setIsVideoEnded(false);
        setPendingAdvance(false);

        // Preload next-next video in the now-inactive buffer
        const preloadVideoIndex = nextVideo + 1;
        if (preloadVideoIndex <= TERMINAL_VIDEO) {
            const url = await resolveVideoUrl(preloadVideoIndex);
            if (nextBuffer === 'A') {
                setVideoBUrl(url);
            } else {
                setVideoAUrl(url);
            }
        }
    };

    const resolveVideoUrl = async (index: number): Promise<string> => {
        if (resolvedUrlsRef.current[index]) {
            return resolvedUrlsRef.current[index];
        }

        const extensions = ['mov', 'mp4', 'webm'];
        for (const ext of extensions) {
            const url = `/videos/video${index}.${ext}`;
            try {
                const response = await fetch(url, { method: 'HEAD' });
                if (response.ok) {
                    resolvedUrlsRef.current[index] = url;
                    return url;
                }
            } catch (error) {
                console.log(`Failed HEAD request for ${url}`, error);
            }
        }

        // Fallback default
        return `/videos/video${index}.mp4`;
    };

    const handleVideoEnd = () => {
        if (AUTO_ADVANCE_VIDEOS.includes(currentVideo)) {
            advanceToNext();
        } else if (INTERACTIVE_VIDEOS.includes(currentVideo) && pendingAdvance) {
            advanceToNext();
        } else if (currentVideo === TERMINAL_VIDEO) {
            setIsVideoEnded(true);
        }
    };

    const handleInteraction = (e: React.MouseEvent<HTMLDivElement>) => {
        if (currentVideo > TERMINAL_VIDEO) return;
        if (!INTERACTIVE_VIDEOS.includes(currentVideo)) return;
        if (pendingAdvance) return;

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
            setPendingAdvance(true);
        } else {
            const audio = new Audio('/audio/beep.wav');
            audio.play().catch(e => console.error("Audio play failed:", e));
        }
    };

    useEffect(() => {
        const init = async () => {
            const urlA = await resolveVideoUrl(1);
            setVideoAUrl(urlA);
            const urlB = await resolveVideoUrl(2);
            setVideoBUrl(urlB);
        };
        init();
    }, []);

    useEffect(() => {
        if (videoAUrl && currentVideo === 1 && videoRefA.current) {
            videoRefA.current.play().catch(err => console.log("Initial play failed:", err));
        }
    }, [videoAUrl, currentVideo]);

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
                    loop={INTERACTIVE_VIDEOS.includes(currentVideo) && !pendingAdvance}
                    muted={false}
                    playsInline
                    controlsList="nodownload nofullscreen noremoteplayback"
                    disablePictureInPicture
                    onContextMenu={(e) => e.preventDefault()}
                    src={videoAUrl}
                />
                <video
                    ref={videoRefB}
                    className={`absolute inset-0 w-full h-full object-contain video-container ${activeBuffer === 'B' ? 'video-active' : 'pointer-events-none'}`}
                    onEnded={activeBuffer === 'B' ? handleVideoEnd : undefined}
                    loop={INTERACTIVE_VIDEOS.includes(currentVideo) && !pendingAdvance}
                    muted={false}
                    playsInline
                    controlsList="nodownload nofullscreen noremoteplayback"
                    disablePictureInPicture
                    onContextMenu={(e) => e.preventDefault()}
                    src={videoBUrl}
                />

                {/* Interaction Overlay */}
                {INTERACTIVE_VIDEOS.includes(currentVideo) && (
                    <div className="absolute inset-0 cursor-pointer bg-black/40 z-[10001]">
                        <FuturisticFrame zone={TARGET_ZONES[currentVideo]} pending={pendingAdvance} />
                    </div>
                )}

                {/* Completion Screen */}
                {isVideoEnded && currentVideo === TERMINAL_VIDEO && (
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
