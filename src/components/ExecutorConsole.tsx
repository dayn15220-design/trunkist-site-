import React, { useState, useEffect, useRef } from 'react';
import { LanguageType } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Zap, Play, Trash2 } from 'lucide-react';
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
