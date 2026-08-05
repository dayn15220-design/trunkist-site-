import React, { useState } from 'react';
import { LanguageType } from '../types';
import { ShieldCheck, Zap, Code, Copy, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CreatorProfileAndStats } from './CreatorProfileAndStats';

interface TrunkistFeaturesOverviewProps {
  lang: LanguageType;
}

export const TrunkistFeaturesOverview: React.FC<TrunkistFeaturesOverviewProps> = ({ lang }) => {
  const [copiedLoadstring, setCopiedLoadstring] = useState(false);

  const loadstringCode = 'loadstring(game:HttpGet("https://raw.githubusercontent.com/dayn15220-design/trunkistcw.lua/main/ref.lua"))()';

  const handleCopy = () => {
    navigator.clipboard.writeText(loadstringCode);
    setCopiedLoadstring(true);
    confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
    setTimeout(() => setCopiedLoadstring(false), 2000);
  };

  return (
    <div className="space-y-10">
      {/* HERO BANNER */}
      <div className="relative rounded-3xl bg-gradient-to-r from-[#190d35] via-[#120726] to-[#0d041a] p-8 border border-purple-500/40 shadow-2xl overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/50 text-emerald-400 font-mono text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>100% ACTIVE & UPDATED</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white font-mono tracking-wide">
            {lang === 'ru' ? 'Почему Trunkist HUB — Скрипт №1 в Roblox?' : 'Why Trunkist HUB is #1 Script in Roblox?'}
          </h1>

          <p className="text-sm sm:text-base font-mono text-purple-200/95 leading-relaxed">
            {lang === 'ru'
              ? 'Trunkist Hub — это ультимативный приватный скрипт для Combat Warriors в игр Roblox. Мы разработали собственный математический алгоритм расчета угрозы (Threat Index), обхода античита Hyperion и худшему таймингу парарирования.'
              : 'Trunkist Hub is the ultimate private script for Combat Warriors in Roblox. Featuring proprietary threat telemetry and silent Hyperion bypass.'}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={handleCopy}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-mono font-bold text-xs uppercase shadow-lg shadow-purple-900/50 flex items-center gap-2 cursor-pointer hover:brightness-110 transition-all"
            >
              {copiedLoadstring ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>Loadstring Скопирован!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Скопировать Loadstring</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* CREATOR PROFILE & STATS SECTION */}
      <CreatorProfileAndStats lang={lang} />
    </div>
  );
};
