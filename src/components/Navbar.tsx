import React, { useState, useEffect } from 'react';
import { TabType, LanguageType } from '../types';
import { motion } from 'motion/react';
import {
  ShieldAlert,
  Terminal,
  Crosshair,
  Languages,
  CheckCircle2,
  Sparkles,
  Copy,
  Check,
  Smartphone,
} from 'lucide-react';
import { TRUNKIST_LOADSTRING } from '../data/trunkistScriptData';

interface NavbarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  lang: LanguageType;
  setLang: (lang: LanguageType) => void;
  onOpenMobileModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  lang,
  setLang,
  onOpenMobileModal,
}) => {
  const [fps, setFps] = useState(60);
  const [ping, setPing] = useState(14);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFps(Math.floor(58 + Math.random() * 4));
      setPing(Math.floor(12 + Math.random() * 5));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyLoadstring = () => {
    navigator.clipboard.writeText(TRUNKIST_LOADSTRING);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tabs: { id: TabType; labelRu: string; labelEn: string; icon: React.ElementType }[] = [
    { id: 'features-overview', labelRu: 'Функции & Почему #1', labelEn: 'Features & Why #1', icon: Sparkles },
    { id: 'parry-arena', labelRu: 'Threat & Parry', labelEn: 'Threat & Parry', icon: ShieldAlert },
    { id: 'weapon-dps', labelRu: 'Арсенал & Тайминги', labelEn: 'Weapons & Timings', icon: Crosshair },
    { id: 'executor-console', labelRu: 'Консоль Скрипта', labelEn: 'Script Console', icon: Terminal },
  ];

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl border-b border-purple-900/40 bg-[#0c0816]/95 shadow-2xl shadow-purple-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 gap-4 py-2">
          
          {/* Top-Left Custom Logo: "TR" intertwined + small "HUB" underneath */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="flex items-center gap-3 shrink-0 cursor-pointer"
            onClick={() => setActiveTab('features-overview')}
          >
            <div className="relative flex flex-col items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-purple-950 via-purple-900 to-black border border-purple-600/40 shadow-lg shadow-purple-950/80 group overflow-hidden select-none">
              {/* Intertwined stylized "T" and "R" */}
              <div className="relative flex items-center justify-center font-black font-mono tracking-tighter text-white text-lg leading-none pt-0.5">
                <span className="text-purple-300 transform -rotate-6 -mr-1.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">T</span>
                <span className="text-purple-400 transform rotate-12 -ml-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] font-extrabold">R</span>
              </div>
              <span className="text-[8px] font-mono font-black text-purple-200 tracking-widest uppercase -mt-0.5 bg-purple-950/90 px-1 rounded border border-purple-800/50">
                HUB
              </span>
              <div className="absolute inset-0 bg-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base tracking-wider text-white font-mono">
                  TRUNKIST <span className="text-purple-400">HUB</span>
                </span>
                
                {/* STATUS ACTIVE WITH PURPLE DOT / CHECKMARK */}
                <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-950/90 border border-purple-700/60 text-purple-300 text-[10px] font-mono font-bold shadow-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                  </span>
                  <CheckCircle2 className="w-3 h-3 text-purple-400" />
                  <span>ACTIVE</span>
                </div>
              </div>
              <span className="text-[10px] font-mono text-purple-300/70">
                MONOLITH EDITION | COMBAT WARRIORS
              </span>
            </div>
          </motion.div>

          {/* Navigation Bar */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#090312] p-1.5 rounded-xl border border-purple-900/60">
            {tabs.map((t) => {
              const Icon = t.icon;
              const isActive = activeTab === t.id;
              return (
                <button
                  key={t.id}
                  id={`nav-tab-${t.id}`}
                  onClick={() => setActiveTab(t.id)}
                  className={`relative flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold font-mono transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'text-white font-bold'
                      : 'text-purple-300/70 hover:text-purple-100 hover:bg-purple-950/50'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavTab"
                      className="absolute inset-0 bg-gradient-to-r from-purple-900 via-purple-800 to-purple-900 rounded-lg shadow-lg shadow-purple-950/80 border border-purple-500/50 -z-10"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                    />
                  )}
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-purple-400'}`} />
                  <span>{lang === 'ru' ? t.labelRu : t.labelEn}</span>
                </button>
              );
            })}
          </nav>

          {/* Quick Copy & Controls */}
          <div className="flex items-center gap-2">
            {/* MOBILE? BUTTON (Top Right) */}
            <motion.button
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
              onClick={onOpenMobileModal}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-950/90 hover:bg-purple-900/90 text-purple-200 font-mono font-black text-xs uppercase shadow-lg shadow-purple-950/60 cursor-pointer border border-purple-700/60"
            >
              <Smartphone className="w-4 h-4 text-purple-300" />
              <span>Mobile?</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleCopyLoadstring}
              className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-purple-700 hover:bg-purple-600 text-white font-mono font-bold text-xs uppercase shadow-md shadow-purple-950/60 transition-all cursor-pointer border border-purple-500/50"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-purple-200" />
                  <span>{lang === 'ru' ? 'Скопировано!' : 'Copied!'}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>{lang === 'ru' ? 'Loadstring' : 'Loadstring'}</span>
                </>
              )}
            </motion.button>

            {/* Language Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              id="lang-toggle-button"
              onClick={() => setLang(lang === 'ru' ? 'en' : 'ru')}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#140e24] border border-purple-900/50 text-xs font-mono font-bold text-purple-200 hover:bg-purple-950/60 transition-colors cursor-pointer"
            >
              <Languages className="w-3.5 h-3.5 text-purple-400" />
              <span>{lang.toUpperCase()}</span>
            </motion.button>
          </div>
        </div>

        {/* Mobile Nav Row */}
        <div className="flex lg:hidden overflow-x-auto gap-1 py-2 border-t border-purple-900/30 no-scrollbar">
          {tabs.map((t) => {
            const Icon = t.icon;
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                id={`mobile-tab-${t.id}`}
                onClick={() => setActiveTab(t.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold whitespace-nowrap shrink-0 transition-all ${
                  isActive
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'bg-[#140e24] text-purple-300/80 border border-purple-900/40'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{lang === 'ru' ? t.labelRu : t.labelEn}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};

