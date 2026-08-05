import React from 'react';
import { Shield, Zap, Terminal, Code2, Users, Flame, ExternalLink, Award } from 'lucide-react';
import { motion } from 'motion/react';
import { LanguageType } from '../types';

interface CreatorProfileAndStatsProps {
  lang: LanguageType;
}

export const CreatorProfileAndStats: React.FC<CreatorProfileAndStatsProps> = ({ lang }) => {
  const stats = [
    {
      icon: Users,
      labelRu: 'Активных пользователей',
      labelEn: 'Active Users',
      value: '45,000+',
      change: '+12% this month',
      subtextRu: 'Стабильная аудитория проекта',
      subtextEn: 'Stable project community',
      color: 'from-purple-500 to-indigo-500',
    },
    {
      icon: Shield,
      labelRu: 'Bypass Статус',
      labelEn: 'Bypass Status',
      value: '100% Undetected',
      change: 'Hyperion V2 Safe',
      subtextRu: 'Полный обход античита',
      subtextEn: 'Full anti-cheat bypass',
      color: 'from-emerald-500 to-teal-500',
    },
    {
      icon: Flame,
      labelRu: 'Успешных парирований',
      labelEn: 'Successful Parries',
      value: '1.2M+',
      change: '99.8% Precision',
      subtextRu: 'Зафиксировано симулятором',
      subtextEn: 'Recorded by simulator',
      color: 'from-amber-500 to-orange-500',
    },
    {
      icon: Code2,
      labelRu: 'Аптайм сервера',
      labelEn: 'Server Uptime',
      value: '99.9%',
      change: '24/7 Monitored',
      subtextRu: 'Минимальный пинг и задержка',
      subtextEn: 'Minimal ping and latency',
      color: 'from-cyan-500 to-blue-500',
    },
  ];

  return (
    <div className="space-y-8">
      {/* STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((st, idx) => {
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
        className="relative rounded-3xl bg-gradient-to-b from-[#190d35] via-[#110826] to-[#0a0518] p-6 sm:p-8 border-2 border-purple-500/50 shadow-[0_0_60px_rgba(168,85,247,0.15)]"
      >
        <div className="relative z-10 flex flex-col lg:flex-row items-center lg:items-start gap-6 sm:gap-8">
          <div className="relative shrink-0">
            <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-3xl p-1 bg-gradient-to-tr from-rose-500 via-pink-500 to-purple-500 shadow-[0_0_35px_rgba(244,63,94,0.6)]">
              <div className="w-full h-full rounded-[22px] bg-[#0c061a] flex items-center justify-center text-5xl">
                ⚡
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
                <span className="px-3 py-1 rounded-full bg-gradient-to-r from-rose-600 via-purple-600 to-pink-600 text-white font-mono text-xs font-bold uppercase shadow-lg flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-amber-300" />
                  <span>CREATOR & SCRIPT ARCHITECT</span>
                </span>
              </div>
              <p className="text-xs sm:text-sm font-mono text-purple-300 font-semibold">
                Developer of Trunkist HUB Monolith Engine • GitHub: @dayn15220-design
              </p>
            </div>

            <p className="text-sm text-purple-200/80 leading-relaxed max-w-2xl">
              {lang === 'ru'
                ? 'Главный разработчик архитектуры Trunkist HUB. Специализируется на высокопроизводительных луа-скриптах, алгоритмах автоматического парирования с машинной точностью и безопасных методах инжекта в клиент.'
                : 'Lead architect of Trunkist HUB. Specializes in high-performance Lua scripts, sub-millisecond parry algorithms, and stealth execution techniques for Roblox client.'}
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <a
                href="https://github.com/dayn15220-design"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl bg-purple-900/50 hover:bg-purple-800/60 border border-purple-500/40 text-purple-200 text-xs font-mono transition-all flex items-center gap-2"
              >
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span>GitHub Profile</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>
              <div className="px-4 py-2 rounded-xl bg-purple-950/40 border border-purple-900/60 text-purple-300 text-xs font-mono flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                <span>Lua / TypeScript / React / C++</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
