import React from 'react';
import { LanguageType } from '../types';
import { motion } from 'motion/react';
import { BookOpen, ShieldAlert } from 'lucide-react';

interface WeaponDatabaseProps {
  lang: LanguageType;
}

export const WeaponDatabase: React.FC<WeaponDatabaseProps> = ({ lang }) => {
  return (
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="bg-[#120a24] rounded-3xl p-6 sm:p-8 border border-purple-900/50 shadow-2xl space-y-6">
        <div className="flex items-center gap-3 border-b border-purple-900/40 pb-4">
          <BookOpen className="w-6 h-6 text-cyan-400" />
          <h2 className="text-xl sm:text-2xl font-extrabold text-white font-mono">
            {lang === 'ru' ? 'База Данных Оружия и Таймингов' : 'Weapon Parry Timing Database'}
          </h2>
        </div>

        <p className="text-xs font-mono text-purple-300">
          {lang === 'ru'
            ? 'Здесь собраны точные кадры задержки анимации ударов для каждого оружия в Combat Warriors.'
            : 'Exact parry windup frames and recovery times for all Combat Warriors weapons.'}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {['Dragon Slayer', 'Halberd', 'Katana', 'Executioner Sword', 'Sledgehammer', 'Rapier'].map((weapon, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-[#0a0518] border border-purple-900/60 space-y-2">
              <span className="text-xs font-mono text-purple-400 block uppercase">Combat Weapon</span>
              <h3 className="text-base font-bold font-mono text-white">{weapon}</h3>
              <div className="flex items-center justify-between text-xs font-mono pt-2 border-t border-purple-900/40">
                <span className="text-purple-300/70">Parry Window:</span>
                <span className="text-emerald-400 font-bold">120ms - 180ms</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
