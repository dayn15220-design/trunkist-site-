import React from 'react';
import { TabType, LanguageType } from '../types';
import { Shield, Smartphone, Globe, Terminal, Swords, BookOpen, LayoutDashboard } from 'lucide-react';

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
  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#0c0816]/80 border-b border-purple-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* LOGO */}
        <div className="flex items-center gap-3">
          <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-tr from-purple-600 via-pink-600 to-cyan-400 p-0.5 shadow-[0_0_20px_rgba(168,85,247,0.4)]">
            <div className="w-full h-full bg-[#0a0515] rounded-[14px] flex items-center justify-center">
              <Shield className="w-5 h-5 text-cyan-300" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono font-black text-white text-lg tracking-wider">TRUNKIST HUB</span>
              <span className="px-2 py-0.5 rounded-md bg-purple-950/80 border border-purple-500/50 text-purple-300 text-[10px] font-mono font-bold">
                MONOLITH EDITION
              </span>
            </div>
            <p className="text-[10px] font-mono text-purple-400/80">Combat Warriors Script Engine</p>
          </div>
        </div>

        {/* NAVIGATION TABS */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#120a22]/90 p-1.5 rounded-2xl border border-purple-900/50">
          <button
            onClick={() => setActiveTab('features-overview')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
              activeTab === 'features-overview'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-900/40'
                : 'text-purple-300 hover:text-white hover:bg-purple-900/30'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>{lang === 'ru' ? 'Обзор Функций' : 'Overview'}</span>
          </button>

          <button
            onClick={() => setActiveTab('parry-simulator')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
              activeTab === 'parry-simulator'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-900/40'
                : 'text-purple-300 hover:text-white hover:bg-purple-900/30'
            }`}
          >
            <Swords className="w-4 h-4" />
            <span>{lang === 'ru' ? 'Симулятор & Parry' : 'Parry Test'}</span>
          </button>

          <button
            onClick={() => setActiveTab('weapon-database')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
              activeTab === 'weapon-database'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-900/40'
                : 'text-purple-300 hover:text-white hover:bg-purple-900/30'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>{lang === 'ru' ? 'Арсенал & Тайминги' : 'Weapons'}</span>
          </button>

          <button
            onClick={() => setActiveTab('executor-console')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
              activeTab === 'executor-console'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-900/40'
                : 'text-purple-300 hover:text-white hover:bg-purple-900/30'
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>{lang === 'ru' ? 'Консоль скрипта' : 'Console'}</span>
          </button>
        </nav>

        {/* ACTIONS & LANG */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMobileModal}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-mono text-xs font-bold shadow-lg hover:brightness-110 transition-all cursor-pointer"
          >
            <Smartphone className="w-4 h-4" />
            <span className="hidden sm:inline">DELTA & MOBILE</span>
          </button>

          <button
            onClick={() => setLang(lang === 'ru' ? 'en' : 'ru')}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#140b26] border border-purple-800/60 text-purple-200 font-mono text-xs font-bold hover:bg-purple-900/40 transition-all cursor-pointer"
          >
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            <span>{lang.toUpperCase()}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
