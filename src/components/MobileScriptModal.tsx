import React from 'react';
import { LanguageType } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { Smartphone, X, Check } from 'lucide-react';

interface MobileScriptModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: LanguageType;
}

export const MobileScriptModal: React.FC<MobileScriptModalProps> = ({ isOpen, onClose, lang }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-lg bg-[#120a24] border border-purple-500/50 rounded-3xl p-6 shadow-2xl space-y-6"
        >
          <div className="flex items-center justify-between border-b border-purple-900/50 pb-4">
            <div className="flex items-center gap-2">
              <Smartphone className="w-6 h-6 text-cyan-400" />
              <h3 className="text-lg font-bold font-mono text-white uppercase">
                {lang === 'ru' ? 'Delta & Mobile Инструкция' : 'Delta & Mobile Setup'}
              </h3>
            </div>
            <button onClick={onClose} className="p-1 rounded-xl bg-purple-950 text-purple-300 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4 font-mono text-xs text-purple-200">
            <p>
              {lang === 'ru'
                ? 'Скрипт Trunkist HUB полностью оптимизирован под мобильные экзекуторы Delta и Arceus X на iOS и Android.'
                : 'Trunkist HUB is fully optimized for Delta and Arceus X mobile executors on iOS & Android.'}
            </p>
            <div className="p-4 rounded-2xl bg-[#090412] border border-purple-900/60 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <Check className="w-4 h-4" />
                <span>Поддержка плавающих кнопок управления</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <Check className="w-4 h-4" />
                <span>100% защита от вылетов в Combat Warriors</span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-mono font-bold text-xs uppercase cursor-pointer transition-all"
          >
            Закрыть
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
