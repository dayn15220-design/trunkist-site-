import React, { useState } from 'react';
import { Copy, Check, ShieldCheck, Cpu, Zap, Smartphone, Terminal, Lock, CheckCircle2 } from 'lucide-react';
import { LanguageType } from '../types';

interface GetScriptPageProps {
  lang: LanguageType;
}

export const GetScriptPage: React.FC<GetScriptPageProps> = ({ lang }) => {
  const [copied, setCopied] = useState(false);
  const loadstringCode = 'loadstring(game:HttpGet("https://raw.githubusercontent.com/trunkist/script/main/source.lua"))()';

  const handleCopy = () => {
    navigator.clipboard.writeText(loadstringCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isEn = lang === 'en';

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title Header */}
      <div className="bg-[#130b25]/80 border border-purple-500/30 rounded-3xl p-8 backdrop-blur-md relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-60 h-60 bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold mb-4">
            <Zap className="w-3.5 h-3.5 text-purple-400" />
            <span>{isEn ? 'OFFICIAL LOADER & SPECS' : 'ОФИЦИАЛЬНЫЙ ЛОАДЕР И ХАРАКТЕРИСТИКИ'}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
            {isEn ? 'Get Trunkist Hub Script' : 'Получить Скрипт Trunkist Hub'}
          </h1>
          <p className="text-purple-300/80 text-sm sm:text-base leading-relaxed">
            {isEn 
              ? 'Execute the loadstring below in any supported executor. Built for high performance, zero FPS drops, and maximum undetected combat advantage.'
              : 'Выполните loadstring ниже в любом поддерживаемом инжекторе. Создан для высокой производительности, без просадок FPS и максимальной безопасности.'}
          </p>
        </div>
      </div>

      {/* Code Box */}
      <div className="bg-[#130b25]/90 border border-purple-500/30 rounded-2xl p-6 relative shadow-[0_0_25px_rgba(168,85,247,0.15)]">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-mono text-purple-400 font-semibold uppercase tracking-wider flex items-center gap-2">
            <Terminal className="w-4 h-4 text-purple-400" />
            RAW LOADER CODE
          </span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition shadow-lg"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? (isEn ? 'COPIED!' : 'СКОПИРОВАНО!') : (isEn ? 'COPY LOADER' : 'СКОПИРОВАТЬ')}</span>
          </button>
        </div>
        <div className="bg-[#080411] p-4 rounded-xl border border-purple-900/60 font-mono text-xs sm:text-sm text-purple-200 overflow-x-auto break-all selection:bg-purple-700 selection:text-white">
          {loadstringCode}
        </div>
      </div>

      {/* Script Specifications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Spec Card 1: Security & Protection */}
        <div className="bg-[#130b25]/60 border border-purple-900/50 rounded-2xl p-6 space-y-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white">
            {isEn ? 'Anti-Cheat Status' : 'Статус Античита'}
          </h3>
          <ul className="space-y-2 text-xs text-purple-200/80 font-medium">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{isEn ? 'Status: Undetected (Byfron / Hyperion Safe)' : 'Статус: Undetected (Обходит Byfron / Hyperion)'}</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{isEn ? 'Auto-updating remote source' : 'Авто-обновляемый удаленный исходник'}</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{isEn ? 'Hookfunction & Metatable obfuscation' : 'Обфускация метатаблиц и функций'}</span>
            </li>
          </ul>
        </div>

        {/* Spec Card 2: Performance */}
        <div className="bg-[#130b25]/60 border border-purple-900/50 rounded-2xl p-6 space-y-4">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
            <Cpu className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white">
            {isEn ? 'Performance Specs' : 'Характеристики Производительности'}
          </h3>
          <ul className="space-y-2 text-xs text-purple-200/80 font-medium">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
              <span>{isEn ? 'Execution Time: ~0.12s' : 'Время Инициализации: ~0.12с'}</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
              <span>{isEn ? 'FPS Impact: 0% Drop (RenderStepped optimized)' : 'Влияние на FPS: 0% (оптимизировано)'}</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
              <span>{isEn ? 'RAM Memory Usage: < 12 MB' : 'Потребление ОЗУ: < 12 МБ'}</span>
            </li>
          </ul>
        </div>

        {/* Spec Card 3: Compatibility */}
        <div className="bg-[#130b25]/60 border border-purple-900/50 rounded-2xl p-6 space-y-4">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <Smartphone className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white">
            {isEn ? 'Supported Executors' : 'Поддерживаемые Инжекторы'}
          </h3>
          <ul className="space-y-2 text-xs text-purple-200/80 font-medium">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
              <span>{isEn ? 'PC: Wave, Solara, MacSploit, Synapse Z' : 'ПК: Wave, Solara, MacSploit, Synapse Z'}</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
              <span>{isEn ? 'Mobile: Delta, Hydrogen, Codex, Arceus X' : 'Мобильные: Delta, Hydrogen, Codex, Arceus X'}</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
              <span>{isEn ? 'Level 7+ UNC Compatibility: 98%' : 'UNC Совместимость: 98%'}</span>
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
};
