import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';

export interface DesignComment {
    id: string;
    text: string;
    x: number; // percentage
    y: number; // percentage
    author: string;
    createdAt: number;
}

interface CommentContextType {
    addComment: (text: string, x: number, y: number) => void;
    removeComment: (id: string) => void;
    comments: DesignComment[];
}

const CommentContext = createContext<CommentContextType | undefined>(undefined);

const STORAGE_KEY = 'apzumi_design_comments_v1';

export const CommentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [comments, setComments] = useState<DesignComment[]>([]);
    const [activePlacement, setActivePlacement] = useState<{ x: number, y: number } | null>(null);
    const [inputValue, setInputValue] = useState('');
    const [isSyncing, setIsSyncing] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // Initial load
    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) setComments(JSON.parse(saved));
        fetchGlobalComments();
    }, []);

    const fetchGlobalComments = async () => {
        try {
            const response = await fetch('/api/config?type=comments');
            if (response.ok) {
                const data = await response.json();
                if (Array.isArray(data)) {
                    setComments(data);
                    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
                }
            }
        } catch (e) {
            console.error("Failed to fetch comments", e);
        }
    };

    const syncToGlobal = async (newComments: DesignComment[]) => {
        setIsSyncing(true);
        try {
            await fetch('/api/config?type=comments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newComments)
            });
        } catch (e) {
            console.error("Failed to sync comments", e);
        } finally {
            setIsSyncing(false);
        }
    };

    useEffect(() => {
        const handleGlobalClick = (e: MouseEvent) => {
            if ((e.ctrlKey || e.metaKey) && !activePlacement) {
                e.preventDefault();
                // Calculate percentages to keep position responsive
                const x = (e.pageX / document.documentElement.scrollWidth) * 100;
                const y = (e.pageY / document.documentElement.scrollHeight) * 100;
                setActivePlacement({ x, y });
                setInputValue('');
            }
        };

        window.addEventListener('click', handleGlobalClick);
        return () => window.removeEventListener('click', handleGlobalClick);
    }, [activePlacement]);

    const addComment = (text: string, x: number, y: number) => {
        if (!text.trim()) return;
        const newComment: DesignComment = {
            id: Math.random().toString(36).substr(2, 9),
            text,
            x,
            y,
            author: 'User',
            createdAt: Date.now()
        };
        const updated = [...comments, newComment];
        setComments(updated);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        syncToGlobal(updated);
        setActivePlacement(null);
    };

    const removeComment = (id: string) => {
        const updated = comments.filter(c => c.id !== id);
        setComments(updated);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        syncToGlobal(updated);
    };

    return (
        <CommentContext.Provider value={{ addComment, removeComment, comments }}>
            {children}

            {/* Placement UI */}
            {activePlacement && (
                <div
                    ref={menuRef}
                    style={{ left: `${activePlacement.x}%`, top: `${activePlacement.y}%` }}
                    className="fixed z-[10000] -translate-x-1/2 -translate-y-1/2"
                >
                    <div className="bg-white rounded-lg shadow-2xl border border-blue-100 p-3 min-w-[250px] animate-in zoom-in-95 duration-200">
                        <div className="flex items-center gap-2 mb-2 text-blue-600 font-bold text-xs uppercase tracking-wider">
                            <MessageSquare size={14} />
                            <span>Dodaj uwagę</span>
                        </div>
                        <textarea
                            autoFocus
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Napisz co zmienić..."
                            className="w-full border border-gray-200 rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2 min-h-[80px] resize-none"
                        />
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setActivePlacement(null)}
                                className="px-3 py-1 text-xs text-gray-500 hover:text-gray-700"
                            >
                                Anuluj
                            </button>
                            <button
                                onClick={() => addComment(inputValue, activePlacement.x, activePlacement.y)}
                                className="bg-blue-600 text-white px-3 py-1 rounded text-xs font-semibold hover:bg-blue-700 flex items-center gap-1"
                            >
                                <Send size={12} />
                                <span>Zapisz</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Render all comments as sticky notes */}
            {comments.map(comment => (
                <div
                    key={comment.id}
                    style={{ left: `${comment.x}%`, top: `${comment.y}%` }}
                    className="absolute z-[9998] group"
                >
                    <div className="relative">
                        {/* Pin / Trigger */}
                        <div className="w-8 h-8 bg-yellow-400 rounded-full border-2 border-white shadow-lg flex items-center justify-center cursor-pointer group-hover:scale-110 transition-transform -translate-x-1/2 -translate-y-1/2">
                            <MessageSquare size={16} className="text-yellow-900" />
                        </div>

                        {/* Sticky Note Content */}
                        <div className="absolute top-4 left-4 min-w-[200px] max-w-[250px] bg-yellow-100 p-4 rounded shadow-xl border-l-4 border-yellow-400 opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto transition-all origin-top-left z-[10001]">
                            <button
                                onClick={() => removeComment(comment.id)}
                                className="absolute top-1 right-1 p-1 text-yellow-600 hover:text-red-600 transition-colors"
                            >
                                <X size={14} />
                            </button>
                            <p className="text-sm text-yellow-900 leading-relaxed font-medium">
                                {comment.text}
                            </p>
                            <div className="mt-3 pt-2 border-t border-yellow-200 text-[10px] text-yellow-600 italic">
                                Dodano: {new Date(comment.createdAt).toLocaleString()}
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {/* Global Syncing Indicator for comments */}
            {isSyncing && (
                <div className="fixed bottom-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-[10px] font-bold shadow-lg z-[10005] animate-pulse">
                    Synchronizacja uwag...
                </div>
            )}
        </CommentContext.Provider>
    );
};

export const useCommentContext = () => {
    const context = useContext(CommentContext);
    if (!context) throw new Error('useCommentContext must be used within a CommentProvider');
    return context;
};
