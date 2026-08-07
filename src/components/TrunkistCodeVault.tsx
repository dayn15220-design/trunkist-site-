import React, { useState } from 'react';
import { LanguageType } from '../types';
import { useSiteTheme } from '../context/SiteThemeContext';
import { motion, AnimatePresence } from 'motion/react';
import { TRUNKIST_LOADSTRING, TRUNKIST_FEATURES } from '../data/trunkistScriptData';
import {
  Terminal,
  Copy,
  Check,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Lock,
  Cpu,
  ZapOff,
  AlertTriangle,
  Sliders,
  Code2,
  Settings,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface TrunkistCodeVaultProps {
  lang: LanguageType;
}

export const TrunkistCodeVault: React.FC<TrunkistCodeVaultProps> = ({ lang }) => {
  const { theme, playUISound } = useSiteTheme();
  const [copiedLoadstring, setCopiedLoadstring] = useState(false);
  const [copiedCustomConfig, setCopiedCustomConfig] = useState(false);

  // Custom Luau Builder State
  const [cfgAutoParry, setCfgAutoParry] = useState(true);
  const [cfgAntiBait, setCfgAntiBait] = useState(true);
  const [cfgSilentBackstab, setCfgSilentBackstab] = useState(true);
  const [cfgOrbitStrafe, setCfgOrbitStrafe] = useState(false);
  const [cfgParryDelay, setCfgParryDelay] = useState(0);
  const [cfgKeybind, setCfgKeybind] = useState<'F' | 'E' | 'R' | 'X'>('F');

  const customLoadstringCode = `getgenv().TrunkistConfig = {
    AutoParry = ${cfgAutoParry ? 'true' : 'false'},
    AntiBait = ${cfgAntiBait ? 'true' : 'false'},
    SilentBackstab = ${cfgSilentBackstab ? 'true' : 'false'},
    OrbitStrafe = ${cfgOrbitStrafe ? 'true' : 'false'},
    ParryDelayMs = ${cfgParryDelay},
    Keybind = Enum.KeyCode.${cfgKeybind},
}
loadstring(game:HttpGet("https://raw.githubusercontent.com/TrunkistHub/Main/refs/heads/main/combatwarriors.lua"))()`;

  const handleCopyLoadstring = () => {
    navigator.clipboard.writeText(TRUNKIST_LOADSTRING);
    setCopiedLoadstring(true);
    confetti({ particleCount: 35, spread: 60, origin: { y: 0.8 } });
    setTimeout(() => setCopiedLoadstring(false), 2000);
  };

  const handleCopyCustomConfig = () => {
    navigator.clipboard.writeText(customLoadstringCode);
    setCopiedCustomConfig(true);
    confetti({ particleCount: 45, spread: 70, origin: { y: 0.8 } });
    setTimeout(() => setCopiedCustomConfig(false), 2000);
  };

  const supportedExecutors = [
    { name: 'Wave', platform: 'Windows (High UNC)', status: 'ACTIVE', supported: true },
    { name: 'Delta', platform: 'Android / iOS', status: 'ACTIVE', supported: true },
    { name: 'Fluxus', platform: 'Android', status: 'ACTIVE', supported: true },
    { name: 'Hydrogen', platform: 'macOS / Android', status: 'ACTIVE', supported: true },
    { name: 'Celery', platform: 'Windows', status: 'ACTIVE', supported: true },
    { name: 'MacSploit', platform: 'macOS', status: 'ACTIVE', supported: true },
    { name: 'Solara', platform: 'Windows (Low UNC)', status: 'NOT SUPPORTED', supported: false },
    { name: 'Xeno', platform: 'Windows (No Hooks)', status: 'NOT SUPPORTED', supported: false },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* Top Banner */}
      <div
        className="rounded-3xl p-6 sm:p-8 border shadow-2xl relative overflow-hidden transition-all duration-300"
        style={{
          backgroundColor: theme.cardBg,
          borderColor: theme.borderColor,
          boxShadow: `0 0 ${theme.borderGlow / 2}px ${theme.primaryColor}20`,
        }}
      >
        <div
          style={{ backgroundColor: theme.primaryColor }}
          className="absolute top-0 right-0 w-80 h-80 opacity-10 rounded-full blur-3xl pointer-events-none"
        />
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold border"
              style={{
                backgroundColor: `${theme.primaryColor}20`,
                borderColor: `${theme.primaryColor}50`,
                color: theme.primaryColor,
              }}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>TRUNKIST HUB | OFFICIAL RELEASE LOADSTRING</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-wide">
              {lang === 'ru' ? 'Получить Скрипт Trunkist Hub' : 'Get Trunkist Hub Script'}
            </h2>
            <p className="text-purple-200/80 text-xs sm:text-sm font-mono max-w-2xl leading-relaxed">
              {lang === 'ru'
                ? 'Официальный лоадстринг для загрузки Trunkist Hub в роблокс инжектор. Исходный код скрипта защищен байткодом и обфускацией для защиты от банов.'
                : 'Official loader for Trunkist Hub in Combat Warriors. The core Lua binary is secured on GitHub with anti-ban protections.'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-950/90 border border-purple-600/60 text-purple-300 font-mono text-xs font-bold shadow-md">
              <CheckCircle2 className="w-4 h-4 text-purple-400" />
              <span>STATUS: ACTIVE</span>
            </div>
          </div>
        </div>
      </div>

      {/* Official Loadstring Box */}
      <div
        style={{
          backgroundColor: theme.cardBg,
          borderColor: theme.borderColor,
          boxShadow: `0 0 ${theme.borderGlow / 2}px ${theme.primaryColor}20`,
        }}
        className="rounded-3xl p-6 border shadow-2xl space-y-4 transition-all duration-300"
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-bold uppercase text-white flex items-center gap-2">
            <Terminal className="w-4 h-4" style={{ color: theme.primaryColor }} />
            {lang === 'ru' ? 'Официальный Loadstring для Всех Инжекторов:' : 'Official Script Loadstring:'}
          </span>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              handleCopyLoadstring();
              playUISound('laser');
            }}
            style={{
              backgroundColor: theme.primaryColor,
              borderColor: theme.accentColor,
            }}
            className="px-4 py-2 rounded-xl text-white font-mono font-bold text-xs uppercase flex items-center gap-2 shadow-lg cursor-pointer transition-all border"
          >
            {copiedLoadstring ? (
              <>
                <Check className="w-4 h-4 text-white" />
                <span>{lang === 'ru' ? 'Скопировано!' : 'Copied!'}</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>{lang === 'ru' ? 'Скопировать Loadstring' : 'Copy Loadstring'}</span>
              </>
            )}
          </motion.button>
        </div>

        <div
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.45)',
            borderColor: `${theme.borderColor}80`,
          }}
          className="p-4 rounded-2xl border font-mono text-xs text-white overflow-x-auto select-all shadow-inner"
        >
          {TRUNKIST_LOADSTRING}
        </div>

        <div
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.25)',
            borderColor: 'rgba(255, 255, 255, 0.1)',
          }}
          className="flex items-center gap-2 text-xs font-mono text-gray-300 p-3 rounded-xl border"
        >
          <Lock className="w-4 h-4 shrink-0" style={{ color: theme.primaryColor }} />
          <span>
            {lang === 'ru'
              ? 'Исходный код скрипта закрыт от прямого просмотра для безопасности пользователей и постоянных обновлений обхода античита.'
              : 'Full script source code is secured and compiled to prevent detection and unauthorized distribution.'}
          </span>
        </div>
      </div>

      {/* CUSTOM LUAU CONFIG GENERATOR / LOADSTRING BUILDER */}
      <div
        style={{
          backgroundColor: theme.cardBg,
          borderColor: theme.borderColor,
          boxShadow: `0 0 ${theme.borderGlow / 2}px ${theme.primaryColor}20`,
        }}
        className="rounded-3xl p-6 sm:p-8 border shadow-2xl space-y-6 transition-all duration-300"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Code2 className="w-6 h-6" style={{ color: theme.primaryColor }} />
            <h3 className="text-xl sm:text-2xl font-extrabold text-white font-mono">
              {lang === 'ru' ? 'Конструктор Кастомного Loadstring' : 'Custom Luau Loadstring Generator'}
            </h3>
          </div>
          <span
            style={{
              backgroundColor: `${theme.primaryColor}20`,
              borderColor: `${theme.primaryColor}60`,
              color: theme.primaryColor,
            }}
            className="text-xs font-mono font-bold px-3 py-1 rounded-xl border"
          >
            {lang === 'ru' ? 'Авто-Генерация Luau' : 'Live Luau Generator'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Controls */}
          <div
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.35)',
              borderColor: `${theme.borderColor}60`,
            }}
            className="space-y-4 p-5 rounded-2xl border"
          >
            <h4 className="text-xs font-mono font-bold text-white uppercase flex items-center gap-2">
              <Sliders className="w-4 h-4" style={{ color: theme.primaryColor }} />
              <span>{lang === 'ru' ? 'Настройки Конфигурации:' : 'Script Preset Options:'}</span>
            </h4>

            {/* Toggles */}
            <div className="space-y-2 text-xs font-mono">
              <label
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)', borderColor: 'rgba(255, 255, 255, 0.08)' }}
                className="flex items-center justify-between p-2.5 rounded-xl border cursor-pointer"
              >
                <span className="text-white font-bold">{lang === 'ru' ? 'Включить Auto-Parry' : 'Enable Auto-Parry'}</span>
                <input
                  type="checkbox"
                  checked={cfgAutoParry}
                  onChange={(e) => setCfgAutoParry(e.target.checked)}
                  className="w-4 h-4 cursor-pointer"
                  style={{ accentColor: theme.primaryColor }}
                />
              </label>

              <label
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)', borderColor: 'rgba(255, 255, 255, 0.08)' }}
                className="flex items-center justify-between p-2.5 rounded-xl border cursor-pointer"
              >
                <span className="text-white font-bold">{lang === 'ru' ? 'Защита от Фейнтов (Anti-Bait)' : 'Feint Protection (Anti-Bait)'}</span>
                <input
                  type="checkbox"
                  checked={cfgAntiBait}
                  onChange={(e) => setCfgAntiBait(e.target.checked)}
                  className="w-4 h-4 cursor-pointer"
                  style={{ accentColor: theme.primaryColor }}
                />
              </label>

              <label
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)', borderColor: 'rgba(255, 255, 255, 0.08)' }}
                className="flex items-center justify-between p-2.5 rounded-xl border cursor-pointer"
              >
                <span className="text-white font-bold">{lang === 'ru' ? 'Silent Backstab CFrame' : 'Silent Backstab CFrame'}</span>
                <input
                  type="checkbox"
                  checked={cfgSilentBackstab}
                  onChange={(e) => setCfgSilentBackstab(e.target.checked)}
                  className="w-4 h-4 cursor-pointer"
                  style={{ accentColor: theme.primaryColor }}
                />
              </label>

              <label
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)', borderColor: 'rgba(255, 255, 255, 0.08)' }}
                className="flex items-center justify-between p-2.5 rounded-xl border cursor-pointer"
              >
                <span className="text-white font-bold">{lang === 'ru' ? 'Orbit Target Strafe' : 'Orbit Target Strafe'}</span>
                <input
                  type="checkbox"
                  checked={cfgOrbitStrafe}
                  onChange={(e) => setCfgOrbitStrafe(e.target.checked)}
                  className="w-4 h-4 cursor-pointer"
                  style={{ accentColor: theme.primaryColor }}
                />
              </label>
            </div>

            {/* Parry Delay Slider */}
            <div className="space-y-1.5 pt-2">
              <div className="flex justify-between text-xs font-mono font-bold">
                <span className="text-purple-300">{lang === 'ru' ? 'Задержка Парирования:' : 'Parry Delay:'}</span>
                <span className="text-cyan-400">{cfgParryDelay} ms</span>
              </div>
              <input
                type="range"
                min={0}
                max={50}
                step={1}
                value={cfgParryDelay}
                onChange={(e) => setCfgParryDelay(Number(e.target.value))}
                className="w-full accent-cyan-500 cursor-pointer"
              />
            </div>

            {/* Keybind selector */}
            <div className="space-y-1.5 pt-2">
              <span className="text-xs font-mono font-bold text-purple-300 uppercase">
                {lang === 'ru' ? 'Клавиша Активации:' : 'Activation Keybind:'}
              </span>
              <div className="flex gap-2">
                {(['F', 'E', 'R', 'X'] as const).map((key) => (
                  <button
                    key={key}
                    onClick={() => setCfgKeybind(key)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                      cfgKeybind === key
                        ? 'bg-cyan-600 text-white shadow-md'
                        : 'bg-[#18102e] text-purple-300 hover:text-white'
                    }`}
                  >
                    Key {key}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Code Output */}
          <div className="space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-cyan-300 uppercase flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-cyan-400" />
                  {lang === 'ru' ? 'Сгенерированный Luau Скрипт:' : 'Generated Luau Code:'}
                </span>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCopyCustomConfig}
                  className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-600 to-purple-600 text-white font-mono font-bold text-xs uppercase flex items-center gap-1.5 shadow-md cursor-pointer"
                >
                  {copiedCustomConfig ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-300" />
                      <span>{lang === 'ru' ? 'Скопировано!' : 'Copied!'}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>{lang === 'ru' ? 'Скопировать' : 'Copy Code'}</span>
                    </>
                  )}
                </motion.button>
              </div>

              <pre className="p-4 rounded-2xl bg-[#06030e] border border-cyan-900/50 font-mono text-xs text-cyan-200 overflow-x-auto select-all shadow-inner leading-relaxed h-56">
                <code>{customLoadstringCode}</code>
              </pre>
            </div>

            <p className="text-[11px] font-mono text-purple-300/60">
              💡 {lang === 'ru'
                ? 'Вставьте данный кастомный код напрямую в ваш инжектор (Wave, Delta, Fluxus, Hydrogen).'
                : 'Paste this custom configuration snippet directly into your executor.'}
            </p>
          </div>
        </div>
      </div>

      {/* Supported Executors Grid */}
      <div className="space-y-3">
        <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-purple-400" />
            <span>{lang === 'ru' ? 'Совместимость Инжекторов' : 'Executor Compatibility'}</span>
          </div>
          <span className="text-xs font-mono text-rose-400 font-normal flex items-center gap-1">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>{lang === 'ru' ? 'Solara & Xeno НЕ поддерживаются!' : 'Solara & Xeno NOT supported!'}</span>
          </span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {supportedExecutors.map((e, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.02, y: -2 }}
              className={`p-4 rounded-2xl border flex items-center justify-between shadow-md ${
                e.supported
                  ? 'bg-[#140e26] border-purple-900/40'
                  : 'bg-rose-950/20 border-rose-900/40 opacity-80'
              }`}
            >
              <div>
                <div className={`text-xs font-mono font-bold ${e.supported ? 'text-white' : 'text-rose-200'}`}>
                  {e.name}
                </div>
                <div className="text-[10px] font-mono text-purple-300/70">{e.platform}</div>
              </div>

              {e.supported ? (
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-[10px] font-mono font-bold text-emerald-400">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>{e.status}</span>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-rose-950/80 border border-rose-500/50 text-[10px] font-mono font-bold text-rose-400">
                  <ZapOff className="w-3 h-3" />
                  <span>NO HOOKS</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Feature Checklist Overview */}
      <div className="bg-[#140e26] p-6 rounded-3xl border border-purple-900/50 space-y-4 shadow-xl">
        <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span>{lang === 'ru' ? 'Возможности Скрипта Trunkist Hub' : 'Trunkist Hub Features Included'}</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {TRUNKIST_FEATURES.map((f, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -2 }}
              className="p-3.5 rounded-xl bg-[#090514] border border-purple-900/40 space-y-1"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-purple-200">
                  {lang === 'ru' ? f.nameRu : f.nameEn}
                </span>
                <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-purple-900/60 text-purple-300 font-bold border border-purple-700/50">
                  {f.tab}
                </span>
              </div>
              <p className="text-[11px] font-mono text-purple-300/60 leading-tight">
                {lang === 'ru' ? f.descRu : f.descEn}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
