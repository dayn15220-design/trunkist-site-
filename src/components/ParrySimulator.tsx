import React, { useState, useEffect, useRef } from 'react';
import { LanguageType } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShieldAlert,
  Play,
  CheckCircle2,
  Zap,
  Timer,
  Award,
  RotateCcw,
  Volume2,
  VolumeX,
  Crosshair,
  Activity,
  AlertTriangle,
  Flame,
  Radio,
  Swords,
  Gauge,
  Sparkles,
  Target,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ParrySimulatorProps {
  lang: LanguageType;
}

type WeaponType = 'Dragon Slayer' | 'Halberd' | 'Scythe' | 'Katana' | 'Dual Daggers' | 'Heavy Hammer';

interface WeaponConfig {
  name: WeaponType;
  windupMs: number;
  parryWindowMs: number;
  rangeStuds: number;
  damage: number;
  descriptionRu: string;
  descriptionEn: string;
}

const WEAPONS: Record<WeaponType, WeaponConfig> = {
  'Dragon Slayer': {
    name: 'Dragon Slayer',
    windupMs: 680,
    parryWindowMs: 160,
    rangeStuds: 15.5,
    damage: 85,
    descriptionRu: 'Тяжелый двуручный меч с длинным замахом. Легко читается, но наносит огромный урон.',
    descriptionEn: 'Heavy greatsword with slow windup. Readable attack, but massive damage output.',
  },
  Halberd: {
    name: 'Halberd',
    windupMs: 540,
    parryWindowMs: 140,
    rangeStuds: 17.0,
    damage: 65,
    descriptionRu: 'Оружие дальнего боя. Высокая дистанция поражения, требует хорошего расстояния.',
    descriptionEn: 'Longest reach weapon in CW. High range requiring proper distance estimation.',
  },
  Scythe: {
    name: 'Scythe',
    windupMs: 460,
    parryWindowMs: 130,
    rangeStuds: 14.5,
    damage: 55,
    descriptionRu: 'Заметающий дуговой замах. Сбалансированная скорость и хорошая область поражения.',
    descriptionEn: 'Sweeping arc strike. Balanced attack speed with wide horizontal sweep.',
  },
  Katana: {
    name: 'Katana',
    windupMs: 340,
    parryWindowMs: 110,
    rangeStuds: 11.0,
    damage: 40,
    descriptionRu: 'Быстрый самурайский клинок. Мало времени на реакцию для человека.',
    descriptionEn: 'Rapid katana slash. Very tight human reaction window.',
  },
  'Dual Daggers': {
    name: 'Dual Daggers',
    windupMs: 240,
    parryWindowMs: 90,
    rangeStuds: 8.5,
    damage: 30,
    descriptionRu: 'Ультра-быстрые парные кинжалы. Отбить вручную почти невозможно без скрипта!',
    descriptionEn: 'Lightning-fast dual daggers. Almost impossible to parry manually without a script!',
  },
  'Heavy Hammer': {
    name: 'Heavy Hammer',
    windupMs: 820,
    parryWindowMs: 180,
    rangeStuds: 13.0,
    damage: 95,
    descriptionRu: 'Мощнейший молот. Медленный замах, но ломает кости при промахе парирования.',
    descriptionEn: 'Devastating warhammer. Slow windup, crushes targets on failed parries.',
  },
};

export const ParrySimulator: React.FC<ParrySimulatorProps> = ({ lang }) => {
  // Mode Selection
  const [activeMode, setActiveMode] = useState<'auto-parry' | 'reaction-trainer'>('auto-parry');

  // Common Simulator Settings
  const [selectedWeapon, setSelectedWeapon] = useState<WeaponType>('Dragon Slayer');
  const [distance, setDistance] = useState<number>(14);
  const [pingMs, setPingMs] = useState<number>(30);
  const [pingCompEnabled, setPingCompEnabled] = useState<boolean>(true);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Auto-Parry Sim State
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simPhase, setSimPhase] = useState<'idle' | 'windup' | 'feinted' | 'parried' | 'struck'>('idle');
  const [threatLevel, setThreatLevel] = useState<number>(0);
  const [windupProgress, setWindupProgress] = useState<number>(0);
  const [autoStats, setAutoStats] = useState({ parried: 0, missed: 0, total: 0 });

  // Reaction Trainer State
  const [rxState, setRxState] = useState<'idle' | 'waiting' | 'swinging' | 'parried' | 'struck' | 'early'>('idle');
  const [rxStartTime, setRxStartTime] = useState<number>(0);
  const [lastRxTime, setLastRxTime] = useState<number | null>(null);
  const [rxHistory, setRxHistory] = useState<number[]>([]);
  const [streak, setStreak] = useState<number>(0);
  const [bestStreak, setBestStreak] = useState<number>(0);
  const [rxGrade, setRxGrade] = useState<'S' | 'A' | 'B' | 'FAIL' | null>(null);

  const weapon = WEAPONS[selectedWeapon];

  // Web Audio Synthesizer (Zero External Dependencies)
  const playFx = (type: 'parry' | 'swing' | 'hit' | 'feint' | 'click') => {
    if (!soundEnabled) return;
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();

      if (type === 'parry') {
        // Metallic Clang
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(900, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(140, ctx.currentTime + 0.22);
        gain.gain.setValueAtTime(0.35, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.22);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.22);
      } else if (type === 'swing') {
        // Whoosh
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(220, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 0.18);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.18);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.18);
      } else if (type === 'hit') {
        // Heavy Hit Thud
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(160, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 0.25);
        gain.gain.setValueAtTime(0.4, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.25);
      } else if (type === 'feint') {
        // Subtle Canceled Click
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(400, ctx.currentTime);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.08);
      }
    } catch {
      // Audio failover
    }
  };

  // Run Auto-Parry Simulation Step
  const runAutoParrySimulation = (isFeintScenario: boolean = false) => {
    if (isSimulating) return;
    setIsSimulating(true);
    setSimPhase('windup');
    setThreatLevel(0.2);
    setWindupProgress(0);
    playFx('swing');

    const totalDuration = weapon.windupMs;
    const intervalMs = 20;
    let elapsed = 0;

    const interval = setInterval(() => {
      elapsed += intervalMs;
      const progress = Math.min(100, (elapsed / totalDuration) * 100);
      setWindupProgress(progress);

      // In-range calculation
      const effectiveReach = weapon.rangeStuds + (pingCompEnabled ? (pingMs / 1000) * 10 : 0);
      const inRange = distance <= effectiveReach;

      if (isFeintScenario && progress >= 50) {
        clearInterval(interval);
        setSimPhase('feinted');
        setThreatLevel(0.0);
        setIsSimulating(false);
        playFx('feint');
        return;
      }

      // Threat Index ramp
      if (inRange) {
        setThreatLevel(Number((progress / 100).toFixed(2)));
      } else {
        setThreatLevel(0.0);
      }

      if (progress >= 100) {
        clearInterval(interval);
        if (inRange) {
          setSimPhase('parried');
          setThreatLevel(0.99);
          setAutoStats((prev) => ({ parried: prev.parried + 1, missed: prev.missed, total: prev.total + 1 }));
          playFx('parry');
          confetti({ particleCount: 30, spread: 60, origin: { y: 0.7 } });
        } else {
          setSimPhase('struck');
          setThreatLevel(0.0);
          setAutoStats((prev) => ({ parried: prev.parried, missed: prev.missed + 1, total: prev.total + 1 }));
          playFx('hit');
        }
        setIsSimulating(false);
      }
    }, intervalMs);
  };

  // Reaction Trainer Logic
  const startReactionRound = () => {
    if (rxState === 'waiting' || rxState === 'swinging') return;
    setRxState('waiting');
    setRxGrade(null);

    const randomDelay = 1200 + Math.random() * 2200;

    setTimeout(() => {
      setRxState('swinging');
      setRxStartTime(Date.now());
      playFx('swing');
    }, randomDelay);
  };

  const handlePlayerParryInput = () => {
    if (rxState === 'waiting') {
      // Early click before swing!
      setRxState('early');
      setStreak(0);
      playFx('hit');
    } else if (rxState === 'swinging') {
      const reactionMs = Date.now() - rxStartTime;
      setLastRxTime(reactionMs);
      setRxHistory((prev) => [reactionMs, ...prev.slice(0, 9)]);

      const windowStart = weapon.windupMs - weapon.parryWindowMs - pingMs;
      const windowEnd = weapon.windupMs + 50;

      if (reactionMs >= windowStart && reactionMs <= windowEnd) {
        setRxState('parried');
        const newStreak = streak + 1;
        setStreak(newStreak);
        if (newStreak > bestStreak) setBestStreak(newStreak);

        if (reactionMs < 200) setRxGrade('S');
        else if (reactionMs < 280) setRxGrade('A');
        else setRxGrade('B');

        playFx('parry');
        confetti({ particleCount: 45, spread: 70, origin: { y: 0.65 } });
      } else {
        setRxState('struck');
        setRxGrade('FAIL');
        setStreak(0);
        playFx('hit');
      }
    }
  };

  // Keyboard shortcut listener for [F] key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'f' || e.key === 'F') {
        if (activeMode === 'reaction-trainer') {
          handlePlayerParryInput();
        } else if (activeMode === 'auto-parry' && !isSimulating) {
          runAutoParrySimulation(false);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeMode, rxState, rxStartTime, isSimulating, weapon, pingMs, distance]);

  const avgRxTime = rxHistory.length > 0 ? Math.round(rxHistory.reduce((a, b) => a + b, 0) / rxHistory.length) : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* HEADER BAR & MODE TOGGLE */}
      <div className="bg-[#0b0518] rounded-3xl p-6 sm:p-8 border border-purple-900/60 shadow-2xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-6 h-6 text-purple-400" />
              <h1 className="text-xl sm:text-2xl font-black text-white font-mono uppercase tracking-wider">
                {lang === 'ru' ? 'Combat Warriors Parry Simulator' : 'Combat Warriors Parry Simulator'}
              </h1>
            </div>
            <p className="text-xs font-mono text-purple-300/70">
              {lang === 'ru'
                ? 'Симулятор расчета хитбоксов, замахов и реакций авто-парирования Trunkist Hub'
                : 'Interactive hitboxes, windup animations, and real-time auto-parry engine simulator'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Sound Toggle */}
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-2.5 rounded-xl bg-purple-950/80 border border-purple-800/60 text-purple-300 hover:text-white transition-colors cursor-pointer"
              title={soundEnabled ? 'Disable Audio' : 'Enable Audio'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-purple-300" /> : <VolumeX className="w-4 h-4 text-purple-500" />}
            </button>

            {/* Mode Switcher */}
            <div className="flex items-center p-1 rounded-xl bg-[#140828] border border-purple-900/60">
              <button
                onClick={() => setActiveMode('auto-parry')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                  activeMode === 'auto-parry'
                    ? 'bg-purple-700 text-white shadow-md'
                    : 'text-purple-300/70 hover:text-white'
                }`}
              >
                {lang === 'ru' ? '⚡ Trunkist Auto-Parry (0ms)' : '⚡ Trunkist Auto-Parry (0ms)'}
              </button>
              <button
                onClick={() => setActiveMode('reaction-trainer')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                  activeMode === 'reaction-trainer'
                    ? 'bg-purple-700 text-white shadow-md'
                    : 'text-purple-300/70 hover:text-white'
                }`}
              >
                {lang === 'ru' ? '🎯 Человек (Реакция [F])' : '🎯 Human Reaction Test [F]'}
              </button>
            </div>
          </div>
        </div>

        {/* WEAPON & DISTANCE CONTROL BOARD */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 pt-2">
          {/* Select Weapon */}
          <div className="bg-[#070310] p-3.5 rounded-2xl border border-purple-900/50 space-y-1.5 col-span-1 md:col-span-2">
            <label className="text-[10px] font-mono font-bold text-purple-300/70 uppercase block">
              {lang === 'ru' ? 'Оружие Соперника в Combat Warriors:' : 'Enemy Combat Warriors Weapon:'}
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {(Object.keys(WEAPONS) as WeaponType[]).map((wKey) => (
                <button
                  key={wKey}
                  onClick={() => setSelectedWeapon(wKey)}
                  className={`py-1.5 px-2 rounded-xl text-[11px] font-mono font-bold transition-all cursor-pointer border ${
                    selectedWeapon === wKey
                      ? 'bg-purple-800 border-purple-500 text-white shadow-md'
                      : 'bg-[#120726] border-purple-900/40 text-purple-300/80 hover:text-white'
                  }`}
                >
                  {wKey}
                </button>
              ))}
            </div>
          </div>

          {/* Distance Slider */}
          <div className="bg-[#070310] p-3.5 rounded-2xl border border-purple-900/50 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono font-bold">
              <span className="text-purple-300/80 uppercase">{lang === 'ru' ? 'Дистанция:' : 'Distance:'}</span>
              <span className="text-purple-300 font-extrabold">{distance} studs</span>
            </div>
            <input
              type="range"
              min={5}
              max={25}
              value={distance}
              onChange={(e) => setDistance(Number(e.target.value))}
              className="w-full accent-purple-500 cursor-pointer"
            />
            <span className="text-[10px] font-mono text-purple-400/60 block">
              Хитбокс: {weapon.rangeStuds} studs
            </span>
          </div>

          {/* Ping & Compensation */}
          <div className="bg-[#070310] p-3.5 rounded-2xl border border-purple-900/50 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono font-bold">
              <span className="text-purple-300/80 uppercase">{lang === 'ru' ? 'Пинг (ms):' : 'Ping:'}</span>
              <span className="text-purple-300 font-extrabold">{pingMs} ms</span>
            </div>
            <input
              type="range"
              min={10}
              max={180}
              step={5}
              value={pingMs}
              onChange={(e) => setPingMs(Number(e.target.value))}
              className="w-full accent-purple-500 cursor-pointer"
            />
            <button
              onClick={() => setPingCompEnabled(!pingCompEnabled)}
              className={`w-full py-1 rounded text-[10px] font-mono font-bold border transition-colors cursor-pointer ${
                pingCompEnabled
                  ? 'bg-purple-900/80 border-purple-600 text-purple-200'
                  : 'bg-black border-purple-900/40 text-purple-500'
              }`}
            >
              Ping Comp: {pingCompEnabled ? 'ON (Trunkist)' : 'OFF'}
            </button>
          </div>
        </div>

        {/* 2D VISUAL COMBAT ARENA STAGE */}
        <div className="relative h-64 bg-[#05020c] rounded-2xl border border-purple-900/60 overflow-hidden flex flex-col justify-between p-4">
          {/* Background Grid Pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(#4c1d95_1px,transparent_1px)] [background-size:20px_20px] opacity-25 pointer-events-none" />

          {/* Top Info Overlay */}
          <div className="relative z-10 flex items-center justify-between text-xs font-mono font-bold">
            <div className="px-3 py-1 rounded-xl bg-[#110726] border border-purple-800/60 text-purple-200">
              Threat Index: <span className="text-purple-300 font-extrabold">{threatLevel.toFixed(2)}</span> / 1.00
            </div>

            <div className="px-3 py-1 rounded-xl bg-[#110726] border border-purple-800/60 text-purple-300">
              Weapon Windup: <span className="text-white">{weapon.windupMs} ms</span>
            </div>
          </div>

          {/* Animated Fighters Stage */}
          <div className="relative z-10 w-full max-w-xl mx-auto flex items-center justify-between px-8">
            {/* Player Avatar */}
            <motion.div
              animate={{
                scale: simPhase === 'parried' || rxState === 'parried' ? 1.15 : 1,
              }}
              className="flex flex-col items-center gap-2"
            >
              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center font-mono font-black text-white text-sm transition-all shadow-xl relative border ${
                  simPhase === 'parried' || rxState === 'parried'
                    ? 'bg-purple-800 border-purple-400 shadow-[0_0_25px_rgba(168,85,247,0.8)]'
                    : 'bg-[#100722] border-purple-900'
                }`}
              >
                YOU
                {(simPhase === 'parried' || rxState === 'parried') && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1.5, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 bg-purple-400 rounded-2xl pointer-events-none"
                  />
                )}
              </div>
              <span className="text-[11px] font-mono text-purple-300/80 font-bold">Trunkist User</span>
            </motion.div>

            {/* Distance & Swing Progress Line */}
            <div className="flex-1 px-6 flex flex-col items-center">
              <div className="w-full h-2 bg-[#120726] rounded-full overflow-hidden border border-purple-900/60 relative">
                <div
                  className="h-full bg-purple-500 transition-all duration-75"
                  style={{ width: `${windupProgress}%` }}
                />
              </div>
              <span className="text-[10px] font-mono text-purple-400/70 mt-1 uppercase tracking-wider font-bold">
                {distance} STUDS ({distance <= weapon.rangeStuds ? 'IN RANGE' : 'SAFE DISTANCE'})
              </span>
            </div>

            {/* Enemy Attacker Avatar */}
            <motion.div
              animate={{
                x: simPhase === 'windup' || rxState === 'swinging' ? -10 : 0,
              }}
              className="flex flex-col items-center gap-2"
            >
              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center font-mono font-black text-white text-sm transition-all shadow-xl border ${
                  simPhase === 'windup' || rxState === 'swinging'
                    ? 'bg-purple-950 border-purple-500 animate-pulse'
                    : simPhase === 'struck' || rxState === 'struck' || rxState === 'early'
                    ? 'bg-purple-900 border-purple-400'
                    : 'bg-[#100722] border-purple-900'
                }`}
              >
                ENEMY
              </div>
              <span className="text-[11px] font-mono text-purple-300 font-bold">{selectedWeapon}</span>
            </motion.div>
          </div>

          {/* Bottom Status Result Banner */}
          <div className="relative z-10 text-center font-mono font-bold text-xs uppercase tracking-wider py-1">
            {activeMode === 'auto-parry' && (
              <>
                {simPhase === 'idle' && (
                  <span className="text-purple-300/60">
                    {lang === 'ru' ? 'Нажмите "Запустить Тест Auto-Parry" или клавишу [F]' : 'Click "Run Auto-Parry Test" or press [F]'}
                  </span>
                )}
                {simPhase === 'windup' && (
                  <span className="text-purple-300 animate-pulse font-extrabold">
                    ⚡ {lang === 'ru' ? 'СКАНИРОВАНИЕ АНИМАЦИИ ВРАГА И ТРАЕКТОРИИ (TRACKING)...' : 'SCANNING ENEMY SWING TRACK & DISTANCE...'}
                  </span>
                )}
                {simPhase === 'parried' && (
                  <span className="text-purple-200 font-extrabold text-sm drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]">
                    🛡️ {lang === 'ru' ? 'УСПЕШНОЕ АВТО-ПАРИРОВАНИЕ (PARRY EXECUTED 0ms)!' : 'PARRY EXECUTED (0ms DELAY)!'}
                  </span>
                )}
                {simPhase === 'feinted' && (
                  <span className="text-purple-300 font-extrabold">
                    🎯 {lang === 'ru' ? 'ANTI-BAIT: ВРАГ ОТМЕНИЛ АТАКУ — БЛОК ОТМЕНЕН!' : 'ANTI-BAIT: ENEMY FEINT DETECTED — PARRY ABORTED!'}
                  </span>
                )}
                {simPhase === 'struck' && (
                  <span className="text-purple-400 font-bold">
                    ⚠️ {lang === 'ru' ? 'ВРАГ ВНЕ ХИТБОКСА (Угроза = 0.00 — Парирование не требовалось)' : 'TARGET OUTSIDE HITBOX (Threat = 0.00)'}
                  </span>
                )}
              </>
            )}

            {activeMode === 'reaction-trainer' && (
              <>
                {rxState === 'idle' && (
                  <span className="text-purple-300/60">
                    {lang === 'ru' ? 'Нажмите "Начать Раунд" и приготовьтесь к [F]' : 'Click "Start Round" and prepare for [F] key'}
                  </span>
                )}
                {rxState === 'waiting' && (
                  <span className="text-purple-300 animate-pulse">
                    ⏳ {lang === 'ru' ? 'Приготовьтесь... Враг замахивается случайным образом!' : 'Get ready... Enemy will swing randomly!'}
                  </span>
                )}
                {rxState === 'swinging' && (
                  <span className="text-white text-sm font-extrabold animate-bounce">
                    ⚡ {lang === 'ru' ? 'ЖМИТЕ [F] ИЛИ КЛИКАЙТЕ СЕЙЧАС!' : 'PRESS [F] OR CLICK NOW!'}
                  </span>
                )}
                {rxState === 'parried' && (
                  <span className="text-purple-200 font-extrabold text-sm">
                    ✨ {lang === 'ru' ? `УСПЕШНО! Ваше время: ${lastRxTime} ms (${rxGrade}-Rank)` : `PARRIED! Reaction: ${lastRxTime} ms (${rxGrade}-Rank)`}
                  </span>
                )}
                {rxState === 'early' && (
                  <span className="text-purple-400 font-bold">
                    ⚠️ {lang === 'ru' ? 'СЛИШКОМ РАНО! Блок уйдет на КД' : 'TOO EARLY! Parry put on cooldown'}
                  </span>
                )}
                {rxState === 'struck' && (
                  <span className="text-purple-400 font-bold">
                    💥 {lang === 'ru' ? 'СЛИШКОМ ПОЗДНО! Враг нанес урон' : 'TOO LATE! Struck by enemy attack'}
                  </span>
                )}
              </>
            )}
          </div>
        </div>

        {/* MODE CONTROLS & ACTION BUTTONS */}
        {activeMode === 'auto-parry' ? (
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => runAutoParrySimulation(false)}
              disabled={isSimulating}
              className="flex-1 py-3.5 rounded-2xl bg-purple-700 hover:bg-purple-600 text-white font-mono font-bold text-xs uppercase flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-purple-950/80 transition-all border border-purple-500/50"
            >
              <Play className="w-4 h-4" />
              <span>{lang === 'ru' ? 'Запустить Тест Auto-Parry [F]' : 'Run Auto-Parry Test [F]'}</span>
            </button>

            <button
              onClick={() => runAutoParrySimulation(true)}
              disabled={isSimulating}
              className="py-3.5 px-6 rounded-2xl bg-[#140828] hover:bg-[#1f0d3d] text-purple-200 font-mono font-bold text-xs uppercase flex items-center justify-center gap-2 cursor-pointer border border-purple-700/60"
            >
              <Target className="w-4 h-4 text-purple-400" />
              <span>{lang === 'ru' ? 'Симуляция Финта (Anti-Bait)' : 'Simulate Enemy Feint'}</span>
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={startReactionRound}
                disabled={rxState === 'waiting' || rxState === 'swinging'}
                className="flex-1 py-3.5 rounded-2xl bg-purple-700 hover:bg-purple-600 text-white font-mono font-bold text-xs uppercase flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-purple-950/80 transition-all border border-purple-500/50"
              >
                <Zap className="w-4 h-4" />
                <span>
                  {rxState === 'idle' || rxState === 'parried' || rxState === 'struck' || rxState === 'early'
                    ? lang === 'ru'
                      ? 'Начать Раунд Реакции'
                      : 'Start Reflex Round'
                    : lang === 'ru'
                    ? 'Ожидание замаха...'
                    : 'Awaiting swing...'}
                </span>
              </button>

              <button
                onClick={handlePlayerParryInput}
                disabled={rxState !== 'swinging' && rxState !== 'waiting'}
                className="py-3.5 px-8 rounded-2xl bg-purple-900 hover:bg-purple-800 text-white font-mono font-extrabold text-xs uppercase flex items-center justify-center gap-2 cursor-pointer border border-purple-500/60"
              >
                <ShieldAlert className="w-4 h-4 text-purple-300" />
                <span>PARRY NOW [F]</span>
              </button>
            </div>

            {/* Reaction Scoreboard */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
              <div className="bg-[#070310] p-3 rounded-xl border border-purple-900/50">
                <span className="text-purple-300/70 text-[10px] uppercase block">Последняя реакция</span>
                <span className="text-white font-bold text-base">{lastRxTime ? `${lastRxTime} ms` : '—'}</span>
              </div>

              <div className="bg-[#070310] p-3 rounded-xl border border-purple-900/50">
                <span className="text-purple-300/70 text-[10px] uppercase block">Среднее время</span>
                <span className="text-purple-300 font-bold text-base">{avgRxTime ? `${avgRxTime} ms` : '—'}</span>
              </div>

              <div className="bg-[#070310] p-3 rounded-xl border border-purple-900/50">
                <span className="text-purple-300/70 text-[10px] uppercase block">Текущий Стрик</span>
                <span className="text-purple-200 font-bold text-base">{streak}</span>
              </div>

              <div className="bg-[#070310] p-3 rounded-xl border border-purple-900/50">
                <span className="text-purple-300/70 text-[10px] uppercase block">Trunkist Auto-Parry</span>
                <span className="text-purple-400 font-bold text-base">0 ms</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};
