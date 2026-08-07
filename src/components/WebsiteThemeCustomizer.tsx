import React, { useState } from 'react';
import { LanguageType } from '../types';
import { useSiteTheme, SitePreset, FontStyle, RadiusStyle, SoundStyle } from '../context/SiteThemeContext';
import { recordTelemetryEvent } from '../services/telemetryService';
import { motion } from 'motion/react';
import {
  Palette,
  Sparkles,
  SlidersHorizontal,
  Volume2,
  Copy,
  Check,
  RotateCcw,
  Eye,
  Type,
  Square,
  VolumeX,
  Play,
  Grid,
  Tv,
  Binary,
  MousePointer,
  Crosshair,
  ShieldCheck,
  Terminal,
  Zap,
  Download,
  Upload,
} from 'lucide-react';

interface WebsiteThemeCustomizerProps {
  lang: LanguageType;
}

export const WebsiteThemeCustomizer: React.FC<WebsiteThemeCustomizerProps> = ({ lang }) => {
  const { theme, setTheme, applyPreset, resetTheme, playUISound } = useSiteTheme();
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'presets' | 'fx' | 'typography' | 'sound' | 'script-gui'>('presets');

  // In-Game Luau Config State for the script tab
  const [scriptCrosshairStyle, setScriptCrosshairStyle] = useState<'cross' | 'dot' | 'circle' | 'gap'>('cross');
  const [scriptHitSound, setScriptHitSound] = useState('rust');
  const [scriptKeybind, setScriptKeybind] = useState('RightControl');

  const handleCopyThemeJson = () => {
    navigator.clipboard.writeText(JSON.stringify(theme, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const generateCssVariables = () => {
    return `:root {
  --primary-color: ${theme.primaryColor};
  --accent-color: ${theme.accentColor};
  --bg-color: ${theme.bgColor};
  --card-bg: ${theme.cardBg};
  --border-color: ${theme.borderColor};
  --border-glow: ${theme.borderGlow}px;
  --glass-blur: ${theme.glassBlur}px;
}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-8"
    >
      {/* HEADER BANNER */}
      <div
        className="rounded-3xl p-6 sm:p-8 border shadow-2xl relative overflow-hidden transition-all duration-300"
        style={{
          backgroundColor: theme.cardBg,
          borderColor: theme.borderColor,
          boxShadow: `0 0 ${theme.borderGlow / 2}px ${theme.primaryColor}25`,
        }}
      >
        <div
          className="absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl pointer-events-none"
          style={{ backgroundColor: `${theme.primaryColor}15` }}
        />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div
              className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-bold border"
              style={{
                backgroundColor: `${theme.primaryColor}20`,
                borderColor: `${theme.primaryColor}50`,
                color: theme.primaryColor,
              }}
            >
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>
                {lang === 'ru' ? 'КАСТОМИЗАЦИЯ ВНЕШНЕГО ВИДА САЙТА' : 'WEBSITE UI & THEME CUSTOMIZER'}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white font-mono tracking-tight">
              {lang === 'ru' ? 'Персонализация Темы Сайта' : 'Website Customization Studio'}
            </h1>
            <p className="text-xs sm:text-sm text-gray-300 max-w-2xl font-mono leading-relaxed">
              {lang === 'ru'
                ? 'Полностью измените дизайн веб-сайта в реальном времени! Настраивайте цвета, задний фон (Matrix Rain, CRT сетка, эффекты), шрифты, геометрию карточек и звуки интерфейса.'
                : 'Transform the website appearance in real-time! Customize primary colors, background FX (Matrix Rain, CRT lines, Cyber Grid), fonts, card styles, and UI click audio.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              onClick={() => {
                resetTheme();
                playUISound('mech');
              }}
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/20 text-gray-200 hover:text-white text-xs font-mono font-bold cursor-pointer transition-all hover:bg-white/10"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{lang === 'ru' ? 'Сброс Темы' : 'Reset Theme'}</span>
            </button>

            <button
              onClick={() => {
                handleCopyThemeJson();
                playUISound('cyber');
              }}
              style={{
                backgroundColor: theme.primaryColor,
                borderColor: `${theme.primaryColor}80`,
              }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-white font-mono font-bold text-xs uppercase shadow-lg cursor-pointer border transition-all hover:brightness-110"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-200" />
                  <span>{lang === 'ru' ? 'Тема Скопирована!' : 'Theme Saved!'}</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>{lang === 'ru' ? 'Экспорт JSON Темы' : 'Export Theme JSON'}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* MAIN LAYOUT: CONTROLS (Left 5 Cols) & LIVE PREVIEW (Right 7 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: CONTROL TABS & SLIDERS */}
        <div className="lg:col-span-5 space-y-6">
          {/* CATEGORY SELECTOR */}
          <div className="flex flex-wrap gap-1 bg-black/40 p-1.5 rounded-2xl border border-white/10">
            {[
              { id: 'presets', labelRu: 'Цвета & Пресеты', labelEn: 'Themes', icon: Palette },
              { id: 'fx', labelRu: 'Эффекты & Фоны', labelEn: 'Atmosphere FX', icon: Tv },
              { id: 'typography', labelRu: 'Шрифт & Формы', labelEn: 'Style & Font', icon: Type },
              { id: 'sound', labelRu: 'Звуки UI', labelEn: 'UI Audio', icon: Volume2 },
              { id: 'script-gui', labelRu: 'GUI Скрипта', labelEn: 'Script GUI', icon: Terminal },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as typeof activeTab);
                    playUISound('cyber');
                  }}
                  style={{
                    backgroundColor: isActive ? theme.primaryColor : 'transparent',
                  }}
                  className={`flex-1 min-w-[110px] flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                    isActive ? 'text-white shadow-lg' : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{lang === 'ru' ? tab.labelRu : tab.labelEn}</span>
                </button>
              );
            })}
          </div>

          {/* TAB 1: PRESETS & COLORS */}
          {activeTab === 'presets' && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="rounded-2xl p-6 border space-y-6"
              style={{ backgroundColor: theme.cardBg, borderColor: `${theme.borderColor}60` }}
            >
              <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Palette className="w-4 h-4" style={{ color: theme.primaryColor }} />
                <span>{lang === 'ru' ? 'Готовые Цветовые Гаммы' : 'Global Theme Presets'}</span>
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {[
                  { id: 'purple', name: 'Monolith Purple', color: '#a855f7' },
                  { id: 'matrix', name: 'Toxic Matrix', color: '#22c55e' },
                  { id: 'cyber', name: 'Cyberpunk Neon', color: '#06b6d4' },
                  { id: 'ruby', name: 'Blood Ruby', color: '#ef4444' },
                  { id: 'gold', name: 'Gold Apex', color: '#eab308' },
                  { id: 'oled', name: 'Midnight OLED', color: '#818cf8' },
                  { id: 'rainbow', name: 'RGB Wave', color: 'rainbow' },
                  { id: 'psychedelic', name: '🌿 Trippy Smoke (trunkist)', color: 'trippy' },
                ].map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      applyPreset(p.id as SitePreset);
                      playUISound('laser');
                      recordTelemetryEvent({
                        type: 'preset',
                        actionRu: `Применен пресет темы "${p.name}"`,
                        actionEn: `Applied theme preset "${p.name}"`,
                      });
                    }}
                    className={`p-3 rounded-xl border font-mono text-xs text-left transition-all cursor-pointer flex items-center justify-between ${
                      theme.preset === p.id
                        ? 'bg-black/60 border-white text-white shadow-lg font-bold'
                        : 'bg-black/30 border-white/10 text-gray-300 hover:border-white/30'
                    }`}
                  >
                    <span className="truncate pr-1">{p.name}</span>
                    {p.color === 'rainbow' ? (
                      <span className="w-4 h-4 rounded-full shrink-0 bg-gradient-to-r from-red-500 via-green-500 to-blue-500 animate-spin" />
                    ) : p.color === 'trippy' ? (
                      <span className="w-4 h-4 rounded-full shrink-0 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 animate-pulse" />
                    ) : (
                      <span
                        className="w-4 h-4 rounded-full shrink-0 border border-white/40 shadow-sm"
                        style={{ backgroundColor: p.color }}
                      />
                    )}
                  </button>
                ))}
              </div>

              <hr className="border-white/10" />

              {/* FINE-TUNE COLOR PICKERS */}
              <div className="space-y-4">
                <h4 className="text-xs font-mono font-bold text-gray-300 uppercase tracking-wider">
                  {lang === 'ru' ? 'Точная Настройка Цветов' : 'Custom Color Palette'}
                </h4>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-gray-300 block">
                      {lang === 'ru' ? 'Основной цвет (Primary):' : 'Primary Color:'}
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={theme.primaryColor}
                        onChange={(e) => setTheme({ ...theme, primaryColor: e.target.value })}
                        className="w-8 h-8 rounded border border-white/30 bg-transparent cursor-pointer"
                      />
                      <span className="text-xs font-mono text-white">{theme.primaryColor}</span>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-gray-300 block">
                      {lang === 'ru' ? 'Акцентный цвет (Accent):' : 'Accent Color:'}
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={theme.accentColor}
                        onChange={(e) => setTheme({ ...theme, accentColor: e.target.value })}
                        className="w-8 h-8 rounded border border-white/30 bg-transparent cursor-pointer"
                      />
                      <span className="text-xs font-mono text-white">{theme.accentColor}</span>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-gray-300 block">
                      {lang === 'ru' ? 'Цвет Фона Сайта (BG):' : 'Background Color:'}
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={theme.bgColor}
                        onChange={(e) => setTheme({ ...theme, bgColor: e.target.value })}
                        className="w-8 h-8 rounded border border-white/30 bg-transparent cursor-pointer"
                      />
                      <span className="text-xs font-mono text-white">{theme.bgColor}</span>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-gray-300 block">
                      {lang === 'ru' ? 'Цвет Карточек (Card):' : 'Card Surface Color:'}
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={theme.cardBg}
                        onChange={(e) => setTheme({ ...theme, cardBg: e.target.value })}
                        className="w-8 h-8 rounded border border-white/30 bg-transparent cursor-pointer"
                      />
                      <span className="text-xs font-mono text-white">{theme.cardBg}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: ATMOSPHERE & FX */}
          {activeTab === 'fx' && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="rounded-2xl p-6 border space-y-6"
              style={{ backgroundColor: theme.cardBg, borderColor: `${theme.borderColor}60` }}
            >
              <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Tv className="w-4 h-4" style={{ color: theme.primaryColor }} />
                <span>{lang === 'ru' ? 'Эффекты Заднего Плана и Атмосферы' : 'Background & Atmosphere FX'}</span>
              </h3>

              <div className="space-y-3">
                {/* Grid Lines Toggle */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-white/10">
                  <div className="flex items-center gap-2.5">
                    <Grid className="w-4 h-4 text-gray-300" />
                    <div>
                      <div className="text-xs font-mono font-bold text-white">
                        {lang === 'ru' ? 'Кибер Сетка на Фоне (Grid Lines)' : 'Background Cyber Grid'}
                      </div>
                      <div className="text-[10px] font-mono text-gray-400">
                        {lang === 'ru' ? 'Векторная сетка на заднем плане' : 'Perspective futuristic grid mesh'}
                      </div>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={theme.showGridLines}
                    onChange={(e) => {
                      setTheme({ ...theme, showGridLines: e.target.checked });
                      playUISound('cyber');
                    }}
                    className="w-5 h-5 cursor-pointer accent-purple-500"
                  />
                </div>

                {/* Grid Opacity Slider */}
                {theme.showGridLines && (
                  <div className="space-y-1 px-1">
                    <div className="flex justify-between text-xs font-mono text-gray-300">
                      <span>{lang === 'ru' ? 'Прозрачность сетки:' : 'Grid Opacity:'}</span>
                      <span className="font-bold text-white">{theme.gridOpacity}%</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      value={theme.gridOpacity}
                      onChange={(e) => setTheme({ ...theme, gridOpacity: Number(e.target.value) })}
                      className="w-full cursor-pointer accent-purple-500"
                    />
                  </div>
                )}

                {/* Matrix Rain Toggle */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-white/10">
                  <div className="flex items-center gap-2.5">
                    <Binary className="w-4 h-4 text-emerald-400" />
                    <div>
                      <div className="text-xs font-mono font-bold text-white">
                        {lang === 'ru' ? 'Matrix Digital Rain (Анимация Кода)' : 'Matrix Digital Rain FX'}
                      </div>
                      <div className="text-[10px] font-mono text-gray-400">
                        {lang === 'ru' ? 'Падающий цифровой код на фоне сайта' : 'Animated code streams in background'}
                      </div>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={theme.showMatrixRain}
                    onChange={(e) => {
                      setTheme({ ...theme, showMatrixRain: e.target.checked });
                      playUISound('laser');
                    }}
                    className="w-5 h-5 cursor-pointer accent-emerald-500"
                  />
                </div>

                {/* CRT Scanlines Toggle */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-white/10">
                  <div className="flex items-center gap-2.5">
                    <Tv className="w-4 h-4 text-cyan-400" />
                    <div>
                      <div className="text-xs font-mono font-bold text-white">
                        {lang === 'ru' ? 'CRT Линии Сканирования (Retro Screen)' : 'CRT Monitor Scanlines'}
                      </div>
                      <div className="text-[10px] font-mono text-gray-400">
                        {lang === 'ru' ? 'Эффект старого лампового монитора' : 'Retro arcade CRT screen distortion overlay'}
                      </div>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={theme.showScanlines}
                    onChange={(e) => {
                      setTheme({ ...theme, showScanlines: e.target.checked });
                      playUISound('mech');
                    }}
                    className="w-5 h-5 cursor-pointer accent-cyan-500"
                  />
                </div>

                {/* Particle Sparks Toggle */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-white/10">
                  <div className="flex items-center gap-2.5">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <div>
                      <div className="text-xs font-mono font-bold text-white">
                        {lang === 'ru' ? 'Парящие Искры Частиц (Sparks)' : 'Floating Particle Sparks'}
                      </div>
                      <div className="text-[10px] font-mono text-gray-400">
                        {lang === 'ru' ? 'Анимированные световые искорки' : 'Ambient glowing particle embers'}
                      </div>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={theme.showParticles}
                    onChange={(e) => {
                      setTheme({ ...theme, showParticles: e.target.checked });
                      playUISound('cyber');
                    }}
                    className="w-5 h-5 cursor-pointer accent-amber-500"
                  />
                </div>

                {/* Cursor Trail Glow Toggle */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-white/10">
                  <div className="flex items-center gap-2.5">
                    <MousePointer className="w-4 h-4 text-pink-400" />
                    <div>
                      <div className="text-xs font-mono font-bold text-white">
                        {lang === 'ru' ? 'Неоновый Следящий Курсор (Cursor Trail)' : 'Neon Mouse Glow Follower'}
                      </div>
                      <div className="text-[10px] font-mono text-gray-400">
                        {lang === 'ru' ? 'Свечение, следящее за мышкой по экрану' : 'Smooth neon aura following cursor'}
                      </div>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={theme.showCursorGlow}
                    onChange={(e) => {
                      setTheme({ ...theme, showCursorGlow: e.target.checked });
                      playUISound('cyber');
                    }}
                    className="w-5 h-5 cursor-pointer accent-pink-500"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 3: TYPOGRAPHY & GEOMETRY */}
          {activeTab === 'typography' && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="rounded-2xl p-6 border space-y-6"
              style={{ backgroundColor: theme.cardBg, borderColor: `${theme.borderColor}60` }}
            >
              <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Type className="w-4 h-4" style={{ color: theme.primaryColor }} />
                <span>{lang === 'ru' ? 'Шрифты, Стекло & Формы' : 'Fonts, Glass & Geometry'}</span>
              </h3>

              {/* Font Family Selection */}
              <div className="space-y-2">
                <label className="text-xs font-mono text-gray-300 block font-bold">
                  {lang === 'ru' ? 'Стиль Шрифта Сайта:' : 'Site Typography Style:'}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'mono', label: 'JetBrains Mono', desc: 'Monospace Code' },
                    { id: 'sans', label: 'Inter Modern', desc: 'Clean Sans' },
                    { id: 'pixel', label: 'Arcade Cyber', desc: 'Retro Futuristic' },
                  ].map((f) => (
                    <button
                      key={f.id}
                      onClick={() => {
                        setTheme({ ...theme, fontStyle: f.id as FontStyle });
                        playUISound('mech');
                      }}
                      className={`p-2.5 rounded-xl border text-xs font-mono cursor-pointer transition-all ${
                        theme.fontStyle === f.id
                          ? 'bg-black/60 border-white text-white font-bold shadow-md'
                          : 'bg-black/20 border-white/10 text-gray-400 hover:border-white/30'
                      }`}
                    >
                      <div className="text-xs">{f.label}</div>
                      <div className="text-[9px] opacity-60">{f.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <hr className="border-white/10" />

              {/* Card Corner Radius Selection */}
              <div className="space-y-2">
                <label className="text-xs font-mono text-gray-300 block font-bold">
                  {lang === 'ru' ? 'Форма и Скругления Карточек:' : 'Card Corner Radius:'}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'sharp', label: 'Cyber 6px', radius: 'rounded-md' },
                    { id: 'modern', label: 'Modern 16px', radius: 'rounded-2xl' },
                    { id: 'pill', label: 'Pill 24px', radius: 'rounded-3xl' },
                  ].map((r) => (
                    <button
                      key={r.id}
                      onClick={() => {
                        setTheme({ ...theme, radiusStyle: r.id as RadiusStyle });
                        playUISound('cyber');
                      }}
                      className={`p-2.5 rounded-xl border text-xs font-mono cursor-pointer transition-all ${
                        theme.radiusStyle === r.id
                          ? 'bg-black/60 border-white text-white font-bold shadow-md'
                          : 'bg-black/20 border-white/10 text-gray-400 hover:border-white/30'
                      }`}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>

              <hr className="border-white/10" />

              {/* Glass Blur & Border Glow Sliders */}
              <div className="space-y-4">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-mono text-gray-300">
                    <span>{lang === 'ru' ? 'Интенсивность Стекла (Glass Blur):' : 'Glass Blur (px):'}</span>
                    <span className="font-bold text-white">{theme.glassBlur}px</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="30"
                    value={theme.glassBlur}
                    onChange={(e) => setTheme({ ...theme, glassBlur: Number(e.target.value) })}
                    className="w-full cursor-pointer accent-purple-500"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-mono text-gray-300">
                    <span>{lang === 'ru' ? 'Неоновое Свечение Рамок:' : 'Neon Border Glow:'}</span>
                    <span className="font-bold text-white">{theme.borderGlow}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={theme.borderGlow}
                    onChange={(e) => setTheme({ ...theme, borderGlow: Number(e.target.value) })}
                    className="w-full cursor-pointer accent-purple-500"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 4: UI AUDIO FEEDBACK */}
          {activeTab === 'sound' && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="rounded-2xl p-6 border space-y-6"
              style={{ backgroundColor: theme.cardBg, borderColor: `${theme.borderColor}60` }}
            >
              <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Volume2 className="w-4 h-4" style={{ color: theme.primaryColor }} />
                <span>{lang === 'ru' ? 'Звуковые Эффекты Нажатий (UI Audio)' : 'UI Sound Effects & Audio'}</span>
              </h3>

              <div className="space-y-2">
                {[
                  { id: 'cyber', name: 'Cyber Beep', desc: 'Futuristic high pitch synth chime' },
                  { id: 'mech', name: 'Mechanical Switch', desc: 'Tactile mechanical keyboard click' },
                  { id: 'laser', name: 'Laser Zap', desc: 'High frequency laser trigger' },
                  { id: 'retro', name: 'Retro 8-Bit Square', desc: 'Classic arcade blip' },
                  { id: 'none', name: 'Mute (Без Звуков)', desc: 'Silent mode without click audio' },
                ].map((s) => (
                  <div
                    key={s.id}
                    onClick={() => {
                      setTheme({ ...theme, soundStyle: s.id as SoundStyle });
                      playUISound(s.id as SoundStyle);
                    }}
                    className={`p-3 rounded-xl border font-mono text-xs cursor-pointer flex items-center justify-between transition-all ${
                      theme.soundStyle === s.id
                        ? 'bg-black/60 border-white text-white font-bold shadow-md'
                        : 'bg-black/20 border-white/10 text-gray-400 hover:border-white/30'
                    }`}
                  >
                    <div>
                      <div className="font-bold">{s.name}</div>
                      <div className="text-[10px] opacity-70">{s.desc}</div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        playUISound(s.id as SoundStyle);
                      }}
                      className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white"
                    >
                      <Play className="w-3.5 h-3.5 fill-white" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Master Volume Slider */}
              <div className="space-y-1.5 pt-2 border-t border-white/10">
                <div className="flex justify-between text-xs font-mono text-gray-300">
                  <span>{lang === 'ru' ? 'Громкость UI Звуков:' : 'Master UI Sound Volume:'}</span>
                  <span className="font-bold text-white">{theme.soundVolume}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={theme.soundVolume}
                  onChange={(e) => setTheme({ ...theme, soundVolume: Number(e.target.value) })}
                  className="w-full cursor-pointer accent-purple-500"
                />
              </div>
            </motion.div>
          )}

          {/* TAB 5: IN-GAME SCRIPT GUI CONFIG (BONUS) */}
          {activeTab === 'script-gui' && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="rounded-2xl p-6 border space-y-6"
              style={{ backgroundColor: theme.cardBg, borderColor: `${theme.borderColor}60` }}
            >
              <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Terminal className="w-4 h-4" style={{ color: theme.primaryColor }} />
                <span>{lang === 'ru' ? 'Настройка Конфига Luau Скрипта' : 'In-Game Luau Script Config'}</span>
              </h3>

              {/* Script Crosshair */}
              <div className="space-y-2">
                <label className="text-xs font-mono text-gray-300 block font-bold">
                  {lang === 'ru' ? 'Прицел Скрипта:' : 'Script Crosshair:'}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {['cross', 'dot', 'circle', 'gap'].map((c) => (
                    <button
                      key={c}
                      onClick={() => {
                        setScriptCrosshairStyle(c as typeof scriptCrosshairStyle);
                        playUISound('cyber');
                      }}
                      className={`py-2 px-3 rounded-xl border text-xs font-mono uppercase transition-all ${
                        scriptCrosshairStyle === c
                          ? 'bg-black/60 border-white text-white font-bold'
                          : 'bg-black/20 border-white/10 text-gray-400'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Script HitSound */}
              <div className="space-y-2">
                <label className="text-xs font-mono text-gray-300 block font-bold">
                  {lang === 'ru' ? 'Хитсанд Скрипта в Игре:' : 'In-Game HitSound:'}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {['rust', 'minecraft', 'cod', 'neverlose'].map((hs) => (
                    <button
                      key={hs}
                      onClick={() => {
                        setScriptHitSound(hs);
                        playUISound('laser');
                      }}
                      className={`py-2 px-3 rounded-xl border text-xs font-mono uppercase transition-all ${
                        scriptHitSound === hs
                          ? 'bg-black/60 border-white text-white font-bold'
                          : 'bg-black/20 border-white/10 text-gray-400'
                      }`}
                    >
                      {hs}
                    </button>
                  ))}
                </div>
              </div>

              {/* Script Keybind */}
              <div className="space-y-2">
                <label className="text-xs font-mono text-gray-300 block font-bold">
                  {lang === 'ru' ? 'Клавиша Открытия Меню в Игре:' : 'Script Toggle Keybind:'}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['RightControl', 'Insert', 'RightShift'].map((kb) => (
                    <button
                      key={kb}
                      onClick={() => {
                        setScriptKeybind(kb);
                        playUISound('mech');
                      }}
                      className={`py-2 px-2 rounded-xl border text-[11px] font-mono transition-all ${
                        scriptKeybind === kb
                          ? 'bg-black/60 border-white text-white font-bold'
                          : 'bg-black/20 border-white/10 text-gray-400'
                      }`}
                    >
                      {kb}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* RIGHT COLUMN: LIVE INTERACTIVE PREVIEW CARD OF THE WEBSITE */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-mono font-bold text-gray-300 uppercase tracking-wider flex items-center gap-2">
              <Eye className="w-4 h-4" style={{ color: theme.primaryColor }} />
              <span>
                {lang === 'ru' ? 'Интерактивный Превью Интерфейса Сайта' : 'Live Website UI Preview'}
              </span>
            </h3>
            <span
              className="text-[10px] font-mono font-bold px-2 py-0.5 rounded border"
              style={{
                backgroundColor: `${theme.primaryColor}20`,
                borderColor: `${theme.primaryColor}60`,
                color: theme.primaryColor,
              }}
            >
              ● LIVE THEME APPLIED
            </span>
          </div>

          {/* SIMULATED WEBSITE PREVIEW CONTAINER */}
          <div
            className="rounded-3xl border-2 p-6 space-y-6 shadow-2xl relative overflow-hidden transition-all duration-300"
            style={{
              backgroundColor: theme.cardBg,
              borderColor: theme.borderColor,
              boxShadow: `0 0 ${theme.borderGlow / 2}px ${theme.primaryColor}30`,
              backdropFilter: `blur(${theme.glassBlur}px)`,
            }}
          >
            {/* Background Grid simulation if enabled */}
            {theme.showGridLines && (
              <div
                className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0f_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0f_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"
                style={{ opacity: theme.gridOpacity / 100 }}
              />
            )}

            {/* PREVIEW NAVBAR HEADER */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 relative z-10">
              <div className="flex items-center gap-2.5">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center font-black font-mono text-white text-sm shadow-md"
                  style={{ backgroundColor: theme.primaryColor }}
                >
                  TR
                </div>
                <div>
                  <div className="font-extrabold text-sm text-white font-mono flex items-center gap-1.5">
                    <span>{theme.titlePrefix} HUB</span>
                    <span
                      className="text-[10px] px-2 py-0.5 rounded-full font-bold"
                      style={{ backgroundColor: `${theme.accentColor}30`, color: theme.accentColor }}
                    >
                      v1.4.8.8 TR
                    </span>
                  </div>
                  <div className="text-[10px] font-mono text-gray-400">
                    Combat Warriors Interactive Web Portal
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => playUISound('cyber')}
                  style={{ backgroundColor: theme.primaryColor }}
                  className="px-3 py-1.5 rounded-xl text-white font-mono font-bold text-xs shadow cursor-pointer"
                >
                  Loadstring
                </button>
              </div>
            </div>

            {/* PREVIEW HERO METRIC CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 relative z-10">
              {[
                { title: 'Auto-Parry Delay', val: '0ms (Instant)', icon: ShieldCheck, color: theme.primaryColor },
                { title: 'Bypass Security', val: '100% Undetected', icon: Zap, color: theme.accentColor },
                { title: 'FPS / Ping', val: '60 FPS | 14ms', icon: Terminal, color: theme.primaryColor },
              ].map((card, idx) => {
                const Icon = card.icon;
                return (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-black/40 border border-white/10 space-y-1.5"
                  >
                    <div className="flex items-center justify-between text-gray-400">
                      <span className="text-[10px] font-mono font-bold uppercase">{card.title}</span>
                      <Icon className="w-3.5 h-3.5" style={{ color: card.color }} />
                    </div>
                    <div className="text-sm font-black font-mono text-white">{card.val}</div>
                  </div>
                );
              })}
            </div>

            {/* PREVIEW INTERACTIVE BUTTONS & SOUND TEST */}
            <div className="p-4 rounded-2xl bg-black/50 border border-white/10 space-y-3 relative z-10">
              <div className="text-xs font-mono font-bold text-white flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5" style={{ color: theme.primaryColor }} />
                <span>{lang === 'ru' ? 'Тестирование Кнопок и Звука' : 'Interactive UI Sound Test'}</span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => playUISound('cyber')}
                  style={{ backgroundColor: `${theme.primaryColor}30`, borderColor: theme.primaryColor, color: '#fff' }}
                  className="px-3.5 py-2 rounded-xl border text-xs font-mono font-bold cursor-pointer hover:brightness-125 transition-all"
                >
                  Test Cyber Sound
                </button>

                <button
                  onClick={() => playUISound('mech')}
                  className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-mono font-bold text-white cursor-pointer transition-all"
                >
                  Test Mech Switch
                </button>

                <button
                  onClick={() => playUISound('laser')}
                  style={{ backgroundColor: `${theme.accentColor}30`, borderColor: theme.accentColor, color: '#fff' }}
                  className="px-3.5 py-2 rounded-xl border text-xs font-mono font-bold cursor-pointer hover:brightness-125 transition-all"
                >
                  Test Laser Zap
                </button>
              </div>
            </div>

            {/* PREVIEW FOOTER */}
            <div className="text-center text-[10px] font-mono text-gray-400 border-t border-white/10 pt-3 relative z-10">
              <span>Selected Theme: <strong className="text-white uppercase">{theme.preset}</strong> | Font: <strong className="text-white">{theme.fontStyle}</strong> | Sound: <strong className="text-white">{theme.soundStyle}</strong></span>
            </div>
          </div>

          {/* EXPORT CSS CODE BOX */}
          <div className="bg-black/60 rounded-2xl p-4 border border-white/10 font-mono text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-gray-300 font-bold flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>{lang === 'ru' ? 'Сгенерированные CSS Переменные Сайта:' : 'Generated CSS Variables:'}</span>
              </span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(generateCssVariables());
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                  playUISound('cyber');
                }}
                className="text-[11px] text-purple-300 hover:text-white underline cursor-pointer"
              >
                {copied ? 'Copied!' : 'Copy CSS'}
              </button>
            </div>
            <pre className="bg-black/80 p-3 rounded-xl border border-white/5 text-purple-300 overflow-x-auto text-[11px] leading-relaxed">
              {generateCssVariables()}
            </pre>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
