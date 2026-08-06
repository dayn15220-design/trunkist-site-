import React, { useState } from 'react';
import { Sparkles, ShieldAlert, Crosshair, Terminal, Smartphone, Copy, Check, Languages, Code } from 'lucide-react';
import { TabType, LanguageType } from '../types';

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
  const [copied, setCopied] = useState(false);

  const tabs = [
    {
      id: 'features-overview' as TabType,
      label: lang === 'ru' ? 'Функции & Почему #1' : 'Features & Why #1',
      icon: Sparkles,
    },
    {
      id: 'get-script' as TabType,
      label: lang === 'ru' ? 'Получить Скрипт' : 'Get Script',
      icon: Code,
    },
    {
      id: 'parry-arena' as TabType,
      label: 'Threat & Parry',
      icon: ShieldAlert,
    },
    {
      id: 'weapon-dps' as TabType,
      label: lang === 'ru' ? 'Арсенал & Тайминги' : 'Weapons & Timings',
      icon: Crosshair,
    },
    {
      id: 'executor-console' as TabType,
      label: lang === 'ru' ? 'Консоль Скрипта' : 'Script Console',
      icon: Terminal,
    },
  ];

  const handleCopyLoadstring = () => {
    const loadstringCode = 'loadstring(game:HttpGet("https://raw.githubusercontent.com/trunkist/script/main/source.lua"))()';
    navigator.clipboard.writeText(loadstringCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0d071a]/90 backdrop-blur-md border-b border-purple-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('features-overview')}>
          <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center font-bold text-purple-300 text-xl shadow-[0_0_15px_rgba(168,85,247,0.3)]">
            TR
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-white text-lg tracking-wider">TRUNKIST</span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-purple-500/20 text-purple-300 border border-purple-500/30">HUB</span>
              <span className="flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                ACTIVE
              </span>
            </div>
            <p className="text-[11px] text-purple-400/80 font-mono">MONOLITH EDITION | COMBAT WARRIORS</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#130b25]/80 p-1.5 rounded-2xl border border-purple-900/50">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-semibold text-xs transition-all duration-200 ${
                  isActive
                    ? 'bg-purple-600/30 text-white border border-purple-500/50 shadow-[0_0_12px_rgba(168,85,247,0.25)]'
                    : 'text-purple-300/70 hover:text-white hover:bg-purple-900/20'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-purple-400' : 'text-purple-400/60'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenMobileModal}
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold bg-purple-900/30 text-purple-300 border border-purple-700/40 hover:bg-purple-800/40 transition"
          >
            <Smartphone className="w-4 h-4" />
            <span className="hidden sm:inline">MOBILE?</span>
          </button>

          <button
            onClick={handleCopyLoadstring}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)] transition"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? (lang === 'ru' ? 'СКОПИРОВАНО!' : 'COPIED!') : 'LOADSTRING'}</span>
          </button>

          <button
            onClick={() => setLang(lang === 'ru' ? 'en' : 'ru')}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-purple-950/40 text-purple-300 border border-purple-800/40 hover:bg-purple-900/40 transition"
          >
            <Languages className="w-4 h-4 text-purple-400" />
            <span>{lang.toUpperCase()}</span>
          </button>
        </div>

      </div>
    </header>
  );
};
