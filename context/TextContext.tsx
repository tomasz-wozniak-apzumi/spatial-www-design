import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { textConfig } from '../textConfig';
import { Check, X } from 'lucide-react';

interface StoredConfigItem {
  current: string;
  alternatives: string[];
}

interface MenuState {
  visible: boolean;
  x: number;
  y: number;
  id: string | null;
  currentText: string | null; // Track what text is currently being displayed
}

interface TextContextType {
  getText: (id: string, defaultText: string) => string;
  openMenu: (e: React.MouseEvent, id: string, currentText: string) => void;
}

const TextContext = createContext<TextContextType | undefined>(undefined);

const STORAGE_KEY = 'apzumi_text_config_v1';

export const TextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Store the entire configuration state: current text and dynamic alternatives list for each ID
  const [storedConfig, setStoredConfig] = useState<Record<string, StoredConfigItem>>({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [customInput, setCustomInput] = useState('');
  const [isSyncing, setIsSyncing] = useState(false);

  const [menu, setMenu] = useState<MenuState>({
    visible: false,
    x: 0,
    y: 0,
    id: null,
    currentText: null
  });

  const menuRef = useRef<HTMLDivElement>(null);

  // Fetch from global API on mount
  const fetchGlobalConfig = async () => {
    try {
      const response = await fetch('/api/config');
      if (response.ok) {
        const data = await response.json();
        if (data && Object.keys(data).length > 0) {
          setStoredConfig(data);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        }
      }
    } catch (e) {
      console.error("Failed to fetch global config", e);
    }
  };

  // Push to global API
  const syncToGlobal = async (config: Record<string, StoredConfigItem>) => {
    setIsSyncing(true);
    try {
      await fetch('/api/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config)
      });
    } catch (e) {
      console.error("Failed to sync to global config", e);
    } finally {
      setIsSyncing(false);
    }
  };

  // Load from LocalStorage on mount (for immediate display) then fetch global
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setStoredConfig(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Failed to load local config", e);
    } finally {
      setIsLoaded(true);
      fetchGlobalConfig();
    }
  }, []);

  // Save to LocalStorage whenever config changes locally
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(storedConfig));
    }
  }, [storedConfig, isLoaded]);

  const getText = (id: string, defaultText: string) => {
    // If we have a stored version, use it. Otherwise use the JSX default.
    return storedConfig[id]?.current || defaultText;
  };

  const getAlternatives = (id: string) => {
    // If we have stored alternatives (because of a previous swap), use them.
    // Otherwise use the static config from file.
    return storedConfig[id]?.alternatives || textConfig[id] || [];
  };

  const openMenu = (e: React.MouseEvent, id: string, currentText: string) => {
    e.preventDefault();
    e.stopPropagation();

    // Only open if configuration exists for this ID (either in static file or stored state)
    // OR if we want to allow custom text for EVERYTHING (removed the check to allow custom text everywhere)
    // if (!textConfig[id] && !storedConfig[id]) { return; }

    setCustomInput(''); // Reset custom input
    setMenu({
      visible: true,
      x: e.pageX,
      y: e.pageY,
      id: id,
      currentText: currentText
    });
  };

  const handleSelect = (newText: string) => {
    if (menu.id && menu.currentText) {
      const id = menu.id;
      const previousText = menu.currentText;

      // Do nothing if selecting the same text
      if (newText === previousText) {
        setMenu(prev => ({ ...prev, visible: false }));
        return;
      }

      // Get current available alternatives
      const currentAlternatives = getAlternatives(id);

      // SWAP LOGIC:
      // 1. Remove the text we just selected from the alternatives list (if it exists there)
      // 2. Add the text that was previously displayed to the alternatives list
      const newAlternatives = currentAlternatives
        .filter(t => t !== newText)
        .concat([previousText]);

      // Ensure unique values just in case
      const uniqueAlternatives = Array.from(new Set(newAlternatives));

      const updatedConfig = {
        ...storedConfig,
        [id]: {
          current: newText,
          alternatives: uniqueAlternatives
        }
      };

      setStoredConfig(updatedConfig);
      syncToGlobal(updatedConfig);
    }
    setMenu(prev => ({ ...prev, visible: false }));
  };

  const handleCustomSave = () => {
    if (!customInput.trim()) return;
    handleSelect(customInput);
  };

  const handleReset = () => {
    if (menu.id) {
      const newConfig = { ...storedConfig };
      delete newConfig[menu.id]; // Remove from storage, reverting to JSX default and static config
      setStoredConfig(newConfig);
      syncToGlobal(newConfig);
      setMenu(prev => ({ ...prev, visible: false }));
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenu(prev => ({ ...prev, visible: false }));
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Calculate alternatives for the currently open menu
  const activeAlternatives = menu.id ? getAlternatives(menu.id) : [];

  return (
    <TextContext.Provider value={{ getText, openMenu }}>
      {children}
      {menu.visible && menu.id && (
        <div
          ref={menuRef}
          style={{ top: menu.y, left: menu.x }}
          className="absolute z-[9999] bg-white border border-gray-200 shadow-xl rounded-lg py-2 min-w-[320px] max-w-[400px] animate-in fade-in zoom-in-95 duration-100 flex flex-col"
        >
          {/* Header */}
          <div className="px-4 py-2 border-b border-gray-100 bg-gray-50/50">
            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
              Edytuj treść
            </div>
            <div className="text-[10px] text-gray-400 truncate mb-2 flex justify-between items-center">
              <span>ID: {menu.id}</span>
              {isSyncing && <span className="text-blue-500 font-medium animate-pulse">Synchronizowanie...</span>}
            </div>
          </div>

          {/* Custom Input Area */}
          <div className="px-4 py-3 bg-white border-b border-gray-100">
            <label className="text-xs font-semibold text-gray-700 mb-1 block">Wpisz własny tekst:</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleCustomSave()}
                className="flex-1 border border-gray-300 rounded px-2 py-1.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="Nowa treść..."
                autoFocus
              />
              <button
                onClick={handleCustomSave}
                disabled={!customInput.trim()}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white rounded px-2 py-1 flex items-center justify-center transition-colors"
              >
                <Check size={16} />
              </button>
            </div>
          </div>

          {/* Predefined Alternatives */}
          <div className="max-h-[250px] overflow-y-auto">
            {activeAlternatives.length > 0 && (
              <div className="px-4 py-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider bg-gray-50/30">
                Dostępne warianty
              </div>
            )}
            {activeAlternatives.map((option, index) => (
              <button
                key={index}
                onClick={() => handleSelect(option)}
                className="w-full text-left px-4 py-3 hover:bg-blue-50 text-sm text-gray-700 hover:text-blue-700 transition-colors block border-b border-gray-50 last:border-0"
              >
                {option}
              </button>
            ))}
            {activeAlternatives.length === 0 && (
              <div className="px-4 py-4 text-center text-gray-400 text-xs italic">
                Brak zdefiniowanych wariantów.
              </div>
            )}
          </div>

          {/* Reset Button */}
          <button
            onClick={handleReset}
            className="w-full text-left px-4 py-3 hover:bg-red-50 text-xs font-semibold text-red-500 border-t border-gray-100 mt-auto flex items-center gap-2 group"
          >
            <X size={14} />
            <span>Przywróć domyślny (Reset)</span>
          </button>
        </div>
      )}
    </TextContext.Provider>
  );
};

export const useTextContext = () => {
  const context = useContext(TextContext);
  if (!context) {
    throw new Error('useTextContext must be used within a TextProvider');
  }
  return context;
};