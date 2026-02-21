import React, { useState, useEffect, useRef } from 'react';
import { ViewState } from '../App';
import { X, FileText, Image as ImageIcon, FileCode2, Send, BrainCircuit, Plus, Wand2, Sparkles, Layers, Loader2 } from 'lucide-react';

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

interface CustomSource {
    id: string;
    name: string;
    content: string;
}

const KnowledgeBaseDemo: React.FC<KnowledgeBaseDemoProps> = ({ onNavigate }) => {
    const [phase, setPhase] = useState<Phase>('init');
    const [ingestedCount, setIngestedCount] = useState(0);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [inputQuery, setInputQuery] = useState('');
    const [isAiTyping, setIsAiTyping] = useState(false);

    // Creator variables
    const [showCreator, setShowCreator] = useState(false);
    const [customSources, setCustomSources] = useState<CustomSource[]>([]);
    const [sourceName, setSourceName] = useState('');
    const [sourceContent, setSourceContent] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);

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

        const customKnowledgeString = customSources.length > 0
            ? customSources.map(s => `ŹRÓDŁO (${s.name}):\n${s.content}`).join('\n\n')
            : "";

        try {
            // Call our Groq API
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query, customKnowledge: customKnowledgeString })
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

    const handleMagicWand = async () => {
        if (!sourceName.trim()) {
            setSourceContent("Podaj najpierw Nazwę Źródła (temat), aby sztuczna inteligencja wiedziała o czym ma napisać.");
            return;
        }

        setIsGenerating(true);
        try {
            const res = await fetch('/api/generate-sample', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ topic: sourceName })
            });

            if (res.ok) {
                const data = await res.json();
                setSourceContent(data.text);
            } else {
                setSourceContent("Wystąpił błąd podczas generowania tekstu. Spróbuj ponownie.");
            }
        } catch (e) {
            console.error(e);
            setSourceContent("Błąd komunikacji z AI podczas generacji próbki.");
        } finally {
            setIsGenerating(false);
        }
    };

    const handleAddSource = () => {
        if (!sourceName.trim() || !sourceContent.trim()) return;
        setCustomSources(prev => [...prev, {
            id: Date.now().toString(),
            name: sourceName,
            content: sourceContent
        }]);
        setSourceName('');
        setSourceContent('');
    };

    const handleCreateCustomBase = () => {
        setShowCreator(false);

        // Add pending content if user forgot to click Add to List
        if (sourceName.trim() && sourceContent.trim()) {
            handleAddSource();
        }

        const msg = "Zainicjowano niestandardową bazę wiedzy. Rozumiem dostarczone materiały, w czym mogę pomóc?";
        setMessages([{ role: 'ai', content: msg }]);
        setPhase('ready');
        playTts(msg);
    };

    const hasCustomBase = customSources.length > 0;

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xl z-[10000] flex items-center justify-center p-2 sm:p-4 md:p-8 font-sans text-white">
            <audio ref={audioRef} className="hidden" />

            {/* Tablet Frame */}
            <div className="relative w-full max-w-[1240px] h-full max-h-[820px] bg-[#0a0f1d] border-[14px] border-black rounded-[2.5rem] shadow-[0_40px_100px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col items-center justify-center ring-1 ring-white/10">

                {/* Tablet Top Camera Notch / Bezel Simulator */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-6 bg-black rounded-b-3xl opacity-80 z-[10003] hidden sm:block"></div>

                {/* Close Button Inside Frame */}
                <button
                    onClick={() => onNavigate('solutions')}
                    className="absolute top-6 right-6 z-[10002] p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
                >
                    <X size={24} />
                </button>

                {/* Creator Button */}
                <div className="absolute top-6 left-6 z-[10002]">
                    <button
                        onClick={() => setShowCreator(true)}
                        className="flex items-center gap-2 bg-gradient-to-r from-teal-500/20 to-blue-500/20 hover:from-teal-500/40 hover:to-blue-500/40 border border-teal-500/30 text-teal-300 px-5 py-2.5 rounded-full font-semibold text-sm transition-all shadow-[0_0_20px_rgba(20,184,166,0.15)]"
                    >
                        <Plus size={18} />
                        Stwórz własną bazę wiedzy
                    </button>
                </div>

                {/* Ingestion Visualizer */}
                <div className={"transition-all duration-1000 w-full max-w-5xl flex flex-col items-center " + ((phase === 'init' || phase === 'ingesting') ? 'translate-y-0 opacity-100 scale-100' : '-translate-y-32 opacity-80 scale-90')}>
                    <h2 className="text-4xl sm:text-5xl font-bold mb-14 tracking-tight">Baza Wiedzy Spatial</h2>

                    <div className="relative w-80 h-80 border-2 border-dashed border-white/20 rounded-full flex flex-col items-center justify-center bg-blue-900/10 backdrop-blur-md shadow-[0_0_80px_rgba(59,130,246,0.1)]">
                        <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-apzumi-red mb-2">
                            {ingestedCount}
                        </div>
                        <div className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                            Zindeksowane pliki
                        </div>

                        {/* Flying items */}
                        {phase === 'ingesting' && ingestedCount < 1 && (
                            <div className="absolute top-0 right-[110%] w-48 p-4 bg-white/10 rounded-2xl border border-white/20 flex items-center gap-3 animate-[flyIn_1s_ease-out_forwards] shadow-lg">
                                <FileText size={28} className="text-blue-400" />
                                <span className="text-sm font-semibold text-gray-200">manual.pdf</span>
                            </div>
                        )}

                        {phase === 'ingesting' && ingestedCount >= 1 && ingestedCount < 2 && (
                            <div className="absolute top-0 left-[110%] w-48 p-4 bg-white/10 rounded-2xl border border-white/20 flex items-center gap-3 animate-[flyIn_1s_ease-out_forwards] shadow-lg">
                                <ImageIcon size={28} className="text-purple-400" />
                                <span className="text-sm font-semibold text-gray-200">printer_v2.jpg</span>
                            </div>
                        )}

                        {phase === 'ingesting' && ingestedCount >= 2 && ingestedCount < 3 && (
                            <div className="absolute bottom-[-10%] right-[90%] w-72 p-5 bg-yellow-900/30 rounded-2xl border border-yellow-500/50 flex items-start gap-4 animate-[flyIn_1s_ease-out_forwards] shadow-lg">
                                <FileCode2 size={28} className="text-yellow-400 shrink-0 mt-0.5" />
                                <span className="text-xs font-mono text-yellow-200 leading-tight">
                                    "IMPORTANT! DO NOT EXPOSE PRINTER TO THE SUN! IT CAN OVERHEAT EASILY!"
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                {/* AI Assistant ORB & UI */}
                <div className={"absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[20%] w-full max-w-3xl flex flex-col items-center transition-all duration-1000 " + ((phase === 'ready' || phase === 'chatting') ? 'opacity-100 translate-y-0 visible pointer-events-auto' : 'opacity-0 translate-y-12 invisible pointer-events-none')}>

                    {/* Pulsing Orb */}
                    <div className="relative w-36 h-36 mb-10">
                        <div className={"absolute inset-0 bg-blue-500 rounded-full blur-[50px] opacity-40 " + (isAiTyping ? 'animate-pulse scale-125 bg-apzumi-red' : 'animate-[ping_4s_cubic-bezier(0,0,0.2,1)_infinite]')}></div>
                        <div className="w-full h-full bg-gradient-to-tr from-blue-600 to-apzumi-darker relative rounded-full border border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.1)] flex items-center justify-center overflow-hidden">
                            <BrainCircuit size={52} className={"text-white transition-opacity " + (isAiTyping ? 'animate-bounce text-apzumi-red' : 'text-blue-200')} />
                        </div>
                    </div>

                    {/* Predefined Questions - Hidden if Custom Base exists */}
                    {phase === 'ready' && !hasCustomBase && (
                        <div className="flex flex-col gap-3 w-full max-w-md">
                            {predefinedQuestions.map((q, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleAskQuestion(q)}
                                    className="bg-white/5 hover:bg-white/20 border border-white/10 hover:border-blue-400/50 text-white p-5 rounded-2xl text-sm font-semibold text-left transition-all hover:scale-105 active:scale-95 flex items-center justify-between group shadow-md"
                                >
                                    {q}
                                    <Send size={18} className="text-transparent group-hover:text-blue-400 transition-colors" />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Sticky Chat UI */}
                <div className={"absolute bottom-0 left-0 w-full bg-[#0a0f1d]/85 backdrop-blur-3xl border-t border-white/10 py-6 px-12 transition-all duration-700 shadow-[0_-30px_80px_rgba(0,0,0,0.6)] " + ((phase === 'ready' || phase === 'chatting') ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0')}>

                    {/* Chat Header Header */}
                    <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/5 mx-auto max-w-5xl">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.6)]"></div>
                        <span className="text-xs font-bold text-gray-300 uppercase tracking-widest">{hasCustomBase ? 'Apzumi Custom Assistant' : 'Apzumi Spatial Assistant'}</span>
                    </div>

                    {/* Chat History */}
                    <div className="h-64 overflow-y-auto mb-6 flex flex-col gap-6 pr-4 custom-scrollbar mx-auto max-w-5xl">
                        {messages.map((m, idx) => (
                            <div key={idx} className={"flex flex-col max-w-[85%] " + (m.role === 'user' ? 'self-end items-end' : 'self-start items-start')}>
                                <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2 ml-2">
                                    {m.role === 'user' ? 'Ty' : 'AI'}
                                </div>
                                <div className={"px-7 py-5 text-[15px] leading-relaxed font-medium shadow-xl " + (
                                    m.role === 'user'
                                        ? 'bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-[28px] rounded-br-[8px] border border-blue-500/30'
                                        : 'bg-white/5 backdrop-blur-md border border-white/10 text-gray-200 rounded-[28px] rounded-bl-[8px] shadow-[0_4px_30px_rgba(0,0,0,0.1)]'
                                )}>
                                    {m.content}
                                </div>
                            </div>
                        ))}

                        {isAiTyping && (
                            <div className="self-start flex flex-col items-start max-w-[80%] opacity-80 mx-auto w-full">
                                <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2 ml-2">
                                    AI
                                </div>
                                <div className="px-7 py-5 bg-white/5 backdrop-blur-md border border-white/10 rounded-[28px] rounded-bl-[8px] flex gap-2 items-center h-[64px] shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
                                    <div className="w-2.5 h-2.5 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                    <div className="w-2.5 h-2.5 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                    <div className="w-2.5 h-2.5 bg-blue-400 rounded-full animate-bounce"></div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Chat Input */}
                    <div className="relative flex items-center gap-4 bg-black/40 p-2.5 rounded-full border border-white/10 shadow-inner mx-auto max-w-5xl">
                        <div className="relative flex-1">
                            <input
                                type="text"
                                value={inputQuery}
                                onChange={(e) => setInputQuery(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') handleAskQuestion(inputQuery);
                                }}
                                placeholder={phase === 'chatting' || hasCustomBase ? "Napisz wiadomość do asystenta..." : "Tylko z podanych wyżej pytań predefiniowanych..."}
                                disabled={phase !== 'chatting' && phase !== 'ready'}
                                className="w-full bg-transparent pl-6 pr-16 py-3.5 text-[16px] text-white focus:outline-none transition-colors placeholder-gray-500"
                            />
                            <button
                                onClick={() => handleAskQuestion(inputQuery)}
                                className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white p-3.5 rounded-full transition-all hover:scale-105 active:scale-95 shadow-lg flex items-center justify-center"
                            >
                                <Send size={20} className="translate-x-[1px]" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* CREATOR MODAL OVERLAY - Rendered absolutely INSIDE tablet frame */}
                {showCreator && (
                    <div className="absolute inset-0 z-[10010] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300">
                        <div className="w-full h-full bg-[#0a0f1d] border border-white/10 rounded-2xl shadow-[0_0_80px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col animate-in zoom-in-95 duration-300">

                            {/* Header */}
                            <div className="flex items-center justify-between p-6 border-b border-white/5 bg-white/[0.02] shrink-0">
                                <div className="flex items-start gap-4">
                                    <BrainCircuit className="text-cyan-400 mt-1" size={32} />
                                    <div>
                                        <h3 className="text-2xl font-bold text-white mb-1">Kreator Bazy Wiedzy</h3>
                                        <p className="text-sm text-gray-400">Dodaj jedno lub więcej źródeł, a AI stworzy na ich podstawie nową bazę wiedzy.</p>
                                        <p className="text-xs font-bold text-orange-400 mt-2 tracking-wide">Uwaga: Zastąpi to obecną bazę wiedzy.</p>
                                    </div>
                                </div>
                                <button onClick={() => setShowCreator(false)} className="text-gray-500 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full">
                                    <X size={24} />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
                                {/* Left Pane (Form) */}
                                <div className="w-full md:w-3/5 p-8 border-r border-white/5 flex flex-col overflow-y-auto custom-scrollbar">
                                    <div className="flex items-center gap-2 mb-6 shrink-0">
                                        <Plus className="text-cyan-400" size={20} />
                                        <span className="font-bold text-cyan-400 tracking-widest text-[13px] uppercase mt-0.5">DODAJ NOWE ŹRÓDŁO</span>
                                    </div>

                                    <div className="bg-[#111827] border border-white/5 rounded-xl p-6 flex flex-col gap-5 flex-1 shadow-inner relative overflow-hidden min-h-[400px]">
                                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500/20 to-blue-500/0"></div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-300 mb-2">Nazwa Źródła (Temat)</label>
                                            <div className="flex gap-3">
                                                <input
                                                    value={sourceName}
                                                    onChange={e => setSourceName(e.target.value)}
                                                    className="flex-1 bg-[#1f2937] border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500/50 transition-colors placeholder-gray-500"
                                                    placeholder="np. Procedura zwrotów, Specyfikacja produktu X..."
                                                />
                                                <button
                                                    onClick={handleMagicWand}
                                                    disabled={isGenerating}
                                                    className="bg-[#1f2937] hover:bg-[#374151] disabled:opacity-50 disabled:hover:bg-[#1f2937] border border-cyan-500/30 hover:border-cyan-400 rounded-lg p-3 text-cyan-400 transition-all flex items-center justify-center shrink-0 shadow-lg shadow-cyan-900/20 group"
                                                    title="Wygeneruj kontekstowy tekst za pomocą AI"
                                                >
                                                    {isGenerating ? <Loader2 size={20} className="animate-spin text-cyan-500" /> : <Wand2 size={20} className="group-hover:rotate-12 transition-transform" />}
                                                </button>
                                            </div>
                                        </div>

                                        <div className="flex flex-col flex-1">
                                            <label className="block text-sm font-semibold text-gray-300 mb-2">Treść / Kontekst</label>
                                            <textarea
                                                value={sourceContent}
                                                onChange={e => setSourceContent(e.target.value)}
                                                className="w-full flex-1 bg-[#1f2937] border border-white/10 rounded-lg p-4 text-sm text-gray-200 focus:outline-none focus:border-cyan-500/50 resize-none custom-scrollbar transition-colors placeholder-gray-500 leading-relaxed disabled:opacity-50"
                                                placeholder={isGenerating ? "AI Pisze tekst..." : "Wklej tutaj treść bazy wiedzy lub wygeneruj ją używając przycisku różdżki po podaniu tytułu..."}
                                                disabled={isGenerating}
                                            />
                                        </div>

                                        <div className="flex justify-end mt-2 shrink-0">
                                            <button
                                                onClick={handleAddSource}
                                                disabled={!sourceName.trim() || !sourceContent.trim() || isGenerating}
                                                className="flex items-center gap-2 bg-[#1e293b] hover:bg-[#334155] disabled:opacity-50 disabled:hover:bg-[#1e293b] text-gray-200 px-6 py-3 rounded-lg text-sm font-bold transition-all border border-white/5 active:scale-95"
                                            >
                                                <Plus size={16} /> Dodaj do Listy
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Pane (List) */}
                                <div className="w-full md:w-2/5 flex flex-col bg-[#080b14] overflow-hidden">
                                    <div className="p-8 pb-4 flex items-center gap-3 shrink-0">
                                        <Layers className="text-gray-400" size={20} />
                                        <span className="font-bold text-gray-200 tracking-widest text-[13px] uppercase mt-0.5">LISTA ŹRÓDEŁ ({customSources.length})</span>
                                    </div>
                                    <div className="flex-1 p-8 overflow-y-auto custom-scrollbar pt-0">
                                        {customSources.length === 0 ? (
                                            <div className="h-full flex items-center justify-center text-center px-4">
                                                <p className="text-sm text-gray-500 italic leading-relaxed">
                                                    Brak dodanych źródeł.<br />Wypełnij formularz i kliknij "Dodaj do Listy" lub od razu "Stwórz Bazę".
                                                </p>
                                            </div>
                                        ) : (
                                            <div className="flex flex-col gap-4">
                                                {customSources.map(src => (
                                                    <div key={src.id} className="bg-white/5 border border-white/10 rounded-xl p-5 relative group hover:bg-white/10 transition-colors">
                                                        <h4 className="font-bold text-cyan-200 text-sm mb-2 pr-8">{src.name}</h4>
                                                        <p className="text-xs text-gray-400 line-clamp-4 leading-relaxed">{src.content}</p>
                                                        <button
                                                            onClick={() => setCustomSources(prev => prev.filter(s => s.id !== src.id))}
                                                            className="absolute top-4 right-4 text-gray-500 hover:text-red-400 transition-colors p-1"
                                                        >
                                                            <X size={18} />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="p-6 border-t border-white/5 flex items-center justify-end gap-6 bg-white/[0.02] shrink-0">
                                <button onClick={() => setShowCreator(false)} className="text-gray-400 hover:text-white font-medium text-[15px] transition-colors">
                                    Anuluj
                                </button>
                                <button
                                    onClick={handleCreateCustomBase}
                                    className="flex items-center gap-2 bg-gradient-to-r from-[#2563eb] to-[#9333ea] hover:from-[#3b82f6] hover:to-[#a855f7] text-white px-8 py-3.5 rounded-lg font-bold text-[15px] tracking-wide transition-all shadow-[0_0_20px_rgba(147,51,234,0.3)] hover:shadow-[0_0_30px_rgba(147,51,234,0.5)] active:scale-95"
                                >
                                    <Sparkles size={18} /> STWÓRZ BAZĘ
                                </button>
                            </div>
                        </div>
                    </div>
                )}
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
