import React, { useState, useEffect, useRef } from 'react';
import { ViewState } from '../App';
import { X, FileText, Image as ImageIcon, FileCode2, Send, BrainCircuit } from 'lucide-react';

interface KnowledgeBaseDemoProps {
    onNavigate: (view: ViewState) => void;
}

const predefinedQuestions = [
    "Jak jest pełna nazwa drukarki?",
    "Jaki tusz obsługuje drukarka?",
    "Ile waży drukarka?"
];

type Phase = 'init' | 'ingesting' | 'ready' | 'chatting';

interface ChatMessage {
    role: 'user' | 'ai';
    content: string;
}

const KnowledgeBaseDemo: React.FC<KnowledgeBaseDemoProps> = ({ onNavigate }) => {
    const [phase, setPhase] = useState<Phase>('init');
    const [ingestedCount, setIngestedCount] = useState(0);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [inputQuery, setInputQuery] = useState('');
    const [isAiTyping, setIsAiTyping] = useState(false);

    // Audio references
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const startReadyPhase = () => {
        setPhase('ready');
        const greeting = "Czego chciałbyś dowiedzieć się o drukarce?";
        setMessages([{ role: 'ai', content: greeting }]);
        playTts(greeting);
    };

    useEffect(() => {
        // Phase 1: Ingestion animation setup
        const startTimer = setTimeout(() => {
            setPhase('ingesting');

            // Simulate Document 1: PDF
            setTimeout(() => setIngestedCount(1), 1000);

            // Simulate Document 2: Image
            setTimeout(() => setIngestedCount(2), 2000);

            // Simulate Document 3: Text Note
            setTimeout(() => {
                setIngestedCount(3);
                // Move to Ready phase
                setTimeout(startReadyPhase, 1500);
            }, 3000);

        }, 1000);

        return () => clearTimeout(startTimer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const playTts = async (text: string) => {
        try {
            const res = await fetch('/api/tts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text })
            });
            if (res.ok) {
                const data = await res.json();
                if (data.audioContent) {
                    const audioStr = "data:audio/mp3;base64," + data.audioContent;
                    if (audioRef.current) {
                        audioRef.current.src = audioStr;
                        audioRef.current.play();
                    } else {
                        const audio = new Audio(audioStr);
                        audio.play();
                    }
                }
            }
        } catch (e) {
            console.error('TTS Playback failed', e);
        }
    };

    const handleAskQuestion = async (query: string) => {
        if (!query.trim() || isAiTyping) return;

        // Stop current audio
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }

        setInputQuery('');
        setPhase('chatting');
        setMessages(prev => [...prev, { role: 'user', content: query }]);
        setIsAiTyping(true);

        try {
            // Call our Groq API
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query })
            });

            if (res.ok) {
                const data = await res.json();
                const answer = data.text;

                setMessages(prev => [...prev, { role: 'ai', content: answer }]);

                // Play TTS
                await playTts(answer);
            } else {
                setMessages(prev => [...prev, { role: 'ai', content: "Przepraszam, nie udało mi się połączyć z bazą wiedzy." }]);
            }
        } catch (e) {
            console.error(e);
            setMessages(prev => [...prev, { role: 'ai', content: "Błąd komunikacji z AI." }]);
        } finally {
            setIsAiTyping(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-apzumi-dark z-[10000] flex flex-col items-center justify-center overflow-hidden font-sans text-white">
            <audio ref={audioRef} className="hidden" />

            {/* Close Button */}
            <button
                onClick={() => onNavigate('solutions')}
                className="absolute top-6 right-6 z-[10002] p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
            >
                <X size={24} />
            </button>

            {/* Ingestion Visualizer */}
            <div className={"transition-all duration-1000 w-full max-w-5xl flex flex-col items-center " + ((phase === 'init' || phase === 'ingesting') ? 'translate-y-0 opacity-100 scale-100' : '-translate-y-32 opacity-80 scale-90')}>
                <h2 className="text-4xl font-bold mb-12 tracking-tight">Baza Wiedzy Spatial</h2>

                <div className="relative w-72 h-72 border-2 border-dashed border-white/20 rounded-full flex flex-col items-center justify-center bg-blue-900/10 backdrop-blur-md shadow-[0_0_80px_rgba(59,130,246,0.1)]">
                    <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-apzumi-red mb-2">
                        {ingestedCount}
                    </div>
                    <div className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                        Zindeksowane pliki
                    </div>

                    {/* Flying items */}
                    {phase === 'ingesting' && ingestedCount < 1 && (
                        <div className="absolute top-0 right-full w-40 p-4 bg-white/10 rounded-xl border border-white/20 flex items-center gap-3 animate-[flyIn_1s_ease-out_forwards]">
                            <FileText size={24} className="text-blue-400" />
                            <span className="text-sm font-semibold text-gray-200">manual.pdf</span>
                        </div>
                    )}

                    {phase === 'ingesting' && ingestedCount >= 1 && ingestedCount < 2 && (
                        <div className="absolute top-0 left-full w-40 p-4 bg-white/10 rounded-xl border border-white/20 flex items-center gap-3 animate-[flyIn_1s_ease-out_forwards]">
                            <ImageIcon size={24} className="text-purple-400" />
                            <span className="text-sm font-semibold text-gray-200">printer_v2.jpg</span>
                        </div>
                    )}

                    {phase === 'ingesting' && ingestedCount >= 2 && ingestedCount < 3 && (
                        <div className="absolute bottom-0 right-full w-64 p-4 bg-yellow-900/30 rounded-xl border border-yellow-500/50 flex items-start gap-3 animate-[flyIn_1s_ease-out_forwards]">
                            <FileCode2 size={24} className="text-yellow-400 shrink-0 mt-1" />
                            <span className="text-xs font-mono text-yellow-200">
                                "IMPORTANT! DO NOT EXPOSE PRINTER TO THE SUN! IT CAN OVERHEAT EASILY!"
                            </span>
                        </div>
                    )}
                </div>
            </div>

            {/* AI Assistant ORB & UI */}
            <div className={"absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[20%] w-full max-w-3xl flex flex-col items-center transition-all duration-1000 " + ((phase === 'ready' || phase === 'chatting') ? 'opacity-100 translate-y-0 visible pointer-events-auto' : 'opacity-0 translate-y-12 invisible pointer-events-none')}>

                {/* Pulsing Orb */}
                <div className="relative w-32 h-32 mb-8">
                    <div className={"absolute inset-0 bg-blue-500 rounded-full blur-[40px] opacity-40 " + (isAiTyping ? 'animate-pulse scale-125 bg-apzumi-red' : 'animate-[ping_4s_cubic-bezier(0,0,0.2,1)_infinite]')}></div>
                    <div className="w-full h-full bg-gradient-to-tr from-blue-600 to-apzumi-darker relative rounded-full border border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.1)] flex items-center justify-center overflow-hidden">
                        <BrainCircuit size={48} className={"text-white transition-opacity " + (isAiTyping ? 'animate-bounce text-apzumi-red' : 'text-blue-200')} />
                    </div>
                </div>

                {/* Predefined Questions */}
                {phase === 'ready' && (
                    <div className="flex flex-col gap-3 w-full max-w-sm">
                        {predefinedQuestions.map((q, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleAskQuestion(q)}
                                className="bg-white/5 hover:bg-white/20 border border-white/10 hover:border-blue-400/50 text-white p-4 rounded-xl text-sm font-semibold text-left transition-all hover:scale-105 active:scale-95 flex items-center justify-between group"
                            >
                                {q}
                                <Send size={16} className="text-transparent group-hover:text-blue-400 transition-colors" />
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Sticky Chat UI */}
            <div className={"absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl bg-apzumi-darker/90 backdrop-blur-2xl border-t border-white/10 p-6 transition-all duration-700 rounded-t-3xl shadow-[0_-20px_60px_rgba(0,0,0,0.5)] " + ((phase === 'ready' || phase === 'chatting') ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0')}>

                {/* Chat History */}
                <div className="h-64 overflow-y-auto mb-4 flex flex-col gap-4 pr-4 custom-scrollbar">
                    {messages.map((m, idx) => (
                        <div key={idx} className={"flex flex-col max-w-[80%] " + (m.role === 'user' ? 'self-end items-end' : 'self-start items-start')}>
                            <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1 ml-2">
                                {m.role === 'user' ? 'Ty' : 'AI Assistant Spatial'}
                            </div>
                            <div className={"px-6 py-4 rounded-3xl text-sm leading-relaxed " + (
                                m.role === 'user'
                                    ? 'bg-blue-600 text-white rounded-tr-sm shadow-md'
                                    : 'bg-white/10 border border-white/10 text-gray-200 rounded-tl-sm'
                            )}>
                                {m.content}
                            </div>
                        </div>
                    ))}

                    {isAiTyping && (
                        <div className="self-start flex flex-col items-start max-w-[80%]">
                            <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1 ml-2">
                                AI Assistant Spatial
                            </div>
                            <div className="px-6 py-4 rounded-3xl bg-white/5 border border-white/10 rounded-tl-sm flex gap-2 items-center h-[52px]">
                                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Chat Input */}
                <div className="relative flex items-center gap-4">
                    <div className="relative flex-1">
                        <input
                            type="text"
                            value={inputQuery}
                            onChange={(e) => setInputQuery(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') handleAskQuestion(inputQuery);
                            }}
                            placeholder={phase === 'chatting' ? "Zadaj własne pytanie do bazy uwzględniając kontekst..." : "Tylko z podanych wyżej pytań predefiniowanych..."}
                            disabled={phase !== 'chatting' && phase !== 'ready'}
                            className="w-full bg-black/40 border border-white/10 rounded-full pl-6 pr-12 py-4 text-sm text-white focus:outline-none focus:border-blue-500/50 transition-colors placeholder-gray-600"
                        />
                        <button
                            onClick={() => handleAskQuestion(inputQuery)}
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-500 text-white p-2.5 rounded-full transition-transform hover:scale-110 active:scale-95"
                        >
                            <Send size={16} />
                        </button>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes flyIn {
                    0% { transform: translate(0, 50px) scale(0.8); opacity: 0; }
                    50% { transform: translate(50%, 0) scale(1.1); opacity: 1; }
                    100% { transform: translate(100%, 0) scale(1); opacity: 0; }
                }
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255,255,255,0.1);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(255,255,255,0.2);
                }
            `}</style>
        </div>
    );
};

export default KnowledgeBaseDemo;
