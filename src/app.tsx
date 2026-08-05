1. src/App.tsx (Главный контейнер сайта)
code
Tsx
import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { TrunkistFeaturesOverview } from './components/TrunkistFeaturesOverview';
import { ParrySimulator } from './components/ParrySimulator';
import { WeaponDatabase } from './components/WeaponDatabase';
import { ExecutorConsole } from './components/ExecutorConsole';
import { MobileScriptModal } from './components/MobileScriptModal';
import { TabType, LanguageType } from './types';
import { motion, AnimatePresence } from 'motion/react';

export function App() {
  const [activeTab, setActiveTab] = useState<TabType>('features-overview');
  const [lang, setLang] = useState<LanguageType>('ru');
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#090511] text-purple-100 font-sans selection:bg-purple-600 selection:text-white">
      <div className="relative min-h-screen flex flex-col">
        {/* Background Ambient Glow */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-900/20 rounded-full blur-3xl" />
          <div className="absolute top-1/3 -right-40 w-96 h-96 bg-pink-900/15 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-cyan-900/15 rounded-full blur-3xl" />
        </div>

        {/* Top Header Navbar */}
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          lang={lang}
          setLang={setLang}
          onOpenMobileModal={() => setIsMobileModalOpen(true)}
        />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <AnimatePresence mode="wait">
            {activeTab === 'features-overview' && (
              <motion.div
                key="features"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <TrunkistFeaturesOverview lang={lang} />
              </motion.div>
            )}

            {activeTab === 'parry-simulator' && (
              <motion.div
                key="simulator"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <ParrySimulator lang={lang} />
              </motion.div>
            )}

            {activeTab === 'weapon-database' && (
              <motion.div
                key="weapons"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <WeaponDatabase lang={lang} />
              </motion.div>
            )}

            {activeTab === 'executor-console' && (
              <motion.div
                key="console"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <ExecutorConsole lang={lang} />
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        <footer className="border-t border-purple-900/40 py-6 text-center text-xs text-purple-400 font-mono bg-[#0c0816]/90">
          <p>
            Trunkist HUB Monolith Engine • Created by{' '}
            <span className="text-white font-bold">Trunkist (@dayn15220-design)</span>
          </p>
        </footer>
      </div>

      {/* Mobile & Delta Script Modal */}
      <MobileScriptModal
        isOpen={isMobileModalOpen}
        onClose={() => setIsMobileModalOpen(false)}
        lang={lang}
      />
    </div>
  );
}

export default App;
2. src/components/CreatorProfileAndStats.tsx (Карточка профиля с Аской и честными статистиками)
code
Tsx
import React, { useState } from 'react';
import { LanguageType } from '../types';
import { motion } from 'motion/react';
import {
  ShieldCheck,
  TrendingUp,
  Flame,
  Award,
  MessageSquare,
  Users,
  Activity,
  Copy,
  Check,
  Code2,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import asukaAvatar from '../assets/images/asuka_avatar_custom_1785956555976.jpg';

interface CreatorProfileAndStatsProps {
  lang: LanguageType;
}

export const CreatorProfileAndStats: React.FC<CreatorProfileAndStatsProps> = ({ lang }) => {
  const [copiedLink, setCopiedLink] = useState(false);

  const statsList = [
    {
      labelRu: 'Заинжектили За Неделю',
      labelEn: 'Weekly Injections',
      value: '1,840',
      change: '+24% ACTIVE',
      icon: TrendingUp,
      color: 'from-purple-500 to-pink-500',
      subtextRu: 'Более 1.8 тыс. успешных запусков за 7 дней',
      subtextEn: 'Over 1.8k active script runs in last 7 days',
    },
    {
      labelRu: 'Всего Инжектов (Total Loads)',
      labelEn: 'Total Injections Ever',
      value: '12,450+',
      change: 'CW LUNORIA ENGINE',
      icon: Flame,
      color: 'from-pink-500 to-rose-600',
      subtextRu: 'Суммарные запуски скрипта на ПК и Delta Mobile',
      subtextEn: 'Total script executions on PC & Delta Mobile',
    },
    {
      labelRu: 'Участников в Discord',
      labelEn: 'Discord Community Members',
      value: '200+',
      change: 'DISCORD ONLINE',
      icon: Users,
      color: 'from-emerald-500 to-teal-600',
      subtextRu: 'Участников на официальном сервере Discord',
      subtextEn: 'Active members on our official Discord server',
    },
    {
      labelRu: 'Блокировок (Bans Rate)',
      labelEn: 'Ban Rate Record',
      value: '0.00%',
      change: '100% SAFE',
      icon: ShieldCheck,
      color: 'from-cyan-500 to-blue-600',
      subtextRu: '0 банов за всю историю благодаря бесключевой защите!',
      subtextEn: '0 reported bans with safe memory hooks!',
    },
  ];

  const handleCopyRepo = () => {
    navigator.clipboard.writeText('https://github.com/dayn15220-design/trunkistcw.lua');
    setCopiedLink(true);
    confetti({ particleCount: 40, spread: 60, origin: { y: 0.7 } });
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="space-y-8 my-8">
      {/* SECTION HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-purple-900/50 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-black text-white font-mono uppercase tracking-wider flex items-center gap-2">
              <Activity className="w-6 h-6 text-pink-400 animate-pulse" />
              <span>{lang === 'ru' ? 'Рекорды & Статистика Инжектов' : 'Live Injections Statistics'}</span>
            </h2>
            <span className="px-3 py-1 rounded-full bg-pink-950/80 border border-pink-500/50 text-pink-300 text-xs font-mono font-bold animate-bounce">
              LEGENDARY
            </span>
          </div>
          <p className="text-xs font-mono text-purple-300/70 mt-1">
            {lang === 'ru'
              ? 'Официальные данные активности сообщества Trunkist Hub'
              : 'Official live telemetry metrics for Trunkist Hub execution network'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-950/90 border border-emerald-500/50 text-emerald-400 text-xs font-mono font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>ONLINE SERVERS: 100% OPERATIONAL</span>
          </span>
        </div>
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsList.map((st, idx) => {
          const Icon = st.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.1 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="relative p-5 rounded-3xl bg-[#120a24] border border-purple-900/60 shadow-xl overflow-hidden group space-y-3"
            >
              <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full bg-gradient-to-br ${st.color} opacity-15 blur-xl group-hover:opacity-30 transition-opacity`} />
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-2xl bg-gradient-to-tr ${st.color} text-white shadow-lg`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="px-2.5 py-1 rounded-full bg-purple-950 border border-purple-700/50 text-[10px] font-mono font-bold text-cyan-300">
                  {st.change}
                </span>
              </div>
              <div>
                <span className="text-xs font-mono text-purple-300/70 uppercase tracking-wider block">
                  {lang === 'ru' ? st.labelRu : st.labelEn}
                </span>
                <span className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                  {st.value}
                </span>
              </div>
              <p className="text-[11px] font-mono text-purple-300/60 pt-2 border-t border-purple-900/40">
                {lang === 'ru' ? st.subtextRu : st.subtextEn}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* CREATOR PROFILE CARD */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="relative rounded-3xl bg-gradient-to-b from-[#190d35] via-[#110826] to-[#0a0518] p-6 sm:p-8 border-2 border-purple-500/50 shadow-[0_0_60px_rgba(168,85,247,0.25)] overflow-hidden"
      >
        <div className="relative z-10 flex flex-col lg:flex-row items-center lg:items-start gap-6 sm:gap-8">
          <div className="relative shrink-0">
            <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-3xl p-1 bg-gradient-to-tr from-rose-500 via-pink-500 to-purple-500 shadow-[0_0_35px_rgba(244,63,94,0.6)]">
              <div className="w-full h-full rounded-[22px] bg-[#0c061a] overflow-hidden relative group">
                <img
                  src={asukaAvatar}
                  alt="Asuka Langley Soryu"
                  className="w-full h-full object-cover rounded-[22px] transform group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute bottom-1.5 left-0 right-0 text-center">
                  <span className="text-[9px] font-mono font-black text-rose-300 tracking-wider bg-rose-950/90 px-2 py-0.5 rounded-full border border-rose-500/50 uppercase">
                    ASUKA LANGLEY
                  </span>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-2 right-2 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-500/60 text-emerald-300 font-mono text-[10px] font-bold flex items-center gap-1.5 shadow-lg">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>ONLINE</span>
            </div>
          </div>

          <div className="flex-1 space-y-4 text-center lg:text-left">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
                <h3 className="text-2xl sm:text-3xl font-black text-white font-mono tracking-wide">
                  Trunkist
                </h3>
                <span className="px-3 py-1 rounded-full bg-gradient-to-r from-rose-600 via-purple-600 to-pink-600 text-white font-mono text-xs font-bold uppercase shadow-md flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-amber-300" />
                  <span>CREATOR & SCRIPT ARCHITECT</span>
                </span>
              </div>
              <p className="text-xs sm:text-sm font-mono text-purple-300 font-semibold">
                Developer of Trunkist HUB Monolith Engine • GitHub: @dayn15220-design
              </p>
            </div>

            <p className="text-xs sm:text-sm font-mono text-purple-200/90 leading-relaxed bg-[#090416]/80 p-4 rounded-2xl border border-purple-900/60">
              {lang === 'ru'
                ? '⚡ Создатель бесключевого скрипта Trunkist HUB для Combat Warriors. Разработчик софта, оптимизированного для ПК и Delta Mobile (iOS/Android) с мгновенным Auto-Parry и невидимым обходом Hyperion.'
                : '⚡ Creator of keyless Trunkist HUB script for Combat Warriors. Developing keyless software optimized for PC and Delta Mobile (iOS/Android) with instant Auto-Parry and silent Hyperion bypass.'}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] font-mono">
              <div className="p-2.5 rounded-xl bg-[#0e0722] border border-purple-900/50 flex flex-col items-center lg:items-start">
                <span className="text-rose-400 font-bold">Avatar Theme</span>
                <span className="text-white">Asuka Langley Soryu</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#0e0722] border border-purple-900/50 flex flex-col items-center lg:items-start">
                <span className="text-pink-400 font-bold">Discord Server</span>
                <span className="text-amber-300 font-bold">200+ Members</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#0e0722] border border-purple-900/50 flex flex-col items-center lg:items-start">
                <span className="text-emerald-400 font-bold">Key System</span>
                <span className="text-emerald-300 font-bold">100% KEYLESS</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#0e0722] border border-purple-900/50 flex flex-col items-center lg:items-start">
                <span className="text-cyan-400 font-bold">GitHub Repo</span>
                <span className="text-cyan-200 truncate max-w-full">dayn15220-design</span>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <a
                href="https://discord.gg/2hNKeENmpM"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 rounded-xl bg-[#5865F2] hover:bg-[#4752C4] text-white font-mono font-bold text-xs uppercase flex items-center gap-2 shadow-lg transition-all cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{lang === 'ru' ? 'Вступить в Discord (200+)' : 'Join Discord (200+ Members)'}</span>
              </a>

              <a
                href="https://github.com/dayn15220-design/trunkistcw.lua"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 rounded-xl bg-[#171b22] hover:bg-[#222731] text-white font-mono font-bold text-xs uppercase flex items-center gap-2 border border-purple-700/50 shadow-lg transition-all cursor-pointer"
              >
                <Code2 className="w-4 h-4 text-purple-400" />
                <span>GitHub Repo</span>
              </a>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCopyRepo}
                className="px-4 py-2.5 rounded-xl bg-purple-900/60 hover:bg-purple-800/80 text-purple-200 border border-purple-600/50 font-mono font-bold text-xs uppercase flex items-center gap-2 shadow-md cursor-pointer"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-300" />
                    <span>Скопировано!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Скопировать Repo</span>
                  </>
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
3. src/components/ExecutorConsole.tsx (Интерактивная Консоль с пасхалкой trunkist)
code
Tsx
import React, { useState, useEffect, useRef } from 'react';
import { LanguageType } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, CheckCircle2, Play, Zap, Trash2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ExecutorConsoleProps {
  lang: LanguageType;
}

export const ExecutorConsole: React.FC<ExecutorConsoleProps> = ({ lang }) => {
  const [logs, setLogs] = useState<string[]>([
    '[INIT] Trunkist Hub Monolith Engine v4.8 loaded...',
    '[AUTH] Validating local Roblox client session token...',
    '[HWID] HWID protection status: OK (Masked)',
    '[BYPASS] Hyperion Anti-Cheat memory hook injected.',
    '[MONOLITH] Threat Index module operational (0ms delay).',
    '[MOBILE] Mobile & Delta Executor floating touch controls initialized.',
    '[READY] Console ready. Type "trunkist" for secret thunder easter egg or "help" for commands!',
  ]);

  const [inputCommand, setInputCommand] = useState('');
  const [showLightning, setShowLightning] = useState(false);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const handleRunCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCommand.trim()) return;

    const cmd = inputCommand.trim();
    setLogs((prev) => [...prev, `> ${cmd}`]);
    const lower = cmd.toLowerCase();

    if (lower === 'trunkist') {
      setShowLightning(true);
      confetti({
        particleCount: 140,
        spread: 120,
        origin: { y: 0.5 },
        colors: ['#a855f7', '#38bdf8', '#f43f5e', '#ffffff', '#e0e7ff'],
      });

      setLogs((prev) => [
        ...prev,
        '⚡⚡⚡ [EASTER EGG ACTIVATED] TRUNKIST MONOLITH THUNDER STRIKE! ⚡⚡⚡',
        '⚡ [LIGHTNING] Overclocking kernel to 9999 GHz...',
        '⚡ [SYSTEM] You found the secret Trunkist Easter Egg!',
      ]);

      setTimeout(() => setShowLightning(false), 3200);
    } else if (lower === 'help') {
      setLogs((prev) => [
        ...prev,
        '[CONSOLE] Available commands: trunkist (EASTER EGG), status, delta, clear',
      ]);
    } else if (lower === 'status') {
      setLogs((prev) => [
        ...prev,
        '[STATUS] Auto-Parry: ACTIVE | Threat Engine: 0ms | Ban Risk: 0% | Mobile & Delta: FULLY SUPPORTED',
      ]);
    } else if (lower === 'clear') {
      setLogs([]);
    } else {
      setLogs((prev) => [...prev, `[EXEC] Executed Luau command: ${cmd}`]);
    }

    setInputCommand('');
  };

  return (
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 relative">
      <AnimatePresence>
        {showLightning && (
          <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center overflow-hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.95, 0.1, 0.9, 0] }}
              transition={{ duration: 2.8 }}
              className="absolute inset-0 bg-gradient-to-tr from-cyan-300 via-white to-purple-600 mix-blend-screen"
            />
            <motion.div
              initial={{ scale: 0.3, opacity: 0 }}
              animate={{ scale: [0.3, 1.15, 1, 0], opacity: [0, 1, 1, 0] }}
              transition={{ duration: 3.0 }}
              className="relative z-10 text-center px-8 py-6 rounded-3xl bg-[#0b051b]/90 border-2 border-cyan-400 shadow-[0_0_60px_rgba(56,189,248,0.8)] backdrop-blur-md"
            >
              <div className="flex items-center justify-center gap-3 text-cyan-300 font-mono font-black text-2xl uppercase">
                <Zap className="w-8 h-8 text-amber-300" />
                <span>TRUNKIST THUNDER STRIKE</span>
                <Zap className="w-8 h-8 text-amber-300" />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="bg-[#120a24] rounded-3xl p-6 sm:p-8 border border-purple-900/50 shadow-2xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal className="w-6 h-6 text-purple-400" />
            <h2 className="text-xl sm:text-2xl font-extrabold text-white font-mono">
              {lang === 'ru' ? 'Интерактивная Консоль Скрипта' : 'Execution Console'}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => setInputCommand('trunkist')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-950/80 border border-amber-500/50 text-amber-300 text-xs font-mono font-bold cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Пасхалка: "trunkist"</span>
            </motion.button>
            <button
              onClick={() => setLogs([])}
              className="p-1.5 rounded-xl bg-[#0a0518] border border-purple-900/50 text-purple-400 hover:text-white"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="bg-[#090412] p-4 rounded-2xl border border-purple-900/60 font-mono text-xs text-purple-300 h-80 overflow-y-auto space-y-1.5 select-text">
          {logs.map((log, idx) => (
            <div key={idx}>
              {log.startsWith('>') ? (
                <span className="text-pink-400 font-bold">{log}</span>
              ) : log.includes('EASTER EGG') ? (
                <span className="text-cyan-300 font-bold">{log}</span>
              ) : (
                <span>{log}</span>
              )}
            </div>
          ))}
          <div ref={terminalEndRef} />
        </div>

        <form onSubmit={handleRunCommand} className="flex items-center gap-2">
          <input
            type="text"
            placeholder='Введите "trunkist" для пасхалки или команду...'
            value={inputCommand}
            onChange={(e) => setInputCommand(e.target.value)}
            className="flex-1 bg-[#090514] border border-purple-900/60 rounded-xl px-4 py-2.5 font-mono text-xs text-purple-100 focus:outline-none"
          />
          <button
            type="submit"
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-mono font-bold text-xs uppercase flex items-center gap-2 cursor-pointer"
          >
            <Play className="w-3.5 h-3.5" />
            <span>Run</span>
          </button>
        </form>
      </div>
    </motion.div>
  );
};
