import React, { useState } from 'react';
import { LanguageType } from '../types';
import { motion } from 'motion/react';
import { Swords, Play, RefreshCw, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ParrySimulatorProps {
  lang: LanguageType;
}

export const ParrySimulator: React.FC<ParrySimulatorProps> = ({ lang }) => {
  const [distance, setDistance] = useState(14);
  const [ping, setPing] = useState(25);
  const [threatIndex, setThreatIndex] = useState(0.45);
  const [simulatedState, setSimulatedState] = useState<'idle' | 'attacking' | 'parried'>('idle');

  const handleSimulate = () => {
    setSimulatedState('attacking');
    setTimeout(() => {
      setSimulatedState('parried');
      confetti({ particleCount: 60, spread: 80, origin: { y: 0.6 } });
    }, 400);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="bg-[#120a24] rounded-3xl p-6 sm:p-8 border border-purple-900/50 shadow-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-purple-900/40 pb-4">
          <div className="flex items-center gap-2">
            <Swords className="w-6 h-6 text-pink-400" />
            <h2 className="text-xl sm:text-2xl font-extrabold text-white font-mono">
              {lang === 'ru' ? 'Симулятор Авто-Парирования' : 'Auto-Parry Simulator'}
            </h2>
          </div>
          <span className="px-3 py-1 rounded-full bg-purple-950 text-cyan-300 font-mono text-xs font-bold border border-purple-800/60">
            ONLINE SERVERS: 100% OPERATIONAL
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-4 bg-[#0a0518] p-5 rounded-2xl border border-purple-900/50">
            <div>
              <label className="text-xs font-mono text-purple-300 block mb-2">
                Дистанция до врага: <span className="text-white font-bold">{distance} studs</span>
              </label>
              <input
                type="range"
                min="4"
                max="30"
                value={distance}
                onChange={(e) => setDistance(Number(e.target.value))}
                className="w-full accent-purple-500 cursor-pointer"
              />
            </div>

            <div>
              <label className="text-xs font-mono text-purple-300 block mb-2">
                Пиинг сервера (MS): <span className="text-white font-bold">{ping} ms</span>
              </label>
              <input
                type="range"
                min="5"
                max="150"
                value={ping}
                onChange={(e) => setPing(Number(e.target.value))}
                className="w-full accent-pink-500 cursor-pointer"
              />
            </div>

            <div className="pt-2">
              <span className="text-xs font-mono text-purple-300 block mb-1">Threat Index:</span>
              <div className="text-2xl font-black font-mono text-cyan-300">
                {(distance * 0.03 + ping * 0.002).toFixed(2)} / 1.00
              </div>
            </div>

            <button
              onClick={handleSimulate}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-mono font-bold text-xs uppercase flex items-center justify-center gap-2 shadow-lg cursor-pointer hover:brightness-110"
            >
              <Play className="w-4 h-4" />
              <span>Запустить симуляцию</span>
            </button>
          </div>

          <div className="md:col-span-2 bg-[#090412] p-6 rounded-2xl border border-purple-900/60 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-20 h-20 rounded-full bg-purple-950 border border-purple-700/60 flex items-center justify-center shadow-xl">
              <Zap className={`w-10 h-10 ${simulatedState === 'parried' ? 'text-emerald-400 animate-bounce' : 'text-purple-400'}`} />
            </div>

            <div>
              <h3 className="text-lg font-bold font-mono text-white uppercase">
                {simulatedState === 'idle' && 'Система готова к тесту'}
                {simulatedState === 'attacking' && 'Враг наносит удар... Оценка угрозы...'}
                {simulatedState === 'parried' && 'Успешное парирование! Удар отражен!'}
              </h3>
              <p className="text-xs font-mono text-purple-300/70 mt-1">
                Моментальный расчет парарирования с учетом задержки сети.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
