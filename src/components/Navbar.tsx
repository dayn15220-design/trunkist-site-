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
  Music,
  History,
  ShieldCheck,
  Palette,
  Radio,
  Users,
  MessageSquare,
  Activity,
} from 'lucide-react';
import { TRUNKIST_LOADSTRING } from '../data/trunkistScriptData';
import { useSiteTheme } from '../context/SiteThemeContext';
import { fetchLiveStats, recordTelemetryEvent } from '../services/telemetryService';

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
  const { theme, playUISound } = useSiteTheme();
  const [fps, setFps] = useState(60);
  const [ping, setPing] = useState(14);
  const [copied, setCopied] = useState(false);
  const [onlineVisitors, setOnlineVisitors] = useState<number>(1);

  useEffect(() => {
    let isMounted = true;
    const pollStats = async () => {
      const stats = await fetchLiveStats();
      if (stats && isMounted) {
        setOnlineVisitors(stats.onlineVisitors);
      }
    };

    pollStats();
    const interval = setInterval(() => {
      setFps(Math.floor(58 + Math.random() * 4));
      setPing(Math.floor(11 + Math.random() * 5));
      pollStats();
    }, 2500);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const handleCopyLoadstring = () => {
    playUISound('laser');
    navigator.clipboard.writeText(TRUNKIST_LOADSTRING);
    setCopied(true);

    recordTelemetryEvent({
      type: 'execution',
      actionRu: 'Скопирован официальный Loadstring Trunkist v1.4.8.8 TR',
      actionEn: 'Copied official Trunkist v1.4.8.8 TR Loadstring',
    });

    setTimeout(() => setCopied(false), 2000);
  };

  const handleTabClick = (tab: TabType) => {
    playUISound('cyber');
    setActiveTab(tab);
  };

  const tabs: { id: TabType; labelRu: string; labelEn: string; icon: React.ElementType }[] = [
    { id: 'features-overview', labelRu: 'Функции & Почему #1', labelEn: 'Features & Why #1', icon: Sparkles },
    { id: 'live-telemetry', labelRu: 'Онлайн & Телеметрия', labelEn: 'Live Telemetry', icon: Radio },
    { id: 'live-chat', labelRu: 'Живой Чат 💬', labelEn: 'Live Chat 💬', icon: MessageSquare },
    { id: 'ui-customizer', labelRu: 'Кастом UI', labelEn: 'UI Customizer', icon: Palette },
    { id: 'parry-arena', labelRu: 'Threat & Parry', labelEn: 'Threat & Parry', icon: ShieldAlert },
    { id: 'weapon-dps', labelRu: 'Арсенал & Тайминги', labelEn: 'Weapons & Timings', icon: Crosshair },
    { id: 'executor-console', labelRu: 'Консоль Скрипта', labelEn: 'Script Console', icon: Terminal },
  ];

  return (
    <header
      className="sticky top-0 z-40 backdrop-blur-xl border-b transition-colors duration-300 shadow-2xl"
      style={{
        backgroundColor: `${theme.cardBg}f0`,
        borderColor: `${theme.borderColor}55`,
        boxShadow: `0 10px 30px -10px ${theme.primaryColor}25`,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 gap-4 py-2">
          
          {/* Top-Left Custom Logo: "TR" intertwined + small "HUB" underneath */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="flex items-center gap-3 shrink-0 cursor-pointer"
            onClick={() => handleTabClick('features-overview')}
          >
            <div
              className="relative flex flex-col items-center justify-center w-11 h-11 rounded-xl border shadow-lg group overflow-hidden select-none transition-colors"
              style={{
                backgroundColor: theme.bgColor,
                borderColor: `${theme.borderColor}88`,
              }}
            >
              {/* Intertwined stylized "T" and "R" */}
              <div className="relative flex items-center justify-center font-black font-mono tracking-tighter text-white text-lg leading-none pt-0.5">
                <span
                  className="transform -rotate-6 -mr-1.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                  style={{ color: theme.primaryColor }}
                >
                  T
                </span>
                <span
                  className="transform rotate-12 -ml-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] font-extrabold"
                  style={{ color: theme.accentColor }}
                >
                  R
                </span>
              </div>
              <span
                className="text-[8px] font-mono font-black tracking-widest uppercase -mt-0.5 px-1 rounded border"
                style={{
                  backgroundColor: `${theme.cardBg}e6`,
                  color: theme.primaryColor,
                  borderColor: `${theme.borderColor}66`,
                }}
              >
                HUB
              </span>
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                style={{ backgroundColor: `${theme.primaryColor}20` }}
              />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base tracking-wider text-white font-mono">
                  {theme.titlePrefix || 'TRUNKIST'}{' '}
                  <span style={{ color: theme.primaryColor }}>HUB</span>
                </span>
                
                {/* LIVE STATUS DETECT BADGE */}
                <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950/90 border border-emerald-500/50 text-emerald-300 text-[10px] font-mono font-bold shadow-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  <span>UNDETECTED</span>
                </div>

                {/* LIVE ONLINE COUNTER BADGE */}
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTabClick('live-telemetry');
                  }}
                  className="hidden sm:flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-950/90 border border-purple-500/50 text-purple-200 text-[10px] font-mono font-bold shadow-sm hover:scale-105 transition-transform cursor-pointer"
                  style={{
                    backgroundColor: `${theme.primaryColor}25`,
                    borderColor: `${theme.accentColor}80`,
                  }}
                >
                  <Users className="w-3 h-3 text-emerald-400" />
                  <span className="text-white font-extrabold">{onlineVisitors}</span>
                  <span className="text-gray-300 uppercase text-[9px]">{lang === 'ru' ? 'Онлайн' : 'Online'}</span>
                </div>
              </div>
              <span className="text-[10px] font-mono text-gray-400">
                v1.4.8.8 TR | COMBAT WARRIORS
              </span>
            </div>
          </motion.div>

          {/* Navigation Bar */}
          <nav
            className="hidden lg:flex items-center gap-1 p-1.5 rounded-xl border transition-colors"
            style={{
              backgroundColor: `${theme.bgColor}cc`,
              borderColor: `${theme.borderColor}66`,
            }}
          >
            {tabs.map((t) => {
              const Icon = t.icon;
              const isActive = activeTab === t.id;
              return (
                <button
                  key={t.id}
                  id={`nav-tab-${t.id}`}
                  onClick={() => handleTabClick(t.id)}
                  className={`relative flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold font-mono transition-all duration-200 cursor-pointer ${
                    isActive ? 'text-white font-bold' : 'text-gray-300 hover:text-white'
                  }`}
                  style={{
                    backgroundColor: isActive ? undefined : 'transparent',
                  }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavTab"
                      className="absolute inset-0 rounded-lg shadow-lg border -z-10"
                      style={{
                        backgroundColor: theme.primaryColor,
                        borderColor: theme.accentColor,
                        boxShadow: `0 0 15px ${theme.primaryColor}88`,
                      }}
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                    />
                  )}
                  <Icon className="w-3.5 h-3.5" style={{ color: isActive ? '#ffffff' : theme.primaryColor }} />
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
              onClick={() => {
                playUISound('mech');
                onOpenMobileModal();
              }}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-white font-mono font-black text-xs uppercase shadow-lg cursor-pointer border transition-colors"
              style={{
                backgroundColor: `${theme.cardBg}`,
                borderColor: `${theme.borderColor}aa`,
              }}
            >
              <Smartphone className="w-4 h-4" style={{ color: theme.primaryColor }} />
              <span>Mobile?</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleCopyLoadstring}
              className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl text-white font-mono font-bold text-xs uppercase shadow-md transition-all cursor-pointer border"
              style={{
                backgroundColor: theme.primaryColor,
                borderColor: theme.accentColor,
                boxShadow: `0 4px 15px ${theme.primaryColor}55`,
              }}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-white" />
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
              onClick={() => {
                playUISound('cyber');
                setLang(lang === 'ru' ? 'en' : 'ru');
              }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-mono font-bold text-white transition-colors cursor-pointer"
              style={{
                backgroundColor: `${theme.cardBg}`,
                borderColor: `${theme.borderColor}66`,
              }}
            >
              <Languages className="w-3.5 h-3.5" style={{ color: theme.primaryColor }} />
              <span>{lang.toUpperCase()}</span>
            </motion.button>
          </div>
        </div>

        {/* Mobile Nav Row */}
        <div
          className="flex lg:hidden overflow-x-auto gap-1 py-2 border-t no-scrollbar"
          style={{ borderColor: `${theme.borderColor}44` }}
        >
          {tabs.map((t) => {
            const Icon = t.icon;
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                id={`mobile-tab-${t.id}`}
                onClick={() => handleTabClick(t.id)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold whitespace-nowrap shrink-0 transition-all cursor-pointer border"
                style={{
                  backgroundColor: isActive ? theme.primaryColor : theme.cardBg,
                  color: '#ffffff',
                  borderColor: isActive ? theme.accentColor : `${theme.borderColor}66`,
                }}
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

